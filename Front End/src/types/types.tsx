export interface Transaction {
    id?: number;
    type: "ingreso" | "gasto";
    category: string;
    amount: number;
    date: string;
    note?: string;
}

export interface TransactionStore {
    transactions: Transaction[];
    addTransaction: (transaction: Transaction) => void;
    removeTransaction: (id: number) => void;
} 