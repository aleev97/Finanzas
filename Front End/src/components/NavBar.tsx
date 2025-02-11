import { Link } from "react-router-dom";

export const NavBar = () => {
    return(
    <nav className="bg-blue-600 p-4 text-white flex justyfy-between">
      <h1 className="text-xl font-bold">Finanzas</h1>
      <div>
        <Link to="/home" className="mr-4">Dashboard</Link>
        <Link to="/login">Salir</Link>
      </div>
    </nav>
)}; 