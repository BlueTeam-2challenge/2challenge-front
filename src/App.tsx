import SignIn from "./components/SignIn/SignIn";
import { TextInput } from "./components/TextInput";
import UserProfile from "./components/UserProfile";
import Form from "./pages/AnimalsList/components/Form";
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
      <SignIn label="Sign In" isActive={true} />
    </>
  );
}

export default App;
