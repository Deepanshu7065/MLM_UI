"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

interface PaymentSectionProps {
  paymentMethod: "card" | "upi";
  setPaymentMethod: (method: "card" | "upi") => void;
  totalAmount: number;
  inputStyle: React.CSSProperties;
  isDark: boolean;
  c: any;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  isDark,
  c,
  totalAmount,
}) => {
  const activeColor = isDark ? c.primary.dark : c.primary.light;

  return (
    <div className="animate-in slide-in-from-right-5 duration-500">
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "900",
          marginBottom: "1rem",
          color: isDark ? "#ffffff" : "#000000",
        }}
      >
        Secure Payment
      </h2>
      <p style={{ color: "#64748b", marginBottom: "2rem" }}>
        All transactions are secure and encrypted via Cashfree.
      </p>

      <div
        style={{
          padding: "2rem",
          backgroundColor: isDark ? "#050811" : "#f8fafc",
          borderRadius: "1.5rem",
          border: `2px dashed ${
            isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
          }`,
          textAlign: "center",
        }}
      >
        <ShieldCheck
          size={48}
          color={activeColor}
          style={{ margin: "0 auto 1rem" }}
        />
        <h3
          style={{
            fontWeight: "800",
            marginBottom: "0.5rem",
            color: isDark ? "#fff" : "#000",
          }}
        >
          Official Payment Gateway
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#64748b",
            maxWidth: "280px",
            margin: "0 auto",
          }}
        >
          A secure Cashfree payment popup will open to complete your purchase
          of ₹{totalAmount.toLocaleString()}.
        </p>
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <div style={{ opacity: 0.5, fontSize: "0.7rem", fontWeight: "bold" }}>
          UPI • CARDS • NET BANKING • WALLETS
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;