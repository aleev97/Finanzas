import { Router } from "express";
import { authMiddleware } from "../Middleware/authMiddleware";
import { addTransaction, getTransactionsByUser, deleteTransaction } from "../controllers/transactionController";

const router = Router();

// 📌 Proteger solo las rutas necesarias con authMiddleware
router.post("/", authMiddleware, addTransaction);
router.get("/", authMiddleware, getTransactionsByUser);
router.delete("/:id", authMiddleware, deleteTransaction);

export default router;