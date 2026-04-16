import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from "@/theme/ThemeProvider"
import { getThemeColor } from "@/theme/themeConfig"
import { ShieldCheck, Lock, Eye, Database } from 'lucide-react'
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
    <div style={{ backgroundColor: getThemeColor(theme, 'background'), color: textColor, minHeight: '100vh' }}>
      <div style={{ padding: '8rem 2rem 4rem', textAlign: 'center', background: `${primaryColor}10`, position: 'relative', overflow: 'hidden' }}>
        <ShieldCheck size={60} color={primaryColor} style={{ margin: '0 auto 1.5rem', opacity: 0.8 }} />
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, margin: 0 }}>Privacy <span style={{ color: primaryColor }}>Policy</span></h1>
        <p style={{ color: textSecondary, marginTop: '1rem', fontWeight: 500 }}>Last Updated: April 2026</p>
      </div>
      
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '4rem 2rem', lineHeight: 1.8 }}>
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}><Database size={22}/> 1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you register for a course, including your name, email address, phone number, and billing information.</p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}><Eye size={22}/> 2. How We Use Information</h2>
          <p>Your data is used to provide access to our educational content, process transactions through Razorpay, and communicate updates regarding your account or new courses.</p>
        </section>

        <section style={{ marginBottom: '3rem', padding: '2rem', borderRadius: '16px', border: `1px solid ${primaryColor}30`, background: isDark ? '#ffffff03' : '#00000003' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}><Lock size={22}/> 3. Payment Security</h2>
          <p><strong>DM Advance Tech</strong> does not store your card or UPI details. All payments are processed through <strong>Razorpay</strong>, which is a PCI-DSS compliant payment gateway, ensuring the highest level of security for your transactions.</p>
        </section>
      </div>
      <Footer />
    </div>
  )
}