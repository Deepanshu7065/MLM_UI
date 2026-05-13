import React, { useRef, useState } from 'react';
import { useGetUserOrder } from '@/hooks/Order.mutate';
import { useTheme } from '@/theme/ThemeProvider';
import { themeColors } from '@/theme/themeConfig';
import {
    CreditCard,
    ChevronRight, ReceiptText,
    BookOpen, AlertCircle, Printer, Loader
} from 'lucide-react';
import CourseProgress from './CourseProgress';
import { useGetInvoiceData } from '@/hooks/Payment.mutate';
import InvoiceTemplate from '../GlobalModal/PrintableInvoice';
import { useReactToPrint } from 'react-to-print';

// ─── Per-order print component ────────────────────────────────────────────────
const PrintableOrder = ({ orderId, isDark, c }: { orderId: string | number, isDark: boolean, c: any }) => {
    const invoiceRef = useRef<HTMLDivElement>(null);
    const [invoiceData, setInvoiceData] = useState<any>(null);

    // ✅ mutation — sirf button click pe call hoga, automatic nahi
    const { mutateAsync: fetchInvoice, isPending } = useGetInvoiceData();

    const handlePrint = useReactToPrint({
        contentRef: invoiceRef,
        documentTitle: `Invoice-${orderId}`,
        pageStyle: `
            @page { size: A4; margin: 20mm; }
            body { background: #fff !important; }
        `,
    });

    const handlePrintClick = async () => {
        try {
            // Har baar fresh data fetch karo
            const res = await fetchInvoice(String(orderId));
            if (res?.data) {
                setInvoiceData(res.data);
                // Re-render ke baad print
                setTimeout(() => handlePrint(), 300);
            }
        } catch (err) {
            console.error("Invoice fetch error:", err);
            alert("Invoice load nahi hua. Please try again.");
        }
    };

    const accent = isDark ? c.primary.dark : c.primary.light;

    return (
        <>
            {/* Hidden invoice — sirf print ke liye */}
            <div style={{
                position: 'absolute',
                left: '-9999px',
                top: 0,
                width: '720px',
                pointerEvents: 'none',
            }}>
                <InvoiceTemplate ref={invoiceRef} data={invoiceData} />
            </div>

            <button
                onClick={handlePrintClick}
                disabled={isPending}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.75rem',
                    border: `1.5px solid ${accent}`,
                    background: 'transparent',
                    color: accent,
                    cursor: isPending ? 'not-allowed' : 'pointer',
                    opacity: isPending ? 0.6 : 1,
                    transition: 'all 0.2s ease',
                }}
            >
                {isPending
                    ? <><Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> Loading...</>
                    : <><Printer size={14} /> Print Invoice</>
                }
            </button>
            <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
        </>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
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

    if (isLoading) {
        return (
            <div style={containerStyle}>
                <div style={{ textAlign: 'center', marginTop: '10rem' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '600', opacity: 0.7 }}>
                        ✨ Preparing your dashboard...
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

                {data?.orders?.map((order: any) => {
                    const orderStatus = order.status.toLowerCase();
                    const isSuccess = orderStatus === 'success' || orderStatus === 'completed';

                    return (
                        <div key={order.orderId} style={{
                            backgroundColor: isDark ? c.card.dark : c.card.light,
                            border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
                            borderRadius: '1.5rem',
                            padding: '1.5rem',
                            marginBottom: '1.5rem',
                            boxShadow: isDark ? '0 15px 25px -5px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.05)',
                        }}>
                            {/* Order Header */}
                            <div style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                                paddingBottom: '1.25rem', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem'
                            }}>
                                <div style={{ display: 'flex', gap: '2rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.65rem', fontWeight: '800', opacity: 0.5, textTransform: 'uppercase' }}>Order ID</div>
                                        <div style={{ fontWeight: '800', fontFamily: 'monospace' }}>#{order.orderId}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.65rem', fontWeight: '800', opacity: 0.5, textTransform: 'uppercase' }}>Total</div>
                                        <div style={{ fontWeight: '900', color: isDark ? c.primary.dark : c.primary.light }}>
                                            ₹{order.totalAmount.toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                {/* Status + Print button */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{
                                        padding: '0.4rem 0.9rem', borderRadius: '2rem', fontSize: '0.7rem', fontWeight: '900',
                                        backgroundColor: isSuccess ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: isSuccess ? '#10b981' : '#ef4444',
                                        border: `1px solid ${isSuccess ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                                    }}>
                                        {order.status.toUpperCase()}
                                    </div>

                                    {/* Print button — sirf completed orders pe */}
                                    {isSuccess && (
                                        <PrintableOrder
                                            orderId={order.orderId}
                                            isDark={isDark}
                                            c={c}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Courses List */}
                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                {order.ordered_courses?.map((course: any) => {
                                    const isExpanded = expandedCourseId === course.id;
                                    return (
                                        <div key={course.id} style={{
                                            borderRadius: '1.25rem',
                                            backgroundColor: isDark ? c.backgroundSecondary.dark : c.backgroundSecondary.light,
                                            border: `1px solid ${isExpanded ? (isDark ? c.primary.dark : c.primary.light) : 'transparent'}`,
                                            transition: 'all 0.3s ease',
                                            overflow: 'hidden'
                                        }}>
                                            <div
                                                onClick={() => toggleExpand(course.id)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', cursor: 'pointer' }}
                                            >
                                                <img
                                                    src={`${course.image}`}
                                                    alt={course.course_name}
                                                    style={{ width: '60px', height: '60px', borderRadius: '0.75rem', objectFit: 'cover' }}
                                                />
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: '800', fontSize: '1.05rem' }}>{course.course_name}</div>
                                                    <div style={{ fontSize: '0.9rem', fontWeight: '600', opacity: 0.6 }}>₹{course.price.toLocaleString()}</div>
                                                </div>
                                                <div style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: '0.3s ease', opacity: 0.4 }}>
                                                    <ChevronRight size={22} />
                                                </div>
                                            </div>

                                            {/* Expanded Content */}
                                            <div style={{
                                                maxHeight: isExpanded ? '800px' : '0px',
                                                opacity: isExpanded ? 1 : 0,
                                                overflow: 'hidden',
                                                transition: 'all 0.4s ease-in-out',
                                                padding: isExpanded ? '0 1.25rem 1.5rem 1.25rem' : '0 1.25rem'
                                            }}>
                                                <div style={{
                                                    paddingTop: '1.25rem',
                                                    borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                                                    display: 'grid', gap: '1.25rem'
                                                }}>
                                                    {isSuccess ? (
                                                        <CourseProgress
                                                            createdAt={order.created_at}
                                                            durationMonths={course.duration}
                                                            isDark={isDark}
                                                            colors={c}
                                                        />
                                                    ) : (
                                                        <div style={{
                                                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                                                            padding: '1rem', borderRadius: '1rem',
                                                            backgroundColor: isDark ? 'rgba(239, 68, 68, 0.05)' : '#fff5f5',
                                                            border: `1px solid ${orderStatus === 'pending' ? '#fbbf24' : '#fca5a5'}`,
                                                            color: orderStatus === 'pending' ? '#d97706' : '#dc2626'
                                                        }}>
                                                            <AlertCircle size={20} />
                                                            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                                                                {orderStatus === 'pending'
                                                                    ? "Progress tracking will start once payment is successful."
                                                                    : "This course is inactive as the order was cancelled."}
                                                            </span>
                                                        </div>
                                                    )}

                                                    <div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem', fontWeight: '800', opacity: 0.5, marginBottom: '0.5rem' }}>
                                                            <BookOpen size={12} /> DESCRIPTION
                                                        </div>
                                                        <div style={{ fontSize: '0.85rem', lineHeight: '1.6', opacity: 0.8 }}>
                                                            {course.description || "Master this course with step-by-step guidance and professional resources."}
                                                        </div>
                                                    </div>

                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                        <div style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : '#f8fafc', padding: '0.8rem', borderRadius: '0.75rem' }}>
                                                            <div style={{ fontSize: '0.6rem', fontWeight: '800', opacity: 0.5, marginBottom: '0.2rem' }}>DURATION</div>
                                                            <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>{course.duration} Months</div>
                                                        </div>
                                                        <div style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : '#f8fafc', padding: '0.8rem', borderRadius: '0.75rem' }}>
                                                            <div style={{ fontSize: '0.6rem', fontWeight: '800', opacity: 0.5, marginBottom: '0.2rem' }}>SAC Code</div>
                                                            <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>#{course.category_id}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Footer Info */}
                            <div style={{
                                marginTop: '1.5rem', padding: '1rem', borderRadius: '1rem',
                                backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc',
                                border: `1px dashed ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
                                    <CreditCard size={18} opacity={0.6} />
                                    <span>Paid via <b>{order.payment?.payment_method?.toUpperCase() || 'N/A'}</b></span>
                                </div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.6, fontFamily: 'monospace' }}>
                                    {order.payment?.payment_id || 'no-ref-id'}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserOrder;