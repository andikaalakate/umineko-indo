<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  type: {
    type: String,
    validator: (value) => ["episode", "team"].includes(value),
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const isOpen = ref(false);

const onKey = (e) => {
  if (e.key === "Escape") isOpen.value = false;
};

onMounted(() => window.addEventListener("keydown", onKey));
onUnmounted(() => window.removeEventListener("keydown", onKey));

watch(isOpen, (val) => {
  if (val) document.body.classList.add("overflow-hidden");
  else document.body.classList.remove("overflow-hidden");
});

const getStatusIcon = (status) => {
  switch (status) {
    case "done":
      return { icon: "✅", color: "text-green-400" };
    case "proses":
      return { icon: "📝", color: "text-yellow-400" };
    case "belum":
      return { icon: "❌", color: "text-red-400" };
    default:
      return { icon: "❌", color: "text-red-400" };
  }
};
</script>

<template>
  <button
    data-aos="fade-up"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
    data-aos-once="true"
    @click="isOpen = true"
    class="mx-auto group transition-all duration-500 cursor-pointer w-full bg-gray-800/60 border-2 border-gray-600 hover:border-slate-100"
  >
    <div class="aspect-video relative overflow-hidden">
      <div
        class="absolute inset-0 bg-black/60 z-10 group-hover:opacity-0 transition"
      ></div>

      <img
        :src="data.pic"
        class="object-cover w-full h-full group-hover:scale-110 transition-all duration-500"
      />

      <div
        class="absolute inset-0 z-20 flex flex-col justify-center items-center text-center transition group-hover:opacity-0"
      >
        <h2
          class="text-2xl xl:text-3xl font-bold uppercase text-white text-shadow-sm text-shadow-black"
        >
          {{ data.title }}
        </h2>
      </div>
    </div>
  </button>

  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
        @click="isOpen = false"
      ></div>
      <transition name="fade-scale">
        <div
          class="relative bg-gray-900/75 text-white max-w-7xl w-fit p-4 h-dvh md:h-auto md:max-h-[calc(100vh-4rem)] md:mx-4 rounded-none md:rounded-2xl border border-gray-700 backdrop-blur-xl shadow-2xl overflow-y-auto overscroll-contain touch-pan-y"
        >
          <button
            @click="isOpen = false"
            class="absolute top-4 right-4 text-xl font-bold text-gray-300 hover:text-white"
          >
            ✕
          </button>

          <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div class="md:col-span-2 space-y-6">
              <h2 class="text-3xl font-extrabold uppercase tracking-wider">
                {{ data.title || data.nama }}
              </h2>
              <div
                class="relative rounded-xl border border-gray-700 aspect-video overflow-hidden"
              >
                <img
                  :src="data.pic"
                  class="w-full h-full object-cover hover:scale-110 transition-all duration-500"
                />
              </div>

              <section v-if="type === 'episode'">
                <h4 class="text-lg font-bold uppercase mb-2">Ringkasan</h4>
                <p class="text-sm text-gray-300 leading-relaxed">
                  {{ data.summary }}
                </p>

                <h4 class="text-lg font-bold uppercase mb-2 mt-4">
                  Progress Episode
                </h4>
                <div
                  class="w-full bg-gray-700 rounded-full h-3 overflow-hidden"
                >
                  <div
                    class="bg-green-500 h-full"
                    :style="{ width: data.progress + '%' }"
                  ></div>
                </div>
                <p class="text-xs text-gray-400 mt-2">
                  {{ data.progress }}% telah diterjemahkan.
                </p>
              </section>

              <section v-if="type === 'team'">
                <h4 class="text-lg font-bold uppercase mb-2">Role</h4>
                <p
                  class="text-sm text-gray-300 leading-relaxed"
                  v-html="data.role"
                ></p>

                <h4 class="text-lg font-bold uppercase mb-2 mt-4">
                  Progress Global
                </h4>
                <div
                  class="w-full bg-gray-700 rounded-full h-3 overflow-hidden"
                >
                  <div
                    class="bg-green-500 h-full"
                    :style="{ width: data.progress + '%' }"
                  ></div>
                </div>
                <p class="text-xs text-gray-400 mt-2">
                  {{ data.progress }}% progres tim.
                </p>
              </section>
            </div>

            <div
              class="md:col-span-3 md:pt-16 pr-1 space-y-6 xl:max-h-[calc(100vh-7rem)] overflow-y-auto"
            >
              <!-- Statistik -->
              <section
                class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
              >
                <div
                  class="bg-gray-800/60 rounded-xl p-3 border border-gray-700"
                >
                  <p class="text-xl font-bold">{{ data.stats?.total }}</p>
                  <p class="text-xs text-gray-400 uppercase">Chapter</p>
                </div>
                <div
                  class="bg-gray-800/60 rounded-xl p-3 border border-gray-700"
                >
                  <p class="text-xl font-bold">{{ data.stats?.done }}</p>
                  <p class="text-xs text-gray-400 uppercase">Selesai</p>
                </div>
                <div
                  class="bg-gray-800/60 rounded-xl p-3 border border-gray-700"
                >
                  <p class="text-xl font-bold">{{ data.stats?.proses }}</p>
                  <p class="text-xs text-gray-400 uppercase">Proses</p>
                </div>
                <div
                  class="bg-gray-800/60 rounded-xl p-3 border border-gray-700"
                >
                  <p class="text-xl font-bold">{{ data.stats?.belum }}</p>
                  <p class="text-xs text-gray-400 uppercase">Belum</p>
                </div>
              </section>

              <!-- Episode details -->
              <section v-if="type === 'episode'">
                <div
                  class="flex items-center justify-between bg-gray-900/80 pb-2"
                >
                  <h3 class="text-2xl font-bold uppercase tracking-wide">
                    Daftar Terjemahan
                  </h3>
                  <span class="text-sm text-gray-400"
                    >{{ data.chapters?.length ?? 0 }} entri</span
                  >
                </div>

                <div class="space-y-3 overflow-y-auto max-h-[45vh] pr-2">
                  <div
                    v-for="(ch, idx) in data.chapters"
                    :key="idx"
                    class="group relative bg-gray-800/60 border border-gray-700 rounded-xl p-4 hover:bg-gray-800 transition"
                  >
                    <div
                      class="absolute left-0 top-0 h-full w-1 rounded-l-xl opacity-70"
                      :class="getStatusIcon(ch.status).color"
                    ></div>
                    <div
                      class="flex flex-col sm:flex-row sm:items-center gap-4 pl-3"
                    >
                      <div class="flex-1">
                        <p class="font-bold text-lg leading-tight">
                          {{ ch.name }}
                        </p>
                        <p class="text-sm text-gray-400">
                          Translator: {{ ch.translator ?? "Tidak ada" }}
                        </p>
                      </div>
                      <div class="flex items-center gap-4 text-sm">
                        <span class="text-gray-400">{{
                          ch.updatedAt ?? "Belum diperbarui"
                        }}</span>
                        <span
                          class="px-3 py-1 rounded-full font-bold text-xs border border-gray-600"
                          :class="getStatusIcon(ch.status).color"
                        >
                          {{
                            ch.status === "done"
                              ? "Selesai"
                              : ch.status === "proses"
                              ? "Proses"
                              : "Belum"
                          }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <section class="mt-4">
                  <h4 class="text-lg font-bold uppercase mb-2">Catatan Tim</h4>
                  <div
                    class="bg-gray-800/60 border border-gray-700 rounded-xl p-4 text-sm text-gray-300 italic"
                  >
                    {{ data.teamNote || "Tidak ada catatan dari tim." }}
                  </div>
                </section>

                <section class="mt-4">
                  <h4 class="text-lg font-bold uppercase mb-2">
                    Aktivitas Terakhir
                  </h4>
                  <ul
                    v-if="data.activity && data.activity.length > 0"
                    class="text-sm text-gray-300 space-y-1"
                  >
                    <li v-for="(act, idx) in data.activity" :key="idx">
                      • {{ act }}
                    </li>
                  </ul>
                  <p v-else class="text-sm text-gray-400">
                    Tidak ada aktivitas terbaru.
                  </p>
                </section>
              </section>

              <!-- Team activity -->
              <section v-if="type === 'team'">
                <h4 class="text-lg font-bold uppercase mb-2">Aktivitas</h4>
                <ul class="text-sm text-gray-300 space-y-1">
                  <li v-for="(act, idx) in data.activity" :key="idx">
                    • {{ act }}
                  </li>
                </ul>
                <p
                  class="mt-4 text-xs text-gray-500 border-t border-gray-700 pt-4"
                >
                  Informasi ini menampilkan progres global anggota tim.
                </p>
              </section>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.45s ease, transform 0.45s ease;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.96);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.97);
}
</style>
