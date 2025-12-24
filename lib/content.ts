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
      tr: "PuantajX, şantiye ve inşaat projeleriniz için geliştirilmiş en kapsamlı **puantaj takip programıdır**. Personel zaman çizelgeleri, **günlük şantiye raporları**, hakediş hesaplama ve maliyet takibini tek bir mobil uygulamada birleştirir. Excel puantaj cetvelleriyle uğraşmayı bırakın; ekiplerinizi tanımlayın, **günlük puantaj** girişlerini yapın ve saniyeler içinde detaylı PDF raporlar alın.",
      en: "PuantajX allows you to manage timesheets, daily reports, and progress/cost tracking for construction and project teams in one place. Define teams with project-based schedules, enter daily work hours, create reports, and get periodic progress summaries in seconds.",
    },
    highlights: [
      {
        tr: "Online puantaj defteri ile personel ve maliyet takibi",
        en: "Manage timesheets and cost tracking on a single screen",
      },
      {
        tr: "Resimli günlük şantiye raporları oluşturun ve arşivleyin",
        en: "Archive daily reports and construction site images",
      },
      {
        tr: "İnşaat personel hakedişlerini ve mesaileri otomatik hesaplayın",
        en: "Automatically calculate employee accruals",
      },
      { tr: "Proje bazlı ekip, usta ve vardiya yönetimi", en: "Project-based team and shift management" },
      { tr: "Tek tıkla Excel ve PDF puantaj raporu indirme", en: "Instant PDF and Excel reporting" },
      { tr: "Bulut tabanlı güvenli veri saklama ve yedekleme", en: "Secure cloud-based data storage" },
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
        question: { tr: "Uygulama ücretli mi?", en: "Is the app paid?" },
        answer: {
          tr: "Ödeme ve abonelik ücretleri planınıza göre değişebilir. Uygulama içi satın alımlarla ek özelliklere erişebilirsiniz.",
          en: "Payment and subscription fees may vary based on your plan. You can access additional features through in-app purchases.",
        },
      },
      {
        question: { tr: "Verilerim nasıl korunuyor?", en: "How is my data protected?" },
        answer: {
          tr: "Verileriniz bulut sunucularımızda şifreli olarak saklanır ve yedeklenir.",
          en: "Your data is stored encrypted and backed up on our cloud servers.",
        },
      },
      {
        question: { tr: "Hangi platformlarda çalışır?", en: "Which platforms does it run on?" },
        answer: {
          tr: "Hem iOS hem de Android cihazlarda sorunsuz çalışacak şekilde tasarlanmıştır.",
          en: "Designed to run smoothly on both iOS and Android devices.",
        },
      },
    ],
    colors: {
      primary: "bg-blue-600",
      secondary: "bg-blue-50",
      accent: "text-blue-600",
    },
    storeLinks: {
      web: "https://puantajx.kfsoftware.app",
      ios: "https://apps.apple.com/tr/app/puantajx/id6450634563",
      android: "https://play.google.com/store/apps/details?id=com.kfsoftware.puantajx",
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
      tr: "FişMatik; fişlerini tek dokunuşla kaydedip kategorilere ayırmanı, günlük ve aylık özetlerle nereye ne harcadığını net şekilde görmeni sağlar. OCR ile fiş verilerini otomatik çıkarabilir, manuel gider ekleyebilir ve harcama düzenini tek ekranda takip edebilirsin.",
      en: "FişMatik allows you to record and categorize your receipts with a single touch, seeing exactly where you spend with daily and monthly summaries. Automatically extract receipt data with OCR, add manual expenses, and track your spending patterns on one screen.",
    },
    highlights: [
      {
        tr: "“Nereye para gitti?” sorusunu netleştirir.",
        en: "Clarifies the 'Where did the money go?' question.",
      },
      {
        tr: "Düzenli takip ile daha iyi planlama ve daha az sürpriz gider sağlar.",
        en: "Provides better planning and fewer surprise expenses with regular tracking.",
      },
      {
        tr: "Kategori, özet ve raporlarla bütçeyi kontrol altında tutar.",
        en: "Keeps the budget under control with categories, summaries, and reports.",
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
        question: { tr: "Verilerim güvende mi?", en: "Is my data safe?" },
        answer: {
          tr: "FişMatik’te veriler yalnızca uygulama deneyimini sağlamak için kullanılır. Kişisel veriler, gizlilik politikası kapsamında korunur.",
          en: "In FişMatik, data is used only to provide the app experience. Personal data is protected under the privacy policy.",
        },
      },
      {
        question: { tr: "Uygulama tam olarak ne işe yarar?", en: "What exactly does the app do?" },
        answer: {
          tr: "Fişlerini kaydeder, harcamalarını kategorilere ayırır ve günlük/aylık özetlerle bütçeni takip etmeni sağlar. İstersen OCR ile fiş bilgilerini otomatik çıkarır.",
          en: "Records your receipts, categorizes your expenses, and allows you to track your budget with daily/monthly summaries. Optionally extracts receipt info with OCR.",
        },
      },
      {
        question: { tr: "Ücretli mi?", en: "Is it paid?" },
        answer: {
          tr: "Temel kullanım ücretsizdir. Ek özellikler uygulama içinde ayrıca sunulabilir.",
          en: "Basic usage is free. Additional features may be offered separately within the app.",
        },
      },
      {
        question: { tr: "Hangi platformlarda çalışır?", en: "Which platforms does it run on?" },
        answer: {
          tr: "iOS ve Android cihazlarda sorunsuz çalışır.",
          en: "Runs smoothly on iOS and Android devices.",
        },
      },
    ],
    colors: {
      primary: "bg-purple-600",
      secondary: "bg-gray-50",
      accent: "text-purple-600",
    },
    storeLinks: {
      web: "https://fismatik.kfsoftware.app",
      ios: "https://apps.apple.com/tr/app/fismatik/id123456789",
      android: "https://play.google.com/store/apps/details?id=com.kfsoftware.fismatik",
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
