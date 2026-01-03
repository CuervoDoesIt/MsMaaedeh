# DevOps & Deployment - MsMaaedeh Portfolio

## Overview

This document provides comprehensive instructions for deploying the MsMaaedeh portfolio website to AWS using either AWS Amplify (recommended) or Amazon S3 + CloudFront.

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI installed and configured (for S3 method)
- GitHub repository with the project code
- Node.js 18+ installed locally

## Deployment Option 1: AWS Amplify (Recommended)

AWS Amplify provides the easiest deployment with built-in CI/CD, custom domains, and automatic builds.

### Advantages
- ✅ Automatic builds on git push
- ✅ Built-in CI/CD pipeline
- ✅ Easy custom domain setup with SSL
- ✅ Preview deployments for branches
- ✅ Environment variables management
- ✅ Atomic deployments with rollback

### Step-by-Step Setup

#### 1. Push Code to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### 2. Connect to AWS Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Select "GitHub" as the repository source
4. Authorize AWS Amplify to access your GitHub account
5. Select the `MsMaaedeh` repository
6. Choose the branch to deploy (e.g., `main`)

#### 3. Configure Build Settings

Amplify should auto-detect the Vite configuration. Verify the build settings:

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

#### 4. Deploy

1. Review settings and click "Save and deploy"
2. Wait for the build to complete (usually 2-5 minutes)
3. Once deployed, you'll receive a default URL: `https://[random-id].amplifyapp.com`

#### 5. Custom Domain (Optional)

1. In Amplify Console, go to "Domain management"
2. Click "Add domain"
3. Enter your domain (e.g., `msmaaedeh.com`)
4. Follow DNS configuration instructions
5. Wait for SSL certificate validation (can take 15-30 minutes)

### Environment Variables

If you need environment variables (API keys, etc.):

1. Go to "Environment variables" in Amplify Console
2. Add key-value pairs
3. Redeploy the app

Example:
```
VITE_API_URL=https://api.example.com
VITE_CONTACT_EMAIL=hello@msmaaedeh.com
```

### Automatic Deployments

Amplify automatically deploys when you push to the connected branch:

```bash
git add .
git commit -m "Update gallery images"
git push origin main
# Amplify automatically builds and deploys
```

### Preview Deployments

Enable preview deployments for pull requests:

1. Go to "Previews" in Amplify Console
2. Enable pull request previews
3. Each PR will get a unique preview URL

## Deployment Option 2: Amazon S3 + CloudFront

For more control and potentially lower costs at scale.

### Advantages
- ✅ Lower cost for high traffic
- ✅ Fine-grained control over caching
- ✅ Integration with other AWS services
- ✅ Custom error pages

### Step 1: Build the Application

```bash
npm run build
```

This creates a `dist/` folder with production-ready files.

### Step 2: Create S3 Bucket

```bash
# Create bucket (use your domain name)
aws s3 mb s3://msmaaedeh-portfolio

# Enable static website hosting
aws s3 website s3://msmaaedeh-portfolio \
  --index-document index.html \
  --error-document index.html
```

### Step 3: Configure Bucket Policy

Create a file `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::msmaaedeh-portfolio/*"
    }
  ]
}
```

Apply the policy:

```bash
aws s3api put-bucket-policy \
  --bucket msmaaedeh-portfolio \
  --policy file://bucket-policy.json
```

### Step 4: Upload Files

```bash
# Sync dist folder to S3
aws s3 sync dist/ s3://msmaaedeh-portfolio \
  --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html" \
  --exclude "*.html"

# Upload HTML files with shorter cache
aws s3 sync dist/ s3://msmaaedeh-portfolio \
  --exclude "*" \
  --include "*.html" \
  --cache-control "public,max-age=0,must-revalidate"
```

### Step 5: Create CloudFront Distribution

1. Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Click "Create distribution"
3. Configure:
   - **Origin domain**: Select your S3 bucket
   - **Viewer protocol policy**: Redirect HTTP to HTTPS
   - **Allowed HTTP methods**: GET, HEAD, OPTIONS
   - **Compress objects automatically**: Yes
   - **Price class**: Use all edge locations (or choose based on audience)
   - **Alternate domain names (CNAMEs)**: Your custom domain
   - **SSL certificate**: Request or import certificate
   - **Default root object**: `index.html`

4. Create custom error responses for SPA routing:
   - Error code: 403
   - Response page path: `/index.html`
   - Response code: 200
   - Repeat for error code 404

### Step 6: Update DNS

Point your domain to the CloudFront distribution:

1. Get CloudFront domain name (e.g., `d123456abcdef.cloudfront.net`)
2. Create CNAME record in your DNS:
   ```
   CNAME  www  d123456abcdef.cloudfront.net
   CNAME  @    d123456abcdef.cloudfront.net (or use ALIAS if using Route 53)
   ```

### Deployment Script

Create `deploy.sh` for easier deployments:

```bash
#!/bin/bash
set -e

echo "Building application..."
npm run build

echo "Deploying to S3..."
aws s3 sync dist/ s3://msmaaedeh-portfolio \
  --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html" \
  --exclude "*.html"

aws s3 sync dist/ s3://msmaaedeh-portfolio \
  --exclude "*" \
  --include "*.html" \
  --cache-control "public,max-age=0,must-revalidate"

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"

echo "Deployment complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
```

## CI/CD Pipeline with GitHub Actions

### Option 1: GitHub Actions → Amplify

Amplify has built-in CI/CD, but you can add custom workflows:

`.github/workflows/amplify.yml`:
```yaml
name: Amplify Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

### Option 2: GitHub Actions → S3 + CloudFront

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://msmaaedeh-portfolio \
            --delete \
            --cache-control "public,max-age=31536000,immutable" \
            --exclude "index.html" \
            --exclude "*.html"
          
          aws s3 sync dist/ s3://msmaaedeh-portfolio \
            --exclude "*" \
            --include "*.html" \
            --cache-control "public,max-age=0,must-revalidate"
      
      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

Add secrets in GitHub repo settings:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `CLOUDFRONT_DISTRIBUTION_ID`

## Performance Optimization

### Caching Strategy

**Static Assets** (CSS, JS, images):
- Cache-Control: `public, max-age=31536000, immutable`
- Cached for 1 year

**HTML Files**:
- Cache-Control: `public, max-age=0, must-revalidate`
- Always check for updates

### Compression

CloudFront automatically compresses:
- Text files (HTML, CSS, JS, JSON)
- SVG files

Enable Brotli compression for even better results.

### Image Optimization

Before deployment:
```bash
# Install image optimization tools
npm install -D imagemin imagemin-webp imagemin-mozjpeg

# Optimize images
npx imagemin src/assets/images/* --out-dir=src/assets/images/optimized
```

## Monitoring & Logging

### CloudWatch Logs

Enable CloudFront logging:
1. Create S3 bucket for logs
2. Enable logging in CloudFront distribution settings
3. Analyze logs with CloudWatch Insights or Athena

### AWS Cost Monitoring

Set up billing alerts:
1. Go to AWS Billing Dashboard
2. Create budget alert
3. Set threshold (e.g., $10/month)
4. Configure email notifications

### Performance Monitoring

Use CloudWatch metrics to monitor:
- Request count
- Error rate (4xx, 5xx)
- Bytes downloaded
- Cache hit ratio

## Security Best Practices

### SSL/TLS
- Always use HTTPS
- Use AWS Certificate Manager for free SSL certificates
- Enable HTTP → HTTPS redirect

### Headers
Configure security headers in CloudFront:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### S3 Bucket Security
- Block public access to the bucket itself
- Only allow CloudFront to access via Origin Access Identity (OAI)
- Enable versioning for rollback capability
- Enable logging for audit trail

## Rollback Procedures

### Amplify
1. Go to Amplify Console
2. Select previous deployment
3. Click "Redeploy this version"

### S3 + CloudFront
If versioning is enabled:
```bash
# List object versions
aws s3api list-object-versions --bucket msmaaedeh-portfolio

# Restore specific version
aws s3api copy-object \
  --copy-source msmaaedeh-portfolio/index.html?versionId=VERSION_ID \
  --bucket msmaaedeh-portfolio \
  --key index.html
```

## Cost Estimation

### AWS Amplify
- **Hosting**: ~$0.01 per GB served + $0.15 per build minute
- **Estimate**: $1-5/month for small traffic

### S3 + CloudFront
- **S3 Storage**: ~$0.023 per GB/month
- **CloudFront**: ~$0.085 per GB transferred (first 10TB)
- **Estimate**: $1-10/month depending on traffic

## Troubleshooting

### Common Issues

**404 errors on direct routes**
- Ensure error pages redirect to `index.html` with 200 status
- Check CloudFront custom error responses

**Slow builds**
- Enable dependency caching in CI/CD
- Use `npm ci` instead of `npm install`

**Cache not updating**
- Invalidate CloudFront cache
- Check cache-control headers
- Use versioned asset filenames

## Support & Resources

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

*Last Updated: January 2024*
