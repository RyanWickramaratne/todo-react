import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signUp = async (email, password) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, { email, password });
    setUser({ email, token: response.data.token });
    sessionStorage.setItem('token', response.data.token);
    console.log('Token stored in sessionStorage:', response.data.token);
    return response.data.token;
  };

  const signIn = async (email, password) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, { email, password });
    setUser({ email, token: response.data.token });
    sessionStorage.setItem('token', response.data.token);
    console.log('Token stored in sessionStorage:', response.data.token);
    return response.data.token;
  };

  return (
    <UserContext.Provider value={{ user, setUser, signUp, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
