// "use client";

// import React from "react";
// import { CheckCircle } from "lucide-react";

// interface SuccessStateProps {
//     navigate: (path: { to: string }) => void;
//     isDark: boolean;
//     c: any; // Theme configuration object
// }

// const SuccessState: React.FC<SuccessStateProps> = ({ navigate, isDark, c }) => {
//     const primaryColor = isDark ? c.primary.dark : c.primary.light;

//     return (
//         <div
//             className="animate-in zoom-in duration-700 fade-in"
//             style={{
//                 textAlign: "center",
//                 padding: "3rem 0",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center"
//             }}
//         >
//             {/* Success Icon Container */}
//             <div
//                 style={{
//                     width: "100px",
//                     height: "100px",
//                     backgroundColor: isDark ? "rgba(107,255,0,0.1)" : "rgba(37,99,235,0.1)",
//                     borderRadius: "50%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     margin: "0 auto 2rem",
//                     boxShadow: `0 0 30px ${isDark ? "rgba(107,255,0,0.05)" : "rgba(37,99,235,0.05)"}`,
//                 }}
//             >
//                 <CheckCircle
//                     size={50}
//                     color={primaryColor}
//                     strokeWidth={3}
//                 />
//             </div>

//             {/* Text Content */}
//             <h2
//                 style={{
//                     fontSize: "2.5rem",
//                     fontWeight: "900",
//                     marginBottom: "1rem",
//                     color: isDark ? "#ffffff" : "#000000",
//                     letterSpacing: "-0.5px"
//                 }}
//             >
//                 Order Confirmed!
//             </h2>

//             <p
//                 style={{
//                     color: isDark ? c.textSecondary.dark : c.textSecondary.light,
//                     fontSize: "1.1rem",
//                     marginBottom: "2.5rem",
//                     maxWidth: "300px",
//                     lineHeight: "1.5"
//                 }}
//             >
//                 Your enrollment is complete. Get ready to start your learning journey!
//             </p>

//             {/* Action Button */}
//             <button
//                 onClick={() => navigate({ to: "/mycourses" })}
//                 style={{
//                     padding: "1.25rem 3rem",
//                     backgroundColor: primaryColor,
//                     color: isDark ? "#000" : "#fff",
//                     border: "none",
//                     borderRadius: "1.25rem",
//                     fontSize: "1rem",
//                     fontWeight: "900",
//                     cursor: "pointer",
//                     transition: "transform 0.2s ease, box-shadow 0.2s ease",
//                     boxShadow: `0 10px 20px ${isDark ? "rgba(107,255,0,0.2)" : "rgba(37,99,235,0.2)"}`,
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
//                 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//             >
//                 GO TO MY LEARNING
//             </button>
//         </div>
//     );
// };

// export default SuccessState;
"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

interface SuccessStateProps {
    navigate: (path: { to: string }) => void;
    isDark: boolean;
    c: any;
}

const SuccessState: React.FC<SuccessStateProps> = ({ navigate, isDark, c }) => {
    const primaryColor = isDark ? c.primary.dark : c.primary.light;

    return (
        <div
            className="animate-in zoom-in duration-700 fade-in"
            style={{ textAlign: "center", padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
            <div
                style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: isDark ? "rgba(107,255,0,0.1)" : "rgba(37,99,235,0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 2rem",
                    boxShadow: `0 0 30px ${isDark ? "rgba(107,255,0,0.05)" : "rgba(37,99,235,0.05)"}`,
                }}
            >
                <CheckCircle size={50} color={primaryColor} strokeWidth={3} />
            </div>

            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "1rem", color: isDark ? "#ffffff" : "#000000", letterSpacing: "-0.5px" }}>
                Order Confirmed!
            </h2>

            <p style={{ color: isDark ? c.textSecondary.dark : c.textSecondary.light, fontSize: "1.1rem", marginBottom: "2.5rem", maxWidth: "300px", lineHeight: "1.5" }}>
                Your enrollment is complete. Get ready to start your learning journey!
            </p>

            <button
                onClick={() => navigate({ to: "/mycourses" })}
                style={{
                    padding: "1.25rem 3rem",
                    backgroundColor: primaryColor,
                    color: isDark ? "#000" : "#fff",
                    border: "none",
                    borderRadius: "1.25rem",
                    fontSize: "1rem",
                    fontWeight: "900",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    boxShadow: `0 10px 20px ${isDark ? "rgba(107,255,0,0.2)" : "rgba(37,99,235,0.2)"}`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
                GO TO MY LEARNING
            </button>
        </div>
    );
};

export default SuccessState;