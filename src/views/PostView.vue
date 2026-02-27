<template>
  <div class="text-white font-sans min-h-screen bg-gray-900">
    <!-- ── Loading ───────────────────────────────────────── -->
    <div v-if="loading" class="flex justify-center items-center py-48">
      <div class="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- ── Post tidak ditemukan ──────────────────────────── -->
    <div v-else-if="error || !post" class="text-center py-48 px-4">
      <h1 class="text-3xl font-bold mb-4">Postingan tidak ditemukan.</h1>
      <p class="text-gray-400 mb-8">Mungkin sudah dihapus atau belum dipublikasi.</p>
      <RouterLink
        to="/blog"
        class="bg-black/75 border-2 border-white px-8 py-3 font-bold uppercase
               hover:bg-white hover:text-black transition-all duration-500">
        ← Kembali ke Blog
      </RouterLink>
    </div>

    <!-- ── Konten postingan ──────────────────────────────── -->
    <article v-else class=" from-black/90 to-black bg-linear-to-b">
      <!-- Hero section dengan cover image -->
      <div class="relative h-72 md:h-150 overflow-hidden border-gray-800">
        <!-- Cover image atau gradient fallback -->
        <div
          v-if="post.cover_url"
          class="absolute inset-0 bg-cover bg-top scale-105"
          :style="`background-image: url('${post.cover_url}')`">
        </div>
        <div v-else class="absolute inset-0 bg-linear-to-br from-gray-800 to-black"></div>

        <!-- Overlay gelap agar teks terbaca -->
        <div class="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>

        <!-- Judul & meta di atas cover -->
        <div class="relative z-10 flex flex-col justify-end h-full max-w-4xl mx-auto px-4 pb-10">
          <time class="text-xs text-gray-400 uppercase tracking-widest mb-3">
            {{ formatDate(post.created_at) }}
          </time>
          <h1 class="text-3xl lg:text-5xl font-bold leading-tight text-shadow-lg text-shadow-black">
            {{ post.title }}
          </h1>
        </div>
      </div>

      <!-- Isi artikel -->
      <div class="max-w-4xl mx-auto px-4 py-12">

        <!-- Excerpt / lead paragraph jika ada -->
        <p
          v-if="post.excerpt"
          class="text-xl text-gray-300 leading-relaxed border-l-4 border-white pl-5 mb-10 italic">
          {{ post.excerpt }}
        </p>

        <!--
          Konten utama.
          Kami render sebagai HTML menggunakan v-html karena konten
          sudah diformat sebagai HTML dari admin panel.
          Kelas "prose-blog" mendefinisikan typography untuk konten artikel.
        -->
        <div
          class="prose-blog text-gray-200 leading-[175%] text-lg"
          v-html="renderedContent">
        </div>

        <!-- Navigasi bawah -->
        <div class="mt-16 pt-8 border-t border-gray-800 flex justify-between items-center gap-4 flex-wrap">
          <RouterLink
            to="/blog"
            class="bg-black/75 border-2 border-white px-6 py-2 font-bold uppercase text-sm
                   hover:bg-white hover:text-black transition-all duration-500">
            ← Kembali ke Blog
          </RouterLink>

          <a
            href="https://trakteer.id/larus-team/tip?open=true"
            target="_blank"
            class="bg-black/75 border-2 border-white px-6 py-2 font-bold uppercase text-sm
                   hover:bg-white hover:text-black transition-all duration-500">
            ♥ Dukung Kami
          </a>
        </div>
      </div>
    </article>

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { marked } from 'marked'
import { useBlog } from '@/composables/useBlog'
import AppHeader from '@components/AppHeader.vue'

const route = useRoute()
const { post, loading, error, fetchPost } = useBlog()

// Konfigurasi marked agar link terbuka di tab baru
marked.setOptions({ breaks: true })

// Render markdown → HTML menggunakan marked.js
// Kita bungkus dalam computed agar reaktif ketika post.value berubah
const renderedContent = computed(() => {
  if (!post.value?.content) return ''
  return marked(post.value.content)
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

onMounted(() => {
  // Ambil slug dari URL parameter (/blog/:slug)
  fetchPost(route.params.slug)
})
</script>

<style>
/*
  Typography untuk konten artikel (prose-blog).
  Karena Tailwind v4 memreset semua style HTML default,
  kita perlu mendefinisikan ulang gaya untuk heading, list, link, dsb.
  Ini hanya berlaku di dalam elemen yang punya kelas .prose-blog
*/
.prose-blog h1,
.prose-blog h2,
.prose-blog h3,
.prose-blog h4 {
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}
.prose-blog h1 { font-size: 1.875rem; }
.prose-blog h2 { font-size: 1.5rem; border-bottom: 1px solid #374151; padding-bottom: 0.5rem; }
.prose-blog h3 { font-size: 1.25rem; }

.prose-blog p {
  margin-bottom: 1.25rem;
}

.prose-blog a {
  color: #93c5fd;
  text-decoration: underline;
}
.prose-blog a:hover {
  color: #bfdbfe;
}

.prose-blog ul,
.prose-blog ol {
  margin-left: 1.5rem;
  margin-bottom: 1.25rem;
}
.prose-blog ul { list-style-type: disc; }
.prose-blog ol { list-style-type: decimal; }
.prose-blog li { margin-bottom: 0.4rem; }

.prose-blog blockquote {
  border-left: 4px solid #6b7280;
  padding-left: 1.25rem;
  color: #9ca3af;
  font-style: italic;
  margin: 1.5rem 0;
}

.prose-blog code {
  background-color: #1f2937;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: monospace;
}

.prose-blog pre {
  background-color: #111827;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1.25rem;
}
.prose-blog pre code {
  background: transparent;
  padding: 0;
}

.prose-blog img {
  max-width: 100%;
  border: 2px solid #374151;
  margin: 1.5rem auto;
  display: block;
}

.prose-blog hr {
  border-color: #374151;
  margin: 2rem 0;
}

.prose-blog strong { font-weight: 700; }
.prose-blog em { font-style: italic; }
</style>
