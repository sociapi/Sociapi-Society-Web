import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ChaptersPage from "./Chapters";
import CertificateVerification from "./components/CertificateVerification";
import { orderService, type CreateOrderInput } from "./services/orders";

/* ---------------- Types ---------------- */
type Member = {
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  skills: string[];
  orbit: number;
  angle: number;
};

type PastMember = {
  name: string;
  role: string;
  image: string;
};

type PageKey =
  | "home" | "about" | "team" | "events" | "services" | "partner"
  | "gallery" | "shop" | "career" | "contact" | "reviews" | "faqs" | "chapters";

/* ---------------- Constants ---------------- */
const JOIN_COMMUNITY_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd3PzG3RGp_kfdqJSGcCKeIIGtJ6QbIJZJ_K8QF4vnk613q-A/viewform";
const SITE_URL = "https://sociapis.vercel.app";
const SITE_NAME = "Sociapi Society";

const pages: { key: PageKey; label: string; path: string }[] = [
  { key: "home", label: "Home", path: "/" },
  { key: "about", label: "About", path: "/about" },
  { key: "chapters", label: "Chapters", path: "/chapters" },
  { key: "team", label: "Team", path: "/team" },
  { key: "events", label: "Events & Blog", path: "/events" },
  { key: "services", label: "Services", path: "/services" },
  { key: "partner", label: "Partner", path: "/partner" },
  { key: "gallery", label: "Gallery", path: "/gallery" },
  { key: "shop", label: "Shop", path: "/shop" },
  { key: "career", label: "Career", path: "/career" },
  { key: "contact", label: "Contact", path: "/contact" },
  { key: "reviews", label: "Reviews", path: "/reviews" },
  { key: "faqs", label: "FAQs", path: "/faqs" },
];

const teamMembers: Member[] = [
  { name: "Muhammad Zuhair Zeb", role: "Founder & President", department: "Leadership", image: "Image/Team Pic/Zuhair.jpeg?auto=format&fit=crop&w=500&q=80", bio: "Muhammad Zuhair Zeb belongs to Swabi, Pakistan. He is an undergraduate student in Artificial Intelligence at Islamia College University, Peshawar. He is the founder of Sociapi Society, a student-led platform that promotes technology, creativity, and skills development.", skills: ["AI", "Web Developer", "WordPress Developer", "Business Intelligence", "Community Leadership"], orbit: 0, angle: 0 },
  { name: "Muhammad Mudassir", role: "Co-Founder", department: "Leadership", image: "Image/Team Pic/Muhammad Mudassir.jpg?auto=format&fit=crop&w=500&q=80", bio: "AI Student with strong interest in Computer Vision, OpenCV, AI Agents, Web Development, and Business Intelligence.", skills: ["OpenCV", "AI Agents", "Leadership"], orbit: 1, angle: 0 },
  { name: "Naveed Abbas", role: "Teacher Advisor", department: "Advisory", image: "Image/Team Pic/Navved.png?auto=format&fit=crop&w=500&q=80", bio: "Advisor to Sociapi Society, guiding students to convert academic learning into meaningful, ethical, and practical technology outcomes.", skills: ["Mentorship", "Academic Guidance", "Research", "Leadership"], orbit: 1, angle: 180 },
  { name: "Bilal Muhammad", role: "General Secretary", department: "Operations", image: "Image/Team Pic/Bilal Muhammad.jpg?auto=format&fit=crop&w=500&q=80", bio: "Coordinates society operations, documentation, member communications, and execution discipline.", skills: ["Operations", "Communication", "Documentation"], orbit: 1, angle: 60 },
  { name: "Hamza Khan", role: "HR Manager", department: "HR", image: "Image/Team Pic/Hamza Khan.jpg?auto=format&fit=crop&w=500&q=80", bio: "Builds a healthy member experience with onboarding, people systems, and growth culture.", skills: ["HR", "People Ops", "Culture"], orbit: 1, angle: 120 },
  { name: "Muhammad Zulkifal", role: "Event Manager", department: "Events", image: "Image/Team Pic/Muhammad Zulkifal (Event Manger).jpg?auto=format&fit=crop&w=500&q=80", bio: "Designs memorable learning events, seminar experiences, and community programs.", skills: ["Events", "Planning", "Experience Design"], orbit: 1, angle: 300 },
  { name: "Asiya Islam", role: "Women Lead", department: "Women Wing", image: "Image/Team Pic/Female/Asiya Islam.png?auto=format&fit=crop&w=500&q=80", bio: "Leads women participation, inclusive learning circles, and leadership opportunities.", skills: ["Leadership", "Community", "Inclusion"], orbit: 2, angle: 60 },
  { name: "Sajid Ullah", role: "Outreach Member", department: "Outreach", image: "Image/Team Pic/Sajid_Wazir.png?auto=format&fit=crop&w=500&q=80", bio: "Builds bridges with partners, students, and external technology communities.", skills: ["Outreach", "Partnerships", "Networking"], orbit: 2, angle: 140 },
  { name: "Muhammad Faisal", role: "Video Editor", department: "Media", image: "Image/Team Pic/Faisal Khan.png?auto=format&fit=crop&w=500&q=80", bio: "Crafts cinematic event edits, reels, and society storytelling assets.", skills: ["Video Editing", "Storytelling", "Production"], orbit: 2, angle: 180 },
  { name: "Areesh Tahir", role: "Graphic Designers Lead", department: "Graphics", image: "Image/Team Pic/Areesh Tahir.png?auto=format&fit=crop&w=500&q=80", bio: "Leads identity design, event visuals, and polished brand systems.", skills: ["Graphic Design", "Branding", "Creative Direction"], orbit: 2, angle: 260 },
  { name: "Muhammad Abdullah", role: "Graphic Designers Co-Lead", department: "Graphics", image: "Image/Team Pic/Muhammad Abdullah.jpg?auto=format&fit=crop&w=500&q=80", bio: "Supports design execution, templates, and visual consistency.", skills: ["Design", "Visual Systems", "Canva"], orbit: 2, angle: 300 },
  { name: "Maimoona Iqbal", role: "Decor Team", department: "Decor", image: "Image/Team Pic/Female/maimoona.jpg?auto=format&fit=crop&w=500&q=80", bio: "Supports stage, venue, and detail design for premium student events.", skills: ["Decor", "Teamwork", "Execution"], orbit: 3, angle: 135 },
  { name: "Hanyia Mumtaz", role: "Organizer Lead", department: "Organizing", image: "Image/Team Pic/HANIYA MUMTAZ.JPG?auto=format&fit=crop&w=500&q=80", bio: "Leads on-ground event coordination, volunteer management, and execution flow.", skills: ["Organization", "Events", "Leadership"], orbit: 3, angle: 225 },
  { name: "Danyal Yousafzai", role: "Organizer CO-Lead", department: "Organizing", image: "Image/Team Pic/DANI Yousufzai.jpg?auto=format&fit=crop&w=500&q=80", bio: "Leads on-ground event coordination, volunteer management, and execution flow.", skills: ["Organization", "Events", "Leadership"], orbit: 3, angle: 225 },
  { name: "Riyan Ahmad Khan", role: "Organizer", department: "Organizing", image: "Image/Team Pic/Riyan Ahmad.png?auto=format&fit=crop&w=500&q=80", bio: "Supports event logistics, audience guidance, and operational reliability.", skills: ["Logistics", "Teamwork", "Execution"], orbit: 3, angle: 315 },
];

const pastMembers: PastMember[] = [
  { name: "Muhammad Amjad", role: "Graphic Designer", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Siraat Ali", role: "Technical Lead", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Farhan Ullah", role: "Logistics", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "SIRAJ UDDIN", role: "Technical Lead", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Maavia Rizwan", role: "Finance Lead", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Mustafa Ali Qureshi", role: "HR", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Mazhar Shah", role: "Graphic Designer", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Muhammad Afaq", role: "Finance", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Sabir Shah", role: "Event Manager", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Atifaslamkhan", role: "Logistics", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Kashif Ahmad", role: "Video Editor", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Muhammad Jawad", role: "Finance", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Shah Hussain", role: "Video Editor", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Rauf Akhtar", role: "Outreach Lead", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Latif Ur Rahman", role: "Media", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Shahzeb Khan", role: "Media", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Afaq Saeed", role: "Technical", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Fawad Khan", role: "Media", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Safir Ullah", role: "Web Developer", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Tamkeen Israr", role: "Women Lead", image: "/Image/Team Pic/Female/Tamkeen Israr.jpg?auto=format&fit=crop&w=500&q=80" },
  { name: "M Anas Rashid", role: "Decor", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Muhammad Awais Khan", role: "Organizer", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Sajeela Tariq", role: "Decor", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Mohammad Arqam Javed", role: "Social Media", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Muhammad Mobeen", role: "Logistics", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Maira Seher", role: "Outreach", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Maemona Rehman", role: "Outreach", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Luqman Khan", role: "Outreach", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Atika Aqleem", role: "Organizer", image: "/Image/Team Pic/Atika Aqlim.jpg?auto=format&fit=crop&w=500&q=80" },
  { name: "Muhammad Saad", role: "Media", image: "/Image/Team Pic/saad.jpeg?auto=format&fit=crop&w=500&q=80" },
  { name: "Muhammad Zakria", role: "Project Manager", image: "/Image/Team Pic/Muhammad Zakria.jpg?auto=format&fit=crop&w=500&q=80" },
  { name: "Hammad Khan", role: "Technical", image: "/Image/Team Pic/Hamad Khan.jpg?auto=format&fit=crop&w=500&q=80" },
  { name: "AMAL KHAN", role: "Graphic Designer", image: "/Image/Team Pic/past-member-placeholder.svg" },
  { name: "Maham Iqbal", role: "Women Co-Lead", image: "/Image/Team Pic/Female/Maham Iqbal.png?auto=format&fit=crop&w=500&q=80" },
];

const panels = ["Artificial Intelligent", "Machine Learning", "Data Science", "Generative AI", "Robotics", "Computer Vision", "Web Development", "Business Intelligence"];
const stats: [number, string, string][] = [
  [340, "Audience", "+"],
  [20, "Current Members", "+"],
  [3, "Major Events", "+"],
  [2025, "Founded", ""],
];
const timeline = [
  ["December 2025", "Society Founded", "Sociapi Society begins as a professional student technology community."],
  ["February 2026", "Agentum 2026", "A seminar focused on AI agents, automation, and the next generation of practical AI."],
  ["May 2026", "Mehfil AI", "A flagship gathering celebrating AI learning, student talent, and portfolio-grade work."],
  ["July 2026", "Summer BootCamp", "A 6-week intensive program for students to build AI projects, portfolios, and skills."],
];
const servicesData = ["UI & UX Design", "Graphic Design", "WordPress Development", "Video Editing"];

const galleryImages = [
  "Image/Agentum Pic/0001.jpg", "Image/Agentum Pic/6.jpg", "Image/Agentum Pic/7.jpeg",
  "Image/Agentum Pic/12.png", "Image/Agentum Pic/13.png", "Image/Agentum Pic/14.png",
  "Image/Agentum Pic/15.jfif", "Image/Agentum Pic/IMG_5921.png", "Image/Agentum Pic/IMG_5956.png",
  "Image/Agentum Pic/IMG_5998.png", "Image/Agentum Pic/IMG_6010.png",
  "Image/Agentum Pic/Khyzar Hayat.png", "Image/Agentum Pic/mustafa.png", "Image/Agentum Pic/uzair.png",
  "Image/1.png", "Image/2.png", "Image/3.png", "Image/4.png", "Image/5.png", "Image/6.png",
];

const reviews = [
  "Sociapi Society made AI practical for me. I finally learned how to turn concepts into projects.",
  "The mentorship culture is serious, supportive, and focused on real outcomes.",
  "Agentum 2026 felt like a professional technology event, not a student seminar.",
  "The community helped me build confidence, a portfolio, and a direction in AI.",
];
const faqs = [
  ["Membership", "Who can join Sociapi Society?", "Students interested in AI, Data Science, Robotics, design, media, events, and technology leadership can apply."],
  ["Programs", "Do I need coding experience?", "No. We support beginner to advanced learners with guided tracks and project-based mentorship."],
  ["Events", "What are Mehfil AI and Agentum 2026?", "They are flagship experiences focused on AI learning, agents, innovation, and student achievement."],
  ["Partnership", "Can organizations partner with Sociapi Society?", "Yes. We welcome event, learning, and community partners through a structured partnership process."],
  ["Career", "Are internships available?", "The career page lists volunteer, membership, and internship opportunities as they open."],
  ["Shop", "How does checkout work?", "Products are added to cart and checkout opens WhatsApp with your order details."],
];

const eventPartners = [
  { name: "3Mind CO", mark: "3M", tagline: "Event Partner", image: "Our Partner/Screenshot_20260601-232308 - Sultan Farooq.png" },
  { name: "Global Pathways", mark: "GP", tagline: "Sponsor", image: "Our Partner/pathway.png" },
  { name: "K MAK Marketing", mark: "KM", tagline: "Sponsor", image: "Our Partner/images.jpg" },
];
const communityPartners = [
  { name: "TechLink Solution", mark: "TL", tagline: "Community Partner", image: "Our Partner/Community Partner/IMG-20251229-WA0000 - TechLink Solutions LLC.jpg" },
  { name: "Farabi Student Society", mark: "FA", tagline: "Community Partner", image: "Our Partner/Community Partner/FarabiUAPLogoFull - Jawad Ahmad.png" },
  { name: "AWS Cloud", mark: "AW", tagline: "Community Partner", image: "Our Partner/Community Partner/IMG-20260428-WA0024(1) - Israr Khan (31).jpg" },
  { name: "Software Synergy", mark: "SS", tagline: "Community Partner", image: "Our Partner/Community Partner/SoftwareSynergyClub - Muhammad Haris.jpg" },
  { name: "Elarion", mark: "BI", tagline: "Community Partner", image: "Our Partner/Community Partner/IMG-20260216-WA0016 - Khizer khan.jpg" },
];

/* ---------------- Hooks ---------------- */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < breakpoint : false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

function useCurrentRoute(): PageKey {
  const { pathname } = useLocation();
  const found = pages.find((p) => p.path === pathname);
  return found ? found.key : "home";
}

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/* ScrollToTop — route change pe scroll top */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

/* ---------------- SEO Head Component ---------------- */
function SeoHead() {
  const route = useCurrentRoute();
  const { pathname } = useLocation();

  const seoData: Record<string, { title: string; description: string; keywords: string }> = {
    home: {
      title: `${SITE_NAME} | From Ideas to Intelligence - AI Society Pakistan`,
      description: "Pakistan's most ambitious student-led AI society. Learn AI, ML, Data Science, Robotics, and Computer Vision through real projects at Islamia College University Peshawar.",
      keywords: "AI society Pakistan, student AI community, ICU Peshawar, machine learning, data science, robotics, computer vision, AI agents"
    },
    about: {
      title: `About Us | ${SITE_NAME} - AI Society ICU Peshawar`,
      description: "Learn about Sociapi Society's mission to transform students into AI engineers, data scientists, and innovators at Islamia College University Peshawar.",
      keywords: "about Sociapi Society, AI society mission, ICU Peshawar student community"
    },
    chapters: {
      title: `Chapters | ${SITE_NAME} - AI Learning Tracks`,
      description: "Explore Sociapi Society's chapters covering AI, Machine Learning, Deep Learning, Generative AI, Robotics, Computer Vision, BI, and Web Development.",
      keywords: "AI chapters, learning tracks, machine learning, deep learning, generative AI, robotics"
    },
    team: {
      title: `Our Team | ${SITE_NAME} - 20+ AI Leaders`,
      description: "Meet the team behind Sociapi Society. Founders, department leads, designers, event managers, and tech experts building Pakistan's AI future.",
      keywords: "Sociapi Society team, AI leaders, student leaders Pakistan"
    },
    events: {
      title: `Events & Blog | Mehfil AI 2026, Agentum 2026 - ${SITE_NAME}`,
      description: "Discover Sociapi Society's flagship events - Mehfil AI 2026, Agentum 2026 Seminar. Read AI insights, event recaps, and student stories.",
      keywords: "Mehfil AI 2026, Agentum 2026, AI events Pakistan, AI seminar"
    },
    services: {
      title: `Services | UI/UX, Graphic Design, WordPress, Video Editing`,
      description: "Sociapi Society offers premium student-led services: UI/UX design, graphic design, WordPress development, and video editing.",
      keywords: "UI UX design Pakistan, graphic design, WordPress development, video editing"
    },
    partner: {
      title: `Partner With Us | ${SITE_NAME}`,
      description: "Partner with Sociapi Society as an Event, Learning, or Community Partner. Get brand visibility, student access, and co-branded programs.",
      keywords: "partnership, event partner, learning partner, community partner"
    },
    gallery: {
      title: `Gallery | ${SITE_NAME} Events & Moments`,
      description: "View photos from Sociapi Society's flagship events, seminars, and community gatherings at ICU Peshawar.",
      keywords: "Sociapi gallery, event photos, AI event gallery"
    },
    shop: {
      title: `Shop | Official ${SITE_NAME} Wear`,
      description: "Buy official Sociapi Society oversized t-shirts and laptop skins. Premium quality, limited edition student merchandise.",
      keywords: "Sociapi Society shop, official merchandise, oversized t-shirt, laptop skin"
    },
    career: {
      title: `Career | Join ${SITE_NAME} Team`,
      description: "Apply for internships, volunteer positions, and leadership tracks at Sociapi Society.",
      keywords: "AI internships Pakistan, student volunteer, AI career"
    },
    contact: {
      title: `Contact Us | ${SITE_NAME} - ICU Peshawar`,
      description: "Get in touch with Sociapi Society. Email, WhatsApp, or visit us at Islamia College University Peshawar.",
      keywords: "contact Sociapi Society, ICU Peshawar contact"
    },
    reviews: {
      title: `Reviews | What Students Say - ${SITE_NAME}`,
      description: "Read genuine reviews from Sociapi Society students, partners, and event participants.",
      keywords: "Sociapi Society reviews, student testimonials"
    },
    faqs: {
      title: `FAQs | ${SITE_NAME} - Frequently Asked Questions`,
      description: "Find answers about membership, programs, events, partnerships, internships, and shop.",
      keywords: "Sociapi Society FAQ, membership questions"
    },
  };

  const current = seoData[route] || seoData.home;
  const url = `${SITE_URL}${pathname}`;

  const orgSchema = {
    "@context": "https://schema.org", "@type": "Organization",
    "name": SITE_NAME, "alternateName": "Sociapi", "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "description": "Pakistan's most ambitious student-led AI society at Islamia College University Peshawar",
    "foundingDate": "2025-12",
    "founder": { "@type": "Person", "name": "Muhammad Zuhair Zeb" },
    "address": { "@type": "PostalAddress", "streetAddress": "Islamia College University", "addressLocality": "Peshawar", "addressRegion": "KPK", "addressCountry": "PK" },
    "contactPoint": { "@type": "ContactPoint", "telephone": "+92-332-9984490", "contactType": "customer service", "email": "sociapisociety@gmail.com", "availableLanguage": ["English", "Urdu"] },
    "sameAs": ["https://www.instagram.com/sociapi/", "https://www.facebook.com/sociapi/", "https://www.linkedin.com/company/sociapisociety/", "https://x.com/sociapisociety", "https://www.tiktok.com/@sociapi", "https://www.youtube.com/@sociapi"]
  };
  const websiteSchema = {
    "@context": "https://schema.org", "@type": "WebSite", "name": SITE_NAME, "url": SITE_URL,
    "potentialAction": { "@type": "SearchAction", "target": `${SITE_URL}/faqs?q={search_term_string}`, "query-input": "required name=search_term_string" }
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      ...(route !== "home" ? [{ "@type": "ListItem", "position": 2, "name": pages.find(p => p.key === route)?.label || "", "item": url }] : [])
    ]
  };
  const eventSchema = {
    "@context": "https://schema.org", "@type": "Event", "name": "Mehfil AI 2026",
    "description": "Pakistan's flagship student-led AI gathering.", "startDate": "2026-05-15", "endDate": "2026-05-15",
    "eventStatus": "https://schema.org/EventScheduled", "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": { "@type": "Place", "name": "Islamia College University Peshawar", "address": { "@type": "PostalAddress", "addressLocality": "Peshawar", "addressCountry": "PK" } },
    "organizer": { "@type": "Organization", "name": SITE_NAME, "url": SITE_URL }
  };
  const educationalSchema = {
    "@context": "https://schema.org", "@type": "EducationalOrganization", "name": SITE_NAME, "url": SITE_URL,
    "description": "Student-led AI society at ICU Peshawar",
    "address": { "@type": "PostalAddress", "addressLocality": "Peshawar", "addressCountry": "PK" }
  };

  useEffect(() => {
    document.title = current.title;
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", current.description);
    setMeta("keywords", current.keywords);
    setMeta("author", SITE_NAME);
    setMeta("robots", "index, follow");
    setMeta("og:type", "website", true);
    setMeta("og:url", url, true);
    setMeta("og:title", current.title, true);
    setMeta("og:description", current.description, true);
    setMeta("og:image", `${SITE_URL}/og-image.png`, true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("twitter:card", "summary_large_image", true);
    setMeta("twitter:url", url, true);
    setMeta("twitter:title", current.title, true);
    setMeta("twitter:description", current.description, true);
    setMeta("twitter:image", `${SITE_URL}/og-image.png`, true);
    setMeta("twitter:creator", "@sociapisociety", true);
    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = url;
  }, [current, url]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalSchema) }} />
    </>
  );
}

/* ---------------- Shared Components ---------------- */
function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  );
}

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame = 0;
    const total = 80;
    const tick = () => { frame += 1; setCount(Math.round(value * (1 - Math.pow(1 - frame / total, 3)))); if (frame < total) requestAnimationFrame(tick); };
    tick();
  }, [value]);
  return <span>{count}{suffix}</span>;
}

function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return <img src="/logo.png" alt="Sociapi Society Logo" className={`rounded-xl object-contain ${className}`} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />;
}

function Avatar({ src, name, className = "" }: { src?: string; name: string; className?: string }) {
  const [err, setErr] = useState(false);
  const initials = name.replace(/\(.*?\)/g, "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  if (err || !src) return <div className={`grid place-items-center bg-gradient-to-br from-[#517642] via-[#333333] to-[#0c140a] font-heading font-black tracking-wide text-[#7bd355] ${className}`}><span className="text-[1.6em]">{initials}</span></div>;
  return <img src={src} alt={`${name} - Sociapi Society Team Member`} onError={() => setErr(true)} loading="lazy" className={className} />;
}

function SectionTitle({ label, title, copy }: { label?: string; title: string; copy?: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl px-2 text-center">
      {label && <span className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#7bd355]/30 bg-[#7bd355]/[.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-[#7bd355] backdrop-blur-md sm:text-xs"><span className="h-1.5 w-1.5 rounded-full bg-[#7bd355] shadow-[0_0_8px_#7bd355]" />{label}</span>}
      <h2 className="font-heading text-3xl font-black tracking-[-0.04em] sm:text-4xl md:text-6xl"><span className="bg-gradient-to-b from-[#e8ecee] via-[#e8ecee] to-[#939596] bg-clip-text text-transparent">{title}</span></h2>
      <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#7bd355]/70 to-transparent" />
      {copy && <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#939596]">{copy}</p>}
    </Reveal>
  );
}

/* NavLink helper — uses react-router Link */
function NavLink({ to, children, className, onClick }: { to: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  return <Link to={to} className={className} onClick={onClick}>{children}</Link>;
}

function PartnerLogo({ name, mark, tagline, image }: { name: string; mark?: string; tagline: string; image?: string }) {
  const [imgErr, setImgErr] = useState(false);
  const initials = name.replace(/\(.*?\)/g, "").split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  return (
    <div className="logo-card">
      <span className="logo-mark relative overflow-hidden">
        {image && !imgErr ? <img src={image} alt={`${name} - ${tagline}`} className="h-full w-full rounded-xl object-contain" onError={() => setImgErr(true)} /> : <span className="font-heading text-xl font-black text-[#7bd355]">{mark || initials}</span>}
      </span>
      <span className="flex flex-col">
        <span className="font-heading text-base font-bold tracking-tight text-[#e8ecee]">{name}</span>
        <span className="text-xs text-[#939596]">{tagline}</span>
      </span>
    </div>
  );
}

const programIcons = [
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /><circle cx="12" cy="12" r="2" /></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z" /></svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></svg>,
];

/* ---------------- Navigation (Path-based) ---------------- */
function Nav({ route }: { route: PageKey }) {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const scrolled = useScrolled(20);
  const navigate = useNavigate();

  useEffect(() => { setOpen(false); setMoreOpen(false); }, [route]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) { setOpen(false); setMoreOpen(false); } };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNav = (path: string) => { setOpen(false); setMoreOpen(false); navigate(path); };
  const handleJoinCommunity = () => { setOpen(false); window.open(JOIN_COMMUNITY_FORM_URL, "_blank", "noopener,noreferrer"); };

  const linkCls = (key: string) =>
    `inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium transition duration-200 ${route === key ? "bg-[#7bd355]/15 text-[#7bd355] ring-1 ring-[#7bd355]/30" : "text-[#e8ecee]/70 hover:text-[#e8ecee] hover:bg-[#e8ecee]/[.08]"}`;

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <nav className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 sm:px-6 sm:py-3.5 ${scrolled ? "border-[#e8ecee]/[0.14] bg-[#333333]/70" : "border-[#e8ecee]/[0.11] bg-[#333333]/45"}`}>
        <Link to="/" onClick={() => setOpen(false)} className="flex shrink-0 items-center gap-2.5 transition hover:opacity-90">
          <Logo className="h-9 w-9 text-lg" />
          <span className="hidden font-heading text-base font-bold tracking-[0.28em] text-[#e8ecee] sm:block">SOCIAPI</span>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {pages.slice(0, 8).map((page) => (
            <Link key={page.key} className={linkCls(page.key)} to={page.path}>{page.label}</Link>
          ))}
          <div className="relative" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button className={`${linkCls("")} flex items-center gap-1`}>More<span className="mt-px text-[10px]">▼</span></button>
            <div className={`absolute right-0 top-full mt-2 w-52 origin-top-right rounded-2xl border border-[#e8ecee]/12 bg-[#333333]/96 p-2 shadow-2xl backdrop-blur-xl transition-all duration-200 ${moreOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0 pointer-events-none"}`}>
              {pages.slice(8).map((page) => (
                <Link key={page.key} to={page.path} onClick={() => setMoreOpen(false)} className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${route === page.key ? "bg-[#7bd355]/15 text-[#7bd355]" : "text-[#e8ecee]/70 hover:bg-[#e8ecee]/[.08] hover:text-[#e8ecee]"}`}>{page.label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleJoinCommunity} className="magnetic hidden rounded-full bg-[#7bd355] px-6 py-2.5 text-sm font-bold text-[#0c140a] lg:inline-block">Join Community</button>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8ecee]/10 bg-[#e8ecee]/6 text-[#e8ecee] lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><line y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="2" /><line y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="2" /><line y1="13" x2="18" y2="13" stroke="currentColor" strokeWidth="2" /></svg>
          </button>
        </div>
      </nav>

      {open && (
        <>
          <div className="fixed inset-0 z-[-1] bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="mx-auto mt-3 grid max-h-[calc(100vh-120px)] max-w-7xl animate-slide-up gap-1 overflow-y-auto rounded-2xl border border-[#e8ecee]/10 bg-[#333333]/95 p-3 backdrop-blur-xl lg:hidden">
            {pages.map((page) => (
              <Link key={page.key} to={page.path} onClick={() => setOpen(false)} className={`flex items-center justify-between rounded-xl px-4 py-3.5 transition ${route === page.key ? "bg-[#7bd355]/15 text-[#7bd355] font-bold" : "text-[#e8ecee]/75 hover:bg-[#e8ecee]/[.08] hover:text-[#e8ecee]"}`}>
                {page.label}<span className="text-[10px] opacity-50">→</span>
              </Link>
            ))}
            <button onClick={handleJoinCommunity} className="mt-2 block w-full rounded-2xl bg-[#7bd355] py-3.5 text-center text-sm font-bold text-[#0c140a]">Join Community</button>
          </div>
        </>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function ParticleField() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return;
    let w = (canvas.width = canvas.offsetWidth), h = (canvas.height = canvas.offsetHeight);
    const COUNT = isMobile ? 38 : 95, LINK = isMobile ? 110 : 150, mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number; r: number };
    const pts: P[] = Array.from({ length: COUNT }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45, r: Math.random() * 1.8 + 0.7 }));
    const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    canvas.parentElement?.addEventListener("mousemove", onMove); canvas.parentElement?.addEventListener("mouseleave", onLeave); window.addEventListener("resize", onResize);
    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;

        if (d2 < 32000 && d2 > 60) {
          p.x += (dx / Math.sqrt(d2)) * 0.55;
          p.y += (dy / Math.sqrt(d2)) * 0.55;
        }

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < LINK) {
            ctx.strokeStyle = `rgba(123,211,85,${(1 - dist / LINK) * 0.5})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }

        const mdx = pts[i].x - mouse.x;
        const mdy = pts[i].y - mouse.y;
        const md = Math.hypot(mdx, mdy);

        if (md < LINK * 1.4) {
          ctx.strokeStyle = `rgba(232,236,238,${(1 - md / (LINK * 1.4)) * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const p of pts) {
        ctx.fillStyle = "rgba(123,211,85,.9)";
        ctx.shadowColor = "#7bd355";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); canvas.parentElement?.removeEventListener("mousemove", onMove); canvas.parentElement?.removeEventListener("mouseleave", onLeave); window.removeEventListener("resize", onResize); };
  }, [isMobile]);
  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

function KineticWord({ word, className = "", baseDelay = 0, outline = false }: { word: string; className?: string; baseDelay?: number; outline?: boolean }) {
  return <span className={`inline-block whitespace-nowrap ${className}`} aria-label={word}>{word.split("").map((ch, i) => <motion.span key={`${ch}-${i}`} className={`inline-block ${outline ? "outline-text" : ""}`} initial={{ opacity: 0, y: 90, rotateX: 80, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: baseDelay + i * 0.045, ease: [0.22, 1, 0.36, 1] }}>{ch === " " ? "\u00A0" : ch}</motion.span>)}</span>;
}

const heroChips = [
  { icon: "◈", text: "GENERATIVE AI", style: { top: "22%", left: "6%", animationDelay: "0s" } },
  { icon: "⬡", text: "MACHINE LEARNING", style: { top: "16%", right: "7%", animationDelay: "1.2s" } },
  { icon: "◉", text: "COMPUTER VISION", style: { top: "48%", left: "3%", animationDelay: "2.1s" } },
  { icon: "▣", text: "ROBOTICS", style: { top: "44%", right: "4%", animationDelay: "0.7s" } },
  { icon: "◬", text: "DATA SCIENCE", style: { top: "70%", left: "9%", animationDelay: "1.6s" } },
  { icon: "⬢", text: "AI AGENTS", style: { top: "66%", right: "10%", animationDelay: "2.6s" } },
];

function Hero() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 40 });
  const onMove = (e: React.MouseEvent) => { if (isMobile) return; setTilt({ x: (e.clientX / innerWidth - 0.5) * 18, y: (e.clientY / innerHeight - 0.5) * 18 }); setSpot({ x: (e.clientX / innerWidth) * 100, y: (e.clientY / innerHeight) * 100 }); };

  return (
    <>
      <section className="relative -mt-[88px] flex min-h-screen flex-col overflow-hidden bg-[#050705] text-[#e8ecee]" onMouseMove={onMove}>
        <div className="hero-aurora" />
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true"><div className="hero-beam" /><div className="hero-beam" /><div className="hero-beam" /></div>
        <div className="hero-floor" />
        <div className="hero-spotlight" style={{ "--sx": `${spot.x}%`, "--sy": `${spot.y}%` } as React.CSSProperties} />
        <div className="absolute inset-0"><ParticleField /></div>
        {!isMobile && <div className="pointer-events-none absolute inset-0 grid place-items-center" style={{ transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0)` }} aria-hidden="true"><div className="orbit-ring h-[46vw] w-[46vw]" style={{ "--dur": "44s" } as React.CSSProperties} /><div className="orbit-ring orbit-ring--dashed absolute h-[60vw] w-[60vw]" style={{ "--dur": "70s" } as React.CSSProperties} /><div className="orbit-ring absolute h-[33vw] w-[33vw]" style={{ "--dur": "28s" } as React.CSSProperties} /></div>}
        {!isMobile && heroChips.map((c) => <motion.div key={c.text} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4 + Math.random() * 0.6, duration: 0.6 }} className="float-chip z-10" style={c.style as React.CSSProperties}><i className="text-[#7bd355]">{c.icon}</i>{c.text}</motion.div>)}
        <div className="noise-overlay" />

        <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 pb-10 pt-32 text-center sm:pt-36">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="hero-eyebrow mb-8 text-[11px] font-bold uppercase tracking-[0.32em] text-[#e8ecee] sm:text-xs"><span className="pulse-dot" />Official Digital Headquarters<span className="text-[#7bd355]">· EST 2025</span></motion.div>
          <h1 className="font-heading text-[clamp(2.8rem,10.5vw,7.8rem)] font-black leading-[0.88] tracking-[-0.05em] sm:tracking-[-0.07em]" style={{ perspective: "800px" }}>
            <KineticWord word="FROM IDEAS" outline baseDelay={0.35} className="mr-[0.22em]" /><br /><span className="shine-text"><KineticWord word="TO INTELLIGENCE" baseDelay={0.85} /></span>
          </h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 1.7, ease: [0.22, 1, 0.36, 1] }} className="mt-7 h-px w-44 origin-center bg-gradient-to-r from-transparent via-[#7bd355] to-transparent sm:w-72" />
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.85 }} className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-[#e8ecee]/85 sm:text-xl">Pakistan's most ambitious student-led AI society — turning <span className="font-semibold text-[#7bd355]">textbook theory</span> into <span className="font-semibold text-[#e8ecee]">production-grade portfolios</span>.</motion.p>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.05 }} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => window.open(JOIN_COMMUNITY_FORM_URL, "_blank", "noopener,noreferrer")} className="cta-premium text-base"><span>Join the Society<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></span></button>
            <button onClick={() => navigate("/chapters")} className="cta-ghost text-base"><svg className="h-4 w-4 text-[#7bd355]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20 15.3 15.3 0 010-20z" /></svg>Explore Chapters</button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 2.3 }} className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {stats.map(([value, label, suffix]) => <div key={label} className="stat-glass text-left" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`); }}><strong><CountUp value={value} suffix={suffix} /></strong><p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#939596] sm:text-[13px]">{label}</p></div>)}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 1 }} className="mt-12 flex flex-col items-center gap-2.5"><div className="scroll-cue"><span /></div><p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#939596]">Scroll</p></motion.div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[#070907] to-transparent" />
      </section>
      <div className="marquee-strip relative z-10" aria-hidden="true">{[0, 1].map((k) => <div key={k} className="marquee-inner">{panels.map((p) => <React.Fragment key={`${k}-${p}`}><span>{p}</span><i>✦</i></React.Fragment>)}</div>)}</div>
    </>
  );
}

/* ---------------- Content Sections ---------------- */
function FounderShowcase() {
  const f = teamMembers[0];
  return <section className="section"><SectionTitle label="Founder Showcase" title="Built by students who ship." copy="A leadership profile designed around execution, mentorship, and measurable student outcomes." /><Reveal className="mx-auto grid max-w-6xl items-center gap-6 rounded-[2rem] border border-[#e8ecee]/10 bg-[#e8ecee]/[.06] p-5 shadow-2xl shadow-[#7bd355]/10 backdrop-blur-2xl sm:gap-8 sm:rounded-[2.5rem] sm:p-6 md:grid-cols-[.9fr_1.1fr] md:p-10"><Avatar src={f.image} name={f.name} className="mx-auto aspect-[4/5] w-full max-w-xs rounded-[1.5rem] object-cover grayscale transition duration-500 hover:grayscale-0 sm:max-w-none sm:rounded-[2rem]" /><div><p className="text-base text-[#7bd355]">Founder & President</p><h3 className="mt-2 font-heading text-3xl font-black text-[#e8ecee] sm:text-5xl">{f.name}</h3><p className="mt-5 text-lg leading-8 text-[#939596]">{f.bio}</p><div className="mt-6 flex flex-wrap gap-2">{f.skills.map((s) => <span key={s} className="rounded-full border border-[#7bd355]/25 bg-[#7bd355]/10 px-4 py-2 text-sm text-[#d9ffd0]">{s}</span>)}</div><a className="mt-8 inline-flex rounded-full bg-[#e8ecee] px-6 py-3 text-base font-bold text-[#0c140a]" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn Profile</a></div></Reveal></section>;
}

function TimelineSection() {
  return <section className="section"><SectionTitle label="Startup Journey" title="A timeline with velocity." copy="From founding moment to flagship AI gatherings." /><div className="mx-auto max-w-6xl"><div className="relative grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4"><div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-[#7bd355] to-transparent lg:block" />{timeline.map((item, i) => <Reveal key={item[0]} delay={i * 0.1} className="rounded-[1.75rem] border border-[#e8ecee]/10 bg-[#e8ecee]/[.055] p-6 backdrop-blur-xl sm:rounded-[2rem]"><div className="mb-5 h-4 w-4 rounded-full bg-[#7bd355] shadow-[0_0_30px_#7bd355]" /><p className="text-base text-[#7bd355]">{item[0]}</p><h3 className="mt-2 font-heading text-xl font-bold text-[#e8ecee] sm:text-2xl">{item[1]}</h3><p className="mt-3 text-base leading-relaxed text-[#939596]">{item[2]}</p></Reveal>)}</div></div></section>;
}

function Organogram() {
  const isMobile = useIsMobile();
  const nodes = ["Co Founder", "Teacher Advisor", "General Secretary", "HR Manager", "Project Manager", "Event Manager", "Technical Team", "Women Wing", "Media Team", "Graphics Team", "Outreach Team", "Organizing Team"];
  if (isMobile) return <section className="section"><SectionTitle label="Organogram" title="A living organization map." /><div className="mx-auto max-w-md rounded-[2rem] border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] p-6"><div className="mx-auto mb-6 grid h-28 w-28 place-items-center rounded-full border-2 border-[#7bd355]/40 bg-gradient-to-br from-[#7bd355]/20 to-transparent font-heading text-xl font-black text-[#7bd355] shadow-[0_0_36px_rgba(123,211,85,.3)]">Founder</div><div className="mx-auto mb-6 h-8 w-px bg-gradient-to-b from-[#7bd355] to-transparent" /><div className="grid grid-cols-2 gap-3">{nodes.map((n) => <div key={n} className="rounded-2xl border border-[#7bd355]/20 bg-[#333333]/70 px-3 py-3 text-center text-sm font-medium text-[#e8ecee]/85">{n}</div>)}</div></div></section>;
  return <section className="section"><SectionTitle label="Organogram" title="A living organization map." /><div className="org-map mx-auto max-w-6xl"><div className="org-core">Founder</div>{nodes.map((n, i) => <div key={n} className="org-node" style={{ "--a": `${i * 30}deg` } as React.CSSProperties}>{n}</div>)}</div></section>;
}

function TeamGalaxy({ full = false }: { full?: boolean }) {
  const isMobile = useIsMobile(); const [selected, setSelected] = useState<Member | null>(null); const [query, setQuery] = useState(""); const [department, setDepartment] = useState("All"); const [rot, setRot] = useState(0);
  useEffect(() => { if (isMobile) return; let raf = 0; const start = performance.now(); const tick = (t: number) => { setRot((((t - start) / 120000) * 360) % 360); raf = requestAnimationFrame(tick); }; raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf); }, [isMobile]);
  const departments = ["All", ...Array.from(new Set(teamMembers.map((m) => m.department)))];
  const filtered = teamMembers.filter((m) => (department === "All" || m.department === department) && m.name.toLowerCase().includes(query.toLowerCase()));
  const visible = full ? filtered : teamMembers;
  return (
    <section className="section" id="team-section">
      <SectionTitle label="Interactive Team Galaxy" title="People arranged like a network." />
      {full && <div className="mx-auto mb-8 flex max-w-5xl flex-col gap-3 px-1 sm:flex-row"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search team members..." className="glass-input flex-1" /><select value={department} onChange={(e) => setDepartment(e.target.value)} className="glass-input sm:max-w-xs">{departments.map((d) => <option key={d}>{d}</option>)}</select></div>}
      {isMobile ? (
        <div className="mx-auto max-w-md px-1">
          <button onClick={() => setSelected(visible[0] ?? teamMembers[0])} className="mx-auto mb-6 flex w-full flex-col items-center rounded-[1.75rem] border border-[#7bd355]/40 bg-gradient-to-b from-[#7bd355]/10 to-transparent p-5 shadow-[0_0_40px_rgba(123,211,85,.18)]"><Avatar src={teamMembers[0].image} name={teamMembers[0].name} className="h-28 w-28 rounded-full object-cover ring-2 ring-[#7bd355]/60" /><p className="mt-3 font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#7bd355]">Founder & President</p><p className="mt-1 text-center text-base font-bold text-[#e8ecee]">{teamMembers[0].name}</p></button>
          <div className="grid grid-cols-2 gap-3 xs:grid-cols-3">{visible.filter((m) => m.orbit !== 0).map((m) => <button key={m.name} onClick={() => setSelected(m)} className="group flex flex-col items-center rounded-2xl border border-[#e8ecee]/10 bg-[#e8ecee]/[.05] p-3 transition active:scale-95 hover:border-[#7bd355]/40"><Avatar src={m.image} name={m.name} className="h-16 w-16 rounded-full object-cover ring-1 ring-[#e8ecee]/10 transition group-hover:ring-[#7bd355]/50" /><p className="mt-2 line-clamp-1 w-full text-center text-[10px] font-bold text-[#e8ecee]/90">{m.name.split(" ").slice(0, 2).join(" ")}</p><p className="mt-0.5 line-clamp-1 w-full text-center text-[9px] text-[#7bd355]/80">{m.role}</p></button>)}</div>
        </div>
      ) : (
        <div className="team-galaxy mx-auto" style={{ "--galaxy-deg": `${rot}deg` } as React.CSSProperties}><div className="galaxy-rings" />{visible.map((m) => <button key={m.name} onClick={(e) => { e.stopPropagation(); setSelected(m); }} className={`member-orb ${m.orbit === 0 ? "founder-orb" : ""}`} style={{ "--angle": `${m.angle}deg`, "--radius": `${m.orbit === 0 ? 0 : 50 + m.orbit * 130}px` } as React.CSSProperties} aria-label={`View ${m.name}`}><Avatar src={m.image} name={m.name} className="h-full w-full rounded-full object-cover" /><span>{m.role}</span></button>)}</div>
      )}
      {!full && <div className="mt-10 text-center"><Link to="/team" className="magnetic inline-flex rounded-full border border-[#e8ecee]/15 bg-[#e8ecee]/8 px-7 py-3.5 text-base font-bold text-[#e8ecee]">View Full Team →</Link></div>}
      {full && <PastMembersSection />}
      {selected && <ProfileModal member={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function PastMembersSection() {
  return (
    <section className="section section-tight pt-2 sm:pt-4">
      <SectionTitle label="Past Members" title="Former contributors who helped shape the mission." copy="A dedicated tribute to the alumni and past volunteers who carried the society forward through leadership, design, media, logistics, and events." />
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {pastMembers.map((member, index) => (
          <Reveal key={`${member.name}-${index}`} delay={index * 0.02} className="group h-full">
            <div className="rounded-[1.5rem] border border-[#e8ecee]/10 bg-[#e8ecee]/[.05] p-4 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-[#7bd355]/40">
              <Avatar src={member.image} name={member.name} className="mx-auto h-24 w-24 rounded-full object-cover ring-2 ring-[#7bd355]/20 transition group-hover:ring-[#7bd355]/60 sm:h-28 sm:w-28" />
              <h3 className="mt-4 font-heading text-base font-bold text-[#e8ecee] sm:text-lg">{member.name}</h3>
              <p className="mt-1 text-sm text-[#7bd355]">{member.role}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProfileModal({ member, onClose }: { member: Member; onClose: () => void }) {
  useEffect(() => { const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose(); addEventListener("keydown", onKey); return () => removeEventListener("keydown", onKey); }, [onClose]);
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-black/80 p-4 backdrop-blur-lg" role="dialog" aria-modal="true" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.3 }} className="relative my-auto w-full max-w-3xl rounded-[1.75rem] border border-[#e8ecee]/15 bg-[#333333]/95 p-5 text-[#e8ecee] shadow-2xl shadow-[#7bd355]/20 sm:rounded-[2rem] sm:p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
        <button className="absolute right-3 top-3 rounded-full bg-[#e8ecee]/10 px-3 py-1 transition hover:bg-[#e8ecee]/20 sm:right-4 sm:top-4" onClick={onClose} aria-label="Close">✕</button>
        <div className="grid gap-5 sm:gap-6 md:grid-cols-[220px_1fr]"><Avatar src={member.image} name={member.name} className="h-56 w-full rounded-2xl object-cover sm:h-64 sm:rounded-3xl" /><div><p className="text-base text-[#7bd355]">{member.department}</p><h3 className="font-heading text-2xl font-black sm:text-4xl">{member.name}</h3><p className="mt-1 text-lg text-[#939596]">{member.role}</p><p className="mt-5 text-base leading-relaxed text-[#e8ecee]/80">{member.bio}</p><div className="mt-5 flex flex-wrap gap-2">{member.skills.map((s) => <span key={s} className="rounded-full bg-[#e8ecee]/10 px-3 py-1 text-sm">{s}</span>)}</div><div className="mt-6 flex gap-3"><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="rounded-full bg-[#7bd355] px-4 py-2 text-sm font-bold text-[#0c140a]">LinkedIn</a><a href="https://instagram.com/" target="_blank" rel="noreferrer" className="rounded-full border border-[#e8ecee]/15 px-4 py-2 text-sm">Instagram</a></div></div></div>
      </motion.div>
    </div>
  );
}

function FeatureSections() { const features = ["Real Projects", "Guidance & Mentorship", "Learn AI Skills", "Build Smart Projects", "Explore Machine Learning"]; return <section className="section"><SectionTitle label="Programs" title="From classroom theory to production portfolios." /><div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-5">{features.map((f, i) => <Reveal key={f} delay={i * 0.08} className="group relative h-full overflow-hidden rounded-[1.5rem] border border-[#e8ecee]/10 bg-gradient-to-b from-[#e8ecee]/[.09] to-transparent p-5 text-center backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2.5 hover:border-[#7bd355]/40 sm:rounded-[2rem] sm:p-7"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#7bd355]/15 text-[#7bd355] shadow-inner transition group-hover:bg-[#7bd355] group-hover:text-[#0c140a] sm:h-16 sm:w-16 sm:rounded-2xl [&_svg]:h-6 [&_svg]:w-6 sm:[&_svg]:h-8 sm:[&_svg]:w-8">{programIcons[i]}</div><p className="mt-3 font-heading text-xs tracking-[.25em] text-[#7bd355] sm:mt-4">0{i + 1}</p><h3 className="mt-2 font-heading text-base font-bold leading-tight text-[#e8ecee] sm:text-xl">{f}</h3></Reveal>)}</div></section>; }

function TechTracks() { const tracks = [{ tag: "AI", title: "Artificial Intelligence", copy: "Foundational and applied AI tracks." }, { tag: "ML", title: "Machine Learning", copy: "Hands-on ML projects." }, { tag: "DL", title: "Deep Learning", copy: "Neural networks and transformers." }, { tag: "GenAI", title: "Generative AI", copy: "LLMs, agents, RAG systems." }, { tag: "RB", title: "Robotics & Automation", copy: "Smart systems and automation." }, { tag: "CV", title: "Computer Vision", copy: "OpenCV and visual intelligence." }, { tag: "BI", title: "Business Intelligence", copy: "Power BI and analytics." }, { tag: "WEB", title: "Web Development", copy: "Modern frontend and AI-powered apps." }]; return <section className="section"><SectionTitle label="Learning Tracks" title="Eight tracks. One trajectory." /><div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{tracks.map((t, i) => <Reveal key={t.title} delay={(i % 4) * 0.07} className="group relative h-full overflow-hidden rounded-[1.5rem] border border-[#e8ecee]/10 bg-[#e8ecee]/[.05] p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-[#7bd355]/40 sm:rounded-[1.75rem]"><span className="font-heading text-sm tracking-[.3em] text-[#7bd355]">{t.tag}</span><h3 className="mt-3 font-heading text-xl font-bold text-[#e8ecee]">{t.title}</h3><p className="mt-3 text-base leading-relaxed text-[#939596]">{t.copy}</p></Reveal>)}</div></section>; }

function HowItWorks() { const steps = [["01", "Apply", "Submit your application."], ["02", "Orient", "Join an orientation cohort."], ["03", "Build", "Work on real projects."], ["04", "Ship", "Present and build portfolio."]]; return <section className="section"><SectionTitle label="How It Works" title="A four-step pipeline." /><div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">{steps.map(([n, t, c], i) => <Reveal key={n} delay={i * 0.08} className="rounded-[1.5rem] border border-[#e8ecee]/10 bg-gradient-to-b from-[#e8ecee]/[.08] to-transparent p-6 backdrop-blur-xl sm:rounded-[1.75rem]"><div className="font-heading text-4xl font-black text-[#7bd355]/80 sm:text-5xl">{n}</div><h3 className="mt-3 font-heading text-xl font-bold text-[#e8ecee] sm:text-2xl">{t}</h3><p className="mt-3 text-base leading-relaxed text-[#939596]">{c}</p></Reveal>)}</div></section>; }

function Testimonials() { return <section className="section"><SectionTitle label="Reviews" title="Voices from the community." /><div className="testimonial-track">{[...reviews, ...reviews].map((r, i) => <blockquote key={`${r}-${i}`} className="testimonial-card">"{r}"<footer>Student Member</footer></blockquote>)}</div></section>; }

function FeaturedIn() { return <section className="section section-tight"><Reveal className="mx-auto max-w-6xl rounded-[2rem] border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] p-6 backdrop-blur-xl sm:rounded-[2.5rem] sm:p-8"><p className="text-center text-xs uppercase tracking-[.3em] text-[#939596] sm:tracking-[.4em]">Event Partners &amp; Sponsors</p><div className="mt-7 grid gap-4 sm:grid-cols-3">{eventPartners.map((p) => <PartnerLogo key={p.name} {...p} />)}</div></Reveal></section>; }

function CommunityPartnersSection() {
  return <section className="section"><SectionTitle label="Community Partners" title="A partner-ready AI society." /><div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{communityPartners.map((p, i) => <Reveal key={p.name} delay={(i % 3) * 0.08}><PartnerLogo {...p} /></Reveal>)}</div><div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">{stats.map(([v, l, s]) => <div className="stat-card" key={l}><strong><CountUp value={v} suffix={s} /></strong><p>{l}</p></div>)}</div>
    <Reveal className="mx-auto mt-12 max-w-6xl rounded-[2rem] border border-[#7bd355]/20 bg-[#7bd355]/10 p-6 text-center sm:rounded-[2.5rem] sm:p-8"><h3 className="font-heading text-2xl font-black text-[#e8ecee] sm:text-4xl">Join Sociapi Society Today.</h3><p className="mx-auto mt-3 max-w-2xl text-lg text-[#939596]">Enter the community building future AI engineers.</p><button onClick={() => window.open(JOIN_COMMUNITY_FORM_URL, "_blank", "noopener,noreferrer")} className="magnetic mt-6 inline-flex rounded-full bg-[#7bd355] px-8 py-4 text-base font-bold text-[#0c140a]">Start Membership</button></Reveal>
  </section>;
}

function NewsletterCta() { const [done, setDone] = useState(false); return <section className="section"><Reveal className="mx-auto grid max-w-6xl gap-6 overflow-hidden rounded-[2rem] border border-[#e8ecee]/10 bg-gradient-to-br from-[#7bd355]/15 via-[#517642]/10 to-transparent p-6 backdrop-blur-2xl sm:gap-8 sm:rounded-[2.5rem] sm:p-8 md:grid-cols-[1.2fr_1fr] md:p-12"><div><p className="text-xs uppercase tracking-[.3em] text-[#7bd355]">Newsletter</p><h3 className="mt-3 font-heading text-2xl font-black text-[#e8ecee] sm:text-4xl md:text-5xl">Get the weekly AI signal.</h3><p className="mt-4 max-w-md text-lg text-[#939596]">Curated resources, event invites, updates. Once a week.</p></div><form className="flex flex-col gap-3 self-center" onSubmit={(e: FormEvent) => { e.preventDefault(); setDone(true); }}><input required type="email" className="glass-input" placeholder="you@university.edu" /><button className="rounded-full bg-[#7bd355] px-6 py-4 font-bold text-[#0c140a]">{done ? "Subscribed ✓" : "Subscribe"}</button><p className="text-sm text-[#939596]">Unsubscribe anytime.</p></form></Reveal></section>; }

/* ---------------- Pages ---------------- */
function HomePage() { return <><Hero /><FeaturedIn /><FounderShowcase /><FeatureSections /><TechTracks /><HowItWorks /><TimelineSection /><Organogram /><TeamGalaxy /><Testimonials /><CommunityPartnersSection /><NewsletterCta /></>; }

function AboutPage() {
  const leaders = [teamMembers[0], teamMembers[1], teamMembers[2]]; const roles = ["Founder & President", "Co-Founder", "Teacher Advisor"];
  return <main><section className="section pt-28"><SectionTitle label="About Us" title="Sociapi Society decodes the future." copy="A student-led community transforming ideas into practical projects at ICU Peshawar." /><div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">{leaders.map((m, i) => <Reveal key={m.name} delay={i * 0.1} className="group relative h-full overflow-hidden rounded-[2rem] border border-[#e8ecee]/10 bg-gradient-to-b from-[#e8ecee]/[.08] to-[#e8ecee]/[.02] p-6 text-center backdrop-blur-2xl transition hover:-translate-y-2 hover:border-[#7bd355]/40 sm:rounded-[2.25rem] sm:p-7"><Avatar src={m.image} name={m.name} className="mx-auto mb-5 h-36 w-36 rounded-full object-cover shadow-xl ring-[4px] ring-[#e8ecee]/10 grayscale transition duration-500 group-hover:grayscale-0 group-hover:ring-[#7bd355]/50 sm:h-44 sm:w-44" /><p className="text-sm font-bold uppercase tracking-[.25em] text-[#7bd355] sm:tracking-[.3em]">{roles[i]}</p><h3 className="mt-2 font-heading text-2xl font-black text-[#e8ecee] sm:text-3xl">{m.name}</h3><p className="mt-3 text-base leading-relaxed text-[#939596]">{m.bio}</p><div className="mt-5 flex flex-wrap justify-center gap-2">{m.skills.map((s) => <span key={s} className="rounded-full border border-[#7bd355]/20 bg-[#7bd355]/10 px-3 py-1 text-xs font-medium text-[#d9ffd0]">{s}</span>)}</div></Reveal>)}</div></section><TimelineSection /></main>;
}

function EmailForm({ kind }: { kind: "Partnership" | "Career" | "Contact" }) { return <form action="https://formsubmit.co/sociapisociety@gmail.com" method="POST" className="mx-auto grid max-w-3xl gap-4 rounded-[1.75rem] border border-[#e8ecee]/10 bg-[#e8ecee]/[.06] p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-6"><input type="hidden" name="_subject" value={`${kind} inquiry from Sociapi website`} /><div className="grid gap-4 md:grid-cols-2"><input required name="name" className="glass-input" placeholder="Name" /><input name="organization" className="glass-input" placeholder="Organization" /><input required type="email" name="email" className="glass-input" placeholder="Email" /><input name="phone" className="glass-input" placeholder="Phone" /></div><select name="type" className="glass-input"><option>{kind === "Partnership" ? "Event Partner" : kind === "Career" ? "Internship" : "General Inquiry"}</option><option>Learning Partner</option><option>Community Partner</option><option>Volunteer</option><option>Membership</option></select><textarea required name="message" className="glass-input min-h-32" placeholder="Message" /><button className="rounded-full bg-[#7bd355] px-7 py-4 font-bold text-[#0c140a]">Submit</button></form>; }

/* Events Blog */
const blogPosts = [
  { id: "mehfil-ai-2026", title: "Mehfil AI 2026", category: "Flagship Event", read: "6 min", image: "Image/1.png?auto=format&fit=crop&w=1200&q=80", date: "May 15, 2026", excerpt: "Mehfil AI is Sociapi Society's flagship AI gathering.", content: `Mehfil AI 2026 marks a new era of student-led AI gatherings.\n\nEvent Overview\nOrganized to spread AI awareness and practical skills.\n\nConclusion\nMehfil AI became a platform for inspiration and innovation.` },
  { id: "agentum-2026", title: "Agentum 2026 Seminar", category: "AI Agents & Automation", read: "5 min", image: "Image/Agentum Pic/13.png?auto=format&fit=crop&w=1200&q=80", date: "Feb 17, 2026", excerpt: "AGENTUM 2026 brought 150+ students to explore AI agents.", content: `The AGENTUM 2026 Seminar was held on 17 Feb 2026.\n\nFocused on AI, automation, and robotics.\n\nConclusion\nA successful event for understanding AI and robotics.` },
];

function BlogPostView({ postId, onClose }: { postId: string; onClose: () => void }) { const post = blogPosts.find((p) => p.id === postId); if (!post) return null; return <div className="fixed inset-0 z-[90] overflow-y-auto bg-[#070907] pb-20"><button onClick={onClose} className="fixed right-5 top-5 z-[95] flex h-11 w-11 items-center justify-center rounded-full border border-[#e8ecee]/20 bg-black/80 text-lg text-[#e8ecee] backdrop-blur-xl transition hover:bg-[#7bd355] hover:text-black" aria-label="Close">✕</button><div className="relative h-[50vh] w-full overflow-hidden sm:h-[70vh]"><img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover" style={{ filter: "brightness(0.45)" }} /><div className="absolute inset-0 bg-gradient-to-t from-[#070907] via-[#070907]/40 to-transparent" /><div className="absolute bottom-0 left-0 right-0 px-5 pb-8 sm:px-16 sm:pb-10"><span className="inline-block border-l-4 border-[#7bd355] pl-3 font-mono text-xs uppercase tracking-[0.3em] text-[#7bd355]">{post.category}</span><h1 className="mt-4 font-heading text-3xl font-black text-[#e8ecee] sm:text-6xl">{post.title}</h1></div></div><article className="mx-auto max-w-3xl px-5 pt-10 sm:px-10"><div className="whitespace-pre-line text-lg leading-[1.85] text-[#e8ecee]/80">{post.content.split("\n\n").map((p, i) => <p key={i} className="mb-5">{p}</p>)}</div></article></div>; }

function EventsBlogPage() { const [q, setQ] = useState(""); const [viewId, setViewId] = useState<string | null>(null); const posts = blogPosts.filter((p) => p.title.toLowerCase().includes(q.toLowerCase())); if (viewId) return <BlogPostView postId={viewId} onClose={() => setViewId(null)} />; const [featured, ...rest] = posts; return <main className="section pt-28"><div className="mx-auto mb-12 max-w-6xl"><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-[#7bd355]">Events &amp; Blog</p><h2 className="font-heading text-4xl font-black leading-[0.9] text-[#e8ecee] sm:text-7xl">The AI<br /><span className="text-[#939596]/60">Chronicle.</span></h2></div><input className="glass-input md:max-w-xs" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." /></div></div><div className="mx-auto max-w-6xl space-y-5">{featured && <article onClick={() => setViewId(featured.id)} className="group cursor-pointer overflow-hidden rounded-[1.75rem] border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] backdrop-blur-xl transition hover:border-[#7bd355]/30 sm:rounded-[2rem]"><div className="grid md:grid-cols-[1.1fr_0.9fr]"><div className="relative min-h-[280px] overflow-hidden sm:min-h-[420px]"><img src={featured.image} alt={featured.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" style={{ filter: "brightness(0.75)" }} /></div><div className="flex flex-col justify-center p-6 sm:p-10"><span className="mb-4 border-l-2 border-[#7bd355] pl-3 font-mono text-xs uppercase tracking-[0.35em] text-[#7bd355]">{featured.category}</span><h2 className="font-heading text-2xl font-black text-[#e8ecee] transition group-hover:text-[#7bd355] sm:text-4xl">{featured.title}</h2><p className="mt-5 text-base text-[#939596]">{featured.excerpt}</p><span className="mt-8 inline-flex items-center gap-2 font-heading text-base font-bold text-[#7bd355]">Read Full Article →</span></div></div></article>}{rest.length > 0 && <div className="grid gap-5 md:grid-cols-2">{rest.map((p) => <article key={p.id} onClick={() => setViewId(p.id)} className="group cursor-pointer overflow-hidden rounded-[1.5rem] border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#7bd355]/30 sm:rounded-[1.75rem]"><div className="flex flex-col sm:flex-row"><div className="relative min-h-[160px] w-full shrink-0 overflow-hidden sm:min-h-[200px] sm:w-44"><img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" style={{ filter: "brightness(0.7)" }} /></div><div className="flex flex-col justify-center p-5 sm:p-6"><span className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-[#7bd355]">{p.category}</span><h3 className="font-heading text-lg font-black text-[#e8ecee] transition group-hover:text-[#7bd355] sm:text-xl">{p.title}</h3><p className="mt-3 text-sm text-[#939596]">{p.excerpt}</p></div></div></article>)}</div>}</div></main>; }

function ServicesPage() { return <main className="section pt-28 sm:pt-32"><SectionTitle label="Services" title="Creative and technical services." /><div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-4">{servicesData.map((s, i) => <Reveal key={s} delay={i * 0.08}><div className="service-card"><span>0{i + 1}</span><h3>{s}</h3><p>Strategy, execution, iteration, and delivery.</p></div></Reveal>)}</div></main>; }

function PartnerPage() { return <main className="section pt-28 sm:pt-32"><SectionTitle label="Partner With Us" title="Partnership built like a workflow." /><div className="mx-auto mb-10 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">{["Event Partner", "Learning Partner", "Community Partner"].map((p, i) => <Reveal key={p} delay={i * 0.1}><a href="https://forms.gle/DsNKNvBBXGUmhDuVA" target="_blank" rel="noreferrer" className="block h-full rounded-[1.75rem] border border-[#7bd355]/30 bg-gradient-to-b from-[#7bd355]/[.08] to-transparent p-6 backdrop-blur-xl transition hover:-translate-y-1.5 hover:border-[#7bd355]/50 sm:rounded-[2rem]"><h3 className="font-heading text-xl font-bold text-[#e8ecee] sm:text-2xl">{p} ↗</h3><p className="mt-4 text-base text-[#939596]">Brand presence, student access, speaking opportunities.</p><span className="mt-4 inline-block rounded-full bg-[#7bd355] px-4 py-2 text-sm font-bold text-[#0c140a]">Apply</span></a></Reveal>)}</div><TimelineSection /><EmailForm kind="Partnership" /></main>; }

function GalleryPage() { const [index, setIndex] = useState<number | null>(null); return <main className="section pt-28 sm:pt-32"><SectionTitle label="Gallery" title="Moments in motion." /><div className="masonry mx-auto max-w-7xl">{galleryImages.map((src, i) => <button key={src + i} onClick={() => setIndex(i)} className="mb-4 block overflow-hidden rounded-[1.25rem] border border-[#e8ecee]/10 bg-[#e8ecee]/[.05] p-2 sm:rounded-[1.5rem]"><img src={src} alt={`Sociapi event ${i + 1}`} loading="lazy" className="w-full rounded-[1rem] object-cover transition duration-500 hover:scale-105" /></button>)}</div>{index !== null && <Lightbox index={index} setIndex={setIndex} total={galleryImages.length} />}</main>; }

function Lightbox({ index, setIndex, total }: { index: number; setIndex: (v: number | null) => void; total: number }) { return <div className="fixed inset-0 z-[90] grid place-items-center bg-black/90 p-4"><button onClick={() => setIndex(null)} className="absolute right-5 top-5 z-10 rounded-full bg-[#e8ecee]/15 px-4 py-2 text-[#e8ecee]">✕</button><button onClick={() => setIndex((index + total - 1) % total)} className="absolute left-3 z-10 rounded-full bg-[#e8ecee]/15 px-3 py-2 text-[#e8ecee] sm:left-5">Prev</button><img src={galleryImages[index]} alt="Gallery preview" className="max-h-[85vh] max-w-[85vw] rounded-2xl object-contain" /><button onClick={() => setIndex((index + 1) % total)} className="absolute right-3 z-10 rounded-full bg-[#e8ecee]/15 px-3 py-2 text-[#e8ecee] sm:right-5">Next</button></div>; }

/* ---------------- Shop (premium storefront) ---------------- */
type ShopProduct = {
  id: string;
  category: "Official Society Wear" | "Accessories";
  gender: string;
  name: string;
  image: string;
  description: string;
  features: string[];
  badge: string;
  delivery: string;
  price: number;
  sizes: string[];
};

const shopCollections: { title: string; subtitle: string; items: ShopProduct[]; futureDrops: string[] }[] = [
  {
    title: "Official Society Wear",
    subtitle: "Premium apparel built for the SOCIAPI community.",
    futureDrops: ["Hoodie", "Cap", "Sticker Pack"],
    items: [
      {
        id: "mens-shirt",
        category: "Official Society Wear",
        gender: "Male",
        name: "Men's Premium Baggy T Shirt",
        image: "/Image/OVERSIZED Male.png",
        description: "Premium cotton blend with an oversized silhouette and front logo print.",
        features: ["Premium Cotton Blend", "Oversized Baggy Fit", "Front Logo Print", "Breathable Fabric", "Made on Demand"],
        badge: "Best Seller",
        delivery: "PKR 200",
        price: 1499,
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      },
      {
        id: "womens-shirt",
        category: "Official Society Wear",
        gender: "Female",
        name: "Women's Oversized T Shirt",
        image: "/Image/OVERSIZED Female.png",
        description: "A relaxed oversized silhouette engineered for confidence, comfort, and daily wear.",
        features: ["Premium Cotton Blend", "Relaxed Oversized Fit", "Front Logo Print", "Breathable Fabric", "Made on Demand"],
        badge: "Women Drop",
        delivery: "PKR 200",
        price: 1499,
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      },
    ],
  },
  {
    title: "Accessories",
    subtitle: "Clean, premium essentials for every setup.",
    futureDrops: ["Bottle", "Notebook"],
    items: [
      {
        id: "laptop-skin",
        category: "Accessories",
        gender: "N/A",
        name: "Laptop Back Skin",
        image: "Image/laptop back skin.png",
        description: "Matte vinyl protection with a bubble-free finish for a clean, elevated look.",
        features: ["Premium Matte Vinyl", "Bubble Free Application", "Easy Peel", "Scratch Resistant", "Fits 13–16 inch laptops"],
        badge: "New",
        delivery: "PKR 200",
        price: 899,
        sizes: ["One Size"],
      },
    ],
  },
];

function ProductCard({
  product,
  onPreview,
  onAdd,
}: {
  product: ShopProduct;
  onPreview: (src: string) => void;
  onAdd: (item: { id: string; name: string; size: string; qty: number; price: number; image: string; gender: string }) => void;
}) {
  const [size, setSize] = useState(product.sizes[0] || "One Size");
  const [qty, setQty] = useState(1);

  return (
    <div className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-[#e8ecee]/10 bg-[linear-gradient(180deg,rgba(23,26,24,0.98),rgba(14,16,15,0.94))] p-4 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#7bd355]/50 hover:shadow-[0_0_0_1px_rgba(123,211,85,0.15),0_24px_90px_rgba(25,90,18,0.35)] sm:rounded-[2rem] sm:p-5">
      <div className="flex min-w-0 flex-col">
        <button onClick={() => onPreview(product.image)} className="group/image relative w-full overflow-hidden rounded-[1.5rem] border border-[#e8ecee]/8 bg-[#0f130f] p-3">
          <div className="flex h-[360px] aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-[1.2rem] bg-[radial-gradient(circle_at_top,rgba(123,211,85,0.14),transparent_70%)]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain transition duration-500 group-hover/image:scale-[1.03]"
              loading="lazy"
            />
          </div>
        </button>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full border border-[#7bd355]/25 bg-[#7bd355]/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-[#bfeeb0]">
            {product.badge}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#939596]">{product.category}</span>
        </div>

        <h3 className="mt-4 min-h-[72px] font-heading text-[1.45rem] font-black leading-tight text-[#e8ecee] sm:text-[1.7rem]">{product.name}</h3>
        <p className="mt-2 min-h-[56px] text-[0.98rem] leading-relaxed text-[#939596]">{product.description}</p>

        <div className="mt-4 min-h-[130px]">
          <ul className="space-y-2 text-sm text-[#c7ccc9]">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-0.5 text-[#7bd355]">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#7bd355]/20 bg-[#7bd355]/10 px-3 py-1.5 text-[11px] font-semibold text-[#d9ffd0]">
            <span>🚚</span>
            {product.delivery}
          </span>
        </div>

        {/* Price + Size + Qty — stacked on mobile so it never overflows the card width */}
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#939596]">Price</p>
            <p className="font-heading text-[1.8rem] font-black text-[#7bd355]">Rs. {product.price.toLocaleString("en-US")}</p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            {product.sizes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${size === s ? "bg-[#7bd355] text-[#0c140a]" : "bg-[#e8ecee]/10 text-[#e8ecee] hover:bg-[#e8ecee]/20"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="flex w-fit items-center gap-3 rounded-full border border-[#e8ecee]/10 bg-[#e8ecee]/[.06] px-3 py-2">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8ecee]/10 text-lg font-semibold text-[#e8ecee] transition hover:bg-[#7bd355] hover:text-[#0c140a]"
              >
                −
              </button>
              <span className="min-w-[24px] text-center font-heading text-base font-bold text-[#e8ecee]">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8ecee]/10 text-lg font-semibold text-[#e8ecee] transition hover:bg-[#7bd355] hover:text-[#0c140a]"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => onAdd({ id: product.id, name: product.name, size, qty, price: product.price, image: product.image, gender: product.gender })}
          className="group/btn relative mt-5 inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#7bd355] px-5 py-3.5 text-sm font-black uppercase tracking-[0.2em] text-[#0c140a] shadow-[0_16px_30px_rgba(123,211,85,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_18px_35px_rgba(123,211,85,0.45)]"
        >
          <span className="relative z-10">Add to Cart</span>
          <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-300 group-hover/btn:translate-x-0" />
        </button>
      </div>
    </div>
  );
}

function ShopPage() {
  const [cart, setCart] = useState<{ id: string; name: string; size: string; qty: number; price: number; image: string; gender: string }[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const deliveryFee = subtotal > 0 ? 200 : 0;
  const total = subtotal + deliveryFee;

  const addToCart = (item: { id: string; name: string; size: string; qty: number; price: number; image: string; gender: string }) => {
    setCart((current) => {
      const existingIndex = current.findIndex((entry) => entry.id === item.id && entry.size === item.size);
      if (existingIndex >= 0) {
        const next = [...current];
        next[existingIndex] = { ...next[existingIndex], qty: next[existingIndex].qty + item.qty };
        return next;
      }
      return [...current, item];
    });
    setToast(`${item.name} (${item.size}) added to cart`);
    window.setTimeout(() => setToast(null), 2200);
  };

  const removeFromCart = (id: string, size: string) => {
    setCart((current) => current.filter((item) => !(item.id === id && item.size === size)));
  };

  return (
    <main className="section pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center rounded-full border border-[#7bd355]/25 bg-[#7bd355]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.38em] text-[#7bd355]">
            Shop
          </span>
          <h1 className="mt-4 font-heading text-4xl font-black tracking-[-0.04em] text-[#e8ecee] sm:text-5xl md:text-7xl">
            Official Society Wear
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#939596] sm:text-lg">
            Premium apparel and accessories for the SOCIAPI community.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-8">
            {shopCollections.map((section) => (
              <section key={section.title} className="min-w-0 rounded-[2rem] border border-[#e8ecee]/10 bg-[linear-gradient(180deg,rgba(19,21,20,0.88),rgba(10,12,11,0.94))] p-5 sm:p-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="font-heading text-2xl font-black text-[#e8ecee] sm:text-3xl">{section.title}</h2>
                    <p className="mt-2 text-sm text-[#939596]">{section.subtitle}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {section.futureDrops.map((item) => (
                      <span key={item} className="rounded-full border border-[#7bd355]/20 bg-[#7bd355]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7bd355]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-5 h-px bg-gradient-to-r from-[#7bd355]/35 via-[#7bd355]/10 to-transparent" />

                <div className="grid min-w-0 gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))" }}>
                  {section.items.map((product) => (
                    <ProductCard key={product.id} product={product} onPreview={setPreview} onAdd={addToCart} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="min-w-0 xl:sticky xl:top-24 xl:self-start">
            <div className="rounded-[2rem] border border-[#e8ecee]/10 bg-[linear-gradient(180deg,rgba(22,24,22,0.98),rgba(12,14,13,0.95))] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-heading text-2xl font-black text-[#e8ecee]">Cart</h2>
                <span className="rounded-full border border-[#7bd355]/25 bg-[#7bd355]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-[#7bd355]">
                  {cart.reduce((count, item) => count + item.qty, 0)} items
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {cart.length === 0 ? (
                  <div className="rounded-[1.25rem] border border-dashed border-[#e8ecee]/15 bg-[#e8ecee]/[.04] px-4 py-6 text-sm text-[#939596]">
                    Your cart is empty. Add a premium SOCIAPI piece to begin.
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${index}`} className="flex min-w-0 items-center gap-3 rounded-[1.25rem] border border-[#e8ecee]/10 bg-[#e8ecee]/[.05] p-2.5">
                      <img src={item.image} alt={item.name} className="h-20 w-16 shrink-0 rounded-xl object-contain" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-[#e8ecee]">{item.name}</p>
                        <p className="mt-1 text-xs text-[#939596]">Size: {item.size}</p>
                        <p className="mt-1 text-xs text-[#939596]">Qty: {item.qty}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-[#7bd355]">Rs. {(item.price * item.qty).toLocaleString("en-US")}</p>
                        <button onClick={() => removeFromCart(item.id, item.size)} className="mt-2 text-xs font-bold text-red-400 transition hover:text-red-300">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 space-y-3 rounded-[1.25rem] border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] p-4 text-sm">
                <div className="flex items-center justify-between text-[#c7ccc9]">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString("en-US")}</span>
                </div>
                <div className="flex items-center justify-between text-[#c7ccc9]">
                  <span>Delivery</span>
                  <span>Rs. {deliveryFee.toLocaleString("en-US")}</span>
                </div>
                <div className="h-px bg-[#e8ecee]/10" />
                <div className="flex items-center justify-between font-heading text-lg font-black text-[#e8ecee]">
                  <span>Total</span>
                  <span className="text-[#7bd355]">Rs. {total.toLocaleString("en-US")}</span>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={() => setCheckoutOpen(true)}
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#7bd355] px-5 py-3.5 text-sm font-black uppercase tracking-[0.2em] text-[#0c140a] shadow-[0_16px_30px_rgba(123,211,85,0.3)] transition hover:scale-[1.02] hover:shadow-[0_18px_35px_rgba(123,211,85,0.45)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Checkout
              </button>
            </div>
          </aside>
        </div>
      </div>

      <CheckoutModal
        open={checkoutOpen}
        cart={cart}
        subtotal={subtotal}
        delivery={deliveryFee}
        total={total}
        onClose={() => setCheckoutOpen(false)}
        onOrderComplete={() => setCart([])}
      />

      {preview && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/85 p-4">
          <button className="absolute right-5 top-5 rounded-full bg-[#e8ecee]/15 px-4 py-2 text-[#e8ecee]" onClick={() => setPreview(null)}>
            ✕
          </button>
          <img src={preview} alt="Product preview" className="max-h-[85vh] max-w-[85vw] rounded-[1.5rem] object-contain" />
        </div>
      )}

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-[110] w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 rounded-full border border-[#7bd355]/40 bg-[#0f130f] px-5 py-3 text-center text-sm font-bold text-[#d9ffd0] shadow-2xl shadow-[#7bd355]/30 animate-slide-up sm:bottom-8">
          ✓ {toast}
        </div>
      )}
    </main>
  );
}

function CheckoutModal({
  open,
  cart,
  subtotal,
  delivery,
  total,
  onClose,
  onOrderComplete,
}: {
  open: boolean;
  cart: { id: string; name: string; size: string; qty: number; price: number; image: string; gender: string }[];
  subtotal: number;
  delivery: number;
  total: number;
  onClose: () => void;
  onOrderComplete: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "Pakistan",
    province: "",
    city: "",
    address: "",
    postalCode: "",
    landmark: "",
    notes: "",
    paymentMethod: "Cash on Delivery",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setErrors({});
      setSaveError(null);
      setSuccessMessage(null);
      setSubmitting(false);
    }
  }, [open]);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.name.trim()) nextErrors.name = "Full name is required.";
    if (!formData.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!formData.city.trim()) nextErrors.city = "City is required.";
    if (!formData.address.trim()) nextErrors.address = "Complete address is required.";
    return nextErrors;
  };

  const handleContinue = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setSaveError(null);
    setSuccessMessage(null);

    try {
      const orderPayload: CreateOrderInput = {
        customer_name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        country: formData.country,
        province: formData.province.trim(),
        city: formData.city.trim(),
        address: formData.address.trim(),
        postal_code: formData.postalCode.trim(),
        landmark: formData.landmark.trim() || null,
        cart_items: cart.map((item) => ({
          name: item.name,
          gender: item.gender,
          size: item.size,
          quantity: item.qty,
          unit_price: item.price,
        })),
        subtotal,
        delivery,
        total,
      };

      const orderResult = await orderService.createOrder(orderPayload);

      // Show a clear thank-you confirmation before moving to WhatsApp
      setSuccessMessage(`Thank you! Order ${orderResult.order_number} placed successfully. Opening WhatsApp...`);
      await new Promise((resolve) => window.setTimeout(resolve, 1300));

      const lines = [
        "Hello SOCIAPI Society,",
        "",
        "I would like to place an order.",
        "",
        "━━━━━━━━━━━━━━━━━━",
        "",
        "🛍 ORDER DETAILS",
        "",
        `Order Number: ${orderResult.order_number}`,
        ...cart.flatMap((item) => [
          `Product: ${item.name}`,
          `Gender: ${item.gender}`,
          `Size: ${item.size}`,
          `Quantity: ${item.qty}`,
          `Unit Price: Rs. ${item.price.toLocaleString("en-US")}`,
        ]),
        `Subtotal: Rs. ${subtotal.toLocaleString("en-US")}`,
        `Delivery: Rs. ${delivery.toLocaleString("en-US")}`,
        `Total: Rs. ${total.toLocaleString("en-US")}`,
        `Payment Method: ${formData.paymentMethod}`,
        "",
        "━━━━━━━━━━━━━━━━━━",
        "",
        "👤 CUSTOMER DETAILS",
        `Name: ${formData.name.trim()}`,
        `Phone: ${formData.phone.trim()}`,
        `Email: ${formData.email.trim() || "N/A"}`,
        `Country: ${formData.country}`,
        `Province: ${formData.province.trim() || "N/A"}`,
        `City: ${formData.city.trim()}`,
        `Address: ${formData.address.trim()}`,
        `Postal Code: ${formData.postalCode.trim() || "N/A"}`,
        `Landmark: ${formData.landmark.trim() || "N/A"}`,
        `Order Notes: ${formData.notes.trim() || "N/A"}`,
        "",
        "━━━━━━━━━━━━━━━━━━",
        "",
        "Please confirm my order.",
        "Thank you.",
      ];

      const message = lines.join("\n");
      window.open(`https://wa.me/923329984490?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");

      // Clear the cart now that the order has been placed and sent
      onOrderComplete();

      await new Promise((resolve) => window.setTimeout(resolve, 500));
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Order could not be saved. Please try again.";
      setSaveError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 sm:p-6">
      <div className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-[#e8ecee]/10 bg-[linear-gradient(180deg,rgba(20,22,21,0.98),rgba(10,12,11,0.96))] p-4 shadow-[0_24px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#7bd355]">Checkout</p>
            <h2 className="mt-1 font-heading text-3xl font-black text-[#e8ecee] sm:text-4xl">Complete your order</h2>
          </div>
          <button onClick={onClose} className="rounded-full border border-[#e8ecee]/10 bg-[#e8ecee]/8 px-4 py-2 text-sm text-[#e8ecee]">Close</button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <form onSubmit={handleContinue} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#e8ecee]">Full Name *</label>
                <input value={formData.name} onChange={(e) => updateField("name", e.target.value)} className="w-full rounded-2xl border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] px-4 py-3 text-[#e8ecee] outline-none transition focus:border-[#7bd355]" placeholder="Ali Khan" />
                {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#e8ecee]">Phone Number *</label>
                <input value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full rounded-2xl border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] px-4 py-3 text-[#e8ecee] outline-none transition focus:border-[#7bd355]" placeholder="03XXXXXXXXX" />
                {errors.phone && <p className="mt-2 text-sm text-red-400">{errors.phone}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#e8ecee]">Email (Optional)</label>
                <input value={formData.email} onChange={(e) => updateField("email", e.target.value)} className="w-full rounded-2xl border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] px-4 py-3 text-[#e8ecee] outline-none transition focus:border-[#7bd355]" placeholder="example@gmail.com" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#e8ecee]">Country</label>
                <input value={formData.country} onChange={(e) => updateField("country", e.target.value)} className="w-full rounded-2xl border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] px-4 py-3 text-[#e8ecee] outline-none transition focus:border-[#7bd355]" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#e8ecee]">Province</label>
                <input value={formData.province} onChange={(e) => updateField("province", e.target.value)} className="w-full rounded-2xl border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] px-4 py-3 text-[#e8ecee] outline-none transition focus:border-[#7bd355]" placeholder="KPK" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#e8ecee]">City *</label>
                <input value={formData.city} onChange={(e) => updateField("city", e.target.value)} className="w-full rounded-2xl border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] px-4 py-3 text-[#e8ecee] outline-none transition focus:border-[#7bd355]" placeholder="Peshawar" />
                {errors.city && <p className="mt-2 text-sm text-red-400">{errors.city}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#e8ecee]">Complete Address *</label>
                <textarea value={formData.address} onChange={(e) => updateField("address", e.target.value)} className="min-h-[110px] w-full rounded-2xl border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] px-4 py-3 text-[#e8ecee] outline-none transition focus:border-[#7bd355]" placeholder="House 25 University Road" />
                {errors.address && <p className="mt-2 text-sm text-red-400">{errors.address}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#e8ecee]">Postal Code</label>
                <input value={formData.postalCode} onChange={(e) => updateField("postalCode", e.target.value)} className="w-full rounded-2xl border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] px-4 py-3 text-[#e8ecee] outline-none transition focus:border-[#7bd355]" placeholder="25000" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#e8ecee]">Landmark (Optional)</label>
                <input value={formData.landmark} onChange={(e) => updateField("landmark", e.target.value)} className="w-full rounded-2xl border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] px-4 py-3 text-[#e8ecee] outline-none transition focus:border-[#7bd355]" placeholder="Near Islamia College" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#e8ecee]">Payment Method</label>
                <select value={formData.paymentMethod} onChange={(e) => updateField("paymentMethod", e.target.value)} className="w-full rounded-2xl border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] px-4 py-3 text-[#e8ecee] outline-none transition focus:border-[#7bd355]">
                  <option>Cash on Delivery</option>
                  <option>Bank Transfer</option>
                  <option>JazzCash</option>
                  <option>Easypaisa</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#e8ecee]">Order Notes (Optional)</label>
                <textarea value={formData.notes} onChange={(e) => updateField("notes", e.target.value)} className="min-h-[100px] w-full rounded-2xl border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] px-4 py-3 text-[#e8ecee] outline-none transition focus:border-[#7bd355]" placeholder="Leave at security gate\nCall before delivery" />
              </div>
            </div>

            {saveError && <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{saveError}</div>}
            {successMessage && <div className="rounded-2xl border border-[#7bd355]/30 bg-[#7bd355]/10 px-4 py-3 text-sm text-[#d9ffd0]">{successMessage}</div>}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={onClose} className="rounded-full border border-[#e8ecee]/10 px-5 py-3 text-sm font-bold text-[#e8ecee]">Back to Shop</button>
              <button type="submit" disabled={submitting || cart.length === 0} className="inline-flex items-center justify-center rounded-full bg-[#7bd355] px-7 py-3.5 text-sm font-black uppercase tracking-[0.2em] text-[#0c140a] shadow-[0_16px_35px_rgba(123,211,85,0.35)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60">
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#0c140a]/30 border-t-[#0c140a]" />
                    Saving order...
                  </span>
                ) : (
                  "Continue to WhatsApp"
                )}
              </button>
            </div>
          </form>

          <div className="rounded-[1.75rem] border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] p-4 sm:p-5 lg:sticky lg:top-6">
            <h3 className="font-heading text-2xl font-black text-[#e8ecee]">Order Summary</h3>
            <div className="mt-4 space-y-3">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="flex gap-3 rounded-[1.25rem] border border-[#e8ecee]/10 bg-[#0f110f] p-3">
                  <img src={item.image} alt={item.name} className="h-20 w-16 rounded-xl object-contain" />
                  <div className="min-w-0 flex-1 text-sm text-[#c7ccc9]">
                    <p className="font-bold text-[#e8ecee]">{item.name}</p>
                    <p className="mt-1">Size: {item.size}</p>
                    <p>Qty: {item.qty}</p>
                    <p>Unit Price: Rs. {item.price.toLocaleString("en-US")}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3 rounded-[1.25rem] border border-[#e8ecee]/10 bg-[#e8ecee]/[.04] p-4 text-sm text-[#c7ccc9]">
              <div className="flex items-center justify-between"><span>Subtotal</span><span>Rs. {subtotal.toLocaleString("en-US")}</span></div>
              <div className="flex items-center justify-between"><span>Delivery</span><span>Rs. {delivery.toLocaleString("en-US")}</span></div>
              <div className="h-px bg-[#e8ecee]/10" />
              <div className="flex items-center justify-between font-heading text-lg font-black text-[#e8ecee]"><span>Total</span><span className="text-[#7bd355]">Rs. {total.toLocaleString("en-US")}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CareerPage() { return <main className="section pt-28 sm:pt-32"><SectionTitle label="Career" title="Join the team." /><div className="mx-auto mb-10 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">{["Internship", "Volunteer", "Membership"].map((x, i) => <Reveal key={x} delay={i * 0.1}><a href="https://forms.gle/wCxL9imgHWgWxU2z6" target="_blank" rel="noreferrer" className="block h-full rounded-[1.75rem] border border-[#7bd355]/30 bg-gradient-to-b from-[#7bd355]/[.08] to-transparent p-6 backdrop-blur-xl transition hover:-translate-y-1.5 hover:border-[#7bd355]/50 sm:rounded-[2rem]"><h3 className="font-heading text-xl font-bold text-[#e8ecee] sm:text-2xl">{x} ↗</h3><p className="mt-4 text-base text-[#939596]">Submit your application via Google Form.</p><span className="mt-4 inline-block rounded-full bg-[#7bd355] px-4 py-2 text-sm font-bold text-[#0c140a]">Apply</span></a></Reveal>)}</div><EmailForm kind="Career" /></main>; }

function ContactPage() { return <main className="section pt-28 sm:pt-32"><SectionTitle label="Contact" title="Connect with Sociapi Society." copy="ICU Peshawar · sociapisociety@gmail.com · +92 332 9984490" /><div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2"><EmailForm kind="Contact" /><div className="overflow-hidden rounded-[1.75rem] border border-[#e8ecee]/10 bg-[#e8ecee]/[.06] p-3 sm:rounded-[2rem] sm:p-4"><iframe title="ICU Peshawar Map" className="h-full min-h-[320px] w-full rounded-[1.25rem] grayscale invert sm:min-h-[420px]" loading="lazy" src="https://www.google.com/maps?q=Islamia%20College%20University%20Peshawar%20Pakistan&output=embed" /><div className="mt-4 flex gap-4 px-2 text-base text-[#e8ecee]"><a className="hover:text-[#7bd355]" href="mailto:sociapisociety@gmail.com">Email</a><a className="hover:text-[#7bd355]" href="tel:+923329984490">Call</a><a className="hover:text-[#7bd355]" href="https://wa.me/923329984490" target="_blank" rel="noreferrer">WhatsApp</a></div></div></div></main>; }

function ReviewsPage() { return <main className="section pt-28 sm:pt-32"><SectionTitle label="Reviews" title="What students say." /><Testimonials /><div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">{reviews.map((r) => <blockquote key={r} className="testimonial-card !min-w-0 !animate-none">"{r}"<footer>Community Review</footer></blockquote>)}</div></main>; }

function FAQsPage() { const [q, setQ] = useState(""); const [cat, setCat] = useState("All"); const [open, setOpen] = useState(0); const cats = ["All", ...Array.from(new Set(faqs.map((f) => f[0])))]; const filtered = faqs.filter((f) => (cat === "All" || f[0] === cat) && f.join(" ").toLowerCase().includes(q.toLowerCase())); return <main className="section pt-28 sm:pt-32"><SectionTitle label="FAQs" title="Search the knowledge base." /><div className="mx-auto mb-8 flex max-w-3xl flex-col gap-3 sm:flex-row"><input className="glass-input flex-1" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search FAQs" /><select className="glass-input sm:max-w-xs" value={cat} onChange={(e) => setCat(e.target.value)}>{cats.map((c) => <option key={c}>{c}</option>)}</select></div><div className="mx-auto max-w-3xl space-y-3">{filtered.map((f, i) => <div key={f[1]} className="rounded-2xl border border-[#e8ecee]/10 bg-[#e8ecee]/[.06] p-5 text-[#e8ecee] sm:rounded-3xl"><button className="flex w-full justify-between gap-3 text-left font-heading text-lg sm:text-xl" onClick={() => setOpen(open === i ? -1 : i)}><span>{f[1]}</span><span className="shrink-0">{open === i ? "−" : "+"}</span></button>{open === i && <p className="mt-4 text-base text-[#939596]">{f[2]}</p>}</div>)}</div></main>; }

/* ---------------- Sticky + Widgets ---------------- */
function StickyJoin({ route }: { route: PageKey }) { const scrolled = useScrolled(560); if (route === "contact") return null; return <div className={`fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 transition-all duration-300 lg:hidden ${scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}><button onClick={() => window.open(JOIN_COMMUNITY_FORM_URL, "_blank", "noopener,noreferrer")} className="pointer-events-auto flex items-center gap-2 rounded-full bg-[#7bd355] px-7 py-3.5 text-base font-bold text-[#0c140a] shadow-2xl shadow-[#7bd355]/40 ring-1 ring-black/10">Join Community →</button></div>; }

function WhatsAppWidget() { const [open, setOpen] = useState(false); return <><button onClick={() => setOpen((o) => !o)} className="group fixed bottom-5 right-4 z-50 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition hover:scale-110 sm:bottom-6 sm:right-5 sm:h-[62px] sm:w-[62px]" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 sm:h-7 sm:w-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg></button>{open && <><div className="fixed inset-0 z-40 bg-transparent" onClick={() => setOpen(false)} /><div className="fixed bottom-[80px] right-4 z-[55] w-[calc(100vw-2rem)] max-w-xs animate-slide-up overflow-hidden rounded-3xl border border-[#e8ecee]/15 bg-[#333333]/95 p-5 text-[#e8ecee] shadow-2xl backdrop-blur-2xl sm:bottom-[92px] sm:right-5"><div className="flex items-start gap-3"><div className="grid h-11 w-11 place-items-center rounded-full bg-[#7bd355] font-black text-[#0c140a] ring-2 ring-[#25D366]/60">S</div><div><p className="text-sm font-bold">Sociapi Society</p><p className="mt-0.5 text-xs text-green-400">● Online</p></div><button onClick={() => setOpen(false)} className="ml-auto rounded-lg bg-[#e8ecee]/10 px-2.5 py-1 text-xs">✕</button></div><div className="mt-4 text-sm text-[#939596]">Hi! 👋 How can we help you?</div><div className="mt-4 grid grid-cols-2 gap-2">{["Join Community", "Events Info", "Partnership", "Other"].map((b) => <button key={b} onClick={() => window.open(`https://wa.me/923329984490?text=Hi! I am interested in: ${b}`, "_blank")} className="rounded-xl border border-[#e8ecee]/10 bg-[#e8ecee]/8 px-3 py-2.5 text-xs font-medium text-[#e8ecee]/80 transition hover:bg-[#e8ecee]/15 hover:text-[#25D366]">{b}</button>)}</div><a href="https://wa.me/923329984490?text=Hello Sociapi Society!" target="_blank" rel="noreferrer" className="mt-4 block rounded-2xl bg-[#25D366] py-3 text-center text-sm font-bold text-black shadow-lg shadow-[#25D366]/30">Start Chat →</a></div></>}</>; }

function FloatingUtilities() { const isMobile = useIsMobile(); const [loading, setLoading] = useState(true); const [progress, setProgress] = useState(0); const [dark, setDark] = useState(true); useEffect(() => { const timer = setTimeout(() => setLoading(false), 900); const onScroll = () => setProgress((scrollY / (document.body.scrollHeight - innerHeight)) * 100); addEventListener("scroll", onScroll, { passive: true }); return () => { clearTimeout(timer); removeEventListener("scroll", onScroll); }; }, []); useEffect(() => { document.documentElement.classList.toggle("light-mode", !dark); }, [dark]); return <><div className="fixed left-0 top-0 z-[100] h-1 bg-[#7bd355] transition-[width]" style={{ width: `${progress}%` }} />{loading && <div className="fixed inset-0 z-[120] grid place-items-center bg-black text-center text-[#e8ecee]"><div><Logo className="mx-auto mb-5 h-16 w-16 animate-pulse text-3xl" /><div className="loader mx-auto" /><p className="mt-5 font-heading text-sm tracking-[.4em]">SOCIAPI SOCIETY</p></div></div>}{!isMobile && <div className="cursor-glow" />}<button onClick={() => setDark(!dark)} className="fixed bottom-[88px] right-4 z-50 rounded-full border border-[#e8ecee]/15 bg-[#e8ecee]/10 px-4 py-2.5 text-sm text-[#e8ecee] backdrop-blur-xl sm:bottom-24 sm:right-5">{dark ? "Light" : "Dark"}</button><WhatsAppWidget /><button onClick={() => scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 left-4 z-50 flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[#e8ecee]/15 bg-[#e8ecee]/10 text-[#e8ecee] backdrop-blur-xl sm:bottom-6 sm:left-5" aria-label="Scroll to top">↑</button></>; }

/* ---------------- Footer ---------------- */
const socials = [
  { label: "Instagram", href: "https://www.instagram.com/sociapi/", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2z" /></svg> },
  { label: "Facebook", href: "https://www.facebook.com/sociapi/", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" /></svg> },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/sociapisociety/", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg> },
  { label: "X", href: "https://x.com/sociapisociety", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64z" /></svg> },
  { label: "TikTok", href: "https://www.tiktok.com/@sociapi", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M16.6 5.82a4.28 4.28 0 01-1.01-2.82h-3.1v12.3a2.45 2.45 0 01-2.45 2.42 2.45 2.45 0 01-2.46-2.44 2.45 2.45 0 013.04-2.37V7.3a5.56 5.56 0 00-.58-.03A5.56 5.56 0 004.5 12.8a5.56 5.56 0 005.55 5.55 5.56 5.56 0 005.56-5.55V8.9a7.34 7.34 0 004.29 1.37V7.16a4.28 4.28 0 01-3.3-1.34z" /></svg> },
  
];

function Footer() {
  return (
    <footer className="relative border-t border-[#e8ecee]/10 px-5 pt-14 pb-28 text-[#e8ecee] sm:pb-14">
      <Reveal className="mx-auto mb-14 max-w-7xl overflow-hidden rounded-[2rem] border border-[#7bd355]/25 bg-gradient-to-r from-[#7bd355]/15 via-[#517642]/10 to-transparent p-7 sm:rounded-[2.5rem] sm:p-10">
        <div className="flex flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">
          <div><h3 className="font-heading text-2xl font-black sm:text-3xl">Ready to turn ideas into intelligence?</h3><p className="mt-2 text-lg text-[#939596]">Join 20+ builders at ICU.</p></div>
          <button onClick={() => window.open(JOIN_COMMUNITY_FORM_URL, "_blank", "noopener,noreferrer")} className="magnetic shrink-0 rounded-full bg-[#7bd355] px-8 py-4 text-base font-bold text-[#0c140a]">Join Community →</button>
        </div>
      </Reveal>
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_.8fr_.8fr_.9fr]">
        <div>
          <div className="flex items-center gap-3"><Logo className="h-11 w-11 text-xl" /><h2 className="font-heading text-2xl font-black sm:text-3xl">SOCIAPI SOCIETY</h2></div>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#939596]">The official digital headquarters for AI and student innovation at ICU Peshawar.</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">{socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e8ecee]/12 bg-[#e8ecee]/6 text-[#e8ecee]/75 transition hover:-translate-y-0.5 hover:border-[#7bd355]/40 hover:bg-[#7bd355] hover:text-[#0c140a]">{s.icon}</a>)}</div>
        </div>
        <div><h3 className="mb-4 font-heading text-sm tracking-[.25em] text-[#7bd355]">EXPLORE</h3><ul className="space-y-2.5 text-base text-[#939596]"><li><Link to="/about" className="hover:text-[#7bd355]">About Us</Link></li><li><Link to="/team" className="hover:text-[#7bd355]">Our Team</Link></li><li><Link to="/chapters" className="hover:text-[#7bd355]">Chapters</Link></li><li><Link to="/events" className="hover:text-[#7bd355]">Events &amp; Blog</Link></li><li><Link to="/gallery" className="hover:text-[#7bd355]">Gallery</Link></li></ul></div>
        <div><h3 className="mb-4 font-heading text-sm tracking-[.25em] text-[#7bd355]">ENGAGE</h3><ul className="space-y-2.5 text-base text-[#939596]"><li><Link to="/services" className="hover:text-[#7bd355]">Services</Link></li><li><Link to="/partner" className="hover:text-[#7bd355]">Partner</Link></li><li><Link to="/career" className="hover:text-[#7bd355]">Career</Link></li><li><Link to="/shop" className="hover:text-[#7bd355]">Shop</Link></li><li><Link to="/faqs" className="hover:text-[#7bd355]">FAQs</Link></li></ul></div>
        <div><h3 className="mb-4 font-heading text-sm tracking-[.25em] text-[#7bd355]">CONTACT</h3><p className="break-all text-base leading-7 text-[#939596]">sociapisociety@gmail.com</p><p className="text-base text-[#939596]">+92 332 9984490</p><p className="mt-3 text-base text-[#939596]">Islamia College University<br />Peshawar, Pakistan</p></div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-[#e8ecee]/8 pt-6 text-center text-sm text-[#939596]">&copy; {new Date().getFullYear()} Sociapi Society. All rights reserved. Built by Zuhair Zeb.</p>
    </footer>
  );
}

/* ---------------- Main App with Routes ---------------- */
export default function App() {
  const route = useCurrentRoute();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070907] text-[#e8ecee]">
      <ScrollToTop />
      <SeoHead />
      <FloatingUtilities />
      <Nav route={route} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/chapters" element={<ChaptersPage />} />
        <Route path="/verify" element={<CertificateVerification />} />
        <Route path="/verify/:certificateId" element={<CertificateVerification />} />
        <Route path="/team" element={<TeamGalaxy full />} />
        <Route path="/events" element={<EventsBlogPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/partner" element={<PartnerPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        {/* 404 fallback → Home */}
        <Route path="*" element={<HomePage />} />
      </Routes>

      <Footer />
      <StickyJoin route={route} />
      <SpeedInsights />
    </div>
  );
}