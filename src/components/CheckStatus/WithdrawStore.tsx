import { Store } from "@tanstack/react-store";

interface WithdrawViewModalState {
  open: boolean;
  id: number | null;
  withdrawDetails: any | null;
}

interface WithdrawStoreState {
  viewOpen: WithdrawViewModalState;
}

export const withdrawStore = new Store<WithdrawStoreState>({
  viewOpen: {
    open: false,
    id: null,
    withdrawDetails: null,
  },
});

export const WithdrawUIStore = {
  openViewModal: {
    open: (id: number, data: any) => {
      withdrawStore.setState((prev) => ({
        ...prev,
        viewOpen: {
          open: true,
          id,
          withdrawDetails: data,
        },
      }));
    },
    close: () => {
      withdrawStore.setState((prev) => ({
        ...prev,
        viewOpen: {
          open: false,
          id: null,
          withdrawDetails: null,
        },
      }));
    },
  },
};