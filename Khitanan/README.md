# Undangan Walimatul Khitan — Luxury Islamic

Starter website undangan digital berbasis Next.js App Router, Tailwind CSS v4, Framer Motion, Lucide, dan Supabase.

## Menjalankan
1. Install Node.js 20+.
2. Jalankan `npm install`.
3. Salin `.env.example` menjadi `.env.local`, lalu isi konfigurasi.
4. Jalankan `npm run dev`, buka `http://localhost:3000`.

## Personalisasi
Edit `app/page.tsx`:
- `Muhammad Raihan`: nama anak.
- `Bapak Ahmad & Ibu Siti`: nama orang tua.
- Tanggal, waktu, alamat, dan URL Google Maps.
- Array `photos`: ganti gambar galeri di `public/images/` dengan foto keluarga.
- Kalau ingin musik latar yang berbeda, ganti file `public/audio/backsound.wav` dengan arsip yang bebas lisensi-nya milik Anda.

## Nama tamu otomatis
Bagikan tautan dengan parameter:
`https://domain-anda.com/?to=Nama%20Tamu`
Nama akan ditampilkan pada sampul undangan.

## Supabase RSVP
1. Buat project Supabase.
2. Jalankan SQL pada `supabase/schema.sql` di SQL Editor.
3. Isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` pada `.env.local`.
4. Form RSVP akan menyimpan data ke tabel `rsvps`.

Catatan: schema SQL di atas adalah baseline demo. Untuk produksi, tambahkan rate limiting / CAPTCHA, validasi server, dan kebijakan baca admin yang aman. Jangan pernah mengekspos service role key di browser.

## Admin
Halaman `/admin` adalah prototipe dashboard untuk daftar RSVP dan ekspor CSV. Password demo `demo123` hanya untuk preview; jangan gunakan untuk deployment publik. Ganti dengan autentikasi Supabase Auth dan pemeriksaan role di server sebelum produksi.
