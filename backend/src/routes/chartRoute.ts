import { Router } from "express";
import chartController from "../controller/chartController";

const chartRoutes = Router();

chartRoutes.get(
  "/monthly-expense-trend/:userId",
  chartController.getMonthlyExpenseTrend
);

export default chartRoutes;
