export type PortableTextBlock = {
  _key: string;
  _type: "block";
  style?: string;
  children?: Array<{
    _key: string;
    _type: "span";
    marks?: string[];
    text: string;
  }>;
  markDefs?: Array<Record<string, unknown>>;
};

export type CmsImage = {
  alt?: string;
  caption?: string;
  url?: string;
  dimensions?: { width: number; height: number; aspectRatio: number };
};

export type ExternalLink = {
  _key?: string;
  label: string;
  url: string;
};

export type EditorialBlock = {
  _key: string;
  _type:
    | "textLead"
    | "fullBleedImage"
    | "captionedImage"
    | "annotatedImage"
    | "twoColumnStory"
    | "researchFinding"
    | "pullQuote"
    | "evidenceBlock"
    | "beforeAfter"
    | "decisionBlock"
    | "tradeOffBlock"
    | "editorialGallery"
    | "outcomeBlock"
    | "reflectionBlock";
  heading?: string;
  label?: string;
  title?: string;
  text?: PortableTextBlock[];
  body?: PortableTextBlock[];
  left?: PortableTextBlock[];
  right?: PortableTextBlock[];
  quote?: string;
  attribution?: string;
  evidence?: string;
  interpretation?: string;
  decision?: string;
  rationale?: string;
  tradeOff?: string;
  consequence?: string;
  result?: string;
  learning?: string;
  image?: CmsImage;
  before?: CmsImage;
  after?: CmsImage;
  images?: CmsImage[];
  annotations?: Array<{ _key: string; label: string; note: string }>;
};

export type ProjectSection = {
  _key: string;
  eyebrow?: string;
  heading?: string;
  blocks?: EditorialBlock[];
};

export type Project = {
  _id?: string;
  title: string;
  slug: string;
  year: string;
  role: string;
  discipline: string[];
  domain: string;
  platform: string[];
  projectType: string;
  featured: boolean;
  homepageOrder: number;
  shortSummary: string;
  statusNote?: string;
  heroImage?: CmsImage;
  gallery?: CmsImage[];
  context?: PortableTextBlock[];
  problem?: PortableTextBlock[];
  users?: PortableTextBlock[];
  constraints?: PortableTextBlock[];
  research?: PortableTextBlock[];
  findings?: PortableTextBlock[];
  decisions?: PortableTextBlock[];
  tradeOffs?: PortableTextBlock[];
  testing?: PortableTextBlock[];
  outcome?: PortableTextBlock[];
  reflection?: PortableTextBlock[];
  externalLinks?: ExternalLink[];
  sections?: ProjectSection[];
  visualTone: "orange" | "ink" | "blue" | "green" | "red";
};

export type Experience = {
  _id?: string;
  organisation: string;
  role: string;
  period: string;
  summary?: string;
  order: number;
};

export type PlaygroundItem = {
  _id?: string;
  title: string;
  slug: string;
  year: string;
  medium: string;
  summary: string;
  note?: string;
  image?: CmsImage;
  externalLink?: ExternalLink;
};

export type About = {
  heading: string;
  bio: PortableTextBlock[];
  availability?: string;
};

export type SiteSettings = {
  title: string;
  description: string;
  email: string;
  location?: string;
  socialLinks: ExternalLink[];
  approach: Array<{ _key: string; title: string; text: string }>;
};

export type HomeContent = {
  projects: Project[];
  experiences: Experience[];
  playground: PlaygroundItem[];
  about: About;
  settings: SiteSettings;
};
