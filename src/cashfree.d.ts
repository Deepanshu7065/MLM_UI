// src/types/cashfree.d.ts
declare module "@cashfreepayments/cashfree-js" {
    interface CashfreeCheckoutOptions {
      paymentSessionId: string;
      redirectTarget?: "_self" | "_blank" | "_top" | "_modal" | HTMLElement;
    }
  
    interface CashfreeCheckoutResult {
      error?: {
        message: string;
        code?: string;
      };
      redirect?: boolean;
      paymentDetails?: {
        paymentMessage: string;
      };
    }
  
    interface CashfreeInstance {
      checkout(options: CashfreeCheckoutOptions): Promise<CashfreeCheckoutResult>;
    }
  
    interface LoadOptions {
      mode: "sandbox" | "production";
    }
  
    export function load(options: LoadOptions): Promise<CashfreeInstance | null>;
  }