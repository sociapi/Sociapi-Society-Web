import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── Types ─── */
type Chapter = { name: string; uni: string; status: "Active" | "Coming Soon"; tag: string; image?: string };

/* ─── Data ─── */
const CHAPTERS: Chapter[] = [
  { name: "Islamia College Peshawar", uni: "Islamia College University", status: "Active", tag: "Founding Chapter" },
];

const EXPANSION_CITIES = [
  { name: "Peshawar", lat: 34.0151, lng: 71.5249, label: "✅ Active HQ" },
  { name: "Mardan", lat: 34.1989, lng: 72.0231, label: "🔜 In Progress" },
  { name: "Swat", lat: 34.7955, lng: 72.3599, label: "🔜 In Progress" },
  { name: "Abbottabad", lat: 34.1558, lng: 73.2194, label: "🔜 In Progress" },
  { name: "Charsadda", lat: 34.1486, lng: 71.7476, label: "🔜 In Progress" },
  { name: "Kohat", lat: 33.5868, lng: 71.4394, label: "🔜 In Progress" },
  { name: "Dera Ismail Khan", lat: 31.8313, lng: 70.8977, label: "🔜 In Progress" },
];

const FAQS = [
  { q: "How do I start a chapter?", a: "Fill out the application form on this page. Our team will review your application, schedule an interview, and guide you through the process step by step." },
  { q: "Who can apply?", a: "Any motivated university student enrolled in a recognized university in Pakistan, especially in KPK. No prior experience required — just passion and commitment." },
  { q: "Is prior leadership experience required?", a: "Not at all. We look for drive, integrity, and a willingness to learn. We provide training and mentorship to help you grow as a leader." },
  { q: "How many members are needed?", a: "A minimum of 5–7 founding members is recommended to start a chapter. We help you with recruitment and team formation." },
  { q: "What support does Sociapi provide?", a: "Full branding, mentorship, event toolkits, digital infrastructure, speaker connections, and ongoing guidance from the central team." },
];

const BENEFITS = [
  { icon: "🏛️", title: "Leadership Experience", desc: "Lead a university chapter, manage teams, and gain real executive experience that stands out on your CV." },
  { icon: "🌐", title: "Networking Opportunities", desc: "Connect with industry professionals, founders, AI researchers, and student leaders across Pakistan." },
  { icon: "🎪", title: "Event Hosting", desc: "Organize seminars, workshops, and hackathons. Get resources, speakers, and promotional support." },
  { icon: "⚙️", title: "Project Building", desc: "Work on real AI, tech, and innovation projects with mentorship from the Sociapi central team." },
  { icon: "📈", title: "Skill Development", desc: "Access exclusive workshops on AI, leadership, design, public speaking, and project management." },
  { icon: "🏅", title: "Official Recognition", desc: "Receive official certificates, recommendation letters, and public recognition across Sociapi platforms." },
];

const WHAT_IS = [
  { icon: "🧠", title: "AI & Technology", desc: "Dive into artificial intelligence, machine learning, and cutting-edge tech with hands-on projects." },
  { icon: "👥", title: "Community Building", desc: "Create thriving tech communities on your campus. Bring students together around innovation and learning." },
  { icon: "🎯", title: "Leadership Development", desc: "Shape the next generation of student leaders through structured mentorship and real responsibility." },
  { icon: "🤝", title: "Networking", desc: "Build meaningful connections with peers, professionals, and industry mentors across Pakistan." },
  { icon: "💡", title: "Innovation", desc: "Turn ideas into impact. Launch projects, host events, and drive change on your campus." },
  { icon: "🔬", title: "Research & Learning", desc: "Access curated learning resources, research papers, and study groups guided by experienced members." },
];

const STRUCTURE_DATA = {
  president: "Chapter President",
  vp: "Vice President",
  gs: "General Secretary",
  depts: [
    { name: "Event Team", color: "#7bd355" },
    { name: "Outreach Team", color: "#6bc4a0" },
    { name: "Media Team", color: "#5aadff" },
    { name: "Design Team", color: "#c084fc" },
    { name: "Tech Team", color: "#f87171" },
    { name: "Women Wing", color: "#f472b6" },
    { name: "Volunteers", color: "#fbbf24" },
  ],
};

/* ─── Reusable Components ─── */

function FadeUp({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 inline-block border-l-4 border-[#7bd355] pl-4 font-heading text-[10px] font-bold uppercase tracking-[0.35em] text-[#7bd355] sm:text-xs">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
      {children}
    </h2>
  );
}

/* ─── Hero ─── */

function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;
      setMousePos({
        x: ((e.clientX - window.innerWidth / 2) / window.innerWidth) * 24,
        y: ((e.clientY - window.innerHeight / 2) / window.innerHeight) * 24,
      });
    },
    [isMobile],
  );

  return (
    <section
      onMouseMove={handleMouse}
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,211,85,0.12),transparent_60%)]" />
        <div className="hero-grid-chapters absolute inset-0 opacity-30" />
        {/* Animated network nodes */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.15]"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="nodeGlow">
              <stop offset="0%" stopColor="#7bd355" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7bd355" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[
            [200, 150, 400, 300],
            [400, 300, 700, 200],
            [700, 200, 900, 400],
            [900, 400, 600, 600],
            [600, 600, 300, 500],
            [300, 500, 200, 150],
            [500, 100, 800, 350],
            [800, 350, 500, 550],
            [500, 550, 200, 400],
            [200, 400, 500, 100],
            [300, 600, 700, 500],
            [700, 500, 1000, 200],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={`line-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#7bd355"
              strokeWidth="0.5"
              opacity={0.3 + Math.sin(i) * 0.2}
            >
              <animate
                attributeName="opacity"
                values={`${0.2 + Math.sin(i) * 0.15};${0.5 + Math.cos(i) * 0.2};${0.2 + Math.sin(i) * 0.15}`}
                dur={`${4 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}
          {[
            [200, 150],
            [400, 300],
            [700, 200],
            [900, 400],
            [600, 600],
            [300, 500],
            [500, 100],
            [800, 350],
            [500, 550],
            [200, 400],
            [300, 600],
            [700, 500],
            [1000, 200],
          ].map(([cx, cy], i) => (
            <g key={`node-${i}`}>
              <circle
                cx={cx}
                cy={cy}
                r={3}
                fill="#7bd355"
                opacity={0.7}
              >
                <animate
                  attributeName="r"
                  values="3;6;3"
                  dur={`${2 + (i % 3) * 1.2}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.7;0.3;0.7"
                  dur={`${2 + (i % 3) * 1.2}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={cx} cy={cy} r={12} fill="url(#nodeGlow)" opacity={0.4}>
                <animate
                  attributeName="r"
                  values="12;20;12"
                  dur={`${3 + (i % 4) * 0.8}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </svg>
      </div>

      {/* 3D Globe element */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-[45%]"
        style={{ transform: `translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px))` }}
      >
        <div className="relative aspect-square w-[clamp(300px,60vw,600px)]">
          <div className="absolute inset-[10%] rounded-full border border-[#7bd355]/20 shadow-[0_0_80px_rgba(123,211,85,0.15)]">
            <div className="absolute inset-[15%] rounded-full border border-[#7bd355]/10" />
            <div className="absolute inset-[30%] rounded-full bg-[#7bd355]/5 shadow-[inset_0_0_60px_rgba(123,211,85,0.15)]" />
          </div>
          {/* Rotating rings */}
          <svg className="absolute inset-0 h-full w-full animate-spin-slow" viewBox="0 0 200 200">
            <ellipse cx="100" cy="100" rx="85" ry="35" fill="none" stroke="rgba(123,211,85,0.15)" strokeWidth="0.8" transform="rotate(0 100 100)" />
            <ellipse cx="100" cy="100" rx="85" ry="35" fill="none" stroke="rgba(123,211,85,0.12)" strokeWidth="0.8" transform="rotate(60 100 100)" />
            <ellipse cx="100" cy="100" rx="85" ry="35" fill="none" stroke="rgba(123,211,85,0.1)" strokeWidth="0.8" transform="rotate(120 100 100)" />
          </svg>
          {/* Floating dots */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-[#7bd355] shadow-[0_0_8px_#7bd355]"
              style={{
                left: `${50 + 38 * Math.cos((i / 8) * Math.PI * 2)}%`,
                top: `${50 + 38 * Math.sin((i / 8) * Math.PI * 2)}%`,
              }}
              animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.6, 1] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main hero content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-24 pt-28 text-center sm:pb-32 sm:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#7bd355] sm:text-xs"
        >
          Sociapi Society · University Expansion
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-heading text-[clamp(2.4rem,9vw,6rem)] font-black leading-[0.88] tracking-[-0.06em] text-white"
        >
          University
          <br />
          <span className="bg-gradient-to-r from-[#e8ecee] via-[#7bd355] to-[#7bd355] bg-clip-text text-transparent">
            Chapters
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mx-auto mt-5 max-w-3xl text-balance text-sm leading-relaxed text-white/70 sm:text-lg sm:leading-relaxed md:text-xl"
        >
          Building the next generation of AI, technology, leadership, and innovation communities across universities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#apply"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#7bd355] px-6 py-3.5 text-sm font-bold text-[#1b2118] shadow-2xl shadow-[#7bd355]/30 transition-all hover:shadow-[0_0_40px_rgba(123,211,85,0.5)] sm:px-8 sm:py-4 sm:text-base"
          >
            <span className="relative z-10">Start a Chapter</span>
            <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#6bc450] to-[#7bd355] transition-transform duration-300 group-hover:translate-x-0" />
          </a>
          <a
            href="#ambassador"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition hover:border-[#7bd355]/40 hover:bg-white/15 sm:px-8 sm:py-4 sm:text-base"
          >
            Become a Campus Ambassador
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7-7 7 7"/></svg>
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-12 grid w-full max-w-4xl grid-cols-2 gap-3 md:grid-cols-4"
        >
          {[
            ["1", "Active Chapters", "+"],
            ["7", "Campus Ambassadors", "+"],
            ["300+", "Students Reached", ""],
            ["3", "Events Organized", "+"],
          ].map(([val, label]) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#7bd355]/30 sm:p-5"
            >
              <strong className="font-heading block text-2xl text-transparent sm:text-3xl">
                <span className="bg-gradient-to-r from-white via-white to-[#7bd355] bg-clip-text text-transparent">
                  {val}
                </span>
              </strong>
              <p className="mt-1 text-[11px] font-medium tracking-wide text-white/55 sm:text-xs">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070907] to-transparent" />
    </section>
  );
}

/* ─── What is a Chapter? ─── */

function WhatIsChapter() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <SectionLabel>About Chapters</SectionLabel>
          <SectionHeading>What is a Sociapi Chapter?</SectionHeading>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            A Sociapi Chapter is a student-led community at your university that drives AI, technology,
            and innovation. Chapters host events, run projects, build teams, and create real impact
            on campus while getting full support from the central Sociapi team.
          </p>
        </FadeUp>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {WHAT_IS.map((item, i) => (
            <FadeUp key={item.title} delay={0.1 * i}>
              <div className="group h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#7bd355]/30 hover:shadow-[0_0_40px_rgba(123,211,85,0.1)] sm:p-7">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7bd355]/15 text-2xl shadow-inner transition group-hover:bg-[#7bd355] group-hover:text-black sm:h-16 sm:w-16 sm:text-3xl">
                  {item.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-white sm:text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Benefits ─── */

function Benefits() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:py-32">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#7bd355]/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        <FadeUp className="text-center">
          <SectionLabel>Why Start a Chapter</SectionLabel>
          <SectionHeading>Benefits of Starting a Chapter</SectionHeading>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            Transform your university experience and build skills that last a lifetime.
          </p>
        </FadeUp>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {BENEFITS.map((item, i) => (
            <FadeUp key={item.title} delay={0.08 * i}>
              <div className="group h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#7bd355]/30 sm:p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#7bd355]/15 text-xl shadow-inner transition group-hover:bg-[#7bd355] group-hover:text-black sm:h-14 sm:w-14 sm:text-2xl">
                  {item.icon}
                </div>
                <h3 className="font-heading text-base font-bold text-white sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Chapter Structure / Org Chart ─── */

function ChapterStructure() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeUp className="text-center">
          <SectionLabel>Chapter Structure</SectionLabel>
          <SectionHeading>Organizational Chart</SectionHeading>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            Every chapter follows a proven structure designed for efficiency and growth.
          </p>
        </FadeUp>

        <div className="mt-12">
          {/* Leadership cards */}
          <FadeUp delay={0.2}>
            <div className="mx-auto mb-10 grid max-w-3xl gap-3 sm:grid-cols-3">
              {[
                { title: STRUCTURE_DATA.president, icon: "👑", desc: "Overall chapter leadership, strategy, and external representation." },
                { title: STRUCTURE_DATA.vp, icon: "🤝", desc: "Operations, coordination, and supporting the president." },
                { title: STRUCTURE_DATA.gs, icon: "📋", desc: "Documentation, communications, and meeting management." },
              ].map((role, i) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  className="rounded-2xl border border-[#7bd355]/20 bg-gradient-to-b from-[#7bd355]/10 to-transparent p-5 text-center backdrop-blur-xl"
                >
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#7bd355]/30 bg-[#7bd355]/10 text-2xl shadow-[0_0_30px_rgba(123,211,85,0.15)]">
                    {role.icon}
                  </div>
                  <h3 className="font-heading text-sm font-bold text-white sm:text-base">{role.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/50">{role.desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeUp>

          {/* Connection line */}
          <div className="relative mx-auto mb-10 flex justify-center">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="h-12 w-px origin-top bg-gradient-to-b from-[#7bd355] to-transparent"
            />
          </div>

          {/* Departments */}
          <FadeUp delay={0.6}>
            <div className="text-center">
              <p className="mb-6 font-heading text-sm tracking-[0.3em] text-[#7bd355] sm:text-base">
                ⚡ DEPARTMENTS
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {STRUCTURE_DATA.depts.map((dept, i) => (
              <FadeUp key={dept.name} delay={0.7 + i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-4 text-center backdrop-blur-xl transition-all hover:shadow-lg sm:p-5"
                  style={{
                    borderColor: `${dept.color}25`,
                    boxShadow: `0 0 0 0 transparent`,
                  }}
                >
                  {/* Glow dot */}
                  <div
                    className="mx-auto mb-2 h-2 w-2 rounded-full"
                    style={{ backgroundColor: dept.color, boxShadow: `0 0 8px ${dept.color}` }}
                  />
                  <h3 className="font-heading text-sm font-bold text-white sm:text-base">{dept.name}</h3>
                  <p className="mt-1 text-xs text-white/50">Department</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── How Chapters Work (Timeline) ─── */

function HowChaptersWork() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    { step: "01", title: "Apply", desc: "Fill out the chapter application form with your details and motivation." },
    { step: "02", title: "Interview", desc: "Shortlisted candidates are invited for a virtual interview with the Sociapi team." },
    { step: "03", title: "Campus Ambassador Selection", desc: "Selected candidates become Campus Ambassadors and begin training." },
    { step: "04", title: "Team Formation", desc: "Build your founding team of 5–7 members across key departments." },
    { step: "05", title: "Official Chapter Launch", desc: "Your chapter is officially launched with full branding and support." },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeUp className="text-center">
          <SectionLabel>Process</SectionLabel>
          <SectionHeading>How Chapters Work</SectionHeading>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            A clear 5-step journey from application to an official Sociapi chapter on your campus.
          </p>
        </FadeUp>

        <div className="relative mt-14">
          {/* Timeline line */}
          <div className="absolute left-[18px] top-0 h-full w-px bg-gradient-to-b from-[#7bd355] via-[#7bd355]/40 to-transparent hidden sm:block" />

          <div className="space-y-6 sm:space-y-8">
            {steps.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 * i }}
                >
                  <div className="flex items-start gap-5">
                    {/* Step number circle */}
                    <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#7bd355]/40 bg-[#111] text-xs font-bold text-[#7bd355] shadow-[0_0_20px_rgba(123,211,85,0.2)] sm:h-10 sm:w-10">
                      {item.step}
                    </div>

                    {/* Content card */}
                    <div
                      className={`group flex-1 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#7bd355]/30 sm:p-6 ${isLeft ? "sm:mr-[15%]" : "sm:ml-[15%]"}`}
                    >
                      <p className="font-heading text-[10px] tracking-[0.3em] text-[#7bd355] sm:text-xs">
                        STEP {item.step}
                      </p>
                      <h3 className="mt-1 font-heading text-lg font-bold text-white sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Expansion Map ─── */

function ExpansionMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isMobile] = useIsMobileState();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeUp className="text-center">
          <SectionLabel>Expansion Plan</SectionLabel>
          <SectionHeading>KPK Chapter Expansion Map</SectionHeading>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            Phase 1 — KPK Chapter Expansion Plan · Applications from all districts are welcome.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mx-auto mt-10 max-w-4xl">
            {/* Map container */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0a120a] via-[#0f1a0f] to-[#0a120a] p-6 backdrop-blur-2xl shadow-2xl sm:p-8">
              {/* Abstract KPK map representation */}
              <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl">
                {/* SVG map silhouette */}
                <svg viewBox="0 0 400 300" className="h-full w-full opacity-[0.08]">
                  <path
                    d="M50,80 Q80,30 120,50 Q180,20 220,40 Q260,30 300,60 Q340,50 360,90 Q380,130 350,170 Q370,200 340,230 Q310,260 280,240 Q240,270 200,250 Q160,260 130,240 Q100,250 80,220 Q50,200 60,160 Q40,130 50,80Z"
                    fill="none"
                    stroke="#7bd355"
                    strokeWidth="2"
                  />
                  <path
                    d="M50,80 Q80,30 120,50 Q180,20 220,40 Q260,30 300,60 Q340,50 360,90 Q380,130 350,170 Q370,200 340,230 Q310,260 280,240 Q240,270 200,250 Q160,260 130,240 Q100,250 80,220 Q50,200 60,160 Q40,130 50,80Z"
                    fill="rgba(123,211,85,0.03)"
                  />
                </svg>

                {/* City markers */}
                {EXPANSION_CITIES.map((city, i) => {
                  const x = 80 + (i * 40) % 280;
                  const y = 100 + (i % 3) * 60 + (i > 3 ? 20 : 0);
                  return (
                    <motion.div
                      key={city.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                      className="absolute"
                      style={{
                        left: `${(x / 400) * 100}%`,
                        top: `${(y / 300) * 100}%`,
                      }}
                    >
                      <div className="group relative">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#7bd355]/50 bg-[#111] shadow-[0_0_16px_rgba(123,211,85,0.3)] transition-transform group-hover:scale-125">
                          <div className="h-2 w-2 rounded-full bg-[#7bd355] animate-pulse" />
                        </div>
                        {!isMobile && (
                          <div className="absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#111]/95 px-3 py-1.5 text-xs font-medium text-white/80 opacity-0 backdrop-blur-xl transition-opacity group-hover:opacity-100">
                            <span className="text-[#7bd355] font-bold">{city.name}</span>
                            <span className="ml-2 text-white/50">{city.label}</span>
                          </div>
                        )}
                        {isMobile && (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#111]/90 px-2 py-1 text-[10px] text-white/80 backdrop-blur-xl border border-white/10">
                            {city.name}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Connection lines */}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300">
                  {EXPANSION_CITIES.map((_city, i) => {
                    const x = 80 + (i * 40) % 280;
                    const y = 100 + (i % 3) * 60 + (i > 3 ? 20 : 0);
                    const cx = 200;
                    const cy = 150;
                    return (
                      <motion.line
                        key={`conn-${i}`}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        x1={cx}
                        y1={cy}
                        x2={x}
                        y2={y}
                        stroke="#7bd355"
                        strokeWidth="0.8"
                        strokeDasharray="4 4"
                        opacity={0.2}
                      />
                    );
                  })}
                </svg>
              </div>

              {/* City list */}
              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {EXPANSION_CITIES.map((city, i) => (
                  <motion.div
                    key={city.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                    className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.04] px-3 py-2 text-xs text-white/70 backdrop-blur-md sm:text-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7bd355] shrink-0" />
                    <span className="font-medium">{city.name}</span>
                    <span className="ml-auto text-[10px] text-white/40">{city.label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-white/50">
                  📍 <span className="text-[#7bd355] font-medium">Phase 1</span> — KPK Chapter Expansion Plan
                </p>
                <p className="mt-1 text-xs text-white/40">
                  Applications from all districts are welcome.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Current Expansion Initiative Banner ─── */

function ExpansionBanner() {
  return (
    <section className="px-4 py-12 sm:py-16">
      <FadeUp>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#7bd355]/20 bg-gradient-to-br from-[#7bd355]/10 via-[#0f1a0f] to-[#0a120a] p-8 text-center shadow-2xl shadow-[#7bd355]/5 backdrop-blur-2xl sm:p-12">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#7bd355]/20 text-2xl">
            🚀
          </div>
          <h2 className="font-heading text-xl font-black text-white sm:text-3xl">
            Current Expansion Initiative
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base sm:leading-relaxed">
            We are actively expanding Sociapi Society across universities in KPK. Students interested
            in becoming Campus Ambassadors, Chapter Presidents, or founding members are encouraged
            to apply.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="#apply"
              className="rounded-full bg-[#7bd355] px-6 py-3 text-sm font-bold text-[#1b2118] transition hover:shadow-[0_0_30px_rgba(123,211,85,0.4)] sm:px-8 sm:py-3.5 sm:text-base"
            >
              Apply Now
            </a>
            <a
              href="#ambassador"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-[#7bd355]/40 sm:px-8 sm:py-3.5 sm:text-base"
            >
              Learn More
            </a>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

/* ─── Chapter Showcase ─── */

function ChapterShowcase() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:py-32" id="chapters">
      <div className="mx-auto max-w-6xl">
        <FadeUp className="text-center">
          <SectionLabel>Our Chapters</SectionLabel>
          <SectionHeading>University Chapters</SectionHeading>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            Explore our active chapters and the universities leading the Sociapi movement.
          </p>
        </FadeUp>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {CHAPTERS.map((chapter, i) => (
              <FadeUp key={chapter.name} delay={0.2 + i * 0.15}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 backdrop-blur-2xl transition-all hover:border-[#7bd355]/30 hover:shadow-[0_0_40px_rgba(123,211,85,0.1)] sm:p-8"
                >
                  {/* Status badge */}
                  <div className="mb-5 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${
                        chapter.status === "Active"
                          ? "bg-[#7bd355]/15 text-[#7bd355]"
                          : "bg-yellow-500/15 text-yellow-400"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          chapter.status === "Active" ? "bg-[#7bd355] animate-pulse" : "bg-yellow-400"
                        }`}
                      />
                      {chapter.status}
                    </span>
                    <span className="ml-auto rounded-full border border-[#7bd355]/15 bg-[#7bd355]/8 px-2.5 py-1 text-[10px] font-medium text-[#7bd355]">
                      {chapter.tag}
                    </span>
                  </div>

                  {/* University icon */}
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7bd355]/10 text-3xl shadow-inner">
                    🏛️
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                    {chapter.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">{chapter.uni}</p>

                  {/* Stats */}
                  <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
                    {[
                      ["👥", "28", "Members"],
                      ["📅", "5", "Events"],
                      ["🏆", "3", "Projects"],
                    ].map(([icon, num, label]) => (
                      <div key={label} className="text-center">
                        <p className="text-lg">{icon}</p>
                        <p className="font-heading text-sm font-bold text-white">{num}</p>
                        <p className="text-[10px] text-white/40">{label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </AnimatePresence>

          {/* "Your Chapter Here" placeholder */}
          <FadeUp delay={0.5}>
            <motion.a
              href="#apply"
              whileHover={{ scale: 1.02 }}
              className="flex h-full min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/15 bg-white/[0.03] p-8 text-center backdrop-blur-xl transition-all hover:border-[#7bd355]/40 hover:bg-[#7bd355]/5 sm:min-h-[350px]"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7bd355]/10 text-3xl">
                ➕
              </div>
              <h3 className="font-heading text-lg font-bold text-white/60">Your Chapter Here</h3>
              <p className="mt-2 text-sm text-white/40">Start a chapter at your university</p>
              <span className="mt-4 rounded-full bg-[#7bd355] px-5 py-2 text-xs font-bold text-[#1b2118]">
                Apply Now →
              </span>
            </motion.a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── Campus Ambassador Section ─── */

function CampusAmbassador() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:py-32" id="ambassador">
      {/* Background gradient */}
      <div className="absolute right-0 top-0 h-[400px] w-[400px] translate-x-1/3 -translate-y-1/4 rounded-full bg-[#7bd355]/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <FadeUp className="text-center">
          <SectionLabel>Join the Movement</SectionLabel>
          <SectionHeading>Become a Campus Ambassador</SectionHeading>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            Represent Sociapi on your campus, recruit members, organize activities, and build a
            thriving chapter. This is a leadership role with real impact.
          </p>
        </FadeUp>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "🎤", title: "Represent Sociapi", desc: "Be the face of Sociapi on your campus. Promote our mission and values." },
            { icon: "👥", title: "Recruit Members", desc: "Build your campus team by recruiting passionate students." },
            { icon: "🎯", title: "Organize Activities", desc: "Host workshops, meetups, and events that drive engagement." },
            { icon: "🏗️", title: "Build a Chapter", desc: "Lay the foundation for an official Sociapi chapter at your university." },
          ].map((item, i) => (
            <FadeUp key={item.title} delay={0.15 * i}>
              <div className="group h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 text-center backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#7bd355]/30 sm:p-7">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7bd355]/15 text-2xl shadow-inner transition group-hover:bg-[#7bd355] group-hover:text-black sm:h-16 sm:w-16 sm:text-3xl">
                  {item.icon}
                </div>
                <h3 className="font-heading text-base font-bold text-white sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4}>
          <div className="mt-10 text-center">
            <a
              href="#apply"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#7bd355] px-8 py-4 text-base font-bold text-[#1b2118] shadow-2xl shadow-[#7bd355]/30 transition-all hover:shadow-[0_0_40px_rgba(123,211,85,0.5)]"
            >
              <span className="relative z-10">Apply Now</span>
              <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#6bc450] to-[#7bd355] transition-transform duration-300 group-hover:translate-x-0" />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── FAQ Section ─── */

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <FadeUp className="text-center">
          <SectionLabel>Got Questions?</SectionLabel>
          <SectionHeading>Frequently Asked Questions</SectionHeading>
        </FadeUp>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, i) => (
            <FadeUp key={faq.q} delay={0.1 * i}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl transition-all">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left sm:px-6 sm:py-5"
                  aria-expanded={openIndex === i}
                >
                  <span className="pr-4 font-heading text-sm font-bold text-white sm:text-base">
                    {faq.q}
                  </span>
                  <motion.svg
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-4 w-4 shrink-0 text-[#7bd355]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-white/60 sm:px-6 sm:py-5">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:py-32">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7bd355]/20 via-[#0f1a0f] to-[#070907]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,211,85,0.08),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <FadeUp>
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#7bd355]/20 text-3xl shadow-[0_0_40px_rgba(123,211,85,0.2)]">
            🚀
          </div>
          <h2 className="font-heading text-3xl font-black text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Lead Innovation on
            <br />
            <span className="bg-gradient-to-r from-[#7bd355] to-[#b5ff8a] bg-clip-text text-transparent">
              Your Campus
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg sm:leading-relaxed">
            Join the growing Sociapi network and help shape the future of student innovation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#apply"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#1b2118] shadow-2xl transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] sm:px-8 sm:py-4 sm:text-base"
            >
              <span className="relative z-10">Apply for a Chapter</span>
              <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#f0f0f0] to-white transition-transform duration-300 group-hover:translate-x-0" />
            </a>
            <a
              href="#ambassador"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition hover:border-[#7bd355]/40 hover:bg-white/15 sm:px-8 sm:py-4 sm:text-base"
            >
              Become a Campus Ambassador
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7-7 7 7"/></svg>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Application Form Section (Modal-like inline) ─── */

function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    phone: "",
    type: "chapter",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to FormSubmit
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:py-32" id="apply">
      <div className="mx-auto max-w-4xl">
        <FadeUp className="text-center">
          <SectionLabel>Get Started</SectionLabel>
          <SectionHeading>Apply Now</SectionHeading>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            Ready to start a chapter or become an ambassador? Fill out the form and our team will
            reach out within 48 hours.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mx-auto mt-10 max-w-2xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl border border-[#7bd355]/20 bg-gradient-to-b from-[#7bd355]/10 to-transparent p-10 text-center backdrop-blur-2xl"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#7bd355]/20 text-3xl">
                  ✅
                </div>
                <h3 className="font-heading text-2xl font-bold text-white">Application Submitted!</h3>
                <p className="mt-3 text-base text-white/60">
                  Thank you for your interest. Our team will review your application and reach out via
                  email within 48 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-full bg-[#7bd355] px-6 py-3 text-sm font-bold text-[#1b2118]"
                >
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl sm:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="glass-input-chapters"
                    placeholder="Full Name"
                  />
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="glass-input-chapters"
                    placeholder="Email Address"
                  />
                  <input
                    required
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="glass-input-chapters"
                    placeholder="University Name"
                  />
                  <input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="glass-input-chapters"
                    placeholder="Phone (optional)"
                  />
                </div>

                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="glass-input-chapters"
                  required
                >
                  <option value="chapter">Start a Chapter</option>
                  <option value="ambassador">Campus Ambassador</option>
                  <option value="member">Founding Member</option>
                  <option value="other">Other</option>
                </select>

                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="glass-input-chapters min-h-28"
                  placeholder="Tell us about yourself and why you want to join..."
                  required
                />

                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-full bg-[#7bd355] py-3.5 text-sm font-bold text-[#1b2118] shadow-2xl shadow-[#7bd355]/30 transition-all hover:shadow-[0_0_40px_rgba(123,211,85,0.5)] sm:py-4 sm:text-base"
                >
                  <span className="relative z-10">Submit Application</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#6bc450] to-[#7bd355] transition-transform duration-300 group-hover:translate-x-0" />
                </button>

                <p className="text-center text-xs text-white/40">
                  We respect your privacy. Your information will only be used for application processing.
                </p>
              </form>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Hooks ─── */

function useIsMobileState() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return [isMobile];
}

/* ─── Main Export ─── */

export default function ChaptersPage() {
  return (
    <div className="min-h-screen bg-[#070907] text-[#e8ecee] overflow-x-hidden">
      <HeroSection />
      <WhatIsChapter />
      <Benefits />
      <ChapterStructure />
      <HowChaptersWork />
      <ExpansionMap />
      <ExpansionBanner />
      <ChapterShowcase />
      <CampusAmbassador />
      <FAQSection />
      <ApplicationForm />
      <FinalCTA />
    </div>
  );
}
