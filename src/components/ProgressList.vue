<template>
    <div class="gap-0 grid max-md:grid-cols-1 min-md:grid-cols-2 justify-items-center">
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
            data-aos-once="true" data-aos-anchor-placement="top-center"
            class="min-md:col-span-2 w-full h-full transition-all duration-500 hover:border-slate-100 cursor-pointer bg-gray-800/60 border-2 border-gray-600">
            <img src="/poster.webp" alt="" class="object-cover w-full h-full">
        </div>
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
            data-aos-once="true" data-aos-anchor-placement="top-center"
            class="py-4 min-md:col-span-2 w-full h-full transition-all duration-500 hover:border-slate-100 cursor-pointer bg-gray-800/60 border-2 border-gray-600">
            <img src="/title1_logo.webp" alt="" class="object-cover w-full h-full">
        </div>
        <EpisodeProgress pic="/episode/c0101_a.webp" title="Episode 1" :chapters="ep1Chapters" />
        <EpisodeProgress pic="/episode/c0202_a.webp" title="Episode 2" :chapters="ep2Chapters" />
        <EpisodeProgress pic="/episode/c0301.webp" title="Episode 3" :chapters="ep3Chapters" />
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
        name: 'Prolog',
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
    {
        name: 'Chapter 9',
        status: 'done',
        translator: 'Frederizal',
        updatedAt: '2025-07-16',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 10',
        status: 'done',
        translator: 'Frederizal',
        updatedAt: '2025-07-30',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 11',
        status: 'proses',
        translator: 'Frederizal',
        updatedAt: '2025-07-30',
        note: 'Sudah QC'
    },
    { name: 'Chapter 12' },
    { name: 'Chapter 13' },
    { name: 'Chapter 14' },
    { name: 'Chapter 15' },
    { name: 'Chapter 16' },
    { name: 'Chapter 17' },
    { name: 'Tea Party' },
    { name: 'Ura' },
    { name: 'Bonus' },
    {
        name: 'Movie (Subtitle)',
        status: 'done',
        translator: 'Angga Kun',
        updatedAt: '2025-07-10',
        note: 'Sudah QC'
    },
    {
        name: 'UI / UX',
        status: 'done',
        translator: 'Andika Alakate',
        updatedAt: '2025-07-14',
        note: 'Sudah QC'
    },
]

const ep2Chapters = [
    {
        name: 'Prolog',
        status: 'done',
        translator: 'Bagus Setiawan',
        updatedAt: '2025-07-29',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 1',
        status: 'done',
        translator: 'Mamat Supriyanto',
        updatedAt: '2025-08-09',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 2',
        status: 'done',
        translator: 'Lawliet',
        updatedAt: '2025-07-29',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 3',
        status: 'proses',
        translator: 'Bagus Setiawan',
        updatedAt: '2025-07-29',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 4',
        status: 'proses',
        translator: 'Lawliet',
        updatedAt: '2025-07-29',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 5',
        status: 'proses',
        translator: 'Mamat Supriyanto',
        updatedAt: '2025-08-09',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 6',
        status: 'done',
        translator: 'Lilith TL',
        updatedAt: '2025-08-12',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 7',
        status: 'proses',
        translator: 'Lilith TL',
        updatedAt: '2025-08-12',
        note: 'Sudah QC'
    },
    { name: 'Chapter 8' },
    { name: 'Chapter 9' },
    { name: 'Chapter 10' },
    { name: 'Chapter 11' },
    { name: 'Chapter 12' },
    { name: 'Chapter 13' },
    { name: 'Chapter 14' },
    { name: 'Chapter 15' },
    { name: 'Chapter 16' },
    { name: 'Chapter 17' },
    { name: 'Chapter 18' },
    { name: 'Chapter 19' },
    { name: 'Chapter 20' },
    { name: 'Tea Party' },
    { name: 'Ura' },
    { name: 'Bonus' },
    {
        name: 'Movie (Subtitle)',
        status: 'done',
        translator: 'Angga Kun',
        updatedAt: '2025-07-30',
        note: 'Sudah QC'
    },
    {
        name: 'UI / UX',
        status: 'proses',
        translator: 'Andika Alakate',
        updatedAt: '2025-07-30',
        note: 'Sudah QC'
    },
]

const ep3Chapters = [
    {
        name: 'Prolog',
        status: 'proses',
        translator: 'Bil',
        updatedAt: '2025-07-29',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 1',
        status: 'done',
        translator: 'Grey',
        updatedAt: '2025-08-12',
        note: 'Sudah QC'
    },
    {
        name: 'Chapter 2',
        // status: 'proses',
        // translator: 'Grey',
        // updatedAt: '2025-08-12',
        // note: 'Sudah QC'
    },
    {
        name: 'Chapter 3',
        // status: 'proses',
        // translator: 'Bagus Setiawan',
        // updatedAt: '2025-07-29',
        // note: 'Sudah QC'
    },
    {
        name: 'Chapter 4',
        // status: 'proses',
        // translator: 'Lawliet',
        // updatedAt: '2025-07-29',
        // note: 'Sudah QC'
    },
    {
        name: 'Chapter 5',
        // status: 'proses',
        // translator: 'Mamat Supriyanto',
        // updatedAt: '2025-08-09',
        // note: 'Sudah QC'
    },
    {
        name: 'Chapter 6',
        // status: 'done',
        // translator: 'Lilith TL',
        // updatedAt: '2025-08-12',
        // note: 'Sudah QC'
    },
    {
        name: 'Chapter 7',
        // status: 'done',
        // translator: 'Lilith TL',
        // updatedAt: '2025-08-12',
        // note: 'Sudah QC'
    },
    { name: 'Chapter 8' },
    { name: 'Chapter 9' },
    { name: 'Chapter 10' },
    { name: 'Chapter 11' },
    { name: 'Chapter 12' },
    { name: 'Chapter 13' },
    { name: 'Chapter 14' },
    { name: 'Chapter 15' },
    { name: 'Chapter 16' },
    { name: 'Chapter 17' },
    { name: 'Chapter 18' },
    { name: 'Chapter 19' },
    { name: 'Chapter 20' },
    { name: 'Tea Party' },
    { name: 'Ura' },
    { name: 'Bonus' },
    {
        name: 'Movie (Subtitle)',
        status: 'done',
        translator: 'Angga Kun',
        updatedAt: '2025-07-30',
        note: 'Sudah QC'
    },
    {
        name: 'UI / UX',
        status: 'proses',
        translator: 'Andika Alakate',
        updatedAt: '2025-07-30',
        note: 'Sudah QC'
    },
]

</script>
