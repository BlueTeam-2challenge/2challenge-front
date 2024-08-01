import { Route, Routes } from "react-router-dom";
import Dashboard from "@pages/dashboard/Dashboard";
import Animals from "@pages/AnimalsList/Animals";
import LoginLogic from "@pages/Login-Logic";
import ProtectedRoute from "./ProtectedRoute";


function Router() {
  return (
    <div className="aside">
      <Routes>
        <Route path="/login" element={<LoginLogic />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="animals" element={<Animals />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Router;
