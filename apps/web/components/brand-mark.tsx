type BrandMarkProps = {
  className?: string;
  decorative?: boolean;
  title?: string;
};

export function BrandMark({
  className,
  decorative = false,
  title = "Nabilla Zachra",
}: BrandMarkProps) {
  return (
    <svg
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      className={className}
      role={decorative ? undefined : "img"}
      viewBox="0 0 381 218"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 1H67L181 118V218L0 40Z"
        fill="currentColor"
      />
      <path
        d="M0 92L65 157V218H0Z"
        fill="currentColor"
      />
      <path
        d="M200 189L381 0H183V46L274 47L200 120Z"
        fill="currentColor"
      />
      <path
        className="brand-mark-signal"
        d="M381 72L227 218H381Z"
        fill="#FE5C04"
      />
    </svg>
  );
}
