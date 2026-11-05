# Adash Architects website

Static site built with Astro and Tailwind CSS. Rebuild of [adasharchitects.com](https://adasharchitects.com/) as a modern architecture studio site.

**Status: not ready to launch.** The site has not been deployed, and all photos are stock
placeholders. See [Before going live](#before-going-live).

## What was built

**Pages:** `/`, `/projects`, `/about`, `/contact`. The old `/projects.html`, `/aboutus.html` and
`/contact.html` URLs redirect to the new pages.

**Homepage, in order:**

1. Hero with transparent nav, headline and a photo that fades into the page
2. Intro statement
3. "What we do" card panel
4. Two-image pair
5. "Explore our work" projects carousel
6. "Why choose us" card panel with the five core values
7. Closing feature with one large image
8. Founder teaser
9. Footer

**Also included:** a mobile menu, keyboard-operable carousels, scroll and hover motion that respects
reduced-motion settings, responsive lazy-loaded images, unique page titles and descriptions, Open
Graph tags, LocalBusiness JSON-LD, a sitemap, robots.txt and favicons.

## Decisions worth knowing

| Decision | Why |
| --- | --- |
| No visible "Placeholder" badge on photos | Removed at the owner's request. Stock photos now look like real work, so the list below is the only safeguard. |
| Placeholder alt text says "not Adash's work" | Keeps screen readers and search engines from being told stock photos are Adash's buildings. Removed per photo by setting `placeholder: false`. |
| Hero fits the screen on desktop | A taller hero meant scrolling through house and sky. On wide, short windows only the top of the house shows. |
| "What we do" and "Why choose us" are left-aligned card panels | Changed from the original brief after a second visual reference was supplied. |
| "What we do" has four cards | Only two services were specified. "Concept development" and "Execution & coordination" come from stages named in the founder's bio. **Confirm these describe what Adash offers.** |
| Service card text is reworded from the live About and Projects pages | Nothing new was meant to be claimed, but it isn't verbatim. **Please review it.** |
| Nav logo places the mark and wordmark side by side | The stacked logo's wordmark was unreadable at nav size. The footer uses the original stacked logo. |
| Social sharing image is the logo | Stops a stock photo being shared as Adash's work. |
| `/projects` cards have no arrow chip | There are no project detail pages to link to. |
| `/about` keeps core values as centred icon columns | Only the homepage sections were restyled. |
| Medland has no description | The live site's text describes a home, not a hospital. |

## Test results

Measured on the local production preview, not on a live host.

| Check | Result |
| --- | --- |
| Lighthouse, homepage (latest build) | Performance 94 mobile, 100 desktop; Accessibility, Best Practices and SEO 100 on both |
| Lighthouse, other pages | 90+ in every category, but last run before the final homepage changes |
| axe accessibility scan | No violations on any page at 390px and 1440px. It can't auto-judge text over photos. |
| Hero text contrast, 360–1920px | Lowest 4.83:1, measured against the current placeholder photo |
| "What we do" first card title contrast | Lowest 6.16:1, against the current placeholder photo |
| Horizontal page scroll, 360–1920px | None |
| Keyboard | Mobile menu and carousels are operable |

**Not tested:** real 301 redirects on a live host, and contrast against the real hero photo.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local dev server |
| `npm run build` | Create the production site in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run images` | Regenerate responsive photo sizes (also runs before dev and build) |
| `node scripts/build-brand.mjs` | Regenerate logos, favicons and the social image |

## Where things live

| Content | File |
| --- | --- |
| Projects and all site photos | `src/data/projects.ts` |
| Contact details, navigation, core values, founder name | `src/data/site.ts` |
| Colours, type and spacing | `src/styles/global.css` |
| Photos | `public/images/projects/` |

## Before going live

### Placeholder images

**None of these photos show Adash's work. All of them must be replaced before launch.**
Nothing visible on the page marks them as placeholders, so use this list and the check below.
Their alt text says they are stock photos.

| File in `public/images/projects/` | Used for | Source photo ID |
| --- | --- | --- |
| `hero.jpg` | Homepage hero | `1580587771525-78b9dba3b914` (sky extended, bottom cropped) |
| `services-architecture.jpg` | Homepage "What we do" first card | `1487958449943-2429e8be8625` |
| `pair-large.jpg` | Homepage image pair, left | `1600047509807-ba8f99d2cdde` |
| `pair-small.jpg` | Homepage image pair, right | `1479839672679-a46483c0e7c8` |
| `feature.jpg` | Homepage closing feature | `1600585154340-be6161a56a0c` |
| `medland-speciality-hospital.jpg` | Medland Speciality Hospital | `1586773860418-d37222d8fce3` |
| `urban-commercial-tower.jpg` | Urban Commercial Tower | `1554435493-93422e8220c8` |
| `community-hub-library.jpg` | Community Hub & Library | `1568667256549-094345857637` |
| `eco-mountain-resort.jpg` | Eco-Friendly Mountain Resort | `1520250497591-112f2f40a3f4` |
| `historic-building-renovation.jpg` | Historic Building Renovation | `1464146072230-91cabc968266` |
| `mixed-use-urban-development.jpg` | Mixed-Use Urban Development | `1460317442991-0ec209397118` |

Source URL pattern: `https://images.unsplash.com/photo-<ID>`. These came from Unsplash's image
CDN. The individual photo pages and photographers could not be checked at download time, so
treat them as development-only stand-ins.

To replace one:

1. Add the real photo to `public/images/projects/`, ideally at least 2400px wide for the hero
   and feature and 1600px wide for the others.
2. In `src/data/projects.ts`, update `file`, rewrite `alt` to describe the real photo, and set
   `placeholder: false`. This removes the "Placeholder stock photo" alt prefix.
3. Delete the old file. Its generated sizes are cleaned up on the next build.

The hero works best with a clear sky in the top half, because the headline sits there. Replacing
it takes three extra checks:

- In `src/pages/index.astro`, update the `0.488` and `0.4475` values. They are the shares of the
  photo's width above and below the roofline, and they keep the roof just below the button.
- Adjust the `.hero-scrim` overlay in the same file to suit the new sky.
- Re-check that the white hero text still meets AA contrast (4.5:1 for the subline).

The current `hero.jpg` is already edited: its sky was extended upward and its bottom was cropped.
The script that did this was a one-off and is not in the repo.

All placeholder photos must be replaced or cleared before launch. Their individual licenses have
not been verified, and this repository is public.

To check that nothing is left: `grep -n "placeholder: true" src/data/projects.ts`

### TODOs

- `src/data/site.ts`: confirm the founder's name. The live site uses both "Adam Shafeeq Ahmed"
  and "Shafeeq Ahmed". `FOUNDER_NAME` is the only place to change it.
- `src/data/projects.ts`: add the Medland Speciality Hospital description. The live site's text
  describes a home, so it was left out.

### Content to review

- The "What we do" card wording and the two added services, in `src/components/Services.astro`.
- The tagline on each card panel, in `src/components/Services.astro` and `src/pages/index.astro`.

### Optional next steps

- Use the new card style for the core values on `/about`, if wanted.
- Re-run Lighthouse on all pages against the deployed site.

## Redirects

The old URLs `/projects.html`, `/aboutus.html` and `/contact.html` are handled in two ways:

- `public/_redirects` gives real 301 redirects on hosts that support the file, such as
  Cloudflare Pages and Netlify.
- `astro.config.mjs` also generates HTML redirect pages, as a fallback for any other static host.
  Those use a meta refresh rather than a 301, so on such a host add server-level 301s as well.

## Deployment

Build with `npm run build` and serve the `dist/` folder. Nothing has been deployed.
