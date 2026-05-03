/**
 * Generate HTML email template for student credentials
 */
export function generateStudentCredentialEmail(data: {
  name: string;
  studentId: string;
  batch: string;
  password: string;
}): string {
  const initial = data.name.charAt(0).toUpperCase();
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Welcome to IELTS Abdal</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    * { box-sizing: border-box; }
    body, html { margin: 0; padding: 0; width: 100% !important; }
    body { background-color: #EDF2F0; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; display: block; outline: none; -ms-interpolation-mode: bicubic; }
    a { text-decoration: none; }

    .email-wrapper { width: 100%; background-color: #EDF2F0; padding: 28px 16px; }
    .email-card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.05); }

    /* HEADER */
    .header { background: #0E2B2B; padding: 36px 32px 0; text-align: center; position: relative; }
    .header-badge { display: inline-block; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); color: #7DD4B8; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 5px 14px; border-radius: 20px; margin-bottom: 18px; }
    .header h1 { color: #ffffff; margin: 0 0 6px; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.2; }
    .header-sub { color: #7DD4B8; margin: 0 0 24px; font-size: 13px; font-weight: 500; }
    .logo-wrap { display: inline-block; padding: 14px 0 0; margin-top: 4px; }
    .logo-wrap img { width: 140px; height: auto; display: block; }

    /* WELCOME BAND */
    .welcome-band { background: linear-gradient(90deg, #1A4A3A 0%, #0E3030 100%); padding: 18px 28px; display: flex; align-items: center; gap: 12px; }
    .welcome-avatar { width: 40px; height: 40px; min-width: 40px; background: #2D7A5F; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: #fff; }
    .welcome-text { font-size: 14px; color: #A8D5C2; line-height: 1.5; }
    .welcome-text strong { color: #ffffff; font-weight: 700; }

    /* CONTENT */
    .content { padding: 28px 28px 10px; }

    /* SECTION HEADER */
    .sec-head { display: flex; align-items: center; gap: 8px; margin: 24px 0 14px; }
    .sec-icon { width: 28px; height: 28px; min-width: 28px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 13px; }
    .sec-icon.green { background: #E8F5F0; }
    .sec-icon.blue { background: #E8F0F8; }
    .sec-icon.orange { background: #FFF3E8; }
    .sec-icon.purple { background: #F0EAF8; }
    .sec-label { font-size: 13px; font-weight: 700; color: #0E2B2B; letter-spacing: 0.5px; text-transform: uppercase; }

    /* DETAIL ROWS */
    .detail-grid { background: #F7FAF9; border-radius: 12px; overflow: hidden; border: 1px solid #E8EFEC; margin-bottom: 8px; }
    .detail-row { display: flex; align-items: flex-start; padding: 12px 16px; border-bottom: 1px solid #E8EFEC; gap: 12px; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { font-size: 12px; font-weight: 700; color: #6B8A7A; min-width: 110px; text-transform: uppercase; letter-spacing: 0.4px; padding-top: 1px; }
    .detail-value { font-size: 14px; color: #1A2E26; font-weight: 500; line-height: 1.4; flex: 1; }
    .detail-value a { color: #1A7A5A; font-weight: 600; }
    .detail-value strong { color: #0E2B2B; font-weight: 700; font-size: 15px; }

    /* CREDENTIALS BOX */
    .creds-box { background: #0E2B2B; border-radius: 12px; padding: 18px 20px; margin-bottom: 8px; }
    .creds-row { display: flex; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.07); gap: 10px; }
    .creds-row:last-child { border-bottom: none; }
    .creds-label { font-size: 11px; font-weight: 700; color: #7DD4B8; min-width: 88px; text-transform: uppercase; letter-spacing: 0.5px; }
    .creds-value { font-size: 14px; color: #ffffff; font-weight: 600; flex: 1; }
    .creds-value a { color: #7DD4B8; }
    .pwd-chip { display: inline-block; background: #1D4D3A; border: 1px solid #2D7A5F; color: #7DD4B8; padding: 3px 12px; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 15px; font-weight: 700; letter-spacing: 2px; }

    /* ALERT */
    .alert { display: flex; align-items: flex-start; gap: 10px; background: #FFF8F0; border: 1px solid #FFD9A8; border-radius: 10px; padding: 12px 14px; margin: 12px 0; }
    .alert-icon { font-size: 14px; margin-top: 1px; }
    .alert-text { font-size: 12.5px; color: #8A4A10; line-height: 1.6; }

    /* CTA BUTTON */
    .cta-wrap { text-align: center; padding: 20px 0 8px; }
    .cta-btn { display: inline-block; background: #0E2B2B; color: #ffffff; font-size: 14px; font-weight: 700; padding: 14px 36px; border-radius: 10px; letter-spacing: 0.3px; box-shadow: 0 4px 16px rgba(14,43,43,0.25); }

    /* FEATURES GRID */
    .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px; }
    .feature-item { background: #F7FAF9; border: 1px solid #E0EDEA; border-radius: 10px; padding: 12px 14px; display: flex; align-items: flex-start; gap: 9px; }
    .feature-dot { width: 20px; height: 20px; min-width: 20px; background: #E0F5EC; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; color: #1A7A5A; margin-top: 1px; }
    .feature-text { font-size: 12.5px; color: #2A4A3A; font-weight: 500; line-height: 1.4; }

    /* DIVIDER */
    .divider { height: 1px; background: #EDF2EF; margin: 4px 0; }

    /* HOURS */
    .hours-grid { display: flex; gap: 8px; margin-bottom: 8px; }
    .hours-item { flex: 1; background: #F7FAF9; border: 1px solid #E0EDEA; border-radius: 10px; padding: 12px 14px; text-align: center; }
    .hours-days { font-size: 11px; font-weight: 700; color: #6B8A7A; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px; }
    .hours-time { font-size: 13px; font-weight: 700; color: #0E2B2B; }
    .hours-closed { font-size: 13px; font-weight: 700; color: #C0392B; }

    /* FOOTER */
    .footer { background: #0E2B2B; padding: 22px 28px; margin-top: 20px; }
    .footer-contact { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
    .footer-contact-item { flex: 1; min-width: 220px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 9px; padding: 11px 14px; }
    .fc-label { font-size: 10px; font-weight: 700; color: #7DD4B8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px; }
    .fc-value { font-size: 12.5px; color: #C8DFD8; font-weight: 500; line-height: 1.4; }
    .fc-value a { color: #7DD4B8; }
    .footer-bottom { border-top: 1px solid rgba(255,255,255,0.07); padding-top: 14px; text-align: center; }
    .footer-links { margin-bottom: 8px; }
    .footer-links a { font-size: 11.5px; color: #7DD4B8; margin: 0 8px; font-weight: 500; }
    .footer-copy { font-size: 11px; color: #4A7A6A; }
    .confidential-bar { background: #F0F5F2; border-top: 1px solid #DCE8E3; text-align: center; padding: 10px 20px; font-size: 11px; color: #6B8A7A; font-weight: 500; }

    /* MOBILE */
    @media only screen and (max-width: 500px) {
      .email-wrapper { padding: 16px 10px; }
      .email-card { border-radius: 16px; }
      .header { padding: 28px 20px 0; }
      .header h1 { font-size: 22px; }
      .welcome-band { padding: 14px 18px; }
      .content { padding: 20px 18px 8px; }
      .detail-label { min-width: 90px; font-size: 11px; }
      .detail-value { font-size: 13px; }
      .features-grid { grid-template-columns: 1fr; }
      .hours-grid { flex-direction: column; }
      .footer { padding: 18px 18px; }
      .footer-contact-item { min-width: 100%; }
      .cta-btn { padding: 13px 28px; font-size: 13px; }
      .logo-wrap img { width: 110px; }
      .creds-label { min-width: 76px; }
    }
  </style>
</head>
<body>
<div class="email-wrapper">
  <div class="email-card">

    <!-- HEADER -->
    <div class="header">
      <div class="header-badge">Student Portal Access</div>
      <h1>IELTS Abdal</h1>
      <p class="header-sub">Your Gateway to English Mastery &amp; IELTS Success</p>
      <div class="logo-wrap">
        <img src="https://i.postimg.cc/KjT16m5R/logo.png" alt="IELTS Abdal" />
      </div>
    </div>

    <!-- WELCOME BAND -->
    <div class="welcome-band">
      <div class="welcome-avatar">${initial}</div>
      <div class="welcome-text">
        Welcome, <strong>${data.name}</strong>! Your student account is now active and ready to use. Let's begin your IELTS journey.
      </div>
    </div>

    <!-- CONTENT -->
    <div class="content">

      <!-- STUDENT DETAILS -->
      <div class="sec-head">
        <div class="sec-icon green">🎓</div>
        <span class="sec-label">Student Details</span>
      </div>
      <div class="detail-grid">
        <div class="detail-row">
          <span class="detail-label">Full Name</span>
          <span class="detail-value">${data.name}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Student ID</span>
          <span class="detail-value"><strong>${data.studentId}</strong></span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Batch / Track</span>
          <span class="detail-value">${data.batch}</span>
        </div>
      </div>

      <!-- LOGIN CREDENTIALS -->
      <div class="sec-head">
        <div class="sec-icon blue">🔐</div>
        <span class="sec-label">Login Credentials</span>
      </div>
      <div class="creds-box">
        <div class="creds-row">
          <span class="creds-label">Portal URL</span>
          <span class="creds-value"><a href="https://ielts-abdal.web.app/">ielts-abdal.web.app</a></span>
        </div>
        <div class="creds-row">
          <span class="creds-label">Username</span>
          <span class="creds-value">${data.studentId}</span>
        </div>
        <div class="creds-row">
          <span class="creds-label">Password</span>
          <span class="creds-value"><span class="pwd-chip">${data.password}</span></span>
        </div>
      </div>

      <div class="alert">
        <span class="alert-icon">⚠️</span>
        <span class="alert-text">Save these credentials securely. Contact our support team to change or reset your password at any time.</span>
      </div>

      <div class="cta-wrap">
        <a href="https://ielts-abdal.web.app/" class="cta-btn">🚀 Access Your Student Portal</a>
      </div>

      <!-- WHAT YOU CAN DO -->
      <div class="sec-head">
        <div class="sec-icon green">✨</div>
        <span class="sec-label">What You Can Do</span>
      </div>
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-dot">✓</div>
          <span class="feature-text">Full-length mock tests &amp; practice exams</span>
        </div>
        <div class="feature-item">
          <div class="feature-dot">✓</div>
          <span class="feature-text">Detailed results &amp; band score breakdowns</span>
        </div>
        <div class="feature-item">
          <div class="feature-dot">✓</div>
          <span class="feature-text">Progress tracking with analytics</span>
        </div>
        <div class="feature-item">
          <div class="feature-dot">✓</div>
          <span class="feature-text">Study materials &amp; answer explanations</span>
        </div>
        <div class="feature-item">
          <div class="feature-dot">✓</div>
          <span class="feature-text">Personalized performance insights</span>
        </div>
        <div class="feature-item">
          <div class="feature-dot">✓</div>
          <span class="feature-text">Expert guidance &amp; structured learning</span>
        </div>
      </div>

      <!-- OFFICE HOURS -->
      <div class="sec-head">
        <div class="sec-icon orange">🕐</div>
        <span class="sec-label">Office Hours</span>
      </div>
      <div class="hours-grid">
        <div class="hours-item">
          <div class="hours-days">Saturday – Thursday</div>
          <div class="hours-time">10:00 AM – 6:00 PM</div>
        </div>
        <div class="hours-item">
          <div class="hours-days">Friday</div>
          <div class="hours-closed">Closed</div>
        </div>
      </div>

    </div><!-- /content -->

    <!-- FOOTER -->
    <div class="footer">
      <div class="footer-contact">
        <div class="footer-contact-item">
          <div class="fc-label">📍 Location</div>
          <div class="fc-value">Millennium Shopping Complex,<br>Lift-7, Zindabazar, Sylhet</div>
        </div>
        <div class="footer-contact-item">
          <div class="fc-label">⏰ Office Hours</div>
          <div class="fc-value">Saturday - Thursday<br>10:00 AM - 6:00 PM</div>
        </div>
        <div class="footer-contact-item">
          <div class="fc-label">📞 Phone</div>
          <div class="fc-value">01792325203</div>
        </div>
        <div class="footer-contact-item">
          <div class="fc-label">✉️ Email</div>
          <div class="fc-value"><a href="mailto:abdal.ieltsacademy@gmail.com">abdal.ieltsacademy<br>@gmail.com</a></div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Manage Preferences</a>
        </div>
        <div class="footer-copy">© 2025 IELTS Abdal. All rights reserved.<br>This is an automated email — please do not reply directly.</div>
      </div>
    </div>

    <!-- CONFIDENTIAL BAR -->
    <div class="confidential-bar">
      🔒 Confidential — Do not share your login credentials with anyone
    </div>

  </div>
</div>
</body>
</html>`;
}
