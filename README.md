# IntoClouds Landing Page

Professional cloud migration services landing page with cyberpunk design and full functionality.

## 🚀 Features

- **Next.js 14** with TypeScript
- **Tailwind CSS** with cyberpunk design
- **Contact form** with email integration
- **Multi-language support** (EN, RU)
- **Fully responsive** design
- **PM2** process management
- **Nginx** configuration ready
- **Email notifications** via Nodemailer

## 📦 Quick Start

\`\`\`bash
# Clone repository
git clone https://github.com/FunMenu9/intoclouds-landing.git
cd intoclouds-landing

# Install dependencies
npm install --legacy-peer-deps

# Create environment file
cp .env.example .env.local

# Build and start
npm run build
npm start
\`\`\`

## 🔧 Environment Variables

Create `.env.local` file:

\`\`\`env
SMTP_HOST=mail.intoclouds.io
SMTP_PORT=465
SMTP_USER=dev@intoclouds.io
SMTP_PASS=your-password
SMTP_FROM=dev@intoclouds.io
NODE_ENV=production
PORT=3000
\`\`\`

## 🚀 Deployment

### Manual Deployment

\`\`\`bash
# Build project
npm run build

# Start with PM2
pm2 start ecosystem.config.js
\`\`\`

### Server Setup

\`\`\`bash
# Install Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Setup Nginx
sudo apt install nginx -y
\`\`\`

## 📧 Contact Form

The contact form sends emails via SMTP and saves messages to a JSON file. Configure your SMTP settings in `.env.local`.

## 🎨 Design

- **Cyberpunk aesthetic** with neon colors
- **Gradient backgrounds** and glowing effects
- **Responsive design** for all devices
- **Smooth animations** and transitions

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js API Routes
- **Email**: Nodemailer
- **Process Manager**: PM2
- **Web Server**: Nginx

## 📱 Sections

1. **Hero** - Main landing with statistics
2. **Platforms** - AWS, Azure, GCP expertise
3. **Services** - Cloud migration services
4. **Process** - 4-step methodology
5. **Contact** - Contact form and information

## 🌐 Multi-language

Currently supports:
- English (EN)
- Russian (RU)

Easy to extend with additional languages.

## 📄 License

© 2024 IntoClouds Moldova SRL. All rights reserved.

## 🤝 Support

For support, email dev@intoclouds.io or create an issue.
\`\`\`

```plaintext file="public/robots.txt"
User-agent: *
Allow: /

# Sitemaps
Sitemap: https://intoclouds.io/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Block access to admin areas
Disallow: /admin/
Disallow: /api/internal/
Disallow: /_next/
Disallow: /static/

# Allow important pages
Allow: /
Allow: /services
Allow: /contact
Allow: /about
