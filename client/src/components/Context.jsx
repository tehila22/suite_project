// import { createContext, useEffect, useState } from "react";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   // 🔄 טעינת משתמש מ-localStorage כשנטענת האפליקציה
//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem("currentUser");
//       if (storedUser) {
//         const parsedUser = JSON.parse(storedUser);
//         if (parsedUser) {
//           setCurrentUser(parsedUser);
//         }
//       }
//     } catch (error) {
//       console.error("שגיאה בטעינת המשתמש מה-localStorage:", error);
//     }
//   }, []);

//   // התחברות - שומר ב-context וגם ב-localStorage
//   const login = (user) => {
//     if (user) {
//       localStorage.setItem("currentUser", JSON.stringify(user));
//       setCurrentUser(user);
//     }
//   };

//   // התנתקות - מוחק גם מ-context וגם מ-localStorage
//   const logout = () => {
//     localStorage.removeItem("currentUser");
//     setCurrentUser(null);
//   };

//   // עדכון פרטי משתמש
//   const updateUser = (updatedUserData) => {
//     const updated = {
//       ...currentUser,
//       ...updatedUserData,
//     };
//     localStorage.setItem("currentUser", JSON.stringify(updated));
//     setCurrentUser(updated);
//   };

//   return (
//     <UserContext.Provider value={{ currentUser, login, logout, updateUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // 🔄 טעינת משתמש מ-localStorage כשנטענת האפליקציה
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          setCurrentUser(parsedUser);
        }
      }
    } catch (error) {
      console.error("שגיאה בטעינת המשתמש מה-localStorage:", error);
    }
  }, []);

  // פונקציה להכנסת משתמש לאחר התחברות
  const login = (user) => {
    if (user) {
      localStorage.setItem("currentUser",JSON.stringify(user))
      setCurrentUser(user);
    }
  };

  // פונקציה להתנתקות המשתמש
  const logout = () => {
    localStorage.removeItem("currentUser");
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
