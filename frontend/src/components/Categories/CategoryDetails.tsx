import React from "react";

interface Props {
  category: {
    id: number;
    name: string;
    description: string | null;
    createdAt: string;
    expenses: number;
  };
}

const CategoryDetails: React.FC<Props> = ({ category }) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Name:
        <span className="ml-2 text-gray-500">{category?.name}</span>
      </h3>
      <h3 className="text-lg font-semibold text-gray-900 ">
        Total Expenses:
        <span className="ml-2 text-gray-500">{category?.expenses}</span>
      </h3>
      <h3 className="text-lg font-semibold text-gray-900 ">
        Date:
        <span className="ml-2 text-gray-500">{category?.createdAt}</span>
      </h3>
      <h3 className="text-gray-900 text-lg font-semibold ">Description:</h3>
      <p className="text-base leading-relaxed break-words">
        {category?.description || "None"}
      </p>
    </div>
  );
};

export default CategoryDetails;
