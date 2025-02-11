import { useState } from "react";
import { useTransactionStore } from "../context/useTransactionStore";
import { api } from "../api/axiosClient"

export const TransactionForm = () => {
    const [type, setType] = useState("ingreso");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    const addTransaction = useTransactionStore((state) => state.addTransaction);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const transaction = { type, category, amount: parseFloat(amount), date };
        const { data } = await api.post("/transactions", transaction);
        addTransaction(data);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="ingreso">Ingreso</option>
                <option value="gasto">Gasto</option>
            </select>
            <input type="text" placeholder="Categoría" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input type="number" placeholder="Monto" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <button type="submit">Agregar</button>
        </form>
    );
};