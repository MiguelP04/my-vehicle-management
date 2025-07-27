import pool from "../db.js";

export const createAssignment = async (req, res) => {
  const { vehicle_id, user_id } = req.body;

  try {
    const vehicle = await pool.query("SELECT * FROM vehicles WHERE id = $1", [
      vehicle_id,
    ]);
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      user_id,
    ]);

    const alreadyAssigned = await pool.query(
      "SELECT * FROM assignments WHERE vehicle_id = $1 AND delivery_date IS NULL",
      [vehicle_id]
    );

    if (alreadyAssigned.rowCount > 0) {
      return res.status(400).json({
        message: "Este vehículo ya tiene una asignación activa.",
        assignment_id: alreadyAssigned.rows[0].id,
      });
    }

    if (vehicle.rowCount === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    if (user.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const assignment = await pool.query(
      "INSERT INTO assignments (vehicle_id, user_id, delivery_date) VALUES ($1, $2, $3 ) RETURNING *",
      [vehicle_id, user_id, null]
    );

    await pool.query("UPDATE vehicles SET state = 'En uso' WHERE id = $1", [
      vehicle_id,
    ]);

    return res.status(201).json({
      message: assignment.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.json(500).json({ message: "Error creating assignment" });
  }
};

export const updateAssignment = async (req, res) => {
  const { assignment_id } = req.params;
  const deliveryDate = new Date();

  try {
    const assignment = await pool.query(
      "SELECT * FROM assignments WHERE id = $1 AND delivery_date IS NULL",
      [assignment_id]
    );
    if (assignment.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Assignment not found or already completed" });
    }

    const vehicleId = assignment.rows[0].vehicle_id;

    await pool.query(
      "UPDATE assignments SET delivery_date = $1 WHERE id = $2",
      [deliveryDate, assignment_id]
    );

    await pool.query("UPDATE vehicles SET state = 'Disponible' WHERE id = $1", [
      vehicleId,
    ]);

    return res.json({ message: "Assignment updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await pool.query("SELECT * FROM assignments");
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
