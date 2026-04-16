import React, { useState } from 'react';
import { useGetUserOrder } from '@/hooks/Order.mutate';
import { useTheme } from '@/theme/ThemeProvider';
import { themeColors } from '@/theme/themeConfig';
import {
    CreditCard,
    ChevronRight, ReceiptText,
    Timer, LayoutGrid, BookOpen
} from 'lucide-react';
import { imageUrl } from '@/hooks/utils';

const UserOrder = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const c = themeColors;

    const [expandedCourseId, setExpandedCourseId] = useState<number | null>(null);

    const { data, isLoading } = useGetUserOrder();

    const toggleExpand = (id: number) => {
        setExpandedCourseId(expandedCourseId === id ? null : id);
    };

    const containerStyle: React.CSSProperties = {
        padding: '2.5rem 1.5rem',
        minHeight: '100%',
        backgroundColor: isDark ? c.background.dark : c.background.light,
        color: isDark ? c.text.dark : c.text.light,
        transition: 'background-color 0.3s ease',
    };

    const orderCardStyle: React.CSSProperties = {
        backgroundColor: isDark ? c.card.dark : c.card.light,
        border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
        borderRadius: '1.25rem',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: isDark ? '0 10px 15px -3px rgba(0, 0, 0, 0.4)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    };

    if (isLoading) {
        return (
            <div style={containerStyle}>
                <div style={{ textAlign: 'center', marginTop: '10rem' }}>
                    <div className="animate-pulse" style={{ fontSize: '1.2rem', fontWeight: '600', opacity: 0.7 }}>
                        ✨ Fetching your learning journey...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <header style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <ReceiptText size={28} color={isDark ? c.primary.dark : c.primary.light} />
                        <h1 style={{ fontSize: '2.25rem', fontWeight: '900', letterSpacing: '-0.025em' }}>My Orders</h1>
                    </div>
                    <p style={{ color: isDark ? c.textSecondary.dark : c.textSecondary.light, fontSize: '1.1rem' }}>
                        You have purchased <b>{data?.count || 0}</b> total courses
                    </p>
                </header>

                {data?.orders?.map((order: any) => (
                    <div key={order.orderId} style={orderCardStyle}>
                        {/* Order Meta Info (Pehle jaisa top bar) */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '1rem',
                            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                            paddingBottom: '1.25rem',
                            marginBottom: '1.25rem'
                        }}>
                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: '800', color: isDark ? c.textMuted.dark : c.textMuted.light, marginBottom: '0.25rem', textTransform: 'uppercase' }}>Order ID</div>
                                    <div style={{ fontWeight: '800', fontFamily: 'monospace', fontSize: '1rem' }}>#{order.orderId}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: '800', color: isDark ? c.textMuted.dark : c.textMuted.light, marginBottom: '0.25rem', textTransform: 'uppercase' }}>Date</div>
                                    <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{new Date(order.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: '800', color: isDark ? c.textMuted.dark : c.textMuted.light, marginBottom: '0.25rem', textTransform: 'uppercase' }}>Total</div>
                                    <div style={{ fontWeight: '900', color: isDark ? c.primary.dark : c.primary.light, fontSize: '1rem' }}>₹{order.totalAmount.toLocaleString()}</div>
                                </div>
                            </div>
                            <div style={{
                                padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.7rem', fontWeight: '800',
                                backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)'
                            }}>
                                {order.status.toUpperCase()}
                            </div>
                        </div>

                        {/* Courses Section */}
                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                            {order.ordered_courses?.map((course: any) => {
                                const isExpanded = expandedCourseId === course.id;
                                return (
                                    <div key={course.id} style={{
                                        borderRadius: '1rem',
                                        backgroundColor: isDark ? c.backgroundSecondary.dark : c.backgroundSecondary.light,
                                        border: `1px solid ${isExpanded ? (isDark ? c.primary.dark : c.primary.light) : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)')}`,
                                        transition: 'all 0.3s ease',
                                        overflow: 'hidden'
                                    }}>
                                        {/* Course Row (Pehle jaisa design) */}
                                        <div
                                            onClick={() => toggleExpand(course.id)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', cursor: 'pointer' }}
                                        >
                                            <img
                                                src={`${imageUrl}${course.image}`}
                                                alt={course.course_name}
                                                style={{ width: '56px', height: '56px', borderRadius: '0.75rem', objectFit: 'cover' }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: '700', fontSize: '1rem' }}>{course.course_name}</div>
                                                <div style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.7 }}>₹{course.price.toLocaleString()}</div>
                                            </div>
                                            <div style={{
                                                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                                transition: '0.3s ease',
                                                opacity: 0.5
                                            }}>
                                                <ChevronRight size={20} />
                                            </div>
                                        </div>

                                        {/* DETAILS SECTION (Expanded Content) */}
                                        <div style={{
                                            maxHeight: isExpanded ? '400px' : '0px',
                                            opacity: isExpanded ? 1 : 0,
                                            overflow: 'hidden',
                                            transition: 'all 0.3s ease-in-out',
                                            padding: isExpanded ? '0 1rem 1.25rem 1rem' : '0 1rem'
                                        }}>
                                            <div style={{
                                                paddingTop: '1rem',
                                                borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                                                display: 'grid',
                                                gap: '1rem'
                                            }}>
                                                {/* Description */}
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem', fontWeight: '800', opacity: 0.5, marginBottom: '0.4rem' }}>
                                                        <BookOpen size={12} /> COURSE DESCRIPTION
                                                    </div>
                                                    <div style={{ fontSize: '0.85rem', lineHeight: '1.5', opacity: 0.8 }}>
                                                        {course.description || "Learn this course at your own pace with expert guidance."}
                                                    </div>
                                                </div>

                                                {/* Grid Info */}
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                    <div style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)', padding: '0.75rem', borderRadius: '0.75rem' }}>
                                                        <div style={{ fontSize: '0.6rem', fontWeight: '800', opacity: 0.5, marginBottom: '0.2rem' }}>DURATION</div>
                                                        <div style={{ fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                            <Timer size={14} /> {course.duration} Month(s)
                                                        </div>
                                                    </div>
                                                    <div style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)', padding: '0.75rem', borderRadius: '0.75rem' }}>
                                                        <div style={{ fontSize: '0.6rem', fontWeight: '800', opacity: 0.5, marginBottom: '0.2rem' }}>CATEGORY</div>
                                                        <div style={{ fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                            <LayoutGrid size={14} /> ID: {course.category_id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{
                            marginTop: '1.5rem', padding: '1rem', borderRadius: '1rem',
                            backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc',
                            border: `1px dashed ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
                                <CreditCard size={18} opacity={0.6} />
                                <span>Paid via <b>{order.payment?.payment_method?.toUpperCase()}</b></span>
                            </div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.7, fontFamily: 'monospace' }}>
                                {order.payment?.payment_id}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserOrder;