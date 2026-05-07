"use client";

import { useGetAllCommissions, useGetAllOrders, useGetAllUsers } from "@/hooks/earning.mutate";
import { useTheme } from "@/theme/ThemeProvider";
import {
    Users, ShoppingCart, TrendingUp, Wallet,
    BadgeIndianRupee, ArrowDownRight, Clock,
    Shield, Activity, User as UserIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo, useState } from "react";

interface UserRef {
    name: string;
    email: string;
    userId: string;
    phone?: string;
}

interface WalletEntry {
    id: number;
    userId: string;
    balance: string;
    user?: UserRef;
}

interface Commission {
    id: number;
    userId: string;
    buyerUserId: string;
    orderId: number;
    amount: string;
    percentage: string;
    level: number;
    created_at: string;
    recipient?: UserRef;
    buyer?: UserRef;
}

interface PaymentRecord {
    id: number;
    userId: string;
    total_amount: number;
    status: "SUCCESS" | "FAILED" | "PENDING";
    created_at: string;
    user?: UserRef;
}

interface UserPaymentSummary {
    userId: string;
    name: string;
    email: string;
    totalPaid: number;
    successCount: number;
    failedCount: number;
    pendingCount: number;
}

interface PaginationMeta {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
}

interface CommissionData {
    success: boolean;
    summary: {
        totalCommissionPaid: number;
        totalRevenue: number;
        adminProfit: number;
    };
    commissions: Commission[];
    payments: PaymentRecord[];
    userSummary: UserPaymentSummary[];
    wallets: WalletEntry[];
    paymentMeta: PaginationMeta;
    summaryMeta: PaginationMeta;
}

const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const avatar = (name?: string) => name ? name.slice(0, 2).toUpperCase() : "??";

function PaginationBar({
    meta,
    onPageChange,
    isDark,
}: {
    meta: PaginationMeta | undefined;
    onPageChange: (page: number) => void;
    isDark: boolean;
}) {
    if (!meta || meta.totalPages <= 1) return null;

    const start = (meta.page - 1) * meta.limit + 1;
    const end = Math.min(meta.page * meta.limit, meta.total);

    return (
        <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 24px",
            borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9"}`,
        }}>
            <p style={{ fontSize: "12px", opacity: 0.5, margin: 0 }}>
                Showing {start}–{end} of {meta.total}
            </p>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <button
                    disabled={meta.page <= 1}
                    onClick={() => onPageChange(meta.page - 1)}
                    style={{
                        padding: "6px 14px", borderRadius: "8px", fontSize: "12px",
                        fontWeight: "700", border: "0",
                        cursor: meta.page <= 1 ? "not-allowed" : "pointer",
                        opacity: meta.page <= 1 ? 0.35 : 1,
                        background: "#3b82f6", color: "#fff",
                    }}
                >← Prev</button>

                <span style={{
                    padding: "6px 14px", borderRadius: "8px", fontSize: "12px",
                    fontWeight: "700",
                    background: isDark ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.08)",
                    color: "#3b82f6",
                }}>
                    {meta.page} / {meta.totalPages}
                </span>

                <button
                    disabled={meta.page >= meta.totalPages}
                    onClick={() => onPageChange(meta.page + 1)}
                    style={{
                        padding: "6px 14px", borderRadius: "8px", fontSize: "12px",
                        fontWeight: "700", border: "0",
                        cursor: meta.page >= meta.totalPages ? "not-allowed" : "pointer",
                        opacity: meta.page >= meta.totalPages ? 0.35 : 1,
                        background: "#3b82f6", color: "#fff",
                    }}
                >Next →</button>
            </div>
        </div>
    );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ title, value, icon: Icon, accent, sub, isRupee, isDark }: {
    title: string; value: number; icon: any; accent: string;
    sub: string; isRupee: boolean; isDark: boolean;
}) {
    return (
        <Card style={{
            position: "relative", overflow: "hidden", border: "0", borderRadius: "16px",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
            background: isDark
                ? "linear-gradient(145deg,#0f172a 0%,#1e293b 100%)"
                : "linear-gradient(145deg,#ffffff 0%,#f8fafc 100%)",
        }}>
            <div style={{
                position: "absolute", top: "-24px", right: "-24px",
                width: "96px", height: "96px", borderRadius: "50%",
                opacity: 0.1, background: accent,
            }} />
            <CardHeader style={{ padding: "20px 20px 8px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ padding: "10px", borderRadius: "12px", background: `${accent}20`, color: accent }}>
                        <Icon size={20} strokeWidth={2.5} />
                    </div>
                    <Badge style={{
                        fontSize: "10px", fontWeight: "700",
                        background: `${accent}15`, color: accent,
                        border: `1px solid ${accent}30`, borderRadius: "12px", boxShadow: "none",
                    }}>{sub}</Badge>
                </div>
            </CardHeader>
            <CardContent style={{ padding: "0 20px 20px 20px" }}>
                <p style={{ fontSize: "11px", opacity: 0.6, marginBottom: "4px", fontWeight: "600", textTransform: "uppercase" }}>
                    {title}
                </p>
                <p style={{ fontSize: "clamp(20px,4vw,28px)", fontWeight: "900", color: accent, margin: 0 }}>
                    {isRupee ? `₹${fmt(value)}` : Number(value).toLocaleString("en-IN")}
                </p>
            </CardContent>
        </Card>
    );
}

// ─── Section Header ──────────────────────────────────────────────────────────
function SectionHeader({ title, sub }: { title: string; sub?: string }) {
    return (
        <div style={{ marginBottom: "16px", marginTop: "32px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "900", margin: 0 }}>{title}</h2>
            {sub && <p style={{ fontSize: "12px", opacity: 0.5, margin: "4px 0 0" }}>{sub}</p>}
        </div>
    );
}

const AdminDashboard = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [paymentPage, setPaymentPage] = useState(1);
    const [summaryPage, setSummaryPage] = useState(1);
    const [commFilter, setCommFilter] = useState<"all" | "level1" | "level2">("all");
    const [txFilter, setTxFilter] = useState<"ALL" | "SUCCESS" | "FAILED" | "PENDING">("ALL");

    const { data: commData, isLoading: commLoading } = useGetAllCommissions(paymentPage, summaryPage);
    const { data: usersData, isLoading: usersLoading } = useGetAllUsers();
    const { data: ordersData, isLoading: ordersLoading } = useGetAllOrders();

    const data = commData as CommissionData | undefined;
    const summary = data?.summary;
    const wallets: WalletEntry[] = data?.wallets ?? [];
    const allPayments: PaymentRecord[] = data?.payments ?? [];
    const userSummary: UserPaymentSummary[] = data?.userSummary ?? [];
    const paymentMeta = data?.paymentMeta;
    const summaryMeta = data?.summaryMeta;

    const commissions: Commission[] = useMemo(() => {
        const list = data?.commissions ?? [];
        if (commFilter === "all") return list;
        return list.filter(c => c.level === (commFilter === "level1" ? 1 : 2));
    }, [data, commFilter]);

    const filteredPayments: PaymentRecord[] = useMemo(() => {
        if (txFilter === "ALL") return allPayments;
        return allPayments.filter(p => p.status === txFilter);
    }, [allPayments, txFilter]);

    const totalUsers = usersData?.users?.length ?? usersData?.length ?? 0;
    const totalOrders = ordersData?.orders?.length ?? ordersData?.length ?? 0;
    const isLoading = commLoading || usersLoading || ordersLoading;

    const statCards = [
        { title: "Total Revenue", value: summary?.totalRevenue ?? 0, icon: BadgeIndianRupee, accent: "#f59e0b", sub: "All Time", isRupee: true },
        { title: "Admin Profit", value: summary?.adminProfit ?? 0, icon: Shield, accent: "#10b981", sub: "Net Profit", isRupee: true },
        { title: "Commission Paid", value: summary?.totalCommissionPaid ?? 0, icon: TrendingUp, accent: "#8b5cf6", sub: "Distributed", isRupee: true },
        { title: "Total Users", value: totalUsers, icon: Users, accent: "#3b82f6", sub: "Registered", isRupee: false },
        { title: "Total Orders", value: totalOrders, icon: ShoppingCart, accent: "#f43f5e", sub: "Placed", isRupee: false },
        { title: "Active Wallets", value: wallets.length, icon: Wallet, accent: "#06b6d4", sub: "With Balance", isRupee: false },
    ];

    const filterBtn = (label: string, active: boolean, onClick: () => void) => (
        <button key={label} onClick={onClick} style={{
            padding: "6px 16px", borderRadius: "20px", fontSize: "11px",
            fontWeight: "700", cursor: "pointer", border: "0", transition: "all 0.2s ease",
            background: active ? "#3b82f6" : (isDark ? "#334155" : "#f1f5f9"),
            color: active ? "#fff" : (isDark ? "#94a3b8" : "#64748b"),
        }}>{label}</button>
    );

    const tableWrap = (children: React.ReactNode) => (
        <Card style={{ border: "0", borderRadius: "16px", overflow: "hidden", background: isDark ? "#1e293b" : "#fff" }}>
            {children}
        </Card>
    );

    return (
        <div style={{
            minHeight: "100vh", width: "100%", maxWidth: "100vw", overflowX: "hidden",
            padding: "clamp(1rem,5vw,2rem)",
            color: isDark ? "#f8fafc" : "#0f172a",
            backgroundColor: isDark ? "#020617" : "#f1f5f9",
        }}>
            <style>{`
                *, *::before, *::after { box-sizing: border-box; }
                .stats-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; margin-bottom:32px; }
                .charts-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr)); gap:24px; }
                .t-scroll { overflow-x:auto; width:100%; -webkit-overflow-scrolling:touch; }
                .filter-row { display:flex; gap:8px; overflow-x:auto; padding-bottom:4px; flex-wrap:wrap; }
                .payment-grid {
                      display: flex;
                      justify-content: space-between;
                    }
                  .payment-grid > div {
                      width: 50%;
                  }
                @media(max-width:740px){
                    .stats-grid { display:flex; overflow-x:auto; padding-bottom:12px; gap:12px; scroll-snap-type:x mandatory; }
                    .stats-grid > div { min-width:220px; flex-shrink:0; scroll-snap-align:start; }
                    .charts-grid { grid-template-columns:1fr; }
                    .payment-grid {
                         flex-direction: column;
                    }
                     .payment-grid > div {
                         width: 100% !important;
                    }
                }
            `}</style>

            {/* ── Header ── */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", gap: "16px", flexWrap: "wrap" }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <Shield size={16} color="#10b981" />
                        <span style={{ fontSize: "10px", fontWeight: "700", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>Admin Panel</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(24px,5vw,32px)", fontWeight: "900", margin: 0, letterSpacing: "-0.03em" }}>Financial Overview</h1>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", color: "#10b981", background: isDark ? "rgba(16,185,129,0.1)" : "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)" }}>
                    <Activity size={14} className="animate-pulse" /> Live Data
                </div>
            </div>

            {/* ── Stat Cards ── */}
            <div className="stats-grid">
                {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} style={{ height: "140px", borderRadius: "16px" }} />)
                    : statCards.map(c => <StatCard key={c.title} {...c} isDark={isDark} />)
                }
            </div>

            {/* ── Charts Row ── */}
            <div className="charts-grid" style={{ marginBottom: "32px" }}>
                {/* Revenue Split */}
                <Card style={{ border: "0", borderRadius: "16px", background: isDark ? "#1e293b" : "#fff" }}>
                    <CardHeader><CardTitle style={{ fontSize: "16px", fontWeight: "800" }}>Revenue Split</CardTitle></CardHeader>
                    <CardContent>
                        {summary && summary.totalRevenue > 0 ? (
                            <>
                                <div style={{ display: "flex", height: "12px", borderRadius: "6px", overflow: "hidden", marginBottom: "20px", background: isDark ? "#334155" : "#f1f5f9" }}>
                                    <div style={{ width: `${(summary.adminProfit / summary.totalRevenue) * 100}%`, background: "#10b981" }} />
                                    <div style={{ width: `${(summary.totalCommissionPaid / summary.totalRevenue) * 100}%`, background: "#8b5cf6" }} />
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                    <div style={{ padding: "12px", borderRadius: "12px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.15)" }}>
                                        <p style={{ fontSize: "11px", color: "#10b981", fontWeight: "700", margin: 0 }}>Admin Profit</p>
                                        <p style={{ fontSize: "clamp(16px,3vw,20px)", fontWeight: "900", margin: "4px 0 0" }}>₹{fmt(summary.adminProfit)}</p>
                                    </div>
                                    <div style={{ padding: "12px", borderRadius: "12px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.15)" }}>
                                        <p style={{ fontSize: "11px", color: "#8b5cf6", fontWeight: "700", margin: 0 }}>Commission Paid</p>
                                        <p style={{ fontSize: "clamp(16px,3vw,20px)", fontWeight: "900", margin: "4px 0 0" }}>₹{fmt(summary.totalCommissionPaid)}</p>
                                    </div>
                                </div>
                            </>
                        ) : <p style={{ opacity: 0.4, fontSize: "13px" }}>No revenue data yet</p>}
                    </CardContent>
                </Card>

                {/* Top Wallets */}
                <Card style={{ border: "0", borderRadius: "16px", background: isDark ? "#1e293b" : "#fff" }}>
                    <CardHeader><CardTitle style={{ fontSize: "16px", fontWeight: "800" }}>Top Wallet Balances</CardTitle></CardHeader>
                    <CardContent>
                        {wallets.length === 0
                            ? <p style={{ opacity: 0.4, fontSize: "13px" }}>No wallets found</p>
                            : <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                {wallets.slice(0, 5).map((w, i) => (
                                    <div key={w.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: isDark ? "#334155" : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" }}>{i + 1}</div>
                                            <div>
                                                <p style={{ fontSize: "13px", fontWeight: "700", margin: 0 }}>{w.user?.name ?? w.userId}</p>
                                                <p style={{ fontSize: "10px", opacity: 0.5, margin: 0 }}>{w.user?.email ?? ""}</p>
                                            </div>
                                        </div>
                                        <p style={{ fontWeight: "800", color: "#f59e0b", fontSize: "14px", margin: 0 }}>₹{fmt(parseFloat(w.balance))}</p>
                                    </div>
                                ))}
                            </div>
                        }
                    </CardContent>
                </Card>
            </div>

            {/* ── 1. Commission Ledger ── */}
            <SectionHeader title="Commission Ledger" sub="Referral se kitna mila" />
            {tableWrap(
                <>
                    <CardHeader style={{ padding: "20px 24px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                        <p style={{ fontSize: "12px", opacity: 0.5, margin: 0 }}>{commissions.length} record{commissions.length !== 1 ? "s" : ""}</p>
                        <div className="filter-row">
                            {(["all", "level1", "level2"] as const).map(f =>
                                filterBtn(f.toUpperCase(), commFilter === f, () => setCommFilter(f))
                            )}
                        </div>
                    </CardHeader>
                    <CardContent style={{ padding: "0" }}>
                        <div className="t-scroll">
                            <Table>
                                <TableHeader style={{ background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc" }}>
                                    <TableRow>
                                        {["Recipient", "Buyer", "Level", "Amount", "Order", "Date"].map(h => (
                                            <TableHead key={h} style={{ padding: "14px 20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", opacity: 0.6, whiteSpace: "nowrap" }}>{h}</TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {commissions.length > 0 ? commissions.map(c => (
                                        <TableRow key={c.id} style={{ borderBottom: `1px solid ${isDark ? "#334155" : "#f1f5f9"}` }}>
                                            <TableCell style={{ padding: "14px 20px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <div style={{ width: "34px", height: "34px", flexShrink: 0, borderRadius: "50%", background: "#3b82f620", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "bold" }}>{avatar(c.recipient?.name)}</div>
                                                    <div>
                                                        <p style={{ fontSize: "13px", fontWeight: "700", margin: 0 }}>{c.recipient?.name ?? "—"}</p>
                                                        <p style={{ fontSize: "10px", opacity: 0.45, margin: 0 }}>{c.recipient?.email ?? c.userId}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell style={{ padding: "14px 20px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                    <div style={{ width: "28px", height: "28px", flexShrink: 0, borderRadius: "50%", background: "#f59e0b20", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold" }}>{avatar(c.buyer?.name)}</div>
                                                    <div>
                                                        <p style={{ fontSize: "12px", fontWeight: "600", margin: 0 }}>{c.buyer?.name ?? "—"}</p>
                                                        <p style={{ fontSize: "10px", opacity: 0.45, margin: 0 }}>{c.buyer?.email ?? c.buyerUserId}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell style={{ padding: "14px 20px" }}>
                                                <Badge style={{ fontSize: "10px", borderRadius: "8px", boxShadow: "none", border: "0", background: c.level === 1 ? "rgba(16,185,129,0.15)" : "rgba(139,92,246,0.15)", color: c.level === 1 ? "#10b981" : "#8b5cf6" }}>L{c.level}</Badge>
                                            </TableCell>
                                            <TableCell style={{ padding: "14px 20px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#10b981", fontWeight: "800", fontSize: "14px" }}>
                                                    <ArrowDownRight size={14} /> ₹{fmt(parseFloat(c.amount))}
                                                </div>
                                                <p style={{ fontSize: "10px", opacity: 0.45, margin: "2px 0 0" }}>{parseFloat(c.percentage)}%</p>
                                            </TableCell>
                                            <TableCell style={{ padding: "14px 20px" }}>
                                                <span style={{ fontSize: "11px", fontWeight: "700", padding: "3px 8px", borderRadius: "6px", background: isDark ? "#334155" : "#f1f5f9" }}>#{c.orderId}</span>
                                            </TableCell>
                                            <TableCell style={{ padding: "14px 20px", fontSize: "12px", opacity: 0.6, whiteSpace: "nowrap" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><Clock size={12} />{fmtDate(c.created_at)}</div>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={6} style={{ textAlign: "center", padding: "48px", opacity: 0.4 }}>
                                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                                                    <UserIcon size={32} />
                                                    <p style={{ margin: 0, fontWeight: "600" }}>No commissions yet</p>
                                                    <p style={{ margin: 0, fontSize: "12px" }}>Commissions appear after referral payments</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </>
            )}

            {/* ── 2. User Payment Summary ── */}
            <div className="payment-grid" style={{
                padding: "20px 20px 0",
                gap: "16px",
                marginBottom: "16px"
            }}>
                <div style={{ width: "50%" }}>
                    <SectionHeader title="User Payment Summary" sub=" user payments (grouped by user)" />
                    {tableWrap(
                        <CardContent style={{ padding: "0" }}>
                            <div className="t-scroll">
                                <Table>
                                    <TableHeader style={{ background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc" }}>
                                        <TableRow>
                                            {["User", "Total Paid", "Success", "Failed", "Pending"].map(h => (
                                                <TableHead key={h} style={{ padding: "14px 20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", opacity: 0.6 }}>{h}</TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {userSummary.length > 0 ? userSummary.map(u => (
                                            <TableRow key={u.userId} style={{ borderBottom: `1px solid ${isDark ? "#334155" : "#f1f5f9"}` }}>
                                                <TableCell style={{ padding: "14px 20px" }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                        <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#6366f120", color: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "bold" }}>{avatar(u.name)}</div>
                                                        <div>
                                                            <p style={{ fontSize: "13px", fontWeight: "700", margin: 0 }}>{u.name}</p>
                                                            <p style={{ fontSize: "10px", opacity: 0.45, margin: 0 }}>{u.email}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell style={{ padding: "14px 20px" }}>
                                                    <span style={{ fontWeight: "800", color: "#10b981", fontSize: "15px" }}>₹{fmt(u.totalPaid)}</span>
                                                </TableCell>
                                                <TableCell style={{ padding: "14px 20px" }}>
                                                    <Badge style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", border: "0", boxShadow: "none" }}>{u.successCount}</Badge>
                                                </TableCell>
                                                <TableCell style={{ padding: "14px 20px" }}>
                                                    <Badge style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "0", boxShadow: "none" }}>{u.failedCount}</Badge>
                                                </TableCell>
                                                <TableCell style={{ padding: "14px 20px" }}>
                                                    <Badge style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "0", boxShadow: "none" }}>{u.pendingCount}</Badge>
                                                </TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableRow>
                                                <TableCell colSpan={5} style={{ textAlign: "center", padding: "48px", opacity: 0.4 }}>
                                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                                                        <ShoppingCart size={32} />
                                                        <p style={{ margin: 0, fontWeight: "600" }}>No payments yet</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            {/* ✅ summaryMeta — User Summary pagination */}
                            <PaginationBar
                                meta={summaryMeta}
                                onPageChange={(p) => setSummaryPage(p)}
                                isDark={isDark}
                            />
                        </CardContent>
                    )}
                </div>

                <div style={{ width: "50%" }}>
                    <SectionHeader title="All Transactions" sub=" all transactions individually" />
                    {tableWrap(
                        <>
                            <CardHeader style={{ padding: "20px 24px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                                <p style={{ fontSize: "12px", opacity: 0.5, margin: 0 }}>
                                    {paymentMeta ? `${paymentMeta.total} total` : `${filteredPayments.length}`} transaction{filteredPayments.length !== 1 ? "s" : ""}
                                </p>
                                <div className="filter-row">
                                    {(["ALL", "SUCCESS", "FAILED", "PENDING"] as const).map(f =>
                                        filterBtn(f, txFilter === f, () => {
                                            setTxFilter(f);
                                            setPaymentPage(1); // ✅ filter change = page reset
                                        })
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent style={{ padding: "0" }}>
                                <div className="t-scroll">
                                    <Table>
                                        <TableHeader style={{ background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc" }}>
                                            <TableRow>
                                                {["User", "Amount", "Status", "Date"].map(h => (
                                                    <TableHead key={h} style={{ padding: "14px 20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", opacity: 0.6 }}>{h}</TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredPayments.length > 0 ? filteredPayments.map(p => (
                                                <TableRow key={p.id} style={{ borderBottom: `1px solid ${isDark ? "#334155" : "#f1f5f9"}` }}>
                                                    <TableCell style={{ padding: "14px 20px" }}>
                                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                            <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#3b82f620", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "bold" }}>{avatar(p.user?.name)}</div>
                                                            <div>
                                                                <p style={{ fontSize: "13px", fontWeight: "700", margin: 0 }}>{p.user?.name ?? "Unknown"}</p>
                                                                <p style={{ fontSize: "10px", opacity: 0.45, margin: 0 }}>{p.user?.email ?? p.userId}</p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell style={{ padding: "14px 20px" }}>
                                                        <span style={{ fontWeight: "800", fontSize: "14px" }}>₹{fmt(parseFloat(String(p.total_amount)))}</span>
                                                    </TableCell>
                                                    <TableCell style={{ padding: "14px 20px" }}>
                                                        <Badge style={{
                                                            border: "0", boxShadow: "none", fontSize: "10px",
                                                            background: p.status === "SUCCESS" ? "rgba(16,185,129,0.15)" : p.status === "FAILED" ? "rgba(239,68,68,0.15)" : "rgba(245,158,11,0.15)",
                                                            color: p.status === "SUCCESS" ? "#10b981" : p.status === "FAILED" ? "#ef4444" : "#f59e0b",
                                                        }}>{p.status}</Badge>
                                                    </TableCell>
                                                    <TableCell style={{ padding: "14px 20px", fontSize: "12px", opacity: 0.6, whiteSpace: "nowrap" }}>
                                                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><Clock size={12} />{fmtDate(p.created_at)}</div>
                                                    </TableCell>
                                                </TableRow>
                                            )) : (
                                                <TableRow>
                                                    <TableCell colSpan={4} style={{ textAlign: "center", padding: "48px", opacity: 0.4 }}>No transactions found</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                                {/* ✅ paymentMeta — All Transactions pagination */}
                                <PaginationBar
                                    meta={paymentMeta}
                                    onPageChange={(p) => setPaymentPage(p)}
                                    isDark={isDark}
                                />
                            </CardContent>
                        </>
                    )}
                </div>                {/* ── 3. All Transactions ── */}

            </div>
        </div>
    );
};

export default AdminDashboard;