import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useEffect, useState } from "react";
import { useUsers } from "../context/UsersContext";

export default function ModalHistoryUser({ open, onClose, userId }) {
  const { history, getHistory } = useUsers();
  const [loading, setLoading] = useState(false);

  console.log(userId);

  useEffect(() => {
    if (open && userId) {
      setLoading(true);
      getHistory(userId).finally(() => setLoading(false));
    }
  }, [open, userId]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: "#374151", color: "#fff" }}>
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <AssignmentOutlinedIcon sx={{ fontSize: 24 }} /> Historial de
            vehiculos
          </h2>
          <p className="text-sm text-gray-300 mt-1">
            Vehículos asignados por el usuario
          </p>
        </div>
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: "#374151", minHeight: 200 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : Array.isArray(history) && history.length === 0 ? (
          <Typography className="text-white text-center mt-4">
            No hay asignaciones previas.
          </Typography>
        ) : (
          <List>
            {history.map((assignment) => (
              <ListItem key={assignment.id} divider>
                <ListItemText
                  primary={
                    <span className="text-white font-semibold">
                      {assignment.brand} ({assignment.model}){" "}
                      {assignment.registration}
                    </span>
                  }
                  secondary={
                    <span className="text-gray-300 text-sm">
                      Asignado:{" "}
                      {new Date(assignment.assignment_date).toLocaleDateString(
                        "es-VE"
                      )}
                      {assignment.delivery_date
                        ? ` | Entregado: ${new Date(
                            assignment.delivery_date
                          ).toLocaleDateString("es-VE")}`
                        : " | Activo"}
                    </span>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
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
  );
}
