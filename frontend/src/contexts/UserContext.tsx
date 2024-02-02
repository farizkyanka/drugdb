import { createContext, useState, useContext } from "react";
import { Outlet } from "react-router-dom";

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

export const UserProvider = () => {
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
    <Outlet/>
    </UserContext.Provider>
)}

export function User(): UserContextType {
    return useContext<UserContextType>(UserContext)
}
