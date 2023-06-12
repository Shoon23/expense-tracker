import React, { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  IconCategory,
  IconArrowBarToLeft,
  IconPlus,
  IconBusinessplan,
  IconCoins,
  IconChartBar,
} from "@tabler/icons-react";
import { Toaster } from "react-hot-toast";
import { AddModal } from "../Expenses";

const Aside = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sidebarRef = useRef<HTMLBaseElement>(null);

  const handleCloseSidebar = () => {
    setIsVisible(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        handleCloseSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCloseSidebar]);
  const handleClick = () => {
    setIsVisible(true);
  };

  return (
    <>
      <Toaster />
      <button
        onClick={handleClick}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        ref={sidebarRef}
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform  sm:translate-x-0 ${
          isVisible ? "" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={"/"}
                onClick={handleCloseSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <IconChartBar size={24} color="gray" stroke={3} />

                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/expenses"}
                onClick={handleCloseSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <IconCoins size={24} color="gray" stroke={3} />

                <span className="flex-1 ml-3 whitespace-nowrap">Expenses</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/budgets"}
                onClick={handleCloseSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <IconBusinessplan size={24} color="gray" stroke={3} />

                <span className="ml-3">Budgets</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/categories"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <IconCategory size={24} color="gray" stroke={3} />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Categories
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={"/add"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <IconPlus size={24} className="stroke-emerald-500" stroke={3} />
                <span className="flex-1 text-emerald-500 ml-3 whitespace-nowrap">
                  Add Expense
                </span>
              </Link>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <IconArrowBarToLeft
                  size={24}
                  className="stroke-rose-500"
                  stroke={3}
                />

                <span className="flex-1 ml-3 whitespace-nowrap text-rose-500">
                  Sign Out
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <Outlet />
    </>
  );
};

export default Aside;
