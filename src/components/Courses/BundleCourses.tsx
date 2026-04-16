"use client"

import { useEffect, useRef } from "react";
import { useTheme } from "@/theme/ThemeProvider";
import { getThemeColor } from "@/theme/themeConfig";

const BundleCourses = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Theme Colors
    const cardBg = getThemeColor(theme, 'card');
    const innerCardBg = isDark ? "#1e293b" : "#f1f5f9"; // slate-800 equivalent for dark, light gray for light
    const textColor = getThemeColor(theme, 'text');
    const textSecondary = getThemeColor(theme, 'textSecondary');
    const borderColor = getThemeColor(theme, 'border');
    const primaryColor = getThemeColor(theme, 'primary');

    const data = [
        { id: 1, title: "Alpha Bundle", label: "Mastering Digital Arts" },
        { id: 2, title: "Beta Bundle", label: "Full Stack Development" },
        { id: 3, title: "Gamma Bundle", label: "UI/UX Design Systems" },
        { id: 4, title: "Delta Bundle", label: "Marketing Mastery" },
        { id: 5, title: "Sigma Bundle", label: "Data Science Special" },
        { id: 6, title: "Omega Bundle", label: "Business Analytics" },
    ];

    const loopData = [...data, ...data];
    const scrollRef = useRef<HTMLDivElement | null>(null);

    // AUTO SLIDE
    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider) return;
        const speed = 1.2;
        const interval = setInterval(() => {
            slider.scrollLeft += speed;
            const maxScroll = slider.scrollWidth / 2;
            if (slider.scrollLeft >= maxScroll) {
                slider.scrollLeft = 0;
            }
        }, 16);
        return () => clearInterval(interval);
    }, []);

    // DRAG TO SCROLL
    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider) return;
        let isDown = false;
        let startX = 0;
        let scrollStart = 0;

        const start = (e: any) => {
            isDown = true;
            startX = e.pageX || e.touches?.[0]?.pageX;
            scrollStart = slider.scrollLeft;
        };
        const end = () => { isDown = false; };
        const move = (e: any) => {
            if (!isDown) return;
            const x = e.pageX || e.touches?.[0]?.pageX;
            const walk = (x - startX) * 1.3;
            slider.scrollLeft = scrollStart - walk;
        };

        slider.addEventListener("mousedown", start);
        slider.addEventListener("mousemove", move);
        slider.addEventListener("mouseup", end);
        slider.addEventListener("mouseleave", end);
        slider.addEventListener("touchstart", start);
        slider.addEventListener("touchmove", move);
        slider.addEventListener("touchend", end);

        return () => {
            slider.removeEventListener("mousedown", start);
            slider.removeEventListener("mousemove", move);
            slider.removeEventListener("mouseup", end);
            slider.removeEventListener("mouseleave", end);
            slider.removeEventListener("touchstart", start);
            slider.removeEventListener("touchmove", move);
            slider.removeEventListener("touchend", end);
        };
    }, []);

    return (
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 0.25rem' }}>
            <div
                ref={scrollRef}
                style={{
                    display: 'flex',
                    gap: '1.25rem',
                    overflowX: 'auto',
                    padding: '1rem',
                    cursor: 'grab',
                    borderRadius: '1.5rem',
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    scrollbarWidth: 'none', // For Firefox
                    msOverflowStyle: 'none', // For IE
                }}
                className="no-scrollbar" // Still keeping class for Chrome hidden scrollbar CSS
            >
                {loopData.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            minWidth: '260px',
                            backgroundColor: innerCardBg,
                            borderRadius: '1rem',
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            boxShadow: isDark ? '0 10px 15px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.05)',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                            transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.borderColor = primaryColor;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                        }}
                    >
                        {/* Course Icon/Placeholder */}
                        <div style={{
                            width: '5rem',
                            height: '5rem',
                            backgroundColor: isDark ? '#334155' : '#cbd5e1',
                            borderRadius: '50%',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem'
                        }}>
                            🎓
                        </div>

                        <h2 style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            color: textColor,
                            margin: '0.5rem 0'
                        }}>
                            {item.title}
                        </h2>

                        <p style={{
                            fontSize: '0.875rem',
                            color: textSecondary
                        }}>
                            {item.label}
                        </p>

                        <div style={{
                            marginTop: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            color: primaryColor,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}>
                            View Bundle
                        </div>
                    </div>
                ))}
            </div>

            {/* Injected CSS for no-scrollbar */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default BundleCourses;