"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";

interface CreatePromotionalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreatePromotionalModal = ({
  open,
  onOpenChange,
}: CreatePromotionalModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Promotional Ad</DialogTitle>
          <DialogDescription>
            Create a new promotional ad. Payment of 20 AED required before
            submission.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Ad Title *</Label>
            <Input id="title" placeholder="Brake Service" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your promotional offer in detail..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adType">Ad Type</Label>
              <Select>
                <SelectTrigger id="adType" className="w-full">
                  <SelectValue placeholder="Garage Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="garage">Garage Service</SelectItem>
                  <SelectItem value="parts">Spare Parts</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount/Price Tag</Label>
              <Input id="discount" placeholder="e.g., 20% OFF or From 99 AED" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Dubai Marina" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="validFrom">Valid From *</Label>
              <Input id="validFrom" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="validUntil">Valid Until *</Label>
              <Input id="validUntil" type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" placeholder="https://example.com/image.jpg" />
            <p className="text-xs text-gray-500">
              Or click to upload an image (Feature coming soon)
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="w-4 h-4 text-[#0A0A0A]" />
              Upload Image
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-black hover:bg-black/90">Save as Draft</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePromotionalModal;
