"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadIncomeExcel = exports.deleteIncome = exports.getAllIncome = exports.addIncome = void 0;
const Income_1 = __importDefault(require("../models/Income"));
const addIncome = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User not found" });
        }
        const { icon, source, amount, date } = req.body;
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const income = await Income_1.default.create({
            userId,
            icon,
            source,
            amount,
            date: new Date()
        });
        return res.status(201).json({ message: "Income added successfully", income });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.addIncome = addIncome;
const getAllIncome = async (req, res) => {
    res.json({ message: "Get All Income" });
};
exports.getAllIncome = getAllIncome;
const deleteIncome = async (req, res) => {
    res.json({ message: "Delete Income" });
};
exports.deleteIncome = deleteIncome;
const downloadIncomeExcel = async (req, res) => {
    res.json({ message: "Download Income Excel" });
};
exports.downloadIncomeExcel = downloadIncomeExcel;
