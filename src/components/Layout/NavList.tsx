"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useRouterState } from "@tanstack/react-router"
import { Sun, Moon, LayoutGrid, UserPlus, LogIn, Menu, X, Home, Info, BookOpen, Phone } from "lucide-react"
import { useTheme } from "@/theme/ThemeProvider"
import { themeColors, getThemeColor } from "@/theme/themeConfig"
import { Button } from "../ui/button"

export function NavList() {
  const { theme, toggleTheme } = useTheme()
  const { location } = useRouterState()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isDark = theme === "dark"
  const isSignIn = location.pathname.includes("sign-in")
  const getColor = (key: keyof typeof themeColors) => getThemeColor(theme, key)

  const primary = getColor("primary")
  const text = getColor("text")
  const border = getColor("border")

  const links = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/about", label: "About", icon: Info },
    { to: "/courses", label: "Courses", icon: BookOpen },
    { to: "/contact", label: "Contact", icon: Phone },
  ]

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [isMenuOpen])

  useEffect(() => { setIsMenuOpen(false) }, [location.pathname])

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 1000,
      backgroundColor: getColor("header"),
      borderBottom: `1px solid ${getColor("headerBorder")}`,
      height: "4.25rem", display: "flex", alignItems: "center",
    }}>
      <style>{`

        *, *::before, *::after { box-sizing: border-box; }

        .nl-wrap {
          width: 100%; max-width: 86rem; margin: 0 auto;
          padding: 0 1.5rem; display: flex; align-items: center;
          justify-content: space-between;
          font-family: 'DM Sans', sans-serif;
        }

        .nl-desktop { display: flex; align-items: center; gap: 0.2rem; }
        .nl-tech-suffix { display: inline; }
        .nl-auth-text { display: inline; }

        @media (max-width: 860px) {
          .nl-desktop { display: none; }
          .nl-tech-suffix { display: none; }
          .nl-auth-text { display: none; }
        }

        .nl-link {
          padding: 0.45rem 0.9rem; border-radius: 8px;
          font-size: 0.85rem; font-weight: 600; text-decoration: none;
          transition: all 0.15s ease; white-space: nowrap;
        }
        .nl-link:hover {
          background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"};
        }

        .nl-icon-btn {
          width: 38px; height: 38px; border-radius: 10px;
          border: 1px solid ${border}; background: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s ease; flex-shrink: 0;
        }
        .nl-icon-btn:hover {
          background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"};
        }

        .nl-auth-btn {
          height: 38px; padding: 0 1.1rem; border-radius: 10px;
          font-weight: 700; font-size: 0.84rem; cursor: pointer;
          background: ${primary}; color: ${isDark ? "#000" : "#fff"};
          border: none; display: flex; align-items: center; gap: 0.45rem;
          font-family: 'DM Sans', sans-serif; transition: filter 0.15s;
          white-space: nowrap;
        }
        .nl-auth-btn:hover { filter: brightness(1.1); }

        .nl-mob-btn {
          display: none; width: 38px; height: 38px; border-radius: 10px;
          border: 1px solid ${border}; background: none; cursor: pointer;
          align-items: center; justify-content: center;
        }
        @media (max-width: 860px) { .nl-mob-btn { display: flex; } }

        /* ── Mobile Drawer ── */
        .nl-drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: min(320px, 100vw);
          background: ${isDark ? "#0a0f1e" : "#fff"};
          z-index: 9999; display: flex; flex-direction: column;
          box-shadow: -20px 0 60px ${isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.15)"};
          animation: drawerIn 0.28s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes drawerIn {
          from { transform: translateX(100%); opacity: 0.6; }
          to   { transform: translateX(0);    opacity: 1; }
        }

        .nl-backdrop {
          position: fixed; inset: 0; z-index: 9998;
          background: rgba(0,0,0,0.45);
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .nl-drawer-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.3rem 1.4rem 1.1rem;
          border-bottom: 1px solid ${isDark ? "rgba(255,255,255,0.07)" : "#f1f5f9"};
        }

        .nl-drawer-body {
          flex: 1; overflow-y: auto; padding: 1.2rem 1rem;
          display: flex; flex-direction: column; gap: 0.35rem;
        }

        .nl-mob-link {
          display: flex; align-items: center; gap: 0.9rem;
          padding: 0.9rem 1rem; border-radius: 12px;
          text-decoration: none; font-weight: 600; font-size: 0.95rem;
          transition: background 0.15s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .nl-mob-link:hover {
          background: ${isDark ? "rgba(255,255,255,0.05)" : "#f8fafc"};
        }
        .nl-mob-link.active {
          background: ${isDark ? `${primary}18` : `${primary}12`};
        }

        .nl-mob-icon {
          width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }

        .nl-drawer-foot {
          padding: 1rem 1.2rem 1.5rem;
          border-top: 1px solid ${isDark ? "rgba(255,255,255,0.07)" : "#f1f5f9"};
          display: flex; flex-direction: column; gap: 0.6rem;
        }

        .nl-mob-auth {
          width: 100%; padding: 0.95rem; border-radius: 13px;
          font-weight: 800; font-size: 0.95rem; cursor: pointer; border: none;
          display: flex; align-items: center; justify-content: center; gap: 0.6rem;
          font-family: 'DM Sans', sans-serif; transition: filter 0.15s;
        }
        .nl-mob-auth:hover { filter: brightness(1.08); }

        .nl-mob-theme {
          width: 100%; padding: 0.85rem; border-radius: 13px;
          font-weight: 600; font-size: 0.88rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 0.6rem;
          font-family: 'DM Sans', sans-serif; transition: background 0.15s;
          background: ${isDark ? "rgba(255,255,255,0.04)" : "#f8fafc"};
          border: 1px solid ${border}; color: ${text};
        }
        .nl-mob-theme:hover {
          background: ${isDark ? "rgba(255,255,255,0.08)" : "#f1f5f9"};
        }

        .syne { font-family: 'Syne', sans-serif; }
      `}</style>

      <div className="nl-wrap">
        {/* Logo */}
        <div onClick={() => navigate({ to: "/home" })}
          style={{ display: "flex", alignItems: "center", gap: "0.55rem", cursor: "pointer", flexShrink: 0 }}>
          <div style={{ background: primary, padding: "0.45rem", borderRadius: "10px", display: "flex" }}>
            <LayoutGrid size={19} color={isDark ? "#000" : "#fff"} />
          </div>
          <span className="syne" style={{ fontSize: "1.15rem", fontWeight: 800, color: text, letterSpacing: "-0.4px" }}>
            DM <span style={{ color: primary }}>ADV</span>
            <span className="nl-tech-suffix" style={{ color: text, fontWeight: 600 }}>ANCE</span>
          </span>
        </div>

        {/* Desktop right */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <nav className="nl-desktop">
            {links.map(({ to, label }) => {
              const isActive = location.pathname === to
              return (
                <Link key={to} to={to} className="nl-link"
                  style={{
                    color: isActive ? primary : getColor("navLink"),
                    background: isActive
                      ? (isDark ? "rgba(255,255,255,0.06)" : `${primary}12`)
                      : "transparent",
                    fontWeight: isActive ? 700 : 600,
                  }}>
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Theme — desktop */}
          <Button className="nl-icon-btn nl-desktop" onClick={toggleTheme}>
            {isDark ? <Sun size={17} color="#eab308" /> : <Moon size={17} color="#64748b" />}
          </Button>

          {/* Auth — desktop */}
          <Button className="nl-auth-btn nl-desktop" onClick={() => navigate({ to: isSignIn ? "/sign-up" : "/sign-in" })}>
            {isSignIn ? <UserPlus size={16} /> : <LogIn size={16} />}
            <span className="nl-auth-text">{isSignIn ? "Sign Up" : "Login"}</span>
          </Button>

          {/* Mobile hamburger */}
          <Button className="nl-mob-btn" onClick={() => setIsMenuOpen(true)}>
            <Menu size={22} color={text} />
          </Button>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div className="nl-backdrop" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Drawer */}
      {isMenuOpen && (
        <div className="nl-drawer">
          {/* Head */}
          <div className="nl-drawer-head">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ background: primary, padding: "0.4rem", borderRadius: "8px", display: "flex" }}>
                <LayoutGrid size={17} color={isDark ? "#000" : "#fff"} />
              </div>
              <span className="syne" style={{ fontWeight: 800, fontSize: "1rem", color: text }}>
                DM <span style={{ color: primary }}>ADVANCE</span>
              </span>
            </div>
            <Button onClick={() => setIsMenuOpen(false)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex" }}>
              <X size={24} color={text} />
            </Button>
          </div>

          {/* Links */}
          <div className="nl-drawer-body">
            <p style={{
              fontSize: "0.68rem", fontWeight: 800, letterSpacing: "1.5px",
              textTransform: "uppercase", color: getColor("navLink"),
              opacity: 0.55, padding: "0 0.5rem", marginBottom: "0.25rem",
              fontFamily: "'Syne', sans-serif"
            }}>Pages</p>

            {links.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to
              return (
                <Link key={to} to={to}
                  className={`nl-mob-link ${isActive ? "active" : ""}`}
                  style={{ color: isActive ? primary : text }}>
                  <div className="nl-mob-icon"
                    style={{ background: isActive ? `${primary}20` : (isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9") }}>
                    <Icon size={17} color={isActive ? primary : getColor("navLink")} />
                  </div>
                  <span>{label}</span>
                  {isActive && (
                    <div style={{
                      marginLeft: "auto", width: 6, height: 6,
                      borderRadius: "50%", background: primary, flexShrink: 0
                    }} />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Footer */}
          <div className="nl-drawer-foot">
            <Button className="nl-mob-auth"
              style={{ background: primary, color: isDark ? "#000" : "#fff" }}
              onClick={() => navigate({ to: isSignIn ? "/sign-up" : "/sign-in" })}>
              {isSignIn ? <UserPlus size={18} /> : <LogIn size={18} />}
              {isSignIn ? "Create Account" : "Sign In"}
            </Button>

            <Button className="nl-mob-theme" onClick={toggleTheme}>
              {isDark ? <Sun size={16} color="#eab308" /> : <Moon size={16} color="#64748b" />}
              {isDark ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}