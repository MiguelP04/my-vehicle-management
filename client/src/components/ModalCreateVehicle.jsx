import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema } from "../schemas/vehicleSchema";
import { useVehicles } from "../context/VehiclesContext";

export default function ModalCreateVehicle({ open, onClose, onRefresh }) {
  const { createVehicle } = useVehicles();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      brand: "",
      model: "",
      registration: "",
      year: "",
      state: "Disponible",
    },
  });

  const onSubmit = async (vehicleData) => {
    const formData = new FormData();

    for (const key in vehicleData) {
      console.log(key);
      formData.append(key, vehicleData[key]);
    }
    if (imageFile) formData.append("image", imageFile);

    try {
      await createVehicle(formData);
      setSuccess(true);
      onClose();
      if (onRefresh) onRefresh();
      reset();
      setImageFile(null);
      setPreviewImage(null);
    } catch (err) {
      setError("Error al crear el vehículo");
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1950 + 1 },
    (_, i) => 1950 + i
  );

  const availableStates = ["Disponible", "En mantenimiento"];

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ backgroundColor: "#374151", color: "#fff" }}>
          <div>
            <h2 className="text-lg font-semibold">
              <AddOutlinedIcon sx={{ fontSize: 24 }} /> Crear nuevo vehículo
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              Registra un nuevo vehículo para incluirlo en el gestor de
              vehículos
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
        >
          <div className="flex flex-col gap-2 py-4 px-6 border border-white rounded-md">
            <h2 className="flex gap-1 text-lg text-white font-bold mb-2">
              <CameraAltOutlinedIcon /> Imagen del vehículo
            </h2>
            <div className="flex justify-center">
              <div
                className={
                  "w-96 h-58 border-2 border-dashed border-gray-400 rounded-md flex justify-center items-center"
                }
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Vista previa"
                    className="object-cover w-full h-full rounded-md"
                  />
                ) : (
                  <span className="text-sm text-gray-400 text-center">
                    Vista previa
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-2 text-center">
              <label htmlFor="upload">
                <Button
                  component="span"
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    color: "#fff",
                    borderColor: "#fff",
                    px: 8,
                    fontSize: "1rem",
                  }}
                >
                  <FileUploadOutlinedIcon sx={{ mr: 1 }} /> Subir imagen
                </Button>
                <input
                  id="upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-4 py-4 px-6 border border-white rounded-md">
            <h2 className="flex gap-1 text-lg text-white font-bold">
              <DirectionsCarFilledOutlinedIcon /> Información Básica
            </h2>
            <div className="flex gap-4 ">
              <div className="flex flex-col w-full">
                <label htmlFor="brand" className="mb-1 text-white text-sm">
                  Marca
                </label>
                <TextField
                  id="brand"
                  placeholder="Ford, Toyota, Chevrolet..."
                  size="small"
                  {...register("brand")}
                  error={!!errors.brand}
                  helperText={errors.brand?.message}
                  fullWidth
                  variant="outlined"
                  inputProps={{
                    style: {
                      fontSize: "0.80rem",
                    },
                  }}
                  InputProps={{
                    sx: {
                      backgroundColor: "#fff",
                    },
                  }}
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="model" className="mb-1 text-white text-sm">
                  Modelo
                </label>
                <TextField
                  id="model"
                  placeholder="Fiesta, Corolla, Spark..."
                  size="small"
                  {...register("model")}
                  error={!!errors.model}
                  helperText={errors.model?.message}
                  fullWidth
                  variant="outlined"
                  inputProps={{
                    style: {
                      fontSize: "0.80rem",
                    },
                  }}
                  InputProps={{
                    sx: {
                      backgroundColor: "#fff",
                    },
                  }}
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
                  placeholder="ABC123"
                  size="small"
                  {...register("registration")}
                  error={!!errors.registration}
                  helperText={errors.registration?.message}
                  fullWidth
                  inputProps={{
                    style: {
                      fontSize: "0.80rem",
                    },
                  }}
                  InputProps={{
                    sx: {
                      backgroundColor: "#fff",
                    },
                  }}
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="year" className="mb-1 text-white text-sm">
                  Año del vehículo
                </label>
                <Controller
                  name="year"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      id="year"
                      select
                      {...field}
                      error={!!errors.year}
                      helperText={errors.year?.message}
                      sx={{ width: "100px" }}
                      inputProps={{
                        style: {
                          fontSize: "0.80rem",
                        },
                      }}
                      InputProps={{
                        sx: {
                          backgroundColor: "#fff",
                          height: "36px",
                        },
                      }}
                      size="small"
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              minWidth: 400,
                              maxHeight: 300,
                            },
                          },
                        },
                      }}
                    >
                      {years.map((year) => (
                        <MenuItem
                          key={year}
                          value={year}
                          sx={{ justifyContent: "center" }}
                        >
                          {year}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="state" className="mb-1 text-white text-sm">
                Estado del vehículo
              </label>
              <Controller
                name="state"
                control={control}
                defaultValue="Disponible"
                render={({ field }) => (
                  <TextField
                    id="state"
                    select
                    {...field}
                    size="small"
                    fullWidth
                    error={!!errors.state}
                    helperText={errors.state?.message}
                    inputProps={{ sx: { backgroundColor: "#fff" } }}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: { sx: { maxHeight: 300, minWidth: 200 } },
                      },
                    }}
                  >
                    {availableStates.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </div>
          </div>
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
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#2563eb", textTransform: "none" }}
            onClick={handleSubmit(onSubmit)}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" variant="filled">
          Vehículo creado con éxito
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
