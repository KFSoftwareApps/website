import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email templates for different ticket types
const getEmailTemplate = (
  topic: string,
  appName: string,
  ticketId: string,
  userName?: string,
  templateType?: string,
  downloadLink?: string
) => {
  const baseHeader = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <tr>
                            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: -0.5px;">
                                    KF Software
                                </h1>
                                <p style="margin: 8px 0 0 0; color: #e0e7ff; font-size: 14px;">
                                    Profesyonel Yazılım Çözümleri
                                </p>
                            </td>
                        </tr>`;

  const baseFooter = `
                        <tr>
                            <td style="background-color: #f8fafc; padding: 30px; border-top: 1px solid #e2e8f0;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="text-align: center;">
                                            <p style="margin: 0 0 12px 0; color: #64748b; font-size: 13px;">
                                                Bu email otomatik olarak gönderilmiştir.
                                            </p>
                                            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                                                © ${new Date().getFullYear()} KF Software. Tüm hakları saklıdır.
                                            </p>
                                            <div style="margin-top: 16px;">
                                                <a href="https://kfsoftware.app" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 8px;">Website</a>
                                                <span style="color: #cbd5e1;">•</span>
                                                <a href="https://kfsoftware.app/support" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 8px;">Destek</a>
                                                <span style="color: #cbd5e1;">•</span>
                                                <a href="https://kfsoftware.app/privacy" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 8px;">Gizlilik</a>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

  // Test Team - Accepted
  if (templateType === "test-team-accepted") {
    return (
      baseHeader +
      `
        <tr>
            <td style="background-color: #f0fdf4; padding: 20px 30px; border-bottom: 2px solid #86efac;">
                <div style="text-align: center;">
                    <div style="display: inline-block; background-color: #22c55e; color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">
                        ✓ Kabul Edildi
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px;">Hoş Geldiniz! 🎉</h2>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">
                    Merhaba${userName ? " " + userName : ""},
                </p>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">
                    Test ekibi başvurunuz <strong>kabul edildi</strong>! Aramıza hoş geldiniz. 🚀
                </p>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">
                    Geri bildirimleriniz bizim için çok değerli!
                </p>
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #667eea; margin: 20px 0;">
                    <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6;">
                        <strong>Sonraki Adımlar:</strong><br>
                        • <a href="${downloadLink || "#"}" style="color: #667eea; text-decoration: none; font-weight: bold;">Beta uygulamayı indirin</a><br>
                        • Karşılaştığınız hataları bildirin<br>
                        • Önerilerinizi paylaşın
                    </p>
                </div>
                ${
                  downloadLink
                    ? `
                <div style="text-align: center; margin: 24px 0;">
                    <a href="${downloadLink}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
                        📥 Beta Uygulamayı İndir
                    </a>
                </div>
                `
                    : ""
                }
                <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.8;">
                    Teşekkürler!<br>
                    <strong>KF Software Ekibi</strong>
                </p>
            </td>
        </tr>` +
      baseFooter
    );
  }

  // Test Team - Rejected
  if (templateType === "test-team-rejected") {
    return (
      baseHeader +
      `
        <tr>
            <td style="background-color: #fef2f2; padding: 20px 30px; border-bottom: 2px solid #fca5a5;">
                <div style="text-align: center;">
                    <div style="display: inline-block; background-color: #ef4444; color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">
                        Başvuru Değerlendirildi
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px;">Başvurunuz Hakkında</h2>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">
                    Merhaba${userName ? " " + userName : ""},
                </p>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">
                    Test ekibi başvurunuz için teşekkür ederiz. Maalesef şu anda test ekibimiz dolu olduğundan başvurunuzu kabul edemiyoruz.
                </p>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">
                    Gelecekte yeni test dönemleri açıldığında sizinle iletişime geçeceğiz. İlginiz için teşekkürler!
                </p>
                <p style="margin: 20px 0 0 0; color: #334155; font-size: 15px; line-height: 1.8;">
                    Saygılarımızla,<br>
                    <strong>KF Software Ekibi</strong>
                </p>
            </td>
        </tr>` +
      baseFooter
    );
  }

  // Account Deletion
  if (topic === "Hesap Silme Talebi") {
    return (
      baseHeader +
      `
        <tr>
            <td style="background-color: #fef2f2; padding: 20px 30px; border-bottom: 2px solid #fca5a5;">
                <div style="text-align: center;">
                    <div style="display: inline-block; background-color: #ef4444; color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">
                        Hesap Silindi
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px;">Hesabınız Silindi</h2>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">
                    Merhaba,
                </p>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">
                    <strong>${appName}</strong> uygulamasındaki hesabınız talebiniz doğrultusunda başarıyla silindi. Tüm verileriniz sistemlerimizden kalıcı olarak kaldırıldı.
                </p>
                <div style="background-color: #fff7ed; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b; margin: 20px 0;">
                    <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                        <strong>⚠️ Önemli:</strong> Bu işlem geri alınamaz. Hesabınıza ait tüm veriler kalıcı olarak silindi.
                    </p>
                </div>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">
                    Aramızdan ayrıldığınız için üzgünüz. 😔 Gelecekte tekrar hizmetlerimizi kullanmak isterseniz, her zaman yeni bir hesap oluşturabilirsiniz.
                </p>
                <p style="margin: 20px 0 0 0; color: #334155; font-size: 15px; line-height: 1.8;">
                    Size en iyisini dileriz,<br>
                    <strong>KF Software Ekibi</strong>
                </p>
            </td>
        </tr>` +
      baseFooter
    );
  }

  // Support Request (Default) - ENHANCED VERSION
  return (
    baseHeader +
    `
        <tr>
            <td style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 30px; border-bottom: 3px solid #3b82f6;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="text-align: center; padding-bottom: 15px;">
                            <div style="display: inline-block; background-color: #3b82f6; color: white; padding: 10px 20px; border-radius: 25px; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                                ✓ Talep Alındı
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                                <tr>
                                    <td style="width: 50%; padding: 10px; border-right: 1px solid #e5e7eb;">
                                        <p style="margin: 0; font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">
                                            📋 Talep Numarası
                                        </p>
                                        <p style="margin: 6px 0 0 0; font-size: 18px; color: #1e293b; font-weight: bold; font-family: 'Courier New', monospace;">
                                            #${ticketId}
                                        </p>
                                    </td>
                                    <td style="width: 50%; padding: 10px; text-align: right;">
                                        <p style="margin: 0; font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">
                                            📱 Uygulama
                                        </p>
                                        <p style="margin: 6px 0 0 0; font-size: 18px; color: #1e293b; font-weight: bold;">
                                            ${appName}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="margin: 0 0 24px 0; color: #1e293b; font-size: 26px; font-weight: bold;">Talebiniz Başarıyla Alındı! 🎉</h2>
                <p style="margin: 0 0 18px 0; color: #334155; font-size: 16px; line-height: 1.8;">
                    Merhaba,
                </p>
                <p style="margin: 0 0 18px 0; color: #334155; font-size: 16px; line-height: 1.8;">
                    <strong>${appName}</strong> ile ilgili destek talebiniz başarıyla sistemimize kaydedildi. Uzman ekibimiz talebinizi inceliyor ve size en kısa sürede dönüş yapacak.
                </p>
                
                <!-- Status Card -->
                <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 24px; border-radius: 16px; border-left: 5px solid #3b82f6; margin: 24px 0; box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);">
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding-bottom: 12px;">
                                <p style="margin: 0; color: #0c4a6e; font-size: 15px; font-weight: bold;">
                                    📊 Talep Durumu
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p style="margin: 0 0 10px 0; color: #0369a1; font-size: 14px; line-height: 1.7;">
                                    <strong>🔄 Durum:</strong> Talebiniz ile ilgili birimlerimiz gerekli işlemleri gerçekleştirmektedir.
                                </p>
                                <p style="margin: 0; color: #0369a1; font-size: 14px; line-height: 1.7;">
                                    <strong>⏱️ Yanıt Süresi:</strong> Genellikle 24 saat içinde yanıt veriyoruz.
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- Action Box -->
                <div style="background-color: #fef3c7; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b; margin: 24px 0;">
                    <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.7;">
                        <strong>💡 İpucu:</strong> Bu email'e direkt yanıt vererek ek bilgi paylaşabilir veya sorularınızı sorabilirsiniz. Yanıtınız otomatik olarak <strong>#${ticketId}</strong> numaralı talebinize eklenecektir.
                    </p>
                </div>

                <p style="margin: 24px 0 0 0; color: #334155; font-size: 16px; line-height: 1.8;">
                    Sabırınız için teşekkür ederiz. Size yardımcı olmaktan mutluluk duyuyoruz! 😊
                </p>
                
                <p style="margin: 24px 0 0 0; color: #334155; font-size: 16px; line-height: 1.8;">
                    İyi günler dileriz,<br>
                    <strong style="color: #667eea;">KF Software Destek Ekibi</strong>
                </p>
            </td>
        </tr>` +
    baseFooter
  );
};

export async function POST(request: NextRequest) {
  try {
    const { to, topic, appName, ticketId, userName, templateType, downloadLink } =
      await request.json();

    // Validate inputs
    if (!to || !topic) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Determine subject
    let subject = "";

    if (templateType === "test-team-accepted") {
      subject = "🎉 Test Ekibi Başvurunuz Kabul Edildi!";
    } else if (templateType === "test-team-rejected") {
      subject = "Test Ekibi Başvurunuz Hakkında";
    } else if (topic === "Hesap Silme Talebi") {
      subject = `Hesabınız Silindi - ${appName}`;
    } else {
      subject = `Destek Talebiniz Alındı - #${ticketId}`;
    }

    const htmlBody = getEmailTemplate(
      topic,
      appName || "KF Software",
      ticketId || "N/A",
      userName,
      templateType,
      downloadLink
    );

    // Send email
    await transporter.sendMail({
      from: `"KF Software" <info@kfsoftware.app>`,
      to: to,
      subject: subject,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
