import { supabase } from "../config/supabase.js";

export const signUpNewEmail = async (req, res) => {
  //Del body pedimos un email y password
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ user: data.user });
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
