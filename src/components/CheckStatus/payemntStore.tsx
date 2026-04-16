

import { Store } from "@tanstack/store";

export type PyamentOpen = {
    viewOpen: {
        id: string
        open: boolean;
        paymentDetails: any;
    };
    saveData: {
        data: any;
    }
};

export const initialState: PyamentOpen = {
    viewOpen: {
        id: '',
        open: false,
        paymentDetails: {}
    },
    saveData: {
        data: [],
    }
};

export const paymentStore = new Store<PyamentOpen>(initialState);


export const openViewModal = {
    open: (id?: string, payemntDetails?: string) => {
        paymentStore.setState((state) => ({
            ...state,
            viewOpen: {
                id: id ?? '',
                open: true,
                paymentDetails: payemntDetails ?? {}
            }
        }))
    },
    close: () => {
        paymentStore.setState((state) => ({
            ...state,
            viewOpen: {
                id: '',
                open: false,
                paymentDetails: {}
            }
        }))
    }
}

export const paymentStoreData = {
    saveData: (data: any) => {
        paymentStore.setState((state) => ({
            ...state,
            saveData: {
                data: data
            }
        }))
    },
    closeData: () => {
        paymentStore.setState((state) => ({
            ...state,
            saveData: {
                data: []
            }
        }))
    }
}


export const PaymentUIStore = {
    openViewModal,
    paymentStoreData
}
