import { PortableText, type PortableTextComponents } from "@portabletext/react";

import type { PortableTextBlock } from "@/lib/content/types";
import { ExternalLink } from "./external-link";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      return <ExternalLink href={href}>{children}</ExternalLink>;
    },
  },
};

export function RichText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;

  return (
    <div className="rich-text">
      <PortableText value={value} components={components} />
    </div>
  );
}
