# Cinematic Portfolio — Hero Section

A Next.js App Router portfolio hero with Three.js particle bokeh, ambient video layers, and cinematic GSAP-style entrance animations.

## Stack
- Next.js 14 (App Router)
- React 18
- Three.js (particle/bokeh layer, mouse parallax)
- CSS Modules (no runtime CSS-in-JS)
- Custom vanilla JS entrance animations

---

## Quick start

```bash
npx create-next-app@latest my-portfolio --app --tailwind=false --eslint=false --src-dir=false
cd my-portfolio

# Copy the generated files into the project
cp -r path/to/cinematic-portfolio/components ./
cp -r path/to/cinematic-portfolio/app ./

npm install three
npm run dev
```

---

## File structure

```
app/
  layout.jsx          ← Root layout + global CSS
  page.jsx            ← Entry: mounts VideoIntro
  globals.css

components/
  VideoIntro/
    VideoIntro.jsx    ← Hero component (video, copy, controls, scroll indicator)
    VideoIntro.module.css

  CinematicLayer/
    CinematicLayer.jsx        ← Three.js particle bokeh (dynamic import, SSR-safe)
    CinematicLayer.module.css
```

---

## Adding your video

1. Place your talking-head video at `public/video/hero.mp4`
2. Recommended format: H.264 MP4, 1080p, ~10 MB max for fast load
3. The component uses the same file for both the foreground and blurred ambient layer

```jsx
<VideoIntro videoSrc="/video/hero.mp4" />
```

---

## Customising content

Pass props to `VideoIntro`:

| Prop          | Default                                              | Description                       |
|---------------|------------------------------------------------------|-----------------------------------|
| `videoSrc`    | `/video/hero.mp4`                                    | Path to your video                |
| `firstName`   | `Devansh`                                            | First name (white)                |
| `lastName`    | `Durgapal`                                           | Last name (orange accent)         |
| `tagline`     | `Full-Stack AI Engineer · Builder · Creator`         | Small uppercase tagline           |
| `role`        | `Deep Learning · NLP · Generative AI`                | Main role line                    |
| `roleDetail`  | `Building intelligent systems...`                    | Sub-role description              |
| `onScrollNext`| `undefined` (defaults to `window.scrollBy`)          | Custom scroll handler             |

---

## Particle system

`CinematicLayer` uses Three.js with:
- **360 particles** — warm orange, warm white, cool blue
- **Additive blending** for dreamy glow
- **Sine-wave oscillation** for slow floating
- **Mouse parallax** (35ms lag for cinematic smoothness)
- **Proper disposal** on unmount

Tweak `PARTICLE_COUNT` and the color ratios inside `CinematicLayer.jsx` to adjust density/mood.

---

## Performance notes

- `CinematicLayer` is `dynamic`-imported with `ssr: false` — no hydration cost
- `devicePixelRatio` is capped at 1.5 to limit GPU fill rate
- Particle count is conservative; bump to 500–600 for desktop-only
- Videos use `muted` + `playsInline` for iOS autoplay compliance
