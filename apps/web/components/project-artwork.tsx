import Image from "next/image";

import type { CmsImage, Project } from "@/lib/content/types";

type ProjectArtworkProps = {
  image?: CmsImage;
  index?: number;
  project: Pick<Project, "title" | "visualTone" | "projectType">;
  priority?: boolean;
};

export function ProjectArtwork({
  image,
  index = 0,
  project,
  priority = false,
}: ProjectArtworkProps) {
  if (image?.url) {
    return (
      <figure className="project-artwork has-image">
        <Image
          alt={image.alt || `${project.title} project image`}
          fill
          priority={priority}
          sizes="(max-width: 760px) 100vw, 58vw"
          src={image.url}
        />
        {image.caption ? <figcaption>{image.caption}</figcaption> : null}
      </figure>
    );
  }

  return (
    <div
      aria-label={`${project.title} — editorial placeholder awaiting verified project imagery`}
      className={`project-artwork artwork-${project.visualTone}`}
      role="img"
    >
      <span className="artwork-index">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="artwork-title">{project.title}</span>
      <span className="artwork-type">{project.projectType}</span>
      <i aria-hidden="true" />
    </div>
  );
}
