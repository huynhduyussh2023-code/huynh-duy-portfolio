import type { Metadata } from "next";
import Portfolio from "./components/Portfolio";

const title = "Nguyễn Hữu Huỳnh Duy | Marketing & PR";
const description =
  "Portfolio cá nhân của Nguyễn Hữu Huỳnh Duy — Marketing, PR, Branding & Creative. Personal portfolio of Marketing & PR student Huỳnh Duy.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "vi_VN",
  },
};

export default function Page() {
  return <Portfolio />;
}
