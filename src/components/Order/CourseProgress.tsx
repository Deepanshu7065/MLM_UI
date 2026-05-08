import { Timer } from "lucide-react";

const CourseProgress = ({ createdAt, durationMonths, isDark, colors }: any) => {
    const startDate = new Date(createdAt);
    const totalDurationDays = durationMonths * 30;
    const today = new Date();

    const diffTime = today.getTime() - startDate.getTime();
    const daysPassed = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

    const percentage = Math.min(Math.round((daysPassed / totalDurationDays) * 100), 100);
    const daysRemaining = Math.max(totalDurationDays - daysPassed, 0);

    const radius = 35;
    const stroke = 6;
    const normalizedRadius = radius - stroke;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '1.25rem',
            borderRadius: '1.25rem',
            background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff',
            boxShadow: isDark ? 'none' : '0 4px 15px rgba(0,0,0,0.04)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
            marginBottom: '1rem'
        }}>
            <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg height="80" width="80" style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                        stroke={isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx="40"
                        cy="40"
                    />
                    <circle
                        stroke={isDark ? colors.primary.dark : colors.primary.light}
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{
                            strokeDashoffset,
                            transition: 'stroke-dashoffset 1s ease-in-out',
                            strokeLinecap: 'round'
                        }}
                        r={normalizedRadius}
                        cx="40"
                        cy="40"
                    />
                </svg>
                <div style={{ position: 'absolute', fontSize: '1rem', fontWeight: '800' }}>
                    {percentage}%
                </div>
            </div>

            <div style={{ flex: 1 }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    fontSize: '0.65rem', fontWeight: '900', color: colors.primary.light,
                    textTransform: 'uppercase', marginBottom: '0.25rem'
                }}>
                    <Timer size={12} /> Validity Tracking
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>
                    {daysPassed} <span style={{ fontSize: '0.8rem', fontWeight: '600', opacity: 0.6 }}>Days Completed</span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.7, marginTop: '0.1rem' }}>
                    {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Access Expired'}
                </div>
            </div>
        </div>
    );
};
export default CourseProgress;