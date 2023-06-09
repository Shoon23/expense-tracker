import { Router } from "express";
import authController from "../controller/authController";
import verifyAccessToken from "../middleware/verifyAccessToken";

const authRoutes = Router();

authRoutes.post("/register", authController.registerController);
authRoutes.post("/login", authController.loginController);
authRoutes.post("/logout", authController.logoutController);
authRoutes.get("/refresh", authController.refreshToken);

export default authRoutes;
