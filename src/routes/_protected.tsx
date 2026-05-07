import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Navbar } from '@/components/Layout/Navbar'
import { GetSingleUser } from '@/hooks/useUser'
import { useEffect } from 'react'
import { setUser } from '@/store/user.store'
import { courseActions } from '@/components/Courses/addCourseStore'
import { useGetCart } from '@/hooks/cart.mutate'
import { useTheme } from '@/theme/ThemeProvider'

export const Route = createFileRoute('/_protected')({
  beforeLoad: () => {
    const token = localStorage.getItem('token')
    if (!token) {
      throw redirect({ to: '/sign-in' })
    }
  },
  component: ProtectedLayout,
})

function ProtectedLayout() {
  const { theme } = useTheme();

  const rawUserId = localStorage.getItem('auth')
  const userId = rawUserId ? JSON.parse(rawUserId) : null

  const { data: userData, isPending } = GetSingleUser({
    userId: userId?.userId
  })

  const { data: cartData } = useGetCart({
    userId: userId?.userId
  })

  useEffect(() => {
    if (cartData) {
      courseActions.setCart(cartData)
    }
  }, [cartData])

  useEffect(() => {
    if (userData && !isPending) {
      setUser(userData.user)
    }
  }, [isPending, userData])

  if (isPending || !userData) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: theme === 'dark' ? '#0f172a' : '#fff',
          gap: '20px',
        }}
      >
        {/* Loader Image */}
        <img
          src="/public/assets/logo.jpeg"
          alt="Loading..."
          style={{
            width: '250px',
            height: '260px',
            objectFit: 'contain',
          }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <Navbar />

        <main
          style={{
            flex: 1,
            backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}