import pool from "../db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const getAllUsers = async (req, res, next) => {
  try {
    const response = await pool.query(
      "SELECT * FROM users WHERE deleted_at IS NULL"
    );
    res.json(response.rows);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getUserAssignments = async (req, res, next) => {
  try {
    const query = `SELECT 
                      (SELECT COUNT(DISTINCT a.user_id)
                       FROM assignments a
                       JOIN users u ON u.id = a.user_id
                       WHERE a.delivery_date IS NULL AND u.deleted_at IS NULL) AS assigned_users,
                      
                      (SELECT COUNT(*) 
                       FROM users u 
                       WHERE u.deleted_at IS NULL 
                       AND u.id NOT IN (
                        SELECT user_id FROM assignments WHERE delivery_date IS NULL
                      )) AS unassigned_users`;
    const result = await pool.query(query);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const getUserVehicleHistory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await pool.query(
      `SELECT 
         a.id,
         v.id AS vehicle_id,
         v.brand,
         v.model,
         v.registration,
         a.assignment_date,
         a.delivery_date
       FROM assignments a
       JOIN vehicles v ON v.id = a.vehicle_id
       WHERE a.user_id = $1
       ORDER BY a.assignment_date DESC`,
      [id]
    );

    res.json(response.rows);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  const { name, last_name, age, email, phone_number } = req.body;
  const image = req.file?.filename || null;

  try {
    const response = await pool.query(
      "INSERT INTO users (name, last_name, age, email, phone_number, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, last_name, age, email, phone_number, image]
    );
    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;

  const fields = req.body;
  try {
    const existing = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (existing.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const previousUser = existing.rows[0];

    if (req.file) {
      fields.image = req.file.filename;
    } else if (!fields.image && previousUser.image) {
      fields.image = previousUser.image;
    }

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const setQuery = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const query = `UPDATE users SET ${setQuery} WHERE id = $${
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

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const find = await pool.query("SELECT image FROM users WHERE id = $1", [
      id,
    ]);
    const imageName = find.rows[0]?.image;
    const response = await pool.query(
      "UPDATE users SET deleted_at = NOW() WHERE id = $1",
      [id]
    );
    if (response.rowCount == 0) {
      return res.status(404).json({ message: "User not found" });
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
