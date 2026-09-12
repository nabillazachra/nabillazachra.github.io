import Image from "next/image";

import type {
  CmsImage,
  EditorialBlock,
  ProjectSection,
} from "@/lib/content/types";
import { FerizyEvidence } from "./ferizy-evidence";
import { JagoProcessMap, OnStreetSystemMap } from "./project-diagrams";
import { RichText } from "./rich-text";

const projectEvidence: Record<string, Record<string, CmsImage>> = {
  "workhub-attendance": {
    "workhub-problem-panel": {
      url: "/images/workhub/problem.jpg",
      alt: "WorkHub case-study problem statement about communication gaps on schedule changes",
      caption: "Problem framing from the original WorkHub case-study documentation.",
    },
    "workhub-needs": {
      url: "/images/workhub/timeline.jpg",
      alt: "WorkHub design-thinking process and project timeline",
      caption: "The documented 12-week design process, from research through prototyping and usability work.",
    },
    "workhub-ia": {
      url: "/images/workhub/ia.jpg",
      alt: "WorkHub mobile-app information architecture",
      caption: "Information architecture connecting Home, Attendance, Activity, Teams, and supporting flows.",
    },
    "workhub-flows": {
      url: "/images/workhub/task-flow.jpg",
      alt: "WorkHub task flow for applying leave",
      caption: "One of the documented task flows used to translate product requirements into interaction steps.",
    },
    "workhub-delivery-panel": {
      url: "/images/workhub/final-ui.jpg",
      alt: "WorkHub final mobile interface screens",
      caption: "Selected final-interface screens from the WorkHub attendance-management concept.",
    },
  },
};

function EditorialImage({
  image,
  contain = false,
}: {
  image?: CmsImage;
  contain?: boolean;
}) {
  if (!image?.url) return null;

  return (
    <figure className="editorial-image">
      <div
        className="editorial-image-frame"
        style={contain ? { aspectRatio: "16 / 9", minHeight: 0 } : undefined}
      >
        <Image
          alt={image.alt || "Project documentation"}
          fill
          sizes="(max-width: 760px) 100vw, 80vw"
          src={image.url}
          style={contain ? { objectFit: "contain" } : undefined}
        />
      </div>
      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
    </figure>
  );
}

function EditorialBlockView({ block }: { block: EditorialBlock }) {
  switch (block._type) {
    case "textLead":
      return (
        <div className="block-lead">
          {block.heading ? <h3>{block.heading}</h3> : null}
          <RichText value={block.text} />
        </div>
      );
    case "fullBleedImage":
    case "captionedImage":
      return <EditorialImage image={block.image} />;
    case "annotatedImage":
      return (
        <div className="annotated-block">
          <EditorialImage image={block.image} />
          {block.annotations?.length ? (
            <ol>
              {block.annotations.map((annotation) => (
                <li key={annotation._key}>
                  <strong>{annotation.label}</strong> {annotation.note}
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      );
    case "twoColumnStory":
      return (
        <div className="two-column-block">
          <RichText value={block.left} />
          <RichText value={block.right} />
        </div>
      );
    case "pullQuote":
      return (
        <figure className="pull-quote">
          <blockquote>“{block.quote}”</blockquote>
          {block.attribution ? (
            <figcaption>{block.attribution}</figcaption>
          ) : null}
        </figure>
      );
    case "beforeAfter":
      return (
        <div className="before-after">
          <div>
            <span>Before</span>
            <EditorialImage image={block.before} />
          </div>
          <div>
            <span>After</span>
            <EditorialImage image={block.after} />
          </div>
        </div>
      );
    case "editorialGallery":
      return (
        <div className="editorial-gallery">
          {block.images?.map((image, index) => (
            <EditorialImage image={image} key={`${image.url}-${index}`} />
          ))}
        </div>
      );
    default:
      return (
        <aside className={`evidence-panel block-${block._type}`}>
          <p className="mono-label">
            {block.label || block._type.replace(/Block$/, "")}
          </p>
          {block.title || block.heading ? (
            <h3>{block.title || block.heading}</h3>
          ) : null}
          <RichText value={block.body || block.text} />
          {block.evidence ? <p>{block.evidence}</p> : null}
          {block.interpretation ? <p>{block.interpretation}</p> : null}
          {block.decision ? <p>{block.decision}</p> : null}
          {block.rationale ? <p>{block.rationale}</p> : null}
          {block.tradeOff ? <p>{block.tradeOff}</p> : null}
          {block.consequence ? <p>{block.consequence}</p> : null}
          {block.result ? <p>{block.result}</p> : null}
          {block.learning ? <p>{block.learning}</p> : null}
        </aside>
      );
  }
}

export function EditorialSections({
  sections,
  projectSlug,
}: {
  sections?: ProjectSection[];
  projectSlug?: string;
}) {
  if (!sections?.length) return null;

  const evidence = projectSlug ? projectEvidence[projectSlug] : undefined;

  return (
    <div className="editorial-sections">
      {sections.map((section, index) => (
        <section className="case-section" key={section._key}>
          <div className="case-section-heading">
            <p className="mono-label">
              {section.eyebrow || String(index + 1).padStart(2, "0")}
            </p>
            {section.heading ? <h2>{section.heading}</h2> : null}
          </div>
          <div className="case-blocks">
            {section.blocks?.map((block) => {
              const evidenceImage = evidence?.[block._key];
              const showFerizyEvidence =
                projectSlug === "ferizy-usability-testing" &&
                block._key === "ferizy-report-structure";
              const showOnStreetMap =
                projectSlug === "onstreet-parking" &&
                block._key === "parking-dual-user";
              const showJagoProcess =
                projectSlug === "jago-last-wish" &&
                block._key === "jago-process";

              return (
                <div key={block._key}>
                  <EditorialBlockView block={block} />
                  {evidenceImage ? (
                    <div style={{ marginTop: "clamp(2rem, 5vw, 5rem)" }}>
                      <EditorialImage contain image={evidenceImage} />
                    </div>
                  ) : null}
                  {showFerizyEvidence ? <FerizyEvidence /> : null}
                  {showOnStreetMap ? <OnStreetSystemMap /> : null}
                  {showJagoProcess ? <JagoProcessMap /> : null}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
