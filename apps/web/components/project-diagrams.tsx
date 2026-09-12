import styles from "./project-diagrams.module.css";

const onStreetVisitor = [
  "Choose a daily or membership access plan",
  "Choose a payment method",
  "Complete payment",
  "Check in to the parking area",
];

const onStreetOfficer = [
  "See the operational parking context",
  "Support visitor handling on site",
  "Process officer-side OTC payment when needed",
  "Keep the physical and digital service aligned",
];

const jagoSteps = [
  {
    title: "Research",
    text: "Use the challenge brief and secondary research to understand life-insurance context and probable users.",
  },
  {
    title: "Define",
    text: "Turn pain points into How Might We statements, then vote on the framing that should guide the concept.",
  },
  {
    title: "Ideate",
    text: "Generate solution ideas, cluster them with an affinity diagram, and prioritise by value and effort.",
  },
  {
    title: "Sketch",
    text: "Use Crazy 8s to move quickly from abstract ideas toward candidate interface directions.",
  },
  {
    title: "Flow + prototype",
    text: "Model Last Wish, payment, and insurance-claim flows before building the interactive prototype.",
  },
  {
    title: "Test",
    text: "Run remote unmoderated scenarios across registration, creating a last wish, payment, and claim.",
  },
];

export function OnStreetSystemMap() {
  return (
    <aside className={styles.diagram} aria-labelledby="onstreet-system-title">
      <div className={styles.titleRow}>
        <p className="mono-label">Two-sided service</p>
        <h3 id="onstreet-system-title">
          The mobile flow only works if the on-site operation works with it.
        </h3>
      </div>

      <div className={styles.lanes}>
        <article className={styles.lane}>
          <p className="mono-label">Visitor lane</p>
          <h4>Get access and enter with less friction.</h4>
          <ol className={styles.flow}>
            {onStreetVisitor.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </article>

        <article className={styles.lane}>
          <p className="mono-label">Parking-officer lane</p>
          <h4>Keep the operational side visible.</h4>
          <ol className={styles.flow}>
            {onStreetOfficer.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </article>
      </div>

      <p className={styles.bridge}>
        The original case documents customer flow, parking-officer flow, Buy
        Access, Check-In, and officer OTC payment. This map keeps the portfolio
        focused on the service relationship rather than presenting parking as
        only a checkout UI.
      </p>
    </aside>
  );
}

export function JagoProcessMap() {
  return (
    <aside className={styles.diagram} aria-labelledby="jago-process-title">
      <div className={styles.titleRow}>
        <p className="mono-label">Framing → validation</p>
        <h3 id="jago-process-title">
          The emotional framing became the filter for every later decision.
        </h3>
      </div>

      <div className={styles.hmw}>
        <p className="mono-label">Selected How Might We</p>
        <blockquote>
          Transform the negative connotation associated with death planning
          into one that is motivating, upbeat, and sincere.
        </blockquote>
      </div>

      <div className={styles.process}>
        {jagoSteps.map((step, index) => (
          <article className={styles.step} key={step.title}>
            <p className="mono-label">
              {String(index + 1).padStart(2, "0")}
            </p>
            <strong>{step.title}</strong>
            <p>{step.text}</p>
          </article>
        ))}
      </div>

      <div className={styles.testing}>
        <article>
          <p className="mono-label">Prototype feedback</p>
          <strong>Easy to use</strong>
          <p>
            The documented testing summary says participants considered the
            overall prototype quite easy to use.
          </p>
        </article>
        <article>
          <p className="mono-label">Feature feedback</p>
          <strong>Creative + simple</strong>
          <p>
            Participants described the Challenges feature as creative and
            simple to use. This remains prototype feedback, not a production
            metric.
          </p>
        </article>
      </div>
    </aside>
  );
}
