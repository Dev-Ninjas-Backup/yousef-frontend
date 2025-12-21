"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Clock, AlertCircle, Mail, Phone } from "lucide-react";
import Image from "next/image";
import scroll_logo from "@/assets/navbar/sayarahub_fill.svg";

interface GarageVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GarageVerificationModal({ isOpen, onClose }: GarageVerificationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-0 overflow-hidden">
        {/* Header with Logo */}
        <DialogHeader className="p-6 pb-0">
          <div className="text-center">
            <Image
              src={scroll_logo}
              alt="SayaraHub"
              width={120}
              height={32}
              className="h-8 w-auto mx-auto mb-4"
            />
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="p-6 pt-2">
          {/* Icon */}
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Verification Pending
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed text-center">
            Your garage registration is currently under review. Our team is verifying your documents and will notify you once the process is complete.
          </p>

          {/* Status Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-medium text-yellow-800 mb-1">
                  What happens next?
                </p>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Document verification (1-2 business days)</li>
                  <li>• Trade license validation</li>
                  <li>• Email notification upon approval</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-4 text-center">
              Need help or have questions?
            </p>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Email Support
              </Button>
              
              <Button
                variant="outline"
                className="flex-1 flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </Button>
            </div>

            {/* Close Button */}
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full mt-4 text-gray-500 hover:text-gray-700"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}