import { AuthErrorCodes } from "firebase/auth"; // Certifique-se de que você tenha este módulo instalado

export type FirebaseAuthError = {
  code: (typeof AuthErrorCodes)[keyof typeof AuthErrorCodes];
  message: string;
  customData?: Record<string, any>;
};
