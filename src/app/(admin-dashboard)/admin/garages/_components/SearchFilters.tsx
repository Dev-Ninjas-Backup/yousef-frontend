import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  statusFilter: "APPROVE" | "PENDING" | "DECLINE" | "all";
  dateFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: "APPROVE" | "PENDING" | "DECLINE" | "all") => void;
  onDateChange: (value: string) => void;
}

export default function SearchFilters({
  searchQuery,
  statusFilter,
  dateFilter,
  onSearchChange,
  onStatusChange,
  onDateChange,
}: SearchFiltersProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search garage owners..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="APPROVE">Approved</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="DECLINE">Declined</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateFilter} onValueChange={onDateChange}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="Today">Joined Today</SelectItem>
              <SelectItem value="This Week">Joined This Week</SelectItem>
              <SelectItem value="This Month">Joined This Month</SelectItem>
              <SelectItem value="This Year">Joined This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}