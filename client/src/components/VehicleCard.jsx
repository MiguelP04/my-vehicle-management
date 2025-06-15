import { useVehicles } from "../context/VehiclesContext";

function VehicleCard({ vehicle }) {
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <p>{vehicle.brand}</p>
      <p>{vehicle.model}</p>
      <p>{vehicle.year}</p>
      <p>{vehicle.registration}</p>
    </div>
  );
}

export default VehicleCard;
