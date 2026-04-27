import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRequestWithdrawal } from "@/hooks/earning.mutate";
import { toast } from "sonner";
import { useState } from "react";
import { fmt } from "./UserDashboar";

const WithdrawModal = ({ isOpen, onClose, balance, isDark, userId }: {
    isOpen: boolean;
    onClose: () => void;
    balance: number;
    isDark: boolean;
    userId: string
}) => {
    const [amount, setAmount] = useState(balance.toString());
    const { mutate: requestWithdraw, isPending } = useRequestWithdrawal();

    const handleWithdraw = async () => {
        const val = parseFloat(amount);
        if (!val || val <= 0) return toast.error("Please enter a valid amount");
        if (val > balance) return toast.error("Insufficient balance");

        await requestWithdraw({ amount: val, userId }, {
            onSuccess: (res: any) => {
                console.log("Success Response:", res);
                if (res?.success) {
                    toast.success("Withdrawal request sent successfully");
                    onClose();
                }
            },
            onError: (error: any) => {
                console.error("Mutation Error:", error);
                toast.error(error?.response?.data?.error || "Withdrawal failed");
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent style={{
                background: isDark ? "#0f172a" : "#fff",
                border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`,
                borderRadius: "20px"
            }}>
                <DialogHeader>
                    <DialogTitle style={{ fontWeight: "800", fontSize: "20px" }}>Request Withdrawal</DialogTitle>
                    <DialogDescription>
                        Enter the amount you want to withdraw. Your available balance is <b>₹{fmt(balance)}</b>.
                    </DialogDescription>
                </DialogHeader>

                <div style={{ padding: "20px 0" }}>
                    <label style={{ fontSize: "12px", fontWeight: "700", opacity: 0.6, marginBottom: "8px", display: "block" }}>
                        AMOUNT TO WITHDRAW (₹)
                    </label>
                    <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{
                            height: "50px",
                            fontSize: "18px",
                            fontWeight: "700",
                            borderRadius: "12px",
                            background: isDark ? "rgba(255,255,255,0.05)" : "#f8fafc"
                        }}
                    />
                </div>

                <DialogFooter>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        style={{ fontWeight: "700" }}

                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleWithdraw}
                        disabled={isPending || !amount}
                        style={{
                            background: "#10b981",
                            color: "#fff",
                            fontWeight: "800",
                            padding: "0 24px",
                            borderRadius: "12px",
                            boxShadow: "0 10px 15px -3px rgba(16, 185, 129, 0.3)"
                        }}
                    >
                        {isPending ? "Processing..." : "Confirm Withdrawal"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WithdrawModal;