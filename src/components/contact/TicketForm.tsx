//  ./ticketform.tsx

"use client"
import { useAppForm } from '@/hooks/useAppForm'
import { FormInput } from '@/components/form/FormInput'
import { useTheme } from "@/theme/ThemeProvider"
import { themeColors } from "@/theme/themeConfig"
import { Loader2, Send } from "lucide-react"
import { useCreateTicketMutation } from '@/hooks/ticket.mutate'


export default function TicketForm() {
    const { theme } = useTheme(); const c = themeColors; const isDark = theme === 'dark';
    const createMutation = useCreateTicketMutation();

    const form = useAppForm({
        defaultValues: { subject: "", message: "" },
        onSubmit: async ({ value }) => {
            createMutation.mutate(value, {
                onSuccess: () => form.reset()
            });
        }
    });

    const inputStyle = {
        width: '100%', padding: '0.8rem 1rem', borderRadius: '0.8rem',
        backgroundColor: isDark ? c.backgroundSecondary.dark : '#f8fafc',
        border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
        color: 'inherit', marginBottom: '1.2rem'
    };

    return (
        <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2.5rem', borderRadius: '1.5rem', backgroundColor: isDark ? c.card.dark : '#fff', border: `1px solid ${isDark ? c.border.dark : c.border.light}` }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Raise a Ticket</h2>
            <form.AppForm form={form}>
                <form.AppField name="subject">
                    {(field) => <FormInput field={field} type="text" placeholder="Issue Subject (e.g. Course Access)" style={inputStyle} />}
                </form.AppField>
                <form.AppField name="message">
                    {(field) => <FormInput field={field} type="text" placeholder="Describe your problem..." style={{ ...inputStyle, height: '120px' }} />}
                </form.AppField>
                <button type="submit" disabled={createMutation.isPending} style={{
                    width: '100%', padding: '1rem', borderRadius: '0.8rem', border: 'none', fontWeight: 'bold',
                    backgroundColor: isDark ? c.primary.dark : c.primary.light, color: isDark ? '#000' : '#fff',
                    cursor: createMutation.isPending ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', gap: '10px'
                }}>
                    {createMutation.isPending ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                    {createMutation.isPending ? "Submitting..." : "Submit Ticket"}
                </button>
            </form.AppForm>
        </div>
    )
}