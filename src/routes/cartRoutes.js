import express from "express";
const router = express.Router();
import {confirmarVenta,createVenta,mostrarVentaPorId} from '../controllers/ventasController.js'
import {createDetalleVenta,mostrarDetalleVenteById} from '../controllers/detalleVentasController.js'
import { authenticate } from "../middleware/authenticate.js";



router.post("/", authenticate,createVenta);
router.post("/item/:id_usuario",authenticate,createDetalleVenta);



export default router;
