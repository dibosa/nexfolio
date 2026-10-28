# Nexfolio

A personal portfolio inspired by the AI and market dashboard direction of https://pipnex-ai.com. Original layout, artwork, and copy; no copied branding or third-party project screenshots. A static, dependency-free website, prepared for Vercel.

## Make it yours

Edit `content.js`:

- `name`, `role`, and `about`: your professional introduction.
- `email`: your real contact email. The contact button opens the visitor's email app after this is set. There is no form backend or email delivery service.
- `github` and `linkedin`: full HTTPS profile URLs. Empty values hide these links.
- `available`: whether you are open to new work.
- `projects`: your project titles, summaries, case studies, tags, and optional full HTTPS live URLs.

The supplied projects are labeled concepts. The dashboard uses simulated data, not live prices or real financial performance. Replace concept entries with your real work before using this as your professional portfolio. Do not add private information or API keys: `content.js` is public.

Edit `index.html` for the main headline, expertise copy, Nexfolio wordmark, and SEO description. Colors, fonts, spacing, and responsive layouts are in `styles.css`. The initial title in `index.html` and the title in `app.js` can also be customized. Google Fonts is optional; local fallback fonts work when it is unavailable.

## Preview locally

Install Node.js 20 or later, then open a terminal in this folder:

```sh
node scripts/serve.mjs
```

Open http://127.0.0.1:3000. No dependency installation is required. Use a local server rather than double-clicking the HTML file because this site uses JavaScript modules.

## Build

```sh
node scripts/build.mjs
node scripts/serve.mjs dist
```

The first command generates `dist/`. The second previews the production files. Stop a previous preview with Ctrl+C before starting another on port 3000. The equivalent package scripts are `npm run dev`, `npm run build`, and `npm run preview`.

## Deploy to Vercel

1. Put the contents of this folder in a Git repository and push it to your Git provider.
2. In Vercel, select **Add New → Project** and import that repository.
3. If this folder sits inside a larger repository, select it as the project's **Root Directory**. `package.json` and `vercel.json` should be at that root.
4. Choose framework preset **Other**. The included `vercel.json` sets the build command to `node scripts/build.mjs` and the output directory to `dist`.
5. Deploy. No environment variables or backend setup are required.

Alternatively, if you already have the Vercel CLI, run `vercel` from this folder for a preview deployment, then `vercel --prod` for production. Vercel authentication is required.

Official configuration reference: https://vercel.com/docs/project-configuration

## Included

- Responsive landing page, about, expertise, and contact sections
- Three original concept project graphics
- Project category filters and accessible native case-study dialogs
- Interactive dashboard chart time ranges
- Mobile navigation, keyboard focus styling, reduced-motion support
- Social links and email CTA configured from a single content file
- Favicon, page metadata, and Vercel security headers

## Verification

The production build and JavaScript syntax checks passed during creation. Local HTTP checks verified the generated assets. Browser automation was unavailable, so desktop/mobile rendering and click-through behavior still need a browser review before public launch. Vercel deployment has been prepared but not performed.

## Files

`index.html` — page structure and static text

`styles.css` — complete desktop and mobile styling

`content.js` — personal details and project content

`app.js` — chart, filters, dialogs, navigation, and contact behavior

`scripts/` — dependency-free development server and production builder

`vercel.json` — deployment configuration
