import React from "react";

interface Props {
  budget: {
    id: number;
    name: string;
    amount: string;
    description: string | undefined;
    createdAt: string;
  };
}

const BudgetDetails: React.FC<Props> = ({ budget }) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Amount:
        <span className="ml-2 text-gray-500">{budget.amount}</span>
      </h3>
      <h3 className="text-lg font-semibold text-gray-900 ">
        Date:
        <span className="ml-2 text-gray-500">{budget.createdAt}</span>
      </h3>
      <h3 className="text-lg font-semibold text-gray-900 ">
        Description:
        <p className="text-gray-500 break-words">
          {budget?.description || "None"}
        </p>
      </h3>
    </div>
  );
};

export default BudgetDetails;
