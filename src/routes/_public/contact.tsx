import { ContactForm } from '@/components/contact/contactForm'
import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from "@/theme/ThemeProvider"
import { getThemeColor } from "@/theme/themeConfig"
import {
  PhoneCall, Mail, MapPin, Building2, Sparkles,
  Clock, ArrowRight
} from 'lucide-react'
import { Footer } from '@/hooks/footer'

export const Route = createFileRoute('/_public/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const bgColor = getThemeColor(theme, 'background')
  const textColor = getThemeColor(theme, 'text')
  const textSecondary = getThemeColor(theme, 'textSecondary')
  const primaryColor = getThemeColor(theme, 'primary')
  const borderColor = getThemeColor(theme, 'border')
  const cardBg = isDark ? "#0f172a" : "#ffffff"

  const contactDetails = [
    { icon: PhoneCall, label: "Phone", value: "7065867460, 9953739746" },
    { icon: Mail, label: "Email", value: "deepanshu.ss00ss.10@gmail.com" },
    { icon: Building2, label: "Office", value: "MD TECH PRIVATE LIMITED" },
    { icon: MapPin, label: "Address", value: "4th Floor, Khandsa Road, Gurugram (122001), Haryana" },
    { icon: Clock, label: "Hours", value: "Mon – Sat, 9:00 AM – 6:00 PM" },
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
        .ct-hero {
          position: relative; width: 100%;
          min-height: 35vw; max-height: 520px; overflow: hidden;
          display: flex; align-items: flex-end;
        }
        @media (max-width: 600px) { .ct-hero { min-height: 72vw; } }

        .ct-hero-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
          opacity: ${isDark ? 0.18 : 0.22};
        }

        .ct-hero-grad {
          position: absolute; inset: 0;
          background: ${isDark
          ? `linear-gradient(170deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 55%, ${bgColor} 100%)`
          : `linear-gradient(170deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 55%, ${bgColor} 100%)`};
        }

        .ct-hero-blob {
          position: absolute; top: -60px; right: -50px;
          width: 300px; height: 300px; border-radius: 50%;
          background: ${primaryColor}; opacity: 0.07;
          filter: blur(70px); pointer-events: none;
        }

        .ct-hero-content {
          position: relative; z-index: 2; width: 100%;
          padding: clamp(2rem, 8vw, 5rem) clamp(1rem, 5vw, 2.5rem);
          padding-top: clamp(3rem, 12vw, 8rem);
        }

        .ct-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 13px; border-radius: 999px; margin-bottom: 0.9rem;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase;
          background: ${primaryColor}22; color: ${primaryColor};
          border: 1px solid ${primaryColor}40;
        }

        .ct-hero-title {
          font-size: clamp(1.8rem, 6vw, 3.2rem);
          font-weight: 900; letter-spacing: -0.04em;
          line-height: 1.08; margin: 0 0 0.7rem; color: #fff;
          text-shadow: 0 2px 20px rgba(0,0,0,0.35);
        }

        .ct-hero-desc {
          font-size: clamp(0.85rem, 2.5vw, 1rem);
          color: rgba(255,255,255,0.75); font-weight: 500;
          line-height: 1.6; margin: 0; max-width: 34rem;
        }

        /* ── Body ── */
        .ct-body {
          max-width: 80rem; margin: 0 auto;
          padding: clamp(2rem, 5vw, 3.5rem) clamp(1rem, 4vw, 2rem);
        }

        .ct-divider {
          height: 1px;
          background: ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'};
        }

        .ct-main {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 780px) {
          .ct-main { grid-template-columns: 1fr; }
        }

        .ct-card {
          background: ${cardBg};
          border: 1px solid ${borderColor};
          border-radius: 22px;
          padding: clamp(1.4rem, 4vw, 2.2rem);
          position: relative; overflow: hidden;
        }

        .ct-card-blob {
          position: absolute; top: -40px; right: -40px;
          width: 120px; height: 120px; border-radius: 50%;
          background: ${primaryColor}; opacity: 0.06; pointer-events: none;
        }

        .ct-section-label {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.68rem; font-weight: 800; letter-spacing: 1.5px;
          text-transform: uppercase; color: ${primaryColor};
          margin-bottom: 0.6rem;
        }

        .ct-card-title {
          font-size: clamp(1.1rem, 3vw, 1.4rem);
          font-weight: 900; letter-spacing: -0.025em;
          color: ${textColor}; margin: 0 0 1.5rem;
        }

        .ct-detail-row {
          display: flex; align-items: flex-start; gap: 0.85rem;
          padding: 0.9rem 0;
          border-bottom: 1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
        }
        .ct-detail-row:last-child { border-bottom: none; padding-bottom: 0; }

        .ct-detail-icon {
          width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: ${primaryColor}18; margin-top: 1px;
        }

        .ct-detail-label {
          font-size: 0.7rem; font-weight: 800; letter-spacing: 0.8px;
          text-transform: uppercase; color: ${primaryColor};
          margin: 0 0 3px;
        }

        .ct-detail-value {
          font-size: 0.86rem; font-weight: 500;
          color: ${textSecondary}; line-height: 1.5; margin: 0;
        }

        .ct-map-link {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 1.5rem; padding: 0.7rem 1.2rem;
          border-radius: 999px; border: 1px solid ${primaryColor}40;
          background: ${primaryColor}12; color: ${primaryColor};
          font-size: 0.8rem; font-weight: 700; cursor: pointer;
          text-decoration: none; transition: all 0.18s ease;
        }
        .ct-map-link:hover { background: ${primaryColor}22; transform: translateY(-1px); }
      `}</style>

      {/* ── Hero ── */}
      <div className="ct-hero">
        <img className="ct-hero-img" src="/assets/cellphone-6531139_1920.jpg" alt="Contact Us" />
        <div className="ct-hero-grad" />
        <div className="ct-hero-blob" />
        <div className="ct-hero-content">
          <div className="ct-badge"><Sparkles size={11} /> Contact Us</div>
          <h1 className="ct-hero-title">
            Get in <span style={{ color: primaryColor }}>Touch</span>
          </h1>
          <p className="ct-hero-desc">
            Have questions? Reach out and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      <div className="ct-divider" />

      {/* ── Body ── */}
      <div className="ct-body">
        <div className="ct-main">
          {/* Form card */}
          <div className="ct-card">
            <div className="ct-card-blob" />
            <div className="ct-section-label"><Mail size={12} /> Message</div>
            <h2 className="ct-card-title">Send Us a Message</h2>
            <ContactForm />
          </div>

          {/* Info card */}
          <div className="ct-card">
            <div className="ct-card-blob" />
            <div className="ct-section-label"><PhoneCall size={12} /> Support</div>
            <h2 className="ct-card-title">Contact Details</h2>

            {contactDetails.map(({ icon: Icon, label, value }) => (
              <div key={label} className="ct-detail-row">
                <div className="ct-detail-icon">
                  <Icon size={16} color={primaryColor} />
                </div>
                <div>
                  <p className="ct-detail-label">{label}</p>
                  <p className="ct-detail-value">{value}</p>
                </div>
              </div>
            ))}

            <a
              href="https://maps.google.com/?q=Khandsa+Road+Gurugram+Haryana"
              target="_blank"
              rel="noopener noreferrer"
              className="ct-map-link"
            >
              <MapPin size={14} /> View on Google Maps <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}