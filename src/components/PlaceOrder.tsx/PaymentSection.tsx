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

const PaymentSection: React.FC<PaymentSectionProps> = ({ isDark, c, totalAmount }) => {
  const activeColor = isDark ? c.primary.dark : c.primary.light;

  return (
    <div className="animate-in slide-in-from-right-5 duration-500">
      <h2 style={{ fontSize: "2rem", fontWeight: "900", marginBottom: "1rem", color: isDark ? "#ffffff" : "#000000" }}>
        Secure Payment
      </h2>
      <p style={{ color: "#64748b", marginBottom: "2rem" }}>
        All transactions are secure and encrypted via Razorpay.
      </p>

      <div style={{
        padding: "2rem",
        backgroundColor: isDark ? "#050811" : "#f8fafc",
        borderRadius: "1.5rem",
        border: `2px dashed ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        textAlign: "center"
      }}>
        <ShieldCheck size={48} color={activeColor} style={{ margin: "0 auto 1rem" }} />
        <h3 style={{ fontWeight: "800", marginBottom: "0.5rem", color: isDark ? "#fff" : "#000" }}>
          Official Payment Gateway
        </h3>
        <p style={{ fontSize: "0.9rem", color: "#64748b", maxWidth: "250px", margin: "0 auto" }}>
          You will be redirected to Razorpay to securely complete your purchase of ₹{totalAmount.toLocaleString()}.
        </p>
      </div>

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "10px", justifyContent: "center" }}>
        {/* Visual Icons for trust */}
        <div style={{ opacity: 0.5, fontSize: "0.7rem", fontWeight: "bold" }}>UPI • CARDS • NET BANKING • WALLETS</div>
      </div>
    </div>
  );
};

export default PaymentSection;
// "use client";
// import { CreditCard, QrCode } from "lucide-react";

// const PaymentSection = ({ paymentMethod, setPaymentMethod, totalAmount, isDark, c }: any) => {
//   const activeColor = isDark ? c.primary.dark : c.primary.light;

//   const inputStyle = {
//     width: "100%",
//     backgroundColor: isDark ? "#050811" : "#f8fafc",
//     border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
//     padding: "0.8rem 1rem",
//     borderRadius: "0.75rem",
//     color: isDark ? "#fff" : "#000",
//     outline: "none"
//   };

//   return (
//     <div style={{ animation: "slideInRight 0.5s ease" }}>
//       <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "900", marginBottom: "2rem" }}>Choose Payment</h2>

//       <style>{`
//         .payment-tabs { display: flex; gap: 1rem; margin-bottom: 2rem; }
//         .payment-tab { 
//           flex: 1; padding: 1.25rem; border-radius: 1.25rem; cursor: pointer; text-align: center; transition: 0.3s;
//           background-color: ${isDark ? "#050811" : "#f1f5f9"};
//         }
//         .card-row { display: flex; gap: 1rem; margin-top: 1rem; }
//         @media (max-width: 600px) { 
//           .card-row { flex-direction: column; }
//           .payment-tabs { gap: 0.5rem; }
//         }
//       `}</style>

//       <div className="payment-tabs">
//         <div
//           className="payment-tab"
//           onClick={() => setPaymentMethod("card")}
//           style={{ border: `2px solid ${paymentMethod === "card" ? activeColor : "transparent"}` }}
//         >
//           <CreditCard size={24} style={{ margin: "0 auto 0.5rem", color: paymentMethod === "card" ? activeColor : "#64748b" }} />
//           <span style={{ fontWeight: "800", fontSize: "0.8rem" }}>Card</span>
//         </div>
//         <div
//           className="payment-tab"
//           onClick={() => setPaymentMethod("upi")}
//           style={{ border: `2px solid ${paymentMethod === "upi" ? activeColor : "transparent"}` }}
//         >
//           <QrCode size={24} style={{ margin: "0 auto 0.5rem", color: paymentMethod === "upi" ? activeColor : "#64748b" }} />
//           <span style={{ fontWeight: "800", fontSize: "0.8rem" }}>UPI / QR</span>
//         </div>
//       </div>

//       <div style={{ padding: "clamp(1rem, 5vw, 2rem)", backgroundColor: isDark ? "#050811" : "#ffffff", borderRadius: "1.5rem", border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0"}` }}>
//         {paymentMethod === "card" ? (
//           <div>
//             <input style={inputStyle} placeholder="Card Number" />
//             <div className="card-row">
//               <input style={inputStyle} placeholder="MM/YY" />
//               <input style={inputStyle} placeholder="CVC" type="password" />
//             </div>
//           </div>
//         ) : (
//           <div style={{ textAlign: "center" }}>
//             <div style={{ background: "#fff", padding: "10px", borderRadius: "1rem", display: "inline-block" }}>
//               <img
//                 src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=upi@merchant&am=${totalAmount}`}
//                 width={120}
//                 alt="QR"
//               />
//             </div>
//             <p style={{ marginTop: "1rem", fontWeight: "600", opacity: 0.7 }}>Scan to pay ₹{totalAmount}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default PaymentSection;