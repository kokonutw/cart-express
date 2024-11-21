import { pool } from "../config/db.js";

const tabla = "productos";

export const getAllProducts = async () => {
  const { rows } = await pool.query("SELECT * FROM productos");

  return rows;
};

export const getProductsById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM ${tabla} where id = $1`, [
    id,
  ]);

  return rows[0];
};

export const createProduct = async (name, price, imagen) => {
  const { rows } = await pool.query(
    `INSERT INTO ${tabla} (name,price,imagen) VALUES ($1,$2,$3) RETURNING *`,
    [name, price, imagen]
  );

  return rows[0];
};

export const editProduct = async (fields, id) => {
  const updates = [];
  const values = [];

  // Construimos dinámicamente las columnas a actualizar
  Object.entries(fields).forEach(([key, value], index) => {
    updates.push(`${key} = $${index + 1}`);
    values.push(value);
  });
  //ejm: const updatedProduct = await editProduct({ name: 'NuevoNombre', price: 20 }, 1);

  values.push(id); // Agregamos el ID al final

  const query = `UPDATE ${tabla} SET ${updates.join(", ")} WHERE id = $${
    values.length
  } RETURNING *`;
  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const deleteProduct = async (id) => {
  const { rows } = await pool.query(
    `DELETE FROM ${tabla}  where id = $1 RETURNING*`,
    [id]
  );

  return rows[0];
};
