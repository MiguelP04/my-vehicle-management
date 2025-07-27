import axios from "./axios";

export const getAssignmentsRequest = () => axios.get("/assignments");
export const createAssignmentRequest = (data) =>
  axios.post("/assignments", data);
export const updateAssignmentRequest = (id) => axios.put(`/assignments/${id}`);
