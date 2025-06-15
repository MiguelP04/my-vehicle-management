import { useEffect, useState } from "react";
import { useVehicles } from "../context/VehiclesContext";
import { useUsers } from "../context/UsersContext";
import { useAssingments } from "../context/AssignmentsContext";
import CircularProgress from "@mui/material/CircularProgress";

function HomePage() {
  const { getVehicles, vehicles } = useVehicles();
  const { getUsers, users } = useUsers();
  const { getAssignments, assignments } = useAssingments();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getVehicles(), getUsers(), getAssignments()]).then(() =>
      setLoading(false)
    );
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-7xl h-screen">
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <section className="grid grid-rows-3 gap-6 p-8 w-7xl h-screen">
      <section className="grid grid-cols-3 grid-rows-1 gap-8">
        <div className="bg-gray-700 row-span-1 rounded-lg px-8 py-12 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Total de Vehiculos</h2>
          <span className="text-3xl font-bold">{vehicles.length}</span>
        </div>
        <div className="bg-gray-700 row-span-1 rounded-lg px-8 py-12 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Total de Usuarios</h2>
          <span className="text-3xl font-bold">{users.length} </span>
        </div>
        <div className="bg-gray-700 row-span-1 rounded-lg px-8 py-12 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Total de Asignaciones</h2>
          <span className="text-3xl font-bold">{assignments.length}</span>
        </div>
      </section>
      <section className="bg-gray-700 row-start-2 row-end-5 rounded-lg p-8">
        <div className="">
          <h1 className="text-2xl font-bold">Asignaciones Recientes</h1>
        </div>
      </section>
    </section>
  );
}

export default HomePage;
