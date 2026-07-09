# CSRA Precision Imaging — Website

A complete, ready-to-publish website for your thermal drone business.
**Plain HTML/CSS/JS — no coding, no Git, no build step required.**

This guide assumes you've never deployed a website before. Follow it top
to bottom and you'll be live in about 15 minutes, for free.

---

## 1. What's in this folder

| File / folder        | What it is                                            |
|----------------------|-------------------------------------------------------|
| `index.html`         | Homepage                                              |
| `services.html`      | Services (roof, wildlife, nuisance animals, B2B)      |
| `gallery.html`       | Photo gallery (thermal / RGB / 3D)                    |
| `about.html`         | About, credentials, equipment, service area           |
| `contact.html`       | Quote form + contact info                             |
| `css/style.css`      | All the styling                                       |
| `js/main.js`         | Menu, gallery, form behavior                          |
| `images/`            | Logo + placeholder photos (`images/README.txt` = how to add yours) |
| `favicon.svg`        | The little icon in the browser tab                    |
| `robots.txt`, `sitemap.xml` | Help Google find and rank your site            |
| `netlify.toml`, `_redirects` | Performance + clean URLs (leave as-is)        |

---

## 2. ⚡ Before you publish — quick edits

Open these files in any text editor (Notepad on Windows, TextEdit on Mac,
or the free **VS Code**). Use Find & Replace to update:

1. **Phone number** — replace every `[Your Phone Number]` with your real number.
2. **Email** — the site uses `info@csraprecisionimaging.com`. Change it if yours differs.
3. **Domain** — the SEO tags use `https://www.csraprecisionimaging.com`.
   If your real domain is different, Find & Replace it across all `.html`,
   `robots.txt`, and `sitemap.xml`.

That's the minimum. You can add real photos now or after launch
(see `images/README.txt`).

---

## 3. 🚀 Deploy to Netlify (easiest — drag & drop, no Git)

**Netlify is free for a site like this and the simplest way to go live.**

1. Go to **https://www.netlify.com** and click **Sign up** (use your email
   or a Google account). It's free.
2. Once logged in, find the box that says
   **"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here."**
   (It's on the **Sites** page, sometimes labeled *"Deploy manually"*.)
3. On your computer, find this `csra-precision-imaging` folder.
   **Drag the whole folder** onto that box in your browser.
4. Wait ~30 seconds. Netlify gives you a live link like
   `https://random-name-12345.netlify.app`. **Your site is live!**

### Make the address nicer
- In Netlify: **Site configuration → Change site name** → type something
  like `csra-precision-imaging` → your URL becomes
  `csra-precision-imaging.netlify.app`.

### Connect your real domain (csraprecisionimaging.com)
- Buy the domain (Namecheap, GoDaddy, Google Domains, etc.) if you haven't.
- In Netlify: **Domain management → Add a domain** → type your domain →
  follow the on-screen DNS steps (Netlify walks you through it).
- HTTPS (the padlock) is added automatically and free.

### Your quote form just works ✅
Because of the `data-netlify="true"` already in `contact.html`, form
submissions show up in Netlify under **Forms**. Turn on email alerts:
**Site configuration → Forms → Form notifications → Add notification →
Email notification** → enter your email. Now every quote request is emailed
to you. No backend, no monthly fee (free tier covers 100 submissions/month).

### Updating the site later
Edit your files, then drag the folder onto Netlify again (or use the
**Deploys** tab → drag-and-drop). The new version replaces the old one.

---

## 4. Alternative hosts (if you prefer)

**Vercel** (also free, drag-and-drop via https://vercel.com):
- Sign up → **Add New → Project → deploy without Git** isn't drag-and-drop
  by default, so the easiest no-Git path is the **Vercel CLI** OR just use
  Netlify. If you want Vercel without Git, install the Vercel desktop /
  CLI and run `vercel` in this folder. For a true beginner, **Netlify's
  drag-and-drop is easier.** Note: the contact form's Netlify Forms feature
  only works on Netlify — on Vercel, switch the form to Formspree (below).

**Hostinger** (paid shared hosting with a file manager):
1. Buy a plan, open **hPanel → File Manager**.
2. Go into the `public_html` folder.
3. Upload **the contents** of this folder (not the folder itself) — select
   all files and drag them in, or upload a ZIP and use "Extract."
4. Visit your domain — you're live.
   On Hostinger, switch the contact form to **Formspree** (below), since
   Netlify Forms won't run there.

### Switching the form to Formspree (for Vercel/Hostinger)
1. Sign up free at https://formspree.io and create a form; copy your form ID.
2. In `contact.html`, find the `<form ...>` line and replace it with:
   `<form id="quoteForm" method="POST" action="https://formspree.io/f/YOUR_ID">`
3. Delete the two Netlify-specific lines just below it (the hidden
   `form-name` input and the `bot-field` paragraph). Save and re-upload.

---

## 5. 📈 After launch — get found on Google

1. **Google Business Profile** (most important for local): create/claim it
   at https://business.google.com — this is what puts you on Google Maps for
   "thermal drone Augusta GA." Add photos, hours, service area, and your site.
2. **Google Search Console** (https://search.google.com/search-console):
   add your site, then submit `sitemap.xml` so Google indexes your pages.
3. Keep adding real gallery photos with descriptive captions — fresh,
   keyword-rich content helps ranking.

The site already includes local-SEO meta tags, keywords, and
LocalBusiness structured data for Augusta/CSRA terms.

---

## 6. Performance notes (already built in)

- Images use `loading="lazy"` so off-screen photos don't slow the first load.
- No heavy frameworks — the page is just HTML/CSS + a tiny JS file.
- `netlify.toml` sets long cache times on images/CSS/JS for fast repeat visits.
- **Your part:** compress photos before uploading (see `images/README.txt`).
  This is the single biggest thing you control for speed.

---

Questions to revisit later: adding a blog, online booking (Calendly),
or online payments (Stripe/PayPal) can all be layered on. For now, you have
a fast, professional, mobile-friendly site ready to publish.
