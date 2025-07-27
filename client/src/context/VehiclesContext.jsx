import { createContext, useContext, useState } from "react";
import {
  getOwnerRequest,
  getVehiclesRequest,
  getVehicleHistoryRequest,
  createVehicleRequest,
  editVehicleRequest,
  deleteVehicleRequest,
} from "../api/vehicles";

const VehicleContext = createContext();

export const useVehicles = () => {
  const context = useContext(VehicleContext);

  if (!context) {
    throw new Error("useVehicles must be used within a VehiclesProvider");
  }

  return context;
};

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [owners, setOwner] = useState({});
  const [history, setHistory] = useState([]);

  const getVehicles = async () => {
    try {
      const res = await getVehiclesRequest();
      setVehicles(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getHistory = async (id) => {
    try {
      const res = await getVehicleHistoryRequest(id);
      setHistory(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  async function getOwner(id) {
    try {
      const response = await getOwnerRequest(id);
      setOwner((prev) => ({
        ...prev,
        [id]: response.data.owner,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  const createVehicle = async (formData) => {
    try {
      const res = await createVehicleRequest(formData);
      setVehicles((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const editVehicle = async (id, formData) => {
    try {
      const res = await editVehicleRequest(id, formData);
      setVehicles((prev) =>
        prev.map((veh) => (veh.id === id ? res.data : veh))
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteVehicle = async (id) => {
    try {
      await deleteVehicleRequest(id);
      setVehicles((prev) => prev.filter((veh) => veh.id !== id));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        getVehicles,
        createVehicle,
        editVehicle,
        deleteVehicle,
        owners,
        getOwner,
        history,
        getHistory,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
