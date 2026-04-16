import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FormInput } from "./form/FormInput"
import { useAppForm } from "@/hooks/useAppForm"
import { ForgotSendingCode, ForgotVerifyCode, UpdatePassword } from "@/hooks/useUser"
import { ArrowLeft, Loader2, Mail, ShieldCheck, KeyRound } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import { useTheme } from "@/theme/ThemeProvider"
import { getThemeColor } from "@/theme/themeConfig"

export function ForgotPasswordModal({
    open,
    onOpenChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const navigate = useNavigate()
    const { theme } = useTheme()
    const isDark = theme === "dark"

    const [step, setStep] = useState<"email" | "otp" | "updatePassword">("email")
    const [emailValue, setEmailValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    // Theme Colors
    const primaryColor = getThemeColor(theme, "primary")
    const bgColor = getThemeColor(theme, "background")
    const textColor = getThemeColor(theme, "text")
    const textSec = getThemeColor(theme, "textSecondary")
    const borderColor = getThemeColor(theme, "border")
    const btnText = isDark ? "#000" : "#fff"

    const { mutateAsync: sendCode } = ForgotSendingCode()
    const { mutateAsync: verifyCode } = ForgotVerifyCode()
    const { mutateAsync: updatePassword } = UpdatePassword()

    const emailForm = useAppForm({
        defaultValues: { email: "", userId: "" },
        onSubmit: async (formApi: any) => {
            setErrorMessage("")
            const { email, userId } = formApi.value
            if (!email || !userId) return setErrorMessage("Please fill all fields.")
            try {
                setLoading(true)
                const res = await sendCode({ data: { email, userId } })
                if (res?.success || res?.status === "success") {
                    setEmailValue(email)
                    setStep("otp")
                } else {
                    setErrorMessage(res?.error || "User not found or failed to send OTP.")
                }
            } catch (err: any) {
                setErrorMessage(err?.response?.data?.error || "Something went wrong.")
            } finally {
                setLoading(false)
            }
        },
    })

    const otpForm = useAppForm({
        defaultValues: { email: "", code: "" },
        onSubmit: async (formApi: any) => {
            setErrorMessage("")
            const values = formApi.value
            try {
                setLoading(true)
                const res = await verifyCode({ data: values })
                if (res?.success || res?.status === "success") {
                    setStep("updatePassword")
                } else {
                    setErrorMessage(res?.error || "Invalid OTP code.")
                }
            } catch (err: any) {
                setErrorMessage(err?.response?.data?.error || "Verification failed.")
            } finally {
                setLoading(false)
            }
        },
    })

    const updateForm = useAppForm({
        defaultValues: { email: "", confirmPassword: "", userId: "" },
        onSubmit: async (formApi: any) => {
            setErrorMessage("")
            const values = formApi.value
            try {
                setLoading(true)
                const res = await updatePassword({ data: values })
                if (res?.success || res?.status === "success") {
                    localStorage.setItem("token", res.token)
                    localStorage.setItem("auth", JSON.stringify({ userId: values.userId }))
                    handleClose()
                    navigate({ to: "/dashboard" })
                }
            } catch (err: any) {
                setErrorMessage(err?.response?.data?.error || "Failed to update.")
            } finally {
                setLoading(false)
            }
        },
    })

    useEffect(() => {
        if (emailValue) {
            otpForm.setFieldValue("email", emailValue)
            updateForm.setFieldValue("email", emailValue)
            updateForm.setFieldValue("userId", emailForm.getFieldValue("userId"))
        }
    }, [emailValue])

    const handleClose = () => {
        emailForm.reset(); otpForm.reset(); updateForm.reset()
        setEmailValue(""); setErrorMessage(""); setStep("email")
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
            <DialogContent style={{ backgroundColor: bgColor, color: textColor, border: `1px solid ${borderColor}`, borderRadius: '16px', maxWidth: '420px', padding: '24px' }}>
                <DialogHeader style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {step !== "email" && (
                            <Button onClick={() => setStep(step === "updatePassword" ? "otp" : "email")} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: primaryColor }}>
                                <ArrowLeft size={20} />
                            </Button>
                        )}
                        <DialogTitle style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                            {step === "email" ? "Reset Password" : step === "otp" ? "Verify Code" : "New Password"}
                        </DialogTitle>
                    </div>
                    <DialogDescription style={{ color: textSec, marginTop: '4px' }}>
                        {step === "email" ? "Enter your ID and email to get a reset code." : step === "otp" ? `Enter the code sent to ${emailValue}` : "Set a new secure password for your account."}
                    </DialogDescription>
                </DialogHeader>

                {errorMessage && (
                    <div style={{ padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.8rem', backgroundColor: isDark ? 'rgba(239,68,68,0.1)' : '#fef2f2', color: isDark ? '#f87171' : '#dc2626', border: `1px solid ${isDark ? 'rgba(239,68,68,0.2)' : '#fee2e2'}` }}>
                        {errorMessage}
                    </div>
                )}

                {step === "email" && (
                    <emailForm.AppForm form={emailForm}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: primaryColor, zIndex: 1 }} />
                                <emailForm.AppField name="email">
                                    {(field) => <FormInput field={field} placeholder="Email Address" type="email" style={{ paddingLeft: '40px' }} />}
                                </emailForm.AppField>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <ShieldCheck size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: primaryColor, zIndex: 1 }} />
                                <emailForm.AppField name="userId">
                                    {(field) => <FormInput field={field} placeholder="User ID" style={{ paddingLeft: '40px' }} />}
                                </emailForm.AppField>
                            </div>
                            <Button type="submit" disabled={loading} style={{ height: '50px', backgroundColor: primaryColor, color: btnText, borderRadius: '12px', fontWeight: 700 }}>
                                {loading ? <Loader2 className="animate-spin" size={20} /> : "Send Reset Code"}
                            </Button>
                        </div>
                    </emailForm.AppForm>
                )}

                {step === "otp" && (
                    <otpForm.AppForm form={otpForm}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <otpForm.AppField name="code">
                                {(field) => <FormInput field={field} placeholder="Enter 6-digit OTP" style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '4px', fontWeight: 700 }} />}
                            </otpForm.AppField>
                            <Button type="submit" disabled={loading} style={{ height: '50px', backgroundColor: primaryColor, color: btnText, borderRadius: '12px', fontWeight: 700 }}>
                                {loading ? <Loader2 className="animate-spin" size={20} /> : "Verify Code"}
                            </Button>
                        </div>
                    </otpForm.AppForm>
                )}

                {step === "updatePassword" && (
                    <updateForm.AppForm form={updateForm}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ position: 'relative' }}>
                                <KeyRound size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: primaryColor, zIndex: 1 }} />
                                <updateForm.AppField name="confirmPassword">
                                    {(field) => <FormInput field={field} type="password" placeholder="New Password" style={{ paddingLeft: '40px' }} />}
                                </updateForm.AppField>
                            </div>
                            <Button type="submit" disabled={loading} style={{ height: '50px', backgroundColor: primaryColor, color: btnText, borderRadius: '12px', fontWeight: 700 }}>
                                {loading ? <Loader2 className="animate-spin" size={20} /> : "Update & Login"}
                            </Button>
                        </div>
                    </updateForm.AppForm>
                )}
            </DialogContent>
        </Dialog>
    )
}