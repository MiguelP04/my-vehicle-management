import { createContext, useContext, useState } from "react";
import {
  getUsersRequest,
  getUsersAssignmentsRequest,
  createUserRequest,
  editUserRequest,
  deleteUserRequest,
  getUserHistoryRequest,
} from "../api/users";

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
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [history, setHistory] = useState([]);

  const getUsers = async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsersAssignments = async () => {
    try {
      const res = await getUsersAssignmentsRequest();
      setAssignedUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getHistory = async (id) => {
    try {
      const res = await getUserHistoryRequest(id);
      setHistory(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async (formData) => {
    try {
      const res = await createUserRequest(formData);
      setUsers((prev) => [...prev, res.data]);
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const editUser = async (id, formData) => {
    try {
      const res = await editUserRequest(id, formData);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? res.data : user))
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteUserRequest(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
        assignedUsers,
        getUsersAssignments,
        createUser,
        editUser,
        deleteUser,
        history,
        getHistory,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
