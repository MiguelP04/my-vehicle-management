import pool from "../db.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const response = await pool.query("SELECT * FROM users");
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

export const createUser = async (req, res, next) => {
  const { name, last_name, age, email } = req.body;
  try {
    const response = await pool.query(
      "INSERT INTO users (name, last_name, age, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, last_name, age, email]
    );
    console.log(response);
    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, last_name, age, email } = req.body;
  try {
    const response = await pool.query(
      "UPDATE users SET name = $1, last_name = $2, age = $3, email = $4 WHERE id = $3 RETURNING *",
      [name, last_name, age, email, id]
    );
    if (response.rowCount == 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    if (response.rowCount == 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
