import React, { useState } from "react";
import expenseQuery from "../../services/api/expenseQuery";
import AddForm from "./AddForm";

interface Props {}

const AddModal: React.FC<Props> = ({}) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
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
                  <h3 className="text-xl font-semibold">Add Expense</h3>
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
              <AddForm setShowModal={setShowModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModal;
