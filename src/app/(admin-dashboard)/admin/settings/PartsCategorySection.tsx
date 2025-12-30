"use client";

import React, { useState, useEffect } from "react";
import { LuPlus, LuPencil, LuTrash2, LuSave, LuX } from "react-icons/lu";
import { toast } from "react-toastify";
import {
  useGetPartsCategoriesQuery,
  useCreatePartsCategoryMutation,
  useUpdatePartsCategoryMutation,
  useDeletePartsCategoryMutation,
} from "@/store/fetures/partsCategory.api";

// Types
interface PartsCategory {
  id: string;
  name: string;
  count?: number;
  icon?: string;
}

export default function PartsCategorySection() {
  // API Hooks
  const { data: categoriesData, isLoading } = useGetPartsCategoriesQuery({ page: 1, limit: 50 });
  const [createCategory] = useCreatePartsCategoryMutation();
  const [updateCategory] = useUpdatePartsCategoryMutation();
  const [deleteCategory] = useDeletePartsCategoryMutation();

  // Local state
  const [categories, setCategories] = useState<PartsCategory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<PartsCategory | null>(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (categoriesData?.data?.data) {
      setCategories(categoriesData.data.data);
    }
  }, [categoriesData]);

  // Handlers
  const handleOpenAdd = () => {
    setCurrentCategory(null);
    setCategoryName("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: PartsCategory) => {
    setCurrentCategory(category);
    setCategoryName(category.name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
    setCategoryName("");
  };

  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      if (currentCategory) {
        // Update existing category
        await updateCategory({ id: currentCategory.id, body: { name: categoryName } }).unwrap();
        toast.success("Category updated successfully!");
      } else {
        // Create new category
        await createCategory({ name: categoryName }).unwrap();
        toast.success("Category added successfully!");
      }
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to save category");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        toast.success("Category deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete category");
      }
    }
  };

  if (isLoading) return <p>Loading categories...</p>;

  return (
    <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Parts Categories</h2>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <LuPlus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">{category.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenEdit(category)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <LuPencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LuTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <LuX className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4">{currentCategory ? "Edit Category" : "Add Category"}</h3>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category name"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <LuSave className="inline w-4 h-4 mr-1" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
