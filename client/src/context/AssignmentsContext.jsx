import { createContext, useContext, useState } from "react";
import {
  createAssignmentRequest,
  getAssignmentsRequest,
  updateAssignmentRequest,
} from "../api/assignments";

const AssignmentContext = createContext();

export const useAssignments = () => {
  const context = useContext(AssignmentContext);

  if (!context) {
    throw new Error("useAssignments must be used within a AssingmentsProvider");
  }

  return context;
};

export const AssignmentProvider = ({ children }) => {
  const [assignments, setAssignments] = useState([]);

  const getAssignments = async () => {
    try {
      const res = await getAssignmentsRequest();
      setAssignments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createAssignment = async (data) => {
    try {
      const res = await createAssignmentRequest(data);
      setAssignments((prev) => [...prev, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateAssignment = async (id) => {
    try {
      await updateAssignmentRequest(id);

      setAssignments((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, delivery_date: new Date().toISOString() } : a
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AssignmentContext.Provider
      value={{
        assignments,
        getAssignments,
        createAssignment,
        updateAssignment,
      }}
    >
      {children}
    </AssignmentContext.Provider>
  );
};
