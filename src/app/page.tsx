"use client";

import { Heading } from "@amsterdam/design-system-react";
import { District } from "@/components/District";

export default function Home() {
  return (
    <>
      <div className="container mx-auto">
        <Heading level={4}>Kies een stadsdeel</Heading>
        <District />
      </div>
    </>
  );
}
