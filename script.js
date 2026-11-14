const fs = require('fs');

const code = `import React, { useState, useEffect } from 'react';
import TopNoticeBar from './components/TopNoticeBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureBar from './components/FeatureBar';
import MainSections from './components/MainSections';
import BottomBar from './components/BottomBar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import VideoModal from './components/VideoModal';
import { InvestModal, WithdrawModal } from './components/TransactionModals';
import AboutPage from './components/pages/AboutPage';
import MarketsPage from './components/pages/MarketsPage';
import PlansPage from './components/pages/PlansPage';
import PrivacyPage from './components/pages/PrivacyPage';
import TermsPage from './components/pages/TermsPage';
import ContactPage from './components/pages/ContactPage';
import DashboardPage from './components/pages/DashboardPage';
import AdminDashboard from './components/admin/AdminDashboard';
import { initialUsers, initialWithdrawals } from './data/adminData';
import { notifySuccess, notifyWarning, notifyConfirm } from './lib/notify';
import { defaultSettings, defaultPlans, fetchSystemSettings, saveSystemSettings, fetchPlans, savePlan, deletePlan } from './services/api';

const LS = 'sr_auth_v2';
const ga = () => { try { const r = localStorage.getItem(LS); return r ? JSON.parse(r) : null; } catch { return null; } };
const sa = (d) => { try { d ? localStorage.setItem(LS, JSON.stringify(d)) : localStorage.removeItem(LS); } catch {} };

export default function App() {
  const [authUser, setAuthUser] = useState(() => ga());
  const isLoggedIn = !!authUser;
  const userRole = authUser?.role || 'guest';
  const isAdmin = userRole === 'admin';
  const [activePage, setActivePage] = useState(() => ga()?.role === 'admin' ? 'admin' : 'home');

  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [videoOpen, setVideoOpen] = useState(false);
  const [investModal, setInvestModal] = useState({ isOpen: false, plan: null });
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const [settings, setSettings] = useState(defaultSettings);
  const [plans, setPlans] = useState(defaultPlans);
  const [users, setUsers] = useState(initialUsers);
  const [withdrawals, setWithdrawals] = useState(initialWithdrawals);

  const [userData, setUserData] = useState({
    name: 'Md. Rahman',
    email: 'trader@srinvestment.com',
    id: 'SR100245',
    status: 'Active',
    invested: 500,
    profit: 50,
    referral: 75,
    balance: 75
  });
`;