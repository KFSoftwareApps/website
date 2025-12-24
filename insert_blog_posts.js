
const { createClient } = require('@supabase/supabase-js');

// Supabase credentials (from .env.local usually, but need to be set here for script)
// Note: In a real environment, use environment variables. 
// Assuming user has these in their environment or I can ask them to run it with env vars.
// For now, I will assume the user will run this in a context where I can't see env vars directly easily without `dotenv`.
// I will try to read from .env.local if possible or ask user. 
// Actually, better approach: Create the script to read .env.local content if it exists.


const fs = require('fs');
const path = require('path');

// Manually read .env.local if dotenv is missing
try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                process.env[match[1].trim()] = match[2].trim();
            }
        });
    }
} catch (e) {
    console.warn("Could not read .env.local", e);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase credentials missing in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const posts = [
    {
        title: "Excel ile Puantaj Tutmanın Gizli Maliyeti: Neden Mobil Uygulamaya Geçmelisiniz?",
        slug: "excel-ile-puantaj-tutmanin-zararlari-mobil-uygulama-avantajlari",
        language: "tr",
        category: "Puantaj",
        excerpt: "Kağıt kalem ve Excel tabloları arasında kaybolmayın. PuantajX ile şantiye yönetimini dijitalleştirin, hataları sıfıra indirin ve hakedişleri saniyeler içinde hesaplayın.",
        content: `
      <h2>Excel ve Kağıt: Şantiyenin Gizli Düşmanları</h2>
      <p>İnşaat sektöründe yıllardır süregelen bir alışkanlık var: Şantiye şefi cebindeki deftere not alır, akşam olunca bunları Excel'e geçer (veya geçmeyi unutur), ay sonu geldiğinde ise muhasebe departmanı bu karmaşık notları anlamlandırmaya çalışır.</p>
      <p>Bu "geleneksel" yöntemin size kaybettirdiklerini hiç düşündünüz mü?</p>
      
      <h3>1. Kayıp Zaman ve İş Gücü</h3>
      <p>Her gün puantaj verilerini Excel'e girmek, formülleri kontrol etmek ve hataları düzeltmek için harcanan saatler... PuantajX ile tüm bu süreç sadece saniyeler sürer. Personel QR kod ile giriş yapar veya şantiye şefi tek tıkla tüm ekibi "Geldi" olarak işaretler.</p>

      <h3>2. Hatalı Hakediş Hesaplamaları</h3>
      <p>Excel'de bir hücredeki yanlış formül, tüm hakediş hesabını altüst edebilir. Fazla mesai çarpanları, avans kesintileri ve pazar mesaileri manuel hesaplandığında hata riski %40'lara kadar çıkmaktadır. PuantajX, tanımladığınız kurallara göre (örneğin Pazar günü mesaisi x1.5) hakedişi **otomatik ve hatasız** hesaplar.</p>

      <h3>3. Veri Güvenliği ve Arşivleme Sorunu</h3>
      <p>"O dosya hangi bilgisayardaydı?", "Bilgisayar çöktü, veriler gitti!" gibi sorunlar tarih oluyor. Verileriniz bulutta güvenle saklanır, telefonunuz bozulsa bile bilgileriniz kaybolmaz. Ayrıca geriye dönük raporlara istediğiniz an ulaşabilirsiniz.</p>

      <h3>4. Anlık Raporlama Eksikliği</h3>
      <p>Patron "Bugün şantiyede kaç kişi var?" diye sorduğunda Excel dosyasını açıp saymak mı? Yoksa PuantajX uygulamasını açıp anlık olarak "Şu an sahada 45 usta, 3 mühendis çalışıyor" diyebilmek mi? Karar sizin.</p>

      <h2>Çözüm: PuantajX ile Dijital Dönüşüm</h2>
      <p>PuantajX sadece bir puantaj uygulaması değildir; şantiyenizin dijital hafızasıdır.</p>
      <ul>
        <li>✅ <strong>Fotoğraflı Günlük Rapor:</strong> Yapılan imalatın fotoğrafını çekin, rapora ekleyin.</li>
        <li>✅ <strong>Konum Doğrulama:</strong> Personel gerçekten şantiyede mi? GPS ile doğrulayın.</li>
        <li>✅ <strong>Excel/PDF Dışa Aktarım:</strong> Tek tıkla resmi hakediş raporunu oluşturun ve WhatsApp'tan paylaşın.</li>
      </ul>

      <p>Excel tabloları arasında boğulmak yerine, işinizi büyütmeye odaklanın. <strong>PuantajX'i hemen ücretsiz indirin ve farkı görün.</strong></p>
    `,
        image_url: "/blog/excel-vs-app.png",
        is_published: true,
        published_at: new Date().toISOString(),
        display_order: 1
    },
    {
        title: "The Hidden Cost of Excel Timesheets: Why You Should Switch to a Mobile App",
        slug: "hidden-cost-of-excel-timesheets-switch-to-mobile",
        language: "en",
        category: "Construction",
        excerpt: "Stop getting lost in paper notes and Excel sheets. Digitalize your construction site management with PuantajX, eliminate errors, and calculate accruals in seconds.",
        content: `
      <h2>Excel and Paper: The Construction Site's Hidden Enemies</h2>
      <p>There's a habit that has persisted in the construction industry for years: The site manager takes notes in a pocket notebook, transfers them to Excel in the evening (or forgets to), and at the end of the month, the accounting department tries to make sense of these scattered notes.</p>
      <p>Have you ever thought about what this "traditional" method is costing you?</p>
      
      <h3>1. Lost Time and Labor</h3>
      <p>The hours spent every day entering timesheet data into Excel, checking formulas, and fixing errors... With PuantajX, this entire process takes just seconds. Staff check in via QR code, or the site manager marks the whole team as "Present" with a single click.</p>

      <h3>2. Incorrect Payroll Calculations</h3>
      <p>A wrong formula in a single Excel cell can mess up the entire payroll calculation. When overtime multipliers, advance deductions, and weekend shifts are calculated manually, the error risk rises up to 40%. PuantajX calculates accruals **automatically and flawlessly** based on the rules you define (e.g., Sunday overtime x1.5).</p>

      <h3>3. Data Security and Archiving Issues</h3>
      <p>"Which computer was that file on?", "The computer crashed, data is gone!" problems are history. Your data is securely stored in the cloud; even if your phone breaks, your information is safe. Plus, you can access historical reports instantly.</p>

      <h3>4. Lack of Instant Reporting</h3>
      <p>When the boss asks "How many people are on site today?", do you want to open an Excel file and count? Or open the PuantajX app and instantly say "Right now, there are 45 workers and 3 engineers on site"? The choice is yours.</p>

      <h2>The Solution: Digital Transformation with PuantajX</h2>
      <p>PuantajX is not just a timesheet app; it is the digital memory of your construction site.</p>
      <ul>
        <li>✅ <strong>Photo Daily Reports:</strong> Take a photo of the completed work and add it to the report.</li>
        <li>✅ <strong>Location Verification:</strong> Is the staff really on site? Verify with GPS.</li>
        <li>✅ <strong>Excel/PDF Export:</strong> Create the official payroll report with one click and share via WhatsApp.</li>
      </ul>

      <p>Instead of drowning in Excel sheets, focus on growing your business. <strong>Download PuantajX for free now and see the difference.</strong></p>
    `,
        image_url: "/blog/excel-vs-app.png",
        is_published: true,
        published_at: new Date().toISOString(),
        display_order: 1
    }
];

async function insertPosts() {
    for (const post of posts) {
        const { data: existing } = await supabase.from('posts').select('id').eq('slug', post.slug).single();

        if (existing) {
            console.log(`Updating post: ${post.title}`);
            const { error } = await supabase.from('posts').update(post).eq('id', existing.id);
            if (error) console.error(error);
        } else {
            console.log(`Inserting post: ${post.title}`);
            const { error } = await supabase.from('posts').insert(post);
            if (error) console.error(error);
        }
    }
    console.log("Done!");
}

insertPosts();
