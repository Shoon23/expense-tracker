import { Router } from "express";
import chartController from "../controller/chartController";

const chartRoutes = Router();

chartRoutes.get(
  "/monthly-expense-trend/:userId",
  chartController.getMonthlyExpenseTrend
);

chartRoutes.get(
  "/category-distribution/:userId",
  chartController.getCategoryDistribution
);

export default chartRoutes;
