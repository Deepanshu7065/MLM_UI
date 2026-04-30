import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from "@/theme/ThemeProvider"
import { getThemeColor } from "@/theme/themeConfig"
import {
  ShieldCheck,
  Lock,
  Eye,
  Database
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

        <h1
          style={{
            fontSize: 'clamp(2rem,5vw,3rem)',
            fontWeight: 900,
            margin: 0
          }}
        >
          Privacy <span style={{ color: primaryColor }}>Policy</span>
        </h1>

        <p style={{
          color: textSecondary,
          marginTop: '1rem',
          fontWeight: 500
        }}>
          Last Updated: April 2026
        </p>
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
            <Database size={22} />
            1. Information We Collect & Use
          </h2>

          <p>
            We collect personal information you provide such as name,
            email, phone number and account details to provide and improve
            our services.
          </p>

          <p>
            We may use your information for:
          </p>

          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Providing and improving our services</li>
            <li>Customer support and communication</li>
            <li>Analytics and usage trend analysis</li>
            <li>Marketing and promotional effectiveness</li>
            <li>Service optimization and user experience improvements</li>
          </ul>

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
            <Eye size={22} />
            2. Information Sharing
          </h2>

          <p>
            We may share information only when necessary:
          </p>

          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>With service providers supporting our platform</li>
            <li>With affiliates or business partners for services/promotions</li>
            <li>During merger, acquisition or business transfer</li>
            <li>When required by law or legal authorities</li>
            <li>With your consent for specific purposes</li>
          </ul>

          <p>
            We do not sell  your personal information.
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
            <Lock size={22} />
            3. Cookies & Tracking Technologies
          </h2>

          <p>
            We use cookies, web beacons and similar technologies to:
          </p>

          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Enable essential website functionality</li>
            <li>Remember preferences and login settings</li>
            <li>Analyze traffic and improve services</li>
            <li>Measure performance of content and campaigns</li>
          </ul>

          <p>
            Our website may use session cookies and persistent cookies.
            You may disable cookies through your browser settings.
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
            <ShieldCheck size={22} />
            4. Your Rights & Data Control
          </h2>

          <p>
            You may request to access, update or delete your personal data
            through your account settings or by contacting us.
          </p>

          <p>
            Some information may be retained where required by legal or
            regulatory obligations.
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
            <Lock size={22} />
            5. Data Security & Legal Disclosure
          </h2>

          <p>
            We use commercially reasonable security measures to protect
            your personal data.
          </p>

          <p>
            While we strive for strong protection, no internet transmission
            or storage system is completely secure.
          </p>

          <p>
            We may disclose information when necessary to:
          </p>

          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Comply with legal obligations</li>
            <li>Prevent fraud or misuse</li>
            <li>Protect users, company rights or public safety</li>
            <li>Defend against legal claims</li>
          </ul>

        </section>


      </div>

      <Footer />
    </div>
  )
}