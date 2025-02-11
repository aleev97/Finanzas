import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // ✅ Importa BrowserRouter
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/useAuth"; // Importa el provider

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>  
      <BrowserRouter>  {/* ✅ Agregamos el Router aquí */}
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);