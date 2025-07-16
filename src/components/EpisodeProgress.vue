<script setup>
const props = defineProps({
    title: String,
    pic: String,
    chapters: Array,
    status: {
        type: String,
        validator: (value) => ['proses', 'belum'].includes(value),
    }
})

// Mapping status ke emoji atau teks
const getStatusIcon = (status) => {
    switch (status) {
        case 'done':
            return { icon: '✅', color: 'text-green-400' }
        case 'draft':
            return { icon: '🟨', color: 'text-yellow-400' }
        case 'not-started':
        default:
            return { icon: '❌', color: 'text-red-400' }
    }
}
</script>

<template>
    <button data-aos="fade-up" data-aos-duration="1000"
        data-aos-easing="ease-in-out" data-aos-mirror="true" data-aos-once="true" data-aos-anchor-placement="top-center"
        :popovertarget="title"
        class="mx-auto group hover:border-slate-100 transition-all duration-500 cursor-pointer w-full bg-gray-800/60 border-2 border-gray-600">
        <div class="aspect-video relative overflow-hidden">
            <div
                class="absolute opacity-100 group-hover:opacity-0 flex transition-all duration-500 inset-0 z-2 bg-black/60">
            </div>
            <img :src="pic" alt="" class="object-cover group-hover:scale-110 w-full h-full transition-all duration-500">
            <div
                class="absolute opacity-100 group-hover:opacity-0 flex transition-all duration-500 z-3 text-center flex-col justify-center top-0 bottom-0 right-0 left-0">
                <h2
                    class="max-lg:text-xl min-lg:text-2xl min-xl:text-3xl text-shadow-sm text-shadow-black font-bold text-white pb-4 uppercase">
                    {{ title }}
                </h2>
            </div>
        </div>
    </button>

    <div popover :id="title"
        class="bg-gray-800/60 backdrop:bg-[rgba(30,30,30,0.5)] text-white max-w-7xl h-fit max-h-[calc(100vh-4rem)] justify-center mx-auto my-auto items-center rounded-lg p-4 border border-gray-600 z-51 backdrop-blur-lg translate-y-24 opacity-0 transition-discrete [:popover-open]:opacity-100 [:popover-open]:translate-y-0 [:popover-open]:starting:opacity-0 [:popover-open]:starting:-translate-y-56 transition-all duration-750">
        <button :popovertarget="title" popovertargetaction="hide"
            class="absolute top-4 right-4 font-bold text-xl border-1 border-white px-1.5">X</button>

        <h2 class="text-2xl uppercase font-bold">{{ title }}</h2>
        <div class="my-4 border-2 border-white overflow-hidden aspect-video">
            <img :src="pic" alt="" class="w-full h-full object-cover hover:scale-110 transition-all duration-500">
        </div>

        <div class="mt-3 overflow-auto">
            <table v-if="chapters?.length" class="table-auto border-2 border-white text-center w-full">
                <thead class="border-2 border-white">
                    <tr class="border-2 border-white">
                        <th class="border-2 border-white p-2">Nama</th>
                        <th class="border-2 border-white p-2">Translator</th>
                        <th class="border-2 border-white p-2">Diperbarui</th>
                        <th class="border-2 border-white p-2">Status</th>
                    </tr>
                </thead>
                <tbody class="border-2 border-white">
                    <tr v-for="(ch, index) in chapters" :key="index" class="border-2 border-white">
                        <td class="border-2 border-white p-2">{{ ch.name }}</td>
                        <td class="border-2 border-white p-2">{{ ch.translator ?? 'Tidak ada' }}</td>
                        <td class="border-2 border-white p-2">{{ ch.updatedAt ?? 'Belum ada' }}</td>
                        <td class="border-2 border-white p-2" :class="getStatusIcon(ch.status).color">{{
                            getStatusIcon(ch.status).icon }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-else-if="status" class="text-gray-400 font-bold italic text-center">
                {{ status === 'proses' ? 'Dalam proses...' : 'Belum dimulai' }}
            </div>
        </div>
    </div>
</template>
