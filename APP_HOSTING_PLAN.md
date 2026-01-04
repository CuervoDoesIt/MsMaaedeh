# App Hosting Plan (AWS)

This guide explains how to host this Vite + React app on AWS with a smooth CI/CD pipeline. The goal is:

- Public, live production site
- Local development in VS Code
- Regular GitHub commits
- Automatic deploys to production after push/merge

Two hosting paths are provided. Use Option A unless you need deep control or custom CDN behavior.

- Option A: AWS Amplify (recommended for speed and simplicity)
- Option B: S3 + CloudFront + GitHub Actions (more control)

The instructions below are deliberately verbose so you can follow them step by step.

---

## 1) Prerequisites

### Accounts and access
- AWS account with permissions for Amplify, S3, CloudFront, ACM, Route 53 (or your DNS host)
- GitHub repository for this project

### Local tools
- Node.js 18+ and npm
- Git
- (Optional for Option B) AWS CLI configured with credentials

### App info
- This app is a static SPA built with Vite. The production output is in `dist/` after `npm run build`.
- Client-side routing uses React Router, so the host must rewrite unknown routes to `index.html`.

---

## 2) Option A: AWS Amplify Hosting (recommended)

Amplify provides hosting, SSL, CDN, and CI/CD in one place. It is the fastest path to a live site.

### Step A1: Push your code to GitHub
1. Commit changes locally.
2. Push to `main` (or your preferred production branch).

```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

### Step A2: Create the Amplify app
1. Open AWS Amplify Console.
2. Click "New app" -> "Host web app".
3. Select "GitHub" as the repo source.
4. Authorize Amplify to access GitHub.
5. Pick this repository and the `main` branch.

### Step A3: Confirm build settings
Amplify will detect a Vite app. Ensure settings match:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Step A4: Deploy
1. Click "Save and deploy".
2. Wait for the build to finish.
3. Use the generated Amplify URL to verify the site is live.

### Step A5: Configure SPA routing
Amplify supports single-page apps. Add a rewrite rule:
- Source: `</*>`
- Target: `/index.html`
- Type: `200 (Rewrite)`

This ensures routes like `/about` or `/gallery` load correctly.

### Step A6: Add a custom domain (optional but recommended)
1. In Amplify, open "Domain management".
2. Click "Add domain" and enter your domain.
3. Follow the DNS instructions.
4. Amplify will provision SSL automatically.

### Step A7: Environment variables (optional)
If you have Vite env vars (must be prefixed with `VITE_`):
1. In Amplify, open "Environment variables".
2. Add key/value pairs.
3. Trigger a redeploy.

### Step A8: Continuous deployment workflow
From now on:
- Local edits in VS Code
- Commit and push to `main`
- Amplify auto-builds and deploys

This gives a smooth pipeline with no manual steps after push.

---

## 3) Option B: S3 + CloudFront + GitHub Actions

Use this if you want full control over caching, headers, and distribution behavior.

### Step B1: Build locally (one-time for initial setup)
```bash
npm ci
npm run build
```

### Step B2: Create an S3 bucket
Pick a globally unique name (usually your domain):

```bash
aws s3 mb s3://your-domain-name
```

Enable static website hosting:

```bash
aws s3 website s3://your-domain-name \
  --index-document index.html \
  --error-document index.html
```

### Step B3: Make the bucket private
For CloudFront, keep the bucket private and use an Origin Access Control (OAC). Steps:
1. In S3 console, keep bucket public access blocked.
2. In CloudFront (next step), create an OAC.
3. Attach the OAC to the CloudFront origin.
4. Update bucket policy to allow CloudFront access only.

### Step B4: Create a CloudFront distribution
1. Open CloudFront Console -> "Create distribution".
2. Origin domain: select your S3 bucket.
3. Viewer protocol policy: Redirect HTTP to HTTPS.
4. Default root object: `index.html`.
5. Enable compression.
6. Create and attach an Origin Access Control.

### Step B5: SPA routing in CloudFront
Add a custom error response so unknown routes serve `index.html`:
- HTTP error code: 404
- Response page path: `/index.html`
- HTTP response code: 200

### Step B6: Custom domain + SSL
1. Request a certificate in AWS Certificate Manager (ACM) in `us-east-1`.
2. Add DNS validation records.
3. Attach the certificate to the CloudFront distribution.
4. In Route 53 (or your DNS host), create a CNAME or ALIAS to the CloudFront domain.

### Step B7: Configure caching and headers
Recommended cache strategy:
- `index.html`: cache 0 or short TTL to allow fast updates.
- Assets with hashed filenames: long cache (1 year).

CloudFront can do this with cache policies or with `Cache-Control` headers from S3.

---

## 4) CI/CD with GitHub Actions (for Option B)

This pipeline builds the app and syncs to S3, then invalidates CloudFront.

### Step C1: Create AWS IAM credentials
Create an IAM user (or role via OIDC) with:
- `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket`
- `cloudfront:CreateInvalidation`

Store credentials as GitHub secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID`

### Step C2: Add the workflow file
Create `.github/workflows/deploy.yml` with content like:

```yaml
name: Deploy
on:
  push:
    branches: ["main"]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}
      - run: |
          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete \
            --exclude "index.html" --exclude "*.html" \
            --cache-control "public,max-age=31536000,immutable"
          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} \
            --exclude "*" --include "*.html" \
            --cache-control "public,max-age=0,must-revalidate"
      - run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

### Step C3: Push to deploy
Every push to `main` will:
- Build the app
- Upload to S3
- Invalidate CloudFront
- Publish your latest code to production

---

## 5) Local development workflow (matches both options)

1. Open project in VS Code.
2. Run `npm run dev` for local development.
3. Commit and push changes.
4. CI/CD handles deployment.

Suggested branching:
- `main` = production
- `dev` or feature branches for work in progress
- Use PRs to merge into `main`

---

## 6) Rollback strategy

### Amplify
- Use Amplify Console -> "Deployments" -> "Redeploy this version" to rollback.

### S3 + CloudFront
- Keep prior `dist/` builds in a separate bucket or prefix.
- Re-sync the last known good build.

---

## 7) Verification checklist

After each deploy:
- Visit the production URL.
- Test key routes (Home, Gallery, Workshops, Contact).
- Refresh on a nested route to confirm SPA routing.
- Check console for errors.

---

## 8) Troubleshooting tips

- 404 on sub-pages: SPA routing is not configured. Add rewrite (Amplify) or 404->index.html (CloudFront).
- Stale content: Cache is too aggressive. Shorten `index.html` cache or invalidate CloudFront.
- Build fails: Check Node version and `npm ci` success.

---

## 9) Recommended choice

If you want the smoothest pipeline with minimal setup, use Amplify.
If you need advanced CDN control or custom headers, use S3 + CloudFront + GitHub Actions.
