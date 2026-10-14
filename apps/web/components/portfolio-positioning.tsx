import { CountUpNumber } from "./count-up-number";
import styles from "./portfolio-positioning.module.css";

const IMPACT = [
  { value: 5, suffix: "+", label: "Years across digital products, UX & software" },
  { value: 50, suffix: "+", label: "Web, mobile & tablet interfaces" },
  { value: 10, suffix: "+", label: "Kiosk & self-service systems" },
  { value: 5000, suffix: "+", label: "UI/UX learners supported" },
];

const WORKFLOW = [
  {
    index: "01",
    title: "Business",
    items: ["Requirements", "Stakeholders", "Process", "Constraints"],
  },
  {
    index: "02",
    title: "System",
    items: ["Functional specs", "Flows", "Integration", "Feasibility"],
  },
  {
    index: "03",
    title: "Experience",
    items: ["Research", "User journeys", "Interface", "Validation"],
  },
];

const CAPABILITIES = [
  {
    index: "01",
    phase: "Discover",
    title: "Requirements & system analysis",
    artifacts: ["Requirement notes", "Gap mapping"],
    detail: "Clarify business needs, constraints, dependencies, and system implications before defining the solution.",
  },
  {
    index: "02",
    phase: "Architect",
    title: "Solution design",
    artifacts: ["Solution scope", "Component mapping"],
    detail: "Shape the solution structure and connect business needs to a technically feasible system approach.",
  },
  {
    index: "03",
    phase: "Architect",
    title: "Functional specifications",
    artifacts: ["Functional requirements", "Business rules"],
    detail: "Translate requirements into clear system behaviour that can be reviewed, estimated, and implemented.",
  },
  {
    index: "04",
    phase: "Architect",
    title: "Process & system flows",
    artifacts: ["Process flow", "System flow"],
    detail: "Make interactions, handoffs, dependencies, and expected system behaviour visible before implementation.",
  },
  {
    index: "05",
    phase: "Validate",
    title: "Technical evaluation",
    artifacts: ["Comparison", "Recommendation"],
    detail: "Compare technical options against requirements, interoperability, implementation constraints, and fit.",
  },
  {
    index: "06",
    phase: "Validate",
    title: "Compliance mapping",
    artifacts: ["Compliance matrix", "Gap evidence"],
    detail: "Trace requirements against proposed solutions and surface gaps, assumptions, or clarifications early.",
  },
  {
    index: "07",
    phase: "Deliver",
    title: "Presales documentation",
    artifacts: ["BoQ", "SoW", "Technical proposal"],
    detail: "Structure technical inputs into documentation that supports estimation, procurement, and delivery alignment.",
  },
  {
    index: "08",
    phase: "Deliver",
    title: "Stakeholder & vendor coordination",
    artifacts: ["Clarification", "Alignment", "Follow-up"],
    detail: "Keep business, internal teams, and vendors aligned around requirements, decisions, and technical dependencies.",
  },
];

export function ImpactStrip() {
  return (
    <section className={styles.impact} aria-label="Selected impact">
      <div className={styles.impactGrid}>
        {IMPACT.map((item, index) => (
          <div className={styles.metric} key={item.label}>
            <CountUpNumber delay={index * 100} value={item.value} suffix={item.suffix} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function WorkMethod() {
  return (
    <section className={styles.method} aria-labelledby="method-title">
      <div className="shell">
        <header className={styles.methodHeader}>
          <p className="section-index">03</p>
          <div>
            <p className={styles.eyebrow}>How I work</p>
            <h2 id="method-title">Business → system → experience.</h2>
          </div>
          <p className={styles.methodIntro}>
            I work across the layers of a product problem: what the business
            needs, how the system has to behave, and what people ultimately
            need to understand and do.
          </p>
        </header>

        <div className={`${styles.methodSignal} ${styles.desktopOnly}`} aria-hidden="true">
          <span>Input / Business need</span>
          <i />
          <span>Logic / System behaviour</span>
          <i />
          <span>Output / Human experience</span>
        </div>

        <div className={`${styles.workflow} ${styles.desktopOnly}`}>
          {WORKFLOW.map((step, index) => (
            <article className={styles.workflowStep} key={step.title}>
              <span className={styles.workflowNode} aria-hidden="true" />
              <div className={styles.stepTop}>
                <span>{step.index}</span>
                <span>{index < WORKFLOW.length - 1 ? "→" : "↗"}</span>
              </div>
              <h3>{step.title}</h3>
              <ul>
                {step.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className={styles.mobileAccordion}>
          {WORKFLOW.map((step) => (
            <details className={styles.mobileDisclosure} key={step.title}>
              <summary>
                <span>{step.index}</span>
                <strong>{step.title}</strong>
                <i aria-hidden="true">+</i>
              </summary>
              <div className={styles.mobileDisclosureBody}>
                <ul>
                  {step.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PrivateWork() {
  return (
    <section className={styles.privateWork} aria-labelledby="private-work-title">
      <div className="shell">
        <p className={styles.privateIndex}>04 / Confidential systems & solutions</p>
        <div className={styles.dossierMeta} aria-hidden="true">
          <span>Access / Private</span>
          <span>Client-sensitive material</span>
          <span>Selected disclosure only</span>
        </div>
        <div className={styles.privateLead}>
          <h2 id="private-work-title">
            Some of my most recent work cannot live on the internet.
          </h2>
          <p>
            Recent technical-solution work includes enterprise applications,
            IT infrastructure, managed services, transportation-related
            solutions, technical evaluation, system flows, compliance mapping,
            and presales documentation. Detailed materials are kept private
            because of client and project confidentiality.
          </p>
        </div>

        <div className={`${styles.capabilityMap} ${styles.desktopOnly}`}>
          <div className={styles.phaseRail} aria-hidden="true">
            <span>Discover</span>
            <span>Architect</span>
            <span>Validate</span>
            <span>Deliver</span>
          </div>

          <div className={styles.systemSpine} aria-hidden="true">
            <span>From requirement</span>
            <i />
            <strong>02 / Solution design</strong>
            <i />
            <span>To implementation</span>
          </div>

          <div className={styles.capabilityNodes}>
            {CAPABILITIES.map((item) => (
              <article
                className={`${styles.capabilityNode} ${item.index === "02" ? styles.capabilityCore : ""}`}
                data-capability={item.index}
                key={item.index}
                tabIndex={0}
              >
                <div className={styles.capabilityNodeTop}>
                  <span>{item.index}</span>
                  <span>{item.phase}</span>
                </div>
                <h3>{item.title}</h3>
                <div className={styles.artifactTags}>
                  {item.artifacts.map((artifact) => (
                    <span key={artifact}>{artifact}</span>
                  ))}
                </div>
                <div className={styles.capabilityDetail}>
                  <span>Role / output</span>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>

          <p className={styles.systemCaption} aria-hidden="true">
            Systems / Solutions / Delivery
          </p>
        </div>

        <div className={`${styles.capabilityTimeline} ${styles.mobileAccordion}`}>
          <p className={styles.timelineLabel}>Technical solution workflow</p>
          {CAPABILITIES.map((item) => (
            <details className={styles.timelineItem} key={item.index}>
              <summary>
                <span className={styles.timelineIndex}>{item.index}</span>
                <span className={styles.timelineTitle}>
                  <small>{item.phase}</small>
                  <strong>{item.title}</strong>
                </span>
                <i aria-hidden="true">+</i>
              </summary>
              <div className={styles.timelineBody}>
                <p>{item.detail}</p>
                <div className={styles.timelineArtifacts}>
                  {item.artifacts.map((artifact) => (
                    <span key={artifact}>{artifact}</span>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>

        <div className={styles.privateFooter}>
          <span className={styles.privateStamp}>Portfolio / Restricted view</span>
        <a
          className={styles.privateCta}
          href="mailto:nabillazachra14@gmail.com?subject=Private%20Portfolio%20Request"
        >
          Request private portfolio <span aria-hidden="true">↗</span>
        </a>
        </div>
      </div>
    </section>
  );
}

export function CareerArc() {
  return (
    <>
      <div className={`${styles.careerArc} ${styles.desktopOnly}`} aria-label="Career progression">
      <article>
        <p className={styles.arcMeta}>BUILD / SOFTWARE FOUNDATION</p>
        <h3>From code and implementation.</h3>
        <p>
          Web development, CMS work, testing, SIT/UAT documentation, and the
          technical foundation behind how I think about products.
        </p>
        <span>2017 · 2020—2022</span>
      </article>
      <article>
        <p className={styles.arcMeta}>DESIGN / PRODUCT & UX</p>
        <h3>Into users, flows, and interfaces.</h3>
        <p>
          End-to-end UX/UI, design systems, enterprise interfaces, kiosks,
          research, prototyping, and usability testing.
        </p>
        <span>2022—2026</span>
      </article>
      <article>
        <p className={styles.arcMeta}>CONSULT / SYSTEMS & SOLUTIONS</p>
        <h3>Now connecting business to systems.</h3>
        <p>
          Requirements, solution scope, functional specifications, evaluation,
          compliance, stakeholder translation, and presales delivery.
        </p>
        <span>2026—NOW</span>
      </article>
      </div>

      <div className={`${styles.mobileAccordion} ${styles.careerMobile}`} aria-label="Career progression">
        <details className={styles.mobileDisclosure}>
          <summary>
            <span>2017 · 2020—2022</span>
            <strong>Build / Software foundation</strong>
            <i aria-hidden="true">+</i>
          </summary>
          <div className={styles.mobileDisclosureBody}>
            <h3>From code and implementation.</h3>
            <p>
              Web development, CMS work, testing, SIT/UAT documentation, and the
              technical foundation behind how I think about products.
            </p>
          </div>
        </details>
        <details className={styles.mobileDisclosure}>
          <summary>
            <span>2022—2026</span>
            <strong>Design / Product & UX</strong>
            <i aria-hidden="true">+</i>
          </summary>
          <div className={styles.mobileDisclosureBody}>
            <h3>Into users, flows, and interfaces.</h3>
            <p>
              End-to-end UX/UI, design systems, enterprise interfaces, kiosks,
              research, prototyping, and usability testing.
            </p>
          </div>
        </details>
        <details className={styles.mobileDisclosure}>
          <summary>
            <span>2026—Now</span>
            <strong>Consult / Systems & solutions</strong>
            <i aria-hidden="true">+</i>
          </summary>
          <div className={styles.mobileDisclosureBody}>
            <h3>Now connecting business to systems.</h3>
            <p>
              Requirements, solution scope, functional specifications, evaluation,
              compliance, stakeholder translation, and presales delivery.
            </p>
          </div>
        </details>
      </div>
    </>
  );
}

export function TeachingStrip() {
  return (
    <section className={styles.teaching} aria-labelledby="teaching-title">
      <div className="shell">
        <div className={styles.teachingHeader}>
          <p className="section-index">06</p>
          <h2 id="teaching-title">Teaching design, too.</h2>
          <p>
            Explaining product thinking to other people has made my own
            decision-making sharper.
          </p>
        </div>
        <div className={styles.teachingGrid}>
          <article>
            <span>2024</span>
            <h3>UI/UX Design Mentor</h3>
            <p>Telkom Indonesia · Hipster Class</p>
            <strong>10+ participants</strong>
          </article>
          <article>
            <span>2023—2024</span>
            <h3>Assistant UI/UX Instructor</h3>
            <p>Skill Academy by Ruangguru</p>
            <strong>5,000+ learners supported</strong>
          </article>
        </div>
      </div>
    </section>
  );
}
