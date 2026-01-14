import express from "express";
import { getDashboardData } from "../controllers/dashboardController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/stats", protect, getDashboardData);

export default router;