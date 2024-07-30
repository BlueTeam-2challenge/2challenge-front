import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/components/Dashboard";

function App() {

  {/* adicionar ao formulário a lógica - o botão no return será o botão de adicionar */ }
  const [openModal, setOpenModal] = useState(false);

  const handleInsert = () => {
    {/* lógica para o delete */ }
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
<<<<<<<<< Temporary merge branch 1
      <CardPage />
      <TextInput
        label="Nome"
        type="text"
        placeholder="Teste"
        name="username"
        onChange={() => console.log("Mudou")}
      />
      <UserProfile name="John Doe" />
=========
      <CardPage icon="src\assets\images\icone-pata.png" title="Animals" quantity={236} color="#F0F9FF" />
      <CardPage icon="src\assets\images\cat-icon.png" title="Animals Without Owners" quantity={18} color="#FEF6FB" />
>>>>>>>>> Temporary merge branch 2
    </>
  );
}

export default App;
