import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ModalHistoryUser from "./ModalHistoryUser";
import { useState } from "react";

export default function ModalViewUser({ open, onClose, user }) {
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  if (!user) return null;

  const handleUserHistory = (userId) => {
    setSelectedUserId(userId);
    setOpenHistoryModal(true);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ backgroundColor: "#374151", color: "#fff" }}>
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <InfoIcon sx={{ fontSize: 24 }} /> Detalles del usuario
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              Ver información específica del usuario seleccionado
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
          <div className="flex flex-col gap-2 w-full py-4 px-6 border border-white rounded-md">
            <h2 className="flex gap-1 text-lg text-white font-bold mb-2">
              <CameraAltOutlinedIcon /> Imagen del usuario
            </h2>
            <div className="flex justify-center">
              <div className="w-48 h-48 border-2 border-dashed border-gray-400 rounded-full flex justify-center items-center overflow-hidden">
                {user?.image ? (
                  <img
                    src={`http://localhost:4000/uploads/${user.image}`}
                    alt="Imagen del usuario"
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-xl font-bold text-gray-300">
                    Sin imagen
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Información básica */}
          <div className="flex flex-col gap-4 py-4 px-6 border border-white rounded-md">
            <h2 className="flex gap-1 text-lg text-white font-bold">
              <PersonOutlineOutlinedIcon /> Información básica del usuario
            </h2>

            <div className="flex gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="mb-1 text-white text-sm">
                  Nombre
                </label>
                <TextField
                  id="name"
                  value={user?.name || ""}
                  fullWidth
                  size="small"
                  variant="outlined"
                  disabled
                  inputProps={{ style: { fontSize: "0.80rem" } }}
                  InputProps={{ sx: { backgroundColor: "#fff" } }}
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="last_name" className="mb-1 text-white text-sm">
                  Apellido
                </label>
                <TextField
                  id="last_name"
                  value={user?.last_name || ""}
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
                <label htmlFor="email" className="mb-1 text-white text-sm">
                  Correo electrónico
                </label>
                <TextField
                  id="email"
                  value={user?.email || ""}
                  fullWidth
                  size="small"
                  variant="outlined"
                  disabled
                  inputProps={{ style: { fontSize: "0.80rem" } }}
                  InputProps={{ sx: { backgroundColor: "#fff" } }}
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="age" className="mb-1 text-white text-sm">
                  Edad
                </label>
                <TextField
                  id="age"
                  value={user?.age || ""}
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
              <label htmlFor="phone" className="mb-1 text-white text-sm">
                Número de teléfono
              </label>
              <TextField
                id="phone"
                value={user?.phone_number || ""}
                fullWidth
                size="small"
                disabled
                inputProps={{ style: { fontSize: "0.80rem" } }}
                InputProps={{ sx: { backgroundColor: "#fff" } }}
              />
            </div>
          </div>
          <Button
            onClick={() => handleUserHistory(user.id)}
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
      <ModalHistoryUser
        open={openHistoryModal}
        onClose={() => setOpenHistoryModal(false)}
        userId={selectedUserId}
      />
    </>
  );
}
