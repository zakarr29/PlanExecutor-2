# User Authentication System

Sistem autentikasi pengguna dengan fitur login, signup, dan pemulihan kata sandi.

## Fitur

- Pendaftaran pengguna (Register)
- Login pengguna
- Logout
- Pemulihan kata sandi
- Penyimpanan data pengguna di database PostgreSQL

## Pengembangan Lokal

1. Clone repositori
2. Install dependensi:
   ```
   npm install
   ```
3. Jalankan aplikasi:
   ```
   npm run dev
   ```

## Deployment ke Vercel

Untuk men-deploy aplikasi ini ke Vercel, Anda perlu:

1. Buat database PostgreSQL (misalnya dengan Neon, Supabase, atau Vercel Postgres)
2. Atur environment variable berikut di dashboard Vercel:
   - `DATABASE_URL`: URL koneksi PostgreSQL
   - `SESSION_SECRET`: String rahasia untuk mengenkripsi sesi
3. Connect repository GitHub Anda ke Vercel
4. Pilih direktori root sebagai source directory
5. Gunakan pengaturan build yang telah dikonfigurasi di vercel.json
6. **Penting**: Modifikasi build command pada Vercel Dashboard menjadi hanya `vite build` (jangan menggunakan command server build)

### Struktur Project untuk Vercel

Project ini telah dikonfigurasi untuk deployment Vercel dengan:

- `vercel.json` - Konfigurasi build, rute, dan runtime
- `api/` - Direktori untuk serverless functions
- `server/vercel-db.js` - Konfigurasi database untuk Vercel
- `server/vercel-storage.js` - Implementasi storage untuk Vercel

### Troubleshooting Deployment Vercel

#### 1. Error: "Function Runtimes must have a valid version"

Jika Anda mendapatkan error ini, pastikan:

- `vercel.json` memiliki konfigurasi "functions" yang benar, misalnya:
   ```json
   "functions": {
     "api/*.js": {
       "runtime": "nodejs18.x"
     }
   }
   ```

- File-file di direktori `api/` menggunakan ekstensi `.js` bukan `.ts`
- Gunakan perintah deploy `vercel --prod` jika men-deploy dari CLI

#### 2. Error: "Invalid package.json"

Jika build gagal karena masalah dengan package.json:

- Periksa log build di Vercel dashboard untuk detail error
- Hapus dependencies yang tidak compatible dengan versi Node.js yang digunakan Vercel
- Tambahkan engines field di package.json untuk menentukan versi Node.js:
   ```json
   "engines": {
     "node": ">=18.x"
   }
   ```

#### 3. Error terkait Database

Jika aplikasi berhasil di-deploy tapi gagal saat runtime:

- Pastikan URL database dapat diakses dari Vercel serverless functions
- Pastikan semua environment variables sudah diatur dengan benar
- Periksa logs dari Vercel dashboard untuk detail error

### Penting

- Pastikan tabel database dibuat sebelum men-deploy. Anda dapat menjalankan migrasi dengan CLI Drizzle (lihat drizzle.config.ts)
- Pastikan URL database yang digunakan dapat diakses dari Vercel (cek batasan firewall)

## Teknologi yang Digunakan

- Frontend: React, Vite, TailwindCSS, shadcn/ui
- Backend: Express, Passport.js
- Database: PostgreSQL dengan Drizzle ORM
- Deployment: Replit dan Vercel
