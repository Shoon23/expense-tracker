import React from "react";

interface Props {
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

const FinalForm: React.FC<Props> = ({
  handleOnChange,
  validationError,
  formData,
}) => {
  return (
    <>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          onChange={handleOnChange}
          value={formData.email}
          type="email"
          name="email"
          id="email"
          placeholder="name@company.com"
          required
          className={
            validationError?.email
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
              : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          }
        />
        {validationError?.email && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">Oops!</span> {validationError?.email}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          onChange={handleOnChange}
          value={formData.password}
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          required
          className={
            validationError?.password
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
              : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          }
        />
        {validationError?.password && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">Oops!</span>{" "}
            {validationError?.password}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <input
          onChange={handleOnChange}
          value={formData.confirmPassword}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="••••••••"
          required
          className={
            validationError?.confirmPassword
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
              : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          }
        />
        {validationError?.confirmPassword && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">Oops!</span>{" "}
            {validationError?.confirmPassword}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Create
      </button>
    </>
  );
};

export default FinalForm;
