import "reflect-metadata";
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./database/data-source";

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "MedClinic API",
    version: "1.0.0",
    status: "online",
  });
});

const startServer = async (): Promise<void> => {
  AppDataSource.initialize();
    console.log("✅ Database connection established");
    
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation:`);
    console.log(`   POST   /auth/register       - Register a new user`);
    console.log(`   POST   /auth/login          - Login and get JWT token`);
    console.log(`   GET    /auth/users/me       - Get logged user profile`);
    console.log(`   GET    /auth/admin/ping     - Admin only endpoint`);
  });
};

startServer();
