import { Fraunces, Inter_Tight } from "next/font/google";

/** Display — headlines only. Optical size + SOFT/WONK axes for large settings. */
export const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display-src",
  display: "swap",
});

/** Sans — body, UI, labels, nav. */
export const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans-src",
  display: "swap",
});
