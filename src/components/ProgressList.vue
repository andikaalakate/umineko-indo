<template>
    <div class="gap-0 grid max-md:grid-cols-1 min-md:grid-cols-2 justify-items-center">
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
            data-aos-once="true" data-aos-anchor-placement="top-center"
            class="py-4 min-md:col-span-2 w-full h-full transition-all duration-500 hover:border-slate-100 cursor-pointer bg-gray-800/60 border-2 border-gray-600">
            <img src="/title1_logo.webp" alt="" class="object-cover w-full h-full">
        </div>
        <EpisodeProgress pic="/episode/c0101_a.webp" title="Episode 1" :chapters="ep1Chapters" />
        <EpisodeProgress pic="/episode/c0202_a.webp" title="Episode 2" :status="'proses'" />
        <EpisodeProgress pic="/episode/c0301.webp" title="Episode 3" :status="'belum'" />
        <EpisodeProgress pic="/episode/e0405.webp" title="Episode 4" :status="'belum'" />
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
            data-aos-once="true" data-aos-anchor-placement="top-center"
            class="py-4 min-md:col-span-2 w-full h-full transition-all duration-500 hover:border-slate-100 cursor-pointer bg-gray-800/60 border-2 border-gray-600">
            <img src="/title2_logo.webp" alt="" class="object-cover w-full h-full">
        </div>
        <EpisodeProgress pic="/episode/ep504.webp" title="Episode 5" :status="'belum'" />
        <EpisodeProgress pic="/episode/ep606_3.webp" title="Episode 6" :status="'belum'" />
        <EpisodeProgress pic="/episode/ep701.webp" title="Episode 7" :status="'belum'" />
        <EpisodeProgress pic="/episode/ep818.webp" title="Episode 8" :status="'belum'" />
    </div>
</template>

<script setup>
import EpisodeProgress from './EpisodeProgress.vue'

const ep1Chapters = [
    {
        name: 'Chapter 0',
        status: 'done',
        translator: 'Andika Alakate',
        updatedAt: '2025-07-15',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 1',
        status: 'done',
        translator: 'Andika Alakate',
        updatedAt: '2025-07-15',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 2',
        status: 'done',
        translator: 'Andika Alakate',
        updatedAt: '2025-07-15',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 3',
        status: 'done',
        translator: 'Andika Alakate',
        updatedAt: '2025-07-15',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 4',
        status: 'done',
        translator: 'Andika Alakate',
        updatedAt: '2025-07-15',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 5',
        status: 'done',
        translator: 'Andika Alakate',
        updatedAt: '2025-07-15',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 6',
        status: 'done',
        translator: 'Frederizal',
        updatedAt: '2025-07-15',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 7',
        status: 'done',
        translator: 'Frederizal',
        updatedAt: '2025-07-15',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 8',
        status: 'done',
        translator: 'Frederizal',
        updatedAt: '2025-07-15',
        note: 'Sudah QC'
    },
    { name: 'Chapter 9', done: false },
    { name: 'Chapter 10', done: false },
    { name: 'Chapter 11', done: false },
    { name: 'Chapter 12', done: false },
    { name: 'Chapter 13', done: false },
    { name: 'Chapter 14', done: false },
    { name: 'Chapter 15', done: false },
    { name: 'Chapter 16', done: false },
    { name: 'Chapter 17', done: false },
    { name: 'Tea Party', done: false },
    { name: 'Ura', done: false },
    { name: 'Bonus', done: false },
]
</script>
