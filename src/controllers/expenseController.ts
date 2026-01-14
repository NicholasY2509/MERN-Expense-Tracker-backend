import { Request, Response } from "express";
import Expense from "../models/Expense";
import ExcelJS from "exceljs";

export const getAllExpenses = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const expenses = await Expense.find({ userId });

        return res.status(200).json(expenses);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const addExpense = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { amount, category, date } = req.body;
        if (!amount || !category || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const expense = await Expense.create({
            ...req.body,
            userId,
        });

        return res.status(201).json(expense);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateExpense = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.status(200).json(expense);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteExpense = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const expense = await Expense.findByIdAndDelete(req.params.id);

        return res.status(200).json(expense);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const downloadExpenseExcel = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const expenses = await Expense.find({ userId });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Expenses");

        worksheet.columns = [
            { header: "ID", key: "_id", width: 10 },
            { header: "Description", key: "description", width: 30 },
            { header: "Amount", key: "amount", width: 10 },
            { header: "Category", key: "category", width: 20 },
            { header: "Date", key: "date", width: 20 },
        ];

        expenses.forEach((expense) => {
            worksheet.addRow({
                _id: expense._id,
                amount: expense.amount,
                category: expense.category,
                date: expense.date,
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=expenses_${Date.now()}.xlsx`
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
