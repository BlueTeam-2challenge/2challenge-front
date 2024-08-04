import React from "react";
import styles from "./Modal.module.css";
import { Logo } from "../Logo";
import { ModalInsertProps } from "./types";
import { X } from "lucide-react";

const Modal: React.FC<ModalInsertProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.containerOverlay}>
      <div className={styles.containerModal}>
        <div className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </div>
        <div className={styles.logo}>
          <Logo variant="default" />
        </div>
        <div className={styles.containerInput}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
