import { ListSessions } from '@/modules/dashboard/pages/sessions/list-sessions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/my-sessions')({
  component: ListSessions,
})
