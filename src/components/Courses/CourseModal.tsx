"use client"

import { useGetSingleCourseApi } from "@/hooks/courseApi";
import { imageUrl } from "@/hooks/utils";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Clock, IndianRupee, ArrowLeft, ArrowRight, Bookmark } from "lucide-react";
import { useStore } from "@tanstack/react-store";
import { CourseStore, courseActions, type CartCourse } from "./addCourseStore";
import { useAddCart, useRemoveCart } from "@/hooks/cart.mutate";
import { useTheme } from "@/theme/ThemeProvider";
import { themeColors } from "@/theme/themeConfig";

export const ViewOpenCourseDetails = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const c = themeColors;

    const rawUserId = localStorage.getItem('auth');
    const userId = rawUserId ? JSON.parse(rawUserId) : null;

    const router = useRouter();
    const navigate = useNavigate();
    const id = router.latestLocation.pathname.split("/")[2];

    const { data, isLoading } = useGetSingleCourseApi({ id });
    const course = data?.course;

    const cart = useStore(CourseStore, (s) => s.cart);
    const { mutateAsync: addCart } = useAddCart();
    const { mutateAsync: removeCart } = useRemoveCart();

    const isAlreadyInCart = cart?.some((item) => item.course.id === course?.id);

    // --- Original Color Mapping ---
    const primary = isDark ? c.primary.dark : c.primary.light;
    const bg = isDark ? c.background.dark : c.background.light;
    const secBg = isDark ? c.backgroundSecondary.dark : c.backgroundSecondary.light;
    const card = isDark ? c.card.dark : c.card.light;
    const text = isDark ? c.text.dark : c.text.light;
    const textSec = isDark ? c.textSecondary.dark : c.textSecondary.light;
    const border = isDark ? c.border.dark : c.border.light;

    if (isLoading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: bg }}>
                <div style={{ color: primary, fontWeight: '900', letterSpacing: '0.3em' }} className="animate-pulse">LOADING...</div>
            </div>
        );
    }

    if (!course) return <div style={{ color: text, textAlign: 'center', marginTop: '5rem' }}>Course not found.</div>;

    return (
        <div style={{ backgroundColor: bg, minHeight: '100%', color: text, transition: '0.3s' }}>
            <style>{`
                .details-wrapper {
                    max-width: 1200px; margin: -4rem auto 0; padding: 0 2rem 5rem;
                    display: grid; grid-template-columns: 1fr 380px; gap: 2.5rem;
                    position: relative; z-index: 20;
                }
                .hero-banner {
                    position: relative; height: 320px; width: 100%; 
                    display: flex; align-items: center; overflow: hidden; background-color: ${secBg};
                }
                .course-title-main {
                    font-size: clamp(1.8rem, 6vw, 4.5rem); font-weight: 900; 
                    line-height: 1; text-transform: uppercase; max-width: 750px; color: ${text};
                }
                .mobile-sidebar { display: none; }

                @media (max-width: 1024px) {
                    .details-wrapper { grid-template-columns: 1fr; margin-top: 1.5rem; padding: 0 1.25rem 4rem; }
                    .desktop-sidebar { display: none; }
                    .mobile-sidebar { display: block; margin-bottom: 2rem; }
                    .hero-banner { height: auto; padding: 3rem 0; }
                    .course-title-main { font-size: 2.2rem; line-height: 1.2; }
                }

                @media (max-width: 640px) {
                    .info-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>

            {/* Banner Section */}
            <div className="hero-banner">
                <img
                    src={`${imageUrl}${course.image}`}
                    alt=""
                    style={{ position: 'absolute', right: '0', width: '50%', height: '100%', objectFit: 'cover', opacity: 0.5, maskImage: 'linear-gradient(to left, black, transparent)' }}
                />

                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%', position: 'relative', zIndex: 10 }}>
                    <button
                        onClick={() => window.history.back()}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: primary }}
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                    <h1 className="course-title-main">{course.course_name}</h1>
                </div>
            </div>

            <div className="details-wrapper">
                {/* Main Content Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Mobile Only Price Card */}
                    <div className="mobile-sidebar">
                        <div style={{ backgroundColor: card, borderRadius: '1.5rem', padding: '1.5rem', border: `1px solid ${border}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '2.5rem', fontWeight: '900', color: text, marginBottom: '1.5rem' }}>
                                <IndianRupee size={24} style={{ color: primary }} /> {course.price}
                            </div>
                            {renderActionButtons()}
                        </div>
                    </div>

                    {/* Description Box */}
                    <div style={{ backgroundColor: card, padding: 'clamp(1.5rem, 5vw, 2.5rem)', borderRadius: '1.5rem', border: `1px solid ${border}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                            <div style={{ height: '3px', width: '30px', backgroundColor: primary }} />
                            <span style={{ fontSize: '11px', fontWeight: '900', color: primary, textTransform: 'uppercase' }}>Details</span>
                        </div>
                        <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', lineHeight: 1.6, color: textSec }}>
                            {course.description || "Master industry-standard techniques with our expert-led curriculum."}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        {[
                            { icon: Clock, label: "Duration", val: `${course.duration} Weeks` },
                            { icon: Bookmark, label: "Access", val: "Lifetime" }
                        ].map((stat, i) => (
                            <div key={i} style={{ backgroundColor: card, padding: '1.5rem', borderRadius: '1.25rem', border: `1px solid ${border}`, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <stat.icon size={20} style={{ color: primary }} />
                                <div>
                                    <p style={{ fontSize: '10px', fontWeight: '800', color: textSec, textTransform: 'uppercase', margin: 0 }}>{stat.label}</p>
                                    <p style={{ fontWeight: '700', fontSize: '1.1rem', margin: 0 }}>{stat.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop Sticky Sidebar */}
                <div className="desktop-sidebar">
                    <div style={{ position: 'sticky', top: '2rem', backgroundColor: card, borderRadius: '2rem', padding: '1.8rem', border: `1px solid ${border}` }}>
                        <div style={{ height: '200px', borderRadius: '1.25rem', overflow: 'hidden', marginBottom: '1.5rem' }}>
                            <img src={`${imageUrl}${course.image}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '3rem', fontWeight: '900', color: text }}>
                                <IndianRupee size={28} style={{ color: primary }} />
                                {course.price}
                            </div>
                        </div>

                        {renderActionButtons()}
                    </div>
                </div>
            </div>
        </div>
    );

    // Reusable Buttons with Original Colors
    function renderActionButtons() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <button
                    onClick={async (e) => {
                        e.stopPropagation();
                        if (isAlreadyInCart) {
                            await removeCart({ data: { courseId: course.id, userId: course.userId } });
                            courseActions.removeFromCart(course.id);
                        } else {
                            if (!userId) { alert("Please login to continue"); return; }
                            await addCart({ data: { courseId: course.id, userId: course.userId } });
                            const cartShape: CartCourse = { id: Date.now(), userId: course.userId, course_id: course.id, course: course };
                            courseActions.addToCart(cartShape);
                        }
                    }}
                    style={{
                        padding: '0.70rem', borderRadius: '1rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '900', textTransform: 'uppercase',
                        backgroundColor: isAlreadyInCart ? 'transparent' : primary,
                        color: isAlreadyInCart ? c.accent.error : (isDark ? '#000' : '#fff'),
                        border: isAlreadyInCart ? `2px solid ${c.accent.error}` : 'none'
                    }}
                >
                    {isAlreadyInCart ? "Remove from Cart" : "Enroll Now"}
                </button>

                {isAlreadyInCart && (
                    <button
                        onClick={() => navigate({ to: "/checkout" })}
                        style={{
                            padding: '0.70rem', borderRadius: '1rem', cursor: 'pointer',
                            backgroundColor: primary,
                            color: isDark ? '#000' : '#fff', // Restored Original Color logic
                            fontWeight: '900', textTransform: 'uppercase',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                            border: 'none', opacity: 0.9
                        }}
                    >
                        Proceed to Checkout <ArrowRight size={18} />
                    </button>
                )}
            </div>
        );
    }
};