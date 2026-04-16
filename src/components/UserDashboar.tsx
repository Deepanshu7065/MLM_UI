"use client"

import { useGetWallet } from "@/hooks/earning.mutate";
import { useTheme } from "@/theme/ThemeProvider";
import {
  Wallet,
  Users,
  TrendingUp,
  BadgeIndianRupee,
  Sparkles,
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

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

// const fmtDate = (d: string) =>
//   new Date(d).toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

function StatCard({ title, value, icon: Icon, accent, sub, isDark }: any) {
  return (
    <Card
      style={{
        position: "relative",
        overflow: "hidden",
        border: "0",
        borderRadius: "16px",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        background: isDark
          ? "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)"
          : "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      <div style={{ position: "absolute", top: "-24px", right: "-24px", width: "96px", height: "96px", borderRadius: "50%", opacity: 0.1, background: accent }} />
      <CardHeader style={{ padding: "20px 16px 12px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ padding: "8px", borderRadius: "10px", background: `${accent}20`, color: accent }}>
            <Icon size={20} strokeWidth={2.5} />
          </div>
          <Badge style={{ fontSize: "9px", padding: "1px 8px", borderRadius: "20px", fontWeight: "700", background: `${accent}15`, color: accent, border: `1px solid ${accent}30`, boxShadow: "none" }}>
            {sub}
          </Badge>
        </div>
      </CardHeader>
      <CardContent style={{ padding: "0 16px 20px 16px" }}>
        <p style={{ fontSize: "10px", opacity: 0.6, marginBottom: "4px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</p>
        <p style={{ fontSize: "clamp(24px, 5vw, 28px)", fontWeight: "900", color: accent, margin: 0, letterSpacing: "-0.03em" }}>₹{fmt(value)}</p>
      </CardContent>
    </Card>
  );
}

export const UserDashboard = () => {
  const { data, isLoading } = useGetWallet();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const stats = (data as any)?.wallet;
  const transactions = (data as any)?.transactions ?? [];

  const cards = [
    { title: "Wallet Balance", value: stats?.balance ?? 0, icon: Wallet, accent: "#f59e0b", sub: "Available" },
    { title: "Total Earned", value: stats?.totalEarned ?? 0, icon: BadgeIndianRupee, accent: "#10b981", sub: "All Time" },
    { title: "Direct Income", value: stats?.level1Earnings ?? 0, icon: Users, accent: "#3b82f6", sub: "L1 · 30%" },
    { title: "Indirect Income", value: stats?.level2Earnings ?? 0, icon: TrendingUp, accent: "#8b5cf6", sub: "L2 · 20%" },
  ];

  return (
    <div style={{
      minHeight: "100%",
      padding: "clamp(16px, 4vw, 32px)", // Responsive padding
      color: isDark ? "#f8fafc" : "#0f172a",
      fontFamily: "Inter, sans-serif",
    }}>

      <style>{`
        .dashboard-header {
          display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;
        }
        .stats-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 32px;
        }
        .balance-chip {
          display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 12px;
          font-size: 14px; font-weight: 700; color: #f59e0b; background: ${isDark ? "rgba(245,158,11,0.1)" : "rgba(245,158,11,0.08)"};
          border: 1px solid rgba(245,158,11,0.25);
        }
        .tx-table-container { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 0 -10px; padding: 0 10px; }
        
        @media (max-width: 640px) {
          .dashboard-header { flex-direction: column; align-items: flex-start; gap: 16px; }
          .balance-chip { width: 100%; justify-content: center; }
          .stats-grid { grid-template-columns: 1fr; }
          .tx-card-header { padding: 20px 16px !important; }
          .table-cell-hide { display: none; }
        }
      `}</style>

      {/* --- Header --- */}
      <div className="dashboard-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <Sparkles size={16} color="#fbbf24" />
            <span style={{ fontSize: "10px", fontWeight: "700", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.15em" }}>Overview</span>
          </div>
          <h1 style={{ fontSize: "clamp(24px, 6vw, 32px)", fontWeight: "900", margin: 0, letterSpacing: "-0.04em" }}>My Dashboard</h1>
        </div>
        <div className="balance-chip">
          <Wallet size={16} /> ₹{fmt(stats?.balance ?? 0)}
        </div>
      </div>

      {/* --- Stats Grid --- */}
      <div className="stats-grid">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} style={{ height: "140px", borderRadius: "16px", background: isDark ? "#1e293b" : "#f1f5f9" }} />
          ))
          : cards.map((c) => <StatCard key={c.title} {...c} isDark={isDark} />)}
      </div>

      {/* --- Transactions --- */}
      <Card style={{ border: "0", borderRadius: "20px", background: isDark ? "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)" : "#ffffff", boxShadow: "0 15px 35px -10px rgba(0, 0, 0, 0.1)" }}>
        <CardHeader className="tx-card-header" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <CardTitle style={{ fontSize: "16px", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px", color: isDark ? "#fff" : "#000" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)" }} />
              History
            </CardTitle>
            <Badge variant="outline" style={{ fontSize: "10px", opacity: 0.6 }}>{transactions.length} Total</Badge>
          </div>
        </CardHeader>

        <CardContent style={{ padding: "0 12px 12px 12px" }}>
          <div className="tx-table-container">
            <Table>
              <TableHeader>
                <TableRow style={{ border: "0" }}>
                  <TableHead style={{ padding: "12px", fontSize: "10px", fontWeight: "800" }}>Buyer</TableHead>
                  <TableHead className="table-cell-hide" style={{ padding: "12px", fontSize: "10px", fontWeight: "800" }}>Level</TableHead>
                  <TableHead style={{ padding: "12px", fontSize: "10px", fontWeight: "800" }}>Income</TableHead>
                  <TableHead style={{ padding: "12px", fontSize: "10px", fontWeight: "800" }}>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx: any) => {
                  const isL1 = tx.level === 1;
                  const color = isL1 ? "#10b981" : "#3b82f6";
                  return (
                    <TableRow key={tx.id} style={{ border: "0" }}>
                      <TableCell style={{ padding: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "800", background: `${color}15`, color: color }}>
                            {tx.buyer?.name?.slice(0, 2) ?? "??"}
                          </div>
                          <div>
                            <p style={{ fontSize: "13px", fontWeight: "700", margin: 0, color: isDark ? "#fff" : "#1e293b", whiteSpace: "nowrap" }}>{tx.buyer?.name?.split(' ')[0]}</p>
                            <p className="table-cell-hide" style={{ fontSize: "10px", opacity: 0.5 }}>L{tx.level}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="table-cell-hide">
                        <Badge style={{ fontSize: "9px", background: `${color}10`, color: color, border: `1px solid ${color}20` }}>L{tx.level}</Badge>
                      </TableCell>
                      <TableCell style={{ padding: "12px" }}>
                        <div style={{ color: "#10b981", fontWeight: "800", fontSize: "14px", whiteSpace: "nowrap" }}>+₹{fmt(parseFloat(tx.amount))}</div>
                      </TableCell>
                      <TableCell style={{ padding: "12px", fontSize: "11px", opacity: 0.6, whiteSpace: "nowrap" }}>
                        {new Date(tx.created_at).toLocaleDateString("en-IN", { day: '2-digit', month: 'short' })}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};