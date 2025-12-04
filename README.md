# MenuViz - AI-Powered Menu Visualization

[![Live Demo](https://img.shields.io/badge/Live-Demo-orange?style=for-the-badge&logo=vercel)](https://menuviz.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/decodewithdeepak/menuviz)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> Transform menu descriptions into stunning food imagery using Google Gemini AI

![MenuViz Hero](./public/hero-mockup.webp)

---

## 🎯 Project Overview

MenuViz is an AI Creative Studio built for restaurants to generate professional food images, menus, posters, and branding assets. No photography or design skills needed - just describe your vision and let AI create appetizing visuals for your business.

**Business Use Case:** Restaurants - Menu Visualizer

---

## ✨ Features Implemented

### Core Features ✅

- **AI Creative Suite**
  - **Food Generator:** Create stunning food photography from text
  - **Photo Enhancer:** Enhance real food photos using AI analysis
  - **Menu Maker:** Design digital menus with AI-generated visuals
  - **Ad Poster Generator:** Create promotional posters for marketing
  - **Logo Creator:** Design professional restaurant logos
  - **Packaging Designer:** Visualize branding on takeout packaging

- **Smart Tools**
  - **AI Prompt Enhancement:** One-click optimization for better results
  - **"Surprise Me" Buttons:** Instant creative inspiration with random prompts
  - **Style Presets:** Photorealistic, Artistic, Minimalist, Rustic styles

### Bonus Features ✅

- **Dashboard Stats:** Track usage and generation metrics
- **Image Gallery:** Filter, sort, and paginate through your creations
- **Generation History:** Complete audit trail with status tracking
- **Tips & Guide:** Comprehensive guide for best results
- **User Settings:** Profile management and custom API keys
- **Database Integration:** All data securely saved to Supabase PostgreSQL

---

## 🛠️ Tech Stack

| Category           | Technology                    |
| ------------------ | ----------------------------- |
| **Framework**      | Next.js 16 (App Router)       |
| **Language**       | TypeScript                    |
| **Styling**        | Tailwind CSS 4                |
| **UI Components**  | shadcn/ui                     |
| **Database**       | Supabase (PostgreSQL)         |
| **Authentication** | Supabase Auth                 |
| **AI Integration** | Vercel AI SDK + Google Gemini |
| **Deployment**     | Vercel                        |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Google Gemini API Key
- Supabase Account

### 1. Clone Repository

```bash
git clone https://github.com/decodewithdeepak/menuviz.git
cd menuviz
npm install
```

### 2. Set Up Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase/schema.sql`
3. Get credentials from **Project Settings → API**
4. Enable Google OAuth in **Authentication → Providers** (optional)
5. Add redirect URL: `http://localhost:3000/auth/callback`

### 3. Configure Environment

Create `.env` file:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Get API Keys:**

- Gemini: [Google AI Studio](https://makersuite.google.com/app/apikey)
- Supabase: Project Settings → API

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🚧 Challenges & Solutions

### Challenge 1: Google OAuth Redirect Issues

**Problem:** Users remained on login page after OAuth  
**Solution:** Moved OAuth logic to client-side with proper redirect URL configuration

### Challenge 2: Gemini API Quota Limits

**Problem:** Free tier has rate limits  
**Solution:** Implemented proper error handling with user-friendly messages and retry suggestions

### Challenge 3: Image Storage

**Problem:** Large base64 images in database  
**Solution:** Store as data URLs for MVP; production would use Supabase Storage

### Challenge 4: Next.js 16 Middleware Migration

**Problem:** `middleware.ts` deprecated  
**Solution:** Migrated to `proxy.ts` with proper session management

### Challenge 5: Enhanced Prompt Persistence Bug

**Problem:** When generating multiple images sequentially, the enhanced prompt from the previous generation was persisting and being used instead of the new user input. For example:

- User generates "pasta" with enhancement → Works ✅
- User types "sweet corn" and clicks generate → Still generates pasta ❌

**Solution Implemented:**

1. **Auto-clear on input change** - Enhanced prompt is cleared when user starts typing new text
2. **Visual feedback** - Generate button text changes to "Generate Image with AI Enhanced Prompt" when an enhanced prompt is active
3. **Text field update** - Enhanced prompt replaces the text field content so users can see and edit what will be used

**Result:** Clean, predictable behavior with clear visual feedback about which prompt will be used

---

## 🙏 Acknowledgments

- **Google Gemini** for AI capabilities
- **Supabase** for backend infrastructure
- **Vercel** for hosting and AI SDK
- **shadcn/ui** for beautiful components

---

**Built with ❤️ using Next.js 16, TypeScript, Tailwind CSS 4, and Google Gemini AI**
