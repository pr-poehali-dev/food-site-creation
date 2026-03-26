"""
Отправка заявки с сайта ЮМА ТРЕЙД на email менеджера.
"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Invalid JSON"})}

    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    company = body.get("company", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Name and phone required"})}

    smtp_host = os.environ.get("SMTP_HOST", "smtp.yandex.ru")
    smtp_port = int(os.environ.get("SMTP_PORT", "465"))
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    recipient = os.environ.get("LEAD_EMAIL", smtp_user)

    subject = f"Новая заявка с сайта ЮМА ТРЕЙД — {name}"
    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1a7a3c; padding: 20px; border-radius: 8px 8px 0 0;">
        <h2 style="color: #7dc832; margin: 0; font-size: 22px;">ЮМА ТРЕЙД</h2>
        <p style="color: #fff; margin: 4px 0 0; font-size: 14px;">Новая заявка с сайта</p>
      </div>
      <div style="background: #f9f5ec; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0d8c8;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #666; font-size: 14px; width: 140px;">Имя:</td>
            <td style="padding: 10px 0; color: #222; font-size: 14px; font-weight: bold;">{name}</td>
          </tr>
          <tr style="border-top: 1px solid #e0d8c8;">
            <td style="padding: 10px 0; color: #666; font-size: 14px;">Телефон:</td>
            <td style="padding: 10px 0; color: #222; font-size: 14px; font-weight: bold;">
              <a href="tel:{phone}" style="color: #1a7a3c;">{phone}</a>
            </td>
          </tr>
          {"" if not company else f'<tr style="border-top: 1px solid #e0d8c8;"><td style="padding: 10px 0; color: #666; font-size: 14px;">Компания:</td><td style="padding: 10px 0; color: #222; font-size: 14px;">{company}</td></tr>'}
          {"" if not message else f'<tr style="border-top: 1px solid #e0d8c8;"><td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;">Сообщение:</td><td style="padding: 10px 0; color: #222; font-size: 14px;">{message}</td></tr>'}
        </table>
      </div>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = smtp_user
    msg["To"] = recipient
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, [recipient], msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"success": True}),
    }
