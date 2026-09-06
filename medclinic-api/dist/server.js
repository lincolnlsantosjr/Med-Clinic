"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./database/data-source");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "3000", 10);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "MedClinic API",
        version: "1.0.0",
        status: "online",
    });
});
const startServer = async () => {
    data_source_1.AppDataSource.initialize();
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
//# sourceMappingURL=server.js.map