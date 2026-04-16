import { useGetAllPayment } from '@/hooks/Payment.mutate'
import { themeColors } from '@/theme/themeConfig';
import { useTheme } from '@/theme/ThemeProvider';
import { CreditCard, Edit, Loader2 } from 'lucide-react';
import { PaymentUIStore } from './payemntStore';
import { UpdatePayment } from './updatePayment';


const AllPayments = () => {
    const { data, isLoading } = useGetAllPayment();


    const { theme } = useTheme();
    const isDark = theme === "dark";
    const c = themeColors;

    // 🔥 Sorting Logic: Latest date upar rahegi
    const sortedPayments = data?.payment ? [...data.payment].sort((a: any, b: any) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }) : [];

    if (isLoading) {
        return (
            <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: isDark ? c.background.dark : c.background.light }}>
                <Loader2 size={40} className="animate-spin" />
            </div>
        );
    }

    if (sortedPayments.length === 0) {
        return (
            <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: isDark ? c.background.dark : c.background.light, color: isDark ? "#fff" : "#000" }}>
                <h2>No Payment Found</h2>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100%", padding: "4rem 2rem", backgroundColor: isDark ? c.background.dark : c.background.light }}>
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                <header style={{ marginBottom: "1rem" }}>
                    <h1 style={{ fontSize: "2rem", fontWeight: "900", letterSpacing: "2px", color: isDark ? "#fff" : "#000", margin: 0 }}>
                        PAYMENT DETAILS
                    </h1>
                    <p style={{ color: isDark ? c.textSecondary.dark : c.textSecondary.light, marginTop: "0.5rem" }}>
                        Showing latest transactions first
                    </p>
                </header>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {/* 🔥 Ab sortedPayments par map chalaiye */}
                    {sortedPayments.map((p) => (
                        <div key={p.id} style={{
                            backgroundColor: isDark ? c.card.dark : c.card.light,
                            borderRadius: "2rem",
                            padding: "2.5rem",
                            border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
                            boxShadow: isDark ? "none" : "0 20px 40px rgba(0,0,0,0.05)"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
                                    <CreditCard size={40} style={{ marginRight: "1rem", color: isDark ? c.primary.dark : c.primary.light }} />
                                    <div>
                                        <h2 style={{ margin: 0, color: isDark ? "#fff" : "#000" }}>₹{p.total_amount}</h2>
                                        <span style={{
                                            color: p.status === "SUCCESS" ? "#22c55e" : p.status === "FAILED" ? "#ef4444" : "#f59e0b",
                                            fontWeight: "bold"
                                        }}>
                                            {p.status}
                                        </span>
                                    </div>
                                </div>

                                <Edit onClick={() => PaymentUIStore.openViewModal.open(p.id, p)} size={17} style={{ cursor: "pointer", color: isDark ? c.primary.dark : c.primary.light }} />

                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", fontSize: "0.95rem" }}>
                                <Detail label="Name" value={p.name} isDark={isDark} />
                                <Detail label="Email" value={p.email} isDark={isDark} />
                                <Detail label="Phone" value={p.phone} isDark={isDark} />
                                <Detail label="Payment ID" value={p.payment_id} isDark={isDark} />
                                <Detail label="Order ID" value={p.order_id || "Not Generated"} isDark={isDark} />
                                <Detail label="Date" value={new Date(p.created_at).toLocaleString()} isDark={isDark} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <UpdatePayment />
        </div>
    );
};

const Detail = ({ label, value, isDark }: any) => (
    <div>
        <p style={{
            margin: 0,
            fontSize: "0.8rem",
            color: isDark ? "#9ca3af" : "#6b7280"
        }}>
            {label}
        </p>
        <p style={{
            margin: "4px 0 0 0",
            fontWeight: "700",
            color: isDark ? "#fff" : "#000"
        }}>
            {value}
        </p>
    </div>
);

export default AllPayments