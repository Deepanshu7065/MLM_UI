import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router'
import { useAppForm } from '@/hooks/useAppForm'
import { FormInput, PasswordInput } from '@/components/form/FormInput'
import { NavList } from '@/components/Layout/NavList'
import { createUser } from '@/hooks/useUser'
import { useTheme } from '@/theme/ThemeProvider'
import { getThemeColor } from '@/theme/themeConfig'
import { User, Mail, Phone, Lock, Hash, Zap, Loader2 } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_auth/sign-up')({
  beforeLoad: () => {
    const auth = localStorage.getItem("token") || "";
    if (auth) throw redirect({ to: "/dashboard" });
  },
  component: SignUpPage,
})

function SignUpPage() {
  const { mutateAsync, isPending } = createUser()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [_, setApiError] = useState<string | null>(null)

  const primaryColor = getThemeColor(theme, 'primary')
  const bgColor = getThemeColor(theme, 'background')
  const panelBg = getThemeColor(theme, 'backgroundSecondary')
  const textColor = getThemeColor(theme, 'text')
  const textSecondary = getThemeColor(theme, 'textSecondary')
  const borderColor = getThemeColor(theme, 'border')
  const btnText = theme === 'dark' ? '#000000' : '#ffffff'

  const form = useAppForm({
    defaultValues: { email: '', name: '', phone: '', password: '', referalCode: '' },
    onSubmit: async ({ value }: any) => {
      setApiError(null)
      try {
        const res = await mutateAsync({ data: value });
        localStorage.setItem("token", res.token);
        localStorage.setItem("auth", JSON.stringify({ userId: res?.user.userId }));
        navigate({ to: "/dashboard" });
      } catch (err: any) {
        setApiError(err?.response?.data?.message || "Registration failed")
      }
    }
  });

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', backgroundColor: bgColor, color: textColor, transition: 'all 0.3s ease' }}>
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .responsive-container { display: flex; flex: 1; width: 100%; }
        .left-section { flex: 1.1; display: flex; position: relative; overflow: hidden; background: ${panelBg}; border-right: 1px solid ${borderColor}; }
        .right-section { flex: 1.3; display: flex; align-items: center; justify-content: center; padding: 2rem; background: ${bgColor}; }
        
        .title-h1 { font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 900; }
        .title-h2 { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; }
        .sub-text { font-size: clamp(0.85rem, 2vw, 1rem); color: ${textSecondary}; margin: 0.5rem 0; }
        .label-text { font-size: 0.75rem; font-weight: 700; color: ${textSecondary}; text-transform: uppercase; margin-bottom: 5px; display: block; }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

        @media (max-width: 1024px) {
          .left-section { display: none; }
          .form-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .right-section { padding: 1rem; }
          .input-wrapper input { height: 46px !important; font-size: 14px !important; }
        }

        .input-wrapper input {
          width: 100%; height: 48px; background: ${isDark ? 'rgba(255,255,255,0.03)' : '#fff'} !important;
          border: 1px solid ${borderColor} !important; border-radius: 12px !important; color: ${textColor} !important;
          padding-left: 42px !important; outline: none !important; transition: 0.2s;
        }
        .input-wrapper input:focus { border-color: ${primaryColor} !important; }
      `}</style>

      <div style={{ zIndex: 50 }}><NavList /></div>

      <div className="responsive-container">
        <div className="left-section">
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${primaryColor}22 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
          <div style={{ margin: 'auto', textAlign: 'center', zIndex: 10 }}>
            <div style={{ width: 70, height: 70, borderRadius: '20px', backgroundColor: primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', animation: 'float 5s infinite' }}>
              <Zap size={35} color={btnText} fill={btnText} />
            </div>
            <h1 className="title-h1">Join Us</h1>
            <p className="sub-text">Create account to start earning.</p>
          </div>
        </div>

        <div className="right-section">
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 className="title-h2">Create Account</h2>
              <p className="sub-text">Fill in details to get started</p>
            </div>

            <form.AppForm form={form}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="input-wrapper">
                  <label className="label-text">Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: primaryColor }} />
                    <form.AppField name="name">{(field: any) => <FormInput field={field} placeholder="Enter full name" />}</form.AppField>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="input-wrapper">
                    <label className="label-text">Email</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: primaryColor }} />
                      <form.AppField name="email">{(field: any) => <FormInput field={field} type="email" placeholder="Email" />}</form.AppField>
                    </div>
                  </div>
                  <div className="input-wrapper">
                    <label className="label-text">Password</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: primaryColor }} />
                      <form.AppField name="password">{(field: any) => <PasswordInput field={field} placeholder="••••••••" />}</form.AppField>
                    </div>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="input-wrapper">
                    <label className="label-text">Phone</label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: primaryColor }} />
                      <form.AppField name="phone">{(field: any) => <FormInput field={field} placeholder="Phone" />}</form.AppField>
                    </div>
                  </div>
                  <div className="input-wrapper">
                    <label className="label-text">Referral</label>
                    <div style={{ position: 'relative' }}>
                      <Hash size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: primaryColor }} />
                      <form.AppField name="referalCode">{(field: any) => <FormInput field={field} placeholder="Code" />}</form.AppField>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={isPending} style={{ width: '100%', height: '50px', backgroundColor: primaryColor, color: btnText, borderRadius: '12px', border: 'none', fontWeight: 700, marginTop: '2rem', cursor: 'pointer', boxShadow: `0 8px 15px ${primaryColor}33` }}>
                {isPending ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
              </button>

              <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem' }}>
                Already have account? <Link to="/sign-in" style={{ color: primaryColor, fontWeight: 700 }}>Sign In</Link>
              </p>
            </form.AppForm>
          </div>
        </div>
      </div>
    </div>
  )
}