import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { to, subject, body, ticketId, appName } = await request.json();

    // Validate inputs
    if (!to || !subject || !body) {
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

    // Create professional HTML email
    const htmlBody = `
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
                    <!-- Header with Logo -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: -0.5px;">
                                KF Software
                            </h1>
                            <p style="margin: 8px 0 0 0; color: #e0e7ff; font-size: 14px;">
                                Profesyonel Yazılım Çözümleri
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Ticket Info Banner -->
                    <tr>
                        <td style="background-color: #f8fafc; padding: 20px 30px; border-bottom: 2px solid #e2e8f0;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="width: 50%;">
                                        <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600;">
                                            Talep Numarası
                                        </p>
                                        <p style="margin: 4px 0 0 0; font-size: 16px; color: #1e293b; font-weight: bold; font-family: monospace;">
                                            #${ticketId || "N/A"}
                                        </p>
                                    </td>
                                    <td style="width: 50%; text-align: right;">
                                        <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600;">
                                            Uygulama
                                        </p>
                                        <p style="margin: 4px 0 0 0; font-size: 16px; color: #1e293b; font-weight: bold;">
                                            ${appName || "KF Software"}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Message Body -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 24px 0; color: #1e293b; font-size: 24px; font-weight: bold;">Destek Ekibimizden Yanıt 💬</h2>
                            <div style="color: #334155; font-size: 15px; line-height: 1.8;">
                                ${body
                                  .split("\n")
                                  .map(
                                    (line: string) =>
                                      `<p style="margin: 0 0 16px 0;">${line || "&nbsp;"}</p>`
                                  )
                                  .join("")}
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8fafc; padding: 30px; border-top: 1px solid #e2e8f0;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="margin: 0 0 12px 0; color: #64748b; font-size: 13px;">
                                            Bu email'e direkt yanıt verebilirsiniz.
                                        </p>
                                        <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                                            © ${new Date().getFullYear()} KF Software. Tüm hakları saklıdır.
                                        </p>
                                        <div style="margin-top: 16px;">
                                            <a href="https://kfsoftware.app" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 8px;">
                                                Website
                                            </a>
                                            <span style="color: #cbd5e1;">•</span>
                                            <a href="https://kfsoftware.app/support" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 8px;">
                                                Destek
                                            </a>
                                            <span style="color: #cbd5e1;">•</span>
                                            <a href="https://kfsoftware.app/privacy" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 8px;">
                                                Gizlilik
                                            </a>
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
</html>
        `;

    // Send email
    await transporter.sendMail({
      from: `"KF Software Destek" <info@kfsoftware.app>`,
      to: to,
      subject: subject,
      text: body,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
