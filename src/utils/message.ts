import type { Effect } from '@/utils/rule'

export type Message = { action: 'set'; effect: Effect } | { action: 'reset' }
