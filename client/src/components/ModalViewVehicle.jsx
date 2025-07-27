import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ModalHistoryVehicle from "./ModalHistoryVehicle";
import { useState } from "react";

function ModalViewVehicle({ open, onClose, vehicle, owner }) {
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [selectedVehicleId, setselectedVehicleId] = useState(null);

  const handleVehicleHistory = (vehicleId) => {
    setselectedVehicleId(vehicleId);
    setOpenHistoryModal(true);
  };
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ backgroundColor: "#374151", color: "#fff" }}>
          <div>
            <h2 className="text-lg font-semibold">
              <InfoIcon sx={{ fontSize: 24 }} /> Detalles del vehículo
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              Ver detalles específicos del vehículo seleccionado
            </p>
          </div>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#374151",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <div className="flex flex-col gap-2 py-4 px-6 border border-white rounded-md">
            <h2 className="flex gap-1 text-lg text-white font-bold mb-2">
              <CameraAltOutlinedIcon /> Imagen del vehículo
            </h2>
            <div className="flex justify-center">
              <div className="w-96 h-58 border-2 border-dashed border-gray-400 rounded-md flex justify-center items-center">
                {vehicle?.image ? (
                  <img
                    src={`http://localhost:4000/uploads/${vehicle.image}`}
                    alt="Imagen del vehículo"
                    className="object-cover w-full h-full rounded-md"
                  />
                ) : (
                  <span className="text-xl font-bold text-gray-300">
                    Imagen del vehículo
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 py-4 px-6 border border-white rounded-md">
            <h2 className="flex gap-1 text-lg text-white font-bold">
              <DirectionsCarFilledOutlinedIcon /> Información básica del
              vehículo
            </h2>

            <div className="flex gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="brand" className="mb-1 text-white text-sm">
                  Marca
                </label>
                <TextField
                  id="brand"
                  value={vehicle?.brand || ""}
                  fullWidth
                  size="small"
                  variant="outlined"
                  disabled
                  inputProps={{ style: { fontSize: "0.80rem" } }}
                  InputProps={{ sx: { backgroundColor: "#fff" } }}
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="model" className="mb-1 text-white text-sm">
                  Modelo
                </label>
                <TextField
                  id="model"
                  value={vehicle?.model || ""}
                  fullWidth
                  size="small"
                  variant="outlined"
                  disabled
                  inputProps={{ style: { fontSize: "0.80rem" } }}
                  InputProps={{ sx: { backgroundColor: "#fff" } }}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="registration"
                  className="mb-1 text-white text-sm"
                >
                  Matrícula
                </label>
                <TextField
                  id="registration"
                  value={vehicle?.registration || ""}
                  fullWidth
                  size="small"
                  variant="outlined"
                  disabled
                  inputProps={{ style: { fontSize: "0.80rem" } }}
                  InputProps={{ sx: { backgroundColor: "#fff" } }}
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="year" className="mb-1 text-white text-sm">
                  Año del vehículo
                </label>
                <TextField
                  id="year"
                  value={vehicle?.year || ""}
                  size="small"
                  disabled
                  sx={{ width: "100px" }}
                  inputProps={{ style: { fontSize: "0.80rem" } }}
                  InputProps={{
                    sx: {
                      backgroundColor: "#fff",
                      height: "36px",
                    },
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="state" className="mb-1 text-white text-sm">
                Estado del vehículo
              </label>
              <TextField
                id="state"
                value={vehicle?.state || ""}
                fullWidth
                size="small"
                disabled
                inputProps={{ style: { fontSize: "0.80rem" } }}
                InputProps={{ sx: { backgroundColor: "#fff" } }}
              />
            </div>
          </div>
          {owner && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 py-4 px-6 border border-white rounded-md">
                <h2 className="flex gap-1 text-lg text-white font-bold mb-2">
                  <CameraAltOutlinedIcon /> Imagen del propietario
                </h2>
                <div className="flex items-center justify-center">
                  <div className="flex justify-center items-center w-58 h-58 border-2 border-dashed border-gray-400 rounded-full ">
                    <img
                      src={`http://localhost:4000/uploads/${owner?.image}`}
                      alt="Vista previa"
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 py-4 px-6 border border-white rounded-md">
                <h2 className="flex gap-1 text-lg text-white font-bold">
                  <PersonOutlineOutlinedIcon /> Información básica del
                  propietario
                </h2>

                <div className="flex gap-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="brand" className="mb-1 text-white text-sm">
                      Nombre
                    </label>
                    <TextField
                      id="brand"
                      value={owner?.name || ""}
                      fullWidth
                      size="small"
                      variant="outlined"
                      disabled
                      inputProps={{ style: { fontSize: "0.80rem" } }}
                      InputProps={{ sx: { backgroundColor: "#fff" } }}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label htmlFor="model" className="mb-1 text-white text-sm">
                      Apellido
                    </label>
                    <TextField
                      id="model"
                      value={owner?.last_name || ""}
                      fullWidth
                      size="small"
                      variant="outlined"
                      disabled
                      inputProps={{ style: { fontSize: "0.80rem" } }}
                      InputProps={{ sx: { backgroundColor: "#fff" } }}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="registration"
                      className="mb-1 text-white text-sm"
                    >
                      Correo electrónico
                    </label>
                    <TextField
                      id="registration"
                      value={owner?.email || ""}
                      fullWidth
                      size="small"
                      variant="outlined"
                      disabled
                      inputProps={{ style: { fontSize: "0.80rem" } }}
                      InputProps={{ sx: { backgroundColor: "#fff" } }}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label htmlFor="year" className="mb-1 text-white text-sm">
                      Edad
                    </label>
                    <TextField
                      id="year"
                      value={owner?.age || ""}
                      size="small"
                      disabled
                      sx={{ width: "100px" }}
                      inputProps={{ style: { fontSize: "0.80rem" } }}
                      InputProps={{
                        sx: {
                          backgroundColor: "#fff",
                          height: "36px",
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="state" className="mb-1 text-white text-sm">
                    Número de teléfono
                  </label>
                  <TextField
                    id="state"
                    value={owner?.phone_number || ""}
                    fullWidth
                    size="small"
                    disabled
                    inputProps={{ style: { fontSize: "0.80rem" } }}
                    InputProps={{ sx: { backgroundColor: "#fff" } }}
                  />
                </div>
              </div>
            </div>
          )}
          <Button
            onClick={() => handleVehicleHistory(vehicle.id)}
            type="submit"
            variant="contained"
            startIcon={<AssignmentOutlinedIcon />}
            sx={{
              backgroundColor: "#1f2937",
              textTransform: "none",
              width: 150,
            }}
          >
            Ver historial
          </Button>
        </DialogContent>
        <Box
          sx={{
            backgroundColor: "#374151",
            p: 2,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            sx={{ color: "#fff", textTransform: "none" }}
            onClick={onClose}
          >
            Cerrar
          </Button>
        </Box>
      </Dialog>
      <ModalHistoryVehicle
        open={openHistoryModal}
        onClose={() => setOpenHistoryModal(false)}
        vehicleId={selectedVehicleId}
      />
    </>
  );
}

export default ModalViewVehicle;
