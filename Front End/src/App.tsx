import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/useAuth";
import AppRoutes from "./routes/AppRoutes";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow p-4">
            <AppRoutes />
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;