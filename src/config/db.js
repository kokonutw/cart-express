import pg from "pg";
import fs from "fs";
const { Pool } = pg;
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("src/certs/ca.crt").toString(),
  },
});

//Para verificar la conexión
pool.connect((error, client, release) => {
  if (error) {
    //Stack para saber de que archivo viene el error
    console.log("Error de conexión", error.stack);
  } else {
    console.log("Conexión exitosa");
    release();
  }
});
