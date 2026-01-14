import express from "express";
import { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel } from "../controllers/incomeController"
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, addIncome);
router.get("/", protect, getAllIncome);
router.delete("/:id", protect, deleteIncome);
router.get("/download", protect, downloadIncomeExcel);

export default router;