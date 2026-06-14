import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import ChaptersPage from "./Chapters";
import { SpeedInsights } from "@vercel/speed-insights/react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

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

type PageKey =
  | "home" | "about" | "team" | "events" | "services" | "partner"
  | "gallery" | "shop" | "career" | "contact" | "reviews" | "faqs" | "chapters";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const JOIN_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd3PzG3RGp_kfdqJSGcCKeIIGtJ6QbIJZJ_K8QF4vnk613q-A/viewform";

const WHATSAPP = "923001234567"; // replace with real number

const pages: { key: PageKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "chapters", label: "Chapters" },
  { key: "team", label: "Team" },
  { key: "events", label: "Events & Blog" },
  { key: "services", label: "Services" },
  { key: "partner", label: "Partner" },
  { key: "gallery", label: "Gallery" },
  { key: "shop", label: "Shop" },
  { key: "career", label: "Career" },
  { key: "contact", label: "Contact" },
  { key: "reviews", label: "Reviews" },
  { key: "faqs", label: "FAQs" },
];

const teamMembers: Member[] = [
  { name: "Muhammad Zuhair Zeb", role: "Founder & President", department: "Leadership", image: "Image/Team Pic/Zuhair.jpeg?auto=format&fit=crop&w=500&q=80", bio: "Muhammad Zuhair Zeb belongs to Swabi, Pakistan. He is an undergraduate student in Artificial Intelligence at Islamia College University, Peshawar. He is the founder of Sociapi Society, a student-led platform that promotes technology, creativity, and skills development.", skills: ["AI", "Web Developer", "WordPress Developer", "Business Intelligence", "Community Leadership"], orbit: 0, angle: 0 },
  { name: "Muhammad Mudassir", role: "Co-Founder", department: "Leadership", image: "Image/Team Pic/Muhammad Mudassir.jpg?auto=format&fit=crop&w=500&q=80", bio: "AI Student with strong interest in Computer Vision, OpenCV, AI Agents, Web Development, and Business Intelligence.", skills: ["OpenCV", "AI Agents", "Leadership"], orbit: 1, angle: 0 },
  { name: "Naveed Abbas", role: "Teacher Advisor", department: "Advisory", image: "Image/Team Pic/Navved.png?auto=format&fit=crop&w=500&q=80", bio: "Advisor to Sociapi Society, guiding students to convert academic learning into meaningful, ethical, and practical technology outcomes.", skills: ["Mentorship", "Academic Guidance", "Research", "Leadership"], orbit: 1, angle: 180 },
  { name: "Bilal Muhammad", role: "General Secretary", department: "Operations", image: "Image/Team Pic/Bilal Muhammad.jpg?auto=format&fit=crop&w=500&q=80", bio: "Coordinates society operations, documentation, member communications, and execution discipline.", skills: ["Operations", "Communication", "Documentation"], orbit: 1, angle: 60 },
  { name: "Hamza Khan", role: "HR Manager", department: "HR", image: "Image/Team Pic/Hamza Khan.jpg?auto=format&fit=crop&w=500&q=80", bio: "Builds a healthy member experience with onboarding, people systems, and growth culture.", skills: ["HR", "People Ops", "Culture"], orbit: 1, angle: 120 },
  { name: "Muhammad Zakria", role: "Project Manager", department: "Projects", image: "Image/Team Pic/Muhammad Zakria.jpg?auto=format&fit=crop&w=500&q=80", bio: "Turns student ideas into production roadmaps, milestones, and shipped portfolio projects.", skills: ["Project Management", "AI Projects", "Agile"], orbit: 1, angle: 240 },
  { name: "Muhammad Zulkifal", role: "Event Manager", department: "Events", image: "Image/Team Pic/Muhammad Zulkifal (Event Manger).jpg?auto=format&fit=crop&w=500&q=80", bio: "Designs memorable learning events, seminar experiences, and community programs.", skills: ["Events", "Planning", "Experience Design"], orbit: 1, angle: 300 },
  { name: "Muhammad Hammad Khan", role: "Technical Co-Lead", department: "Technical", image: "Image/Team Pic/Hamad Khan.jpg?auto=format&fit=crop&w=500&q=80", bio: "Supports technical tracks, code reviews, labs, and practical engineering guidance.", skills: ["Engineering", "AI", "Mentorship"], orbit: 2, angle: 20 },
  { name: "Asiya Islam", role: "Women Lead", department: "Women Wing", image: "Image/Team Pic/Female/Asiya Islam.png?auto=format&fit=crop&w=500&q=80", bio: "Leads women participation, inclusive learning circles, and leadership opportunities.", skills: ["Leadership", "Community", "Inclusion"], orbit: 2, angle: 60 },
  { name: "Maham Iqbal", role: "Women Co-Lead", department: "Women Wing", image: "Image/Team Pic/Female/Maham Iqbal.png?auto=format&fit=crop&w=500&q=80", bio: "Co-leads women wing initiatives and supports mentorship pipelines.", skills: ["Coordination", "Mentorship", "Community"], orbit: 2, angle: 100 },
  { name: "Sajid Ullah", role: "Outreach Member", department: "Outreach", image: "Image/Team Pic/Sajid_Wazir.png?auto=format&fit=crop&w=500&q=80", bio: "Builds bridges with partners, students, and external technology communities.", skills: ["Outreach", "Partnerships", "Networking"], orbit: 2, angle: 140 },
  { name: "Muhammad Faisal", role: "Video Editor", department: "Media", image: "Image/Team Pic/Faisal Khan.png?auto=format&fit=crop&w=500&q=80", bio: "Crafts cinematic event edits, reels, and society storytelling assets.", skills: ["Video Editing", "Storytelling", "Production"], orbit: 2, angle: 180 },
  { name: "Muhammad Saad", role: "Media Team", department: "Media", image: "Image/Team Pic/saad.jpeg?auto=format&fit=crop&w=500&q=80", bio: "Captures moments, manages media coverage, and supports visual content operations.", skills: ["Media", "Photography", "Content"], orbit: 2, angle: 220 },
  { name: "Areesh Tahir", role: "Graphic Designers Lead", department: "Graphics", image: "Image/Team Pic/Areesh Tahir.png?auto=format&fit=crop&w=500&q=80", bio: "Leads identity design, event visuals, and polished brand systems.", skills: ["Graphic Design", "Branding", "Creative Direction"], orbit: 2, angle: 260 },
  { name: "Muhammad Abdullah", role: "Graphic Designers Co-Lead", department: "Graphics", image: "Image/Team Pic/Muhammad Abdullah.jpg?auto=format&fit=crop&w=500&q=80", bio: "Supports design execution, templates, and visual consistency.", skills: ["Design", "Visual Systems", "Canva"], orbit: 2, angle: 300 },
  { name: "Shandana Qadir (Amal Khan)", role: "Graphic Designer", department: "Graphics", image: "Image/Team Pic/Shandana Qadir.jfif?auto=format&fit=crop&w=500&q=80", bio: "Creates refined graphics for campaigns, social media, and event communication.", skills: ["Graphics", "Social Design", "Creativity"], orbit: 2, angle: 340 },
  { name: "Alina Kalim", role: "Decor Lead", department: "Decor", image: "Image/Team Pic/Female/Alina khan.JPG?auto=format&fit=crop&w=500&q=80", bio: "Shapes event spaces with thoughtful decor, ambiance, and guest experience details.", skills: ["Decor", "Event Design", "Planning"], orbit: 3, angle: 45 },
  { name: "Maimoona Iqbal", role: "Decor Team", department: "Decor", image: "Image/Team Pic/Female/maimoona.jpg?auto=format&fit=crop&w=500&q=80", bio: "Supports stage, venue, and detail design for premium student events.", skills: ["Decor", "Teamwork", "Execution"], orbit: 3, angle: 135 },
  { name: "Atika Aqleem", role: "Organizer Lead", department: "Organizing", image: "Image/Team Pic/Atika Aqlim.jpg?auto=format&fit=crop&w=500&q=80", bio: "Leads on-ground event coordination, volunteer management, and execution flow.", skills: ["Organization", "Events", "Leadership"], orbit: 3, angle: 225 },
  { name: "Riyan Ahmad Khan", role: "Organizer", department: "Organizing", image: "Image/Team Pic/Riyan Ahmad.png?auto=format&fit=crop&w=500&q=80", bio: "Supports event logistics, audience guidance, and operational reliability.", skills: ["Logistics", "Teamwork", "Execution"], orbit: 3, angle: 315 },
];

const panels = [
  "Artificial Intelligence", "Machine Learning", "Data Science", "Generative AI",
  "Robotics", "Computer Vision", "Web Development", "Business Intelligence",
];

const stats: [number, string, string][] = [
  [300, "Audience", "+"],
  [20, "Current Members", "+"],
  [2, "Major Events", "+"],
  [2025, "Founded", ""],
];

const timeline = [
  ["December 2025", "Society Founded", "Sociapi Society begins as a professional student technology community."],
  ["February 2026", "Agentum 2026", "A seminar focused on AI agents, automation, and the next generation of practical AI."],
  ["May 2026", "Mehfil AI", "A flagship gathering celebrating AI learning, student talent, and portfolio-grade work."],
  ["June 2026", "Career in Tech / Design Thinking", "A seminar focused on career paths, skill development, and design thinking for technology students."],
];

const services = ["UI & UX Design", "Graphic Design", "WordPress Development", "Video Editing"];

const galleryImages = [
  "Image/Agentum Pic/0001.jpg",
  "Image/Agentum Pic/6.jpg",
  "Image/Agentum Pic/7.jpeg",
  "Image/Agentum Pic/12.png",
  "Image/Agentum Pic/13.png",
  "Image/Agentum Pic/14.png",
  "Image/Agentum Pic/15.jfif",
  "Image/Agentum Pic/IMG_5921.png",
  "Image/Agentum Pic/IMG_5956.png",
  "Image/Agentum Pic/IMG_5998.png",
  "Image/Agentum Pic/IMG_6010.png",
  "Image/Agentum Pic/Khyzar Hayat.png",
  "Image/Agentum Pic/mustafa.png",
  "Image/Agentum Pic/uzair.png",
  "Image/1.png",
  "Image/2.png",
  "Image/3.png",
  "Image/4.png",
  "Image/5.png",
  "Image/6.png",
];

const reviews = [
  "Sociapi Society made AI practical for me. I finally learned how to turn concepts into projects.",
  "The mentorship culture is serious, supportive, and focused on real outcomes.",
  "Agentum 2026 felt like a professional technology event, not a student seminar.",
  "The community helped me build confidence, a portfolio, and a direction in AI.",
];

const faqs: [string, string, string][] = [
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

const shopItems = [
  { name: "Sociapi T-Shirt", price: 1500, image: "Image/Shop/tshirt.png" },
  { name: "Sociapi Hoodie", price: 3500, image: "Image/Shop/hoodie.png" },
  { name: "Sociapi Cap", price: 800, image: "Image/Shop/cap.png" },
  { name: "Sociapi Sticker Pack", price: 300, image: "Image/Shop/stickers.png" },
];

const careers = [
  { title: "Community Manager", type: "Volunteer", location: "Peshawar", description: "Manage community engagement, onboarding, and member experience." },
  { title: "AI Research Intern", type: "Internship", location: "Remote", description: "Contribute to AI research projects and build portfolio-grade work." },
  { title: "Graphic Designer", type: "Volunteer", location: "Peshawar", description: "Create event visuals, social media graphics, and brand assets." },
  { title: "Event Coordinator", type: "Volunteer", location: "Peshawar", description: "Plan and execute society events, seminars, and workshops." },
];

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

function useHashRoute() {
  const [route, setRoute] = useState<PageKey>(() => {
    const current = location.hash.replace("#", "") as PageKey;
    return pages.some((p) => p.key === current) ? current : "home";
  });
  useEffect(() => {
    const onHash = () => {
      const current = location.hash.replace("#", "") as PageKey;
      setRoute(pages.some((p) => p.key === current) ? current : "home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    addEventListener("hashchange", onHash);
    return () => removeEventListener("hashchange", onHash);
  }, []);
  return route;
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

/* ------------------------------------------------------------------ */
/*  Shared Components                                                  */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame = 0;
    const total = 80;
    const tick = () => {
      frame += 1;
      setCount(Math.round(value * (1 - Math.pow(1 - frame / total, 3))));
      if (frame < total) requestAnimationFrame(tick);
    };
    tick();
  }, [value]);
  return <span>{count}{suffix}</span>;
}

function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <img
      src="logo.png"
      alt="Sociapi Society"
      className={`rounded-xl object-contain ${className}`}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

function Avatar({ src, name, className = "" }: { src?: string; name: string; className?: string }) {
  const [err, setErr] = useState(false);
  const initials = name
    .replace(/\(.*?\)/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (err || !src) {
    return (
      <div
        className={`grid place-items-center bg-gradient-to-br from-[#517642] via-[#333333] to-[#0c140a] font-heading font-black tracking-wide text-[#7bd355] ${className}`}
      >
        <span className="text-[1.6em]">{initials}</span>
      </div>
    );
  }
  return <img src={src} alt={name} onError={() => setErr(true)} loading="lazy" className={className} />;
}

function SectionTitle({ label, title, copy }: { label?: string; title: string; copy?: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl px-2 text-center">
      {label && (
        <span className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#7bd355]/30 bg-[#7bd355]/[.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-[#7bd355] backdrop-blur-md sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7bd355] shadow-[0_0_8px_#7bd355]" />
          {label}
        </span>
      )}
      <h2 className="font-heading text-3xl font-black tracking-[-0.04em] sm:text-4xl md:text-6xl">
        <span className="bg-gradient-to-b from-[#e8ecee] via-[#e8ecee] to-[#939596] bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#7bd355]/70 to-transparent" />
      {copy && <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#939596]">{copy}</p>}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Partner logo card                                                  */
/* ------------------------------------------------------------------ */

function PartnerLogo({ name, mark, tagline, image }: { name: string; mark?: string; tagline: string; image?: string }) {
  const [imgErr, setImgErr] = useState(false);
  const initials = name
    .replace(/\(.*?\)/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="logo-card">
      <span className="logo-mark relative overflow-hidden">
        {image && !imgErr ? (
          <img src={image} alt={name} className="h-full w-full rounded-xl object-contain" onError={() => setImgErr(true)} />
        ) : (
          <span className="font-heading text-xl font-black text-[#7bd355]">{mark || initials}</span>
        )}
      </span>
      <span className="flex flex-col">
        <span className="font-heading text-base font-bold tracking-tight text-[#e8ecee]">{name}</span>
        <span className="text-xs text-[#939596]">{tagline}</span>
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Program SVG icons                                                  */
/* ------------------------------------------------------------------ */

const programIcons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /><circle cx="12" cy="12" r="2" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z" /></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></svg>,
];

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

function Nav({ route }: { route: PageKey }) {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const scrolled = useScrolled(20);
  const moreTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const closeAll = () => {
      setOpen(false);
      setMoreOpen(false);
    };
    addEventListener("hashchange", closeAll);
    return () => removeEventListener("hashchange", closeAll);
  }, []);

  useEffect(() => {
    if (!moreOpen) return;
    const closeOnClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-more-dropdown]")) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("click", closeOnClickOutside);
    return () => document.removeEventListener("click", closeOnClickOutside);
  }, [moreOpen]);

  const handleMoreEnter = () => {
    if (moreTimeoutRef.current) {
      clearTimeout(moreTimeoutRef.current);
      moreTimeoutRef.current = null;
    }
    setMoreOpen(true);
  };

  const handleMoreLeave = () => {
    moreTimeoutRef.current = setTimeout(() => {
      setMoreOpen(false);
    }, 200);
  };

  const linkCls = (key: string) =>
    `inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium transition duration-200 ${
      route === key
        ? "bg-[#7bd355]/15 text-[#7bd355] ring-1 ring-[#7bd355]/30"
        : "text-[#e8ecee]/70 hover:text-[#e8ecee] hover:bg-[#e8ecee]/[.08]"
    }`;

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 sm:px-6 sm:py-3.5 ${
          scrolled
            ? "border-[#e8ecee]/[0.14] bg-[#333333]/70"
            : "border-[#e8ecee]/[0.11] bg-[#333333]/45"
        }`}
      >
        {/* Logo */}
        <a href="#home" className="flex shrink-0 items-center gap-2.5 transition hover:opacity-90">
          <Logo className="h-9 w-9 text-lg" />
          <span className="hidden font-heading text-base font-bold tracking-[0.28em] text-[#e8ecee] sm:block">
            SOCIAPI
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {pages.slice(0, 8).map((page) => (
            <a key={page.key} className={linkCls(page.key)} href={`#${page.key}`}>
              {page.label}
            </a>
          ))}

          {/* "More" dropdown */}
          <div
            className="relative"
            data-more-dropdown
            onMouseEnter={handleMoreEnter}
            onMouseLeave={handleMoreLeave}
          >
            <button
              className={`${linkCls("")} flex items-center gap-1`}
              onClick={(e) => {
                e.stopPropagation();
                setMoreOpen((prev) => !prev);
              }}
            >
              More
              <span className="mt-px text-[10px]">▼</span>
            </button>

            {moreOpen && <div className="absolute left-0 right-0 top-full h-3" />}

            <div
              className={`absolute right-0 top-full mt-2 w-52 origin-top-right rounded-2xl border border-[#e8ecee]/12 bg-[#333333]/96 p-2 shadow-2xl backdrop-blur-xl transition-all duration-200 ${
                moreOpen
                  ? "visible scale-100 opacity-100"
                  : "invisible scale-95 opacity-0 pointer-events-none"
              }`}
              onMouseEnter={handleMoreEnter}
              onMouseLeave={handleMoreLeave}
            >
              {pages.slice(8).map((page) => (
                <a
                  key={page.key}
                  href={`#${page.key}`}
                  onClick={() => setMoreOpen(false)}
                  className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    route === page.key
                      ? "bg-[#7bd355]/15 text-[#7bd355]"
                      : "text-[#e8ecee]/70 hover:bg-[#e8ecee]/[.08] hover:text-[#e8ecee]"
                  }`}
                >
                  {page.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a
            href={JOIN_FORM_URL}
            target="_blank"
            rel="noreferrer"
            className="magnetic hidden rounded-full bg-[#7bd355] px-6 py-2.5 text-sm font-bold text-[#0c140a] lg:inline-block"
          >
            Join Community
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8ecee]/10 bg-[#e8ecee]/6 text-[#e8ecee] lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <line y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="2" />
              <line y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="2" />
              <line y1="13" x2="18" y2="13" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <>
          <div className="fixed inset-0 z-[-1] bg-black/50" onClick={() => setOpen(false)} />
          <div className="mx-auto mt-3 grid max-w-7xl animate-slide-up gap-1 overflow-hidden rounded-2xl border border-[#e8ecee]/10 bg-[#333333]/95 p-3 backdrop-blur-xl lg:hidden">
            {pages.map((page) => (
              <a
                key={page.key}
                href={`#${page.key}`}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 transition ${
                  route === page.key
                    ? "bg-[#7bd355]/15 text-[#7bd355] font-bold"
                    : "text-[#e8ecee]/75 hover:bg-[#e8ecee]/[.08] hover:text-[#e8ecee]"
                }`}
              >
                {page.label}
                <span className="text-[10px] opacity-50">→</span>
              </a>
            ))}
            <a
              href={JOIN_FORM_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-2xl bg-[#7bd355] py-3.5 text-center text-sm font-bold text-[#0c140a]"
            >
              Join Community
            </a>
          </div>
        </>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Particle Field (Hero background)                                   */
/* ------------------------------------------------------------------ */

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const COUNT = isMobile ? 38 : 95;
    const LINK = isMobile ? 110 : 150;
    const mouse = { x: -9999, y: -9999 };

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    const pts: P[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 0.7,
    }));

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    canvas.parentElement?.addEventListener("mousemove", onMove);
    canvas.parentElement?.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

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
            const a = (1 - dist / LINK) * 0.5;
            ctx.strokeStyle = `rgba(123,211,85,${a})`;
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

    return () => {
      cancelAnimationFrame(raf);
      canvas.parentElement?.removeEventListener("mousemove", onMove);
      canvas.parentElement?.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/*  Kinetic Word (Hero title animation)                                */
/* ------------------------------------------------------------------ */

function KineticWord({
  word,
  className = "",
  baseDelay = 0,
  outline = false,
}: {
  word: string;
  className?: string;
  baseDelay?: number;
  outline?: boolean;
}) {
  return (
    <span className={`inline-block whitespace-nowrap ${className}`} aria-label={word}>
      {word.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className={`inline-block ${outline ? "outline-text" : ""}`}
          initial={{ opacity: 0, y: 90, rotateX: 80, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: baseDelay + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

const heroChips = [
  { icon: "◈", text: "GENERATIVE AI", style: { top: "22%", left: "6%", animationDelay: "0s" } },
  { icon: "⬡", text: "MACHINE LEARNING", style: { top: "16%", right: "7%", animationDelay: "1.2s" } },
  { icon: "◉", text: "COMPUTER VISION", style: { top: "48%", left: "3%", animationDelay: "2.1s" } },
  { icon: "▣", text: "ROBOTICS", style: { top: "44%", right: "4%", animationDelay: "0.7s" } },
  { icon: "◬", text: "DATA SCIENCE", style: { top: "70%", left: "9%", animationDelay: "1.6s" } },
  { icon: "⬢", text: "AI AGENTS", style: { top: "66%", right: "10%", animationDelay: "2.6s" } },
];

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

function Hero() {
  const isMobile = useIsMobile();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 40 });

  const onMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    setTilt({
      x: (e.clientX / innerWidth - 0.5) * 18,
      y: (e.clientY / innerHeight - 0.5) * 18,
    });
    setSpot({
      x: (e.clientX / innerWidth) * 100,
      y: (e.clientY / innerHeight) * 100,
    });
  };

  return (
    <section
      className="relative -mt-[88px] flex min-h-screen flex-col overflow-hidden bg-[#050705] text-[#e8ecee]"
      onMouseMove={onMove}
    >
      <div className="hero-aurora" />
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-beam" />
        <div className="hero-beam" />
        <div className="hero-beam" />
      </div>
      <div className="hero-floor" />
      <div
        className="hero-spotlight"
        style={{ "--sx": `${spot.x}%`, "--sy": `${spot.y}%` } as React.CSSProperties}
      />
      <div className="absolute inset-0">
        <ParticleField />
      </div>

      {!isMobile && (
        <div
          className="pointer-events-none absolute inset-0 grid place-items-center"
          style={{ transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0)` }}
          aria-hidden="true"
        >
          <div className="orbit-ring h-[46vw] w-[46vw]" style={{ "--dur": "44s" } as React.CSSProperties} />
          <div
            className="orbit-ring orbit-ring--dashed absolute h-[60vw] w-[60vw]"
            style={{ "--dur": "70s" } as React.CSSProperties}
          />
          <div
            className="orbit-ring absolute h-[33vw] w-[33vw]"
            style={{ "--dur": "28s" } as React.CSSProperties}
          />
        </div>
      )}

      {!isMobile &&
        heroChips.map((c) => (
          <motion.div
            key={c.text}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 + Math.random() * 0.6, duration: 0.6 }}
            className="float-chip z-10"
            style={c.style as React.CSSProperties}
          >
            <i className="text-[#7bd355]">{c.icon}</i>
            {c.text}
          </motion.div>
        ))}

      <div className="noise-overlay" />

      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 pb-10 pt-32 text-center sm:pt-36">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="hero-eyebrow mb-8 text-[11px] font-bold uppercase tracking-[0.32em] text-[#e8ecee] sm:text-xs"
        >
          <span className="pulse-dot" />
          Official Digital Headquarters
          <span className="text-[#7bd355]">· EST 2025</span>
        </motion.div>

        <h1
          className="font-heading text-[clamp(2.8rem,10.5vw,7.8rem)] font-black leading-[0.88] tracking-[-0.05em] sm:tracking-[-0.07em]"
          style={{ perspective: "800px" }}
        >
          <KineticWord word="FROM IDEAS" outline baseDelay={0.35} className="mr-[0.22em]" />
          <KineticWord word="TO" baseDelay={0.55} />
          <br />
          <span className="shine-text">
            <KineticWord word="INTELLIGENCE" baseDelay={0.85} />
          </span>
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 h-px w-44 origin-center bg-gradient-to-r from-transparent via-[#7bd355] to-transparent sm:w-72"
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.85 }}
          className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-[#e8ecee]/85 sm:text-xl"
        >
          Pakistan's most ambitious student-led AI society — turning{" "}
          <span className="font-semibold text-[#7bd355]">textbook theory</span> into{" "}
          <span className="font-semibold text-[#e8ecee]">production-grade portfolios</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.05 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href={JOIN_FORM_URL} target="_blank" rel="noreferrer" className="cta-premium text-base">
            <span>
              Join the Society
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
          <a href="#chapters" className="cta-ghost text-base">
            <svg className="h-4 w-4 text-[#7bd355]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 010 20 15.3 15.3 0 010-20z" />
            </svg>
            Explore Chapters
          </a>
        </motion.div>

        {/* Stats — ONE grid only */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.3 }}
          className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
        >
          {stats.map(([value, label, suffix]) => (
            <div
              key={label}
              className="stat-glass text-left"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
                e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
              }}
            >
              <strong>
                <CountUp value={value} suffix={suffix} />
              </strong>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#939596] sm:text-[13px]">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  About Section                                                      */
/* ------------------------------------------------------------------ */

function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#0a0d0a] py-28 text-[#e8ecee]">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="About Us"
          title="Who We Are"
          copy="Sociapi Society is Pakistan's most ambitious student-led AI community, bridging the gap between academic theory and real-world technology skills."
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-[#e8ecee]/10 bg-[#333333]/30 p-8 backdrop-blur-sm">
              <h3 className="font-heading text-2xl font-bold text-[#7bd355]">Our Mission</h3>
              <p className="mt-4 leading-relaxed text-[#939596]">
                To empower students with practical AI, data science, and technology skills through hands-on projects,
                mentorship, and a vibrant community — transforming textbook knowledge into production-grade portfolios.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-[#e8ecee]/10 bg-[#333333]/30 p-8 backdrop-blur-sm">
              <h3 className="font-heading text-2xl font-bold text-[#7bd355]">Our Vision</h3>
              <p className="mt-4 leading-relaxed text-[#939596]">
                A future where every student in Pakistan has access to world-class AI education, professional networks,
                and the confidence to build technology that matters.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Programs grid */}
        <Reveal delay={0.3} className="mt-16">
          <h3 className="mb-8 text-center font-heading text-xl font-bold text-[#e8ecee]">Our Programs</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {panels.slice(0, 4).map((panel, i) => (
              <div
                key={panel}
                className="group flex items-center gap-4 rounded-2xl border border-[#e8ecee]/10 bg-[#333333]/20 p-5 transition hover:border-[#7bd355]/30 hover:bg-[#7bd355]/[.04]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7bd355]/10 text-[#7bd355] transition group-hover:bg-[#7bd355]/20">
                  {programIcons[i]}
                </span>
                <span className="font-heading text-sm font-bold tracking-tight">{panel}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {panels.slice(4).map((panel, i) => (
              <div
                key={panel}
                className="group flex items-center gap-4 rounded-2xl border border-[#e8ecee]/10 bg-[#333333]/20 p-5 transition hover:border-[#7bd355]/30 hover:bg-[#7bd355]/[.04]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7bd355]/10 text-[#7bd355] transition group-hover:bg-[#7bd355]/20">
                  {programIcons[(i + 4) % programIcons.length]}
                </span>
                <span className="font-heading text-sm font-bold tracking-tight">{panel}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Team Section                                                       */
/* ------------------------------------------------------------------ */

function TeamSection() {
  const [selected, setSelected] = useState<Member | null>(null);

  const grouped = useMemo(() => {
    const groups: Record<string, Member[]> = {};
    for (const m of teamMembers) {
      (groups[m.department] ??= []).push(m);
    }
    return groups;
  }, []);

  return (
    <section id="team" className="relative overflow-hidden bg-[#050705] py-28 text-[#e8ecee]">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="Our Team"
          title="The People Behind Sociapi"
          copy="A passionate group of students and mentors building the future of AI in Pakistan."
        />

        {Object.entries(grouped).map(([dept, members]) => (
          <div key={dept} className="mb-12">
            <Reveal>
              <h3 className="mb-6 font-heading text-lg font-bold tracking-wide text-[#7bd355]">{dept}</h3>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {members.map((m) => (
                <Reveal key={m.name} delay={0.05}>
                  <button
                    onClick={() => setSelected(m)}
                    className="group w-full rounded-2xl border border-[#e8ecee]/10 bg-[#333333]/20 p-5 text-left transition hover:border-[#7bd355]/30 hover:bg-[#7bd355]/[.04]"
                  >
                    <Avatar
                      src={m.image}
                      name={m.name}
                      className="mb-4 h-20 w-20 rounded-2xl object-cover"
                    />
                    <h4 className="font-heading text-base font-bold">{m.name}</h4>
                    <p className="text-sm text-[#7bd355]">{m.role}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {m.skills.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-[#7bd355]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#7bd355]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Member modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md rounded-2xl border border-[#e8ecee]/10 bg-[#1a1a1a] p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Avatar src={selected.image} name={selected.name} className="mb-4 h-24 w-24 rounded-2xl object-cover" />
            <h3 className="font-heading text-xl font-bold">{selected.name}</h3>
            <p className="text-[#7bd355]">{selected.role}</p>
            <p className="mt-1 text-sm text-[#939596]">{selected.department}</p>
            <p className="mt-4 text-sm leading-relaxed text-[#939596]">{selected.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {selected.skills.map((s) => (
                <span key={s} className="rounded-full bg-[#7bd355]/10 px-3 py-1 text-xs font-medium text-[#7bd355]">
                  {s}
                </span>
              ))}
            </div>
            <button
              onClick={() => setSelected(null)}
              className="mt-6 rounded-xl border border-[#e8ecee]/10 px-4 py-2 text-sm text-[#e8ecee] transition hover:bg-[#e8ecee]/10"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Events / Timeline Section                                          */
/* ------------------------------------------------------------------ */

function EventsSection() {
  return (
    <section id="events" className="relative overflow-hidden bg-[#0a0d0a] py-28 text-[#e8ecee]">
      <div className="mx-auto max-w-4xl px-5">
        <SectionTitle
          label="Events & Blog"
          title="Our Journey"
          copy="From our founding to flagship events, every milestone shapes the society."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#7bd355]/50 via-[#7bd355]/20 to-transparent md:left-1/2" />

          {timeline.map(([date, title, desc], i) => (
            <Reveal key={date} delay={i * 0.1}>
              <div className={`relative mb-10 flex flex-col md:flex-row ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="absolute left-6 md:left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#7bd355] bg-[#0a0d0a]" />
                <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#7bd355]">{date}</span>
                  <h3 className="mt-1 font-heading text-lg font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#939596]">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Services Section                                                   */
/* ------------------------------------------------------------------ */

function ServicesSection() {
  const serviceIcons = [
    <svg key="s0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>,
    <svg key="s1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>,
    <svg key="s2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>,
    <svg key="s3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>,
  ];

  return (
    <section id="services" className="relative overflow-hidden bg-[#050705] py-28 text-[#e8ecee]">
      <div className="mx-auto max-w-5xl px-5">
        <SectionTitle
          label="Services"
          title="What We Offer"
          copy="Professional-grade services by our student talent — from design to development."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service} delay={i * 0.1}>
              <div className="group rounded-2xl border border-[#e8ecee]/10 bg-[#333333]/20 p-8 transition hover:border-[#7bd355]/30 hover:bg-[#7bd355]/[.04]">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7bd355]/10 text-[#7bd355] transition group-hover:bg-[#7bd355]/20">
                  {serviceIcons[i]}
                </span>
                <h3 className="mt-5 font-heading text-xl font-bold">{service}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#939596]">
                  Our team delivers high-quality {service.toLowerCase()} solutions for student organizations,
                  startups, and local businesses.
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Partner Section                                                    */
/* ------------------------------------------------------------------ */

function PartnerSection() {
  return (
    <section id="partner" className="relative overflow-hidden bg-[#0a0d0a] py-28 text-[#e8ecee]">
      <div className="mx-auto max-w-5xl px-5">
        <SectionTitle
          label="Partners"
          title="Our Partners"
          copy="We collaborate with organizations that share our vision for student empowerment and technology access."
        />

        <Reveal delay={0.1}>
          <h3 className="mb-6 text-center font-heading text-lg font-bold text-[#7bd355]">Event Partners</h3>
          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            {eventPartners.map((p) => (
              <PartnerLogo key={p.name} {...p} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <h3 className="mb-6 text-center font-heading text-lg font-bold text-[#7bd355]">Community Partners</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {communityPartners.map((p) => (
              <PartnerLogo key={p.name} {...p} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery Section                                                    */
/* ------------------------------------------------------------------ */

function GallerySection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative overflow-hidden bg-[#050705] py-28 text-[#e8ecee]">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          label="Gallery"
          title="Moments That Matter"
          copy="Snapshots from our events, workshops, and community gatherings."
        />

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((src, i) => (
            <Reveal key={src + i} delay={Math.min(i * 0.03, 0.3)}>
              <button
                onClick={() => setLightbox(src)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#e8ecee]/10 bg-[#333333]/20 transition hover:border-[#7bd355]/30"
              >
                <img
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="Gallery" className="max-h-[90vh] max-w-full rounded-2xl object-contain" />
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Shop Section                                                       */
/* ------------------------------------------------------------------ */

function ShopSection() {
  const [cart, setCart] = useState<typeof shopItems>([]);

  const addToCart = (item: typeof shopItems[number]) => {
    setCart((prev) => [...prev, item]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const checkout = () => {
    const lines = cart.map((item) => `${item.name} — PKR ${item.price}`).join("\n");
    const msg = encodeURIComponent(`Sociapi Society Order:\n\n${lines}\n\nTotal: PKR ${total}`);
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
  };

  return (
    <section id="shop" className="relative overflow-hidden bg-[#0a0d0a] py-28 text-[#e8ecee]">
      <div className="mx-auto max-w-5xl px-5">
        <SectionTitle
          label="Shop"
          title="Sociapi Merch"
          copy="Wear the brand. Support the mission."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {shopItems.map((item) => (
            <Reveal key={item.name}>
              <div className="group rounded-2xl border border-[#e8ecee]/10 bg-[#333333]/20 p-6 transition hover:border-[#7bd355]/30">
                <div className="mb-4 aspect-square overflow-hidden rounded-xl bg-[#1a1a1a]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <h3 className="font-heading text-lg font-bold">{item.name}</h3>
                <p className="mt-1 text-[#7bd355]">PKR {item.price.toLocaleString()}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-4 w-full rounded-xl bg-[#7bd355]/10 py-2.5 text-sm font-bold text-[#7bd355] transition hover:bg-[#7bd355]/20"
                >
                  Add to Cart
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="mt-10 rounded-2xl border border-[#7bd355]/30 bg-[#333333]/30 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold">Cart ({cart.length} items)</h3>
                <p className="text-[#7bd355]">Total: PKR {total.toLocaleString()}</p>
              </div>
              <button
                onClick={checkout}
                className="rounded-xl bg-[#7bd355] px-6 py-3 text-sm font-bold text-[#0c140a] transition hover:bg-[#7bd355]/90"
              >
                Checkout via WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Career Section                                                     */
/* ------------------------------------------------------------------ */

function CareerSection() {
  return (
    <section id="career" className="relative overflow-hidden bg-[#050705] py-28 text-[#e8ecee]">
      <div className="mx-auto max-w-5xl px-5">
        <SectionTitle
          label="Career"
          title="Open Positions"
          copy="Join our team and make an impact. Volunteer and internship opportunities available."
        />

        <div className="space-y-4">
          {careers.map((job, i) => (
            <Reveal key={job.title} delay={i * 0.08}>
              <div className="group rounded-2xl border border-[#e8ecee]/10 bg-[#333333]/20 p-6 transition hover:border-[#7bd355]/30">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-bold">{job.title}</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#7bd355]/10 px-3 py-0.5 text-xs font-medium text-[#7bd355]">
                        {job.type}
                      </span>
                      <span className="rounded-full bg-[#e8ecee]/10 px-3 py-0.5 text-xs font-medium text-[#939596]">
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <a
                    href={JOIN_FORM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 rounded-xl bg-[#7bd355]/10 px-5 py-2.5 text-sm font-bold text-[#7bd355] transition hover:bg-[#7bd355]/20"
                  >
                    Apply Now →
                  </a>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#939596]">{job.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact Section                                                    */
/* ------------------------------------------------------------------ */

function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0a0d0a] py-28 text-[#e8ecee]">
      <div className="mx-auto max-w-3xl px-5">
        <SectionTitle
          label="Contact"
          title="Get In Touch"
          copy="Have questions, ideas, or want to collaborate? We'd love to hear from you."
        />

        <Reveal>
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-[#e8ecee]/10 bg-[#333333]/20 p-8 backdrop-blur-sm">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#939596]">Name</label>
                <input
                  required
                  type="text"
                  className="w-full rounded-xl border border-[#e8ecee]/10 bg-[#1a1a1a] px-4 py-3 text-sm text-[#e8ecee] outline-none transition focus:border-[#7bd355]/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#939596]">Email</label>
                <input
                  required
                  type="email"
                  className="w-full rounded-xl border border-[#e8ecee]/10 bg-[#1a1a1a] px-4 py-3 text-sm text-[#e8ecee] outline-none transition focus:border-[#7bd355]/50"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#939596]">Message</label>
              <textarea
                required
                rows={5}
                className="w-full rounded-xl border border-[#e8ecee]/10 bg-[#1a1a1a] px-4 py-3 text-sm text-[#e8ecee] outline-none transition focus:border-[#7bd355]/50 resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-[#7bd355] py-3.5 text-sm font-bold text-[#0c140a] transition hover:bg-[#7bd355]/90"
            >
              {sent ? "✓ Message Sent!" : "Send Message"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reviews Section                                                    */
/* ------------------------------------------------------------------ */

function ReviewsSection() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-[#050705] py-28 text-[#e8ecee]">
      <div className="mx-auto max-w-5xl px-5">
        <SectionTitle
          label="Reviews"
          title="What Members Say"
          copy="Real feedback from our community."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((review, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="rounded-2xl border border-[#e8ecee]/10 bg-[#333333]/20 p-8">
                <div className="mb-3 text-[#7bd355]">
                  {"★★★★★".split("").map((star, si) => (
                    <span key={si}>{star}</span>
                  ))}
                </div>
                <p className="leading-relaxed text-[#939596]">"{review}"</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQs Section                                                       */
/* ------------------------------------------------------------------ */

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="relative overflow-hidden bg-[#0a0d0a] py-28 text-[#e8ecee]">
      <div className="mx-auto max-w-3xl px-5">
        <SectionTitle
          label="FAQs"
          title="Frequently Asked Questions"
          copy="Everything you need to know about Sociapi Society."
        />

        <div className="space-y-3">
          {faqs.map(([category, question, answer], i) => (
            <Reveal key={question} delay={i * 0.06}>
              <div className="rounded-2xl border border-[#e8ecee]/10 bg-[#333333]/20 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7bd355]">{category}</span>
                    <h3 className="mt-0.5 font-heading text-base font-bold">{question}</h3>
                  </div>
                  <span
                    className={`ml-4 shrink-0 text-[#7bd355] transition-transform duration-200 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-[#939596]">{answer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-[#e8ecee]/10 bg-[#050705] py-16 text-[#939596]">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <span className="font-heading text-base font-bold tracking-[0.28em] text-[#e8ecee]">SOCIAPI</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed">
              Pakistan's most ambitious student-led AI society.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-[#e8ecee]">Pages</h4>
            <div className="space-y-2">
              {pages.slice(0, 7).map((p) => (
                <a key={p.key} href={`#${p.key}`} className="block text-sm transition hover:text-[#e8ecee]">
                  {p.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-[#e8ecee]">More</h4>
            <div className="space-y-2">
              {pages.slice(7).map((p) => (
                <a key={p.key} href={`#${p.key}`} className="block text-sm transition hover:text-[#e8ecee]">
                  {p.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-[#e8ecee]">Connect</h4>
            <div className="space-y-2">
              <a
                href={JOIN_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="block text-sm transition hover:text-[#e8ecee]"
              >
                Join Community
              </a>
              <a href="#contact" className="block text-sm transition hover:text-[#e8ecee]">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#e8ecee]/10 pt-8 text-center text-xs">
          © {new Date().getFullYear()} Sociapi Society. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const route = useHashRoute();

  return (
    <div className="min-h-screen bg-[#050705] font-body text-[#e8ecee] antialiased">
      <SpeedInsights />
      <Nav route={route} />

      {route === "home" && <Hero />}
      {route === "about" && <AboutSection />}
      {route === "chapters" && <ChaptersPage />}
      {route === "team" && <TeamSection />}
      {route === "events" && <EventsSection />}
      {route === "services" && <ServicesSection />}
      {route === "partner" && <PartnerSection />}
      {route === "gallery" && <GallerySection />}
      {route === "shop" && <ShopSection />}
      {route === "career" && <CareerSection />}
      {route === "contact" && <ContactSection />}
      {route === "reviews" && <ReviewsSection />}
      {route === "faqs" && <FAQSection />}

      <Footer />
    </div>
  );
}
