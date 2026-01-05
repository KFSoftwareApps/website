"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, X } from "lucide-react";
import { cn } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useTranslation } from "@/lib/i18n";

interface TermsClientProps {
  initialLang?: "tr" | "en";
}

function TermsContent({ initialLang }: TermsClientProps) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("app") === "puantajx" ? "puantajx" : "fismatik";
  const { locale, setLocale } = useTranslation();

  // If initialLang is provided, it takes priority and updates the global locale
  const currentLang = initialLang || locale;

  const isEnglish = currentLang === "en";

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {isEnglish ? "Terms of Service" : "Kullanım Şartları"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <Link
                href={`/terms/tr/?app=${activeTab}`}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                  !isEnglish ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                TR
              </Link>
              <Link
                href={`/terms/en/?app=${activeTab}`}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                  isEnglish ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                EN
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <Link
            href={initialLang ? `/terms/${initialLang}?app=fismatik` : "/terms?app=fismatik"}
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
            href={initialLang ? `/terms/${initialLang}?app=puantajx` : "/terms?app=puantajx"}
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
                  {isEnglish
                    ? "This terms applies to the FişMatik application."
                    : "Bu şartlar FişMatik uygulaması için geçerlidir."}
                </p>
              </div>
              <p>
                <strong>{isEnglish ? "Last Updated:" : "Son Güncelleme:"}</strong>{" "}
                {isEnglish ? "January 4, 2026" : "4 Ocak 2026"}
              </p>

              {isEnglish ? (
                <>
                  <h3>1. Service Description</h3>
                  <p>
                    FişMatik is a comprehensive financial management app offering expense tracking,
                    receipt scanning, subscription detection, AI-powered budget forecasting, and
                    location-based price comparison (Shopping Guide).
                  </p>

                  <h3>2. Account Creation</h3>
                  <ul>
                    <li>You must be at least 13 years old to use the application.</li>
                    <li>
                      You agree to provide accurate, current, and complete information during
                      registration.
                    </li>
                    <li>
                      You are entirely responsible for account security and password
                      confidentiality.
                    </li>
                    <li>You are responsible for all activities occurring under your account.</li>
                  </ul>

                  <h3>3. Subscriptions and Payments</h3>
                  <p>
                    <strong>Subscription Fees:</strong> Prices and features are specified on the
                    relevant screen. Payments are charged to your App Store account at purchase
                    confirmation.
                  </p>
                  <p>
                    <strong>Auto-Renewal:</strong> Your subscription automatically renews unless
                    auto-renew is turned off at least 24 hours before the end of the current period.
                  </p>
                  <p>
                    <strong>Renewal Fee:</strong> Your account will be charged for renewal within 24
                    hours prior to the end of the period.
                  </p>
                  <p>
                    <strong>Management and Cancellation:</strong> You can manage and cancel your
                    subscriptions at any time via App Store Account Settings.
                  </p>
                  <p>
                    <strong>Unused Periods:</strong> No refunds are provided for periods cancelled
                    during an active subscription term.
                  </p>

                  <h4>Package Details:</h4>
                  <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div className="border rounded-xl p-4 bg-gray-50">
                      <div className="font-bold text-gray-900">Free ($0)</div>
                      <div className="text-sm text-gray-600">
                        1 receipt scan/day, 20 manual entries/month.
                      </div>
                    </div>
                    <div className="border rounded-xl p-4 bg-gray-50">
                      <div className="font-bold text-gray-900">Standard ($1.99 / Month)</div>
                      <div className="text-sm text-gray-600">
                        10 scans/day, 50 manual entries, ad-free, reports.
                      </div>
                    </div>
                    <div className="border rounded-xl p-4 bg-purple-50 border-purple-100">
                      <div className="font-bold text-purple-900">Premium ($2.99 / Month)</div>
                      <div className="text-sm text-purple-800 overflow-hidden">
                        25 scans/day, 100 manual entries, AI Financial Coach, Smart Forecasts.
                      </div>
                    </div>
                    <div className="border rounded-xl p-4 bg-blue-50 border-blue-100">
                      <div className="font-bold text-blue-900">Family Economy ($3.49 / Month)</div>
                      <div className="text-sm text-blue-800">
                        35 scans/day (Total), 200 manual entries, Family Sharing (5 persons).
                      </div>
                    </div>
                  </div>

                  <h3>4. Usage Rules</h3>
                  <p>
                    <strong>Allowed:</strong> Personal expense tracking, Receipt digitization,
                    Budget management.
                  </p>
                  <p>
                    <strong>Prohibited:</strong> Commercial use (unauthorized), Manipulating the
                    system, Uploading fake receipts or data, Spam or automated bot use.
                  </p>

                  <h3>5. Disclaimer</h3>
                  <p>
                    You use the application at your own risk. We are not responsible for your
                    financial decisions. We do not provide tax or accounting advice. OCR and AI
                    analysis may not be 100% accurate.
                  </p>

                  <h3>8. Cancellation Policy</h3>
                  <p>
                    You can cancel your subscription at any time through your App Store settings.
                    The cancellation will be effective from the next billing period.
                  </p>
                </>
              ) : (
                <>
                  <h3>1. Hizmet Tanımı</h3>
                  <p>
                    FişMatik; harcama takibi, fiş/fatura tarama, abonelik tespiti, yapay zeka
                    destekli bütçe tahminleme ve konum bazlı ürün fiyat karşılaştırması (Alışveriş
                    Rehberi) hizmetlerini sunan kapsamlı bir finansal yönetim uygulamasıdır.
                  </p>

                  <h3>2. Hesap Oluşturma</h3>
                  <ul>
                    <li>Uygulamayı kullanmak için en az 13 yaşında olmalısınız.</li>
                    <li>
                      Kayıt sırasında doğru, güncel ve eksiksiz bilgiler sağlamayı kabul edersiniz.
                    </li>
                    <li>
                      Hesap güvenliğinizden ve şifrenizin gizliliğinden tamamen siz sorumlusunuz.
                    </li>
                    <li>Hesabınızda gerçekleşen tüm aktivitelerden siz sorumlu tutulursunuz.</li>
                  </ul>

                  <h3>3. Abonelikler ve Ödemeler</h3>
                  <p>
                    <strong>Abonelik Ücretleri:</strong> Mevcut paketlerin fiyatları ve özellikleri
                    ilgili ekranda belirtilmiştir. Ödemeler, satın alma onayında App Store
                    hesabınızdan tahsil edilir.
                  </p>
                  <p>
                    <strong>Otomatik Yenileme:</strong> Mevcut dönemin bitiminden en az 24 saat önce
                    otomatik yenileme kapatılmadığı sürece aboneliğiniz otomatik olarak yenilenir.
                  </p>
                  <p>
                    <strong>Yenileme Ücreti:</strong> Dönem bitimine 24 saat kala hesabınızdan
                    yenileme ücreti tahsil edilir.
                  </p>
                  <p>
                    <strong>İptal ve Yönetim:</strong> Aboneliklerinizi App Store Hesap Ayarları
                    üzerinden yönetebilir ve istediğiniz zaman iptal edebilirsiniz.
                  </p>
                  <p>
                    <strong>Kullanılmayan Süreler:</strong> Aktif abonelik dönemi içinde iptal edilen
                    süreler için para iadesi yapılmamaktadır.
                  </p>

                  <h4>Paket Detayları:</h4>
                  <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div className="border rounded-xl p-4 bg-gray-50">
                      <div className="font-bold text-gray-900">Ücretsiz (0 TL)</div>
                      <div className="text-sm text-gray-600">Günlük 1 fiş tarama, 20 manuel giriş.</div>
                    </div>
                    <div className="border rounded-xl p-4 bg-gray-50">
                      <div className="font-bold text-gray-900">Standart (49.99 TL / Ay)</div>
                      <div className="text-sm text-gray-600">
                        Günlük 10 fiş tarama, 50 manuel giriş, reklamsız deneyim, raporlar.
                      </div>
                    </div>
                    <div className="border rounded-xl p-4 bg-purple-50 border-purple-100">
                      <div className="font-bold text-purple-900">Premium (79.99 TL / Ay)</div>
                      <div className="text-sm text-purple-800">
                        Günlük 25 fiş tarama, 100 manuel giriş, AI Finans Koçu, Akıllı Tahminler.
                      </div>
                    </div>
                    <div className="border rounded-xl p-4 bg-blue-50 border-blue-100">
                      <div className="font-bold text-blue-900">Aile Ekonomisi (99.99 TL / Ay)</div>
                      <div className="text-sm text-blue-800">
                        Günlük 35 fiş tarama (Toplam), 200 manuel giriş, Aile Paylaşımı (5 kişi).
                      </div>
                    </div>
                  </div>

                  <h3>4. Kullanım Kuralları</h3>
                  <p>
                    <strong>İzin Verilen:</strong> Kişisel harcama takibi, Fiş dijitalleştirme, Bütçe
                    yönetimi.
                  </p>
                  <p>
                    <strong>Yasak:</strong> Ticari amaçlı kullanım (izinsiz), Sistemi manipüle etme,
                    Sahte fiş veya veri yükleme, Spam veya otomatik bot kullanımı.
                  </p>

                  <h3>5. Sorumluluk Reddi</h3>
                  <p>
                    Uygulamayı kendi riskinizle kullanırsınız. Mali kararlarınızdan biz sorumlu
                    değiliz. Vergi veya muhasebe danışmanlığı sağlamıyoruz. OCR ve AI analizi %100
                    doğru olmayabilir.
                  </p>

                  <h3>8. İptal Politikası</h3>
                  <p>
                    Aboneliğinizi dilediğiniz zaman App Store ayarlarınızdan iptal edebilirsiniz.
                    İptal işlemi, bir sonraki fatura döneminden itibaren geçerli olacaktır.
                  </p>
                </>
              )}
            </div>
          )}

          {/* PuantajX Terms */}
          {activeTab === "puantajx" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-8">
                <p className="text-sm text-blue-800 m-0 font-medium">
                  {isEnglish
                    ? "This terms applies to the PuantajX application."
                    : "Bu şartlar PuantajX uygulaması için geçerlidir."}
                </p>
              </div>
              <p>
                <strong>{isEnglish ? "Last Updated:" : "Son Güncelleme:"}</strong>{" "}
                {isEnglish ? "December 21, 2025" : "21 Aralık 2025"}
              </p>

              <h3>{isEnglish ? "1. Use of Service" : "1. Hizmetin Kullanımı"}</h3>
              <p>
                {isEnglish
                  ? "PuantajX is software developed to simplify construction and personnel management processes. You agree to use the application only for lawful purposes."
                  : "PuantajX, inşaat ve personel yönetim süreçlerini kolaylaştırmak amacıyla geliştirilmiş bir yazılımdır. Uygulamayı yalnızca yasal amaçlar için kullanmayı kabul edersiniz."}
              </p>

              <h3>{isEnglish ? "2. Account Security" : "2. Hesap Güvenliği"}</h3>
              <ul>
                <li>
                  {isEnglish
                    ? "You are responsible for the security of your account information."
                    : "Hesap bilgilerinizin güvenliğinden siz sorumlusunuz."}
                </li>
                <li>
                  {isEnglish
                    ? "You are held responsible for all actions occurring under your account."
                    : "Hesabınız altında gerçekleşen tüm işlemlerden siz sorumlu tutulursunuz."}
                </li>
              </ul>

              <h3>{isEnglish ? "3. Intellectual Property" : "3. Fikri Mülkiyet"}</h3>
              <p>
                {isEnglish
                  ? "The design, logo, code, and content of the application belong to KF Software."
                  : "Uygulamanın tasarımı, logosu, kodları ve içeriği KF Software'e aittir."}
              </p>

              <h3>{isEnglish ? "4. Disclaimer" : "4. Sorumluluk Reddi"}</h3>
              <p>
                {isEnglish
                  ? 'The application is provided "as is". We do not guarantee error-free operation. Accuracy of data recorded (timesheets, debt/credit etc.) is the user\'s responsibility.'
                  : 'Uygulama "olduğu gibi" sunulmaktadır. Yazılımın hatasız çalışacağına dair bir garanti vermemekteyiz. Kaydedilen verilerin doğruluğu kullanıcının sorumluluğundadır.'}
              </p>

              <h3>{isEnglish ? "5. Contact" : "5. İletişim"}</h3>
              <p>
                {isEnglish ? "For questions:" : "Sorularınız için:"}
                <br />
                <strong>Email:</strong> <a href="mailto:info@kfsoftware.app">info@kfsoftware.app</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TermsClient({ initialLang }: TermsClientProps) {
  return (
    <Suspense fallback={<div className="py-24 text-center">Yükleniyor...</div>}>
      <TermsContent initialLang={initialLang} />
    </Suspense>
  );
}

