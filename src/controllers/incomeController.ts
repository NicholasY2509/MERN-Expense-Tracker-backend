import { Request, Response } from "express";
import Income from "../models/Income";
import xlsx from "xlsx"

export const addIncome = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User not found" });
        }

        const { icon, source, amount, date } = req.body;
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const income = await Income.create({
            userId,
            icon,
            source,
            amount,
            date: new Date()
        });

        return res.status(201).json({ message: "Income added successfully", income });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAllIncome = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User not found" });
        }

        const income = await Income.find({ userId });
        return res.status(200).json({ message: "Income fetched successfully", income });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteIncome = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User not found" });
        }

        const income = await Income.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Income deleted successfully", income });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const downloadIncomeExcel = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User not found" });
        }

        const income = await Income.find({ userId });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, `income_${Date.now()}.xlsx`);
        res.download(`income_${Date.now()}.xlsx`);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};