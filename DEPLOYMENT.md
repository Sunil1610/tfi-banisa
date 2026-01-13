# Deployment Guide - Telugu Cinema Hub

Complete guide for deploying the Telugu Cinema Hub to Vercel with Supabase PostgreSQL database.

## 🎯 Prerequisites

- [x] GitHub account
- [x] Vercel account (free tier)
- [x] Supabase account (already set up)
- [ ] Cloudinary account (for images)
- [ ] Custom domain (optional)

---

## 📋 Step 1: Get Supabase Database Connection String

You already have your Supabase project set up. Now get the PostgreSQL connection string:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to: **Project Settings** → **Database**
4. Scroll down to **Connection String** section
5. Select **URI** tab
6. Copy the connection string (looks like this):
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
7. **IMPORTANT:** Replace `[YOUR-PASSWORD]` with your actual database password

**Connection String Format:**
```
postgresql://postgres.doivmztuenxeunclfcwp:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

⚠️ **Security Note:** Keep this connection string private! Never commit it to Git.

---

## 📋 Step 2: Set Up Cloudinary (Image Hosting)

1. Sign up at [Cloudinary](https://cloudinary.com) (free tier)
2. After signup, go to **Dashboard**
3. Copy these credentials:
   - **Cloud Name** (e.g., `dxy123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz`)

---

## 📋 Step 3: Prepare Environment Variables

You'll need these environment variables for Vercel:

```bash
# Database (from Supabase)
DATABASE_URL="postgresql://postgres.doivmztuenxeunclfcwp:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Cloudinary (from Cloudinary Dashboard)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Application URL (update after deployment)
NEXT_PUBLIC_APP_URL="https://your-app.vercel.app"

# Node Environment (Vercel sets this automatically)
NODE_ENV="production"
```

---

## 🚀 Step 4: Deploy to Vercel

### Method A: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin claude/vercel-deployment-plan-RbXMv
   ```

2. **Import Project to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click **"Import Git Repository"**
   - Select your GitHub repository: `Sunil1610/tfi-banisa`
   - Click **"Import"**

3. **Configure Project:**
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** `./` (leave default)
   - **Build Command:** `npm run build` (leave default)
   - **Output Directory:** `.next` (leave default)
   - **Install Command:** `npm install` (leave default)

4. **Add Environment Variables:**

   Click **"Environment Variables"** and add each one:

   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | Your Supabase connection string |
   | `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
   | `CLOUDINARY_API_KEY` | Your Cloudinary API key |
   | `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
   | `NEXT_PUBLIC_APP_URL` | `https://your-project-name.vercel.app` (update after deployment) |

   **Pro tip:** Leave `NEXT_PUBLIC_APP_URL` empty for now, you'll update it after first deployment.

5. **Deploy:**
   - Click **"Deploy"**
   - Wait 2-3 minutes for build to complete
   - You'll get a URL like: `https://tfi-banisa.vercel.app`

6. **Update Environment Variable:**
   - Go to **Project Settings** → **Environment Variables**
   - Edit `NEXT_PUBLIC_APP_URL` to your actual Vercel URL
   - **Redeploy** (Deployments → three dots → Redeploy)

### Method B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 🗄️ Step 5: Initialize Database

After successful deployment, your database schema will be automatically pushed (thanks to the build script), but you need to **seed the database** with initial data.

### Option A: Seed from Local Machine

1. Create a `.env` file locally with your production `DATABASE_URL`:
   ```bash
   DATABASE_URL="your-supabase-connection-string"
   ```

2. Run seed script:
   ```bash
   npm run db:seed
   ```

### Option B: Seed via Vercel CLI

```bash
# Set environment variable
export DATABASE_URL="your-supabase-connection-string"

# Run seed
npm run db:seed
```

### Option C: Create Seed API Route (Advanced)

Create a protected API route to trigger seeding from the browser (recommended for production).

---

## 🌐 Step 6: Configure Custom Domain (Optional)

### YES! Custom domains are FREE on Vercel

1. **Add Domain in Vercel:**
   - Go to **Project Settings** → **Domains**
   - Click **"Add Domain"**
   - Enter your domain (e.g., `telugucinemahub.com`)
   - Click **"Add"**

2. **Configure DNS (Choose one method):**

#### Method A: Use Vercel Nameservers (Recommended)

Vercel will show you nameservers like:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

Go to your domain registrar (GoDaddy, Namecheap, etc.) and:
- Find **Nameserver** settings
- Replace existing nameservers with Vercel's nameservers
- Save changes
- Wait 5 minutes to 48 hours for DNS propagation

#### Method B: Add DNS Records

Add these records in your domain registrar's DNS settings:

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For apex domain (@):**
```
Type: A
Name: @
Value: 76.76.21.21
```

3. **Verify Domain:**
   - Vercel will automatically verify ownership
   - SSL certificate is automatically provisioned
   - Your site will be live on your custom domain!

4. **Update Environment Variable:**
   - Go to **Project Settings** → **Environment Variables**
   - Update `NEXT_PUBLIC_APP_URL` to `https://your-custom-domain.com`
   - Redeploy

---

## ✅ Step 7: Post-Deployment Checklist

Test all features after deployment:

- [ ] Homepage loads correctly
- [ ] **Katha Vintaava** game works (movie guessing)
- [ ] **Saregamapa** game works (song audio plays)
- [ ] **Fandom** section shows movies
- [ ] **Store** section shows products
- [ ] **Recommendations** section works
- [ ] Daily challenges function
- [ ] Images load from Cloudinary
- [ ] Mobile responsive design works
- [ ] SSL certificate is active (🔒 in browser)
- [ ] Custom domain works (if configured)

---

## 🔧 Troubleshooting

### Build Fails: "Cannot find module '@prisma/client'"

**Solution:** The `postinstall` script should handle this, but if it fails:
```bash
# In package.json, ensure postinstall exists:
"postinstall": "prisma generate"
```

### Database Connection Error

**Symptoms:** API routes return 500 errors, Prisma client errors

**Solutions:**
1. Verify `DATABASE_URL` is correctly set in Vercel environment variables
2. Check Supabase database is running (should be green in dashboard)
3. Verify connection string format includes `?pgbouncer=true`
4. Ensure password in connection string is correct
5. Check Vercel Function logs: **Project** → **Logs**

### Images Not Loading

**Solutions:**
1. Verify Cloudinary credentials are set
2. Check `next.config.js` includes `res.cloudinary.com` in image domains
3. Upload test images to Cloudinary
4. Check browser console for errors

### Audio Not Playing (Saregamapa Game)

**Solutions:**
1. Verify audio files are uploaded to Cloudinary
2. Check browser console for CORS errors
3. Ensure audio URLs are accessible
4. Test on different browsers (some block autoplay)

### API Routes Return 404

**Solution:** Clear Vercel cache and redeploy:
- **Deployments** → **...** → **Redeploy** → Check **"Clear cache"**

---

## 📊 Monitoring & Analytics

### Vercel Dashboard

Monitor your application:
- **Deployments:** View deployment history
- **Logs:** Real-time function logs
- **Analytics:** Traffic and performance (free 3k events/month)
- **Speed Insights:** Core Web Vitals

### Supabase Dashboard

Monitor database:
- **Table Editor:** View and edit data
- **SQL Editor:** Run custom queries
- **Database:** Monitor connections and performance
- **Logs:** Database query logs

---

## 🎉 Success!

Your Telugu Cinema Hub is now live! 🚀

**Next Steps:**
1. Share your URL with users
2. Monitor analytics and logs
3. Add Vercel Analytics (optional):
   ```bash
   npm install @vercel/analytics
   ```
4. Set up continuous deployment (auto-deploys on git push)

---

## 📞 Support

- **Vercel Issues:** https://vercel.com/support
- **Supabase Issues:** https://supabase.com/support
- **Project Issues:** https://github.com/Sunil1610/tfi-banisa/issues

---

## 🔒 Security Reminders

- ✅ Never commit `.env` files to Git
- ✅ Use environment variables for all secrets
- ✅ Rotate API keys periodically
- ✅ Enable Row Level Security (RLS) in Supabase
- ✅ Use HTTPS only (Vercel handles this)
- ✅ Keep dependencies updated: `npm audit`

---

**Deployment Date:** 2026-01-13
**Framework:** Next.js 14
**Database:** Supabase PostgreSQL
**Hosting:** Vercel
**Region:** Mumbai (bom1)
