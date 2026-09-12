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
    year: "2022",
    role: "UX Researcher / UX Designer",
    discipline: ["Moderated usability testing", "Research synthesis"],
    domain: "Travel & ferry ticketing",
    platform: ["Mobile app"],
    projectType: "UX research case",
    featured: true,
    homepageOrder: 1,
    shortSummary:
      "A two-week moderated usability study of Ferizy’s ferry-ticket booking flow, structured around five participants and five core booking tasks.",
    statusNote: "2-week study · 5 participants · 5 core booking tasks",
    visualTone: "orange",
    context: [
      block(
        "Ferizy supports ferry-ticket search, booking, passenger information, payment, and ticket management. The study focused on the booking journey and asked a practical question: where does the existing flow create friction when people try to complete a trip without assistance?",
        "ferizy-context",
      ),
    ],
    problem: [
      block(
        "The objective was to assess whether people could use the booking flow effectively and efficiently, identify barriers that interrupted task completion, and turn observed friction into actionable recommendations rather than relying on assumptions about usability.",
        "ferizy-problem",
      ),
    ],
    users: [
      block(
        "Five participants were asked to complete the test scenarios without assistance. The study treated what participants actually did, where they hesitated, and what they said during the session as the primary evidence for the report.",
        "ferizy-users",
      ),
    ],
    constraints: [
      block(
        "The work was completed in a two-week window with a focused scope: the core ticket-booking journey. The portfolio therefore presents research findings and recommendations from the study, not downstream launch, adoption, or revenue claims that were not part of the available evidence.",
        "ferizy-constraints",
      ),
    ],
    research: [
      block(
        "I helped prepare the test plan, conducted moderated usability sessions, and took notes during interviews. The testing script kept the sessions aligned to the same booking tasks so observations could be compared and synthesized consistently.",
        "ferizy-research",
      ),
    ],
    testing: [
      block(
        "Participants searched for a ticket, changed service and passenger details, continued to the schedule, entered and verified reservation information, completed payment, and returned to the home screen. These five tasks covered the central booking path from discovery through completion.",
        "ferizy-testing",
      ),
    ],
    findings: [
      block(
        "The final report separated positive and negative findings, summarized evidence from the sessions, and paired usability problems with recommendations. This made the output useful as a decision document instead of a collection of interview notes.",
        "ferizy-findings",
      ),
    ],
    decisions: [
      block(
        "Recommendations were framed around reducing friction in the booking path and clarifying interaction points that caused hesitation. The principle was simple: every recommendation had to trace back to something observed during the test.",
        "ferizy-decisions",
      ),
    ],
    outcome: [
      block(
        "The deliverable was a structured usability-testing report covering background, methodology, scenarios, metrics, test results, findings, and recommendations. No post-release business metric is claimed because implementation evidence was outside the supplied project record.",
        "ferizy-outcome",
      ),
    ],
    reflection: [
      block(
        "This project reinforced the value of narrowing a test around a small number of critical tasks. A focused script made it easier to compare participant behaviour and translate observations into product direction without overstating certainty.",
        "ferizy-reflection",
      ),
    ],
    externalLinks: [
      {
        _key: "ferizy-plan",
        label: "Usability test workspace",
        url: "https://www.figma.com/file/23gTe1JH9v6ZH2qSu5OzYX/Usability-Test-Ferizy?node-id=0%3A1&t=fWKpSunZ8zR1Q4S2-1",
      },
      {
        _key: "ferizy-report",
        label: "Usability test report",
        url: "https://www.figma.com/file/vmmAs9a8sdWY4TK5WKu0JG/Ferizy-UT-Report-(Nabilla-Zachra)?t=2s2HICjvpXvAVuq3-1",
      },
    ],
    sections: [
      {
        _key: "ferizy-scope",
        eyebrow: "01 / Study setup",
        heading: "A small test with a deliberately narrow scope.",
        blocks: [
          {
            _key: "ferizy-scope-evidence",
            _type: "evidenceBlock",
            label: "Study at a glance",
            title: "5 participants · 5 tasks · 2 weeks",
            evidence:
              "The scenarios covered search, trip-detail changes, reservation data, payment, and returning home.",
            interpretation:
              "Keeping the scope centered on the booking journey made participant behaviour easier to compare across sessions.",
          },
          {
            _key: "ferizy-role",
            _type: "twoColumnStory",
            left: [
              block(
                "My role included conducting moderated sessions and recording observations throughout the interviews.",
                "ferizy-role-left",
              ),
            ],
            right: [
              block(
                "The report then organized those observations into results, findings, and recommendations so the research could support product decisions.",
                "ferizy-role-right",
              ),
            ],
          },
        ],
      },
      {
        _key: "ferizy-method",
        eyebrow: "02 / Method",
        heading: "Test the actual journey, not isolated screens.",
        blocks: [
          {
            _key: "ferizy-method-lead",
            _type: "textLead",
            heading: "The five-task path",
            text: [
              block(
                "Participants moved through the flow in sequence: search for a ticket → change service and passenger details → complete reservation information → pay → return home. This exposed both local interface problems and friction created by transitions between steps.",
                "ferizy-method-text",
              ),
            ],
          },
          {
            _key: "ferizy-report-structure",
            _type: "decisionBlock",
            label: "Research output",
            title: "Turn session notes into a decision-ready report",
            decision:
              "Structure the report around methodology, tested scenarios, selected metrics, results, and findings with recommendations.",
            rationale:
              "A consistent structure makes it clearer which conclusions came from observed behaviour and which actions they suggest.",
          },
        ],
      },
      {
        _key: "ferizy-outcome-section",
        eyebrow: "03 / Outcome",
        heading: "Evidence first, impact claims second.",
        blocks: [
          {
            _key: "ferizy-outcome-block",
            _type: "outcomeBlock",
            label: "Deliverable",
            title: "A usability report with actionable recommendations",
            result:
              "The study produced a documented set of positive and negative findings and recommendations tied to the tested booking flow.",
            learning:
              "The project record does not contain verified post-release metrics, so the portfolio stops at the evidence the research can support.",
          },
        ],
      },
    ],
  },
  {
    title: "WorkHub Attendance",
    slug: "workhub-attendance",
    year: "2024",
    role: "UI/UX Designer",
    discipline: ["Product design", "UX research", "Information architecture"],
    domain: "Workplace & attendance management",
    platform: ["Android mobile app"],
    projectType: "End-to-end product design case",
    featured: true,
    homepageOrder: 2,
    shortSummary:
      "An end-to-end attendance-management concept exploring how employees can clock in, track attendance, manage tasks, and stay informed when schedules change.",
    statusNote: "12-week case study · research → IA → UI → prototype → testing",
    visualTone: "ink",
    context: [
      block(
        "WorkHub explores attendance and work coordination for employees whose schedules, tasks, and locations can change during the workday. The case combines attendance management with schedule awareness, team information, tasks, and activity reporting in one mobile experience.",
        "workhub-context",
      ),
    ],
    problem: [
      block(
        "The case study starts from communication gaps around schedule changes: employees can miss shifts or work updates when information is fragmented or delayed. The design challenge was to make time, attendance, and work coordination easier to understand from a mobile device.",
        "workhub-problem",
      ),
    ],
    users: [
      block(
        "The proposed audience spans employees, remote workers and freelancers, HR teams, public-sector organisations, and small-to-large businesses. Personas focused on people who need fast access to schedules, attendance status, timely updates, and flexible work coordination.",
        "workhub-users",
      ),
    ],
    constraints: [
      block(
        "This is a product-design case study rather than evidence of a launched attendance platform. The portfolio uses the documented research, flows, information architecture, prototype, and usability work without claiming production adoption or business impact that is not present in the source material.",
        "workhub-constraints",
      ),
    ],
    research: [
      block(
        "The discovery work combined user research, interviews, empathy mapping, personas, journey thinking, and competitive analysis. Hadirr and Clockify were reviewed to understand common attendance and time-tracking patterns, strengths, integration expectations, and gaps such as location accuracy or feature complexity.",
        "workhub-research",
      ),
    ],
    findings: [
      block(
        "The documented insights consistently pointed to a few needs: simple clock-in and clock-out, timely notifications, reliable location context, mobile accessibility, and enough collaboration context to reduce schedule confusion.",
        "workhub-findings",
      ),
    ],
    decisions: [
      block(
        "The product architecture centered on Home, Attendance, Activity, Teams, and Profile. The concept also explored GPS-assisted attendance, camera-based clock-in, attendance recap, tasks, team context, and notifications so the product could support both presence and day-to-day coordination.",
        "workhub-decisions",
      ),
    ],
    tradeOffs: [
      block(
        "The original concept covers a broad feature set. For portfolio storytelling, the case prioritizes the core attendance and coordination system rather than presenting every supporting feature as equally important.",
        "workhub-tradeoffs",
      ),
    ],
    testing: [
      block(
        "The documented process includes a usability-testing phase, survey insight, and improvement work after prototyping. The case record supports showing the validation step, but it does not provide verified adoption metrics or a production launch result.",
        "workhub-testing",
      ),
    ],
    outcome: [
      block(
        "The project resulted in a full product-design package spanning research, competitive analysis, personas, empathy mapping, card sorting, task flows, information architecture, visual design, prototype, and usability work for an Android-sized mobile experience.",
        "workhub-outcome",
      ),
    ],
    reflection: [
      block(
        "The strongest part of WorkHub is the connection between a broad workplace problem and a concrete information architecture. The main lesson is also a product lesson: when the feature surface grows, the core job—reliable attendance and schedule clarity—needs to remain visually and structurally dominant.",
        "workhub-reflection",
      ),
    ],
    externalLinks: [
      {
        _key: "workhub-figma",
        label: "Figma case study",
        url: "https://www.figma.com/file/dxltOS9zKJZEO9veQ8Usou/WorkHub-Attendance-UI%2FUX-Case-Study?type=design&t=SLHGPkelDyVXgRVa-6",
      },
      {
        _key: "workhub-behance",
        label: "Behance case study",
        url: "https://www.behance.net/gallery/189276019/WorkHub-Attendance-Mobile-Apps-UI-UX-Case-Study",
      },
      {
        _key: "workhub-pdf",
        label: "Full case-study PDF",
        url: "https://drive.google.com/file/d/1OdkLfRjn_psphNk3TwheGBw_k5w38OTC/view?usp=drive_link",
      },
    ],
    sections: [
      {
        _key: "workhub-framing",
        eyebrow: "01 / Framing",
        heading: "Attendance is not only a clock-in screen.",
        blocks: [
          {
            _key: "workhub-problem-panel",
            _type: "evidenceBlock",
            label: "Problem statement",
            title: "Schedule changes become coordination failures",
            evidence:
              "The source case describes missed shifts and miscommunication when employees do not stay informed about schedule changes.",
            interpretation:
              "The product therefore needed to connect attendance status with timely updates, not treat attendance as an isolated timestamp.",
          },
          {
            _key: "workhub-needs",
            _type: "researchFinding",
            label: "Recurring needs",
            title: "Fast attendance, timely updates, reliable context",
            evidence:
              "Research artifacts highlight intuitive clock-in/out, notifications, GPS context, camera clock-in, and coordination features.",
            interpretation:
              "These needs became the basis for prioritising the main navigation and attendance interactions.",
          },
        ],
      },
      {
        _key: "workhub-system",
        eyebrow: "02 / Product system",
        heading: "Translate research into an information architecture.",
        blocks: [
          {
            _key: "workhub-ia",
            _type: "decisionBlock",
            label: "Information architecture",
            title: "Home · Attendance · Activity · Teams · Profile",
            decision:
              "Organise the product around five persistent areas and let attendance remain accessible from both the dedicated area and the home context.",
            rationale:
              "Employees need a fast daily action for clock-in while still being able to inspect history, tasks, activity, and team information when necessary.",
          },
          {
            _key: "workhub-flows",
            _type: "twoColumnStory",
            left: [
              block(
                "Core task flows documented the clock-in process and leave application so attendance actions could be completed without navigating a complex administrative structure.",
                "workhub-flows-left",
              ),
            ],
            right: [
              block(
                "Supporting flows covered adding and cancelling tasks and recording activities, extending the product from attendance into daily work coordination.",
                "workhub-flows-right",
              ),
            ],
          },
        ],
      },
      {
        _key: "workhub-delivery",
        eyebrow: "03 / Delivery",
        heading: "From research artefacts to a testable mobile product concept.",
        blocks: [
          {
            _key: "workhub-delivery-panel",
            _type: "outcomeBlock",
            label: "Case-study output",
            title: "12 weeks of end-to-end product design",
            result:
              "The documented process spans research, competitive analysis, persona and empathy work, card sorting, flows, information architecture, wireframes, visual design, prototype, usability checking, and improvement.",
            learning:
              "The next maturity step for a real product would be to validate which supporting features materially improve attendance outcomes rather than expanding the surface by default.",
          },
        ],
      },
    ],
  },
  {
    title: "OnStreet Parking",
    slug: "onstreet-parking",
    year: "2021",
    role: "UI/UX Designer",
    discipline: ["Product exploration", "UX/UI design", "Usability planning"],
    domain: "Urban mobility & parking",
    platform: ["Mobile app concept"],
    projectType: "End-to-end product exploration",
    featured: true,
    homepageOrder: 3,
    shortSummary:
      "A two-sided parking concept designed around both visitors and parking officers, from research and service flows through wireframes, interface design, prototype, and testing plan.",
    statusNote: "Concept case · dual-user flows · prototype + testing plan",
    visualTone: "blue",
    context: [
      block(
        "OnStreet began as an exploration of a more contact-light parking experience during the pandemic period. Instead of designing only for drivers, the concept considered both people trying to park and officers responsible for parking operations.",
        "parking-context",
      ),
    ],
    problem: [
      block(
        "The research framing identified friction on both sides: visitors can struggle with payment and finding parking when areas are crowded, while officers need a clearer way to manage visitors and parking transactions.",
        "parking-problem",
      ),
    ],
    users: [
      block(
        "The concept has two primary user perspectives: visitors purchasing access and checking in, and parking officers handling operational payment and parking activity. This dual-user structure is the central systems challenge of the project.",
        "parking-users",
      ),
    ],
    research: [
      block(
        "The team used secondary research to frame the opportunity, then translated the problem into user personas, customer and officer flows, workflow diagrams, sketches, and low-fidelity screens before moving into the visual system and prototype.",
        "parking-research",
      ),
    ],
    decisions: [
      block(
        "The solution was organized around key service moments rather than a large feature list: buying access, payment, visitor check-in, and an officer-side OTC payment flow. This made the relationship between the customer experience and the operational process visible.",
        "parking-decisions",
      ),
    ],
    testing: [
      block(
        "The testing plan proposed remote, unmoderated validation of the MVP flow using completion rate, time on task, satisfaction, and open questions. Scenarios covered choosing an access plan, selecting payment, completing payment, and checking into the parking area.",
        "parking-testing",
      ),
    ],
    outcome: [
      block(
        "The concept was showcased internally and received feedback on the business value and flow. It was not presented as a shipped product; the useful outcome was the end-to-end exploration and the learning that a parking product needs a differentiated value proposition grounded in real user needs.",
        "parking-outcome",
      ),
    ],
    reflection: [
      block(
        "Looking back, the strongest idea is the two-sided service model. A future iteration should validate the operational assumptions with real parking officers earlier, before investing heavily in visual design.",
        "parking-reflection",
      ),
    ],
    externalLinks: [
      {
        _key: "parking-ideation",
        label: "Ideation & definition",
        url: "https://www.figma.com/file/BOjRtEasDCKhQ4btOR5y4z/OnStreet-Ideation-%26-Define-(Copy)?node-id=0%3A1",
      },
      {
        _key: "parking-design",
        label: "Design file",
        url: "https://www.figma.com/file/9aYTE4xsTKCKjm8NxRCA1C/OnStreet-Park-(Copy)?node-id=93%3A1062",
      },
      {
        _key: "parking-prototype",
        label: "Interactive prototype",
        url: "https://www.figma.com/proto/9aYTE4xsTKCKjm8NxRCA1C/OnStreet-Park-(Copy)?node-id=250%3A5444&scaling=scale-down&page-id=93%3A1062",
      },
    ],
    sections: [
      {
        _key: "parking-system",
        eyebrow: "01 / Service model",
        heading: "One parking experience, two very different users.",
        blocks: [
          {
            _key: "parking-dual-user",
            _type: "twoColumnStory",
            left: [
              block(
                "Visitor: choose access → choose payment → pay → check in. The interface needs to minimise uncertainty at the moment someone arrives and wants to park quickly.",
                "parking-visitor",
              ),
            ],
            right: [
              block(
                "Parking officer: support operational payment and visitor handling. The officer flow exists because a digital customer experience still depends on what happens on site.",
                "parking-officer",
              ),
            ],
          },
          {
            _key: "parking-decision",
            _type: "decisionBlock",
            label: "Design decision",
            title: "Model the service before polishing the screens",
            decision:
              "Define customer and officer flows before high-fidelity design so each interface step maps to an operational step.",
            rationale:
              "Parking is a service interaction, not only a mobile checkout. The digital flow has to remain coherent with the physical parking process.",
          },
        ],
      },
      {
        _key: "parking-validation",
        eyebrow: "02 / Validation",
        heading: "A test plan for the critical parking path.",
        blocks: [
          {
            _key: "parking-test-panel",
            _type: "evidenceBlock",
            label: "Planned validation",
            title: "Remote, unmoderated MVP testing",
            evidence:
              "The plan measures completion, time on task, satisfaction, and qualitative feedback across access-plan selection, payment, and check-in.",
            interpretation:
              "The most useful next step would be pairing this interface test with field research on the officer-side process and actual parking constraints.",
          },
        ],
      },
    ],
  },
  {
    title: "Jago Last Wish",
    slug: "jago-last-wish",
    year: "2022",
    role: "UI/UX Designer",
    discipline: ["Design thinking", "Product concept", "Interface design"],
    domain: "Financial services / life insurance",
    platform: ["Mobile app concept"],
    projectType: "Skilvul product-design challenge",
    featured: false,
    homepageOrder: 4,
    shortSummary:
      "A team design challenge exploring how life-insurance and end-of-life planning could feel less intimidating through a more approachable mobile experience.",
    statusNote:
      "Skilvul / Digital Talent Scholarship challenge · Bank Jago was the challenge partner · not commissioned professional work",
    visualTone: "green",
    context: [
      block(
        "Jago Last Wish was created in the UI/UX Design Mastery program by Skilvul for the Digital Talent Scholarship – Professional Academy program. Bank Jago was the challenge partner; this was not employment, a client engagement, or a shipped Bank Jago feature designed by me.",
        "jago-context",
      ),
    ],
    problem: [
      block(
        "The central design question was emotional as much as functional: how might a life-insurance and last-wish experience reduce the negative connotation around planning for death and make the process feel more motivating, positive, and sincere?",
        "jago-problem",
      ),
    ],
    users: [
      block(
        "The team used the challenge brief and secondary research on life insurance in Indonesia to build a probable-user persona and identify pain points before moving into solution design.",
        "jago-users",
      ),
    ],
    research: [
      block(
        "The project followed a design-thinking process: secondary research and persona work, pain-point definition, How Might We framing, voting and prioritisation, affinity mapping, Crazy 8s, user flows, interface design, prototype, and testing.",
        "jago-research",
      ),
    ],
    decisions: [
      block(
        "The selected HMW became the filter for solution ideas: transform death planning from something intimidating into an experience that feels motivating, upbeat, and sincere. Ideas were clustered and prioritised before the team committed to flows and UI.",
        "jago-decisions",
      ),
    ],
    testing: [
      block(
        "The prototype was tested remotely and unmoderated. Scenarios included registration, creating a last wish, choosing a payment method, paying, and claiming insurance. The plan considered completion rate, time on task, satisfaction, and open feedback.",
        "jago-testing",
      ),
    ],
    outcome: [
      block(
        "The documented testing summary reports that participants found the design easy to use and described the Challenges feature as creative and simple. These are learning outcomes from an academic challenge, not production or commercial results.",
        "jago-outcome",
      ),
    ],
    reflection: [
      block(
        "Working in an unfamiliar domain made the framing especially important. The main lesson was to use research and prioritisation to reduce the temptation to solve a sensitive financial topic with interface polish alone.",
        "jago-reflection",
      ),
    ],
    externalLinks: [
      {
        _key: "jago-ideation",
        label: "Design-thinking workspace",
        url: "https://www.figma.com/file/opGwHmNdcncvyeQAjPQQf1/Design-Thinking%3A-Define-%26-Ideate-(Template)-(Copy)-(Copy)-(Copy)-(Copy)-(Copy)?node-id=0%3A1",
      },
      {
        _key: "jago-design",
        label: "Final design file",
        url: "https://www.figma.com/file/I3ipWwHMvzyF1K8t3DyQDn/Jago-Last-Wish?node-id=137%3A666",
      },
      {
        _key: "jago-prototype",
        label: "Interactive prototype",
        url: "https://www.figma.com/proto/I3ipWwHMvzyF1K8t3DyQDn/Jago-Last-Wish?node-id=712%3A856&scaling=scale-down&page-id=712%3A851&starting-point-node-id=712%3A852",
      },
    ],
    sections: [
      {
        _key: "jago-framing-section",
        eyebrow: "01 / Framing",
        heading: "A sensitive topic needed a better emotional frame.",
        blocks: [
          {
            _key: "jago-hmw",
            _type: "pullQuote",
            quote:
              "Transform the negative connotation associated with death planning into one that is motivating, upbeat, and sincere.",
            attribution: "Selected How Might We direction",
          },
          {
            _key: "jago-process",
            _type: "decisionBlock",
            label: "Prioritisation",
            title: "Use the HMW as a filter, not decoration",
            decision:
              "Cluster ideas, vote, and prioritise before moving into Crazy 8s and user flows.",
            rationale:
              "The challenge produced many possible ideas; prioritisation kept the final concept connected to the emotional problem the team had defined.",
          },
        ],
      },
      {
        _key: "jago-validation-section",
        eyebrow: "02 / Validation",
        heading: "Test the complete concept flow.",
        blocks: [
          {
            _key: "jago-validation-panel",
            _type: "outcomeBlock",
            label: "Testing summary",
            title: "Remote, unmoderated prototype testing",
            result:
              "The documented summary says the overall design was considered easy to use and that the Challenges feature was seen as creative and simple.",
            learning:
              "Because this was an academic challenge, these findings are presented as prototype feedback rather than evidence of a launched financial product.",
          },
        ],
      },
    ],
  },
];

export const experiences: Experience[] = [
  {
    organisation: "PT Nutech Integrasi (Telkom Indonesia Group)",
    role: "UX/UI Designer",
    period: "Mar 2022 — Present",
    summary:
      "Designing user-centered digital products in cross-functional environments, connecting interface design and UX research with business requirements and technical feasibility across complex IT and transportation-oriented solutions.",
    order: 1,
  },
  {
    organisation: "PT Galeri Teknologi Bersama",
    role: "Web Developer",
    period: "Dec 2021 — Feb 2022",
    summary:
      "Worked on web development before moving deeper into UX/UI, building the technical foundation that still shapes how I think about implementation constraints and collaboration with engineering.",
    order: 2,
  },
];

export const playground: PlaygroundItem[] = [
  {
    title: "Lost & Found",
    slug: "lost-and-found",
    year: "2021 · Early practice",
    medium: "UX/UI practice · Web operations",
    summary:
      "An early web-app exercise for mall security and administration teams to replace manual lost-item recording with a clearer reporting flow, user scenario, information flow, style guide, and interface design.",
    note: "Practice project · not presented as shipped professional work",
  },
];

export const about: About = {
  heading:
    "I move between research, product systems, interface design, and the technical realities underneath them.",
  bio: [
    block(
      "My background spans UX/UI design and web development. That mix helps me work from both sides of a product problem: understanding people and workflows, then asking how the rules, data, integrations, and implementation constraints shape the experience we can responsibly build.",
      "about-bio-1",
    ),
    block(
      "I am most useful on products where the interface is only one layer of the problem—work that needs research, structured flows, stakeholder translation, and enough technical fluency to keep design decisions grounded.",
      "about-bio-2",
    ),
  ],
  availability:
    "Open to product, UX, and experience-design opportunities where systems thinking matters.",
};

export const settings: SiteSettings = {
  title: "Nabilla Zachra — Product & Experience Designer",
  description:
    "Portfolio of Nabilla Zachra, a Product & Experience Designer working across research, product systems, interface design, and technical problem solving.",
  email: "",
  location: "Indonesia",
  socialLinks: [
    {
      _key: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/nabilla-zachra/",
    },
    {
      _key: "github",
      label: "GitHub",
      url: "https://github.com/nabillazachra",
    },
  ],
  approach: [
    {
      _key: "evidence",
      title: "Start with evidence",
      text: "Observe behaviour, separate evidence from assumption, and make uncertainty visible before choosing a direction.",
    },
    {
      _key: "systems",
      title: "Think past the screen",
      text: "Map the people, rules, data, operations, and technical constraints that have to work together for an interface to make sense.",
    },
    {
      _key: "craft",
      title: "Make complexity legible",
      text: "Use hierarchy, language, flows, and interaction details to make complex systems easier to understand and act on.",
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
