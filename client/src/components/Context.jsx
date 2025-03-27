import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // פונקציה להכנסת משתמש לאחר התחברות
  const login = (user) => {
    if (user) {
      setCurrentUser(user);
    }
  };

  // פונקציה להתנתקות המשתמש
  const logout = () => {
    setCurrentUser(null);
  };

  // פונקציה לעדכון פרטי המשתמש
  const updateUser = (updatedUserData) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      ...updatedUserData, // עדכון שדות המשתמש עם הנתונים החדשים
    }));
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
