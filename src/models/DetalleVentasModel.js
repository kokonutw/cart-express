import { pool } from "../config/db.js";

const tabla = "detalle_venta";

export const crearDetalleVenta = async (
  id_venta,
  id_producto,
  descripcion,
  precio_venta,
  cantidad,
  total
) => {
  const { rows } = await pool.query(
    `INSERT INTO ${tabla} (id_venta,id_producto,descripcion,precio_venta, cantidad,total) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [id_venta, id_producto, descripcion, precio_venta, cantidad, total]
  );

  return rows[0];
};

export const mostrarDetalleVentaPorIdVenta = async (idventa) => {
  const { rows } = await pool.query(
    `SELECT * FROM ${tabla} WHERE id_venta = $1 RETURNING *`,
    [idventa]
  );

  return rows[0];
};
