"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DuplicateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DuplicateDialog({ open, onOpenChange }: DuplicateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <div className="text-center py-6">
          <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Duplicate Listing Detected</h2>
          <p className="text-gray-600 mb-2">This spare part already exists in your listings.</p>
          <p className="text-sm text-gray-500 mb-8">Please update the existing item instead of adding it again.</p>

          <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
