import { getUserBySupabaseId, registrarUsuario } from "../models/UserModel.js";

export const getUserBySupabaseid = async (req, res, next) => {
  const { id_auth_supabase } = req.params;
  try {
    const response = await getUserBySupabaseId(id_auth_supabase);
    res.status(200).json(response);
  } catch (error) {
    next(error);
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
