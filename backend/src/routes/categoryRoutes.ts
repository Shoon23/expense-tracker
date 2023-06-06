import { Router } from "express";
import categoryController from "../controller/categoryController";
const categoryRoutes = Router();

// get all categories
categoryRoutes.get("/:userId", categoryController.getAll);
// get category as options
categoryRoutes.get("/:userId/options", categoryController.getAsOptions);

// create category
categoryRoutes.post("/", categoryController.createCategory);
// update category
categoryRoutes.put("/", categoryController.updateCategory);
// delete category
categoryRoutes.delete("/:categoryId", categoryController.deleteCategory);

export default categoryRoutes;
