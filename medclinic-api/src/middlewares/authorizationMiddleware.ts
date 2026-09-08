import { Request, Response, NextFunction } from "express";
import { UserRole } from "../entities/user";

interface AuthorizedRequest extends Request {
  userRole?: string;
}

export const authorizationMiddleware =
  (requiredRoles: UserRole[]) =>
  (
    request: AuthorizedRequest,
    response: Response,
    next: NextFunction
  ): void => {
    try {
      const userRole = request.userRole;

      if (!userRole) {
        response.status(401).json({
          error: "User role not found",
        });
        return;
      }

      if (!requiredRoles.includes(userRole as UserRole)) {
        response.status(403).json({
          error: "Access denied",
        });
        return;
      }

      next();
    } catch (error) {
      response.status(403).json({
        error: "Authorization failed",
      });
    }
  };