import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import EmojiTransportationOutlinedIcon from "@mui/icons-material/EmojiTransportationOutlined";
import NoCrashOutlinedIcon from "@mui/icons-material/NoCrashOutlined";
import CarCrashOutlinedIcon from "@mui/icons-material/CarCrashOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import SearchBar from "../components/SearchBar";
import VehicleStatusTabs from "../components/VehicleStatusTabs";
import ModalCreateVehicle from "../components/ModalCreateVehicle";
import ModalEditVehicle from "../components/ModalEditVehicle";
import ModalDeleteVehicle from "../components/ModalDeleteVehicle";
import ModalViewVehicle from "../components/ModalViewVehicle";
import ModalUnassignVehicle from "../components/ModalUnassignVehicle";
import { useEffect, useState } from "react";
import { useVehicles } from "../context/VehiclesContext";

export default function VehiclesPage() {
  const { getVehicles, vehicles, owners, getOwner } = useVehicles();
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(vehicles);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState(null);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [vehicleToView, setVehicleToView] = useState(null);
  const [openUnassignModal, setOpenUnassignModal] = useState(false);
  const [vehicleToUnassign, setVehicleToUnassign] = useState(null);

  const vehiclesInUse = vehicles.filter(
    (vehicle) => vehicle.state === "En uso"
  );

  const vehiclesInMaintenance = vehicles.filter(
    (vehicle) => vehicle.state === "En mantenimiento"
  );

  const vehiclesAvailable = vehicles.filter(
    (vehicle) => vehicle.state === "Disponible"
  );

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

  const applyFilters = (text, state) => {
    const filtered = vehicles.filter((v) => {
      const matchesText = `${v.model} ${v.registration} ${v.brand}`
        .toLowerCase()
        .includes(text.toLowerCase());

      const matchesStatus = state === "all" || v.state === state;

      return matchesText && matchesStatus;
    });

    setResult(filtered);
  };

  const handleChange = (e) => {
    const text = e.target.value;
    setQuery(text);
    applyFilters(text, statusFilter);
  };

  const handleStatusChange = (state) => {
    setStatusFilter(state);
    applyFilters(query, state);
  };

  const handleCreateVehicle = () => {
    setOpenCreateModal(true);
  };

  const handleEditVehicle = (vehicle) => {
    setVehicleToEdit(vehicle);
    setOpenEditModal(true);
  };

  const handleDeleteVehicle = (vehicle) => {
    setVehicleToDelete(vehicle);
    setOpenDeleteModal(true);
  };

  const handleViewVehicle = (vehicle) => {
    setVehicleToUnassign(owners[vehicle.id]);
    setVehicleToView(vehicle);
    setOpenViewModal(true);
  };

  const handleUnassignVehicle = (owner) => {
    setVehicleToUnassign(owner);
    setOpenUnassignModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-7xl h-screen">
        <CircularProgress size={60} />

        <p className="mt-4 text-lg font-semibold text-gray-300">
          Cargando vehículos...
        </p>
      </div>
    );
  }

  return (
    <section className="w-full px-12 pt-12 overflow-y-scroll">
      <section className="grid grid-cols-4 grid-rows-2 gap-8 max-h-40">
        <div className="flex flex-col gap-2 col-span-2 row-span-1 w-full bg-gray-700 rounded-lg">
          <div className="flex w-full p-4 text-xl font-bold">
            <div className="flex w-full justify-between mt-1">
              <h2>Total de Vehiculos</h2>
              <span className="text-2xl mr-4">{vehicles.length}</span>
            </div>

            <div className="py-1 px-2 rounded-lg">
              <DirectionsCarOutlinedIcon
                sx={{ fontSize: 24, color: "#1d4ed8" }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end items-center col-span-2 row-span-1 w-full  bg-gray-700 rounded-lg">
          <div className="flex w-full p-4 text-xl font-bold">
            <div className="flex w-full justify-between mt-1">
              <h2>En uso</h2>
              <span className="text-2xl mr-4">{vehiclesInUse.length}</span>
            </div>

            <div className="py-1 px-2 rounded-lg">
              <EmojiTransportationOutlinedIcon
                sx={{ fontSize: 24, color: "#eab308" }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end items-center gap-2 col-span-2 row-span-1 w-full  bg-gray-700 rounded-lg">
          <div className="flex w-full p-4 text-xl font-bold">
            <div className="flex w-full justify-between mt-1">
              <h2>Disponibles</h2>
              <span className="text-2xl mr-4">{vehiclesAvailable.length}</span>
            </div>

            <div className="py-1 px-2 rounded-lg">
              <NoCrashOutlinedIcon sx={{ fontSize: 24, color: "#16a34a" }} />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 col-span-2 row-span-1 w-full bg-gray-700 rounded-lg">
          <div className="flex w-full p-4 text-xl font-bold">
            <div className="flex w-full justify-between mt-1">
              <h2>En mantenimiento</h2>
              <span className="text-2xl mr-4">
                {vehiclesInMaintenance.length}
              </span>
            </div>

            <div className="py-1 px-2 rounded-lg">
              <CarCrashOutlinedIcon sx={{ fontSize: 24, color: "#dc2626" }} />
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-start w-full mt-6">
        <h2 className="w-48 text-xl font-bold text-center">Buscar vehículo</h2>
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center gap-2">
            <SearchBar
              value={query}
              onChange={handleChange}
              placeholder={"Busca por modelo o matrícula"}
            />
            <VehicleStatusTabs onChange={handleStatusChange} />
          </div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateVehicle}
            sx={{
              textTransform: "none",
              fontSize: "16px",
            }}
          >
            Crear vehículo
          </Button>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-8 my-4 ">
        {result.length === 0 ? (
          <p className="font-semibold mt-4">No se encontraron vehículos</p>
        ) : (
          result.map((vehicle) => (
            <article
              key={vehicle.id}
              className="flex flex-col h-92 bg-gray-800 rounded-lg"
            >
              <div
                style={{
                  backgroundImage: `url(https://my-vehicle-management.onrender.com/uploads/${vehicle.image})`,
                }}
                className="relative h-52 w-full bg-cover bg-center rounded-t-lg"
              >
                <span
                  className={`absolute top-2 right-4 px-4 text-sm font-bold text-white rounded-full border ${
                    vehicle.state === "En uso"
                      ? "bg-yellow-400 border-yellow-500"
                      : vehicle.state === "Disponible"
                      ? "bg-green-600 border-green-700"
                      : "bg-red-500 border-red-600"
                  }`}
                >
                  {vehicle.state == "En uso" ? (
                    <AccessTimeIcon sx={{ fontSize: 14 }} />
                  ) : vehicle.state === "Disponible" ? (
                    <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />
                  ) : (
                    <SettingsOutlinedIcon sx={{ fontSize: 16 }} />
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

              {vehicle.state === "En uso" ? (
                <div className="flex justify-end mr-4 mb-4">
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
                </div>
              ) : (
                <div className="flex mt-2 w-full border-t border-zinc-700">
                  <button
                    onClick={() => handleEditVehicle(vehicle)}
                    className="flex items-center justify-center gap-2 w-1/2 py-2 text-sm font-semibold text-blue-400 cursor-pointer rounded-bl-lg  hover:bg-blue-900 hover:rounded-bl-lg transition-colors"
                  >
                    <EditIcon sx={{ fontSize: 18 }} />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="flex items-center justify-center gap-2 w-1/2 py-2 text-sm font-semibold text-red-400 cursor-pointer rounded-br-lg  hover:bg-red-900 hover:rounded-br-lg transition-colors"
                  >
                    <DeleteIcon sx={{ fontSize: 18 }} />
                    Eliminar
                  </button>{" "}
                </div>
              )}
            </article>
          ))
        )}
      </section>
      <ModalCreateVehicle
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onRefresh={getVehicles}
      />
      <ModalEditVehicle
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onRefresh={getVehicles}
        vehicle={vehicleToEdit}
      />
      <ModalDeleteVehicle
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onRefresh={getVehicles}
        vehicle={vehicleToDelete}
      />
      <ModalViewVehicle
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        vehicle={vehicleToView}
        owner={vehicleToUnassign}
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
