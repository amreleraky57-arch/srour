import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Palette,
  Video,
  Film,
  Megaphone,
  Layers,
  Clapperboard,
  PenTool,
  Mail,
  MessageCircle,
  Linkedin,
  Music2,
  Globe,
  Send,
  Languages,
  Menu,
  X,
  ArrowDown,
} from "lucide-react";
import srour from "@/assets/srour.jpg.asset.json";
import { content, projects, skills, tools, SOCIALS, type Lang } from "./i18n";

const serviceIcons = [PenTool, Layers, Video, Film, Megaphone, Palette, Clapperboard, Briefcase];

function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  return [lang, setLang];
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[2] hidden h-[500px] w-[500px] rounded-full opacity-30 blur-3xl md:block"
      style={{ background: "radial-gradient(circle, oklch(0.6 0.18 295 / 0.3), transparent 65%)" }}
    />
  );
}

function Blobs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="animate-blob absolute -left-40 top-40 h-[520px] w-[520px] rounded-full bg-[oklch(0.6_0.18_295/0.18)] blur-[140px]" />
      <div className="animate-blob absolute right-[-100px] top-1/2 h-[620px] w-[620px] rounded-full bg-[oklch(0.7_0.18_255/0.15)] blur-[160px]" style={{ animationDelay: "5s" }} />
      <div className="animate-blob absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[oklch(0.78_0.16_55/0.08)] blur-[140px]" style={{ animationDelay: "9s" }} />
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-brand" />;
}

function Navbar({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const t = content[lang];
  const links = [
    { href: "#home", l: t.nav.home },
    { href: "#about", l: t.nav.about },
    { href: "#work", l: t.nav.work },
    { href: "#craft", l: t.nav.craft },
    { href: "#contact", l: t.nav.contact },
  ];
  return (
    <header className="fixed inset-x-0 top-4 z-40 mx-auto flex max-w-6xl items-center justify-between px-4">
      <div className="glass flex w-full items-center justify-between rounded-full px-5 py-3 md:px-6">
        <a href="#home" className="flex items-center gap-2.5 text-sm font-bold tracking-tight">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.16_55)]" />
          <span>Srour<span className="text-muted-foreground">.</span></span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground">
              {l.l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold transition hover:bg-white/10"
          >
            <Languages className="h-3.5 w-3.5" />
            {lang === "en" ? "AR" : "EN"}
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass absolute left-4 right-4 top-20 flex flex-col gap-1 rounded-3xl p-3 md:hidden"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm hover:bg-white/5">
                {l.l}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function TypingRoles({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, [roles.length]);
  return (
    <div className="relative inline-flex h-7 items-center overflow-hidden md:h-9">
      <AnimatePresence mode="wait">
        <motion.div
          key={roles[i]}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-base font-medium tracking-tight text-[oklch(0.78_0.16_55)] md:text-lg"
        >
          {roles[i]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 flex flex-col gap-4 md:mb-20"
      >
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-8 bg-white/20" />
          {kicker}
        </div>
        <h2 className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const t = content[lang].hero;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  return (
    <section id="home" ref={ref} className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col justify-center px-5 pt-32 pb-16">
      <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
        <motion.div style={{ y }} className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            <span className="h-px w-10 bg-white/30" />
            {t.eyebrow}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.03em]"
          >
            {t.name.split(" ").map((w, idx) => (
              <span key={idx} className="block">
                {idx === 1 ? <span className="italic font-light text-foreground/90">{w}</span> : w}
              </span>
            ))}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-base text-muted-foreground md:text-lg"
          >
            <span>{lang === "ar" ? "حالياً" : "Currently"}</span>
            <TypingRoles roles={t.roles} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {t.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              {t.cta1}
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium transition hover:bg-white/5"
            >
              {t.cta2}
              <Mail className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: imgY }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm md:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
            <img src="/1771413337063.jpg" alt="Srour Mamdouh" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="flex items-end justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/80">
                <div>
                  <div className="text-foreground">Srour Mamdouh</div>
                  <div className="mt-1 text-muted-foreground">Cairo · Egypt</div>
                </div>
                <div className="text-end text-muted-foreground">
                  <div>Est.</div>
                  <div className="text-foreground">2020</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-3 -end-3 flex h-20 w-20 items-center justify-center rounded-full bg-[oklch(0.78_0.16_55)] text-[10px] font-bold uppercase tracking-widest text-background">
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <defs>
                  <path id="circle" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                </defs>
                <text fontSize="11" fill="currentColor" letterSpacing="2">
                  <textPath href="#circle">AVAILABLE · FOR · WORK · 2025 · </textPath>
                </text>
              </svg>
            </motion.span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-16 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        <ArrowDown className="h-3 w-3 animate-bounce" />
        {t.scroll}
      </motion.div>
    </section>
  );
}

function About({ lang }: { lang: Lang }) {
  const t = content[lang].about;
  return (
    <Section id="about" kicker={t.kicker} title={t.title}>
      <div className="grid gap-12 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 space-y-5 text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          <p className="text-foreground/90">{t.body}</p>
          <p>{t.body2}</p>
        </motion.div>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-1 md:gap-0 md:divide-y md:divide-white/10 md:border-t md:border-white/10">
          {t.stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="py-2 text-center md:py-5 md:text-start"
            >
              <div className="text-3xl font-medium tracking-tight md:text-5xl">{s.v}</div>
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Services({ lang }: { lang: Lang }) {
  const t = content[lang].services;
  return (
    <Section id="services" kicker={t.kicker} title={t.title}>
      <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
        {t.items.map((s, i) => {
          const Icon = serviceIcons[i % serviceIcons.length];
          return (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group relative overflow-hidden bg-background p-7 transition hover:bg-[oklch(0.16_0.012_270)]"
            >
              <div className="absolute -end-12 -top-12 h-40 w-40 rounded-full bg-[oklch(0.6_0.18_295/0.25)] opacity-0 blur-3xl transition duration-700 group-hover:opacity-100" />
              <div className="relative flex items-start justify-between">
                <Icon className="h-6 w-6 text-[oklch(0.78_0.16_55)]" strokeWidth={1.4} />
                <span className="text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="relative mt-8 text-lg font-medium tracking-tight">{s.t}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

function Skills({ lang }: { lang: Lang }) {
  const t = content[lang].skills;
  const tt = content[lang].tools;
  return (
    <Section id="craft" kicker={t.kicker} title={t.title}>
      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="space-y-5">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="mb-2 flex items-baseline justify-between text-sm">
                <span className="font-medium">{s.name}</span>
                <span className="font-mono text-xs text-muted-foreground">{s.value}</span>
              </div>
              <div className="h-px overflow-hidden bg-white/8">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="h-[2px] -translate-y-px bg-foreground"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div>
          <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-8 bg-white/20" />
            {tt.kicker}
          </div>
          <h3 className="mb-8 text-2xl font-medium tracking-tight md:text-3xl">{tt.title}</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className={`group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${tool.tint} p-4 transition hover:border-white/20`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)] opacity-[0.04]" />
                <div className="relative flex h-full flex-col justify-between">
                  <span className="font-display text-3xl font-light tracking-tight text-foreground/95">{tool.abbr}</span>
                  <span className="text-xs text-foreground/80">{tool.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Experience({ lang }: { lang: Lang }) {
  const t = content[lang].experience;
  return (
    <Section id="experience" kicker={t.kicker} title={t.title}>
      <div className="divide-y divide-white/8 border-y border-white/8">
        {t.items.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="group grid gap-3 py-7 md:grid-cols-[120px_1.5fr_1fr] md:items-baseline md:gap-8"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{e.period}</span>
            <div>
              <h3 className="text-xl font-medium tracking-tight md:text-2xl">{e.role}</h3>
              <div className="mt-1 text-sm text-[oklch(0.78_0.16_55)]">{e.company}</div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Projects({ lang }: { lang: Lang }) {
  const t = content[lang].projects;
  const [filter, setFilter] = useState(0);
  const filtered = useMemo(() => {
    if (filter === 0) return projects;
    const en = ["All", "Branding", "Social Media", "Motion Graphics", "Video Editing"][filter];
    return projects.filter((p) => p.cat === en);
  }, [filter]);
  return (
    <Section id="work" kicker={t.kicker} title={t.title}>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/8 pb-5">
       <div className="flex flex-wrap gap-1">
        {t.filters.map((f, i) => (
          <button
            key={f}
            onClick={() => setFilter(i)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              filter === i ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
       </div>
       <a href={SOCIALS.behance} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground md:inline-flex">
         All projects on Behance <ArrowUpRight className="h-3 w-3" />
       </a>
      </div>
      <div className="space-y-6 md:space-y-10">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`group grid items-center gap-6 md:gap-10 ${(p as any).featured ? "md:grid-cols-1" : i % 2 === 1 ? "md:grid-cols-[1fr_1.4fr]" : "md:grid-cols-[1.4fr_1fr]"}`}
            >
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative block aspect-[4/3] overflow-hidden rounded-2xl border border-white/8 bg-card ${(p as any).featured ? "md:aspect-[16/9] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]" : "md:aspect-[5/4]"} ${!((p as any).featured) && i % 2 === 1 ? "md:order-2" : ""}`}
              >
                <motion.img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent opacity-60 transition duration-700 group-hover:opacity-90" />
                {(p as any).featured && (
                  <div className="absolute start-4 top-4 rounded-full border border-white/20 bg-background/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-foreground backdrop-blur-md">
                    Featured Case Study
                  </div>
                )}
                <div className="absolute end-4 top-4 flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 text-[10px] uppercase tracking-widest text-foreground backdrop-blur-md opacity-0 transition group-hover:opacity-100">
                  {t.cta} <ArrowUpRight className="h-3 w-3" />
                </div>
              </a>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  <span>{p.year}</span>
                  <span className="h-px w-6 bg-white/20" />
                  <span>{lang === "ar" ? p.catAr : p.cat}</span>
                </div>
                <h3 className={`font-medium leading-tight tracking-tight ${(p as any).featured ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"}`}>
                  <span className="bg-gradient-to-r from-foreground to-foreground bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                    {lang === "ar" ? p.titleAr : p.title}
                  </span>
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">{lang === "ar" ? p.descAr : p.desc}</p>
                {(p as any).featured && (
                  <div className="mt-2 grid gap-5 md:grid-cols-3 md:gap-6">
                    {[
                      { k: t.overview, v: lang === "ar" ? (p as any).overviewAr : (p as any).overview },
                      { k: t.direction, v: lang === "ar" ? (p as any).directionAr : (p as any).direction },
                      { k: t.identity, v: lang === "ar" ? (p as any).identityAr : (p as any).identity },
                    ].map((b) => (
                      <div key={b.k} className="rounded-xl border border-white/8 bg-card/40 p-5 backdrop-blur-sm">
                        <div className="text-[10px] uppercase tracking-[0.25em] text-[oklch(0.78_0.16_55)]">{b.k}</div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.v}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{t.software}:</span>
                  {p.software.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-medium">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
                  >
                    {t.cta}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-white/40"
                  >
                    {t.cta2}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}

function Testimonials({ lang }: { lang: Lang }) {
  const t = content[lang].testimonials;
  return (
    <Section id="testimonials" kicker={t.kicker} title={t.title}>
      <div className="grid gap-4 md:grid-cols-3">
        {t.items.map((tt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-white/8 bg-card/50 p-7"
          >
            <div className="font-serif text-4xl leading-none text-[oklch(0.78_0.16_55)]">"</div>
            <p className="mt-2 text-base leading-relaxed text-foreground/90">{tt.q}</p>
            <div className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">{tt.a}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Social({ lang }: { lang: Lang }) {
  const t = content[lang].social;
  const items = [
    { name: "Behance", icon: Globe, href: SOCIALS.behance },
    { name: "TikTok", icon: Music2, href: SOCIALS.tiktok },
    { name: "LinkedIn", icon: Linkedin, href: SOCIALS.linkedin },
    { name: "WhatsApp", icon: MessageCircle, href: SOCIALS.whatsapp },
  ];
  return (
    <Section id="social" kicker={t.kicker} title={t.title}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.a
            key={it.name}
            href={it.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group flex items-center justify-between rounded-2xl border border-white/8 bg-card/30 p-5 transition hover:border-white/20 hover:bg-card/60"
          >
            <div className="flex items-center gap-3">
              <it.icon className="h-5 w-5 text-muted-foreground transition group-hover:text-[oklch(0.78_0.16_55)]" strokeWidth={1.5} />
              <span className="font-medium">{it.name}</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

function Contact({ lang }: { lang: Lang }) {
  const t = content[lang].contact;
  const cta = content[lang].social.cta;
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact" kicker={t.kicker} title={t.title}>
      <div className="mb-10">
        <a
          href={SOCIALS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full bg-[oklch(0.78_0.16_55)] px-7 py-4 text-sm font-medium text-background transition hover:bg-[oklch(0.82_0.16_55)]"
        >
          <MessageCircle className="h-4 w-4" />
          {cta}
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
      <div className="grid gap-10 md:grid-cols-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 4000);
          }}
          className="md:col-span-3 space-y-1"
        >
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8 sm:grid-cols-2">
            <input required placeholder={t.name} className="bg-background px-5 py-4 text-sm outline-none placeholder:text-muted-foreground/70 focus:bg-card" />
            <input required type="email" placeholder={t.email} className="bg-background px-5 py-4 text-sm outline-none placeholder:text-muted-foreground/70 focus:bg-card" />
            <input placeholder={t.type} className="bg-background px-5 py-4 text-sm outline-none placeholder:text-muted-foreground/70 focus:bg-card sm:col-span-2" />
            <textarea required rows={5} placeholder={t.message} className="resize-none bg-background px-5 py-4 text-sm outline-none placeholder:text-muted-foreground/70 focus:bg-card sm:col-span-2" />
          </div>
          <button
            type="submit"
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:bg-foreground/90"
          >
            {t.submit}
            <Send className="h-4 w-4" />
          </button>
          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 text-sm text-[oklch(0.78_0.16_55)]"
              >
                {t.sent}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
        <div className="md:col-span-2 flex flex-col divide-y divide-white/8 border-y border-white/8">
          {[
            { icon: MessageCircle, l: "WhatsApp", v: SOCIALS.whatsappRaw, href: SOCIALS.whatsapp },
            { icon: Globe, l: "Behance", v: "@coolportfoli", href: SOCIALS.behance },
            { icon: Linkedin, l: "LinkedIn", v: "Srour Mamdoh", href: SOCIALS.linkedin },
            { icon: Music2, l: "TikTok", v: "@srormamdoh", href: SOCIALS.tiktok },
          ].map((it) => (
            <a key={it.l} href={it.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-4 transition hover:bg-white/[0.02]">
              <it.icon className="h-5 w-5 text-muted-foreground transition group-hover:text-[oklch(0.78_0.16_55)]" strokeWidth={1.5} />
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{it.l}</div>
                <div className="mt-0.5 text-sm font-medium">{it.v}</div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="relative z-10 mt-16 border-t border-white/8 px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-muted-foreground md:flex-row">
        <span>© {new Date().getFullYear()} Srour Mamdouh — All rights reserved.</span>
        <span>{content[lang].footer}</span>
      </div>
    </footer>
  );
}

function Loader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center gap-5">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs uppercase tracking-[0.4em] text-muted-foreground"
            >
              Srour Mamdouh
            </motion.span>
            <div className="h-px w-32 overflow-hidden bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
                className="h-full w-full bg-[oklch(0.78_0.16_55)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Portfolio() {
  const [lang, setLang] = useLang();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="noise relative min-h-dvh bg-background text-foreground">
      <Loader done={loaded} />
      <ScrollProgress />
      <CursorGlow />
      <Blobs />
      <Navbar lang={lang} setLang={setLang} />
      <main className="relative">
        <Hero lang={lang} />
        <About lang={lang} />
        <Services lang={lang} />
        <Skills lang={lang} />
        <Experience lang={lang} />
        <Projects lang={lang} />
        <Testimonials lang={lang} />
        <Social lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}