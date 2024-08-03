import { Route, Routes } from "react-router-dom";
import Dashboard from "@pages/dashboard/Dashboard";
import Animals from "@pages/AnimalsList/Animals";
import Login from "@pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import SignupPage from "@app/pages/Signup/Signup";
import Map from "@components/Map/MapComponent";

function Router() {
  return (
    <div className="aside">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="animals" element={<Animals />} />
          <Route
            path="/locations"
            element={<Map address="Rua Leoncio de Castro,621,Centro,Cambará" />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default Router;
