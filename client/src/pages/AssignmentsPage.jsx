import CircularProgress from "@mui/material/CircularProgress";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import SearchBar from "../components/SearchBar";
import ModalViewVehicle from "../components/ModalViewVehicle";
import ModalAssignVehicle from "../components/ModalAssignVehicle";
import ModalUnassignVehicle from "../components/ModalUnassignVehicle";
import { useEffect, useState } from "react";
import { useVehicles } from "../context/VehiclesContext";

function AssignmentsPage() {
  const { getVehicles, vehicles, owners, getOwner } = useVehicles();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(vehicles);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [openUnassignModal, setOpenUnassignModal] = useState(false);
  const [vehicleToView, setVehicleToView] = useState(null);
  const [vehicleToAssign, setVehicleToAssign] = useState(null);
  const [vehicleToUnassign, setVehicleToUnassign] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      await getVehicles();
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    const fetchOwners = async () => {
      if (vehicles.length) {
        setResult(vehicles);
        await Promise.all(vehicles.map((v) => getOwner(v.id)));
        setLoading(false);
      }
    };
    fetchOwners();
  }, [vehicles]);

  const handleChange = (e) => {
    const text = e.target.value;
    setQuery(text);

    const filtered = vehicles.filter((v) =>
      `${v.model} ${v.registration} ${v.brand}`
        .toLowerCase()
        .includes(text.toLowerCase())
    );

    setResult(filtered);
  };

  const handleViewVehicle = (vehicle) => {
    setVehicleToUnassign(owners[vehicle.id]);
    setVehicleToView(vehicle);
    setOpenViewModal(true);
  };

  const handleAssignVehicle = (vehicle) => {
    setVehicleToAssign(vehicle);
    setOpenAssignModal(true);
  };

  const handleUnassignVehicle = (owner) => {
    setVehicleToUnassign(owner);
    setOpenUnassignModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-7xl h-screen">
        <CircularProgress size={60} />
      </div>
    );
  }
  return (
    <section className="w-full px-12 pt-12 overflow-y-scroll">
      <section className="flex flex-col items-start w-full">
        <h2 className="w-48 text-xl font-bold text-center">Buscar vehículo</h2>
        <div className="flex justify-between items-center w-full">
          <SearchBar
            value={query}
            onChange={handleChange}
            placeholder={"Busca por modelo o matrícula"}
          />
        </div>
      </section>
      <section className="grid grid-cols-2 gap-8 my-4 ">
        {result.filter((vehicle) =>
          ["En uso", "Disponible"].includes(vehicle.state)
        ).length === 0 ? (
          <p className="font-semibold mt-4">No se encontraron vehículos</p>
        ) : (
          result
            .filter((vehicle) =>
              ["En uso", "Disponible"].includes(vehicle.state)
            )
            .map((vehicle) => (
              <article
                key={vehicle.id}
                className="flex flex-col h-92 bg-gray-800 rounded-lg"
              >
                <div
                  style={{
                    backgroundImage: `url(http://localhost:4000/uploads/${vehicle.image})`,
                  }}
                  className="relative h-52 w-full bg-cover bg-center rounded-t-lg"
                >
                  <span
                    className={`absolute top-2 right-4 px-4 text-sm font-bold text-white rounded-full border ${
                      vehicle.state === "En uso"
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-green-600 border-green-700"
                    }`}
                  >
                    {vehicle.state === "En uso" ? (
                      <AccessTimeIcon sx={{ fontSize: 14 }} />
                    ) : (
                      <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />
                    )}{" "}
                    {vehicle.state}
                  </span>
                  <div className="absolute bottom-2 right-4 flex justify-center">
                    <button
                      onClick={() => handleViewVehicle(vehicle)}
                      className="flex items-center gap-2 px-4 py-1 border border-blue-400 text-blue-400 cursor-pointer rounded-md hover:bg-blue-900 hover:text-white transition-colors text-sm font-medium"
                    >
                      <span>Ver detalles</span>
                    </button>
                  </div>
                </div>
                <div className="w-full h-32 px-8 pt-4">
                  <span className="font-bold text-lg">
                    {vehicle.brand} {vehicle.model}
                  </span>
                  <span className="flex gap-6 mt-1 text-zinc-400">
                    <span># {vehicle.registration}</span>

                    <span>
                      <CalendarTodayIcon sx={{ fontSize: 16 }} /> {vehicle.year}
                    </span>
                  </span>
                  <div className="flex items-center gap-2 mt-1 text-sm font-bold">
                    {owners[vehicle.id] ? (
                      <>
                        <div>
                          <Avatar
                            src={`http://localhost:4000/uploads/${
                              owners[vehicle.id]?.image
                            }`}
                            alt={`${owners[vehicle.id]?.name} ${
                              owners[vehicle.id]?.last_name
                            }`}
                            sx={{ width: 56, height: 56 }}
                          />
                        </div>
                        <span>
                          {owners[vehicle.id]?.name}{" "}
                          {owners[vehicle.id]?.last_name}
                          <p className="text-zinc-400">
                            <EmailOutlinedIcon sx={{ fontSize: 14 }} />{" "}
                            {owners[vehicle.id]?.email}
                          </p>
                        </span>
                      </>
                    ) : (
                      <div className="flex items-center gap-1 mt-4  text-red-300">
                        <PersonOffIcon
                          sx={{ fontSize: 24, textAlign: "center" }}
                        />
                        Sin propietario
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end mr-4 mb-4">
                  {vehicle.state === "En uso" ? (
                    <Button
                      onClick={() => handleUnassignVehicle(owners[vehicle.id])}
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{
                        textTransform: "none",
                        fontSize: "14px",
                      }}
                    >
                      <PersonRemoveAlt1OutlinedIcon
                        sx={{ fontSize: "20px", marginRight: "8px" }}
                      />
                      Desasignar usuario
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAssignVehicle(vehicle.id)}
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{
                        textTransform: "none",
                        fontSize: "14px",
                      }}
                    >
                      <PersonAddAltIcon
                        sx={{ fontSize: "20px", marginRight: "8px" }}
                      />
                      Asignar usuario
                    </Button>
                  )}
                </div>
              </article>
            ))
        )}
      </section>
      <ModalViewVehicle
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        vehicle={vehicleToView}
        owner={vehicleToUnassign}
      />
      <ModalAssignVehicle
        open={openAssignModal}
        onClose={() => setOpenAssignModal(false)}
        onRefresh={getVehicles}
        vehicle={vehicleToAssign}
      />
      <ModalUnassignVehicle
        open={openUnassignModal}
        onClose={() => setOpenUnassignModal(false)}
        onRefresh={getVehicles}
        owner={vehicleToUnassign}
      />
    </section>
  );
}

export default AssignmentsPage;
