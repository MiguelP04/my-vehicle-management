import pool from "../db.js";

export const getAllVehicles = async (req, res, next) => {
  try {
    const response = await pool.query("SELECT * FROM vehicles");
    res.json(response.rows);
  } catch (error) {
    next(error);
  }
};

export const getVehicle = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await pool.query("SELECT * FROM vehicles WHERE id = $1", [
      id,
    ]);
    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const createVehicle = async (req, res, next) => {
  const { brand, model, year, registration, state } = req.body;
  try {
    const response = await pool.query(
      "INSERT INTO vehicles (brand, model, year, registration, state) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [brand, model, year, registration, state]
    );
    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateVehicle = async (req, res, next) => {
  const { id } = req.params;
  const { registration, state } = req.body;
  try {
    const response = await pool.query(
      "UPDATE vehicles SET registration = $1, state = $2 WHERE id = $3 RETURNING *",
      [registration, state, id]
    );
    if (response.rowCount == 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteVehicle = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await pool.query("DELETE FROM vehicles WHERE id = $1", [
      id,
    ]);
    if (response.rowCount == 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
