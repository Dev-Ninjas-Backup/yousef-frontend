"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function SearchSection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
            Search Spare Parts
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select>
                <SelectTrigger className="h-12 border-gray-300 w-full py-6">
                  <SelectValue placeholder="Select parts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engine">Engine Parts</SelectItem>
                  <SelectItem value="brakes">Brakes</SelectItem>
                  <SelectItem value="suspension">Suspension</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Select>
                <SelectTrigger className="h-12 border-gray-300 w-full py-6">
                  <SelectValue placeholder="Search Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                  <SelectItem value="refurbished">Refurbished</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Button className="bg-blue-600 hover:bg-blue-700 h-12 w-full">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
