import React, { useState } from "react";
import { CategoryDetails, ExpenseList, UpdateForm } from ".";

const ViewMoreModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [isShowForm, setIsShowForm] = useState(false);
  const [isShowExpenseList, setisShowExpenseList] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsShowForm(false);
    setisShowExpenseList(false);
  };

  const showUpdateForm = () => {
    setIsShowForm((prev) => !prev);
  };

  const showExpensList = () => {
    setisShowExpenseList((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={handleShowModal}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        View
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
                  <h3 className="text-xl font-semibold  ">
                    Category: <span className="text-gray-900">Food</span>
                  </h3>
                </div>
                <button
                  onClick={handleCloseModal}
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
              {isShowForm ? (
                <UpdateForm setIsShowForm={setIsShowForm} />
              ) : isShowExpenseList ? (
                <ExpenseList />
              ) : (
                <CategoryDetails />
              )}
              {!isShowForm && !isShowExpenseList ? (
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    onClick={showExpensList}
                    type="button"
                    className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 "
                  >
                    View Expenses
                  </button>
                  <button
                    onClick={showUpdateForm}
                    type="button"
                    className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Update
                  </button>
                </div>
              ) : (
                isShowExpenseList && (
                  <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      onClick={() => setisShowExpenseList((prev) => !prev)}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Back
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewMoreModal;
