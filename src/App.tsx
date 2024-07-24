import { TextInput } from "./components/TextInput";

function App() {
  return (
    <>
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
