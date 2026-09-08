import { Request, Response, NextFunction } from "express";
import { JwtUtils } from "../utils/jwt";

interface AuthenticatedRequest extends Request {
  userId?: string;
  userRole?: string;
}

export const authMiddleware = (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      response.status(401).json({
        error: "Missing authorization header",
      });
      return;
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      response.status(401).json({
        error: "Invalid authorization format",
      });
      return;
    }

    const token = parts[1];

    try {
      const decoded = JwtUtils.verifyToken(token);
      request.userId = decoded.id;
      request.userRole = decoded.role;
      next();
    } catch (error) {
      response.status(401).json({
        error: "Invalid or expired token",
      });
    }
  } catch (error) {
    response.status(401).json({
      error: "Authentication failed",
    });
  }
};