<template>
  <div class="text-white font-sans min-h-screen bg-gray-950 select-none">

    <!-- ═══════════════════════════════════════════════════════════════
         TOAST NOTIFICATION SYSTEM
         Ditampilkan di pojok kanan bawah, bisa muncul beberapa sekaligus
         ═══════════════════════════════════════════════════════════════ -->
    <div class="fixed bottom-6 right-6 z-100 flex flex-col gap-2 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="t in toasts"
          :key="t.id"
          class="pointer-events-auto flex items-start gap-3 px-4 py-3 border-2 min-w-70 max-w-sm
                 backdrop-blur-md shadow-2xl"
          :class="{
            'bg-green-950/90  border-green-600  text-green-200':  t.type === 'success',
            'bg-red-950/90    border-red-600    text-red-200':    t.type === 'error',
            'bg-blue-950/90   border-blue-600   text-blue-200':   t.type === 'info',
            'bg-yellow-950/90 border-yellow-600 text-yellow-200': t.type === 'warn',
          }">
          <span class="text-lg shrink-0 mt-0.5">
            {{ t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : t.type === 'warn' ? '⚠' : 'ℹ' }}
          </span>
          <div class="flex-1 text-sm leading-snug">
            <p class="font-bold uppercase text-xs tracking-widest mb-0.5 opacity-70">{{ t.type }}</p>
            <p>{{ t.message }}</p>
          </div>
          <button @click="dismissToast(t.id)" class="opacity-40 hover:opacity-100 transition-opacity text-xs mt-0.5">✕</button>
        </div>
      </TransitionGroup>
    </div>
    
    <!-- ═══════════════════════════════════════════════════════════════
         HALAMAN LOGIN
         ═══════════════════════════════════════════════════════════════ -->
    <section
      v-if="!authUser"
      class="min-h-screen flex items-center justify-center p-4 relative
             bg-[url(https://cdn.kurokidaizaya.my.id/umineko/public/ep607.webp)] bg-cover bg-center">
      <div class="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

      <Transition name="fade" appear>
        <div class="relative z-10 w-full max-w-sm bg-gray-950/95 border-2 border-gray-700 p-8 shadow-2xl">
          <div class="text-center mb-8">
            <div class="w-16 h-16 border-2 border-white mx-auto mb-4 flex items-center justify-center text-2xl font-black">L</div>
            <h1 class="text-xl font-bold uppercase tracking-widest">LARUS TEAM</h1>
            <p class="text-gray-500 text-xs uppercase tracking-[0.2em] mt-1">Admin Panel</p>
          </div>

          <Transition name="slide-down">
            <div v-if="authError" class="bg-red-950 border border-red-700 text-red-300 text-sm px-4 py-3 mb-5 flex items-center gap-2">
              <span>⚠</span><span>{{ authError }}</span>
            </div>
          </Transition>

          <div class="space-y-4">
            <div>
              <label class="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
              <input v-model="loginEmail" type="email" placeholder="admin@larusteam.id"
                class="w-full bg-gray-900 border-2 border-gray-700 focus:border-white text-white px-4 py-3 outline-none transition-colors placeholder:text-gray-700" />
            </div>
            <div>
              <label class="block text-xs uppercase tracking-widest text-gray-500 mb-2">Password</label>
              <input v-model="loginPassword" type="password" placeholder="••••••••"
                @keyup.enter="handleSignIn"
                class="w-full bg-gray-900 border-2 border-gray-700 focus:border-white text-white px-4 py-3 outline-none transition-colors placeholder:text-gray-700" />
            </div>
            <button @click="handleSignIn" :disabled="authLoading"
              class="w-full bg-white text-black py-3 font-black uppercase tracking-widest
                     hover:bg-gray-200 transition-all duration-300 mt-2 disabled:opacity-40 disabled:cursor-not-allowed">
              {{ authLoading ? 'Memverifikasi...' : 'Masuk' }}
            </button>
          </div>

          <div class="mt-6 text-center border-t border-gray-800 pt-5">
            <RouterLink to="/" class="text-gray-600 text-xs hover:text-gray-400 transition-colors uppercase tracking-widest">
              ← Kembali ke Situs
            </RouterLink>
          </div>
        </div>
      </Transition>
    </section>


    <!-- ═══════════════════════════════════════════════════════════════
         DASHBOARD UTAMA — layout sidebar + konten
         ═══════════════════════════════════════════════════════════════ -->
    <div v-else class="flex h-screen overflow-hidden">

      <!-- ── SIDEBAR ─────────────────────────────────────────────── -->
      <Transition name="sidebar">
        <aside v-show="sidebarOpen || isDesktop"
          class="fixed min-lg:static z-40 inset-y-0 left-0 flex flex-col bg-gray-950 border-r border-gray-800 transition-all duration-300 shrink-0"
          :class="sidebarCollapsed && isDesktop ? 'w-[60px]' : 'w-[220px]'">

          <!-- Logo -->
          <div class="h-16 flex items-center px-4 border-b border-gray-800 gap-3 shrink-0 overflow-hidden">
            <div class="w-8 h-8 border-2 border-white flex items-center justify-center font-black text-sm shrink-0">L</div>
            <div v-show="!sidebarCollapsed || !isDesktop" class="overflow-hidden">
              <p class="font-bold text-sm leading-none whitespace-nowrap">LARUS TEAM</p>
              <p class="text-gray-600 text-xs leading-none mt-1 whitespace-nowrap">Admin Panel</p>
            </div>
          </div>

          <!-- Nav items -->
          <nav class="flex-1 py-4 overflow-y-auto">
            <p v-show="!sidebarCollapsed || !isDesktop" class="text-gray-700 text-[10px] uppercase tracking-[0.2em] px-4 mb-2">Menu</p>

            <button v-for="item in navItems" :key="item.id"
              @click="navigateTo(item.id)"
              :title="item.label"
              class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold uppercase tracking-widest transition-all duration-200"
              :class="activeSection === item.id ? 'bg-white text-black' : 'text-gray-500 hover:text-white hover:bg-gray-800'">
              <span class="text-base shrink-0">{{ item.icon }}</span>
              <span v-show="!sidebarCollapsed || !isDesktop" class="truncate">{{ item.label }}</span>
              <span v-show="item.id === 'posts' && draftCount > 0 && (!sidebarCollapsed || !isDesktop)"
                class="ml-auto text-[10px] bg-yellow-600 text-yellow-100 px-1.5 py-0.5 font-black shrink-0">
                {{ draftCount }}
              </span>
            </button>

            <div class="border-t border-gray-800 my-4 mx-4"></div>
            <p v-show="!sidebarCollapsed || !isDesktop" class="text-gray-700 text-[10px] uppercase tracking-[0.2em] px-4 mb-2">Situs</p>

            <a href="/" target="_blank" title="Lihat Situs"
              class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white hover:bg-gray-800 transition-all duration-200">
              <span class="shrink-0">🌐</span>
              <span v-show="!sidebarCollapsed || !isDesktop">Lihat Situs</span>
            </a>
            <a href="/blog" target="_blank" title="Lihat Blog"
              class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white hover:bg-gray-800 transition-all duration-200">
              <span class="shrink-0">📖</span>
              <span v-show="!sidebarCollapsed || !isDesktop">Lihat Blog</span>
            </a>
          </nav>

          <!-- User info bawah -->
          <div class="border-t border-gray-800 p-3 shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gray-700 border border-gray-600 flex items-center justify-center text-xs font-black shrink-0 uppercase">
                {{ authUser?.email?.[0] || 'A' }}
              </div>
              <div v-show="!sidebarCollapsed || !isDesktop" class="flex-1 overflow-hidden">
                <p class="text-xs font-bold truncate">{{ authUser?.email }}</p>
                <p class="text-gray-600 text-[10px]">Administrator</p>
              </div>
              <button @click="handleSignOut" title="Keluar"
                class="shrink-0 text-gray-600 hover:text-red-400 transition-colors text-sm p-1">⏻</button>
            </div>
          </div>
        </aside>
      </Transition>

      <!-- Mobile overlay -->
      <div v-if="sidebarOpen && !isDesktop"
        class="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
        @click="sidebarOpen = false"></div>


      <!-- ── AREA KONTEN ─────────────────────────────────────────── -->
      <div class="flex-1 flex flex-col overflow-hidden">

        <!-- Topbar -->
        <header class="h-16 bg-gray-950 border-b border-gray-800 flex items-center px-4 gap-4 shrink-0">
          <button @click="toggleSidebar" class="text-gray-500 hover:text-white transition-colors p-1 text-lg leading-none shrink-0">☰</button>

          <div class="flex-1 min-w-0">
            <h1 class="font-bold text-sm uppercase tracking-widest truncate">
              {{ navItems.find(n => n.id === activeSection)?.label || 'Editor' }}
            </h1>
            <p v-if="activeSection === 'editor'" class="text-gray-600 text-xs truncate">
              {{ editingId ? 'Edit: ' + (form.title || '—') : 'Postingan Baru' }}
            </p>
          </div>

          <!-- Topbar actions -->
          <div class="flex items-center gap-2 shrink-0">
            <button v-if="activeSection === 'posts'" @click="openCreateForm"
              class="bg-white text-black px-4 py-1.5 text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all duration-300">
              + Baru
            </button>

            <template v-if="activeSection === 'editor'">
              <span class="text-gray-700 text-xs hidden min-md:inline" v-if="lastSaved">Tersimpan {{ lastSaved }}</span>
              <button @click="saveDraft" :disabled="blogLoading"
                class="border border-gray-700 px-3 py-1.5 text-xs font-bold uppercase hover:border-gray-400 transition-colors disabled:opacity-40">
                Draft
              </button>
              <button @click="savePublish" :disabled="blogLoading || !form.title || !form.content"
                class="bg-white text-black px-4 py-1.5 text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
                {{ blogLoading ? '...' : (editingId ? 'Perbarui' : 'Publikasi') }}
              </button>
              <button @click="closeEditor"
                class="text-gray-500 hover:text-white transition-colors text-xs px-2 py-1.5 border border-gray-800 hover:border-gray-600">
                ✕
              </button>
            </template>
          </div>
        </header>


        <!-- ═══════════════════════════════════════════════════════
             SCROLLABLE MAIN CONTENT
             ═══════════════════════════════════════════════════════ -->
        <div class="flex-1 overflow-y-auto overflow-x-hidden">

          <!-- ┌─────────────────────────────────────────────────────┐
               │  OVERVIEW                                           │
               └─────────────────────────────────────────────────────┘ -->
          <div v-if="activeSection === 'overview'" class="p-6 space-y-6 max-w-6xl mx-auto">

            <div>
              <h2 class="text-2xl font-black uppercase">Selamat datang, Admin 👋</h2>
              <p class="text-gray-500 text-sm mt-1">{{ currentDateTime }}</p>
            </div>

            <!-- Stat cards -->
            <div class="grid grid-cols-2 min-lg:grid-cols-4 gap-3">
              <div v-for="stat in statsCards" :key="stat.label"
                class="border-2 p-4 transition-all duration-300 cursor-pointer group"
                :class="stat.borderClass"
                @click="stat.action && stat.action()">
                <p class="text-3xl font-black mb-1 transition-transform group-hover:scale-105 origin-left">{{ stat.value }}</p>
                <p class="text-xs uppercase tracking-widest" :class="stat.labelClass">{{ stat.label }}</p>
                <p class="text-gray-700 text-[10px] mt-2 group-hover:text-gray-500 transition-colors">{{ stat.sub }}</p>
              </div>
            </div>

            <!-- Two panel layout: recent posts + quick actions -->
            <div class="grid grid-cols-1 min-lg:grid-cols-3 gap-4">

              <!-- Recent posts -->
              <div class="min-lg:col-span-2 border border-gray-800 bg-gray-900/40">
                <div class="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-400">Postingan Terbaru</h3>
                  <button @click="navigateTo('posts')" class="text-xs text-gray-600 hover:text-white transition-colors uppercase tracking-widest">Lihat semua →</button>
                </div>
                <div v-if="recentPosts.length === 0" class="py-10 text-center text-gray-700 text-sm">Belum ada postingan</div>
                <div v-for="p in recentPosts" :key="p.id"
                  class="flex items-center gap-3 px-4 py-3 border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors group">
                  <div class="w-10 h-10 bg-gray-800 shrink-0 overflow-hidden border border-gray-700">
                    <img v-if="p.cover_url" :src="p.cover_url" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-gray-700 text-xs">📄</div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold truncate">{{ p.title }}</p>
                    <p class="text-gray-600 text-xs">{{ formatDate(p.created_at) }}</p>
                  </div>
                  <span class="text-[10px] font-black uppercase px-2 py-0.5 border shrink-0"
                    :class="p.published ? 'border-green-700 text-green-400' : 'border-yellow-800 text-yellow-600'">
                    {{ p.published ? 'Publik' : 'Draft' }}
                  </span>
                  <button @click="openEditForm(p)"
                    class="text-gray-700 group-hover:text-white text-xs opacity-0 group-hover:opacity-100 transition-all shrink-0 border border-transparent hover:border-gray-600 p-1">
                    ✎
                  </button>
                </div>
              </div>

              <!-- Quick actions + breakdown -->
              <div class="border border-gray-800 bg-gray-900/40">
                <div class="px-4 py-3 border-b border-gray-800">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-400">Aksi Cepat</h3>
                </div>
                <div class="p-3 space-y-2">
                  <button @click="openCreateForm"
                    class="w-full border-2 border-white bg-white text-black px-4 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all duration-300">
                    ✚ Postingan Baru
                  </button>
                  <button @click="navigateTo('posts')"
                    class="w-full border border-gray-700 px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:border-white hover:text-white transition-all duration-300">
                    ☰ Kelola Postingan
                  </button>
                  <a href="/blog" target="_blank"
                    class="block w-full border border-gray-700 px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:border-white hover:text-white transition-all duration-300 text-center">
                    ↗ Lihat Blog Publik
                  </a>
                </div>

                <!-- Progress bars -->
                <div class="px-4 pt-2 pb-4 border-t border-gray-800 mt-2">
                  <p class="text-[10px] text-gray-700 uppercase tracking-widest mb-3">Breakdown Status</p>
                  <div class="mb-3">
                    <div class="flex justify-between text-xs mb-1">
                      <span class="text-green-500">Publik</span>
                      <span class="text-gray-500">{{ publishedCount }} / {{ posts.length }}</span>
                    </div>
                    <div class="h-1 bg-gray-800">
                      <div class="h-1 bg-green-600 transition-all duration-700"
                        :style="`width: ${posts.length ? (publishedCount / posts.length * 100) : 0}%`"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-xs mb-1">
                      <span class="text-yellow-600">Draft</span>
                      <span class="text-gray-500">{{ draftCount }} / {{ posts.length }}</span>
                    </div>
                    <div class="h-1 bg-gray-800">
                      <div class="h-1 bg-yellow-700 transition-all duration-700"
                        :style="`width: ${posts.length ? (draftCount / posts.length * 100) : 0}%`"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>


          <!-- ┌─────────────────────────────────────────────────────┐
               │  POSTS TABLE                                        │
               └─────────────────────────────────────────────────────┘ -->
          <div v-if="activeSection === 'posts'" class="p-6 space-y-4">

            <!-- Toolbar -->
            <div class="flex flex-wrap gap-3 items-center">
              <!-- Search -->
              <div class="relative flex-1 min-w-[200px]">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">🔍</span>
                <input v-model="searchQuery" type="text" placeholder="Cari judul atau slug..."
                  class="w-full bg-gray-900 border border-gray-700 focus:border-white text-white pl-9 pr-8 py-2 text-sm outline-none transition-colors" />
                <button v-if="searchQuery" @click="searchQuery = ''"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors text-xs">✕</button>
              </div>

              <!-- Filter tabs -->
              <div class="flex border border-gray-700">
                <button v-for="tab in filterTabs" :key="tab.id"
                  @click="activeFilter = tab.id"
                  class="px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200"
                  :class="activeFilter === tab.id ? 'bg-white text-black' : 'text-gray-500 hover:text-white hover:bg-gray-800'">
                  {{ tab.label }} <span class="opacity-50 ml-1">{{ tab.count }}</span>
                </button>
              </div>

              <!-- Sort -->
              <select v-model="sortBy"
                class="bg-gray-900 border border-gray-700 text-gray-400 px-3 py-2 text-xs outline-none focus:border-white transition-colors cursor-pointer">
                <option value="created_at_desc">Terbaru</option>
                <option value="created_at_asc">Terlama</option>
                <option value="title_asc">Judul A–Z</option>
                <option value="title_desc">Judul Z–A</option>
              </select>
            </div>

            <!-- Bulk action bar -->
            <Transition name="slide-down">
              <div v-if="selectedIds.size > 0"
                class="flex items-center gap-4 bg-blue-950/70 border border-blue-700 px-4 py-3">
                <span class="text-blue-300 text-sm font-bold">{{ selectedIds.size }} dipilih</span>
                <div class="flex gap-2 ml-auto flex-wrap">
                  <button @click="bulkPublish(true)"
                    class="border border-green-700 text-green-400 px-3 py-1 text-xs font-bold uppercase hover:bg-green-900/50 transition-all">
                    ✓ Publik
                  </button>
                  <button @click="bulkPublish(false)"
                    class="border border-yellow-700 text-yellow-500 px-3 py-1 text-xs font-bold uppercase hover:bg-yellow-900/50 transition-all">
                    ▼ Draft
                  </button>
                  <button @click="bulkDeleteConfirm"
                    class="border border-red-800 text-red-400 px-3 py-1 text-xs font-bold uppercase hover:bg-red-900/50 transition-all">
                    🗑 Hapus
                  </button>
                  <button @click="selectedIds = new Set()"
                    class="border border-gray-700 text-gray-500 px-3 py-1 text-xs font-bold uppercase hover:border-white hover:text-white transition-all">
                    ✕ Batal
                  </button>
                </div>
              </div>
            </Transition>

            <!-- Loading -->
            <div v-if="blogLoading" class="flex justify-center py-24">
              <div class="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>

            <!-- Tabel -->
            <div v-else class="border border-gray-800 overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-800 bg-gray-900/60">
                    <th class="w-10 px-4 py-3">
                      <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll"
                        class="accent-white w-3.5 h-3.5 cursor-pointer" />
                    </th>
                    <th class="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Postingan</th>
                    <th class="text-center px-4 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold hidden min-md:table-cell">Status</th>
                    <th class="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold hidden min-lg:table-cell">Tanggal</th>
                    <th class="text-right px-4 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="filteredPosts.length === 0">
                    <td colspan="5" class="text-center py-20 text-gray-700">
                      <div class="text-3xl mb-3">🔎</div>
                      <p class="text-sm">Tidak ada postingan ditemukan</p>
                      <p v-if="searchQuery" class="text-xs text-gray-800 mt-1">Untuk "{{ searchQuery }}"</p>
                    </td>
                  </tr>

                  <tr v-for="p in paginatedPosts" :key="p.id"
                    class="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors group"
                    :class="selectedIds.has(p.id) ? 'bg-blue-950/20' : ''">

                    <td class="px-4 py-3 w-10">
                      <input type="checkbox" :checked="selectedIds.has(p.id)" @change="toggleSelect(p.id)"
                        class="accent-white w-3.5 h-3.5 cursor-pointer" />
                    </td>

                    <td class="px-4 py-3">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-gray-800 border border-gray-700 shrink-0 overflow-hidden hidden min-sm:block">
                          <img v-if="p.cover_url" :src="p.cover_url" class="w-full h-full object-cover" />
                          <div v-else class="w-full h-full flex items-center justify-center text-gray-700 text-xs">📄</div>
                        </div>
                        <div class="min-w-0">
                          <p class="font-bold text-sm truncate max-w-[280px]">{{ p.title }}</p>
                          <code class="text-[10px] text-gray-600 font-mono">/blog/{{ p.slug }}</code>
                        </div>
                      </div>
                    </td>

                    <td class="px-4 py-3 text-center hidden min-md:table-cell">
                      <button @click="togglePublish(p)"
                        class="text-[10px] font-black uppercase px-2 py-1 border transition-all duration-200"
                        :class="p.published ? 'border-green-700 text-green-400 hover:bg-green-900/30' : 'border-yellow-800 text-yellow-600 hover:bg-yellow-900/30'"
                        :title="p.published ? 'Klik → jadikan draft' : 'Klik → publikasikan'">
                        {{ p.published ? '● Publik' : '○ Draft' }}
                      </button>
                    </td>

                    <td class="px-4 py-3 text-gray-600 text-xs hidden min-lg:table-cell">
                      <p>{{ formatDate(p.created_at) }}</p>
                    </td>

                    <td class="px-4 py-3">
                      <div class="flex gap-1.5 justify-end">
                        <a v-if="p.published" :href="`/blog/${p.slug}`" target="_blank"
                          class="border border-gray-800 group-hover:border-gray-600 px-2 py-1 text-xs text-gray-600 group-hover:text-gray-300 transition-all" title="Lihat">↗</a>
                        <button @click="openEditForm(p)"
                          class="border border-gray-700 hover:border-white px-2 py-1 text-xs font-bold uppercase text-gray-400 hover:text-white transition-all">
                          Edit
                        </button>
                        <button @click="confirmDelete(p)"
                          class="border border-transparent hover:border-red-800 px-2 py-1 text-xs text-gray-700 hover:text-red-400 transition-all">
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="flex items-center justify-between pt-2">
              <p class="text-gray-600 text-xs">
                {{ (currentPage - 1) * pageSize + 1 }}–{{ Math.min(currentPage * pageSize, filteredPosts.length) }}
                dari {{ filteredPosts.length }}
              </p>
              <div class="flex gap-1">
                <button @click="currentPage--" :disabled="currentPage === 1"
                  class="border border-gray-700 px-3 py-1 text-xs font-bold hover:border-white transition-all disabled:opacity-30 disabled:cursor-not-allowed">←</button>
                <button v-for="page in visiblePages" :key="page" @click="currentPage = page"
                  class="border px-3 py-1 text-xs font-bold transition-all"
                  :class="page === currentPage ? 'border-white bg-white text-black' : 'border-gray-700 hover:border-white'">
                  {{ page }}
                </button>
                <button @click="currentPage++" :disabled="currentPage === totalPages"
                  class="border border-gray-700 px-3 py-1 text-xs font-bold hover:border-white transition-all disabled:opacity-30 disabled:cursor-not-allowed">→</button>
              </div>
            </div>
            <p v-else class="text-gray-700 text-xs text-right">{{ filteredPosts.length }} postingan</p>
          </div>


          <!-- ┌─────────────────────────────────────────────────────┐
               │  EDITOR                                             │
               └─────────────────────────────────────────────────────┘ -->
          <div v-if="activeSection === 'editor'" class="flex flex-col" style="height: calc(100vh - 4rem)">

            <!-- Meta bar -->
            <div class="border-b border-gray-800 bg-gray-950 px-4 py-3 space-y-3 shrink-0">
              <div class="flex gap-3 items-end flex-wrap">
                <div class="flex-1 min-w-[240px]">
                  <input v-model="form.title" @input="autoSlug" type="text" placeholder="Judul Postingan..."
                    class="w-full bg-transparent border-b-2 border-gray-700 focus:border-white text-xl font-bold text-white pb-1 outline-none transition-colors placeholder:text-gray-700 placeholder:font-normal placeholder:text-lg" />
                </div>
                <div class="flex items-center gap-2 shrink-0">
                  <span class="text-gray-700 text-xs">/blog/</span>
                  <input v-model="form.slug" type="text"
                    class="bg-gray-900 border border-gray-700 focus:border-white text-gray-400 font-mono text-xs px-2 py-1.5 outline-none w-48 transition-colors"
                    placeholder="slug-url" />
                </div>
              </div>

              <div class="flex gap-3 flex-wrap items-center">
                <div class="flex-1 min-w-[180px]">
                  <input v-model="form.cover_url" type="url" placeholder="URL Cover Image..."
                    class="w-full bg-gray-900 border border-gray-700 focus:border-white text-gray-400 text-xs px-3 py-2 outline-none transition-colors" />
                </div>
                <div v-if="form.cover_url" class="w-12 h-8 border border-gray-700 overflow-hidden shrink-0">
                  <img :src="form.cover_url" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 min-w-[180px]">
                  <input v-model="form.excerpt" type="text" placeholder="Excerpt / ringkasan singkat..."
                    class="w-full bg-gray-900 border border-gray-700 focus:border-white text-gray-400 text-xs px-3 py-2 outline-none transition-colors" />
                </div>
                <!-- Published toggle -->
                <label class="flex items-center gap-2 cursor-pointer shrink-0">
                  <div class="relative w-8 h-4">
                    <input v-model="form.published" type="checkbox" class="sr-only" />
                    <div class="w-8 h-4 border-2 transition-colors duration-300"
                      :class="form.published ? 'bg-green-600 border-green-500' : 'bg-gray-800 border-gray-600'"></div>
                    <div class="absolute top-[2px] w-2.5 h-2.5 bg-white transition-all duration-300"
                      :class="form.published ? 'left-[18px]' : 'left-[2px]'"></div>
                  </div>
                  <span class="text-xs uppercase font-bold tracking-widest"
                    :class="form.published ? 'text-green-400' : 'text-gray-600'">
                    {{ form.published ? 'Publik' : 'Draft' }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Editor split pane -->
            <div class="flex-1 flex overflow-hidden">

              <!-- Markdown input area -->
              <div class="flex flex-col overflow-hidden"
                :class="previewMode === 'split' ? 'flex-1 border-r border-gray-800' : previewMode === 'editor' ? 'flex-1' : 'hidden'">

                <!-- Markdown toolbar -->
                <div class="flex items-center gap-1 px-3 py-2 border-b border-gray-800 bg-gray-950 shrink-0 flex-wrap">
                  <button v-for="t in markdownToolbar" :key="t.label" @click="insertMarkdown(t.syntax, t.wrap)" :title="t.label"
                    class="text-xs text-gray-500 hover:text-white hover:bg-gray-800 px-2 py-1 transition-all font-mono border border-transparent hover:border-gray-700">
                    {{ t.icon }}
                  </button>
                  <div class="flex-1"></div>
                  <span class="text-[10px] text-gray-700 font-mono">{{ wordCount }}w · ~{{ readingTime }}m</span>
                  <!-- Preview mode switcher -->
                  <div class="flex border border-gray-800 ml-2">
                    <button v-for="mode in previewModes" :key="mode.id" @click="previewMode = mode.id" :title="mode.label"
                      class="px-2 py-1 text-xs transition-all"
                      :class="previewMode === mode.id ? 'bg-gray-700 text-white' : 'text-gray-600 hover:text-white'">
                      {{ mode.icon }}
                    </button>
                  </div>
                </div>

                <textarea ref="editorTextarea" v-model="form.content"
                  @keydown="handleEditorKeydown"
                  placeholder="Tulis konten di sini menggunakan Markdown...

# Heading 1
## Heading 2

Paragraf biasa dengan **tebal** dan *miring*.

- Item list

> Blockquote

```
blok kode
```"
                  class="flex-1 resize-none bg-gray-950 text-gray-300 text-sm font-mono leading-relaxed px-6 py-4 outline-none placeholder:text-gray-800"
                  spellcheck="false">
                </textarea>
              </div>

              <!-- Preview panel -->
              <div class="overflow-y-auto bg-gray-900"
                :class="previewMode === 'split' ? 'flex-1' : previewMode === 'preview' ? 'flex-1' : 'hidden'">
                <div class="px-6 py-4">
                  <p class="text-[10px] text-gray-700 uppercase tracking-widest mb-4 font-bold">Preview</p>
                  <div v-if="!renderedContent" class="text-gray-800 text-sm italic">Preview akan muncul saat kamu menulis...</div>
                  <div v-else class="prose-blog text-gray-200 leading-[175%] text-sm" v-html="renderedContent"></div>
                </div>
              </div>
            </div>

          </div>
          <!-- end editor -->

        </div>
        <!-- end scrollable -->
      </div>
      <!-- end konten -->
    </div>
    <!-- end flex dashboard -->


    <!-- ═══════════════════════════════════════════════════════════════
         MODAL: Konfirmasi Hapus Satu
         ═══════════════════════════════════════════════════════════════ -->
    <Transition name="fade">
      <div v-if="deletingPost" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85"
        @click.self="deletingPost = null">
        <div class="bg-gray-950 border-2 border-red-900 p-7 max-w-md w-full shadow-2xl">
          <h3 class="text-lg font-black uppercase mb-1">Hapus Postingan?</h3>
          <p class="text-gray-500 text-sm mb-5">
            <span class="text-white font-bold">"{{ deletingPost.title }}"</span> akan dihapus permanen.
          </p>
          <div class="flex gap-3">
            <button @click="executeDelete" :disabled="blogLoading"
              class="bg-red-900 border-2 border-red-700 text-red-200 px-6 py-2 font-bold uppercase text-xs hover:bg-red-800 transition-all disabled:opacity-40">
              {{ blogLoading ? 'Menghapus...' : '🗑 Hapus' }}
            </button>
            <button @click="deletingPost = null"
              class="border border-gray-700 px-6 py-2 font-bold uppercase text-xs text-gray-400 hover:border-white hover:text-white transition-all">
              Batal
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ═══════════════════════════════════════════════════════════════
         MODAL: Konfirmasi Hapus Bulk
         ═══════════════════════════════════════════════════════════════ -->
    <Transition name="fade">
      <div v-if="showBulkDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85"
        @click.self="showBulkDeleteConfirm = false">
        <div class="bg-gray-950 border-2 border-red-900 p-7 max-w-md w-full shadow-2xl">
          <h3 class="text-lg font-black uppercase mb-1">Hapus {{ selectedIds.size }} Postingan?</h3>
          <p class="text-gray-500 text-sm mb-5">Semua postingan yang dipilih akan dihapus permanen.</p>
          <div class="flex gap-3">
            <button @click="executeBulkDelete" :disabled="blogLoading"
              class="bg-red-900 border-2 border-red-700 text-red-200 px-6 py-2 font-bold uppercase text-xs hover:bg-red-800 transition-all disabled:opacity-40">
              {{ blogLoading ? 'Menghapus...' : `🗑 Hapus ${selectedIds.size}` }}
            </button>
            <button @click="showBulkDeleteConfirm = false"
              class="border border-gray-700 px-6 py-2 font-bold uppercase text-xs text-gray-400 hover:border-white hover:text-white transition-all">
              Batal
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { marked } from 'marked'
import { useAuth } from '@/composables/useAuth'
import { useBlog } from '@/composables/useBlog'

// ════════════════════════════════════════════════════════
// AUTH
// ════════════════════════════════════════════════════════
const {
  user: authUser, loading: authLoading, error: authError,
  signIn, signOut, initSession,
} = useAuth()
const loginEmail    = ref('')
const loginPassword = ref('')

async function handleSignIn() {
  const ok = await signIn(loginEmail.value, loginPassword.value)
  if (ok) { toast('success', 'Login berhasil!'); await fetchAllPosts() }
}
async function handleSignOut() {
  await signOut()
  posts.value = []
  toast('info', 'Kamu telah keluar.')
}


// ════════════════════════════════════════════════════════
// BLOG CRUD
// ════════════════════════════════════════════════════════
const {
  posts, loading: blogLoading,
  fetchAllPosts, createPost, updatePost, deletePost, generateSlug,
} = useBlog()


// ════════════════════════════════════════════════════════
// TOAST SYSTEM
// ════════════════════════════════════════════════════════
const toasts = ref([])
let toastCounter = 0

function toast(type, message, duration = 4000) {
  const id = ++toastCounter
  toasts.value.push({ id, type, message })
  setTimeout(() => dismissToast(id), duration)
}
function dismissToast(id) {
  toasts.value = toasts.value.filter(t => t.id !== id)
}


// ════════════════════════════════════════════════════════
// LAYOUT
// ════════════════════════════════════════════════════════
const sidebarOpen      = ref(false)
const sidebarCollapsed = ref(false)
const isDesktop        = ref(window.innerWidth >= 1024)

function toggleSidebar() {
  if (isDesktop.value) sidebarCollapsed.value = !sidebarCollapsed.value
  else sidebarOpen.value = !sidebarOpen.value
}
function handleResize() {
  isDesktop.value = window.innerWidth >= 1024
  if (isDesktop.value) sidebarOpen.value = false
}
onMounted(()  => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))


// ════════════════════════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════════════════════════
const activeSection = ref('overview')

const navItems = [
  { id: 'overview', label: 'Overview',  icon: '◈' },
  { id: 'posts',    label: 'Postingan', icon: '☰' },
]

function navigateTo(id) {
  activeSection.value = id
  if (!isDesktop.value) sidebarOpen.value = false
}


// ════════════════════════════════════════════════════════
// STATS
// ════════════════════════════════════════════════════════
const publishedCount = computed(() => posts.value.filter(p => p.published).length)
const draftCount     = computed(() => posts.value.filter(p => !p.published).length)
const thisMonthCount = computed(() => {
  const now = new Date()
  return posts.value.filter(p => {
    const d = new Date(p.created_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length
})
const recentPosts = computed(() => posts.value.slice(0, 5))

const statsCards = computed(() => [
  { label: 'Total', value: posts.value.length, sub: 'Semua postingan',
    borderClass: 'border-gray-700 hover:border-white', labelClass: 'text-gray-400',
    action: () => navigateTo('posts') },
  { label: 'Publik', value: publishedCount.value, sub: 'Terlihat pengunjung',
    borderClass: 'border-gray-700 hover:border-green-600', labelClass: 'text-green-500',
    action: () => { navigateTo('posts'); activeFilter.value = 'published' } },
  { label: 'Draft', value: draftCount.value, sub: 'Belum dipublikasi',
    borderClass: 'border-gray-700 hover:border-yellow-600', labelClass: 'text-yellow-600',
    action: () => { navigateTo('posts'); activeFilter.value = 'draft' } },
  { label: 'Bulan Ini', value: thisMonthCount.value, sub: 'Postingan baru',
    borderClass: 'border-gray-700 hover:border-blue-600', labelClass: 'text-blue-400' },
])

// Clock
const currentDateTime = ref('')
function updateDateTime() {
  currentDateTime.value = new Date().toLocaleString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}
let dateInterval
onMounted(()  => { updateDateTime(); dateInterval = setInterval(updateDateTime, 60000) })
onUnmounted(() => clearInterval(dateInterval))


// ════════════════════════════════════════════════════════
// POSTS TABLE
// ════════════════════════════════════════════════════════
const searchQuery  = ref('')
const activeFilter = ref('all')
const sortBy       = ref('created_at_desc')
const currentPage  = ref(1)
const pageSize     = 10

watch([searchQuery, activeFilter, sortBy], () => { currentPage.value = 1 })

const filterTabs = computed(() => [
  { id: 'all',       label: 'Semua',  count: posts.value.length },
  { id: 'published', label: 'Publik', count: publishedCount.value },
  { id: 'draft',     label: 'Draft',  count: draftCount.value },
])

const filteredPosts = computed(() => {
  let r = [...posts.value]
  if (activeFilter.value === 'published') r = r.filter(p => p.published)
  if (activeFilter.value === 'draft')     r = r.filter(p => !p.published)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    r = r.filter(p => p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q))
  }
  // Sort
  const parts = sortBy.value.split('_')
  const dir   = parts.pop()                        // 'asc' atau 'desc'
  const field = parts.join('_')                    // 'created_at' atau 'title'
  r.sort((a, b) => {
    const av = a[field] || '', bv = b[field] || ''
    const cmp = av < bv ? -1 : av > bv ? 1 : 0
    return dir === 'asc' ? cmp : -cmp
  })
  return r
})

const totalPages    = computed(() => Math.max(1, Math.ceil(filteredPosts.value.length / pageSize)))
const paginatedPosts = computed(() => {
  const s = (currentPage.value - 1) * pageSize
  return filteredPosts.value.slice(s, s + pageSize)
})
const visiblePages = computed(() => {
  const pages = []
  for (let i = Math.max(1, currentPage.value - 2); i <= Math.min(totalPages.value, currentPage.value + 2); i++) pages.push(i)
  return pages
})

// Inline toggle publish dari tabel (tanpa buka editor)
async function togglePublish(p) {
  const updated = await updatePost(p.id, { published: !p.published })
  if (updated) {
    const idx = posts.value.findIndex(x => x.id === p.id)
    if (idx !== -1) posts.value[idx] = { ...posts.value[idx], published: updated.published }
    toast('success', `"${p.title}" ${updated.published ? 'dipublikasikan' : 'dijadikan draft'}.`)
  } else {
    toast('error', 'Gagal mengubah status postingan.')
  }
}


// ════════════════════════════════════════════════════════
// BULK ACTIONS
// ════════════════════════════════════════════════════════
let selectedIds = ref(new Set())

const isAllSelected = computed(() =>
  paginatedPosts.value.length > 0 &&
  paginatedPosts.value.every(p => selectedIds.value.has(p.id))
)
function toggleSelect(id) {
  const next = new Set(selectedIds.value)
  next.has(id) ? next.delete(id) : next.add(id)
  selectedIds.value = next
}
function toggleSelectAll() {
  selectedIds.value = isAllSelected.value
    ? new Set()
    : new Set(paginatedPosts.value.map(p => p.id))
}
async function bulkPublish(pub) {
  let count = 0
  for (const id of [...selectedIds.value]) {
    const r = await updatePost(id, { published: pub })
    if (r) {
      const idx = posts.value.findIndex(p => p.id === id)
      if (idx !== -1) posts.value[idx] = { ...posts.value[idx], published: pub }
      count++
    }
  }
  selectedIds.value = new Set()
  toast('success', `${count} postingan ${pub ? 'dipublikasikan' : 'dijadikan draft'}.`)
}

const showBulkDeleteConfirm = ref(false)
function bulkDeleteConfirm() { showBulkDeleteConfirm.value = true }
async function executeBulkDelete() {
  let count = 0
  const idsToDelete = [...selectedIds.value]
  
  for (const id of idsToDelete) {
    if (await deletePost(id)) count++
  }
  
  selectedIds.value = new Set()
  showBulkDeleteConfirm.value = false
  
  toast('success', `${count} postingan dihapus.`)
}


// ════════════════════════════════════════════════════════
// DELETE SINGLE
// ════════════════════════════════════════════════════════
const deletingPost = ref(null)
function confirmDelete(p) { deletingPost.value = p }
async function executeDelete() {
  const ok = await deletePost(deletingPost.value.id)
  if (ok) {
    toast('success', `"${deletingPost.value.title}" dihapus.`)
    deletingPost.value = null
  } else {
    toast('error', 'Gagal menghapus.')
  }
}


// ════════════════════════════════════════════════════════
// EDITOR
// ════════════════════════════════════════════════════════
const editingId      = ref(null)
const lastSaved      = ref('')
const previewMode    = ref('split')      // 'editor' | 'split' | 'preview'
const editorTextarea = ref(null)

const previewModes = [
  { id: 'editor',  icon: '✎', label: 'Editor saja' },
  { id: 'split',   icon: '⊟', label: 'Split view'  },
  { id: 'preview', icon: '◉', label: 'Preview saja' },
]

const markdownToolbar = [
  { icon: 'B',   label: 'Tebal',      syntax: '**',      wrap: true  },
  { icon: 'I',   label: 'Miring',     syntax: '*',       wrap: true  },
  { icon: '~~',  label: 'Coret',      syntax: '~~',      wrap: true  },
  { icon: 'H2',  label: 'Heading 2',  syntax: '## ',     wrap: false },
  { icon: 'H3',  label: 'Heading 3',  syntax: '### ',    wrap: false },
  { icon: '—',   label: 'Separator',  syntax: '\n---\n', wrap: false },
  { icon: '❝',   label: 'Quote',      syntax: '> ',      wrap: false },
  { icon: '•',   label: 'List',       syntax: '- ',      wrap: false },
  { icon: '1.',  label: 'Ordered',    syntax: '1. ',     wrap: false },
  { icon: '`',   label: 'Code',       syntax: '`',       wrap: true  },
  { icon: '```', label: 'Code Block', syntax: '```\n',   wrap: false },
  { icon: '🔗',  label: 'Link',       syntax: '[teks](url)', wrap: false },
  { icon: '🖼',  label: 'Gambar',     syntax: '![alt](url)', wrap: false },
]

function insertMarkdown(syntax, wrap) {
  const el = editorTextarea.value
  if (!el) return
  const s = el.selectionStart, e = el.selectionEnd
  const sel = form.value.content.substring(s, e)
  const ins = wrap ? (sel ? `${syntax}${sel}${syntax}` : `${syntax}teks${syntax}`) : syntax
  form.value.content = form.value.content.substring(0, s) + ins + form.value.content.substring(e)
  nextTick(() => { el.focus(); const c = s + ins.length; el.setSelectionRange(c, c) })
}

function handleEditorKeydown(e) {
  // Ctrl/Cmd+S → save
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault()
    handleSubmit()
  }
  // Tab → indent dengan 2 spasi
  if (e.key === 'Tab') {
    e.preventDefault()
    const el = e.target
    const s  = el.selectionStart
    form.value.content = form.value.content.substring(0, s) + '  ' + form.value.content.substring(s)
    nextTick(() => el.setSelectionRange(s + 2, s + 2))
  }
}

const emptyForm = () => ({ title: '', slug: '', excerpt: '', content: '', cover_url: '', published: false })
const form      = ref(emptyForm())

const wordCount   = computed(() => form.value.content.trim().split(/\s+/).filter(Boolean).length)
const readingTime = computed(() => Math.max(1, Math.round(wordCount.value / 200)))

marked.setOptions({ breaks: true })
const renderedContent = computed(() => form.value.content ? marked(form.value.content) : '')

function autoSlug() {
  if (!editingId.value) form.value.slug = generateSlug(form.value.title)
}

function openCreateForm() {
  editingId.value = null
  form.value = emptyForm()
  lastSaved.value = ''
  activeSection.value = 'editor'
}

function openEditForm(p) {
  editingId.value = p.id
  form.value = {
    title:     p.title,
    slug:      p.slug,
    excerpt:   p.excerpt   || '',
    content:   p.content   || '',
    cover_url: p.cover_url || '',
    published: p.published,
  }
  lastSaved.value = ''
  activeSection.value = 'editor'
}

function closeEditor() {
  activeSection.value = 'posts'
  editingId.value = null
  form.value = emptyForm()
}

// Dua tombol terpisah agar tidak terjadi race condition
function saveDraft()   { form.value.published = false; handleSubmit() }
function savePublish() { form.value.published = true;  handleSubmit() }

async function handleSubmit() {
  if (!form.value.title) { toast('warn', 'Judul wajib diisi.'); return }

  let result
  if (editingId.value) {
    result = await updatePost(editingId.value, form.value)
    if (result) {
      const idx = posts.value.findIndex(p => p.id === editingId.value)
      if (idx !== -1) posts.value[idx] = result
    }
  } else {
    result = await createPost(form.value)
    if (result) {
      posts.value.unshift(result)
      editingId.value = result.id   // beralih ke mode edit setelah create
    }
  }

  if (result) {
    toast('success', form.value.published ? 'Dipublikasikan!' : 'Draft disimpan.')
    lastSaved.value = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  } else {
    toast('error', 'Gagal menyimpan. Coba lagi.')
  }
}


// ════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}


// ════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════
onMounted(async () => {
  await initSession()
  if (authUser.value) await fetchAllPosts()
})
</script>

<style>
/* Toasts */
.toast-enter-active  { transition: all 0.3s ease; }
.toast-leave-active  { transition: all 0.2s ease; }
.toast-enter-from    { opacity: 0; transform: translateY(10px) scale(0.97); }
.toast-leave-to      { opacity: 0; transform: translateX(20px); }

/* Fade (modals) */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

/* Slide down (bulk bar, error) */
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.25s ease; }
.slide-down-enter-from, .slide-down-leave-to       { opacity: 0; transform: translateY(-8px); }

/* Sidebar slide (mobile) */
.sidebar-enter-active, .sidebar-leave-active { transition: transform 0.3s ease; }
.sidebar-enter-from, .sidebar-leave-to       { transform: translateX(-100%); }

/* Prose — typography untuk konten artikel di preview editor */
.prose-blog h1,.prose-blog h2,.prose-blog h3,.prose-blog h4 { font-weight:700; margin-top:1.75rem; margin-bottom:0.6rem; line-height:1.3; }
.prose-blog h1 { font-size:1.6rem; }
.prose-blog h2 { font-size:1.3rem; border-bottom:1px solid #1f2937; padding-bottom:0.4rem; }
.prose-blog h3 { font-size:1.1rem; }
.prose-blog p  { margin-bottom:1rem; }
.prose-blog a  { color:#93c5fd; text-decoration:underline; }
.prose-blog a:hover { color:#bfdbfe; }
.prose-blog ul,.prose-blog ol { margin-left:1.5rem; margin-bottom:1rem; }
.prose-blog ul { list-style-type:disc; }
.prose-blog ol { list-style-type:decimal; }
.prose-blog li { margin-bottom:0.3rem; }
.prose-blog blockquote { border-left:3px solid #4b5563; padding-left:1rem; color:#9ca3af; font-style:italic; margin:1.25rem 0; }
.prose-blog code { background-color:#111827; padding:0.15rem 0.35rem; font-size:0.8rem; font-family:monospace; }
.prose-blog pre  { background-color:#111827; padding:0.875rem; overflow-x:auto; margin-bottom:1rem; }
.prose-blog pre code { background:transparent; padding:0; }
.prose-blog img  { max-width:100%; border:1px solid #374151; margin:1rem auto; display:block; }
.prose-blog hr   { border-color:#1f2937; margin:1.5rem 0; }
.prose-blog strong { font-weight:700; }
.prose-blog em     { font-style:italic; }
</style>