import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Manual env loader
const loadEnv = () => {
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    const envFile = fs.readFileSync(envPath, "utf8");
    const envVars: Record<string, string> = {};
    envFile.split("\n").forEach((line) => {
      const [key, value] = line.split("=");
      if (key && value) {
        envVars[key.trim()] = value.trim().replace(/"/g, "");
      }
    });
    return envVars;
  } catch (e) {
    console.error("Could not read .env.local", e);
    return {};
  }
};

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("Deleting post...");
  const { error } = await supabase.from("posts").delete().eq("slug", "fismatik-baslangic-rehberi");

  if (error) {
    console.error("Error deleting post:", error);
  } else {
    console.log("Success! Post deleted.");
  }
}

main();
