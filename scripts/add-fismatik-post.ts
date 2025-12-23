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

const post = {
  title: "FişMatik ile Bütçe Kontrolü: Başlangıç Rehberi",
  slug: "fismatik-baslangic-rehberi",
  excerpt:
    "Harcamalarınızın nereye gittiğini bilmiyor musunuz? FişMatik ile 3 adımda bütçenizi yönetmeye başlayın. İşte başlangıç rehberiniz.",
  category: "Rehber",
  image_url: "/apps/fismatik/logo.png",
  author: "KF Software Team",
  is_published: true,
  tags: ["FişMatik", "Bütçe", "Rehber", "Finans"],
  content: `
        <p class="lead">Para biriktirmenin ve ekonomik özgürlüğün ilk kuralı, paranın nereye gittiğini bilmektir. FişMatik, bu süreci sizin için otomatize eder.</p>
        
        <h2>1. İlk Fişinizi Taratın</h2>
        <p>FişMatik'in en güçlü özelliği <strong>OCR (Optik Karakter Tanıma)</strong> teknolojisidir. Marketten veya restorandan aldığınız fişi çöpe atmadan önce uygulamanın kamerasını açın ve fotoğrafını çekin.</p>
        <ul>
            <li>Tutar otomatik algılanır.</li>
            <li>Mağaza adı ve tarih otomatik kaydedilir.</li>
            <li>Size sadece onayla demek kalır.</li>
        </ul>

        <h2>2. Kategorilerinizi Düzenleyin</h2>
        <p>Harcamalarınızı doğru kategorize etmek, "Ay sonunda param nereye gitti?" sorusunun cevabıdır. FişMatik'te varsayılan olarak gelen kategorileri kullanabilir veya kendinize özel olanları ekleyebilirsiniz.</p>
        <blockquote>
            Öneri: "Zorunlu" (Kira, Fatura) ve "Keyfi" (Kahve, Dışarıda Yemek) harcamalarınızı ayırmak, tasarruf yapabileceğiniz alanları görmenizi sağlar.
        </blockquote>

        <h2>3. Aylık Limit Belirleyin</h2>
        <p>Uygulama ayarlarından kendinize bir aylık harcama hedefi koyun. FişMatik, bu limite yaklaştığınızda sizi uyarır. Böylece ayın ortasında sürprizlerle karşılaşmazsınız.</p>

        <h2>Sonuç</h2>
        <p>Bütçe yapmak kısıtlanmak değil, paranızı yönetmektir. FişMatik ile bugün başlayın, yarın daha rahat edin.</p>
    `,
};

async function main() {
  console.log("Inserting post...");
  const { data, error } = await supabase
    .from("posts")
    .upsert(post, { onConflict: "slug" })
    .select();

  if (error) {
    console.error("Error inserting post:", error);
  } else {
    console.log("Success! Post inserted:", data[0].title);
    console.log("Check it out at: /blog/read?slug=" + post.slug);
  }
}

main();
