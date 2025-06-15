import { createContext, useContext, useState } from "react";
import { getVehiclesRequest } from "../api/vehicles";

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

  const getVehicles = async () => {
    try {
      const res = await getVehiclesRequest();
      setVehicles(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VehicleContext.Provider value={{ vehicles, getVehicles }}>
      {children}
    </VehicleContext.Provider>
  );
};
