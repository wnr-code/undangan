# Undangan Walimatul Khitan — Muhammad Faariz Al-khowarizmi

Undangan walimatul khitan untuk **Muhammad Faariz Al-khowarizmi**.
Selasa, 1 Desember 2026 · 08.00 WIB · Dusun Margasari RT 01 / RW 04

Orang tua: Cucu Syamsudin S. H & Aam Himayah

Situs undangan digital interaktif berbasis Next.js (App Router), Tailwind CSS v4, Framer Motion, Lucide, dan Supabase — dengan tema pastel penuh keceriaan (balon, bintang, lengkung arsitektural, dan countdown).

## Menjalankan
1. Install Node.js 20+.
2. `npm install`.
3. Salin `.env.example` menjadi `.env.local`, lalu isi konfigurasi.
4. `npm run dev`, buka `http://localhost:3000`.

## Personalisasi
Edit `app/page.tsx`:
- `Muhammad Faariz Al-khowarizmi` (NAME / NAME_FULL), `Cucu Syamsudin S. H & Aam Himayah` (PARENTS).
- Tanggal, waktu, alamat, dan URL Google Maps.
- Array `photos`: ganti `/public/images/faariz-*.jpg` dengan foto anak Anda.
- Kalau ingin musik latar berbeda, ganti `public/audio/backsound.wav` dengan arsip bebas lisensi milik Anda.

## Nama tamu otomatis
Bagikan tautan dengan parameter: `?to=Nama%20Tamu` — nama ditampilkan pada sampul undangan.

## Supabase RSVP
1. Buat project Supabase.
2. Jalankan SQL pada `supabase/schema.sql` di SQL Editor.
3. Isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` di `.env.local`.
4. Form RSVP akan menyimpan data ke tabel `rsvps`.

Catatan: schema SQL ini baseline demo. Untuk produksi, tambahkan rate limiting / CAPTCHA, validasi server, dan kebijakan baca admin yang aman. Jangan pernah mengekspos service role key di browser.

## Admin
Halaman `/admin` adalah dashboard RSVP + ekspor CSV. Password demo `demo123` hanya untuk pratinjau; jangan gunakan untuk deployment publik.
