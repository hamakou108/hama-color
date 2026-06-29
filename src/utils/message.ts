import type { Effect } from './rule'

export type Message = { action: 'set'; effect: Effect } | { action: 'reset' }
