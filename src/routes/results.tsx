import { Results } from '@/pages/Results'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/results')({
  component: Results,
})
