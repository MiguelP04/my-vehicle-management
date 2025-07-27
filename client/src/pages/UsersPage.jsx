import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import SearchBar from "../components/SearchBar";
import ModalCreateUser from "../components/ModalCreateUser";
import ModalEditUser from "../components/ModalEditUser";
import ModalDeleteUser from "../components/ModalDeleteUser";
import ModalViewUser from "../components/ModalViewUser";
import { useState, useEffect } from "react";
import { useUsers } from "../context/UsersContext";

function UsersPage() {
  const { users, getUsers, assignedUsers, getUsersAssignments } = useUsers();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(users);
  const [loading, setLoading] = useState(true);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([getUsers(), getUsersAssignments()]);
      setLoading(false);
    };
    loadData();
  }, []);

  console.log(assignedUsers);

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

  const handleCreateUser = () => {
    setOpenCreateModel(true);
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setOpenEditModel(true);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setOpenDeleteModel(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setOpenViewModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-7xl h-screen">
        <CircularProgress size={60} />
      </div>
    );
  }
  console.log(users);
  return (
    <section className="w-full h-screen p-12 overflow-y-scroll">
      <section className="grid grid-cols-3 grid-rows-1 gap-8 h-40">
        <div className="bg-gray-700 row-span-1 rounded-lg p-8 flex flex-col gap-8">
          <h2 className="text-xl font-bold">Total de Usuarios</h2>
          <span className="flex justify-between text-3xl font-bold">
            {users.length}
            <PersonOutlineOutlinedIcon
              sx={{ fontSize: 32, color: "#eab308" }}
            />
          </span>
        </div>
        <div className="bg-gray-700 row-span-1 rounded-lg p-8 flex flex-col gap-1">
          <h2 className="text-xl font-bold">Usuarios con vehículo asignado</h2>
          <span className="flex justify-between text-3xl font-bold">
            {assignedUsers.assigned_users}{" "}
            <PersonAddAlt1OutlinedIcon
              sx={{ fontSize: 32, color: "#16a34a" }}
            />
          </span>
        </div>
        <div className="bg-gray-700 row-span-1 rounded-lg p-8 flex flex-col gap-1">
          <h2 className="text-xl font-bold">Usuarios sin vehículo asignado</h2>
          <span className="flex justify-between text-3xl font-bold">
            {assignedUsers.unassigned_users}{" "}
            <PersonRemoveAlt1OutlinedIcon
              sx={{ fontSize: 32, color: "#dc2626" }}
            />
          </span>
        </div>
      </section>
      <section className="flex flex-col items-start w-full mt-6">
        <h2 className="w-48 text-xl font-bold text-center">Buscar usuario</h2>
        <div className="flex justify-between items-center w-full">
          <SearchBar
            value={query}
            onChange={handleChange}
            placeholder={"Busca por nombre o correo electrónico"}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateUser}
            sx={{
              textTransform: "none",
              fontSize: "16px",
            }}
          >
            Crear usuario
          </Button>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-8 my-4 ">
        {result.length === 0 && loading ? (
          <p className="font-semibold mt-4">No se encontraron usuarios</p>
        ) : (
          result.map((user) => (
            <article
              key={user.id}
              className="flex flex-col justify-between h-38 bg-gray-800 rounded-lg"
            >
              <div className="relative flex items-center gap-4 px-8 py-2 mt-4">
                <Avatar
                  src={`http://localhost:4000/uploads/${user.image}`}
                  alt={`${user.name} ${user.last_name}`}
                  sx={{ width: 56, height: 56 }}
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-semibold">
                    {user.name} {user.last_name}
                  </h3>

                  <div className="flex gap-4">
                    <p className="text-sm text-gray-300 flex items-center gap-1 mt-1">
                      <MailOutlineIcon sx={{ fontSize: 16 }} />
                      {user.email}
                    </p>
                    <p className="text-sm text-gray-300 flex items-center gap-1 mt-1">
                      <CakeOutlinedIcon
                        sx={{ fontSize: 16, marginBottom: "4px" }}
                      />
                      {user.age}
                    </p>
                  </div>
                  <p className="text-sm text-gray-300 flex items-center gap-1 mt-1">
                    <LocalPhoneOutlinedIcon sx={{ fontSize: 16 }} />
                    {user.phone_number}
                  </p>
                </div>
                <button
                  onClick={() => handleViewUser(user)}
                  className="absolute bottom-0 right-4 flex items-end justify-center gap-1  w-32 text-sm font-medium  text-blue-400 text-center cursor-pointer border border-blue-400 rounded-md hover:bg-blue-900 hover:text-white transition-colors"
                >
                  Ver detalles
                </button>
              </div>
              <div className="flex mt-2 w-full border-t border-zinc-700">
                <button
                  onClick={() => handleEditUser(user)}
                  className="flex items-center justify-center gap-2 w-1/2 py-2 text-sm font-semibold text-blue-400 cursor-pointer rounded-bl-lg  hover:bg-blue-900 hover:rounded-bl-lg transition-colors"
                >
                  <EditIcon sx={{ fontSize: 18 }} />
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="flex items-center justify-center gap-2 w-1/2 py-2 text-sm font-semibold text-red-400 cursor-pointer rounded-br-lg  hover:bg-red-900 hover:rounded-br-lg transition-colors"
                >
                  <DeleteIcon sx={{ fontSize: 18 }} />
                  Eliminar
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      <ModalCreateUser
        open={openCreateModel}
        onClose={() => setOpenCreateModel(false)}
        onRefresh={async () => {
          await Promise.all([getUsers(), getUsersAssignments()]);
        }}
      />
      <ModalEditUser
        open={openEditModel}
        onClose={() => setOpenEditModel(false)}
        onRefresh={async () => {
          await Promise.all([getUsers(), getUsersAssignments()]);
        }}
        user={userToEdit}
      />
      <ModalDeleteUser
        open={openDeleteModel}
        onClose={() => setOpenDeleteModel(false)}
        onRefresh={getUsers}
        user={userToDelete}
      />
      <ModalViewUser
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        user={selectedUser}
      />
    </section>
  );
}

export default UsersPage;
