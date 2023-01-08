import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';

const UserProvider = props => {
  const [user, setUser] = useState({
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('userRole') || 'anonymous user'
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', user.isLoggedIn);
    localStorage.setItem('userRole', user.role);
  }, [user.isLoggedIn, user.role]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;