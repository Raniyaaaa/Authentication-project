import React, { createContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const storedExpirationTime = localStorage.getItem('expirationTime');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;


  const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    return adjExpirationTime - currentTime;
  };


  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
  }, []);


  const loginHandler = (token) => {
    setToken(token);
    const expirationTime = new Date(new Date().getTime() + 300000);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime.toISOString());
  };


  useEffect(() => {
    if (initialToken && storedExpirationTime) {
      const remainingTime = calculateRemainingTime(storedExpirationTime);

      if (remainingTime <= 0) {
        logoutHandler();
      }
    }
  }, [initialToken, storedExpirationTime, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
