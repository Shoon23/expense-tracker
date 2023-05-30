interface iDdBudget {
  amount: string;
  expenses: string;
  id: number;
  name: string;
  recentExpense: {
    amount: string;
    id: number;
    name: string;
  };
}
