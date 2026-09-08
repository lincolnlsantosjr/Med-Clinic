import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware";
import { UserRole } from "../entities/user";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/register", (req: Request, res: Response, next) =>
  authController.register(req, res, next)
);

authRoutes.post("/login", (req: Request, res: Response, next) =>
  authController.login(req, res, next)
);

authRoutes.get(
  "/users/me",
  authMiddleware,
  (req: Request, res: Response, next) =>
    authController.getProfile(req, res, next)
);

authRoutes.get(
  "/admin/ping",
  authMiddleware,
  authorizationMiddleware([UserRole.ADMIN]),
  (req: Request, res: Response, next) =>
    authController.adminPing(req, res, next)
);

export default authRoutes;