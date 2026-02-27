import { createClient } from '@supabase/supabase-js'

// Nilai ini diambil dari environment variables (.env)
// Jangan pernah hardcode URL dan key langsung di sini
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Supabase env variables tidak ditemukan! Buat file .env dari .env.example')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
