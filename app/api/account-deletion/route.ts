import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { app, email, reason } = body;

    // Basit validasyon
    if (!app || !email || !reason) {
      return NextResponse.json({ error: "Lütfen tüm alanları doldurun." }, { status: 400 });
    }

    // Simülasyon: Veritabanına/Loga kaydet
    console.log("--- HESAP SİLME TALEBİ ---");
    console.log("Uygulama:", app);
    console.log("E-posta:", email);
    console.log("Sebep:", reason);
    console.log("Tarih:", new Date().toISOString());
    console.log("--------------------------");

    // Gerçek senaryoda bu veriyi veritabanına kaydederdik.

    return NextResponse.json({ success: true, message: "Talebiniz alınmıştır." });
  } catch (error) {
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}
