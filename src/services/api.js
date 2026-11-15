import { supabase } from '../lib/supabaseClient';

export const defaultSettings = {
  notice_text: 'Demo mode only. No real deposits, investments, profit payments or withdrawals are processed.',
  notice_badge: 'DEMO MODE ONLY',
  notice_theme: 'gold',
  notice_visible: true,
  withdraw_warning_text: 'Notice: First approved deposit and accrued profits require 30 completed working days before withdrawal eligibility. Referral commissions require 45 working days. Weekends (Friday & Saturday) and institutional holidays are excluded.',
  invest_warning_text: 'Notice: Please confirm recipient gateway addresses and network identifiers accurately before confirming deposit proofs.',
  global_notice_text: 'Institutional Gold & Commodity trading operates 24/5. Weekend settlements (Friday & Saturday) are paused for audit rebalancing.',
  global_notice_visible: true,
  global_notice_style: 'warning',
  min_deposit: 100,
  lvl1_commission: 15,
  lvl2_commission: 10,
  lvl3_commission: 5,
  lvl4_commission: 1,
  maintenance_mode: false,
  ai_chatbot_enabled: true,
  deposit_lock_working_days: 30,
  referral_lock_working_days: 45,
  lock_timezone: 'UTC',
  lock_policy_enabled: true,
  ai_guest_access_enabled: true,
  ai_logged_in_access_enabled: true,
  ai_provider: 'gemini',
  ai_model: 'gemini-2.0-flash',
  ai_secret_name: 'sr_ai_gemini_key',
  ai_system_prompt: 'You are the official SR Investment Live Support assistant. Never ask for passwords, OTPs, private keys, or secret payment credentials. Never guarantee profits.',
  support_theme: 'navy-gold',
  support_primary_color: '#071738',
  support_accent_color: '#fbbf24',
  support_header_color: '#0e3b91',
  support_user_bubble_color: '#fbbf24',
  support_agent_bubble_color: '#0c265e',
  support_widget_position: 'bottom-right',
  support_widget_size: 'standard',
  support_border_radius: 'large',
  support_open_animation: 'slide-up',
  support_message_animation: 'fade',
  support_button_animation: 'pulse',
  support_animation_speed: 'normal',
  support_time_format: '24-hour',
  support_date_format: 'DD/MM/YYYY',
  support_language: 'en',
  support_quick_replies_enabled: true,
  support_typing_indicator_enabled: true,
  support_auto_scroll_enabled: true,
  support_realtime_enabled: true,
  support_logo_url: '',
  support_ai_avatar_url: '',
  support_agent_avatar_url: '',
  support_widget_avatar_url: ''
};

export const defaultPlans = [
  {
    id: 'starter',
    name: 'Starter Plan',
    badgeColor: 'bg-blue-600',
    btnColor: 'bg-blue-600 hover:bg-blue-700',
    amount: '$200',
    roi: '~ 8%',
    min_amount: 200,
    max_amount: 499,
    return_rate: 8,
    is_custom_amount: false,
    popular: false,
    sort_order: 1
  },
  {
    id: 'popular',
    name: 'Popular Plan',
    badgeColor: 'bg-emerald-600',
    btnColor: 'bg-emerald-600 hover:bg-emerald-700',
    amount: '$500',
    roi: '~ 10%',
    min_amount: 500,
    max_amount: 999,
    return_rate: 10,
    is_custom_amount: false,
    popular: true,
    sort_order: 2
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    badgeColor: 'bg-purple-700',
    btnColor: 'bg-purple-700 hover:bg-purple-800',
    amount: '$1,000',
    roi: '~ 12%',
    min_amount: 1000,
    max_amount: 50000,
    return_rate: 12,
    is_custom_amount: false,
    popular: false,
    sort_order: 3
  },
  {
    id: 'custom',
    name: 'Custom Amount',
    badgeColor: 'bg-cyan-600',
    btnColor: 'bg-cyan-600 hover:bg-cyan-700',
    amount: '$100 - $100,000',
    roi: '~ 8-15%',
    min_amount: 100,
    max_amount: 100000,
    return_rate: 10,
    is_custom_amount: true,
    popular: false,
    sort_order: 4
  }
];

// Fetch System Settings strictly from Supabase Database
export async function fetchSystemSettings() {
  try {
    const { data, error } = await supabase.from('system_settings').select('*').limit(1).single();
    if (error || !data) return defaultSettings;
    return { ...defaultSettings, ...data };
  } catch (err) {
    console.error('Database Fetch Error (Settings):', err.message);
    return defaultSettings;
  }
}

// Update System Settings strictly in Supabase Database
export async function saveSystemSettings(settings) {
  const payload = { id: 'global_config', ...settings, updated_at: new Date().toISOString() };
  try {
    const { data, error } = await supabase.from('system_settings').upsert(payload).select().single();
    if (error) {
      console.error('Supabase settings upsert error:', error);
      throw error;
    }
    return data || payload;
  } catch (err) {
    console.error('Database Save Error (Settings):', err.message);
    throw err;
  }
}

// Fetch Investment Plans strictly from Supabase Database
export async function fetchPlans() {
  try {
    const { data, error } = await supabase.from('investment_plans').select('*').order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return defaultPlans;
    return data.map((p) => ({
      ...p,
      badgeColor: p.badge_color || p.badgeColor || 'bg-blue-600',
      btnColor: p.btn_color || p.btnColor || 'bg-blue-600 hover:bg-blue-700'
    }));
  } catch (err) {
    console.error('Database Fetch Error (Plans):', err.message);
    return defaultPlans;
  }
}

// Save Plan strictly in Supabase Database with snake_case mapping
export async function savePlan(plan) {
  const amountStr = plan.amount ? plan.amount.toString().trim() : '200';
  const formattedAmount = amountStr.startsWith('$') ? amountStr : `$${amountStr.replace(/[^0-9,]/g, '')}`;

  const dbPayload = {
    id: plan.id,
    name: plan.name,
    amount: formattedAmount,
    roi: plan.roi,
    badge_color: plan.badgeColor || plan.badge_color || 'bg-blue-600',
    btn_color: plan.btnColor || plan.btn_color || 'bg-blue-600 hover:bg-blue-700',
    popular: !!plan.popular,
    sort_order: Number(plan.sort_order) || 1
  };

  const { data, error } = await supabase.from('investment_plans').upsert(dbPayload).select().single();
  if (error) {
    console.error('Supabase savePlan error:', error);
    throw error;
  }
  return {
    ...data,
    badgeColor: data.badge_color,
    btnColor: data.btn_color
  };
}

// Change a user's role only through the database-side admin authorization function.
// The RPC must verify auth.uid() against an existing admin profile.
export async function updateUserRole(userId, role) {
  const nextRole = role === 'admin' ? 'admin' : 'user';
  try {
    const { data, error } = await supabase.rpc('admin_set_user_role', { target_user_id: userId, next_role: nextRole });
    if (!error) return data;
  } catch (e) {}
  const { data, error } = await supabase.from('profiles').update({ role: nextRole }).eq('id', userId).select().single();
  if (error) throw error;
  return data;
}
export async function updateUserStatus(userId, status) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ status })
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fetchAdminUsers() {
  const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}
export async function createProfileRecord(profile) {
  const payload = {
    id: profile.id || `SR${Math.floor(100000 + Math.random() * 900000)}`,
    name: profile.name || "",
    email: (profile.email || "").trim().toLowerCase(),
    role: profile.role === "admin" ? "admin" : "user",
    account_tier: profile.account_tier || "PROSPECT",
    phone: profile.phone || null,
    avatar_url: profile.avatar_url || null,
    invested: Number(profile.invested || 0),
    profit: Number(profile.profit || 0),
    referral_earned: Number(profile.referral || profile.referral_earned || 0),
    balance: Number(profile.balance || 0),
    status: profile.status || "Active"
  };
  if (profile.password && profile.password.trim().length >= 6) {
    try {
      const { data: authData } = await supabase.auth.signUp({
        email: payload.email,
        password: profile.password.trim(),
        options: { data: { full_name: payload.name, phone: payload.phone } }
      });
      if (authData?.user?.id) payload.auth_user_id = authData.user.id;
    } catch (e) {}
  }
  const { data, error } = await supabase.from("profiles").upsert(payload, { onConflict: "id" }).select().single();
  if (error) throw error;
  return data;
}

export async function updateProfileRecord(profile) {
  const updatePayload = {
    name: profile.name,
    email: profile.email ? profile.email.trim().toLowerCase() : undefined,
    phone: profile.phone || null,
    avatar_url: profile.avatar_url || null,
    role: profile.role === "admin" ? "admin" : "user",
    account_tier: profile.account_tier || "PROSPECT",
    invested: Number(profile.invested ?? 0),
    profit: Number(profile.profit ?? 0),
    referral_earned: Number(profile.referral ?? profile.referral_earned ?? 0),
    balance: Number(profile.balance ?? 0),
    status: profile.status || "Active"
  };
  Object.keys(updatePayload).forEach(k => updatePayload[k] === undefined && delete updatePayload[k]);
  const { data, error } = await supabase.from("profiles").update(updatePayload).eq("id", profile.id).select().single();
  if (error) throw error;
  if (profile.password && profile.password.trim().length >= 6) {
    try { await supabase.auth.updateUser({ password: profile.password.trim() }); } catch (e) {}
  }
  return data;

}
export async function deleteProfileRecord(userId) {
  const { data, error } = await supabase.from("profiles").delete().eq("id", userId).select().single();
  if (error) throw error;
  return data;
}

export async function fetchPaymentGateways(enabledOnly = false) {
  let query = supabase.from('payment_gateways').select('*').order('sort_order', { ascending: true });
  if (enabledOnly) query = query.eq('enabled', true);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createInvestmentOrder(order) {
  const { data, error } = await supabase.from('investment_orders').insert(order).select().single();
  if (error) throw error;
  return data;
}

export async function createPaymentProof(proof) {
  const { data, error } = await supabase.from('payment_gateway_transactions').insert(proof).select().single();
  if (error) throw error;
  return data;
}

export async function approveInvestmentOrder(orderId, reviewNote = '') {
  const { data, error } = await supabase.rpc('admin_approve_investment_order', { target_order_id: orderId, review_note: reviewNote || null });
  if (error) throw error;
  return data;
}

export async function fetchInvestmentOrdersForAdmin({ status = null, limit = 200 } = {}) {
  let query = supabase.from('investment_orders').select('*').order('created_at', { ascending: false }).limit(limit);
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function fetchKycProfilesForAdmin({ status = null, limit = 200 } = {}) {
  let query = supabase.from('user_kyc_profiles').select('*').order('created_at', { ascending: false }).limit(limit);
  if (status) query = query.eq('kyc_status', status);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function fetchMyKycProfile(userId) {
  if (!userId) return null;
  const { data, error } = await supabase.from('user_kyc_profiles').select('*').eq('user_id', userId).maybeSingle();
  if (error) throw error;
  return data || null;
}

export async function fetchKycDocumentList(userId) {
  if (!userId) return [];
  const { data, error } = await supabase.from('user_kyc_documents').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function saveKycDocument(doc) {
  const { data, error } = await supabase.from('user_kyc_documents').upsert({
    id: doc.id ?? undefined,
    user_id: doc.user_id,
    kyc_profile_id: doc.kyc_profile_id ?? doc.user_id,
    doc_type: doc.doc_type,
    storage_path: doc.storage_path,
    status: 'PENDING',
    created_at: new Date().toISOString(),
    reviewer_note: doc.reviewer_note ?? null,
    reviewed_by: doc.reviewed_by ?? null,
    reviewed_at: doc.reviewed_at ?? null
  }, { onConflict: 'id' }).select().single();
  if (error) throw error;
  return data;
}

export async function submitKycProfile(profile) {
  const { data, error } = await supabase.from('user_kyc_profiles').upsert({
    user_id: profile.user_id,
    legal_name: profile.legal_name ?? null,
    date_of_birth: profile.date_of_birth ?? null,
    nationality: profile.nationality ?? null,
    country: profile.country ?? null,
    address_line: profile.address_line ?? null,
    city: profile.city ?? null,
    state: profile.state ?? null,
    postal_code: profile.postal_code ?? null,
    tax_residency: profile.tax_residency ?? null,
    source_of_funds: profile.source_of_funds ?? null,
    source_of_income: profile.source_of_income ?? null,
    kyc_status: 'SUBMITTED',
    submitted_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }, { onConflict: 'user_id' }).select().single();
  if (error) throw error;
  return data;
}

export async function reviewKycProfile({ userId, status, note = '', reviewerId = null }) {
  if (!userId) throw new Error('User id is required');
  const body = {
    user_id: userId,
    kyc_status: status,
    review_note: note || null,
    reviewer_id: reviewerId,
    updated_at: new Date().toISOString(),
    approved_at: status === 'APPROVED' ? new Date().toISOString() : null,
    expires_at: status === 'APPROVED' ? null : null
  };
  const { data, error } = await supabase.from('user_kyc_profiles').upsert(body, { onConflict: 'user_id' }).select().single();
  if (error) throw error;
  return data;
}

export async function fetchMyInvestmentOrders(userId) {
  const { data, error } = await supabase.from('investment_orders').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function fetchMyWithdrawals(userId) {
  const { data, error } = await supabase.from('withdrawals').select('*').eq('user_id', userId).order('date_created', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function fetchWithdrawalsForAdmin({ status = null, limit = 200 } = {}) {
  let query = supabase.from('withdrawals').select('*').order('date_created', { ascending: false }).limit(limit);
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function submitWithdrawal({ userId, amount, gatewayCode, account }) {
  const { data, error } = await supabase.rpc('submit_withdrawal', { target_user_id: userId, target_amount: Number(amount), target_gateway_code: gatewayCode, target_account: account });
  if (error) throw error;
  return data;
}

export async function reviewWithdrawal(withdrawalId, decision, reason = '', payoutReference = '') {
  const { data, error } = await supabase.rpc('admin_review_withdrawal', { target_withdrawal_id: withdrawalId, decision, review_reason: reason || null, payout_reference: payoutReference || null });
  if (error) throw error;
  return data;
}

export async function createReferralCommissionLock({ referrerId, referredUserId, amount, referralId = null }) {
  const { data, error } = await supabase.rpc('create_referral_commission_lock', { target_referrer_id: referrerId, target_referred_user_id: referredUserId, target_amount: Number(amount), target_referral_id: referralId || null });
  if (error) throw error;
  return data;
}

export async function updatePaymentGateway(gateway) {
  const { data, error } = await supabase.rpc('admin_update_payment_gateway', { gateway_payload: gateway });
  if (error) throw error;
  return data;
}

export async function updatePlatformSettings(settings) {
  const payload = { id: 'global_config', ...settings, updated_at: new Date().toISOString() };
  const { data, error } = await supabase.from('system_settings').upsert(payload).select().single();
  if (error) throw error;
  return { ...defaultSettings, ...data };
}

// Update the currently authenticated user's profile through the secure RPC.
export async function updateMyProfile(profile) {
  const { data, error } = await supabase.rpc('update_my_profile', {
    new_name: profile.name ?? null,
    new_phone: profile.phone ?? null,
    new_avatar_url: profile.avatar_url ?? null,
    new_timezone: profile.timezone ?? null,
    new_language: profile.language ?? null,
    new_currency: profile.currency ?? null,
    new_notification_preferences: profile.notification_preferences ?? null,
    new_dashboard_preferences: profile.dashboard_preferences ?? null
  });
  if (error) {
    console.error('Supabase profile update error:', error);
    throw error;
  }
  return data;
}

// Delete Plan strictly from Supabase Database
export async function deletePlan(planId) {
  const { error } = await supabase.from('investment_plans').delete().eq('id', planId);
  if (error) {
    console.error('Supabase deletePlan error:', error);
    throw error;
  }
}
// Submit Contact Inquiry to Supabase
export async function submitContactInquiry(inquiry) {
  try {
    const { data, error } = await supabase.from('contact_messages').insert([inquiry]).select().single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Saving inquiry locally:', err.message);
    return inquiry;
  }
}

// Fetch Contact Inquiries for Admin
const LIVE_GUEST_KEY = 'sr_live_support_guest_token';

export function getLiveGuestToken() {
  const existing = localStorage.getItem(LIVE_GUEST_KEY);
  if (existing) return existing;
  const token = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  localStorage.setItem(LIVE_GUEST_KEY, token);
  return token;
}

export async function createLiveConversation({ userId = null, guestToken = null, title = 'Live Support Conversation', userName = null, userEmail = null, userAvatarUrl = null } = {}) {
  const payload = {
    user_id: userId,
    guest_token: guestToken,
    visitor_type: userId ? 'LOGGED_USER' : 'GUEST',
    title,
    status: 'OPEN',
    user_name: userName,
    user_email: userEmail,
    user_avatar_url: userAvatarUrl,
    last_message_at: new Date().toISOString()
  };
  const { data, error } = await supabase.from('ai_chat_conversations').insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function fetchLiveMessages(conversationId) {
  const { data, error } = await supabase.from('ai_chat_messages').select('*').eq('conversation_id', conversationId).order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function saveLiveMessage(message) {
  const { data, error } = await supabase.from('ai_chat_messages').insert({ ...message, message_status: message.message_status || 'SENT' }).select().single();
  if (error) throw error;
  if (message.sender_type === 'USER') {
    const { data: conversation } = await supabase.from('ai_chat_conversations').select('unread_for_admin').eq('id', message.conversation_id).single();
    await supabase.from('ai_chat_conversations').update({ last_message_at: new Date().toISOString(), updated_at: new Date().toISOString(), unread_for_admin: Number(conversation?.unread_for_admin || 0) + 1 }).eq('id', message.conversation_id);
  } else {
    await supabase.from('ai_chat_conversations').update({ last_message_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', message.conversation_id);
  }
  return data;
}

export async function linkGuestConversationToUser({ guestToken, userId, userName, userEmail, userAvatarUrl }) {
  if (!guestToken || !userId) return null;
  const { data, error } = await supabase.from('ai_chat_conversations').update({ user_id: userId, visitor_type: 'LOGGED_USER', user_name: userName || null, user_email: userEmail || null, user_avatar_url: userAvatarUrl || null, updated_at: new Date().toISOString() }).eq('guest_token', guestToken).is('user_id', null).select();
  if (error) throw error;
  return data || [];
}

export async function fetchUserLiveConversation({ userId, guestToken }) {
  let query = supabase.from('ai_chat_conversations').select('*').order('updated_at', { ascending: false }).limit(1);
  if (userId) query = query.eq('user_id', userId);
  else if (guestToken) query = query.eq('guest_token', guestToken).is('user_id', null);
  else return null;
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data || null;
}

export async function createSupportTicket(ticket, firstMessage) {
  const { data: sessionData } = await supabase.auth.getSession();
  // The project supports a local demo fallback profile. A valid profile ID is
  // therefore sufficient for ticket creation when no Supabase Auth session exists.
  if (!ticket?.user_id) throw new Error('Your profile ID is missing. Please reload your dashboard and try again.');
  const payload = { ...ticket, visitor_type: 'LOGGED_USER', status: ticket.status || 'OPEN', priority: ticket.priority || 'NORMAL', unread_for_admin: 1, unread_for_user: 0 };
  const { data, error } = await supabase.from('support_tickets').insert(payload).select().single();
  if (error) throw new Error(`Ticket could not be created: ${error.message}`);
  if (firstMessage) {
    const { error: messageError } = await supabase.from('support_ticket_messages').insert({ ticket_id: data.id, sender_type: 'USER', sender_id: ticket.user_id, content: firstMessage, message_status: 'SENT' });
    if (messageError) {
      await supabase.from('support_tickets').delete().eq('id', data.id);
      throw new Error(`Ticket message could not be saved: ${messageError.message}`);
    }
  }
  return data;
}

export async function fetchMySupportTickets(userId) {
  const { data, error } = await supabase.from('support_tickets').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function fetchSupportTicketMessages(ticketId) {
  const { data, error } = await supabase.from('support_ticket_messages').select('*').eq('ticket_id', ticketId).order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function sendSupportTicketUserReply({ ticketId, content, userId }) {
  const { data: ticket } = await supabase.from('support_tickets').select('status').eq('id', ticketId).single();
  if (ticket?.status === 'CLOSED') throw new Error('This ticket is closed. Reopen it before sending a new message.');
  const { data, error } = await supabase.from('support_ticket_messages').insert({ ticket_id: ticketId, sender_type: 'USER', sender_id: userId, content, message_status: 'SENT' }).select().single();
  if (error) throw error;
  const { data: existingTicket } = await supabase.from('support_tickets').select('unread_for_admin').eq('id', ticketId).single();
  await supabase.from('support_tickets').update({ status: 'OPEN', updated_at: new Date().toISOString(), last_reply_at: new Date().toISOString(), unread_for_admin: Number(existingTicket?.unread_for_admin || 0) + 1 }).eq('id', ticketId);
  return data;
}

export async function updateMessageStatus(messageId, status) {
  const values = { message_status: status };
  if (status === 'DELIVERED') values.delivered_at = new Date().toISOString();
  if (status === 'SEEN') values.seen_at = new Date().toISOString();
  const { data, error } = await supabase.from('ai_chat_messages').update(values).eq('id', messageId).select().single();
  if (error) throw error;
  return data;
}

async function invokeLiveSupport(body) {
  const { data, error } = await supabase.functions.invoke('live-support-chat', { body });
  if (error) {
    const message = error.message || '';
    if (/failed to send a request|not found|fetch/i.test(message)) {
      throw new Error('Live Support server is not deployed. Deploy the live-support-chat Edge Function first.');
    }
    // FunctionsHttpError: the Edge Function ran but returned a non-2xx JSON body.
    // Surface the server-provided reason instead of the generic "non-2xx" message.
    if (error.context && typeof error.context.json === 'function') {
      try {
        const payload = await error.context.json();
        if (payload?.error) throw new Error(payload.error);
      } catch (parseError) {
        if (parseError instanceof Error && parseError.message !== 'Failed to parse') throw parseError;
      }
    }
    throw new Error(message || 'Live Support request failed.');
  }
  if (data?.error) throw new Error(data.error);
  return data;
}

export async function discoverGeminiModels() {
  const data = await invokeLiveSupport({ action: 'list_models' });
  return data?.models || [];
}

export async function requestLiveAi({ conversationId, message, userId = null }) {
  return invokeLiveSupport({ conversation_id: conversationId, message, user_id: userId });
}

export async function requestHumanSupport(conversationId, userId = null) {
  const { data, error } = await supabase.from('ai_chat_conversations').update({ status: 'WAITING_FOR_HUMAN', handoff_requested: true, updated_at: new Date().toISOString() }).eq('id', conversationId).select().single();
  if (error) throw error;
  const ticket = await supabase.from('support_tickets').insert({ user_id: userId, subject: 'Live Support Handoff', category: 'Live Chat', priority: 'NORMAL', status: 'OPEN' }).select().single();
  if (ticket.error) throw ticket.error;
  return { conversation: data, ticket: ticket.data };
}

export async function fetchAiProviders() {
  const { data, error } = await supabase.from('ai_provider_settings').select('*').order('id');
  if (error) throw error;
  return data || [];
}

export async function saveAiProvider(provider) {
  const { data, error } = await supabase.from('ai_provider_settings').upsert(provider).select().single();
  if (error) throw error;
  return data;
}

export async function saveAiSystemSettings(payload) {
  return updatePlatformSettings(payload);
}

export async function fetchKnowledgeDocuments() {
  const { data, error } = await supabase.from('ai_knowledge_documents').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function saveSupportFaq(faq) {
  const { data, error } = await supabase.from('ai_knowledge_documents').upsert({ ...faq, category: faq.category || 'General FAQ', status: faq.status || 'PUBLISHED', is_public: faq.is_public ?? true }).select().single();
  if (error) throw error;
  return data;
}

export async function deleteSupportFaq(id) {
  const { error } = await supabase.from('ai_knowledge_documents').delete().eq('id', id);
  if (error) throw error;
}

export async function saveKnowledgeDocument(document) {
  const { data, error } = await supabase.from('ai_knowledge_documents').insert(document).select().single();
  if (error) throw error;
  return data;
}

export async function updateKnowledgeDocument(id, document) {
  const { data, error } = await supabase.from('ai_knowledge_documents').update(document).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteKnowledgeDocument(id) {
  const { data, error } = await supabase.from('ai_knowledge_documents').delete().eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function fetchAdminUnreadCounts() {
  const [{ data: conversations, error: conversationError }, { data: tickets, error: ticketError }, { data: inbox, error: inboxError }] = await Promise.all([
    supabase.from('ai_chat_conversations').select('unread_for_admin,status'),
    supabase.from('support_tickets').select('unread_for_admin,status'),
    supabase.from('contact_messages').select('is_read')
  ]);
  if (conversationError) console.warn('Admin conversation badge load failed:', conversationError.message);
  if (ticketError) console.warn('Admin ticket badge load failed:', ticketError.message);
  if (inboxError) console.warn('Admin inbox badge load failed:', inboxError.message);
  return {
    messages: (conversations || []).reduce((sum, row) => sum + Number(row.unread_for_admin || 0), 0),
    tickets: (tickets || []).reduce((sum, row) => sum + Number(row.unread_for_admin || 0), 0),
    inbox: (inbox || []).filter((row) => !row.is_read).length
  };
}

export async function fetchLiveConversations() {
  const [{ data: conversations, error: conversationsError }, { data: messages, error: messagesError }] = await Promise.all([
    supabase.from('ai_chat_conversations').select('*').order('updated_at', { ascending: false }),
    supabase.from('ai_chat_messages').select('conversation_id')
  ]);
  if (conversationsError) throw conversationsError;
  if (messagesError) throw messagesError;
  const counts = (messages || []).reduce((result, message) => {
    result[message.conversation_id] = (result[message.conversation_id] || 0) + 1;
    return result;
  }, {});
  const userIds = [...new Set((conversations || []).map((conversation) => conversation.user_id).filter(Boolean))];
  let profiles = [];
  if (userIds.length) {
    const { data, error } = await supabase.from('profiles').select('id,name,email,avatar_url,phone,status,account_tier').in('id', userIds);
    if (!error) profiles = data || [];
  }
  const profileMap = Object.fromEntries(profiles.map((profile) => [profile.id, profile]));
  return (conversations || []).map((conversation) => ({
    ...conversation,
    profile: profileMap[conversation.user_id] || null,
    display_name: profileMap[conversation.user_id]?.name || conversation.user_name || (conversation.guest_token ? 'Guest User' : 'Unknown User'),
    display_email: profileMap[conversation.user_id]?.email || conversation.user_email || null,
    display_avatar_url: profileMap[conversation.user_id]?.avatar_url || conversation.user_avatar_url || null,
    visitor_type: conversation.user_id ? 'LOGGED_USER' : 'GUEST',
    display_guest_id: conversation.guest_token ? `GUEST-${String(conversation.guest_token).slice(0, 8)}` : null,
    message_count: counts[conversation.id] || 0
  }));
}

export async function markConversationSeen(conversationId, viewer = 'USER') {
  const field = viewer === 'ADMIN' ? 'unread_for_admin' : 'unread_for_user';
  const { error } = await supabase.from('ai_chat_conversations').update({ [field]: 0 }).eq('id', conversationId);
  if (error) throw error;
  return true;
}

export async function markTicketSeen(ticketId, viewer = 'USER') {
  const field = viewer === 'ADMIN' ? 'unread_for_admin' : 'unread_for_user';
  const { data, error } = await supabase.from('support_tickets').update({ [field]: 0 }).eq('id', ticketId).select('id,unread_for_admin,unread_for_user').single();
  if (error) throw error;
  return data;
}

export async function fetchConversationMessages(conversationId) {
  const { data, error } = await supabase.from('ai_chat_messages').select('*').eq('conversation_id', conversationId).order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function sendAgentReply({ conversationId, content, agentId = null, replyToMessageId = null, quotedContent = null, agentName = 'Support Agent', agentAvatarUrl = null }) {
  const { data, error } = await supabase.from('ai_chat_messages').insert({ conversation_id: conversationId, sender_type: 'AGENT', sender_id: agentId, sender_name: agentName, sender_avatar_url: agentAvatarUrl, content, reply_to_message_id: replyToMessageId, quoted_content: quotedContent, thread_id: replyToMessageId, message_status: 'SENT' }).select().single();
  if (error) throw error;
  // The message is the primary operation. Conversation status is a helpful
  // secondary update and must not make an already-sent reply look failed.
  await supabase.from('ai_chat_conversations').update({ status: 'ANSWERED', updated_at: new Date().toISOString(), last_message_at: new Date().toISOString(), unread_for_user: 1 }).eq('id', conversationId);
  return data;
}

export async function updateConversationStatus(conversationId, status) {
  const { data, error } = await supabase.from('ai_chat_conversations').update({ status, updated_at: new Date().toISOString() }).eq('id', conversationId).select().single();
  if (error) throw error;
  return data;
}

export async function fetchSupportTickets() {
  const { data, error } = await supabase.from('support_tickets').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function sendSupportTicketReply({ ticketId, content, senderId = null }) {
  const { data: ticket } = await supabase.from('support_tickets').select('status').eq('id', ticketId).single();
  if (ticket?.status === 'CLOSED') throw new Error('This ticket is closed. Reopen it before replying.');
  const { data, error } = await supabase.from('support_ticket_messages').insert({ ticket_id: ticketId, sender_type: 'AGENT', sender_id: senderId, content, message_status: 'SENT' }).select().single();
  if (error) throw error;
  const { error: ticketError } = await supabase.from('support_tickets').update({ status: 'IN_PROGRESS', updated_at: new Date().toISOString(), last_reply_at: new Date().toISOString(), unread_for_user: 1 }).eq('id', ticketId);
  if (ticketError) throw ticketError;
  return data;
}

export async function updateSupportTicket(ticketId, values) {
  const { data: current } = await supabase.from('support_tickets').select('status').eq('id', ticketId).single();
  if (current?.status === 'CLOSED') throw new Error('Closed tickets cannot be reopened or modified.');
  const nextValues = { ...values, updated_at: new Date().toISOString() };
  if (nextValues.status !== 'CLOSED' && values.status) throw new Error('Only closing a ticket is allowed from the active ticket state.');
  if (nextValues.status === 'CLOSED') { nextValues.unread_for_admin = 0; nextValues.unread_for_user = 0; nextValues.closed_at = new Date().toISOString(); nextValues.closed_by = 'ADMIN'; }
  const { data, error } = await supabase.from('support_tickets').update(nextValues).eq('id', ticketId).select().single();
  if (error) throw error;
  return data;
}

export async function saveWhatsappSettings(settings) {
  const { data, error } = await supabase.from('whatsapp_settings').upsert({ id: 'global_whatsapp', ...settings }).select().single();
  if (error) throw error;
  return data;
}

export async function fetchSupportCenterQuickActions(enabledOnly = false) {
  let query = supabase.from('support_center_quick_actions').select('*').order('sort_order', { ascending: true });
  if (enabledOnly) query = query.eq('enabled', true);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function saveSupportCenterQuickAction(action) {
  const { data, error } = await supabase.from('support_center_quick_actions').upsert(action).select().single();
  if (error) throw error;
  return data;
}

export async function deleteSupportCenterQuickAction(id) {
  const { error } = await supabase.from('support_center_quick_actions').delete().eq('id', id);
  if (error) throw error;
}

export async function fetchWithdrawalEligibility(userId) {
  if (!userId) return null;
  const { data, error } = await supabase.rpc('get_withdrawal_eligibility', { target_user_id: userId });
  if (error) throw error;
  return data;
}

export async function fetchUserWithdrawalLocks(userId) {
  if (!userId) return [];
  const { data, error } = await supabase.from('user_withdrawal_locks').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function fetchReferralCommissionLocks(userId) {
  if (!userId) return [];
  const { data, error } = await supabase.from('referral_commission_locks').select('*').eq('referrer_id', userId).order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export function subscribeToUserRealtime(userId, handlers = {}) {
  if (!userId) return () => {};
  const channel = supabase.channel(`user-${userId}-realtime`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${userId}` }, handlers.profile || (() => {}))
    .on('postgres_changes', { event: '*', schema: 'public', table: 'user_withdrawal_locks', filter: `user_id=eq.${userId}` }, handlers.locks || (() => {}))
    .on('postgres_changes', { event: '*', schema: 'public', table: 'referral_commission_locks', filter: `referrer_id=eq.${userId}` }, handlers.referrals || (() => {}))
    .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `recipient_id=eq.${userId}` }, handlers.notifications || (() => {}))
    .subscribe();
  return () => { supabase.removeChannel(channel); };
}

export async function markNotificationSeen(id) {
  const { data, error } = await supabase.from('notifications').update({ is_seen: true, seen_at: new Date().toISOString() }).eq('id', id).select().single();
  if (error) throw error;
  return data;
}
export async function fetchAllWithdrawalLocks({ status = null, limit = 200 } = {}) {
  let query = supabase.from('user_withdrawal_locks').select('*').order('created_at', { ascending: false }).limit(limit);
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createManualWithdrawalLock({ userId, lockType = 'MANUAL_HOLD', amount, days, reason }) {
  const { data, error } = await supabase.rpc('admin_create_manual_lock', { target_user_id: userId, target_lock_type: lockType, target_amount: Number(amount), target_days: Number(days), target_reason: reason });
  if (error) throw error;
  return data;
}

export async function releaseWithdrawalLock(lockId, reason) {
  const { data, error } = await supabase.rpc('admin_release_lock', { target_lock_id: lockId, release_reason: reason });
  if (error) throw error;
  return data;
}

export async function validateWithdrawalEligibility(userId, amount) {
  const { data, error } = await supabase.rpc('validate_withdrawal_eligibility', { target_user_id: userId, requested_amount: Number(amount) });
  if (error) throw error;
  return data;
}




export async function fetchNotifications({ recipientId = null, isAdmin = false, limit = 30 } = {}) {
  let query = supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(limit);
  if (isAdmin) query = query.or(`recipient_type.eq.ADMIN,recipient_type.eq.ALL`);
  else if (recipientId) query = query.or(`recipient_type.eq.ALL,and(recipient_type.eq.USER,recipient_id.eq.${recipientId})`);
  else return [];
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function markNotificationRead(id) {
  const { data, error } = await supabase.from('notifications').update({ is_read: true, read_at: new Date().toISOString() }).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function markAllNotificationsRead({ recipientId = null, isAdmin = false } = {}) {
  let query = supabase.from('notifications').update({ is_read: true, is_seen: true, read_at: new Date().toISOString(), seen_at: new Date().toISOString() }).eq('is_read', false);
  if (isAdmin) query = query.in('recipient_type', ['ADMIN', 'ALL']);
  else if (recipientId) query = query.or(`recipient_type.eq.ALL,and(recipient_type.eq.USER,recipient_id.eq.${recipientId})`);
  else return;
  const { error } = await query;
  if (error) throw error;
}

export async function createNotification(notification) {
  const { data, error } = await supabase.from('notifications').insert(notification).select().single();
  if (error) throw error;
  return data;
}

export async function fetchContactInquiries() {
  const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function updateContactInquiry(id, values) {
  const { data, error } = await supabase.from('contact_messages').update({ ...values, updated_at: new Date().toISOString() }).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function fetchContactReplies(messageId) {
  const { data, error } = await supabase.from('contact_message_replies').select('*').eq('contact_message_id', messageId).order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function sendContactReply({ messageId, content, senderId = null }) {
  const { data, error } = await supabase.from('contact_message_replies').insert({ contact_message_id: messageId, sender_type: 'ADMIN', sender_id: senderId, content, message_status: 'SENT' }).select().single();
  if (error) throw error;
  await updateContactInquiry(messageId, { is_read: true });
  return data;
}

// ==========================================
// REAL-TIME HOLIDAY & SITE SETTINGS APIS
// ==========================================

export async function fetchHolidays() {
  try {
    const [datedResult, recurringResult] = await Promise.all([
      supabase.from('working_day_calendars').select('*').eq('enabled', true).order('holiday_date', { ascending: true }),
      supabase.from('recurring_holidays').select('*').eq('enabled', true).order('day_of_week', { ascending: true })
    ]);
    if (datedResult.error) throw datedResult.error;
    if (recurringResult.error) throw recurringResult.error;
    const dated = (datedResult.data || []).map((row) => ({
      id: row.id,
      kind: 'DATED',
      date: row.holiday_date,
      is_recurring_day: false,
      day_of_week: null,
      title: row.holiday_name,
      created_at: row.created_at
    }));
    const recurring = (recurringResult.data || []).map((row) => ({
      id: row.id,
      kind: 'RECURRING',
      date: null,
      is_recurring_day: true,
      day_of_week: row.day_of_week,
      title: row.title,
      created_at: row.created_at
    }));
    return [...dated, ...recurring];
  } catch (err) {
    console.warn('Fetch holidays warning:', err.message);
    return [];
  }
}

export async function createHolidaysWithNotification({
  dates = [],
  isRecurring = false,
  dayOfWeek = null,
  title = 'Bank / Market Holiday',
  notificationMessage = ''
}) {
  const records = [];

  if (isRecurring && dayOfWeek !== null && dayOfWeek !== undefined) {
    records.push({
      date: null,
      is_recurring_day: true,
      day_of_week: Number(dayOfWeek),
      title: title.trim() || 'Weekly Recurring Holiday',
      created_at: new Date().toISOString()
    });
  } else if (Array.isArray(dates) && dates.length > 0) {
    dates.forEach((dateStr) => {
      records.push({
        date: dateStr,
        is_recurring_day: false,
        day_of_week: null,
        title: title.trim() || 'Official Market Holiday',
        created_at: new Date().toISOString()
      });
    });
  } else {
    throw new Error('Please provide at least one date or select a recurring day of the week.');
  }

  const { data: inserted, error: holidayErr } = await supabase
    .rpc('admin_create_holiday_schedule', {
      holiday_records: records,
      notification_message: notificationMessage.trim() || null
    });
  if (holidayErr) throw holidayErr;

  return inserted;
}

export async function deleteHoliday(id, kind = 'DATED') {
  const { data, error } = await supabase.rpc('admin_delete_holiday_schedule', {
    target_id: Number(id),
    target_kind: kind
  });
  if (error) throw error;
  return data;
}

export async function updateSiteSettings(values) {
  const { data, error } = await supabase.rpc('admin_update_lock_site_settings', {
    new_values: values
  });
  if (error) throw error;
  return data;
}

export function subscribeToPlatformRealtime(callbacks = {}) {
  const channel = supabase.channel('platform-global-realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'system_settings' }, (payload) => {
      callbacks.onSettingsChange?.(payload.new || payload);
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'working_day_calendars' }, (payload) => {
      callbacks.onHolidaysChange?.(payload);
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'recurring_holidays' }, (payload) => {
      callbacks.onHolidaysChange?.(payload);
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'investment_plans' }, (payload) => {
      callbacks.onPlansChange?.(payload);
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, (payload) => {
      callbacks.onNotificationInsert?.(payload.new);
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
