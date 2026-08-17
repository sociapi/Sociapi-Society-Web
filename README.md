# Sociapi Society Web

A modern, responsive website for Sociapi Society built with React, TypeScript, and Tailwind CSS. This platform serves as a comprehensive hub for community engagement, events, services, and member management.

## 🌟 Features

- **Multi-Page Platform**: Home, About, Chapters, Team, Events & Blog, Services, Partner, Gallery, Shop, Career, Contact, Reviews, and FAQs
- **Certificate Verification System**: Validate and verify member certificates
- **E-Commerce Integration**: Shop functionality with order management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Team Management**: Display team members with roles, departments, skills, and bios
- **Dynamic Content**: Real-time data management with Supabase
- **Performance Optimized**: Vercel Analytics and Speed Insights integration
- **SEO Ready**: Sitemap generation and proper meta tags with React Helmet
- **Smooth Animations**: Beautiful transitions using Framer Motion
- **Static Site Generation**: Pre-rendering capabilities with Vite SSG

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern UI library with hooks
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS 4**: Utility-first CSS framework
- **React Router v7**: Client-side routing
- **Framer Motion**: Animation library

### Backend & Services
- **Supabase**: Backend as a service, database, and authentication
- **Vercel**: Hosting and deployment platform
- **Vercel Analytics & Speed Insights**: Performance monitoring

### Build & Optimization
- **Vite SSG**: Static site generation
- **Puppeteer**: Headless browser automation for pre-rendering
- **ESBuild**: Fast JavaScript bundler

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Clone the Repository
```bash
git clone https://github.com/yourusername/sociapi-society-web.git
cd sociapi-society-web
```

### Install Dependencies
```bash
npm install
# or
yarn install
```

## 🚀 Development

### Start Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
sociapi-society-web/
├── src/
│   ├── components/          # Reusable React components
│   │   └── CertificateVerification.tsx
│   ├── services/            # API services and business logic
│   │   └── orders.ts
│   ├── lib/                 # Utility libraries
│   │   └── supabase.ts
│   ├── utils/               # Helper functions
│   │   ├── cn.ts            # Class name utilities
│   │   └── supabase.ts
│   ├── data/                # Static data and constants
│   │   └── certificates.ts
│   ├── styles/              # Global and module CSS
│   │   └── index.css
│   ├── App.tsx              # Main application component
│   ├── Chapters.tsx         # Chapters page
│   ├── main.tsx             # Application entry point
│   └── vite-env.d.ts        # Vite environment types
├── public/                  # Static assets
│   ├── manifest.json        # PWA manifest
│   ├── robots.txt           # SEO robots directive
│   ├── sitemap.xml          # XML sitemap
│   └── Image/               # Images and media assets
├── scripts/
│   └── prerender.js         # Pre-rendering script
├── sociapi-certificate-verification/  # Certificate app subproject
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project dependencies
└── vercel.json              # Vercel deployment configuration
```

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/about` | About Sociapi Society |
| `/chapters` | Chapters information |
| `/team` | Team members directory |
| `/events` | Events and blog posts |
| `/services` | Services offered |
| `/partner` | Partnership information |
| `/gallery` | Photo gallery |
| `/shop` | E-commerce shop |
| `/career` | Career opportunities |
| `/contact` | Contact form |
| `/reviews` | Member reviews |
| `/faqs` | Frequently asked questions |

## 🛒 Features in Detail

### Certificate Verification
The `CertificateVerification` component allows users to verify member certificates by entering verification details.

### Shop & Orders
Order management system integrated with Supabase for tracking purchases and customer data.

### Team Management
Dynamic team display with member information including:
- Name, role, and department
- Profile image
- Bio and skills
- Orbital positioning for unique layout

### Community Forms
Integration with Google Forms for community join requests via:
`https://docs.google.com/forms/d/e/1FAIpQLSd3PzG3RGp_kfdqJSGcCKeIIGtJ6QbIJZJ_K8QF4vnk613q-A/viewform`

## 📊 Performance

- **Vercel Analytics**: Track user behavior and performance metrics
- **Vercel Speed Insights**: Monitor Core Web Vitals
- **SSG Support**: Pre-render pages for optimal performance
- **Tailwind CSS Optimization**: Only includes used CSS in production

## 🔐 Security

- Type-safe development with TypeScript
- Environment variables for sensitive data
- Supabase authentication and authorization
- Server-side validation through Supabase

## 📝 Building & Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

The project is configured for Vercel deployment via `vercel.json`.

### Custom Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables on your hosting platform

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [https://sociapis.vercel.app](https://sociapis.vercel.app)
- **Organization**: Sociapi Society

## 📧 Contact

For questions or support, please reach out through:
- Contact Form: `/contact` page
- Email: [Add your contact email]
- Social Media: [Add your social links]

## 🎯 Roadmap

- [ ] User authentication and profiles
- [ ] Advanced event management
- [ ] Member portal
- [ ] Payment integration improvements
- [ ] Multilingual support
- [ ] Mobile app

## 🙏 Acknowledgments

- React and Vite communities
- Tailwind CSS for excellent styling utilities
- Supabase for backend services
- Framer Motion for smooth animations
- Vercel for hosting and deployment
