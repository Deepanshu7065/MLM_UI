"use client"
import { useState, useEffect } from "react"
import { themeColors } from "@/theme/themeConfig"
import { useTheme } from "@/theme/ThemeProvider"
import { TicketChat } from "./ChatAdminAndUser"
import { useGetAllTickets, useUpdateTicketStatusMutation } from "@/hooks/ticket.mutate"
import { Loader2, Ticket as TicketIcon, ArrowLeft } from "lucide-react"

// const NAV_HEIGHT = 64 // navbar height in px

export function AdminTicketManager() {
    const { theme } = useTheme()
    const c = themeColors
    const isDark = theme === 'dark'
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const { data, isLoading } = useGetAllTickets()
    const updateStatusMutation = useUpdateTicketStatusMutation()
    const tickets = data?.tickets || []
    const activeTicket = tickets.find((t: any) => String(t.ticket_id) === selectedTicketId)

    const handleToggleStatus = () => {
        if (!selectedTicketId || !activeTicket) return
        const newStatus = activeTicket.status === 'open' ? 'closed' : 'open'
        updateStatusMutation.mutate({ ticketId: selectedTicketId, status: newStatus })
    }

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        height: `calc(100vh - 4.4rem)`,
        maxHeight: `calc(100vh - 4.4rem)`,
        overflow: 'hidden',
        backgroundColor: isDark ? c.background.dark : c.background.light,
    }

    if (isLoading) return (
        <div style={{ ...containerStyle, justifyContent: 'center', alignItems: 'center' }}>
            <Loader2 className="animate-spin" size={40} />
        </div>
    )

    return (
        <div style={containerStyle}>
            {/* ── SIDEBAR ── */}
            {(!isMobile || !selectedTicketId) && (
                <div style={{
                    width: isMobile ? '100%' : '340px',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: isMobile ? 'none' : `1px solid ${isDark ? c.border.dark : '#e2e8f0'}`,
                    height: '100%',
                    overflow: 'hidden',
                }}>
                    {/* Sidebar header */}
                    <div style={{
                        flexShrink: 0,
                        padding: '1.25rem 1.5rem',
                        borderBottom: `1px solid ${isDark ? c.border.dark : '#e2e8f0'}`,
                        backgroundColor: isDark ? c.card.dark : '#f8fafc',
                    }}>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>Support Tickets</h2>
                    </div>

                    {/* Ticket list - only this scrolls */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem', minHeight: 0 }}>
                        {tickets.length === 0 ? (
                            <p style={{ textAlign: 'center', opacity: 0.4, marginTop: '2rem', fontSize: '0.88rem' }}>No tickets yet</p>
                        ) : tickets.map((t: any) => (
                            <div
                                key={t.ticket_id}
                                onClick={() => setSelectedTicketId(String(t.ticket_id))}
                                style={{
                                    padding: '1rem 1.1rem',
                                    borderRadius: '0.8rem',
                                    cursor: 'pointer',
                                    marginBottom: '0.6rem',
                                    backgroundColor: selectedTicketId === String(t.ticket_id)
                                        ? (isDark ? '#1e293b' : '#eff6ff')
                                        : (isDark ? c.card.dark : '#fff'),
                                    border: `1.5px solid ${selectedTicketId === String(t.ticket_id)
                                        ? (isDark ? c.primary.dark : c.primary.light)
                                        : (isDark ? c.border.dark : '#e2e8f0')}`,
                                    transition: 'all 0.15s ease',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                                    <h4 style={{
                                        margin: 0, fontSize: '0.88rem', fontWeight: '600',
                                        flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                                    }}>
                                        {t.subject}
                                    </h4>
                                    <span style={{
                                        flexShrink: 0, fontSize: '0.62rem', fontWeight: '600',
                                        padding: '2px 8px', borderRadius: '999px',
                                        backgroundColor: t.status === 'open' ? '#fef9c3' : '#dcfce7',
                                        color: t.status === 'open' ? '#854d0e' : '#166534',
                                    }}>
                                        {t.status === 'open' ? 'Open' : 'Resolved'}
                                    </span>
                                </div>
                                <p style={{ margin: '4px 0 0', fontSize: '0.72rem', opacity: 0.55 }}>{t.User?.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── CHAT PANEL ── */}
            {(!isMobile || selectedTicketId) && (
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden',
                    backgroundColor: isDark ? c.background.dark : '#fff',
                    minWidth: 0,
                }}>
                    {selectedTicketId ? (
                        <>
                            {/* Chat header */}
                            <div style={{
                                flexShrink: 0,
                                padding: '0.9rem 1.2rem',
                                borderBottom: `1px solid ${isDark ? c.border.dark : '#e2e8f0'}`,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: isDark ? c.card.dark : '#f8fafc',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                                    {isMobile && (
                                        <ArrowLeft size={20} onClick={() => setSelectedTicketId(null)} style={{ cursor: 'pointer', flexShrink: 0 }} />
                                    )}
                                    <div style={{ minWidth: 0 }}>
                                        <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {activeTicket?.subject}
                                        </h3>
                                        <p style={{ margin: 0, fontSize: '0.72rem', opacity: 0.55 }}>{activeTicket?.User?.name}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleToggleStatus}
                                    disabled={updateStatusMutation.isPending}
                                    style={{
                                        flexShrink: 0, marginLeft: '12px',
                                        background: activeTicket?.status === 'open' ? '#ef4444' : '#22c55e',
                                        color: 'white', padding: '6px 14px', borderRadius: '8px',
                                        border: 'none', cursor: updateStatusMutation.isPending ? 'not-allowed' : 'pointer',
                                        fontSize: '0.78rem', fontWeight: '600',
                                        opacity: updateStatusMutation.isPending ? 0.7 : 1,
                                        display: 'flex', alignItems: 'center', gap: '5px',
                                    }}
                                >
                                    {updateStatusMutation.isPending
                                        ? <Loader2 size={13} className="animate-spin" />
                                        : activeTicket?.status === 'open' ? '🔒 Resolve' : '🔓 Reopen'
                                    }
                                </button>
                            </div>

                            {/* Chat body — fills remaining height exactly */}
                            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
                                <TicketChat ticketId={selectedTicketId} isAdmin={true} />
                            </div>
                        </>
                    ) : (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.2 }}>
                            <TicketIcon size={80} strokeWidth={1} />
                            <p style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '1rem' }}>Select a ticket to reply</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}