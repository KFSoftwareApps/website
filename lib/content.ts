export type FAQItem = {
  question: { tr: string; en: string };
  answer: { tr: string; en: string };
};

export type AppContent = {
  id: string;
  name: { tr: string; en: string };
  tagline: { tr: string; en: string };
  description: { tr: string; en: string };
  highlights: { tr: string; en: string }[];
  features: { title: { tr: string; en: string }; emoji: string }[];
  chips: { tr: string; en: string }[];
  targetAudience: { tr: string; en: string }[];
  faqs: FAQItem[];
  storeLinks?: {
    ios?: string;
    android?: string;
    web?: string;
  };
  screenshots?: string[];
  quickStats: {
    price: { tr: string; en: string };
    version: string;
    lastUpdate: { tr: string; en: string };
    platforms: string[];
  };
  logoScale?: string;
  colors: {
    primary: string;
    secondary?: string;
    accent: string;
  };
};

export const appsContent: Record<string, AppContent> = {
  puantajx: {
    id: "puantajx",
    name: { tr: "PuantajX", en: "PuantajX" },
    tagline: {
      tr: "Şantiye puantaj, personel ve proje ekiplerini tek yerden yönetin.",
      en: "Manage construction timesheets and project teams in one place.",
    },
    description: {
      tr: "PuantajX, modern şantiye yönetimi ve inşaat projeleri için uçtan uca dijital dönüşüm sağlayan kapsamlı bir **puantaj takip ve personel yönetim platformudur**. Geleneksel Excel cetvelleri ve karmaşık defter tutma yöntemlerini geride bırakarak; personel zaman çizelgelerini, **günlük şantiye raporlarını**, hakediş hesaplamalarını ve maliyet takibini tek bir güvenli mobil uygulamada birleştirir. Saha operasyonlarınızı dijitalleştirerek hataları sıfıra indirin, ekiplerinizi projeye göre anlık olarak koordine edin ve ay sonu hakedişlerini manuel hesaplama zahmetine girmeden saniyeler içinde PDF raporu olarak alın.",
      en: "PuantajX is an all-in-one digital platform designed to revolutionize modern construction site management and project workflows. By replacing traditional spreadsheets and paper-based tracking, it unifies employee timesheets, **daily construction reports**, progress billing, and cost management into a single, secure mobile environment. Digitalize your field operations to eliminate human error, coordinate teams across multiple projects in real-time, and generate professional PDF payroll/accrual reports in seconds without the hassle of manual calculations.",
    },
    highlights: [
      {
        tr: "Gelişmiş dijital puantaj cetveli ile eş zamanlı personel ve proje maliyeti takibi.",
        en: "Advanced digital timesheets for real-time tracking of personnel and project costs.",
      },
      {
        tr: "Görsel kanıtlı (fotoğraflı) günlük şantiye raporları oluşturma ve bulutta sınırsız arşivleme.",
        en: "Create daily site reports with photo evidence and unlimited cloud archiving.",
      },
      {
        tr: "İnşaat personel hakedişlerini, mesaileri ve avansları otomatik, hatasız hesaplama motoru.",
        en: "Automated engine for flawless calculation of construction payrolls, overtime, and advances.",
      },
      {
        tr: "Proje bazlı esnek ekip yönetimi, usta/taşeron tanımlama ve vardiya planlama modülü.",
        en: "Flexible project-based team management, subcontractor definitions, and shift planning."
      },
      {
        tr: "Tek tıkla profesyonel Excel ve PDF formatında puantaj raporları oluşturup paylaşma.",
        en: "Instantly export and share professional timesheet reports in Excel and PDF formats."
      },
      {
        tr: "Banka düzeyinde güvenlik, bulut tabanlı eş zamanlı yedekleme ve veri koruma.",
        en: "Bank-level security with real-time cloud backup and high-end data protection."
      },
    ],
    features: [
      {
        title: {
          tr: "Projeler/Şantiyeler: Proje oluşturma, konum bilgisi, varlık yönetimi.",
          en: "Projects/Sites: Project creation, location info, asset management.",
        },
        emoji: "🏗️",
      },
      {
        title: {
          tr: "Ekip/Çalışanlar: Rol/unvan, ödeme türü (saatlik/günlük/aylık) tanımlama.",
          en: "Team/Employees: Define roles, payment types (hourly/daily/monthly).",
        },
        emoji: "👷",
      },
      {
        title: {
          tr: "Günlük Puantaj: Çalışma saatleri, fazla mesai, devamsızlık ve notlar.",
          en: "Daily Timesheet: Work hours, overtime, attendance, and notes.",
        },
        emoji: "⏱️",
      },
      {
        title: {
          tr: "Günlük Raporlar: Tamamlanan işler, kalemler ve fotoğraf kanıtları.",
          en: "Daily Reports: Completed tasks, items, and photo proof.",
        },
        emoji: "📋",
      },
      {
        title: {
          tr: "Hakediş ve Ödeme Özeti: Çalışan bazlı hakedişler, toplam maliyet takibi.",
          en: "Accrual & Payment Summary: Employee-based accruals, total cost tracking.",
        },
        emoji: "💰",
      },
      {
        title: {
          tr: "PDF/Excel Çıktıları: Raporları dışa aktarın ve paylaşın.",
          en: "PDF/Excel Exports: Export and share reports.",
        },
        emoji: "📤",
      },
      {
        title: {
          tr: "Roller ve İzinler: Organizasyon içi yetkilendirme.",
          en: "Roles & Permissions: In-organization authorization.",
        },
        emoji: "🛡️",
      },
      {
        title: {
          tr: "Senkronizasyon ve Yedekleme: Verilerinizi güvenle saklayın.",
          en: "Sync & Backup: Store your data securely.",
        },
        emoji: "☁️",
      },
    ],
    chips: [
      { tr: "Vardiya", en: "Shift" },
      { tr: "Mesai", en: "Overtime" },
      { tr: "Rapor", en: "Report" },
    ],
    targetAudience: [
      { tr: "Şantiye Şefleri", en: "Site Managers" },
      { tr: "Saha Yöneticileri", en: "Field Supervisors" },
      { tr: "Ofis/Finans Departmanları", en: "Office/Finance Departments" },
      { tr: "Proje Ekipleri", en: "Project Teams" },
    ],
    quickStats: {
      price: { tr: "Ücretsiz / Pro", en: "Free / Pro" },
      version: "1.2.4",
      lastUpdate: { tr: "Aralık 2024", en: "December 2024" },
      platforms: ["iOS", "Android"],
    },
    logoScale: "scale-100",
    faqs: [
      {
        question: { tr: "PuantajX uygulaması hangi sektörler için uygun?", en: "Which industries is PuantajX suitable for?" },
        answer: {
          tr: "PuantajX öncelikle inşaat, şantiye yönetimi, madencilik, enerji ve saha operasyonu gerektiren tüm sektörler için tasarlanmıştır. Ancak ekip yönetimi ve günlük çalışma saati takibi yapmak isteyen her türlü işletme tarafından rahatlıkla kullanılabilir.",
          en: "PuantajX is primarily designed for construction, site management, mining, energy, and all sectors requiring field operations. However, it can be easily used by any business that wants to manage teams and track daily work hours."
        }
      },
      {
        question: { tr: "Uygulama ücretli mi? Abonelik modelleri nelerdir?", en: "Is the app paid? What are the subscription models?" },
        answer: {
          tr: "PuantajX'i temel özellikleriyle ücretsiz olarak kullanmaya başlayabilirsiniz. Daha büyük projeler, gelişmiş raporlama seçenekleri ve çoklu ekip yönetimi için Pro abonelik paketlerimiz mevcuttur. Güncel fiyatlandırmaya uygulama içinden ulaşabilirsiniz.",
          en: "You can start using PuantajX with its basic features for free. For larger projects, advanced reporting options, and multi-team management, our Pro subscription packages are available. You can access current pricing within the app."
        }
      },
      {
        question: { tr: "Çevrimdışı (offline) çalışma desteği var mı?", en: "Is there offline support?" },
        answer: {
          tr: "Evet, aktif bir internet bağlantınız olmasa bile saha verilerini ve puantajları kaydedebilirsiniz. İnternet erişimi sağlandığında verileriniz otomatik olarak bulut sunucularımızla senkronize edilir.",
          en: "Yes, you can record field data and timesheets even without an active internet connection. Once internet access is restored, your data is automatically synchronized with our cloud servers."
        }
      },
      {
        question: { tr: "Verilerim nasıl korunuyor ve yedekleniyor?", en: "How is my data protected and backed up?" },
        answer: {
          tr: "Verileriniz, endüstri standardı şifreleme yöntemleri kullanılarak AWS ve Google Cloud tabanlı güvenli sunucularda saklanır. Günlük olarak otomatik yedekleme yapıldığı için veri kaybı riskiniz minimumdur.",
          en: "Your data is stored on secure AWS and Google Cloud-based servers using industry-standard encryption methods. Since automatic backups are performed daily, your risk of data loss is minimal."
        }
      },
      {
        question: { tr: "PDF ve Excel raporlarını nasıl alabilirim?", en: "How can I get PDF and Excel reports?" },
        answer: {
          tr: "Uygulama içerisindeki 'Raporlar' sekmesinden istediğiniz tarih aralığını ve projeyi seçerek tek tıkla profesyonel PDF hakediş raporları veya detaylı Excel puantaj listeleri oluşturabilirsiniz.",
          en: "In the 'Reports' tab within the app, you can select your desired date range and project to create professional PDF payroll reports or detailed Excel timesheet lists with a single click."
        }
      }
    ],
    colors: {
      primary: "bg-blue-600",
      secondary: "bg-blue-50",
      accent: "text-blue-600",
    },
    storeLinks: {
      web: "https://puantajx.kfsoftware.app",
    },
    screenshots: [
      "/apps/puantajx/screenshots/1-v5.png",
      "/apps/puantajx/screenshots/2-v5.png",
      "/apps/puantajx/screenshots/3-v5.png",
      "/apps/puantajx/screenshots/4-v5.png",
      "/apps/puantajx/screenshots/5-v5.png",
    ],
  },
  fismatik: {
    id: "fismatik",
    name: { tr: "FişMatik: Bütçe Takibi", en: "FisMatik: Budget Tracker" },
    tagline: {
      tr: "Harcamalarını hızlıca kaydet, bütçeni kontrol altında tut.",
      en: "Quickly record your expenses, keep your budget under control.",
    },
    description: {
      tr: "FişMatik, kişisel finans yönetimini basitleştirmek ve harcama alışkanlıklarınızı kontrol altına almanıza yardımcı olmak için tasarlanmış yüksek teknolojili bir **bütçe takip asistanıdır**. Her bir fişi tek dokunuşla dijital ortama aktarmanızı, harcamalarınızı anlamlı kategorilere ayırmanızı ve detaylı finansal raporlarla nereye ne harcadığınızı net bir şekilde görmenizi sağlar. Gelişmiş OCR (Optik Karakter Tanıma) teknolojisi ile fiş verilerini otomatik olarak dijitalleştirirken, manuel giriş seçeneği ile tüm giderlerinizi saniyeler içinde kaydedebilirsiniz. Gelir-gider dengenizi koruyun, tasarruf hedeflerinize ulaşın ve finansal özgürlüğünüzü FişMatik ile adım adım inşa edin.",
      en: "FişMatik is a high-tech **budget tracking assistant** designed to simplify personal finance management and empower you to take full control of your spending habits. It enables you to digitize every receipt with a single touch, categorize expenses into meaningful groups, and provides detailed financial reports that clarify exactly where your money goes. Using advanced OCR (Optical Character Recognition) technology, it automatically extracts data from receipt photos, while manual entry options let you record any expense in seconds. Maintain your income-expense balance, reach your savings goals, and build your financial freedom step by step with FişMatik.",
    },
    highlights: [
      {
        tr: "“Para nereye harcanıyor?” sorusuna veriye dayalı kesin yanıtlar ve görsel analizler.",
        en: "Data-driven precise answers and visual analytics to the 'Where is the money going?' question.",
      },
      {
        tr: "Düzenli harcama takibi ile akıllı bütçe planlaması yapın ve beklenmedik sürpriz giderlerin önüne geçin.",
        en: "Perform smart budget planning with regular expense tracking and prevent unexpected surprise costs.",
      },
      {
        tr: "Özelleştirilebilir kategoriler, aylık özetler ve grafiksel raporlarla bütçenizi her an kontrol altında tutun.",
        en: "Maintain budget control at all times with customizable categories, monthly summaries, and graphical reports.",
      },
      {
        tr: "Fiş verilerini anında dijitalleştiren yapay zeka destekli OCR tarama özelliği.",
        en: "AI-powered OCR scanning feature that instantly digitizes receipt data.",
      },
    ],
    features: [
      {
        title: {
          tr: "Fiş Tarama (OCR): Fiş fotoğrafından tutarı ve kalemleri hızlıca çıkar.",
          en: "Receipt Scanning (OCR): Quickly extract amount and items from receipt photo.",
        },
        emoji: "🧾",
      },
      {
        title: {
          tr: "Manuel Gider Girişi: Fişsiz harcamaları saniyeler içinde ekle.",
          en: "Manual Expense Entry: Add non-receipt expenses in seconds.",
        },
        emoji: "✍️",
      },
      {
        title: {
          tr: "Kategori Bazlı Takip: Harcamalarını kategorilere ayır ve özetleri gör.",
          en: "Category-Based Tracking: Categorize your expenses and see summaries.",
        },
        emoji: "🏷️",
      },
      {
        title: {
          tr: "Gün/Ay Özetleri: Günlük ve aylık toplamları tek ekranda takip et.",
          en: "Day/Month Summaries: Track daily and monthly totals on a single screen.",
        },
        emoji: "📅",
      },
      {
        title: {
          tr: "Detaylı Analiz: Harcama dağılımını gör, bütçeni planla.",
          en: "Detailed Analysis: See spending distribution, plan your budget.",
        },
        emoji: "📊",
      },
      {
        title: {
          tr: "Hızlı Giriş: Güvenli ve pratik oturum açma seçenekleri.",
          en: "Quick Login: Secure and practical login options.",
        },
        emoji: "⚡",
      },
      {
        title: {
          tr: "Widget / Kısayollar: Bütçeni ve toplamını hızlıca görüntüle.",
          en: "Widget / Shortcuts: Quickly view your budget and total.",
        },
        emoji: "📱",
      },
      {
        title: {
          tr: "Yedekleme: Verilerini güvenli şekilde sakla ve taşı.",
          en: "Backup: Store and move your data securely.",
        },
        emoji: "☁️",
      },
    ],
    chips: [
      { tr: "Bütçe", en: "Budget" },
      { tr: "Fiş", en: "Receipt" },
      { tr: "Analiz", en: "Analysis" },
    ],
    targetAudience: [
      { tr: "Bireysel Kullanıcılar", en: "Individual Users" },
      { tr: "Öğrenciler", en: "Students" },
      { tr: "Bütçe Tutanlar", en: "Budget Keepers" },
      { tr: "Aile Harcama Takibi", en: "Family Expense Tracking" },
    ],
    quickStats: {
      price: { tr: "Ücretsiz", en: "Free" },
      version: "2.1.0",
      lastUpdate: { tr: "Aralık 2024", en: "December 2024" },
      platforms: ["iOS", "Android"],
    },
    logoScale: "scale-125",
    faqs: [
      {
        question: { tr: "FişMatik kişisel verilerimi nasıl koruyor?", en: "How does FişMatik protect my personal data?" },
        answer: {
          tr: "Gizliliğiniz bizim için en öncelikli konudur. FişMatik'te verileriniz yalnızca size daha iyi bir finansal takip deneyimi sunmak için kullanılır. Kişisel verileriniz asla üçüncü taraflarla paylaşılmaz ve şifreli sunucularımızda güvenle saklanır.",
          en: "Your privacy is our top priority. In FişMatik, your data is used solely to provide a better financial tracking experience. Your personal data is never shared with third parties and is securely stored on our encrypted servers."
        }
      },
      {
        question: { tr: "OCR (Fiş Tarama) özelliği nasıl çalışır?", en: "How does the OCR (Receipt Scanning) feature work?" },
        answer: {
          tr: "Uygulama içindeki kamera butonuna basarak fişinizin bir fotoğrafını çektiğinizde, yapay zeka destekli OCR teknolojimiz fiş üzerindeki tarih, toplam tutar ve KDV gibi bilgileri otomatik olarak okur ve ilgili alanlara doldurur.",
          en: "When you take a photo of your receipt using the camera button within the app, our AI-powered OCR technology automatically reads information such as date, total amount, and VAT on the receipt and fills in the relevant fields."
        }
      },
      {
        question: { tr: "Aylık bütçe limiti belirleyebilir miyim?", en: "Can I set a monthly budget limit?" },
        answer: {
          tr: "Evet, her ay için kendinize bir harcama limiti belirleyebilir ve harcamalarınız bu limite yaklaştığında veya limiti aştığında uygulama üzerinden takip edebilirsiniz. Bu özellik bütçenizi kontrol altında tutmanıza yardımcı olur.",
          en: "Yes, you can set a spending limit for yourself each month and track your expenses when they approach or exceed this limit. This feature helps you keep your budget under control."
        }
      },
      {
        question: { tr: "Verilerimi başka bir telefona taşıyabilir miyim?", en: "Can I move my data to another phone?" },
        answer: {
          tr: "Hesabınız bulut tabanlı bir sistemle çalıştığı için kullanıcı bilgilerinizle giriş yaptığınız her cihazdan verilerinize anında ulaşabilirsiniz. Manuel yedekleme veya dosya taşıma işlemi yapmanıza gerek yoktur.",
          en: "Since your account works with a cloud-based system, you can access your data instantly from any device you log into with your user information. No manual backup or file transfer processes are required."
        }
      },
      {
        question: { tr: "Ücretsiz sürümde herhangi bir kısıtlama var mı?", en: "Are there any restrictions in the free version?" },
        answer: {
          tr: "Temel bütçe takibi ve manuel harcama girişi özelliklerimiz tamamen ücretsizdir. OCR tarama limitleri veya gelişmiş analiz raporları gibi bazı profesyonel özellikler uygulama içi satın alımlarla sunulabilir.",
          en: "Basic budget tracking and manual expense entry features are completely free. Certain professional features such as OCR scanning limits or advanced analytics reports may be offered via in-app purchases."
        }
      }
    ],
    colors: {
      primary: "bg-purple-600",
      secondary: "bg-gray-50",
      accent: "text-purple-600",
    },
    storeLinks: {
      web: "https://fismatik.kfsoftware.app",
      ios: "https://apps.apple.com/tr/app/fismatik-budget-tracker/id6757060463?l=tr",
    },
    screenshots: [
      "/apps/fismatik/screenshots/clean-screen-1.png",
      "/apps/fismatik/screenshots/clean-screen-2.png",
      "/apps/fismatik/screenshots/clean-screen-3.png",
      "/apps/fismatik/screenshots/clean-screen-4.png",
      "/apps/fismatik/screenshots/clean-screen-5.png",
    ],
  },
};
