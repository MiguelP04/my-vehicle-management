import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import VehiclesPage from "./pages/VehiclesPage";
import UsersPage from "./pages/UsersPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import { VehicleProvider } from "./context/VehiclesContext";
import { UserProvider } from "./context/UsersContext";
import { AssignmentProvider } from "./context/AssignmentsContext";

function App() {
  return (
    <VehicleProvider>
      <UserProvider>
        <AssignmentProvider>
          <BrowserRouter>
            <main className="flex h-screen">
              <Navbar />
              <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/asignaciones" element={<AssignmentsPage />} />
                <Route path="/vehiculos" element={<VehiclesPage />} />
                <Route path="/usuarios" element={<UsersPage />} />
              </Routes>
            </main>
          </BrowserRouter>
        </AssignmentProvider>
      </UserProvider>
    </VehicleProvider>
  );
}

export default App;
