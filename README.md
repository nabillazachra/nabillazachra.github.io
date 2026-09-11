# Nabilla Zachra — Portfolio Foundation

A production-oriented portfolio foundation for Nabilla Zachra, built as two separate applications:

- `apps/web` — public Next.js portfolio (App Router, TypeScript)
- `apps/studio` — standalone Sanity Studio and content schemas

The interface follows an Editorial Utility / Swiss-product direction: warm ivory, near-black type, one signal orange, an asymmetric 12-column grid, editorial serif scale, compact utility labels, and restrained motion. It intentionally avoids a generic card system and keeps project evidence qualified.

## Stack

- Next.js 16 and React 19
- TypeScript with strict checking
- Sanity CMS and GROQ
- Plain CSS—no UI kit, CSS framework, animation package, or client state library
- npm workspaces

## Repository structure

```text
.
├── apps
│   ├── web
│   │   ├── app                 # Routes, metadata, sitemap, draft endpoints
│   │   ├── components          # Small presentation components
│   │   └── lib
│   │       ├── content         # Types, verified fallback content, loaders
│   │       └── sanity          # Environment, client, and GROQ queries
│   └── studio
│       ├── schemaTypes         # Sanity documents, objects, editorial blocks
│       └── seed                # Claim-safe starter content
├── .env.example
└── package.json                # Workspace commands
```

The Studio is not mounted in the Next.js site. This keeps the public application and editorial administration on separate deployment/authentication surfaces.

## Local setup

Requirements: Node.js 20.9 or newer and npm 10 or newer.

```bash
npm install
cp .env.example apps/web/.env.local
cp .env.example apps/studio/.env
npm run dev:web
```

The site runs at [http://localhost:3000](http://localhost:3000). Without Sanity environment values, it renders the verified local fallback content, which makes the repository buildable before a Sanity project is connected.

Run the Studio separately:

```bash
npm run dev:studio
```

Sanity Studio normally starts at [http://localhost:3333](http://localhost:3333).

## Sanity setup

1. Create or select a Sanity project and a dataset (the examples use `production`).
2. Add the project ID and dataset to `apps/studio/.env`:

   ```dotenv
   SANITY_STUDIO_PROJECT_ID=your_project_id
   SANITY_STUDIO_DATASET=production
   ```

3. Add the public identifiers to `apps/web/.env.local`:

   ```dotenv
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. In the Sanity project settings, add `http://localhost:3000` and the production site origin to CORS. Credentials are not required for a public, published-content dataset.
5. From `apps/studio`, import the starter content after reviewing the target dataset:

   ```bash
   npx sanity dataset import seed/production.ndjson production
   ```

   The seed does not use `--replace`; it will not silently wipe an existing dataset. It contains only the supplied positioning and project qualifiers. No employer history, dates, metrics, client relationship, shipping status, or business outcomes are inferred.

6. Start Studio and replace the typographic image placeholders with verified, rights-cleared project material. Every image schema requires alternative text.

### Content model

Documents:

- Project
- Experience
- Playground Item
- About (singleton)
- Site Settings (singleton)

Projects include all requested overview and narrative fields plus flexible `Project Section` objects. Available editorial blocks are text lead, full-bleed image, image + caption, image + annotation, two-column story, research finding, pull quote, metric/evidence, before/after, decision, trade-off, gallery, outcome, and reflection.

## Draft preview

Published content uses an unauthenticated, read-only Sanity client. Draft access happens only in server code and requires both of these values in the web deployment:

```dotenv
SANITY_API_READ_TOKEN=a_read_only_viewer_token
SANITY_PREVIEW_SECRET=a_long_random_value
```

Enable preview with a server-side `POST /api/draft/enable` JSON request:

```json
{ "secret": "your-preview-secret" }
```

Disable it with `POST /api/draft/disable`. The endpoints do not accept preview credentials in a query string. Use a Sanity token with Viewer/read permissions only—never an Editor token or write credential.

## Environment and security rules

- `NEXT_PUBLIC_SANITY_PROJECT_ID`, dataset, API version, and site URL are public identifiers.
- `SANITY_API_READ_TOKEN` and `SANITY_PREVIEW_SECRET` are server-only. Never prefix them with `NEXT_PUBLIC_`.
- No Sanity write token is used by the frontend. Studio users authenticate with Sanity directly.
- Environment files are ignored; `.env.example` contains names only.
- External HTTP(S) links are opened with `target="_blank"` and `rel="noopener noreferrer"`.
- Portable Text is rendered as React components. There is no `dangerouslySetInnerHTML` path.
- The evidence schemas remind editors to source claims. The included content makes no unsupported impact, launch, client, or NDA-sensitive claims.

## Quality commands

```bash
npm run lint
npm run typecheck
npm run build
npm run format:check
```

`npm run build` verifies both the public Next.js application and standalone Studio. A GitHub Actions workflow runs lint, typecheck, and both builds for pull requests.

## Vercel deployment

### Public portfolio

1. Import this repository into Vercel.
2. Set **Root Directory** to `apps/web`; Vercel detects Next.js and the npm workspace.
3. Add the four `NEXT_PUBLIC_*` values above.
4. If draft preview is required, add the two server-only preview values. Do not expose them to the browser.
5. Deploy, then update `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS URL and redeploy so metadata and the sitemap use the correct origin.

### Sanity Studio

Keep Studio separate from the public Vercel site. It can be hosted by Sanity with:

```bash
npm run deploy --workspace=@nabilla/studio
```

Alternatively, deploy `apps/studio` as its own restricted project. It should never be routed under the public portfolio merely for convenience.

## Editorial guardrails

- Ferizy is presented as a UX research / usability-testing case.
- WorkHub is marked as the most recent case, with incomplete process and outcome evidence.
- Jago Last Wish is explicitly an academic / Skilvul challenge—not professional Bank Jago work.
- OnStreet Parking is explicitly a concept / exploration.
- Lost & Found is explicitly playground / early practice work.
- Unsupported metrics, shipped outcomes, employer history, client claims, and NDA-sensitive details are omitted until verified source material exists.
