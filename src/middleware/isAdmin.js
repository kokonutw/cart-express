import { getRolUser } from "../models/User.js";

export const isAdmin = async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const useRole = await getRolUser(user.id);
    if (useRole !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
