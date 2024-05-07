"use client";

import { Buurten } from "@/components/Buurten";
import * as React from "react";

const BuurtPage = ({ params }: { params: { wijkId: string } }) => {
  return <Buurten wijkId={params.wijkId} />;
};

export default BuurtPage;
