export interface GSTBreakdown {
    totalAmount: number;
    subtotal: number;
    gstAmount: number;
    cgstRate: number;
    cgstAmount: number;
    sgstRate: number;
    sgstAmount: number;
    igstRate: number;
    igstAmount: number;
    isIgst: boolean;
}

/**
 * Calculates GST breakdown for GST inclusive total amount.
 * @param totalAmount GST-inclusive total price (e.g. 600)
 * @param isIgst boolean indicating if transaction is inter-state (IGST)
 */
export function calculateGSTDetails(totalAmount: number, isIgst: boolean = false): GSTBreakdown {
    const GST_RATE = 0.18;
    const safeTotal = Math.max(0, Number(totalAmount) || 0);
    const subtotal = Math.round(safeTotal / (1 + GST_RATE));
    const gstAmount = safeTotal - subtotal;

    const cgstAmount = Math.floor(gstAmount / 2);
    const sgstAmount = gstAmount - cgstAmount;
    const igstAmount = gstAmount;

    return {
        totalAmount: safeTotal,
        subtotal,
        gstAmount,
        cgstRate: 9,
        cgstAmount,
        sgstRate: 9,
        sgstAmount,
        igstRate: 18,
        igstAmount,
        isIgst: Boolean(isIgst),
    };
}

/**
 * Determines if customer state or GSTIN indicates an inter-state (IGST) transaction.
 * Default seller state is Haryana (State Code 06).
 */
export function checkIsInterState(state?: string, gstin?: string): boolean {
    if (gstin && gstin.trim().length >= 2) {
        const stateCode = gstin.trim().substring(0, 2);
        if (stateCode !== "06") return true;
    }
    if (state && state.trim()) {
        const st = state.trim().toLowerCase();
        if (st !== "haryana" && st !== "hr") return true;
    }
    return false;
}
