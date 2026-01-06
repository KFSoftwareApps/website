"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useTranslation } from "@/lib/i18n";

interface PrivacyClientProps {
  initialLang?: "tr" | "en";
}

function PrivacyContent({ initialLang }: PrivacyClientProps) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("app") === "puantajx" ? "puantajx" : "fismatik";
  const { locale } = useTranslation();

  // If initialLang is provided, it takes priority
  const currentLang = initialLang || locale;
  const isEnglish = currentLang === "en";

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {isEnglish ? "Privacy Policy" : "Gizlilik Politikası"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <Link
                href={`/privacy/tr/?app=${activeTab}`}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                  !isEnglish ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                TR
              </Link>
              <Link
                href={`/privacy/en/?app=${activeTab}`}
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
            href={initialLang ? `/privacy/${initialLang}/?app=fismatik` : "/privacy?app=fismatik"}
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
            href={initialLang ? `/privacy/${initialLang}/?app=puantajx` : "/privacy?app=puantajx"}
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
          {/* FişMatik Content */}
          {activeTab === "fismatik" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-8">
                <p className="text-sm text-blue-800 m-0 font-medium">
                  {isEnglish
                    ? "This policy applies to the FişMatik application."
                    : "Bu politika FişMatik uygulaması için geçerlidir."}
                </p>
              </div>
              <p>
                <strong>{isEnglish ? "Last Updated:" : "Son Güncelleme:"}</strong>{" "}
                {isEnglish ? "January 6, 2026" : "6 Ocak 2026"}
              </p>

              <h3>{isEnglish ? "1. Information Collected" : "1. Toplanan Bilgiler"}</h3>
              <p>
                {isEnglish
                  ? "When using our application, we collect the following information:"
                  : "Uygulamamızı kullanırken aşağıdaki bilgileri topluyoruz:"}
              </p>
              <ul>
                <li>
                  <strong>{isEnglish ? "Email address:" : "E-posta adresi:"}</strong>{" "}
                  {isEnglish ? "For account creation and authentication" : "Hesap oluşturma ve kimlik doğrulama için"}
                </li>
                <li>
                  <strong>{isEnglish ? "Receipt data:" : "Fiş verileri:"}</strong>{" "}
                  {isEnglish ? "Photos and contents of scanned receipts" : "Taradığınız fişlerin fotoğrafları ve içerikleri"}
                </li>
                <li>
                  <strong>{isEnglish ? "Expense information:" : "Harcama bilgileri:"}</strong>{" "}
                  {isEnglish
                    ? "Expense records, categories, and amounts you add"
                    : "Eklediğiniz harcama kayıtları, kategoriler ve tutarlar"}
                </li>
                <li>
                  <strong>{isEnglish ? "Location Data:" : "Konum Bilgileri:"}</strong>{" "}
                  {isEnglish
                    ? "If you permit, we collect your location to show stores near you in the 'Shopping Guide' and offer regional price comparisons."
                    : "İzin vermeniz durumunda, 'Alışveriş Rehberi' özelliğinde size en yakın mağazaları göstermek ve bölgesel fiyat karşılaştırmaları sunmak için konum bilginizi topluyoruz."}
                </li>
                <li>
                  <strong>{isEnglish ? "Usage data:" : "Kullanım verileri:"}</strong>{" "}
                  {isEnglish ? "In-app activities and preferences" : "Uygulama içi aktiviteler ve tercihler"}
                </li>
              </ul>

              <h3>{isEnglish ? "2. Use of Information" : "2. Bilgilerin Kullanımı"}</h3>
              <p>
                {isEnglish
                  ? "We use the collected information for the following purposes:"
                  : "Topladığımız bilgileri şu amaçlarla kullanıyoruz:"}
              </p>
              <ul>
                <li>{isEnglish ? "Create and manage your account" : "Hesabınızı oluşturmak ve yönetmek"}</li>
                <li>{isEnglish ? "Provide receipt scanning and analysis services" : "Fiş tarama ve analiz hizmeti sağlamak"}</li>
                <li>{isEnglish ? "Offer expense tracking and reporting features" : "Harcama takibi ve raporlama özellikleri sunmak"}</li>
                <li>{isEnglish ? "Provide location-based store and price comparison (Shopping Guide)" : "Konum bazlı mağaza ve fiyat karşılaştırması sunmak (Alışveriş Rehberi)"}</li>
                <li>{isEnglish ? "Improve and enhance the application" : "Uygulamayı geliştirmek ve iyileştirmek"}</li>
              </ul>

              <h3>{isEnglish ? "3. Data Sharing" : "3. Veri Paylaşımı"}</h3>
              <p>
                {isEnglish
                  ? "We may share your information with third parties in the following cases:"
                  : "Bilgilerinizi üçüncü taraflarla şu durumlarda paylaşabiliriz:"}
              </p>
              <ul>
                <li>
                  <strong>Supabase:</strong> {isEnglish ? "Data storage and authentication" : "Veri depolama ve kimlik doğrulama"}
                </li>
                <li>
                  <strong>Google Cloud Vision API:</strong> {isEnglish ? "Receipt OCR" : "Fiş OCR"}
                </li>
                <li>
                  <strong>OpenAI/Gemini:</strong> {isEnglish ? "Receipt analysis" : "Fiş analizi"}
                </li>
                <li>
                  <strong>Google AdMob:</strong> {isEnglish ? "Ad serving" : "Reklam gösterimi"}
                </li>
                <li>
                  <strong>App Store / Play Store:</strong> {isEnglish ? "Subscription and payment processing" : "Abonelik ve ödeme işlemleri"}
                </li>
              </ul>

              <h3>{isEnglish ? "4. Data Security" : "4. Veri Güvenliği"}</h3>
              <p>{isEnglish ? "We take the following measures to protect your data:" : "Verilerinizi korumak için şu önlemleri alıyoruz:"}</p>
              <ul>
                <li>{isEnglish ? "SSL/TLS encryption for data transmission" : "SSL/TLS şifreleme ile veri iletimi"}</li>
                <li>{isEnglish ? "Secure cloud infrastructure (Supabase)" : "Güvenli bulut altyapısı (Supabase)"}</li>
                <li>{isEnglish ? "Regular security updates" : "Düzenli güvenlik güncellemeleri"}</li>
                <li>{isEnglish ? "Access control and authentication" : "Erişim kontrolü ve kimlik doğrulama"}</li>
              </ul>

              <h3>{isEnglish ? "5. User Rights" : "5. Kullanıcı Hakları"}</h3>
              <p>{isEnglish ? "You have the following rights:" : "Aşağıdaki haklara sahipsiniz:"}</p>
              <ul>
                <li>
                  <strong>{isEnglish ? "Right to access:" : "Erişim hakkı:"}</strong>{" "}
                  {isEnglish ? "You can request access to your data" : "Verilerinize erişim talep edebilirsiniz"}
                </li>
                <li>
                  <strong>{isEnglish ? "Right to rectification:" : "Düzeltme hakkı:"}</strong>{" "}
                  {isEnglish ? "You can correct incorrect information" : "Yanlış bilgileri düzeltebilirsiniz"}
                </li>
                <li>
                  <strong>{isEnglish ? "Right to deletion:" : "Silme hakkı:"}</strong>{" "}
                  {isEnglish ? "You can delete your account and data (via Profile > Delete Account)" : "Hesabınızı ve verilerinizi silebilirsiniz (Profil > Hesabı Sil)"}
                </li>
                <li>
                  <strong>{isEnglish ? "Right to object:" : "İtiraz hakkı:"}</strong>{" "}
                  {isEnglish ? "You can object to data processing" : "Veri işlemeye itiraz edebilirsiniz"}
                </li>
              </ul>

              <h3>{isEnglish ? "6. Contact" : "6. İletişim"}</h3>
              <p>
                {isEnglish
                  ? "For questions about our privacy policy, you can contact us:"
                  : "Gizlilik politikamız hakkında sorularınız için bize ulaşabilirsiniz:"}
                <br />
                <strong>{isEnglish ? "Email:" : "E-posta:"}</strong>{" "}
                <a href="mailto:info@kfsoftware.app">info@kfsoftware.app</a>
              </p>
            </div>
          )}

          {/* PuantajX Content */}
          {activeTab === "puantajx" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-8">
                <p className="text-sm text-blue-800 m-0 font-medium">
                  {isEnglish
                    ? "This policy applies to the PuantajX application."
                    : "Bu politika PuantajX uygulaması için geçerlidir."}
                </p>
              </div>
              <p>
                <strong>{isEnglish ? "Last Updated:" : "Son Güncelleme:"}</strong>{" "}
                {isEnglish ? "December 21, 2025" : "21 Aralık 2025"}
              </p>

              <p>
                {isEnglish
                  ? 'As PuantajX ("Application"), we attach great importance to the privacy of our users and the protection of their personal data. This Privacy Policy explains how your data is collected, used, and protected when you use the PuantajX application operated by KF Software ("Company", "We").'
                  : 'PuantajX ("Uygulama") olarak, kullanıcılarımızın gizliliğine ve kişisel verilerinin korunmasına büyük önem veriyoruz. Bu Gizlilik Politikası, KF Software ("Şirket", "Biz") tarafından işletilen PuantajX uygulamasını kullandığınızda verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.'}
              </p>

              <h3>{isEnglish ? "1. Data Collected" : "1. Toplanan Veriler"}</h3>
              <p>
                {isEnglish
                  ? "To provide and improve our service, we may collect the following types of data:"
                  : "Hizmetimizi sağlamak ve geliştirmek için aşağıdaki veri türlerini toplayabiliriz:"}
              </p>
              <ul>
                <li>
                  <strong>{isEnglish ? "Personal Information:" : "Kişisel Bilgiler:"}</strong>{" "}
                  {isEnglish
                    ? "Name, surname, email address, phone number, and other information you provide when creating an account."
                    : "Ad, soyad, e-posta adresi, telefon numarası ve hesap oluştururken sağladığınız diğer bilgiler."}
                </li>
                <li>
                  <strong>{isEnglish ? "Work and Timesheet Data:" : "Çalışma ve Puantaj Verileri:"}</strong>{" "}
                  {isEnglish
                    ? "Personnel information, work hours, project details, and financial notes you record in the application."
                    : "Uygulama içerisine kaydettiğiniz personel bilgileri, çalışma saatleri, proje detayları ve finansal notlar."}
                </li>
                <li>
                  <strong>{isEnglish ? "Device and Usage Data:" : "Cihaz ve Kullanım Verileri:"}</strong>{" "}
                  {isEnglish
                    ? "IP address, device model, operating system version, application usage times, and error reports."
                    : "IP adresi, cihaz modeli, işletim sistemi sürümü, uygulama kullanım süreleri ve hata raporları."}
                </li>
              </ul>

              <h3>{isEnglish ? "2. Purpose of Data Use" : "2. Verilerin Kullanım Amacı"}</h3>
              <p>{isEnglish ? "We use the collected data for the following purposes:" : "Topladığımız verileri şu amaçlarla kullanıyoruz:"}</p>
              <ul>
                <li>
                  {isEnglish
                    ? "To perform the application's functions (timesheet tracking, reporting, etc.)."
                    : "Uygulamanın fonksiyonlarını (puantaj takibi, raporlama vb.) yerine getirmek."}
                </li>
                <li>{isEnglish ? "To manage user accounts and ensure security." : "Kullanıcı hesaplarını yönetmek ve güvenliği sağlamak."}</li>
                <li>{isEnglish ? "To conduct analyses to improve service quality." : "Hizmet kalitesini artırmak için analizler yapmak."}</li>
                <li>{isEnglish ? "To fulfill legal obligations." : "Yasal yükümlülükleri yerine getirmek."}</li>
              </ul>

              <h3>{isEnglish ? "3. Data Sharing" : "3. Verilerin Paylaşımı"}</h3>
              <p>
                {isEnglish
                  ? "Your personal data is not shared with third parties except in cases required by legal obligations or necessary for providing the service (e.g., cloud storage providers). Your data is not sold for advertising purposes."
                  : "Kişisel verileriniz, yasal zorunluluklar veya hizmetin sağlanması için gerekli olan durumlar (örneğin bulut depolama sağlayıcıları) haricinde üçüncü taraflarla paylaşılmaz. Verileriniz reklam amaçlı satılmaz."}
              </p>

              <h3>{isEnglish ? "4. Data Security" : "4. Veri Güvenliği"}</h3>
              <p>
                {isEnglish
                  ? "We implement industry-standard encryption and security measures to protect your data from unauthorized access, alteration, or deletion. However, we cannot guarantee that any data transmission over the internet is 100% secure."
                  : "Verilerinizi yetkisiz erişime, değiştirmeye veya silinmeye karşı korumak için endüstri standardı şifreleme ve güvenlik önlemleri uyguluyoruz. Ancak, internet üzerinden yapılan hiçbir veri iletiminin %100 güvenli olduğunu garanti edemeyiz."}
              </p>

              <h3>{isEnglish ? "5. User Rights (Under KVKK)" : "5. Kullanıcı Hakları (KVKK Kapsamında)"}</h3>
              <p>{isEnglish ? "You have the following rights regarding your personal data:" : "Kişisel verileriniz üzerinde şu haklara sahipsiniz:"}</p>
              <ul>
                <li>{isEnglish ? "Learn about and access your data." : "Verilerinizin ne olduğunu öğrenme ve erişme."}</li>
                <li>{isEnglish ? "Request correction of incorrect data." : "Yanlış verilerin düzeltilmesini isteme."}</li>
                <li>
                  {isEnglish
                    ? "Request deletion of your data (You can delete your account from the application settings)."
                    : "Verilerinizin silinmesini talep etme (Hesabınızı uygulama ayarlarından silebilirsiniz)."}
                </li>
              </ul>

              <h3>{isEnglish ? "6. Contact" : "6. İletişim"}</h3>
              <p>
                {isEnglish
                  ? "For questions and requests regarding our privacy policy, you can contact us:"
                  : "Gizlilik politikamızla ilgili soru ve talepleriniz için bizimle iletişime geçebilirsiniz:"}
                <br />
                <strong>{isEnglish ? "Email:" : "E-posta:"}</strong>{" "}
                <a href="mailto:info@kfsoftware.app">info@kfsoftware.app</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PrivacyClient({ initialLang }: PrivacyClientProps) {
  return (
    <Suspense fallback={<div className="py-24 text-center">Yükleniyor...</div>}>
      <PrivacyContent initialLang={initialLang} />
    </Suspense>
  );
}
