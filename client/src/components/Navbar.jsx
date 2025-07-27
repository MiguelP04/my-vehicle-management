import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";

function Navbar() {
  return (
    <nav className="flex flex-col gap-20 min-w-72 h-screen bg-gray-700 p-4">
      <h1 className="text-xl font-bold text-left">Gestor de vehiculos</h1>
      <ul className="flex flex-col items-start justify-start gap-2 -mt-12">
        <span className="ml-4 text-slate-300">Secciones</span>
        <li className="w-full font-bold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              (isActive ? "bg-slate-800" : "hover:bg-slate-800") +
              " w-full flex items-start justify-start p-2 gap-4 rounded-lg transition-all duration-300 ease-in-out"
            }
          >
            <HomeIcon sx={{ fontSize: "20px" }} />
            <span>Inicio</span>
          </NavLink>
        </li>
        <li className="w-full font-bold">
          <NavLink
            to="/vehiculos"
            className={({ isActive }) =>
              (isActive ? "bg-slate-800" : "hover:bg-slate-800") +
              " w-full flex items-start justify-start p-2 gap-4 rounded-lg transition-all duration-300 ease-in-out"
            }
          >
            <DirectionsCarFilledIcon sx={{ fontSize: "20px" }} />
            <span>Vehiculos</span>
          </NavLink>
        </li>
        <li className="w-full font-bold">
          <NavLink
            to="/usuarios"
            className={({ isActive }) =>
              (isActive ? "bg-slate-800" : "hover:bg-slate-800") +
              " w-full flex items-start justify-start p-2 gap-4 rounded-lg transition-all duration-300 ease-in-out"
            }
          >
            <PersonIcon sx={{ fontSize: "20px" }} />
            <span> Usuarios</span>
          </NavLink>
        </li>
        <li className="w-full font-bold">
          <NavLink
            to="/asignaciones"
            className={({ isActive }) =>
              (isActive ? "bg-slate-800" : "hover:bg-slate-800") +
              " w-full flex items-start justify-start p-2 gap-4 rounded-lg transition-all duration-300 ease-in-out"
            }
          >
            <AssignmentIcon sx={{ fontSize: "20px" }} />
            <span>Asignaciones</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
