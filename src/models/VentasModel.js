import { pool } from "../config/db.js";

const tabla = "ventas";

export const crearVenta = async (id_usuario, estado, total) => {
  console.log("Datos que se crea la venta:", id_usuario,estado,total);
  
  const { rows } = await pool.query(
    `INSERT INTO ${tabla} (id_usuario,estado, total) VALUES ($1,$2,$3) RETURNING *`,
    [id_usuario, estado, total]
  );

  return rows[0];
};

export const mostrarVentasPorIdUser = async (idusuario) => {
  const { rows } = await pool.query(
    `SELECT * FROM ${tabla} WHERE id_usuario = $1`,
    [idusuario]
  );

  return rows[0];
};

export const confirmarEstadoVenta = async (estado, id) => {
  const { rows } = await pool.query(
    `UPDATE ${tabla} SET estado = $1 where id = $2  RETURNING *`,
    [estado, id]
  );

  return rows[0];
};
