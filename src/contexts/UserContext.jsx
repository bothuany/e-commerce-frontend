import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);

  const values = { user, setUser };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
