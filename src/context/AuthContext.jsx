import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    setIsLoggedIn(!!loggedIn);

    const photo = localStorage.getItem('profilePhoto');
    setProfilePhoto(photo || '');

    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId || null);

    const storedEmail = localStorage.getItem('email');
    setEmail(storedEmail || '');

    const storedFirstName = localStorage.getItem('firstName');
    setFirstName(storedFirstName || '');

    const storedLastName = localStorage.getItem('lastName');
    setLastName(storedLastName || '');
  }, []);

  const login = (photo, userEmail, userId, token, userFirstName, userLastName) => {
    localStorage.setItem('isLoggedIn', true);
    if (photo) {
      const formattedPhoto = photo.replace(/\\/g, '/');
      localStorage.setItem('profilePhoto', formattedPhoto);
      setProfilePhoto(formattedPhoto);
    }
    localStorage.setItem('email', userEmail);
    setEmail(userEmail);
    localStorage.setItem('userId', userId);
    setUserId(userId);
    localStorage.setItem('firstName', userFirstName);
    setFirstName(userFirstName);
    localStorage.setItem('lastName', userLastName);
    setLastName(userLastName);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('profilePhoto');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    setIsLoggedIn(false);
    setProfilePhoto('');
    setUserId(null);
    setEmail('');
    setFirstName('');
    setLastName('');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        profilePhoto,
        userId,
        email,
        firstName,
        lastName,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
