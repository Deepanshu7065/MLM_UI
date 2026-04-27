"use client"

import { useForm, useStore } from "@tanstack/react-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { useEffect } from "react"
import { useTheme } from "@/theme/ThemeProvider"
import { themeColors } from "@/theme/themeConfig"
import { Save, Info, ArrowUpCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"
import { withdrawStore, WithdrawUIStore } from "./WithdrawStore"
import { useUpdateWithdrawStatus } from "@/hooks/Payment.mutate"

export const UpdateWithdraw = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const c = themeColors;

    const { viewOpen, id, data } = useStore(withdrawStore, (state) => ({
        viewOpen: state.viewOpen.open,
        id: state.viewOpen.id,
        data: state.viewOpen.withdrawDetails,
    }))

    const { mutateAsync, isPending } = useUpdateWithdrawStatus();

    const updateForm = useForm({
        defaultValues: {
            status: data?.status || 'PENDING',
            transactionId: data?.transactionId || '',
            remarks: data?.remarks || '',
        },
        onSubmit: async ({ value }) => {
            try {
                await mutateAsync({
                    id: id as string | null || null,
                    data: {
                        status: value.status,
                        transactionId: value.transactionId || null,
                        remarks: value.remarks || null,
                    }
                });
                WithdrawUIStore.openViewModal.close();
            } catch (error) {
                console.error("Withdraw update failed", error);
            }
        }
    });

    useEffect(() => {
        if (data) {
            updateForm.setFieldValue("status", data.status || 'PENDING');
            updateForm.setFieldValue("transactionId", data.transactionId || '');
            updateForm.setFieldValue("remarks", data.remarks || '');
        }
    }, [data]);

    const labelStyle: React.CSSProperties = {
        fontSize: '0.8rem',
        fontWeight: '800',
        color: isDark ? '#94a3b8' : '#64748b',
        display: 'block',
        marginBottom: '10px',
        marginLeft: '5px',
        textTransform: 'uppercase',
    };

    const inputStyle: React.CSSProperties = {
        height: '46px',
        width: '100%',
        borderRadius: '1.5rem',
        border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
        backgroundColor: isDark ? c.background.dark : '#fff',
        fontSize: '0.95rem',
        fontWeight: '600',
        padding: '0 1.5rem',
        color: isDark ? '#fff' : '#000',
    };

    return (
        <Dialog open={viewOpen} onOpenChange={WithdrawUIStore.openViewModal.close}>
            <DialogContent
                className="sm:max-w-[500px]"
                style={{
                    backgroundColor: isDark ? c.card.dark : c.card.light,
                    border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
                    borderRadius: "2.5rem",
                    padding: "2.5rem",
                    boxShadow: isDark ? "none" : "0 25px 50px -12px rgba(0,0,0,0.1)",
                    color: isDark ? "#fff" : "#000",
                }}
            >
                <DialogHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.5rem' }}>
                        <div style={{
                            padding: '12px',
                            background: isDark ? 'rgba(59,130,246,0.15)' : '#eff6ff',
                            borderRadius: '1rem',
                        }}>
                            <ArrowUpCircle size={24} color={isDark ? c.primary.dark : c.primary.light} />
                        </div>
                        <DialogTitle style={{ fontSize: "1.75rem", fontWeight: "900", letterSpacing: "-0.5px" }}>
                            Update Withdrawal
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
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0'}`,
                }}>
                    <Info size={16} className="text-blue-500" />
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.8 }}>
                        Withdrawal Request ID: <span className="font-mono">#{data?.id || 'N/A'}</span>
                        {' · '}
                        <span style={{ fontWeight: '800' }}>₹{data?.amount}</span>
                    </span>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        updateForm.handleSubmit();
                    }}
                >
                    {/* Status Field */}
                    <updateForm.Field name="status">
                        {(field) => (
                            <div style={{ marginBottom: '1.75rem' }}>
                                <label style={labelStyle}>Withdrawal Status</label>
                                <Select
                                    value={field.state.value}
                                    onValueChange={(val) => field.handleChange(val)}
                                >
                                    <SelectTrigger style={{
                                        height: '46px',
                                        width: '100%',
                                        borderRadius: '1.5rem',
                                        border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
                                        backgroundColor: isDark ? c.background.dark : '#fff',
                                        fontSize: '0.95rem',
                                        fontWeight: '600',
                                        padding: '0 1.5rem',
                                    }}>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent style={{
                                        borderRadius: '1.25rem',
                                        backgroundColor: isDark ? c.card.dark : '#fff',
                                        border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
                                    }}>
                                        <SelectItem value="PENDING" className="focus:bg-yellow-500/10 cursor-pointer py-3">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="SUCCESS" className="focus:bg-green-500/10 cursor-pointer py-3">
                                            Success
                                        </SelectItem>
                                        <SelectItem value="REJECTED" className="focus:bg-red-500/10 cursor-pointer py-3">
                                            Rejected
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </updateForm.Field>

                    {/* Transaction ID Field */}
                    <updateForm.Field name="transactionId">
                        {(field) => (
                            <div style={{ marginBottom: '1.75rem' }}>
                                <label style={labelStyle}>Transaction ID</label>
                                <Input
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Enter UTR / Transaction ID"
                                    style={inputStyle}
                                />
                            </div>
                        )}
                    </updateForm.Field>

                    {/* Remarks Field */}
                    <updateForm.Field name="remarks">
                        {(field) => (
                            <div style={{ marginBottom: '2.5rem' }}>
                                <label style={labelStyle}>Remarks</label>
                                <Input
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Optional remarks or rejection reason"
                                    style={inputStyle}
                                />
                            </div>
                        )}
                    </updateForm.Field>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            type="button"
                            onClick={WithdrawUIStore.openViewModal.close}
                            style={{
                                flex: 1,
                                height: '46px',
                                borderRadius: '1.25rem',
                                border: `1px solid ${isDark ? c.border.dark : '#e2e8f0'}`,
                                backgroundColor: 'transparent',
                                color: isDark ? '#fff' : '#000',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            Discard
                        </button>

                        <button
                            type="submit"
                            disabled={isPending}
                            style={{
                                flex: 1,
                                height: '46px',
                                borderRadius: '1.25rem',
                                border: 'none',
                                backgroundColor: isDark ? c.primary.dark : c.primary.light,
                                color: '#fff',
                                fontWeight: '700',
                                cursor: isPending ? 'not-allowed' : 'pointer',
                                opacity: isPending ? 0.7 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                boxShadow: `0 10px 20px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(59,130,246,0.25)'}`,
                                transition: 'all 0.2s',
                            }}
                        >
                            <Save size={18} />
                            {isPending ? "Updating..." : "Update Now"}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};