import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import GarageLogo from "../GarageLogo/GarageLogo";

const GarageInformation = () => {
  return (
    <div className="bg-white space-y-10">

    <Card className="border-none p-0 shadow-none">
      <CardContent className="space-y-4">
        <h3 className="font-semibold text-gray-900">Garage Information</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="garageName">Garage Name</Label>
            <Input id="garageName" defaultValue="Premium Auto Parts LLC" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tradeLicense">Trade License Number</Label>
            <Input id="tradeLicense" defaultValue="TRN-12345678" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" defaultValue="+971 50 123 4567" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" defaultValue="info@premiumautoparts.ae" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 space-y-2">
            <Label htmlFor="address">Address *</Label>
            <div className="relative">
              <Input id="address" defaultValue="Sheikh Zayed Road, Al Quoz Industrial Area 3" />
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
            </div>
          </div>

          <div className="col-span-3 space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" defaultValue="Dubai" />
          </div>

          <div className="col-span-3 space-y-2">
            <Label htmlFor="emirate">Emirate *</Label>
            <Select defaultValue="dubai">
              <SelectTrigger id="emirate" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dubai">Dubai</SelectItem>
                <SelectItem value="abudhabi">Abu Dhabi</SelectItem>
                <SelectItem value="sharjah">Sharjah</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Business Description</Label>
          <Textarea id="description" placeholder="Brief description of your garage and services..." rows={3} />
        </div>
      </CardContent>
    </Card>
    <GarageLogo
     />
    </div>

  );
};

export default GarageInformation;
