import "./ModalInsert.css";
import { modalRemoveProps } from "../modalRemove/types";
import { Logo } from "../Logo";
import { TextInput } from "../TextInput";

const ModalInsert = ({ isOpen, onClose, onConfirm }: modalRemoveProps) => {
  if (!isOpen) return null;

  return (
    <div className="container-overlay">
      <div className="container-modal">
        <div className="logo">
          <Logo variant="default" />
        </div>
        <div className="container-input">
          <TextInput
            label="PetName"
            type="text"
            placeholder="Enter a petname"
            name="PetName"
            onChange={() => console.log("Mudou")}
          />
          <TextInput
            label="Species"
            type="text"
            placeholder="enter a species"
            name="Species"
            onChange={() => console.log("Mudou")}
          />
          <TextInput
            label="Age"
            type="text"
            placeholder="enter age of the pet"
            name="Age"
            onChange={() => console.log("Mudou")}
          />
          <TextInput
            label="Color"
            type="text"
            placeholder="enter a pet color"
            name="Color"
            onChange={() => console.log("Mudou")}
          />
        </div>
        <div className="btn-modal">
          <button onClick={onClose} id="model-btn" className="reset">
            RESET
          </button>
          <button onClick={onConfirm} id="model-btn" className="add">
            ADD NEW ANIMAL
            <img src="src\assets\images\paw-btn.png" alt="paw-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInsert;
