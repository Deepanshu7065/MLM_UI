"use client"

import { useGetPayment } from '@/hooks/Payment.mutate'
import { themeColors } from '@/theme/themeConfig';
import { useTheme } from '@/theme/ThemeProvider';
import { CreditCard, Edit, Loader2, Calendar, Hash, Tag } from 'lucide-react';
import { PaymentUIStore } from './payemntStore';
import { UpdatePayment } from './updatePayment';
import { useStore } from '@tanstack/react-store';
import { userStore } from '@/store/user.store';

const PaymentHistory = () => {
  const { data, isLoading } = useGetPayment()
  const { theme } = useTheme();
  
  const userDetails = useStore(userStore, (state) => state.user);
  
  const isDark = theme === "dark";
  const c = themeColors;

  const payments = data?.payment ? [...data.payment].sort((a: any, b: any) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ) : [];

  if (isLoading) {
    return (
      <div style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader2 size={40} className="animate-spin" color={isDark ? c.primary.dark : c.primary.light} />
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div style={{ height: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: isDark ? "#fff" : "#000" }}>
        <CreditCard size={60} style={{ opacity: 0.2, marginBottom: '1rem' }} />
        <h2 style={{ opacity: 0.5 }}>No Transactions Found</h2>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100%", padding: "4rem 2rem", backgroundColor: isDark ? c.background.dark : c.background.light }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <header style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "900", color: isDark ? "#fff" : "#000", margin: 0 }}>
            PAYMENT HISTORY
          </h1>
          <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
            Track all your successful and failed transaction attempts
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {payments.map((p: any) => (
            <div key={p.id} style={{
              backgroundColor: isDark ? c.card.dark : c.card.light,
              borderRadius: "1.5rem",
              padding: "2rem",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0"}`,
              boxShadow: isDark ? "none" : "0 10px 25px rgba(0,0,0,0.03)"
            }}>
              {/* Header Row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{ 
                    padding: '0.75rem', 
                    borderRadius: '1rem', 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc' 
                  }}>
                    <CreditCard size={24} color={isDark ? c.primary.dark : c.primary.light} />
                  </div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: isDark ? "#fff" : "#000" }}>
                      ₹{p.total_amount}
                    </h2>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '800', 
                      padding: '2px 10px', 
                      borderRadius: '2rem',
                      backgroundColor: p.status === "SUCCESS" ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                      color: p.status === "SUCCESS" ? "#22c55e" : "#ef4444",
                    }}>
                      {p.status}
                    </span>
                  </div>
                </div>

                {/* Edit Button only for Admin */}
                {userDetails?.role === "admin" && (
                  <Edit 
                    onClick={() => PaymentUIStore.openViewModal.open(p.id, p)} 
                    size={18} 
                    style={{ cursor: "pointer", color: "#64748b" }} 
                  />
                )}
              </div>

              {/* Info Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
                <DetailItem label="Payment ID" value={p.payment_id} icon={<Hash size={12}/>} isDark={isDark} />
                <DetailItem label="Date & Time" value={new Date(p.created_at).toLocaleString()} icon={<Calendar size={12}/>} isDark={isDark} />
                <DetailItem label="Method" value={p.payment_method?.toUpperCase()} icon={<CreditCard size={12}/>} isDark={isDark} />
                <DetailItem label="Order ID" value={p.order_id || "N/A"} icon={<Tag size={12}/>} isDark={isDark} />
              </div>

              {/* Courses Purchased */}
              {p.courses && p.courses.length > 0 && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1.2rem', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9'}` }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#64748b', marginBottom: '8px' }}>ITEMS IN THIS TRANSACTION</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {p.courses.map((course: any) => (
                      <span key={course.id} style={{
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        padding: '4px 10px',
                        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9',
                        borderRadius: '6px',
                        color: isDark ? '#cbd5e1' : '#475569'
                      }}>
                        {course.course_name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <UpdatePayment />
    </div>
  );
};

const DetailItem = ({ label, value, icon, isDark }: any) => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
        <span style={{ color: '#64748b' }}>{icon}</span>
        <span style={{ fontSize: "0.65rem", fontWeight: "800", color: "#64748b", textTransform: 'uppercase' }}>{label}</span>
    </div>
    <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: "700", color: isDark ? "#fff" : "#1e293b", wordBreak: 'break-all' }}>
      {value}
    </p>
  </div>
);

export default PaymentHistory;