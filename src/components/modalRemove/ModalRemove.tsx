import { Logo } from "../Logo";
import { modalRemoveProps } from "./types"
import './ModalRemove.css'

const ModalRemove = ({ isOpen, onClose, onConfirm }: modalRemoveProps) => {

  if (!isOpen) return null;

  return (
    <div className="container-overlay">
      <div className="container-modal">
        <div className="text-modal">
          <Logo variant="default" />
          <p className="subtitle">Do you really want to remove this pet?</p>
        </div>
        <div className="btn-modal">
          <button onClick={onClose} id="model-btn" className="cancel">No
            <img src="src\assets\images\paw-btn.png" alt="paw-icon" />
          </button>
          <button onClick={onConfirm} id="model-btn" className="comfirm">Yes</button>
        </div>
      </div>
    </div>
  )
}

export default ModalRemove