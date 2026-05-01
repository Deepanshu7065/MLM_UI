import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from "@/theme/ThemeProvider"
import { getThemeColor } from "@/theme/themeConfig"
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  Users,
  Mail
} from 'lucide-react'
import { Footer } from '@/hooks/footer'

export const Route = createFileRoute('/_public/privacy-policy')({
  component: PrivacyComponent,
})

function PrivacyComponent() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const primaryColor = getThemeColor(theme, 'primary')
  const textColor = getThemeColor(theme, 'text')
  const textSecondary = getThemeColor(theme, 'textSecondary')

  return (
    <div
      style={{
        backgroundColor: getThemeColor(theme, 'background'),
        color: textColor,
        minHeight: '100vh'
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          padding: '8rem 2rem 4rem',
          textAlign: 'center',
          background: `${primaryColor}10`
        }}
      >
        <ShieldCheck
          size={60}
          color={primaryColor}
          style={{ margin: '0 auto 1.5rem' }}
        />
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, margin: 0 }}>
          Privacy <span style={{ color: primaryColor }}>Policy</span>
        </h1>
        <p style={{ color: textSecondary, marginTop: '1rem', fontWeight: 500 }}>
          Last Updated: April 2026
        </p>
      </div>

      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '4rem 2rem', lineHeight: 1.8 }}>
        
        {/* Section 1: Info Collection */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}>
            <Database size={22} />
            1. Information We Collect & Use
          </h2>
          <p>
            We collect personal information such as name, email, phone number, and bank account details (for referral payouts) to provide and improve our services.
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Providing and improving our services</li>
            <li>Processing course enrollments and referral commissions</li>
            <li>Customer support and communication</li>
            <li>Service optimization and user experience improvements</li>
          </ul>
        </section>

        {/* NEW Section: Referral Program (KYC ke liye zaroori) */}
        <section style={{ marginBottom: '3rem', padding: '2rem', borderRadius: '16px', border: `1px solid ${primaryColor}30`, background: isDark ? '#ffffff03' : '#00000003' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}>
            <Users size={22} />
            2. Referral Program & Earnings
          </h2>
          <p>
            Our platform includes a referral system. When you participate, we collect data related to your referred users to calculate commissions accurately.
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>We track referral links and successful conversions.</li>
            <li>Earnings are disbursed after verifying the validity of the transaction and subject to our refund policy.</li>
            <li>User data of referred individuals is handled with the same privacy standards.</li>
          </ul>
        </section>

        {/* Section 3: Sharing */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}>
            <Eye size={22} />
            3. Information Sharing
          </h2>
          <p>We may share information with payment processors (like Razorpay) to facilitate transactions and payouts. We do not sell your personal information to third parties.</p>
        </section>

        {/* Section 4: Cookies */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}>
            <Lock size={22} />
            4. Cookies & Tracking
          </h2>
          <p>We use cookies to remember login settings and analyze traffic to improve our learning platform.</p>
        </section>

        {/* Section 5: Security */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}>
            <ShieldCheck size={22} />
            5. Data Security
          </h2>
          <p>We use industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>
        </section>

        {/* NEW Section: Contact Info (Reviewer ise check karega) */}
        <section style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', borderTop: `1px solid ${primaryColor}20` }}>
          <h2 style={{ fontSize: '1.5rem', color: primaryColor, marginBottom: '1rem' }}>
            Contact Us
          </h2>
          <p style={{ color: textSecondary }}>
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
            <Mail size={18} color={primaryColor} />
            techdmadvance@gmail.com
          </div>
          <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
            DM Advance Tech <br />
            Gurugram, Haryana, India
          </p>
        </section>

      </div>
      <Footer />
    </div>
  )
}