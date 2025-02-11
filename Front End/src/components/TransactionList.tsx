import { useTransactions } from "../hooks/useTransactions";

export const TransactionList = () => {
  const { data: transactions, isLoading } = useTransactions();

  if (isLoading) return <p>Cargando...</p>;

  return (
    <ul>
      {transactions.map((t: { id: string; type: string; category: string; amount: number }) => (
        <li key={t.id}>
          {t.type} - {t.category} - ${t.amount}
        </li>
      ))}
    </ul>
  );
}; 