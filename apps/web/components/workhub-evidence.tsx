import styles from "./workhub-evidence.module.css";

type WorkHubEvidenceProps = {
  variant: "framing" | "research" | "architecture" | "flows" | "delivery";
};

const Arrow = () => <span className={styles.arrow}>→</span>;

export function WorkHubEvidence({ variant }: WorkHubEvidenceProps) {
  if (variant === "framing") {
    return (
      <section className={styles.panel} aria-label="WorkHub problem framing">
        <div className={styles.split}>
          <article className={styles.card}>
            <p className={styles.eyebrow}>Problem</p>
            <h3>Communication gaps on schedule changes</h3>
            <p>
              Employees can miss shifts and work updates when schedule changes
              are fragmented or delayed.
            </p>
          </article>
          <article className={`${styles.card} ${styles.accentCard}`}>
            <p className={styles.eyebrow}>Design response</p>
            <h3>Make schedule context visible where attendance happens</h3>
            <p>
              Bring clock-in, notifications, attendance history, and team context
              into one mobile experience.
            </p>
          </article>
        </div>
      </section>
    );
  }

  if (variant === "research") {
    return (
      <section className={styles.panel} aria-label="WorkHub research and timeline">
        <div className={styles.metrics}>
          <div><strong>12</strong><span>weeks</span></div>
          <div><strong>5</strong><span>design stages</span></div>
          <div><strong>2</strong><span>competitors reviewed</span></div>
        </div>
        <div className={styles.timeline}>
          {[
            ["01", "Research", "Interviews · competitor scan"],
            ["02", "Define", "Persona · empathy · problem"],
            ["03", "Structure", "Card sorting · IA · flows"],
            ["04", "Design", "Wireframes · visual system"],
            ["05", "Validate", "Prototype · usability check"],
          ].map(([n, title, note]) => (
            <div className={styles.timelineStep} key={n}>
              <span>{n}</span>
              <h4>{title}</h4>
              <p>{note}</p>
            </div>
          ))}
        </div>
        <div className={styles.chips}>
          {[
            "Simple clock-in/out",
            "Timely notifications",
            "Accurate location context",
            "Camera clock-in",
            "Collaboration context",
          ].map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>
    );
  }

  if (variant === "architecture") {
    return (
      <section className={styles.panel} aria-label="WorkHub information architecture">
        <div className={styles.architecture}>
          <div className={styles.nodePrimary}>Start page</div>
          <Arrow />
          <div className={styles.authRow}>
            <div className={styles.node}>Sign up</div>
            <span>or</span>
            <div className={styles.node}>Login</div>
          </div>
          <Arrow />
          <div className={styles.nodePrimary}>Home</div>
          <div className={styles.branchGrid}>
            {[
              ["Home", "Profile · clock-in card · notifications · articles"],
              ["Attendance", "Recap · clock-in · clock-out · leave"],
              ["Activity", "Tasks · status · add activity · detail"],
              ["Teams", "Division head · team list · team detail"],
            ].map(([title, note]) => (
              <article className={styles.branch} key={title}>
                <h4>{title}</h4>
                <p>{note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "flows") {
    const flows = [
      ["Clock-in", ["Home", "Clock-in", "Location", "Camera", "Confirm", "Attendance"]],
      ["Apply leave", ["Attendance", "Leave", "Form", "Reason", "Submit", "Status"]],
      ["Task / activity", ["Activity", "Add", "Details", "Save", "Track progress", "Complete"]],
    ] as const;

    return (
      <section className={styles.panel} aria-label="WorkHub core task flows">
        <div className={styles.flowList}>
          {flows.map(([title, steps]) => (
            <article className={styles.flowRow} key={title}>
              <h4>{title}</h4>
              <div className={styles.flowSteps}>
                {steps.map((step, index) => (
                  <span className={styles.flowStepWrap} key={step}>
                    <span className={styles.flowStep}>{step}</span>
                    {index < steps.length - 1 ? <Arrow /> : null}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  const screens = [
    ["Onboarding", "For your own attendance"],
    ["Sign in", "Email · password · social sign-in"],
    ["Verification", "OTP confirmation"],
    ["Home", "Clock-in card · articles · navigation"],
    ["Clock-in", "Location · workplace type · confirm"],
    ["Attendance", "Presence recap · daily history"],
    ["Tasks", "Status · project · progress"],
    ["Teams", "Members · hours · team details"],
  ];

  return (
    <section className={styles.panel} aria-label="WorkHub final interface overview">
      <div className={styles.phoneGrid}>
        {screens.map(([title, note], index) => (
          <article className={styles.phone} key={title}>
            <div className={styles.phoneTop} />
            <div className={styles.phoneBrand}>WorkHub</div>
            <div className={styles.phoneVisual}>
              <span className={index % 3 === 0 ? styles.bigBlock : styles.smallBlock} />
              <span className={styles.line} />
              <span className={styles.lineShort} />
              <span className={styles.action} />
            </div>
            <div className={styles.phoneCopy}>
              <h4>{title}</h4>
              <p>{note}</p>
            </div>
          </article>
        ))}
      </div>
      <p className={styles.sourceNote}>
        Interface structure reconstructed from the original WorkHub case-study
        screens so the portfolio stays sharp at any viewport size.
      </p>
    </section>
  );
}
