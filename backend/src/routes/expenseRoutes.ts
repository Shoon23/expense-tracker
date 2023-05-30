import { Router } from "express";
import expenseController from "../controller/expenseController";
const expenseRoutes = Router();

// Get all expense
expenseRoutes.get("/:userId", expenseController.getAll);
// get recent expense
expenseRoutes.get("/:userId/dashboard", expenseController.getDashboard);
//Create expense
expenseRoutes.post("/", expenseController.createExpense);
//Update expense
expenseRoutes.put("/", expenseController.updateExpense);
//Delete expense
expenseRoutes.delete("/:expenseId", expenseController.deleteExpense);

export default expenseRoutes;
