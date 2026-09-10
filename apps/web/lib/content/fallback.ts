import type {
  About,
  Experience,
  HomeContent,
  PlaygroundItem,
  PortableTextBlock,
  Project,
  SiteSettings,
} from "./types";

const block = (text: string, key: string): PortableTextBlock => ({
  _key: key,
  _type: "block",
  style: "normal",
  markDefs: [],
  children: [{ _key: `${key}-span`, _type: "span", marks: [], text }],
});

export const projects: Project[] = [
  {
    title: "Ferizy Usability Testing",
    slug: "ferizy-usability-testing",
    year: "—",
    role: "UX Research",
    discipline: ["Usability testing", "Research synthesis"],
    domain: "Travel",
    platform: ["Digital product"],
    projectType: "UX research case",
    featured: true,
    homepageOrder: 1,
    shortSummary:
      "A usability-testing case focused on observing where people encounter friction and turning evidence into product direction.",
    statusNote:
      "Research case · details intentionally limited to verified material",
    visualTone: "orange",
    context: [
      block(
        "This case examines Ferizy through a usability-testing lens. The portfolio focuses on the research approach and evidence available, without claiming unverified product or business impact.",
        "ferizy-context",
      ),
    ],
    research: [
      block(
        "The work is framed around usability testing: observing use, identifying recurring friction, and separating evidence from assumption.",
        "ferizy-research",
      ),
    ],
    outcome: [
      block(
        "Verified outcome details have not been supplied. This section is reserved for supported findings, recommendations, and follow-up evidence.",
        "ferizy-outcome",
      ),
    ],
  },
  {
    title: "WorkHub Attendance",
    slug: "workhub-attendance",
    year: "Recent",
    role: "Product & Experience Design",
    discipline: ["Product thinking", "Interface design"],
    domain: "Workplace tools",
    platform: ["Digital product"],
    projectType: "Product design case",
    featured: true,
    homepageOrder: 2,
    shortSummary:
      "A recent attendance product case. The current record shows the product direction while process and outcome evidence continue to be assembled.",
    statusNote: "Most recent case · process and outcome evidence is incomplete",
    visualTone: "ink",
    context: [
      block(
        "WorkHub Attendance is the most recent case in this portfolio. Some process and outcome evidence is still incomplete, so the case avoids claims that cannot yet be supported.",
        "workhub-context",
      ),
    ],
    constraints: [
      block(
        "The case study itself is being documented with an evidence-first constraint: gaps remain visible rather than being filled with assumed metrics or retrospective certainty.",
        "workhub-constraints",
      ),
    ],
    outcome: [
      block(
        "Outcome evidence is still being assembled. No adoption, efficiency, revenue, or delivery claims are made here.",
        "workhub-outcome",
      ),
    ],
  },
  {
    title: "Jago Last Wish",
    slug: "jago-last-wish",
    year: "—",
    role: "Product Design",
    discipline: ["Product concept", "Interface design"],
    domain: "Financial services challenge",
    platform: ["Digital product"],
    projectType: "Academic / Skilvul challenge",
    featured: true,
    homepageOrder: 3,
    shortSummary:
      "An academic product-design response created for a Skilvul challenge—not professional work for Bank Jago.",
    statusNote:
      "Academic / Skilvul challenge · not professional Bank Jago work",
    visualTone: "green",
    context: [
      block(
        "Jago Last Wish was created as an academic / Skilvul challenge. It must not be read as commissioned, shipped, or professional work completed for Bank Jago.",
        "jago-context",
      ),
    ],
    outcome: [
      block(
        "The work is presented as a challenge response and learning artifact. No business, client, launch, or adoption outcomes are claimed.",
        "jago-outcome",
      ),
    ],
  },
  {
    title: "OnStreet Parking",
    slug: "onstreet-parking",
    year: "—",
    role: "Product Exploration",
    discipline: ["Concept development", "Experience design"],
    domain: "Urban mobility",
    platform: ["Concept"],
    projectType: "Concept / exploration",
    featured: false,
    homepageOrder: 4,
    shortSummary:
      "An exploratory concept considering the experience around on-street parking, presented as a direction rather than a shipped product.",
    statusNote: "Concept / exploration · not presented as a shipped product",
    visualTone: "blue",
    context: [
      block(
        "OnStreet Parking is a concept and exploration. The portfolio uses it to show framing and interface craft without implying a client engagement or live service.",
        "parking-context",
      ),
    ],
    outcome: [
      block(
        "This exploration does not claim launch status, usage metrics, or business impact.",
        "parking-outcome",
      ),
    ],
  },
];

export const experiences: Experience[] = [];

export const playground: PlaygroundItem[] = [
  {
    title: "Lost & Found",
    slug: "lost-and-found",
    year: "Early practice",
    medium: "Playground / interface practice",
    summary:
      "An early practice piece kept visible as part of the learning archive—not positioned as current professional work.",
    note: "Playground · early practice work",
  },
];

export const about: About = {
  heading:
    "Research-minded, technically fluent, and attentive to the interface.",
  bio: [
    block(
      "I work across research, product thinking, and interface craft. A technical background helps me reason about systems, collaborate closely with engineering, and turn ambiguous evidence into buildable product decisions.",
      "about-bio",
    ),
  ],
  availability:
    "Open to thoughtful product and experience design conversations.",
};

export const settings: SiteSettings = {
  title: "Nabilla Zachra — Product & Experience Designer",
  description:
    "Portfolio of Nabilla Zachra, a Product & Experience Designer working across research, product thinking, and interface craft.",
  email: "",
  location: "Indonesia",
  socialLinks: [],
  approach: [
    {
      _key: "evidence",
      title: "Start with evidence",
      text: "Look closely at real behaviour, name uncertainty, and keep assumptions separate from what the work can support.",
    },
    {
      _key: "systems",
      title: "Think in systems",
      text: "Connect the interface to the rules, constraints, people, and technical realities that shape it.",
    },
    {
      _key: "craft",
      title: "Make it legible",
      text: "Use hierarchy, language, and interaction details to make complex product decisions feel clear and humane.",
    },
  ],
};

export const fallbackHomeContent: HomeContent = {
  projects,
  experiences,
  playground,
  about,
  settings,
};
