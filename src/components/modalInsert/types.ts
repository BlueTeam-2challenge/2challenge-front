export interface ModalInsertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newAnimal: {
    petName: string;
    description: string;
    address: string;
    category: string;
  }) => void;
}
