import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from "@/theme/ThemeProvider"
import { getThemeColor } from "@/theme/themeConfig"
import {
  FileText,
  Scale,
  UserCheck,
  AlertTriangle,
  Users,
  Gavel
} from 'lucide-react'
import { Footer } from '@/hooks/footer'

export const Route = createFileRoute('/_public/terms')({
  component: TermsComponent,
})

function TermsComponent() {
  const { theme } = useTheme()
  const primaryColor = getThemeColor(theme, 'primary')
  const textColor = getThemeColor(theme, 'text')
  const textSecondary = getThemeColor(theme, 'textSecondary')
  const isDark = theme === 'dark'

  return (
    <div
      style={{
        backgroundColor: getThemeColor(theme, 'background'),
        color: textColor,
        minHeight: '100vh'
      }}
    >
      {/* Header Section */}
      <div
        style={{
          padding: '8rem 2rem 4rem',
          textAlign: 'center',
          background: `${primaryColor}10`
        }}
      >
        <FileText
          size={60}
          color={primaryColor}
          style={{ margin: '0 auto 1.5rem' }}
        />
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, margin: 0 }}>
          Terms & <span style={{ color: primaryColor }}>Conditions</span>
        </h1>
        <p style={{ color: textSecondary, marginTop: '1rem' }}>Please read these terms carefully before using our services.</p>
      </div>

      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '4rem 2rem', lineHeight: 1.8 }}>

        {/* Section 1: Acceptance */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}>
            <UserCheck size={22} />
            1. Acceptance of Terms
          </h2>
          <p>
            Welcome to <strong>DM Advance Tech</strong>. By accessing our platform, you agree to comply with these Terms, our Privacy Policy, and Refund Policy. Our services are intended for users who are at least 18 years of age.
          </p>
        </section>

        {/* Section 2: Disclaimer */}
        <section style={{ marginBottom: '3rem', padding: '2rem', borderRadius: '16px', border: `1px solid ${primaryColor}30`, background: isDark ? '#ffffff03' : '#00000003' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}>
            <AlertTriangle size={22} />
            2. Earnings & Success Disclaimer
          </h2>
          <p>
            Our educational courses and referral programs are designed to provide knowledge and promotional opportunities. <strong>DM Advance Tech does not guarantee specific financial results, profits, or success.</strong>
          </p>
          <p>
            Any income claims or examples shown are extraordinary results and are not intended to represent or guarantee that anyone will achieve the same results. Success depends on individual dedication, skill, and effort.
          </p>
        </section>

        {/* NEW Section 3: Referral Program & Payouts (Zaroori for KYC) */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}>
            <Users size={22} />
            3. Referral Program & Payouts
          </h2>
          <p>Users participating in our referral program must adhere to the following:</p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><strong>Eligibility:</strong> Commissions are earned only on successful, verified course purchases made through your unique referral link.</li>
            <li><strong>Payouts:</strong> Commissions are processed and disbursed after the 24-hour refund window has passed.</li>
            <li><strong>Taxes:</strong> All referral earnings are subject to applicable taxes (TDS) as per Government of India regulations.</li>
            <li><strong>Anti-Fraud:</strong> Any attempt to manipulate the system or create fake accounts will lead to immediate termination without payout.</li>
          </ul>
        </section>

        {/* Section 4: Intellectual Property */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}>
            <Scale size={22} />
            4. Content Ownership
          </h2>
          <p>
            All materials, including videos, PDFs, and training modules, are the intellectual property of <strong>DM Advance Tech</strong>. Unauthorized sharing, recording, or reselling of this content is strictly prohibited and may lead to legal action.
          </p>
        </section>

        {/* Section 5: Digital Delivery */}
        <section style={{ marginBottom: '3rem', padding: '2rem', borderRadius: '16px', border: `1px solid ${primaryColor}30`, background: isDark ? '#ffffff03' : '#00000003' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}>
            <FileText size={22} />
            5. Digital Delivery Policy
          </h2>
          <p>
            As we provide digital services/courses, delivery happens instantly or within 24 hours of successful payment via your registered dashboard or email. No physical shipping is involved.
          </p>
        </section>

        {/* NEW Section 6: Governing Law (Zaroori for KYC) */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}>
            <Gavel size={22} />
            6. Governing Law
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in <strong>Gurugram, Haryana</strong>.
          </p>
        </section>

      </div>
      <Footer />
    </div>
  )
}