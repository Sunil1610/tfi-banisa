# 🏠 Local Development Setup Guide

Complete guide to run Telugu Cinema Hub on your local machine.

---

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (you have this ✅)
- Cloudinary account (you have this ✅)

---

## 🚀 Step-by-Step Setup

### Step 1: Create .env File

Create a `.env` file in the root directory (`/home/user/tfi-banisa/.env`):

```bash
# Supabase Database
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.doivmztuenxeunclfcwp.supabase.co:5432/postgres"

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Application URL (for local development)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Node Environment
NODE_ENV="development"
```

**Important:** Replace the placeholders:
- `[YOUR-PASSWORD]` - Your Supabase database password
- `your-cloud-name` - From Cloudinary dashboard
- `your-api-key` - From Cloudinary dashboard
- `your-api-secret` - From Cloudinary dashboard

---

### Step 2: Install Dependencies

```bash
# Install all npm packages
npm install
```

This will:
- Install all dependencies from package.json
- Automatically run `prisma generate` (via postinstall script)
- Generate TypeScript types for database models

Expected output:
```
added XXX packages in XXs
✔ Generated Prisma Client
```

---

### Step 3: Set Up Database Schema

Push the Prisma schema to your Supabase database:

```bash
npm run db:migrate
```

This command runs: `prisma db push --accept-data-loss`

What it does:
- Creates all tables in your Supabase database
- Sets up relationships and indexes
- Creates: Movie, Song, Product, GameStats, DailyChallenge, etc.

Expected output:
```
🚀 Your database is now in sync with your Prisma schema
✔ Generated Prisma Client
```

---

### Step 4: Seed the Database

Populate the database with initial data:

```bash
npm run db:seed
```

This will add:
- Sample Telugu movies
- Movie songs with audio segments
- Store products (posters, apparel, collectibles)
- Initial game statistics
- Daily challenges
- Daily recommendations

Expected output:
```
🌱 Starting database seed...
✅ Seeded X movies
✅ Seeded X songs
✅ Seeded X products
✅ Seeded X recommendations
🎉 Database seeded successfully!
```

---

### Step 5: Start Development Server

```bash
npm run dev
```

This starts Next.js development server on port 3000.

Expected output:
```
  ▲ Next.js 14.2.15
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

✓ Ready in 2.3s
```

---

### Step 6: Open in Browser

Open your browser and navigate to:

**🌐 http://localhost:3000**

You should see the Telugu Cinema Hub homepage!

---

## ✅ Test These Features

### 1. Homepage
- [ ] Homepage loads correctly
- [ ] Navigation menu works
- [ ] Hero section displays
- [ ] Responsive on mobile

### 2. Katha Vintaava Game
- [ ] Navigate to "Games" → "Katha Vintaava"
- [ ] Click "Start Game"
- [ ] Movie clues appear progressively
- [ ] Can submit guesses
- [ ] Statistics track correctly
- [ ] Daily challenge works

### 3. Saregamapa Game
- [ ] Navigate to "Games" → "Saregamapa"
- [ ] Click "Start Game"
- [ ] Audio plays when clicking play button
- [ ] Can submit song guesses
- [ ] Progressive reveals work
- [ ] Statistics saved

### 4. Fandom Section
- [ ] Browse movies page loads
- [ ] Movie cards display with images
- [ ] Click on a movie to see details
- [ ] Search and filter work
- [ ] Genre filtering works

### 5. Store Section
- [ ] Store page loads
- [ ] Product cards display with images from Cloudinary
- [ ] Filter by category works
- [ ] Product details show correctly

### 6. Recommendations Section
- [ ] Daily recommendation shows
- [ ] Can add to watchlist
- [ ] Archive page shows past recommendations
- [ ] Mark as watched functionality works

---

## 🔍 Verify Database Connection

To verify your database is properly set up:

```bash
# Open Prisma Studio (visual database editor)
npx prisma studio
```

This opens a web interface at http://localhost:5555 where you can:
- View all tables
- Browse seeded data
- Edit records
- Run queries

---

## 📊 Project Structure Check

Verify your project structure:

```bash
# Check if all key directories exist
ls -la app/
ls -la components/
ls -la lib/
ls -la prisma/
ls -la public/
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module '@prisma/client'"

**Solution:**
```bash
npx prisma generate
```

### Issue: "Database connection error"

**Check:**
1. Is your .env file created with correct credentials?
2. Is the DATABASE_URL correct?
3. Is your Supabase database active? (Check dashboard)
4. Try the connection string with direct connection (port 5432)

**Test connection:**
```bash
# This should work without errors
npx prisma db push
```

### Issue: "Module not found" errors

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Issue: Images not loading (Cloudinary)

**Check:**
1. Verify Cloudinary credentials in .env
2. Ensure images are uploaded to Cloudinary
3. Check browser console for errors
4. Verify cloud name matches exactly (case-sensitive)

### Issue: Audio not playing (Saregamapa)

**Check:**
1. Audio files are in Cloudinary
2. Browser allows audio playback (some browsers block autoplay)
3. Check browser console for errors
4. Try clicking play button instead of autoplay

---

## 🔧 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:migrate       # Push schema changes
npm run db:seed          # Seed database
npx prisma studio        # Visual database editor
npx prisma db pull       # Pull schema from database
npx prisma db push       # Push schema to database

# Code Quality
npm run lint             # Run ESLint
npm run build            # Test production build

# Prisma
npx prisma generate      # Generate Prisma Client
npx prisma format        # Format schema file
npx prisma validate      # Validate schema

# Clear Cache (if needed)
rm -rf .next             # Clear Next.js cache
```

---

## 📝 Environment Variables Reference

```bash
# Required for local development
DATABASE_URL                      # Supabase PostgreSQL connection string
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME # Cloudinary cloud name
CLOUDINARY_API_KEY                # Cloudinary API key
CLOUDINARY_API_SECRET             # Cloudinary API secret
NEXT_PUBLIC_APP_URL              # http://localhost:3000 (local)
NODE_ENV                          # development (local)
```

---

## 🎯 Next Steps After Local Testing

Once everything works locally:

1. ✅ Test all features thoroughly
2. ✅ Verify database operations
3. ✅ Check image loading (Cloudinary)
4. ✅ Test audio playback
5. ✅ Test on mobile (responsive design)
6. 🚀 Deploy to Vercel (follow DEPLOYMENT.md)

---

## 📚 Additional Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Supabase Docs:** https://supabase.com/docs
- **Cloudinary Docs:** https://cloudinary.com/documentation

---

**Happy coding! 🎉**

If you encounter any issues, check the troubleshooting section or refer to DEPLOYMENT.md for more details.
