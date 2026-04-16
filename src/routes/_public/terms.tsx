import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from "@/theme/ThemeProvider"
import { getThemeColor } from "@/theme/themeConfig"
import { FileText, Scale, UserCheck, AlertTriangle } from 'lucide-react'
import { Footer } from '@/hooks/footer'

export const Route = createFileRoute('/_public/terms')({
  component: TermsComponent,
})

function TermsComponent() {
  const { theme } = useTheme()
  const primaryColor = getThemeColor(theme, 'primary')
  const textColor = getThemeColor(theme, 'text')

  return (
    <div style={{ backgroundColor: getThemeColor(theme, 'background'), color: textColor, minHeight: '100vh' }}>
      <div style={{ padding: '8rem 2rem 4rem', textAlign: 'center', background: `${primaryColor}10` }}>
        <FileText size={60} color={primaryColor} style={{ margin: '0 auto 1.5rem' }} />
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, margin: 0 }}>Terms & <span style={{ color: primaryColor }}>Conditions</span></h1>
      </div>

      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '4rem 2rem', lineHeight: 1.8 }}>
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}><UserCheck size={22} /> 1. Account Eligibility</h2>
          <p>By using <strong>DM Advance Tech</strong>, you represent that you are at least 18 years of age or are accessing the site under the supervision of a parent or guardian. You are responsible for maintaining the confidentiality of your account credentials.</p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}><Scale size={22} /> 2. Intellectual Property</h2>
          <p>All content provided on this platform, including videos, PDFs, and code snippets, is the property of <strong>MD TECH PRIVATE LIMITED</strong>. Unauthorized distribution or commercial use of our materials is strictly prohibited.</p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}><AlertTriangle size={22} /> 3. Limitation of Liability</h2>
          <p>We strive for 100% uptime and accurate content, but we do not guarantee that the platform will be error-free. <strong>MD TECH PRIVATE LIMITED</strong> is not liable for any indirect damages resulting from the use of our services.</p>
        </section>
      </div>
      <Footer />
    </div>
  )
}