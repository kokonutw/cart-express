import { getUserBySupabaseId, registrarUsuario } from "../models/UserModel.js";

export const getUserBySupabaseid = async (req, res, next) => {
  const { id_auth_supabase } = req.params;

  // Verificar si el parámetro existe
  if (!id_auth_supabase) {
    return res.status(400).json({ error: "id_auth_supabase es obligatorio" });
  }

  try {
    console.log("Buscando usuario con id_auth_supabase:", id_auth_supabase);

    const response = await getUserBySupabaseId(id_auth_supabase);

    if (!response) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error al obtener usuario:", error.message);
    next(error); // Pasa el error al manejador global de errores
  }
};

export const registrarUser = async (req, res, next) => {
  const { role, id_auth_supabase, name } = req.body;
  try {
    const response = await registrarUsuario(role, id_auth_supabase, name);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
