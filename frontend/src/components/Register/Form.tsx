import React from "react";

interface Props {
  handleNext: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validationError: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

const Form: React.FC<Props> = ({
  handleNext,
  handleOnChange,
  validationError,
  formData,
}) => {
  return (
    <>
      <div>
        <label
          htmlFor="firstname"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          First Name
        </label>
        <input
          onChange={handleOnChange}
          value={formData?.firstName}
          type="text"
          name="firstName"
          id="firstname"
          placeholder="first name"
          required
          className={
            validationError?.firstName
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
              : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          }
        />
        {validationError?.firstName && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">Oops!</span>{" "}
            {validationError?.firstName}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="lastname"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Last Name
        </label>
        <input
          onChange={handleOnChange}
          value={formData?.lastName}
          type="text"
          name="lastName"
          id="lastname"
          placeholder="last name"
          className={
            validationError?.lastName
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
              : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          }
        />
        {validationError?.lastName && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">Oops!</span>{" "}
            {validationError?.lastName}
          </p>
        )}
      </div>
      <button
        onClick={handleNext}
        type="button"
        className="w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Next
      </button>
    </>
  );
};

export default Form;
