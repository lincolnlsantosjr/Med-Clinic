"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./database/data-source");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "3000", 10);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/auth", authRoutes_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "MedClinic API - Etapa 1: Autenticação e Autorização",
        version: "1.0.0",
        status: "online",
    });
});
app.use(errorHandler_1.errorHandler);
const startServer = async () => {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log("✅ Database connection established");
        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
            console.log(`📚 API Documentation:`);
            console.log(`   POST   /auth/register       - Register a new user`);
            console.log(`   POST   /auth/login          - Login and get JWT token`);
            console.log(`   GET    /auth/users/me       - Get logged user profile`);
            console.log(`   GET    /auth/admin/ping     - Admin only endpoint`);
        });
    }
    catch (error) {
        console.error("❌ Error starting server:", error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map