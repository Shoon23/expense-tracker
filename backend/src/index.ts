import express, { NextFunction, Request, Response } from "express";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorController from "./controller/errorController";
import expenseRoutes from "./routes/expenseRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import chartRoutes from "./routes/chartRoute";
import verifyAccessToken from "./middleware/verifyAccessToken";
import { env } from "./env";

const app = express();
const port = env.PORT;

app.use(
  cors({
    credentials: true,
    origin: env.CLIENT_URL,
  }),
);
app.use(cookieParser(env.COOKIE_SECRET));
app.use(express.json());
app.use("/auth", authRoutes);
app.use(verifyAccessToken);
app.use("/expense", expenseRoutes);
app.use("/category", categoryRoutes);
app.use("/budget", budgetRoutes);
app.use("/chart", chartRoutes);
app.use(errorController);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
