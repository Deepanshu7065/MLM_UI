"use client"

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import {
  LogOut, Store, Sun, Moon, ChevronDown, LayoutDashboard,
  Menu, X, ChevronRight, User, ShoppingBag, CreditCard,
  CheckCircle2, Home, BookOpen, Phone, Users, Shield,
  PlusCircle, ListOrdered, Ticket, BarChart3
} from "lucide-react";
import { useStore } from "@tanstack/react-store";
import { CourseStore } from "../Courses/addCourseStore";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@/theme/ThemeProvider";
import { themeColors, getThemeColor } from "@/theme/themeConfig";
import { userStore } from "@/store/user.store";
import { Button } from "../ui/button";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [_, setMobileSection] = useState<"main" | "admin" | null>(null);
  const activityRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);

  const { user: userDetails } = useStore(userStore, (state) => ({ user: state.user }));
  const userAdmin = userDetails?.role === "admin";
  const cart = useStore(CourseStore, (s) => s.cart);
  const isDark = theme === "dark";
  const getColor = (key: keyof typeof themeColors) => getThemeColor(theme, key);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileSection(null);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (activityRef.current && !activityRef.current.contains(e.target as Node)) setIsActivityOpen(false);
      if (adminRef.current && !adminRef.current.contains(e.target as Node)) setIsAdminOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const primary = getColor("primary");
  const text = getColor("text");
  const border = getColor("border");

  const mainLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/mycourses", label: "Courses", icon: BookOpen },
    { to: "/mycontact", label: "Raise a ticket", icon: Phone },
    { to: "/myusers", label: "My Users", icon: Users },
    { to: "/user-ticket", label: "View Ticket", icon: Ticket },
  ];

  const activityLinks = [
    { to: "/orders", label: "My Orders", icon: ShoppingBag, desc: "Track your purchases" },
    { to: "/payment-history", label: "Payment History", icon: CreditCard, desc: "All transactions" },
    { to: "/payment-success", label: "Payment Success", icon: CheckCircle2, desc: "Confirmed payments" },
  ];

  const adminLinks = [
    { to: "/admin-dashboard", label: "Dashboard", icon: BarChart3 },
    { to: "/addcourses", label: "Add Courses", icon: PlusCircle },
    { to: "/payments", label: "Payments", icon: CreditCard },
    { to: "/all-users", label: "All Users", icon: Users },
    { to: "/all-orders", label: "All Orders", icon: ListOrdered },
    { to: "/admin-ticket", label: "Ticket", icon: Ticket },
    { to: "/withdrawal-history", label: "Withdrawal History", icon: CheckCircle2 },
  ];

  const isActivityActive = activityLinks.some(l => location.pathname === l.to);
  // const isAdminActive = adminLinks.some(l => location.pathname.startsWith(l.to));

  const handleLogOut = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    CourseStore.setState(() => ({ cart: [] }));
    queryClient.clear();
    navigate({ to: "/sign-in" });
  };

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 1000,
      backgroundColor: getColor("header"),
      borderBottom: `1px solid ${getColor("headerBorder")}`,
      height: "4.5rem", display: "flex", alignItems: "center",
    }}>
      <style>{`

        * { box-sizing: border-box; }

        .nav-wrap {
          width: 100%; max-width: 90rem; margin: 0 auto;
          padding: 0 1.5rem; display: flex; align-items: center;
          justify-content: space-between; gap: 1rem;
          font-family: 'DM Sans', sans-serif;
        }

        .logo-font { font-family: 'Syne', sans-serif; }

        .desktop-links { display: flex; align-items: center; gap: 0.25rem; }
        .mobile-btn-show { display: none !important; }

        @media (max-width: 1024px) {
          .desktop-links { display: none; }
          .desktop-logout { display: none; }
          .mobile-btn-show { display: flex !important; }
          .logo-suffix { display: none; }
        }

        .nav-link {
          padding: 0.45rem 0.85rem; border-radius: 8px; font-size: 0.83rem;
          font-weight: 600; text-decoration: none; transition: all 0.18s ease;
          white-space: nowrap; display: flex; align-items: center; gap: 0.35rem;
        }
        .nav-link:hover { background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}; }
        .nav-link.active {
          color: ${primary};
          background: ${isDark ? "rgba(255,255,255,0.06)" : `${primary}12`};
          font-weight: 700;
        }

        /* Dropdown */
        .dropdown-wrap { position: relative; }
        .dropdown-trigger {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.45rem 0.85rem; border-radius: 8px;
          font-size: 0.83rem; font-weight: 600; cursor: pointer;
          border: none; background: none; font-family: 'DM Sans', sans-serif;
          transition: all 0.18s ease; white-space: nowrap;
        }
        .dropdown-trigger:hover { background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}; }
        .dropdown-trigger.active { color: ${primary}; background: ${isDark ? "rgba(255,255,255,0.06)" : `${primary}12`}; }
        .dropdown-trigger .chevron { transition: transform 0.2s ease; }
        .dropdown-trigger.open .chevron { transform: rotate(180deg); }

        .dropdown-panel {
          position: absolute; top: calc(100% + 8px); left: 50%; transform: translateX(-50%);
          background: ${isDark ? "#0f172a" : "#fff"};
          border: 1px solid ${isDark ? "#1e293b" : "#e2e8f0"};
          border-radius: 16px; padding: 0.5rem;
          box-shadow: 0 20px 40px ${isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.12)"};
          animation: dropIn 0.18s ease; z-index: 100;
          min-width: 220px;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .drop-item {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.7rem 0.85rem; border-radius: 10px;
          text-decoration: none; transition: background 0.15s ease;
          color: ${text};
        }
        .drop-item:hover { background: ${isDark ? "rgba(255,255,255,0.06)" : "#f8fafc"}; }
        .drop-item.active { background: ${isDark ? "rgba(255,255,255,0.06)" : `${primary}10`}; }
        .drop-item-icon {
          width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }

        /* Admin pill */
        .admin-trigger {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.45rem 1rem; border-radius: 8px; border: none;
          font-size: 0.83rem; font-weight: 800; cursor: pointer;
          font-family: 'Syne', sans-serif; letter-spacing: 0.5px;
          transition: all 0.18s ease;
          background: ${primary}; color: ${isDark ? "#000" : "#fff"};
        }
        .admin-trigger:hover { filter: brightness(1.1); }
        .admin-trigger .chevron { transition: transform 0.2s ease; }
        .admin-trigger.open .chevron { transform: rotate(180deg); }

        /* Icon Buttons */
        .icon-btn {
          width: 38px; height: 38px; border-radius: 10px;
          border: 1px solid ${border}; background: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s ease; flex-shrink: 0;
        }
        .icon-btn:hover { background: ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"}; }

        /* Cart badge */
        .cart-badge {
          position: absolute; top: -4px; right: -4px;
          background: #ef4444; color: #fff; border-radius: 50%;
          width: 17px; height: 17px; font-size: 9px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid ${getColor("header")};
        }

        /* Mobile Overlay */
        .mob-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: ${isDark ? "#020617" : "#f8fafc"};
          display: flex; flex-direction: column;
          font-family: 'DM Sans', sans-serif;
        }

        .mob-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid ${isDark ? "rgba(255,255,255,0.07)" : "#e2e8f0"};
          flex-shrink: 0;
        }

        .mob-body { flex: 1; overflow-y: auto; padding: 1.25rem 1.5rem; }

        .mob-section-label {
          font-size: 0.7rem; font-weight: 800; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 0.6rem; margin-top: 1.25rem;
          font-family: 'Syne', sans-serif;
        }

        .mob-card {
          background: ${isDark ? "rgba(255,255,255,0.03)" : "#fff"};
          border: 1px solid ${isDark ? "rgba(255,255,255,0.07)" : "#e2e8f0"};
          border-radius: 14px; overflow: hidden;
        }

        .mob-row {
          display: flex; align-items: center; gap: 0.85rem;
          padding: 1rem 1.1rem; text-decoration: none;
          color: ${text}; font-weight: 600; font-size: 0.9rem;
          border-bottom: 1px solid ${isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9"};
          transition: background 0.15s;
        }
        .mob-row:last-child { border-bottom: none; }
        .mob-row:hover { background: ${isDark ? "rgba(255,255,255,0.04)" : "#f8fafc"}; }
        .mob-row.active { color: ${primary}; }

        .mob-row-icon {
          width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }

        .mob-activity-group {
          background: ${isDark ? "rgba(255,255,255,0.03)" : "#fff"};
          border: 1px solid ${isDark ? "rgba(255,255,255,0.07)" : "#e2e8f0"};
          border-radius: 14px; overflow: hidden; margin-bottom: 0;
        }

        .mob-activity-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 1.1rem; cursor: pointer;
          border-bottom: 1px solid ${isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9"};
        }

        .mob-logout-btn {
          margin: 0 1.5rem 1.5rem; padding: 1rem 1.5rem;
          border-radius: 14px; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 0.7rem;
          font-weight: 800; font-size: 0.95rem; font-family: 'DM Sans', sans-serif;
          background: rgba(239,68,68,0.08); color: #ef4444;
          transition: background 0.2s;
        }
        .mob-logout-btn:hover { background: rgba(239,68,68,0.14); }

        /* Divider */
        .nav-divider {
          width: 1px; height: 22px; margin: 0 0.25rem;
          background: ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
        }
      `}</style>

      <div className="nav-wrap">
        {/* ── Logo ── */}
        <div onClick={() => navigate({ to: "/" })}
          style={{ display: "flex", alignItems: "center", gap: "0.55rem", cursor: "pointer", flexShrink: 0 }}>
          <div style={{ background: primary, padding: "0.45rem", borderRadius: "10px", display: "flex" }}>
            <LayoutDashboard size={19} color={isDark ? "#000" : "#fff"} />
          </div>
          <span className="logo-font" style={{ fontSize: "1.15rem", fontWeight: 800, color: text, letterSpacing: "-0.5px" }}>
            DM <span style={{ color: primary }}>ADV</span><span className="logo-suffix" style={{ color: text, fontWeight: 600 }}>ANCE</span>
          </span>
        </div>

        {/* ── Desktop Nav ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
          <nav className="desktop-links">
            {mainLinks.map(({ to, label }) => {
              const isActive = location.pathname === to;
              return (
                <Link key={to} to={to} className={`nav-link ${isActive ? "active" : ""}`}
                  style={{ color: isActive ? primary : getColor("navLink") }}>
                  {label}
                </Link>
              );
            })}

            {/* ── My Activity Dropdown ── */}
            <div className="dropdown-wrap" ref={activityRef}>
              <Button
                className={`dropdown-trigger ${isActivityActive ? "active" : ""} ${isActivityOpen ? "open" : ""}`}
                style={{ color: isActivityActive ? primary : getColor("navLink") }}
                onClick={() => setIsActivityOpen(v => !v)}
              >
                <ShoppingBag size={14} />
                My Activity
                <ChevronDown size={13} className="chevron" />
              </Button>

              {isActivityOpen && (
                <div className="dropdown-panel" style={{ minWidth: "240px" }}>
                  {activityLinks.map(({ to, label, icon: Icon, desc }) => {
                    const isActive = location.pathname === to;
                    return (
                      <Link key={to} to={to} className={`drop-item ${isActive ? "active" : ""}`}
                        onClick={() => setIsActivityOpen(false)}>
                        <div className="drop-item-icon"
                          style={{ background: isActive ? `${primary}20` : (isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9") }}>
                          <Icon size={15} color={isActive ? primary : getColor("navLink")} />
                        </div>
                        <div>
                          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: isActive ? primary : text }}>
                            {label}
                          </div>
                          <div style={{ fontSize: "0.71rem", opacity: 0.5, marginTop: "1px" }}>{desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── Admin Dropdown ── */}
            {userAdmin && (
              <div className="dropdown-wrap" ref={adminRef} style={{ marginLeft: "0.35rem" }}>
                <Button
                  className={`admin-trigger ${isAdminOpen ? "open" : ""}`}
                  onClick={() => setIsAdminOpen(v => !v)}
                >
                  <Shield size={14} />
                  Admin
                  <ChevronDown size={13} className="chevron" />
                </Button>

                {isAdminOpen && (
                  <div className="dropdown-panel" style={{ minWidth: "200px", left: "auto", right: 0, transform: "none" }}>
                    {adminLinks.map(({ to, label, icon: Icon }) => {
                      const isActive = location.pathname.startsWith(to);
                      return (
                        <Link key={to} to={to} className={`drop-item ${isActive ? "active" : ""}`}
                          onClick={() => setIsAdminOpen(false)}>
                          <div className="drop-item-icon"
                            style={{ background: isActive ? `${primary}20` : (isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9") }}>
                            <Icon size={15} color={isActive ? primary : getColor("navLink")} />
                          </div>
                          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: isActive ? primary : text }}>
                            {label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* ── Actions ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginLeft: "0.6rem" }}>
            <div className="nav-divider desktop-links" />

            {/* Cart */}
            <Button className="icon-btn" onClick={() => navigate({ to: "/cart" })} style={{ position: "relative" }}>
              <Store size={18} color={primary} />
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </Button>

            {/* Theme */}
            <Button className="icon-btn" onClick={toggleTheme}>
              {isDark ? <Sun size={17} color="#eab308" /> : <Moon size={17} color="#64748b" />}
            </Button>

            {/* Desktop Logout */}
            <Button className="desktop-links desktop-logout" onClick={handleLogOut}
              style={{
                height: "38px", padding: "0 1rem", fontSize: "0.83rem", fontWeight: 700,
                color: "#ef4444", border: "1.5px solid rgba(239,68,68,0.2)", borderRadius: "10px",
                background: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.15s", whiteSpace: "nowrap",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "none")}
            >
              <LogOut size={14} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
              Logout
            </Button>

            {/* Mobile Menu */}

            <Button className="icon-btn mobile-btn-show" onClick={() => setIsMobileMenuOpen(true)}
              style={{
                border: "none",
                // hume chahiye mobile m hi dikhe desktop pr display none rahe
                display: isMobileMenuOpen ? "none" : "block"
              }}>
              <Menu size={24} color={text} />
            </Button>

          </div>
        </div>
      </div>

      {/* ── Mobile Overlay ── */}
      {isMobileMenuOpen && (
        <div className="mob-overlay">
          {/* Header */}
          <div className="mob-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{ width: 38, height: 38, borderRadius: "10px", background: `${primary}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <User size={18} color={primary} />
              </div>
              <div>
                <div className="logo-font" style={{ fontWeight: 800, fontSize: "0.95rem", color: text }}>
                  {userDetails?.name || "My Account"}
                </div>
                <div style={{ fontSize: "0.7rem", opacity: 0.45, marginTop: "1px" }}>
                  {userDetails?.role || "member"}
                </div>
              </div>
            </div>
            <Button style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
              onClick={() => setIsMobileMenuOpen(false)}>
              <X size={28} color={text} />
            </Button>
          </div>

          {/* Body */}
          <div className="mob-body">

            {/* Main Pages */}
            <p className="mob-section-label" style={{ color: getColor("navLink") }}>Navigation</p>
            <div className="mob-card">
              {mainLinks.map(({ to, label, icon: Icon }) => {
                const isActive = location.pathname === to;
                return (
                  <Link key={to} to={to} className={`mob-row ${isActive ? "active" : ""}`}>
                    <div className="mob-row-icon"
                      style={{ background: isActive ? `${primary}20` : (isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9") }}>
                      <Icon size={16} color={isActive ? primary : getColor("navLink")} />
                    </div>
                    <span>{label}</span>
                    <ChevronRight size={15} color={isActive ? primary : getColor("navLink")} style={{ marginLeft: "auto" }} />
                  </Link>
                );
              })}
            </div>

            {/* My Activity Group */}
            <p className="mob-section-label" style={{ color: primary }}>My Activity</p>
            <div className="mob-card">
              {activityLinks.map(({ to, label, icon: Icon, desc }) => {
                const isActive = location.pathname === to;
                return (
                  <Link key={to} to={to} className={`mob-row ${isActive ? "active" : ""}`}>
                    <div className="mob-row-icon"
                      style={{ background: isActive ? `${primary}20` : (isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9") }}>
                      <Icon size={16} color={isActive ? primary : getColor("navLink")} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.88rem", fontWeight: 700 }}>{label}</div>
                      <div style={{ fontSize: "0.71rem", opacity: 0.45 }}>{desc}</div>
                    </div>
                    <ChevronRight size={15} color={isActive ? primary : getColor("navLink")} />
                  </Link>
                );
              })}
            </div>

            {/* Admin */}
            {userAdmin && (
              <>
                <p className="mob-section-label" style={{ color: "#ef4444" }}>Admin Control</p>
                <div className="mob-card" style={{ borderColor: "rgba(239,68,68,0.18)" }}>
                  {adminLinks.map(({ to, label, icon: Icon }) => {
                    const isActive = location.pathname.startsWith(to);
                    return (
                      <Link key={to} to={to} className={`mob-row ${isActive ? "active" : ""}`}
                        style={{ color: isActive ? "#ef4444" : text }}>
                        <div className="mob-row-icon"
                          style={{ background: isActive ? "rgba(239,68,68,0.12)" : (isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9") }}>
                          <Icon size={16} color={isActive ? "#ef4444" : getColor("navLink")} />
                        </div>
                        <span>{label}</span>
                        <ChevronRight size={15} color={isActive ? "#ef4444" : getColor("navLink")} style={{ marginLeft: "auto" }} />
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Logout */}
          <Button className="mob-logout-btn" onClick={handleLogOut}>
            <LogOut size={20} />
            Secure Logout
          </Button>
        </div>
      )}
    </header>
  );
}