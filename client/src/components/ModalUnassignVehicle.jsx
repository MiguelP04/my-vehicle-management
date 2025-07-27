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
import { useAssignments } from "../context/AssignmentsContext";

export default function ModalUnassignVehicle({
  open,
  onClose,
  owner,
  onRefresh,
}) {
  const { updateAssignment } = useAssignments();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleUnassign = async () => {
    if (!owner) {
      setError("ID de asignación inválido");
      return;
    }
    try {
      await updateAssignment(owner.assignment_id);
      setSuccess(true);
      onRefresh();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Error al eliminar la asignación");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ backgroundColor: "#991B1B", color: "#fff" }}>
          <DeleteIcon /> Confirmar desasignación
        </DialogTitle>

        <DialogContent
          dividers
          sx={{ backgroundColor: "#374151", color: "#fff" }}
        >
          <Typography variant="body1">
            ¿Estás seguro que deseas desasignar al usuario{" "}
            <strong>
              {owner?.name} {owner?.last_name}{" "}
            </strong>
            de este vehículo?
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
            sx={{ color: "#fff", textTransform: "none" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleUnassign}
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
          >
            Desasignar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" variant="filled">
          Usuario desasignado con éxito
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
