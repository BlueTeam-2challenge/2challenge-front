import { ReactNode } from "react";
import { User } from "./User";

export type AuthContextProviderProps = {
  children?: ReactNode | undefined;
};

export type AuthContextType = {
  currentUser: User | undefined;
  userLoggedIn: () => void;
  loading: () => void;
};
