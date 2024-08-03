import { AnimalSchema } from "@app/schemas/animalFormSchema";

export interface ModalInsertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: AnimalSchema) => void;
}
