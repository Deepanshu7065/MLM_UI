"use client";

import { useEffect, useState, useMemo } from "react";
import { useStore } from "@tanstack/react-store";
import { useNavigate } from "@tanstack/react-router";
import { load } from "@cashfreepayments/cashfree-js"; // ✅ npm package


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

  const cart = useStore(CourseStore, (s) => s.cart);
  const { mutateAsync: initiateCheckout } = useCheckoutMutation();
  const { mutateAsync: verifyPayment } = useVerifyPaymentMutation();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const totalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.course.price || 0), 0),
    [cart]
  );

  const rawAuth =
    typeof window !== "undefined" ? localStorage.getItem("auth") : null;
  const authData = rawAuth ? JSON.parse(rawAuth) : null;
  const { data: userData, isPending } = GetSingleUser({
    userId: authData?.userId,
  });

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
      // Step 1: Backend se order + session ID lo
      const res = await initiateCheckout({
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
        phone: userDetails.phone,
        total_amount: totalAmount,
        courseIds: cart.map((item) => String(item.course.id)),
      });

      if (!res.success || !res.payment_session_id) {
        throw new Error("Cashfree session creation failed");
      }

      // Step 2: ✅ npm package se SDK load karo (window.Cashfree nahi)
      const cashfree = await load({
        mode: (import.meta.env.VITE_CASHFREE_MODE?.toLowerCase() ||
          "sandbox") as "sandbox" | "production",
      });

      if (!cashfree) {
        throw new Error("Cashfree SDK load nahi hua");
      }

      // Step 3: Modal checkout open karo
      const result = await cashfree.checkout({
        paymentSessionId: res.payment_session_id,
        redirectTarget: "_modal",
      });

      // Step 4: Result handle karo
      if (result.error) {
        // User ne modal band kiya ya koi error aaya
        console.error("Payment error/cancelled:", result.error);
        setLoading(false);
        return;
      }

      if (result.paymentDetails || result.redirect) {
        // Payment attempt hua — backend se verify karo
        setIsProcessing(true);
        setLoading(false);

        try {
          const verifyRes = await verifyPayment({
            order_id: res.order_id,
            payment_db_id: res.payment_db_id,
          });

          if (verifyRes.success) {
            setStep(3);
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        } catch (err) {
          console.error("Verification error:", err);
          alert("Verification error. Please check your dashboard.");
        } finally {
          setIsProcessing(false);
        }
      }
    } catch (error) {
      console.error("❌ Payment Error:", error);
      alert("Payment shuru nahi ho paya. Console check karein.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: isDark ? c.background.dark : c.background.light,
        padding: "4rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <StepProgress
          step={step === 3 ? 3 : isProcessing ? 2 : step}
          isDark={isDark}
          c={c}
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            backgroundColor: isDark ? c.card.dark : c.card.light,
            borderRadius: "2.5rem",
            overflow: "hidden",
            border: `1px solid ${
              isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"
            }`,
          }}
        >
          <div
            style={{ flex: "1.4", padding: "3.5rem", minWidth: "350px" }}
          >
            {isProcessing ? (
              <ProcessingState isDark={isDark} c={c} />
            ) : step === 3 ? (
              <SuccessState navigate={navigate} isDark={isDark} c={c} />
            ) : (
              <>
                {step === 1 && (
                  <BillingForm
                    inputStyle={inputStyle(isDark)}
                    labelStyle={labelStyle(isDark, c)}
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                    isDark={isDark}
                  />
                )}
                {step === 2 && (
                  <PaymentSection
                    inputStyle={inputStyle(isDark)}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    totalAmount={totalAmount}
                    isDark={isDark}
                    c={c}
                  />
                )}
                <FooterButtons
                  c={c}
                  step={step}
                  setStep={setStep}
                  handleNext={handleNext}
                  loading={loading}
                  totalAmount={totalAmount}
                  isDark={isDark}
                />
              </>
            )}
          </div>
          <OrderSummary
            cart={cart}
            totalAmount={totalAmount}
            isDark={isDark}
            c={c}
          />
        </div>
      </div>
    </div>
  );
};

const inputStyle = (isDark: boolean) => ({
  width: "100%",
  backgroundColor: isDark ? "#050811" : "#f8fafc",
  border: `1px solid ${
    isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
  }`,
  padding: "0.8rem 1rem",
  borderRadius: "0.75rem",
  color: isDark ? "#fff" : "#000",
  marginTop: "0.5rem",
  outline: "none",
});

const labelStyle = (isDark: boolean, c: any) => ({
  fontSize: "0.75rem",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  color: isDark ? c.textSecondary.dark : c.textSecondary.light,
  letterSpacing: "1px",
});

export default PayoutPage;