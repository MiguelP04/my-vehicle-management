import { createContext, useContext, useState } from "react";
import { getAssignmentsRequest } from "../api/assignments";

const AssignmentContext = createContext();

export const useAssingments = () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AssignmentContext.Provider value={{ assignments, getAssignments }}>
      {children}
    </AssignmentContext.Provider>
  );
};
