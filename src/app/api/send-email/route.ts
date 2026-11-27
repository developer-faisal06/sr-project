export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';


import { NextRequest, NextResponse } from 'next/server';
import {
  sendOtpEmail,
  sendDepositApprovedEmail,
  sendWithdrawalApprovedEmail,
  sendWithdrawalRejectedEmail,
  sendKycApprovedEmail,
  sendEmail,
  getSmtpConfig
} from '../../../lib/smtpService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, payload } = body;

    if (!type || !payload) {
      return NextResponse.json({ success: false, error: 'Missing type or payload' }, { status: 400 });
    }

    let result: any = null;

    switch (type) {
      case 'OTP':
        if (!payload.email || !payload.otp) {
          return NextResponse.json({ success: false, error: 'Missing email or otp' }, { status: 400 });
        }
        result = await sendOtpEmail(payload.email, payload.otp, payload.purpose || 'Verification');
        break;

      case 'DEPOSIT_APPROVED':
        if (!payload.to || !payload.amount) {
          return NextResponse.json({ success: false, error: 'Missing recipient email or amount' }, { status: 400 });
        }
        result = await sendDepositApprovedEmail({
          to: payload.to,
          name: payload.name,
          amount: payload.amount,
          currency: payload.currency || 'USD',
          planName: payload.planName,
          orderId: payload.orderId
        });
        break;

      case 'WITHDRAWAL_APPROVED':
        if (!payload.to || !payload.amount) {
          return NextResponse.json({ success: false, error: 'Missing recipient email or amount' }, { status: 400 });
        }
        result = await sendWithdrawalApprovedEmail({
          to: payload.to,
          name: payload.name,
          amount: payload.amount,
          currency: payload.currency || 'USD',
          gateway: payload.gateway,
          account: payload.account,
          reference: payload.reference
        });
        break;

      case 'WITHDRAWAL_REJECTED':
        if (!payload.to) {
          return NextResponse.json({ success: false, error: 'Missing recipient email' }, { status: 400 });
        }
        result = await sendWithdrawalRejectedEmail({
          to: payload.to,
          name: payload.name,
          amount: payload.amount,
          currency: payload.currency || 'USD',
          reason: payload.reason
        });
        break;

      case 'KYC_APPROVED':
        if (!payload.to) {
          return NextResponse.json({ success: false, error: 'Missing recipient email' }, { status: 400 });
        }
        result = await sendKycApprovedEmail({
          to: payload.to,
          name: payload.name
        });
        break;

      case 'TEST':
        if (!payload.to) {
          return NextResponse.json({ success: false, error: 'Missing test recipient email' }, { status: 400 });
        }
        const config = await getSmtpConfig();
        result = await sendEmail({
          to: payload.to,
          subject: '[SR Investment] SMTP Configuration Test Successful',
          html: `
            <h2 style="color: #34d399; margin-top: 0;">SMTP Test Successful</h2>
            <p>Your SMTP mail server configuration is fully functional and successfully connected.</p>
            <div class="info-card">
              <div class="info-row"><span>SMTP Host:</span><strong>${config.host}</strong></div>
              <div class="info-row"><span>SMTP Port:</span><strong>${config.port}</strong></div>
              <div class="info-row"><span>Sender Email:</span><strong>${config.fromEmail}</strong></div>
              <div class="info-row"><span>Test Timestamp:</span><span>${new Date().toLocaleString()}</span></div>
            </div>
            <p>Automated verification emails, OTP codes, and transaction approval notices will now be sent through this SMTP server.</p>
          `
        });
        break;

      default:
        return NextResponse.json({ success: false, error: `Unsupported email type: ${type}` }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API /api/send-email error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'SMTP dispatch error' }, { status: 500 });
  }
}
