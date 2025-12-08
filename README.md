# CMS Laravel 12 + Inertia + React

CMS pribadi yang dibuat dengan:

-   **Laravel 12**
-   **Inertia.js + React**
-   **Tailwind CSS**
-   **MySQL**
-   Filament (rencana / opsional)
-   Mail (Mailtrap / SMTP, nanti untuk verifikasi & reset password)

## Fitur Utama

### Auth & User Flow

-   Register, login, logout.
-   Verifikasi email (Laravel verified).
-   Lupa password dengan token reset (email).
-   Layout dashboard dengan sidebar seperti WordPress.

### Posts

-   CRUD Post:
    -   Judul
    -   Body
    -   Media (opsional)
    -   Footer
-   Statistik per post:
    -   Total visitor (views)
    -   Total like (sementara placeholder)
    -   Total comment (sementara counter)
-   Bulk delete:
    -   Pilih beberapa post sekaligus lalu delete.
    -   Konfirmasi "Are you sure delete this post?".

### Projects

-   CRUD Project:
    -   Judul project
    -   Deskripsi
    -   Media (WAJIB minimal 1 file)
    -   Techstack (disimpan sebagai array / JSON)
-   Statistik per project:
    -   Total visitor (views)
    -   Disk usage per project (ukuran file media)
-   Bulk delete:
    -   Sama seperti posts (delete selected & delete single).

### Static (Statistics)

-   Ringkasan:
    -   Total posts
    -   Total projects
    -   Total visitors (gabungan views posts + projects)
    -   Total disk usage (MB)
-   Disk usage meter:
    -   Meter batang dengan warna hijau/kuning/merah.
    -   Warning jika usage > 80% dari limit (misal 500MB).
-   List:
    -   Top posts by visitors
    -   Top projects by visitors + disk usage.

### Notifications

-   Menggunakan sistem Notifications bawaan Laravel (database).
-   Menampilkan:
    -   Notif **unread** dan **read** (dibedakan style).
-   Action:
    -   Mark satu notif sebagai read.
    -   Mark all as read.
-   Contoh notif:
    -   Peringatan: disk usage mendekati penuh (`DiskUsageWarning` notification).

### Settings

#### Profile Settings

-   Ganti:
    -   Name
    -   Display name (untuk sidebar dan dashboard)
-   Upload:
    -   Avatar (dipakai di UI user)
    -   Project logo (dipakai di sidebar CMS)
-   Logo & display name muncul di sidebar kiri.

#### Theme Settings

-   Simpan ke tabel `settings` (key: `theme`):
    -   Primary color
    -   Accent color
    -   Font family
-   Halaman theme menampilkan:
    -   Form pemilihan warna (color picker + input hex).
    -   Pilih font (Inter, system-ui, Poppins, dll).
    -   Live preview:
        -   Tampilan web, tablet, mobile dengan header + button menyesuaikan warna.

#### Security Settings

-   (Belum diimplementasi, planned)
-   Rencana:
    -   Ganti email (dengan verifikasi).
    -   Ganti password.
    -   Kelola sesi login.

## Tech Stack

-   PHP 8.2
-   Laravel 12.x
-   MySQL
-   Node + Vite
-   Inertia.js + React
-   Tailwind CSS
-   Laravel Breeze (Inertia) sebagai starter auth

## Cara Install (Development)

```bash
# Clone repo
git clone https://github.com/USERNAME/cms-laravel-inertia.git
cd cms-laravel-inertia

# Install dependency PHP
composer install

# Install dependency JS
npm install

# Copy file environment
cp .env.example .env

# Generate app key
php artisan key:generate

# Atur koneksi database di .env
# DB_DATABASE, DB_USERNAME, DB_PASSWORD

# Jalankan migrasi
php artisan migrate

# Buat symlink storage untuk akses media
php artisan storage:link

# Jalanin server Laravel & Vite
php artisan serve
npm run dev
```
