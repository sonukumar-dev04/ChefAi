# ChefAI 🍳

AI-powered recipe app that suggests recipes based on the ingredients you already have at home.

🔗 **Live:** [chef-ai-lilac.vercel.app](https://chef-ai-lilac.vercel.app/)

## Features
- AI-generated recipe suggestions based on pantry ingredients (Gemini AI)
- Recipe data from MealDB API
- Authentication with Clerk
- Bot/rate-limit protection with Arcjet
- Export recipes as PDF
- Nutritional breakdown per recipe

## Tech Stack
**Frontend:** Next.js (App Router), Tailwind CSS, shadcn/ui
**Backend/CMS:** Strapi (headless CMS)
**Database:** Neon Postgres
**Auth:** Clerk
**AI:** Google Gemini AI
**Deployment:** Vercel

## Folder Structure

├── frontend/ # Next.js app
├── backend/ # Strapi CMS

## Getting Started
```bash
git clone https://github.com/sonukumar-dev04/ChefAi.git
cd frontend
npm install
npm run dev
```

Set up your `.env` with the required API keys (Clerk, Gemini AI, Neon DB, Arcjet).
