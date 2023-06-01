interface iExpense {
  amount: string;
  createdAt: string;
  budget: { name: string; id: number };
  category: { name: string; id: number };
  id: number;
  name: string;
}
