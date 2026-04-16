import { useGetPayment } from "@/hooks/Payment.mutate";
import { useTheme } from "@/theme/ThemeProvider";
import { themeColors } from "@/theme/themeConfig";
import {
    Loader2,
    CheckCircle2,
    Clock,
    // AlertCircle,
    CreditCard,
    User,
    Hash,
    Calendar,
    Layers,
} from "lucide-react";
import { useMemo } from "react";

const CheckOrder = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const c = themeColors;

    const { data, isLoading } = useGetPayment();

    // --- Optimization: Memoized & Sorted Successful Payments ---
    const successfulPayments = useMemo(() => {
        if (!data?.payment) return [];
        return [...data.payment]
            .filter((item: any) => item.status === "SUCCESS")
            .sort(
                (a: any, b: any) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
    }, [data]);

    if (isLoading) {
        return (
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: isDark ? c.background.dark : c.background.light,
                }}
            >
                <Loader2
                    size={40}
                    className="animate-spin"
                    color={isDark ? c.primary.dark : c.primary.light}
                />
                <p
                    style={{
                        marginTop: "1rem",
                        opacity: 0.6,
                        fontWeight: "600",
                        color: isDark ? "#fff" : "#000",
                    }}
                >
                    Loading Ledger...
                </p>
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100%",
                padding: "3rem 1.5rem",
                backgroundColor: isDark ? c.background.dark : c.background.light,
                color: isDark ? "#fff" : "#000",
            }}
        >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                {/* --- Header --- */}
                <header
                    style={{
                        marginBottom: "3rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                >
                    <div>
                        <h1
                            style={{
                                fontSize: "2.2rem",
                                fontWeight: "800",
                                letterSpacing: "-0.5px",
                                marginBottom: "0.5rem",
                            }}
                        >
                            Finance{" "}
                            <span color={isDark ? c.primary.dark : c.primary.light}>
                                Ledger
                            </span>
                        </h1>
                        <p style={{ opacity: 0.6, fontSize: "1rem" }}>
                            Detailed history of your course transactions
                        </p>
                    </div>
                    <div
                        style={{
                            backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                            padding: "0.6rem 1.2rem",
                            borderRadius: "0.75rem",
                            border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
                        }}
                    >
                        <span style={{ fontSize: "0.75rem", fontWeight: "700", opacity: 0.6 }}>
                            SUCCESSFUL:{" "}
                        </span>
                        <span
                            style={{
                                fontWeight: "800",
                                color: isDark ? c.primary.dark : c.primary.light,
                            }}
                        >
                            {successfulPayments.length}
                        </span>
                    </div>
                </header>

                {/* --- Payments List --- */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {successfulPayments.map((payment: any) => (
                        <PaymentCard
                            key={payment.id}
                            payment={payment}
                            isDark={isDark}
                            c={c}
                        />
                    ))}
                </div>

                {/* --- Empty State --- */}
                {successfulPayments.length === 0 && (
                    <div style={{ textAlign: "center", padding: "6rem 0", opacity: 0.4 }}>
                        <Layers size={50} strokeWidth={1.5} style={{ marginBottom: "1rem" }} />
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                            No transaction history found
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
};

const PaymentCard = ({ payment, isDark, c }: any) => {
    const statusConfig = {
        color: "#10b981",
        bg: "rgba(16, 185, 129, 0.1)",
        icon: <CheckCircle2 size={14} />,
    };

    return (
        <div
            style={{
                backgroundColor: isDark ? c.card.dark : c.card.light,
                borderRadius: "1.25rem",
                padding: "1.5rem",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"}`,
                boxShadow: isDark
                    ? "0 10px 30px rgba(0,0,0,0.2)"
                    : "0 4px 12px rgba(0,0,0,0.03)",
                position: "relative",
            }}
        >
            {/* Transaction Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                }}
            >
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <div
                        style={{
                            padding: "0.75rem",
                            borderRadius: "0.75rem",
                            backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                            color: isDark ? c.primary.dark : c.primary.light,
                        }}
                    >
                        <CreditCard size={22} />
                    </div>
                    <div>
                        <p style={{ fontSize: "0.65rem", fontWeight: "800", opacity: 0.5 }}>
                            TXN ID
                        </p>
                        <p
                            style={{
                                fontWeight: "700",
                                fontFamily: "monospace",
                                fontSize: "0.95rem",
                            }}
                        >
                            {payment.payment_id}
                        </p>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "5px 12px",
                        borderRadius: "2rem",
                        backgroundColor: statusConfig.bg,
                        color: statusConfig.color,
                        fontSize: "0.7rem",
                        fontWeight: "800",
                    }}
                >
                    {statusConfig.icon} {payment.status}
                </div>
            </div>

            {/* Main Info Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "1.5rem",
                    marginBottom: "1.5rem",
                }}
            >
                <div>
                    <p style={{ fontSize: "0.7rem", fontWeight: "800", opacity: 0.5 }}>
                        AMOUNT
                    </p>
                    <p style={{ fontSize: "1.8rem", fontWeight: "900" }}>
                        ₹{payment.total_amount.toLocaleString()}
                    </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <InfoRow
                        icon={<User size={14} />}
                        label="User"
                        value={payment.name}
                        isDark={isDark}
                    />
                    <InfoRow
                        icon={<Hash size={14} />}
                        label="UID"
                        value={payment.userId}
                        isDark={isDark}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <InfoRow
                        icon={<Calendar size={14} />}
                        label="Date"
                        value={new Date(payment.created_at).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                        isDark={isDark}
                    />
                    <InfoRow
                        icon={<Clock size={14} />}
                        label="Time"
                        value={new Date(payment.created_at).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                        isDark={isDark}
                    />
                </div>
            </div>

            {/* Footer Details */}
            <div
                style={{
                    paddingTop: "1.2rem",
                    borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: "700", opacity: 0.5 }}>
                        COURSES:
                    </span>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                        {payment.courseIds?.map((id: number) => (
                            <span
                                key={id}
                                style={{
                                    padding: "2px 8px",
                                    backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "#f1f5f9",
                                    borderRadius: "4px",
                                    fontSize: "0.65rem",
                                    fontWeight: "800",
                                }}
                            >
                                #{id}
                            </span>
                        ))}
                    </div>
                </div>
                <div style={{ fontSize: "0.7rem", fontWeight: "600", opacity: 0.6 }}>
                    Method:{" "}
                    <span style={{ color: isDark ? "#fff" : "#000", fontWeight: "800" }}>
                        {payment.payment_method?.toUpperCase()}
                    </span>
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ icon, label, value, isDark }: any) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ opacity: 0.4 }}>{icon}</span>
        <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>{label}:</span>
        <span
            style={{
                fontSize: "0.75rem",
                fontWeight: "700",
                color: isDark ? "#fff" : "#333",
            }}
        >
            {value}
        </span>
    </div>
);

export default CheckOrder;