import pool from "../db.js";

export const createAssignment = async (req, res) => {
  const { vehicleId, userId, assignmentDate, deliveryDate } = req.body;

  try {
    const vehicle = await pool.query("SELECT * FROM vehicles WHERE id = $1", [
      vehicleId,
    ]);
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    console.log(vehicle);

    if (vehicle.rowCount === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    if (user.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const assignment = await pool.query(
      "INSERT INTO assignments (id_vehicle, id_user, assignment_date, delivery_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [vehicleId, userId, assignmentDate, deliveryDate]
    );

    await pool.query("UPDATE vehicles SET state = 'En uso' WHERE id = $1", [
      vehicleId,
    ]);

    return res.status(201).json({
      message: assignment.rows[0],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "The vehicle is already being used by another user." });
  }
};

export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await pool.query("SELECT * FROM assignments");
    console.log(assignments);
    return res.status(200).json(assignments.rows);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching assignments" });
  }
};

export const deleteAssignments = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await pool.query("DELETE FROM assignments WHERE id = $1", [
      id,
    ]);
    if (response.rowCount === 0) {
      return res.status(404).json({
        message: "Assingment not found",
      });
    }
    return res.json({
      message: "Delete assignment succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error deleting assignments",
    });
  }
};
