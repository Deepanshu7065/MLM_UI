export function Pagination({ meta, onPageChange }: {
    meta: { page: number; totalPages: number; total: number; limit: number } | undefined;
    onPageChange: (page: number) => void;
}) {
    if (!meta || meta.totalPages <= 1) return null;

    return (
        <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 24px",
            borderTop: `1px solid ${meta ? "rgba(255,255,255,0.05)" : "#f1f5f9"}`
        }}>
            <p style={{ fontSize: "12px", opacity: 0.5, margin: 0 }}>
                Showing {((meta.page - 1) * meta.limit) + 1}–{Math.min(meta.page * meta.limit, meta.total)} of {meta.total}
            </p>
            <div style={{ display: "flex", gap: "6px" }}>
                <button
                    disabled={meta.page <= 1}
                    onClick={() => onPageChange(meta.page - 1)}
                    style={{
                        padding: "6px 14px", borderRadius: "8px", fontSize: "12px",
                        fontWeight: "700", cursor: meta.page <= 1 ? "not-allowed" : "pointer",
                        border: "0", opacity: meta.page <= 1 ? 0.4 : 1,
                        background: "#3b82f6", color: "#fff"
                    }}
                >← Prev</button>

                <span style={{
                    padding: "6px 14px", borderRadius: "8px", fontSize: "12px",
                    fontWeight: "700", background: "rgba(59,130,246,0.1)", color: "#3b82f6"
                }}>
                    {meta.page} / {meta.totalPages}
                </span>

                <button
                    disabled={meta.page >= meta.totalPages}
                    onClick={() => onPageChange(meta.page + 1)}
                    style={{
                        padding: "6px 14px", borderRadius: "8px", fontSize: "12px",
                        fontWeight: "700", cursor: meta.page >= meta.totalPages ? "not-allowed" : "pointer",
                        border: "0", opacity: meta.page >= meta.totalPages ? 0.4 : 1,
                        background: "#3b82f6", color: "#fff"
                    }}
                >Next →</button>
            </div>
        </div>
    );
}