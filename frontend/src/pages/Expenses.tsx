import React from "react";
import { ExpenseTable } from "../components/Expenses";
import expense from "../services/api/expenseQuery";
import { useQueryClient } from "@tanstack/react-query";
import { iUser } from "../types/user";
const Expenses = () => {
  return (
    <div className="p-4 sm:ml-64">
      <ExpenseTable />
    </div>
  );
};

export default Expenses;
