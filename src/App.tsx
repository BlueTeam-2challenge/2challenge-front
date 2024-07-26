import { useState } from "react";
import ModalRemove from "./components/modalRemove/ModalRemove";

function App() {

  {/* adicionar ao formulário a lógica - o botão no return será o botão de remover */ }
  {/* lógica pode ser reutilizada para o modal de inserção */ }
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = () => {
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
      <button onClick={handleOpenModal}>Excluir Item</button>
      <ModalRemove
        isOpen={openModal}
        onClose={handleCloseModal}
        onConfirm={handleDelete} />
    </>
  );
}

export default App;
