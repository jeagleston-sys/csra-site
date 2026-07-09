==================================================================
 HOW TO ADD YOUR REAL THERMAL & 3D PHOTOS
 CSRA Precision Imaging website
==================================================================

Right now the gallery and hero use placeholder images (the colorful
"Replace with your photo" tiles). Here is how to swap in your real work.
No coding experience needed — you're just replacing files and editing text.

------------------------------------------------------------------
STEP 1 — PREP YOUR PHOTOS (very important for fast loading)
------------------------------------------------------------------
Before uploading, shrink your photos so the site loads fast:

  • Resize to about 1600 pixels on the long edge (plenty for web).
  • Save as JPG at ~80% quality, OR use modern WebP for smaller files.
  • Aim for under 400 KB per image. Phone photos are often 5–10 MB —
    that's way too big and will slow the site down.

Free tools to resize/compress (no install needed):
  • https://squoosh.app          (drag a photo in, download smaller one)
  • https://tinypng.com          (compress JPG/PNG/WebP)
  • https://imageresizer.com     (resize)

Name files clearly, all lowercase, no spaces. Use dashes. Examples:
  thermal-roof-smith-house.jpg
  deer-recovery-2025-11-12.jpg
  3d-model-warehouse.jpg

------------------------------------------------------------------
STEP 2 — PUT THE FILES IN THIS FOLDER
------------------------------------------------------------------
Place your prepared photos in:   images/gallery/

You can delete the placeholder .svg files in that folder once you've
added your own (or leave them — your call).

------------------------------------------------------------------
STEP 3 — SHOW THEM IN THE GALLERY
------------------------------------------------------------------
Open  gallery.html  in any text editor (Notepad, TextEdit, VS Code).
Find the block that starts with:   <div class="gallery">

Each photo is one line that looks like this:

  <figure class="item" data-cat="thermal">
    <span class="pill thermal">Thermal</span>
    <img src="images/gallery/thermal-roof-01.svg"
         alt="Thermal roof moisture scan — Augusta GA" loading="lazy">
    <figcaption class="cap">Roof moisture scan — residential</figcaption>
  </figure>

To use your own photo, change three things:
  1. src=".../YOUR-FILE.jpg"      → point to your file
  2. alt="..."                    → describe it (helps Google + accessibility)
  3. <figcaption>...</figcaption> → the caption shown on hover

Set data-cat to one of:  thermal   rgb   3d
(that's what the filter buttons use). The colored "pill" label should
match: thermal / rgb / threed.

To ADD more photos, just copy a whole <figure>...</figure> block and
paste it again with a new file + caption. Add as many as you like —
they lazy-load, so a big gallery stays fast.

KEEP loading="lazy" on every <img>. That's what makes off-screen
images load only when scrolled to.

------------------------------------------------------------------
STEP 4 — REPLACE THE HERO DRONE PHOTO (optional)
------------------------------------------------------------------
On the homepage, the circular drone image uses:
  images/hero-drone.svg
Replace that file with a real square photo of your drone named
hero-drone.jpg, then open index.html and change:
  src="images/hero-drone.svg"   →   src="images/hero-drone.jpg"

------------------------------------------------------------------
STEP 5 — SOCIAL SHARE IMAGE (optional but nice)
------------------------------------------------------------------
images/og-image.svg is the preview shown when your link is shared on
Facebook/text. Replace it with a 1200×630 JPG named og-image.jpg, then
in each .html file update the line:
  <meta property="og:image" content=".../images/og-image.svg">
to end in og-image.jpg.

------------------------------------------------------------------
STEP 6 — RE-DEPLOY
------------------------------------------------------------------
After editing, re-upload the whole folder to Netlify (drag-and-drop
again over your existing site, or use the "Deploys" tab). Done!

Tip: take BEFORE/AFTER pairs (RGB + thermal of the same roof) — they
make the most convincing gallery items for selling inspections.
