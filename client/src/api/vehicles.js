import axios from "./axios";

export const getVehiclesRequest = () => axios.get("/vehicles");
