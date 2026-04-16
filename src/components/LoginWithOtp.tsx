import { useEffect, useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { ArrowLeft, Mail, ShieldCheck, User, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { FormInput } from "./form/FormInput"
import { useAppForm } from "@/hooks/useAppForm"
import { SendCodeOtp, VerifyCodeOtp } from "@/hooks/useUser"
import { useTheme } from "@/theme/ThemeProvider"
import { getThemeColor } from "@/theme/themeConfig"

export function LoginWithOtp({ open, onOpenChange, onSuccess }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}) {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [verifyStep, setVerifyStep] = useState(false)
  const [emailValue, setEmailValue] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const { mutateAsync: sendCode } = SendCodeOtp()
  const { mutateAsync: verifyCode } = VerifyCodeOtp()

  // Theme Colors
  const primaryColor = getThemeColor(theme, "primary")
  const bgColor = getThemeColor(theme, "background")
  const textColor = getThemeColor(theme, "text")
  const textSec = getThemeColor(theme, "textSecondary")
  const borderColor = getThemeColor(theme, "border")
  const btnText = isDark ? "#000" : "#fff"

  const sendForm = useAppForm({
    defaultValues: { userId: "", email: "" },
    onSubmit: async ({ value }: any) => {
      setErrorMessage(""); setLoading(true);
      try {
        const res = await sendCode({ data: value })
        if (res?.success) { setEmailValue(value.email); setVerifyStep(true); }
        else setErrorMessage(res?.error || "Failed to send OTP")
      } catch (err: any) { setErrorMessage(err?.response?.data?.error || "Error occurred") }
      finally { setLoading(false) }
    },
  })

  const verifyForm = useAppForm({
    defaultValues: { email: "", code: "", userId: "" },
    onSubmit: async ({ value }: any) => {
      setErrorMessage(""); setLoading(true);
      try {
        const res = await verifyCode({ data: value })
        if (res?.success) {
          localStorage.setItem("token", res.token)
          localStorage.setItem("auth", JSON.stringify({ userId: value.userId }))
          handleClose(); onSuccess ? onSuccess() : navigate({ to: "/dashboard" })
        } else setErrorMessage(res?.error || "Invalid OTP")
      } catch (err: any) { setErrorMessage(err?.response?.data?.error || "Failed") }
      finally { setLoading(false) }
    },
  })

  useEffect(() => {
    if (verifyStep) {
      verifyForm.setFieldValue("email", emailValue)
      verifyForm.setFieldValue("userId", sendForm.getFieldValue("userId"))
    }
  }, [verifyStep])

  const handleClose = () => {
    sendForm.reset(); verifyForm.reset();
    setVerifyStep(false); setErrorMessage(""); onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && handleClose()}>
      <DialogContent style={{
        backgroundColor: bgColor, color: textColor, border: `1px solid ${borderColor}`,
        borderRadius: '16px', maxWidth: '400px', padding: '24px'
      }}>
        <DialogHeader style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {verifyStep && <ArrowLeft size={20} onClick={() => setVerifyStep(false)} style={{ cursor: 'pointer', color: primaryColor }} />}
            <DialogTitle style={{ fontSize: '1.5rem', fontWeight: 700 }}>
              {verifyStep ? "Verify Code" : "OTP Login"}
            </DialogTitle>
          </div>
          <DialogDescription style={{ color: textSec }}>
            {verifyStep ? `Sent to ${emailValue}` : "Enter details to get security code"}
          </DialogDescription>
        </DialogHeader>

        {errorMessage && (
          <div style={{
            padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '0.8rem',
            backgroundColor: isDark ? 'rgba(239,68,68,0.1)' : '#fef2f2', color: isDark ? '#f87171' : '#dc2626'
          }}>{errorMessage}</div>
        )}

        {!verifyStep ? (
          <sendForm.AppForm form={sendForm}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: primaryColor, zIndex: 1 }} />
                <sendForm.AppField name="userId">
                  {(field) => <FormInput field={field} placeholder="User ID" style={{ paddingLeft: '40px' }} />}
                </sendForm.AppField>
              </div>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: primaryColor, zIndex: 1 }} />
                <sendForm.AppField name="email">
                  {(field) => <FormInput field={field} placeholder="Email" type="email" style={{ paddingLeft: '40px' }} />}
                </sendForm.AppField>
              </div>
              <Button type="submit" disabled={loading} style={{
                height: '48px', backgroundColor: primaryColor, color: btnText, borderRadius: '10px', fontWeight: 600
              }}>
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Send OTP"}
              </Button>
            </div>
          </sendForm.AppForm>
        ) : (
          <verifyForm.AppForm form={verifyForm}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <ShieldCheck size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: primaryColor, zIndex: 1 }} />
                <verifyForm.AppField name="code">
                  {(field) => <FormInput field={field} placeholder="6-digit code" style={{ paddingLeft: '40px', letterSpacing: '2px' }} />}
                </verifyForm.AppField>
              </div>
              <Button type="submit" disabled={loading} style={{
                height: '48px', backgroundColor: primaryColor, color: btnText, borderRadius: '10px', fontWeight: 600
              }}>
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Verify & Login"}
              </Button>
            </div>
          </verifyForm.AppForm>
        )}
      </DialogContent>
    </Dialog>
  )
}