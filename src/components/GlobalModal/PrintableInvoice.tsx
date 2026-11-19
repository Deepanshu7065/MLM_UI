import moment from "moment";
import React from "react";
import { BillAddress, } from "./Address";
import { calculateGSTDetails } from "@/lib/gstUtils";

const InvoiceTemplate = React.forwardRef<HTMLDivElement, { data?: any }>(
    ({ data }, ref) => {
        if (!data) return null;

        const isIgst = Boolean(
            data.isIgst ||
            (data.user?.state &&
                data.user.state.trim().toLowerCase() !== 'haryana' &&
                data.user.state.trim().toLowerCase() !== 'hr')
        );

        // Safe total & GST calculations
        const totalAmount = Number(data.totalAmount ?? data.amount ?? data.total ?? 0);
        const gstBreakdown = calculateGSTDetails(totalAmount, isIgst);

        const subtotal = Number(data.subtotal) > 0 ? Number(data.subtotal) : gstBreakdown.subtotal;
        const gstAmount = Number(data.gstAmount) > 0 ? Number(data.gstAmount) : gstBreakdown.gstAmount;
        const cgstAmount = Math.floor(gstAmount / 2);
        const sgstAmount = gstAmount - cgstAmount;

        // Resolve courses list from various possible API/order payload shapes
        const rawCoursesList: any[] =
            (Array.isArray(data.ordered_courses) && data.ordered_courses.length > 0 ? data.ordered_courses : null) ||
            (Array.isArray(data.courses) && data.courses.length > 0 ? data.courses : null) ||
            (Array.isArray(data.items) && data.items.length > 0 ? data.items : null) ||
            (Array.isArray(data.order_courses) && data.order_courses.length > 0 ? data.order_courses : null) ||
            (Array.isArray(data.orderCourses) && data.orderCourses.length > 0 ? data.orderCourses : null) ||
            (Array.isArray(data.order_items) && data.order_items.length > 0 ? data.order_items : null) ||
            (Array.isArray(data.order?.ordered_courses) && data.order.ordered_courses.length > 0 ? data.order.ordered_courses : null) ||
            (Array.isArray(data.order?.courses) && data.order.courses.length > 0 ? data.order.courses : null) ||
            (Array.isArray(data.order?.items) && data.order.items.length > 0 ? data.order.items : null) ||
            (Array.isArray(data.data?.ordered_courses) && data.data.ordered_courses.length > 0 ? data.data.ordered_courses : null) ||
            (Array.isArray(data.data?.courses) && data.data.courses.length > 0 ? data.data.courses : null) ||
            (Array.isArray(data.data?.items) && data.data.items.length > 0 ? data.data.items : null) ||
            (data.course ? [data.course] : []);

        const finalCourses = rawCoursesList.length > 0
            ? rawCoursesList
            : [{
                id: data.orderId || data.order_id || 1,
                course_name: data.course_name || data.courseTitle || data.title || "Course Enrollment",
                category_id: data?.category_id || "998319",
                price: subtotal || totalAmount
            }];

        // Customer details resolution
        const customerName = data.user?.name || data.userName || data.user_name || data.customer_name || data.name || "Customer";
        const customerEmail = data.user?.email || data.email || data.user_email || "—";
        const customerPhone = data.user?.phone || data.phone || data.mobile || data.payment?.phone || "—";

        return (
            <div ref={ref} style={{
                background: '#fff', color: '#000',
                padding: '2.5rem', fontFamily: 'sans-serif',
                fontSize: '13px', maxWidth: '720px', margin: '0 auto',
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '24px'
                }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 600 }}>Invoice</h1>
                        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666' }}>
                            GSTIN: 06FAGPM9377H1Z4
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: 0, fontWeight: 600, fontSize: '15px' }}>DM DVANCE TECH</p>
                        {/* <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666', lineHeight: 1.5 }}>
                            Gali No -10, Gurgaon, Haryana<br />support@deeptech.in
                        </p> */}
                        <BillAddress />
                    </div>
                </div>

                {/* Billed to + Order details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div>
                        <p style={{
                            fontWeight: 600, marginBottom: '6px', fontSize: '11px',
                            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888'
                        }}>Billed to</p>
                        <p style={{ margin: '2px 0', fontWeight: 500 }}>{customerName}</p>
                        <p style={{ margin: '2px 0', color: '#555', fontSize: '12px' }}>{customerEmail}</p>
                        <p style={{ margin: '2px 0', color: '#555', fontSize: '12px' }}>{customerPhone}</p>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '13px' }}>
                        <p style={{ margin: '3px 0' }}><strong>Order ID:</strong> #{data.orderId ?? data.order_id ?? data.id ?? "—"}</p>
                        <p style={{ margin: '3px 0' }}>
                            <strong>Date:</strong> {data.created_at || data.createdAt || data.date ? moment(data.created_at || data.createdAt || data.date).format('DD MMM, YYYY') : moment().format('DD MMM, YYYY')}
                        </p>
                        <p style={{ margin: '3px 0' }}>
                            <strong>Status:</strong>{' '}
                            <span style={{
                                background: '#E1F5EE', color: '#085041',
                                padding: '2px 10px', borderRadius: '100px', fontSize: '11px'
                            }}>
                                {(data.status ?? 'paid').toUpperCase()}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Courses table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
                    <thead>
                        <tr style={{ background: '#f5f5f5' }}>

                            <th style={{
                                padding: '10px 12px', border: '1px solid #e0e0e0',
                                textAlign: 'left', fontSize: '11px', textTransform: 'uppercase',
                                letterSpacing: '0.06em', color: '#666', fontWeight: 500
                            }}>Course name</th>
                            <th style={{
                                padding: '10px 12px', border: '1px solid #e0e0e0',
                                textAlign: 'left', fontSize: '11px', textTransform: 'uppercase',
                                letterSpacing: '0.06em', color: '#666', fontWeight: 500
                            }}>
                                SAC Code
                            </th>
                            <th style={{
                                padding: '10px 12px', border: '1px solid #e0e0e0',
                                textAlign: 'right', width: '100px', fontSize: '11px',
                                textTransform: 'uppercase', letterSpacing: '0.06em',
                                color: '#666', fontWeight: 500
                            }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {finalCourses.map((item: any, idx: number) => {
                            const courseName =
                                item.course_name ||
                                item.course?.course_name ||
                                item.title ||
                                item.course?.title ||
                                item.name ||
                                item.course?.name ||
                                item.courseTitle ||
                                `Course #${item.id || idx + 1}`;

                            const sacCode =
                                item.sac_code ||
                                item.category_id ||
                                item.course?.sac_code ||
                                item.course?.category_id ||
                                item.category?.sac_code ||
                                item.course?.category?.sac_code ||
                                "998319";

                            const price =
                                item.price !== undefined && item.price !== null
                                    ? Number(item.price)
                                    : item.amount !== undefined && item.amount !== null
                                    ? Number(item.amount)
                                    : item.course?.price !== undefined && item.course?.price !== null
                                    ? Number(item.course.price)
                                    : finalCourses.length === 1 && subtotal > 0
                                    ? subtotal
                                    : 0;

                            return (
                                <tr key={item.id || idx}>
                                    <td style={{ padding: '10px 12px', border: '1px solid #e0e0e0' }}>
                                        {courseName}
                                    </td>
                                    <td style={{ padding: '10px 12px', border: '1px solid #e0e0e0' }}>
                                        {sacCode}
                                    </td>
                                    <td style={{ padding: '10px 12px', border: '1px solid #e0e0e0', textAlign: 'right', fontWeight: 500 }}>
                                        ₹{Number(price).toLocaleString('en-IN')}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Totals */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                    <div style={{ minWidth: '260px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', color: '#555' }}>
                            <span>Subtotal (Excl. GST)</span>
                            <span>₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0 2px', color: '#555' }}>
                            <span>GST (18%)</span>
                            <span>+ ₹{gstAmount.toLocaleString('en-IN')}</span>
                        </div>

                        {/* CGST + SGST or IGST Breakdown */}
                        <div style={{ paddingLeft: '12px', paddingBottom: '6px', borderBottom: '1px solid #e0e0e0', color: '#777', fontSize: '11px' }}>
                            {isIgst ? (
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1px 0' }}>
                                    <span>• IGST (18%)</span>
                                    <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                                </div>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1px 0' }}>
                                        <span>• CGST (9%)</span>
                                        <span>₹{cgstAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1px 0' }}>
                                        <span>• SGST (9%)</span>
                                        <span>₹{sgstAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                </>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 5px', borderTop: '2px solid #000', fontWeight: 600, fontSize: '15px' }}>
                            <span>Total paid</span>
                            <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '11px', color: '#999', margin: 0, lineHeight: 1.6 }}>
                        Thank you for enrolling with DM DVANCE TECH.<br />
                        Computer-generated invoice — DMADVANCE.
                    </p>
                    <p style={{ fontSize: '11px', color: '#999', margin: 0, textAlign: 'right', lineHeight: 1.6 }}>
                        techdmadvance<br />techdmadvance@gmail.com
                    </p>
                </div>
            </div>
        );
    }
);

InvoiceTemplate.displayName = 'InvoiceTemplate';
export default InvoiceTemplate;