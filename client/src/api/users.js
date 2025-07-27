import axios from "./axios";

export const getUsersRequest = () => axios.get("/users");
export const getUsersAssignmentsRequest = () => axios.get("/users/assignments");
export const getUserHistoryRequest = (id) => axios.get(`/users/${id}/history`);
export const createUserRequest = (data) => axios.post("/users", data);
export const editUserRequest = (id, data) => axios.put(`/users/${id}`, data);
export const deleteUserRequest = (id) => axios.delete(`/users/${id}`);
