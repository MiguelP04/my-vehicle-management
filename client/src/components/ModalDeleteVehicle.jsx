import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useVehicles } from "../context/VehiclesContext";

function ModalDeleteVehicle({ open, onClose, vehicle, onRefresh }) {
  const { deleteVehicle } = useVehicles();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!vehicle) {
      setError("ID de vehículo inválido");
      return;
    }
    try {
      await deleteVehicle(vehicle);
      setSuccess(true);
      onRefresh();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Error al eliminar el vehículo");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ backgroundColor: "#991B1B", color: "#fff" }}>
          <DeleteIcon /> Confirmar eliminación
        </DialogTitle>

        <DialogContent
          dividers
          sx={{ backgroundColor: "#374151", color: "#fff" }}
        >
          <Typography variant="body1">
            ¿Estás seguro de que quieres eliminar el vehículo{" "}
            <strong>
              {vehicle?.brand} {vehicle?.model}
            </strong>
            ?
          </Typography>
          <Typography
            variant="body2"
            color="error"
            sx={{ mt: 1, fontWeight: 600 }}
          >
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ backgroundColor: "#374151" }}>
          <Button
            onClick={onClose}
            variant="outlined"
            color="primary"
            sx={{ color: "#fff" }}
          >
            Cancelar
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" variant="filled">
          Vehículo eliminado con éxito
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

export default ModalDeleteVehicle;
