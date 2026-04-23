"use client"

import { useQuery } from "@tanstack/react-query"
import { CourseApi } from "@/Apis/Courses/courseApi"
import { useTheme } from "@/theme/ThemeProvider"
import { getThemeColor } from "@/theme/themeConfig"
import { imageUrl } from "@/hooks/utils"
import { useNavigate } from "@tanstack/react-router"
import { Clock, BookOpen, ArrowRight, Lock } from "lucide-react"

const OurCureseList = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark"
    const navigate = useNavigate()

    const textColor = getThemeColor(theme, "text")
    const textSecondary = getThemeColor(theme, "textSecondary")
    const primaryColor = getThemeColor(theme, "primary")
    // const primaryHover = getThemeColor(theme, "primaryHover")
    const borderColor = getThemeColor(theme, "border")
    const cardBg = isDark ? "#111827" : "#ffffff"

    const { data, isLoading } = useQuery({
        queryKey: ["courses"],
        queryFn: () => CourseApi.getCourses(),
    })

    if (isLoading) {
        return (
            <div style={{ padding: "3rem 0" }}>
                <style>{`
          .skeleton-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          @media (min-width: 640px) { .skeleton-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (min-width: 1024px) { .skeleton-grid { grid-template-columns: repeat(3, 1fr); } }
          .skeleton-card {
            border-radius: 16px; overflow: hidden;
            background: ${isDark ? "#1e293b" : "#f1f5f9"};
            animation: pulse 1.6s ease-in-out infinite;
          }
          .skeleton-img { height: 180px; background: ${isDark ? "#334155" : "#e2e8f0"}; }
          .skeleton-body { padding: 1rem; display: flex; flex-direction: column; gap: 0.6rem; }
          .skeleton-line { height: 12px; border-radius: 6px; background: ${isDark ? "#334155" : "#e2e8f0"}; }
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        `}</style>
                <div className="skeleton-grid">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="skeleton-card">
                            <div className="skeleton-img" />
                            <div className="skeleton-body">
                                <div className="skeleton-line" style={{ width: "75%" }} />
                                <div className="skeleton-line" style={{ width: "55%" }} />
                                <div className="skeleton-line" style={{ width: "40%", marginTop: "0.4rem" }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <>
            <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Grid: 3 col desktop, 2 tablet, 1 mobile ── */
        .course-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 600px) {
          .course-grid { grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        }
        @media (min-width: 1024px) {
          .course-grid { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        }

        /* ── Card ── */
        .cc {
          background: ${cardBg};
          border: 1px solid ${borderColor};
          border-radius: 18px; overflow: hidden;
          display: flex; flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer;
        }
        @media (hover: hover) {
          .cc:hover {
            transform: translateY(-6px);
            box-shadow: ${isDark
                    ? "0 24px 40px rgba(0,0,0,0.55)"
                    : "0 24px 40px rgba(0,0,0,0.1)"};
          }
        }

        /* Image */
        .cc-img-wrap {
          position: relative; width: 100%;
          /* Mobile: 16:10 aspect; taller on desktop */
          padding-top: 60%;
          overflow: hidden; flex-shrink: 0;
        }
        @media (min-width: 600px) { .cc-img-wrap { padding-top: 56%; } }

        .cc-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.45s ease;
        }
        .cc:hover .cc-img { transform: scale(1.05); }

        .cc-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%);
        }

        /* Premium badge top-left */
        .cc-premium {
          position: absolute; top: 0.75rem; left: 0.75rem;
          padding: 4px 10px; border-radius: 999px;
          font-size: 0.68rem; font-weight: 800; letter-spacing: 0.8px;
          text-transform: uppercase; font-family: 'Syne', sans-serif;
          background: ${primaryColor}; color: ${isDark ? "#000" : "#fff"};
          box-shadow: 0 4px 12px ${primaryColor}55;
        }

        /* Price bottom-right of image */
        .cc-price {
          position: absolute; bottom: 0.75rem; right: 0.75rem;
          font-size: 1.1rem; font-weight: 900;
          color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }

        /* Body */
        .cc-body {
          padding: 1.1rem 1.1rem 1.25rem;
          display: flex; flex-direction: column; flex: 1; gap: 0;
        }

        .cc-title {
          font-size: clamp(0.95rem, 2.5vw, 1.1rem);
          font-weight: 800; letter-spacing: -0.02em;
          color: ${textColor}; margin: 0 0 0.45rem;
          line-height: 1.25;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }

        .cc-desc {
          font-size: 0.8rem; color: ${textSecondary};
          line-height: 1.5; margin: 0 0 0.85rem;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
          flex: 1;
        }

        .cc-meta {
          display: flex; gap: 0.6rem; margin-bottom: 0.85rem; flex-wrap: wrap;
        }

        .cc-meta-chip {
          display: flex; align-items: center; gap: 5px;
          padding: 4px 10px; border-radius: 999px;
          font-size: 0.73rem; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"};
          color: ${textSecondary};
        }

        .cc-btn {
          width: 100%; padding: 0.78rem 1rem;
          border-radius: 12px; border: none; cursor: pointer;
          background: ${primaryColor}; color: ${isDark ? "#000" : "#fff"};
          font-weight: 800;
          font-size: 0.85rem; letter-spacing: 0.3px;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px ${primaryColor}44;
        }
        .cc-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .cc-btn:active { transform: translateY(0); }
      `}</style>

            <div className="course-grid">
                {data?.courses?.map((item: any, i: number) => (
                    <div key={i} className="cc" onClick={() => navigate({ to: `/courses/${item.id}` })}>

                        {/* Image */}
                        <div className="cc-img-wrap">
                            <img
                                className="cc-img"
                                src={`${imageUrl}${item.image}`}
                                alt={item.course_name}
                            />
                            <div className="cc-img-overlay" />
                            <span className="cc-premium">Premium</span>
                            <span className="cc-price">₹{item.price}</span>
                        </div>

                        {/* Body */}
                        <div className="cc-body">
                            <h3 className="cc-title">{item.course_name}</h3>
                            <p className="cc-desc">{item.description}</p>

                            <div className="cc-meta">
                                <span className="cc-meta-chip">
                                    <Clock size={11} /> {item.duration}w
                                </span>
                                <span className="cc-meta-chip">
                                    <BookOpen size={11} /> {item.lessons || "0"} lessons
                                </span>
                            </div>

                            <button
                                className="cc-btn"
                                onClick={(e) => { e.stopPropagation(); alert("First you need to login"); }}
                            >
                                <Lock size={13} /> Enroll Now <ArrowRight size={13} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default OurCureseList