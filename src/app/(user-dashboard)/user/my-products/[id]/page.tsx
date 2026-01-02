"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetProductQuery } from "@/store/api/garageAdminApis/products/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Star,
  Eye,
  MessageSquare,
  Package,
  Calendar,
  User,
  Mail,
  Phone,
  Shield,
  CheckCircle,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { EditProductModal } from "../_components/EditProductModal";
import { DeleteProductModal } from "../_components/DeleteProductModal";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data, isLoading } = useGetProductQuery(params.id as string);
  console.log(data,'single data.........');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const product = data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700 border-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "REJECTED":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    return status === "APPROVED" ? (
      <CheckCircle className="w-4 h-4" />
    ) : (
      <Clock className="w-4 h-4" />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="-ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowEditModal(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.partName}
                </h1>
                {product.isPromoted && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4 fill-yellow-500" />
                    Promoted
                  </div>
                )}
              </div>
              <p className="text-lg text-gray-600 mb-4">
                {product.brand || "No brand specified"}
              </p>
              <div className="flex items-center gap-4">
                <Badge
                  className={`${getStatusColor(
                    product.status
                  )} border px-3 py-1`}
                >
                  {getStatusIcon(product.status)}
                  <span className="ml-1.5 font-medium">{product.status}</span>
                </Badge>
                <div className="flex items-center gap-2 text-gray-600">
                  <Package className="w-4 h-4" />
                  <span className="text-sm">{product.condition}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Price</p>
              <p className="text-4xl font-bold text-blue-600">
                AED {product.price}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {product.quantity} units in stock
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent>
                {product.photos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {product.photos.map((photo, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
                      >
                        <Image
                          src={photo}
                          alt={`${product.partName} ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <p>no image to show.</p>
                  </div>
                )}
              </CardContent>
            </Card>
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {product.description ||
                    "No description available for this product."}
                </p>
              </CardContent>
            </Card>

            {/* Seller Information */}
            {product.seller && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Seller Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between pb-4 border-b">
                      <div>
                        <p className="font-semibold text-lg text-gray-900">
                          {product.seller.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {product.seller.sellerType}
                          </Badge>
                          {product.seller.isVerified && (
                            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center gap-3 text-gray-700">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{product.seller.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">
                          {product.seller.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Eye className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Views</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {product.views}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Inquiries</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {product.inquiries}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Promotion Info */}
            {product.isPromoted && product.promoCost && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-yellow-900 mb-1">
                        Promoted Listing
                      </h3>
                      <p className="text-sm text-yellow-800 mb-2">
                        This product appears at the top of search results for
                        better visibility.
                      </p>
                      <p className="text-sm font-medium text-yellow-900">
                        Promotion Cost: AED {product.promoCost}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Dates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Created</p>
                    <p className="font-medium text-gray-900">
                      {new Date(product.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                    <p className="font-medium text-gray-900">
                      {new Date(product.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <EditProductModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        product={product}
      />
      <DeleteProductModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        productId={product.id}
        productName={product.partName}
      />
    </div>
  );
}
