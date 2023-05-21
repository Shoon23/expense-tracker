import { Router } from "express";
import budgetController from "../controller/budgetController";
const budgerRoutes = Router();

// get all budgets
budgerRoutes.get("/:userId", budgetController.getAll);
// create budget
budgerRoutes.post("/", budgetController.createBudget);
// update budget
budgerRoutes.put("/", budgetController.updateBudget);
// delete budget
budgerRoutes.delete("/:budgetId", budgetController.deleteBudget);
// get budget transactions
budgerRoutes.get("/:budgetId/transactions", budgetController.getAllExpense);
// get budget summary
export default budgerRoutes;
