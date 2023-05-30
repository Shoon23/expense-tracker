import {
  IconMoneybag,
  IconReceipt,
  IconClockHour11,
} from "@tabler/icons-react";
import {
  LineChart,
  DoughnutChart,
  TransactionTable,
} from "../components/Dashboard";
import { useQueryClient } from "@tanstack/react-query";
import { iUser } from "../types/user";
import expense from "../services/api/expense";
import { useState } from "react";

const Home = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<iUser>(["user"]);
  const [selected, setSelected] = useState("None");
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [budgetSpent, setBudgetSpent] = useState(0);
  const [recentExpense, setRecentExpense] = useState<any>(null);
  const { data: recentData, isLoading } = expense.getDashboard(
    user?.id as number
  );

  console.log(recentData);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectBudget = (budget: any) => {
    setIsOpen(false);
    setSelected(budget.name);
    setBudgetAmount(budget.amount);
    setBudgetSpent(budget.expenses);
    setRecentExpense({
      id: budget.recentExpense.id,
      name: budget.recentExpense.name,
      amount: budget.recentExpense.amount,
    });
  };
  return (
    <>
      <div className="p-4 sm:ml-64 flex flex-col gap-2">
        <h1 className="text-3xl mb-3">Dashboard</h1>

        <div>
          <h1 className="text-2xl mb-3">Budgets</h1>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={toggleDropdown}
          >
            {selected}
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {isOpen && (
            <div
              id="dropdown"
              className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li
                  className="cursor-pointer block px-4 py-2 hover:bg-gray-100  dark:hover:text-white"
                  onClick={() =>
                    handleSelectBudget({
                      name: "None",
                      amount: 0,
                      expenses: 0,
                      recentExpense: {
                        id: 0,
                        name: "None",
                        amount: 0,
                      },
                    })
                  }
                >
                  None
                </li>
                {recentData?.budgetList.map((budget) => (
                  <li
                    className="cursor-pointer block px-4 py-2 hover:bg-gray-100  dark:hover:text-white"
                    key={budget.id}
                    onClick={() => handleSelectBudget(budget)}
                  >
                    {budget.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className=" grid grid-cols-2	gap-2 sm:flex sm:flex-wrap ">
          <div className="flex flex-col items-center bg-emerald-500 gap-0 md:gap-2 border border-gray-200 rounded-lg shadow md:flex-row w-[170px] sm:[150px] md:w-52 px-10">
            <IconMoneybag color="white" width={48} height={85} />
            <div className="flex flex-col justify-between p-2 leading-normal">
              <h5 className="text-2xl font-bold tracking-tight text-white">
                {budgetAmount}
              </h5>
              <p className="mb-3 font-normal text-white">Budget</p>
            </div>
          </div>
          <div className="flex flex-col items-center bg-amber-400 gap-0 md:gap-2 border border-gray-200 rounded-lg shadow md:flex-row w-[170px] sm:[150px] md:w-52 px-10">
            <IconReceipt color="white" width={48} height={85} />

            <div className="flex flex-col justify-between p-2 leading-normal">
              <h5 className="text-2xl font-bold tracking-tight text-white">
                {budgetSpent}
              </h5>
              <p className="mb-3 font-normal text-white">Spent</p>
            </div>
          </div>
          <div className="flex flex-col items-center bg-rose-500 gap-0 md:gap-2 border border-gray-200 rounded-lg shadow md:flex-row w-[170px] sm:[150px] md:w-52 px-10">
            <IconClockHour11 color="white" width={48} height={85} />

            <div className="flex flex-col justify-between p-2 leading-normal">
              <h5 className="text-2xl font-bold tracking-tight text-white">
                {!isLoading && recentExpense !== null
                  ? recentExpense.amount
                  : 0}
              </h5>
              <p className="mb-3 font-normal text-white">
                Recent:{" "}
                {!isLoading && recentExpense !== null
                  ? recentExpense.name
                  : "None"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[400px]">
          <LineChart userId={user?.id as number} />
        </div>
        <div className="self-center h-[400px]">
          <DoughnutChart userId={user?.id as number} />
        </div>
        <TransactionTable expenseList={recentData?.expenseList || []} />
      </div>
    </>
  );
};

export default Home;
