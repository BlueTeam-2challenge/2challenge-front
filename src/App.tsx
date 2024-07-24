import { TextInput } from "./components/TextInput";
import UserProfile from "./components/UserProfile";
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
      <UserProfile name="John Doe" />
    </>
  );
}

export default App;
