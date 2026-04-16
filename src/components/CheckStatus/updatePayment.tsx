"use client"

import { useForm, useStore } from "@tanstack/react-form"
import { paymentStore, PaymentUIStore } from "./payemntStore"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { useEffect } from "react"
import { useTheme } from "@/theme/ThemeProvider"
import { themeColors } from "@/theme/themeConfig"
import { Save, Info, CreditCard, } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useUpdatePaymentStatus } from "@/hooks/Payment.mutate"
import { Input } from "../ui/input"

export const UpdatePayment = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const c = themeColors;

    const { viewOpen, id, data } = useStore(paymentStore, (State) => ({
        viewOpen: State.viewOpen.open,
        id: State.viewOpen.id,
        data: State.viewOpen.paymentDetails,
    }))
    console.log("data", data)

    const { mutateAsync } = useUpdatePaymentStatus();

    const updateForm = useForm({
        defaultValues: {
            id: id || '',
            status: data?.status || '',
            failure_reason: '',
            // AGAR data mein courses hain, toh unki IDs nikal lo
            courseIds: data?.courses?.map((c: any) => c) || []
        },
        onSubmit: async ({ value }) => {
            try {
                // Backend ko 'courseIds' bhejna compulsory hai junction table bharne ke liye
                await mutateAsync({
                    id: id,
                    data: {
                        status: value.status,
                        failure_reason: value.failure_reason,
                        courseIds: value.courseIds
                    }
                })
                PaymentUIStore.openViewModal.close();
            } catch (error) {
                console.error("Update failed", error);
            }
        }
    })


    useEffect(() => {
        if (data) {
            updateForm.setFieldValue("id", data?.id)
            updateForm.setFieldValue("status", data?.status)

            if (data.courses) {
                const ids = data.courses.map((c: any) => c.id);
                updateForm.setFieldValue("courseIds", ids);
            }
        }
    }, [data])

    return (
        <Dialog open={viewOpen} onOpenChange={PaymentUIStore.openViewModal.close}>
            <DialogContent className="sm:max-w-[500px]" style={{
                backgroundColor: isDark ? c.card.dark : c.card.light,
                border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
                borderRadius: "2.5rem",
                padding: "2.5rem",
                boxShadow: isDark ? "none" : "0 25px 50px -12px rgba(0,0,0,0.1)",
                color: isDark ? "#fff" : "#000"
            }}>
                <DialogHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.5rem' }}>
                        <div style={{
                            padding: '12px',
                            background: isDark ? 'rgba(59, 130, 246, 0.15)' : '#eff6ff',
                            borderRadius: '1rem',
                        }}>
                            <CreditCard size={24} color={isDark ? c.primary.dark : c.primary.light} />
                        </div>
                        <DialogTitle style={{
                            fontSize: "1.75rem",
                            fontWeight: "900",
                            letterSpacing: "-0.5px",
                        }}>
                            Update Status
                        </DialogTitle>
                    </div>
                </DialogHeader>

                {/* Info Badge */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '0.85rem 1.25rem',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                    borderRadius: '1.25rem',
                    marginBottom: '2rem',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0'}`
                }}>
                    <Info size={16} className="text-blue-500" />
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.8 }}>
                        Transaction ID: <span className="font-mono">{data?.payment_id || 'N/A'}</span>
                    </span>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateForm.handleSubmit();
                }}>

                    {/* Shadcn Select Field */}
                    <updateForm.Field
                        name="status"
                        children={(field) => (
                            <div style={{ marginBottom: '2.5rem' }}>
                                <label style={{
                                    fontSize: '0.8rem',
                                    fontWeight: '800',
                                    color: isDark ? '#94a3b8' : '#64748b',
                                    display: 'block',
                                    marginBottom: '10px',
                                    marginLeft: '5px',
                                    textTransform: 'uppercase'
                                }}>
                                    Payment Status
                                </label>

                                <Select
                                    value={field.state.value}
                                    onValueChange={(val) => field.handleChange(val)}
                                >
                                    <SelectTrigger style={{
                                        height: '40px',
                                        width: '100%',
                                        borderRadius: '1.5rem',
                                        border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
                                        backgroundColor: isDark ? c.background.dark : '#fff',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        padding: '0 1.5rem'
                                    }}>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent style={{
                                        borderRadius: '1.25rem',
                                        backgroundColor: isDark ? c.card.dark : '#fff',
                                        border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
                                    }}>
                                        <SelectItem value="SUCCESS" className="focus:bg-green-500/10 cursor-pointer py-3">Success</SelectItem>
                                        <SelectItem value="PENDING" className="focus:bg-yellow-500/10 cursor-pointer py-3">Pending</SelectItem>
                                        <SelectItem value="FAILED" className="focus:bg-red-500/10 cursor-pointer py-3">Failed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    />

                    <updateForm.Field name="failure_reason">
                        {(field) => (
                            <div style={{ marginBottom: '2.5rem' }}>
                                <label style={{
                                    fontSize: '0.8rem',
                                    fontWeight: '800',
                                    color: isDark ? '#94a3b8' : '#64748b',
                                    display: 'block',
                                    marginBottom: '10px',
                                    marginLeft: '5px',
                                    textTransform: 'uppercase'
                                }}>
                                    Failure Reason
                                </label>
                                <Input
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Failure Reason"
                                    style={{
                                        height: '40px',
                                        width: '100%',
                                        borderRadius: '1.5rem',
                                        border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
                                        backgroundColor: isDark ? c.background.dark : '#fff',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        padding: '0 1.5rem'
                                    }}
                                />
                            </div>
                        )}
                    </updateForm.Field>

                    {/* Footer Actions */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            type="button"
                            onClick={PaymentUIStore.openViewModal.close}
                            style={{
                                flex: 1,
                                height: '46px',
                                borderRadius: '1.25rem',
                                border: `1px solid ${isDark ? c.border.dark : '#e2e8f0'}`,
                                backgroundColor: 'transparent',
                                color: isDark ? '#fff' : '#000',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            Discard
                        </button>

                        <button
                            type="submit"
                            style={{
                                flex: 1,
                                height: '46px',
                                borderRadius: '1.25rem',
                                border: 'none',
                                backgroundColor: isDark ? c.primary.dark : c.primary.light,
                                color: '#fff',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                boxShadow: `0 10px 20px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(59, 130, 246, 0.25)'}`
                            }}
                        >
                            <Save size={18} /> Update Now
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}