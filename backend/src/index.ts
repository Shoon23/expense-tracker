import express, { NextFunction, Request, Response } from "express";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import errorController from "./controller/errorController";
import expenseRoutes from "./routes/expenseRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const app = express();
const port = process.env.PORT || 1234;

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/expense", expenseRoutes);
app.use("/category", categoryRoutes);
app.use(errorController);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
