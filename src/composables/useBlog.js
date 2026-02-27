import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

export function useBlog() {
  const posts = ref([])
  const post = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // ─────────────────────────────
  // Pagination State (untuk public blog)
  // ─────────────────────────────
  const page = ref(1)
  const perPage = ref(6)
  const total = ref(0)

  const totalPages = computed(() => {
    return Math.ceil(total.value / perPage.value)
  })

  function setPage(newPage) {
    if (newPage < 1 || newPage > totalPages.value) return
    page.value = newPage
    fetchPosts()
  }

  // ─────────────────────────────
  // READ: Public posts dengan pagination
  // ─────────────────────────────
  async function fetchPosts() {
    loading.value = true
    error.value = null

    try {
      const from = (page.value - 1) * perPage.value
      const to = from + perPage.value - 1

      const { data, count, error: err } = await supabase
        .from('posts')
        .select(
          'id, title, slug, excerpt, cover_url, created_at',
          { count: 'exact' }
        )
        .eq('published', true)
        .order('created_at', { ascending: false })
        .range(from, to)

      if (err) throw err

      posts.value = data || []
      total.value = count || 0
    } catch (err) {
      error.value = err.message
      posts.value = []
    } finally {
      loading.value = false
    }
  }

  // ─────────────────────────────
  // READ (Admin): Semua posts tanpa pagination
  // Untuk admin panel yang butuh semua data sekaligus
  // ─────────────────────────────
  async function fetchAllPosts() {
    loading.value = true
    error.value = null

    try {
      const { data, error: err } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (err) throw err

      posts.value = data || []
      total.value = data?.length || 0
    } catch (err) {
      error.value = err.message
      posts.value = []
    } finally {
      loading.value = false
    }
  }

  async function fetchPost(slug) {
    loading.value = true
    error.value = null
    post.value = null

    try {
      const { data, error: err } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (err) throw err
      post.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchLatestPosts(limit = 6) {
    loading.value = true
    error.value = null

    try {
      const { data, error: err } = await supabase
        .from('posts')
        .select('id, title, slug, excerpt, cover_url, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (err) throw err

      posts.value = data || []
    } catch (err) {
      error.value = err.message
      posts.value = []
    } finally {
      loading.value = false
    }
  }

  async function createPost(formData) {
    loading.value = true
    error.value = null

    try {
      const slug = formData.slug || generateSlug(formData.title)

      const { data, error: err } = await supabase
        .from('posts')
        .insert([{ ...formData, slug }])
        .select()
        .single()

      if (err) throw err
      return data
    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  async function updatePost(id, formData) {
    loading.value = true
    error.value = null

    try {
      const { data, error: err } = await supabase
        .from('posts')
        .update(formData)
        .eq('id', id)
        .select()
        .single()

      if (err) throw err
      return data
    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  async function deletePost(id) {
    loading.value = true
    error.value = null

    try {
      const { error: err } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

      if (err) throw err

      // Hapus dari local state
      posts.value = posts.value.filter(p => p.id !== id)
      if (total.value > 0) total.value--

      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  function generateSlug(title) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  return {
    posts,
    post,
    loading,
    error,
    page,
    perPage,
    total,
    totalPages,
    setPage,
    fetchPosts,
    fetchPost,
    fetchLatestPosts,
    fetchAllPosts,
    createPost,
    updatePost,
    deletePost,
    generateSlug,
  }
}