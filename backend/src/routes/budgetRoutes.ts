import { Router } from "express";
import budgetController from "../controller/budgetController";
const budgetRoutes = Router();

// get all budgets
budgetRoutes.get("/:userId", budgetController.getAll);
// get budget as options
budgetRoutes.get("/:userId/options", budgetController.getAsOptions);
// create budget
budgetRoutes.post("/", budgetController.createBudget);
// update budget
budgetRoutes.put("/", budgetController.updateBudget);
// delete budget
budgetRoutes.delete("/:budgetId", budgetController.deleteBudget);
// get budget expenses
budgetRoutes.get("/:budgetId/expense", budgetController.getAllExpense);

export default budgetRoutes;
