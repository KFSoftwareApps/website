<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    http_response_code(405);
    exit();
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

// Configuration
$fromEmail = "info@kfsoftware.app";

function getEmailTemplate($topic, $appName, $ticketId, $userName = "", $templateType = "", $downloadLink = "", $customMessage = "") {
    $currentYear = date("Y");
    
    $baseHeader = '
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
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
                        </tr>';

    $baseFooter = '
                        <tr>
                            <td style="background-color: #f8fafc; padding: 30px; border-top: 1px solid #e2e8f0;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="text-align: center;">
                                            <p style="margin: 0 0 12px 0; color: #64748b; font-size: 13px;">
                                                Bu email otomatik olarak gönderilmiştir.
                                            </p>
                                            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                                                © ' . $currentYear . ' KF Software. Tüm hakları saklıdır.
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
    </html>';

    $body = '';

    if ($templateType === 'reply') {
        $body = '
        <tr>
            <td style="background-color: #f8fafc; padding: 20px 30px; border-bottom: 2px solid #e2e8f0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="width: 50%;">
                            <p style="margin: 0; font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">TALEP NUMARASI</p>
                            <p style="margin: 4px 0 0 0; font-size: 16px; color: #1e293b; font-weight: bold; font-family: monospace;">#' . $ticketId . '</p>
                        </td>
                        <td style="width: 50%; text-align: right;">
                            <p style="margin: 0; font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">UYGULAMA</p>
                            <p style="margin: 4px 0 0 0; font-size: 16px; color: #1e293b; font-weight: bold;">' . strtolower($appName) . '</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="margin: 0 0 24px 0; color: #1e293b; font-size: 24px; font-weight: bold;">Destek Ekibimizden Yanıt 💬</h2>
                <div style="color: #334155; font-size: 15px; line-height: 1.8;">
                    ' . implode('', array_map(function($line) { return '<p style="margin: 0 0 16px 0;">' . ($line ?: '&nbsp;') . '</p>'; }, explode("\n", $customMessage))) . '
                </div>
            </td>
        </tr>';
    } elseif ($templateType === 'test-team-accepted') {
        $body = '
        <tr>
            <td style="background-color: #f0fdf4; padding: 20px 30px; border-bottom: 2px solid #86efac; text-align: center;">
                <div style="display: inline-block; background-color: #22c55e; color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">✓ KABUL EDİLDİ</div>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px;">Hoş Geldiniz! 🎉</h2>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">Merhaba ' . $userName . ',</p>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">Test ekibi başvurunuz <strong>kabul edildi</strong>! Aramıza hoş geldiniz. 🚀</p>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">Beta sürümlerimize erişim bilgilerinizi en kısa sürede e-posta ile göndereceğiz.</p>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">Geri bildirimleriniz bizim için çok değerli!</p>
                <div style="background-color: #f0f7ff; padding: 24px; border-radius: 16px; border-left: 5px solid #667eea; margin: 24px 0;">
                    <p style="margin: 0; color: #1e293b; font-size: 15px; font-weight: bold; margin-bottom: 12px;">Sonraki Adımlar:</p>
                    <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.8;">
                        <li><a href="' . ($downloadLink ?: '#') . '" style="color: #667eea; text-decoration: none; font-weight: bold;">Beta uygulamayı indirin</a></li>
                        <li>Karşılaştığınız hataları bildirin</li>
                        <li>Önerilerinizi paylaşın</li>
                    </ul>
                </div>
                <div style="text-align: center; margin: 32px 0;">
                    <a href="' . ($downloadLink ?: '#') . '" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 40px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">📥 Beta Uygulamayı İndir</a>
                </div>
                <p style="margin: 20px 0 0 0; color: #334155; font-size: 15px; line-height: 1.8;">
                    Teşekkürler!<br>
                    <strong>KF Software Ekibi</strong>
                </p>
            </td>
        </tr>';
    } elseif ($templateType === 'test-team-rejected') {
        $body = '
        <tr>
            <td style="background-color: #fef2f2; padding: 20px 30px; border-bottom: 2px solid #fca5a5;">
                <div style="text-align: center;">
                    <div style="display: inline-block; background-color: #ef4444; color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">Başvuru Değerlendirildi</div>
                </div>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px;">Başvurunuz Hakkında</h2>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">Merhaba ' . $userName . ',</p>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">Test ekibi başvurunuz için teşekkür ederiz. Maalesef şu anda test ekibimiz dolu olduğundan başvurunuzu kabul edemiyoruz.</p>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">Gelecekte yeni test dönemleri açıldığında sizinle iletişime geçeceğiz. İlginiz için teşekkürler!</p>
                <p style="margin: 20px 0 0 0; color: #334155; font-size: 15px; line-height: 1.8;">
                    Saygılarımızla,<br>
                    <strong>KF Software Ekibi</strong>
                </p>
            </td>
        </tr>';
    } elseif ($templateType === 'account-deletion') {
        $body = '
        <tr>
            <td style="background-color: #fef2f2; padding: 20px 30px; border-bottom: 2px solid #fca5a5;">
                <div style="text-align: center;">
                    <div style="display: inline-block; background-color: #ef4444; color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">Hesap Silindi</div>
                </div>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px;">Hesabınız Silindi</h2>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">Merhaba,</p>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;"><strong>' . $appName . '</strong> uygulamasındaki hesabınız talebiniz doğrultusunda başarıyla silindi. Tüm verileriniz kalıcı olarak kaldırıldı.</p>
                <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.8;">Aramızdan ayrıldığınız için üzgünüz. 😔 Gelecekte tekrar hizmetlerimizi kullanmak isterseniz, her zaman yeni bir hesap oluşturabilirsiniz.</p>
                <div style="background-color: #fff7ed; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b; margin: 20px 0;">
                    <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                        <strong>⚠️ Önemli:</strong> Bu işlem geri alınamaz. Hesabınıza ait tüm veriler kalıcı olarak silindi.
                    </p>
                </div>
                <p style="margin: 20px 0 0 0; color: #334155; font-size: 15px; line-height: 1.8;">
                    Size en iyisini dileriz, gelecekte tekrar görüşmek dileğiyle.<br>
                    <strong>KF Software Ekibi</strong>
                </p>
            </td>
        </tr>';
    } else {
        // Default Auto-Reply
        $body = '
        <tr>
            <td style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 30px; border-bottom: 3px solid #3b82f6;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="text-align: center; padding-bottom: 15px;">
                            <div style="display: inline-block; background-color: #3b82f6; color: white; padding: 10px 20px; border-radius: 25px; font-size: 13px; font-weight: bold; text-transform: uppercase;">✓ Talep Alındı</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 12px; padding: 20px;">
                                <tr>
                                    <td style="width: 50%; padding: 10px; border-right: 1px solid #e5e7eb;">
                                        <p style="margin: 0; font-size: 11px; color: #6b7280; font-weight: 600; text-transform: uppercase;">TALEP NUMARASI</p>
                                        <p style="margin: 6px 0 0 0; font-size: 18px; color: #1e293b; font-weight: bold; font-family: monospace;">#' . $ticketId . '</p>
                                    </td>
                                    <td style="width: 50%; padding: 10px; text-align: right;">
                                        <p style="margin: 0; font-size: 11px; color: #6b7280; font-weight: 600; text-transform: uppercase;">UYGULAMA</p>
                                        <p style="margin: 6px 0 0 0; font-size: 18px; color: #1e293b; font-weight: bold;">' . strtolower($appName) . '</p>
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
                <h2 style="margin: 0 0 24px 0; color: #1e293b; font-size: 26px; font-weight: bold;">Talebiniz Alındı! 🎉</h2>
                <p style="margin: 0 0 18px 0; color: #334155; font-size: 16px; line-height: 1.8;">Merhaba,</p>
                <p style="margin: 0 0 18px 0; color: #334155; font-size: 16px; line-height: 1.8;">Destek talebiniz başarıyla kaydedildi. En kısa sürede dönüş yapacağız.</p>
            </td>
        </tr>';
    }

    return $baseHeader . $body . $baseFooter;
}

try {
    $to = $input['to'] ?? '';
    $type = $input['type'] ?? 'auto-reply';
    $appName = $input['appName'] ?? 'KF Software';
    $ticketId = $input['ticketId'] ?? 'N/A';
    $userName = $input['userName'] ?? '';
    $topic = $input['topic'] ?? '';
    $message = $input['message'] ?? '';
    $downloadLink = $input['downloadLink'] ?? '';

    if (empty($to)) throw new Exception("Alıcı adresi eksik.");

    $subject = "Destek Talebiniz Alındı - #" . $ticketId;
    if ($type === 'reply') $subject = "Destek Ekibimizden Yanıt - #" . $ticketId;
    if ($type === 'test-team-accepted') $subject = "🎉 Test Ekibi Başvurunuz Kabul Edildi!";
    if ($type === 'test-team-rejected') $subject = "Test Ekibi Başvurunuz Hakkında";
    if ($type === 'account-deletion') $subject = "Hesabınız Silindi - " . $appName;
    
    $htmlBody = getEmailTemplate($topic, $appName, $ticketId, $userName, $type, $downloadLink, $message);

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: KF Software <$fromEmail>" . "\r\n";
    
    if (mail($to, $subject, $htmlBody, $headers, "-f$fromEmail")) {
        echo json_encode(["success" => true, "message" => "Email başarıyla gönderildi."]);
    } else {
        throw new Exception("Mail sunucusu hatası.");
    }

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
    http_response_code(500);
}
?>
