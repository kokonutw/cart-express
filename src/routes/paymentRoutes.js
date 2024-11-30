import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  createPayment,
  executePayment,
} from "../controllers/paypalController.js";
const router = express.Router();

//Se verifica si esta authenticado el usuario, necesita el token para hacer un pedido
router.post("/create", authenticate, createPayment);
router.get("/success/:idVenta", authenticate, executePayment);

export default router;
