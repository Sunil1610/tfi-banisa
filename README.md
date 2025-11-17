# Telugu Cinema Hub

A minimal, clean web application for Telugu cinema enthusiasts featuring games, fandom pages, merchandise store, and daily movie recommendations.

## Features

### Games
- **Katha Vintaava:** A movie guessing game where you have 6 chances to guess a Telugu movie title. With each incorrect guess, a new clue (like the year, cast, or director) is revealed.
- **Saregamapa:** A song guessing game where you listen to a 5-second audio clip and guess the song. With each incorrect guess, 5 more seconds of the song are unlocked.

### Fandom
- Browse Telugu movies by category (Classics, Recent, Upcoming)
- Detailed movie pages with comprehensive information
- Search and filter functionality

### Store
- Browse movie-specific merchandise
- Product categories (Posters, Apparel, Collectibles)

### Recommendations
- Daily curated movie recommendations
- Watchlist functionality

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom minimal design system
- **Database:** Prisma ORM (PostgreSQL)
- **State Management:** Zustand
- **Audio:** Howler.js
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/tfi-banisa.git
   cd tfi-banisa
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Copy `.env.example` to `.env.local` and update with your configuration:

   ```bash
   cp .env.example .env.local
   ```

   Update the following variables:
   - `DATABASE_URL`: Your PostgreSQL database URL
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name (for media storage)
   - `CLOUDINARY_API_KEY`: Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Cloudinary API secret

4. **Initialize the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Vercel

This application is designed for easy deployment on Vercel.

1. **Push your code to a Git repository** (e.g., GitHub, GitLab, Bitbucket).

2. **Import your project on Vercel.**

3. **Configure Environment Variables:**
   In the Vercel project settings, add the environment variables from your `.env.local` file.

4. **Deploy.**
   Vercel will automatically build and deploy your application.

## Project Structure

```
telugu-cinema-hub/
├── app/                    # Next.js app directory
│   ├── games/             # Game routes
│   ├── fandom/            # Fandom routes
│   ├── store/             # Store routes
│   ├── recommendations/   # Recommendations routes
│   └── api/               # API routes
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── ui/               # UI components
│   ├── games/            # Game components
│   ├── fandom/           # Fandom components
│   ├── store/            # Store components
│   └── recommendations/  # Recommendation components
├── lib/                   # Utility libraries
│   ├── db/               # Database utilities
│   ├── utils/            # Helper functions
│   └── constants/        # Constants
├── hooks/                 # React hooks
├── store/                 # Zustand stores
├── types/                 # TypeScript types
└── prisma/               # Prisma schema and migrations
```

## Development Plan

See [dev_plan.md](./dev_plan.md) for the complete implementation plan and phases.

## License

MIT