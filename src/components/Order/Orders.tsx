import React from 'react';
import { useGetAllOrder } from '@/hooks/Order.mutate';
import { useTheme } from '@/theme/ThemeProvider';
import { themeColors } from '@/theme/themeConfig';
import { 
    CreditCard, 
    Calendar, 
    CheckCircle2, 
    Clock, 
    User, 
    Mail, 
    Phone, 
    Layers
} from 'lucide-react';
import { imageUrl } from '@/hooks/utils';

const AllOrder = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const c = themeColors;

    const { data, isLoading } = useGetAllOrder();

    // --- Dynamic Styles ---
    const containerStyle: React.CSSProperties = {
        padding: '2.5rem 1.5rem',
        minHeight: '100%',
        backgroundColor: isDark ? c.background.dark : c.background.light,
        color: isDark ? c.text.dark : c.text.light,
        transition: 'all 0.3s ease',
    };

    const orderCardStyle: React.CSSProperties = {
        backgroundColor: isDark ? c.card.dark : c.card.light,
        border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
        borderRadius: '1.25rem',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: isDark ? '0 20px 25px -5px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden'
    };

    const sectionTitleStyle: React.CSSProperties = {
        fontSize: '0.75rem',
        fontWeight: '800',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: isDark ? c.primary.dark : c.primary.light,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        opacity: 0.9
    };

    const infoBoxStyle: React.CSSProperties = {
        padding: '1.2rem',
        borderRadius: '1rem',
        backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f9fafb',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
        height: '100%'
    };

    const badgeStyle = (status: string): React.CSSProperties => {
        const isSuccess = status.toLowerCase() === 'completed' || status.toLowerCase() === 'success';
        return {
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            fontSize: '0.7rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: isSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            color: isSuccess ? '#10b981' : '#f59e0b',
            border: `1px solid ${isSuccess ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`,
        };
    };

    if (isLoading) {
        return (
            <div style={{ ...containerStyle, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="animate-spin" style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚙️</div>
                    <p style={{ fontWeight: '600', opacity: 0.7 }}>Fetching Orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header Section */}
                <header style={{ marginBottom: '3rem', borderLeft: `4px solid ${isDark ? c.primary.dark : c.primary.light}`, paddingLeft: '1.5rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px', marginBottom: '0.5rem' }}>
                        Order <span style={{ color: isDark ? c.primary.dark : c.primary.light }}>Management</span>
                    </h1>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ color: isDark ? c.textSecondary.dark : c.textSecondary.light, fontSize: '1.1rem' }}>
                            Tracking {data?.count || 0} total transactions
                        </p>
                    </div>
                </header>

                {/* Orders Map */}
                {data?.orders?.map((order: any) => (
                    <div key={order.orderId} style={orderCardStyle}>
                        
                        {/* 1. Top Bar: Order ID & Status */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            marginBottom: '2rem', 
                            paddingBottom: '1rem', 
                            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` 
                        }}>
                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: '800', opacity: 0.5, textTransform: 'uppercase' }}>Order ID</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: '900', fontFamily: 'monospace' }}>#{order.orderId}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: '800', opacity: 0.5, textTransform: 'uppercase' }}>Date & Time</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: '600' }}>
                                        <Calendar size={14} /> {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                            <div style={badgeStyle(order.status)}>
                                {order.status === 'completed' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                                {order.status}
                            </div>
                        </div>

                        {/* 2. Main Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                            
                            {/* Customer Column */}
                            <div>
                                <h3 style={sectionTitleStyle}><User size={16} /> Customer Profile</h3>
                                <div style={infoBoxStyle}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                                        <div style={{ 
                                            width: '48px', height: '48px', borderRadius: '14px', 
                                            backgroundColor: isDark ? c.primary.dark : c.primary.light, 
                                            color: isDark ? '#000' : '#fff', 
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                            fontWeight: '900', fontSize: '1.2rem' 
                                        }}>
                                            {order.user?.name?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{order.user?.name}</div>
                                            <div style={{ fontSize: '0.85rem', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <Mail size={13} /> {order.user?.email}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingTop: '1rem', borderTop: `1px dashed ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                            <span style={{ opacity: 0.6 }}>User ID:</span>
                                            <span style={{ fontWeight: '700' }}>{order.userId}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                            <span style={{ opacity: 0.6 }}>Phone:</span>
                                            <span style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Phone size={12} /> {order.payment?.phone || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Courses Column - Note: Using order.ordered_courses from your JSON */}
                            <div>
                                <h3 style={sectionTitleStyle}><Layers size={16} /> Course Enrollment ({order.quantity})</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {order.ordered_courses?.map((course: any) => (
                                        <div key={course.id} style={{ 
                                            display: 'flex', alignItems: 'center', gap: '1rem', 
                                            padding: '0.8rem', borderRadius: '1rem', 
                                            backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#fff',
                                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                        }}>
                                            <img 
                                                src={`${imageUrl}${course.image}`} 
                                                alt={course.course_name} 
                                                style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }} 
                                            />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '2px' }}>{course.course_name}</div>
                                                <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '4px' }}>Category ID: {course.category_id}</div>
                                                <div style={{ fontSize: '0.9rem', fontWeight: '800', color: isDark ? c.primary.dark : c.primary.light }}>₹{course.price}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 3. Payment Footer */}
                        <div style={{ 
                            marginTop: '2rem', 
                            padding: '1.2rem 1.5rem', 
                            borderRadius: '1.2rem', 
                            background: isDark ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : '#f1f5f9', 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center' 
                        }}>
                            <div style={{ display: 'flex', gap: '2.5rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.6rem', fontWeight: '800', opacity: 0.5, marginBottom: '4px', textTransform: 'uppercase' }}>Method</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <CreditCard size={16} /> {order.payment?.payment_method?.toUpperCase()}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.6rem', fontWeight: '800', opacity: 0.5, marginBottom: '4px', textTransform: 'uppercase' }}>Gateway ID</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '600', fontFamily: 'monospace', letterSpacing: '0.5px' }}>{order.payment?.payment_id}</div>
                                </div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.65rem', fontWeight: '800', opacity: 0.5, marginBottom: '2px' }}>NET TOTAL</div>
                                <div style={{ fontSize: '1.6rem', fontWeight: '900', color: isDark ? c.primary.dark : c.primary.light }}>
                                    ₹{order.totalAmount.toLocaleString()}
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllOrder;