import { createContext, useState, useEffect, ReactNode } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserProps } from "../@types/User";
import { AuthContextType } from "../@types/Auth";

export const AuthContext = createContext<AuthContextType>();

export function AuthContext({ children }: { children: ReactNode }) {
  const auth = getAuth();
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  return <AuthContext.Provider value={}>{children}</AuthContext.Provider>;
}
