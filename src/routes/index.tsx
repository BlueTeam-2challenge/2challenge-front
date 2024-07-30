import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Animals from "../pages/AnimalsList/Animals";

function Router() {
  return (
    <div className="aside">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/animals" element={<Animals />} />
      </Routes>
    </div>
  );
}

export default Router;
