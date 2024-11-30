import { supabase } from "../config/supabase.js";

export const authenticate = async (req, res, next) => {
  try {
    // Obtener el token del encabezado Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Token no proporcionado o inválido" });
    }

    const token = authHeader.split(" ")[1];

    // Verificar el usuario con Supabase
    //Esto nos retorna el .getUser
    //Sobreescribi user con data,  {user,error} -> { data: {user}, error}
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Usuario no autorizado" });
    }

    // Asignar usuario al objeto req para el siguiente middleware
    req.user = user;

    next(); // Continuar al siguiente middleware o controlador
  } catch (err) {
    console.error("Error en el middleware de autenticación:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
