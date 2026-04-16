"use client"

import { useNavigate } from "@tanstack/react-router"
import { useTheme } from "@/theme/ThemeProvider"
import { getThemeColor } from "@/theme/themeConfig"
import {
  LayoutGrid, Mail, Phone, MapPin,
  Instagram, Twitter, Youtube, Facebook,
  ArrowRight
} from "lucide-react"

export function Footer() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const navigate = useNavigate()

  // const bgColor = getThemeColor(theme, "background")
  const textColor = getThemeColor(theme, "text")
  const textSecondary = getThemeColor(theme, "textSecondary")
  const primaryColor = getThemeColor(theme, "primary")
  const borderColor = getThemeColor(theme, "border")

  const navLinks = [
    { label: "Home", to: "/home" },
    { label: "About", to: "/about" },
    { label: "Courses", to: "/courses" },
    { label: "Contact", to: "/contact" },
  ]

  const courseLinks = [
    { label: "Web Development", to: "/courses" },
    { label: "Digital Marketing", to: "/courses" },
    { label: "Graphic Design", to: "/courses" },
    { label: "Data Science", to: "/courses" },
  ]

  const contactInfo = [
    { icon: Mail, text: "support@dmadvance.com" },
    { icon: Phone, text: "+91 98765 43210" },
    { icon: MapPin, text: "New Delhi, India" },
  ]

  const socials = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
  ]

  return (
    <footer style={{
      backgroundColor: isDark ? "#020617" : "#f8fafc",
      borderTop: `1px solid ${borderColor}`,
      color: textColor,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .ft-top {
          max-width: 82rem; margin: 0 auto;
          padding: clamp(2.5rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem);
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 2.5rem;
        }

        @media (max-width: 900px) {
          .ft-top {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .ft-brand { grid-column: 1 / -1; }
        }

        @media (max-width: 520px) {
          .ft-top {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
          .ft-brand { grid-column: auto; }
        }

        .ft-col-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.72rem; font-weight: 800;
          letter-spacing: 1.4px; text-transform: uppercase;
          color: ${primaryColor};
          margin: 0 0 1.1rem;
        }

        .ft-link {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.875rem; font-weight: 500;
          color: ${textSecondary};
          text-decoration: none; padding: 3px 0;
          transition: color 0.15s ease, gap 0.15s ease;
          cursor: pointer; background: none; border: none;
          font-family: 'DM Sans', sans-serif;
        }
        .ft-link:hover { color: ${primaryColor}; gap: 10px; }
        .ft-link .ft-arrow { opacity: 0; transition: opacity 0.15s; }
        .ft-link:hover .ft-arrow { opacity: 1; }

        .ft-contact-row {
          display: flex; align-items: flex-start; gap: 10px;
          margin-bottom: 0.85rem;
        }
        .ft-contact-icon {
          width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: ${primaryColor}18;
        }
        .ft-contact-text {
          font-size: 0.84rem; font-weight: 500;
          color: ${textSecondary}; line-height: 1.5;
          padding-top: 6px;
        }

        .ft-socials {
          display: flex; gap: 0.6rem; margin-top: 1.5rem; flex-wrap: wrap;
        }
        .ft-social-btn {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"};
          border: 1px solid ${borderColor}; cursor: pointer;
          transition: all 0.18s ease; text-decoration: none;
          color: ${textSecondary};
        }
        .ft-social-btn:hover {
          background: ${primaryColor};
          border-color: ${primaryColor};
          color: ${isDark ? "#000" : "#fff"};
          transform: translateY(-2px);
        }

        /* Newsletter */
        .ft-newsletter {
          display: flex; gap: 0; margin-top: 0.85rem;
          border: 1px solid ${borderColor};
          border-radius: 12px; overflow: hidden;
          background: ${isDark ? "rgba(255,255,255,0.03)" : "#fff"};
        }
        .ft-newsletter input {
          flex: 1; padding: 0.7rem 0.9rem;
          background: none; border: none; outline: none;
          font-size: 0.82rem; font-family: 'DM Sans', sans-serif;
          color: ${textColor};
          min-width: 0;
        }
        .ft-newsletter input::placeholder { color: ${textSecondary}; opacity: 0.6; }
        .ft-newsletter button {
          padding: 0.7rem 0.9rem; border: none; cursor: pointer;
          background: ${primaryColor}; color: ${isDark ? "#000" : "#fff"};
          display: flex; align-items: center;
          transition: filter 0.15s;
          flex-shrink: 0;
        }
        .ft-newsletter button:hover { filter: brightness(1.1); }

        /* Bottom bar */
        .ft-bottom {
          border-top: 1px solid ${borderColor};
          max-width: 82rem; margin: 0 auto;
          padding: 1.25rem clamp(1rem, 4vw, 2rem);
          display: flex; align-items: center;
          justify-content: space-between; gap: 1rem;
          flex-wrap: wrap;
        }
        .ft-copy {
          font-size: 0.78rem; color: ${textSecondary};
          opacity: 0.7; font-weight: 500;
        }
        .ft-bottom-links {
          display: flex; gap: 1.25rem; flex-wrap: wrap;
        }
        .ft-bottom-link {
          font-size: 0.78rem; color: ${textSecondary};
          text-decoration: none; font-weight: 500;
          opacity: 0.7; transition: opacity 0.15s, color 0.15s;
        }
        .ft-bottom-link:hover { opacity: 1; color: ${primaryColor}; }

        /* Brand description */
        .ft-brand-desc {
          font-size: 0.83rem; line-height: 1.65;
          color: ${textSecondary}; font-weight: 500;
          margin: 0.85rem 0 0; max-width: 26rem;
        }

        /* Accent top line */
        .ft-accent-line {
          height: 3px; width: 100%;
          background: linear-gradient(90deg, ${primaryColor}, ${primaryColor}44, transparent);
        }
      `}</style>

      {/* Top accent */}
      <div className="ft-accent-line" />

      {/* Main grid */}
      <div className="ft-top">

        {/* Brand col */}
        <div className="ft-brand">
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "0.1rem" }}>
            <div style={{ background: primaryColor, padding: "0.42rem", borderRadius: "9px", display: "flex" }}>
              <LayoutGrid size={18} color={isDark ? "#000" : "#fff"} />
            </div>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.1rem", fontWeight: 900,
              letterSpacing: "-0.4px", color: textColor,
            }}>
              DM <span style={{ color: primaryColor }}>ADVANCE</span>
              <span style={{ fontWeight: 600 }}> TECH</span>
            </span>
          </div>
          <p className="ft-brand-desc">
            Empowering learners with industry-relevant skills through expert-led courses. Start your journey today.
          </p>

          {/* Socials */}
          <div className="ft-socials">
            {socials.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} className="ft-social-btn" aria-label={label}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="ft-col-title">Quick Links</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
            {navLinks.map(({ label, to }) => (
              <button key={label} className="ft-link" onClick={() => navigate({ to })}>
                <ArrowRight size={12} className="ft-arrow" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses */}
        <div>
          <p className="ft-col-title">Courses</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
            {courseLinks.map(({ label, to }) => (
              <button key={label} className="ft-link" onClick={() => navigate({ to })}>
                <ArrowRight size={12} className="ft-arrow" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact + Newsletter */}
        <div>
          <p className="ft-col-title">Contact</p>
          {contactInfo.map(({ icon: Icon, text }) => (
            <div key={text} className="ft-contact-row">
              <div className="ft-contact-icon">
                <Icon size={14} color={primaryColor} />
              </div>
              <span className="ft-contact-text">{text}</span>
            </div>
          ))}

          <p className="ft-col-title" style={{ marginTop: "1.5rem" }}>Newsletter</p>
          <div className="ft-newsletter">
            <input type="email" placeholder="Your email" />
            <button aria-label="Subscribe">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="ft-bottom">
        <p className="ft-copy">
          © {new Date().getFullYear()} DM Advance Tech. All rights reserved.
        </p>
        <div className="ft-bottom-links">
          <a href="#" className="ft-bottom-link">Privacy Policy</a>
          <a href="#" className="ft-bottom-link">Terms of Use</a>
          <a href="#" className="ft-bottom-link">Refund Policy</a>
        </div>
      </div>
    </footer>
  )
}