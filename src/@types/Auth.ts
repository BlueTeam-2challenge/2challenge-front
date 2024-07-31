import { ReactNode } from "react";
import { UserProps } from "./User";

export type AuthContextProviderProps = {
  children?: ReactNode | undefined;
};

export type AuthContextType = {
  currentUser: UserProps | undefined;
  userLoggedIn: () => void;
  loading: () => void;
};
