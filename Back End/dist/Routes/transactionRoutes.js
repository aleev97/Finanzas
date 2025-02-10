"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const transactionController_1 = require("../controllers/transactionController");
const router = (0, express_1.Router)();
// 📌 Proteger solo las rutas necesarias con authMiddleware
router.post("/", authMiddleware_1.authMiddleware, transactionController_1.addTransaction);
router.get("/", authMiddleware_1.authMiddleware, transactionController_1.getTransactionsByUser);
router.delete("/:id", authMiddleware_1.authMiddleware, transactionController_1.deleteTransaction);
exports.default = router;
