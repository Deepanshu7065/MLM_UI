"use client";

const StepProgress = ({ step, isDark, c }: any) => {
    const steps = ["Billing", "Payment", "Success"];
    const progressWidth = (step / steps.length) * 100;
    const activeColor = isDark ? c.primary.dark : c.primary.light;

    return (
        <div style={{ marginBottom: "2.5rem", maxWidth: "600px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8rem" }}>
                {steps.map((label, i) => (
                    <span
                        key={label}
                        style={{ fontSize: "0.7rem", fontWeight: "900", letterSpacing: "1px", color: step >= i + 1 ? activeColor : "#64748b" }}
                    >
                        {label.toUpperCase()}
                    </span>
                ))}
            </div>
            <div style={{ height: "6px", backgroundColor: isDark ? "#1e293b" : "#e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
                <div style={{ width: `${progressWidth}%`, height: "100%", backgroundColor: activeColor, transition: "0.6s cubic-bezier(0.4, 0, 0.2, 1)" }} />
            </div>
        </div>
    );
};
export default StepProgress;