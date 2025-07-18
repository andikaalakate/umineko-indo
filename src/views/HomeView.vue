<template>
  <div class="text-white font-sans">
    <main class="mx-auto bg-gray-900">
      <section ref="heroSection" id="hero" class="relative top-0 w-full h-[calc(100vh-4rem)] bg-cover bg-top bg-fixed"
        style="background-image: url('ep607.webp');">
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <div class="relative z-10 text-center flex flex-col justify-end h-full px-4 pb-16">
          <h2 class="max-lg:text-3xl min-lg:text-4xl font-bold text-white mb-4">
            Umineko Project<br>Terjemahan Bahasa Indonesia
          </h2>
          <p class="text-gray-300">
            Proyek ini bersifat open source dan siapa pun boleh berkontribusi kapan saja! Prioritas kami adalah
            kualitas,
            bukan kecepatan.
          </p>
        </div>
      </section>

      <!-- Header -->
      <header :class="[
        'sticky top-0 z-50 backdrop-blur h-16 border-b border-gray-700 p-4 transition-all duration-500',
        isPastSection ? 'bg-black/40' : 'bg-black'
      ]">
        <div
          :class="['h-full w-full mx-auto transition-all duration-500 flex justify-between items-center text-white', isPastSection ? 'max-w-[88rem]' : 'max-w-full']">
          <a href="#hero" class="text-xl font-bold">LARUS TEAM</a>
          <a href="https://github.com/andikaalakate/umineko-scripting-idn" target="_blank"
            class="text-white font-bold hover:underline border-2 border-white uppercase px-2 py-1">
            GitHub
          </a>
        </div>
      </header>

      <section class="mx-auto">
        <section data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
          data-aos-once="true" data-aos-anchor-placement="top-center"
          class="min-xl:min-h-screen h-fit flex flex-col justify-center items-center relative overflow-hidden border-4 border-black hover:border-slate-200 transition-all duration-500">
          <div class="absolute inset-0 bg-[url(/title1_logo.webp)] bg-contain bg-center bg-no-repeat z-0">
          </div>
          <div class="absolute inset-0 bg-black/60 z-1 drop-shadow-2xl"></div>
          <div data-aos="fade-in" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
            data-aos-once="true" data-aos-anchor-placement="top-center" class="relative z-2 max-w-7xl p-4">
            <h2
              class="max-lg:text-4xl min-lg:text-5xl z-1 text-white font-bold uppercase underline text-shadow-lg text-shadow-black text-center pb-6">
              Sinopsis</h2>
            <p class="max-md:text-xl max-lg:text-2xl min-lg:text-3xl z-1 indent-[5%] text-justify leading-[165%]">
              <span class="font-bold">Umineko no <span class="text-red-500">Na</span>ku Koro ni </span>
              berlatar pada tahun
              1986,
              tepatnya pada tanggal 4 dan 5 Oktober, di sebuah pulau
              terpencil bernama <span class="font-bold">Rokkenjima </span>(<span class="text-blue-500">六軒島</span>) yang
              dimiliki
              oleh <span class="font-bold">Kinzo Ushiromiya</span>, kepala
              keluarga <span class="font-bold">Ushiromiya</span> yang
              kaya
              raya. <span class="font-bold">Kinzo</span> yang sudah tua diperkirakan akan meninggal dalam waktu dekat,
              sehingga
              keempat anaknya
              beserta
              keluarga mereka berkumpul di pulau tersebut untuk menghadiri <span class="font-bold">konferensi
                keluarga</span>
              tahunan dan membahas
              <span class="font-bold">pembagian warisan</span>.
            </p>
            <br>

            <p class="max-md:text-xl max-lg:text-2xl min-lg:text-3xl z-1 indent-[5%] text-justify leading-[165%]">
              Namun, ketika topan besar menerjang dan mengisolasi pulau dari dunia luar, sebuah permainan mengerikan
              pun
              dimulai—diawali dengan <span class="text-red-500">pembunuhan </span>enam orang dan ditemukannya sebuah
              surat yang
              ditandatangani oleh
              <span class="font-bold">Beatrice</span>, sang <span class="font-bold">Penyihir Emas </span>legendaris yang
              konon
              menghantui pulau itu. Dalam
              surat tersebut, <span class="font-bold">Beatrice</span>
              menantang keluarga <span class="font-bold">Ushiromiya</span> untuk memecahkan teka-teki epitaf-nya dan
              menemukan
              <span class="font-bold">emas tersembunyi</span> di
              pulau
              sebelum semuanya terlambat...
            </p>
          </div>
        </section>

        <section data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
          data-aos-once="true" data-aos-anchor-placement="top-center"
          class="h-fit w-full border-4 border-black flex flex-col justify-center mx-auto p-4 bg-[url(/red_b.webp)] bg-center bg-cover bg-no-repeat transition-all duration-500 hover:border-slate-200 relative">
          <div class="absolute inset-0 bg-black/40 z-0 drop-shadow-2xl"></div>
          <h2
            class="max-lg:text-4xl min-lg:text-5xl z-1 text-white font-bold uppercase underline text-shadow-lg text-shadow-black text-center pb-6">
            Opening</h2>
          <vue-plyr data-aos="fade-in" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
            data-aos-once="true" data-aos-anchor-placement="top-center">
            <div class="plyr__video-embed">
              <iframe class=""
                src="https://www.youtube.com/embed/TE0D7diCZa4?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
                allowfullscreen allowtransparency allow="autoplay"></iframe>
            </div>
          </vue-plyr>
        </section>

        <section data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
          data-aos-once="true" data-aos-anchor-placement="top-center"
          class="flex flex-col gap-5 bg-[url(/blue_b.webp)] bg-no-repeat relative bg-cover bg-center p-4 border-4 border-black hover:border-slate-200 transition-all duration-500">
          <div class="absolute inset-0 bg-black/40 z-0 drop-shadow-2xl"></div>
          <div class="mx-auto relative">
            <h2
              class="max-xl:text-4xl min-xl:text-5xl text-center font-bold text-white mb-8 leading-[130%] z-1 uppercase underline text-shadow-lg text-shadow-black">
              Progress</h2>
            <ProgressList />
          </div>
        </section>

        <section data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
          data-aos-once="true" data-aos-anchor-placement="top-center"
          class="min-xl:min-h-screen h-fit flex flex-col justify-center items-center relative overflow-hidden border-4 border-black hover:border-slate-200 transition-all duration-500">
          <div class="absolute inset-0 bg-[url(/team/Logo.webp)] bg-contain scale-110 bg-center bg-no-repeat z-0">
          </div>
          <div class="absolute inset-0 bg-black/60 z-1 drop-shadow-2xl"></div>
          <div data-aos="fade-in" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
            data-aos-once="true" data-aos-anchor-placement="top-center" class="relative z-2 max-w-7xl p-4">
            <h2
              class="max-lg:text-4xl min-lg:text-5xl z-1 text-white font-bold uppercase underline text-shadow-lg text-shadow-black text-center pb-4">
              Tentang
            </h2>
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
              data-aos-once="true" data-aos-anchor-placement="top-center"
              class="min-lg:my-4 mb-2 w-full h-full transition-all duration-500 hover:border-slate-100 cursor-pointer bg-gray-800/60 border-2 border-gray-600 overflow-hidden">
              <img src="/team/Banner.webp" alt="" class="object-cover hover:scale-110 transition-all duration-500 w-full h-full">
            </div>
            <p class="max-md:text-xl max-lg:text-2xl min-lg:text-3xl z-1 indent-[5%] text-justify leading-[165%]">
              <span class="font-bold">Larus Team</span> adalah sekelompok penggemar visual novel yang memiliki satu
              tujuan:
              menerjemahkan dan memperkenalkan kisah <span class="font-bold">Umineko no <span
                  class="text-red-500">Na</span>ku Koro ni</span> ke dalam <span class="font-bold">Bahasa
                Indonesia</span> agar dapat dinikmati lebih luas tanpa batasan bahasa.
            </p>
            <br>
            <p class="max-md:text-xl max-lg:text-2xl min-lg:text-3xl z-1 indent-[5%] text-justify leading-[165%]">
              Proyek ini menggunakan <span class="font-bold">Umineko Project</span> sebagai basis, yaitu versi mod
              visual novel buatan komunitas
              yang mendukung <span class="font-bold">resolusi tinggi</span>, <span class="font-bold">voice acting dari
                PS3</span>,
              <span class="font-bold">ilustrasi CG HD</span>, serta kemampuan untuk memilih teks dan UI modern.
              Terjemahan kami didasarkan pada skrip dari <span class="font-bold">The Witch Hunt</span>, yang sudah lama
              menjadi standar komunitas internasional.
            </p>
            <br>
            <p class="max-md:text-xl max-lg:text-2xl min-lg:text-3xl z-1 indent-[5%] text-justify leading-[165%]">
              Kami berkomitmen menerjemahkan <span class="font-bold">seluruh delapan episode utama</span> Umineko,
              beserta konten tambahan seperti:
              <span class="italic">Tea Party</span>, <span class="italic">Tips</span>, <span
                class="italic">Trophies</span>, dan <span class="italic">Grimoire</span>.
              Tujuan kami adalah memberikan pengalaman membaca yang utuh dan setara dengan versi Jepang maupun Inggris.
            </p>
            <br>
            <p class="max-md:text-xl max-lg:text-2xl min-lg:text-3xl z-1 indent-[5%] text-justify leading-[165%]">
              Kami percaya bahwa karya luar biasa seperti ini pantas diakses oleh lebih banyak orang secara sah dan
              berkualitas.
              Patch terjemahan kami hanya tersedia untuk mereka yang sudah memiliki <span class="font-bold">salinan
                resmi</span> dari gim ini.
              Kamu bisa membeli <span class="font-bold">Umineko no Naku Koro ni</span> dan <span
                class="font-bold">Umineko no Naku Koro ni Chiru</span> di:
              <a href="https://store.steampowered.com/bundle/5465/"
                class="underline text-blue-400 hover:text-blue-300">Steam</a>,
              <a href="https://www.gog.com/en/game/umineko_when_they_cry_question_arcs"
                class="underline text-blue-400 hover:text-blue-300">GOG</a>, atau
              <a href="https://www.mangagamer.com/detail.php?product_code=177"
                class="underline text-blue-400 hover:text-blue-300">MangaGamer</a> untuk
              versi Jepang.
            </p>
            <br>
            <p class="max-md:text-xl max-lg:text-2xl min-lg:text-3xl z-1 indent-[5%] text-justify leading-[165%]">
              Kami bukan pemilik dari Umineko atau kontennya, dan tidak mendistribusikan gim bajakan.
              <span class="font-bold">Larus Team</span> hanya menyediakan <span class="font-bold">patch
                terjemahan</span> untuk
              mendukung pengalaman
              membaca yang legal dan nyaman bagi para pembaca Indonesia.
            </p>

            <a class="bg-black/75 border-2 border-white drop-shadow-2xl mt-4 py-2 align-middle items-center flex justify-center font-bold uppercase hover:bg-white/90 hover:border-black hover:text-black transition-all duration-500"
              href="https://trakteer.id/larus-team/tip?open=true">Dukung Kami</a>
          </div>
        </section>

        <section data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
          data-aos-once="true" data-aos-anchor-placement="top-center"
          class="min-xl:min-h-screen h-fit w-full border-4 border-black flex flex-col justify-center mx-auto p-4 bg-[url(/ep803.webp)] bg-center bg-cover bg-no-repeat transition-all duration-500 hover:border-slate-200 relative">
          <div class="absolute inset-0 bg-black/20 z-0 drop-shadow-2xl"></div>
          <div class="mx-auto relative">
            <h2
              class="max-xl:text-4xl min-xl:text-5xl text-center font-bold text-white mb-8 leading-[130%] z-2 uppercase underline text-shadow-lg text-shadow-black">
              Tim Penerjemah</h2>

            <div class="gap-0 grid max-md:grid-cols-1 max-lg:grid-cols-2 min-lg:grid-cols-3">
              <a data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
                data-aos-once="true" data-aos-anchor-placement="top-center"
                href="https://www.facebook.com/andikaalakate"
                class="aspect-square hover:border-slate-100 transition-all duration-500 cursor-pointer w-full bg-red-800 drop-shadow-2xl group border-2 border-gray-600 overflow-hidden relative">
                <div
                  class="absolute opacity-100 group-hover:opacity-20 flex transition-all duration-500 inset-0 z-2 bg-black/40 drop-shadow-2xl">
                </div>
                <h2
                  class="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 max-xl:text-2xl min-xl:text-3xl text-center font-bold text-white mb-8 leading-[130%] z-2 uppercase opacity-100 group-hover:opacity-0 transition-all duration-500 text-shadow-xs text-shadow-black">
                  (Team Leader)<br>Programmer & UI / UX Editor</h2>
                <img src="/team/Andika_Alakate.webp" class="group-hover:scale-110 transition-all duration-500" alt="">
                <div
                  class="bg-gradient-to-t from-cyan-700/50 via-transparent to-transparent drop-shadow-2xl py-2 absolute inset-0 opacity-0 group-hover:opacity-100">
                </div>
                <h3
                  class="absolute py-4 -bottom-5 left-0 right-0 max-xl:text-2xl min-xl:text-3xl text-center font-bold text-white mb-8 leading-[130%] z-1 uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 text-shadow-xs text-shadow-black">
                  Andika Alakate</h3>
              </a>
              <a data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
                data-aos-once="true" data-aos-anchor-placement="top-center" href="https://www.facebook.com/frederizal"
                class="aspect-square hover:border-slate-100 transition-all duration-500 cursor-pointer w-full bg-red-800 drop-shadow-2xl group border-2 border-gray-600 overflow-hidden relative">
                <div
                  class="absolute opacity-100 group-hover:opacity-20 flex transition-all duration-500 inset-0 z-2 bg-black/40">
                </div>
                <h2
                  class="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 max-xl:text-2xl min-xl:text-3xl text-center font-bold text-white mb-8 leading-[130%] z-2 uppercase opacity-100 group-hover:opacity-0 transition-all duration-500 text-shadow-xs text-shadow-black">
                  Main Translator 1<br>& Lyrics Editor</h2>
                <img src="/team/Frederizal.webp" class="group-hover:scale-110 transition-all duration-500" alt="">
                <div
                  class="bg-gradient-to-t from-red-700/50 via-transparent to-transparent drop-shadow-2xl py-2 absolute inset-0 opacity-0 group-hover:opacity-100">
                </div>
                <h3
                  class="absolute py-4 -bottom-5 left-0 right-0 max-xl:text-2xl min-xl:text-3xl text-center font-bold text-white mb-8 leading-[130%] z-1 uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 text-shadow-xs text-shadow-black">
                  Frederizal</h3>
              </a>
              <a data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
                data-aos-once="true" data-aos-anchor-placement="top-center" href="https://www.facebook.com/masup.kun"
                class="aspect-square hover:border-slate-100 transition-all duration-500 cursor-pointer w-full bg-red-800 drop-shadow-2xl group border-2 border-gray-600 overflow-hidden relative">
                <div
                  class="absolute opacity-100 group-hover:opacity-20 flex transition-all duration-500 inset-0 z-2 bg-black/40">
                </div>
                <h2
                  class="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 max-xl:text-2xl min-xl:text-3xl text-center font-bold text-white mb-8 leading-[130%] z-2 uppercase opacity-100 group-hover:opacity-0 transition-all duration-500 text-shadow-xs text-shadow-black">
                  Main Translator 2</h2>
                <img src="/team/Mamat_Supriyanto.webp" class="group-hover:scale-110 transition-all duration-500" alt="">
                <div
                  class="bg-gradient-to-t from-blue-700/50 via-transparent to-transparent drop-shadow-2xl py-2 absolute inset-0 opacity-0 group-hover:opacity-100">
                </div>
                <h3
                  class="absolute py-4 -bottom-5 left-0 right-0 max-xl:text-2xl min-xl:text-3xl text-center font-bold text-white mb-8 leading-[130%] z-1 uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 text-shadow-xs text-shadow-black">
                  Mamat Supriyanto</h3>
              </a>
            </div>
          </div>
        </section>

        <section data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
          data-aos-once="true" data-aos-anchor-placement="top-center"
          class="min-xl:min-h-screen h-fit w-full border-4 border-black flex flex-col justify-center mx-auto p-4 bg-[url(/book1.webp)] bg-center bg-cover bg-no-repeat transition-all duration-500 hover:border-slate-200 relative gloss">
          <div class="absolute inset-0 bg-black/20 z-0 drop-shadow-2xl"></div>
          <div data-aos="fade-in" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
            data-aos-once="true" data-aos-anchor-placement="top-center" class="mx-auto relative w-full max-w-7xl">
            <h2
              class="max-xl:text-4xl min-xl:text-5xl text-center font-bold text-white mb-8 leading-[130%] z-1 uppercase underline text-shadow-lg text-shadow-black">
              Glosarium</h2>
            <Glosarium />
          </div>
        </section>

        <section data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
          data-aos-once="true" data-aos-anchor=".gloss" data-aos-anchor-placement="top-center"
          class="min-xl:min-h-screen h-150 w-full border-4 border-black flex flex-col justify-center mx-auto p-4 bg-[url(/cha_i1ar.webp)] bg-bottom bg-cover bg-no-repeat transition-all duration-500 hover:border-slate-200 relative">
          <div class="absolute inset-0 bg-black/20 z-0 drop-shadow-2xl"></div>
          <div data-aos="fade-in" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
            data-aos-once="true" data-aos-anchor-placement="top-center" class="mx-auto relative w-full max-w-7xl">
            <h2
              class="max-xl:text-4xl min-xl:text-5xl text-center font-bold text-white mb-8 leading-[130%] z-1 uppercase underline text-shadow-lg text-shadow-black">
              Unduh</h2>
            <div class="justify-center items-center mx-auto max-w-lg w-full h-full">
              <h2
                class="max-xl:text-4xl min-xl:text-6xl text-center font-bold text-white mb-8 leading-[130%] z-1 uppercase border-4 border-white bg-black/50 backdrop-blur-2xl">
                Coming Soon</h2>
            </div>
          </div>
        </section>

        <section data-aos="fade-in" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
          data-aos-once="true" data-aos-anchor=".gloss" data-aos-anchor-placement="top-center"
          class="min-xl:min-h-screen h-fit w-full border-4 border-black flex flex-col justify-center mx-auto p-4 bg-[url(/beach_l2a.webp)] bg-bottom bg-cover bg-no-repeat transition-all duration-500 hover:border-slate-200 relative">
          <div class="absolute inset-0 bg-black/20 z-0 drop-shadow-2xl"></div>
          <div class="mx-auto relative w-full max-w-7xl">
            <h2
              class="max-xl:text-4xl min-xl:text-5xl text-center font-bold text-white mb-8 leading-[130%] z-1 uppercase underline text-shadow-lg text-shadow-black">
              Ingin Berkontribusi?</h2>
            <div class="grid grid-cols-3 gap-6 justify-center items-center mx-auto max-w-md w-full h-full">
              <a href="mailto:andikaalakate@gmail.com"
                class="w-full h-full border-2 border-white aspect-square bg-black group hover:border-black hover:bg-white transition-all duration-500"><img
                  src="/boxicons/svg/brands/bx-gmail.svg"
                  class="w-full h-full object-cover filter invert group-hover:filter-none transition-all duration-500"></a>
              <a href="https://github/andikaalakate/"
                class="w-full h-full border-2 border-white aspect-square bg-black group hover:border-black hover:bg-white transition-all duration-500"><img
                  src="/boxicons/svg/brands/bx-github.svg"
                  class="w-full h-full object-cover filter invert group-hover:filter-none transition-all duration-500"></a>
              <a href="https://facebook.com/larusumindo/"
                class="w-full h-full border-2 border-white aspect-square bg-black group hover:border-black hover:bg-white transition-all duration-500"><img
                  src="/boxicons/svg/brands/bx-facebook.svg"
                  class="w-full h-full object-cover filter invert group-hover:filter-none transition-all duration-500"></a>
            </div>
          </div>
        </section>

        <secttion data-aos="fade-in" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true"
          data-aos-once="true" data-aos-anchor=".gloss" data-aos-anchor-placement="top-center"
          class="w-full p-4 flex flex-col justify-center items-center text-center bg-[url(/footer.webp)] bg-right bg-cover bg-no-repeat border-4 border-black transition-all duration-500 hover:border-slate-200">
          <div class="grid grid-cols-3 w-full h-full gap-3">
            <a class="bg-black/75 border-2 border-white drop-shadow-2xl py-2 align-middle items-center flex justify-center font-bold uppercase hover:bg-white/90 hover:border-black hover:text-black transition-all duration-500"
              href="https://07th-expansion.net/umi_gensaku">Situs Resmi</a>
            <a class="bg-black/75 border-2 border-white drop-shadow-2xl py-2 align-middle items-center flex justify-center font-bold uppercase hover:bg-white/90 hover:border-black hover:text-black transition-all duration-500"
              href="https://umineko-project.org">Umineko Project</a>
            <a class="bg-black/75 border-2 border-white drop-shadow-2xl py-2 align-middle items-center flex justify-center font-bold uppercase hover:bg-white/90 hover:border-black hover:text-black transition-all duration-500"
              href="https://vndb.org/v24">VNDB</a>
            <a class="bg-black/75 border-2 border-white drop-shadow-2xl py-2 align-middle items-center flex justify-center font-bold uppercase hover:bg-white/90 hover:border-black hover:text-black transition-all duration-500 col-span-3"
              href="https://facebook.com/larusumindo">Halaman Facebook</a>
          </div>
        </secttion>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ProgressList from '@components/ProgressList.vue'
import Glosarium from '@components/Glosarium.vue'

const isPastSection = ref(false)
const heroSection = ref(null)

const checkScroll = () => {
  const scrollY = window.scrollY
  const sectionHeight = heroSection.value?.offsetHeight || 0
  isPastSection.value = scrollY > sectionHeight - 24
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
  checkScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>
