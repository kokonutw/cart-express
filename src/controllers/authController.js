import { supabase } from "../config/supabase.js";
import { registrarUsuario } from "../models/UserModel.js";
//import { registrarUser } from "../controllers/userController.js";

export const signUpNewEmail = async (req, res) => {
  //Del body pedimos un email y password
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ user: data.user });
  //Crear un usuario en la bd
  const create_user_json = {
    role: "usuario",
    id_auth_supabase: data.user.id,
    name: "baqua",
  };
  const { role, id_auth_supabase, name } = create_user_json;
  //Podemos enviarlo al model y se crearia sin problemas, pero si fuera al controllador, se necesitar enviarle un body y seria trabajazo.
  //await registrarUser(role, id_auth_supabase, name);
  await registrarUsuario(role, id_auth_supabase, name);
};

export const signInWithEmail = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ session: data.session });
};
