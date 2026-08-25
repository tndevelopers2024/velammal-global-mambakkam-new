import type { ReactNode } from "react";

type Props = {
  /** Two-digit section number, e.g. "04" */
  index?: string;
  children: ReactNode;
  className?: string;
};

/** `01 — ADMISSIONS` */
export function Eyebrow({ index, children, className = "" }: Props) {
  return (
    <p className={`eyebrow ${className}`}>
      {index ? (
        <>
          <span aria-hidden="true">{index}</span>
          <span aria-hidden="true" className="mx-2">
            —
          </span>
        </>
      ) : null}
      {children}
    </p>
  );
}
