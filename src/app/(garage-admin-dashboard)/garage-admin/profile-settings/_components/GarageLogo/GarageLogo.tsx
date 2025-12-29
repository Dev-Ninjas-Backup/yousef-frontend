import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const GarageLogo = () => {
  return (
    <Card className="border-none p-0 shadow-none">
      <CardContent className="space-y-4 ">
        <h3 className="font-semibold text-gray-900">Garage Logo</h3>

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl font-semibold text-gray-600">PA</span>
          </div>
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload Logo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GarageLogo;
