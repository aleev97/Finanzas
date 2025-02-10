import express from "express";
import cors from "cors";
import authRoutes from "./Routes/authRoutes";
import transactionRoutes from "./Routes/transactionRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes); // 📌 Agregamos las rutas de transacciones

app.listen(process.env.PORT, () => console.log(`Servidor corriendo en puerto ${process.env.PORT}`));
