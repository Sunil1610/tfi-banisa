# Tollywood Reels & Rhythms

An interactive web application that tests your knowledge of Telugu cinema through engaging guessing games. Challenge yourself with movie clues and song clips from Tollywood's finest collection.

## Product Overview

**Tollywood Reels & Rhythms** is a quiz platform designed for Telugu cinema enthusiasts, offering two distinct game modes that celebrate the rich heritage of Tollywood films and music. Whether you're a casual movie fan or a dedicated cinephile, this application provides an entertaining way to test and expand your knowledge of Telugu cinema.

### Target Audience
- Telugu cinema enthusiasts and movie buffs
- Music lovers who enjoy Telugu film songs
- Fans looking for interactive entertainment
- Anyone interested in Tollywood culture and heritage

## Features

### 🎬 Katha Vintaava (Movie Quiz)
A progressive clue-based movie guessing game where players have 6 attempts to identify a Telugu movie title. The game reveals helpful clues with each incorrect guess, making it both challenging and educational.

**How It Works:**
- 6 chances to guess the correct Telugu movie title
- Progressive clue reveal system:
  - Initial hint about the movie
  - Release year
  - Lead cast members
  - Director information
  - Additional contextual clues
  - Final hint
- Smart input validation with spelling variation support
- Real-time feedback on guesses
- Score tracking and game statistics

### 🎵 Saregamapa (Song Quiz)
An audio-based guessing game where players identify Telugu songs from progressively longer audio clips.

**How It Works:**
- Listen to a 5-second audio clip from a Telugu movie song
- Guess the song title
- Each incorrect guess unlocks 5 additional seconds of audio
- Audio player with play/pause controls
- Visual progress indicator showing unlocked duration
- Score tracking and attempt history

## Requirements

### Functional Requirements

#### Core Gameplay
- Progressive difficulty system with clue reveals
- Multiple game modes (Movie and Song quizzes)
- Real-time score tracking and statistics
- Input validation and spell-check tolerance
- Win/loss detection and appropriate feedback
- Game state persistence using browser localStorage

#### User Interface
- Responsive design for mobile, tablet, and desktop
- Tab-based navigation between game modes
- Dark mode support with theme toggle
- Animated transitions and micro-interactions
- Accessible UI with keyboard navigation support
- Clean, modern aesthetic using shadcn/ui components

#### Data Management
- Movie database with comprehensive metadata
- Song library with audio files and metadata
- Daily challenge system (future enhancement)
- User statistics and game history
- Share functionality for social media

### Technical Requirements

#### Frontend
- **Framework:** Next.js 15+ (React 19+)
- **Language:** TypeScript 5+
- **Styling:** Tailwind CSS 4+
- **UI Components:** shadcn/ui with Radix UI primitives
- **Icons:** Lucide React
- **State Management:** React Context API

#### Backend/APIs
- **Movie Data:** OMDB API for movie metadata
- **Image Search:** Google Custom Search API
- **Audio Storage:** Local or cloud-based storage solution
- **Environment:** Node.js 18+

#### Performance
- Page load time < 2 seconds
- Lighthouse performance score > 90
- Responsive audio streaming
- Optimized image delivery (WebP/AVIF)
- Lazy loading for media assets

#### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

#### Accessibility
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation support
- High contrast mode
- Reduced motion preferences
- Proper ARIA labels and semantic HTML

### Non-Functional Requirements

#### Security
- Secure API key management using environment variables
- No sensitive data in client-side code
- HTTPS enforcement in production
- Rate limiting for API calls

#### Scalability
- Efficient data fetching with caching strategies
- Optimized bundle size (<500KB initial load)
- CDN-based asset delivery
- Support for growing movie/song database

#### Maintainability
- Clean, documented code with TypeScript
- Component-based architecture
- Consistent coding standards (ESLint)
- Version control with Git
- Comprehensive error handling

## Tech Stack

- **Framework:** Next.js 15.5+ (React 19+) with TypeScript 5+
- **Styling:** Tailwind CSS 4+ with shadcn/ui components
- **UI Library:** Radix UI primitives, Lucide React icons
- **State Management:** React Context API
- **APIs:** OMDB API (movie data), Google Custom Search API (images)
- **Deployment:** Vercel
- **Package Manager:** npm

## Getting Started

### Prerequisites

- **Node.js:** v18 or later
- **npm:** v9 or later (comes with Node.js)
- **Git:** For version control
- **API Keys:**
  - OMDB API key (get from [omdbapi.com](https://www.omdbapi.com/apikey.aspx))
  - Google API key and Custom Search Engine ID (get from [Google Cloud Console](https://console.cloud.google.com/))

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