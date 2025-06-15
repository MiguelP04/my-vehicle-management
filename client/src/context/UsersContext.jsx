import { createContext, useContext, useState } from "react";
import { getUsersRequest } from "../api/users";

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useVehicles must be used within a VehiclesProvider");
  }

  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ users, getUsers }}>
      {children}
    </UserContext.Provider>
  );
};
