import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

// This reducer is responsible for handling authentication-related actions
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload.user, token: action.payload.token };
    case 'LOGOUT':
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, token: null });

  const login = (user, token) => {
    localStorage.setItem('authToken', token);
    console.log('Token stored in localStorage:', localStorage.getItem('authToken'));
    dispatch({ type: 'LOGIN', payload: { user, token } });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const setAuthData = (data) => {
    dispatch({ type: 'LOGIN', payload: data });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, token: state.token, login, logout, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };