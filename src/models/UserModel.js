import { pool } from "../config/db.js";

const tabla = "users";
//Necesitara el id de supabase que tenemos almacenados en nuestra base de datos.
export const getRolUser = async (idSupabase) => {
  const { rows } = await pool.query(
    "SELECT role FROM users where users.id_auth_supabase = $1",
    [idSupabase]
  );
  console.log(rows);

  return rows[0]?.role;
};

export const getUserBySupabaseId = async (idAuthSupabase) => {
  const { rows } = await pool.query(
    "SELECT * FROM users where id_auth_supabase = $1",
    [idAuthSupabase]
  );
  return rows;
};

export const registrarUsuario = async ({role,id_auth_supabase,name}) => {
  const { rows } = await pool.query(
    `INSERT INTO ${tabla} (role,id_auth_supabase,name) VALUES ($1,$2,$3) RETURNING *`,
    [role,id_auth_supabase,name]
  );

  return rows[0];
};
