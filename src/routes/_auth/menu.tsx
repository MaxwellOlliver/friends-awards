import { Menu } from '@/pages/Menu'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/menu')({
  component: Menu,
})
