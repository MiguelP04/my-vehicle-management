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
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schemas/userSchema";
import { useUsers } from "../context/UsersContext";

export default function ModalCreateUser({ open, onClose, onRefresh }) {
  const { createUser } = useUsers();
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
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      age: "",
      phone_number: "",
    },
  });

  const onSubmit = async (userData) => {
    console.log(userData);
    const formData = new FormData();

    for (const key in userData) {
      console.log(key);
      formData.append(key, userData[key]);
    }
    if (imageFile) formData.append("image", imageFile);

    try {
      await createUser(formData);
      setSuccess(true);
      onClose();
      if (onRefresh) onRefresh();
      reset();
      setImageFile(null);
      setPreviewImage(null);
    } catch (err) {
      setError("Error al crear el usuario");
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

  const ages = Array.from({ length: 91 }, (_, i) => i + 10);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ backgroundColor: "#374151", color: "#fff" }}>
          <div>
            <h2 className="text-lg font-semibold">
              <AddOutlinedIcon sx={{ fontSize: 24 }} /> Crear nuevo usuario
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              Registra un nuevo usuario para incluirlo en el gestor de usuarios
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
              <CameraAltOutlinedIcon /> Imagen del usuario
            </h2>
            <div className="flex justify-center">
              <div
                className={
                  "flex justify-center items-center w-58 h-58 border-2 border-dashed border-gray-400 rounded-full "
                }
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Vista previa"
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-sm text-gray-400 text-center opacity-40">
                    <AccountCircleIcon sx={{ fontSize: 270 }} />
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
              <PersonOutlineOutlinedIcon /> Información Básica
            </h2>
            <div className="flex gap-4 ">
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="mb-1 text-white text-sm">
                  Nombre
                </label>
                <TextField
                  id="name"
                  placeholder="José, Maria, Luis..."
                  size="small"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
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
                <label htmlFor="last_name" className="mb-1 text-white text-sm">
                  Apellido
                </label>
                <TextField
                  id="last_name"
                  placeholder="Hernández, García, López..."
                  size="small"
                  {...register("last_name")}
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
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
                <label htmlFor="email" className="mb-1 text-white text-sm">
                  Correo Eléctronico
                </label>
                <TextField
                  id="email"
                  placeholder="usuario@correo.com"
                  size="small"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
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
                <label htmlFor="age" className="mb-1 text-white text-sm">
                  Edad
                </label>
                <Controller
                  name="age"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      id="age"
                      select
                      {...field}
                      error={!!errors.age}
                      helperText={errors.age?.message}
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
                      {ages.map((age) => (
                        <MenuItem
                          key={age}
                          value={age}
                          sx={{ justifyContent: "center" }}
                        >
                          {age}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col w-48">
              <label htmlFor="phone_number" className="mb-1 text-white text-sm">
                Número de teléfono
              </label>
              <TextField
                id="phone_number"
                placeholder="0426-123-4567"
                {...register("phone_number")}
                size="small"
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
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
          Usuario creado con éxito
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
