"use client"

import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from "@/theme/ThemeProvider"
import { getThemeColor } from "@/theme/themeConfig"
import OurCureseList from '@/components/Courses/OurCureseList'
import { Sparkles } from 'lucide-react'
import { Footer } from '@/components/footer'

export const Route = createFileRoute('/_public/courses/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const bgColor = getThemeColor(theme, 'background')
  const textColor = getThemeColor(theme, 'text')
  const textSecondary = getThemeColor(theme, 'textSecondary')
  // const borderColor = getThemeColor(theme, 'border')
  const primaryColor = getThemeColor(theme, 'primary')

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: bgColor,
      transition: 'background-color 0.3s ease',
      overflowX: 'hidden',
    }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .ch-wrap {
          position: relative;
          width: 100%;
          min-height: 660px;
          overflow: hidden;
          display: flex;
          opacity: 1.3;
          align-items: flex-end;
        }

        @media (min-width: 640px) { .ch-wrap { min-height: 420px; } }
        @media (min-width: 1024px) { .ch-wrap { min-height: 560px; } }

        .ch-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;

          transform: scale(1.03);
        }

        .ch-grad {
          position: absolute; inset: 0;
          background: ${isDark
          ? `linear-gradient(170deg, ${bgColor}aa 0%, ${bgColor}ee 60%, ${bgColor} 100%)`
          : `linear-gradient(170deg, ${bgColor}88 0%, ${bgColor}cc 60%, ${bgColor} 100%)`};
        }

        /* Decorative blurred circle */
        .ch-blob {
          position: absolute; top: -60px; right: -40px;
          width: 280px; height: 280px; border-radius: 50%;
          background: ${primaryColor};
          opacity: ${isDark ? 0.07 : 0.06};
          filter: blur(60px);
          pointer-events: none;
        }

        .ch-content {
          position: relative; z-index: 2;
          width: 100%; max-width: 82rem;
          margin: 0 auto;
          padding: clamp(2rem, 6vw, 3.5rem) clamp(1rem, 4vw, 2rem);
          padding-top: clamp(2.5rem, 8vw, 5rem);
        }

        .ch-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 13px; border-radius: 999px;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; font-family: 'DM Sans', sans-serif;
          background: ${primaryColor}20; color: ${primaryColor};
          border: 1px solid ${primaryColor}40;
          margin-bottom: 0.9rem;
        }

        .ch-title {
          font-size: clamp(1.8rem, 6vw, 3rem);
          font-weight: 900; letter-spacing: -0.04em;
          line-height: 1.08; margin: 0 0 0.7rem;
          color: ${textColor};
        }

        .ch-title span { color: ${primaryColor}; }

        .ch-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.85rem, 2.5vw, 1rem);
          color: ${textSecondary}; font-weight: 500;
          line-height: 1.6; margin: 0;
          max-width: 38rem;
        }

        .ch-divider {
          height: 1px; width: 100%; margin: 0;
          background: ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'};
        }

        .ch-list-wrap {
          max-width: 82rem; margin: 0 auto;
          padding: clamp(1.5rem, 4vw, 3rem) clamp(1rem, 4vw, 2rem)
                   clamp(3rem, 6vw, 5rem);
        }
      `}</style>

      {/* Hero */}
      <div className="ch-wrap">
        <img
          className="ch-img"
          src="/assets/laptop.jpg"
          alt="Courses"
        />
        <div className="ch-grad" />
        <div className="ch-blob" />

        <div className="ch-content">
          <div className="ch-badge">
            <Sparkles size={11} /> All Courses
          </div>
          <h1 className="ch-title">
            Our <span>Courses</span>
          </h1>
          <p className="ch-desc">
            Explore our expert-led programs and level up your skills — from beginner to pro.
          </p>
        </div>
      </div>

      <div className="ch-divider" />

      {/* Course List */}
      <div className="ch-list-wrap">
        <OurCureseList />
      </div>
      <Footer />
    </div>
  )
}