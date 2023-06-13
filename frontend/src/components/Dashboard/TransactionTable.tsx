import React, { useState } from "react";

interface Props {
  expenseList: Array<{
    amount: string;
    budget: { name: string };
    category: { name: string };
    id: number;
    name: string;
  }>;
}

const TransactionTable: React.FC<Props> = ({ expenseList }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
      <h1 className="text-3xl mb-2">Recent Transactions</h1>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white bg-blue-700 hover:bg-blue-800 rounded-lg uppercase  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Budget
            </th>
          </tr>
        </thead>
        <tbody>
          {expenseList.map((expense) => (
            <tr
              key={expense.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {expense.name}
              </th>
              <td className="px-6 py-4">{expense.amount}</td>

              <td className="px-6 py-4">{expense?.category?.name || "None"}</td>
              <td className="px-6 py-4">{expense?.budget?.name || "None"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
