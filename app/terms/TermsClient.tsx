"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, X } from "lucide-react";
import { cn } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function TermsContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("app") === "puantajx" ? "puantajx" : "fismatik";

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Kullanım Şartları
          </h1>
          <Link href="/">
            <Button variant="ghost">Ana Sayfaya Dön</Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <Link
            href="/terms?app=fismatik"
            className={cn(
              "pb-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === "fismatik"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            FişMatik
          </Link>
          <Link
            href="/terms?app=puantajx"
            className={cn(
              "pb-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === "puantajx"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            PuantajX
          </Link>
        </div>

        <div className="prose prose-blue max-w-none text-gray-600">
          {/* FişMatik Terms */}
          {activeTab === "fismatik" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-8">
                <p className="text-sm text-blue-800 m-0 font-medium">
                  Bu şartlar <strong>FişMatik</strong> uygulaması için geçerlidir.
                </p>
              </div>
              <p>
                <strong>Son Güncelleme:</strong> 26 Kasım 2025
              </p>
              {/* ... FişMatik content structure from previous version ... */}
              <h3>1. Hizmet Tanımı</h3>
              <p>
                FişMatik, kullanıcıların alışveriş fişlerini tarayıp dijitalleştirmelerine,
                harcamalarını takip etmelerine ve bütçe yönetimi yapmalarına olanak sağlayan bir
                mobil uygulamadır.
              </p>

              <h3>2. Hesap Oluşturma</h3>
              <ul>
                <li>13 yaşından büyük olmalısınız</li>
                <li>Geçerli bir e-posta adresi sağlamalısınız</li>
                <li>Doğru ve güncel bilgiler vermelisiniz</li>
                <li>Şifrenizin güvenliğinden siz sorumlusunuz</li>
              </ul>

              <h3>3. Üyelik Seviyeleri</h3>
              <p>İhtiyacınıza uygun paketi seçerek özelliklerden faydalanabilirsiniz.</p>
              {/* Subscription table logic */}
              <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                {/* Free Tier */}
                <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-lg text-gray-900">Ücretsiz</h4>
                    <Badge variant="secondary">0 TL</Badge>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Günlük 1 fiş tarama
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Aylık 20 manuel giriş
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Sınırsız abonelik takibi
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="w-4 h-4 text-gray-400" /> Reklamlı deneyim
                    </li>
                  </ul>
                </div>
                {/* More tiers... */}
                <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-lg text-gray-900">Standart</h4>
                    <Badge variant="outline" className="border-gray-900 text-gray-900 font-bold">
                      49.99 TL / Ay
                    </Badge>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Günlük 10 fiş tarama
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Aylık 50 manuel giriş
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Kategori yönetimi
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />{" "}
                      <strong>Reklamsız deneyim</strong>
                    </li>
                  </ul>
                </div>
                {/* Pro Tier */}
                <div className="border-2 border-purple-600 rounded-2xl p-6 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPÜLER
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-lg text-purple-700">Pro</h4>
                    <Badge className="bg-purple-600 text-white hover:bg-purple-700 border-none">
                      79.99 TL / Ay
                    </Badge>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Günlük 25 fiş tarama
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Aylık 100 manuel giriş
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />{" "}
                      <strong>Reklamsız deneyim</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> AI Koç özelliği
                    </li>
                  </ul>
                </div>

                {/* Family Tier */}
                <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow bg-purple-50 border-purple-100">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-lg text-purple-900">Aile Ekonomisi</h4>
                    <Badge className="bg-purple-600 hover:bg-purple-700">99.99 TL / Ay</Badge>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Günlük 35 fiş tarama (Toplam)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Aylık 200 manuel giriş (Toplam)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Aile üyeleriyle ortak bütçe
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Reklamsız deneyim & AI Koç
                    </li>
                  </ul>
                </div>
              </div>
              <h3>4. Kullanım Kuralları</h3>
              <ul>
                <li>İzin verilenler: Kişisel harcama takibi, fiş dijitalleştirme.</li>
                <li>Yasaklananlar: Ticari amaçlı kullanım, spam veya sahte veri.</li>
              </ul>
              {/* Remaining FişMatik sections... */}
            </div>
          )}

          {/* PuantajX Terms */}
          {activeTab === "puantajx" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-8">
                <p className="text-sm text-blue-800 m-0 font-medium">
                  Bu şartlar <strong>PuantajX</strong> uygulaması için geçerlidir.
                </p>
              </div>
              <p>
                <strong>Son Güncelleme:</strong> 21 Aralık 2025
              </p>

              <p>
                Lütfen PuantajX uygulamasını kullanmadan önce bu Kullanım Şartları'nı ("Şartlar")
                dikkatlice okuyun. Uygulamayı indirerek veya kullanarak bu şartları kabul etmiş
                sayılırsınız.
              </p>

              <h3>1. Hizmetin Kullanımı</h3>
              <p>
                PuantajX, inşaat ve personel yönetim süreçlerini kolaylaştırmak amacıyla
                geliştirilmiş bir yazılımdır. Uygulamayı yalnızca yasal amaçlar için ve yürürlükteki
                yasa ve yönetmeliklere uygun olarak kullanmayı kabul edersiniz. Uygulamanın
                güvenliğini ihlal etmeye veya kaynak kodlarına erişmeye çalışmak yasaktır.
              </p>

              <h3>2. Hesap Güvenliği</h3>
              <ul>
                <li>
                  Hesap bilgilerinizin (kullanıcı adı ve şifre) güvenliğinden siz sorumlusunuz.
                </li>
                <li>
                  Hesabınız altında gerçekleşen tüm işlemlerden siz sorumlu tutulursunuz. Yetkisiz
                  bir kullanım fark ederseniz derhal bize bildirmelisiniz.
                </li>
              </ul>

              <h3>3. Fikri Mülkiyet</h3>
              <p>
                Uygulamanın tasarımı, logosu, kodları ve içeriği KF Software'e aittir ve telif hakkı
                yasalarıyla korunmaktadır. İzinsiz kopyalanamaz veya çoğaltılamaz.
              </p>

              <h3>4. Sorumluluk Reddi (Disclaimer)</h3>
              <p>
                Uygulama "olduğu gibi" ("as is") sunulmaktadır. Yazılımın hatasız veya kesintisiz
                çalışacağına dair bir garanti vermemekteyiz. PuantajX üzerinden kaydedilen verilerin
                (puantaj, borç/alacak vb.) doğruluğu kullanıcının sorumluluğundadır. Veri kaybından
                kaynaklanabilecek ticari zararlardan şirketimiz sorumlu tutulamaz.
              </p>

              <h3>5. Değişiklikler</h3>
              <p>
                Bu şartları zaman zaman güncelleyebiliriz. Değişiklikler uygulama içinde
                yayınlandığı tarihte yürürlüğe girer. Uygulamayı kullanmaya devam etmeniz,
                değişiklikleri kabul ettiğiniz anlamına gelir.
              </p>

              <h3>6. Abonelik ve Ödemeler (Varsa)</h3>
              <p>
                Uygulama içi satın alımlar veya abonelikler söz konusu olduğunda, ödemeler ilgili
                uygulama mağazası (App Store / Google Play) üzerinden işlenir ve o platformun
                kurallarına tabidir.
              </p>

              <h3>7. İletişim</h3>
              <p>
                Bu şartlarla ilgili sorularınız için bize ulaşabilirsiniz:
                <br />
                <strong>E-posta:</strong>{" "}
                <a href="mailto:info@kfsoftware.app">info@kfsoftware.app</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TermsClient() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Yükleniyor...</div>}>
      <TermsContent />
    </Suspense>
  );
}
