"use client"

import BundleCourses from "@/components/Courses/BundleCourses";
import OurCureseList from "@/components/Courses/OurCureseList";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/theme/ThemeProvider";
import { getThemeColor } from "@/theme/themeConfig";
import { ArrowRight, Sparkles } from "lucide-react";
import { Footer } from "@/hooks/footer";

export const Route = createFileRoute("/_public/home")({
  beforeLoad: () => {
    const auth = localStorage.getItem("token") || "";
    if (auth) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = getThemeColor(theme, "background");
  const textColor = getThemeColor(theme, "text");
  // const textSecondary = getThemeColor(theme, "textSecondary");
  const primaryColor = getThemeColor(theme, "primary");
  // const primaryHover = getThemeColor(theme, "primaryHover");

  const images = [
    "/assets/course1.jpg",
    "/assets/course2.jpg",
    "/assets/course3.jpg",
    "/assets/course4.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: bgColor,
      color: textColor,
      overflowX: "hidden",
      transition: "background-color 0.3s ease",
    }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Hero ── */
        .hero-wrap {
          position: relative; width: 100%; height: 92vw; max-height: 620px; min-height: 380px;
          overflow: hidden;
        }

        .hero-gradient {
          position: absolute; inset: 0; z-index: 1;
          background: ${isDark
          ? `linear-gradient(160deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 55%, ${bgColor} 100%)`
          : `linear-gradient(160deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 55%, ${bgColor} 100%)`};
        }

        .hero-content {
          position: absolute; z-index: 2;
          bottom: 2.5rem; left: 1.5rem; right: 1.5rem;
          display: flex; flex-direction: column; align-items: flex-start;
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 12px; border-radius: 999px; margin-bottom: 1rem;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; font-family: 'DM Sans', sans-serif;
          background: ${primaryColor}28; color: ${primaryColor};
          border: 1px solid ${primaryColor}45;
          backdrop-filter: blur(8px);
        }

        .hero-title {
          font-size: clamp(2rem, 8vw, 4rem);
          font-weight: 900; line-height: 1.08;
          letter-spacing: -0.03em;
          color: #fff;
          text-shadow: 0 2px 20px rgba(0,0,0,0.4);
          margin: 0 0 0.75rem;
        }

        .hero-desc {
          font-size: clamp(0.88rem, 3vw, 1.1rem);
          color: rgba(255,255,255,0.78);
          font-weight: 500; line-height: 1.5;
          max-width: 32rem; margin: 0;
        }

        .hero-cta {
          margin-top: 1.5rem;
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.75rem 1.6rem; border-radius: 999px;
          background: ${primaryColor}; color: ${isDark ? "#000" : "#fff"};
          font-weight: 800; font-size: 0.9rem; border: none; cursor: pointer;
          box-shadow: 0 8px 24px ${primaryColor}55;
          transition: all 0.2s ease;
        }
        .hero-cta:hover { transform: translateY(-2px); filter: brightness(1.08); }

        /* Dots */
        .hero-dots {
          position: absolute; bottom: 1rem; right: 1.5rem;
          z-index: 3; display: flex; gap: 6px; align-items: center;
        }
        .hero-dot {
          border-radius: 999px; height: 5px;
          background: rgba(255,255,255,0.35);
          transition: all 0.35s ease;
        }
        .hero-dot.active { width: 20px; background: ${primaryColor}; }
        .hero-dot:not(.active) { width: 5px; }

        /* ── Sections ── */
        .section-wrap {
          max-width: 82rem; margin: 0 auto;
          padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem);
        }

        .section-header {
          display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.75rem;
        }

        .section-title {
          font-size: clamp(1.3rem, 4vw, 1.9rem);
          font-weight: 900; letter-spacing: -0.03em; margin: 0;
          color: ${textColor};
        }

        .section-line {
          flex: 1; height: 1px; max-width: 60px;
          background: linear-gradient(90deg, ${primaryColor}, transparent);
        }

        .section-divider {
          height: 1px; margin: 0;
          background: ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"};
        }
      `}</style>

      {/* ── Hero ── */}
      <div className="hero-wrap">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`Slide ${index + 1}`}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%", objectFit: "cover",
            }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
          />
        </AnimatePresence>

        <div className="hero-gradient" />

        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={11} /> Learn &amp; Grow
          </div>
          <h1 className="hero-title">
            Unlock Your<br />
            <span style={{ color: primaryColor }}>Potential</span>
          </h1>
          <p className="hero-desc">
            Explore our courses and bundles to boost your skills with expert-led content.
          </p>
          <button className="hero-cta" onClick={() => navigate({ to: "/courses" })}>
            Explore Courses <ArrowRight size={16} />
          </button>
        </div>

        {/* Slide dots */}
        <div className="hero-dots">
          {images.map((_, i) => (
            <div key={i} className={`hero-dot ${i === index ? "active" : ""}`} />
          ))}
        </div>
      </div>

      <div className="section-divider" />

      {/* ── Bundles ── */}
      <div className="section-wrap">
        <div className="section-header">
          <h2 className="section-title">Our Bundles</h2>
          <div className="section-line" />
        </div>
        <BundleCourses />
      </div>

      <div className="section-divider" />

      {/* ── Courses ── */}
      <div className="section-wrap">
        <div className="section-header">
          <h2 className="section-title">Our Courses</h2>
          <div className="section-line" />
        </div>
        <OurCureseList />
      </div>
      <Footer />
    </div>
  );
}