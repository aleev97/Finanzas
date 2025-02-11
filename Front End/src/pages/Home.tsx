import { useState, useEffect } from "react";
import { api } from "../api/axiosClient";
import { BalanceChart } from "../components/BalanceChart";
import { CategoryChart } from "../components/CategoryChart";

export const Home = () => {
  const [transacciones, setTransacciones] = useState<{ monto: number; categoria: string; fecha: string }[]>([]);
  const [ingresos, setIngresos] = useState<number[]>([]);
  const [gastos, setGastos] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [valores, setValores] = useState<number[]>([]);

  useEffect(() => {
    const fetchTransacciones = async () => {
      const { data } = await api.get<{ monto: number; categoria: string; fecha: string }[]>("/transacciones");
      setTransacciones(data);

      // Procesar datos para gráficos
      const fechas: string[] = [...new Set(data.map((t: { monto: number; categoria: string; fecha: string }) => t.fecha.substring(0, 10)))]; // Fechas únicas
      setLabels(fechas);

      const ingresosData = fechas.map((fecha) =>
        data.filter((t: { monto: number; categoria: string; fecha: string }) => t.fecha.startsWith(fecha) && t.monto > 0).reduce((sum: number, t: { monto: number; categoria: string; fecha: string }) => sum + t.monto, 0)
      );

      const gastosData = fechas.map((fecha) =>
        data.filter((t: { monto: number; categoria: string; fecha: string }) => t.fecha.startsWith(fecha) && t.monto < 0).reduce((sum: number, t: { monto: number; categoria: string; fecha: string }) => sum + Math.abs(t.monto), 0)
      );

      setIngresos(ingresosData);
      setGastos(gastosData);

      // Datos de categorías
      const categoriasUnicas = [...new Set(data.map((t: { monto: number; categoria: string; fecha: string }) => t.categoria))];
      setCategorias(categoriasUnicas);

      const valoresCategorias = categoriasUnicas.map((cat) =>
        data.filter((t: { monto: number; categoria: string; fecha: string }) => t.categoria === cat).reduce((sum: number, t: { monto: number; categoria: string; fecha: string }) => sum + Math.abs(t.monto), 0)
      );

      setValores(valoresCategorias);
    };

    fetchTransacciones();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Finanzas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BalanceChart labels={labels} ingresos={ingresos} gastos={gastos} />
        <CategoryChart categorias={categorias} valores={valores} />
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Últimas Transacciones</h2>
      <ul className="bg-white p-4 rounded-lg shadow">
        {transacciones.slice(0, 5).map((t, i) => (
          <li key={i} className="border-b p-2 flex justify-between">
            <span>{t.fecha} - {t.categoria}</span>
            <span className={t.monto > 0 ? "text-green-500" : "text-red-500"}>
              {t.monto > 0 ? `+${t.monto}` : `-${Math.abs(t.monto)}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};