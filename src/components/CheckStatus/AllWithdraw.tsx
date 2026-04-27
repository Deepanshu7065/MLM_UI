"use client"

import { useGetWithdrawQuery } from '@/hooks/Payment.mutate'
import { themeColors } from '@/theme/themeConfig';
import { useTheme } from '@/theme/ThemeProvider';
import { ArrowUpCircle, Edit, Loader2, Wallet, TrendingUp, Clock, XCircle } from 'lucide-react';
import { useStore } from '@tanstack/react-store';
import { userStore } from '@/store/user.store';
import { WithdrawUIStore } from './WithdrawStore';
import { UpdateWithdraw } from './UpdateWithdraw';

const AllWithdrawals = () => {
    const { data, isLoading } = useGetWithdrawQuery();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const c = themeColors;

    const userDetails = useStore(userStore, (state) => state.user);
    const isAdmin = userDetails?.role === "admin";

    const sortedWithdrawals = data?.history
        ? [...data.history].sort((a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        : [];

    // ── Summary calculations ──────────────────────────────────
    const totalWithdrawn = sortedWithdrawals
        .filter((w: any) => w.status === "SUCCESS")
        .reduce((sum: number, w: any) => sum + parseFloat(w.amount || 0), 0);

    const totalPending = sortedWithdrawals
        .filter((w: any) => w.status === "PENDING")
        .reduce((sum: number, w: any) => sum + parseFloat(w.amount || 0), 0);

    const totalRejected = sortedWithdrawals
        .filter((w: any) => w.status === "REJECTED")
        .reduce((sum: number, w: any) => sum + parseFloat(w.amount || 0), 0);

    if (isLoading) {
        return (
            <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: isDark ? c.background.dark : c.background.light }}>
                <Loader2 size={40} className="animate-spin" color={isDark ? c.primary.dark : c.primary.light} />
            </div>
        );
    }

    if (sortedWithdrawals.length === 0) {
        return (
            <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: isDark ? c.background.dark : c.background.light, color: isDark ? "#fff" : "#000" }}>
                <Wallet size={60} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                <h2 style={{ opacity: 0.5 }}>No Withdrawal Requests Found</h2>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100%", padding: "4rem 2rem", backgroundColor: isDark ? c.background.dark : c.background.light }}>
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>

                <header style={{ marginBottom: "1.5rem" }}>
                    <h1 style={{ fontSize: "2rem", fontWeight: "900", letterSpacing: "2px", color: isDark ? "#fff" : "#000", margin: 0 }}>
                        {isAdmin ? "ALL WITHDRAWAL REQUESTS" : "MY WITHDRAWALS"}
                    </h1>
                    <p style={{ color: isDark ? c.textSecondary.dark : c.textSecondary.light, marginTop: "0.5rem" }}>
                        {isAdmin
                            ? `${sortedWithdrawals.length} total requests · Latest first`
                            : "Your withdrawal history"}
                    </p>
                </header>

                {/* ── Summary Cards ── */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
                    <SummaryCard
                        label="Total Processed"
                        value={`₹${totalWithdrawn.toFixed(2)}`}
                        sub={`${sortedWithdrawals.filter((w: any) => w.status === "SUCCESS").length} successful`}
                        icon={<TrendingUp size={20} />}
                        accent="#22c55e"
                        accentBg="rgba(34,197,94,0.1)"
                        isDark={isDark} c={c}
                    />
                    <SummaryCard
                        label="Pending Amount"
                        value={`₹${totalPending.toFixed(2)}`}
                        sub={`${sortedWithdrawals.filter((w: any) => w.status === "PENDING").length} awaiting`}
                        icon={<Clock size={20} />}
                        accent="#eab308"
                        accentBg="rgba(234,179,8,0.1)"
                        isDark={isDark} c={c}
                    />
                    <SummaryCard
                        label="Rejected Amount"
                        value={`₹${totalRejected.toFixed(2)}`}
                        sub={`${sortedWithdrawals.filter((w: any) => w.status === "REJECTED").length} rejected`}
                        icon={<XCircle size={20} />}
                        accent="#ef4444"
                        accentBg="rgba(239,68,68,0.1)"
                        isDark={isDark} c={c}
                    />
                </div>

                {/* ── Cards List ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {sortedWithdrawals.map((w: any) => (
                        <div key={w.id} style={{
                            backgroundColor: isDark ? c.card.dark : c.card.light,
                            borderRadius: "2rem", padding: "2.5rem",
                            border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
                            boxShadow: isDark ? "none" : "0 20px 40px rgba(0,0,0,0.05)"
                        }}>
                            {/* Top row */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                    <ArrowUpCircle size={40} color={
                                        w.status === "SUCCESS" ? "#22c55e" :
                                            w.status === "REJECTED" ? "#ef4444" :
                                                (isDark ? c.primary.dark : c.primary.light)
                                    } />
                                    <div>
                                        <h2 style={{ margin: 0, color: isDark ? "#fff" : "#000", fontSize: "1.5rem", fontWeight: "900" }}>
                                            ₹{w.amount}
                                        </h2>
                                        <StatusBadge status={w.status} />
                                    </div>
                                </div>

                                {isAdmin && (
                                    <Edit
                                        onClick={() => WithdrawUIStore.openViewModal.open(w.id, w)}
                                        size={17}
                                        style={{ cursor: "pointer", color: isDark ? c.primary.dark : c.primary.light }}
                                    />
                                )}
                            </div>

                            {/* Details grid */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", fontSize: "0.95rem" }}>
                                <Detail label="Request ID" value={`#${w.id}`} isDark={isDark} />
                                <Detail label="Date & Time" value={new Date(w.created_at).toLocaleString()} isDark={isDark} />
                                <Detail label="Transaction ID" value={w.transactionId || "Awaiting"} isDark={isDark} />
                                {isAdmin && <Detail label="User ID" value={w.userId} isDark={isDark} />}
                                {w.remarks && <Detail label="Remarks" value={w.remarks} isDark={isDark} />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isAdmin && <UpdateWithdraw />}
        </div>
    );
};

// ── Summary Card ─────────────────────────────────────────────

const SummaryCard = ({ label, value, sub, icon, accent, accentBg, isDark, c }: any) => (
    <div style={{
        backgroundColor: isDark ? c.card.dark : c.card.light,
        borderRadius: "1.25rem", padding: "1.4rem 1.5rem",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0"}`,
        boxShadow: isDark ? "none" : "0 4px 20px rgba(0,0,0,0.04)",
        display: "flex", alignItems: "center", gap: "1rem",
    }}>
        <div style={{ padding: "0.75rem", borderRadius: "0.875rem", backgroundColor: accentBg, color: accent, flexShrink: 0 }}>
            {icon}
        </div>
        <div>
            <p style={{ margin: 0, fontSize: "0.65rem", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {label}
            </p>
            <p style={{ margin: "3px 0 2px 0", fontSize: "1.3rem", fontWeight: "900", color: isDark ? "#fff" : "#0f172a" }}>
                {value}
            </p>
            <p style={{ margin: 0, fontSize: "0.7rem", fontWeight: "600", color: "#94a3b8" }}>
                {sub}
            </p>
        </div>
    </div>
);

// ── Helpers ───────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
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

const Detail = ({ label, value, isDark }: any) => (
    <div>
        <p style={{ margin: 0, fontSize: "0.8rem", color: isDark ? "#9ca3af" : "#6b7280" }}>{label}</p>
        <p style={{ margin: "4px 0 0 0", fontWeight: "700", color: isDark ? "#fff" : "#000", wordBreak: "break-all" }}>
            {value || "—"}
        </p>
    </div>
);

export default AllWithdrawals;