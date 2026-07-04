# Cinematic Portfolio — Linux Setup Guide

A full Linux walkthrough for getting the cinematic Next.js portfolio hero running on Ubuntu, Debian, Arch, or any systemd-based distro.

---

## Prerequisites

### 1. Install Node.js (via nvm — recommended)

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload shell
source ~/.bashrc   # or source ~/.zshrc if you use zsh

# Install Node LTS
nvm install --lts
nvm use --lts

# Verify
node -v   # should be v20.x or higher
npm -v
```

> **Alternatively** — system package manager (may give older versions):
> ```bash
> # Ubuntu / Debian
> sudo apt update && sudo apt install nodejs npm -y
>
> # Arch
> sudo pacman -S nodejs npm
>
> # Fedora
> sudo dnf install nodejs npm
> ```

---

### 2. Install Git (if not already present)

```bash
# Ubuntu / Debian
sudo apt install git -y

# Arch
sudo pacman -S git

# Verify
git --version
```

---

## Project Setup

### Step 1 — Scaffold a new Next.js app

```bash
npx create-next-app@latest my-portfolio \
  --app \
  --no-tailwind \
  --no-eslint \
  --no-src-dir \
  --no-import-alias

cd my-portfolio
```

### Step 2 — Install Three.js

```bash
npm install three
```

### Step 3 — Copy the component files

Assuming you downloaded the generated files into `~/Downloads/cinematic-portfolio/`:

```bash
# Copy components
cp -r ~/Downloads/cinematic-portfolio/components ./

# Copy app directory (overwrites scaffolded files)
cp ~/Downloads/cinematic-portfolio/app/page.jsx      ./app/page.jsx
cp ~/Downloads/cinematic-portfolio/app/layout.jsx    ./app/layout.jsx
cp ~/Downloads/cinematic-portfolio/app/globals.css   ./app/globals.css
```

### Step 4 — Add your video

Create the public video directory and drop your talking-head video in:

```bash
mkdir -p public/video
cp /path/to/your/hero-video.mp4 public/video/hero.mp4
```

> **Tip:** Convert any video to the right format using `ffmpeg`:
> ```bash
> # Install ffmpeg
> sudo apt install ffmpeg -y        # Ubuntu/Debian
> sudo pacman -S ffmpeg             # Arch
>
> # Convert to H.264 MP4, 1080p, web-optimised
> ffmpeg -i input.mov \
>   -vcodec libx264 \
>   -crf 23 \
>   -preset slow \
>   -vf scale=1920:1080 \
>   -movflags +faststart \
>   public/video/hero.mp4
> ```

### Step 5 — Run the dev server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Final project structure

```
my-portfolio/
├── app/
│   ├── layout.jsx          ← Root layout
│   ├── page.jsx            ← Entry — mounts VideoIntro
│   └── globals.css         ← Reset + base styles
│
├── components/
│   ├── VideoIntro/
│   │   ├── VideoIntro.jsx          ← Hero: video, copy, controls, scroll indicator
│   │   └── VideoIntro.module.css
│   │
│   └── CinematicLayer/
│       ├── CinematicLayer.jsx      ← Three.js particle bokeh (SSR-safe)
│       └── CinematicLayer.module.css
│
├── public/
│   └── video/
│       └── hero.mp4        ← Your talking-head video goes here
│
├── package.json
└── next.config.js
```

---

## Customising your content

Open `app/page.jsx` and edit the props:

```jsx
<VideoIntro
  videoSrc="/video/hero.mp4"
  firstName="Devansh"
  lastName="Durgapal"
  tagline="Full-Stack AI Engineer · Builder · Creator"
  role="Deep Learning · NLP · Generative AI"
  roleDetail="Building intelligent systems at the frontier of machine learning"
/>
```

| Prop           | What it controls                        |
|----------------|-----------------------------------------|
| `videoSrc`     | Path to your MP4 in `/public`           |
| `firstName`    | First name — renders in white           |
| `lastName`     | Last name — renders in warm orange      |
| `tagline`      | Small uppercase line above the name     |
| `role`         | Main role descriptor                    |
| `roleDetail`   | Subtitle / secondary description        |
| `onScrollNext` | Optional custom scroll handler          |

---

## Building for production

```bash
# Build
npm run build

# Start production server locally
npm start
```

### Deploy to a Linux VPS (optional)

```bash
# Install PM2 process manager
npm install -g pm2

# Build and start
npm run build
pm2 start npm --name "portfolio" -- start

# Auto-restart on reboot
pm2 startup
pm2 save
```

Then point Nginx at port 3000:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## Troubleshooting

**`command not found: npx`**
Node is not on your PATH. Run `source ~/.bashrc` after installing nvm, or log out and back in.

**Blank canvas / no particles**
WebGL may be disabled. Check with:
```bash
glxinfo | grep "OpenGL renderer"   # requires mesa-utils
```
Enable hardware acceleration in your browser settings.

**Video doesn't autoplay**
Linux browsers respect autoplay policies. The video is `muted` by default which satisfies all major browsers. If it still won't play, check the browser console for `NotAllowedError`.

**Port 3000 already in use**
```bash
# Find what's using it
sudo lsof -i :3000

# Kill it
kill -9 <PID>

# Or run on a different port
npm run dev -- -p 3001
```

**`EACCES` permission error on npm install**
Don't use `sudo npm`. Instead, fix npm's directory:
```bash
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

## Performance tips for Linux

- Run `npm run build` and `npm start` for production — dev mode is ~3× slower.
- If running on a headless server, use Xvfb for any screenshot/preview tooling.
- For low-RAM VPS (< 1 GB), set `NODE_OPTIONS=--max_old_space_size=512` before building.

```bash
NODE_OPTIONS=--max_old_space_size=512 npm run build
```
