import { createContext, useState, useContext } from "react";
import React from "react";

type UserContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

interface UserProviderType {
  children: React.ReactNode;
}

const UserContext = createContext({
  isLoggedIn: false,
  login: function () {
    true;
  },
  logout: function () {
    false;
  },
});

export const UserProvider: React.FC<UserProviderType> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const value = { isLoggedIn, login, logout };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function User(): UserContextType {
  return useContext<UserContextType>(UserContext);
}
