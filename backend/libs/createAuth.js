import { configDotenv } from "dotenv";
configDotenv({
  quiet: true,
});
import { createClient } from "@supabase/supabase-js";

export default createClient(process.env.supabaseUrl, process.env.supabaseSso);
