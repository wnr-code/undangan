"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, CalendarDays, Clock3, Music2, Volume2, VolumeX, Heart,
  Menu, X, Send, ChevronDown, Sparkles, Star,
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
const ADDRESS = "Dusun Margasari RT 01 / RW 04";

const BISMILLAH = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

const photos = [
  { src: "/images/galeri-1.jpg", caption: "Arca keagungan & iman" },
  { src: "/images/galeri-2.jpg", caption: "Cahaya harapan yang hangat" },
  { src: "/images/galeri-3.jpg", caption: "Semoga keberkahannya mengalir" },
];

/* ============ helpers ============ */
function seeded(i: number) { const x = Math.sin(i * 9999.141) * 10000; return x - Math.floor(x); }

const particles = Array.from({ length: 14 }, (_, i) => ({
  x: seeded(i + 1) * 100,
  y: seeded(i + 51) * 100,
  size: 1.5 + seeded(i + 101) * 2.5,
  duration: 7 + seeded(i + 151) * 7,
  delay: seeded(i + 201) * 5,
}));

const fadeUp = {
  hidden: { opacity: 0, y: 42 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = { show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } } };

/* ============ components ============ */
function Medallion({ size = 44, spin = true, className = "" }: { size?: number; spin?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={`${spin ? "animate-medallion" : ""} ${className}`} aria-hidden="true">
      <circle cx="50" cy="50" r="47" fill="none" stroke="#b98e44" strokeOpacity=".5" strokeWidth="1" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="#b98e44" strokeOpacity=".35" strokeWidth="1" />
      <g fill="none" stroke="#d2ad68" strokeWidth="1.3" strokeOpacity=".9">
        <rect x="26" y="26" width="48" height="48" rx="3" />
        <rect x="26" y="26" width="48" height="48" rx="3" transform="rotate(45 50 50)" />
      </g>
      <circle cx="50" cy="50" r="7" fill="none" stroke="#d2ad68" strokeWidth="1.3" strokeOpacity=".9" />
      <circle cx="50" cy="50" r="2.6" fill="#d2ad68" />
    </svg>
  );
}

function Particles({ count = 14 }: { count?: number }) {
  const list = Array.from({ length: count }, (_, i) => ({
    x: seeded(i + 1) * 100,
    y: seeded(i + 101) * 100,
    size: 1.5 + seeded(i + 201) * 3,
    duration: 7 + seeded(i + 301) * 7,
    delay: seeded(i + 401) * 5,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {list.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#ecd08c]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, filter: "blur(0.5px)" }}
          animate={{ y: [0, -28, 0], opacity: [0.12, 0.85, 0.12], scale: [0.7, 1.4, 0.7] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function Loader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#06170f]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.07, transition: { duration: 0.65, ease: "easeInOut" } }}
        >
          <Particles count={10} />
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Medallion size={80} />
          </motion.div>
          <motion.p
            className="font-arabic gold-shimmer text-2xl sm:text-3xl mt-7 px-4 text-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {BISMILLAH}
          </motion.p>
          <motion.div
            className="mt-5 h-px bg-gradient-to-r from-transparent via-[#ecd08c] to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 170, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.85 }}
          />
          <motion.p
            className="mt-4 text-[10px] uppercase tracking-[.4em] text-white/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
          >
            Walimatul Khitan
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
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
        stroke="#ecd08c"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut", delay: 0.4 }}
      />
      <motion.path
        d="M 46 236 L 46 82 C 46 40 70 22 100 22 C 130 22 154 40 154 82 L 154 236"
        fill="none"
        stroke="#b98e44"
        strokeWidth="1"
        strokeOpacity=".45"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.9 }}
      />
    </motion.svg>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (now === null) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto">
        {["Hari", "Jam", "Menit", "Detik"].map((l) => (
          <div key={l} className="border border-[#b98e44]/40 bg-white/5 rounded-xl py-4 text-center">
            <div className="font-display text-2xl sm:text-4xl text-[#ecd08c]">—</div>
            <div className="mt-1 text-[9px] uppercase tracking-[.2em] text-white/60">{l}</div>
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
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto">
      {units.map(([label, value]) => (
        <div key={label} className="border border-[#b98e44]/40 bg-white/5 rounded-xl py-4 text-center">
          <motion.div
            key={String(value)}
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="font-display text-2xl sm:text-4xl text-[#ecd08c]"
          >
            {String(value).padStart(2, "0")}
          </motion.div>
          <div className="mt-1 text-[9px] uppercase tracking-[.2em] text-white/60">{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ============ page ============ */
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [opened, setOpened] = useState(false);
  const [guest, setGuest] = useState("Tamu Undangan");
  const [music, setMusic] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
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

  /* ========== OPEN-STATE ========== */
  return (
    <main className="overflow-hidden antialiased">
      <Loader done={loaded} />

      <AnimatePresence>
        {!opened && (
          <motion.section
            key="hero-closed"
            className="hero-bg relative min-h-[100svh] text-white flex items-center justify-center px-5 py-12"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)", transition: { duration: 0.85 } }}
          >
            <div className="absolute inset-0 islamic-pattern-subtle opacity-70 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-[340px] h-[340px] rounded-full bg-[#d2ad68]/20 blur-3xl animate-glow-orb pointer-events-none" />
            <Particles count={12} />

            <motion.div
              className="relative z-10 max-w-xl w-full text-center"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 2.0 }}
            >
              <motion.p
                className="font-arabic gold-shimmer text-2xl sm:text-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.15, duration: 0.9 }}
              >
                {BISMILLAH}
              </motion.p>

              <motion.div
                className="relative mx-auto my-8 max-w-[215px] aspect-[4/5]"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.25, duration: 1.0 }}
              >
                <ArchFrame size={215} className="mx-auto" />
                <div className="absolute inset-0 flex items-center justify-center pt-2">
                  <span className="font-arabic text-7xl leading-none text-[#f3ddc0] drop-shadow-lg" aria-hidden="true">م</span>
                </div>
              </motion.div>

              <p className="text-[10px] tracking-[.4em] uppercase text-white/55">Undangan Walimatul Khitan</p>

              <h1 className="font-display text-5xl sm:text-7xl leading-[1.05] mt-4 text-[#f7efdc]">
                {NAME}<br /><span className="italic gold-shimmer">Al-khowarizmi</span>
              </h1>

              <p className="mt-5 text-xs tracking-[.18em] uppercase text-white/60">Kepada Yth.</p>
              <motion.p
                key={greeting}
                className="font-accent italic text-2xl sm:text-3xl mt-1 text-[#f0cf8b]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.45, duration: 0.7 }}
              >
                {greeting}
              </motion.p>

              <p className="mt-7 text-xs sm:text-sm text-white/65 leading-7">
                Dengan memohon rahmat dan ridha Allah SWT,<br />kami mengundang Anda untuk hadir meresmikan maulid akbar putra kami.
              </p>

              <motion.button
                onClick={openParty}
                className="btn-gold relative inline-flex items-center gap-2 mt-9 rounded-full px-9 py-4 text-xs font-bold tracking-widest uppercase"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6, duration: 0.8 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={16} />
                Buka Undangan
              </motion.button>

              <p className="mt-7 text-[9px] tracking-[.28em] text-white/40">1 DESEMBER 2026 · 08.00</p>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {opened && (
        <>
          {/* ================= sticky header ================= */}
          <header className="sticky top-0 z-40 bg-[#0b231a]/92 backdrop-blur-md text-white border-b border-[#b98e44]/25">
            <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
              <a href="#home" className="font-display text-lg tracking-wide text-[#ecd08c]">F. Al-khowarizmi</a>
              <nav className="hidden md:flex items-center gap-7 text-[11px] tracking-widest uppercase text-white/75">
                <a href="#kisah" className="hover:text-[#ecd08c] transition-colors">Tentang</a>
                <a href="#acara" className="hover:text-[#ecd08c] transition-colors">Acara</a>
                <a href="#galeri" className="hover:text-[#ecd08c] transition-colors">Galeri</a>
                <a href="#rsvp" className="hover:text-[#ecd08c] transition-colors">RSVP</a>
              </nav>
              <div className="flex items-center gap-3">
                <button
                  aria-label="Musik"
                  onClick={() => setMusic((m) => !m)}
                  className={`p-2.5 rounded-full border transition-colors ${music ? "border-[#b98e44] bg-[#b98e44]/15 text-[#ecd08c]" : "border-white/20 text-white/80 hover:border-[#b98e44]/50"}`}
                >
                  {music ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button aria-label="Menu" className="md:hidden p-2" onClick={() => setMobileMenu((v) => !v)}>
                  {mobileMenu ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
            {mobileMenu && (
              <div className="md:hidden px-5 pb-4 flex flex-col gap-3 text-sm">
                {[["#kisah", "Tentang"], ["#acara", "Acara"], ["#galeri", "Galeri"], ["#rsvp", "RSVP"]].map(([href, label]) => (
                  <a key={href} href={href} onClick={() => setMobileMenu(false)} className="hover:text-[#ecd08c] transition-colors">{label}</a>
                ))}
              </div>
            )}
          </header>

          {/* ================= hero after open ================= */}
          <section id="home" className="hero-bg text-white px-5 pt-16 pb-24 text-center relative scroll-mt-20">
            <div className="absolute inset-0 islamic-pattern-subtle opacity-50 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full bg-[#d2ad68]/16 blur-3xl pointer-events-none" />
            <Particles count={12} />

            <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-3xl mx-auto">
              <motion.p variants={fadeUp} className="font-arabic gold-shimmer text-xl sm:text-2xl px-4">{BISMILLAH}</motion.p>

              <motion.div variants={fadeUp} className="relative mx-auto my-6 max-w-[150px] aspect-[4/5]">
                <ArchFrame size={150} className="mx-auto" />
                <div className="absolute inset-0 flex items-center justify-center pt-1"><span className="font-arabic text-6xl leading-none text-[#f3ddc0]">م</span></div>
              </motion.div>

              <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[.4em] text-white/60">Walimatul Khitan</motion.p>
              <motion.h1 variants={fadeUp} className="font-display text-5xl sm:text-7xl mt-5 leading-[1.05] text-[#f7efdc]">
                {NAME} <span className="italic gold-shimmer">Al-khowarizmi</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-6 max-w-lg mx-auto text-sm leading-7 text-white/70">
                Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan syukuran walimatul khitan putra kami.
              </motion.p>
              <motion.a variants={fadeUp} href="#acara" className="inline-flex mt-8 items-center gap-2 text-xs uppercase tracking-[.24em] text-[#ecd08c] hover:text-[#f8e7bd] transition-colors">
                Lihat detail acara <ChevronDown size={15} className="animate-bounce" />
              </motion.a>
            </motion.div>
          </section>

          {/* ================= tentang ================= */}
          <motion.section id="kisah" className="py-20 px-5 text-center max-w-3xl mx-auto scroll-mt-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex justify-center"><Medallion size={38} spin={false} /></motion.div>
            <motion.p variants={fadeUp} className="section-kicker mt-4">Dengan penuh rasa syukur</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl mt-4 text-[#12291f]">Assalamu’alaikum Warahmatullahi Wabarakatuh</motion.h2>
            <motion.p variants={fadeUp} className="text-sm leading-8 text-stone-600 mt-6">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada putra kami.
            </motion.p>
            <motion.div variants={fadeUp} className="ornament-line my-8 max-w-sm mx-auto"><Medallion size={24} spin={false} /></motion.div>
            <motion.p variants={fadeUp} className="font-accent italic text-2xl sm:text-3xl text-[#8f6a2f] leading-snug">
              “Semoga Allah SWT senantiasa memberikan keberkahan dan kemudahan kepada putra kami.”
            </motion.p>
            <motion.p variants={fadeUp} className="mt-6 text-[10px] tracking-widest uppercase text-stone-400">Keluarga</motion.p>
            <motion.p variants={fadeUp} className="font-display text-2xl sm:text-3xl mt-2 text-[#14291f]">{PARENTS}</motion.p>
          </motion.section>

          {/* ================= acara ================= */}
          <motion.section id="acara" className="hero-bg text-white py-20 px-5 text-center relative scroll-mt-16" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }} variants={stagger}>
            <div className="absolute inset-0 islamic-pattern-subtle opacity-45 pointer-events-none" />
            <div className="relative">
              <motion.p variants={fadeUp} className="section-kicker-light">Save the date</motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-4xl mt-3">Waktu & Tempat</motion.h2>

              <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-10">
                <div className="glass-dark rounded-2xl p-7">
                  <CalendarDays className="mx-auto text-[#ecd08c]" size={26} />
                  <p className="mt-4 text-[10px] tracking-[.2em] uppercase text-white/50">Hari & Tanggal</p>
                  <p className="font-display text-2xl mt-2">{EVENT_DATE}</p>
                </div>
                <div className="glass-dark rounded-2xl p-7">
                  <Clock3 className="mx-auto text-[#ecd08c]" size={26} />
                  <p className="mt-4 text-[10px] tracking-[.2em] uppercase text-white/50">Waktu</p>
                  <p className="font-display text-2xl mt-2">{EVENT_TIME}</p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10">
                <MapPin className="mx-auto text-[#ecd08c]" size={24} />
                <p className="font-display text-2xl mt-3">Dusun Margasari</p>
                <p className="text-sm text-white/60 mt-2">RT 01 / RW 04</p>
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn-gold inline-flex rounded-full px-6 py-3 mt-5 text-xs font-bold uppercase tracking-widest gap-2 items-center">
                  <MapPin size={14} /> Buka Google Maps
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-14">
                <p className="section-kicker-light mb-6">Menghitung hari bahagia</p>
                <Countdown />
              </motion.div>
            </div>
          </motion.section>

          {/* ================= galeri ================= */}
          <motion.section id="galeri" className="py-20 px-5 max-w-6xl mx-auto scroll-mt-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <p className="section-kicker">Menyaksikan Momentum</p>
              <h2 className="font-display text-4xl mt-3 text-[#12291f]">Galeri Buah Hati</h2>
              <p className="text-sm text-stone-500 mt-3">Sebuah potret kecil penuh kenangan.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {photos.map((p, i) => (
                <motion.figure
                  key={p.src}
                  className="group relative"
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
                  whileHover={{ y: -8 }}
                >
                  <div className="relative overflow-hidden rounded-t-[160px] rounded-b-2xl border-2 border-[#b98e44]/50 shadow-xl shadow-stone-300/60">
                    <img
                      src={p.src}
                      alt={`Galeri keluarga ${i + 1}`}
                      className="w-full h-72 object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071a13]/85 via-transparent to-transparent opacity-90" />
                    <figcaption className="absolute bottom-0 inset-x-0 p-4 text-left">
                      <p className="text-white text-[11px] tracking-wider uppercase font-semibold flex items-center gap-2">
                        <Star size={11} className="text-[#ecd08c]" /> {p.caption}
                      </p>
                    </figcaption>
                  </div>
                </motion.figure>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="text-center text-[10px] text-stone-400 mt-6">
              Ganti foto contoh dengan foto keluarga sendiri.
            </motion.p>
          </motion.section>

          {/* ================= rsvp ================= */}
          <motion.section id="rsvp" className="paper-bg py-20 px-5 scroll-mt-16" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }} variants={stagger}>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
              <motion.div variants={fadeUp}>
                <Medallion size={34} spin={false} className="mb-4" />
                <p className="section-kicker">Konfirmasi & doa</p>
                <h2 className="font-display text-4xl mt-3 leading-tight text-[#12291f]">Kehadiran Anda</h2>
                <p className="text-sm leading-7 text-stone-600 mt-5">Mohon konfirmasi kehadiran dan tinggalkan doa terbaik untuk {NAME}.</p>
                <div className="mt-8 flex items-center gap-3 text-sm text-stone-600">
                  <motion.span animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
                    <Heart className="text-[#b48c50]" size={18} />
                  </motion.span>
                  Terima kasih atas doa dan restunya.
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="relative">
                <div className="absolute -top-4 -right-3 rotate-12 opacity-[0.14] pointer-events-none"><Medallion size={130} spin={false} /></div>
                <form onSubmit={submitRSVP} className="relative glass-light rounded-3xl p-6 shadow-xl shadow-stone-300/50">
                  {sent ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                      <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>
                        <Heart className="mx-auto text-[#b48c50]" size={34} />
                      </motion.div>
                      <h3 className="font-display text-2xl mt-4 text-[#12291f]">Terima kasih!</h3>
                      <p className="text-sm text-stone-500 mt-2">Konfirmasi dan doa Anda telah kami terima.</p>
                      <button type="button" onClick={() => { setSent(false); setRsvp({ name: "", attendance: "Hadir", count: "1", message: "" }); }} className="text-xs underline mt-5">Kirim jawaban lain</button>
                    </motion.div>
                  ) : (
                    <>
                      <label className="text-xs font-semibold">Nama</label>
                      <input className="input mt-2 mb-4" required value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} placeholder="Nama lengkap" />
                      <label className="text-xs font-semibold">Konfirmasi kehadiran</label>
                      <select className="input mt-2 mb-4" value={rsvp.attendance} onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}>
                        <option>Hadir</option><option>InsyaAllah hadir</option><option>Berhalangan</option>
                      </select>
                      <label className="text-xs font-semibold">Jumlah tamu</label>
                      <select className="input mt-2 mb-4" value={rsvp.count} onChange={(e) => setRsvp({ ...rsvp, count: e.target.value })}>
                        <option value="1">1 orang</option><option value="2">2 orang</option><option value="3">3 orang</option><option value="4">4 orang</option>
                      </select>
                      <label className="text-xs font-semibold">Ucapan & doa</label>
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

          {/* ================= buku tamu ================= */}
          <motion.section className="py-16 px-5 max-w-3xl mx-auto" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-8">
              <p className="section-kicker">Doa dari para tamu</p>
              <h2 className="font-display text-4xl mt-3 text-[#12291f]">Buku Tamu</h2>
              <p className="text-sm text-stone-500 mt-3">Ucapan dan doa hangat untuk {NAME_FULL}.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-3">
              {guestbook.length ? (
                guestbook.map((entry, i) => (
                  <motion.div key={`${entry.name}-${i}`} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-[#e2d9c8] bg-white p-5 shadow-sm">
                    <p className="font-semibold text-sm flex items-center gap-2 text-[#14291f]"><Star size={12} className="text-[#b98e44]" /> {entry.name}</p>
                    <p className="text-sm text-stone-600 mt-2 leading-6">{entry.message}</p>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-sm text-stone-400 border border-dashed border-[#d9cfbc] rounded-2xl p-8">Jadilah yang pertama mengirimkan doa melalui formulir RSVP.</p>
              )}
            </motion.div>
          </motion.section>

          {/* ================= penutup ================= */}
          <motion.section className="py-20 px-5 text-center max-w-2xl mx-auto" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex justify-center"><Medallion size={42} /></motion.div>
            <motion.p variants={fadeUp} className="section-kicker mt-4">Doa & harapan</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl mt-3 text-[#12291f]">Terima Kasih</motion.h2>
            <motion.p variants={fadeUp} className="text-sm leading-8 text-stone-600 mt-5">
              Merupakan kebahagiaan bagi kami atas kehadiran, doa, dan restu yang diberikan. Semoga Allah SWT membalas segala kebaikan dengan keberkahan.
            </motion.p>
            <motion.p variants={fadeUp} className="font-accent italic text-2xl sm:text-3xl text-[#8f6a2f] mt-8">Wassalamu’alaikum Warahmatullahi Wabarakatuh</motion.p>
            <motion.div variants={fadeUp} className="ornament-line my-8 max-w-xs mx-auto"><Medallion size={24} spin={false} /></motion.div>
            <motion.p variants={fadeUp} className="text-[10px] tracking-widest uppercase text-stone-500">Hormat kami,</motion.p>
            <motion.p variants={fadeUp} className="font-display text-2xl mt-2 text-[#12291f]">{PARENTS}</motion.p>
          </motion.section>

          {/* ================= footer ================= */}
          <footer className="hero-bg text-center text-white/70 py-10 px-5 relative overflow-hidden">
            <div className="absolute inset-0 islamic-pattern-subtle opacity-40 pointer-events-none" />
            <div className="relative">
              <p className="font-arabic text-sm text-[#ecd08c]/80 mb-2">{BISMILLAH}</p>
              <p className="font-display text-2xl text-[#ecd08c]">{NAME_FULL}</p>
              <p className="text-[10px] mt-2 tracking-[.3em] uppercase text-white/45">Walimatul Khitan · 2026</p>
            </div>
          </footer>

          {/* ================= music toggle ================= */}
          <motion.button
            onClick={() => setMusic((m) => !m)}
            className="fixed bottom-5 right-5 z-30 bg-gradient-to-br from-[#ecd08c] to-[#b48c50] text-[#221a0d] rounded-full p-4 shadow-2xl shadow-black/40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle music"
          >
            {music ? <Music2 size={20} className="animate-float-slow" /> : <VolumeX size={20} />}
          </motion.button>
        </>
      )}
    </main>
  );
}
