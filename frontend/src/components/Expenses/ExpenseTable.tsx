import { PopUpDeleteModal } from "../common";
import { useQueryClient } from "@tanstack/react-query";
import { iUser } from "../../types/user";
import expenseQuery from "../../services/api/expenseQuery";
import UpdateBtn from "./UpdateBtn";
import { useEffect, useState } from "react";
import { DropDown } from "../common";
import budgetQuery from "../../services/api/budgetQuery";
import categoryQuery from "../../services/api/categoryQuery";

const ExpenseTable = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<iUser>(["user"]);
  const [searchKey, setSearchKey] = useState<string | undefined>();

  // filters
  const [budgetFilter, setBudgetFilter] = useState<any>({});
  const [categoryFilter, setCategoryFilter] = useState<any>({});
  const [dateFilter, setDateFilter] = useState<any>({});
  // page number
  const [page, setPage] = useState(1);

  // queries
  const { data, refetch } = expenseQuery.getAllExpenes(
    user?.id as number,
    page,
    searchKey,
    budgetFilter.id,
    categoryFilter.id,
    dateFilter.id
  );

  const { data: dates } = expenseQuery.getDates(user?.id as number);
  const { data: budgetOptions } = budgetQuery.getBudgetOptions(
    user?.id as number
  );

  const { data: categoryOptions } = categoryQuery.getCategoryOptions(
    user?.id as number
  );

  useEffect(() => {
    refetch();
  }, [budgetFilter, categoryFilter, dateFilter]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPage(1);
      refetch();
    }
  };
  const handleBudgetFilterSelect = (option: any) => {
    setPage(1);
    setBudgetFilter(option);
  };

  const handleCategoryFilterSelect = (option: any) => {
    setPage(1);
    setCategoryFilter(option);
  };

  const handleDateFilterSelect = (option: any) => {
    setPage(1);
    setDateFilter(option);
  };

  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center p-4 gap-3">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <input
            onKeyDown={handleSearch}
            onChange={searchOnChange}
            value={searchKey}
            type="text"
            id="table-search"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Expenses"
          />
        </div>
        <DropDown
          options={budgetOptions}
          selected={budgetFilter}
          name="Budgets"
          handleOptionSelect={handleBudgetFilterSelect}
        />
        <DropDown
          options={categoryOptions}
          selected={categoryFilter}
          name="Category"
          handleOptionSelect={handleCategoryFilterSelect}
        />
        <DropDown
          options={dates}
          selected={dateFilter}
          name="Date"
          handleOptionSelect={handleDateFilterSelect}
        />
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Expense Name
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
            <th scope="col" className="px-6 py-3">
              Date Added
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.expenseList.map((expense) => {
            return (
              <tr
                key={expense.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {expense.name}
                </th>
                <td className="px-6 py-3">{expense.amount}</td>
                <td className="px-6 py-3">
                  {expense?.category?.name || "N/A"}
                </td>
                <td className="px-6 py-3">{expense?.budget?.name || "N/A"}</td>
                <td className="px-6 py-3">{expense.createdAt}</td>

                <td className="px-6 py-3 flex gap-1">
                  <UpdateBtn
                    expense={expense}
                    budgetOptions={budgetOptions}
                    categoryOptions={categoryOptions}
                  />

                  <PopUpDeleteModal
                    prompt="Are you sure you want to delete this expense?"
                    id={expense.id}
                    deleteQuery={expenseQuery.deleteExpense}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav
        className="flex items-center justify-between p-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1-10
          </span>{" "}
        </span>
        <ul className="inline-flex items-center -space-x-px">
          <li
            onClick={() => {
              if (page === 1) return;
              setPage(page - 1);
            }}
          >
            <a
              href="#"
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {page}
            </a>
          </li>

          <li
            onClick={() => {
              if (data?.isLastPage) return;
              setPage(page + 1);
            }}
          >
            <a
              href="#"
              className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ExpenseTable;
