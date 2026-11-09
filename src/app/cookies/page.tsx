import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { legalDocs } from "@/lib/legal";
import { profile } from "@/lib/site";

const doc = legalDocs.cookies;

export const metadata: Metadata = {
  title: doc.title,
  description: doc.description,
  alternates: { canonical: "/cookies" },
  openGraph: { title: `${doc.title} | ${profile.name}`, description: doc.description, url: "/cookies" },
};

export default function Page() {
  return <LegalPage doc={doc} />;
}
