import { ExpenseTable } from "../components/Expenses";
const Expenses = () => {
  return (
    <div className="p-4 sm:ml-64">
      <h1 className="text-4xl mb-3">Expenses</h1>

      <ExpenseTable />
    </div>
  );
};

export default Expenses;
