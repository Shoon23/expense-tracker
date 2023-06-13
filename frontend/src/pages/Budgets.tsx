import BudgetTable from "../components/Budgets/BudgetTable";

const Budgets = () => {
  return (
    <div className="p-4 sm:ml-64">
      <h1 className="text-4xl mb-3">Budgets</h1>

      <BudgetTable />
    </div>
  );
};

export default Budgets;
