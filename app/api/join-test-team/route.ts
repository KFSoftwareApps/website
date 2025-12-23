import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, app, device } = body;

    // Basit validasyon
    if (!name || !email || !app || !device) {
      return NextResponse.json({ error: "Lütfen tüm alanları doldurun." }, { status: 400 });
    }

    // Simülasyon: Veritabanına/Loga kaydet
    console.log("--- TEST EKİBİ BAŞVURUSU ---");
    console.log("İsim:", name);
    console.log("E-posta:", email);
    console.log("Uygulama:", app);
    console.log("Cihaz:", device);
    console.log("Tarih:", new Date().toISOString());
    console.log("----------------------------");

    return NextResponse.json({ success: true, message: "Başvurunuz alındı." });
  } catch (error) {
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}
