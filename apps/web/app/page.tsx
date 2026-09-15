import Link from "next/link";

import { ExternalLink } from "@/components/external-link";
import { ProjectArtwork } from "@/components/project-artwork";
import { ProjectList } from "@/components/project-list";
import { RichText } from "@/components/rich-text";
import { getHomeContent } from "@/lib/content/get-content";
import aboutStyles from "./about-section.module.css";

export default async function HomePage() {
  const { projects, experiences, playground, about, settings } =
    await getHomeContent();
  const selected = projects.filter((project) => project.featured);
  const other = projects.filter((project) => !project.featured);

  return (
    <main id="main-content">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-kicker reveal">
          <span aria-hidden="true">●</span>
          <p>Independent portfolio / Selected work</p>
        </div>
        <h1 className="reveal reveal-delay" id="hero-title">
          I design products
          <br />
          for <em>real people.</em>
        </h1>
        <p className="hero-intro reveal reveal-delay-2">
          Product &amp; Experience Designer connecting <strong>research</strong>
          , product thinking, and interface craft—with a technical background
          that keeps ideas grounded in how things work.
        </p>
        <div className="hero-foot reveal reveal-delay-2">
          <p>Based in {settings.location || "Indonesia"}</p>
          <a href="#work">View selected work ↓</a>
          <p className="hero-coordinate">Research / Systems / Interface</p>
        </div>
      </section>

      <section
        className="section shell selected-work"
        id="work"
        aria-labelledby="work-title"
      >
        <header className="section-heading">
          <p className="section-index">01</p>
          <h2 id="work-title">Selected Work</h2>
          <p>
            Cases chosen for the quality of the question—not inflated claims
            about the answer.
          </p>
        </header>
        <ProjectList projects={selected} />
      </section>

      {other.length ? (
        <section
          className="section shell other-work"
          aria-labelledby="other-work-title"
        >
          <header className="section-heading compact-heading">
            <p className="section-index">02</p>
            <h2 id="other-work-title">Other Work</h2>
          </header>
          {other.map((project, index) => (
            <article className="other-work-row" key={project.slug}>
              <div>
                <p className="mono-label">{project.projectType}</p>
                <h3>{project.title}</h3>
              </div>
              <p>{project.shortSummary}</p>
              <Link className="text-link" href={`/work/${project.slug}`}>
                Explore <span aria-hidden="true">↗</span>
              </Link>
              <div className="other-artwork">
                <ProjectArtwork
                  index={index + selected.length}
                  project={project}
                />
              </div>
            </article>
          ))}
        </section>
      ) : null}

      <section className="section thinking" aria-labelledby="thinking-title">
        <div className="shell thinking-grid">
          <header className="section-heading inverse-heading">
            <p className="section-index">03</p>
            <h2 id="thinking-title">How I Think</h2>
          </header>
          <p className="thinking-lead">
            Good product work makes the reasoning visible. It shows what we
            know, what we do not, and why one direction is more useful than
            another.
          </p>
          <ol className="principles">
            {settings.approach.map((principle, index) => (
              <li key={principle._key}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className={`section shell about-section ${aboutStyles.polished}`}
        id="about"
        aria-labelledby="about-title"
      >
        <header className="section-heading compact-heading">
          <p className="section-index">04</p>
          <h2 id="about-title">About / Experience</h2>
        </header>
        <div className="about-grid">
          <div className="about-statement">
            <h3>{about.heading}</h3>
            <RichText value={about.bio} />
          </div>
          <div className="experience-list">
            {experiences.length ? (
              experiences.map((experience) => (
                <article
                  key={`${experience.organisation}-${experience.period}`}
                >
                  <p className="mono-label">{experience.period}</p>
                  <h4>{experience.role}</h4>
                  <p>{experience.organisation}</p>
                  {experience.summary ? (
                    <p className="experience-summary">{experience.summary}</p>
                  ) : null}
                </article>
              ))
            ) : (
              <div className="experience-empty">
                <p className="mono-label">Experience record</p>
                <p>
                  Detailed roles and dates will be published from verified
                  source material—never filled in by assumption.
                </p>
              </div>
            )}
            {about.availability ? (
              <p className="availability">{about.availability}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section
        className="section shell playground"
        aria-labelledby="playground-title"
      >
        <header className="section-heading compact-heading">
          <p className="section-index">05</p>
          <h2 id="playground-title">Playground</h2>
          <p>Early experiments, studies, and evidence of learning in public.</p>
        </header>
        {playground.map((item) => (
          <article className="playground-row" key={item.slug}>
            <p className="mono-label">{item.year}</p>
            <h3>{item.title}</h3>
            <div>
              <p>{item.summary}</p>
              {item.note ? <p className="status-note">{item.note}</p> : null}
            </div>
            {item.externalLink?.url ? (
              <ExternalLink className="text-link" href={item.externalLink.url}>
                View experiment ↗
              </ExternalLink>
            ) : (
              <span className="mono-label">Archive entry</span>
            )}
          </article>
        ))}
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="shell contact-grid">
          <p className="section-index">06 / Contact</p>
          <h2 id="contact-title">Have a useful problem to untangle?</h2>
          <p>
            I am interested in product questions where research, systems
            thinking, and careful interface work need to meet.
          </p>
          <div className="contact-links">
            {settings.email ? (
              <a className="contact-link" href={`mailto:${settings.email}`}>
                {settings.email} ↗
              </a>
            ) : null}
            {settings.socialLinks.map((link) => (
              <ExternalLink
                className="contact-link"
                href={link.url}
                key={link.label}
              >
                {link.label} ↗
              </ExternalLink>
            ))}
            {!settings.email && !settings.socialLinks.length ? (
              <ExternalLink
                className="contact-link"
                href="https://github.com/nabillazachra"
              >
                GitHub ↗
              </ExternalLink>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
