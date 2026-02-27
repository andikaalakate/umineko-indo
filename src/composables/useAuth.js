import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

/**
 * Composable untuk autentikasi admin menggunakan Supabase Auth.
 * 
 * Cara penggunaan:
 *   const { user, loading, signIn, signOut, initSession } = useAuth()
 */
export function useAuth() {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // ─────────────────────────────────────────────
  // Sign In: Login dengan email + password
  // ─────────────────────────────────────────────
  async function signIn(email, password) {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (err) throw err
      user.value = data.user
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  // ─────────────────────────────────────────────
  // Sign Out: Logout dari sesi aktif
  // ─────────────────────────────────────────────
  async function signOut() {
    loading.value = true
    try {
      await supabase.auth.signOut()
      user.value = null
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // ─────────────────────────────────────────────
  // Init Session: Cek apakah sudah ada sesi aktif (saat pertama buka halaman)
  // Penting dipanggil di onMounted AdminView agar state tidak hilang saat refresh
  // ─────────────────────────────────────────────
  async function initSession() {
    const { data } = await supabase.auth.getSession()
    if (data?.session?.user) {
      user.value = data.session.user
    }

    // Pantau perubahan auth state secara realtime
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
    })
  }

  return {
    user,
    loading,
    error,
    signIn,
    signOut,
    initSession,
  }
}
