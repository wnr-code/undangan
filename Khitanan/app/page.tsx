"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, CalendarDays, Clock3, Music2, Volume2, VolumeX, Heart,
  Menu, X, Send, ChevronDown, Sparkles, Star,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

/* ---------------- data ---------------- */
const eventDate = new Date(process.env.NEXT_PUBLIC_EVENT_DATE || "2026-12-20T09:00:00+07:00");
const mapsUrl = process.env.NEXT_PUBLIC_MAPS_URL || "https://maps.google.com";

const photos = [
  { src: "/images/galeri-1.jpg", caption: "Arca keagungan & iman" },
  { src: "/images/galeri-2.jpg", caption: "Cahaya harapan yang hangat" },
  { src: "/images/galeri-3.jpg", caption: "Semoga keberkahannya mengalir" },
];

const BISMILLAH = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

/* deterministik (aman untuk SSR) */
function seeded(i: number) { const x = Math.sin(i * 9999.141) * 10000; return x - Math.floor(x); }

const particles = Array.from({ length: 16 }, (_, i) => ({
  x: seeded(i + 1) * 100,
  y: seeded(i + 51) * 100,
  size: 2 + seeded(i + 101) * 3,
  duration: 7 + seeded(i + 151) * 7,
  delay: seeded(i + 201) * 5,
}));

/* ---------------- animations ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 42 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = { show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };

/* ---------------- components ---------------- */
function Medallion({ size = 44, spin = true, className = "" }: { size?: number; spin?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={`${spin ? "animate-medallion" : ""} ${className}`} aria-hidden="true">
      <circle cx="50" cy="50" r="47" fill="none" stroke="#c9a15a" strokeOpacity=".45" strokeWidth="1" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="#c9a15a" strokeOpacity=".35" strokeWidth="1" />
      <g fill="none" stroke="#e6c97e" strokeWidth="1.4" strokeOpacity=".9">
        <rect x="26" y="26" width="48" height="48" rx="3" />
        <rect x="26" y="26" width="48" height="48" rx="3" transform="rotate(45 50 50)" />
      </g>
      <circle cx="50" cy="50" r="7" fill="none" stroke="#e6c97e" strokeWidth="1.4" strokeOpacity=".9" />
      <circle cx="50" cy="50" r="2.6" fill="#e6c97e" />
    </svg>
  );
}

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#e6c97e]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, filter: "blur(0.6px)" }}
          animate={{ y: [0, -26, 0], opacity: [0.12, 0.85, 0.12], scale: [0.7, 1.35, 0.7] }}
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#071a13]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          <Particles />
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Medallion size={92} />
          </motion.div>
          <motion.p
            className="font-arabic gold-shimmer text-2xl sm:text-3xl mt-8 px-4 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            {BISMILLAH}
          </motion.p>
          <motion.div
            className="mt-6 h-px bg-gradient-to-r from-transparent via-[#e6c97e] to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 180, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.9 }}
          />
          <motion.p
            className="mt-4 text-[10px] uppercase tracking-[.35em] text-white/45"
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
        stroke="#e6c97e"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.path
        d="M 46 236 L 46 82 C 46 40 70 22 100 22 C 130 22 154 40 154 82 L 154 236"
        fill="none"
        stroke="#c9a15a"
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
          <div key={l} className="border border-[#c7a56a]/40 bg-white/5 rounded-xl py-4 text-center">
            <div className="font-display text-2xl sm:text-4xl text-[#e1c995]">—</div>
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
        <div key={label} className="border border-[#c7a56a]/40 bg-white/5 rounded-xl py-4 text-center">
          <motion.div
            key={String(value)}
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="font-display text-2xl sm:text-4xl text-[#e1c995]"
          >
            {String(value).padStart(2, "0")}
          </motion.div>
          <div className="mt-1 text-[9px] uppercase tracking-[.2em] text-white/60">{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- page ---------------- */
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

  /* ============ loader + closed hero ============ */
  return (
    <main className="overflow-hidden antialiased">
      <Loader done={loaded} />

      <AnimatePresence>
        {!opened && (
          <motion.section
            key="hero-closed"
            className="hero-bg relative min-h-[100svh] text-white flex items-center justify-center px-5 py-12"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)", transition: { duration: 0.85 } }}
          >
            <div className="absolute inset-0 islamic-pattern-subtle opacity-70 pointer-events-none" />
            <Particles />
            <motion.div
              className="relative z-10 max-w-xl w-full text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 2.0 }}
            >
              <motion.p
                className="font-arabic gold-shimmer text-xl sm:text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.15, duration: 0.9 }}
              >
                {BISMILLAH}
              </motion.p>

              <motion.div
                className="relative mx-auto mt-6 mb-7"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.25, duration: 0.9 }}
              >
                <ArchFrame size={182} className="mx-auto" />
                <div className="absolute inset-0 flex flex-col items-center justify-center pb-6 pointer-events-none">
                  <span className="font-arabic text-5xl sm:text-6xl leading-none text-[#eed9a6] drop-shadow-lg" aria-hidden="true">م</span>
                </div>
              </motion.div>

              <p className="text-[10px] tracking-[.35em] uppercase text-white/55">Undangan Walimatul Khitan</p>
              <h1 className="font-display text-5xl sm:text-7xl leading-tight mt-3 text-[#f5eddb]">Muhammad<br /><span className="italic gold-text">Raihan</span></h1>
              <p className="mt-5 text-xs text-white/65">Kepada Yth. Bapak/Ibu/Saudara/i</p>
              <motion.p
                key={greeting}
                className="font-accent text-2xl sm:text-3xl mt-1 gold-text italic"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.45, duration: 0.7 }}
              >
                {greeting}
              </motion.p>

              <p className="mt-8 text-xs sm:text-sm text-white/60 leading-6">
                Dengan memohon rahmat dan ridha Allah SWT,<br />kami mengundang Anda untuk hadir.
              </p>

              <motion.button
                onClick={openParty}
                className="btn-gold relative inline-flex items-center gap-2 mt-10 rounded-full px-9 py-4 text-xs font-bold tracking-widest uppercase"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6, duration: 0.8 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Sparkles size={16} />
                Buka Undangan
              </motion.button>

              <p className="mt-8 text-[9px] tracking-[.25em] text-white/40">20 DESEMBER 2026 · BANJAR</p>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {opened && (
        <>
          {/* ======= sticky header ======= */}
          <header className="sticky top-0 z-40 bg-[#0c2b20]/90 backdrop-blur-md text-white border-b border-[#c7a56a]/25">
            <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
              <a href="#home" className="font-display text-lg tracking-wide text-[#e2c995]">M. Raihan</a>
              <nav className="hidden md:flex items-center gap-7 text-[11px] tracking-widest uppercase text-white/75">
                <a href="#kisah" className="hover:text-[#e6c97e] transition-colors">Tentang</a>
                <a href="#acara" className="hover:text-[#e6c97e] transition-colors">Acara</a>
                <a href="#galeri" className="hover:text-[#e6c97e] transition-colors">Galeri</a>
                <a href="#rsvp" className="hover:text-[#e6c97e] transition-colors">RSVP</a>
              </nav>
              <div className="flex items-center gap-3">
                <button
                  aria-label="Musik"
                  onClick={() => setMusic((m) => !m)}
                  className={`p-2.5 rounded-full border transition-colors ${music ? "border-[#c7a56a] bg-[#c7a56a]/15 text-[#e6c97e]" : "border-white/20 text-white/80 hover:border-[#c7a56a]/50"}`}
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
                  <a key={href} href={href} onClick={() => setMobileMenu(false)} className="hover:text-[#e6c97e] transition-colors">{label}</a>
                ))}
              </div>
            )}
          </header>

          {/* ======= hero kecil ======= */}
          <section id="home" className="hero-bg text-white px-5 pt-20 pb-24 text-center relative scroll-mt-20">
            <div className="absolute inset-0 islamic-pattern-subtle opacity-60 pointer-events-none" />
            <Particles />
            <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-3xl mx-auto">
              <motion.p variants={fadeUp} className="section-kicker-light font-arabic text-xl sm:text-2xl tracking-normal normal-case" >{BISMILLAH}</motion.p>
              <motion.div variants={fadeUp} className="relative mx-auto my-8 w-32 h-40">
                <ArchFrame size={128} className="mx-auto" />
                <div className="absolute inset-0 flex items-center justify-center pt-6"><span className="font-arabic text-6xl text-[#eed9a6]">م</span></div>
              </motion.div>
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-[.35em] text-white/60">Walimatul Khitan</motion.p>
              <motion.h1 variants={fadeUp} className="font-display text-5xl sm:text-7xl mt-5 leading-tight text-[#f5eddb]">Muhammad <span className="italic gold-text">Raihan</span></motion.h1>
              <motion.p variants={fadeUp} className="mt-6 max-w-lg mx-auto text-sm leading-7 text-white/70">
                Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan syukuran walimatul khitan putra kami.
              </motion.p>
              <motion.a
                variants={fadeUp}
                href="#acara"
                className="inline-flex mt-8 items-center gap-2 text-xs uppercase tracking-[.22em] text-[#e2c995] hover:text-[#f5e3b8] transition-colors"
              >
                Lihat detail acara <ChevronDown size={15} className="animate-bounce" />
              </motion.a>
            </motion.div>
          </section>

          {/* ======= tentang ======= */}
          <motion.section id="kisah" className="py-20 px-5 text-center max-w-3xl mx-auto scroll-mt-24" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex justify-center"><Medallion size={40} spin={false} /></motion.div>
            <motion.p variants={fadeUp} className="section-kicker mt-4">Dengan penuh rasa syukur</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl mt-4">Assalamu’alaikum Warahmatullahi Wabarakatuh</motion.h2>
            <motion.p variants={fadeUp} className="text-sm leading-8 text-stone-600 mt-6">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada putra kami.
            </motion.p>
            <motion.div variants={fadeUp} className="ornament-line my-8 max-w-sm mx-auto"><Medallion size={26} spin={false} /></motion.div>
            <motion.p variants={fadeUp} className="font-accent italic text-2xl sm:text-3xl text-[#9a7845] leading-snug">
              “Semoga menjadi anak yang sholeh, berbakti kepada orang tua, serta bermanfaat bagi sesama.”
            </motion.p>
            <motion.p variants={fadeUp} className="mt-6 text-[10px] tracking-widest uppercase text-stone-400">Keluarga besar</motion.p>
            <motion.p variants={fadeUp} className="font-display text-2xl sm:text-3xl mt-2 text-[#1d4a38]">Bapak Ahmad & Ibu Siti</motion.p>
          </motion.section>

          {/* ======= acara ======= */}
          <motion.section id="acara" className="hero-bg text-white py-20 px-5 text-center relative scroll-mt-16" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }} variants={stagger}>
            <div className="absolute inset-0 islamic-pattern-subtle opacity-50 pointer-events-none" />
            <div className="relative">
              <motion.p variants={fadeUp} className="section-kicker-light">Save the date</motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-4xl mt-3">Waktu & Tempat</motion.h2>
              <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-10">
                <div className="glass-dark rounded-2xl p-7">
                  <CalendarDays className="mx-auto text-[#e6c97e]" size={26} />
                  <p className="mt-4 text-[10px] tracking-[.2em] uppercase text-white/50">Hari & Tanggal</p>
                  <p className="font-display text-2xl mt-2">Minggu, 20 Desember 2026</p>
                </div>
                <div className="glass-dark rounded-2xl p-7">
                  <Clock3 className="mx-auto text-[#e6c97e]" size={26} />
                  <p className="mt-4 text-[10px] tracking-[.2em] uppercase text-white/50">Waktu</p>
                  <p className="font-display text-2xl mt-2">09.00 – selesai</p>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-10">
                <MapPin className="mx-auto text-[#e6c97e]" size={24} />
                <p className="font-display text-2xl mt-3">Kediaman Keluarga</p>
                <p className="text-sm text-white/60 mt-2">Jl. Contoh No. 123, Kota Banjar, Jawa Barat</p>
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

          {/* ======= galeri ======= */}
          <motion.section id="galeri" className="py-20 px-5 max-w-6xl mx-auto scroll-mt-24" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <p className="section-kicker">Momen istimewa</p>
              <h2 className="font-display text-4xl mt-3">Galeri Keluarga</h2>
              <p className="text-sm text-stone-500 mt-3">Sebuah potret kecil penuh kenangan.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {photos.map((p, i) => (
                <motion.figure
                  key={p.src}
                  className="group relative overflow-hidden rounded-2xl shadow-lg shadow-emerald-950/10"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 34 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                >
                  <img
                    src={p.src}
                    alt={`Galeri keluarga ${i + 1}`}
                    className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071a13]/80 via-[#071a13]/0 to-transparent opacity-80" />
                  <figcaption className="absolute bottom-0 inset-x-0 p-4 text-left">
                    <p className="text-white text-[11px] tracking-wider uppercase font-semibold flex items-center gap-2">
                      <Star size={11} className="text-[#e6c97e]" /> {p.caption}
                    </p>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="text-center text-[10px] text-stone-400 mt-6">
              Ganti foto contoh dengan foto keluarga sendiri.
            </motion.p>
          </motion.section>

          {/* ======= rsvp ======= */}
          <motion.section id="rsvp" className="bg-[#efe9db] py-20 px-5 scroll-mt-16" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }} variants={stagger}>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
              <motion.div variants={fadeUp}>
                <p className="section-kicker">Konfirmasi & doa</p>
                <h2 className="font-display text-4xl mt-3 leading-tight">Kehadiran Anda</h2>
                <p className="text-sm leading-7 text-stone-600 mt-5">Mohon konfirmasi kehadiran dan tinggalkan doa terbaik untuk putra kami.</p>
                <div className="mt-8 flex items-center gap-3 text-sm text-stone-600">
                  <motion.span animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
                    <Heart className="text-[#b48c50]" size={18} />
                  </motion.span>
                  Terima kasih atas doa dan restunya.
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="relative">
                <div className="absolute -top-3 -right-3 rotate-12 opacity-20 pointer-events-none"><Medallion size={120} spin={false} /></div>
                <form onSubmit={submitRSVP} className="relative bg-[#fbf9f4] rounded-2xl p-6 shadow-lg shadow-stone-300/40 border border-[#e2d9c8]">
                  {sent ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                      <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>
                        <Heart className="mx-auto text-[#b48c50]" size={34} />
                      </motion.div>
                      <h3 className="font-display text-2xl mt-4">Terima kasih!</h3>
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

          {/* ======= buku tamu ======= */}
          <motion.section className="py-16 px-5 max-w-3xl mx-auto" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-8">
              <p className="section-kicker">Doa dari para tamu</p>
              <h2 className="font-display text-4xl mt-3">Buku Tamu</h2>
              <p className="text-sm text-stone-500 mt-3">Ucapan dan doa hangat untuk Muhammad Raihan.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-3">
              {guestbook.length ? (
                guestbook.map((entry, i) => (
                  <motion.div key={`${entry.name}-${i}`} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-[#e2d9c8] bg-white p-5 shadow-sm">
                    <p className="font-semibold text-sm flex items-center gap-2 text-[#1d4a38]"><Star size={12} className="text-[#c9a15a]" /> {entry.name}</p>
                    <p className="text-sm text-stone-600 mt-2 leading-6">{entry.message}</p>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-sm text-stone-400 border border-dashed border-[#d9cfbc] rounded-2xl p-8">Jadilah yang pertama mengirimkan doa melalui formulir RSVP.</p>
              )}
            </motion.div>
          </motion.section>

          {/* ======= penutup ======= */}
          <motion.section className="py-20 px-5 text-center max-w-2xl mx-auto" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex justify-center"><Medallion size={44} /></motion.div>
            <motion.p variants={fadeUp} className="section-kicker mt-5">Doa & harapan</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl mt-3">Terima Kasih</motion.h2>
            <motion.p variants={fadeUp} className="text-sm leading-8 text-stone-600 mt-5">
              Merupakan kebahagiaan bagi kami atas kehadiran, doa, dan restu yang diberikan. Semoga Allah SWT membalas segala kebaikan dengan keberkahan.
            </motion.p>
            <motion.p variants={fadeUp} className="font-accent italic text-2xl sm:text-3xl text-[#9a7845] mt-8">Wassalamu’alaikum Warahmatullahi Wabarakatuh</motion.p>
            <motion.div variants={fadeUp} className="gold-line my-8 max-w-xs mx-auto" />
            <motion.p variants={fadeUp} className="text-[10px] tracking-widest uppercase text-stone-500">Hormat kami,</motion.p>
            <motion.p variants={fadeUp} className="font-display text-2xl mt-2">Keluarga Ahmad & Siti</motion.p>
          </motion.section>

          {/* ======= footer ======= */}
          <footer className="bg-[#0c2b20] text-white/60 py-10 px-5 text-center relative overflow-hidden">
            <div className="absolute inset-0 islamic-pattern-subtle opacity-40 pointer-events-none" />
            <div className="relative">
              <p className="font-display text-2xl text-[#e2c995]">Muhammad Raihan</p>
              <p className="text-[10px] mt-2 tracking-[.3em] uppercase">Walimatul Khitan · 2026</p>
              <p className="text-[10px] mt-5 text-white/35 font-arabic text-sm tracking-normal">{BISMILLAH}</p>
            </div>
          </footer>

          {/* ======= music toggle ======= */}
          <motion.button
            onClick={() => setMusic((m) => !m)}
            className="fixed bottom-5 right-5 z-30 bg-gradient-to-br from-[#e3c584] to-[#b48c50] text-[#1c1509] rounded-full p-4 shadow-2xl shadow-emerald-950/40"
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
