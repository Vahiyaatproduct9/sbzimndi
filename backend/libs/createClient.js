import { configDotenv } from "dotenv";
configDotenv();
import { createClient } from "@supabase/supabase-js";

export default createClient(process.env.supabaseUrl, process.env.supabaseKey);
