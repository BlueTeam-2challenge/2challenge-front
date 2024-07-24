import { TextInput } from "./components/TextInput";
import CardPage from "./pages/dashboard/components/CardPage";

function App() {
  return (
    <>
      <CardPage />
      <TextInput
        label="Nome"
        type="text"
        placeholder="Teste"
        name="username"
        onChange={() => console.log("Mudou")}
      />
    </>
  );
}

export default App;
