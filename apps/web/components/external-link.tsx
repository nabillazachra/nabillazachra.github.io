import type { AnchorHTMLAttributes, ReactNode } from "react";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
};

export function ExternalLink({ children, href, ...props }: ExternalLinkProps) {
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <a
      href={href}
      {...props}
      {...(isExternal ? { rel: "noopener noreferrer", target: "_blank" } : {})}
    >
      {children}
    </a>
  );
}
