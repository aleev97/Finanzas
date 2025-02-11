import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface BalanceChartProps {
  labels: string[];
  ingresos: number[];
  gastos: number[];
}

export const BalanceChart = ({ labels, ingresos, gastos }: BalanceChartProps) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Ingresos",
        data: ingresos,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.3)",
      },
      {
        label: "Gastos",
        data: gastos,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.3)",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-2">Balance Mensual</h3>
      <Line data={data} />
    </div>
  );
};