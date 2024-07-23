import { TextInput } from "./components/TextInput";

function App() {
  return (
    <>
      <TextInput
        label="Nome"
        placeholder="Teste"
        name="username"
        onChange={() => console.log("Mudou")}
      />
    </>
  );
}

export default App;
