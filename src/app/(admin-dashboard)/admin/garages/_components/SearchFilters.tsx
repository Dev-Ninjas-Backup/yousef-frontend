import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  statusFilter: "APPROVE" | "PENDING" | "DECLINE" | "all";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: "APPROVE" | "PENDING" | "DECLINE" | "all") => void;
}

export default function SearchFilters({
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusChange,
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
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="APPROVE">Approved</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="DECLINE">Declined</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}