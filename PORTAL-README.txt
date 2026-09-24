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
5. Commit + push. Put the link in the Jobber job; send the code to the client
   separately (text is best).

Revoking access
---------------
- One project: change its code in PORTAL_CODES and redeploy.
- Everyone, everywhere: change PORTAL_SECRET and redeploy.
- Remove a project: delete its line in PORTAL_CODES (locks it immediately
  after redeploy), then delete its folder whenever you like.

If PORTAL_SECRET or PORTAL_CODES is missing or not valid JSON, every project
locks ("temporarily unavailable"). The rest of the site is unaffected.
