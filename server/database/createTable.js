import pool from "../src/db.js";

const createTableVehicle = async () => {
  const query = `CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  brand VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  registration VARCHAR(255) NOT NULL UNIQUE
  )`;
  try {
    await pool.query(query);
    console.log("Tabla creada exitosamente");
  } catch (error) {
    console.log(error);
  }
};

createTableVehicle();
