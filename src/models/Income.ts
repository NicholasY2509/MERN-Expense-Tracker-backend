import mongoose, { Document } from "mongoose";

export interface IIncome extends Document {
    userId: mongoose.Types.ObjectId;
    icon?: string;
    source: string;
    amount: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

const IncomeSchema = new mongoose.Schema<IIncome>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    icon: {
        type: String,
    },
    source: {
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

export default mongoose.model("Income", IncomeSchema);