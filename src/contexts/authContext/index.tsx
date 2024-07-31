import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { User } from "../../@types/User";
import { AuthContextProviderProps, AuthContextType } from "../../@types/Auth";

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      initializeUser(user);
    });
    return unsubscribe;
  }, []);

  async function initializeUser(user: User) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
    const value: AuthContextType = {
      currentUser,
      userLoggedIn,
      loading,
    };
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
}
