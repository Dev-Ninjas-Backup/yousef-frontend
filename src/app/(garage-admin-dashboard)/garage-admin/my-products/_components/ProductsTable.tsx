import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, CheckCircle, Clock, Star, ArrowUp, ArrowDown, ArrowUpDown, RefreshCw } from "lucide-react";
import ProductImage from "@/assets/garage-admin/my-products/product.jpg";
import Image from "next/image";

interface Product {
  id: string;
  partName: string;
  brand?: string;
  categoryId: string;
  condition: string;
  price: string;
  quantity: number;
  description?: string;
  photos: string[];
  status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
  isPromoted: boolean;
  promoCost: string | null;
  views: number;
  inquiries: number;
  createdAt: string;
  updatedAt: string;
  listingPlan?: string;
  expiresAt?: string;
}

interface ProductsTableProps {
  products: Product[];
  categoryMap: Map<string, string>;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string, isPermanent?: boolean) => void;
  onRepost: (product: Product) => void;
}

export function ProductsTable({
  products,
  categoryMap,
  sortBy,
  onSortByChange,
  onView,
  onEdit,
  onDelete,
  onRepost,
}: ProductsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    return status === "APPROVED" ? (
      <CheckCircle className="w-3.5 h-3.5 mr-1" />
    ) : (
      <Clock className="w-3.5 h-3.5 mr-1" />
    );
  };

  const handleSort = (field: string) => {
    const fieldMap: Record<string, { asc: string; desc: string }> = {
      product: { asc: "partName_asc", desc: "partName_desc" },
      category: { asc: "category_asc", desc: "category_desc" },
      condition: { asc: "condition_asc", desc: "condition_desc" },
      price: { asc: "price_asc", desc: "price_desc" },
      stock: { asc: "quantity_asc", desc: "quantity_desc" },
      status: { asc: "status_asc", desc: "status_desc" },
      views: { asc: "views_asc", desc: "views_desc" },
      inquiries: { asc: "inquiries_asc", desc: "inquiries_desc" },
    };

    const keys = fieldMap[field];
    if (!keys) return;

    if (sortBy === keys.desc) {
      onSortByChange(keys.asc);
    } else {
      onSortByChange(keys.desc);
    }
  };

  const renderSortIcon = (field: string) => {
    const fieldMap: Record<string, { asc: string; desc: string }> = {
      product: { asc: "partName_asc", desc: "partName_desc" },
      category: { asc: "category_asc", desc: "category_desc" },
      condition: { asc: "condition_asc", desc: "condition_desc" },
      price: { asc: "price_asc", desc: "price_desc" },
      stock: { asc: "quantity_asc", desc: "quantity_desc" },
      status: { asc: "status_asc", desc: "status_desc" },
      views: { asc: "views_asc", desc: "views_desc" },
      inquiries: { asc: "inquiries_asc", desc: "inquiries_desc" },
    };

    const keys = fieldMap[field];
    if (!keys) return null;

    if (sortBy === keys.asc) {
      return <ArrowUp className="w-3.5 h-3.5 ml-1 text-blue-600 shrink-0" />;
    }
    if (sortBy === keys.desc) {
      return <ArrowDown className="w-3.5 h-3.5 ml-1 text-blue-600 shrink-0" />;
    }
    return <ArrowUpDown className="w-3.5 h-3.5 ml-1 text-gray-400 opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />;
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th 
                onClick={() => handleSort("product")}
                className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none transition-colors group"
              >
                <div className="flex items-center">
                  Product
                  {renderSortIcon("product")}
                </div>
              </th>
              <th 
                onClick={() => handleSort("category")}
                className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none transition-colors group"
              >
                <div className="flex items-center">
                  Category
                  {renderSortIcon("category")}
                </div>
              </th>
              <th 
                onClick={() => handleSort("condition")}
                className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none transition-colors group"
              >
                <div className="flex items-center">
                  Condition
                  {renderSortIcon("condition")}
                </div>
              </th>
              <th 
                onClick={() => handleSort("price")}
                className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none transition-colors group"
              >
                <div className="flex items-center">
                  Price (AED)
                  {renderSortIcon("price")}
                </div>
              </th>
              <th 
                onClick={() => handleSort("stock")}
                className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none transition-colors group"
              >
                <div className="flex items-center">
                  Stock
                  {renderSortIcon("stock")}
                </div>
              </th>
              <th 
                onClick={() => handleSort("status")}
                className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none transition-colors group"
              >
                <div className="flex items-center">
                  Status
                  {renderSortIcon("status")}
                </div>
              </th>
              <th 
                onClick={() => handleSort("views")}
                className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none transition-colors group"
              >
                <div className="flex items-center">
                  Views
                  {renderSortIcon("views")}
                </div>
              </th>
              <th 
                onClick={() => handleSort("inquiries")}
                className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none transition-colors group"
              >
                <div className="flex items-center">
                  Inquiries
                  {renderSortIcon("inquiries")}
                </div>
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 select-none">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image
                        src={product.photos[0] || ProductImage}
                        alt={product.partName}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 text-sm">
                          {product.partName}
                        </p>
                        {product.isPromoted && (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {product.brand || "N/A"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700 font-medium">
                  {categoryMap.get(product.categoryId) || product.categoryId || "N/A"}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {product.condition}
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">
                  {product.price}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {product.quantity}
                </td>
                <td className="py-3 px-4">
                  {product.status === "APPROVED" && product.expiresAt && new Date(product.expiresAt) < new Date() ? (
                    <Badge className="bg-gray-100 text-gray-700">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      EXPIRED
                    </Badge>
                  ) : (
                    <Badge className={getStatusColor(product.status)}>
                      {getStatusIcon(product.status)}
                      {product.status}
                    </Badge>
                  )}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {product.views}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {product.inquiries}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onView(product.id)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onEdit(product.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    {product.status === "DRAFT" || (product.status === "APPROVED" && product.expiresAt && new Date(product.expiresAt) < new Date()) ? (
                      <>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onRepost(product)}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          title="Publish / Repost"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onDelete(product.id, true)}
                          className="text-red-700 hover:text-red-800 hover:bg-red-50"
                          title="Delete Permanently"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => onDelete(product.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y">
        {products.map((product) => (
          <div key={product.id} className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={product.photos[0] || ProductImage}
                  alt={product.partName}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 text-sm">
                    {product.partName}
                  </p>
                  {product.isPromoted && (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {product.brand || "N/A"}
                </p>
                {product.status === "APPROVED" && product.expiresAt && new Date(product.expiresAt) < new Date() ? (
                  <Badge className="mt-2 bg-gray-100 text-gray-700">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    EXPIRED
                  </Badge>
                ) : (
                  <Badge className={`mt-2 ${getStatusColor(product.status)}`}>
                    {getStatusIcon(product.status)}
                    {product.status}
                  </Badge>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Category:</span>
                <span className="ml-1 text-gray-900 font-medium">
                  {categoryMap.get(product.categoryId) || product.categoryId || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Condition:</span>
                <span className="ml-1 text-gray-900">{product.condition}</span>
              </div>
              <div>
                <span className="text-gray-500">Price:</span>
                <span className="ml-1 font-medium text-gray-900">
                  AED {product.price}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Stock:</span>
                <span className="ml-1 text-gray-900">{product.quantity}</span>
              </div>
              <div>
                <span className="text-gray-500">Views:</span>
                <span className="ml-1 text-gray-900">{product.views}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(product.id)}
                className="flex-1"
              >
                <Eye className="w-4 h-4" />
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(product.id)}
                className="flex-1"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              {product.status === "DRAFT" || (product.status === "APPROVED" && product.expiresAt && new Date(product.expiresAt) < new Date()) ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRepost(product)}
                    className="flex-1 text-green-600 hover:text-green-700"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Repost
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(product.id, true)}
                    className="text-red-700 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(product.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
