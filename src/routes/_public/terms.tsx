import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from "@/theme/ThemeProvider"
import { getThemeColor } from "@/theme/themeConfig"
import {
  FileText,
  Scale,
  UserCheck,
  AlertTriangle
} from 'lucide-react'
import { Footer } from '@/hooks/footer'

export const Route = createFileRoute('/_public/terms')({
  component: TermsComponent,
})

function TermsComponent() {

  const { theme } = useTheme()

  const primaryColor = getThemeColor(theme, 'primary')
  const textColor = getThemeColor(theme, 'text')
  const isDark = theme === 'dark'

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
        <FileText
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
          Terms & <span style={{ color: primaryColor }}>Conditions</span>
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
            <UserCheck size={22} />
            1. Acceptance of Terms
          </h2>

          <p>
            Welcome to <strong>DM Advance Tech</strong>.
            By accessing or using our website and services,
            you agree to be bound by these Terms and our Privacy Policy.
            If you do not agree, you should not use the Service.
          </p>

          <p>
            These Terms apply to all visitors, users and customers
            using the platform.
          </p>

        </section>




        <section
          style={{
            marginBottom: '3rem',
            padding: '2rem',
            borderRadius: '16px',
            border: `1px solid ${primaryColor}30`,
            background: isDark ? '#ffffff03' : '#00000003'
          }}
        >
          <h2
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '1.5rem',
              color: primaryColor
            }}
          >
            <AlertTriangle size={22} />
            2. Disclaimer & User Responsibility
          </h2>

          <p>
            We strive to provide accurate guidance, quality products
            and valuable learning resources. However, we do not guarantee
            specific results, profits, success or outcomes.
          </p>

          <p>
            Any success achieved through the use of our services depends on
            individual effort, skill, experience, consistency, decision-making
            and implementation.
          </p>

          <p>
            Likewise, any failure, losses or unsatisfactory results may arise
            from personal choices, market risks, business uncertainties or
            other factors beyond our control.
          </p>

          <p>
            By using our services, you acknowledge that both success and failure
            are subject to individual circumstances, and
            <strong> DM Advance Tech</strong> shall not be held responsible for
            either profits gained or losses incurred from applying our content,
            products or services.
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
            <Scale size={22} />
            3. Content & Intellectual Property
          </h2>

          <p>
            You are responsible for any content you submit or share
            through our Service.
            You confirm such content does not violate the rights of others.
          </p>

          <p>
            All platform materials including videos,
            documents, resources and training content belong to
            <strong> DM Advance Tech</strong>.
            Unauthorized copying, resale, redistribution or commercial use
            without written permission is prohibited.
          </p>

          <p>
            We reserve the right to remove content or terminate accounts
            in cases of infringement or misuse.
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
            <UserCheck size={22} />
            4. User Conduct & Account Termination
          </h2>

          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Users must provide truthful information</li>
            <li>No misrepresentation or misuse of the platform</li>
            <li>Violation of terms may lead to account suspension or termination</li>
            <li>Users should periodically review updated terms</li>
          </ul>

          <p>
            We reserve the right to modify these Terms at any time.
            Material changes may be communicated to users.
          </p>

        </section>




        <section
          style={{
            marginBottom: '3rem',
            padding: '2rem',
            borderRadius: '16px',
            border: `1px solid ${primaryColor}30`,
            background: isDark ? '#ffffff03' : '#00000003'
          }}
        >

          <h2
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '1.5rem',
              color: primaryColor
            }}
          >
            <FileText size={22} />
            5. Digital Delivery (Shipping Policy)
          </h2>

          <p>
            Our products are digital products delivered electronically
            through email or our platform.
            No physical shipping is involved.
          </p>

          <p>
            Access details or digital products are provided through
            the registered email or user account after purchase.
          </p>

        </section>

      </div>

      <Footer />
    </div>
  )
}