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
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-transparent border-0 shadow-2xl">
        <ExclusiveOfferDetail id={id} isModal={true} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
