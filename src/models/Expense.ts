import mongoose, { Document } from "mongoose";

export interface IExpense extends Document {
    userId: mongoose.Types.ObjectId;
    icon?: string;
    category: string;
    amount: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

const ExpenseSchema = new mongoose.Schema<IExpense>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    icon: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Expense", ExpenseSchema);
