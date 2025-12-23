"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PrivacyContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("app") === "puantajx" ? "puantajx" : "fismatik";

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Gizlilik Politikası
          </h1>
          <Link href="/">
            <Button variant="ghost">Ana Sayfaya Dön</Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <Link
            href="/privacy?app=fismatik"
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
            href="/privacy?app=puantajx"
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
                  Bu politika <strong>FişMatik</strong> uygulaması için geçerlidir.
                </p>
              </div>
              {/* ... (Existing FişMatik Content) ... */}
              <p>
                <strong>Son Güncelleme:</strong> 25 Kasım 2024
              </p>

              <h3>1. Toplanan Bilgiler</h3>
              <p>Uygulamamızı kullanırken aşağıdaki bilgileri topluyoruz:</p>
              <ul>
                <li>
                  <strong>E-posta adresi:</strong> Hesap oluşturma ve kimlik doğrulama için
                </li>
                <li>
                  <strong>Fiş verileri:</strong> Taradığınız fişlerin fotoğrafları ve içerikleri
                </li>
                <li>
                  <strong>Harcama bilgileri:</strong> Eklediğiniz harcama kayıtları, kategoriler ve
                  tutarlar
                </li>
                <li>
                  <strong>Kullanım verileri:</strong> Uygulama içi aktiviteler ve tercihler
                </li>
              </ul>

              <h3>2. Bilgilerin Kullanımı</h3>
              <p>Topladığımız bilgileri şu amaçlarla kullanıyoruz:</p>
              <ul>
                <li>Hesabınızı oluşturmak ve yönetmek</li>
                <li>Fiş tarama ve analiz hizmeti sağlamak</li>
                <li>Harcama takibi ve raporlama özellikleri sunmak</li>
                <li>Uygulamayı geliştirmek ve iyileştirmek</li>
              </ul>

              <h3>3. Veri Paylaşımı</h3>
              <p>Bilgilerinizi üçüncü taraflarla şu durumlarda paylaşabiliriz:</p>
              <ul>
                <li>
                  <strong>Supabase:</strong> Veri depolama ve kimlik doğrulama
                </li>
                <li>
                  <strong>Google Cloud Vision API:</strong> Fiş OCR
                </li>
                <li>
                  <strong>OpenAI/Gemini:</strong> Fiş analizi
                </li>
                <li>
                  <strong>Google AdMob:</strong> Reklam gösterimi
                </li>
                <li>
                  <strong>Revenue Cat:</strong> Ödeme işlemleri
                </li>
              </ul>

              <h3>4. Veri Güvenliği</h3>
              <p>Verilerinizi korumak için şu önlemleri alıyoruz:</p>
              <ul>
                <li>SSL/TLS şifreleme ile veri iletimi</li>
                <li>Güvenli bulut altyapısı (Supabase)</li>
                <li>Düzenli güvenlik güncellemeleri</li>
                <li>Erişim kontrolü ve kimlik doğrulama</li>
              </ul>

              <h3>5. Kullanıcı Hakları</h3>
              <p>Aşağıdaki haklara sahipsiniz:</p>
              <ul>
                <li>
                  <strong>Erişim hakkı:</strong> Verilerinize erişim talep edebilirsiniz
                </li>
                <li>
                  <strong>Düzeltme hakkı:</strong> Yanlış bilgileri düzeltebilirsiniz
                </li>
                <li>
                  <strong>Silme hakkı:</strong> Hesabınızı ve verilerinizi silebilirsiniz
                </li>
                <li>
                  <strong>İtiraz hakkı:</strong> Veri işlemeye itiraz edebilirsiniz
                </li>
              </ul>

              <h3>6. İletişim</h3>
              <p>
                Gizlilik politikamız hakkında sorularınız için bize ulaşabilirsiniz:
                <br />
                <strong>E-posta:</strong>{" "}
                <a href="mailto:info@kfsoftware.com">info@kfsoftware.com</a>
              </p>
            </div>
          )}

          {/* PuantajX Content */}
          {activeTab === "puantajx" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-8">
                <p className="text-sm text-blue-800 m-0 font-medium">
                  Bu politika <strong>PuantajX</strong> uygulaması için geçerlidir.
                </p>
              </div>
              <p>
                <strong>Son Güncelleme:</strong> 21 Aralık 2025
              </p>

              <p>
                PuantajX ("Uygulama") olarak, kullanıcılarımızın gizliliğine ve kişisel verilerinin
                korunmasına büyük önem veriyoruz. Bu Gizlilik Politikası, KF Software ("Şirket",
                "Biz") tarafından işletilen PuantajX uygulamasını kullandığınızda verilerinizin
                nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
              </p>

              <h3>1. Toplanan Veriler</h3>
              <p>
                Hizmetimizi sağlamak ve geliştirmek için aşağıdaki veri türlerini toplayabiliriz:
              </p>
              <ul>
                <li>
                  <strong>Kişisel Bilgiler:</strong> Ad, soyad, e-posta adresi, telefon numarası ve
                  hesap oluştururken sağladığınız diğer bilgiler.
                </li>
                <li>
                  <strong>Çalışma ve Puantaj Verileri:</strong> Uygulama içerisine kaydettiğiniz
                  personel bilgileri, çalışma saatleri, proje detayları ve finansal notlar.
                </li>
                <li>
                  <strong>Cihaz ve Kullanım Verileri:</strong> IP adresi, cihaz modeli, işletim
                  sistemi sürümü, uygulama kullanım süreleri ve hata raporları.
                </li>
              </ul>

              <h3>2. Verilerin Kullanım Amacı</h3>
              <p>Topladığımız verileri şu amaçlarla kullanıyoruz:</p>
              <ul>
                <li>
                  Uygulamanın fonksiyonlarını (puantaj takibi, raporlama vb.) yerine getirmek.
                </li>
                <li>Kullanıcı hesaplarını yönetmek ve güvenliği sağlamak.</li>
                <li>Hizmet kalitesini artırmak için analizler yapmak.</li>
                <li>Yasal yükümlülükleri yerine getirmek.</li>
              </ul>

              <h3>3. Verilerin Paylaşımı</h3>
              <p>
                Kişisel verileriniz, yasal zorunluluklar veya hizmetin sağlanması için gerekli olan
                durumlar (örneğin bulut depolama sağlayıcıları) haricinde üçüncü taraflarla
                paylaşılmaz. Verileriniz reklam amaçlı satılmaz.
              </p>

              <h3>4. Veri Güvenliği</h3>
              <p>
                Verilerinizi yetkisiz erişime, değiştirmeye veya silinmeye karşı korumak için
                endüstri standardı şifreleme ve güvenlik önlemleri uyguluyoruz. Ancak, internet
                üzerinden yapılan hiçbir veri iletiminin %100 güvenli olduğunu garanti edemeyiz.
              </p>

              <h3>5. Kullanıcı Hakları (KVKK Kapsamında)</h3>
              <p>Kişisel verileriniz üzerinde şu haklara sahipsiniz:</p>
              <ul>
                <li>Verilerinizin ne olduğunu öğrenme ve erişme.</li>
                <li>Yanlış verilerin düzeltilmesini isteme.</li>
                <li>
                  Verilerinizin silinmesini talep etme (Hesabınızı uygulama ayarlarından
                  silebilirsiniz).
                </li>
              </ul>

              <h3>6. İletişim</h3>
              <p>
                Gizlilik politikamızla ilgili soru ve talepleriniz için bizimle iletişime
                geçebilirsiniz:
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

export default function PrivacyClient() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Yükleniyor...</div>}>
      <PrivacyContent />
    </Suspense>
  );
}
