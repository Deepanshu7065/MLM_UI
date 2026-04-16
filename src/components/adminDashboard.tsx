"use client";

import {
    useGetAllCommissions,
    useGetAllOrders,
    useGetAllUsers,
    useGetAllWallets,
} from "@/hooks/earning.mutate";
import { useTheme } from "@/theme/ThemeProvider";
import {
    Users,
    ShoppingCart,
    TrendingUp,
    Wallet,
    BadgeIndianRupee,
    ArrowDownRight,
    Clock,
    Shield,
    Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo, useState } from "react";

interface WalletEntry {
    id: number;
    userId: string;
    balance: string;
    user?: { name: string; email: string; userId: string; phone: string };
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
    recipient?: { name: string; email: string; userId: string };
    buyer?: { name: string; email: string; userId: string };
}

interface CommissionData {
    summary: {
        totalCommissionPaid: number;
        totalRevenue: number;
        adminProfit: number;
    };
    commissions: Commission[];
}

const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(n);

const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });


function StatCard({ title, value, icon: Icon, accent, sub, isRupee, isDark }: any) {
    return (
        <Card
            style={{
                position: "relative",
                overflow: "hidden",
                border: "0",
                borderRadius: "16px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                background: isDark
                    ? "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)"
                    : "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "-24px",
                    right: "-24px",
                    width: "96px",
                    height: "96px",
                    borderRadius: "50%",
                    opacity: 0.1,
                    background: accent,
                }}
            />
            <CardHeader style={{ padding: "20px 20px 8px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ padding: "10px", borderRadius: "12px", background: `${accent}20`, color: accent }}>
                        <Icon size={20} strokeWidth={2.5} />
                    </div>
                    {sub && (
                        <Badge
                            style={{
                                fontSize: "10px",
                                fontWeight: "700",
                                background: `${accent}15`,
                                color: accent,
                                border: `1px solid ${accent}30`,
                                borderRadius: "12px",
                                boxShadow: "none",
                            }}
                        >
                            {sub}
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent style={{ padding: "0 20px 20px 20px" }}>
                <p style={{ fontSize: "11px", opacity: 0.6, marginBottom: "4px", fontWeight: "600", textTransform: "uppercase" }}>
                    {title}
                </p>
                <p style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: "900", color: accent, margin: 0 }}>
                    {isRupee ? `₹${fmt(value)}` : value.toLocaleString("en-IN")}
                </p>
            </CardContent>
        </Card>
    );
}

const AdminDashboard = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const { data: walletsData, isLoading: walletsLoading } = useGetAllWallets();
    const { data: commData, isLoading: commLoading } = useGetAllCommissions();
    const { data: usersData, isLoading: usersLoading } = useGetAllUsers();
    const { data: ordersData, isLoading: ordersLoading } = useGetAllOrders();

    const [commFilter, setCommFilter] = useState<"all" | "level1" | "level2">("all");

    const wallets: WalletEntry[] = walletsData?.wallets ?? [];
    const commissionData = commData as CommissionData | undefined;
    const summary = commissionData?.summary;
    const commissions: Commission[] = useMemo(() => {
        const list = commissionData?.commissions ?? [];
        return commFilter === "all" ? list : list.filter((c) => c.level === (commFilter === "level1" ? 1 : 2));
    }, [commissionData, commFilter]);

    const totalUsers = usersData?.users?.length ?? usersData?.length ?? 0;
    const totalOrders = ordersData?.orders?.length ?? ordersData?.length ?? 0;

    const isLoading = walletsLoading || commLoading || usersLoading || ordersLoading;

    const statCards = [
        { title: "Total Revenue", value: summary?.totalRevenue ?? 0, icon: BadgeIndianRupee, accent: "#f59e0b", sub: "All Time", isRupee: true },
        { title: "Admin Profit", value: summary?.adminProfit ?? 0, icon: Shield, accent: "#10b981", sub: "Net Profit", isRupee: true },
        { title: "Total Paid", value: summary?.totalCommissionPaid ?? 0, icon: TrendingUp, accent: "#8b5cf6", sub: "Commissions", isRupee: true },
        { title: "Total Users", value: totalUsers, icon: Users, accent: "#3b82f6", sub: "Registered", isRupee: false },
        { title: "Total Orders", value: totalOrders, icon: ShoppingCart, accent: "#f43f5e", sub: "Placed", isRupee: false },
        { title: "Active Wallets", value: wallets.length, icon: Wallet, accent: "#06b6d4", sub: "With Balance", isRupee: false },
    ];

    return (
        <div style={{
            minHeight: "100vh",
            width: "100%",
            maxWidth: "100vw",
            overflowX: "hidden",
            padding: "clamp(1rem, 5vw, 2rem)",
            color: isDark ? "#f8fafc" : "#0f172a",
            backgroundColor: isDark ? "#020617" : "#f1f5f9"
        }}>
            <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; gap: 16px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 32px; }
        .charts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr)); gap: 24px; margin-bottom: 32px; }
        .table-container { border: 0; border-radius: 16px; overflow: hidden; width: 100%; max-width: 100%; background: ${isDark ? "#1e293b" : "#fff"}; }
        .table-scroll-wrapper { overflow-x: auto; width: 100%; max-width: 100%; -webkit-overflow-scrolling: touch; }
        .filter-buttons { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }
        
        @media (max-width: 740px) {
          .admin-header { flex-direction: row; align-items: flex-start; }
          .stats-grid { 
                        display: flex; 
                        overflow-x: auto; 
                        padding-bottom: 12px; /* Scrollbar space */
                        gap: 12px;
                        scroll-snap-type: x mandatory;
                        -webkit-overflow-scrolling: touch;
                    }
                    
                    .stats-grid > div {
                        min-width: 300px;
                        flex-shrink: 0;
                        scroll-snap-align: start;
                        flex-grow: 1;
                    }

                    .stats-grid::-webkit-scrollbar {
                        height: 1px;
                    }
                    .stats-grid::-webkit-scrollbar-thumb {
                        background: ${isDark ? "#334155" : "#cbd5e1"};
                        border-radius: 10px;
                    }
          .live-badge { align-self: flex-start; }
          .charts-grid { grid-template-columns: 1fr; }
          .table-container { border-radius: 12px; width: 100%; max-width: 100%; }
        }
      `}</style>

            {/* Header */}
            <div className="admin-header">
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <Shield size={16} color="#10b981" />
                        <span style={{ fontSize: "10px", fontWeight: "700", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>Admin Panel</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(24px, 5vw, 32px)", fontWeight: "900", margin: 0, letterSpacing: "-0.03em" }}>Financial Overview</h1>
                </div>
                <div className="live-badge" style={{
                    display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "12px",
                    fontSize: "14px", fontWeight: "600", color: "#10b981",
                    background: isDark ? "rgba(16,185,129,0.1)" : "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.25)"
                }}>
                    <Activity size={14} className="animate-pulse" /> Live Data
                </div>
            </div>

            {/* Stat Cards Grid */}

            <div className="stats-grid">
                {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} style={{ height: "140px", borderRadius: "16px" }} />)
                    : statCards.map((c) => <StatCard key={c.title} {...c} isDark={isDark} />)}
            </div>



            <div className="charts-grid">
                <Card style={{ border: "0", borderRadius: "16px", background: isDark ? "#1e293b" : "#fff", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
                    <CardHeader><CardTitle style={{ fontSize: "16px", fontWeight: "800" }}>Revenue Split</CardTitle></CardHeader>
                    <CardContent>
                        {summary && (
                            <>
                                <div style={{ display: "flex", height: "12px", borderRadius: "6px", overflow: "hidden", marginBottom: "20px", background: isDark ? "#334155" : "#f1f5f9" }}>
                                    <div style={{ width: `${(summary.adminProfit / summary.totalRevenue) * 100}%`, background: "#10b981" }} />
                                    <div style={{ width: `${(summary.totalCommissionPaid / summary.totalRevenue) * 100}%`, background: "#8b5cf6" }} />
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                    <div style={{ padding: "12px", borderRadius: "12px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.15)" }}>
                                        <p style={{ fontSize: "11px", color: "#10b981", fontWeight: "700", margin: 0 }}>Admin Profit</p>
                                        <p style={{ fontSize: "clamp(16px, 3vw, 20px)", fontWeight: "900", margin: "4px 0" }}>₹{fmt(summary.adminProfit)}</p>
                                    </div>
                                    <div style={{ padding: "12px", borderRadius: "12px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.15)" }}>
                                        <p style={{ fontSize: "11px", color: "#8b5cf6", fontWeight: "700", margin: 0 }}>Commission Paid</p>
                                        <p style={{ fontSize: "clamp(16px, 3vw, 20px)", fontWeight: "900", margin: "4px 0" }}>₹{fmt(summary.totalCommissionPaid)}</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card style={{ border: "0", borderRadius: "16px", background: isDark ? "#1e293b" : "#fff", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
                    <CardHeader><CardTitle style={{ fontSize: "16px", fontWeight: "800" }}>Top Wallet Balances</CardTitle></CardHeader>
                    <CardContent>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            {wallets.slice(0, 4).map((w, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: isDark ? "#334155" : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" }}>{i + 1}</div>
                                        <div>
                                            <p style={{ fontSize: "13px", fontWeight: "700", margin: 0 }}>{w.user?.name ?? "User"}</p>
                                            <p style={{ fontSize: "10px", opacity: 0.5, margin: 0 }}>ID: {w.userId.slice(0, 8)}...</p>
                                        </div>
                                    </div>
                                    <p style={{ fontWeight: "800", color: "#f59e0b", fontSize: "14px" }}>₹{fmt(parseFloat(w.balance))}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Commission Table Section */}
            <Card className="table-container">
                <CardHeader style={{ padding: "24px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                    <CardTitle style={{ fontSize: "16px", fontWeight: "800" }}>All Commissions</CardTitle>
                    <div className="filter-buttons">
                        {["all", "level1", "level2"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setCommFilter(f as any)}
                                style={{
                                    padding: "6px 16px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", cursor: "pointer", border: "0",
                                    background: commFilter === f ? "#3b82f6" : (isDark ? "#334155" : "#f1f5f9"),
                                    color: commFilter === f ? "#fff" : (isDark ? "#94a3b8" : "#64748b"),
                                    transition: "all 0.2s ease"
                                }}
                            >
                                {f.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </CardHeader>
                <CardContent style={{ padding: "0" }}>
                    <div className="table-scroll-wrapper">
                        <Table>
                            <TableHeader style={{ background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc" }}>
                                <TableRow style={{ border: "0" }}>
                                    <TableHead style={{ minWidth: "200px", padding: "16px 24px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", opacity: 0.6 }}>Recipient</TableHead>
                                    <TableHead style={{ padding: "16px 24px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", opacity: 0.6 }}>Level</TableHead>
                                    <TableHead style={{ padding: "16px 24px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", opacity: 0.6 }}>Commission</TableHead>
                                    <TableHead style={{ padding: "16px 24px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", opacity: 0.6 }}>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {commissions.length > 0 ? (
                                    commissions.map((c) => (
                                        <TableRow key={c.id} style={{ borderBottom: `1px solid ${isDark ? "#334155" : "#f1f5f9"}` }}>
                                            <TableCell style={{ padding: "16px 24px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <div style={{ width: "36px", height: "36px", flexShrink: 0, borderRadius: "50%", background: "#3b82f620", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" }}>
                                                        {c.recipient?.name?.slice(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p style={{ fontSize: "13px", fontWeight: "700", margin: 0 }}>{c.recipient?.name}</p>
                                                        <p style={{ fontSize: "10px", opacity: 0.5, margin: 0 }}>{c.userId.slice(0, 12)}...</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell style={{ padding: "16px 24px" }}>
                                                <Badge style={{ fontSize: "10px", borderRadius: "8px", background: c.level === 1 ? "rgba(16,185,129,0.15)" : "rgba(139,92,246,0.15)", color: c.level === 1 ? "#10b981" : "#8b5cf6", border: "0", boxShadow: "none" }}>
                                                    LEVEL {c.level}
                                                </Badge>
                                            </TableCell>
                                            <TableCell style={{ padding: "16px 24px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#10b981", fontWeight: "800", fontSize: "14px" }}>
                                                    <ArrowDownRight size={14} /> ₹{fmt(parseFloat(c.amount))}
                                                </div>
                                            </TableCell>
                                            <TableCell style={{ padding: "16px 24px", fontSize: "12px", opacity: 0.6, whiteSpace: "nowrap" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                                    <Clock size={12} /> {fmtDate(c.created_at)}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} style={{ textAlign: "center", padding: "40px", opacity: 0.5 }}>No data found</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminDashboard;