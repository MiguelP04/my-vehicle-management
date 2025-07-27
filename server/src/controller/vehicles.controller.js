import pool from "../db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const getAllVehicles = async (req, res, next) => {
  try {
    const response = await pool.query(
      "SELECT * FROM vehicles WHERE deleted_at IS NULL"
    );
    if (response.rows.length === 0) {
      res.status(404).json({ message: "Vehicles not created yet" });
    }
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

export const getVehicleHistory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await pool.query(
      "SELECT a.id, u.id AS user_id, u.name AS user_name, u.email AS user_email, a.assignment_date, a.delivery_date FROM assignments a JOIN users u ON u.id = a.user_id WHERE a.vehicle_id = $1 ORDER BY a.assignment_date DESC",
      [id]
    );
    res.json(response.rows);
  } catch (error) {
    next(error);
  }
};

export const getOwner = async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await pool.query(
      `
        SELECT u.*, a.id AS assignment_id
        FROM users u
        JOIN assignments a ON a.user_id = u.id  
        WHERE a.vehicle_id = $1 AND a.delivery_date IS NULL AND u.deleted_at IS NULL
        LIMIT 1
      `,
      [id]
    );
    if (!response.rows[0]) {
      return res.status(200).json({ owner: null });
    }

    res.json({ owner: response.rows[0] });
  } catch (err) {
    next(err);
  }
};

export const createVehicle = async (req, res, next) => {
  const { brand, model, year, registration, state } = req.body;
  const image = req.file?.filename || null;

  try {
    const response = await pool.query(
      "INSERT INTO vehicles (brand, model, year, registration, state, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [brand, model, year, registration, state, image]
    );
    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateVehicle = async (req, res, next) => {
  const { id } = req.params;

  const fields = req.body;
  try {
    const existing = await pool.query("SELECT * FROM vehicles WHERE id = $1", [
      id,
    ]);
    if (existing.rowCount === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const previousVehicle = existing.rows[0];

    if (req.file) {
      fields.image = req.file.filename;
    } else if (!fields.image && previousVehicle.image) {
      fields.image = previousVehicle.image;
    }

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const setQuery = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const query = `UPDATE vehicles SET ${setQuery} WHERE id = $${
      keys.length + 1
    } RETURNING *`;
    const response = await pool.query(query, [...values, id]);
    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deleteVehicle = async (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid vehicle ID" });
  }
  try {
    const find = await pool.query("SELECT image FROM vehicles WHERE id = $1", [
      id,
    ]);
    const imageName = find.rows[0]?.image;
    const response = await pool.query(
      "UPDATE vehicles SET deleted_at = NOW() WHERE id = $1",
      [id]
    );
    if (response.rowCount == 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    if (imageName) {
      const imagePath = path.join(__dirname, "..", "..", "uploads", imageName);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) console.error("No se pudo borrar imagen:", err);
          else console.log("Imagen eliminada:", imageName);
        });
      }
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
