import Image from "next/image";

import type {
  CmsImage,
  EditorialBlock,
  ProjectSection,
} from "@/lib/content/types";
import { FerizyEvidence } from "./ferizy-evidence";
import { JagoProcessMap, OnStreetSystemMap } from "./project-diagrams";
import { RichText } from "./rich-text";
import { WorkHubEvidence } from "./workhub-evidence";

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

function workHubVariant(blockKey: string) {
  if (blockKey === "workhub-problem-panel") return "framing" as const;
  if (blockKey === "workhub-needs") return "research" as const;
  if (blockKey === "workhub-ia") return "architecture" as const;
  if (blockKey === "workhub-flows") return "flows" as const;
  if (blockKey === "workhub-delivery-panel") return "delivery" as const;
  return null;
}

export function EditorialSections({
  sections,
  projectSlug,
}: {
  sections?: ProjectSection[];
  projectSlug?: string;
}) {
  if (!sections?.length) return null;

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
              const showFerizyEvidence =
                projectSlug === "ferizy-usability-testing" &&
                block._key === "ferizy-report-structure";
              const showOnStreetMap =
                projectSlug === "onstreet-parking" &&
                block._key === "parking-dual-user";
              const showJagoProcess =
                projectSlug === "jago-last-wish" &&
                block._key === "jago-process";
              const workHub =
                projectSlug === "workhub-attendance"
                  ? workHubVariant(block._key)
                  : null;

              return (
                <div key={block._key}>
                  <EditorialBlockView block={block} />
                  {workHub ? <WorkHubEvidence variant={workHub} /> : null}
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
