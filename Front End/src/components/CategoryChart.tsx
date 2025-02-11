import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryChartProps {
  categorias: string[];
  valores: number[];
}

export const CategoryChart = ({ categorias, valores }: CategoryChartProps) => {
  const data = {
    labels: categorias,
    datasets: [
      {
        data: valores,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-2">Distribución de Gastos</h3>
      <Pie data={data} />
    </div>
  );
};