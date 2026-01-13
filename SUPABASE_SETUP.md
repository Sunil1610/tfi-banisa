# Supabase Database Setup

Quick reference for getting your Supabase PostgreSQL connection string.

## Your Supabase Project Info

**Project URL:** `https://doivmztuenxeunclfcwp.supabase.co`
**Project Reference:** `doivmztuenxeunclfcwp`

## 🔑 Getting Your DATABASE_URL

### Step 1: Access Database Settings

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (doivmztuenxeunclfcwp)
3. Click **Settings** (⚙️ icon in sidebar)
4. Click **Database** in the left menu

### Step 2: Find Connection String

1. Scroll down to **Connection String** section
2. You'll see multiple tabs: **Postgres**, **URI**, **JDBC**, etc.
3. Click the **URI** tab
4. Copy the connection string

### Step 3: Get Your Database Password

⚠️ **Important:** The connection string shows `[YOUR-PASSWORD]` as a placeholder.

**If you remember your password:**
- Replace `[YOUR-PASSWORD]` with your actual password

**If you forgot your password:**
1. In Database settings, scroll to **Database Password**
2. Click **Reset Database Password**
3. Set a new password
4. Save the password securely
5. Use this new password in your connection string

### Step 4: Format for Vercel

Your final `DATABASE_URL` should look like this:

```
postgresql://postgres.doivmztuenxeunclfcwp:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Example (with fake password):**
```
postgresql://postgres.doivmztuenxeunclfcwp:MySecurePass123!@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

### Step 5: Important Connection Settings

Your connection string should include:
- ✅ `?pgbouncer=true` at the end (for connection pooling)
- ✅ Port `6543` (for Supabase pooler)
- ✅ Transaction mode for Prisma compatibility

**Alternative for Direct Connection (if pooler doesn't work):**
```
postgresql://postgres:[YOUR-PASSWORD]@db.doivmztuenxeunclfcwp.supabase.co:5432/postgres
```

This uses:
- Port `5432` (direct connection, no pooler)
- Subdomain `db.` instead of region

---

## 🛡️ Security Best Practices

### 1. Enable Row Level Security (RLS)

After your app is deployed, secure your tables:

```sql
-- Enable RLS on all tables
ALTER TABLE "Movie" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Song" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
-- ... repeat for all tables
```

### 2. Create Service Role Key

For server-side operations, use the service role key:

1. **Project Settings** → **API**
2. Copy **service_role** key (keep this SECRET!)
3. Use this for server-side Prisma operations

### 3. Connection Limits

Supabase free tier includes:
- **Direct connections:** Limited (use pooler)
- **Pooled connections:** Recommended for serverless
- **Max connections:** 60 on free tier

Always use the pooled connection (port 6543) for Vercel deployments.

---

## 🧪 Test Your Connection Locally

Create a `.env` file locally (don't commit it!):

```bash
DATABASE_URL="postgresql://postgres.doivmztuenxeunclfcwp:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

Test the connection:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Open Prisma Studio to view data
npx prisma studio

# Seed the database
npm run db:seed
```

If these commands work without errors, your connection string is correct! ✅

---

## 🔍 Troubleshooting

### Error: "Can't reach database server"

**Possible causes:**
1. Wrong password in connection string
2. Database is paused (wake it up in Supabase dashboard)
3. Network connectivity issues
4. Firewall blocking connection

**Solution:**
- Verify password is correct
- Check Supabase dashboard shows database as "Active"
- Try direct connection (port 5432) instead of pooler

### Error: "SSL connection required"

**Solution:** Add `?sslmode=require` to connection string:
```
postgresql://...?pgbouncer=true&sslmode=require
```

### Error: "Too many connections"

**Solution:**
- Use pooled connection (port 6543)
- Ensure Prisma client is using singleton pattern (already configured in `/lib/db/prisma.ts`)

---

## 📊 Monitor Database Usage

In Supabase Dashboard:

1. **Database** → **Connections**
   - View active connections
   - See connection history

2. **Database** → **Logs**
   - View query logs
   - Debug slow queries

3. **Table Editor**
   - View and edit data directly
   - Useful for verifying seed data

4. **SQL Editor**
   - Run custom SQL queries
   - Create backup queries

---

## 🚀 Quick Start Checklist

- [ ] Get DATABASE_URL from Supabase
- [ ] Replace `[YOUR-PASSWORD]` with actual password
- [ ] Verify connection string includes `?pgbouncer=true`
- [ ] Test locally with `npx prisma db push`
- [ ] Seed database with `npm run db:seed`
- [ ] Add DATABASE_URL to Vercel environment variables
- [ ] Deploy to Vercel
- [ ] Verify app connects to database

---

**Need Help?**
- Supabase Docs: https://supabase.com/docs
- Prisma + Supabase: https://supabase.com/docs/guides/integrations/prisma
