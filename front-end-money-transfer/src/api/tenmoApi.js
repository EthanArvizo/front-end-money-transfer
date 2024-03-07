import axiosInstance from '../services/axiosInstance';

export const login = async (username, password) => {
  try {
    console.log('Attempting login with username:', username);
    const response = await axiosInstance.post('/login', {
      username,
      password,
    });

    console.log('Login response:', response);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (username, password) => {
  try {
    console.log('Attempting user registration with username:', username);
    const response = await axiosInstance.post('/register', {
      username,
      password,
    });

    console.log('User registration response:', response);
    return response.data;
  } catch (error) {
    console.error('User registration error:', error);
    throw error;
  }
};


