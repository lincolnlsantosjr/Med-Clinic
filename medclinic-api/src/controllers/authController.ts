import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";
import { AuthService } from "../services/authService";
import { UserRole } from "../entities/user";

interface AuthenticatedRequest extends Request {
  userId?: string;
  userRole?: string;
}

export class AuthController {
  private userService: UserService;
  private authService: AuthService;

  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
  }

  async register(
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, password, role } = request.body;

      const user = await this.userService.createUser({
        name,
        email,
        password,
        role: role || UserRole.ATTENDANT,
      });

      response.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = request.body;

      const result = await this.authService.login({
        email,
        password,
      });

      response.status(200).json({
        message: "Login successful",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = request.userId;

      if (!userId) {
        response.status(401).json({ error: "User ID not found" });
        return;
      }

      const user = await this.userService.getUserById(userId);

      response.status(200).json({
        message: "User profile retrieved",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async adminPing(
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = request.userId;
      const userRole = request.userRole;

      response.status(200).json({
        message: "Admin access granted",
        userId,
        userRole,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }
}