import { Route, Routes } from "react-router-dom";
import AnimalList from "../pages/AnimalsList/components/Table";
import Dashboard from "../pages/dashboard/Dashboard";

function Router() {
  return (
    <div className="aside">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/animals" element={<AnimalList />} />
      </Routes>
    </div>
  );
}

export default Router;
