import { Router } from "express";
import categoryController from "../controller/categoryController";
const categoryRoutes = Router();

// get all categories
categoryRoutes.get("/:userId", categoryController.getAll);
// get category as options
categoryRoutes.get("/:userId/options", categoryController.getAsOptions);
// get category expenses
categoryRoutes.get("/:categoryId/expense", categoryController.getAllExpense);
// create category
categoryRoutes.post("/", categoryController.createCategory);
// update category
categoryRoutes.put("/", categoryController.updateCategory);
// delete category
categoryRoutes.delete("/:categoryId", categoryController.deleteCategory);
// delete budget expense
categoryRoutes.delete(
  "/:expenseId/expense",
  categoryController.deleteCategoryExpense
);
export default categoryRoutes;
