# Ziyaad Adams — Portfolio 2026

Personal portfolio for Ziyaad Adams, Senior Salesforce Engineer based in Cape Town 🇿🇦.

Built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, **GSAP**, and **shadcn/ui**.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion + GSAP |
| Font | Space Grotesk (next/font/google) |
| Deployment | Vercel |

## Features

- Hexagon grid background with interactive cyan glow on hover
- 20-dot snake cursor with SVG goo filter (GSAP-driven)
- Animated hero with staggered word reveal
- Full resume layout — About, Projects, Services, Experience, Contact
- 10 enterprise Salesforce project cards with company logos
- 3 freelance / side project cards
- Consistent shadcn/ui Card, Badge, and Button components throughout

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Logos

Company logo SVGs live in `/public/logos/`. To swap in real brand logos, replace the SVG files with PNG files of the same name — the `<img>` tags will pick them up automatically.

## Deployment

Deployed to Vercel. Push to `main` to trigger a production build.

```bash
npm run build   # verify build locally before pushing
```
