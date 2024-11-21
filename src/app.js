import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

// import cartRoutes from "./routes/cartRoutes.js"
// import paymentRoutes from "./routes/paymentRoutes.js"
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.DB_PORT || 3000;
app.use(cors()); // cors
app.use(helmet()); //seguridad en headear y otras cosas más.
app.use(bodyParser.json()); //parsear a json
app.use(errorHandler);
app.use("/api/auth", authRoutes);

// app.use("/api/cart",cartRoutes);

// app.use("/api/auth",paymentRoutes);

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server inicializando en el puerto: ${PORT}`);
});
