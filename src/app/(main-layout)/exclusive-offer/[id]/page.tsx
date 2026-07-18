"use client";

import React from "react";
import { ExclusiveOfferDetail } from "@/components/exclusive-offer/ExclusiveOfferDetail";

export default function FullPageExclusiveOffer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  return (
    <div className="container mx-auto px-4 pt-24 pb-8 md:pt-32 md:pb-16">
      <ExclusiveOfferDetail id={id} />
    </div>
  );
}
