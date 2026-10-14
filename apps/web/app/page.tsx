import Image from "next/image";
import Link from "next/link";

import { ExternalLink } from "@/components/external-link";
import { ProjectArtwork } from "@/components/project-artwork";
import { ProjectList } from "@/components/project-list";
import { RichText } from "@/components/rich-text";
import { getHomeContent } from "@/lib/content/get-content";
import { ABOUT_PORTRAIT_DATA } from "@/lib/about-portrait-data";
import aboutStyles from "./about-section.module.css";
import { ImpactStrip, PrivateWork, TeachingStrip, WorkMethod } from "@/components/portfolio-positioning";


function getExperiencePhase(role: string) {
  const normalized = role.toLowerCase();

  if (normalized.includes("technical consultant") || normalized.includes("system analyst")) {
    return "CONSULT";
  }

  if (normalized.includes("mentor") || normalized.includes("instructor")) {
    return "TEACH";
  }

  if (normalized.includes("ux") || normalized.includes("ui")) {
    return "DESIGN";
  }

  return "BUILD";
}

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
          <p>Technical consultant × product designer</p>
        </div>
        <div className="hero-monogram" aria-hidden="true">NZ</div>
        <div className="hero-system-rail" aria-hidden="true">
          <span>01 / Business</span>
          <span>02 / Systems</span>
          <span>03 / Experience</span>
          <span>04 / Delivery</span>
        </div>
        <h1 className="reveal reveal-delay" id="hero-title">
          I turn complex systems
          <br />
          into <em>clear products.</em>
        </h1>
        <p className="hero-intro reveal reveal-delay-2">
          I bridge <strong>business requirements</strong>, system logic,
          technical feasibility, and user experience—from analysis and flows
          to interfaces and implementation conversations.
        </p>
        <div className="hero-foot reveal reveal-delay-2">
          <p>Based in {settings.location || "Indonesia"}</p>
          <a href="#work">View selected work ↓</a>
          <p className="hero-coordinate">Business / Systems / Experience</p>
        </div>
      </section>

      <ImpactStrip />

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

      <WorkMethod />

      <PrivateWork />

      <section
        className={`section shell about-section ${aboutStyles.polished}`}
        id="about"
        aria-labelledby="about-title"
      >
        <header className="section-heading compact-heading">
          <p className="section-index">05</p>
          <h2 id="about-title">About / Experience</h2>
        </header>

        <div className={aboutStyles.profileSpread}>
          <div className={aboutStyles.aboutWatermark} aria-hidden="true">05</div>

          <p className={aboutStyles.profileEyebrow}>Profile / 2026</p>

          <figure className={aboutStyles.aboutPortrait}>
            <div className={aboutStyles.portraitFrame}>
              <Image
                alt="Nabilla Zachra"
                height={525}
                src={`data:image/webp;base64,${ABOUT_PORTRAIT_DATA}`}
                unoptimized
                width={420}
              />
              <span className={aboutStyles.portraitIndex} aria-hidden="true">NZ / 05</span>
            </div>
            <figcaption>
              <span>Nabilla Zachra</span>
              <span>Indonesia</span>
            </figcaption>
          </figure>

          <div className={aboutStyles.profileAnnotations}>
            <div>
              <span>Based</span>
              <strong>Indonesia</strong>
            </div>
            <div>
              <span>Focus</span>
              <strong>Systems + Product</strong>
            </div>
            <div>
              <span>Mode</span>
              <strong>Consult + Design</strong>
            </div>
          </div>

          <div className={aboutStyles.profileHeadline}>
            <h3>{about.heading}</h3>
          </div>

          <blockquote className={aboutStyles.pullQuote}>
            “I care about what happens behind the interface as much as what
            appears on it.”
          </blockquote>

          <div className={aboutStyles.profileBio}>
            <RichText value={about.bio} />
          </div>
        </div>

        <div className={aboutStyles.principles} aria-label="Working principles">
          <article data-index="01">
            <span>01</span>
            <h3>Clarify</h3>
            <p>Turn requirements, ambiguity, and constraints into something teams can act on.</p>
          </article>
          <article data-index="02">
            <span>02</span>
            <h3>Connect</h3>
            <p>Bridge business intent, system behaviour, implementation, and user experience.</p>
          </article>
          <article data-index="03">
            <span>03</span>
            <h3>Deliver</h3>
            <p>Translate decisions into flows, specifications, interfaces, and aligned next steps.</p>
          </article>
        </div>

        {about.availability ? (
          <div className={aboutStyles.availabilityStrip}>
            <div className={aboutStyles.availabilityStatus}>
              <span aria-hidden="true" />
              <strong>Available for selected opportunities</strong>
            </div>
            <p>{about.availability}</p>
            <div className={aboutStyles.availabilityTags} aria-label="Opportunity areas">
              <span>Technical Consulting</span>
              <span>System Analysis</span>
              <span>Product</span>
              <span>UX</span>
            </div>
          </div>
        ) : null}

        <section className={aboutStyles.careerSection} aria-labelledby="career-title">
          <div className={aboutStyles.careerHeading}>
            <p>Career progression</p>
            <h3 id="career-title">Build → Design → Consult.</h3>
            <span>2017 — Now</span>
          </div>

          {experiences.length ? (
            <>
              <div className={aboutStyles.careerDesktop}>
                <div className={aboutStyles.careerTrack} aria-hidden="true">
                  <span>Build</span>
                  <i />
                  <span>Design</span>
                  <i />
                  <span>Consult</span>
                </div>

                <div className={aboutStyles.careerEvents}>
                  {experiences.map((experience, index) => (
                    <article
                      className={index === 0 ? aboutStyles.currentRole : undefined}
                      key={`${experience.organisation}-${experience.period}`}
                    >
                      <div className={aboutStyles.careerMeta}>
                        <span>{experience.period}</span>
                        <strong>
                          {getExperiencePhase(experience.role)}
                          {index === 0 ? " / CURRENT" : ""}
                        </strong>
                      </div>
                      <div className={aboutStyles.careerRole}>
                        <h4>{experience.role}</h4>
                        <p>{experience.organisation}</p>
                      </div>
                      {experience.summary ? (
                        <p className={aboutStyles.careerSummary}>{experience.summary}</p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>

              <div className={aboutStyles.careerMobile}>
                {experiences.map((experience, index) => (
                  <details
                    className={index === 0 ? aboutStyles.currentDisclosure : aboutStyles.careerDisclosure}
                    key={`${experience.organisation}-${experience.period}-mobile`}
                  >
                    <summary>
                      <span className={aboutStyles.mobileCareerIndex}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={aboutStyles.mobileCareerTitle}>
                        <small>{getExperiencePhase(experience.role)} / {experience.period}</small>
                        <strong>{experience.role}</strong>
                        <em>{experience.organisation}</em>
                      </span>
                      <i aria-hidden="true">+</i>
                    </summary>
                    {experience.summary ? <p>{experience.summary}</p> : null}
                  </details>
                ))}
              </div>
            </>
          ) : (
            <p className={aboutStyles.careerEmpty}>Experience details are being updated.</p>
          )}
        </section>
      </section>

      <TeachingStrip />

      <section
        className="section shell playground"
        aria-labelledby="playground-title"
      >
        <header className="section-heading compact-heading">
          <p className="section-index">07</p>
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
          <div className="contact-watermark" aria-hidden="true">08</div>
          <p className="section-index">08 / Contact</p>
          <p className="contact-kicker">Open to selected opportunities / 2026</p>

          <h2 id="contact-title">
            Have a complex problem
            <br />
            <em>to make clearer?</em>
          </h2>

          <p className="contact-intro">
            I am interested in work where business requirements, systems thinking,
            technical feasibility, and user experience need to meet.
          </p>

          <div className="contact-links">
            {settings.email ? (
              <a
                className="contact-link"
                href={`mailto:${settings.email}`}
              >
                <span>Email</span>
                <strong>{settings.email}</strong>
                <i aria-hidden="true">↗</i>
              </a>
            ) : null}

            {settings.socialLinks.map((link) => (
              <ExternalLink
                className="contact-link"
                href={link.url}
                key={link.label}
              >
                <span>{link.label}</span>
                <strong>View profile</strong>
                <i aria-hidden="true">↗</i>
              </ExternalLink>
            ))}

            <a
              className="contact-link"
              href="mailto:nabillazachra14@gmail.com?subject=Private%20Portfolio%20Request"
            >
              <span>Private portfolio</span>
              <strong>Request selected case studies</strong>
              <i aria-hidden="true">↗</i>
            </a>

            {!settings.email && !settings.socialLinks.length ? (
              <ExternalLink
                className="contact-link"
                href="https://github.com/nabillazachra"
              >
                <span>GitHub</span>
                <strong>View profile</strong>
                <i aria-hidden="true">↗</i>
              </ExternalLink>
            ) : null}
          </div>

          <div className="contact-meta" aria-label="Contact metadata">
            <span>Indonesia</span>
            <span>Technical Consulting × Product Design</span>
            <span>2026</span>
          </div>
        </div>
      </section>
    </main>
  );
}
