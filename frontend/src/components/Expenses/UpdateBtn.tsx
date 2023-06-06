import React, { useState } from "react";
import { UpdateModal } from ".";

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
}

const UpdateBtn: React.FC<Props> = ({
  budgetOptions,
  categoryOptions,
  expense,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="block text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        type="button"
      >
        Update
      </button>
      {showModal && (
        <UpdateModal
          categoryOptions={categoryOptions}
          budgetOptions={budgetOptions}
          expense={expense}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default UpdateBtn;
