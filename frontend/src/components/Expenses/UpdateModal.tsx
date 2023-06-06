import React, { useEffect, useState } from "react";
import expenseQuery from "../../services/api/expenseQuery";
interface Props {
  budgetOptions:
    | Array<{
        id: number;
        name: string;
      }>
    | undefined;
  categoryOptions:
    | Array<{
        id: number;
        name: string;
      }>
    | undefined;
  expense: iExpense;

  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateModal: React.FC<Props> = ({
  expense,
  budgetOptions,
  categoryOptions,
  setShowModal,
}) => {
  const initialExpenseData = {
    name: "",
    amount: "",
    expenseId: 0,
    categoryId: null,
    budgetId: null,
  };
  const [expenseData, setExpenseData] = useState<{
    name?: string;
    amount?: string;
    expenseId?: number;
    categoryId?: number | null;
    budgetId?: number | null;
  }>(initialExpenseData);

  useEffect(() => {
    setExpenseData({
      name: expense?.name,
      amount: expense?.amount,
      expenseId: expense?.id,
      categoryId: expense?.category?.id || null,
      budgetId: expense?.budget?.id || null,
    });

    return () => {
      setExpenseData(initialExpenseData);
    };
  }, []);

  const [validationError, setValidationError] = useState({
    name: "",
    amount: "",
  });
  const { mutateAsync, isError } = expenseQuery.updateExpense(setShowModal);

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
  const handleOnChangeDropDown = (e: React.ChangeEvent<any>) => {
    setExpenseData((prev) => ({
      ...prev,
      [e.target.name]: parseInt(e.target.value) || null,
    }));
  };

  const handleUpdateExpense = (e: React.FormEvent<HTMLFormElement>) => {
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

    const updateData = expenseData;

    if (updateData.categoryId === expense?.category?.id) {
      delete updateData.categoryId;
    }
    if (updateData.budgetId === expense?.budget?.id) {
      delete updateData.budgetId;
    }
    if (updateData.amount === expense.amount) {
      delete updateData.amount;
    }
    if (updateData.name === expense.name) {
      delete updateData.name;
    }
    console.log(updateData);

    mutateAsync(updateData);
  };
  return (
    <>
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(103%-1rem)] max-h-screen"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => setShowModal(false)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Update Expense
              </h3>
              {isError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> Something went
                  wrong
                </p>
              )}
              <form onSubmit={handleUpdateExpense}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Expense Name
                    </label>
                    <input
                      onChange={handleOnChange}
                      type="text"
                      name="name"
                      id="name"
                      value={expenseData?.name || ""}
                      placeholder="Type product name"
                      className={
                        validationError?.name
                          ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
                          : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      }
                    />
                    {validationError?.name && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oops!</span>{" "}
                        {validationError?.name}
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
                      onChange={handleOnChange}
                      type="number"
                      name="amount"
                      id="amount"
                      value={expenseData?.amount || ""}
                      placeholder="$2999"
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
                      onChange={handleOnChangeDropDown}
                      value={expenseData?.categoryId || 0}
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
                      onChange={handleOnChangeDropDown}
                      name="budgetId"
                      value={expenseData?.budgetId || 0}
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
                  disabled={
                    expense.name === expenseData.name &&
                    expense.amount === expenseData.amount &&
                    expense.category?.id === expenseData.categoryId &&
                    expense.budget?.id === expenseData.budgetId
                  }
                  type="submit"
                  className="disabled:bg-gray-500 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 "
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
