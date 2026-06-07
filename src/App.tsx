import { FormEvent, useEffect, useMemo, useState } from "react";
import ChaptersPage from "./Chapters";

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
  | "home"
  | "about"
  | "team"
  | "events"
  | "services"
  | "partner"
  | "gallery"
  | "shop"
  | "career"
  | "contact"
  | "reviews"
  | "faqs"
  | "chapters";

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
  {
    name: "Muhammad Zuhair Zeb",
    role: "Founder & President",
    department: "Leadership",
    image: "Image/Team Pic/Zuhair.jpeg?auto=format&fit=crop&w=500&q=80",
    bio: "Muhammad Zuhair Zeb belongs to Swabi, Pakistan. He is an undergraduate student in Artificial Intelligence at Islamia College University, Peshawar. He is the founder of Sociapi Society, a student-led platform that promotes technology, creativity, and skills development.",
    skills: ["AI", "Web Developer", "WordPress Developer", "Business Intelligence", "Community Leadership"],
    orbit: 0,
    angle: 0,
  },
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

const panels = ["Artificial Intelligence", "Machine Learning", "Data Science", "Generative AI", "Robotics", "Computer Vision", "Web Development", "Business Intelligence"];
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
const faqs = [
  ["Membership", "Who can join Sociapi Society?", "Students interested in AI, Data Science, Robotics, design, media, events, and technology leadership can apply."],
  ["Programs", "Do I need coding experience?", "No. We support beginner to advanced learners with guided tracks and project-based mentorship."],
  ["Events", "What are Mehfil AI and Agentum 2026?", "They are flagship experiences focused on AI learning, agents, innovation, and student achievement."],
  ["Partnership", "Can organizations partner with Sociapi Society?", "Yes. We welcome event, learning, and community partners through a structured partnership process."],
  ["Career", "Are internships available?", "The career page lists volunteer, membership, and internship opportunities as they open."],
  ["Shop", "How does checkout work?", "Products are added to cart and checkout opens WhatsApp with your order details."],
];

// Hook: detect mobile (used to swap heavy layouts)
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

function Nav({ route }: { route: PageKey }) {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  useEffect(() => {
    const closeAll = () => { setOpen(false); setMoreOpen(false); };
    addEventListener("hashchange", closeAll);
    return () => { removeEventListener("hashchange", closeAll); };
  }, []);
  const linkCls = (key: string) =>
    `inline-flex items-center rounded-full px-3.5 py-2 text-xs font-medium transition duration-200 ${
      route === key
        ? "bg-[#7bd355]/15 text-[#7bd355] ring-1 ring-[#7bd355]/30"
        : "text-white/70 hover:text-white hover:bg-white/[.08]"
    }`;

  return (
    <header className="relative z-40 px-4 pt-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/[0.11] bg-[#111]/55 px-4 py-3 shadow-xl shadow-black/20 backdrop-blur-2xl sm:px-6 sm:py-3.5">
        <a href="#home" className="flex shrink-0 items-center gap-2.5 transition hover:opacity-90">
          <img src="/logo.png" alt="Sociapi Society logo" className="h-9 w-9 rounded-xl ring-1 ring-[#7bd355]/35 shadow-sm object-contain bg-white/5" />
          <span className="font-heading hidden text-base font-bold tracking-[0.28em] sm:block text-white">SOCIAPI</span>
        </a>
        <div className="hidden items-center gap-0.5 lg:flex">
          {pages.slice(0, 8).map((page) => (
            <a key={page.key} className={linkCls(page.key)} href={`#${page.key}`}>{page.label}</a>
          ))}
          <div className="relative" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button className={`${linkCls("")} flex items-center gap-1`}>
              More<span className="mt-px text-[10px]">▼</span>
            </button>
            <div className={`absolute right-0 top-full mt-2 w-52 origin-top-right rounded-2xl border border-white/12 bg-[#151815]/96 p-2 shadow-2xl backdrop-blur-xl transition-all duration-200 ${moreOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0 pointer-events-none"}`}>
              {pages.slice(8).map((page) => (
                <a key={page.key} href={`#${page.key}`} className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${route === page.key ? "bg-[#7bd355]/15 text-[#7bd355]" : "text-white/70 hover:bg-white/[.08] hover:text-white"}`}>
                  {page.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/6 text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><line y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="2"/><line y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="2"/><line y1="13" x2="18" y2="13" stroke="currentColor" strokeWidth="2"/></svg>
        </button>
        <a href="#partner" className="magnetic hidden rounded-full bg-[#7bd355] px-6 py-2.5 text-sm font-bold text-[#1a1f18] lg:inline-block">Partner</a>
      </nav>
      {open && (
        <>
          <div className="fixed inset-0 z-[-1] bg-black/50" onClick={() => setOpen(false)} />
          <div className="mx-auto mt-3 grid max-w-7xl animate-slide-up gap-1 overflow-hidden rounded-2xl border border-white/10 bg-[#111]/95 p-3 backdrop-blur-xl lg:hidden">
            {pages.map((page) => (
              <a key={page.key} href={`#${page.key}`} onClick={() => setOpen(false)} className={`flex items-center justify-between rounded-xl px-4 py-3.5 transition ${route === page.key ? "bg-[#7bd355]/15 text-[#7bd355] font-bold" : "text-white/75 hover:bg-white/[.08] hover:text-white"}`}>
                {page.label}<span className="text-[10px] opacity-50">→</span>
              </a>
            ))}
            <a href="#partner" onClick={() => setOpen(false)} className="mt-2 block rounded-2xl bg-[#7bd355] py-3.5 text-center text-sm font-bold text-[#111]">Partner With Us</a>
          </div>
        </>
      )}
    </header>
  );
}

function Hero() {
  const isMobile = useIsMobile();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white" onMouseMove={(e) => !isMobile && setMouse({ x: (e.clientX / innerWidth - 0.5) * 24, y: (e.clientY / innerHeight - 0.5) * 24 })}>
      <video className="absolute inset-0 h-full w-full object-cover opacity-70" autoPlay loop muted playsInline poster="https://images.pexels.com/videos/18333010/abstract-brain-nerf-tunnel-18333010.jpeg?auto=compress&cs=tinysrgb&w=1600">
        <source src="https://videos.pexels.com/video-files/18333010/18333010-uhd_3840_2160_25fps.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123,211,85,.12),rgba(0,0,0,.55)_38%,rgba(0,0,0,.95)_85%)]" />
      <div className="hero-grid absolute inset-0 opacity-35" />
      <div className="absolute inset-0 flex items-center justify-center pt-12">
        <div className="globe-wrap relative aspect-square w-[min(1180px,150vw)]" style={{ transform: `translate3d(${mouse.x}px, ${mouse.y}px, 0)` }}>
          <div className="holo-globe absolute inset-[15%] rounded-full" />
          {!isMobile && (
            <svg className="absolute inset-[11%] animate-spin-slow" viewBox="0 0 500 500" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx="250" cy="250" r={70 + i * 12} fill="none" stroke="rgba(123,211,85,.16)" strokeWidth="1" />)}
              {Array.from({ length: 18 }).map((_, i) => <line key={i} x1="250" y1="250" x2={250 + Math.cos(i) * 220} y2={250 + Math.sin(i * 1.7) * 220} stroke="rgba(232,236,238,.18" />)}
            </svg>
          )}
          {!isMobile && Array.from({ length: 20 }).map((_, i) => <span key={i} className="node" style={{ left: `${50 + Math.cos(i * 1.7) * (24 + (i % 4) * 5)}%`, top: `${50 + Math.sin(i * 1.2) * (24 + (i % 5) * 4)}%`, animationDelay: `${i * 0.12}s` }} />)}
          {!isMobile && panels.map((panel, i) => <div key={panel} className="tech-panel" style={{ transform: `rotate(${i * 45}deg) translateY(-43vw) rotate(-${i * 45}deg)`, animationDelay: `${i * 0.18}s` }}><span>{panel}</span></div>)}
        </div>
      </div>
      <div className="pointer-events-none relative z-10 flex min-h-screen flex-col justify-end px-5 pb-8 pt-28 text-center sm:pb-12 sm:pt-32">
        <p className="mx-auto mb-4 max-w-xl text-xs sm:text-sm uppercase tracking-[0.45em] text-[#7bd355] reveal">Official Digital Headquarters</p>
        <h1 className="reveal mx-auto max-w-6xl font-heading text-[clamp(2.6rem,11vw,9rem)] font-black leading-[0.86] tracking-[-0.06em] sm:tracking-[-0.08em]">FROM IDEAS<br /><span className="bg-gradient-to-r from-[#e8ecee] via-[#7bd355] to-[#e8ecee] bg-clip-text text-transparent">TO INTELLIGENCE</span></h1>
        <p className="reveal mx-auto mt-5 max-w-3xl text-balance text-sm text-[#e8ecee]/85 sm:text-xl sm:mt-6 px-2">Translating textbook concepts into production grade portfolios. Building future AI engineers, data scientists, and innovators.</p>
        <div className="pointer-events-auto mt-7 flex flex-wrap justify-center gap-3">
          <a href="#contact" className="magnetic rounded-full bg-[#7bd355] px-6 py-3.5 text-sm font-bold text-[#1b2118] shadow-2xl shadow-[#7bd355]/35 sm:px-7 sm:py-4 sm:text-base">Join Community</a>
          <a href="#services" className="magnetic rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-xl sm:px-7 sm:py-4 sm:text-base">Explore Programs</a>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map(([value, label, suffix]) => <div key={label} className="group relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] border border-white/12 bg-gradient-to-br from-white/[.08] to-transparent p-4 sm:p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#7bd355]/35 hover:shadow-lg hover:shadow-[#7bd355]/10"><strong className="font-heading block text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#7bd355]"><CountUp value={value} suffix={suffix} /></strong><p className="mt-1.5 text-[11px] sm:text-xs font-medium tracking-wide text-white/55">{label}</p></div>)}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ label, title, copy }: { label?: string; title: string; copy?: string }) {
  return <div className="mx-auto mb-10 sm:mb-12 max-w-3xl text-center px-2">{label && <p className="mb-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#7bd355]">{label}</p>}<h2 className="font-heading text-3xl sm:text-4xl font-black tracking-[-0.04em] sm:tracking-[-0.05em] text-white md:text-6xl">{title}</h2>{copy && <p className="mt-4 text-base sm:text-lg text-white/65">{copy}</p>}</div>;
}

function FounderShowcase() {
  const founder = teamMembers[0];
  return <section className="section"><SectionTitle label="Founder Showcase" title="Built by students who ship." copy="A leadership profile designed around execution, mentorship, and measurable student outcomes." />
    <div className="mx-auto grid max-w-6xl items-center gap-6 sm:gap-8 rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-white/[.06] p-5 sm:p-6 md:p-10 shadow-2xl shadow-[#7bd355]/10 backdrop-blur-2xl md:grid-cols-[.9fr_1.1fr]">
      <img src={founder.image} alt={founder.name} className="mx-auto aspect-[4/5] w-full max-w-xs sm:max-w-none rounded-[1.5rem] sm:rounded-[2rem] object-cover grayscale transition duration-500 hover:grayscale-0 md:max-w-none" loading="lazy" />
      <div><p className="text-[#7bd355] text-sm sm:text-base">Founder & President</p><h2 className="mt-2 font-heading text-3xl sm:text-5xl font-black text-white">{founder.name}</h2><p className="mt-4 sm:mt-5 text-base sm:text-lg leading-7 sm:leading-8 text-white/70">{founder.bio}</p><div className="mt-5 sm:mt-6 flex flex-wrap gap-2">{founder.skills.map((s) => <span key={s} className="rounded-full border border-[#7bd355]/25 bg-[#7bd355]/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#d9ffd0]">{s}</span>)}</div><a className="mt-6 sm:mt-8 inline-flex rounded-full bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-[#1b2118]" href="#" target="_blank" rel="noreferrer">LinkedIn Profile</a></div>
    </div></section>;
}

function TimelineSection() {
  return <section className="section"><SectionTitle label="Startup Journey" title="A timeline with velocity." copy="From founding moment to flagship AI gatherings, Sociapi Society is engineered like a launch sequence." />
    <div className="mx-auto max-w-6xl"><div className="relative grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4"><div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-[#7bd355] to-transparent lg:block" />
    {timeline.map((item, i) => <div key={item[0]} className="reveal rounded-[1.75rem] sm:rounded-[2rem] border border-white/10 bg-white/[.055] p-5 sm:p-6 backdrop-blur-xl" style={{ animationDelay: `${i * 0.12}s` }}>
      <div className="mb-4 sm:mb-5 h-4 w-4 rounded-full bg-[#7bd355] shadow-[0_0_30px_#7bd355]" />
      <p className="text-sm text-[#7bd355]">{item[0]}</p><h3 className="mt-2 font-heading text-xl sm:text-2xl font-bold text-white">{item[1]}</h3><p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/60">{item[2]}</p></div>)}</div></div>
  </section>;
}

function Organogram() {
  const isMobile = useIsMobile();
  const nodes = ["Co Founder", "Teacher Advisor", "General Secretary", "HR Manager", "Project Manager", "Event Manager", "Technical Team", "Women Wing", "Media Team", "Graphics Team", "Outreach Team", "Organizing Team"];

  if (isMobile) {
    return (
      <section className="section">
        <SectionTitle label="Organogram" title="A living organization map." copy="Connected departments orbit the mission instead of sitting in a static chart." />
        <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/[.04] p-6 backdrop-blur-xl">
          <div className="mb-6 mx-auto h-28 w-28 rounded-full grid place-items-center border-2 border-[#7bd355]/40 bg-gradient-to-br from-[#7bd355]/20 to-transparent text-[#7bd355] font-heading text-xl font-black shadow-[0_0_36px_rgba(123,211,85,.3)]">
            Founder
          </div>
          <div className="mx-auto mb-6 h-8 w-px bg-gradient-to-b from-[#7bd355] to-transparent" />
          <div className="grid grid-cols-2 gap-3">
            {nodes.map((n) => (
              <div key={n} className="rounded-2xl border border-[#7bd355]/20 bg-[#0f160f]/70 px-3 py-3 text-center text-xs font-medium text-white/80 backdrop-blur-md">
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return <section className="section"><SectionTitle label="Organogram" title="A living organization map." copy="Connected departments orbit the mission instead of sitting in a static chart." /><div className="org-map mx-auto max-w-6xl"><div className="org-core">Founder</div>{nodes.map((n, i) => <div key={n} className="org-node" style={{ "--a": `${i * 30}deg` } as React.CSSProperties}>{n}</div>)}</div></section>;
}

function TeamGalaxy({ full = false }: { full?: boolean }) {
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState<Member | null>(null);
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All");
  const [rot, setRot] = useState(0);

  useEffect(() => {
    if (isMobile) return; // skip animation on mobile to prevent hang
    let raf = 0;
    let start = performance.now();
    const tick = (t: number) => {
      setRot(((t - start) / 120000 * 360) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isMobile]);

  const departments = ["All", ...Array.from(new Set(teamMembers.map((m) => m.department)))];
  const filtered = teamMembers.filter((m) => (department === "All" || m.department === department) && m.name.toLowerCase().includes(query.toLowerCase()));
  const visible = full ? filtered : teamMembers;

  return <section className="section" id="team-galaxy">
    <SectionTitle label="Interactive Team Galaxy" title="People arranged like a network." copy={isMobile ? "Tap any member to open their profile." : "Search, filter, hover, and open each profile in a cinematic member modal. The orbit rotates slowly in real time."} />
    {full && <div className="mx-auto mb-8 flex max-w-5xl flex-col gap-3 sm:flex-row px-1">
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search team members..." className="glass-input flex-1" />
      <select value={department} onChange={(e) => setDepartment(e.target.value)} className="glass-input">{departments.map((d) => <option key={d}>{d}</option>)}</select>
    </div>}

    {/* MOBILE: responsive grid (no orbital chaos). DESKTOP: galaxy */}
    {isMobile ? (
      <div className="mx-auto max-w-md px-1">
        {/* Founder featured card */}
        <button
          onClick={() => setSelected(visible[0] ?? teamMembers[0])}
          className="mx-auto mb-6 flex w-full flex-col items-center rounded-[1.75rem] border border-[#7bd355]/40 bg-gradient-to-b from-[#7bd355]/10 to-transparent p-5 backdrop-blur-xl shadow-[0_0_40px_rgba(123,211,85,.18)]"
        >
          <img src={teamMembers[0].image} alt={teamMembers[0].name} className="h-28 w-28 rounded-full object-cover ring-2 ring-[#7bd355]/60" loading="lazy" />
          <p className="mt-3 font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#7bd355]">Founder & President</p>
          <p className="mt-1 text-base font-bold text-white text-center">{teamMembers[0].name}</p>
        </button>

        <div className="grid grid-cols-2 gap-3 xs:grid-cols-3">
          {visible.filter((m) => m.orbit !== 0).map((m) => (
            <button
              key={m.name}
              onClick={() => setSelected(m)}
              className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/[.05] p-3 backdrop-blur-md transition active:scale-95 hover:border-[#7bd355]/40"
            >
              <img src={m.image} alt={m.name} className="h-16 w-16 rounded-full object-cover ring-1 ring-white/10 group-hover:ring-[#7bd355]/50 transition" loading="lazy" />
              <p className="mt-2 text-[10px] font-bold text-white/90 text-center line-clamp-1 w-full">{m.name.split(" ").slice(0, 2).join(" ")}</p>
              <p className="text-[9px] text-[#7bd355]/80 text-center line-clamp-1 w-full mt-0.5">{m.role}</p>
            </button>
          ))}
        </div>
      </div>
    ) : (
      <div className="team-galaxy mx-auto" style={{ "--galaxy-deg": `${rot}deg` } as React.CSSProperties}>
        <div className="galaxy-rings" />
        {visible.map((m) => (
          <button
            key={m.name}
            onClick={(e) => { e.stopPropagation(); setSelected(m); }}
            onKeyDown={(e) => e.key === "Enter" && setSelected(m)}
            className={`member-orb ${m.orbit === 0 ? "founder-orb" : ""}`}
            style={{ "--angle": `${m.angle}deg`, "--radius": `${m.orbit === 0 ? 0 : 50 + m.orbit * 130}px` } as React.CSSProperties}
            aria-label={`View profile of ${m.name}, ${m.role}`}
          >
            <img src={m.image} alt={m.name} loading="lazy" draggable={false} />
            <span>{m.role}</span>
          </button>
        ))}
      </div>
    )}

    {full && <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 px-1">{["20+ Team Members", "11 Departments", "300+ Audience", "2 Major Events"].map((s) => <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[.06] p-4 sm:p-5 text-center text-sm sm:text-base text-white transition hover:border-[#7bd355]/30" key={s}>{s}</div>)}</div>}
    {selected && <ProfileModal member={selected} onClose={() => setSelected(null)} />}
  </section>;
}

function ProfileModal({ member, onClose }: { member: Member; onClose: () => void }) {
  return <div className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-4 backdrop-blur-lg overflow-y-auto" role="dialog" aria-modal="true" onClick={onClose}>
    <div className="relative max-w-3xl w-full rounded-[1.75rem] sm:rounded-[2rem] border border-white/15 bg-[#111]/95 p-5 sm:p-6 text-white shadow-2xl shadow-[#7bd355]/20 md:p-8 my-auto" onClick={(e) => e.stopPropagation()}>
      <button className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-full bg-white/10 px-3 py-1 hover:bg-white/20 transition" onClick={onClose} aria-label="Close profile">✕</button>
      <div className="grid gap-5 sm:gap-6 md:grid-cols-[220px_1fr]">
        <img src={member.image} alt={member.name} className="h-48 sm:h-64 w-full rounded-2xl sm:rounded-3xl object-cover" />
        <div>
          <p className="text-[#7bd355] text-sm">{member.department}</p>
          <h3 className="font-heading text-2xl sm:text-4xl font-black">{member.name}</h3>
          <p className="mt-1 text-white/65 text-sm sm:text-base">{member.role}</p>
          <p className="mt-4 sm:mt-5 leading-6 sm:leading-7 text-sm sm:text-base text-white/70">{member.bio}</p>
          <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">{member.skills.map((s) => <span key={s} className="rounded-full bg-white/10 px-2.5 sm:px-3 py-1 text-xs sm:text-sm">{s}</span>)}</div>
          <div className="mt-5 sm:mt-6 flex gap-3">
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="rounded-full bg-[#7bd355] px-4 py-2 text-sm font-bold text-[#111]">LinkedIn</a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-4 py-2 text-sm">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

const featureIcons = ["🚀", "🧠", "⚡", "🤖", "🔬"];
function FeatureSections() {
  const features = ["Real Projects", "Guidance & Mentorship", "Learn AI Skills", "Build Smart Projects", "Explore Machine Learning"];
  return <section className="section"><SectionTitle label="Programs" title="From classroom theory to production portfolios." copy="Students work on AI, Data Science, Robotics, Automation, Computer Vision, and Technology projects with senior guidance." /><div className="mx-auto grid max-w-6xl gap-4 sm:gap-5 grid-cols-2 md:grid-cols-5">{features.map((f, i) => <div key={f} className="group relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[.09] to-transparent p-5 sm:p-7 text-center backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2.5 hover:border-[#7bd355]/40">
    <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-[#7bd355]/15 text-2xl sm:text-3xl shadow-inner transition group-hover:bg-[#7bd355] group-hover:text-black">{featureIcons[i]}</div>
    <p className="mt-3 sm:mt-4 font-heading text-[10px] sm:text-xs tracking-[.25em] text-[#7bd355]">0{i + 1}</p><h3 className="mt-2 font-heading text-base sm:text-xl font-bold leading-tight text-white">{f}</h3></div>)}
    </div></section>;
}

function Testimonials() {
  return <section className="section"><SectionTitle label="Reviews" title="Voices from the community." copy="A premium testimonial system for students, partners, and event participants." /><div className="testimonial-track">{[...reviews, ...reviews].map((r, i) => <blockquote key={`${r}-${i}`} className="testimonial-card">"{r}"<footer>Student Member</footer></blockquote>)}</div></section>;
}

function PartnersStatsCta() {
  return <section className="section"><SectionTitle label="Ecosystem" title="A partner-ready AI society." copy="Animated partner slots, impact metrics, newsletter capture, and a direct invitation to join." /><div className="partner-strip">{["AI LAB", "DATA GUILD", "ROBOTICS", "VISION", "BI STUDIO", "CLOUD"].map((p) => <span key={p}>{p}</span>)}</div><div className="mx-auto mt-10 sm:mt-12 grid max-w-6xl gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">{stats.map(([v, l, s]) => <div className="stat-card" key={l}><strong><CountUp value={v} suffix={s} /></strong><p>{l}</p></div>)}</div><div className="mx-auto mt-10 sm:mt-12 max-w-6xl rounded-[2rem] sm:rounded-[2.5rem] border border-[#7bd355]/20 bg-[#7bd355]/10 p-6 sm:p-8 text-center"><h3 className="font-heading text-2xl sm:text-4xl font-black text-white">Join Sociapi Society Today.</h3><p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-white/70">Enter the community building future AI engineers, data scientists, and innovators.</p><a href="#contact" className="mt-5 sm:mt-6 inline-flex rounded-full bg-[#7bd355] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-[#111]">Start Membership</a></div></section>;
}

function TechTracks() {
  const tracks = [
    { tag: "AI", title: "Artificial Intelligence", copy: "Foundational and applied AI tracks for real-world problem solving." },
    { tag: "ML", title: "Machine Learning", copy: "Hands-on supervised, unsupervised, and reinforcement learning projects." },
    { tag: "DL", title: "Deep Learning", copy: "Neural networks, transformers, and modern model architectures." },
    { tag: "GenAI", title: "Generative AI", copy: "LLMs, agents, RAG systems, and creative AI pipelines." },
    { tag: "RB", title: "Robotics & Automation", copy: "Smart systems, automation flows, and embedded intelligence." },
    { tag: "CV", title: "Computer Vision", copy: "OpenCV, detection, segmentation, and visual intelligence." },
    { tag: "BI", title: "Business Intelligence", copy: "Power BI dashboards, analytics, and decision systems." },
    { tag: "WEB", title: "Web Development", copy: "Modern frontend, design systems, and AI-powered web apps." },
  ];
  return <section className="section"><SectionTitle label="Learning Tracks" title="Eight tracks. One trajectory." copy="Choose a focused path or combine multiple. Every track is project driven and portfolio first." />
    <div className="mx-auto grid max-w-6xl gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">{tracks.map((t) => <div key={t.title} className="group relative overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem] border border-white/10 bg-white/[.05] p-5 sm:p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-[#7bd355]/40"><span className="font-heading text-xs tracking-[.3em] text-[#7bd355]">{t.tag}</span><h3 className="mt-2 sm:mt-3 font-heading text-lg sm:text-xl font-bold text-white">{t.title}</h3><p className="mt-2 sm:mt-3 text-sm leading-6 text-white/60">{t.copy}</p></div>)}</div>
  </section>;
}

function HowItWorks() {
  const steps = [
    ["01", "Apply", "Submit your application through the membership form on our career page."],
    ["02", "Orient", "Join an orientation cohort and choose your learning tracks and project pods."],
    ["03", "Build", "Work on real AI, data, robotics, design, or media projects with senior mentors."],
    ["04", "Ship", "Present at Mehfil AI, Agentum, and other events. Take the portfolio with you."],
  ];
  return <section className="section"><SectionTitle label="How It Works" title="A four-step pipeline from idea to intelligence." copy="A structured journey designed like a startup product cycle, not a club signup form." />
    <div className="mx-auto grid max-w-6xl gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">{steps.map(([n, t, c]) => <div key={n} className="rounded-[1.5rem] sm:rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[.08] to-transparent p-5 sm:p-6 backdrop-blur-xl"><div className="font-heading text-4xl sm:text-5xl font-black text-[#7bd355]/80">{n}</div><h3 className="mt-2 sm:mt-3 font-heading text-xl sm:text-2xl font-bold text-white">{t}</h3><p className="mt-2 sm:mt-3 text-sm leading-6 text-white/60">{c}</p></div>)}</div>
  </section>;
}

function FeaturedIn() {
  const press = ["3Mind CO", "Global Pathways", "K MAK Marketing"];
  return <section className="section pt-0"><div className="mx-auto max-w-6xl rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-white/[.04] p-6 sm:p-8 backdrop-blur-xl"><p className="text-center text-[10px] sm:text-xs uppercase tracking-[.3em] sm:tracking-[.4em] text-white/55">Event Partners & Sponsors</p><div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3 sm:gap-y-4 opacity-80">{press.map((p) => <span key={p} className="font-heading text-xs sm:text-sm font-bold tracking-[.2em] sm:tracking-[.3em] text-white/65 transition hover:text-[#7bd355]">{p}</span>)}</div></div></section>;
}

function NewsletterCta() {
  const [done, setDone] = useState(false);
  return <section className="section"><div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#7bd355]/15 via-white/[.05] to-transparent p-6 sm:p-8 md:p-12 backdrop-blur-2xl md:grid-cols-[1.2fr_1fr]">
    <div><p className="text-[10px] sm:text-xs uppercase tracking-[.3em] sm:tracking-[.35em] text-[#7bd355]">Newsletter</p><h3 className="mt-3 font-heading text-2xl sm:text-4xl md:text-5xl font-black text-white">Get the weekly AI signal.</h3><p className="mt-3 sm:mt-4 max-w-md text-sm sm:text-base text-white/65">Curated learning resources, project ideas, event invites, and Sociapi Society updates. Once a week. No noise.</p></div>
    <form className="flex flex-col gap-3 self-center" onSubmit={(e: FormEvent) => { e.preventDefault(); setDone(true); }}><input required type="email" className="glass-input" placeholder="you@university.edu" /><button className="rounded-full bg-[#7bd355] px-6 py-3.5 sm:py-4 font-bold text-[#111]">{done ? "Subscribed ✓" : "Subscribe"}</button><p className="text-xs text-white/45">We respect your inbox. Unsubscribe anytime.</p></form>
  </div></section>;
}

function Home() {
  return <><Hero /><FeaturedIn /><FounderShowcase /><FeatureSections /><TechTracks /><HowItWorks /><TimelineSection /><Organogram /><TeamGalaxy /><Testimonials /><PartnersStatsCta /><NewsletterCta /></>;
}

function About() {
  const leaders = [teamMembers[0], teamMembers[1], teamMembers[2]];
  const roles = ["Founder & President", "Co-Founder", "Teacher Advisor"];
  return <main><section className="section pt-28">
    <SectionTitle label="About Us" title="Sociapi Society decodes the future." copy="Sociapi Society, based at Islamia University Peshawar, is a student-led community focused on transforming ideas into practical projects and skills. It fosters an inclusive environment for all students to learn modern technologies such as programming, AI, robotics, and data science." />
    <div className="mx-auto grid max-w-6xl gap-5 grid-cols-1 md:grid-cols-3">{leaders.map((m, i) => <div key={m.name} className="group relative overflow-hidden rounded-[2rem] sm:rounded-[2.25rem] border border-white/10 bg-gradient-to-b from-white/[.08] to-white/[.02] p-6 sm:p-7 text-center backdrop-blur-2xl transition hover:-translate-y-2 hover:border-[#7bd355]/40">
      <img src={m.image} alt={m.name} className="mx-auto mb-4 sm:mb-5 h-36 w-36 sm:h-44 sm:w-44 rounded-full object-cover ring-[4px] ring-white/10 shadow-xl grayscale transition duration-500 group-hover:grayscale-0 group-hover:ring-[#7bd355]/50" loading="lazy" />
      <p className="text-xs sm:text-sm font-bold uppercase tracking-[.25em] sm:tracking-[.3em] text-[#7bd355]">{roles[i]}</p>
      <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-black text-white">{m.name}</h3>
      <p className="mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-white/65">{m.bio}</p>
      <div className="mt-4 sm:mt-5 flex flex-wrap justify-center gap-2">{m.skills.map((s) => <span key={s} className="rounded-full border border-[#7bd355]/20 bg-[#7bd355]/10 px-3 py-1 text-xs font-medium text-[#d9ffd0] transition hover:bg-[#7bd355] hover:text-[#111]">{s}</span>)}</div>
    </div>)}
    </div>
  </section><TimelineSection /></main>;
}

function GlassBlock({ title, copy }: { title: string; copy: string }) {
  return <div className="rounded-[1.75rem] sm:rounded-[2rem] border border-white/10 bg-white/[.055] p-5 sm:p-6 backdrop-blur-xl"><h3 className="font-heading text-xl sm:text-2xl font-bold text-white">{title}</h3><p className="mt-3 sm:mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-white/65">{copy}</p></div>;
}

const blogPosts = [
  {
    id: "mehfil-ai-2026",
    title: "Mehfil AI 2026",
    category: "Flagship Event",
    read: "6 min read",
    author: "Sociapi Editorial",
    image: "Image/1.png?auto=format&fit=crop&w=1200&q=80",
    date: "May 15, 2026",
    excerpt: "Mehfil AI is Sociapi Society's flagship gathering celebrating artificial intelligence learning, practical projects, student showcases, mentorship, and future-ready innovation.",
    content: `Mehfil AI 2026 marks a new era of student-led AI gatherings at Islamia University Peshawar. This flagship event is designed to showcase what happens when textbook concepts meet real-world execution.\n\nArtificial Intelligence is rapidly changing the future of education, careers, startups, and businesses around the world. To help students understand and explore this fast-growing field, Sociapi Society successfully organized Mehfil AI 2026.\n\nEvent Overview\n\nMehfil AI 2026 was organized with the goal of spreading awareness about Artificial Intelligence and helping students learn practical skills that can support their future careers.\n\nConclusion\n\nMehfil AI 2026 was much more than a technology event. It became a platform for inspiration, learning, networking, and innovation where students explored the future of Artificial Intelligence and modern technology.`,
    tags: ["AI", "Events", "Innovation", "Showcase"],
  },
  {
    id: "agentum-2026",
    title: "Agentum 2026 Seminar",
    category: "AI Agents & Automation",
    read: "5 min read",
    author: "Sociapi Editorial",
    image: "Image/Agentum Pic/13.png?auto=format&fit=crop&w=1200&q=80",
    date: "February 17, 2026",
    excerpt: "AGENTUM 2026 brought together 150+ students to explore AI agents, automation, and robotics through three expert-led sessions at Islamia University Peshawar.",
    content: `The AGENTUM 2026 Seminar was successfully held on 17 February 2026, bringing together students, tech enthusiasts, and future innovators to learn about the latest developments in Artificial Intelligence and modern technology.\n\nThe seminar focused on three important topics related to the future of AI, automation, and robotics. Each session was delivered by experienced speakers who shared practical insights and real-world knowledge with the audience.\n\nConclusion\n\nThe AGENTUM 2026 Seminar was a successful and impactful event that helped students understand the importance of Artificial Intelligence, automation, and robotics in the modern world.`,
    tags: ["AI Agents", "Automation", "Robotics", "Seminar"],
  },
];

function BlogPostView({ postId, onClose }: { postId: string; onClose: () => void }) {
  const post = blogPosts.find((p) => p.id === postId);
  if (!post) return null;
  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-[#070907] pb-20">
      <button onClick={onClose} className="fixed top-5 right-5 z-[95] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/80 backdrop-blur-xl text-white text-lg transition hover:bg-[#7bd355] hover:text-black" aria-label="Close article">✕</button>
      <div className="relative h-[50vh] sm:h-[70vh] w-full overflow-hidden">
        <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover" style={{ filter: "brightness(0.45)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070907] via-[#070907]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 sm:px-16 sm:pb-10">
          <div className="mb-4 sm:mb-5 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-block border-l-4 border-[#7bd355] pl-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#7bd355]">{post.category}</span>
            <span className="font-mono text-[10px] sm:text-xs text-white/45 tracking-widest">{post.date}</span>
          </div>
          <h1 className="font-heading font-black text-white leading-[0.88] tracking-[-0.04em] text-3xl sm:text-6xl md:text-7xl">{post.title}</h1>
          <p className="mt-4 sm:mt-5 max-w-2xl text-white/65 text-sm sm:text-lg leading-relaxed font-light">{post.excerpt}</p>
        </div>
      </div>
      <article className="mx-auto max-w-3xl px-5 pt-10 sm:pt-14 sm:px-10">
        <div className="text-white/75 leading-[1.8] whitespace-pre-line text-base sm:text-lg" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          {post.content.split("\n\n").map((para, i) => <p key={i} className="mb-5">{para}</p>)}
        </div>
      </article>
    </div>
  );
}

function EventsBlog() {
  const [q, setQ] = useState("");
  const [viewId, setViewId] = useState<string | null>(null);
  const posts = blogPosts.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));
  if (viewId) return <BlogPostView postId={viewId} onClose={() => setViewId(null)} />;
  const [featured, ...rest] = posts;
  return (
    <main className="section pt-28">
      <div className="mx-auto mb-12 sm:mb-16 max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.45em] text-[#7bd355]">Events & Blog</p>
            <h2 className="font-heading font-black text-white leading-[0.88] tracking-[-0.05em] sm:tracking-[-0.06em] text-4xl sm:text-7xl md:text-8xl">The AI<br /><span className="text-white/30">Chronicle.</span></h2>
          </div>
          <input className="glass-input md:max-w-xs" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles..." />
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-5 sm:space-y-6">
        {featured && (
          <article onClick={() => setViewId(featured.id)} className="group relative cursor-pointer overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border border-white/10 bg-white/[.04] backdrop-blur-xl transition hover:border-[#7bd355]/30">
            <div className="grid md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative overflow-hidden min-h-[280px] sm:min-h-[420px]">
                <img src={featured.image} alt={featured.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" style={{ filter: "brightness(0.75)" }} />
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                  <span className="inline-flex items-center gap-2 rounded-sm bg-[#7bd355] px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#111]">★ Featured</span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <span className="border-l-2 border-[#7bd355] pl-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#7bd355] mb-4">{featured.category}</span>
                <h2 className="font-heading font-black text-white leading-[0.9] tracking-[-0.04em] text-2xl sm:text-4xl group-hover:text-[#7bd355] transition">{featured.title}</h2>
                <p className="mt-4 sm:mt-5 text-sm leading-relaxed text-white/55 line-clamp-3">{featured.excerpt}</p>
                <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-white/35">
                  <span>{featured.date}</span><span>·</span><span>{featured.read}</span>
                </div>
                <span className="mt-6 sm:mt-8 inline-flex items-center gap-2 font-heading text-sm font-bold text-[#7bd355] group-hover:gap-4 transition-all">Read Full Article →</span>
              </div>
            </div>
          </article>
        )}

        {rest.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            {rest.map((p, i) => (
              <article key={p.id} onClick={() => setViewId(p.id)} className="group relative cursor-pointer overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem] border border-white/10 bg-white/[.04] backdrop-blur-xl transition hover:border-[#7bd355]/30 hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row gap-0">
                  <div className="relative w-full sm:w-40 shrink-0 overflow-hidden min-h-[160px] sm:min-h-[200px]">
                    <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" style={{ filter: "brightness(0.7)" }} />
                    <div className="absolute bottom-3 left-3"><span className="font-heading text-4xl font-black text-white/15">0{i + 2}</span></div>
                  </div>
                  <div className="flex flex-col justify-center p-5 sm:p-6">
                    <span className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-[#7bd355]">{p.category}</span>
                    <h3 className="font-heading font-black text-white leading-[0.95] tracking-[-0.03em] text-lg sm:text-xl group-hover:text-[#7bd355] transition">{p.title}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-white/45 line-clamp-2">{p.excerpt}</p>
                    <div className="mt-4 flex items-center gap-3 text-[10px] text-white/30 font-mono"><span>{p.date}</span><span>·</span><span>{p.read}</span></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function Services() {
  return <main className="section pt-28 sm:pt-32"><SectionTitle label="Services" title="Creative and technical services." copy="Premium student-led execution for digital products, brands, websites, and cinematic content." /><div className="mx-auto grid max-w-6xl gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">{services.map((s, i) => <div className="service-card" key={s}><span>0{i + 1}</span><h3>{s}</h3><p>Strategy, execution, iteration, and delivery with a premium technology aesthetic.</p></div>)}</div></main>;
}

function EmailForm({ kind }: { kind: "Partnership" | "Career" | "Contact" }) {
  return <form action="https://formsubmit.co/sociapisociety@gmail.com" method="POST" className="mx-auto grid max-w-3xl gap-4 rounded-[1.75rem] sm:rounded-[2rem] border border-white/10 bg-white/[.06] p-5 sm:p-6 backdrop-blur-xl"><input type="hidden" name="_subject" value={`${kind} inquiry from Sociapi website`} /><div className="grid gap-4 md:grid-cols-2"><input required name="name" className="glass-input" placeholder="Name" /><input name="organization" className="glass-input" placeholder="Organization / Department" /><input required type="email" name="email" className="glass-input" placeholder="Email" /><input name="phone" className="glass-input" placeholder="Phone" /></div><select name="type" className="glass-input"><option>{kind === "Partnership" ? "Event Partner" : kind === "Career" ? "Internship Opportunity" : "General Inquiry"}</option><option>Learning Partner</option><option>Community Partner</option><option>Volunteer Position</option><option>Membership Application</option></select><textarea required name="message" className="glass-input min-h-32" placeholder="Message" /><button className="rounded-full bg-[#7bd355] px-7 py-3.5 sm:py-4 font-bold text-[#111]">Submit and Notify by Email</button></form>;
}

function Partner() {
  return <main className="section pt-28 sm:pt-32"><SectionTitle label="Partner With Us" title="Partnership built like a workflow." copy="Event, Learning, and Community partners receive visibility, access to talent, co-branded programs, and measurable community impact." /><div className="mx-auto mb-10 grid max-w-6xl gap-5 grid-cols-1 md:grid-cols-3">{["Event Partner", "Learning Partner", "Community Partner"].map((p) => <GlassBlock key={p} title={p} copy="Benefits include brand presence, student access, speaking opportunities, certificates, social media coverage, and impact reporting." />)}</div><TimelineSection /><EmailForm kind="Partnership" /></main>;
}

function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  return <main className="section pt-28 sm:pt-32"><SectionTitle label="Gallery" title="Moments in motion." copy="Events Highlights" /><div className="masonry mx-auto max-w-7xl">{galleryImages.map((src, i) => <button key={src + i} onClick={() => setIndex(i)} className="mb-4 block overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] border border-white/10 bg-white/[.05] p-2"><img src={src} alt={`Sociapi gallery ${i + 1}`} loading="lazy" className="w-full rounded-[1rem] sm:rounded-[1.1rem] object-cover transition duration-500 hover:scale-105" /></button>)}</div>{index !== null && <Lightbox index={index} setIndex={setIndex} total={galleryImages.length} />}</main>;
}

function Lightbox({ index, setIndex, total }: { index: number; setIndex: (value: number | null) => void; total: number }) {
  return <div className="fixed inset-0 z-[90] grid place-items-center bg-black/90 p-4">
    <button onClick={() => setIndex(null)} className="absolute right-5 top-5 rounded-full bg-white/15 px-4 py-2 text-white z-10">✕</button>
    <button onClick={() => setIndex((index + total - 1) % total)} className="absolute left-3 sm:left-5 rounded-full bg-white/15 px-3 sm:px-4 py-2 text-white z-10">Prev</button>
    <img src={galleryImages[index]} alt="Gallery preview" className="max-h-[85vh] max-w-[85vw] rounded-2xl sm:rounded-3xl object-contain" />
    <button onClick={() => setIndex((index + 1) % total)} className="absolute right-3 sm:right-5 rounded-full bg-white/15 px-3 sm:px-4 py-2 text-white z-10">Next</button>
  </div>;
}

function Shop() {
  const products = [
    { name: "Male Oversized T-Shirt", image: "/Image/OVERSIZED Male.png", description: "Premium oversized fit. 100% cotton. Sociapi official drop.", price: "PKR 1,499" },
    { name: "Girls Oversized T-Shirt", image: "/Image/OVERSIZED Female.png", description: "Relaxed oversized cut for women. Soft fabric. Limited edition.", price: "PKR 1,499" },
  ];
  const [cart, setCart] = useState<{ name: string; size: string; qty: number }[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const removeFromCart = (index: number) => setCart(cart.filter((_, i) => i !== index));
  const orderText = encodeURIComponent(cart.map((c) => `${c.qty} x ${c.name} (${c.size})`).join("\n"));

  return (
    <main className="section pt-28 sm:pt-32">
      <SectionTitle label="Shop" title="Official society wear." copy="Select size, quantity, add to cart, preview products, and checkout instantly via WhatsApp." />
      <div className="mx-auto grid max-w-5xl gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2">
        {products.map((p) => (
          <Product key={p.name} name={p.name} image={p.image} description={p.description} price={p.price} onPreview={setPreview} onAdd={(item) => setCart([...cart, item])} />
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-[1.75rem] sm:rounded-[2rem] border border-white/10 bg-white/[.06] p-5 sm:p-6 text-white">
        <h3 className="font-heading text-xl sm:text-2xl">Cart</h3>
        {cart.length === 0
          ? <p className="mt-3 text-white/60">Cart is empty.</p>
          : <div className="mt-3 space-y-2">
              {cart.map((c, i) => (
                <div key={`${c.name}-${i}`} className="flex items-center justify-between rounded-xl bg-white/[.05] px-3 sm:px-4 py-3">
                  <span className="text-xs sm:text-sm text-white/70">{c.qty} x {c.name} / <span className="text-[#7bd355]">{c.size}</span></span>
                  <button onClick={() => removeFromCart(i)} className="ml-3 rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-400">Remove</button>
                </div>
              ))}
            </div>
        }
        <a className="mt-5 inline-flex rounded-full bg-[#7bd355] px-5 sm:px-6 py-3 text-sm sm:text-base font-bold text-[#111]" href={`https://wa.me/923329984490?text=${orderText}`} target="_blank" rel="noreferrer">Checkout via WhatsApp</a>
      </div>

      {preview && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/85 p-4">
          <button className="absolute right-5 top-5 rounded-full bg-white/15 px-4 py-2 text-white" onClick={() => setPreview(null)}>✕</button>
          <img src={preview} alt="Product preview" className="max-h-[85vh] rounded-2xl sm:rounded-3xl" />
        </div>
      )}
    </main>
  );
}

function Product({ name, image, description, price, onPreview, onAdd }: { name: string; image: string; description: string; price: string; onPreview: (s: string) => void; onAdd: (item: { name: string; size: string; qty: number }) => void }) {
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  return (
    <div className="rounded-[1.75rem] sm:rounded-[2rem] border border-white/10 bg-white/[.06] p-4 sm:p-5 backdrop-blur-xl">
      <button onClick={() => onPreview(image)} className="w-full">
        <img src={image} alt={name} className="aspect-square w-full rounded-[1.25rem] sm:rounded-[1.5rem] object-cover" />
      </button>
      <h3 className="mt-4 sm:mt-5 font-heading text-xl sm:text-2xl text-white">{name}</h3>
      <p className="mt-1 text-sm leading-relaxed text-white/50">{description}</p>
      <p className="mt-2 font-heading text-lg font-bold text-[#7bd355]">{price}</p>
      <div className="mt-4 flex gap-2">
        {["S", "M", "L", "XL"].map((s) => (
          <button key={s} onClick={() => setSize(s)} className={`rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold transition ${size === s ? "bg-[#7bd355] text-[#111]" : "bg-white/10 text-white hover:bg-white/20"}`}>{s}</button>
        ))}
      </div>
      <input className="glass-input mt-4" type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} />
      <button onClick={() => onAdd({ name, size, qty })} className="mt-4 w-full rounded-full bg-white px-5 py-3 font-bold text-[#111] hover:bg-[#7bd355] transition">Add to Cart</button>
    </div>
  );
}

function Career() {
  return <main className="section pt-28 sm:pt-32"><SectionTitle label="Career" title="Join the team that builds the future." copy="Apply for internships, volunteer positions, society membership, and leadership tracks." /><div className="mx-auto mb-10 grid max-w-5xl gap-5 grid-cols-1 md:grid-cols-3">{["Internship Opportunities", "Volunteer Positions", "Membership Application"].map((x) => <GlassBlock key={x} title={x} copy="Submit your profile, interests, skills, and availability. Our team will review and respond by email." />)}</div><EmailForm kind="Career" /></main>;
}

function Contact() {
  return <main className="section pt-28 sm:pt-32"><SectionTitle label="Contact" title="Connect with Sociapi Society." copy="Islamia University Peshawar, Pakistan. Email: sociapisociety@gmail.com. Phone: +92 3329984490." /><div className="mx-auto grid max-w-6xl gap-6 grid-cols-1 md:grid-cols-2"><EmailForm kind="Contact" /><div className="overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border border-white/10 bg-white/[.06] p-3 sm:p-4"><iframe title="Islamia University Peshawar map" className="h-full min-h-[320px] sm:min-h-[420px] w-full rounded-[1.25rem] sm:rounded-[1.5rem] grayscale invert" loading="lazy" src="https://www.google.com/maps?q=Islamia%20University%20Peshawar%20Pakistan&output=embed" /><div className="mt-4 flex gap-4 text-white px-2"><a href="mailto:sociapisociety@gmail.com">Email</a><a href="tel:+923329984490">Call</a><a href="https://wa.me/923329984490" target="_blank" rel="noreferrer">WhatsApp</a></div></div></div></main>;
}

function Reviews() {
  return <main className="section pt-28 sm:pt-32"><SectionTitle label="Reviews" title="Premium testimonial system." copy="Carousel movement, responsive grid, and conversion-ready social proof." /><Testimonials /><div className="mx-auto grid max-w-6xl gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">{reviews.map((r) => <blockquote key={r} className="testimonial-card !min-w-0 !animate-none">"{r}"<footer>Community Review</footer></blockquote>)}</div></main>;
}

function FAQs() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(0);
  const cats = ["All", ...Array.from(new Set(faqs.map((f) => f[0])))];
  const filtered = faqs.filter((f) => (cat === "All" || f[0] === cat) && f.join(" ").toLowerCase().includes(q.toLowerCase()));
  return <main className="section pt-28 sm:pt-32"><SectionTitle label="FAQs" title="Search the knowledge base." copy="Filter by category and open animated answers for membership, programs, events, shop, and partnerships." /><div className="mx-auto mb-8 flex max-w-3xl flex-col gap-3 sm:flex-row"><input className="glass-input flex-1" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search FAQs" /><select className="glass-input" value={cat} onChange={(e) => setCat(e.target.value)}>{cats.map((c) => <option key={c}>{c}</option>)}</select></div><div className="mx-auto max-w-3xl space-y-3">{filtered.map((f, i) => <div key={f[1]} className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[.06] p-4 sm:p-5 text-white"><button className="flex w-full justify-between text-left font-heading text-lg sm:text-xl gap-3" onClick={() => setOpen(open === i ? -1 : i)}><span>{f[1]}</span><span className="shrink-0">{open === i ? "−" : "+"}</span></button>{open === i && <p className="mt-4 text-sm sm:text-base text-white/65">{f[2]}</p>}</div>)}</div></main>;
}

function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  return <>
    <button onClick={() => setOpen(o => !o)} id="wa-circle" className="group fixed bottom-5 right-4 sm:bottom-6 sm:right-5 z-50 flex h-[56px] w-[56px] sm:h-[62px] sm:w-[62px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition hover:scale-110">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 sm:h-7 sm:w-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </button>
    {open && (
      <>
        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setOpen(false)} />
        <div className="fixed bottom-[80px] right-4 sm:bottom-[92px] sm:right-5 z-[55] w-[calc(100vw-2rem)] max-w-xs overflow-hidden rounded-3xl border border-white/15 bg-[#111]/95 p-5 text-white shadow-2xl backdrop-blur-2xl animate-slide-up">
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 rounded-full ring-2 ring-[#25D366]/60 bg-[#7bd355] text-[#111] grid place-items-center font-black text-sm">S</div>
            <div><p className="font-bold text-sm">Sociapi Society</p><p className="mt-0.5 text-xs text-green-400">● Online</p></div>
            <button onClick={() => setOpen(false)} className="ml-auto self-start rounded-lg bg-white/10 px-2.5 py-1 text-xs">✕</button>
          </div>
          <div className="mt-4 text-sm leading-relaxed text-white/70">Hi! 👋 Welcome to Sociapi Society.<br />How can we help you?</div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {["Join Community", "Events Info", "Partnership", "Other"].map((b) => (
              <button key={b} onClick={() => window.open(`https://wa.me/923329984490?text=Hi! I am interested in: ${b}`, "_blank")} className="rounded-xl border border-white/10 bg-white/8 px-3 py-2.5 text-xs font-medium text-white/80 hover:bg-white/15 hover:text-[#25D366] transition">{b}</button>
            ))}
          </div>
          <a href="https://wa.me/923329984490?text=Hello Sociapi Society!" target="_blank" rel="noreferrer" className="mt-4 block rounded-2xl bg-[#25D366] py-3 text-center text-sm font-bold text-black shadow-lg shadow-[#25D366]/30">Start Chat →</a>
        </div>
      </>
    )}
  </>;
}

function FloatingUtilities() {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    const onScroll = () => setProgress((scrollY / (document.body.scrollHeight - innerHeight)) * 100);
    addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(timer); removeEventListener("scroll", onScroll); };
  }, []);
  useEffect(() => { document.documentElement.classList.toggle("light-mode", !dark); }, [dark]);
  return <>
    <div className="fixed left-0 top-0 z-[100] h-1 bg-[#7bd355] transition-[width]" style={{ width: `${progress}%` }} />
    {loading && <div className="fixed inset-0 z-[120] grid place-items-center bg-black text-center text-white">
      <div>
        <img src="/logo.png" alt="Sociapi" className="mx-auto mb-5 h-16 w-16 animate-pulse rounded-2xl ring-1 ring-[#7bd355]/40 object-contain bg-white/5" />
        <div className="loader mx-auto" />
        <p className="mt-5 font-heading tracking-[.4em] text-sm">SOCIAPI SOCIETY</p>
      </div>
    </div>}
    {!isMobile && <div className="cursor-glow" />}
    <button onClick={() => setDark(!dark)} className="fixed bottom-[88px] right-4 sm:bottom-24 sm:right-5 z-50 rounded-full border border-white/15 bg-white/10 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-white backdrop-blur-xl hover:bg-white/18 transition">{dark ? "Light" : "Dark"}</button>
    <WhatsAppWidget />
    <button onClick={() => scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 left-4 sm:bottom-6 sm:left-5 z-50 flex h-[42px] w-[42px] sm:h-[46px] sm:w-[46px] items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm text-white backdrop-blur-xl">↑</button>
  </>;
}

function Footer() {
  return <footer className="border-t border-white/10 px-5 py-12 sm:py-14 text-white">
    <div className="mx-auto grid max-w-7xl gap-8 sm:gap-10 md:grid-cols-[1.2fr_.9fr_.9fr]">
      <div>
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Sociapi Society logo" className="h-11 w-11 rounded-2xl ring-1 ring-[#7bd355]/40 object-contain bg-white/5" />
          <h2 className="font-heading text-2xl sm:text-3xl font-black">SOCIAPI SOCIETY</h2>
        </div>
        <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-white/55">The official digital headquarters for AI, Data Science, Robotics, and student innovation at Islamia University Peshawar.</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {[
            { icon: "𝕏", label: "Twitter / X", href: "https://x.com/sociapisociety" },
            { icon: "in", label: "LinkedIn", href: "https://www.linkedin.com/company/sociapisociety/" },
            { icon: "ig", label: "Instagram", href: "https://www.instagram.com/sociapi/" },
            { icon: "fb", label: "Facebook", href: "https://www.facebook.com/sociapi/" },
            { icon: "TK", label: "TikTok", href: "https://www.tiktok.com/@sociapi" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="social-pill flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/6 text-xs font-bold text-white/65 transition hover:-translate-y-0.5 hover:border-[#7bd355]/40 hover:bg-[#7bd355] hover:text-black">{s.icon}</a>
          ))}
        </div>
      </div>
      <div><h3 className="mb-4 font-heading text-sm tracking-[.25em] text-[#7bd355]">CONTACT</h3><p className="leading-8 text-white/50 break-all">sociapisociety@gmail.com</p><p className="text-white/50">+92 3329984490</p><p className="mt-3 text-sm text-white/45">Islamia University<br />Peshawar, Pakistan</p></div>
      <div><h3 className="mb-4 font-heading text-sm tracking-[.25em] text-[#7bd355]">QUICK LINKS</h3><ul className="space-y-2.5 text-white/55"><li><a href="#about" className="hover:text-[#7bd355]">About Us</a></li><li><a href="#team" className="hover:text-[#7bd355]">Our Team</a></li><li><a href="#events" className="hover:text-[#7bd355]">Events & Blog</a></li><li><a href="#services" className="hover:text-[#7bd355]">Services</a></li><li><a href="#partner" className="hover:text-[#7bd355]">Partner With Us</a></li><li><a href="#contact" className="hover:text-[#7bd355]">Contact</a></li></ul></div>
    </div>
    <p className="mx-auto mt-10 sm:mt-12 max-w-7xl border-t border-white/8 pt-6 text-center text-xs text-white/30">&copy; {new Date().getFullYear()} Sociapi Society. All rights reserved. Built By Zuhair Zeb.</p>
  </footer>;
}

export default function App() {
  const route = useHashRoute();
  const Current = useMemo(() => {
    const pages: Record<string, () => React.ReactElement> = {
      home: Home,
      about: About,
      team: () => <TeamGalaxy full />,
      events: EventsBlog,
      services: Services,
      partner: Partner,
      gallery: Gallery,
      shop: Shop,
      career: Career,
      contact: Contact,
      reviews: Reviews,
      faqs: FAQs,
      chapters: ChaptersPage,
    };
    return pages[route] || Home;
  }, [route]);
  return <div className="min-h-screen bg-[#070907] text-[#e8ecee] overflow-x-hidden"><SeoSchema /><FloatingUtilities /><Nav route={route} /><Current /><Footer /></div>;
}

function SeoSchema() {
  const schema = { "@context": "https://schema.org", "@type": "Organization", name: "Sociapi Society", url: "https://linktr.ee/sociapisociety", email: "sociapisociety@gmail.com", telephone: "+92 3329984490", address: "Islamia University Peshawar, Pakistan" };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
