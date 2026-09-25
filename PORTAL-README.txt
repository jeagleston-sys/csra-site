CSRA PRECISION IMAGING — CLIENT PROJECT MAPS (/view/)
=====================================================

How it works
------------
- Viewer page:  /view/index.html  (one page serves every project)
- Each project: /view/<project-folder>/job.json + /view/<project-folder>/tiles/
- Client link:  https://www.csraprecisionimaging.com/view/?job=<project-folder>
- middleware.js locks everything inside a project folder (job.json AND every
  tile). The client enters the project's access code once per device; the
  browser remembers it for 90 days.
- Access codes live ONLY in Vercel environment variables, never in this repo.

Vercel environment variables (Project > Settings > Environment Variables,
tick Production AND Preview)
---------------------------------------------------------------------------
  PORTAL_SECRET   long random string. Set once. Changing it signs everyone
                  out of every project.
  PORTAL_CODES    one line of JSON, project folder -> access code:
                  {"walton-way-rsbay":"XXXX-XXXX-XXXX","next-job-abcde":"XXXX-XXXX-XXXX"}

Env var changes only take effect on the next deploy. Add the code BEFORE
you push the new project, and the push deploys it.

Adding a new project
--------------------
1. Copy view/walton-way-rsbay -> view/<street>-<5 random letters/numbers>
   (lowercase letters, numbers, dashes only).
2. Replace its tiles folder with the new job's Terra map folders 12-24.
3. Edit job.json: title, subtitle, facts, bounds (Terra report:
   map/report/map_report.json -> "gps corner"), optional download link.
4. Vercel: add "<folder>":"<new code>" to PORTAL_CODES, then save.
   Codes: 12 letters/numbers; dashes, spaces and case are ignored.
5. Add an entry to view/admin-index/projects.json (title, slug, client,
   processed date, optional note) so it shows up on the admin page.
6. Commit + push. Put the link in the Jobber job; send the code to the
   client separately (text is best).

Admin index (your own bookmark, not for clients)
-------------------------------------------------
- Page: https://www.csraprecisionimaging.com/view/admin.html
- Lists every project in view/admin-index/projects.json as a clickable
  link straight to /view/?job=<slug> — no more digging through Vercel or
  remembering job-folder slugs.
- Also shows each project's access code (with a Copy button) — for when
  a client loses theirs. Vercel can't show a saved Secret value back to
  you once set, so this reads it straight from the running server via a
  separate admin-only endpoint (GET /view/_codes) instead. That endpoint
  requires the same admin-index unlock cookie as the page itself, and
  never returns the admin-index code in its own list.
- Protected by its own code, same mechanism as any client project: add
  "admin-index":"<code you pick>" to PORTAL_CODES in Vercel. Pick something
  you'll actually remember — this one's just for you, not auto-generated.
- projects.json itself lives inside the locked view/admin-index/ folder,
  so the project list is exactly as protected as any client's job.json —
  admin.html is the only public HTML file involved, and it holds no data.
- Remembers your device for 90 days, same as client logins.

Thermal images (optional)
-------------------------
1. Export annotated JPGs from FLIR Thermal Studio (~2000 px wide).
2. Put them in view/<project-folder>/thermal/
3. In job.json, list them in "thermal" (numbered in this order):
   "thermal": [
     { "file": "thermal/01.jpg", "caption": "Suspected wet insulation, NE corner, ~120 sq ft" },
     { "file": "thermal/02.jpg", "caption": "Seam anomaly, SE low-slope section",
       "lat": 33.46935, "lng": -81.97330 }
   ]
   Pins come from each photo's GPS tag automatically. Add "lat"/"lng" only to
   move a pin (angled shots: GPS is where the drone was, not the target).
   Get coordinates by right-clicking the spot in Google Maps.
4. Commit + push. Same access code protects them.

Revoking access
---------------
- One project: change its code in PORTAL_CODES and redeploy.
- Everyone, everywhere: change PORTAL_SECRET and redeploy.
- Remove a project: delete its line in PORTAL_CODES (locks it immediately
  after redeploy), then delete its folder whenever you like.

If PORTAL_SECRET or PORTAL_CODES is missing or not valid JSON, every project
locks ("temporarily unavailable"). The rest of the site is unaffected.
