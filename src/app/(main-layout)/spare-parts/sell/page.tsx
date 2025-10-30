"use client";

import { useState } from "react";
import SellPartsForm from "../_components/sell-parts/SellPartsForm";
import PaymentDialog from "../_components/sell-parts/PaymentDialog";
import DuplicateDialog from "../_components/sell-parts/DuplicateDialog";

export default function SellPartsPage() {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [duplicateOpen, setDuplicateOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <SellPartsForm />
      <PaymentDialog open={paymentOpen} onOpenChange={setPaymentOpen} />
      <DuplicateDialog open={duplicateOpen} onOpenChange={setDuplicateOpen} />
    </div>
  );
}
