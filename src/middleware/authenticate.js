import { supabase } from "../config/supabase.js";

export const authenticate = async (req, res, next) => {
  //Requerir el token
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  //Esto nos retorna el .getUser
  //Sobreescribi user con data,  {user,error} -> { data: {user}, error}
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(405).json({ error: "Unauthorized" });
  }

  req.user = user;

  next(); //Para que vaya al siguiente middleware
};
