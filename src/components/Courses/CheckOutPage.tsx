"use client"

import { useEffect, useState } from "react";
import { useStore } from "@tanstack/react-store";
import { CourseStore } from "./addCourseStore";
import { useNavigate } from "@tanstack/react-router";
import { GetSingleUser } from "@/hooks/useUser";
import { imageUrl } from "@/hooks/utils";
import { useTheme } from "@/theme/ThemeProvider";
import { themeColors } from "@/theme/themeConfig";

// UI Components
import { CreditCard, CheckCircle, ArrowRight, ArrowLeft, Loader2, QrCode, Lock } from "lucide-react";

const PayoutPage = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const c = themeColors;

    const cart = useStore(CourseStore, (s) => s.cart);
    const totalAmount = cart.reduce((sum, item) => sum + Number(item.course.price || 0), 0);
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("card");

    const rawUserId = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
    const userId = rawUserId ? JSON.parse(rawUserId) : null;
    const { data: userData, isPending } = GetSingleUser({ userId: userId?.userId });

    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    useEffect(() => {
        if (userData && !isPending) {
            setUserDetails({
                firstName: userData.user.name || "",
                lastName: userData.user.lastName || "",
                email: userData.user.email || "",
            });
        }
    }, [userData, isPending]);

    const handleNext = () => {
        if (step === 2) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setStep(3);
            }, 2500);
        } else {
            setStep(step + 1);
        }
    };

    const inputStyle = {
        width: '100%',
        backgroundColor: isDark ? '#050811' : '#f8fafc',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        padding: '0.8rem 1rem',
        borderRadius: '0.75rem',
        color: isDark ? '#ffffff' : '#000000',
        outline: 'none',
        marginTop: '0.5rem'
    };

    const labelStyle = {
        fontSize: '0.75rem',
        fontWeight: '700',
        textTransform: 'uppercase' as const,
        color: isDark ? c.textSecondary.dark : c.textSecondary.light,
        letterSpacing: '1px'
    };

    return (
        <div style={{ minHeight: '100%', backgroundColor: isDark ? c.background.dark : c.background.light, padding: '4rem 2rem', transition: '0.3s' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                {/* Progress Header */}
                <div style={{ marginBottom: '3rem', maxWidth: '600px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        {["Billing", "Payment", "Success"].map((label, i) => (
                            <span key={i} style={{
                                fontSize: '0.7rem',
                                fontWeight: '900',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                color: step >= i + 1 ? (isDark ? c.primary.dark : c.primary.light) : (isDark ? '#334155' : '#cbd5e1')
                            }}>
                                {label}
                            </span>
                        ))}
                    </div>
                    <div style={{ height: '4px', backgroundColor: isDark ? '#1e293b' : '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{
                            width: `${(step / 3) * 100}%`,
                            height: '100%',
                            backgroundColor: isDark ? c.primary.dark : c.primary.light,
                            transition: '0.5s ease-in-out'
                        }} />
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '2.5rem',
                    flexWrap: 'wrap',
                    backgroundColor: isDark ? c.card.dark : c.card.light,
                    borderRadius: '2.5rem',
                    overflow: 'hidden',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                    boxShadow: isDark ? 'none' : '0 25px 50px -12px rgba(0,0,0,0.08)'
                }}>

                    {/* Left Side: Form */}
                    <div style={{ flex: '1.4', padding: '3.5rem', minWidth: '350px' }}>
                        {step === 1 && (
                            <div className="animate-in fade-in duration-500">
                                <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '2rem', color: isDark ? '#ffffff' : '#000000' }}>Billing Information</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <div style={{ flex: 1 }}>
                                            <label style={labelStyle}>First Name</label>
                                            <input style={inputStyle} value={userDetails.firstName} onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })} placeholder="John" />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <label style={labelStyle}>Last Name</label>
                                            <input style={inputStyle} value={userDetails.lastName} onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })} placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Email Address</label>
                                        <input style={inputStyle} type="email" value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} placeholder="john@example.com" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-in slide-in-from-right-5 duration-500">
                                <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '2rem', color: isDark ? '#ffffff' : '#000000' }}>Choose Payment</h2>

                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                    <div
                                        onClick={() => setPaymentMethod('card')}
                                        style={{
                                            flex: 1, padding: '1.25rem', borderRadius: '1.25rem', cursor: 'pointer', textAlign: 'center',
                                            border: `2px solid ${paymentMethod === 'card' ? (isDark ? c.primary.dark : c.primary.light) : 'transparent'}`,
                                            backgroundColor: isDark ? '#050811' : '#f1f5f9'
                                        }}
                                    >
                                        <CreditCard size={24} style={{ margin: '0 auto 0.5rem', color: paymentMethod === 'card' ? (isDark ? c.primary.dark : c.primary.light) : '#64748b' }} />
                                        <span style={{ fontWeight: '800', fontSize: '0.8rem' }}>Credit Card</span>
                                    </div>
                                    <div
                                        onClick={() => setPaymentMethod('upi')}
                                        style={{
                                            flex: 1, padding: '1.25rem', borderRadius: '1.25rem', cursor: 'pointer', textAlign: 'center',
                                            border: `2px solid ${paymentMethod === 'upi' ? (isDark ? c.primary.dark : c.primary.light) : 'transparent'}`,
                                            backgroundColor: isDark ? '#050811' : '#f1f5f9'
                                        }}
                                    >
                                        <QrCode size={24} style={{ margin: '0 auto 0.5rem', color: paymentMethod === 'upi' ? (isDark ? c.primary.dark : c.primary.light) : '#64748b' }} />
                                        <span style={{ fontWeight: '800', fontSize: '0.8rem' }}>UPI / QR</span>
                                    </div>
                                </div>

                                <div style={{ padding: '2rem', backgroundColor: isDark ? '#050811' : '#ffffff', borderRadius: '1.5rem', border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0'}` }}>
                                    {paymentMethod === "card" ? (
                                        <div className="space-y-4">
                                            <input style={inputStyle} placeholder="0000 0000 0000 0000" />
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <input style={inputStyle} placeholder="MM/YY" />
                                                <input style={inputStyle} placeholder="CVC" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ background: '#fff', padding: '10px', display: 'inline-block', borderRadius: '1rem', marginBottom: '1rem' }}>
                                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=yourvpa@upi&am=${totalAmount}`} alt="QR" width={140} />
                                            </div>
                                            <p style={{ fontSize: '0.75rem', color: isDark ? c.textSecondary.dark : c.textSecondary.light }}>Scan to pay ₹{totalAmount.toLocaleString()}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }} className="animate-in zoom-in duration-700">
                                <div style={{ width: '80px', height: '80px', backgroundColor: isDark ? 'rgba(107,255,0,0.1)' : 'rgba(37,99,235,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                    <CheckCircle size={40} color={isDark ? c.primary.dark : c.primary.light} />
                                </div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: isDark ? '#ffffff' : '#000000' }}>Success!</h2>
                                <p style={{ color: isDark ? c.textSecondary.dark : c.textSecondary.light, marginBottom: '2rem' }}>Your enrollment is complete.</p>
                                <button onClick={() => navigate({ to: "/mycourses" })} style={{ padding: '1rem 2.5rem', backgroundColor: isDark ? c.primary.dark : c.primary.light, color: isDark ? '#000' : '#fff', border: 'none', borderRadius: '1rem', fontWeight: '900', cursor: 'pointer' }}>GO TO MY LEARNING</button>
                            </div>
                        )}

                        {step < 3 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9'}` }}>
                                <button disabled={step === 1} onClick={() => setStep(step - 1)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', opacity: step === 1 ? 0 : 1 }}>
                                    <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Previous
                                </button>
                                <button onClick={handleNext} style={{
                                    padding: '1rem 2.5rem', backgroundColor: isDark ? c.primary.dark : c.primary.light,
                                    color: isDark ? '#000' : '#fff', border: 'none', borderRadius: '1rem',
                                    fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center',
                                    boxShadow: `0 10px 20px ${isDark ? 'rgba(107,255,0,0.15)' : 'rgba(37,99,235,0.15)'}`
                                }}>
                                    {loading ? <Loader2 className="animate-spin" /> : (step === 2 ? `PAY ₹${totalAmount.toLocaleString()}` : "NEXT STEP")}
                                    {!loading && <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Order Summary */}
                    <div style={{ flex: '0.8', backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc', padding: '3.5rem', borderLeft: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9'}` }}>
                        <h3 style={{ fontSize: '0.75rem', fontWeight: '900', letterSpacing: '2px', color: '#64748b', marginBottom: '2rem', textTransform: 'uppercase' }}>Your Order</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                            {cart.map((item) => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <img src={`${imageUrl}${item.course.image}`} alt="failed" style={{ width: '50px', height: '35px', borderRadius: '0.5rem', objectFit: 'cover' }} />
                                        <p style={{ fontSize: '0.85rem', fontWeight: '700', color: isDark ? '#cbd5e1' : '#1e293b' }}>{item.course.course_name}</p>
                                    </div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: '800' }}>₹{item.course.price}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'}`, paddingTop: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                <span>Subtotal</span>
                                <span>₹{totalAmount}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                <span style={{ fontWeight: '800' }}>Total</span>
                                <span style={{ fontSize: '2rem', fontWeight: '900', color: isDark ? c.primary.dark : c.primary.light, fontStyle: 'italic' }}>₹{totalAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        <div style={{ marginTop: '2.5rem', padding: '1.25rem', borderRadius: '1rem', backgroundColor: isDark ? 'rgba(107,255,0,0.05)' : 'rgba(37,99,235,0.05)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                            <Lock size={16} color={isDark ? c.primary.dark : c.primary.light} />
                            <p style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: '1.4' }}>Secure 256-bit SSL Encrypted Payment</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PayoutPage;