import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Animals from "../pages/AnimalsList/Animals";
import ProtectedRoute from "./ProtectedRoute";

function Router() {
  return (
    <div className="aside">
      <Routes>
        <ProtectedRoute>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/animals" element={<Animals />} />
        </ProtectedRoute>
      </Routes>
    </div>
  );
}

export default Router;
