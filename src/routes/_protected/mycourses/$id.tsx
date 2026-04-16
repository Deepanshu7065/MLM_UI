import { ViewOpenCourseDetails } from '@/components/Courses/CourseModal'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/mycourses/$id')({
  component: ViewOpenCourseDetails,
})
