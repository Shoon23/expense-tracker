import React, { useState } from "react";

interface Props {
  options:
    | Array<{
        id: number;
        name?: string;
        createdAt?: string;
      }>
    | undefined;
  selected: {
    id: number;
    name?: string;
    createdAt?: string;
  };

  name: string;
  handleOptionSelect: (optionName: any) => void;
}

const DropDown: React.FC<Props> = ({
  options,
  selected,
  name,
  handleOptionSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="dropdownRadioButton"
        data-dropdown-toggle="dropdownRadio"
        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
      >
        {selected?.name || selected?.createdAt || name}
        <svg
          className="w-3 h-3 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div
          id="dropdownRadio"
          className="z-10 absolute w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul className="p-3 space-y-1 text-sm text-gray-700 ">
            <li>
              <div
                onClick={() => {
                  handleOptionSelect({});
                  setIsOpen(false);
                }}
                className="flex items-center p-2 rounded hover:bg-gray-100 "
              >
                <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded ">
                  N/A
                </label>
              </div>
            </li>
            {options?.map((option) => (
              <li key={option.id}>
                <div
                  onClick={() => {
                    handleOptionSelect(option);
                    setIsOpen(false);
                  }}
                  className="flex items-center p-2 rounded hover:bg-gray-100 "
                >
                  <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded ">
                    {option?.name || option.createdAt}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

{
  /* <li>
<div className="flex items-center p-2 rounded hover:bg-gray-100">
  <input
    checked={true}
    id="filter-radio-example-2"
    type="radio"
    value=""
    name="filter-radio"
    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
  />
  <label
    htmlFor="filter-radio-example-2"
    className="w-full ml-2 text-sm font-medium text-gray-900 rounded"
  >
    Last 7 days
  </label>
</div>
</li> */
}

export default DropDown;
