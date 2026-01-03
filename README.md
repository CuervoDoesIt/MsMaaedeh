# MsMaaedeh - Sushi Chef Portfolio

An artistic portfolio website for Ms. Maaedeh, showcasing sushi creations, workshops, and catering services. Built with React, TypeScript, Vite, Tailwind CSS, and React Router.

## 🍣 Features

- **Responsive Design**: Mobile-first, fully responsive layout
- **Modern Stack**: React 19, TypeScript, Vite, Tailwind CSS
- **Routing**: React Router for smooth navigation
- **Pages**:
  - Home: Hero section with overview
  - Gallery: Filterable sushi creations gallery with placeholder carousel
  - Workshops: Interactive workshop listings
  - Catering: Service packages and event types
  - About: Story, philosophy, and values
  - Contact: Contact form and information

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/CuervoDoesIt/MsMaaedeh.git
cd MsMaaedeh

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

## 📦 Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Development

```bash
# Run linter
npm run lint

# Run dev server
npm run dev
```

## 📁 Project Structure

```
MsMaaedeh/
├── src/
│   ├── components/       # Reusable components (Navigation, Footer)
│   ├── pages/           # Page components (Home, Gallery, etc.)
│   ├── assets/          # Images and static assets
│   ├── App.tsx          # Main app with routing
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Public static files
├── DESIGN.md            # Design guidelines and wireframes
├── PLAN.md              # Project roadmap and features
├── DEVOPS.md            # AWS deployment and CI/CD
└── README.md            # This file
```

## ☁️ AWS Deployment

See [DEVOPS.md](./DEVOPS.md) for detailed AWS deployment instructions using:
- AWS Amplify (recommended for easy CI/CD)
- Amazon S3 + CloudFront (for custom configurations)

### Quick Deploy with AWS Amplify

1. Push code to GitHub
2. Connect repository in AWS Amplify Console
3. Amplify auto-detects Vite build settings
4. Deploy automatically on every push

### Alternative: S3 + CloudFront

```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name
```

See DEVOPS.md for complete setup instructions.

## 🎨 Design

This is an extensible starter template with:
- Artistic layouts and animations
- Placeholder content for easy customization
- Professional navigation and footer
- Ready for real content and images

See [DESIGN.md](./DESIGN.md) for design guidelines and wireframes.

## 📋 Roadmap

See [PLAN.md](./PLAN.md) for the complete project roadmap and planned features.

## 🤝 Contributing

This is a portfolio project. For inquiries, please contact the repository owner.

## 📄 License

Copyright © 2024 Ms. Maaedeh. All rights reserved.
