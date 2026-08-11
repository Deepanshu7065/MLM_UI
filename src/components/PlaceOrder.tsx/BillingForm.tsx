"use client";

import React from "react";

interface BillingFormProps {
    userDetails: {
        firstName: string;
        lastName: string;
        email: string;
        state?: string;
    };
    setUserDetails: (details: any) => void;
    labelStyle: React.CSSProperties;
    inputStyle: React.CSSProperties;
    isDark: boolean;
}

const BillingForm: React.FC<BillingFormProps> = ({
    userDetails,
    setUserDetails,
    labelStyle,
    inputStyle,
    isDark,
}) => {
    // Generic handler to reduce repetitive code
    const handleChange = (field: string, value: string) => {
        setUserDetails((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="animate-in fade-in duration-500">
            <h2
                style={{
                    fontSize: "2rem",
                    fontWeight: "900",
                    marginBottom: "2rem",
                    color: isDark ? "#ffffff" : "#000000",
                }}
            >
                Billing Information
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Name Row */}
                <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ flex: 1 }}>
                        <label htmlFor="firstName" style={labelStyle}>
                            First Name
                        </label>
                        <input
                            id="firstName"
                            style={inputStyle}
                            value={userDetails.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                            placeholder="John"
                            autoComplete="given-name"
                        />
                    </div>

                    <div style={{ flex: 1 }}>
                        <label htmlFor="lastName" style={labelStyle}>
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            style={inputStyle}
                            value={userDetails.lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                            placeholder="Doe"
                            autoComplete="family-name"
                        />
                    </div>
                </div>

                {/* Email Row */}
                <div>
                    <label htmlFor="email" style={labelStyle}>
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        style={inputStyle}
                        value={userDetails.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="john@example.com"
                        autoComplete="email"
                    />
                </div>

                {/* State Row (GST Calculation) */}
                <div>
                    <label htmlFor="state" style={labelStyle}>
                        State (For GST Tax Calculation)
                    </label>
                    <select
                        id="state"
                        style={{
                            ...inputStyle,
                            cursor: "pointer",
                        }}
                        value={userDetails.state || "Haryana"}
                        onChange={(e) => handleChange("state", e.target.value)}
                    >
                        <option value="Haryana">Haryana (Intra-State: CGST 9% + SGST 9%)</option>
                        <option value="Delhi">Delhi (Inter-State: IGST 18%)</option>
                        <option value="Punjab">Punjab (Inter-State: IGST 18%)</option>
                        <option value="Uttar Pradesh">Uttar Pradesh (Inter-State: IGST 18%)</option>
                        <option value="Rajasthan">Rajasthan (Inter-State: IGST 18%)</option>
                        <option value="Maharashtra">Maharashtra (Inter-State: IGST 18%)</option>
                        <option value="Gujarat">Gujarat (Inter-State: IGST 18%)</option>
                        <option value="Karnataka">Karnataka (Inter-State: IGST 18%)</option>
                        <option value="West Bengal">West Bengal (Inter-State: IGST 18%)</option>
                        <option value="Other">Other State (Inter-State: IGST 18%)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default BillingForm;



// const BillingForm = ({ userDetails, setUserDetails, isDark }: any) => {
//     const handleChange = (field: string, value: string) => {
//         setUserDetails((prev: any) => ({ ...prev, [field]: value }));
//     };

//     const labelStyle = {
//         fontSize: "0.75rem",
//         fontWeight: "700",
//         textTransform: "uppercase" as const,
//         opacity: 0.6,
//         letterSpacing: "1px"
//     };

//     const inputStyle = {
//         width: "100%",
//         backgroundColor: isDark ? "#050811" : "#f8fafc",
//         border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
//         padding: "0.8rem 1rem",
//         borderRadius: "0.75rem",
//         color: isDark ? "#fff" : "#000",
//         marginTop: "0.5rem",
//         outline: "none"
//     };

//     return (
//         <div style={{ animation: "fadeIn 0.5s ease" }}>
//             <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "900", marginBottom: "2rem" }}>Billing Information</h2>
//             <style>{`
//         .input-grid { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
//         @media (max-width: 600px) { .input-grid { flex-direction: column; } }
//       `}</style>

//             <div className="input-grid">
//                 <div style={{ flex: 1 }}>
//                     <label style={labelStyle}>First Name</label>
//                     <input style={inputStyle} value={userDetails.firstName} onChange={(e) => handleChange("firstName", e.target.value)} placeholder="John" />
//                 </div>
//                 <div style={{ flex: 1 }}>
//                     <label style={labelStyle}>Last Name</label>
//                     <input style={inputStyle} value={userDetails.lastName} onChange={(e) => handleChange("lastName", e.target.value)} placeholder="Doe" />
//                 </div>
//             </div>
//             <div>
//                 <label style={labelStyle}>Email Address</label>
//                 <input style={inputStyle} value={userDetails.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="john@example.com" />
//             </div>
//         </div>
//     );
// };
// export default BillingForm;