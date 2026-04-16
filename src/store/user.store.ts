// src/store/user.store.ts

import { Store } from "@tanstack/react-store";


export interface User {
    userId: string;
    email: string;
    name: string;
    phone: string;
    referalCode: string;
    role: string;
}

export interface UserStoreState {
    user: User | null;
    isLoading: boolean;
}

const defaultState: UserStoreState = {
    user: null,
    isLoading: true,
};

export const userStore = new Store<UserStoreState>(defaultState);

export const setUser = (user: User | null) => {
    userStore.setState((state) => ({
        ...state,
        user: user,
        isLoading: false
    }));
};

export const setUserLoading = (isLoading: boolean) => {
    userStore.setState((state) => ({
        ...state,
        isLoading: isLoading,
    }));
};