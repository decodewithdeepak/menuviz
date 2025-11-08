# MenuViz - AI-Powered Menu Visualization

Transform your menu descriptions into stunning food imagery with AI. Create professional menu visuals in seconds using Google Gemini.

## 🚀 Features

- **AI Prompt Enhancement** - Transform simple descriptions into detailed, professional prompts
- **AI Image Generation** - Generate high-quality food images using Gemini 2.5 Flash Image
- **Style Presets** - Choose from Photorealistic, Artistic, Minimalist, or Rustic styles
- **Modern UI** - Beautiful, responsive interface built with Next.js 16 and Tailwind CSS 4
- **Dashboard** - Manage your generated images, view history, and customize settings

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **AI Integration:** Vercel AI SDK + Google Gemini API
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)

## 📋 Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Google Gemini API Key

## 🔧 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd what-an-aidea
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```bash
# Copy from env.example
cp env.example .env.local
```

Add your Google Gemini API key:
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

Get your API key from: [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 Usage

1. **Landing Page** - Visit the home page to learn about MenuViz
2. **Sign Up/Login** - Create an account or sign in
3. **Dashboard** - Access the main generation interface
4. **Generate Images**:
   - Enter a menu item description (e.g., "Gourmet burger with cheese")
   - Click "Enhance with AI" to improve your prompt
   - Select a style preset
   - Click "Generate Image"
   - Download or regenerate as needed

## 📁 Project Structure

```
what-an-aidea/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── api/                 # API routes
│   │   ├── enhance-prompt/  # Prompt enhancement endpoint
│   │   └── generate-image/  # Image generation endpoint
│   ├── dashboard/           # Dashboard pages
│   │   ├── page.tsx         # Main generation page
│   │   ├── gallery/         # Image gallery
│   │   ├── history/         # Generation history
│   │   └── settings/        # User settings
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── dashboard/           # Dashboard components
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── landing-*.tsx        # Landing page sections
├── env.example              # Environment variables example
└── ASSIGNMENT.md            # Project requirements
```

## 🔑 API Integration

### Prompt Enhancement
- **Model:** Gemini 2.0 Flash
- **Endpoint:** `/api/enhance-prompt`
- **Function:** Transforms simple descriptions into detailed prompts

### Image Generation
- **Model:** Gemini 2.5 Flash Image
- **Endpoint:** `/api/generate-image`
- **Function:** Generates high-quality food images

Both APIs use the **Vercel AI SDK** for clean, type-safe integration.

## ⚠️ Important Notes

### API Quota Limits
The free tier has daily and per-minute limits. If you exceed the quota:
- Wait 1-2 minutes before retrying
- Consider upgrading to a paid tier for production use
- Monitor usage at: https://ai.dev/usage?tab=rate-limit

### Environment Variables
Never commit your `.env.local` file to version control. Always use the `env.example` template.

## 🎨 Customization

### Style Presets
Modify style enhancements in `app/api/generate-image/route.ts`:
```typescript
const styleEnhancements = {
  photorealistic: "...",
  artistic: "...",
  minimalist: "...",
  rustic: "...",
};
```

### Theme Colors
Update colors in `app/globals.css`:
```css
:root {
  --primary: oklch(0.65 0.25 45); /* Orange theme */
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
Ensure you set the `GOOGLE_GENERATIVE_AI_API_KEY` environment variable.

## 📝 License

This project is part of an assignment. See `ASSIGNMENT.md` for details.

## 🤝 Contributing

This is an assignment project. For questions or issues, please contact the project maintainer.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel AI SDK](https://sdk.vercel.ai/)
- [Google Gemini API](https://ai.google.dev/)

---

**Built with ❤️ using Next.js 16, Tailwind CSS 4, and Google Gemini AI**
