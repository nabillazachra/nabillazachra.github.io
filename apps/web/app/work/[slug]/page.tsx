import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EditorialSections } from "@/components/editorial-sections";
import { ExternalLink } from "@/components/external-link";
import { ProjectArtwork } from "@/components/project-artwork";
import { RichText } from "@/components/rich-text";
import { getProject, getProjectSlugs } from "@/lib/content/get-content";
import type { CmsImage, PortableTextBlock, Project } from "@/lib/content/types";
import styles from "./case-overview.module.css";

type ProjectPageProps = { params: Promise<{ slug: string }> };

type NarrativeKey = keyof Pick<
  Project,
  | "context"
  | "problem"
  | "users"
  | "constraints"
  | "research"
  | "findings"
  | "decisions"
  | "tradeOffs"
  | "testing"
  | "outcome"
  | "reflection"
>;

type NarrativeField = {
  key: NarrativeKey;
  label: string;
};

const overviewFields: NarrativeField[] = [
  { key: "context", label: "Context" },
  { key: "problem", label: "Problem" },
  { key: "users", label: "People / users" },
  { key: "constraints", label: "Constraints" },
];

const fullNarrativeFields: NarrativeField[] = [
  ...overviewFields,
  { key: "research", label: "Research" },
  { key: "findings", label: "Findings" },
  { key: "decisions", label: "Decisions" },
  { key: "tradeOffs", label: "Trade-offs" },
  { key: "testing", label: "Testing" },
  { key: "outcome", label: "Outcome / evidence" },
  { key: "reflection", label: "Reflection" },
];

const projectHeroArtwork: Record<string, CmsImage> = {
  "ferizy-usability-testing": {
    url: "/images/ferizy/hero-source.webp",
    alt: "Ferizy usability testing case-study cover showing the tested Ferizy app",
    caption: "Ferizy usability testing — original tested-app case-study artwork.",
  },
  "workhub-attendance": {
    url: "/images/workhub/hero.jpg",
    alt: "WorkHub Attendance mobile application interface shown in a phone mockup",
    caption: "WorkHub Attendance — selected mobile interface from the original case-study documentation.",
  },
};

export async function generateStaticParams() {
  return (await getProjectSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.shortSummary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const hasEditorialStory = Boolean(
    project.sections?.some((section) => section.blocks?.length),
  );
  const narrativeFields = hasEditorialStory
    ? overviewFields
    : fullNarrativeFields;
  const heroImage = projectHeroArtwork[project.slug] || project.heroImage;

  return (
    <main className="case-main" id="main-content">
      <article>
        <header className="case-hero shell">
          <Link className="back-link" href="/#work">
            ← All work
          </Link>
          <p className="mono-label">{project.projectType}</p>
          <h1>{project.title}</h1>
          <p className="case-summary">{project.shortSummary}</p>
          <p className="case-status">{project.statusNote}</p>
          <dl className="case-meta">
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Discipline</dt>
              <dd>{project.discipline.join(", ")}</dd>
            </div>
            <div>
              <dt>Domain</dt>
              <dd>{project.domain}</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>{project.platform.join(", ")}</dd>
            </div>
          </dl>
        </header>

        <div className="case-visual shell-wide">
          <ProjectArtwork image={heroImage} project={project} priority />
        </div>

        <div className="case-narrative shell">
          {hasEditorialStory ? (
            <header className={styles.header}>
              <p className="mono-label">Case overview</p>
              <p>
                The essentials first. The evidence, decisions, and validation
                follow below.
              </p>
            </header>
          ) : null}

          {narrativeFields.map(({ key, label }) => {
            const value = project[key] as PortableTextBlock[] | undefined;
            if (!value?.length) return null;
            return (
              <section className="narrative-section" key={key}>
                <p className="mono-label">{label}</p>
                <RichText value={value} />
              </section>
            );
          })}
        </div>

        <EditorialSections projectSlug={project.slug} sections={project.sections} />

        {project.externalLinks?.length ? (
          <aside className="project-links shell">
            <p className="mono-label">Source material / related links</p>
            {project.externalLinks.map((link) => (
              <ExternalLink
                className="text-link"
                href={link.url}
                key={link.label}
              >
                {link.label} ↗
              </ExternalLink>
            ))}
          </aside>
        ) : null}

        <footer className="case-end shell">
          <p>End of case</p>
          <Link href="/#work">Return to selected work ↑</Link>
        </footer>
      </article>
    </main>
  );
}
