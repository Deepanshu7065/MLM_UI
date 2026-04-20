"use client"

import { useAppForm } from '@/hooks/useAppForm'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'
import { FormInput, FormSelectImages } from '@/components/form/FormInput';
import { useCreateCourseApi } from '@/hooks/courseApi';
import { useStore } from '@tanstack/react-store';
import { userStore } from '@/store/user.store';
import { useTheme } from "@/theme/ThemeProvider"
import { themeColors } from "@/theme/themeConfig"
import { Loader2 } from "lucide-react"

export const Route = createFileRoute('/_protected/addcourses')({
  component: RouteComponent,
})

// Schema and Interfaces remain the same...
interface FormData {
  course_name: string; description: string; image: File; price: string;
  duration: string; category_id: string; user_id: string;
}

const addCourses = z.object({
  course_name: z.string().min(1, "Course name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.instanceof(File).or(z.string()).optional(),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  category_id: z.string().min(1, "Category is required"),
});

function RouteComponent() {
  const { theme } = useTheme()
  const c = themeColors
  const isDark = theme === 'dark'

  const { user, isLoading: userLoading } = useStore(userStore);
  const { mutateAsync, isPending } = useCreateCourseApi()

  const form = useAppForm({
    defaultValues: {
      course_name: "", description: "", image: "" as any,
      price: "", duration: "", category_id: "", user_id: user?.userId || ""
    },
    validators: {
      onChange: ({ value }) => {
        const result = addCourses.safeParse(value);
        return result.success ? undefined : result.error.flatten().fieldErrors;
      }
    },
    onSubmit: async ({ value }: { value: FormData }) => {
      const fd = new FormData();
      Object.entries(value).forEach(([key, val]) => {
        if (!val) return;
        fd.append(key, val as any);
      });
      await mutateAsync({ data: fd });
    }
  });

  if (userLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: isDark ? c.background.dark : c.background.light }}>
      <Loader2 size={40} style={{ color: isDark ? c.primary.dark : c.primary.light, animation: 'spin 1s linear infinite' }} />
    </div>
  )

  if (!user) return <div style={{ color: isDark ? c.text.dark : c.text.light, padding: '2rem' }}>Not logged in</div>

  const inputStyle = {
    height: '2.75rem',
    borderRadius: '0.75rem',
    backgroundColor: isDark ? c.backgroundSecondary.dark : c.backgroundSecondary.light,
    border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
    color: isDark ? c.text.dark : c.text.light,
    padding: '0 1rem',
    width: '100%',
    transition: 'all 0.2s ease',
  }

  return (
    <div style={{
      minHeight: '100%',
      backgroundColor: isDark ? c.background.dark : c.background.light,
      color: isDark ? c.text.dark : c.text.light,
      transition: 'background-color 0.3s ease',
    }}>
      {/* HERO SECTION */}
      <div style={{ position: 'relative', height: '300px', width: '100%', overflow: 'hidden' }}>
        <img
          src="/assets/online.jpg"
          alt="Add Course"
          style={{ position: 'absolute', inset: 0, height: '100%', width: '100%', objectFit: 'cover', opacity: isDark ? 0.3 : 0.6 }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'linear-gradient(to top, #0f172a, rgba(15, 23, 42, 0.8), transparent)'
            : 'linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0.7), transparent)'
        }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '80rem', margin: '0 auto', height: '100%', display: 'flex', alignItems: 'end', padding: '0 1.5rem 2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Add New Course</h1>
            <p style={{ color: isDark ? c.textSecondary.dark : c.textSecondary.light, marginTop: '0.5rem' }}>
              Create and publish a new course for your platform users
            </p>
          </div>
        </div>
      </div>

      {/* FORM SECTION */}
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{
          backgroundColor: isDark ? c.card.dark : c.card.light,
          border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
          borderRadius: '1.5rem',
          padding: '2.5rem',
          boxShadow: isDark ? 'none' : '0 10px 25px rgba(0,0,0,0.05)',
        }}>
          <form.AppForm form={form}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

              <form.AppField name="course_name">
                {(field) => <FormInput field={field} type="text" placeholder="Course Name" style={inputStyle} />}
              </form.AppField>

              <form.AppField name="price">
                {(field) => <FormInput field={field} type="number" placeholder="Price (₹)" style={inputStyle} />}
              </form.AppField>

              <form.AppField name="duration">
                {(field) => <FormInput field={field} type="number" placeholder="Duration (Weeks)" style={inputStyle} />}
              </form.AppField>

              <form.AppField name="category_id">
                {(field) => <FormInput field={field} type="text" placeholder="Category ID" style={inputStyle} />}
              </form.AppField>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <form.AppField name="description">
                {(field) => (
                  <FormInput
                    field={field}
                    type="text"
                    placeholder="Course Description"
                    style={{ ...inputStyle, height: '120px', padding: '1rem' }}
                  />
                )}
              </form.AppField>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <form.AppField name="image">
                {(field) => (
                  <FormSelectImages
                    field={field}
                    type="file"
                    placeholder="Upload Course Image"
                    style={{ ...inputStyle, display: 'flex', alignItems: 'center' }}
                  />
                )}
              </form.AppField>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2.5rem' }}>
              <button
                type="submit"
                disabled={isPending}
                style={{
                  backgroundColor: isDark ? c.primary.dark : c.primary.light,
                  color: isDark ? '#000000' : '#ffffff',
                  fontWeight: 'bold',
                  padding: '0.8rem 2.5rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: isPending ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: isPending ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {isPending && <Loader2 size={16} className="animate-spin" />}
                {isPending ? "Creating..." : "Create Course"}
              </button>
            </div>
          </form.AppForm>
        </div>
      </div>
    </div>
  )
}