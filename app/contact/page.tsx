import { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim | KF Software Türkiye",
  description:
    "Bizimle iletişime geçin. Projeleriniz, destek talepleriniz veya iş birlikleri için buradayız.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              İletişim
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Sorularınız, projeleriniz veya sadece merhaba demek için bize ulaşın.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info Card */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col gap-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  E-posta
                </h3>
                <p className="text-slate-600 mb-2">Genel sorular ve destek için:</p>
                <a
                  href="mailto:info@kfsoftware.app"
                  className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  info@kfsoftware.app
                </a>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Konum
                </h3>
                <p className="text-slate-600 text-lg">
                  İstanbul, Türkiye
                  <br />
                  <span className="text-sm opacity-75">Remote-First Teknoloji Şirketi</span>
                </p>
              </div>
            </div>

            {/* Support Card Links */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4">Destek mi lazım?</h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Mevcut ürünlerimizle ilgili teknik sorunlar veya yardım talepleri için destek
                  sayfamızı kullanın. Size daha hızlı yardımcı olabiliriz.
                </p>
              </div>

              <a
                href="/support"
                className="inline-flex items-center justify-center px-6 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-gray-100 transition-all w-full md:w-auto"
              >
                Destek Talebi Oluştur
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
