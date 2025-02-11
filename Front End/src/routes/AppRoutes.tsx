import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { useAuth } from "../context/useAuth";

export default function AppRoutes() {
  const { user } = useAuth(); // Ahora TypeScript reconocerá `user`

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {user && <Route path="/transactions" element={<h1>Transactions Page</h1>} />}
    </Routes>
  );
}