import * as migration_20260211_000000_initial from './20260211_000000_initial'

export const migrations = [
  {
    up: migration_20260211_000000_initial.up,
    down: migration_20260211_000000_initial.down,
    name: '20260211_000000_initial',
  },
]
