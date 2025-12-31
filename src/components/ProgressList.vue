<template>
    <div class="gap-0 grid max-md:grid-cols-1 min-md:grid-cols-2 justify-items-center">
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
            data-aos-once="true" data-aos-anchor-placement="top-center"
            class="min-md:col-span-2 w-full h-full transition-all duration-500 hover:border-slate-100 bg-gray-800/60 border-2 border-gray-600">
            <img src="https://cdn.bandom.site/umineko/public/poster.webp" alt="" class="object-cover w-full h-full">
        </div>
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
            data-aos-once="true" data-aos-anchor-placement="top-center"
            class="py-4 min-md:col-span-2 w-full h-full transition-all duration-500 hover:border-slate-100 bg-gray-800/60 border-2 border-gray-600">
            <img src="https://cdn.bandom.site/umineko/public/title1_logo.webp" alt=""
                class="object-cover w-full h-full">
        </div>
        <Modal :type="'episode'" :data="ep1Chapters" />
        <Modal :type="'episode'" :data="ep2Chapters" />
        <Modal :type="'episode'" :data="ep3Chapters" />
        <Modal :type="'episode'" :data="ep4Chapters" />
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
            data-aos-once="true" data-aos-anchor-placement="top-center"
            class="py-4 min-md:col-span-2 w-full h-full transition-all duration-500 hover:border-slate-100 bg-gray-800/60 border-2 border-gray-600">
            <img src="https://cdn.bandom.site/umineko/public/title2_logo.webp" alt=""
                class="object-cover w-full h-full">
        </div>
        <Modal :type="'episode'" :data="ep5Chapters" />
        <Modal :type="'episode'" :data="ep6Chapters" />
        <Modal :type="'episode'" :data="ep7Chapters" />
        <Modal :type="'episode'" :data="ep8Chapters" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Modal from './Modal.vue'

const ep1Chapters = ref([])
const ep2Chapters = ref([])
const ep3Chapters = ref([])
const ep4Chapters = ref([])
const ep5Chapters = ref([])
const ep6Chapters = ref([])
const ep7Chapters = ref([])
const ep8Chapters = ref([])

onMounted(async () => {
    try {
        const res = await axios.get('/data/umineko.json')
        ep1Chapters.value = res.data.episodes[0]
        ep2Chapters.value = res.data.episodes[1]
        ep3Chapters.value = res.data.episodes[2]
        ep4Chapters.value = res.data.episodes[3]
        ep5Chapters.value = res.data.episodes[4]
        ep6Chapters.value = res.data.episodes[5]
        ep7Chapters.value = res.data.episodes[6]
        ep8Chapters.value = res.data.episodes[7]
    } catch (err) {
        console.error('Gagal memuat episodes.json', err)
    }
})
</script>
