"use client"

import { CourseApi } from "@/Apis/Courses/courseApi"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { courseActions, CourseStore, type CartCourse } from "./addCourseStore"
import { useStore } from "@tanstack/react-store"
import { ShoppingCart, ArrowRight, Loader2 } from "lucide-react"
import { imageUrl } from "@/hooks/utils"
import { useAddCart, useRemoveCart } from "@/hooks/cart.mutate"
import { useTheme } from "@/theme/ThemeProvider"
import { themeColors } from "@/theme/themeConfig"
import { Button } from "../ui/button"

function MainCourses() {
    const { theme } = useTheme()
    const cart = useStore(CourseStore, (s) => s.cart)
    const { mutateAsync: addCart } = useAddCart()
    const { mutateAsync: removeCart } = useRemoveCart()
    const navigate = useNavigate()

    const { data, isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: () => CourseApi.getCourses(),
    })

    const c = themeColors
    const isDark = theme === 'dark'

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Loader2 size={40} style={{ color: isDark ? c.primary.dark : c.primary.light, animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        )
    }

    return (
        <div style={{
            minHeight: '100%',
            backgroundColor: isDark ? c.backgroundSecondary.dark : c.backgroundSecondary.light,
            padding: 'clamp(1rem, 5vw, 2.5rem) clamp(1rem, 3vw, 1.5rem)',
            color: isDark ? c.text.dark : c.text.light,
            transition: 'all 0.3s ease',
        }}>
            <style>{`
                .courses-header {
                    max-width: 80rem; margin: 0 auto 2rem;
                    display: flex; justify-content: space-between; align-items: center;
                    gap: 1rem;
                }
                .courses-grid {
                    max-width: 80rem; margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 1.5rem;
                }
                .course-card-img { height: 12rem; width: 100%; object-fit: cover; transition: 0.5s; }
                
                @media (min-width: 640px) {
                    .courses-grid { grid-template-columns: repeat(2, 1fr); }
                    .course-card-img { height: 14rem; }
                }
                @media (min-width: 1024px) {
                    .courses-grid { grid-template-columns: repeat(3, 1fr); }
                }
                @media (max-width: 480px) {
                    .courses-header { flex-direction: column; align-items: flex-start; }
                    .cart-status-btn { width: 100%; justify-content: center !important; }
                }
            `}</style>

            {/* Header Section */}
            <div className="courses-header">
                <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 1.875rem)', fontWeight: 'bold', fontStyle: 'italic', textTransform: 'uppercase', margin: 0 }}>
                    Our <span style={{ color: isDark ? c.primary.dark : c.primary.light }}>Courses</span>
                </h1>

                {cart?.length > 0 && (
                    <button
                        className="cart-status-btn"
                        onClick={() => navigate({ to: '/checkout' })}
                        style={{
                            backgroundColor: isDark ? 'rgba(107, 255, 0, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                            border: `1px solid ${isDark ? 'rgba(107, 255, 0, 0.2)' : 'rgba(37, 99, 235, 0.2)'}`,
                            padding: '0.6rem 1.2rem', borderRadius: '12px',
                            display: 'flex', alignItems: 'center', gap: '0.6rem',
                            color: isDark ? c.primary.dark : c.primary.light, 
                            cursor: 'pointer',
                        }}
                    >
                        <ShoppingCart size={18} />
                        <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>{cart.length} Selected</span>
                        <ArrowRight size={16} />
                    </button>
                )}
            </div>

            {/* Courses Grid */}
            <div className="courses-grid">
                {data?.courses.map((item: any) => {
                    const isAlreadyInCart = cart?.some((c) => c.course.id === item.id)

                    return (
                        <div
                            key={item.id}
                            onClick={() => navigate({ to: `/mycourses/${item.id}` })}
                            style={{
                                backgroundColor: isDark ? c.card.dark : c.card.light,
                                border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
                                borderRadius: '1.25rem', overflow: 'hidden', cursor: 'pointer',
                                transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column'
                            }}
                        >
                            {/* Image Container */}
                            <div style={{ position: 'relative', overflow: 'hidden' }}>
                                <img
                                    className="course-card-img"
                                    src={`${imageUrl}${item.image}`}
                                    alt={item.course_name}
                                />
                                <div style={{
                                    position: 'absolute', bottom: '10px', right: '10px',
                                    backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff',
                                    padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 'bold',
                                    backdropFilter: 'blur(4px)'
                                }}>
                                    {item.user?.name?.split(' ')[0] || "DM TECH"}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, lineHeight: '1.3' }}>
                                    {item.course_name}
                                </h3>

                                <p style={{
                                    fontSize: '0.85rem', color: isDark ? c.textSecondary.dark : c.textSecondary.light,
                                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden', height: '2.5rem', margin: 0
                                }}>
                                    {item.description}
                                </p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '0.7rem', fontWeight: 'bold', opacity: 0.5 }}>Price</span>
                                        <span style={{ fontSize: '1.5rem', fontWeight: '900', color: isDark ? c.primary.dark : c.primary.light }}>
                                            ₹{item.price}
                                        </span>
                                    </div>
                                    <div style={{ textAlign: 'right', fontSize: '0.7rem', opacity: 0.6 }}>
                                        ★ Premium
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem' }}>
                                    <Button
                                        onClick={async (e) => {
                                            e.stopPropagation()
                                            if (isAlreadyInCart) {
                                                await removeCart({ data: { courseId: item.id, userId: item.userId } })
                                                courseActions.removeFromCart(item.id)
                                            } else {
                                                await addCart({ data: { courseId: item.id, userId: item.userId } })
                                                const cartShape: CartCourse = { id: Date.now(), userId: item.userId, course_id: item.id, course: item }
                                                courseActions.addToCart(cartShape)
                                            }
                                        }}
                                        style={{
                                            flex: 1, borderRadius: '12px', height: '45px', fontSize: '0.85rem', fontWeight: '900',
                                            cursor: 'pointer', border: 'none',
                                            backgroundColor: isAlreadyInCart
                                                ? (isDark ? 'rgba(239, 68, 68, 0.15)' : '#fef2f2')
                                                : (isDark ? c.primary.dark : c.primary.light),
                                            color: isAlreadyInCart
                                                ? (isDark ? '#f87171' : '#ef4444')
                                                : (isDark ? '#000000' : '#ffffff'),
                                        }}
                                    >
                                        {isAlreadyInCart ? "Unselect" : "Enroll Now"}
                                    </Button>

                                    {isAlreadyInCart && (
                                        <Button
                                            onClick={(e) => { e.stopPropagation(); navigate({ to: '/checkout' }) }}
                                            style={{
                                                backgroundColor: isDark ? c.primary.dark : c.primary.light,
                                                color: isDark ? '#000' : '#fff',
                                                width: '45px', height: '45px', borderRadius: '12px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                border: 'none', cursor: 'pointer',
                                            }}
                                        >
                                            <ArrowRight size={22} />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MainCourses