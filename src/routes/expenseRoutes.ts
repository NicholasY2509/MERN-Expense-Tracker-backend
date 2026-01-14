import express from "express"
import { protect } from "../middleware/authMiddleware"
import { addExpense, deleteExpense, updateExpense, getAllExpenses, downloadExpenseExcel } from "../controllers/expenseController"

const router = express.Router()

router.get("/", protect, getAllExpenses)
router.post("/", protect, addExpense)
router.put("/:id", protect, updateExpense)
router.delete("/", protect, deleteExpense)
router.get("/download", protect, downloadExpenseExcel)

export default router
