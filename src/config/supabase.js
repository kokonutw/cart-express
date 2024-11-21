import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

//Conexión con supabase

const supabaseUrl =
  process.env.SUPABASE_URL || "https://rrqemquwwnqlfydbjkbk.supabase.co";
const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJycWVtcXV3d25xbGZ5ZGJqa2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3MDIxNjUsImV4cCI6MjA0NzI3ODE2NX0.DxxvxnK8SLAUAaJDLwunEIQ6Kl9Rj6V_mxr0LcVo9Fk";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("SUPABASE_URL y SUPABASE_ANON_KEY son obligatorios.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
