import React from "react";
import { LuPlus, LuPencil, LuTrash2 } from "react-icons/lu";

interface PartsCategory {
  id: string;
  name: string;
  count: number;
  icon: string;
}

interface PartsCategoriesProps {
  categories: PartsCategory[];
  handleAddCategory: () => void;
  handleEditCategory: (id: string) => void;
  handleDeleteCategory: (id: string) => void;
}

const PartsCategories: React.FC<PartsCategoriesProps> = ({
  categories,
  handleAddCategory,
  handleEditCategory,
  handleDeleteCategory,
}) => {
  return (
    <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          Parts Categories
        </h2>
        <button
          onClick={handleAddCategory}
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
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {category.name}
                </p>
                <p className="text-xs text-gray-500">{category.count} parts</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEditCategory(category.id)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
              >
                <LuPencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <LuTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartsCategories;
