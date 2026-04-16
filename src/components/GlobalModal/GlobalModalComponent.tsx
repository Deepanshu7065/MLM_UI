import { modalStore } from '@/store/modal.store'
import { useStore } from '@tanstack/react-store'
import { LoginWithOtp } from '../LoginWithOtp'
import { ForgotPasswordModal } from '../ForgotPasswordModal'
import { useNavigate } from '@tanstack/react-router'
// import { SignUpModal } from './SignUpModal'
// import { ForgotPasswordModal } from './ForgotPasswordModal'

export function GlobalModal() {
  const { openModal, close } = useStore(modalStore)
  const navigate = useNavigate()

  return (
    <>
      {openModal === 'loginOtp' && (
        <LoginWithOtp
          open={true}
          onOpenChange={close}
          onSuccess={() => navigate({ to: "/dashboard" })}
        />
      )}

      {/* {openModal === 'signUp' && (
        <SignUpModal open={true} onOpenChange={close} />
      )} */}
      {openModal === 'forgotPassword' && (
        <ForgotPasswordModal open={true} onOpenChange={close} />
      )}

    </>
  )
}
