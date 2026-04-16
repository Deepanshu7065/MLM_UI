import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router'
import { useAppForm } from '@/hooks/useAppForm'
import { FormInput, PasswordInput } from '@/components/form/FormInput'
import { NavList } from '@/components/Layout/NavList'
import { VerifyPassword } from '@/hooks/useUser'
import { useTheme } from '@/theme/ThemeProvider'
import { getThemeColor } from '@/theme/themeConfig'
import { User, Lock, Zap, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { LoginWithOtp } from '@/components/LoginWithOtp'
import { ForgotPasswordModal } from '@/components/ForgotPasswordModal'

export const Route = createFileRoute('/_auth/sign-in')({
  beforeLoad: () => {
    const auth = localStorage.getItem("token") || "";
    if (auth) throw redirect({ to: "/dashboard" });
  },
  component: SignInPage,
})

function SignInPage() {
  const { mutateAsync, isPending } = VerifyPassword()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [apiError, setApiError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [forgotOpen, setForgotOpen] = useState(false)

  // Theme Colors
  const primaryColor = getThemeColor(theme, 'primary')
  const bgColor = getThemeColor(theme, 'background')
  const panelBg = getThemeColor(theme, 'backgroundSecondary')
  const textColor = getThemeColor(theme, 'text')
  const textSecondary = getThemeColor(theme, 'textSecondary')
  const borderColor = getThemeColor(theme, 'border')
  const btnText = theme === 'dark' ? '#000000' : '#ffffff'

  const form = useAppForm({
    defaultValues: { userId: '', password: '' },
    onSubmit: async ({ value }: any) => {
      setApiError(null)
      try {
        const res = await mutateAsync({ data: value });
        localStorage.setItem("token", res.token);
        localStorage.setItem("auth", JSON.stringify({ userId: value.userId }));
        navigate({ to: "/dashboard" });
      } catch (err: any) {
        setApiError(err?.response?.data?.message || "Invalid credentials")
      }
    }
  });

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: bgColor,
      color: textColor,
      transition: 'all 0.3s ease'
    }}>
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .responsive-container { display: flex; flex: 1; width: 100%; }
        .left-section { flex: 1.2; display: flex; position: relative; overflow: hidden; background: ${panelBg}; border-right: 1px solid ${borderColor}; }
        .right-section { flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem; background: ${bgColor}; }
        
        .title-h1 { font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 900; letter-spacing: -1px; }
        .title-h2 { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; }
        .sub-text { font-size: clamp(0.85rem, 2vw, 1rem); color: ${textSecondary}; margin: 1rem auto; }
        .label-text { font-size: 0.75rem; font-weight: 700; color: ${textSecondary}; text-transform: uppercase; margin-bottom: 6px; display: block; }

        @media (max-width: 1024px) {
          .left-section { display: none; }
          .right-section { flex: 1; padding: 1.5rem; }
        }

        @media (max-width: 640px) {
          .input-wrapper input { height: 46px !important; font-size: 14px !important; padding-left: 40px !important; }
          .right-section { padding: 1rem; }
        }

        .input-wrapper input {
          width: 100%; height: 50px; background: ${isDark ? 'rgba(255,255,255,0.03)' : '#fff'} !important;
          border: 1px solid ${borderColor} !important; border-radius: 12px !important; color: ${textColor} !important;
          padding-left: 45px !important; outline: none !important; transition: all 0.2s;
        }
        .input-wrapper input:focus { border-color: ${primaryColor} !important; box-shadow: 0 0 0 2px ${primaryColor}33 !important; }
      `}</style>

      <div style={{ zIndex: 50 }}><NavList /></div>

      <div className="responsive-container">
        {/* Left Section - Branding */}
        <div className="left-section">
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(${primaryColor}22 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
          <div style={{ margin: 'auto', textAlign: 'center', zIndex: 10 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '22px',
              backgroundColor: primaryColor, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem', animation: 'float 5s ease-in-out infinite',
              boxShadow: `0 15px 35px ${primaryColor}44`
            }}>
              <Zap size={40} color={btnText} fill={btnText} />
            </div>
            <h1 className="title-h1">DM Advance Tech</h1>
            <p className="sub-text" style={{ maxWidth: '350px' }}>Join the next generation of learning.</p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="right-section">
          <div style={{ width: '100%', maxWidth: '380px' }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 className="title-h2">Welcome Back</h2>
              <p className="sub-text" style={{ margin: 0 }}>Enter your credentials to continue</p>
            </div>

            {apiError && (
              <div style={{
                padding: '12px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.8rem',
                backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#fee2e2',
                color: isDark ? '#f87171' : '#dc2626',
                border: `1px solid ${isDark ? 'rgba(239, 68, 68, 0.2)' : '#fecaca'}`
              }}>
                {apiError}
              </div>
            )}

            <form.AppForm form={form}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="input-wrapper">
                  <label className="label-text">User ID</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: primaryColor }} />
                    <form.AppField name="userId">
                      {(field: any) => <FormInput field={field} placeholder="Enter your ID" />}
                    </form.AppField>
                  </div>
                </div>

                <div className="input-wrapper">
                  <label className="label-text">Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: primaryColor }} />
                    <form.AppField name="password">
                      {(field: any) => <PasswordInput field={field} placeholder="••••••••" />}
                    </form.AppField>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  style={{ background: 'none', border: 'none', color: primaryColor, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Forgot Password?
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  style={{ background: 'none', border: 'none', color: textSecondary, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Login with OTP
                </button>
              </div>

              <button
                type="submit"
                disabled={isPending}
                style={{
                  width: '100%', height: '52px', backgroundColor: primaryColor, color: btnText,
                  borderRadius: '12px', border: 'none', fontWeight: 700, fontSize: '1rem',
                  marginTop: '2rem', cursor: isPending ? 'not-allowed' : 'pointer',
                  boxShadow: `0 10px 20px ${primaryColor}44`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: '10px'
                }}
              >
                {isPending ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
              </button>

              <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: textSecondary }}>
                New here? <Link to="/sign-up" style={{ color: primaryColor, fontWeight: 700, textDecoration: 'none' }}>Create Account</Link>
              </p>
            </form.AppForm>
          </div>
        </div>
      </div>

      <LoginWithOtp open={open} onOpenChange={setOpen} />
      <ForgotPasswordModal open={forgotOpen} onOpenChange={setForgotOpen} />
    </div>
  )
}