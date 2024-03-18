const getAuthToken = () => {
  const authToken = localStorage.getItem("authToken");
  return authToken;
};

export default getAuthToken;
