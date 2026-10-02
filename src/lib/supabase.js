import { createClient } from '@supabase/supabase-js'

const rawUrl = import.meta.env.VITE_SUPABASE_URL
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validasi apakah env Supabase sudah diisi dengan kredensial valid
export const isSupabaseConfigured = Boolean(
  rawUrl &&
  rawKey &&
  rawUrl !== 'undefined' &&
  rawKey !== 'undefined' &&
  typeof rawUrl === 'string' &&
  rawUrl.trim() !== '' &&
  rawUrl.startsWith('http')
)

if (!isSupabaseConfigured) {
  console.warn(
    '⚠️ [Supabase] Environment variables (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) belum dikonfigurasi.\n' +
    'Website berjalan dalam mode offline/fallback tanpa database. Fitur blog dan login dinonaktifkan dengan aman.'
  )
}

// Fallback dummy credentials agar createClient tidak melempar error startup saat .env belum dibuat
const fallbackUrl = 'https://mock-supabase-placeholder.supabase.co'
const fallbackKey = 'mock-anon-key-placeholder'

export const supabase = isSupabaseConfigured
  ? createClient(rawUrl, rawKey)
  : createClient(fallbackUrl, fallbackKey)
