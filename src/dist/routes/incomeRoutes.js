"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const incomeController_1 = require("../controllers/incomeController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.protect, incomeController_1.addIncome);
router.get("/", authMiddleware_1.protect, incomeController_1.getAllIncome);
router.delete("/:id", authMiddleware_1.protect, incomeController_1.deleteIncome);
router.get("/download", authMiddleware_1.protect, incomeController_1.downloadIncomeExcel);
exports.default = router;
