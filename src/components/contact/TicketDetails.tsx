"use client"
import { useState, useEffect, useRef } from "react"
import { useTheme } from "@/theme/ThemeProvider"
import { themeColors } from "@/theme/themeConfig"
import { Send, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"
import { useGetChatMessages, useSendMessageMutation } from "@/hooks/ticket.mutate"
import { Button } from "../ui/button"
import { useSocket } from "@/context/SocketProvider"
import { useQueryClient } from "@tanstack/react-query"

export function TicketChatPage({ ticketId, onBack }: { ticketId: string, onBack: () => void }) {
    const { theme } = useTheme()
    const socket = useSocket()
    const queryClient = useQueryClient()
    const c = themeColors
    const isDark = theme === 'dark'
    const [newMessage, setNewMessage] = useState("")
    const chatEndRef = useRef<HTMLDivElement>(null)
    const joinedRoomRef = useRef<string | null>(null)

    const { data, isLoading } = useGetChatMessages(ticketId)
    const sendMutation = useSendMessageMutation(ticketId)
    const ticket = data?.ticket
    const messages = data?.messages || []

    useEffect(() => {
        if (!socket || !ticketId) return
        if (joinedRoomRef.current !== ticketId) {
            if (joinedRoomRef.current) socket.emit("leave_ticket", joinedRoomRef.current)
            socket.emit("join_ticket", String(ticketId))
            joinedRoomRef.current = ticketId
        }
        const handleMsg = (incoming: any) => {
            if (String(incoming.ticket_id) !== String(ticketId)) return
            queryClient.setQueryData(['chat', ticketId], (old: any) => {
                if (!old) return old
                if (old.messages.some((m: any) => m.id === incoming.id)) return old
                return { ...old, messages: [...old.messages, incoming] }
            })
        }
        socket.on("receive_message", handleMsg)
        return () => { socket.off("receive_message", handleMsg) }
    }, [socket, ticketId, queryClient])

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim() || sendMutation.isPending) return
        const messageText = newMessage
        setNewMessage("")
        sendMutation.mutate({ ticket_id: ticketId, message: messageText }, {
            onError: () => setNewMessage(messageText)
        })
    }

    if (isLoading) return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader2 className="animate-spin" size={28} />
        </div>
    )

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: isDark ? c.background.dark : '#fff',
        }}>
            {/* ── Header ── */}
            <div style={{
                flexShrink: 0,
                padding: '0.9rem 1.2rem',
                borderBottom: `1px solid ${isDark ? c.border.dark : '#e2e8f0'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: isDark ? c.card.dark : '#f8fafc',
            }}>
                <Button onClick={onBack} variant="ghost" size="icon" style={{ color: 'inherit', flexShrink: 0 }}>
                    <ArrowLeft size={20} />
                </Button>
                <div style={{ minWidth: 0 }}>
                    <h3 style={{
                        margin: 0, fontSize: '0.95rem', fontWeight: '700',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                    }}>
                        {ticket?.subject}
                    </h3>
                    <span style={{
                        fontSize: '0.68rem',
                        fontWeight: '600',
                        color: ticket?.status === 'closed' ? '#22c55e' : '#eab308',
                    }}>
                        ● {ticket?.status === 'closed' ? 'Resolved' : 'In Progress'}
                    </span>
                </div>
            </div>

            {/* ── Scrollable messages ── */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem 1.2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                minHeight: 0,
            }}>
                {messages.length === 0 ? (
                    <p style={{ textAlign: 'center', opacity: 0.4, marginTop: '2rem', fontSize: '0.88rem' }}>
                        No messages yet.
                    </p>
                ) : messages.map((m: any, index: number) => {
                    const isMe = m.sender?.role === 'user'
                    return (
                        <div key={m.id || index} style={{
                            alignSelf: isMe ? 'flex-end' : 'flex-start',
                            maxWidth: '78%',
                            padding: '0.7rem 1rem',
                            borderRadius: isMe ? '1.1rem 1.1rem 0 1.1rem' : '1.1rem 1.1rem 1.1rem 0',
                            backgroundColor: isMe
                                ? (isDark ? c.primary.dark : c.primary.light)
                                : (isDark ? '#334155' : '#f1f5f9'),
                            color: isMe ? '#fff' : (isDark ? '#fff' : '#1e293b'),
                            fontSize: '0.88rem',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                            lineHeight: 1.5,
                            wordBreak: 'break-word',
                        }}>
                            {m.message}
                            <span style={{
                                display: 'block', fontSize: '0.62rem', marginTop: '4px',
                                opacity: 0.65, textAlign: 'right',
                            }}>
                                {m.created_at
                                    ? new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    : 'Sending...'
                                }
                            </span>
                        </div>
                    )
                })}
                <div ref={chatEndRef} />
            </div>

            {/* ── Input bar ── */}
            <div style={{
                flexShrink: 0,
                padding: '0.85rem 1rem',
                borderTop: `1px solid ${isDark ? c.border.dark : '#e2e8f0'}`,
                backgroundColor: isDark ? c.card.dark : '#fff',
            }}>
                {ticket?.status === 'closed' ? (
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        padding: '0.75rem', borderRadius: '0.75rem', fontSize: '0.85rem', fontWeight: '600',
                        backgroundColor: isDark ? '#064e3b' : '#dcfce7',
                        color: isDark ? '#34d399' : '#166534',
                    }}>
                        <CheckCircle2 size={16} /> Ticket Resolved — No further replies allowed
                    </div>
                ) : (
                    <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                        <input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e as any) }
                            }}
                            placeholder="Type a message…"
                            style={{
                                flex: 1, padding: '0.7rem 1.1rem', borderRadius: '2rem',
                                border: `1px solid ${isDark ? c.border.dark : '#e2e8f0'}`,
                                backgroundColor: isDark ? c.background.dark : '#f8fafc',
                                color: 'inherit', outline: 'none', fontSize: '0.9rem',
                            }}
                        />
                        <Button
                            type="submit"
                            disabled={sendMutation.isPending || !newMessage.trim()}
                            style={{
                                width: '2.6rem', height: '2.6rem', borderRadius: '50%', flexShrink: 0,
                                backgroundColor: isDark ? c.primary.dark : c.primary.light,
                                padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                        >
                            {sendMutation.isPending
                                ? <Loader2 size={17} className="animate-spin" />
                                : <Send size={17} color="#fff" />
                            }
                        </Button>
                    </form>
                )}
            </div>
        </div>
    )
}