import {
  crearVenta,
  mostrarVentasPorIdUser,
  confirmarEstadoVenta,
} from "../models/VentasModel.js";

export const createVenta = async (req, res, next) => {
  const { id_usuario, estado, total } = req.body;
  console.log('Controller venta:', id_usuario,estado,total);
  
  try {
    const response = await crearVenta(id_usuario, estado, total);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const mostrarVentaPorId = async (req, res, next) => {
  const { id_usuario } = req.params;
  try {
    const response = await mostrarVentasPorIdUser(id_usuario);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};


export const confirmarVenta = async (req,res,next) =>{
    const { id } = req.params;

    if(!id){
        return res.status(404).json({message: 'No se encuentra el id'})
    }

    try {
        const response = await confirmarEstadoVenta('confirmado',id);
    } catch (error) {
        next(error)
    }
}