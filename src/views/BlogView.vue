<template>
  <div class="text-white font-sans min-h-dvh relative">
    <!-- Hero -->
    <section
      ref="heroSection"
      id="hero"
      class="relative w-full h-[calc(100dvh-4rem)] overflow-hidden"
    >
      <!-- Parallax Background -->
      <div
        ref="parallaxBg"
        class="absolute inset-0 bg-cover bg-bottom-left lg:bg-top max-sm:scale-120 will-change-transform bg-[url(https://cdn.kurokidaizaya.my.id/umineko/public/ep803.webp)]"
      ></div>

      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"
      ></div>

      <!-- Content -->
      <div
        class="relative z-10 text-center flex flex-col justify-end h-full px-4 pb-16"
      >
        <h2 class="max-lg:text-3xl min-lg:text-4xl font-bold text-white mb-4">
          Blog & Berita
        </h2>
        <p class="text-gray-300">
          Berita terkini, pengumuman, dan catatan perkembangan terjemahan.
        </p>
      </div>
    </section>

    <!-- Header -->
    <header
      :class="[
        'sticky top-0 z-50 backdrop-blur h-16 border-b border-gray-700 p-4 transition-all duration-500',
        isPastSection ? 'bg-black/40' : 'bg-black',
      ]"
    >
      <div
        :class="[
          'h-full w-full mx-auto transition-all duration-500 flex justify-between items-center text-white',
          isPastSection ? 'max-w-352' : 'max-w-full',
        ]"
      >
        <RouterLink to="/" class="text-xl font-bold">LARUS TEAM</RouterLink>
        <a
          href="https://trakteer.id/larus-team/tip?open=true"
          target="_blank"
          class="text-white font-bold hover:underline border-2 border-white uppercase px-2 py-1"
        >
          Support
        </a>
      </div>
    </header>

    <main
      class="min-h-dvh mx-auto px-4 py-12 relative z-10 bg-linear-to-b from-black via-gray-900 to-black before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)] before:pointer-events-none border-4 border-black hover:border-slate-200 transition-all duration-500 bg-repeat-y"
    >
      <div class="absolute inset-0 bg-black/60 z-0 backdrop-blur-2xl"></div>
      <!-- Konten -->
      <div class="relative z-10">
        <!-- ── Heading ──────────────────────────────────────── -->
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
          class="text-center mb-10"
        >
          <h1
            class="text-lg lg:text-3xl font-bold uppercase underline text-shadow-lg text-shadow-black mb-4"
          >
            Kumpulan Postingan & Berita
          </h1>
        </div>

        <!-- ── Loading state ────────────────────────────────── -->
        <div v-if="loading" class="flex justify-center items-center py-24">
          <div
            class="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"
          ></div>
        </div>

        <!-- ── Error state ──────────────────────────────────── -->
        <div v-else-if="error" class="text-center py-24">
          <p class="text-red-400 text-xl">
            Gagal memuat postingan: {{ error }}
          </p>
          <button
            @click="fetchPosts"
            class="mt-4 bg-black/75 border-2 border-white px-6 py-2 font-bold uppercase hover:bg-white hover:text-black transition-all duration-500"
          >
            Coba Lagi
          </button>
        </div>

        <!-- ── Empty state ──────────────────────────────────── -->
        <div v-else-if="posts.length === 0" class="text-center py-24">
          <p class="text-gray-500 text-xl">
            Belum ada postingan yang dipublikasi.
          </p>
        </div>

        <!-- ── Grid kartu postingan ─────────────────────────── -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          <article
            v-for="(item, index) in posts"
            :key="item.id"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-once="true"
            :data-aos-delay="(index % 3) * 100"
            class="group border-2 border-gray-700 hover:border-slate-200 transition-all duration-500 bg-gray-800/40 backdrop-blur-xl flex flex-col overflow-hidden"
          >
            <!-- Cover image -->
            <div class="overflow-hidden max-h-64 bg-gray-800">
              <img
                v-if="item.cover_url"
                :src="item.cover_url"
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <!-- Fallback jika tidak ada cover -->
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-800 to-gray-900"
              >
                <span class="text-4xl opacity-20">📜</span>
              </div>
            </div>

            <!-- Konten kartu -->
            <div class="flex flex-col flex-1 p-5">
              <!-- Tanggal -->
              <time
                class="text-xs text-gray-500 uppercase tracking-widest mb-2"
              >
                {{ formatDate(item.created_at) }}
              </time>

              <!-- Judul -->
              <h2
                class="text-lg font-bold text-white leading-snug mb-3 line-clamp-2 group-hover:underline"
              >
                {{ item.title }}
              </h2>

              <!-- Excerpt -->
              <p
                class="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1"
              >
                {{ item.excerpt || "Klik untuk membaca selengkapnya..." }}
              </p>

              <!-- Tombol Baca -->
              <RouterLink
                :to="`/blog/${item.slug}`"
                class="mt-4 block text-center bg-black/75 border-2 border-white py-2 text-sm font-bold uppercase hover:bg-white hover:text-black transition-all duration-500"
              >
                Baca Selengkapnya
              </RouterLink>
            </div>
          </article>
        </div>

        <!-- ── Pagination ─────────────────────────────────────── -->
        <div
          v-if="!loading && !error && totalPages > 1"
          class="mt-12 flex justify-center items-center gap-2 flex-wrap"
        >
          <!-- Prev -->
          <button
            @click="setPage(page - 1)"
            :disabled="page === 1"
            class="px-4 py-2 border-2 border-white text-sm font-bold uppercase disabled:opacity-30 hover:cursor-pointer disabled:cursor-not-allowed hover:bg-white hover:text-black transition-all duration-300"
          >
            Prev
          </button>

          <!-- Numbered buttons -->
          <button
            v-for="n in totalPages"
            :key="n"
            @click="setPage(n)"
            :class="[
              'hover:cursor-pointer px-4 py-2 border-2 text-sm font-bold uppercase transition-all duration-300',
              n === page
                ? 'bg-white text-black border-white'
                : 'border-white hover:bg-white hover:text-black',
            ]"
          >
            {{ n }}
          </button>

          <!-- Next -->
          <button
            @click="setPage(page + 1)"
            :disabled="page === totalPages"
            class="px-4 py-2 border-2 border-white text-sm font-bold uppercase disabled:opacity-30 hover:cursor-pointer disabled:cursor-not-allowed hover:bg-white hover:text-black transition-all duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useBlog } from "@/composables/useBlog";
import AppHeader from "@components/AppHeader.vue";

const { posts, loading, error, page, totalPages, setPage, fetchPosts } =
  useBlog();

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

onMounted(() => {
  fetchPosts();
});
</script>
