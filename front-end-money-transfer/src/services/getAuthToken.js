const getAuthToken = () => {
    const authToken = localStorage.getItem('authToken');
    console.log('Auth Token from localStorage:', authToken);
    return authToken;
  };
  
  export default getAuthToken;