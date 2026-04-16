"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface FooterButtonsProps {
    step: number;
    setStep: (step: number) => void;
    handleNext: () => void;
    loading: boolean;
    totalAmount: number;
    isDark: boolean;
    c: any; // Theme configuration object
}

const FooterButtons: React.FC<FooterButtonsProps> = ({
    step,
    setStep,
    handleNext,
    loading,
    totalAmount,
    isDark,
    c,
}) => {
    // Step 3 (Success) par buttons dikhane ki zaroorat nahi hai
    if (step >= 3) return null;

    const containerStyle: React.CSSProperties = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "3rem",
        paddingTop: "2rem",
        borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"}`,
    };

    const backButtonStyle: React.CSSProperties = {
        background: "none",
        border: "none",
        color: "#64748b",
        cursor: step === 1 ? "default" : "pointer",
        fontWeight: "700",
        display: "flex",
        alignItems: "center",
        opacity: step === 1 ? 0 : 1,
        transition: "0.2s ease",
        pointerEvents: step === 1 ? "none" : "auto",
    };

    const primaryButtonStyle: React.CSSProperties = {
        padding: "1rem 2.5rem",
        backgroundColor: isDark ? c.primary.dark : c.primary.light,
        color: isDark ? "#000" : "#fff",
        border: "none",
        borderRadius: "1rem",
        fontWeight: "900",
        cursor: loading ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        boxShadow: `0 10px 20px ${isDark ? "rgba(107,255,0,0.15)" : "rgba(37,99,235,0.15)"
            }`,
        transition: "transform 0.2s active",
    };

    return (
        <div style={containerStyle}>
            {/* Previous Button */}
            <button
                type="button"
                disabled={step === 1}
                onClick={() => setStep(step - 1)}
                style={backButtonStyle}
            >
                <ArrowLeft size={18} />
                <span>Previous</span>
            </button>

            {/* Next/Pay Button */}
            <button
                type="button"
                disabled={loading}
                onClick={handleNext}
                style={primaryButtonStyle}
            >
                {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                ) : (
                    <>
                        <span>
                            {step === 2
                                ? `PAY ₹${totalAmount.toLocaleString()}`
                                : "NEXT STEP"}
                        </span>
                        <ArrowRight size={18} />
                    </>
                )}
            </button>
        </div>
    );
};

export default FooterButtons;


// "use client";
// import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

// const FooterButtons = ({ step, setStep, handleNext, loading, totalAmount, isDark, c }: any) => {
//     if (step >= 3) return null;

//     return (
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "3rem", paddingTop: "2rem", borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"}` }}>
//             <button
//                 onClick={() => setStep(step - 1)}
//                 disabled={step === 1}
//                 style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", opacity: step === 1 ? 0 : 1 }}
//             >
//                 <ArrowLeft size={18} /> Back
//             </button>

//             <button
//                 onClick={handleNext}
//                 disabled={loading}
//                 style={{
//                     padding: "1rem clamp(1.5rem, 5vw, 2.5rem)",
//                     backgroundColor: isDark ? c.primary.dark : c.primary.light,
//                     color: isDark ? "#000" : "#fff",
//                     borderRadius: "1rem",
//                     border: "none",
//                     fontWeight: "900",
//                     cursor: loading ? "not-allowed" : "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "10px",
//                     opacity: loading ? 0.7 : 1,
//                 }}
//             >
//                 {loading
//                     ? <><Loader2 size={18} className="animate-spin" /> Processing...</>
//                     : <>{step === 2 ? `PAY ₹${totalAmount}` : "NEXT STEP"} <ArrowRight size={18} /></>
//                 }
//             </button>
//         </div>
//     );
// };
// export default FooterButtons;