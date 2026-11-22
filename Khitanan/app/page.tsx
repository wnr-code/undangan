"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, CalendarDays, Clock3, Music2, Volume2, VolumeX, Heart, Menu, X, Send, Image as ImageIcon, Sparkles, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";

const eventDate = new Date(process.env.NEXT_PUBLIC_EVENT_DATE || "2026-12-20T09:00:00+07:00");
const mapsUrl = process.env.NEXT_PUBLIC_MAPS_URL || "https://maps.google.com";
const photos = [
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=900&q=85",
];

function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const diff = Math.max(0, eventDate.getTime() - now);
  const units = [
    ["Hari", Math.floor(diff / 86400000)],
    ["Jam", Math.floor(diff / 3600000) % 24],
    ["Menit", Math.floor(diff / 60000) % 60],
    ["Detik", Math.floor(diff / 1000) % 60],
  ];
  return <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto">{units.map(([label,value]) => <div key={label} className="border border-[#c7a56a]/40 bg-white/5 rounded-xl py-4 text-center"><div className="font-display text-2xl sm:text-4xl text-[#e1c995]">{String(value).padStart(2,"0")}</div><div className="mt-1 text-[9px] uppercase tracking-[.2em] text-white/60">{label}</div></div>)}</div>;
}

export default function Home() {
  const [opened,setOpened] = useState(false);
  const [guest,setGuest] = useState("Tamu Undangan");
  const [music,setMusic] = useState(false);
  const [mobileMenu,setMobileMenu] = useState(false);
  const [rsvp,setRsvp] = useState({name:"",attendance:"Hadir",count:"1",message:""});
  const [sent,setSent] = useState(false);
  const [guestbook,setGuestbook] = useState<{name:string,message:string}[]>([]);
  const [audio] = useState<HTMLAudioElement | null>(() => typeof Audio !== "undefined" ? new Audio("/audio/backsound.mp3") : null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("to") || params.get("nama");
    if (name) setGuest(decodeURIComponent(name.replace(/\+/g," ")));
  }, []);

  useEffect(() => {
    if (!audio) return;
    audio.loop = true; audio.volume = 0.35;
    if (music) audio.play().catch(() => setMusic(false)); else { audio.pause(); audio.currentTime = 0; }
  }, [music,audio]);

  const greeting = useMemo(() => guest.trim() || "Tamu Undangan", [guest]);

  async function submitRSVP(e: React.FormEvent) {
    e.preventDefault();
    if (!rsvp.name.trim()) return;
    if (supabase) {
      const { error } = await supabase.from("rsvps").insert([{ name:rsvp.name, attendance:rsvp.attendance, guest_count:Number(rsvp.count), message:rsvp.message }]);
      if (error) { alert("Belum berhasil mengirim. Silakan coba lagi."); return; }
    }
    setGuestbook(prev => [{name:rsvp.name,message:rsvp.message || "Semoga acaranya berkah."},...prev]);
    setSent(true);
  }

  return <main className="overflow-hidden">
    {!opened ? <section className="hero-bg min-h-[100svh] text-white flex items-center justify-center px-5 py-12 relative">
      <div className="absolute inset-0 pattern opacity-30" />
      <div className="relative z-10 max-w-xl w-full text-center">
        <div className="mx-auto mb-8 w-20 h-20 arch flex items-center justify-center text-[#d9bd86]"><Sparkles size={28}/></div>
        <p className="section-kicker !text-[#d9bd86] mb-5">The sacred celebration</p>
        <p className="text-xs tracking-[.22em] uppercase text-white/65">Undangan Walimatul Khitan</p>
        <div className="gold-line my-6"/>
        <h1 className="font-display text-5xl sm:text-7xl leading-tight text-[#f5eddb]">Muhammad<br/><span className="italic gold-text">Raihan</span></h1>
        <p className="mt-5 text-sm text-white/70">Kepada Yth. Bapak/Ibu/Saudara/i</p>
        <p className="font-display text-2xl mt-1 text-[#e2c995]">{greeting}</p>
        <p className="mt-8 text-xs text-white/60">Dengan memohon rahmat dan ridha Allah SWT,<br/>kami mengundang Anda untuk hadir.</p>
        <button onClick={() => {setOpened(true);setMusic(true);}} className="btn-gold mt-9 rounded-full px-8 py-3 text-xs font-bold tracking-widest uppercase inline-flex items-center gap-2"><Heart size={15}/> Buka Undangan</button>
        <p className="mt-10 text-[9px] tracking-[.25em] text-white/40">20 DESEMBER 2026 · BANJAR</p>
      </div>
    </section> : <>
      <header className="sticky top-0 z-40 bg-[#173b2d]/95 backdrop-blur text-white border-b border-[#c7a56a]/25">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#home" className="font-display text-lg text-[#e2c995]">M. Raihan</a>
          <nav className="hidden md:flex items-center gap-7 text-[11px] tracking-widest uppercase text-white/75"><a href="#kisah">Tentang</a><a href="#acara">Acara</a><a href="#galeri">Galeri</a><a href="#rsvp">RSVP</a></nav>
          <div className="flex items-center gap-3">
            <button aria-label="Musik" onClick={() => setMusic(!music)} className="p-2 rounded-full border border-white/20">{music?<Volume2 size={16}/>:<VolumeX size={16}/>}</button>
            <button className="md:hidden p-2" onClick={()=>setMobileMenu(!mobileMenu)}>{mobileMenu?<X/>:<Menu/>}</button>
          </div>
        </div>
        {mobileMenu && <div className="md:hidden px-5 pb-4 flex flex-col gap-3 text-sm"><a href="#kisah" onClick={()=>setMobileMenu(false)}>Tentang</a><a href="#acara" onClick={()=>setMobileMenu(false)}>Acara</a><a href="#galeri" onClick={()=>setMobileMenu(false)}>Galeri</a><a href="#rsvp" onClick={()=>setMobileMenu(false)}>RSVP</a></div>}
      </header>

      <section id="home" className="hero-bg text-white px-5 py-20 sm:py-28 text-center relative">
        <div className="absolute inset-0 pattern opacity-25"/>
        <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.8}} className="relative max-w-3xl mx-auto">
          <p className="section-kicker !text-[#d9bd86]">Bismillahirrahmanirrahim</p>
          <div className="mx-auto my-8 w-36 h-48 arch p-2"><div className="w-full h-full arch bg-[#f1e8d5]/10 flex items-center justify-center"><span className="font-display text-5xl text-[#e2c995]">م</span></div></div>
          <p className="text-xs uppercase tracking-[.3em] text-white/65">Walimatul Khitan</p>
          <h1 className="font-display text-5xl sm:text-7xl mt-4 text-[#f5eddb]">Muhammad <span className="italic gold-text">Raihan</span></h1>
          <p className="mt-6 max-w-lg mx-auto text-sm leading-7 text-white/70">Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan syukuran walimatul khitan putra kami.</p>
          <a href="#acara" className="inline-flex mt-8 items-center gap-2 text-xs uppercase tracking-[.2em] text-[#e2c995]">Lihat detail acara <ChevronDown size={15}/></a>
        </motion.div>
      </section>

      <section id="kisah" className="py-20 px-5 text-center max-w-3xl mx-auto">
        <p className="section-kicker">Dengan penuh rasa syukur</p>
        <h2 className="font-display text-3xl sm:text-4xl mt-4">Assalamu’alaikum Warahmatullahi Wabarakatuh</h2>
        <p className="text-sm leading-8 text-stone-600 mt-6">Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada putra kami.</p>
        <div className="my-8 gold-line"/>
        <p className="font-display italic text-2xl text-[#9a7845]">“Semoga menjadi anak yang sholeh, berbakti kepada orang tua, serta bermanfaat bagi sesama.”</p>
        <p className="mt-6 text-xs tracking-widest uppercase text-stone-500">Keluarga besar</p>
        <p className="font-display text-2xl mt-2">Bapak Ahmad & Ibu Siti</p>
      </section>

      <section id="acara" className="hero-bg text-white py-20 px-5 text-center">
        <p className="section-kicker !text-[#d9bd86]">Save the date</p><h2 className="font-display text-4xl mt-3">Waktu & Tempat</h2>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-10">
          <div className="border border-[#c7a56a]/35 rounded-2xl p-7"><CalendarDays className="mx-auto text-[#d9bd86]" size={25}/><p className="mt-4 text-[10px] tracking-[.2em] uppercase text-white/50">Hari & Tanggal</p><p className="font-display text-2xl mt-2">Minggu, 20 Desember 2026</p></div>
          <div className="border border-[#c7a56a]/35 rounded-2xl p-7"><Clock3 className="mx-auto text-[#d9bd86]" size={25}/><p className="mt-4 text-[10px] tracking-[.2em] uppercase text-white/50">Waktu</p><p className="font-display text-2xl mt-2">09.00 – selesai</p></div>
        </div>
        <div className="mt-8"><MapPin className="mx-auto text-[#d9bd86]" size={23}/><p className="font-display text-2xl mt-3">Kediaman Keluarga</p><p className="text-sm text-white/60 mt-2">Jl. Contoh No. 123, Kota Banjar, Jawa Barat</p><a href={mapsUrl} target="_blank" rel="noreferrer" className="btn-gold inline-flex rounded-full px-6 py-3 mt-5 text-xs font-bold uppercase tracking-widest gap-2 items-center"><MapPin size={14}/> Buka Google Maps</a></div>
        <div className="mt-16"><p className="section-kicker !text-[#d9bd86] mb-6">Menghitung hari bahagia</p><Countdown/></div>
      </section>

      <section id="galeri" className="py-20 px-5 max-w-6xl mx-auto">
        <div className="text-center mb-10"><p className="section-kicker">Momen istimewa</p><h2 className="font-display text-4xl mt-3">Galeri Keluarga</h2><p className="text-sm text-stone-500 mt-3">Sebuah potret kecil penuh kenangan.</p></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{photos.map((src,i)=><motion.div whileHover={{scale:1.02}} key={src} className={`overflow-hidden rounded-2xl ${i===0?"row-span-2":""}`}><img src={src} alt={`Galeri keluarga ${i+1}`} className="w-full h-full min-h-44 object-cover"/></motion.div>)}</div>
        <p className="text-center text-[10px] text-stone-400 mt-4">Ganti foto contoh dengan foto keluarga sendiri.</p>
      </section>

      <section id="rsvp" className="bg-[#f0eadf] py-20 px-5">
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-10">
          <div><p className="section-kicker">Konfirmasi & doa</p><h2 className="font-display text-4xl mt-3">Kehadiran Anda</h2><p className="text-sm leading-7 text-stone-600 mt-5">Mohon konfirmasi kehadiran dan tinggalkan doa terbaik untuk putra kami.</p><div className="mt-8 flex items-center gap-3 text-sm text-stone-600"><Heart className="text-[#b48c50]" size={18}/> Terima kasih atas doa dan restunya.</div></div>
          <form onSubmit={submitRSVP} className="bg-[#fbf9f4] rounded-2xl p-6 shadow-sm border border-[#e2d9c8]">
            {sent ? <div className="py-10 text-center"><Heart className="mx-auto text-[#b48c50]" size={32}/><h3 className="font-display text-2xl mt-4">Terima kasih!</h3><p className="text-sm text-stone-500 mt-2">Konfirmasi dan doa Anda telah kami terima.</p><button type="button" onClick={()=>{setSent(false);setRsvp({name:"",attendance:"Hadir",count:"1",message:""});}} className="text-xs underline mt-5">Kirim jawaban lain</button></div> : <>
              <label className="text-xs font-semibold">Nama</label><input className="input mt-2 mb-4" required value={rsvp.name} onChange={e=>setRsvp({...rsvp,name:e.target.value})} placeholder="Nama lengkap"/>
              <label className="text-xs font-semibold">Konfirmasi kehadiran</label><select className="input mt-2 mb-4" value={rsvp.attendance} onChange={e=>setRsvp({...rsvp,attendance:e.target.value})}><option>Hadir</option><option>InsyaAllah hadir</option><option>Berhalangan</option></select>
              <label className="text-xs font-semibold">Jumlah tamu</label><select className="input mt-2 mb-4" value={rsvp.count} onChange={e=>setRsvp({...rsvp,count:e.target.value})}><option value="1">1 orang</option><option value="2">2 orang</option><option value="3">3 orang</option><option value="4">4 orang</option></select>
              <label className="text-xs font-semibold">Ucapan & doa</label><textarea className="input mt-2 mb-5 min-h-24" value={rsvp.message} onChange={e=>setRsvp({...rsvp,message:e.target.value})} placeholder="Tuliskan doa terbaik..."/>
              <button className="btn-gold w-full rounded-full py-3 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2"><Send size={14}/> Kirim Konfirmasi</button>
              {!supabase && <p className="text-[10px] text-amber-700 mt-3">Mode demo: data tampil sementara di halaman ini. Hubungkan Supabase agar tersimpan permanen.</p>}
            </>}</form>
        </div>
      </section>

      <section className="py-16 px-5 max-w-3xl mx-auto">
        <div className="text-center mb-8"><p className="section-kicker">Doa dari para tamu</p><h2 className="font-display text-4xl mt-3">Buku Tamu</h2><p className="text-sm text-stone-500 mt-3">Ucapan dan doa hangat untuk Muhammad Raihan.</p></div>
        <div className="space-y-3">{guestbook.length ? guestbook.map((entry,i)=><div key={i} className="rounded-2xl border border-[#e2d9c8] bg-white p-5"><p className="font-semibold text-sm">{entry.name}</p><p className="text-sm text-stone-600 mt-2 leading-6">{entry.message}</p></div>) : <p className="text-center text-sm text-stone-400 border border-dashed border-[#d9cfbc] rounded-2xl p-8">Jadilah yang pertama mengirimkan doa melalui formulir RSVP.</p>}</div>
      </section>

      <section className="py-20 px-5 text-center max-w-2xl mx-auto"><p className="section-kicker">Doa & harapan</p><h2 className="font-display text-4xl mt-3">Terima Kasih</h2><p className="text-sm leading-8 text-stone-600 mt-5">Merupakan kebahagiaan bagi kami atas kehadiran, doa, dan restu yang diberikan. Semoga Allah SWT membalas segala kebaikan dengan keberkahan.</p><p className="font-display italic text-2xl text-[#9a7845] mt-8">Wassalamu’alaikum Warahmatullahi Wabarakatuh</p><div className="gold-line my-8"/><p className="text-xs tracking-widest uppercase text-stone-500">Hormat kami,</p><p className="font-display text-2xl mt-2">Keluarga Ahmad & Siti</p></section>

      <footer className="bg-[#173b2d] text-center text-white/60 py-8 px-5"><p className="font-display text-xl text-[#e2c995]">Muhammad Raihan</p><p className="text-[10px] mt-3 tracking-widest uppercase">Walimatul Khitan · 2026</p><p className="text-[10px] mt-5">Made with ♥ and gratitude</p></footer>
      <button onClick={()=>setMusic(!music)} className="fixed bottom-5 right-5 z-30 bg-[#c7a56a] text-[#17271f] rounded-full p-3 shadow-lg" aria-label="Toggle music">{music?<Music2 size={18}/>:<VolumeX size={18}/>}</button>
    </>}
  </main>;
}