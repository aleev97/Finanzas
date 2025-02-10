"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.getTransactionsByUser = exports.addTransaction = void 0;
const db_1 = __importDefault(require("../config/db"));
const addTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { type, category, amount, date, note } = req.body;
        // Verificamos que el usuario esté autenticado
        if (!req.user) {
            res.status(401).json({ message: "No autorizado" });
            return;
        }
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // ✅ Ahora sí accede correctamente
        yield db_1.default.query("INSERT INTO transactions (user_id, type, category, amount, date, note) VALUES ($1, $2, $3, $4, $5, $6)", [user_id, type, category, amount, date, note]);
        res.status(201).json({ message: "Transacción agregada con éxito" });
    }
    catch (error) {
        console.error(error);
        next(error); // Pasamos el error al middleware de manejo de errores
    }
});
exports.addTransaction = addTransaction;
const getTransactionsByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const transactions = yield db_1.default.query("SELECT * FROM transactions WHERE user_id = $1", [userId]);
        res.json(transactions.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getTransactionsByUser = getTransactionsByUser;
const deleteTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            console.log("⚠️ Usuario no autenticado");
            res.status(401).json({ message: "Usuario no autorizado" });
            return;
        }
        // 🔍 Verifica si la transacción existe y pertenece al usuario
        const transaction = yield db_1.default.query("SELECT * FROM transactions WHERE id = $1 AND user_id = $2", [id, userId]);
        console.log("🔍 Transacción encontrada:", transaction.rows); // 👈 Verifica qué devuelve
        if (transaction.rowCount === 0) {
            res.status(404).json({ message: "Transacción no encontrada o no autorizada" });
            return;
        }
        // 🗑️ Eliminar la transacción
        yield db_1.default.query("DELETE FROM transactions WHERE id = $1", [id]);
        console.log("✅ Transacción eliminada correctamente");
        res.status(200).json({ message: "Transacción eliminada correctamente" });
    }
    catch (error) {
        console.error("❌ Error al eliminar transacción:", error);
        next(error);
    }
});
exports.deleteTransaction = deleteTransaction;
