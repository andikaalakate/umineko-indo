import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ── Halaman utama (landing page) ─────────────────────
    {
      path: "/",
      name: "home",
      component: () => import("@views/HomeView.vue"),
    },

    // ── Daftar blog (publik) ─────────────────────────────
    {
      path: "/blog",
      name: "blog",
      component: () => import("@views/BlogView.vue"),
    },

    // ── Detail satu postingan berdasarkan slug ───────────
    // Contoh URL: /blog/update-terjemahan-episode-3
    {
      path: "/blog/:slug",
      name: "post",
      component: () => import("@views/PostView.vue"),
    },

    // ── Admin panel (dilindungi oleh Supabase Auth) ──────
    // Akses di: /admin
    {
      path: "/admin",
      name: "admin",
      component: () => import("@views/AdminView.vue"),
    },
  ],

  // Scroll ke atas saat berpindah halaman
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
