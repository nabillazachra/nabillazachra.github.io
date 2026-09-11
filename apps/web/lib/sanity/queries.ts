const imageProjection = `{
  alt,
  caption,
  "url": asset->url,
  "dimensions": asset->metadata.dimensions
}`;

const projectProjection = `{
  _id,
  title,
  "slug": slug.current,
  year,
  role,
  discipline,
  domain,
  platform,
  projectType,
  featured,
  homepageOrder,
  shortSummary,
  statusNote,
  heroImage ${imageProjection},
  gallery[] ${imageProjection},
  context,
  problem,
  users,
  constraints,
  research,
  findings,
  decisions,
  tradeOffs,
  testing,
  outcome,
  reflection,
  externalLinks,
  sections[]{
    _key,
    eyebrow,
    heading,
    blocks[]{
      ...,
      image ${imageProjection},
      before ${imageProjection},
      after ${imageProjection},
      images[] ${imageProjection}
    }
  },
  "visualTone": coalesce(visualTone, "orange")
}`;

export const homeQuery = `{
  "projects": *[_type == "project"] | order(homepageOrder asc) ${projectProjection},
  "experiences": *[_type == "experience"] | order(order asc){
    _id, organisation, role, period, summary, order
  },
  "playground": *[_type == "playgroundItem"] | order(year desc){
    _id, title, "slug": slug.current, year, medium, summary, note,
    image ${imageProjection}, externalLink
  },
  "about": *[_type == "about"][0]{heading, bio, availability},
  "settings": *[_type == "siteSettings"][0]{
    title, description, email, location, socialLinks, approach
  }
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] ${projectProjection}`;

export const projectSlugsQuery = `*[_type == "project" && defined(slug.current)].slug.current`;
