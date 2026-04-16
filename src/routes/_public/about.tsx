import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTheme } from "@/theme/ThemeProvider"
import { getThemeColor } from "@/theme/themeConfig"
import {
  Target, Zap, DollarSign, HeartHandshake,
  ArrowRight, Sparkles, BookOpen, CheckCircle2
} from 'lucide-react'
import { Footer } from '@/hooks/footer'

export const Route = createFileRoute('/_public/about')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const bgColor = getThemeColor(theme, 'background')
  const textColor = getThemeColor(theme, 'text')
  const textSecondary = getThemeColor(theme, 'textSecondary')
  const primaryColor = getThemeColor(theme, 'primary')
  const borderColor = getThemeColor(theme, 'border')
  const cardBg = isDark ? "#0f172a" : "#ffffff"

  const whyUs = [
    { icon: Zap, title: "Expert Instructors", desc: "Highly experienced professionals guiding every step." },
    { icon: BookOpen, title: "Flexible Learning", desc: "Learn at your own pace, anytime and anywhere." },
    { icon: DollarSign, title: "Affordable Pricing", desc: "World-class education at fraction of traditional costs." },
    { icon: HeartHandshake, title: "Supportive Community", desc: "A thriving network of learners growing together." },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: bgColor,
      color: textColor,
      overflowX: 'hidden',
    }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Hero ── */
        .ab-hero {
          position: relative; width: 100%;
          min-height: 35vw; max-height: 360px;
          overflow: hidden; display: flex; align-items: flex-end;
        }
        @media (max-width: 600px) { .ab-hero { min-height: 75vw; } }

        .ab-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .ab-hero-grad {
          position: absolute; inset: 0;
          background: ${isDark
          ? `linear-gradient(170deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 55%, ${bgColor} 100%)`
          : `linear-gradient(170deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 55%, ${bgColor} 100%)`};
        }
        .ab-hero-content {
          position: relative; z-index: 2; width: 100%;
          padding: clamp(2rem, 8vw, 5rem) clamp(1rem, 5vw, 2.5rem);
        }
        .ab-badge {
          display: inline-flex; align-items: center; gap: 6px; padding: 5px 13px; border-radius: 999px; 
          margin-bottom: 0.9rem; font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
          background: ${primaryColor}22; color: ${primaryColor}; border: 1px solid ${primaryColor}40;
        }
        .ab-hero-title {
          font-size: clamp(1.7rem, 6vw, 3.2rem); font-weight: 900; line-height: 1.08; margin: 0 0 0.7rem; color: #fff;
        }

        /* ── Body ── */
        .ab-body { max-width: 80rem; margin: 0 auto; padding: 4rem 2rem; display: flex; flex-direction: column; gap: 2.5rem; }
        .ab-label { display: inline-flex; align-items: center; gap: 6px; font-size: 0.68rem; font-weight: 800; text-transform: uppercase; color: ${primaryColor}; margin-bottom: 0.6rem; }

        .ab-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        @media (max-width: 700px) { .ab-two-col { grid-template-columns: 1fr; } }

        .ab-card {
          background: ${cardBg}; border: 1px solid ${borderColor}; border-radius: 20px; padding: 2rem; transition: transform 0.25s ease;
        }
        .ab-card:hover { transform: translateY(-4px); }
        .ab-card-title { font-size: 1.35rem; font-weight: 800; color: ${textColor}; margin: 0.5rem 0 0.85rem; }
        .ab-card-text { font-size: 0.93rem; color: ${textSecondary}; line-height: 1.7; margin: 0; }

        .ab-why-grid { display: grid; gap: 1rem; grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 480px) { .ab-why-grid { grid-template-columns: 1fr; } }

        .ab-why-card {
          background: ${cardBg}; border: 1px solid ${borderColor}; border-radius: 18px; padding: 1.3rem; display: flex; flex-direction: column; gap: 0.6rem;
        }
        .ab-why-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: ${primaryColor}18; }

        /* ── CTA ── */
        .ab-cta {
          background: ${isDark ? `${primaryColor}10` : `${primaryColor}05`};
          border: 1px solid ${primaryColor}30; border-radius: 22px; padding: 3rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem;
        }
        .ab-cta-btn {
          display: inline-flex; align-items: center; gap: 8px; padding: 0.85rem 2rem; border-radius: 999px; border: none;
          background: ${primaryColor}; color: ${isDark ? '#000' : '#fff'}; font-weight: 800; cursor: pointer; transition: 0.2s;
        }
        .ab-cta-btn:hover { transform: scale(1.05); }
      `}</style>

      {/* Hero Section */}
      <div className="ab-hero">
        <img className="ab-hero-img" src="/src/assets/ABOUT US.png" alt="About Us" />
        <div className="ab-hero-grad" />
        <div className="ab-hero-content">
          <div className="ab-badge"><Sparkles size={11} /> About Us</div>
          <h1 className="ab-hero-title">About<br /><span style={{ color: primaryColor }}>DM Advance</span></h1>
        </div>
      </div>

      <div className="ab-body">
        {/* Welcome & Mission */}
        <div className="ab-two-col">
          <div className="ab-card">
            <div className="ab-label"><Target size={12} /> Welcome</div>
            <h2 className="ab-card-title">Welcome to DM Advance Tech</h2>
            <p className="ab-card-text">DM Advance Tech is the leading ed-tech platform providing top-quality courses.</p>
          </div>
          <div className="ab-card">
            <div className="ab-label"><Sparkles size={12} /> Mission</div>
            <h2 className="ab-card-title">Our Mission</h2>
            <p className="ab-card-text">Our mission is to empower youth through entrepreneurship and leadership qualities.</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <div className="ab-label" style={{ marginBottom: '1rem' }}><CheckCircle2 size={12} /> Why Choose Us</div>
          <div className="ab-why-grid">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="ab-why-card">
                <div className="ab-why-icon"><Icon size={18} color={primaryColor} /></div>
                <p style={{ fontWeight: 800, margin: 0 }}>{title}</p>
                <p style={{ fontSize: '0.8rem', color: textSecondary, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="ab-cta">
          <h2 style={{ margin: 0 }}>Join DM Advance Today</h2>
          <button className="ab-cta-btn" onClick={() => navigate({ to: "/courses" })}>
            Explore Courses <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}