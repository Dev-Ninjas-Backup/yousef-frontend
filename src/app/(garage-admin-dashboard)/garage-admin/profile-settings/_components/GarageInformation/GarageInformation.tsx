import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Upload } from "lucide-react";

const GarageInformation = () => {
  return (
    <Card className="shadow-none">
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900">Garage Information</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="garageName">Garage Name</Label>
            <Input
              id="garageName"
              defaultValue="Premium Auto Parts LLC"
              className="bg-[#F3F3F5] border-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tradeLicense">Trade License Number</Label>
            <Input
              id="tradeLicense"
              defaultValue="TRN-12345678"
              className="bg-[#F3F3F5] border-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              defaultValue="+971 50 123 4567"
              className="bg-[#F3F3F5] border-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              defaultValue="info@premiumautoparts.ae"
              className="bg-[#F3F3F5] border-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 space-y-2">
            <Label htmlFor="address">Address *</Label>
            <div className="relative">
              <Input
                id="address"
                defaultValue="Sheikh Zayed Road, Al Quoz Industrial Area 3"
                className="bg-[#F3F3F5] border-0"
              />
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
            </div>
          </div>

          <div className="col-span-4 space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              defaultValue="Dubai"
              className="bg-[#F3F3F5] border-0"
            />
          </div>

          <div className="col-span-4 space-y-2">
            <Label htmlFor="emirate">Emirate *</Label>
            <Select defaultValue="dubai">
              <SelectTrigger
                id="emirate"
                className="w-full bg-[#F3F3F5] border-0"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="dubai">Dubai</SelectItem>
                <SelectItem value="abudhabi">Abu Dhabi</SelectItem>
                <SelectItem value="sharjah">Sharjah</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Business Description</Label>
          <Textarea
            id="description"
            placeholder="Brief description of your garage and services..."
            rows={3}
            className="bg-[#F3F3F5] border-0"
          />
        </div>

        <div className="pt-4 border-t mt-10">
          <h3 className="font-semibold text-gray-900 mb-4 mt-6">Garage Logo</h3>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl font-semibold text-gray-600">PA</span>
            </div>
            <Button variant="outline" className="gap-2 ">
              <Upload className="w-4 h-4" />
              Upload Logo
            </Button>
          </div>
        </div>

        <div className="flex gap-3 pt-2 mt-10">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Save Changes
          </Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GarageInformation;
