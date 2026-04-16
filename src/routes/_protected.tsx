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
  const { data: userData, isPending } = GetSingleUser({ userId: userId?.userId })
  const { data: cartData } = useGetCart({ userId: userId?.userId })

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

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
    transition: 'background-color 0.3s ease',
  };

  const contentWrapperStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
  };

  const mainStyle = {
    flex: 1,
    padding: 0,
    backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
    transition: 'background-color 0.3s ease',
  };

  const loadingStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
  };

  const loadingTextStyle = {
    color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
    fontSize: '1.125rem',
    fontWeight: '500',
  };

  if (isPending || !userData) {
    return (
      <div style={loadingStyle}>
        <div style={loadingTextStyle}>Loading...</div>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <div style={contentWrapperStyle}>
        <Navbar />
        <main style={mainStyle}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}