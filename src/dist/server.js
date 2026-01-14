"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// import dashboardRoutes from './routes/dashboardRoutes';
// import expenseRoutes from './routes/expenseRoutes';
const incomeRoutes_1 = __importDefault(require("./routes/incomeRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:5000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, db_1.connectDB)();
app.use("/api/v1/auth", authRoutes_1.default);
// app.use("/api/v1/dashboard", dashboardRoutes);
// app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/income", incomeRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});
