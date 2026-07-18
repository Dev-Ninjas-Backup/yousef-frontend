"use client";

import React from "react";
import { ExclusiveOfferDetail } from "@/components/exclusive-offer/ExclusiveOfferDetail";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function InterceptedExclusiveOfferPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="sm:max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0 bg-white border border-gray-100 rounded-2xl shadow-2xl">
        <ExclusiveOfferDetail id={id} isModal={true} />
      </DialogContent>
    </Dialog>
  );
}
