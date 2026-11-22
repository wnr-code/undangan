"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, CalendarDays, Clock3, Volume2, VolumeX, Heart,
  Home as HomeIcon, ScrollText, Image as ImageIcon, Send, ChevronDown, Star,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

/* ============ DATA ============ */
const eventDate = new Date(process.env.NEXT_PUBLIC_EVENT_DATE || "2026-12-01T08:00:00+07:00");
const mapsUrl = process.env.NEXT_PUBLIC_MAPS_URL || "https://www.google.com/maps/search/?api=1&query=Dusun+Margasari+RT+01+RW+04";

const NAME = "Muhammad Faariz";
const NAME_FULL = "Muhammad Faariz Al-khowarizmi";
const PARENTS = "Cucu Syamsudin S. H & Aam Himayah";
const EVENT_DATE = "Selasa, 1 Desember 2026";
const EVENT_TIME = "08.00 WIB";
const ADDRESS_AREA = "Dusun Margasari";
const ADDRESS_DETAIL = "RT 01 / RW 04";

const BISMILLAH = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

const photos = [
  { src: "/images/faariz-1.jpg", caption: "Ananda Faariz" },
  { src: "/images/faariz-2.jpg", caption: "Kenangan 21 Agustus 2024" },
];
const HERO_PHOTO = "/images/faariz-1.jpg";

/* ============ helpers (deterministik agar SSR aman) ============ */
function seeded(i: number) { const x = Math.sin(i * 9999.141) * 10000; return x - Math.floor(x); }

function dustParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    x: seeded(i + 1) * 100,
    y: seeded(i + 101) * 100,
    size: 3 + seeded(i + 201) * 5,
    duration: 6 + seeded(i + 301) * 6,
    delay: seeded(i + 401) * 4,
  }));
}
const PARTICLES = dustParticles(16);

const fadeUp = {
  hidden: { opacity: 0, y: 42 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = { show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } } };

/* ============ decorations ============ */
function Star8({ size = 22, color = "#f0c66c", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="9" strokeLinejoin="round" strokeLinecap="round">
        <rect x="24" y="24" width="52" height="52" rx="6" />
        <rect x="24" y="24" width="52" height="52" rx="6" transform="rotate(45 50 50)" />
      </g>
      <circle cx="50" cy="50" r="9" fill={color} />
    </svg>
  );
}

function Medallion({ size = 44, spin = true, className = "" }: { size?: number; spin?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={`${spin ? "animate-medallion" : ""} ${className}`} aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill="none" stroke="#e0a94e" strokeOpacity=".55" strokeWidth="1.4" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#e0a94e" strokeOpacity=".3" strokeWidth="1.1" />
      <g fill="none" stroke="#dfa63c" strokeWidth="2.6" strokeLinejoin="round">
        <rect x="28" y="28" width="44" height="44" rx="4" />
        <rect x="28" y="28" width="44" height="44" rx="4" transform="rotate(45 50 50)" />
      </g>
      <circle cx="50" cy="50" r="7.5" fill="#fff8ec" />
      <circle cx="50" cy="50" r="3.4" fill="#dfa63c" />
    </svg>
  );
}

function Moon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 50" className={className} aria-hidden="true">
      <path d="M29 3 A23 23 0 1 0 29 47 A18.4 18.4 0 1 1 29 3 Z" fill="#f6c66c" />
    </svg>
  );
}

function Balloon({ color = "#f6c66c", size = 60, className = "" }: { color?: string; size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 118" width={size} className={`animate-balloon ${className}`} aria-hidden="true">
      <path d="M32 2 C12 2 2 20 2 38 C2 60 16 78 32 78 C48 78 62 60 62 38 C62 20 52 2 32 2 Z" fill={color} />
      <path d="M20 12 C12 16 8 26 8 38" stroke="#ffffff" strokeOpacity=".5" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M32 78 L32 84" stroke="#dfa63c" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 84 C24 92 42 98 32 110" stroke="#dfa63c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Dust({ count = 14 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {dustParticles(count).map((p, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -26, 0], opacity: [0.2, 0.85, 0.2], scale: [0.7, 1.3, 0.7] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star8 size={p.size} color="#e9b85c" />
        </motion.span>
      ))}
    </div>
  );
}

function ArchFrame({ size = 190, className = "" }: { size?: number; className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 250"
      width={size}
      height={size * 1.25}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      aria-hidden="true"
    >
      <motion.path
        d="M 34 236 L 34 78 C 34 28 66 8 100 8 C 134 8 166 28 166 78 L 166 236"
        fill="none"
        stroke="#f0c66c"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.25 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut", delay: 0.35 }}
      />
      <motion.path
        d="M 47 236 L 47 82 C 47 40 70 22 100 22 C 130 22 153 40 153 82 L 153 236"
        fill="none"
        stroke="#dfa63c"
        strokeWidth="1.6"
        strokeOpacity=".5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 1.9, ease: "easeInOut", delay: 0.85 }}
      />
    </motion.svg>
  );
}

function Loader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center sky-gradient"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, transition: { duration: 0.65, ease: "easeInOut" } }}
        >
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-25"><Moon className="w-40 h-40" /></div>
          <motion.div initial={{ opacity: 0, scale: 0.85, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
            <Medallion size={78} />
          </motion.div>
          <motion.p
            className="font-arabic gold-shimmer text-2xl sm:text-3xl mt-6 px-4 text-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            {BISMILLAH}
          </motion.p>
          <motion.div
            className="mt-5 h-px bg-gradient-to-r from-transparent via-[#dfa63c] to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 160, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.85 }}
          />
          <motion.p
            className="mt-4 text-[10px] uppercase tracking-[.38em] text-[#8a6a2b] font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Walimatul Khitan
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const cells = (label: string, value: string) => (
    <div key={label} className="soft-panel py-4 text-center min-w-0">
      <div className="font-display text-2xl sm:text-3xl text-[#233025]">{value}</div>
      <div className="mt-1 text-[9px] uppercase tracking-[.18em] text-[#a5823f] font-bold">{label}</div>
    </div>
  );
  if (now === null) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xl mx-auto">
        {["Hari", "Jam", "Menit", "Detik"].map((l) => (
          <div key={l} className="soft-panel py-4 text-center min-w-0">
            <div className="font-display text-2xl sm:text-3xl text-[#233025]">—</div>
            <div className="mt-1 text-[9px] uppercase tracking-[.18em] text-[#a5823f] font-bold">{l}</div>
          </div>
        ))}
      </div>
    );
  }
  const diff = Math.max(0, eventDate.getTime() - now);
  const units: [string, number][] = [
    ["Hari", Math.floor(diff / 86400000)],
    ["Jam", Math.floor(diff / 3600000) % 24],
    ["Menit", Math.floor(diff / 60000) % 60],
    ["Detik", Math.floor(diff / 1000) % 60],
  ];
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xl mx-auto">
      {units.map(([label, value]) => (
        <div key={label} className="soft-panel py-4 text-center min-w-0">
          <motion.div
            key={String(value)}
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="font-display text-2xl sm:text-3xl text-[#233025]"
          >
            {String(value).padStart(2, "0")}
          </motion.div>
          <div className="mt-1 text-[9px] uppercase tracking-[.18em] text-[#a5823f] font-bold">{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ============ bottom nav ============ */
const NAV_ITEMS = [
  { id: "home", label: "Beranda", Icon: HomeIcon },
  { id: "kisah", label: "Tentang", Icon: ScrollText },
  { id: "acara", label: "Acara", Icon: CalendarDays },
  { id: "galeri", label: "Galeri", Icon: ImageIcon },
  { id: "rsvp", label: "RSVP", Icon: Heart },
];
const SECTION_IDS = NAV_ITEMS.map((i) => i.id);

function useActiveSection(ids: string[], ready: boolean) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (!ready) return;
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids.join(","), ready]);
  return active;
}

/* ============ page ============ */
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [opened, setOpened] = useState(false);
  const [guest, setGuest] = useState("Tamu Undangan");
  const [music, setMusic] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS, opened);
  const [rsvp, setRsvp] = useState({ name: "", attendance: "Hadir", count: "1", message: "" });
  const [sent, setSent] = useState(false);
  const [guestbook, setGuestbook] = useState<{ name: string; message: string }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof Audio === "undefined") return;
    const a = new Audio("/audio/backsound.wav");
    a.loop = true;
    a.volume = 0.35;
    audioRef.current = a;
    return () => { a.pause(); a.currentTime = 0; };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("to") || params.get("nama");
    if (name) setGuest(decodeURIComponent(name.replace(/\+/g, " ")));
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (music) { a.play().catch(() => setMusic(false)); }
    else { a.pause(); a.currentTime = 0; }
  }, [music]);

  const greeting = guest.trim() || "Tamu Undangan";

  async function submitRSVP(e: React.FormEvent) {
    e.preventDefault();
    if (!rsvp.name.trim()) return;
    if (supabase) {
      const { error } = await supabase.from("rsvps").insert([
        { name: rsvp.name, attendance: rsvp.attendance, guest_count: Number(rsvp.count), message: rsvp.message },
      ]);
      if (error) { alert("Belum berhasil mengirim. Silakan coba lagi."); return; }
    }
    setGuestbook((prev) => [{ name: rsvp.name, message: rsvp.message || "Semoga acaranya berkah." }, ...prev]);
    setSent(true);
  }

  const openParty = () => { setOpened(true); setMusic(true); };

  /* ========== CLOSED / LOADER HERO ========== */
  return (
    <main className="overflow-hidden">
      <Loader done={loaded} />

      <AnimatePresence>
        {!opened && (
          <motion.section
            key="hero-closed"
            className="sky-gradient relative min-h-[100svh] flex items-center justify-center px-5 py-12 text-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40, filter: "blur(6px)", transition: { duration: 0.8 } }}
          >
            {/* balloons */}
            <div className="absolute left-[6%] top-[8%] opacity-95"><Balloon color="#f6c66c" size={62} /></div>
            <div className="absolute right-[8%] top-[6%] opacity-95"><Balloon color="#8fd0da" size={56} className="!animate-balloon [animation-delay:-2.2s]" /></div>
            <div className="absolute right-[15%] bottom-[9%] opacity-90"><Balloon color="#f2a988" size={46} className="!animate-balloon [animation-delay:-3.8s]" /></div>
            <div className="absolute left-[12%] bottom-[10%] opacity-90"><Balloon color="#f2d4a0" size={50} className="!animate-balloon [animation-delay:-1.4s]" /></div>

            <Dust count={16} />
            <Moon className="absolute top-[9%] left-1/2 -translate-x-1/2 w-24 h-24 opacity-70 animate-float-slow" />

            <motion.div
              className="relative z-10 max-w-xl w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 1.9 }}
            >
              <motion.p
                className="font-arabic text-2xl sm:text-3xl gold-shimmer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.05, duration: 0.9 }}
              >
                {BISMILLAH}
              </motion.p>

              <motion.div
                className="relative mx-auto mt-6 max-w-[210px] aspect-[4/5]"
                initial={{ opacity: 0, scale: 0.85, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 2.15, duration: 0.95 }}
              >
                <ArchFrame size={210} className="mx-auto drop-shadow-xl" />
                <div
                  className="absolute overflow-hidden"
                  style={{ left: "17%", right: "17%", top: "2.5%", bottom: "5.6%", borderRadius: "70px 70px 0 0" }}
                >
                  <img src={HERO_PHOTO} alt="Ananda Faariz" className="h-full w-full object-cover object-[50%_18%]" />
                </div>
              </motion.div>

              <p className="text-[10px] tracking-[.4em] uppercase text-[#8a6a2b] font-bold mt-4">Undangan Walimatul Khitan</p>

              <h1 className="font-display font-semibold text-[2.75rem] sm:text-6xl leading-[1.05] mt-3 text-[#233025]">
                {NAME}<br /><span className="gold-shimmer">Al-khowarizmi</span>
              </h1>

              <p className="mt-5 text-[11px] tracking-[.24em] uppercase text-[#8a6a2b] font-bold">Kepada Yth.</p>
              <motion.p
                key={greeting}
                className="font-accent italic text-2xl sm:text-3xl mt-1 text-[#3a2a0e]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.7 }}
              >
                {greeting}
              </motion.p>

              <p className="mt-6 text-xs sm:text-sm text-[#6b5a3e] leading-7 font-medium">
                Dengan memohon rahmat dan ridha Allah SWT,<br />kami mengundang Anda untuk hadir.
              </p>

              <motion.button
                onClick={openParty}
                className="btn-gold relative inline-flex items-center gap-2 mt-8 rounded-full px-9 py-4 text-xs font-bold tracking-widest uppercase"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart size={15} />
                Buka Undangan
              </motion.button>

              <p className="mt-7 text-[9px] tracking-[.3em] text-[#8a6a2b] font-bold">1 DESEMBER 2026 · 08.00</p>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ========== OPEN STATE ========== */}
      {opened && (
        <>
          {/* header */}
          <header className="sticky top-0 z-40 bg-[#fff8ec]/90 backdrop-blur-lg border-b border-[#f0c66c]/40 text-[#233025]">
            <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
              <a href="#home" className="font-display text-lg tracking-wide text-[#2a5c48]">Faariz <span className="font-accent italic text-[#c17e2a]">Al-khowarizmi</span></a>
              <button
                aria-label="Musik"
                aria-pressed={music}
                onClick={() => setMusic((m) => !m)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 border text-[10px] font-bold uppercase tracking-widest transition-colors ${music ? "border-[#e0a94e] bg-[#e0a94e]/15 text-[#c17e2a]" : "border-[#e6dcc2] text-[#6b5a3e] hover:border-[#e0a94e]/60"}`}
              >
                {music ? <Volume2 size={13} /> : <VolumeX size={13} />}
                Musik
              </button>
            </div>
          </header>

          {/* hero setelah buka */}
          <section id="home" className="sky-gradient text-center relative scroll-mt-20 overflow-hidden">
            <Dust count={12} />
            <div className="absolute -top-16 right-[8%] opacity-80"><Moon className="w-28 h-28 animate-float-slow" /></div>
            <div className="absolute -bottom-6 left-[6%] opacity-90"><Balloon color="#f2d4a0" size={48} /></div>

            <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-3xl mx-auto px-5 pt-20 pb-24">
              <motion.p variants={fadeUp} className="font-arabic gold-shimmer text-2xl sm:text-3xl">{BISMILLAH}</motion.p>

              <motion.div variants={fadeUp} className="relative mx-auto my-7 max-w-[140px] aspect-[4/5]">
                <ArchFrame size={140} className="mx-auto drop-shadow-xl" />
                <div
                  className="absolute overflow-hidden"
                  style={{ left: "17%", right: "17%", top: "2.5%", bottom: "5.6%", borderRadius: "47px 47px 0 0" }}
                >
                  <img src={HERO_PHOTO} alt="Ananda Faariz" className="h-full w-full object-cover object-[50%_18%]" />
                </div>
              </motion.div>

              <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[.42em] text-[#8a6a2b] font-bold">Walimatul Khitan</motion.p>
              <motion.h1 variants={fadeUp} className="font-display font-semibold text-5xl sm:text-7xl mt-5 leading-[1.05] text-[#233025]">
                {NAME}<br /><span className="gold-shimmer">Al-khowarizmi</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-6 max-w-lg mx-auto text-sm leading-7 text-[#6b5a3e] font-medium">
                Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan syukuran walimatul khitan putra kami.
              </motion.p>
              <motion.a
                variants={fadeUp}
                href="#acara"
                className="inline-flex mt-8 items-center gap-2 text-xs uppercase tracking-[.24em] text-[#2a5c48] font-bold hover:text-[#c17e2a] transition-colors"
              >
                Lihat detail acara <ChevronDown size={15} className="animate-bounce" />
              </motion.a>
            </motion.div>
          </section>

          {/* tentang */}
          <motion.section id="kisah" className="py-18 px-5 text-center max-w-3xl mx-auto scroll-mt-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex justify-center"><Medallion size={38} spin={false} /></motion.div>
            <motion.p variants={fadeUp} className="eyebrow mt-4">Dengan penuh rasa syukur</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-semibold text-3xl sm:text-4xl mt-4 text-[#233025]">Assalamu’alaikum Warahmatullahi Wabarakatuh</motion.h2>
            <motion.p variants={fadeUp} className="text-sm leading-8 text-[#6b5a3e] mt-6 font-medium">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada putra kami.
            </motion.p>
            <motion.div variants={fadeUp} className="ornament-line my-8 max-w-xs mx-auto"><Medallion size={22} spin={false} /></motion.div>
            <motion.p variants={fadeUp} className="font-accent italic text-2xl sm:text-3xl text-[#c17e2a] leading-snug">
              “Semoga Allah SWT senantiasa memberikan keberkahan dan kemudahan kepada putra kami.”
            </motion.p>
            <motion.p variants={fadeUp} className="mt-6 text-[10px] tracking-[.25em] uppercase text-[#8a6a2b] font-bold">Orang tua</motion.p>
            <motion.p variants={fadeUp} className="font-display font-semibold text-2xl sm:text-3xl mt-2 text-[#233025]">{PARENTS}</motion.p>
          </motion.section>

          {/* acara */}
          <motion.section id="acara" className="px-5 py-20 relative scroll-mt-16" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
            <div className="max-w-3xl mx-auto">
              <motion.div variants={fadeUp} className="relative soft-panel p-8 sm:p-10 overflow-hidden">
                <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#f0c66c]/40 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-52 h-52 rounded-full bg-[#8fd0da]/40 blur-3xl pointer-events-none" />
                <div className="relative">
                  <p className="eyebrow text-center">Save the date</p>
                  <h2 className="font-display font-semibold text-4xl mt-3 text-center text-[#233025]">Waktu & Tempat</h2>

                  <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4 mt-9">
                    <div className="rounded-3xl border border-[#f0c66c]/50 bg-[#fff8ec] p-6">
                      <CalendarDays className="text-[#e0a94e] mx-auto" size={26} />
                      <p className="mt-3 text-[10px] tracking-[.2em] uppercase text-[#a5823f] font-bold text-center">Hari & Tanggal</p>
                      <p className="font-display font-semibold text-xl mt-2 text-center text-[#233025]">{EVENT_DATE}</p>
                    </div>
                    <div className="rounded-3xl border border-[#f0c66c]/50 bg-[#fff8ec] p-6">
                      <Clock3 className="text-[#e0a94e] mx-auto" size={26} />
                      <p className="mt-3 text-[10px] tracking-[.2em] uppercase text-[#a5823f] font-bold text-center">Waktu</p>
                      <p className="font-display font-semibold text-xl mt-2 text-center text-[#233025]">{EVENT_TIME}</p>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="mt-9 text-center">
                    <MapPin className="mx-auto text-[#2a5c48]" size={26} />
                    <p className="font-display font-semibold text-2xl mt-3 text-[#233025]">{ADDRESS_AREA}</p>
                    <p className="text-sm text-[#6b5a3e] mt-1">{ADDRESS_DETAIL}</p>
                    <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn-gold inline-flex rounded-full px-6 py-3 mt-5 text-xs font-bold uppercase tracking-widest gap-2 items-center">
                      <MapPin size={14} /> Buka Google Maps
                    </a>
                  </motion.div>

                  <motion.div variants={fadeUp} className="mt-12">
                    <p className="eyebrow mb-6 text-center">Menghitung hari bahagia</p>
                    <Countdown />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* galeri */}
          <motion.section id="galeri" className="py-20 px-5 max-w-6xl mx-auto scroll-mt-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <p className="eyebrow">Momen Istimewa</p>
              <h2 className="font-display font-semibold text-4xl mt-3 text-[#233025]">Galeri Buah Hati</h2>
              <p className="text-sm text-[#6b5a3e] mt-3 font-medium">Sebuah potret kecil penuh kenangan.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-7 max-w-2xl mx-auto">
              {photos.map((p, i) => (
                <motion.figure
                  key={p.src}
                  className="group relative"
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
                  whileHover={{ y: -8, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                >
                  <div className="arcade-arch relative overflow-hidden shadow-xl shadow-stone-300/50">
                    <img
                      src={p.src}
                      alt={p.caption}
                      className="w-full h-72 object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2a5c48]/85 via-[#2a5c48]/0 to-transparent h-28" />
                    <figcaption className="absolute bottom-0 inset-x-0 p-4 text-left">
                      <p className="text-white text-[11px] tracking-wider uppercase font-bold flex items-center gap-2">
                        <Star size={11} className="text-[#f6c66c]" /> {p.caption}
                      </p>
                    </figcaption>
                  </div>
                </motion.figure>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="text-center text-[10px] text-[#a5823f] mt-6">
              Kenangan bersama Ananda Faariz.
            </motion.p>
          </motion.section>

          {/* rsvp */}
          <motion.section id="rsvp" className="px-5 py-20 relative scroll-mt-16" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }} variants={stagger}>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
              <motion.div variants={fadeUp}>
                <Medallion size={36} spin={false} className="mb-4" />
                <p className="eyebrow">Konfirmasi & doa</p>
                <h2 className="font-display font-semibold text-4xl mt-3 leading-tight text-[#233025]">Kehadiran Anda</h2>
                <p className="text-sm leading-7 text-[#6b5a3e] mt-5 font-medium">Mohon konfirmasi kehadiran dan tinggalkan doa terbaik untuk {NAME}.</p>
                <div className="mt-8 flex items-center gap-3 text-sm text-[#6b5a3e] font-medium">
                  <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
                    <Heart className="text-[#e0a94e]" size={20} />
                  </motion.span>
                  Terima kasih atas doa dan restunya.
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="relative">
                <div className="absolute -top-4 -right-3 rotate-12 opacity-[0.14] pointer-events-none"><Medallion size={120} spin={false} /></div>
                <form onSubmit={submitRSVP} className="soft-panel relative p-6">
                  {sent ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                      <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>
                        <Heart className="mx-auto text-[#e0a94e]" size={34} />
                      </motion.div>
                      <h3 className="font-display font-semibold text-2xl mt-4 text-[#233025]">Terima kasih!</h3>
                      <p className="text-sm text-[#6b5a3e] mt-2">Konfirmasi dan doa Anda telah kami terima.</p>
                      <button type="button" onClick={() => { setSent(false); setRsvp({ name: "", attendance: "Hadir", count: "1", message: "" }); }} className="text-xs underline mt-5">Kirim jawaban lain</button>
                    </motion.div>
                  ) : (
                    <>
                      <label className="text-xs font-semibold text-[#3a2a0e]">Nama</label>
                      <input className="input mt-2 mb-4" required value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} placeholder="Nama lengkap" />
                      <label className="text-xs font-semibold text-[#3a2a0e]">Konfirmasi kehadiran</label>
                      <select className="input mt-2 mb-4" value={rsvp.attendance} onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}>
                        <option>Hadir</option><option>InsyaAllah hadir</option><option>Berhalangan</option>
                      </select>
                      <label className="text-xs font-semibold text-[#3a2a0e]">Jumlah tamu</label>
                      <select className="input mt-2 mb-4" value={rsvp.count} onChange={(e) => setRsvp({ ...rsvp, count: e.target.value })}>
                        <option value="1">1 orang</option><option value="2">2 orang</option><option value="3">3 orang</option><option value="4">4 orang</option>
                      </select>
                      <label className="text-xs font-semibold text-[#3a2a0e]">Ucapan & doa</label>
                      <textarea className="input mt-2 mb-5 min-h-24" value={rsvp.message} onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })} placeholder="Tuliskan doa terbaik..." />
                      <button className="btn-gold w-full rounded-full py-3.5 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                        <Send size={14} /> Kirim Konfirmasi
                      </button>
                      {!supabase && <p className="text-[10px] text-amber-700 mt-3">Mode demo: data tampil sementara di halaman ini. Hubungkan Supabase agar tersimpan permanen.</p>}
                    </>
                  )}
                </form>
              </motion.div>
            </div>
          </motion.section>

          {/* buku tamu */}
          <motion.section className="py-16 px-5 max-w-3xl mx-auto" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-8">
              <Medallion size={36} spin={false} className="mx-auto mb-3" />
              <p className="eyebrow">Doa dari para tamu</p>
              <h2 className="font-display font-semibold text-4xl mt-3 text-[#233025]">Buku Tamu</h2>
              <p className="text-sm text-[#6b5a3e] mt-3 font-medium">Ucapan dan doa hangat untuk {NAME_FULL}.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-3">
              {guestbook.length ? (
                guestbook.map((entry, i) => (
                  <motion.div key={`${entry.name}-${i}`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="soft-pill p-5 !rounded-2xl">
                    <p className="font-bold text-sm flex items-center gap-2 text-[#233025]"><Star size={12} className="text-[#e0a94e]" /> {entry.name}</p>
                    <p className="text-sm text-[#6b5a3e] mt-2 leading-6">{entry.message}</p>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-sm text-[#8a6a2b] border-2 border-dashed border-[#e0a94e]/50 rounded-3xl p-8 font-medium">Jadilah yang pertama mengirimkan doa melalui formulir RSVP.</p>
              )}
            </motion.div>
          </motion.section>

          {/* penutup */}
          <motion.section className="px-5 py-20 text-center max-w-2xl mx-auto" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex justify-center"><Medallion size={40} /></motion.div>
            <motion.p variants={fadeUp} className="eyebrow mt-4">Doa & harapan</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-semibold text-4xl mt-3 text-[#233025]">Terima Kasih</motion.h2>
            <motion.p variants={fadeUp} className="text-sm leading-8 text-[#6b5a3e] mt-5 font-medium">
              Merupakan kebahagiaan bagi kami atas kehadiran, doa, dan restu yang diberikan. Semoga Allah SWT membalas segala kebaikan dengan keberkahan.
            </motion.p>
            <motion.p variants={fadeUp} className="font-accent italic text-2xl sm:text-3xl text-[#c17e2a] mt-8">Wassalamu’alaikum Warahmatullahi Wabarakatuh</motion.p>
            <motion.div variants={fadeUp} className="ornament-line my-8 max-w-xs mx-auto"><Medallion size={22} spin={false} /></motion.div>
            <motion.p variants={fadeUp} className="text-[10px] tracking-[.25em] uppercase text-[#8a6a2b] font-bold">Hormat kami,</motion.p>
            <motion.p variants={fadeUp} className="font-display font-semibold text-2xl mt-2 text-[#233025]">{PARENTS}</motion.p>
          </motion.section>

          {/* footer */}
          <footer className="px-5 pt-10 pb-28 text-center relative overflow-hidden bg-[#2a5c48] text-[#f6f1e2]">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#f6c66c]/20 blur-3xl pointer-events-none" />
            <div className="relative">
              <p className="font-arabic text-sm text-[#f0c66c]/90 mb-2">{BISMILLAH}</p>
              <p className="font-display font-semibold text-2xl">{NAME_FULL}</p>
              <p className="text-[10px] mt-2 tracking-[.3em] uppercase text-white/60">Walimatul Khitan · 2026</p>
              <div className="flex justify-center mt-4"><Star8 size={20} color="#f6c66c" /></div>
            </div>
          </footer>

          {/* bottom nav (Android-style) */}
          <motion.nav
            initial={{ y: 92, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 z-50 w-[92%] max-w-sm"
            style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
            aria-label="Navigasi utama"
          >
            <div className="flex items-center justify-between gap-0.5 rounded-3xl border border-[#f0c66c]/60 bg-[#fff8ec]/90 backdrop-blur-xl px-1.5 py-1.5 shadow-[0_18px_45px_-15px_rgba(58,42,14,0.4)]">
              {NAV_ITEMS.map(({ id, label, Icon }) => {
                const isActive = activeSection === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative flex-1 flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[9px] font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? "text-[#3a250c]" : "text-[#6b5a3e] hover:text-[#2a5c48]"}`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="bottom-nav-pill"
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f6c66c] to-[#e0a94e] shadow-md shadow-[#e0a94e]/40"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Icon size={18} className="relative z-10" />
                    <span className="relative z-10">{label}</span>
                  </a>
                );
              })}
            </div>
          </motion.nav>
        </>
      )}
    </main>
  );
}
