import { useNavigate } from '@tanstack/react-router'
import { useTheme } from "@/theme/ThemeProvider"
import { getThemeColor } from "@/theme/themeConfig"
import { LayoutGrid, Instagram, Twitter, Youtube, Facebook, ArrowRight, Mail, MapPin, Building2 } from 'lucide-react'

export function Footer() {
    const navigate = useNavigate()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const textColor = getThemeColor(theme, 'text')
    const textSecondary = getThemeColor(theme, 'textSecondary')
    const primaryColor = getThemeColor(theme, 'primary')
    const borderColor = getThemeColor(theme, 'border')

    return (
        <footer className="ct-ft" style={{ background: isDark ? "#020617" : "#f8fafc", borderTop: `1px solid ${borderColor}`, marginTop: '4rem' }}>
            <style>{`
        .ct-ft-grid { max-width: 82rem; margin: 0 auto; padding: 4rem 2rem; display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.2fr; gap: 2.5rem; }
        @media (max-width: 860px) { .ct-ft-grid { grid-template-columns: 1fr 1fr; } .ct-ft-brand { grid-column: 1 / -1; } }
        @media (max-width: 500px) { .ct-ft-grid { grid-template-columns: 1fr; } }
        .ct-ft-col-title { font-size: 0.68rem; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: ${primaryColor}; margin-bottom: 1rem; }
        .ct-ft-link { display: flex; align-items: center; gap: 5px; font-size: 0.84rem; font-weight: 500; color: ${textSecondary}; background: none; border: none; cursor: pointer; padding: 4px 0; transition: all 0.2s; }
        .ct-ft-link:hover { color: ${primaryColor}; padding-left: 5px; }
        .ct-ft-soc-group { display: flex; gap: 0.6rem; margin-top: 1.2rem; }
        .ct-ft-soc { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: ${isDark ? "#ffffff05" : "#00000005"}; border: 1px solid ${borderColor}; color: ${textSecondary}; transition: 0.2s; }
        .ct-ft-soc:hover { background: ${primaryColor}; color: white; transform: translateY(-2px); }
        .ct-ft-bar { border-top: 1px solid ${borderColor}; max-width: 82rem; margin: 0 auto; padding: 1.2rem 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
      `}</style>

            <div className="ct-ft-grid">
                <div className="ct-ft-brand">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                        <div style={{ background: primaryColor, padding: '0.4rem', borderRadius: '8px' }}><LayoutGrid size={18} color="white" /></div>
                        <span style={{ fontSize: '1.1rem', fontWeight: 900 }}>DM <span style={{ color: primaryColor }}>ADVANCE</span> TECH</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: textSecondary, lineHeight: 1.6 }}>Empowering learners with industry-relevant skills through expert-led courses.</p>
                    <div style={{ marginTop: '1rem', padding: '10px', border: `1px dashed ${borderColor}`, borderRadius: '8px', display: 'inline-block' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: primaryColor }}>GSTIN: <span style={{ color: textColor }}>06FAGPM9377H1z4</span></span>
                    </div>
                    <div className="ct-ft-soc-group">
                        {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => <a key={i} className="ct-ft-soc" href="#"><Icon size={16} /></a>)}
                    </div>
                </div>

                <div>
                    <p className="ct-ft-col-title">Company</p>
                    {[{ L: "Home", T: "/home" }, { L: "About", T: "/about" }, { L: "Courses", T: "/courses" }, { L: "Contact", T: "/contact" }].map(n => (
                        <button key={n.L} className="ct-ft-link" onClick={() => navigate({ to: n.T })}><ArrowRight size={10} /> {n.L}</button>
                    ))}
                </div>

                <div>
                    <p className="ct-ft-col-title">Legal</p>
                    {[{ L: "Privacy Policy", T: "/privacy-policy" }, { L: "Terms of Use", T: "/terms" }, { L: "Refund Policy", T: "/refund-policy" }].map(n => (
                        <button key={n.L} className="ct-ft-link" onClick={() => navigate({ to: n.T })}><ArrowRight size={10} /> {n.L}</button>
                    ))}
                </div>

                <div>
                    <p className="ct-ft-col-title">Address</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: textSecondary }}><Building2 size={14} color={primaryColor} /> MD TECH PRIVATE LIMITED</div>
                        <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: textSecondary }}><MapPin size={14} color={primaryColor} /> Gurugram, Haryana (122001)</div>
                        <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: textSecondary }}><Mail size={14} color={primaryColor} /> deepanshu.ss00ss.10@gmail.com</div>
                    </div>
                </div>
            </div>
            <div className="ct-ft-bar">
                <p style={{ fontSize: '0.75rem', color: textSecondary }}>© {new Date().getFullYear()} DM Advance Tech. All rights reserved.</p>
            </div>
        </footer>
    )
}