"use client";

import { CheckCircle, Printer, BookOpen } from "lucide-react";
import InvoiceTemplate from "../GlobalModal/PrintableInvoice";
import { useMemo, useRef, useState } from "react";
import { useReactToPrint } from 'react-to-print';
import { useGetInvoiceData } from "@/hooks/Payment.mutate";

interface SuccessStateProps {
    navigate: (path: { to: string }) => void;
    isDark: boolean;
    c: any;
    orderId: any;
}

const SuccessState: React.FC<SuccessStateProps> = ({
    navigate, isDark, c, orderId
}) => {
    const [orderData, setInvoiceData] = useState<any>(null);
    const { mutateAsync: fetchInvoice, isPending } = useGetInvoiceData();
    const accent = isDark ? c.primary.dark : c.primary.light;
    const invoiceRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: invoiceRef,
        documentTitle: `Invoice-${orderId}`,
        pageStyle: `
      @page { size: A4; margin: 20mm; }
      body { background: #fff !important; }
    `,
    });


    const handlePrintClick = async () => {
        try {
            // Har baar fresh data fetch karo
            const res = await fetchInvoice(String(orderId));
            if (res?.data) {
                setInvoiceData(res.data);
                // Re-render ke baad print
                setTimeout(() => handlePrint(), 300);
            }
        } catch (err) {
            console.error("Invoice fetch error:", err);
            alert("Invoice load nahi hua. Please try again.");
        }
    };

   

    return (
        <>
            <div style={{
                position: "absolute",
                left: "-9999px",
                top: 0,
                width: "720px",
                pointerEvents: "none",
            }}>
                <InvoiceTemplate ref={invoiceRef} data={orderData} />
            </div>

            <div style={styles.wrapper}>
                {/* Glow ring */}
                <div style={{ ...styles.glowRing, borderColor: accent }}>
                    <CheckCircle size={42} color={accent} strokeWidth={2.5} />
                </div>

                <h2 style={styles.title(isDark)}>Order Confirmed!</h2>
                <p style={styles.subtitle}>
                    Your enrollment is complete. Get ready to start your learning journey!
                </p>

                {/* Order ID pill */}
                <div style={styles.pill(isDark)}>
                    Order ID: <strong>#{orderData?.orderId ?? "—"}</strong>
                </div>

                <div style={styles.btnRow}>
                    <button
                        onClick={() => navigate({ to: "/mycourses" })}
                        style={styles.btnPrimary(accent)}
                    >
                        <BookOpen size={18} /> Go to my learning
                    </button>

                    <button
                        onClick={handlePrintClick}
                        style={styles.btnOutline(accent, isDark)}
                    >
                        <Printer size={18} /> Print bill
                    </button>
                </div>
            </div>
        </>
    );
};

const styles = {
    wrapper: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        padding: "3rem 1.5rem",
        textAlign: "center" as const,
        animation: "fadeUp 0.5s ease-out both",
    },
    glowRing: {
        width: 88,
        height: 88,
        borderRadius: "50%",
        border: "2px solid",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.5rem",
        animation: "pop 0.6s cubic-bezier(0.34,1.56,0.64,1) both",
    },
    title: (isDark: boolean) => ({
        fontFamily: "'Syne', sans-serif",
        fontSize: "2.2rem",
        fontWeight: "800",
        color: isDark ? "#fff" : "#111",
        margin: "0 0 0.5rem",
    }),
    subtitle: {
        fontSize: 15,
        color: "#888",
        maxWidth: 340,
        lineHeight: 1.6,
        margin: "0 0 1.5rem",
    },
    pill: (isDark: boolean) => ({
        background: isDark ? "rgba(255,255,255,0.07)" : "#f5f5f3",
        border: "0.5px solid rgba(0,0,0,0.1)",
        borderRadius: 100,
        padding: "6px 16px",
        fontSize: 13,
        color: isDark ? "#ccc" : "#555",
        marginBottom: "2rem",
    }),
    btnRow: {
        display: "flex",
        gap: 12,
        flexWrap: "wrap" as const,
        justifyContent: "center",
    },
    btnPrimary: (accent: string) => ({
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: accent,
        color: "#fff",
        border: "none",
        borderRadius: 14,
        padding: "14px 28px",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
    }),
    btnOutline: (accent: string, isDark: boolean) => ({
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: "transparent",
        color: isDark ? "#fff" : "#111",
        border: `1.5px solid ${accent}`,
        borderRadius: 14,
        padding: "14px 28px",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
    }),
};

export default SuccessState;