# Adash Architects website

Static site built with Astro and Tailwind CSS.

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

The hero works best with a clear sky in the top half, because the headline sits there. The
contrast of the hero text was measured against the current photo, so check it again with the
real one.

To check that nothing is left: `grep -n "placeholder: true" src/data/projects.ts`

### TODOs

- `src/data/site.ts`: confirm the founder's name. The live site uses both "Adam Shafeeq Ahmed"
  and "Shafeeq Ahmed". `FOUNDER_NAME` is the only place to change it.
- `src/data/projects.ts`: add the Medland Speciality Hospital description. The live site's text
  describes a home, so it was left out.

## Redirects

The old URLs `/projects.html`, `/aboutus.html` and `/contact.html` are handled in two ways:

- `public/_redirects` gives real 301 redirects on hosts that support the file, such as
  Cloudflare Pages and Netlify.
- `astro.config.mjs` also generates HTML redirect pages, as a fallback for any other static host.
  Those use a meta refresh rather than a 301, so on such a host add server-level 301s as well.

## Deployment

Build with `npm run build` and serve the `dist/` folder. Nothing has been deployed.
