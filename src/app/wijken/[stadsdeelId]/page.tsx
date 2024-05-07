"use client";

import { Wijken } from "@/components/Wijken";
import React from "react";

const WijkenPage = ({ params }: { params: { stadsdeelId: string } }) => {
  return <Wijken stadsdeelId={params.stadsdeelId} />;
};

export default WijkenPage;
