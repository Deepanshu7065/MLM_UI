"use client";

import React from "react";
import { Lock, Receipt } from "lucide-react";

interface OrderSummaryProps {
    cart: any[];
    subtotal: number;       // ← rename
    gstAmount: number;      // ← naya
    totalAmount: number;    // ← GST ke saath
    isDark: boolean;
    c: any;
    isIgst?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
    cart,
    subtotal,
    gstAmount,
    totalAmount,
    isDark,
    c,
    isIgst = false,
}) => {
    const primaryColor = isDark ? c.primary.dark : c.primary.light;
    const cgstAmount = Math.floor(gstAmount / 2);
    const sgstAmount = gstAmount - cgstAmount;

    const sidebarStyle: React.CSSProperties = {
        flex: "0.8",
        backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
        padding: "3.5rem",
        borderLeft: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"}`,
        minWidth: "320px",
    };

    const rowStyle: React.CSSProperties = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.875rem",
        padding: "0.6rem 0",
    };

    return (
        <aside style={sidebarStyle}>
            <h3 style={{
                fontSize: "0.75rem", fontWeight: "900",
                letterSpacing: "2px", color: "#64748b",
                marginBottom: "2rem", textTransform: "uppercase",
            }}>
                Your Order
            </h3>

            {/* Cart Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                {cart.length > 0 ? cart.map((item: any) => (
                    <div key={item.id}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                <img
                                    src={item.course.image}
                                    alt={item.course.course_name}
                                    style={{
                                        width: "50px", height: "35px",
                                        borderRadius: "0.5rem", objectFit: "cover",
                                        backgroundColor: isDark ? "#1e293b" : "#e2e8f0",
                                    }}
                                />
                                <p style={{
                                    fontSize: "0.85rem", fontWeight: "700",
                                    color: isDark ? "#cbd5e1" : "#1e293b",
                                    maxWidth: "150px", whiteSpace: "nowrap",
                                    overflow: "hidden", textOverflow: "ellipsis",
                                    margin: 0,
                                }}>
                                    {item.course.course_name}
                                </p>
                            </div>
                            <span style={{ fontSize: "0.85rem", fontWeight: "800", color: isDark ? "#fff" : "#000" }}>
                                ₹{Number(item.course.price).toLocaleString('en-IN')}
                            </span>
                        </div>
                        <div style={{ display: "flex", marginTop: "0.5rem", gap: "1rem", alignItems: "center" }}>
                            <p style={{
                                fontSize: "0.85rem", fontWeight: "700",
                                color: isDark ? "#cbd5e1" : "#1e293b",
                                maxWidth: "150px", whiteSpace: "nowrap",
                                overflow: "hidden", textOverflow: "ellipsis",
                                margin: 0,
                            }}>
                                SAC Code
                            </p>
                            <span style={{ fontSize: "0.85rem", fontWeight: "800", color: isDark ? "#fff" : "#000" }}>
                                {item?.course?.category_id || "—"}
                            </span>
                        </div>
                    </div>
                )) : (
                    <p style={{ fontSize: "0.85rem", color: "#64748b" }}>Your cart is empty.</p>
                )}
            </div>

            {/* Pricing Breakdown */}
            <div style={{
                borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                paddingTop: "1.25rem",
            }}>
                {/* Subtotal */}
                <div style={{ ...rowStyle, color: isDark ? "#94a3b8" : "#64748b" }}>
                    <span>Subtotal (Excl. GST)</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {/* GST Header Row */}
                <div style={{
                    ...rowStyle,
                    color: isDark ? "#94a3b8" : "#64748b",
                    paddingBottom: "0.25rem",
                }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Receipt size={13} />
                        GST (18%)
                    </span>
                    <span>+ ₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>

                {/* GST Breakdown (CGST + SGST or IGST) in small text */}
                <div style={{
                    paddingLeft: "1.25rem",
                    paddingBottom: "0.75rem",
                    borderBottom: `1px dashed ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                }}>
                    {isIgst ? (
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "0.75rem",
                            color: isDark ? "#64748b" : "#94a3b8",
                        }}>
                            <span>• IGST (18%)</span>
                            <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                        </div>
                    ) : (
                        <>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "0.75rem",
                                color: isDark ? "#64748b" : "#94a3b8",
                            }}>
                                <span>• CGST (9%)</span>
                                <span>₹{cgstAmount.toLocaleString('en-IN')}</span>
                            </div>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "0.75rem",
                                color: isDark ? "#64748b" : "#94a3b8",
                            }}>
                                <span>• SGST (9%)</span>
                                <span>₹{sgstAmount.toLocaleString('en-IN')}</span>
                            </div>
                        </>
                    )}
                </div>

                {/* Total */}
                <div style={{ ...rowStyle, marginTop: "0.75rem" }}>
                    <span style={{ fontWeight: "800", fontSize: "1rem", color: isDark ? "#cbd5e1" : "#1e293b" }}>
                        Total
                    </span>
                    <span style={{
                        fontSize: "2rem", fontWeight: "900",
                        color: primaryColor, fontStyle: "italic",
                    }}>
                        ₹{totalAmount.toLocaleString('en-IN')}
                    </span>
                </div>

                {/* GST Note */}
                <p style={{
                    fontSize: "0.7rem", color: "#94a3b8",
                    margin: "0.4rem 0 0", textAlign: "right",
                    lineHeight: "1.4",
                }}>
                    {isIgst
                        ? `Inclusive of 18% IGST (₹${gstAmount.toLocaleString('en-IN')})`
                        : `Inclusive of 18% GST (CGST 9%: ₹${cgstAmount.toLocaleString('en-IN')} + SGST 9%: ₹${sgstAmount.toLocaleString('en-IN')})`
                    }
                </p>
            </div>

            {/* Security Badge */}
            <div style={{
                marginTop: "2rem", padding: "1.25rem", borderRadius: "1rem",
                backgroundColor: isDark ? "rgba(107,255,0,0.05)" : "rgba(37,99,235,0.05)",
                display: "flex", gap: "0.75rem", alignItems: "center",
            }}>
                <Lock size={16} color={primaryColor} />
                <p style={{ fontSize: "0.7rem", color: isDark ? "#94a3b8" : "#64748b", lineHeight: "1.4", margin: 0 }}>
                    Secure 256-bit SSL Encrypted Payment
                </p>
            </div>
        </aside>
    );
};

export default OrderSummary;