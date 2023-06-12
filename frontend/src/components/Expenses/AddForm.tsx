import React, { useState } from "react";
import expenseQuery from "../../services/api/expenseQuery";
import { useQueryClient } from "@tanstack/react-query";
import { iUser } from "../../types/user";
import budgetQuery from "../../services/api/budgetQuery";
import categoryQuery from "../../services/api/categoryQuery";
import { IconCircleLetterW } from "@tabler/icons-react";

interface Props {
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddForm: React.FC<Props> = ({ setShowModal }) => {
  // states
  const initialExpenseData = {
    name: "",
    amount: "",
    budgetId: null,
    categoryId: null,
  };
  const [expenseData, setExpenseData] = useState<{
    name: string;
    amount: string;
    budgetId?: number | null;
    categoryId?: number | null;
  }>(initialExpenseData);

  const [validationError, setValidationError] = useState({
    name: "",
    amount: "",
  });
  // queries
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<iUser>(["user"]);
  const { data: budgetOptions } = budgetQuery.getBudgetOptions(
    user?.id as number
  );

  const { data: categoryOptions } = categoryQuery.getCategoryOptions(
    user?.id as number
  );
  const { mutateAsync } = expenseQuery.createExpense(
    setExpenseData,
    setShowModal
  );

  // event handler

  // handle input onChange
  const handleOnChange = (e: React.ChangeEvent<any>) => {
    setExpenseData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setValidationError((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  // handle select onChange
  const handleOnChangeDropDown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExpenseData((prev) => ({
      ...prev,
      [e.target.name]: parseInt(e?.target?.value) || null,
    }));
  };

  // handle submiting data
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!expenseData.name) {
      return setValidationError((prev) => ({
        ...prev,
        name: "Missing Fields",
      }));
    }
    if (!expenseData.amount) {
      return setValidationError((prev) => ({
        ...prev,
        amount: "Missing Fields",
      }));
    }
    const newExpense = expenseData;

    if (!newExpense?.budgetId) {
      delete newExpense?.budgetId;
    }
    if (!newExpense?.categoryId) {
      delete newExpense?.categoryId;
    }

    mutateAsync({ ...newExpense, userId: user?.id as number });
  };
  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Expense Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Type expense name"
            value={expenseData?.name}
            onChange={handleOnChange}
            className={
              validationError?.name
                ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
                : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            }
          />
          {validationError?.name && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oops!</span> {validationError?.name}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="$2999"
            value={expenseData?.amount}
            onChange={handleOnChange}
            className={
              validationError?.amount
                ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
                : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            }
          />
          {validationError?.amount && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oops!</span>{" "}
              {validationError?.amount}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="categoryId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <select
            value={expenseData?.categoryId || 0}
            onChange={handleOnChangeDropDown}
            name="categoryId"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value={""}>Select category</option>

            {categoryOptions?.map((category) => {
              return (
                <option key={category?.id} value={category?.id}>
                  {category?.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label
            htmlFor="budgetId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Budget
          </label>
          <select
            value={expenseData?.budgetId || 0}
            onChange={handleOnChangeDropDown}
            name="budgetId"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value={""}>Select budget</option>

            {budgetOptions?.map((budget) => (
              <option key={budget.id} value={budget?.id}>
                {budget.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="disabled:bg-gray-500 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 "
      >
        Add
      </button>
    </form>
  );
};

export default AddForm;
