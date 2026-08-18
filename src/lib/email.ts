import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  if (!process.env.SMTP_USER) {
    console.warn("[email] SMTP not configured — skipping send to", to)
    return { skipped: true }
  }
  return transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME || "Al-Shifa Medical Complex"}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    text,
  })
}

// ── Email Templates ────────────────────────────────────────────────────────

export function appointmentReminderHtml(data: {
  patientName: string
  doctorName: string
  date: string
  time: string
  type: string
}) {
  return `
<!DOCTYPE html><html><body style="font-family:sans-serif;background:#f9fafb;padding:32px">
<div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e5e7eb">
  <h2 style="color:#1d4ed8;margin-top:0">Appointment Reminder</h2>
  <p>Dear <strong>${data.patientName}</strong>,</p>
  <p>This is a reminder for your upcoming appointment:</p>
  <table style="width:100%;border-collapse:collapse;margin:16px 0">
    <tr><td style="padding:8px;background:#f3f4f6;font-weight:600">Doctor</td><td style="padding:8px">${data.doctorName}</td></tr>
    <tr><td style="padding:8px;background:#f3f4f6;font-weight:600">Date</td><td style="padding:8px">${data.date}</td></tr>
    <tr><td style="padding:8px;background:#f3f4f6;font-weight:600">Time</td><td style="padding:8px">${data.time}</td></tr>
    <tr><td style="padding:8px;background:#f3f4f6;font-weight:600">Type</td><td style="padding:8px">${data.type}</td></tr>
  </table>
  <p style="color:#6b7280;font-size:14px">Please arrive 10 minutes early. Contact us if you need to reschedule.</p>
  <p style="color:#6b7280;font-size:13px">— Al-Shifa Medical Complex Team</p>
</div></body></html>`
}

export function otpEmailHtml(data: { name: string; otp: string; type: string }) {
  const titles: Record<string, string> = {
    PASSWORD_RESET: "Reset Your Password",
    EMAIL_VERIFY: "Verify Your Email",
    "2FA": "Your One-Time Code",
  }
  return `
<!DOCTYPE html><html><body style="font-family:sans-serif;background:#f9fafb;padding:32px">
<div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e5e7eb">
  <h2 style="color:#1d4ed8;margin-top:0">${titles[data.type] || "Verification Code"}</h2>
  <p>Dear <strong>${data.name}</strong>,</p>
  <p>Your one-time code is:</p>
  <div style="text-align:center;margin:24px 0">
    <span style="font-size:36px;font-weight:700;letter-spacing:12px;color:#1d4ed8;background:#eff6ff;padding:16px 24px;border-radius:8px">${data.otp}</span>
  </div>
  <p style="color:#6b7280;font-size:14px">This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>
  <p style="color:#6b7280;font-size:13px">— Al-Shifa Medical Complex Team</p>
</div></body></html>`
}

export function labResultReadyHtml(data: { patientName: string; testType: string }) {
  return `
<!DOCTYPE html><html><body style="font-family:sans-serif;background:#f9fafb;padding:32px">
<div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e5e7eb">
  <h2 style="color:#059669;margin-top:0">Lab Results Ready</h2>
  <p>Dear <strong>${data.patientName}</strong>,</p>
  <p>Your <strong>${data.testType}</strong> lab results are now available. Please log in to the Patient Portal to view them.</p>
  <p style="color:#6b7280;font-size:13px">— Al-Shifa Medical Complex Team</p>
</div></body></html>`
}
