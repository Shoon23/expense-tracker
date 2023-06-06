import express, { NextFunction, Request, Response } from "express";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorController from "./controller/errorController";
import expenseRoutes from "./routes/expenseRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import chartRoutes from "./routes/chartRoute";

const app = express();
const port = process.env.PORT || 1234;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/expense", expenseRoutes);
app.use("/category", categoryRoutes);
app.use("/budget", budgetRoutes);
app.use("/chart", chartRoutes);
app.use(errorController);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
