// ContactForm.tsx
import { useAppForm } from '@/hooks/useAppForm'
import { FormInput, FormTextArea } from '../form/FormInput'
import { useTheme } from "@/theme/ThemeProvider"

export const ContactForm = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const primaryColor = isDark ? "#a3e635" : "#3b82f6"
    const inputBg = isDark ? "rgba(30, 41, 59, 0.5)" : "#f8fafc"
    const borderColor = isDark ? "rgba(51, 65, 85, 0.5)" : "#e2e8f0"
    const textColor = isDark ? "#ffffff" : "#0f172a"
    // const placeholderColor = isDark ? "#94a3b8" : "#64748b"

    const form = useAppForm({
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            message: '',
            userId: ''
        },
        onSubmit: async (formApi: any) => {
            console.log(formApi.value)
        },
    })

    // Inline Style Objects
    const inputStyle: React.CSSProperties = {
        width: '100%',
        height: '48px',
        borderRadius: '12px',
        backgroundColor: inputBg,
        border: `1px solid ${borderColor}`,
        color: textColor,
        padding: '0 16px',
        outline: 'none',
        transition: 'all 0.2s ease',
        fontFamily: 'inherit'
    }

    const labelStyle: React.CSSProperties = {
        fontSize: '10px',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        color: primaryColor,
        marginBottom: '6px',
        marginLeft: '4px',
        display: 'block'
    }

    return (
        <form.AppForm form={form} style={{ width: '100%' }}>
            {/* Grid Container */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                gap: '20px'
            }}>
                {/* Name */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={labelStyle}>Full Name</label>
                    <form.AppField name="name">
                        {(field) => (
                            <FormInput
                                field={field}
                                placeholder="John Doe"
                                type="text"
                                style={inputStyle}
                            />
                        )}
                    </form.AppField>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={labelStyle}>Email Address</label>
                    <form.AppField name="email">
                        {(field) => (
                            <FormInput
                                field={field}
                                placeholder="john@example.com"
                                type="email"
                                style={inputStyle}
                            />
                        )}
                    </form.AppField>
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={labelStyle}>Phone Number</label>
                    <form.AppField name="phone">
                        {(field) => (
                            <FormInput
                                field={field}
                                placeholder="+91 00000 00000"
                                type="text"
                                style={inputStyle}
                            />
                        )}
                    </form.AppField>
                </div>

                {/* User ID */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={labelStyle}>User ID</label>
                    <form.AppField name="userId">
                        {(field) => (
                            <FormInput
                                field={field}
                                placeholder="Optional"
                                type="text"
                                style={inputStyle}
                            />
                        )}
                    </form.AppField>
                </div>
            </div>

            {/* Message Area */}
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                <label style={labelStyle}>How can we help?</label>
                <form.AppField name="message">
                    {(field) => (
                        <FormTextArea
                            field={field}
                            rows={4}
                            placeholder="Type your message here..."
                            style={{ ...inputStyle, height: 'auto', padding: '12px 16px', resize: 'none' }}
                        />
                    )}
                </form.AppField>
            </div>

            {/* Submit Button */}
            <div style={{ marginTop: '24px' }}>
                <button
                    type="submit"
                    style={{
                        width: window.innerWidth > 768 ? 'auto' : '100%',
                        minWidth: '180px',
                        height: '48px',
                        borderRadius: '12px',
                        backgroundColor: primaryColor,
                        color: isDark ? '#000' : '#fff',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        boxShadow: `0 10px 20px -10px ${primaryColor}88`,
                        transition: 'transform 0.2s ease'
                    }}
                >
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="M22 2 11 13" />
                    </svg>
                </button>
            </div>
        </form.AppForm>
    )
}