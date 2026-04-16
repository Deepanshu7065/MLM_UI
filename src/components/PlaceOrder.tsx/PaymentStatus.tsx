"use client";

import React from "react";
import { Loader2, ShieldCheck } from "lucide-react";

const ProcessingState = ({ isDark, c }: any) => (
    <div
        className="animate-in fade-in duration-500"
        style={{
            textAlign: 'center',
            padding: '4rem 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <Loader2
                size={80}
                className="animate-spin"
                color={isDark ? c.primary.dark : c.primary.light}
                style={{ opacity: 0.2 }}
            />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <ShieldCheck size={40} color={isDark ? c.primary.dark : c.primary.light} />
            </div>
        </div>

        <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '900',
            color: isDark ? '#fff' : '#000',
            marginBottom: '1rem'
        }}>
            Processing Your Payment
        </h2>

        <p style={{
            color: '#64748b',
            fontSize: '1rem',
            maxWidth: '320px',
            lineHeight: '1.5'
        }}>
            Please do not refresh or close this page. We are securely verifying your transaction.
        </p>
    </div>
);

export default ProcessingState;




// // const containerStyle: React.CSSProperties = {
// //     minHeight: "100vh",
// //     backgroundColor: isDark ? c.background.dark : c.background.light,
// //     padding: "4rem 2rem",
// //     transition: "background-color 0.3s ease",
// // };

// // const cardWrapperStyle: React.CSSProperties = {
// //     display: "flex", gap: "0", flexWrap: "wrap",
// //     backgroundColor: isDark ? c.card.dark : c.card.light,
// //     borderRadius: "2.5rem", overflow: "hidden",
// //     border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
// // };

// // const inputStyle = {
// //     width: "100%", backgroundColor: isDark ? "#050811" : "#f8fafc",
// //     border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
// //     padding: "0.8rem 1rem", borderRadius: "0.75rem", color: isDark ? "#fff" : "#000",
// //     marginTop: "0.5rem", outline: "none",
// // };

// // const labelStyle = {
// //     fontSize: "0.75rem",
// //     fontWeight: "700",
// //     textTransform: "uppercase" as const,
// //     color: isDark ? c.textSecondary.dark : c.textSecondary.light,
// //     letterSpacing: "1px",
// // };

// "use client";
// import { Loader2, ShieldCheck } from "lucide-react";

// const ProcessingState = ({ isDark, c }: any) => (
//     <div style={{ textAlign: "center", padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
//         <div style={{ position: "relative", marginBottom: "1.5rem" }}>
//             <Loader2 size={70} className="animate-spin" color={isDark ? c.primary.dark : c.primary.light} style={{ opacity: 0.2 }} />
//             <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
//                 <ShieldCheck size={35} color={isDark ? c.primary.dark : c.primary.light} />
//             </div>
//         </div>
//         <h2 style={{ fontSize: "1.5rem", fontWeight: "900", marginBottom: "0.5rem" }}>Processing Payment</h2>
//         <p style={{ color: "#64748b", fontSize: "0.9rem", maxWidth: "280px", margin: "0 auto" }}>
//             Please wait, we are securely processing your transaction.
//         </p>
//     </div>
// );
// export default ProcessingState;


// const containerStyle: React.CSSProperties = {
//     minHeight: "100vh",
//     backgroundColor: isDark ? c.background.dark : c.background.light,
//     padding: "4rem 2rem",
//     transition: "background-color 0.3s ease",
// };

// const cardWrapperStyle: React.CSSProperties = {
//     display: "flex", gap: "0", flexWrap: "wrap",
//     backgroundColor: isDark ? c.card.dark : c.card.light,
//     borderRadius: "2.5rem", overflow: "hidden",
//     border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
// };

// const inputStyle = {
//     width: "100%", backgroundColor: isDark ? "#050811" : "#f8fafc",
//     border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
//     padding: "0.8rem 1rem", borderRadius: "0.75rem", color: isDark ? "#fff" : "#000",
//     marginTop: "0.5rem", outline: "none",
// };

// const labelStyle = {
//     fontSize: "0.75rem",
//     fontWeight: "700",
//     textTransform: "uppercase" as const,
//     color: isDark ? c.textSecondary.dark : c.textSecondary.light,
//     letterSpacing: "1px",
// };