import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CircleQuestionMark, FileText } from "lucide-react";

const HelpCenter = () => {
  return (
    <Card className="shadow-none">
      <CardContent className=" space-y-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Help Center</h3>
        </div>

        <p className="text-base text-gray-600">
          Browse our comprehensive guides and FAQs to find answers to common
          questions.
        </p>

        <Button variant="outline" className="w-full gap-2 py-5">
          <CircleQuestionMark className="w-4 h-4" />
          View Help Center
        </Button>
      </CardContent>
    </Card>
  );
};

export default HelpCenter;
