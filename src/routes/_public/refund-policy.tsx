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
  const primaryColor = getThemeColor(theme, 'primary')

  return (
    <div
      style={{
        backgroundColor: getThemeColor(theme, 'background'),
        color: getThemeColor(theme, 'text'),
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

        <h1
          style={{
            fontSize: 'clamp(2rem,5vw,3rem)',
            fontWeight: 900,
            margin: 0
          }}
        >
          Refund <span style={{ color: primaryColor }}>Policy</span>
        </h1>
      </div>

      <div
        style={{
          maxWidth: '850px',
          margin: '0 auto',
          padding: '4rem 2rem',
          lineHeight: 1.8
        }}
      >

        {/* Main Notice */}
        <div
          style={{
            padding: '2rem',
            borderRadius: '20px',
            border: `2px dashed ${primaryColor}40`,
            marginBottom: '3rem',
            textAlign: 'center'
          }}
        >
          <h2 style={{ fontSize: '1.4rem', margin: '0 0 1rem' }}>
            24-Hour Refund Policy
          </h2>

          <p>
            At <strong>DM ADVANCE TECH</strong>, our commitment is to ensure
            your satisfaction and success in your learning journey.
            Customers may request a refund within <strong>24 hours</strong> of the
            original transaction.
          </p>

          <p>
            Refund requests after the 24-hour window will not be entertained.
          </p>
        </div>


        <section style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '1.5rem',
              color: primaryColor
            }}
          >
            <CreditCard size={22} />
            1. Refund Deductions
          </h2>

          <p>
            Approved refunds are subject to:
          </p>

          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>2% Payment Gateway Fee (on paid amount)</li>
            <li>5% Processing Fee (on paid amount)</li>
          </ul>

          <p>
            These deductions apply to all eligible refunds.
          </p>
        </section>


        <section style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '1.5rem',
              color: primaryColor
            }}
          >
            <CheckCircle size={22} />
            2. Important Disclaimer
          </h2>

          <p>
            Our company strictly adheres to the
            <strong> 24-hour refund window</strong>.
            Requests submitted beyond this period will not be processed.
          </p>
        </section>


        <section style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '1.5rem',
              color: primaryColor
            }}
          >
            <HelpCircle size={22} />
            3. Refund Request Process
          </h2>

          <p>
            To request a refund email us at:
            <strong> techdmadvance@gmail.com</strong>
          </p>

          <p>
            Send the request only from your registered email ID and include:
          </p>

          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Full Name</li>
            <li>Registered Email ID</li>
            <li>Registration Date</li>
            <li>Payment Invoice Screenshot (with date & time)</li>
            <li>Reason for Refund</li>
          </ul>
        </section>

      </div>

      <Footer />
    </div>
  )
}