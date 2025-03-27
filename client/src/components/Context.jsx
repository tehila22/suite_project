import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // פונקציה להכנסת משתמש לאחר התחברות
  const login = (user) => {
    if (user) {
      localStorage.setItem("currentUser",JSON.stringify(user))
      setCurrentUser(user);
    }
  };

  // פונקציה להתנתקות המשתמש
  const logout = () => {
    localStorage.setItem("currentUser", JSON.stringify(null));
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
