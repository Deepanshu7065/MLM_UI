import { Store } from '@tanstack/store';

type ModalName = 'loginOtp' | 'signUp' | 'forgotPassword' | null

interface ModalState {
  openModal: ModalName
  open: (name: ModalName) => void
  close: () => void
}

export const modalStore = new Store<ModalState>({
  openModal: null,
  open: (name) => {
    modalStore.setState((state) => ({ ...state, openModal: name }))
  },
  close: () => {
    modalStore.setState((state) => ({ ...state, openModal: null }))
  },
})
