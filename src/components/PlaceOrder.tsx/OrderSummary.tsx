"use client";

import React from "react";
import { Lock } from "lucide-react";
import { imageUrl } from "@/hooks/utils";

interface OrderSummaryProps {
    cart: any[];
    totalAmount: number;
    isDark: boolean;
    c: any;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
    cart,
    totalAmount,
    isDark,
    c,
}) => {
    // Common Styles
    const sidebarStyle: React.CSSProperties = {
        flex: "0.8",
        backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
        padding: "3.5rem",
        borderLeft: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"}`,
        minWidth: "320px",
    };

    const headerStyle: React.CSSProperties = {
        fontSize: "0.75rem",
        fontWeight: "900",
        letterSpacing: "2px",
        color: "#64748b",
        marginBottom: "2rem",
        textTransform: "uppercase",
    };

    const secureBadgeStyle: React.CSSProperties = {
        marginTop: "2.5rem",
        padding: "1.25rem",
        borderRadius: "1rem",
        backgroundColor: isDark ? "rgba(107,255,0,0.05)" : "rgba(37,99,235,0.05)",
        display: "flex",
        gap: "0.75rem",
        alignItems: "center",
    };

    return (
        <aside style={sidebarStyle}>
            <h3 style={headerStyle}>Your Order</h3>

            {/* Cart Items List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                {cart.length > 0 ? (
                    cart.map((item: any) => (
                        <div
                            key={item.id}
                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        >
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                <img
                                    src={`${imageUrl}${item.course.image}`}
                                    alt={item.course.course_name}
                                    style={{
                                        width: "50px",
                                        height: "35px",
                                        borderRadius: "0.5rem",
                                        objectFit: "cover",
                                        backgroundColor: isDark ? "#1e293b" : "#e2e8f0",
                                    }}
                                />
                                <p style={{
                                    fontSize: "0.85rem",
                                    fontWeight: "700",
                                    color: isDark ? "#cbd5e1" : "#1e293b",
                                    maxWidth: "150px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}>
                                    {item.course.course_name}
                                </p>
                            </div>
                            <span style={{ fontSize: "0.85rem", fontWeight: "800", color: isDark ? "#fff" : "#000" }}>
                                ₹{Number(item.course.price).toLocaleString()}
                            </span>
                        </div>
                    ))
                ) : (
                    <p style={{ fontSize: "0.85rem", color: "#64748b" }}>Your cart is empty.</p>
                )}
            </div>

            {/* Pricing Breakdown */}
            <div style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`, paddingTop: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                    <span>Subtotal</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                    <span style={{ fontWeight: "800", color: isDark ? "#cbd5e1" : "#1e293b" }}>Total</span>
                    <span style={{
                        fontSize: "2rem",
                        fontWeight: "900",
                        color: isDark ? c.primary.dark : c.primary.light,
                        fontStyle: "italic"
                    }}>
                        ₹{totalAmount.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Security Badge */}
            <div style={secureBadgeStyle}>
                <Lock size={16} color={isDark ? c.primary.dark : c.primary.light} />
                <p style={{ fontSize: "0.7rem", color: isDark ? "#94a3b8" : "#64748b", lineHeight: "1.4" }}>
                    Secure 256-bit SSL Encrypted Payment
                </p>
            </div>
        </aside>
    );
};

export default OrderSummary;
// "use client";
// import { Lock } from "lucide-react";
// import { imageUrl } from "@/hooks/utils";

// const OrderSummary = ({ cart, totalAmount, isDark, c }: any) => {
//     return (
//         <aside style={{
//             flex: "0.8",
//             backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
//             padding: "clamp(1.5rem, 5vw, 3.5rem)",
//             borderLeft: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"}`,
//             minWidth: "300px"
//         }}>
//             <style>{`
//         @media (max-width: 900px) { 
//           aside { border-left: none !important; border-top: 1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}; }
//         }
//       `}</style>
//             <h3 style={{ fontSize: "0.75rem", fontWeight: "900", letterSpacing: "2px", color: "#64748b", marginBottom: "2rem", textTransform: "uppercase" }}>Your Order</h3>

//             <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "2rem" }}>
//                 {cart.map((item: any) => (
//                     <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                         <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//                             <img
//                                 alt=""
//                                 src={`${imageUrl}${item.course.image}`}
//                                 style={{ width: "45px", height: "30px", borderRadius: "4px", objectFit: "cover" }}
//                             />
//                             <p style={{ fontSize: "0.85rem", fontWeight: "700", maxWidth: "140px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                                 {item.course.course_name}
//                             </p>
//                         </div>
//                         <span style={{ fontSize: "0.85rem", fontWeight: "800" }}>₹{item.course.price}</span>
//                     </div>
//                 ))}
//             </div>

//             <div style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`, paddingTop: "1.5rem" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", opacity: 0.7 }}>
//                     <span>Subtotal</span>
//                     <span>₹{totalAmount}</span>
//                 </div>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <span style={{ fontWeight: "800" }}>Total Amount</span>
//                     <span style={{ fontSize: "1.8rem", fontWeight: "900", color: isDark ? c.primary.dark : c.primary.light }}>₹{totalAmount}</span>
//                 </div>
//             </div>

//             <div style={{ marginTop: "2.5rem", padding: "1rem", borderRadius: "1rem", backgroundColor: isDark ? "rgba(107,255,0,0.05)" : "rgba(37,99,235,0.05)", display: "flex", gap: "10px", alignItems: "center" }}>
//                 <Lock size={16} color={isDark ? c.primary.dark : c.primary.light} />
//                 <p style={{ fontSize: "0.7rem", opacity: 0.8 }}>Secure 256-bit SSL Payment</p>
//             </div>
//         </aside>
//     );
// };
// export default OrderSummary;