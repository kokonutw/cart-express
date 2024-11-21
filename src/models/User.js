import { pool } from "../config/db.js";

//Necesitara el id de supabase que tenemos almacenados en nuestra base de datos.
export const getRolUser = async (idSupabase) => {
  const { rows } = await pool.query(
    "SELECT role FROM users where users.id_auth_supabase = $1",
    [idSupabase]
  );
  console.log(rows);

  return rows[0]?.role;
};
