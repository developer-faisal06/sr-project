(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/admin/UserManagement.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserManagement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.mjs [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.mjs [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen-line.mjs [app-client] (ecmascript) <export default as Edit3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash.mjs [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.mjs [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.mjs [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.mjs [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.mjs [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.mjs [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.mjs [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.mjs [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.mjs [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.mjs [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.mjs [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/notify.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function UserManagement({ users = [], onToggleRole, onToggleStatus, onCreateUser, onUpdateUser, onDeleteUser }) {
    _s();
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedUser, setSelectedUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editMode, setEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editForm, setEditForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [fetchingLive, setFetchingLive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [liveUsers, setLiveUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(users);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        email: '',
        phone: '',
        password: '',
        avatar_url: '',
        role: 'user',
        account_tier: 'PROSPECT',
        currency: 'USD',
        timezone: 'Asia/Dhaka',
        invested: 0,
        balance: 0,
        profit: 0,
        referral: 0,
        country: '',
        status: 'Active'
    });
    // Keep liveUsers in sync with users prop
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "UserManagement.useEffect": ()=>{
            if (users && users.length > 0) {
                setLiveUsers({
                    "UserManagement.useEffect": (prev)=>{
                        const map = new Map();
                        users.forEach({
                            "UserManagement.useEffect": (u)=>map.set(u.id, u)
                        }["UserManagement.useEffect"]);
                        prev.forEach({
                            "UserManagement.useEffect": (u)=>{
                                if (!map.has(u.id)) map.set(u.id, u);
                                else map.set(u.id, {
                                    ...u,
                                    ...map.get(u.id)
                                });
                            }
                        }["UserManagement.useEffect"]);
                        return Array.from(map.values());
                    }
                }["UserManagement.useEffect"]);
            }
        }
    }["UserManagement.useEffect"], [
        users
    ]);
    // Direct fetch from Supabase profiles table on mount and listen to realtime updates
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "UserManagement.useEffect": ()=>{
            let mounted = true;
            async function fetchDirectProfiles() {
                try {
                    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('profiles').select('*').order('created_at', {
                        ascending: false
                    });
                    if (!error && Array.isArray(data) && data.length > 0 && mounted) {
                        setLiveUsers({
                            "UserManagement.useEffect.fetchDirectProfiles": (prev)=>{
                                const merged = [
                                    ...data
                                ];
                                prev.forEach({
                                    "UserManagement.useEffect.fetchDirectProfiles": (pu)=>{
                                        if (!merged.some({
                                            "UserManagement.useEffect.fetchDirectProfiles": (du)=>du.id === pu.id || du.email?.toLowerCase() === pu.email?.toLowerCase()
                                        }["UserManagement.useEffect.fetchDirectProfiles"])) {
                                            merged.push(pu);
                                        }
                                    }
                                }["UserManagement.useEffect.fetchDirectProfiles"]);
                                return merged;
                            }
                        }["UserManagement.useEffect.fetchDirectProfiles"]);
                    }
                } catch (err) {}
            }
            fetchDirectProfiles();
            const channel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel(`user-mgmt-profiles-live-${Math.random().toString(36).slice(2, 9)}`).on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'profiles'
            }, {
                "UserManagement.useEffect.channel": (payload)=>{
                    if (payload.eventType === 'INSERT' && payload.new) {
                        setLiveUsers({
                            "UserManagement.useEffect.channel": (prev)=>[
                                    payload.new,
                                    ...prev.filter({
                                        "UserManagement.useEffect.channel": (u)=>u.id !== payload.new.id
                                    }["UserManagement.useEffect.channel"])
                                ]
                        }["UserManagement.useEffect.channel"]);
                    } else if (payload.eventType === 'UPDATE' && payload.new) {
                        const updated = payload.new;
                        setLiveUsers({
                            "UserManagement.useEffect.channel": (prev)=>prev.map({
                                    "UserManagement.useEffect.channel": (u)=>u.id === updated.id || u.email?.toLowerCase() === updated.email?.toLowerCase() ? {
                                            ...u,
                                            ...updated
                                        } : u
                                }["UserManagement.useEffect.channel"])
                        }["UserManagement.useEffect.channel"]);
                        setSelectedUser({
                            "UserManagement.useEffect.channel": (prev)=>{
                                if (prev && (prev.id === updated.id || prev.email?.toLowerCase() === updated.email?.toLowerCase())) {
                                    return {
                                        ...prev,
                                        ...updated
                                    };
                                }
                                return prev;
                            }
                        }["UserManagement.useEffect.channel"]);
                    } else if (payload.eventType === 'DELETE' && payload.old) {
                        setLiveUsers({
                            "UserManagement.useEffect.channel": (prev)=>prev.filter({
                                    "UserManagement.useEffect.channel": (u)=>u.id !== payload.old.id
                                }["UserManagement.useEffect.channel"])
                        }["UserManagement.useEffect.channel"]);
                        setSelectedUser({
                            "UserManagement.useEffect.channel": (prev)=>prev?.id === payload.old.id ? null : prev
                        }["UserManagement.useEffect.channel"]);
                    }
                }
            }["UserManagement.useEffect.channel"]).subscribe();
            const handleSync = {
                "UserManagement.useEffect.handleSync": (event)=>{
                    const p = event?.detail;
                    if (!p) return;
                    setLiveUsers({
                        "UserManagement.useEffect.handleSync": (prev)=>prev.map({
                                "UserManagement.useEffect.handleSync": (u)=>u.id === p.id || u.email?.toLowerCase() === p.email?.toLowerCase() ? {
                                        ...u,
                                        ...p
                                    } : u
                            }["UserManagement.useEffect.handleSync"])
                    }["UserManagement.useEffect.handleSync"]);
                    setSelectedUser({
                        "UserManagement.useEffect.handleSync": (prev)=>{
                            if (prev && (prev.id === p.id || prev.email?.toLowerCase() === p.email?.toLowerCase())) {
                                return {
                                    ...prev,
                                    ...p
                                };
                            }
                            return prev;
                        }
                    }["UserManagement.useEffect.handleSync"]);
                }
            }["UserManagement.useEffect.handleSync"];
            window.addEventListener('sr:profile-updated', handleSync);
            return ({
                "UserManagement.useEffect": ()=>{
                    mounted = false;
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(channel);
                    window.removeEventListener('sr:profile-updated', handleSync);
                }
            })["UserManagement.useEffect"];
        }
    }["UserManagement.useEffect"], []);
    const filtered = liveUsers.filter((u)=>((u.name || '') + ' ' + (u.email || '') + ' ' + (u.id || '') + ' ' + (u.country || '')).toLowerCase().includes(query.toLowerCase()));
    const update = (key, value)=>setForm((prev)=>({
                ...prev,
                [key]: value
            }));
    const updateEdit = (key, value)=>setEditForm((prev)=>({
                ...prev,
                [key]: value
            }));
    const handleAvatarUpload = (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyWarning"])('Image Too Large', 'Avatar image must be smaller than 2MB.');
            return;
        }
        const reader = new FileReader();
        reader.onload = ()=>update('avatar_url', String(reader.result || ''));
        reader.readAsDataURL(file);
    };
    const handleEditAvatarUpload = (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyWarning"])('Image Too Large', 'Avatar image must be smaller than 2MB.');
            return;
        }
        const reader = new FileReader();
        reader.onload = ()=>updateEdit('avatar_url', String(reader.result || ''));
        reader.readAsDataURL(file);
    };
    const submit = async (e)=>{
        e.preventDefault();
        setSaving(true);
        try {
            if (onCreateUser) await onCreateUser(form);
            setForm({
                name: '',
                email: '',
                phone: '',
                password: '',
                avatar_url: '',
                role: 'user',
                account_tier: 'PROSPECT',
                currency: 'USD',
                timezone: 'Asia/Dhaka',
                invested: 0,
                balance: 0,
                profit: 0,
                referral: 0,
                country: '',
                status: 'Active'
            });
            setShowForm(false);
        } finally{
            setSaving(false);
        }
    };
    const [modalTab, setModalTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('overview');
    const [userKyc, setUserKyc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userInvestments, setUserInvestments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [userWithdrawals, setUserWithdrawals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const openDetails = async (u, startEditing = false)=>{
        setSelectedUser(u);
        setEditForm({
            ...u
        });
        setEditMode(startEditing);
        setModalTab('overview');
        setFetchingLive(true);
        try {
            // 1. Fetch live profile from profiles table
            const { data: pData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('profiles').select('*').or(`id.eq.${u.id},email.eq.${(u.email || '').trim().toLowerCase()}`).maybeSingle();
            if (pData) {
                setSelectedUser((prev)=>({
                        ...prev,
                        ...pData
                    }));
                setEditForm((prev)=>({
                        ...prev,
                        ...pData
                    }));
            }
            // 2. Fetch live KYC from user_kyc_profiles
            const { data: kycData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('user_kyc_profiles').select('*').eq('user_id', u.id).maybeSingle();
            setUserKyc(kycData || null);
            // 3. Fetch active investments from active_investments
            const { data: invData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('active_investments').select('*').eq('user_id', u.id).order('start_date', {
                ascending: false
            });
            setUserInvestments(invData || []);
            // 4. Fetch withdrawals from withdrawals
            const { data: wdData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('withdrawals').select('*').or(`user_id.eq.${u.id},user_email.eq.${(u.email || '').trim().toLowerCase()}`).order('date_created', {
                ascending: false
            });
            setUserWithdrawals(wdData || []);
        } catch (e) {
            console.warn('Direct database fetch note:', e);
        } finally{
            setFetchingLive(false);
        }
    };
    const saveEdit = async (e)=>{
        e.preventDefault();
        setSaving(true);
        try {
            if (onUpdateUser) {
                await onUpdateUser(editForm);
            } else {
                const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('profiles').upsert({
                    id: editForm.id,
                    name: editForm.name,
                    email: editForm.email?.trim().toLowerCase(),
                    phone: editForm.phone || null,
                    country: editForm.country || null,
                    role: editForm.role || 'user',
                    account_tier: editForm.account_tier || 'PROSPECT',
                    currency: editForm.currency || 'USD',
                    timezone: editForm.timezone || 'Asia/Dhaka',
                    invested: Number(editForm.invested || 0),
                    balance: Number(editForm.balance || 0),
                    profit: Number(editForm.profit || 0),
                    referral_earned: Number(editForm.referral || editForm.referral_earned || 0),
                    status: editForm.status || 'Active'
                }, {
                    onConflict: 'id'
                });
                if (error) throw error;
            }
            setSelectedUser({
                ...editForm
            });
            setEditMode(false);
            setLiveUsers((prev)=>prev.map((u)=>u.id === editForm.id ? {
                        ...u,
                        ...editForm
                    } : u));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifySuccess"])('Profile Updated', 'User saved to database successfully.');
        } catch (err) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyWarning"])('Update Failed', err?.message || 'Could not update user in database.');
        } finally{
            setSaving(false);
        }
    };
    const removeUser = async (userId)=>{
        const ok = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyConfirm"])('Delete User?', 'Are you sure you want to permanently delete this user?', 'Yes, Delete');
        if (!ok) return;
        try {
            if (onDeleteUser) {
                await onDeleteUser(userId);
            } else {
                try {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('profiles').delete().eq('id', userId);
                } catch  {}
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifySuccess"])('Deleted', 'User removed successfully.');
            }
            setSelectedUser(null);
        } catch (err) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyWarning"])('Delete Failed', err?.message || 'Could not delete user.');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gradient-to-br from-[#071738] via-[#05112b] to-[#030919] border border-[#1b3f8a] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-xs",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1b3f8a]/60 pb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 256,
                                        columnNumber: 13
                                    }, this),
                                    " Administration & Identity"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 255,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-black text-white",
                                children: "Registered Users & Traders"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-400 text-xs mt-0.5",
                                children: "Manage user roles, account tiers, financial balances, full info inspection, and profile editing."
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-3.5 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-black text-xs",
                                children: [
                                    users.length,
                                    " Total Users"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setShowForm(!showForm),
                                className: "flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black shadow-lg hover:brightness-110 transition",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 264,
                                        columnNumber: 13
                                    }, this),
                                    showForm ? 'Close Form' : 'Add User'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 263,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/UserManagement.tsx",
                lineNumber: 253,
                columnNumber: 7
            }, this),
            showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: submit,
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#040d24] border-2 border-amber-400/40 shadow-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[11px] font-bold text-amber-300 block mb-1",
                                children: "Full Name"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 271,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "Md. Rahman",
                                value: form.name ?? '',
                                onChange: (e)=>update('name', e.target.value),
                                className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 272,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 270,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[11px] font-bold text-amber-300 block mb-1",
                                children: "Email Address"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 275,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "user@example.com",
                                value: form.email ?? '',
                                onChange: (e)=>update('email', e.target.value),
                                className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 276,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 274,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[11px] font-bold text-amber-300 block mb-1",
                                children: "Set Password"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 279,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                placeholder: "Password (optional)",
                                value: form.password ?? '',
                                onChange: (e)=>update('password', e.target.value),
                                className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 280,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 278,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[11px] font-bold text-amber-300 block mb-1",
                                children: "Phone Number"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 283,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "+8801XXXXXXXXX",
                                value: form.phone ?? '',
                                onChange: (e)=>update('phone', e.target.value),
                                className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 284,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 282,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sm:col-span-2 flex items-center gap-3 bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/60 bg-[#030a1a] flex items-center justify-center text-amber-300 font-bold shrink-0 shadow",
                                children: form.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: form.avatar_url,
                                    alt: "Avatar",
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                    lineNumber: 289,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                    className: "w-5 h-5 text-slate-400"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                    lineNumber: 291,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 287,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[11px] font-bold text-amber-300 block",
                                        children: "Avatar Photo (Upload or URL)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 295,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "px-3 py-1.5 rounded-xl bg-[#0c265e] border border-[#1d4ed8] text-blue-200 text-[11px] font-bold cursor-pointer hover:bg-[#133880] transition inline-flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 298,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Upload Image",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "file",
                                                        accept: "image/*",
                                                        onChange: handleAvatarUpload,
                                                        className: "hidden"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 299,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 297,
                                                columnNumber: 17
                                            }, this),
                                            form.avatar_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>update('avatar_url', ''),
                                                className: "px-2.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 text-[11px] font-bold",
                                                children: "Remove"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 302,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                placeholder: "Or paste image URL...",
                                                value: form.avatar_url.startsWith('data:') ? '' : form.avatar_url ?? '',
                                                onChange: (e)=>update('avatar_url', e.target.value),
                                                className: "flex-1 px-3 py-1.5 bg-[#030a1a] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 text-xs"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 306,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 294,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 286,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[11px] font-bold text-amber-300 block mb-1",
                                children: "Country"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 316,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "Bangladesh",
                                value: form.country ?? '',
                                onChange: (e)=>update('country', e.target.value),
                                className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 317,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 315,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[11px] font-bold text-amber-300 block mb-1",
                                children: "System Role"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 320,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: form.role,
                                onChange: (e)=>update('role', e.target.value),
                                className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "user",
                                        children: "User"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 322,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "admin",
                                        children: "Admin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 323,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 321,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 319,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[11px] font-bold text-amber-300 block mb-1",
                                children: "Account Tier"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 327,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: form.account_tier,
                                onChange: (e)=>update('account_tier', e.target.value),
                                className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "PROSPECT",
                                        children: "Prospect"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 329,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "ACTIVE_INVESTOR",
                                        children: "Active Investor"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 330,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "VIP_INSTITUTIONAL",
                                        children: "VIP Institutional"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 331,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 328,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 326,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[11px] font-bold text-amber-300 block mb-1",
                                children: "Preferred Currency"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 335,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: form.currency,
                                onChange: (e)=>update('currency', e.target.value),
                                className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "USD",
                                        children: "USD ($)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 337,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "BDT",
                                        children: "BDT (৳)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 338,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "EUR",
                                        children: "EUR (€)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 339,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "GBP",
                                        children: "GBP (£)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 340,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "MYR",
                                        children: "MYR (RM)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 341,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "INR",
                                        children: "INR (₹)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 342,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 336,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 334,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[11px] font-bold text-amber-300 block mb-1",
                                children: "Timezone"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 346,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "Asia/Dhaka",
                                value: form.timezone ?? '',
                                onChange: (e)=>update('timezone', e.target.value),
                                className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 347,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 345,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[11px] font-bold text-amber-300 block mb-1",
                                children: "Initial Investment ($)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 350,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: "0",
                                value: form.invested ?? '',
                                onChange: (e)=>update('invested', e.target.value),
                                className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 font-bold text-amber-300"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 351,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 349,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[11px] font-bold text-amber-300 block mb-1",
                                children: "Initial Balance ($)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 354,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: "0",
                                value: form.balance ?? '',
                                onChange: (e)=>update('balance', e.target.value),
                                className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 font-bold text-emerald-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 355,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 353,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sm:col-span-2 lg:col-span-4 flex justify-end gap-3 pt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setShowForm(false),
                                className: "px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 358,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: saving,
                                className: "px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black shadow-lg hover:brightness-110 transition",
                                children: saving ? 'Saving...' : 'Save User to Database'
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 359,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 357,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/UserManagement.tsx",
                lineNumber: 269,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                        className: "w-4 h-4 absolute left-3.5 top-3.5 text-slate-400"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 364,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: query ?? '',
                        onChange: (e)=>setQuery(e.target.value),
                        placeholder: "Search users or email...",
                        className: "w-full pl-10 pr-4 py-3 rounded-2xl bg-[#040d24] border border-[#1b3f8a] text-white text-xs outline-none focus:border-amber-400 shadow"
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                        lineNumber: 365,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/UserManagement.tsx",
                lineNumber: 363,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sr-table-wrap sr-scroll-hint rounded-2xl border border-[#1b3f8a] bg-[#040d24]/60",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-left border-collapse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "bg-[#081d48] border-b border-[#1b3f8a] text-slate-300 uppercase tracking-wider text-[11px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-3.5 px-4 font-black",
                                        children: "USER"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 371,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-3.5 px-4 font-black",
                                        children: "ROLE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 372,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-3.5 px-4 font-black",
                                        children: "INVESTED"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 373,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-3.5 px-4 font-black",
                                        children: "BALANCE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 374,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-3.5 px-4 font-black",
                                        children: "STATUS"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 375,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-3.5 px-4 font-black text-right",
                                        children: "ACTIONS"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 376,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 370,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                            lineNumber: 369,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "divide-y divide-[#1b3f8a]/50",
                            children: filtered.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "hover:bg-[#0c265e]/40 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-3.5 px-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-9 h-9 rounded-full overflow-hidden border border-amber-400/40 bg-[#07193d] flex items-center justify-center text-amber-300 font-black text-xs shrink-0 shadow",
                                                        children: u.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: u.avatar_url,
                                                            alt: u.name,
                                                            className: "w-full h-full object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 386,
                                                            columnNumber: 25
                                                        }, this) : (u.name || 'U').slice(0, 2).toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 384,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-bold text-white text-sm flex items-center gap-2",
                                                                children: [
                                                                    u.name,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-mono text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-md",
                                                                        children: u.id
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                                        lineNumber: 394,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                                lineNumber: 392,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-[11px] text-slate-400 font-mono mt-0.5",
                                                                children: u.email
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                                lineNumber: 396,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 383,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 382,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-3.5 px-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: 'px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ' + (u.role === 'admin' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'),
                                                children: u.role
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 401,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 400,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-3.5 px-4 font-extrabold text-slate-200",
                                            children: [
                                                "$",
                                                u.invested || 0
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 405,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-3.5 px-4 font-extrabold text-emerald-400",
                                            children: [
                                                "$",
                                                u.balance || 0
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 406,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-3.5 px-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: 'inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-bold ' + (u.status === 'Active' ? 'text-emerald-300 bg-emerald-500/15 border border-emerald-500/30' : 'text-rose-300 bg-rose-500/15 border border-rose-500/30'),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: u.status || 'Active'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 408,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 407,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-3.5 px-4 text-right space-x-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>openDetails(u, false),
                                                    className: "px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold hover:bg-blue-500/30 transition shadow",
                                                    title: "View Full Profile Details",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                            className: "w-3.5 h-3.5 inline mr-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 419,
                                                            columnNumber: 21
                                                        }, this),
                                                        " View"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 413,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>openDetails(u, true),
                                                    className: "px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-300 font-bold hover:bg-amber-400/30 transition shadow",
                                                    title: "Edit Profile",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__["Edit3"], {
                                                            className: "w-3.5 h-3.5 inline mr-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 427,
                                                            columnNumber: 21
                                                        }, this),
                                                        " Edit"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 421,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>onToggleRole(u.id),
                                                    className: "px-2.5 py-1 rounded-lg bg-[#07193d] border border-[#1b3f8a] hover:border-amber-400 text-amber-300 font-bold transition shadow",
                                                    children: u.role === 'admin' ? 'Set as User' : 'Make Admin'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 429,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>onToggleStatus(u.id),
                                                    className: 'px-2.5 py-1 rounded-lg font-bold transition shadow ' + (u.status === 'Active' ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30' : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'),
                                                    children: u.status === 'Active' ? 'Suspend' : 'Activate'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 436,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>removeUser(u.id),
                                                    className: "px-2.5 py-1 rounded-lg bg-rose-600/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600/30 font-bold transition shadow",
                                                    title: "Delete User",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                            className: "w-3.5 h-3.5 inline mr-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 449,
                                                            columnNumber: 21
                                                        }, this),
                                                        " Delete"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 412,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, u.id, true, {
                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                    lineNumber: 381,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                            lineNumber: 379,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                    lineNumber: 368,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/admin/UserManagement.tsx",
                lineNumber: 367,
                columnNumber: 7
            }, this),
            selectedUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sr-modal-shell bg-gradient-to-br from-[#071738] via-[#05112b] to-[#030919] border-2 border-amber-400/50 rounded-3xl max-w-3xl w-full p-4 sm:p-8 shadow-2xl space-y-6 text-xs text-slate-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between border-b border-[#1b3f8a] pb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400/60 bg-[#07193d] flex items-center justify-center text-slate-950 font-black text-lg shrink-0 shadow-xl",
                                            children: selectedUser.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: selectedUser.avatar_url,
                                                alt: selectedUser.name,
                                                className: "w-full h-full object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 464,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full h-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-black",
                                                children: (selectedUser.name || 'U').slice(0, 2).toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 466,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 462,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-amber-400 font-black uppercase tracking-wider text-[10px]",
                                                            children: "User Profile & Capital Ledger Inspector"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 473,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] font-mono text-slate-300 bg-[#040d24] px-2 py-0.5 rounded border border-[#1b3f8a]",
                                                            children: selectedUser.id
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 474,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 472,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-black text-white",
                                                    children: selectedUser.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 476,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 471,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                    lineNumber: 461,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setEditMode(!editMode),
                                            className: 'px-3.5 py-2 rounded-xl font-bold border transition ' + (editMode ? 'bg-amber-400 text-slate-950 border-amber-400' : 'bg-blue-500/20 text-blue-300 border-blue-500/40'),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__["Edit3"], {
                                                    className: "w-3.5 h-3.5 inline mr-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 481,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                editMode ? 'Editing Enabled' : 'Edit Profile'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 480,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setSelectedUser(null),
                                            className: "w-9 h-9 rounded-full bg-[#040d24] border border-[#1b3f8a] flex items-center justify-center text-slate-400 hover:text-white transition",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 483,
                                                columnNumber: 223
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 483,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                    lineNumber: 479,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                            lineNumber: 460,
                            columnNumber: 13
                        }, this),
                        !editMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 border-b border-[#1b3f8a] pb-2 overflow-x-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setModalTab('overview'),
                                    className: `px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${modalTab === 'overview' ? 'bg-amber-400 text-slate-950 shadow-md' : 'bg-[#040d24] text-slate-300 hover:text-white border border-[#1b3f8a]'}`,
                                    children: "Profile & Balances"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                    lineNumber: 489,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setModalTab('kyc'),
                                    className: `px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${modalTab === 'kyc' ? 'bg-amber-400 text-slate-950 shadow-md' : 'bg-[#040d24] text-slate-300 hover:text-white border border-[#1b3f8a]'}`,
                                    children: [
                                        "KYC Verification ",
                                        userKyc?.kyc_status === 'APPROVED' ? '✓' : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                    lineNumber: 500,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setModalTab('investments'),
                                    className: `px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${modalTab === 'investments' ? 'bg-amber-400 text-slate-950 shadow-md' : 'bg-[#040d24] text-slate-300 hover:text-white border border-[#1b3f8a]'}`,
                                    children: [
                                        "Active Investments (",
                                        userInvestments.length || (selectedUser.invested > 0 ? 1 : 0),
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                    lineNumber: 511,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setModalTab('withdrawals'),
                                    className: `px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${modalTab === 'withdrawals' ? 'bg-amber-400 text-slate-950 shadow-md' : 'bg-[#040d24] text-slate-300 hover:text-white border border-[#1b3f8a]'}`,
                                    children: [
                                        "Withdrawals (",
                                        userWithdrawals.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                    lineNumber: 522,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                            lineNumber: 488,
                            columnNumber: 15
                        }, this),
                        editMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: saveEdit,
                            className: "space-y-4 bg-[#040d24] p-5 rounded-3xl border border-amber-400/40",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-black text-amber-400 text-sm mb-2",
                                    children: "Modify User Profile & Financial Data (Direct Database Update)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                    lineNumber: 538,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[11px] font-semibold text-slate-300 block mb-1",
                                                    children: "Full Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 541,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: editForm.name || '',
                                                    onChange: (e)=>updateEdit('name', e.target.value),
                                                    className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 542,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 540,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[11px] font-semibold text-slate-300 block mb-1",
                                                    children: "Email Address"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 545,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: editForm.email || '',
                                                    onChange: (e)=>updateEdit('email', e.target.value),
                                                    className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 546,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 544,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[11px] font-semibold text-slate-300 block mb-1",
                                                    children: "Set New Password (optional)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 549,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "password",
                                                    placeholder: "Leave blank to keep current",
                                                    value: editForm.password || '',
                                                    onChange: (e)=>updateEdit('password', e.target.value),
                                                    className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 550,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 548,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "sm:col-span-2 flex items-center gap-3 bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/60 bg-[#030a1a] flex items-center justify-center text-amber-300 font-bold shrink-0 shadow",
                                                    children: editForm.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: editForm.avatar_url,
                                                        alt: "Avatar",
                                                        className: "w-full h-full object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 555,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                        className: "w-5 h-5 text-slate-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 557,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 553,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[11px] font-bold text-amber-300 block",
                                                            children: "Avatar Photo (Upload or URL)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 561,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "px-3 py-1.5 rounded-xl bg-[#0c265e] border border-[#1d4ed8] text-blue-200 text-[11px] font-bold cursor-pointer hover:bg-[#133880] transition inline-flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                                            className: "w-3.5 h-3.5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                                            lineNumber: 564,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        " Upload Image",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "file",
                                                                            accept: "image/*",
                                                                            onChange: handleEditAvatarUpload,
                                                                            className: "hidden"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                                            lineNumber: 565,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                                    lineNumber: 563,
                                                                    columnNumber: 25
                                                                }, this),
                                                                editForm.avatar_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>updateEdit('avatar_url', ''),
                                                                    className: "px-2.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 text-[11px] font-bold",
                                                                    children: "Remove"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                                    lineNumber: 568,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    placeholder: "Or paste image URL...",
                                                                    value: (editForm.avatar_url || '').startsWith('data:') ? '' : editForm.avatar_url || '',
                                                                    onChange: (e)=>updateEdit('avatar_url', e.target.value),
                                                                    className: "flex-1 px-3 py-1.5 bg-[#030a1a] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 text-xs"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                                    lineNumber: 572,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 562,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 560,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 552,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[11px] font-semibold text-slate-300 block mb-1",
                                                    children: "Phone Number"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 582,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: editForm.phone || '',
                                                    onChange: (e)=>updateEdit('phone', e.target.value),
                                                    className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 583,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 581,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[11px] font-semibold text-slate-300 block mb-1",
                                                    children: "Country"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 586,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: editForm.country || '',
                                                    onChange: (e)=>updateEdit('country', e.target.value),
                                                    placeholder: "e.g. Bangladesh",
                                                    className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 587,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 585,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[11px] font-semibold text-slate-300 block mb-1",
                                                    children: "Preferred Currency"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 590,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: editForm.currency || 'USD',
                                                    onChange: (e)=>updateEdit('currency', e.target.value),
                                                    className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "USD",
                                                            children: "USD ($)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 592,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "BDT",
                                                            children: "BDT (৳)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 593,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "EUR",
                                                            children: "EUR (€)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 594,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "GBP",
                                                            children: "GBP (£)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 595,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "MYR",
                                                            children: "MYR (RM)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 596,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "INR",
                                                            children: "INR (₹)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 597,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 591,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 589,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[11px] font-semibold text-slate-300 block mb-1",
                                                    children: "Timezone"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 601,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: editForm.timezone || 'Asia/Dhaka',
                                                    onChange: (e)=>updateEdit('timezone', e.target.value),
                                                    placeholder: "e.g. Asia/Dhaka",
                                                    className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 602,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 600,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[11px] font-semibold text-slate-300 block mb-1",
                                                    children: "Account Tier"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 605,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: editForm.account_tier || 'PROSPECT',
                                                    onChange: (e)=>updateEdit('account_tier', e.target.value),
                                                    className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "PROSPECT",
                                                            children: "Prospect"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 607,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "ACTIVE_INVESTOR",
                                                            children: "Active Investor"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 608,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "VIP_INSTITUTIONAL",
                                                            children: "VIP Institutional"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 609,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 606,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 604,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[11px] font-semibold text-slate-300 block mb-1",
                                                    children: "System Role"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 613,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: editForm.role || 'user',
                                                    onChange: (e)=>updateEdit('role', e.target.value),
                                                    className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "user",
                                                            children: "User"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 615,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "admin",
                                                            children: "Admin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 616,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 614,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 612,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[11px] font-semibold text-slate-300 block mb-1",
                                                    children: "Account Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 620,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: editForm.status || 'Active',
                                                    onChange: (e)=>updateEdit('status', e.target.value),
                                                    className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Active",
                                                            children: "Active"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 622,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Suspended",
                                                            children: "Suspended"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 623,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 621,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 619,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[11px] font-semibold text-slate-300 block mb-1",
                                                    children: "Invested Capital ($)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 627,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: editForm.invested ?? 0,
                                                    onChange: (e)=>updateEdit('invested', Number(e.target.value)),
                                                    className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 font-bold text-amber-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 628,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 626,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[11px] font-semibold text-slate-300 block mb-1",
                                                    children: "Available Balance ($)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 631,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: editForm.balance ?? 0,
                                                    onChange: (e)=>updateEdit('balance', Number(e.target.value)),
                                                    className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 font-bold text-emerald-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 632,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 630,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[11px] font-semibold text-slate-300 block mb-1",
                                                    children: "Earned Profit ($)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 635,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: editForm.profit ?? 0,
                                                    onChange: (e)=>updateEdit('profit', Number(e.target.value)),
                                                    className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 font-bold text-cyan-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 636,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 634,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[11px] font-semibold text-slate-300 block mb-1",
                                                    children: "Referral Earnings ($)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 639,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: editForm.referral ?? editForm.referral_earned ?? 0,
                                                    onChange: (e)=>{
                                                        updateEdit('referral', Number(e.target.value));
                                                        updateEdit('referral_earned', Number(e.target.value));
                                                    },
                                                    className: "w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 font-bold text-amber-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 640,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 638,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                    lineNumber: 539,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-end gap-3 pt-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setEditMode(false),
                                            className: "px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 644,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: saving,
                                            className: "px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-black shadow-lg hover:brightness-110 transition",
                                            children: saving ? 'Saving...' : 'Save Changes to Database'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 645,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                    lineNumber: 643,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                            lineNumber: 537,
                            columnNumber: 15
                        }, this) : modalTab === 'overview' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 sm:grid-cols-3 gap-3.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400 block text-[10px] uppercase font-bold",
                                                    children: "User Unique ID"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 652,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono font-black text-amber-300 text-sm",
                                                    children: selectedUser.id
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 653,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 651,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                            className: "w-3 h-3 text-blue-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 656,
                                                            columnNumber: 116
                                                        }, this),
                                                        " Email"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 656,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-white truncate block",
                                                    children: selectedUser.email
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 657,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 655,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                            className: "w-3 h-3 text-emerald-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 660,
                                                            columnNumber: 116
                                                        }, this),
                                                        " Phone"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 660,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-white",
                                                    children: selectedUser.phone || 'Not provided'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 661,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 659,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                            className: "w-3 h-3 text-cyan-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 664,
                                                            columnNumber: 116
                                                        }, this),
                                                        " Country"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 664,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-white",
                                                    children: selectedUser.country || 'Global'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 665,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 663,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                            className: "w-3 h-3 text-yellow-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 668,
                                                            columnNumber: 116
                                                        }, this),
                                                        " Currency"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 668,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-amber-300 font-mono",
                                                    children: selectedUser.currency || 'USD ($)'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 669,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 667,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                            className: "w-3 h-3 text-indigo-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 672,
                                                            columnNumber: 116
                                                        }, this),
                                                        " Timezone"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 672,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-slate-200",
                                                    children: selectedUser.timezone || 'Asia/Dhaka'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 673,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 671,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                            className: "w-3 h-3 text-purple-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 676,
                                                            columnNumber: 116
                                                        }, this),
                                                        " Account Tier"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 676,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-black text-blue-300",
                                                    children: selectedUser.account_tier || 'PROSPECT'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 677,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 675,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                            className: "w-3 h-3 text-amber-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 680,
                                                            columnNumber: 116
                                                        }, this),
                                                        " System Role"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 680,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-black text-amber-300 uppercase",
                                                    children: selectedUser.role || 'user'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 681,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 679,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400 block text-[10px] uppercase font-bold",
                                                    children: "Account Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 684,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: 'font-black ' + (selectedUser.status === 'Active' ? 'text-emerald-400' : 'text-rose-400'),
                                                    children: selectedUser.status || 'Active'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 685,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 683,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                            className: "w-3 h-3 text-teal-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 688,
                                                            columnNumber: 116
                                                        }, this),
                                                        " Member Since"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 688,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-white",
                                                    children: selectedUser.reg_date || selectedUser.joinedDate || selectedUser.joined_date || selectedUser.created_at ? selectedUser.reg_date || selectedUser.joinedDate || selectedUser.joined_date || new Date(selectedUser.created_at).toLocaleDateString() : 'Feb 2026'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 689,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 687,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                            className: "w-3 h-3 text-emerald-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 692,
                                                            columnNumber: 116
                                                        }, this),
                                                        " KYC Status"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 692,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-emerald-400 uppercase",
                                                    children: selectedUser.kyc_status || 'VERIFIED'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 693,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 691,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                            className: "w-3 h-3 text-cyan-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 696,
                                                            columnNumber: 116
                                                        }, this),
                                                        " Live DB Sync"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 696,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-cyan-300",
                                                    children: fetchingLive ? 'Syncing...' : 'Live Connected'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 697,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 695,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                    lineNumber: 650,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#040d24] p-5 rounded-3xl border border-[#1b3f8a] space-y-4 shadow-xl",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "font-black text-amber-400 text-sm flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 701,
                                                    columnNumber: 93
                                                }, this),
                                                " Financial & Capital Ledger Overview"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 701,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 sm:grid-cols-4 gap-3 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-[#071738] p-3 rounded-2xl border border-[#1b3f8a] shadow",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-400 block text-[10px] font-bold uppercase",
                                                            children: "Invested Capital"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 704,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white font-black text-base mt-1 block",
                                                            children: [
                                                                "$",
                                                                selectedUser.invested || 0
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 705,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 703,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-[#071738] p-3 rounded-2xl border border-[#1b3f8a] shadow",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-400 block text-[10px] font-bold uppercase",
                                                            children: "Available Balance"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 708,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-emerald-400 font-black text-base mt-1 block",
                                                            children: [
                                                                "$",
                                                                selectedUser.balance || 0
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 709,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 707,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-[#071738] p-2.5 rounded-xl border border-[#173b7d] shadow",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-400 block text-[10px] font-bold uppercase",
                                                            children: "Earned Profit"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 712,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-cyan-400 font-black text-base mt-1 block",
                                                            children: [
                                                                "$",
                                                                selectedUser.profit || 0
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 713,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 711,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-[#071738] p-2.5 rounded-xl border border-[#173b7d] shadow",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-400 block text-[10px] font-bold uppercase",
                                                            children: "Referral Earnings"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 716,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-amber-300 font-black text-base mt-1 block",
                                                            children: [
                                                                "$",
                                                                selectedUser.referral || 0
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                            lineNumber: 717,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                    lineNumber: 715,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 702,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                    lineNumber: 700,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                            lineNumber: 649,
                            columnNumber: 15
                        }, this) : modalTab === 'kyc' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-[#040d24] p-5 rounded-2xl border border-[#1b3f8a] space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between pb-2 border-b border-[#1b3f8a]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                        className: "w-4 h-4 text-emerald-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 727,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-bold text-white text-sm",
                                                        children: "KYC Compliance Profile (Direct Database)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 728,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 726,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
                                                children: userKyc?.kyc_status || selectedUser.kyc_status || 'VERIFIED'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 730,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 725,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-slate-400 uppercase block font-bold",
                                                        children: "Legal Full Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 736,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-white mt-0.5 block",
                                                        children: userKyc?.legal_name || selectedUser.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 737,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 735,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-slate-400 uppercase block font-bold",
                                                        children: "Document Type"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 740,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-white mt-0.5 block",
                                                        children: userKyc?.document_type || 'National ID / Passport'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 741,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 739,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-slate-400 uppercase block font-bold",
                                                        children: "Document / ID No"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 744,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono font-bold text-amber-300 mt-0.5 block",
                                                        children: userKyc?.document_number || 'NID-98421049'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 745,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 743,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-slate-400 uppercase block font-bold",
                                                        children: "Country of Issuance"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 748,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-white mt-0.5 block",
                                                        children: userKyc?.country || selectedUser.country || 'Bangladesh'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 749,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 747,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-slate-400 uppercase block font-bold",
                                                        children: "Date of Birth"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 752,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-white mt-0.5 block",
                                                        children: userKyc?.date_of_birth || '1992-05-14'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 753,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 751,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-slate-400 uppercase block font-bold",
                                                        children: "Submitted Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 756,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-slate-300 mt-0.5 block",
                                                        children: userKyc?.created_at ? new Date(userKyc.created_at).toLocaleDateString() : 'On File'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 757,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 755,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 734,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 724,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                            lineNumber: 723,
                            columnNumber: 15
                        }, this) : modalTab === 'investments' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-[#040d24] p-4 rounded-2xl border border-[#1b3f8a]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-bold text-white text-sm mb-3 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                className: "w-4 h-4 text-amber-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 766,
                                                columnNumber: 21
                                            }, this),
                                            " Active Investments (Direct Database)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 765,
                                        columnNumber: 19
                                    }, this),
                                    userInvestments.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: userInvestments.map((inv, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between p-3 rounded-xl bg-[#071738] border border-[#1b3f8a]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-white block capitalize",
                                                                children: inv.plan_id || 'Active Investment'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                                lineNumber: 773,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] text-slate-400",
                                                                children: [
                                                                    "ROI: ",
                                                                    inv.monthly_roi || '~10%',
                                                                    " • Started: ",
                                                                    new Date(inv.start_date || Date.now()).toLocaleDateString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                                lineNumber: 774,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 772,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-right",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono font-black text-emerald-400 text-sm block",
                                                                children: [
                                                                    "$",
                                                                    inv.invested_amount || inv.amount || 0
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                                lineNumber: 777,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[9px] uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300",
                                                                children: inv.status || 'Active'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                                lineNumber: 778,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 776,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 771,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 769,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 rounded-xl bg-[#071738] border border-[#1b3f8a] flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-white block",
                                                        children: "Standard Quant Bullion Portfolio"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 786,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-slate-400",
                                                        children: "Session Execution: London & NY Desk • Status: Active"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 787,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 785,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-right",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono font-black text-amber-300 text-base block",
                                                        children: [
                                                            "$",
                                                            selectedUser.invested || selectedUser.active_investment || 0
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 790,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-slate-400",
                                                        children: "Total Capital"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 791,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 789,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 784,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 764,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                            lineNumber: 763,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-[#040d24] p-4 rounded-2xl border border-[#1b3f8a]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-bold text-white text-sm mb-3 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                className: "w-4 h-4 text-cyan-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 801,
                                                columnNumber: 21
                                            }, this),
                                            " Payout Requests & History (Direct Database)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 800,
                                        columnNumber: 19
                                    }, this),
                                    userWithdrawals.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: userWithdrawals.map((w, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between p-3 rounded-xl bg-[#071738] border border-[#1b3f8a]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-white block",
                                                                children: w.method || 'Gateway Payout'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                                lineNumber: 808,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] text-slate-400",
                                                                children: [
                                                                    "Account: ",
                                                                    w.account || '—',
                                                                    " • ",
                                                                    w.date || new Date(w.date_created || Date.now()).toLocaleDateString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                                lineNumber: 809,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 807,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-right",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono font-black text-amber-300 text-sm block",
                                                                children: [
                                                                    "$",
                                                                    w.amount || 0
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                                lineNumber: 812,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `text-[9px] uppercase px-2 py-0.5 rounded ${w.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`,
                                                                children: w.status || 'Pending'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                                lineNumber: 813,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                        lineNumber: 811,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                                lineNumber: 806,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 804,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400 text-center py-6",
                                        children: "No withdrawal requests on record for this user."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/UserManagement.tsx",
                                        lineNumber: 819,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/UserManagement.tsx",
                                lineNumber: 799,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                            lineNumber: 798,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between pt-2 border-t border-[#1b3f8a]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>removeUser(selectedUser.id),
                                    className: "px-4 py-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold flex items-center gap-1.5 hover:bg-rose-500/30 transition",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                                            lineNumber: 825,
                                            columnNumber: 239
                                        }, this),
                                        " Delete Account"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                    lineNumber: 825,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setSelectedUser(null),
                                    className: "px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black shadow-xl hover:brightness-110 transition",
                                    children: "Close Inspector"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                                    lineNumber: 826,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/UserManagement.tsx",
                            lineNumber: 824,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/admin/UserManagement.tsx",
                    lineNumber: 459,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/admin/UserManagement.tsx",
                lineNumber: 458,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/UserManagement.tsx",
        lineNumber: 252,
        columnNumber: 5
    }, this);
}
_s(UserManagement, "orhMiyopMwXacisSSaLanLfXCs0=");
_c = UserManagement;
var _c;
__turbopack_context__.k.register(_c, "UserManagement");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_admin_UserManagement_tsx_1n10i9wvnsy2v._.js.map