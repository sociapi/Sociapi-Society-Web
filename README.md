# Sociapi Society Website

Welcome to the official website of **Sociapi Society** – a modern, interactive web platform built with cutting-edge technologies.

## 🌟 Features

- **Home Page** – Welcoming hero section with particles background animation
- **About Us** – Learn about the Sociapi Society mission and vision
- **Team** – Meet our talented team members with photos and bios
- **Events** – Discover upcoming events and activities
- **Blog** – Latest news, stories, and insights from our community
- **Careers** – Join our team – explore career opportunities
- **Contact** – Get in touch with us through a contact form
- **FAQ** – Frequently asked questions answered
- **Gallery** – View photos and media from past events
- **Partner** – Information about our partnerships and collaborators
- **Reviews** – Testimonials and reviews from our community members
- **Merch Store** – Shop exclusive Sociapi Society merchandise
- **WhatsApp Chatbot** – Instant messaging support integrated into the site
- **Responsive Design** – Fully optimized for desktop, tablet, and mobile devices
- **Performance Monitoring** – Vercel Analytics & Speed Insights integrated

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.6
- **Language:** TypeScript 5.9.3
- **Build Tool:** Vite 7.3.2
- **Styling:** Tailwind CSS 4.1.17
- **Animations:** Framer Motion 12.39.0
- **Icons:** Lucide React 1.16.0
- **Analytics:** Vercel Analytics & Speed Insights
- **Utility Libraries:** clsx, tailwind-merge
- **Deployment:** Netlify

## 📋 Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Socaipi-Website
```

2. Navigate to the project directory:
```bash
cd "Sociapi Society"
```

3. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The website will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

Build the project for production:
```bash
npm run build
```

The optimized files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## 📁 Project Structure

```
Sociapi Society/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── Footer.tsx       # Footer component
│   │   ├── Hero.tsx         # Hero section
│   │   ├── ParticlesBackground.tsx  # Animated particles
│   │   ├── WhatsAppChatbot.tsx      # WhatsApp integration
│   │   └── Next.js          # Next.js related components
│   ├── pages/               # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Team.tsx
│   │   ├── Events.tsx
│   │   ├── Blog.tsx
│   │   ├── Careers.tsx
│   │   ├── Contact.tsx
│   │   ├── FAQ.tsx
│   │   ├── Gallery.tsx
│   │   ├── Partner.tsx
│   │   ├── Reviews.tsx
│   │   └── MerchStore.tsx
│   ├── data/                # Static data and constants
│   │   └── initialData.ts
│   ├── utils/               # Utility functions
│   │   └── cn.ts           # Class name utility
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
│   ├── Image/               # Image assets
│   ├── _redirects           # Netlify redirect rules
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── package.json             # Project dependencies
└── netlify.toml             # Netlify deployment config
```

## 🔧 Configuration

### Vite Configuration
The project uses Vite with React and Tailwind CSS plugins. See `vite.config.ts` for details.

### TypeScript
Strict TypeScript is configured in `tsconfig.json` for better type safety.

### Tailwind CSS
Custom Tailwind CSS configuration is available in the project root.

### Netlify Deployment
- **Build Command:** `npm install --include=dev && npm run build`
- **Publish Directory:** `dist/`
- **Base Directory:** `Sociapi Society`

## 📊 Analytics & Performance

The website includes:
- **Vercel Analytics** – Track user behavior and page visits
- **Speed Insights** – Monitor Core Web Vitals and performance metrics

## 🌐 Deployment

The website is deployed on **Netlify** with automatic deployments configured in `netlify.toml`.

### Manual Deployment Steps

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` folder to your hosting platform

3. For Netlify, ensure the `netlify.toml` configuration is in the root directory

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact & Support

For questions or support regarding the Sociapi Society, please:
- Visit our Contact page
- Use the WhatsApp Chatbot integrated into the website
- Reach out through our social media channels

## 📄 License

This project is the property of **Sociapi Society**. All rights reserved.

## 🎯 Future Enhancements

- [ ] Multi-language support
- [ ] Advanced search functionality
- [ ] User authentication system
- [ ] Event registration system
- [ ] Blog comment section
- [ ] Newsletter subscription

---

**Last Updated:** August 2026
**Maintained by:** zuhairzeb
