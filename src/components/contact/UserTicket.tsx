"use client"
import { useState, useEffect } from "react"
import { useTheme } from "@/theme/ThemeProvider"
import { themeColors } from "@/theme/themeConfig"
import { Ticket as TicketIcon, Clock, CheckCircle, Loader2 } from "lucide-react"
import { TicketChatPage } from "./TicketDetails"
import { useGetUserTickets } from "@/hooks/ticket.mutate"



export function UserTickets() {
    const { theme } = useTheme()
    const c = themeColors
    const isDark = theme === 'dark'
    const { data: ticketData, isLoading } = useGetUserTickets()
    const [selectedTicket, setSelectedTicket] = useState<any | null>(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        height: `calc(100vh - 4.4rem)`,
        maxHeight: `calc(100vh - 4.4rem)`,
        overflow: 'hidden',
        backgroundColor: isDark ? c.background.dark : c.background.light,
    }

    return (
        <div style={containerStyle}>
            {/* ── SIDEBAR ── */}
            {(!isMobile || !selectedTicket) && (
                <div style={{
                    width: isMobile ? '100%' : '360px',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: isMobile ? 'none' : `1px solid ${isDark ? c.border.dark : '#e2e8f0'}`,
                    height: '100%',
                    overflow: 'hidden',
                    backgroundColor: isDark ? c.background.dark : '#fff',
                }}>
                    {/* Header */}
                    <div style={{
                        flexShrink: 0,
                        padding: '1.25rem 1.5rem',
                        borderBottom: `1px solid ${isDark ? c.border.dark : '#e2e8f0'}`,
                        backgroundColor: isDark ? c.card.dark : '#f8fafc',
                    }}>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>Support Tickets</h2>
                    </div>

                    {/* List - only this scrolls */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem', minHeight: 0 }}>
                        {isLoading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                                <Loader2 className="animate-spin" />
                            </div>
                        ) : !ticketData?.tickets?.length ? (
                            <p style={{ textAlign: 'center', opacity: 0.4, marginTop: '2rem', fontSize: '0.88rem' }}>No tickets yet</p>
                        ) : ticketData.tickets.map((ticket: any) => (
                            <div
                                key={ticket.ticket_id}
                                onClick={() => setSelectedTicket(ticket)}
                                style={{
                                    backgroundColor: selectedTicket?.ticket_id === ticket.ticket_id
                                        ? (isDark ? '#1e293b' : '#eff6ff')
                                        : (isDark ? c.card.dark : '#fff'),
                                    border: `1.5px solid ${selectedTicket?.ticket_id === ticket.ticket_id
                                        ? (isDark ? c.primary.dark : c.primary.light)
                                        : (isDark ? c.border.dark : '#e2e8f0')}`,
                                    borderRadius: '0.8rem',
                                    padding: '1rem 1.1rem',
                                    marginBottom: '0.6rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                                    <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', minWidth: 0 }}>
                                        {ticket.status === 'open'
                                            ? <Clock size={16} color={c.accent?.warning || '#eab308'} style={{ flexShrink: 0, marginTop: '2px' }} />
                                            : <CheckCircle size={16} color={c.accent?.success || '#22c55e'} style={{ flexShrink: 0, marginTop: '2px' }} />
                                        }
                                        <div style={{ minWidth: 0 }}>
                                            <h4 style={{
                                                margin: 0, fontSize: '0.9rem', fontWeight: '600',
                                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                            }}>
                                                {ticket.subject}
                                            </h4>
                                            <p style={{ fontSize: '0.72rem', opacity: 0.6, margin: '3px 0 0' }}>
                                                #{ticket.ticket_id} • {new Date(ticket.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <span style={{
                                        flexShrink: 0, fontSize: '0.62rem', fontWeight: '600',
                                        padding: '2px 8px', borderRadius: '999px',
                                        backgroundColor: ticket.status === 'open' ? '#fef9c3' : '#dcfce7',
                                        color: ticket.status === 'open' ? '#854d0e' : '#166534',
                                    }}>
                                        {ticket.status === 'open' ? 'Open' : 'Resolved'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── CHAT PANEL ── */}
            {(!isMobile || selectedTicket) && (
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden',
                    backgroundColor: isDark ? c.background.dark : '#fff',
                    minWidth: 0,
                }}>
                    {selectedTicket ? (
                        <TicketChatPage
                            ticketId={String(selectedTicket.ticket_id)}
                            onBack={() => setSelectedTicket(null)}
                        />
                    ) : (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.35 }}>
                            <TicketIcon size={72} strokeWidth={1} />
                            <p style={{ marginTop: '1rem', fontSize: '1rem', fontWeight: '500' }}>Select a ticket to see conversation</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}