import { useEffect, useState } from "react";
import { useVehicles } from "../context/VehiclesContext";
import { useUsers } from "../context/UsersContext";
import { useAssignments } from "../context/AssignmentsContext";
import CircularProgress from "@mui/material/CircularProgress";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

function HomePage() {
  const { getVehicles, vehicles } = useVehicles();
  const { getUsers, users } = useUsers();
  const { getAssignments, assignments } = useAssignments();
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
    <section className="w-full h-screen p-12 overflow-y-scroll">
      <section className="grid grid-cols-3 grid-rows-1 gap-8 h-40">
        <div className="bg-gray-700 row-span-1 rounded-lg p-8 flex flex-col gap-8">
          <h2 className="text-xl font-bold">Total de Vehiculos</h2>
          <span className="flex justify-between text-3xl font-bold">
            {vehicles.length}{" "}
            <DirectionsCarOutlinedIcon
              sx={{ fontSize: 32, color: "#1d4ed8" }}
            />
          </span>
        </div>
        <div className="bg-gray-700 row-span-1 rounded-lg p-8 flex flex-col gap-8">
          <h2 className="text-xl font-bold">Total de Usuarios</h2>
          <span className="flex justify-between text-3xl font-bold">
            {users.length}{" "}
            <PersonOutlineOutlinedIcon
              sx={{ fontSize: 32, color: "#eab308" }}
            />
          </span>
        </div>
        <div className="bg-gray-700 row-span-1 rounded-lg p-8 flex flex-col gap-8">
          <h2 className="text-xl font-bold">Total de Asignaciones</h2>
          <span className="flex justify-between text-3xl font-bold">
            {assignments.length}{" "}
            <AssignmentOutlinedIcon sx={{ fontSize: 32, color: "#dc2626" }} />
          </span>
        </div>
      </section>

      <section className="bg-gray-700 p-6 my-8 rounded-lg ">
        {assignments.length === 0 ? (
          <h2 className="text-xl font-bold text-white">
            No hay asignaciones recientes
          </h2>
        ) : (
          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              Asignaciones Recientes
            </h2>
            <table className="w-full table- border-separate text-sm">
              <thead>
                <tr className="text-slate-300">
                  <th className="px-4 py-2">Modelo y año del vehículo</th>
                  <th className="px-4 py-2">Placa del vehículo</th>
                  <th className="px-4 py-2">Propietario del vehiculo</th>
                  <th className="px-4 py-2">Fecha de entrega</th>
                  <th className="px-4 py-2">Fecha de devolución</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => {
                  console.log(assignment);
                  const vehicle = vehicles.find(
                    (v) => v.id === assignment.vehicle_id
                  );
                  const user = users.find((u) => u.id === assignment.user_id);

                  return (
                    <tr
                      key={assignment.id}
                      className="bg-slate-100 text-black text-center  transition-colors"
                    >
                      <td className="px-2 py-2">
                        {vehicle?.model || "Desconocido"}{" "}
                        {vehicle?.year || "Desconocido"}
                      </td>
                      <td className="px-2">
                        {vehicle?.registration || "Desconocido"}
                      </td>
                      <td className="px-2">
                        {user?.name || "Desconocido"}{" "}
                        {user?.last_name || "Desconocido"}
                      </td>
                      <td className="px-2">
                        {assignment?.assignment_date
                          ? new Date(
                              assignment?.assignment_date
                            ).toLocaleDateString()
                          : "Sin asignacion"}
                      </td>
                      <td className="px-2">
                        {assignment?.delivery_date
                          ? new Date(
                              assignment.delivery_date
                            ).toLocaleDateString()
                          : "Sin fecha"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}
      </section>
    </section>
  );
}

export default HomePage;
