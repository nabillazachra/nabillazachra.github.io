import Link from "next/link";

import type { Project } from "@/lib/content/types";
import { ProjectArtwork } from "./project-artwork";

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="project-list">
      {projects.map((project, index) => (
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
              image={project.heroImage}
              index={index}
              project={project}
              priority={index === 0}
            />
          </Link>
        </article>
      ))}
    </div>
  );
}
