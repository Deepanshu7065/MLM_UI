"use client"

import { useGetPayment, useGetUserWithdrawQuery } from '@/hooks/Payment.mutate'
import { themeColors } from '@/theme/themeConfig';
import { useTheme } from '@/theme/ThemeProvider';
import { CreditCard, Edit, Loader2, Calendar, Hash, Tag, ArrowDownCircle, ArrowUpCircle, Wallet, TrendingUp, Clock, XCircle, BadgeIndianRupee } from 'lucide-react';
import { PaymentUIStore } from './payemntStore';
import { UpdatePayment } from './updatePayment';

import { useStore } from '@tanstack/react-store';
import { userStore } from '@/store/user.store';
import { useState } from 'react';
import { UpdateWithdraw } from './UpdateWithdraw';

type Tab = "payments" | "withdrawals";

const PaymentHistory = () => {
  const { data, isLoading } = useGetPayment()
  const { data: withdrawData, isLoading: withdrawLoading } = useGetUserWithdrawQuery()
  const { theme } = useTheme();
  const userDetails = useStore(userStore, (state) => state.user);
  const [activeTab, setActiveTab] = useState<Tab>("payments");

  const isDark = theme === "dark";
  const c = themeColors;

  const payments = data?.payment ? [...data.payment].sort((a: any, b: any) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ) : [];

  const withdrawals = withdrawData?.history ? [...withdrawData.history].sort((a: any, b: any) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ) : [];

  // ── Summary Calculations ──────────────────────────────────

  // For Payments
  const totalPaid = payments
    .filter((p: any) => p.status === "SUCCESS")
    .reduce((sum: number, p: any) => sum + parseFloat(p.total_amount || 0), 0);

  const totalFailed = payments
    .filter((p: any) => p.status !== "SUCCESS")
    .reduce((sum: number, p: any) => sum + parseFloat(p.total_amount || 0), 0);

  // For Withdrawals
  const totalWithdrawn = withdrawals
    .filter((w: any) => w.status === "SUCCESS")
    .reduce((sum: number, w: any) => sum + parseFloat(w.amount || 0), 0);

  const pendingWithdraw = withdrawals
    .filter((w: any) => w.status === "PENDING")
    .reduce((sum: number, w: any) => sum + parseFloat(w.amount || 0), 0);

  const isPageLoading = activeTab === "payments" ? isLoading : withdrawLoading;

  if (isPageLoading) {
    return (
      <div style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader2 size={40} className="animate-spin" color={isDark ? c.primary.dark : c.primary.light} />
      </div>
    );
  }

  const tabStyle = (tab: Tab): React.CSSProperties => ({
    flex: 1,
    padding: "0.75rem 1.5rem",
    borderRadius: "1rem",
    border: "none",
    cursor: "pointer",
    fontWeight: "800",
    fontSize: "0.85rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.2s",
    backgroundColor: activeTab === tab
      ? (isDark ? c.primary.dark : c.primary.light)
      : "transparent",
    color: activeTab === tab
      ? "#fff"
      : (isDark ? "#94a3b8" : "#64748b"),
  });

  return (
    <div style={{ minHeight: "100%", padding: "4rem 2rem", backgroundColor: isDark ? c.background.dark : c.background.light }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        <header style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "900", color: isDark ? "#fff" : "#000", margin: 0 }}>
            TRANSACTION HISTORY
          </h1>
          <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
            Track all your payments and withdrawal requests
          </p>
        </header>

        {/* ── Summary Cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          {activeTab === "payments" ? (
            <>
              <SummaryCard
                label="Total Spent"
                value={`₹${totalPaid.toFixed(2)}`}
                sub="Successful Purchases"
                icon={<TrendingUp size={20} />}
                accent="#22c55e"
                accentBg="rgba(34,197,94,0.1)"
                isDark={isDark} c={c}
              />
              <SummaryCard
                label="Failed/Pending"
                value={`₹${totalFailed.toFixed(2)}`}
                sub="Unsuccessful Attempts"
                icon={<XCircle size={20} />}
                accent="#ef4444"
                accentBg="rgba(239,68,68,0.1)"
                isDark={isDark} c={c}
              />
            </>
          ) : (
            <>
              <SummaryCard
                label="Total Withdrawn"
                value={`₹${totalWithdrawn.toFixed(2)}`}
                sub="Successfully Disbursed"
                icon={<BadgeIndianRupee size={20} />}
                accent="#3b82f6"
                accentBg="rgba(59,130,246,0.1)"
                isDark={isDark} c={c}
              />
              <SummaryCard
                label="Awaiting Payout"
                value={`₹${pendingWithdraw.toFixed(2)}`}
                sub="Pending Approval"
                icon={<Clock size={20} />}
                accent="#eab308"
                accentBg="rgba(234,179,8,0.1)"
                isDark={isDark} c={c}
              />
            </>
          )}
        </div>

        {/* ── Tab Switcher ── */}
        <div style={{
          display: "flex",
          gap: "6px",
          padding: "6px",
          borderRadius: "1.25rem",
          backgroundColor: isDark ? c.card.dark : "#f1f5f9",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0"}`,
          marginBottom: "2.5rem",
        }}>
          <button style={tabStyle("payments")} onClick={() => setActiveTab("payments")}>
            <ArrowDownCircle size={16} />
            Payments
            {payments.length > 0 && (
              <span style={{
                padding: "2px 8px",
                borderRadius: "2rem",
                fontSize: "0.7rem",
                backgroundColor: activeTab === "payments" ? "rgba(255,255,255,0.2)" : (isDark ? "rgba(255,255,255,0.07)" : "#e2e8f0"),
              }}>
                {payments.length}
              </span>
            )}
          </button>
          <button style={tabStyle("withdrawals")} onClick={() => setActiveTab("withdrawals")}>
            <ArrowUpCircle size={16} />
            Withdrawals
            {withdrawals.length > 0 && (
              <span style={{
                padding: "2px 8px",
                borderRadius: "2rem",
                fontSize: "0.7rem",
                backgroundColor: activeTab === "withdrawals" ? "rgba(255,255,255,0.2)" : (isDark ? "rgba(255,255,255,0.07)" : "#e2e8f0"),
              }}>
                {withdrawals.length}
              </span>
            )}
          </button>
        </div>

        {/* ── Content (Same as before) ── */}
        {activeTab === "payments" ? (
          payments.length === 0 ? (
            <EmptyState icon={<CreditCard size={60} />} text="No Transactions Found" isDark={isDark} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {payments.map((p: any) => (
                <div key={p.id} style={cardStyle(isDark, c)}>
                  {/* ... Card Content ... */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                      <div style={iconBoxStyle(isDark)}>
                        <CreditCard size={24} color={isDark ? c.primary.dark : c.primary.light} />
                      </div>
                      <div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: isDark ? "#fff" : "#000" }}>
                          ₹{p.total_amount}
                        </h2>
                        <PaymentStatusBadge status={p.status} />
                      </div>
                    </div>
                    {userDetails?.role === "admin" && (
                      <Edit
                        onClick={() => PaymentUIStore.openViewModal.open(p.id, p)}
                        size={18}
                        style={{ cursor: "pointer", color: "#64748b" }}
                      />
                    )}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
                    <DetailItem label="Payment ID" value={p.payment_id} icon={<Hash size={12} />} isDark={isDark} />
                    <DetailItem label="Date & Time" value={new Date(p.created_at).toLocaleString()} icon={<Calendar size={12} />} isDark={isDark} />
                    <DetailItem label="Method" value={p.payment_method?.toUpperCase()} icon={<CreditCard size={12} />} isDark={isDark} />
                    <DetailItem label="Order ID" value={p.order_id || "N/A"} icon={<Tag size={12} />} isDark={isDark} />
                  </div>
                  {p.courses && p.courses.length > 0 && (
                    <div style={{ marginTop: '1.5rem', paddingTop: '1.2rem', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9'}` }}>
                      <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#64748b', marginBottom: '8px' }}>ITEMS IN THIS TRANSACTION</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {p.courses.map((course: any) => (
                          <span key={course.id} style={chipStyle(isDark)}>
                            {course.course_name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        ) : (
          withdrawals.length === 0 ? (
            <EmptyState icon={<Wallet size={60} />} text="No Withdrawal Requests Found" isDark={isDark} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {withdrawals.map((w: any) => (
                <div key={w.id} style={cardStyle(isDark, c)}>
                  {/* ... Card Content ... */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                      <div style={iconBoxStyle(isDark)}>
                        <ArrowUpCircle size={24} color={
                          w.status === "SUCCESS" ? "#22c55e" :
                            w.status === "REJECTED" ? "#ef4444" :
                              (isDark ? c.primary.dark : c.primary.light)
                        } />
                      </div>
                      <div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: isDark ? "#fff" : "#000" }}>
                          ₹{w.amount}
                        </h2>
                        <WithdrawStatusBadge status={w.status} />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
                    <DetailItem label="Request ID" value={`#${w.id}`} icon={<Hash size={12} />} isDark={isDark} />
                    <DetailItem label="Date & Time" value={new Date(w.created_at).toLocaleString()} icon={<Calendar size={12} />} isDark={isDark} />
                    <DetailItem label="Transaction ID" value={w.transactionId || "—"} icon={<Tag size={12} />} isDark={isDark} />
                    <DetailItem label="User ID" value={w.userId} icon={<Tag size={12} />} isDark={isDark} />
                  </div>

                  {w.remarks && (
                    <div style={{ marginTop: '1.5rem', paddingTop: '1.2rem', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9'}` }}>
                      <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#64748b', marginBottom: '6px' }}>REMARKS</p>
                      <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '600', color: isDark ? '#cbd5e1' : '#475569' }}>
                        {w.remarks}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}
      </div>

      <UpdatePayment />
      <UpdateWithdraw />
    </div>
  );
};


const SummaryCard = ({ label, value, sub, icon, accent, accentBg, isDark, c }: any) => (
  <div style={{
    backgroundColor: isDark ? c.card.dark : c.card.light,
    borderRadius: "1.25rem", padding: "1.2rem 1.5rem",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0"}`,
    display: "flex", alignItems: "center", gap: "1rem",
  }}>
    <div style={{ padding: "0.75rem", borderRadius: "0.875rem", backgroundColor: accentBg, color: accent }}>
      {icon}
    </div>
    <div>
      <p style={{ margin: 0, fontSize: "0.65rem", fontWeight: "800", color: "#64748b", textTransform: "uppercase" }}>{label}</p>
      <p style={{ margin: "2px 0", fontSize: "1.3rem", fontWeight: "900", color: isDark ? "#fff" : "#0f172a" }}>{value}</p>
      <p style={{ margin: 0, fontSize: "0.7rem", fontWeight: "600", color: "#94a3b8" }}>{sub}</p>
    </div>
  </div>
);


const cardStyle = (isDark: boolean, c: any): React.CSSProperties => ({
  backgroundColor: isDark ? c.card.dark : c.card.light,
  borderRadius: "1.5rem",
  padding: "2rem",
  border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0"}`,
  boxShadow: isDark ? "none" : "0 10px 25px rgba(0,0,0,0.03)"
});

const iconBoxStyle = (isDark: boolean): React.CSSProperties => ({
  padding: '0.75rem',
  borderRadius: '1rem',
  backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc'
});

const chipStyle = (isDark: boolean): React.CSSProperties => ({
  fontSize: '0.7rem',
  fontWeight: '700',
  padding: '4px 10px',
  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9',
  borderRadius: '6px',
  color: isDark ? '#cbd5e1' : '#475569'
});

const PaymentStatusBadge = ({ status }: { status: string }) => (
  <span style={{
    fontSize: '0.75rem', fontWeight: '800', padding: '2px 10px', borderRadius: '2rem',
    backgroundColor: status === "SUCCESS" ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
    color: status === "SUCCESS" ? "#22c55e" : "#ef4444",
  }}>
    {status}
  </span>
);

const WithdrawStatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { bg: string; color: string }> = {
    SUCCESS: { bg: 'rgba(34,197,94,0.1)', color: '#22c55e' },
    PENDING: { bg: 'rgba(234,179,8,0.1)', color: '#eab308' },
    REJECTED: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
  };
  const s = map[status] || map.PENDING;
  return (
    <span style={{ fontSize: '0.75rem', fontWeight: '800', padding: '2px 10px', borderRadius: '2rem', backgroundColor: s.bg, color: s.color }}>
      {status}
    </span>
  );
};

const EmptyState = ({ icon, text, isDark }: any) => (
  <div style={{ height: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: isDark ? "#fff" : "#000" }}>
    <span style={{ opacity: 0.2, marginBottom: '1rem' }}>{icon}</span>
    <h2 style={{ opacity: 0.5 }}>{text}</h2>
  </div>
);

const DetailItem = ({ label, value, icon, isDark }: any) => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
      <span style={{ color: '#64748b' }}>{icon}</span>
      <span style={{ fontSize: "0.65rem", fontWeight: "800", color: "#64748b", textTransform: 'uppercase' as const }}>{label}</span>
    </div>
    <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: "700", color: isDark ? "#fff" : "#1e293b", wordBreak: 'break-all' }}>
      {value || "—"}
    </p>
  </div>
);

export default PaymentHistory;