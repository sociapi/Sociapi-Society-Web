import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";

const icpImg = "https://images.pexels.com/photos/31139015/pexels-photo-31139015.jpeg?auto=compress&cs=tinysrgb&w=1200";
const communityImg = "https://images.pexels.com/photos/33920044/pexels-photo-33920044.jpeg?auto=compress&cs=tinysrgb&w=1200";
const campusNightImg = "https://images.pexels.com/photos/35199522/pexels-photo-35199522.jpeg?auto=compress&cs=tinysrgb&w=1200";

const EASE = [0.22, 1, 0.36, 1] as const;
const FORMS = {
  chapter: "https://forms.gle/rjCsLLKiz9FK5gFX6",
  ambassador: "https://forms.gle/gLYkmyJj7sp1zRJ2A",
};

type Chapter = {
  code: string;
  name: string;
  uni: string;
  city: string;
  status: "active" | "pending";
  tag: string;
  members: string;
  events: string;
  third: { label: string; value: string };
  node: { x: number; y: number };
};

const CHAPTERS: Chapter[] = [
  { code: "CH-01", name: "Islamia College Peshawar", uni: "Islamia College University", city: "Peshawar", status: "active", tag: "Founding Chapter", members: "20+", events: "3", third: { label: "Reached", value: "340+" }, node: { x: 400, y: 268 } },
  { code: "CH-02", name: "UET Mardan", uni: "University of Engineering & Technology, Mardan", city: "Mardan", status: "pending", tag: "Coming Soon", members: "—", events: "—", third: { label: "Projects", value: "0" }, node: { x: 138, y: 108 } },
  { code: "CH-03", name: "NFC IEFR", uni: "NFC Institute of Engineering & Fertilizer Research", city: "Peshawar", status: "pending", tag: "Coming Soon", members: "—", events: "—", third: { label: "Projects", value: "0" }, node: { x: 648, y: 86 } },
  { code: "CH-04", name: "UAP Peshawar", uni: "The University of Agriculture, Peshawar", city: "Peshawar", status: "pending", tag: "Coming Soon", members: "—", events: "—", third: { label: "Projects", value: "0" }, node: { x: 706, y: 306 } },
  { code: "CH-05", name: "UET Peshawar", uni: "University of Engineering & Technology — Nowshera Campus", city: "Nowshera", status: "pending", tag: "Coming Soon", members: "—", events: "—", third: { label: "Projects", value: "0" }, node: { x: 566, y: 462 } },
  { code: "CH-06", name: "University of Peshawar", uni: "University of Peshawar", city: "Peshawar", status: "pending", tag: "Coming Soon", members: "—", events: "—", third: { label: "Projects", value: "0" }, node: { x: 252, y: 472 } },
  { code: "CH-07", name: "University of Lahore", uni: "The University of Lahore", city: "Lahore", status: "pending", tag: "Coming Soon", members: "—", events: "—", third: { label: "Projects", value: "0" }, node: { x: 84, y: 330 } },
];

const PILLARS = [
  { n: "01", title: "Artificial Intelligence", desc: "Foundational and applied AI — learning by building, not just theory." },
  { n: "02", title: "Machine Learning", desc: "Hands-on ML projects that ship into real student portfolios." },
  { n: "03", title: "Deep Learning", desc: "Neural networks and transformers, taught through practice." },
  { n: "04", title: "Generative AI", desc: "LLMs, agents and RAG systems — the tools shaping the AI era." },
  { n: "05", title: "Robotics & Automation", desc: "Smart systems that turn classroom ideas into working builds." },
  { n: "06", title: "Computer Vision", desc: "OpenCV and applied vision projects students can actually demo." },
  { n: "07", title: "Business Intelligence", desc: "Power BI, analytics and insight tied to real problems." },
  { n: "08", title: "Web Development", desc: "Modern, production-grade web — frontend, backend, AI-powered apps." },
];

const BENEFITS = [
  { title: "Learn by doing, not by watching", desc: "Every chapter runs on projects. Students practice, share ideas, and solve problems as a team." },
  { title: "Build a portfolio that stands out", desc: "Workshops, study groups and project activities produce real work — not just certificates." },
  { title: "Open to every student", desc: "Beginner or advanced — everyone gets support, guidance, and a friendly environment." },
  { title: "Real leadership experience", desc: "Chapter leaders manage teams, events and stakeholders before they graduate." },
  { title: "Mentors, experts & opportunities", desc: "We connect students with mentors, industry experts, and the growing Sociapi network." },
  { title: "One connected community", desc: "Every chapter routes back to the founding hub — shared branding, one calendar, one network." },
];

const MISSION = [
  "Provide simple and practical workshops",
  "Help students build real projects and strong portfolios",
  "Support teamwork, creativity, and problem-solving",
  "Arrange events that inspire new ideas and learning",
  "Connect students with mentors, industry experts, and opportunities",
];

const LEADERSHIP = [
  { title: "Chapter President", role: "Lead", desc: "Owns strategy, external representation, and final calls." },
  { title: "Vice President", role: "Ops", desc: "Runs operations and coordination across the chapter." },
  { title: "General Secretary", role: "Records", desc: "Owns documentation, communications, and meeting cadence." },
];

const DEPTS = [
  { name: "Event Team", color: "#7bd355" },
  { name: "Outreach Team", color: "#7dd3a8" },
  { name: "Media Team", color: "#7fb4f0" },
  { name: "Design Team", color: "#c9a0f5" },
  { name: "Tech Team", color: "#f09070" },
  { name: "Women Wing", color: "#f08bb4" },
  { name: "Volunteers", color: "#f2c46b" },
];

const STEPS = [
  { title: "Apply", meta: "10 MIN · ONLINE", desc: "Fill the chapter application — your campus, your team, and why you want to lead." },
  { title: "Interview", meta: "20 MIN · WITH THE TEAM", desc: "A straight conversation with the central team. Fit, drive, commitment — no trick questions." },
  { title: "Onboarding", meta: "WEEK 1–2 · TRAINING", desc: "You become a Campus Ambassador. Training deck, branding kit, and ops guide open up." },
  { title: "Team formation", meta: "WEEK 2–4 · RECRUITING", desc: "Build 5–7 founding members across events, outreach, media, tech and design." },
  { title: "Chapter launch", meta: "WEEK 4–6 · LAUNCH", desc: "Your chapter goes live with full Sociapi branding, toolkits, and support." },
];

const FAQS = [
  { q: "How do I start a chapter?", a: "Submit the application on this page. The central team reviews it, schedules a short interview, and walks you through the rest. Most campuses go from apply to launch in under six weeks." },
  { q: "Who can apply?", a: "Any enrolled student at a recognized university in Pakistan — with the heaviest focus on Khyber Pakhtunkhwa right now. Beginner or advanced does not matter." },
  { q: "Is prior leadership experience required?", a: "No. We screen for ambition, integrity, and reliability. The rest is taught through ambassador training and mentorship." },
  { q: "How many members do I need?", a: "A founding team of 5–7 works best. If you only have two or three committed people, apply anyway — team formation is part of the process." },
  { q: "What does the central team provide?", a: "Branding, mentorship, event toolkits, speaker connections, design templates, digital infrastructure, and ongoing operational guidance." },
];

const TAGS = [
  { label: "Generative AI", side: "left" as const, top: "22%" },
  { label: "Machine Learning", side: "right" as const, top: "20%" },
  { label: "Computer Vision", side: "left" as const, top: "58%" },
  { label: "Robotics", side: "right" as const, top: "56%" },
  { label: "Data Science", side: "left" as const, top: "82%" },
  { label: "AI Agents", side: "right" as const, top: "80%" },
];

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.7, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

function MaskLine({ children, delay = 0, immediate = false }: { children: ReactNode; delay?: number; immediate?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const show = immediate || inView;
  return (
    <span ref={ref} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span className="block" initial={{ y: "110%" }} animate={show ? { y: "0%" } : { y: "110%" }} transition={{ duration: 0.85, ease: EASE, delay }}>
        {children}
      </motion.span>
    </span>
  );
}

function Counter({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) { setV(to); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      setV(Math.round((1 - Math.pow(1 - t, 3)) * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, duration]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#7bd355]/25 bg-[#7bd355]/10 px-4 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7bd355]">
      <span className="text-[8px]">◆</span> {children}
    </span>
  );
}

function Primary({ href, children, ext }: { href: string; children: ReactNode; ext?: boolean }) {
  return (
    <a href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex items-center gap-2 rounded-full bg-[#7bd355] px-7 py-3.5 font-display text-sm font-semibold text-[#1b2118] transition hover:brightness-110">
      {children}
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M4 12h15M13 5.5 19.5 12 13 18.5" /></svg>
    </a>
  );
}

function Ghost({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-7 py-3.5 font-display text-sm font-semibold text-[#e8ecee] transition hover:border-[#7bd355]/40">
      {children}
    </a>
  );
}

function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2v20M2 12h20M5.2 5.2l13.6 13.6M18.8 5.2 5.2 18.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" fill="currentColor" />
    </svg>
  );
}

function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 768 ? 42 : 64;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.4,
      }));
    };
    const draw = (move: boolean) => {
      ctx.clearRect(0, 0, w, h);
      if (move) {
        for (const n of nodes) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < -10) n.x = w + 10; else if (n.x > w + 10) n.x = -10;
          if (n.y < -10) n.y = h + 10; else if (n.y > h + 10) n.y = -10;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < 16000) {
            ctx.strokeStyle = `rgba(123,211,85,${((1 - Math.sqrt(d2) / 126) * 0.2).toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      ctx.fillStyle = "rgba(123,211,85,0.55)";
      for (const n of nodes) { ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill(); }
    };
    const loop = () => { draw(true); raf = requestAnimationFrame(loop); };
    resize();
    window.addEventListener("resize", resize);
    if (reduced) draw(false); else loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [reduced]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

export default function ChaptersPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [ticket, setTicket] = useState("");
  const [form, setForm] = useState({ name: "", email: "", university: "", role: "Chapter President (founder)", message: "" });
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const ticker = [...CHAPTERS.map((c) => c.name), "Your University"];

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx ?? 0)); });
    }, { rootMargin: "-42% 0px -42% 0px" });
    stepRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="chapters-root min-h-screen overflow-x-hidden bg-[#070907] text-[#e8ecee] antialiased">
      <style>{`
        .chapters-root { font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
        .chapters-root .font-display { font-family: Tomorrow, "Space Grotesk", ui-sans-serif, sans-serif; }
        .chapters-root .font-mono { font-family: "JetBrains Mono", ui-monospace, monospace; }
        .chapters-root .grid-lines { background-image: linear-gradient(rgba(232,236,238,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(232,236,238,0.045) 1px, transparent 1px); background-size: 64px 64px; }
        .chapters-root .mask-radial { mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 78%); }
        .chapters-root .text-outline { color: transparent; -webkit-text-stroke: 1.4px rgba(232,236,238,0.32); }
        @keyframes ch-marquee { to { transform: translateX(-50%); } }
        .chapters-root .marquee-track { display: flex; width: max-content; animation: ch-marquee 36s linear infinite; }
        @keyframes ch-spin { to { transform: rotate(360deg); } }
        .chapters-root .spin-slow { animation: ch-spin 44s linear infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes ch-dash { to { stroke-dashoffset: -60; } }
        .chapters-root .dash-flow { stroke-dasharray: 3 7; animation: ch-dash 3.2s linear infinite; }
        .chapters-root .field { width:100%; border:1px solid rgba(232,236,238,0.12); background:rgba(232,236,238,0.03); padding:.85rem 1rem; font-size:.92rem; color:#e8ecee; border-radius:12px; outline:none; }
        .chapters-root .field:focus { border-color:rgba(123,211,85,.55); box-shadow:0 0 0 3px rgba(123,211,85,.12); }
        .chapters-root select.field option { background:#101410; }
        @media (prefers-reduced-motion: reduce) {
          .chapters-root .marquee-track, .chapters-root .spin-slow, .chapters-root .dash-flow { animation: none !important; }
        }
      `}</style>

      {/* HERO */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div className="absolute inset-0">
          <div className="grid-lines mask-radial absolute inset-0 opacity-80" />
          <NetworkCanvas />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#070907] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#070907] to-transparent" />
        </div>

        {TAGS.map((t) => (
          <span
            key={t.label}
            className="absolute z-10 hidden items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm lg:inline-flex"
            style={{ top: t.top, ...(t.side === "left" ? { left: "3.5%" } : { right: "3.5%" }) }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#7bd355]" />
            {t.label}
          </span>
        ))}

        <div className="relative z-10 mx-auto flex w-full max-w-[980px] flex-1 flex-col items-center justify-center px-5 pb-10 pt-16 text-center sm:px-8">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7bd355]/25 bg-[#7bd355]/10 px-4 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7bd355] sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7bd355]" />
            University Expansion · Est. 2025
          </motion.p>

          <h1 className="font-display text-[clamp(2.9rem,11vw,7rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-[#e8ecee]">
            <MaskLine delay={0.1} immediate>Start a</MaskLine>
            <MaskLine delay={0.22} immediate><span className="text-[#7bd355]">Sociapi</span></MaskLine>
            <MaskLine delay={0.34} immediate>Chapter</MaskLine>
          </h1>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }} className="mt-8 flex w-full max-w-2xl items-end justify-center gap-3 sm:gap-4">
            {[
              { src: icpImg, alt: "Islamia College Peshawar", caption: "Founding Chapter", sub: "Islamia College", tall: false },
              { src: communityImg, alt: "Sociapi students", caption: "Our Community", sub: "Workshops & projects", tall: true },
              { src: campusNightImg, alt: "Universities joining next", caption: "New Campuses", sub: "Coming soon", tall: false },
            ].map((img) => (
              <figure key={img.caption} className={`relative overflow-hidden rounded-2xl border border-white/10 ${img.tall ? "w-[40%] max-w-[240px]" : "w-[28%] max-w-[180px]"}`}>
                <img src={img.src} alt={img.alt} className={`w-full object-cover ${img.tall ? "h-40 sm:h-48" : "h-32 sm:h-40"}`} />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2.5 pb-2.5 pt-8 text-left">
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:text-[11px]">{img.caption}</p>
                  <p className="mt-0.5 text-[10px] text-white/65">{img.sub}</p>
                </figcaption>
              </figure>
            ))}
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62 }} className="mx-auto mt-7 max-w-xl text-balance text-[15px] leading-relaxed text-[#939596] sm:text-lg">
            Building the next generation of AI, technology, leadership and innovation communities across universities — starting from Islamia College Peshawar.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 }} className="mt-8 flex flex-wrap justify-center gap-3">
            <Primary href={FORMS.chapter} ext>Start a Chapter</Primary>
            <Ghost href="#network">Explore Chapters</Ghost>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.88 }} className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { v: <Counter to={7} />, l: "Total Chapters" },
              { v: <Counter to={7} />, l: "Campus Ambassadors" },
              { v: <Counter to={340} suffix="+" />, l: "Students Reached" },
              { v: <Counter to={3} />, l: "Events Organized" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/10 bg-black/40 px-3 py-5 sm:py-6">
                <p className="font-display text-3xl font-bold text-[#7bd355] sm:text-[2.1rem]">{s.v}</p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.14em] text-[#939596] sm:text-[11px]">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 overflow-hidden border-y border-white/10 bg-black/35 py-3">
          <div className="marquee-track items-center">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center">
                {ticker.map((name) => (
                  <span key={`${dup}-${name}`} className="flex items-center">
                    <span className="whitespace-nowrap px-7 font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-[#939596]">{name}</span>
                    <Mark className="h-3 w-3 text-[#7bd355]/65" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Pill>About the Society</Pill>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[1.02] tracking-[-0.03em] sm:text-5xl">
              <MaskLine>Students who</MaskLine>
              <MaskLine delay={0.1}>turn ideas into <span className="text-[#7bd355]">skills.</span></MaskLine>
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 text-[15px] leading-relaxed text-[#939596]">
                Sociapi Society is a student-led community based at Islamia College Peshawar, where students turn ideas into skills and skills into real projects. We arrange workshops, training sessions, study groups and project activities — open to every student, beginner or advanced.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-[#101410] p-7">
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7bd355]">◆ Vision</p>
                <p className="mt-3 text-[15px] leading-relaxed">To build a smart, skilled, and creative student community that grows through learning, coding, and technology.</p>
                <div className="my-6 h-px bg-white/10" />
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7bd355]">◆ Mission</p>
                <ul className="mt-4 space-y-2.5">
                  {MISSION.map((m, i) => (
                    <li key={m} className="flex gap-3 text-sm text-[#939596]">
                      <span className="font-display text-[11px] font-bold text-[#7bd355]">{String(i + 1).padStart(2, "0")}</span>{m}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section className="border-t border-white/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Pill>Learning Tracks</Pill>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase tracking-[-0.03em] sm:text-5xl">
            <MaskLine>Eight tracks.</MaskLine>
            <MaskLine delay={0.1}>One <span className="text-[#7bd355]">trajectory.</span></MaskLine>
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={0.04 * i}>
                <div className="h-full rounded-2xl border border-white/10 bg-[#101410] p-6">
                  <p className="font-display text-[11px] text-[#7bd355]">{p.n}</p>
                  <h3 className="mt-3 font-display text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#939596]">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-t border-white/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Pill>Why Start a Chapter</Pill>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase tracking-[-0.03em] sm:text-5xl">
            <MaskLine>Why your campus</MaskLine>
            <MaskLine delay={0.1}>needs <span className="text-[#7bd355]">one.</span></MaskLine>
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={0.04 * i}>
                <div className="h-full rounded-2xl border border-white/10 bg-[#101410] p-6">
                  <span className="font-display text-2xl font-bold text-[#7bd355]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-lg font-bold">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#939596]">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NETWORK */}
      <section id="network" className="border-t border-white/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <div className="flex justify-center"><Pill>University Chapters</Pill></div>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase tracking-[-0.03em] sm:text-5xl">
              <MaskLine>One hub.</MaskLine>
              <MaskLine delay={0.1}>Seven <span className="text-[#7bd355]">campuses.</span></MaskLine>
            </h2>
          </div>

          <Reveal>
            <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-[#101410]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-display text-[10px] uppercase tracking-[0.18em] text-[#939596]">
                <span>Expansion Map — Pakistan</span>
                <span><span className="text-[#7bd355]">● Live</span> &nbsp; <span className="text-[#f2c46b]">● Coming soon</span></span>
              </div>
              <svg viewBox="0 0 800 560" className="block h-auto w-full">
                <circle cx="400" cy="268" r="72" fill="none" stroke="rgba(123,211,85,0.25)" strokeDasharray="2 8" className="spin-slow" />
                {CHAPTERS.slice(1).map((n) => (
                  <line key={n.code} x1="400" y1="268" x2={n.node.x} y2={n.node.y} stroke="rgba(123,211,85,0.3)" className="dash-flow" />
                ))}
                {CHAPTERS.slice(1).map((n) => (
                  <g key={n.code}>
                    <circle cx={n.node.x} cy={n.node.y} r="9" fill="rgba(242,196,107,0.1)" stroke="#f2c46b" />
                    <circle cx={n.node.x} cy={n.node.y} r="3" fill="#101410" stroke="#f2c46b" />
                    <text x={n.node.x} y={n.node.y + 26} textAnchor="middle" fill="#939596" style={{ fontSize: 11 }}>{n.city}</text>
                  </g>
                ))}
                <circle cx="400" cy="268" r="11" fill="rgba(123,211,85,0.12)" stroke="#7bd355" />
                <circle cx="400" cy="268" r="4.5" fill="#7bd355" />
                <text x="400" y="234" textAnchor="middle" fill="#7bd355" style={{ fontSize: 11, fontWeight: 700 }}>FOUNDING HUB</text>
              </svg>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHAPTERS.map((c) => (
              <Reveal key={c.code}>
                <div className="h-full rounded-2xl border border-white/10 bg-[#101410] p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className={`rounded-full px-2.5 py-1 font-display text-[10px] font-semibold uppercase ${c.status === "active" ? "bg-[#7bd355]/15 text-[#7bd355]" : "bg-[#f2c46b]/10 text-[#f2c46b]"}`}>
                      {c.status === "active" ? "Active" : "Coming Soon"}
                    </span>
                    <span className="font-display text-[10px] text-[#939596]">{c.tag}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold">{c.name}</h3>
                  <p className="mt-1 text-sm text-[#939596]">{c.uni}</p>
                  <p className="mt-1 text-xs text-[#6a6f6a]">{c.city}</p>
                </div>
              </Reveal>
            ))}
            <a href="#apply" className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#7bd355]/30 bg-[#7bd355]/[0.04] p-6 text-center">
              <h3 className="font-display text-lg font-bold text-[#7bd355]">Your University</h3>
              <p className="mt-1 text-sm text-[#939596]">Start a chapter at your campus</p>
            </a>
          </div>
        </div>
      </section>

      {/* STRUCTURE */}
      <section id="structure" className="border-t border-white/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-[1100px] text-center">
          <div className="flex justify-center"><Pill>Chapter Structure</Pill></div>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase tracking-[-0.03em] sm:text-5xl">
            <MaskLine>A living</MaskLine>
            <MaskLine delay={0.1}>organization <span className="text-[#7bd355]">map.</span></MaskLine>
          </h2>
          <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
            {LEADERSHIP.map((r) => (
              <div key={r.title} className="rounded-2xl border border-[#7bd355]/20 bg-[#7bd355]/[0.06] p-6 text-center">
                <p className="font-display text-[10px] uppercase tracking-[0.2em] text-[#7bd355]">{r.role}</p>
                <h3 className="mt-3 font-display text-lg font-bold">{r.title}</h3>
                <p className="mt-2 text-sm text-[#939596]">{r.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 font-display text-[11px] uppercase tracking-[0.28em] text-[#7bd355]">◆ Departments</p>
          <div className="mt-6 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
            {DEPTS.map((d) => (
              <div key={d.name} className="rounded-2xl border border-white/10 bg-[#101410] p-5">
                <span className="block h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                <h3 className="mt-3 font-display font-bold">{d.name}</h3>
              </div>
            ))}
            <a href="#apply" className="rounded-2xl border border-dashed border-[#7bd355]/30 bg-[#7bd355]/[0.04] p-5">
              <h3 className="font-display font-bold text-[#7bd355]">Your Team</h3>
              <p className="mt-1 text-xs text-[#939596]">5–7 founding seats open</p>
            </a>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="border-t border-white/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Pill>How It Works</Pill>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase tracking-[-0.03em] sm:text-5xl">
                <MaskLine>Application</MaskLine>
                <MaskLine delay={0.1}>to <span className="text-[#7bd355]">launch.</span></MaskLine>
              </h2>
              <div className="mt-8 hidden rounded-2xl border border-white/10 bg-[#101410] p-6 lg:block">
                <p className="font-display text-6xl font-bold text-[#7bd355]">{String(active + 1).padStart(2, "0")}<span className="text-lg text-[#939596]"> / 05</span></p>
                <div className="mt-4 h-[3px] rounded-full bg-white/10"><div className="h-full rounded-full bg-[#7bd355] transition-all" style={{ width: `${((active + 1) / 5) * 100}%` }} /></div>
              </div>
            </div>
          </div>
          <div className="space-y-4 lg:col-span-8">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                ref={(el) => { stepRefs.current[i] = el; }}
                data-idx={i}
                className={`relative rounded-3xl border p-6 sm:p-8 ${active === i ? "border-[#7bd355]/40 bg-[#7bd355]/[0.05]" : "border-white/10 bg-[#101410]/80"}`}
              >
                <p className={`font-display text-xs uppercase tracking-[0.2em] ${active === i ? "text-[#7bd355]" : "text-[#6a6f6a]"}`}>Step {String(i + 1).padStart(2, "0")} · {s.meta}</p>
                <div className="mt-4 flex gap-5">
                  <span className={`font-display text-5xl font-bold ${active === i ? "text-[#7bd355]" : "text-outline"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#939596]">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMBASSADOR */}
      <section id="ambassador" className="border-t border-white/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Pill>Join the Movement</Pill>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold uppercase tracking-[-0.03em] sm:text-5xl">
            <MaskLine>No team yet?</MaskLine>
            <MaskLine delay={0.1}>Become an <span className="text-[#7bd355]">ambassador.</span></MaskLine>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] text-[#939596]">Represent Sociapi on your campus, recruit members, run activities, and turn that foothold into a full chapter.</p>
          <div className="mt-8"><Primary href={FORMS.ambassador} ext>Apply as an Ambassador</Primary></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Represent", "Be the voice of Sociapi on your campus."],
              ["Recruit", "Find the students who will carry the chapter."],
              ["Organize", "Run workshops and meetups with our toolkits."],
              ["Establish", "Turn the role into a full chartered chapter."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-[#101410] p-6">
                <h3 className="font-display text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm text-[#939596]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-white/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Pill>FAQ</Pill>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase tracking-[-0.03em] sm:text-5xl">
              <MaskLine>Before</MaskLine>
              <MaskLine delay={0.1}>you <span className="text-outline">ask.</span></MaskLine>
            </h2>
          </div>
          <div className="space-y-3 lg:col-span-8">
            {FAQS.map((f, i) => (
              <div key={f.q} className={`overflow-hidden rounded-2xl border ${open === i ? "border-[#7bd355]/30 bg-[#7bd355]/[0.04]" : "border-white/10 bg-[#101410]"}`}>
                <button type="button" onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="font-display text-base font-bold sm:text-lg">{f.q}</span>
                  <span className="font-display text-[#7bd355]">{open === i ? "−" : "+"}</span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-6 pb-5 text-sm leading-relaxed text-[#939596]">
                      {f.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section id="apply" className="border-t border-white/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Pill>Get Started</Pill>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase tracking-[-0.03em] sm:text-5xl">
              <MaskLine>Put your campus</MaskLine>
              <MaskLine delay={0.1}>on the <span className="text-[#7bd355]">map.</span></MaskLine>
            </h2>
            <p className="mt-5 text-[15px] text-[#939596]">Ten minutes now, a chapter in six weeks. The core team replies within 48 hours.</p>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-[#101410]">
              {sent ? (
                <div className="p-10 text-center">
                  <p className="font-display text-[11px] uppercase tracking-[0.25em] text-[#7bd355]">Application received</p>
                  <h3 className="mt-3 font-display text-2xl font-bold">Ticket {ticket}</h3>
                  <p className="mt-2 text-sm text-[#939596]">We’ll reach {form.email} within 48 hours.</p>
                  <button type="button" onClick={() => setSent(false)} className="mt-6 rounded-full border border-white/15 px-5 py-2 font-display text-xs uppercase text-[#939596]">Submit another</button>
                </div>
              ) : (
                <form
                  className="space-y-4 p-6 sm:p-8"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setTicket(`SAP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
                    setSent(true);
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input required className="field" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <input required type="email" className="field" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <select required className="field" value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })}>
                      <option value="">University…</option>
                      {CHAPTERS.map((c) => <option key={c.code} value={c.name}>{c.name}</option>)}
                      <option value="other">Other</option>
                    </select>
                    <select className="field" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                      <option>Chapter President (founder)</option>
                      <option>Campus Ambassador</option>
                      <option>Founding Member</option>
                    </select>
                  </div>
                  <textarea required className="field min-h-28" placeholder="Your pitch…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  <button type="submit" className="w-full rounded-full bg-[#7bd355] py-3.5 font-display text-sm font-semibold text-[#1b2118]">Submit Application</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 pt-16 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-8 pb-10 sm:flex-row">
          <div>
            <p className="font-display text-lg font-bold tracking-[0.08em]">SOCIAPI SOCIETY</p>
            <p className="mt-3 max-w-sm text-sm text-[#939596]">Student-led AI & technology community — Islamia College Peshawar, expanding across Pakistan.</p>
          </div>
          <p className="font-display text-[11px] uppercase tracking-[0.18em] text-[#6a6f6a]">© {new Date().getFullYear()} Sociapi Society</p>
        </div>
        <p className="text-outline pointer-events-none text-center font-display text-[16vw] font-bold uppercase leading-[0.8] opacity-40">Sociapi</p>
      </footer>
    </div>
  );
}
