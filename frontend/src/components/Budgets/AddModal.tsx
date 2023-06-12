import React, { useState } from "react";
import budgetQuery from "../../services/api/budgetQuery";

interface Props {
  userId: number;
}

const AddModal: React.FC<Props> = ({ userId }) => {
  const initialBudgetData = {
    name: "",
    amount: "",
    description: "",
  };

  const [showModal, setShowModal] = useState(false);
  const [budgetData, setBudgetData] = useState<{
    name: string;
    amount: string;
    description?: string | null;
  }>(initialBudgetData);
  const { mutateAsync } = budgetQuery.createBudget(setShowModal, setBudgetData);

  const [validationError, setValidationError] = useState({
    name: "",
    amount: "",
  });

  const handleShowModal = () => {
    setBudgetData(initialBudgetData);
    setShowModal(!showModal);
  };
  const handleOnChange = (e: React.ChangeEvent<any>) => {
    setBudgetData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setValidationError((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!budgetData.name) {
      return setValidationError((prev) => ({
        ...prev,
        name: "Missing Fields",
      }));
    }
    if (!budgetData.amount) {
      return setValidationError((prev) => ({
        ...prev,
        amount: "Missing Fields",
      }));
    }
    const newBudget = budgetData;
    if (!newBudget.description) {
      delete newBudget.description;
    }

    mutateAsync({ ...budgetData, userId });
  };

  return (
    <>
      <button
        onClick={handleShowModal}
        type="button"
        className="text-white w-20 self-end bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2   focus:outline-none "
      >
        Add
      </button>
      {showModal && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(103%-1rem)] max-h-screen"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold  ">Create Budget</h3>
                </div>
                <button
                  onClick={handleShowModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Budget Name
                    </label>
                    <input
                      value={budgetData?.name}
                      onChange={handleOnChange}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Type Budget name"
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
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Amount/Budget
                    </label>
                    <input
                      value={budgetData?.amount}
                      onChange={handleOnChange}
                      type="number"
                      name="amount"
                      id="amount"
                      placeholder="$2999"
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
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      value={budgetData?.description || ""}
                      onChange={handleOnChange}
                      name="description"
                      id="description"
                      rows={8}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write a budget description here..."
                    ></textarea>
                  </div>
                </div>
                <div className="flex mt-4">
                  <button
                    disabled={!budgetData?.amount || !budgetData?.name}
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Add
                  </button>
                  <button
                    onClick={handleShowModal}
                    type="button"
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModal;
