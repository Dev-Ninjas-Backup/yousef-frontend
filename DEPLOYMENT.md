# Deployment Instructions

## Vercel Deployment Fix

Due to a known compatibility issue between Next.js 16's Turbopack and Tailwind CSS v4 on Linux environments, you need to disable Turbopack for Vercel deployments.

### Steps to Deploy Successfully:

1. **Go to Vercel Dashboard**
   - Navigate to your project: https://vercel.com/habibb2rs-projects/yousef-frontend
   - Click on "Settings"

2. **Add Environment Variable**
   - Go to "Environment Variables" section
   - Click "Add New"
   - Add the following:
     - **Name**: `TURBOPACK`
     - **Value**: `0`
     - **Environments**: Select all (Production, Preview, Development)
   - Click "Save"

3. **Redeploy**
   - Go to "Deployments" tab
   - Click on the latest deployment
   - Click "Redeploy"

OR simply run:
```bash
npx vercel --prod
```

The deployment should now succeed!

## What Was Fixed

✅ Removed `--turbopack` flag from build command in `package.json`
✅ Fixed case-sensitive import paths:
   - `carBrands` → `CarBrands`
   - `Stats` → `stats`
   - `Story` → `story`
   - `downloadhero` → `DownloadHero`
✅ Created `vercel.json` with custom build command
✅ Build verified locally and works perfectly

## Alternative Solution

If you prefer not to use environment variables, you can downgrade to Next.js 15 or wait for the Tailwind CSS v4 stable release with full Turbopack support.

## Current Status

- ✅ Local build: **Working perfectly**
- ✅ Development server: **Working perfectly**
- ⏳ Vercel deployment: **Awaiting environment variable configuration**

---

Once the environment variable is set, your application will deploy successfully to Vercel!
