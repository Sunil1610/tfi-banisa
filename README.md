# Tollywood Reels & Rhythms

A web application for guessing Telugu movies and songs.

## Features

- **Katha Vintaava:** A movie guessing game where you have 6 chances to guess a Telugu movie title. With each incorrect guess, a new clue (like the year, cast, or director) is revealed.
- **Saregamapa:** A song guessing game where you listen to a 5-second audio clip and guess the song. With each incorrect guess, 5 more seconds of the song are unlocked.

## Tech Stack

- **Framework:** Next.js (React) with TypeScript
- **Styling:** Bootstrap and React-Bootstrap
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
   Create a file named `.env.local` in the root of the project and add the following environment variables. You will need to obtain API keys from the respective services.

   ```
   OMDB_API_KEY=your_omdb_api_key
   GOOGLE_API_KEY=your_google_api_key
   GOOGLE_CX=your_google_cx
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Vercel

This application is designed for easy deployment on Vercel.

1. **Push your code to a Git repository** (e.g., GitHub, GitLab, Bitbucket).

2. **Import your project on Vercel.**

3. **Configure Environment Variables:**
   In the Vercel project settings, add the same environment variables as in your `.env.local` file.

4. **Deploy.**
   Vercel will automatically build and deploy your application.