"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useStore } from "@tanstack/react-store";
import { useNavigate } from "@tanstack/react-router";

// State & Hooks
import { GetSingleUser } from "@/hooks/useUser";
import { CourseStore } from "../Courses/addCourseStore";
import { useCheckoutMutation, useVerifyPaymentMutation } from "@/hooks/Payment.mutate";

// UI Components
import { useTheme } from "@/theme/ThemeProvider";
import { themeColors } from "@/theme/themeConfig";
import StepProgress from "./ProgressHeader";
import BillingForm from "./BillingForm";
import PaymentSection from "./PaymentSection";
import SuccessState from "./SucessSecion";
import OrderSummary from "./OrderSummary";
import FooterButtons from "./FooterButton";
import ProcessingState from "./PaymentStatus";

const PayoutPage = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const isDark = theme === "dark";
    const c = themeColors;

    // Stores & Mutations
    const cart = useStore(CourseStore, (s) => s.cart);
    const { mutateAsync: initiateCheckout } = useCheckoutMutation();
    const { mutateAsync: verifyPayment } = useVerifyPaymentMutation();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");

    const [userDetails, setUserDetails] = useState({
        firstName: "", lastName: "", email: "", phone: "",
    });

    const totalAmount = useMemo(
        () => cart.reduce((sum, item) => sum + Number(item.course.price || 0), 0),
        [cart]
    );

    const rawAuth = typeof window !== "undefined" ? localStorage.getItem("auth") : null;
    const authData = rawAuth ? JSON.parse(rawAuth) : null;
    const { data: userData, isPending } = GetSingleUser({ userId: authData?.userId });

    useEffect(() => {
        if (userData && !isPending) {
            setUserDetails({
                firstName: userData.user.name || "",
                lastName: userData.user.lastName || "",
                email: userData.user.email || "",
                phone: userData.user.phone || "",
            });
        }
    }, [userData, isPending]);

    const handleNext = async () => {
        if (step === 1) {
            setStep(2);
            return;
        }

        setLoading(true);
        try {
            // 1. Backend Checkout API ko call karein (Create Razorpay Order & DB Payment Entry)
            const res = await initiateCheckout({
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email,
                phone: userDetails.phone,
            });

            if (!res.success) throw new Error("Checkout initialization failed");

            // 2. Razorpay SDK options setup karein
            const options = {
                key: res.key_id,
                amount: res.amount,
                currency: res.currency,
                name: "Course Enrollment",
                description: `Payment for ${cart.length} courses`,
                order_id: res.razorpay_order_id,
                handler: async (response: any) => {
                    setIsProcessing(true);
                    try {
                        // 3. Backend Verify API ko call karein (Signature verify + Order Creation)
                        const verifyRes = await verifyPayment({
                            payment_db_id: res.payment_db_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyRes.success) {
                            setStep(3); // Success Screen
                        }
                    } catch (err) {
                        alert("Verification failed but payment was deducted. Contact support.");
                    } finally {
                        setIsProcessing(false);
                        setLoading(false);
                    }
                },
                prefill: {
                    name: `${userDetails.firstName} ${userDetails.lastName}`,
                    email: userDetails.email,
                    contact: userDetails.phone
                },
                theme: { color: isDark ? c.primary.dark : c.primary.light },
                modal: {
                    ondismiss: () => setLoading(false)
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment Error:", error);
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: isDark ? c.background.dark : c.background.light, padding: "4rem 2rem" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <StepProgress step={step === 3 ? 3 : (isProcessing ? 2 : step)} isDark={isDark} c={c} />

                <div style={{
                    display: "flex", flexWrap: "wrap",
                    backgroundColor: isDark ? c.card.dark : c.card.light,
                    borderRadius: "2.5rem", overflow: "hidden",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                }}>
                    <div style={{ flex: "1.4", padding: "3.5rem", minWidth: "350px" }}>
                        {isProcessing ? (
                            <ProcessingState isDark={isDark} c={c} />
                        ) : step === 3 ? (
                            <SuccessState navigate={navigate} isDark={isDark} c={c} />
                        ) : (
                            <>
                                {step === 1 && <BillingForm inputStyle={inputStyle(isDark)} labelStyle={labelStyle(isDark, c)} userDetails={userDetails} setUserDetails={setUserDetails} isDark={isDark} />}
                                {step === 2 && <PaymentSection inputStyle={inputStyle(isDark)} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} totalAmount={totalAmount} isDark={isDark} c={c} />}

                                <FooterButtons
                                    c={c} step={step} setStep={setStep}
                                    handleNext={handleNext} loading={loading}
                                    totalAmount={totalAmount} isDark={isDark}
                                />
                            </>
                        )}
                    </div>

                    <OrderSummary cart={cart} totalAmount={totalAmount} isDark={isDark} c={c} />
                </div>
            </div>
        </div>
    );
};

// Internal Styles helpers
const inputStyle = (isDark: boolean) => ({
    width: "100%", backgroundColor: isDark ? "#050811" : "#f8fafc",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
    padding: "0.8rem 1rem", borderRadius: "0.75rem", color: isDark ? "#fff" : "#000",
    marginTop: "0.5rem", outline: "none",
});

const labelStyle = (isDark: boolean, c: any) => ({
    fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase" as const,
    color: isDark ? c.textSecondary.dark : c.textSecondary.light, letterSpacing: "1px",
});

export default PayoutPage;

// "use client";

// import { useEffect, useState, useMemo, useRef } from "react";
// import { useStore } from "@tanstack/react-store";
// import { useNavigate } from "@tanstack/react-router";
// import { GetSingleUser } from "@/hooks/useUser";
// import { courseActions, CourseStore } from "../Courses/addCourseStore";
// import { useTheme } from "@/theme/ThemeProvider";
// import { themeColors } from "@/theme/themeConfig";
// import StepProgress from "./ProgressHeader";
// import BillingForm from "./BillingForm";
// import PaymentSection from "./PaymentSection";
// import SuccessState from "./SucessSecion";
// import OrderSummary from "./OrderSummary";
// import FooterButtons from "./FooterButton";
// import ProcessingState from "./PaymentStatus";
// import { usePaymentMutate } from "@/hooks/Payment.mutate";

// const PayoutPage = () => {
//     const { theme } = useTheme();
//     const navigate = useNavigate();
//     const isDark = theme === "dark";
//     const c = themeColors;

//     const cart = useStore(CourseStore, (s) => s.cart);
//     const { mutateAsync: paymentMutate } = usePaymentMutate();

//     const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
//     const [step, setStep] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");

//     const [userDetails, setUserDetails] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//     });

//     const totalAmount = useMemo(
//         () => cart.reduce((sum, item) => sum + Number(item.course.price || 0), 0),
//         [cart]
//     );

//     const rawAuth = typeof window !== "undefined" ? localStorage.getItem("auth") : null;
//     const authData = rawAuth ? JSON.parse(rawAuth) : null;
//     const { data: userData, isPending } = GetSingleUser({ userId: authData?.userId });

//     useEffect(() => {
//         if (userData && !isPending) {
//             setUserDetails({
//                 firstName: userData.user.name || "",
//                 lastName: userData.user.lastName || "",
//                 email: userData.user.email || "",
//                 phone: userData.user.phone || "",
//             });
//         }
//     }, [userData, isPending]);

//     // Cleanup polling on unmount
//     useEffect(() => {
//         return () => {
//             if (pollingRef.current) clearInterval(pollingRef.current);
//         };
//     }, []);

//     const handleNext = async () => {
//         if (step === 1) {
//             setStep(2);
//         } else if (step === 2) {
//             setLoading(true);
//             setIsProcessing(true);

//             try {
//                 // Step 1: Create order
//                 // const orderResponse = await createOrderApi({
//                 //     data: {
//                 //         courseId: cart.map((c) => String(c.course.id)) || [],
//                 //         userId: authData?.userId,
//                 //         totalAmount: totalAmount,
//                 //         quantity: cart.length,
//                 //         status: "pending",
//                 //         payment_id: "payment_id"
//                 //     }
//                 // });

//                 // Step 2: Initiate payment
//                 await paymentMutate({
//                     data: {
//                         email: userDetails.email,
//                         name: userDetails.firstName,
//                         payment_id: "payment_id",
//                         payment_method: paymentMethod,
//                         phone: Number(userDetails.phone) || 0,
//                         status: "pending",
//                         total_amount: totalAmount,
//                         userId: authData?.userId
//                     }
//                 });

//                 // Step 3: Clear cart and go to success
//                 courseActions.removeAllCart()
//                 setIsProcessing(false);
//                 setStep(3);
//             } catch (error) {
//                 console.error("Payment failed:", error);
//                 setIsProcessing(false);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     return (
//         <div style={{
//             minHeight: "100vh",
//             backgroundColor: isDark ? c.background.dark : c.background.light,
//             padding: "clamp(1.5rem, 5vw, 4rem) 1rem",
//             transition: "0.3s"
//         }}>
//             <style>{`
//         .payout-card-wrapper {
//           display: flex;
//           background-color: ${isDark ? c.card.dark : c.card.light};
//           border-radius: 2.5rem;
//           overflow: hidden;
//           border: 1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"};
//         }
//         .form-section { flex: 1.4; padding: clamp(1.5rem, 5vw, 3.5rem); }
//         @media (max-width: 900px) {
//           .payout-card-wrapper { flex-direction: column; }
//           .form-section { padding: 2rem 1.5rem; }
//         }
//       `}</style>

//             <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//                 <StepProgress step={isProcessing ? 2 : step} isDark={isDark} c={c} />

//                 <div className="payout-card-wrapper">
//                     <div className="form-section">
//                         {isProcessing ? (
//                             <ProcessingState isDark={isDark} c={c} />
//                         ) : (
//                             <>
//                                 {step === 1 && <BillingForm userDetails={userDetails} setUserDetails={setUserDetails} isDark={isDark} />}
//                                 {step === 2 && <PaymentSection paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} totalAmount={totalAmount} isDark={isDark} c={c} />}
//                                 {step === 3 && <SuccessState navigate={navigate} isDark={isDark} c={c} />}

//                                 {step < 3 && (
//                                     <FooterButtons c={c} step={step} setStep={setStep} handleNext={handleNext} loading={loading} totalAmount={totalAmount} isDark={isDark} />
//                                 )}
//                             </>
//                         )}
//                     </div>
//                     <OrderSummary cart={cart} totalAmount={totalAmount} isDark={isDark} c={c} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PayoutPage;