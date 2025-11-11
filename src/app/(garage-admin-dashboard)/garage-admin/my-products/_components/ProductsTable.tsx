import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, CheckCircle, Clock } from "lucide-react";
import ProductImage from "@/assets/garage-admin/my-products/product.jpg";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  status: "Approved" | "Pending";
  views: number;
  inquiries: number;
  image: string;
}

interface ProductsTableProps {
  products: Product[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProductsTable({
  products,
  onView,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Product
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Category
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Price (AED)
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Stock
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Views
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Inquiries
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
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
                      {/* <div className="w-10 h-10 bg-gray-300 rounded"></div> */}
                      <Image
                        src={ProductImage}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {product.category}
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">
                  {product.price}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {product.stock}
                </td>
                <td className="py-3 px-4">
                  <Badge
                    className={
                      product.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {product.status === "Approved" ? (
                      <CheckCircle className="w-3.5 h-3.5 mr-1" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 mr-1" />
                    )}
                    {product.status}
                  </Badge>
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
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onDelete(product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
                {/* <div className="w-14 h-14 bg-gray-300 rounded"></div> */}
                <Image
                  src={ProductImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">{product.brand}</p>
                <Badge
                  className={`mt-2 ${
                    product.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {product.status === "Approved" ? (
                    <CheckCircle className="w-3.5 h-3.5 mr-1" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 mr-1" />
                  )}
                  {product.status}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Category:</span>
                <span className="ml-1 text-gray-900">{product.category}</span>
              </div>
              <div>
                <span className="text-gray-500">Price:</span>
                <span className="ml-1 font-medium text-gray-900">
                  AED {product.price}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Stock:</span>
                <span className="ml-1 text-gray-900">{product.stock}</span>
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(product.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
