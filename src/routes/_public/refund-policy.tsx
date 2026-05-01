import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from "@/theme/ThemeProvider"
import { getThemeColor } from "@/theme/themeConfig"
import { RotateCcw, CheckCircle, CreditCard, HelpCircle, Clock, AlertTriangle } from 'lucide-react'
import { Footer } from '@/hooks/footer'

export const Route = createFileRoute('/_public/refund-policy')({
  component: RefundComponent,
})

function RefundComponent() {
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
      <div
        style={{
          padding: '8rem 2rem 4rem',
          textAlign: 'center',
          background: `${primaryColor}10`
        }}
      >
        <RotateCcw
          size={60}
          color={primaryColor}
          style={{ margin: '0 auto 1.5rem' }}
        />

        <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, margin: 0 }}>
          Refund <span style={{ color: primaryColor }}>Policy</span>
        </h1>
      </div>

      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '4rem 2rem', lineHeight: 1.8 }}>

        {/* Main Notice */}
        <div
          style={{
            padding: '2rem',
            borderRadius: '20px',
            border: `2px dashed ${primaryColor}40`,
            marginBottom: '3rem',
            textAlign: 'center',
            background: isDark ? '#ffffff03' : '#00000003'
          }}
        >
          <h2 style={{ fontSize: '1.4rem', margin: '0 0 1rem', color: primaryColor }}>
            24-Hour Refund Window
          </h2>
          <p>
            At <strong>DM ADVANCE TECH</strong>, customers may request a refund within <strong>24 hours</strong> of the original transaction. Requests beyond this window will not be entertained.
          </p>
        </div>

        {/* Section 1: Deductions */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}>
            <CreditCard size={22} />
            1. Refund Deductions
          </h2>
          <p>Approved refunds are subject to the following non-refundable charges:</p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><strong>2% Payment Gateway Fee:</strong> Charged by our payment partner.</li>
            <li><strong>5% Processing Fee:</strong> For administrative and operational costs.</li>
          </ul>
        </section>

        {/* NEW Section 2: Referral Commission Impact (Zaroori for your model) */}
        <section style={{ marginBottom: '3rem', padding: '1.5rem', borderRadius: '12px', border: `1px solid ${primaryColor}20` }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}>
            <AlertTriangle size={22} />
            2. Referral Commission reversal
          </h2>
          <p>
            If a course purchase is refunded, any <strong>referral commission</strong> or rewards generated from that transaction will be immediately reversed or deducted from the respective referrer's wallet/account.
          </p>
        </section>

        {/* NEW Section 3: Timeline (KYC Mandatory) */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}>
            <Clock size={22} />
            3. Refund Timeline
          </h2>
          <p>
            Once a refund request is approved, the amount (after deductions) will be credited back to the original payment source (Bank Account/Card/UPI) within <strong>5 to 7 working days</strong>.
          </p>
        </section>

        {/* Section 4: Request Process */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', color: primaryColor }}>
            <HelpCircle size={22} />
            4. How to Request a Refund
          </h2>
          <p>Email us at: <strong>techdmadvance@gmail.com</strong> from your registered email ID with:</p>
          <ul style={{ paddingLeft: '1.5rem', color: textSecondary }}>
            <li>Full Name & Registered Email</li>
            <li>Transaction ID or Invoice Screenshot</li>
            <li>Specific Reason for Refund</li>
          </ul>
        </section>

        {/* Final Disclaimer */}
        <p style={{ fontSize: '0.9rem', color: textSecondary, textAlign: 'center', marginTop: '4rem' }}>
          Note: DM Advance Tech reserves the right to deny refund requests that show signs of fraudulent activity or abuse of our referral system.
        </p>

      </div>
      <Footer />
    </div>
  )
}