<template>
    <div class="gap-0 grid max-md:grid-cols-1 max-lg:grid-cols-2 min-lg:grid-cols-3">
        <a v-for="(member, index) in teams" :key="index" data-aos="fade-up" data-aos-duration="1000"
            data-aos-easing="ease-in-out" data-aos-mirror="true" data-aos-once="true"
            data-aos-anchor-placement="top-center" :href="member.link"
            class="aspect-square hover:border-slate-100 transition-all duration-500 cursor-pointer w-full bg-red-800 drop-shadow-2xl group border-2 border-gray-600 overflow-hidden relative"
            :class="member.startClass ?? member.startClass">
            <div
                class="absolute opacity-100 group-hover:opacity-20 flex transition-all duration-500 inset-0 z-2 bg-black/40">
            </div>

            <h2 class="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 max-xl:text-2xl min-xl:text-3xl text-center font-bold text-white mb-8 leading-[130%] z-2 uppercase opacity-100 group-hover:opacity-0 transition-all duration-500 text-shadow-xs text-shadow-black"
                v-html="member.role"></h2>

            <img :src="member.pic" class="group-hover:scale-110 transition-all duration-500 object-cover w-full h-full"
                :alt="member.nama" />

            <div class="bg-gradient-to-t via-transparent to-transparent drop-shadow-2xl py-2 absolute inset-0 opacity-0 group-hover:opacity-100"
                :class="member.gradient"></div>

            <h3
                class="absolute py-4 -bottom-5 left-0 right-0 max-xl:text-2xl min-xl:text-3xl text-center font-bold text-white mb-8 leading-[130%] z-1 uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 text-shadow-xs text-shadow-black">
                {{ member.nama }}
            </h3>
        </a>
    </div>
</template>

<script setup>
const teams = [
    {
        nama: 'Andika Alakate',
        role: '(Team Leader)<br>Programmer & UI / UX Editor',
        pic: 'https://cdn.bandom.site/umineko/public/team/Andika_Alakate.webp',
        link: 'https://www.facebook.com/andikaalakate',
        gradient: 'from-cyan-700/50',
        startClass: 'min-lg:col-start-2'
    },
    {
        nama: 'Frederizal',
        role: 'Main Translator 1',
        pic: 'https://cdn.bandom.site/umineko/public/team/Frederizal.webp',
        link: 'https://www.facebook.com/frederizal',
        gradient: 'from-red-700/50',
        startClass: 'min-lg:col-start-1'
    },
    {
        nama: 'Mamat Supriyanto',
        role: 'Main Translator 2',
        pic: 'https://cdn.bandom.site/umineko/public/team/Mamat_Supriyanto.webp',
        link: 'https://www.facebook.com/masup.kun',
        gradient: 'from-blue-700/50'
    },
    {
        nama: 'Bagus Setiawan',
        role: 'Main Translator 3',
        pic: 'https://cdn.bandom.site/umineko/public/team/Bagus.webp',
        link: 'https://www.facebook.com/profile.php?id=100009413821602',
        gradient: 'from-slate-700/50'
    },
    {
        nama: 'Lawliet',
        role: 'Main Translator 4',
        pic: 'https://cdn.bandom.site/umineko/public/team/Lawliet.webp',
        link: 'https://www.facebook.com/yoki.siagian.7',
        gradient: 'from-red-700/50'
    },
    {
        nama: 'Lilith TL',
        role: 'Main Translator 5',
        pic: 'https://cdn.bandom.site/umineko/public/team/LilithTL.webp',
        link: 'https://www.tiktok.com/@azazelltrinity',
        gradient: 'from-red-700/50'
    },
    {
        nama: 'Bil',
        role: 'Main Translator 6',
        pic: 'https://cdn.bandom.site/umineko/public/team/Bil.webp',
        link: 'https://www.facebook.com/profile.php?id=100088529629772',
        gradient: 'from-slate-700/50'
    },
    {
        nama: 'Se Rene',
        role: 'Main Translator 7',
        pic: 'https://cdn.bandom.site/umineko/public/team/Se_Rene.webp',
        link: 'https://www.facebook.com/se.rene.127736',
        gradient: 'from-slate-700/50'
    },
    {
        nama: 'Angga Kun',
        role: 'Lyrics Editor<br>& Translator',
        pic: 'https://cdn.bandom.site/umineko/public/team/Angga.webp',
        link: 'https://www.facebook.com/angga.kun.12720',
        gradient: 'from-fuchsia-700/50'
    },
];
</script>
  
