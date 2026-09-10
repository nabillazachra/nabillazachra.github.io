import Image from "next/image";

import type {
  CmsImage,
  EditorialBlock,
  ProjectSection,
} from "@/lib/content/types";
import { RichText } from "./rich-text";

function EditorialImage({ image }: { image?: CmsImage }) {
  if (!image?.url) return null;

  return (
    <figure className="editorial-image">
      <div className="editorial-image-frame">
        <Image
          alt={image.alt || "Project documentation"}
          fill
          sizes="(max-width: 760px) 100vw, 80vw"
          src={image.url}
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
}: {
  sections?: ProjectSection[];
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
            {section.blocks?.map((block) => (
              <EditorialBlockView block={block} key={block._key} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
