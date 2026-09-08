import { Request, Response, NextFunction } from "express";

interface ErrorResponse {
  error: string;
  statusCode: number;
  timestamp: string;
}

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const errorMessage = error.message || "Internal server error";
  let statusCode = 500;

  if (
    errorMessage.includes("Email already registered") ||
    errorMessage.includes("User not found")
  ) {
    statusCode = 409;
  } else if (errorMessage.includes("Invalid email format")) {
    statusCode = 400;
  } else if (errorMessage.includes("Password must be at least")) {
    statusCode = 400;
  } else if (errorMessage.includes("are required")) {
    statusCode = 400;
  } else if (errorMessage.includes("Invalid credentials")) {
    statusCode = 401;
  } else if (errorMessage.includes("Invalid or expired token")) {
    statusCode = 401;
  }

  const errorResponse: ErrorResponse = {
    error: errorMessage,
    statusCode,
    timestamp: new Date().toISOString(),
  };

  response.status(statusCode).json(errorResponse);
};