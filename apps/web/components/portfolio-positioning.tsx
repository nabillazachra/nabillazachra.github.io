import styles from "./portfolio-positioning.module.css";

const IMPACT = [
  { value: "5+", label: "Years across digital products, UX & software" },
  { value: "50+", label: "Web, mobile & tablet interfaces" },
  { value: "10+", label: "Kiosk & self-service systems" },
  { value: "5,000+", label: "UI/UX learners supported" },
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
  "Requirements & system analysis",
  "Solution design",
  "Functional specifications",
  "Process & system flows",
  "Technical evaluation",
  "Compliance mapping",
  "Presales documentation",
  "Stakeholder & vendor coordination",
];

export function ImpactStrip() {
  return (
    <section className={styles.impact} data-reveal="section" aria-label="Selected impact">
      <div className={styles.impactGrid}>
        {IMPACT.map((item) => (
          <div className={styles.metric} data-reveal="metric" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function WorkMethod() {
  return (
    <section className={styles.method} data-reveal="section" aria-labelledby="method-title">
      <div className="shell">
        <header className={styles.methodHeader} data-reveal="heading">
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

        <div className={styles.workflow}>
          {WORKFLOW.map((step, index) => (
            <article className={styles.workflowStep} data-reveal="panel" key={step.title}>
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
      </div>
    </section>
  );
}

export function PrivateWork() {
  return (
    <section className={styles.privateWork} data-reveal="section" aria-labelledby="private-work-title">
      <div className="shell">
        <p className={styles.privateIndex}>04 / Confidential systems & solutions</p>
        <div className={styles.privateLead} data-reveal="heading">
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

        <div className={styles.capabilities}>
          {CAPABILITIES.map((item, index) => (
            <div data-reveal="cell" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>

        <a
          className={styles.privateCta}
          href="mailto:nabillazachra14@gmail.com?subject=Private%20Portfolio%20Request"
        >
          Request private portfolio <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

export function CareerArc() {
  return (
    <div className={styles.careerArc} data-reveal="section" aria-label="Career progression">
      <article data-reveal="panel">
        <p className={styles.arcMeta}>BUILD / SOFTWARE FOUNDATION</p>
        <h3>From code and implementation.</h3>
        <p>
          Web development, CMS work, testing, SIT/UAT documentation, and the
          technical foundation behind how I think about products.
        </p>
        <span>2017 · 2020—2022</span>
      </article>
      <article data-reveal="panel">
        <p className={styles.arcMeta}>DESIGN / PRODUCT & UX</p>
        <h3>Into users, flows, and interfaces.</h3>
        <p>
          End-to-end UX/UI, design systems, enterprise interfaces, kiosks,
          research, prototyping, and usability testing.
        </p>
        <span>2022—2026</span>
      </article>
      <article data-reveal="panel">
        <p className={styles.arcMeta}>CONSULT / SYSTEMS & SOLUTIONS</p>
        <h3>Now connecting business to systems.</h3>
        <p>
          Requirements, solution scope, functional specifications, evaluation,
          compliance, stakeholder translation, and presales delivery.
        </p>
        <span>2026—NOW</span>
      </article>
    </div>
  );
}

export function TeachingStrip() {
  return (
    <section className={styles.teaching} data-reveal="section" aria-labelledby="teaching-title">
      <div className="shell">
        <div className={styles.teachingHeader} data-reveal="heading">
          <p className="section-index">06</p>
          <h2 id="teaching-title">Teaching design, too.</h2>
          <p>
            Explaining product thinking to other people has made my own
            decision-making sharper.
          </p>
        </div>
        <div className={styles.teachingGrid}>
          <article data-reveal="panel">
            <span>2024</span>
            <h3>UI/UX Design Mentor</h3>
            <p>Telkom Indonesia · Hipster Class</p>
            <strong>10+ participants</strong>
          </article>
          <article data-reveal="panel">
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
