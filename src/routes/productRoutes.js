import express from "express";
const router = express.Router();

import {
  getProducts,
  deleteProducto,
  getProductById,
  registerProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import { authenticate } from "../middleware/authenticate.js";
import { isAdmin } from "../middleware/isAdmin.js";

router.get("/", getProducts);
router.get("/:id", getProductById);

//Estas rutas necesitaran que el header este el token del usuario ya que se verificaran en el middleware
router.post("/", authenticate, isAdmin, registerProduct);
router.put("/:id", authenticate, isAdmin, updateProduct);
router.delete("/:id", authenticate, isAdmin, deleteProducto);

export default router;
