import moment from "moment";
import React from "react";
import { OfficeAddress } from "./Address";

const InvoiceTemplate = React.forwardRef<HTMLDivElement, { data?: any }>(
    ({ data }, ref) => {
        if (!data) return null;

        const subtotal = data.subtotal ?? 0;
        const gstAmount = data.gstAmount ?? 0;
        const totalAmount = data.totalAmount ?? 0;

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
                            GSTIN: 06ABCDE1234F1Z5
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: 0, fontWeight: 600, fontSize: '15px' }}>DM DVANCE TECH</p>
                        {/* <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666', lineHeight: 1.5 }}>
                            Gali No -10, Gurgaon, Haryana<br />support@deeptech.in
                        </p> */}
                        <OfficeAddress />
                    </div>
                </div>

                {/* Billed to + Order details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div>
                        <p style={{
                            fontWeight: 600, marginBottom: '6px', fontSize: '11px',
                            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888'
                        }}>Billed to</p>
                        <p style={{ margin: '2px 0', fontWeight: 500 }}>{data.user?.name}</p>
                        <p style={{ margin: '2px 0', color: '#555', fontSize: '12px' }}>{data.user?.email}</p>
                        <p style={{ margin: '2px 0', color: '#555', fontSize: '12px' }}>{data.user?.phone}</p>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '13px' }}>
                        <p style={{ margin: '3px 0' }}><strong>Order ID:</strong> #{data.orderId}</p>
                        <p style={{ margin: '3px 0' }}>
                            <strong>Date:</strong> {data.created_at ? moment(data.created_at).format('DD MMM, YYYY') : moment().format('DD MMM, YYYY')}
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
                                textAlign: 'right', width: '100px', fontSize: '11px',
                                textTransform: 'uppercase', letterSpacing: '0.06em',
                                color: '#666', fontWeight: 500
                            }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.ordered_courses?.map((item: any) => (
                            <tr key={item.id}>
                                <td style={{ padding: '10px 12px', border: '1px solid #e0e0e0' }}>
                                    {item.course_name}
                                </td>
                                <td style={{ padding: '10px 12px', border: '1px solid #e0e0e0', textAlign: 'right', fontWeight: 500 }}>
                                    ₹{Number(item.price).toLocaleString('en-IN')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Totals */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                    <div style={{ minWidth: '220px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #e0e0e0', color: '#555' }}>
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #e0e0e0', color: '#555' }}>
                            <span>GST (18%)</span>
                            <span>₹{gstAmount.toLocaleString('en-IN')}</span>
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