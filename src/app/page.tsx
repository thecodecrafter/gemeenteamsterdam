"use client";

import { Heading } from "@amsterdam/design-system-react";
import { District } from "@/components/District";

import "@amsterdam/design-system-tokens/dist/index.css";
import "@amsterdam/design-system-assets/font/index.css";
import "@amsterdam/design-system-css/dist/index.css";

export default function Home() {
  return (
    <>
      <div className="container mx-auto">
        <Heading level={4}>
          Wijken die binnen het stadsdeel Centrum vallen
        </Heading>
        <District />
      </div>
    </>
  );
}
