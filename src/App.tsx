import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path='/Home' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
