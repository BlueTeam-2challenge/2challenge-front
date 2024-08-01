import Routes from "@routes/index";
import { AuthProvider } from "@contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes />;
    </AuthProvider>
  );
}

export default App;
