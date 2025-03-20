import {  createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    const login = (user) => {
        if(user){
            setCurrentUser(user);
        }
    }

    const logout = ()=>{
        setCurrentUser(null)
    }
    
  

   
    return (
       < UserContext.Provider value ={{currentUser,login,logout}}>
        {children}
       </UserContext.Provider>
   
    )
}


