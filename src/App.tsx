import { useState } from "react";
import ModalInsert from "./components/modalInsert/ModalInsert";

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
      <button onClick={handleOpenModal}>Inserir Item</button>
      <ModalInsert
        isOpen={openModal}
        onClose={handleCloseModal}
        onConfirm={handleInsert} />
    </>
  );
}

export default App;
