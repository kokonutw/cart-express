import {
  crearDetalleVenta,
  mostrarDetalleVentaPorIdVenta,
} from "../models/DetalleVentasModel.js";
import { mostrarVentasPorIdUser } from "../models/VentasModel.js";


export const createDetalleVenta = async (req, res, next) => {
  // const userId = req.user.id;
  const userId = req.params.id_usuario;
  const { id_producto, descripcion, precio_venta, cantidad, total } = req.body;
  try {
    //Obtener la venta del usuario
    const venta = await mostrarVentasPorIdUser(userId);

    if (!venta) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }

    const response = await crearDetalleVenta(
      venta.id,
      id_producto,
      descripcion,
      precio_venta,
      cantidad,
      total
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const mostrarDetalleVenteById = async (req, res, next) => {
  const { id_usuario } = req.body;
  try {
    const response = await mostrarDetalleVentaPorIdVenta(id_usuario);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
