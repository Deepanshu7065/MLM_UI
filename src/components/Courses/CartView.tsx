"use client"

import { useEffect } from "react";
import { useStore } from "@tanstack/react-store";
import { courseActions, CourseStore } from "./addCourseStore";
import { useNavigate } from "@tanstack/react-router";
import { useGetCart, useRemoveCart } from "@/hooks/cart.mutate";
import { imageUrl } from "@/hooks/utils";
import { useTheme } from "@/theme/ThemeProvider";
import { themeColors } from "@/theme/themeConfig";
import { Loader2, ShoppingBag, Trash2 } from "lucide-react";

const CartView = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const c = themeColors;

    const cart: any[] = useStore(CourseStore, (s) => s.cart);
    const navigate = useNavigate();
    const { mutateAsync: deleteCart } = useRemoveCart();

    const rawUser = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
    const user = rawUser ? JSON.parse(rawUser) : null;

    const { data: cartData, isLoading } = useGetCart({ userId: user?.userId });

    useEffect(() => {
        if (cartData) {
            courseActions.setCart(cartData);
        }
    }, [cartData]);

    const handleRemove = async (courseId: string, userId: string) => {
        try {
            await deleteCart({
                data: { courseId, userId }
            });
            courseActions.removeFromCart(courseId as unknown as number);
        } catch (error) {
            alert("Could not remove item. Please try again.");
        }
    };

    const total = cart?.reduce(
        (sum, item) => sum + Number(item.course?.price || 0),
        0
    );

    if (isLoading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: isDark ? c.background.dark : c.background.light }}>
            <Loader2 size={40} style={{ color: isDark ? c.primary.dark : c.primary.light, animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    if (!cart || cart.length === 0) {
        return (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: isDark ? c.background.dark : c.background.light, padding: '20px', textAlign: 'center' }}>
                <ShoppingBag size={60} style={{ color: isDark ? c.textMuted.dark : c.textMuted.light, marginBottom: '1.5rem', opacity: 0.5 }} />
                <p style={{ color: isDark ? c.textSecondary.dark : c.textSecondary.light, fontSize: '1.5rem', fontWeight: '300' }}>Your cart is empty</p>
                <button onClick={() => navigate({ to: "/courses" })} style={{ marginTop: '1.5rem', color: isDark ? c.primary.dark : c.primary.light, border: `2px solid ${isDark ? c.primary.dark : c.primary.light}`, backgroundColor: 'transparent', padding: '0.8rem 2.5rem', borderRadius: '9999px', fontWeight: 'bold', cursor: 'pointer' }}>Explore Courses</button>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: isDark ? c.background.dark : c.background.light, padding: 'clamp(2rem, 5vw, 4rem) 1.5rem', transition: '0.3s' }}>

            <style>{`
                .cart-layout {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 380px;
                    gap: 2.5rem;
                    align-items: start;
                }

                .cart-item-card {
                    display: flex;
                    align-items: center;
                    background-color: ${isDark ? c.card.dark : c.card.light};
                    border: 1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
                    border-radius: 1.5rem;
                    padding: 1.25rem;
                    margin-bottom: 1rem;
                }

                .item-image { width: 120px; height: 80px; border-radius: 1rem; overflow: hidden; flex-shrink: 0; }
                .item-image img { width: 100%; height: 100%; object-fit: cover; }

                @media (max-width: 1024px) {
                    .cart-layout { grid-template-columns: 1fr; gap: 2rem; }
                    .cart-item-card { flex-direction: column; align-items: flex-start; gap: 1rem; }
                    .item-image { width: 100%; height: 180px; }
                    .header-flex { flex-direction: column; align-items: flex-start !important; gap: 1rem; }
                    .price-section { padding: 0 !important; margin-bottom: 0.5rem; }
                    .remove-btn-container { width: 100%; }
                    .remove-btn-container button { width: 100%; justify-content: center; }
                }
            `}</style>

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header className="header-flex" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '900', color: isDark ? '#fff' : '#000', margin: 0, letterSpacing: '-2px' }}>MY CART</h1>
                        <p style={{ color: isDark ? c.textSecondary.dark : c.textSecondary.light, fontSize: '1.1rem' }}>
                            You have <span style={{ color: isDark ? c.primary.dark : c.primary.light, fontWeight: 'bold' }}>{cart.length} courses</span>
                        </p>
                    </div>
                </header>

                <div className="cart-layout">
                    {/* Items Column */}
                    <div>
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item-card">
                                <div className="item-image">
                                    <img src={`${imageUrl}${item.course?.image}`} alt="" />
                                </div>

                                <div style={{ flex: 1, paddingLeft: '1.5rem' }} className="price-section">
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0, color: isDark ? '#fff' : '#000' }}>
                                        {item.course?.course_name}
                                    </h3>
                                    <p style={{ fontSize: '0.85rem', color: isDark ? c.textSecondary.dark : c.textSecondary.light, marginTop: '4px' }}>
                                        Duration: {item.course?.duration} Weeks
                                    </p>
                                </div>

                                <div style={{ padding: '0 2rem' }} className="price-section">
                                    <span style={{ fontSize: '1.5rem', fontWeight: '900', color: isDark ? c.primary.dark : c.primary.light }}>
                                        ₹{item.course?.price}
                                    </span>
                                </div>

                                <div className="remove-btn-container">
                                    <button
                                        onClick={() => handleRemove(item.course.id, item.userId)}
                                        style={{ background: isDark ? 'rgba(239, 68, 68, 0.1)' : '#fee2e2', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.75rem 1.25rem', borderRadius: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
                                    >
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Sidebar */}
                    <aside>
                        <div style={{ backgroundColor: isDark ? c.card.dark : c.card.light, border: `1px solid ${isDark ? c.border.dark : c.border.light}`, borderRadius: '2rem', padding: '2.5rem', position: 'sticky', top: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: isDark ? '#fff' : '#000' }}>Summary</h2>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', opacity: 0.8 }}>
                                <span>Subtotal</span>
                                <span>₹{total}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1.5rem', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, marginBottom: '1.5rem' }}>
                                <span style={{ fontWeight: '800' }}>Total Amount</span>
                                <span style={{ fontSize: '1.8rem', fontWeight: '900', color: isDark ? c.primary.dark : c.primary.light }}>₹{total}</span>
                            </div>

                            <button
                                onClick={() => navigate({ to: "/checkout" })}
                                style={{ width: '100%', backgroundColor: isDark ? c.primary.dark : c.primary.light, color: isDark ? '#000' : '#fff', fontWeight: '900', fontSize: '1rem', padding: '1rem', borderRadius: '1.25rem', border: 'none', cursor: 'pointer', boxShadow: `0 10px 20px ${isDark ? 'rgba(101, 163, 13, 0.2)' : 'rgba(37, 99, 235, 0.2)'}` }}
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default CartView;