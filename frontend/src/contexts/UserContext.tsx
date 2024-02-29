import { createContext, useState, useContext } from "react";

type UserContextType = { 
    isLoggedIn: boolean,
    login: () => void,
    logout: () => void
 };


const UserContext = createContext({
    isLoggedIn: false,
    login: function () {true},
    logout: function () {false}
});

export const UserProvider = ({children}: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const login = () => {
        setIsLoggedIn(true)
    }

    const logout = () => {
        setIsLoggedIn(false)
    }

    const value = {isLoggedIn, login, logout}
    
    return (
    <UserContext.Provider value={value}>
    {children}
    </UserContext.Provider>
)}

export function User(): UserContextType {
    return useContext<UserContextType>(UserContext)
}
