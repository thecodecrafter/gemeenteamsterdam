import type { Metadata } from "next";
import "./globals.css";
import CustomHeader from "@/components/CustomHeader";

import "@amsterdam/design-system-tokens/dist/index.css";
import "@amsterdam/design-system-assets/font/index.css";
import "@amsterdam/design-system-css/dist/index.css";

export const metadata: Metadata = {
  title: "Gemeente Amsterdam",
  description: "Technische assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>
        <div className="container mx-auto rootlayout">
          <CustomHeader />
        </div>
        <div className="container mx-auto">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
