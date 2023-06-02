import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LogIn } from "../../apis/login";

export default function AuthProvider({ children }) {
  const initialUser = useLoaderData();

  const [user, setUser] = useState(initialUser);
  async function signin(credentials) {
    const newUser = await LogIn(credentials);
    setUser(newUser);
  }

  async function signout() {
    // await logout();
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
