import axios from "./axios";

export const getAssignmentsRequest = () => axios.get("/assignments");
