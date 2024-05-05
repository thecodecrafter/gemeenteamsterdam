import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@amsterdam/design-system-react";
import CustomHeader from "@/components/CustomHeader";

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
        <div className="container mx-auto">
          <CustomHeader />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
