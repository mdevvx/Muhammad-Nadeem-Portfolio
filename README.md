# Muhammad Nadeem Portfolio

Portfolio and services site for Muhammad Nadeem, built with Next.js 15 (App Router), TypeScript and Tailwind CSS 3.

## Run it

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000
```

Production check: `npm run build && npm start`. Type check only: `npm run typecheck`.

## What to edit

| What | Where |
| --- | --- |
| All copy, services, projects, FAQ, stats | `src/lib/site.ts` |
| External links (all placeholders) | `links` object at the top of `src/lib/site.ts` |
| Font | `src/lib/fonts.ts` |
| Colors (dark and light theme) | CSS variables at the top of `src/app/globals.css` |
| Contact form backend | `src/app/api/contact/route.ts` |

### Replace the placeholder links

Every external URL is `https://example.com/...` for now. Search `src/lib/site.ts` for `TODO` and paste the real links:

- GitHub: https://github.com/mdevvx
- Upwork: https://www.upwork.com/freelancers/mdevvx
- Booking page, LinkedIn, X, Discord, DuoPlus and PulseNotify: your own URLs

### Font

The PulseNotify font could not be inspected while this was built, so Geist (bundled locally) is a stand-in. Open `src/lib/fonts.ts`, replace the two exports with your real font (a Google Fonts example is in the file comment). Both must expose `--font-sans` and `--font-mono`.

### Contact form

`POST /api/contact` validates the input (with a honeypot against bots). If `DISCORD_WEBHOOK_URL` is set in `.env.local`, each inquiry is posted to that Discord channel as an embed with mentions disabled. If it is not set, inquiries are only logged to the server console.

### Environment variables

- `NEXT_PUBLIC_SITE_URL`: your deployed URL (sitemap, canonical URL, Open Graph).
- `DISCORD_WEBHOOK_URL`: optional, see above.

## Deploy

Works on Vercel as is: import the repo, set the two environment variables, deploy.

## Notes

- Portfolio entries are written from your GitHub pinned repositories and your work history. Review them in `projects` in `src/lib/site.ts` and match them to your Upwork portfolio items, which could not be read automatically.
- There are no testimonials or review counts on purpose. Add real ones to `src/lib/site.ts` once you have permission to quote them.
- Add a profile photo by putting `avatar.jpg` in `public/` and swapping the initials block in `src/components/About.tsx` for a `next/image`.
