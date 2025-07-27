import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Avatar,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchBar from "./SearchBar";
import { useUsers } from "../context/UsersContext";
import { useAssignments } from "../context/AssignmentsContext";
import { useEffect, useState } from "react";

export default function ModalAssignVehicle({
  open,
  onClose,
  vehicle,
  onRefresh,
}) {
  const { users, getUsers } = useUsers();
  const { createAssignment } = useAssignments();
  const [selectedUser, setSelectedUser] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(users);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      await getUsers();
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (users.length) {
      setResult(users);
      setLoading(false);
    }
  }, [users]);

  const handleChange = (e) => {
    const text = e.target.value;
    setQuery(text);

    const filtered = users.filter((u) =>
      `${u.name} ${u.lastName} ${u.email}`
        .toLowerCase()
        .includes(text.toLowerCase())
    );

    setResult(filtered);
  };

  const handleAssign = async () => {
    if (!selectedUser || !vehicle) {
      setError("Selecciona un usuario y vehículo válido");
      return;
    }
    try {
      await createAssignment({
        vehicle_id: vehicle,
        user_id: selectedUser.id,
      });
      setSuccess(true);
      onClose();
      setSelectedUser(null);
      if (onRefresh) onRefresh();
    } catch (error) {
      setError("Error al asignar usuario");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-7xl h-screen">
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ backgroundColor: "#374151", color: "#fff" }}>
          <div>
            <h2 className="text-lg font-semibold">
              <PersonOutlinedIcon sx={{ fontSize: 24 }} /> Selecciona un usuario
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              Asigna un usuario a este vehículo
            </p>
          </div>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "#374151",
            paddingTop: "8px !important",
          }}
          className="text-white"
        >
          <section className="flex flex-col items-center w-full">
            <h2 className="w-48 text-xl font-bold text-center">
              Buscar usuario
            </h2>
            <div className="flex justify-center items-center w-full">
              <SearchBar
                value={query}
                onChange={handleChange}
                placeholder={"Busca por nombre o correo electrónico"}
              />
            </div>
          </section>
          <section className="flex flex-col gap-6">
            {result.length === 0 && loading ? (
              <p className="font-semibold mt-4">No se encontraron usuarios</p>
            ) : (
              result.map((user) => (
                <article
                  onClick={() => setSelectedUser(user)}
                  key={user.id}
                  className={`flex flex-col justify-between w-96 p-4 bg-gray-800 rounded-lg cursor-pointer transitions-colors border-2 ${
                    selectedUser?.id === user.id
                      ? "bg-blue-700 border-blue-400 shadow-md"
                      : "bg-gray-800 border-transparent hover:border-blue-500"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Avatar
                      src={`http://localhost:4000/uploads/${user.image}`}
                      alt={`${user.name} ${user.last_name}`}
                      sx={{ width: 56, height: 56 }}
                    />
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold">
                        {user.name} {user.last_name}
                      </h3>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#374151" }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ color: "#fff", textTransform: "none" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAssign}
            type="submit"
            variant="contained"
            disabled={!selectedUser}
            sx={{ backgroundColor: "#2563eb", textTransform: "none" }}
          >
            Asignar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" variant="filled">
          Usuario asignado con éxito
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
      >
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
