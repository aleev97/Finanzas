import { create } from "zustand";
import { TransactionStore } from "../types/types";

export const useTransactionStore = create<TransactionStore>((set) => ({
   transactions:[],
   addTransaction: (transaction) => set ((state) =>({ transactions: [...state.transactions, transaction] })),
   removeTransaction: (id) => set((state) => ({transactions: state.transactions.filter((t)=> t.id !== id) })),
})); 