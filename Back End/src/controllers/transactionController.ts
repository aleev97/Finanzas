import { Request, Response, NextFunction } from "express";
import pool from "../config/db";
import { CustomRequest } from "../Middleware/authMiddleware";

// Definir el tipo correcto para req.user
interface LocalCustomRequest extends Request {
  user?: {
      [x: string]: any; id: number 
};
}

export const addTransaction = async (
  req: LocalCustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { type, category, amount, date, note } = req.body;

    // Verificamos que el usuario esté autenticado
    if (!req.user) {
      res.status(401).json({ message: "No autorizado" });
      return;
    }

    const user_id = req.user?.userId; // ✅ Ahora sí accede correctamente


    await pool.query(
      "INSERT INTO transactions (user_id, type, category, amount, date, note) VALUES ($1, $2, $3, $4, $5, $6)",
      [user_id, type, category, amount, date, note]
    );

    res.status(201).json({ message: "Transacción agregada con éxito" });
  } catch (error) {
    console.error(error);
    next(error); // Pasamos el error al middleware de manejo de errores
  }
};


export const getTransactionsByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = req.params;

        const transactions = await pool.query("SELECT * FROM transactions WHERE user_id = $1", [userId]);

        res.json(transactions.rows);
    } catch (error) {
        next(error);
    }
};

export const deleteTransaction = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = req.user?.userId;

        if (!userId) {
            console.log("⚠️ Usuario no autenticado");
            res.status(401).json({ message: "Usuario no autorizado" });
            return;
        }

        // 🔍 Verifica si la transacción existe y pertenece al usuario
        const transaction = await pool.query(
            "SELECT * FROM transactions WHERE id = $1 AND user_id = $2",
            [id, userId]
        );

        console.log("🔍 Transacción encontrada:", transaction.rows); // 👈 Verifica qué devuelve

        if (transaction.rowCount === 0) {
            res.status(404).json({ message: "Transacción no encontrada o no autorizada" });
            return;
        }

        // 🗑️ Eliminar la transacción
        await pool.query("DELETE FROM transactions WHERE id = $1", [id]);

        console.log("✅ Transacción eliminada correctamente");

        res.status(200).json({ message: "Transacción eliminada correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar transacción:", error);
        next(error);
    }
};
