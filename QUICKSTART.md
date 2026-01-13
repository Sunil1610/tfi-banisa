# 🚀 Quick Start - Deploy to Vercel in 10 Minutes

Fast-track guide to get Telugu Cinema Hub live on Vercel.

---

## ⚡ Prerequisites (5 minutes)

### 1. Get Supabase Database URL
- Go to [Supabase Dashboard](https://app.supabase.com) → Your Project
- **Settings** → **Database** → **Connection String** → **URI** tab
- Copy and replace `[YOUR-PASSWORD]` with your actual password
- Should look like: `postgresql://postgres.doivmztuenxeunclfcwp:YourPass@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true`

### 2. Get Cloudinary Credentials
- Sign up at [cloudinary.com](https://cloudinary.com)
- Copy from Dashboard: **Cloud Name**, **API Key**, **API Secret**

---

## 🚀 Deploy (5 minutes)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin claude/vercel-deployment-plan-RbXMv
```

### Step 2: Import to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your repository: `Sunil1610/tfi-banisa`
3. Click **Import**

### Step 3: Add Environment Variables

Add these in Vercel's import screen:

```bash
DATABASE_URL="postgresql://postgres.doivmztuenxeunclfcwp:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_APP_URL="https://your-project.vercel.app"
```

### Step 4: Deploy
- Click **Deploy**
- Wait 2-3 minutes ⏱️
- Get your URL: `https://tfi-banisa.vercel.app` 🎉

### Step 5: Seed Database
```bash
# Create .env locally with your DATABASE_URL
echo 'DATABASE_URL="your-supabase-url"' > .env

# Seed the database
npm run db:seed
```

---

## ✅ Done!

Your app is live! Test these features:
- ✅ Homepage
- ✅ Katha Vintaava game
- ✅ Saregamapa song game
- ✅ Fandom movies
- ✅ Store products
- ✅ Recommendations

---

## 🌐 Add Custom Domain (Optional)

1. **Vercel Dashboard** → **Settings** → **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `telugucinemahub.com`)
4. Follow DNS instructions from Vercel
5. Update `NEXT_PUBLIC_APP_URL` to your custom domain
6. Redeploy

**Free on Vercel!** ✨

---

## 📚 Need More Details?

- Full guide: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- Database setup: See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- Troubleshooting: Check deployment guide

---

## 🆘 Quick Troubleshooting

**Build fails?**
- Check all environment variables are set
- Verify DATABASE_URL is correct

**Database connection error?**
- Verify password in DATABASE_URL
- Check Supabase database is active

**Images not loading?**
- Verify Cloudinary credentials
- Check cloud name is correct

**Still stuck?**
- Check Vercel Function logs
- Review full DEPLOYMENT.md guide

---

**Ready? Let's deploy! 🚀**
