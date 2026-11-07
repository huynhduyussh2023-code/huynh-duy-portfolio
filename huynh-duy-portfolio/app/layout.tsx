import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nguyễn Hữu Huỳnh Duy | Marketing & PR",
  description: "Personal portfolio of Nguyễn Hữu Huỳnh Duy — Marketing, PR, Branding & Creative.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
