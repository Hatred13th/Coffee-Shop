import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from localStorage on page load
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) return false;

    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    setCurrentUser(foundUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };
  useEffect(() => {
  // Create default users if not already stored
  const existingUsers = localStorage.getItem("users");

  if (!existingUsers) {
    const defaultUsers = [
      {
        id: 1,
        email: "admin@coffee.com",
        password: "admin123",
        role: "admin"
      },
      {
        id: 2,
        email: "user@coffee.com",
        password: "user123",
        role: "user"
      }
    ];

    localStorage.setItem("users", JSON.stringify(defaultUsers));
  }

  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) setCurrentUser(JSON.parse(savedUser));
}, []);


  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
