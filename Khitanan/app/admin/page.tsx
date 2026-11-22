"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Download, LockKeyhole, Users, MessageCircle, CheckCircle2 } from "lucide-react";

type RSVP = { id?:number; name:string; attendance:string; guest_count:number; message:string; created_at?:string };
export default function AdminPage() {
  const [authorized,setAuthorized] = useState(false);
  const [password,setPassword] = useState("");
  const [rows,setRows] = useState<RSVP[]>([]);
  const [loading,setLoading] = useState(false);
  async function load() {
    setLoading(true);
    if (supabase) {
      const {data,error} = await supabase.from("rsvps").select("*").order("created_at",{ascending:false});
      if (!error && data) setRows(data as RSVP[]);
    }
    setLoading(false);
  }
  useEffect(()=>{ if(authorized) void load(); },[authorized]);
  function login(e:React.FormEvent) { e.preventDefault(); if(password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "demo123")) setAuthorized(true); else alert("Password salah."); }
  function exportCSV() {
    const csv = ["Nama,Status,Jumlah,Ucapan",...rows.map(r=>[r.name,r.attendance,r.guest_count,r.message].map(v=>`"${String(v??"").replaceAll('"','""')}"`).join(","))].join("\n");
    const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"})); a.download="data-rsvp.csv"; a.click(); URL.revokeObjectURL(a.href);
  }
  if(!authorized) return <main className="min-h-screen bg-[#173b2d] flex items-center justify-center p-5"><form onSubmit={login} className="bg-[#fbf9f4] rounded-2xl p-8 w-full max-w-sm"><LockKeyhole className="text-[#b48c50] mx-auto" size={30}/><h1 className="font-display text-3xl text-center mt-4">Admin Dashboard</h1><p className="text-center text-xs text-stone-500 mt-2">Masuk untuk mengelola konfirmasi tamu.</p><input className="input mt-6" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password admin"/><button className="btn-gold w-full rounded-full py-3 mt-4 text-xs font-bold tracking-widest">MASUK</button><p className="text-[10px] text-stone-400 mt-4">Demo password: demo123. Ganti autentikasi sebelum produksi.</p></form></main>;
  const total=rows.reduce((n,r)=>n+Number(r.guest_count||1),0);
  return <main className="min-h-screen bg-[#f5f0e6] p-5 sm:p-10"><div className="max-w-6xl mx-auto"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="section-kicker">Pengelolaan acara</p><h1 className="font-display text-4xl mt-2">Dashboard RSVP</h1></div><button onClick={exportCSV} className="btn-gold rounded-full px-5 py-3 text-xs flex gap-2 items-center"><Download size={15}/> Export CSV</button></div><div className="grid sm:grid-cols-3 gap-4 mt-8"><Stat icon={<Users/>} label="Total respons" value={rows.length}/><Stat icon={<CheckCircle2/>} label="Estimasi tamu" value={total}/><Stat icon={<MessageCircle/>} label="Ucapan masuk" value={rows.filter(r=>r.message).length}/></div><div className="bg-white rounded-2xl border border-[#e2d9c8] mt-8 overflow-hidden"><div className="p-5 flex justify-between items-center"><h2 className="font-display text-2xl">Daftar tamu</h2><button onClick={load} className="text-xs underline">{loading?"Memuat...":"Muat ulang"}</button></div><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-[#f5f0e6] text-left text-xs"><tr><th className="p-4">Nama</th><th className="p-4">Kehadiran</th><th className="p-4">Jumlah</th><th className="p-4">Ucapan</th></tr></thead><tbody>{rows.map((r,i)=><tr key={r.id??i} className="border-t border-stone-100"><td className="p-4 font-semibold">{r.name}</td><td className="p-4">{r.attendance}</td><td className="p-4">{r.guest_count}</td><td className="p-4 min-w-48">{r.message}</td></tr>)}</tbody></table>{!rows.length&&<p className="p-8 text-center text-sm text-stone-400">Belum ada data RSVP atau Supabase belum dikonfigurasi.</p>}</div></div></div></main>;
}
function Stat({icon,label,value}:{icon:React.ReactNode;label:string;value:number}) { return <div className="bg-white rounded-2xl p-5 border border-[#e2d9c8]"><div className="text-[#b48c50]">{icon}</div><p className="text-xs text-stone-500 mt-3">{label}</p><p className="font-display text-3xl mt-1">{value}</p></div>; }