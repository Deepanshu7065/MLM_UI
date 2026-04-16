"use client"
import { themeColors } from "@/theme/themeConfig"
import { useTheme } from "@/theme/ThemeProvider"
import { useState, useRef, useEffect } from "react"
import { useGetChatMessages, useSendMessageMutation } from "@/hooks/ticket.mutate"
import { Loader2, Send, CheckCircle2 } from "lucide-react"
import { useSocket } from "@/context/SocketProvider"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "../ui/button"

export function TicketChat({ ticketId, isAdmin }: { ticketId: string, isAdmin: boolean }) {
    const { theme } = useTheme()
    const queryClient = useQueryClient()
    const socket = useSocket()
    const c = themeColors
    const isDark = theme === 'dark'
    const [msg, setMsg] = useState("")
    const chatEndRef = useRef<HTMLDivElement>(null)
    const joinedRoomRef = useRef<string | null>(null)

    const { data, isLoading } = useGetChatMessages(ticketId)
    const sendMutation = useSendMessageMutation(ticketId)
    const messages = data?.messages || []
    const ticketInfo = data?.ticket

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
        if (!msg.trim() || sendMutation.isPending) return
        const messageText = msg
        setMsg("")
        sendMutation.mutate({ ticket_id: ticketId, message: messageText }, {
            onError: () => setMsg(messageText)
        })
    }

    if (isLoading) return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader2 className="animate-spin" size={28} />
        </div>
    )

    return (
        // height:100% + flex column fills whatever parent gives
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: isDark ? c.background.dark : '#fff',
        }}>
            {/* ── Scrollable messages ── */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem 1.2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                minHeight: 0,   // crucial: lets flexbox shrink below content size
            }}>
                {messages.length === 0 ? (
                    <p style={{ textAlign: 'center', opacity: 0.4, marginTop: '2rem', fontSize: '0.88rem' }}>
                        No messages yet.
                    </p>
                ) : messages.map((m: any, index: number) => {
                    const isMe = isAdmin ? m.sender?.role === 'admin' : m.sender?.role === 'user'
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
                        }}>
                            <p style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.5 }}>
                                {m.message}
                            </p>
                            <span style={{
                                fontSize: '0.62rem',
                                opacity: 0.65,
                                marginTop: '4px',
                                display: 'block',
                                textAlign: isMe ? 'right' : 'left',
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

            {/* ── Input bar - always at bottom ── */}
            <div style={{
                flexShrink: 0,
                padding: '0.85rem 1rem',
                borderTop: `1px solid ${isDark ? c.border.dark : '#e2e8f0'}`,
                backgroundColor: isDark ? c.card.dark : '#fff',
            }}>
                {ticketInfo?.status === 'closed' ? (
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
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e as any) }
                            }}
                            placeholder="Type your reply…"
                            style={{
                                flex: 1, padding: '0.7rem 1.1rem', borderRadius: '2rem',
                                border: `1px solid ${isDark ? c.border.dark : '#e2e8f0'}`,
                                backgroundColor: isDark ? c.background.dark : '#f8fafc',
                                color: 'inherit', outline: 'none', fontSize: '0.9rem',
                            }}
                        />
                        <Button
                            type="submit"
                            disabled={sendMutation.isPending || !msg.trim()}
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