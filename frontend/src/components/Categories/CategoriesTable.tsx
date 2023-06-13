import React, { useState } from "react";
import { PopUpDeleteModal } from "../common";
import { ViewMoreModal, AddModal } from ".";
import categoryQuery from "../../services/api/categoryQuery";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { iUser } from "../../types/user";
import stringUtils from "../../utils/stringUtils";
import Loading from "../common/Loading";
const CategoriesTable = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<iUser>(["user"]);
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState<string | undefined>();
  const { data, isLoading, refetch, isError } = categoryQuery?.getAll(
    user?.id as number,
    page,
    searchKey
  );

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(searchKey);
      setPage(1);
      refetch();
    }
  };
  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center p-4 gap-3 justify-between">
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
            placeholder="Search htmlFor items"
          />
        </div>
        <div className="">
          <AddModal userId={user?.id as number} />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Category Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              # of Expense
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="text-center ">
                <div className="flex justify-center my-4 items-center h-full">
                  <Loading />
                </div>
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={6} className="text-center text-red-600 ">
                Error occurred while fetching data.
              </td>
            </tr>
          ) : data?.categoryList && data?.categoryList?.length > 0 ? (
            data?.categoryList?.map((category) => (
              <tr
                key={category?.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {category?.name}
                </th>
                <td className="px-6 py-2">
                  {stringUtils?.sliceString(category?.description)}
                </td>
                <td className="px-6 py-2">{category?.expenses}</td>
                <td className="px-6 py-2">{category?.createdAt}</td>
                <td className="px-6 py-2 flex">
                  <ViewMoreModal category={category} />
                  <PopUpDeleteModal
                    id={category?.id}
                    prompt="Are you sure you want to delete this category?"
                    deleteQuery={categoryQuery?.deleteCategory}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <nav
        className="flex items-center justify-between p-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing
          <span className="font-semibold text-gray-900 dark:text-white">
            {data?.categoryList && data?.categoryList.length > 0
              ? `1-${data?.categoryList.length}`
              : "0"}
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
              1
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

export default CategoriesTable;
