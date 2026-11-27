import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  fromEmail: string;
  fromName: string;
}

export const defaultEmailTriggers: Record<string, boolean> = {
  otp: true,
  deposit_approved: true,
  withdrawal_approved: true,
  withdrawal_rejected: true,
  kyc_approved: true,
  kyc_rejected: true,
  daily_profit: false
};

export const defaultEmailTemplates: Record<string, { subject: string; heading: string; body: string }> = {
  otp: {
    subject: '[SR Investment] Your Security Verification Code: {{otp}}',
    heading: 'Security Verification Code',
    body: 'Your one-time security code for {{purpose}} is:'
  },
  deposit_approved: {
    subject: '[SR Investment] Deposit Approved! {{currency}} {{amount}} Credited',
    heading: 'Deposit Confirmed & Activated',
    body: 'Your recent deposit has been verified and your {{plan_name}} investment portfolio contract is now running.'
  },
  withdrawal_approved: {
    subject: '[SR Investment] Payout Approved: {{currency}} {{amount}}',
    heading: 'Withdrawal Approved & Processed',
    body: 'Your payout request via {{gateway}} to account {{account}} has been successfully approved and completed.'
  },
  withdrawal_rejected: {
    subject: '[SR Investment] Withdrawal Request Update',
    heading: 'Withdrawal Request Declined',
    body: 'Your withdrawal request for {{currency}} {{amount}} could not be processed at this time. Reason: {{reason}}'
  },
  kyc_approved: {
    subject: '[SR Investment] Identity Verified (KYC Approved)',
    heading: 'Institutional KYC Approved',
    body: 'Congratulations! Your account identity documentation has been verified and approved. Full institutional withdrawal limits are now unlocked.'
  },
  kyc_rejected: {
    subject: '[SR Investment] KYC Verification Update',
    heading: 'KYC Resubmission Required',
    body: 'Your KYC submission requires revision. Note from review team: {{reason}}'
  }
};

export function renderTemplate(templateStr: string, vars: Record<string, any>) {
  if (!templateStr) return '';
  let res = templateStr;
  for (const [key, val] of Object.entries(vars)) {
    res = res.replace(new RegExp(`{{${key}}}`, 'g'), String(val ?? ''));
  }
  return res;
}

export async function getEmailSettings() {
  let dbSettings: any = null;
  try {
    const { data } = await supabase.from('system_settings').select('*').eq('id', 'global_config').maybeSingle();
    dbSettings = data;
  } catch (err) {
    console.warn('Failed to fetch system_settings for SMTP:', err);
  }

  let parsedFallback: any = {};
  if (dbSettings?.email_fallback_provider) {
    try {
      parsedFallback = JSON.parse(dbSettings.email_fallback_provider);
    } catch {}
  }

  const smtp: SmtpConfig = {
    host: dbSettings?.smtp_config?.host || parsedFallback.smtp_config?.host || dbSettings?.email_host || process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(dbSettings?.smtp_config?.port || parsedFallback.smtp_config?.port || dbSettings?.email_port || process.env.SMTP_PORT || 587),
    user: dbSettings?.smtp_config?.user || parsedFallback.smtp_config?.user || dbSettings?.email_from_email || process.env.SMTP_USER || '',
    pass: dbSettings?.smtp_config?.pass || parsedFallback.smtp_config?.pass || dbSettings?.email_provider_secret_name || process.env.SMTP_PASS || '',
    fromEmail: dbSettings?.smtp_config?.fromEmail || parsedFallback.smtp_config?.fromEmail || dbSettings?.email_from_email || 'no-reply@srinvestment.com',
    fromName: dbSettings?.smtp_config?.fromName || parsedFallback.smtp_config?.fromName || dbSettings?.email_from_name || 'SR Investment'
  };

  const triggers = {
    ...defaultEmailTriggers,
    ...(parsedFallback.triggers || dbSettings?.email_triggers_config || {})
  };

  const templates = {
    ...defaultEmailTemplates,
    ...(parsedFallback.templates || dbSettings?.email_templates || {})
  };

  return { smtp, triggers, templates };
}

export async function getSmtpConfig(): Promise<SmtpConfig> {
  const { smtp } = await getEmailSettings();
  return smtp;
}

export function createMailerTransport(config: SmtpConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: config.user && config.pass ? {
      user: config.user,
      pass: config.pass
    } : undefined,
    tls: {
      rejectUnauthorized: false
    }
  });
}

export function baseTemplate(contentHtml: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030a1a; color: #f8fafc; margin: 0; padding: 0; }
    .container { max-width: 580px; margin: 24px auto; background: #071738; border: 1px solid #173b7d; border-radius: 20px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #091f4d, #0e3b91); padding: 26px 20px; text-align: center; border-bottom: 2px solid #fbbf24; }
    .logo { font-size: 22px; font-weight: 900; color: #ffffff; letter-spacing: 1px; }
    .logo span { color: #fbbf24; }
    .tagline { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #cbd5e1; margin-top: 4px; }
    .content { padding: 28px 24px; color: #e2e8f0; font-size: 14px; line-height: 1.6; }
    .otp-box { background: #030c1f; border: 2px dashed #fbbf24; border-radius: 14px; padding: 18px; text-align: center; margin: 20px 0; }
    .otp-code { font-family: monospace; font-size: 32px; font-weight: 900; color: #fbbf24; letter-spacing: 8px; margin: 0; }
    .info-card { background: #030c1f; border: 1px solid #1a3c75; border-radius: 12px; padding: 14px; margin: 16px 0; }
    .info-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #0f2b5a; font-size: 13px; }
    .info-row:last-child { border-bottom: none; }
    .badge-approved { background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 3px 8px; border-radius: 6px; font-weight: 800; font-size: 11px; }
    .badge-rejected { background: rgba(244, 63, 94, 0.2); color: #fb7185; padding: 3px 8px; border-radius: 6px; font-weight: 800; font-size: 11px; }
    .footer { background: #040e24; padding: 18px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #122c5e; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">SR <span>INVESTMENT</span></div>
      <div class="tagline">Automated Portfolio &amp; Account Notification</div>
    </div>
    <div class="content">
      ${contentHtml}
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} SR Investment Limited. All rights reserved.
    </div>
  </div>
</body>
</html>
  `;
}

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string; }) {
  const { smtp: config } = await getEmailSettings();

  if (!config.user || !config.pass) {
    console.warn(`[Default Fallback Mode] SMTP credentials pending in Admin Panel. Simulated send to ${to}`);
    return {
      success: true,
      simulated: true,
      message: `[Default Mode] Email queued for ${to}`,
      configUsed: { host: config.host, port: config.port, user: config.user }
    };
  }

  const transporter = createMailerTransport(config);
  const info = await transporter.sendMail({
    from: `"${config.fromName}" <${config.fromEmail}>`,
    to,
    subject,
    html: baseTemplate(html)
  });

  return { success: true, messageId: info.messageId, response: info.response };
}

// 1. Email OTP
export async function sendOtpEmail(to: string, otp: string, purpose = 'Verification') {
  const { triggers, templates } = await getEmailSettings();
  if (triggers.otp === false) {
    return { success: true, skipped: true, message: 'OTP email trigger disabled by admin' };
  }

  const tpl = templates.otp || defaultEmailTemplates.otp;
  const vars = { otp, purpose, email: to, expiry_minutes: 15 };
  const subject = renderTemplate(tpl.subject, vars);
  const heading = renderTemplate(tpl.heading, vars);
  const bodyText = renderTemplate(tpl.body, vars);

  const html = `
    <h2 style="color: #ffffff; margin-top: 0;">${heading}</h2>
    <p>Hello,</p>
    <p>${bodyText}</p>
    <div class="otp-box">
      <div class="otp-code">${otp}</div>
    </div>
    <p style="font-size: 12px; color: #94a3b8;">
      ⏳ This security code is valid for <strong>15 minutes</strong>. If you did not request this code, please contact support immediately.
    </p>
  `;
  return sendEmail({ to, subject, html });
}

// 2. Deposit Approved
export async function sendDepositApprovedEmail({
  to,
  name,
  amount,
  currency = 'USD',
  planName = 'Active Investment',
  orderId
}: {
  to: string;
  name?: string;
  amount: number;
  currency?: string;
  planName?: string;
  orderId?: string | number;
}) {
  const { triggers, templates } = await getEmailSettings();
  if (triggers.deposit_approved === false) {
    return { success: true, skipped: true, message: 'Deposit approval email disabled by admin' };
  }

  const tpl = templates.deposit_approved || defaultEmailTemplates.deposit_approved;
  const vars = { name: name || 'Investor', amount, currency, plan_name: planName, order_id: orderId || '', date: new Date().toLocaleDateString() };
  const subject = renderTemplate(tpl.subject, vars);
  const heading = renderTemplate(tpl.heading, vars);
  const bodyText = renderTemplate(tpl.body, vars);

  const html = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
      <h2 style="color: #ffffff; margin: 0;">${heading}</h2>
      <span class="badge-approved">Approved</span>
    </div>
    <p>Dear <strong>${name || 'Investor'}</strong>,</p>
    <p>${bodyText}</p>
    <div class="info-card">
      <div class="info-row"><span>Amount Credited:</span><strong style="color: #34d399;">${currency} ${amount}</strong></div>
      <div class="info-row"><span>Plan Activated:</span><strong>${planName}</strong></div>
      ${orderId ? `<div class="info-row"><span>Order Reference:</span><strong>#${orderId}</strong></div>` : ''}
      <div class="info-row"><span>Approval Date:</span><span>${new Date().toLocaleDateString()}</span></div>
    </div>
    <p>Your capital is active and earning daily returns. You can monitor your contracts on your investor dashboard.</p>
  `;
  return sendEmail({ to, subject, html });
}

// 3. Withdrawal Approved
export async function sendWithdrawalApprovedEmail({
  to,
  name,
  amount,
  currency = 'USD',
  gateway = 'Payout Gateway',
  account,
  reference
}: {
  to: string;
  name?: string;
  amount: number;
  currency?: string;
  gateway?: string;
  account?: string;
  reference?: string;
}) {
  const { triggers, templates } = await getEmailSettings();
  if (triggers.withdrawal_approved === false) {
    return { success: true, skipped: true, message: 'Withdrawal approval email disabled by admin' };
  }

  const tpl = templates.withdrawal_approved || defaultEmailTemplates.withdrawal_approved;
  const vars = { name: name || 'Investor', amount, currency, gateway, account: account || '', reference: reference || '', date: new Date().toLocaleString() };
  const subject = renderTemplate(tpl.subject, vars);
  const heading = renderTemplate(tpl.heading, vars);
  const bodyText = renderTemplate(tpl.body, vars);

  const html = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
      <h2 style="color: #ffffff; margin: 0;">${heading}</h2>
      <span class="badge-approved">Paid</span>
    </div>
    <p>Dear <strong>${name || 'Investor'}</strong>,</p>
    <p>${bodyText}</p>
    <div class="info-card">
      <div class="info-row"><span>Amount Paid:</span><strong style="color: #fbbf24;">${currency} ${amount}</strong></div>
      <div class="info-row"><span>Payout Method:</span><strong>${gateway}</strong></div>
      <div class="info-row"><span>Destination Account:</span><strong>${account || 'Verified Account'}</strong></div>
      ${reference ? `<div class="info-row"><span>Payout Reference:</span><strong style="color: #38bdf8;">${reference}</strong></div>` : ''}
      <div class="info-row"><span>Processed Date:</span><span>${new Date().toLocaleString()}</span></div>
    </div>
    <p>Please check your receiving wallet or bank account. Thank you for investing with us.</p>
  `;
  return sendEmail({ to, subject, html });
}

// 4. Withdrawal Rejected
export async function sendWithdrawalRejectedEmail({
  to,
  name,
  amount,
  currency = 'USD',
  reason
}: {
  to: string;
  name?: string;
  amount: number;
  currency?: string;
  reason?: string;
}) {
  const { triggers, templates } = await getEmailSettings();
  if (triggers.withdrawal_rejected === false) {
    return { success: true, skipped: true, message: 'Withdrawal rejection email disabled by admin' };
  }

  const tpl = templates.withdrawal_rejected || defaultEmailTemplates.withdrawal_rejected;
  const vars = { name: name || 'Investor', amount, currency, reason: reason || '', date: new Date().toLocaleDateString() };
  const subject = renderTemplate(tpl.subject, vars);
  const heading = renderTemplate(tpl.heading, vars);
  const bodyText = renderTemplate(tpl.body, vars);

  const html = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
      <h2 style="color: #ffffff; margin: 0;">${heading}</h2>
      <span class="badge-rejected">Declined</span>
    </div>
    <p>Dear <strong>${name || 'Investor'}</strong>,</p>
    <p>${bodyText}</p>
    <div class="info-card">
      <div class="info-row"><span>Reason / Note:</span><strong style="color: #fb7185;">${reason || 'Details could not be verified'}</strong></div>
      <div class="info-row"><span>Action Taken:</span><span>Funds returned to withdrawable balance</span></div>
    </div>
    <p>You may submit a revised request anytime or contact Live Support for assistance.</p>
  `;
  return sendEmail({ to, subject, html });
}

// 5. KYC Approved
export async function sendKycApprovedEmail({ to, name }: { to: string; name?: string; }) {
  const { triggers, templates } = await getEmailSettings();
  if (triggers.kyc_approved === false) {
    return { success: true, skipped: true, message: 'KYC approval email disabled by admin' };
  }

  const tpl = templates.kyc_approved || defaultEmailTemplates.kyc_approved;
  const vars = { name: name || 'Investor', date: new Date().toLocaleDateString() };
  const subject = renderTemplate(tpl.subject, vars);
  const heading = renderTemplate(tpl.heading, vars);
  const bodyText = renderTemplate(tpl.body, vars);

  const html = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
      <h2 style="color: #ffffff; margin: 0;">${heading}</h2>
      <span class="badge-approved">Approved</span>
    </div>
    <p>Dear <strong>${name || 'Investor'}</strong>,</p>
    <p>${bodyText}</p>
    <div class="info-card">
      <div class="info-row"><span>KYC Status:</span><strong style="color: #34d399;">APPROVED</strong></div>
      <div class="info-row"><span>Account Limits:</span><strong>Full Limits Unlocked</strong></div>
    </div>
    <p>All institutional withdrawal limits and portfolio tools are now active on your account.</p>
  `;
  return sendEmail({ to, subject, html });
}
