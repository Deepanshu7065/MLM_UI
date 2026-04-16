import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from "@/theme/ThemeProvider"
import { getThemeColor } from "@/theme/themeConfig"
import { RotateCcw, CheckCircle, CreditCard, HelpCircle } from 'lucide-react'
import { Footer } from '@/hooks/footer'

export const Route = createFileRoute('/_public/refund-policy')({
  component: RefundComponent,
})

function RefundComponent() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const primaryColor = getThemeColor(theme, 'primary')

  return (
    <div style={{ backgroundColor: getThemeColor(theme, 'background'), color: getThemeColor(theme, 'text'), minHeight: '100vh' }}>
      <div style={{ padding: '8rem 2rem 4rem', textAlign: 'center', background: `${primaryColor}10` }}>
        <RotateCcw size={60} color={primaryColor} style={{ margin: '0 auto 1.5rem' }} />
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, margin: 0 }}>Refund <span style={{ color: primaryColor }}>Policy</span></h1>
      </div>

      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '4rem 2rem', lineHeight: 1.8 }}>
        <div style={{ padding: '2rem', borderRadius: '20px', border: `2px dashed ${primaryColor}40`, marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.4rem', margin: '0 0 1rem' }}>No-Refund Policy for Digital Products</h2>
          <p>Due to the nature of digital content, once a course is purchased and access is granted, <strong>DM Advance Tech</strong> generally does not offer refunds. We encourage users to watch demo videos before purchasing.</p>
        </div>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}><CreditCard size={22} /> 1. Duplicate Payments</h2>
          <p>In the event of a technical error resulting in a double payment for the same course, the duplicate amount will be refunded. Please reach out to us with proof of transaction.</p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}><CheckCircle size={22} /> 2. Refund Timeline</h2>
          <p>Approved refunds are processed to the original payment method (Bank Account/UPI/Card) within <strong>5 to 7 working days</strong>. This timeline is subject to your bank's processing speed.</p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}><HelpCircle size={22} /> 3. How to Request</h2>
          <p>To request a refund regarding duplicate payments, please email <strong>deepanshu.ss00ss.10@gmail.com</strong> with your order ID and payment receipt.</p>
        </section>
      </div>
      <Footer />
    </div>
  )
}