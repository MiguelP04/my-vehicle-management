import axios from "./axios";

export const getVehiclesRequest = () => axios.get("/vehicles");
export const getVehicleHistoryRequest = (id) =>
  axios.get(`/vehicles/${id}/history`);
export const getOwnerRequest = (id) => axios.get(`/vehicles/owner/${id}`);
export const createVehicleRequest = (data) => axios.post("/vehicles", data);
export const editVehicleRequest = (id, data) =>
  axios.put(`/vehicles/${id}`, data);
export const deleteVehicleRequest = (id) => axios.delete(`/vehicles/${id}`);
