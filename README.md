# KF Software Corporate Website

A professional, high-performance landing page and content management platform built for KF Software's mobile application ecosystem (PuantajX, FişMatik).

![KF Software Dashboard](public/og-image.png)

## 🚀 Vision
KF Software is dedicated to building efficient tools for field crews and personal finance. This repository houses the unified corporate presence, serving as a hub for product information, support, and specialized content.

## ✨ Core Features
- **🌍 Multi-Language (i18n):** Full support for Turkish and English with a seamless switcher.
- **📰 Advanced Blog System:** SSG-powered blog with search, categories, and scheduled publishing.
- **🛠️ Admin Dashboard:** Custom-built management interface for blog posts, support tickets, and subscriber lists.
- **🔗 Social Sharing & Link Shortener:** Integrated short link system (`/b/[code]`) with automated formatting for Twitter and Instagram.
- **📊 Business Intelligence:** Integrated Gaz4 analytics and custom admin statistics.
- **🛡️ Support System:** Multi-channel support desk with automated email templates.
- **📱 Responsive & Animated:** Built with mobile-first principles and smooth Framer Motion animations.

## 🛠️ Technology Stack
- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS 4
- **Database:** Supabase (PostgreSQL)
- **Authenticaton:** Supabase Auth
- **Mail System:** Hybrid Serverless PHP + Nodemailer
- **Animations:** Framer Motion
- **Static Export:** Fully compatible with `output: export` for high-performance hosting.

## 📦 Project Structure
```text
├── app/                  # Next.js App Router (Routes & Pages)
│   ├── admin/            # Protected Management Dashboard
│   ├── b/[code]/         # Short Link Redirection Logic
│   ├── blog/             # SSG Blog Engine
│   └── apps/             # Product Landing Pages
├── components/           # Reusable UI Design System
├── lib/                  # Utilities, i18n & Database Helpers
├── public/               # Optimized Static Assets
└── scripts/              # Build-time Automation Tools
```

## 🛠️ Development & Build

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
```

### Production Build (Static Export)
```bash
npm run build
```
The output will be generated in the `out/` directory, ready for FTP/Deployment.

## 📋 Roadmap
- [x] Multi-language support (TR/EN)
- [x] Short link system integration
- [x] Admin panel advanced statistics
- [x] FişMatik pricing engine
- [ ] Dark Mode integration (Planned Phase 2)
- [ ] PWA (Progressive Web App) enhancements

## 🛡️ License
Copyright © 2024 KF Software. All rights reserved.

---
*Built with ❤️ by KF Software Engineering Team.*
