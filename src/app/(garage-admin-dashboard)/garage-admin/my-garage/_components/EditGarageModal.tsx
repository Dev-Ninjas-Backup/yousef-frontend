"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EditGarageForm } from "./EditGarageForm";

interface EditGarageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  garage: any;
  onSuccess: () => void;
}

export function EditGarageModal({ open, onOpenChange, garage, onSuccess }: EditGarageModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Garage</DialogTitle>
        </DialogHeader>
        <EditGarageForm
          onCancel={() => onOpenChange(false)}
          onSave={() => {
            onOpenChange(false);
            onSuccess();
          }}
          garage={garage}
        />
      </DialogContent>
    </Dialog>
  );
}
