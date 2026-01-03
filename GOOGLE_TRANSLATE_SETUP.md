# Google Cloud Translation API Setup Guide

## Step-by-Step Instructions to Get Your API Key

### Step 1: Create a Google Cloud Account
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. If you're new, you'll get **$300 free credits** for 90 days

### Step 2: Create a New Project
1. Click on the project dropdown at the top
2. Click **"New Project"**
3. Enter project name (e.g., "Sayara Hub Translation")
4. Click **"Create"**

### Step 3: Enable Cloud Translation API
1. Go to [Cloud Translation API](https://console.cloud.google.com/apis/library/translate.googleapis.com)
2. Make sure your project is selected
3. Click **"Enable"** button
4. Wait for the API to be enabled (takes a few seconds)

### Step 4: Create API Credentials
1. Go to [Credentials Page](https://console.cloud.google.com/apis/credentials)
2. Click **"Create Credentials"** → **"API Key"**
3. Your API key will be created and displayed
4. **IMPORTANT:** Click **"Restrict Key"** for security

### Step 5: Restrict API Key (Security)
1. Under **"API restrictions"**, select **"Restrict key"**
2. Choose **"Cloud Translation API"** from the dropdown
3. Under **"Application restrictions"**, select **"HTTP referrers (web sites)"**
4. Add your website URLs:
   - `http://localhost:3000/*` (for development)
   - `https://yourdomain.com/*` (for production)
5. Click **"Save"**

### Step 6: Add API Key to Your Project
1. Copy your API key
2. Open `.env.local` file in your project root
3. Replace `your_api_key_here` with your actual API key:
   ```
   NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
4. Save the file
5. Restart your development server

### Step 7: Test the Translation
1. Run your application: `npm run dev`
2. Open the website
3. Click on the language selector
4. Switch to Arabic
5. Check the browser console for any errors

## Pricing Information

### Free Tier
- **500,000 characters per month** - FREE
- Perfect for small to medium websites

### Paid Tier (After Free Tier)
- **$20 per 1 million characters**
- Very affordable for most use cases

### Example Usage Calculation
- Average page: ~2,000 characters
- Free tier: ~250 page translations per month
- If you exceed: $0.02 per page translation

## Troubleshooting

### Error: "API key not valid"
- Check if you copied the full API key
- Make sure there are no extra spaces
- Verify the API is enabled in Google Cloud Console

### Error: "API key not found"
- Make sure `.env.local` file exists in project root
- Restart your development server after adding the key
- Check the file name is exactly `.env.local` (not `.env`)

### Error: "This API project is not authorized"
- Go to API restrictions in Google Cloud Console
- Make sure "Cloud Translation API" is selected
- Add your domain to HTTP referrers

### Translations not working
- Open browser console (F12)
- Look for error messages
- If API key is missing, manual translations will be used as fallback

## Security Best Practices

1. **Never commit `.env.local` to Git**
   - Already added to `.gitignore`
   
2. **Use API Key Restrictions**
   - Restrict to specific APIs
   - Restrict to specific domains
   
3. **Monitor Usage**
   - Check [Google Cloud Console](https://console.cloud.google.com/apis/dashboard)
   - Set up billing alerts
   
4. **Rotate Keys Regularly**
   - Create new keys every few months
   - Delete old unused keys

## Alternative: Manual Translations Only

If you don't want to use Google Cloud Translation API:
- The system will automatically use manual translations
- All common UI text is already translated
- No API key needed
- 100% free
- Just leave the API key empty in `.env.local`

## Support

For more information:
- [Google Cloud Translation Documentation](https://cloud.google.com/translate/docs)
- [Pricing Calculator](https://cloud.google.com/products/calculator)
- [API Reference](https://cloud.google.com/translate/docs/reference/rest)
