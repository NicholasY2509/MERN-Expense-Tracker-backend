import { Request, Response } from "express";
import Expense from "../models/Expense";
import Income from "../models/Income";
import { Types } from "mongoose";

export const getDashboardData = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            {
                $match: { userId: userObjectId },
            },
            {
                $group: {
                    _id: null,
                    totalIncome: { $sum: "$amount" },
                },
            },
        ]);

        const totalExpense = await Expense.aggregate([
            {
                $match: { userId: userObjectId },
            },
            {
                $group: {
                    _id: null,
                    totalExpenses: { $sum: "$amount" },
                },
            },
        ]);

        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: {
                $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            },
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        )

        const last30aysExpenseTransactions = await Expense.find({
            userId,
            date: {
                $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
        }).sort({ date: -1 });

        const expenseLast30Days = last30aysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        )

        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            ),
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        const totalBalance = totalIncome[0]?.totalIncome - totalExpense[0]?.totalExpenses;

        return res.status(200).json({
            totalIncome: totalIncome[0]?.totalIncome,
            totalExpenses: totalExpense[0]?.totalExpenses,
            totalBalance,
            lastTransactions,
            incomeLast60Days,
            expenseLast30Days,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}