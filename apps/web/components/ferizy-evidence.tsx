import styles from "./ferizy-evidence.module.css";

const findings = [
  {
    stat: "4/5",
    title: "Booking speed was interrupted",
    points: [
      "4 of 5 participants complained about the Terms & Conditions pop-up appearing when selecting harbor arrival time.",
      "3 of 5 were frustrated by having to re-enter completed fields when changing the ticket schedule.",
      "3 of 5 were annoyed by the passenger-age field behaviour.",
    ],
  },
  {
    stat: "4/5",
    title: "Editing became a dead end",
    points: [
      "4 of 5 participants were frustrated because Back returned them to the application home instead of the previous booking step.",
      "3 of 5 had difficulty finding how to change the payment method.",
    ],
  },
  {
    stat: "4/5",
    title: "Form language created uncertainty",
    points: [
      "4 of 5 participants were confused by the City / District field on the passenger manifest.",
      "3 of 5 had difficulty identifying the correct vehicle category.",
    ],
  },
];

const recommendations = [
  "Make Back navigation return to the previous booking step and let people intentionally save or discard the current data.",
  "Consolidate Terms & Conditions instead of repeatedly interrupting the booking flow.",
  "Rewrite ambiguous form labels and restructure information so critical instructions can be scanned quickly.",
  "Add an edit-order path that lets people change booking details without restarting the entire process.",
];

export function FerizyEvidence() {
  return (
    <aside className={styles.wrap} aria-labelledby="ferizy-findings-title">
      <div className={styles.header}>
        <p className="mono-label">Observed friction</p>
        <h3 id="ferizy-findings-title">Three patterns emerged from five moderated sessions.</h3>
      </div>

      <div className={styles.grid}>
        {findings.map((finding) => (
          <article className={styles.finding} key={finding.title}>
            <p className="mono-label">Participant evidence</p>
            <strong className={styles.stat}>{finding.stat}</strong>
            <h4>{finding.title}</h4>
            <ul>
              {finding.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className={styles.recommendations}>
        <div className={styles.recommendationsHeader}>
          <p className="mono-label">Research → direction</p>
          <p>
            Recommendations stay traceable to observed behaviour instead of
            becoming an unrelated redesign wish list.
          </p>
        </div>
        <ol className={styles.recommendationList}>
          {recommendations.map((recommendation, index) => (
            <li key={recommendation}>
              <span className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{recommendation}</p>
            </li>
          ))}
        </ol>
      </div>

      <p className={styles.source}>
        Source: the published Ferizy usability-testing case and its report. {" "}
        <a
          href="https://medium.com/@nabillazachra14/ferizy-usability-testing-990c0c293830"
          rel="noreferrer"
          target="_blank"
        >
          Read the original case ↗
        </a>
      </p>
    </aside>
  );
}
