import { NextResponse } from "next/server";

// Simple in-memory rate limiter (not persistent across server restarts/lambdas)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { app, topic, email, message, privacy, confirm_email } = body;

    // 1. Honeypot check (Spam protection)
    // If the invisible field 'confirm_email' is filled, it's likely a bot.
    if (confirm_email) {
      // Return success to fool the bot, but do nothing.
      return NextResponse.json({ success: true, message: "Talebiniz alındı." });
    }

    // 2. Validation
    if (!app || !topic || !email || !message || !privacy) {
      return NextResponse.json(
        { success: false, message: "Lütfen tüm zorunlu alanları doldurun." },
        { status: 400 }
      );
    }

    // 3. Rate Limiting (Simple IP simulation)
    // In production, use headers like 'x-forwarded-for' or a proper store (Redis/KV).
    // For this simulation/local dev, we'll use a placeholder IP or just rely on global map.
    const ip = "127.0.0.1"; // Placeholder
    const now = Date.now();
    const lastRequestTime = rateLimitMap.get(ip) || 0;

    if (now - lastRequestTime < 5000) {
      // Enforce 5 seconds between requests
      return NextResponse.json(
        { success: false, message: "Çok hızlı işlem yapıyorsunuz. Lütfen biraz bekleyin." },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, now);

    // 4. Simulate Email Sending
    const ticketId = `REQ-${Math.floor(Math.random() * 1000000)}`;

    console.log("------------------------------------------------");
    console.log(`[MAIL SIMULATION] New Support Request: ${ticketId}`);
    console.log(`To: support@kfsoftware.app`);
    console.log(`From: ${email}`);
    console.log(`App: ${app}`);
    console.log(`Topic: ${topic}`);
    console.log(`Message: ${message}`);
    console.log("------------------------------------------------");

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: "Talebiniz başarıyla alındı.",
      ticketId: ticketId,
    });
  } catch (error) {
    console.error("Support API Error:", error);
    return NextResponse.json(
      { success: false, message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}
