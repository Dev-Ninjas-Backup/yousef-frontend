# Translation System Documentation

## Overview
This project uses a **hybrid translation system** with automatic fallback mechanism:
1. **Primary**: Static translations (Fast, Reliable, Offline-capable)
2. **Optional**: Google Translate API (For dynamic content)

## Architecture

### Static Translations (Current Implementation)
All UI text is pre-translated and stored in `/src/translations/` directory.

**Benefits:**
- ✅ Fast (no API calls)
- ✅ Reliable (no network dependency)
- ✅ Cost-effective (no API charges)
- ✅ SEO-friendly
- ✅ Works offline

### Translation Files Structure
```
src/translations/
├── navbar.ts          # Navigation menu
├── footer.ts          # Footer section
├── banner.ts          # Home banner
├── about.ts           # About page
├── service.ts         # Service pages
├── contact.ts         # Contact page
├── auth.ts            # Authentication forms
└── ...
```

## Usage

### Basic Translation
```tsx
import { useLanguage } from "@/context/LanguageContext";
import { navbarTranslations } from "@/translations/navbar";

function MyComponent() {
  const { t, language } = useLanguage();
  const trans = t(navbarTranslations);
  
  return <h1>{trans.home}</h1>;
}
```

### Language Switching
```tsx
const { language, setLanguage } = useLanguage();

// Switch to Arabic
setLanguage("ar");

// Switch to English
setLanguage("en");
```

## Adding New Translations

### Step 1: Create Translation File
```typescript
// src/translations/mySection.ts
export const mySectionTranslations = {
  en: {
    title: "My Title",
    description: "My Description",
  },
  ar: {
    title: "عنواني",
    description: "وصفي",
  },
};
```

### Step 2: Use in Component
```tsx
import { useLanguage } from "@/context/LanguageContext";
import { mySectionTranslations } from "@/translations/mySection";

function MySection() {
  const { t } = useLanguage();
  const trans = t(mySectionTranslations);
  
  return (
    <div>
      <h1>{trans.title}</h1>
      <p>{trans.description}</p>
    </div>
  );
}
```

## Google Translate API Integration (Optional)

### Setup
1. Get API key from Google Cloud Console
2. Add to `.env.local`:
```env
NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY=your_api_key_here
```

### Usage for Dynamic Content
```tsx
import { translateDynamicContent } from "@/lib/translationUtils";

// Translate user-generated content or API responses
const translated = await translateDynamicContent(
  "Hello World",
  "ar"
);
```

## Fallback Mechanism

The system automatically falls back to static translations if:
- Google Translate API key is not configured
- API request fails
- Network is unavailable
- API quota is exceeded

## Current Translation Coverage

### ✅ Completed Pages
- Home (all sections)
- Service (listing + details)
- About (full content)
- Contact
- Spare Parts
- Download App
- Footer
- Navbar
- Auth Forms (User & Garage)

### Languages Supported
- English (en)
- Arabic (ar)

## RTL Support

Arabic language automatically enables RTL (Right-to-Left) layout:
```typescript
// Automatically handled by LanguageContext
if (language === "ar") {
  document.documentElement.setAttribute("dir", "rtl");
}
```

## Best Practices

1. **Always provide both languages** in translation files
2. **Use semantic keys** (e.g., `title`, `description`, not `text1`, `text2`)
3. **Group related translations** in same file
4. **Keep translations close to components** for maintainability
5. **Test both languages** before deployment

## Performance

- **Static translations**: ~0ms (instant)
- **Google Translate API**: ~200-500ms (network dependent)
- **Fallback**: Automatic, no user impact

## Future Enhancements

- [ ] Add more languages (French, Spanish, etc.)
- [ ] Implement translation caching
- [ ] Add translation management dashboard
- [ ] Support for pluralization
- [ ] Date/time localization
- [ ] Number formatting per locale

## Troubleshooting

### Translations not showing
1. Check if translation file is imported correctly
2. Verify language key exists in translation object
3. Check browser console for errors

### RTL not working
1. Verify language is set to "ar"
2. Check if `dir="rtl"` is applied to `<html>` tag
3. Clear browser cache

### Google Translate not working
1. Verify API key is set in `.env.local`
2. Check API quota in Google Cloud Console
3. Review browser console for API errors

## Support

For questions or issues, contact the development team.
