import Link from "next/link";

import type { CmsImage, Project } from "@/lib/content/types";
import { ProjectArtwork } from "./project-artwork";

const projectArtwork: Record<string, CmsImage> = {
  "ferizy-usability-testing": {
    url: "/images/ferizy/hero-source.webp",
    alt: "Ferizy usability testing case-study cover showing the tested Ferizy app",
    caption: "Ferizy usability testing",
  },
  "workhub-attendance": {
    url: "/images/workhub/hero.jpg",
    alt: "WorkHub Attendance mobile application interface shown in a phone mockup",
    caption: "WorkHub Attendance mobile interface",
  },
};

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="project-list">
      {projects.map((project, index) => {
        const artwork = projectArtwork[project.slug] || project.heroImage;

        return (
          <article className="project-row" key={project.slug}>
            <div className="project-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="project-copy">
              <p className="mono-label">
                {project.projectType} / {project.year}
              </p>
              <h3>
                <Link href={`/work/${project.slug}`}>{project.title}</Link>
              </h3>
              <p className="project-summary">{project.shortSummary}</p>
              <p className="status-note">{project.statusNote}</p>
              <Link className="text-link" href={`/work/${project.slug}`}>
                Read the case <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <Link
              className="project-artwork-link"
              href={`/work/${project.slug}`}
              tabIndex={-1}
              aria-hidden="true"
            >
              <ProjectArtwork
                image={artwork}
                index={index}
                project={project}
                priority={index === 0}
              />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
