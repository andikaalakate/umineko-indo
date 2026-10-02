<template>
  <div class="w-full">
    <!-- Kontrol Pencarian & Filter Kategori -->
    <div class="mb-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-black/60 p-4 border-2 border-slate-300 rounded-lg drop-shadow-xl backdrop-blur-sm">
      <div class="relative w-full md:w-96">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari istilah, arti, atau kategori..."
          class="w-full bg-slate-900/90 border-2 border-slate-400 focus:border-red-500 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:outline-none transition-all duration-300 drop-shadow-md text-sm md:text-base"
        />
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="absolute right-3 top-2.5 text-slate-400 hover:text-white cursor-pointer font-bold text-sm"
          title="Hapus pencarian"
        >
          ✕
        </button>
      </div>

      <!-- Badge Info -->
      <div class="flex flex-wrap items-center gap-2 text-xs md:text-sm font-semibold">
        <span class="bg-red-950/80 px-3 py-1.5 rounded border border-red-700 text-white drop-shadow">
          Total: {{ totalItems }} Istilah
        </span>
        <span v-if="searchQuery" class="bg-cyan-950/80 px-3 py-1.5 rounded border border-cyan-600 text-cyan-200 drop-shadow">
          Ditemukan: {{ filteredCount }}
        </span>
      </div>
    </div>

    <!-- Tabel Glosarium -->
    <table
      v-if="filteredGlosarium.length"
      class="table-auto w-full border-2 border-slate-200 text-white text-center bg-cyan-900/40 drop-shadow-2xl overflow-hidden rounded-lg"
    >
      <tbody>
        <template v-for="(group, gIndex) in filteredGlosarium" :key="gIndex">
          <!-- Header Kategori Utama -->
          <tr>
            <th
              colspan="2"
              class="p-2.5 bg-red-900/60 drop-shadow-lg border-2 border-slate-200 text-shadow-sm text-shadow-black uppercase text-xl max-md:text-lg tracking-wider"
            >
              {{ group.kategori }}
            </th>
          </tr>

          <!-- Subkategori -->
          <template v-if="group.subkategori">
            <template v-for="(sub, sIndex) in group.subkategori" :key="sIndex">
              <tr>
                <th
                  colspan="2"
                  class="p-2 bg-yellow-600/50 drop-shadow-md border-2 border-slate-200 text-shadow-sm text-shadow-black uppercase text-lg max-md:text-base tracking-wide"
                >
                  {{ sub.nama }}
                </th>
              </tr>
              <tr>
                <th class="p-2 bg-blue-900/60 drop-shadow-lg border-2 border-slate-200 text-shadow-sm text-shadow-black text-base max-md:text-sm w-1/2">
                  Istilah Asli / Konteks
                </th>
                <th class="p-2 bg-blue-900/60 drop-shadow-lg border-2 border-slate-200 text-shadow-sm text-shadow-black text-base max-md:text-sm w-1/2">
                  Terjemahan Resmi Bahasa Indonesia
                </th>
              </tr>
              <tr v-for="(item, iIndex) in sub.items" :key="iIndex" class="font-semibold hover:bg-white/10 transition-colors duration-200">
                <td class="p-2.5 border-2 border-slate-200 text-base max-md:text-sm text-yellow-200 font-mono">
                  {{ item.asli }}
                </td>
                <td class="p-2.5 border-2 border-slate-200 text-base max-md:text-sm text-white">
                  {{ item.terjemahan }}
                </td>
              </tr>
            </template>
          </template>

          <!-- Tanpa Subkategori -->
          <template v-else>
            <tr>
              <th class="p-2 bg-blue-900/60 drop-shadow-lg border-2 border-slate-200 text-shadow-sm text-shadow-black text-base max-md:text-sm w-1/2">
                Istilah Asli / Konteks
              </th>
              <th class="p-2 bg-blue-900/60 drop-shadow-lg border-2 border-slate-200 text-shadow-sm text-shadow-black text-base max-md:text-sm w-1/2">
                Terjemahan Resmi Bahasa Indonesia
              </th>
            </tr>
            <tr v-for="(item, iIndex) in group.items" :key="iIndex" class="font-semibold hover:bg-white/10 transition-colors duration-200">
              <td class="p-2.5 border-2 border-slate-200 text-base max-md:text-sm text-yellow-200 font-mono">
                {{ item.asli }}
              </td>
              <td class="p-2.5 border-2 border-slate-200 text-base max-md:text-sm text-white">
                {{ item.terjemahan }}
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>

    <!-- Tampilan Kosong Jika Hasil Pencarian Nihil -->
    <div
      v-else
      class="p-8 text-center bg-black/60 border-2 border-slate-300 rounded-lg text-slate-300 drop-shadow-xl"
    >
      <p class="text-lg font-bold text-red-400 mb-2">Istilah Tidak Ditemukan</p>
      <p class="text-sm">Tidak ada istilah atau terjemahan yang cocok dengan kata kunci "{{ searchQuery }}".</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const searchQuery = ref("");

const glosarium = [
  {
    kategori: "Panggilan & Hubungan Karakter",
    subkategori: [
      {
        nama: "Keluarga Besar Ushiromiya",
        items: [
          { asli: "Oyakata-sama (Kinzo)", terjemahan: "Tuan Besar / Kepala Keluarga" },
          { asli: "Danna-sama (Krauss)", terjemahan: "Tuan Krauss / Tuan Besar" },
          { asli: "Oku-sama / Madam (Natsuhi)", terjemahan: "Nyonya Natsuhi / Nyonya" },
          { asli: "Ojou-sama / Milady (Jessica)", terjemahan: "Nona Jessica / Nona" },
          { asli: "Bocchan / Young Master (George)", terjemahan: "Tuan Muda George / Tuan Muda" },
          { asli: "Aneki (Battler -> Jessica)", terjemahan: "Kakak / Kak Jessica" },
          { asli: "Aniki (Battler -> George)", terjemahan: "Kak George / Kakak" },
          { asli: "Grandfather", terjemahan: "Kakek (Panggilan ke Kinzo)" },
          { asli: "Mama (Maria -> Rosa)", terjemahan: "Mama" },
          { asli: "Head of the family / Headship", terjemahan: "Kepala Keluarga / Hak Waris Kepala Keluarga" },
          { asli: "Head's Ring", terjemahan: "Cincin Kepala Keluarga (Lambang Kekuasaan)" },
          { asli: "One-winged Eagle", terjemahan: "Elang Bersayap Satu (Crest Klan Ushiromiya)" }
        ]
      },
      {
        nama: "Pelayan & Bawahan",
        items: [
          { asli: "Butler (Genji Ronoue)", terjemahan: "Kepala Pelayan" },
          { asli: "Furniture (Kanon / Shannon)", terjemahan: "Furnitur (Pelayan yang menganggap dirinya bukan manusia penuh)" },
          { asli: "One-winged Eagle Servants", terjemahan: "Pelayan Elang Bersayap Satu (Genji, Shannon, Kanon, Gohda, Kumasawa)" },
          { asli: "Doctor Nanjo", terjemahan: "Dokter Nanjo (Dokter pribadi Kinzo)" },
          { asli: "Master Key", terjemahan: "Kunci Induk / Master Key (5 Kunci Pelayan)" }
        ]
      }
    ]
  },
  {
    kategori: "Penyihir & Gelar Gaib",
    subkategori: [
      {
        nama: "Gelar Para Penyihir",
        items: [
          { asli: "The Golden Witch (Beatrice)", terjemahan: "Penyihir Emas" },
          { asli: "The Endless Witch (Beatrice / Virgilia / Battler)", terjemahan: "Penyihir Tanpa Akhir (Penyihir Tak Terbatas)" },
          { asli: "The Witch of Miracles (Bernkastel)", terjemahan: "Penyihir Keajaiban" },
          { asli: "The Witch of Certainty (Lambdadelta)", terjemahan: "Penyihir Kepastian" },
          { asli: "The Witch of Theatergoing, Drama and Spectating (Featherine)", terjemahan: "Penyihir Teater, Sandiwara dan Penonton" },
          { asli: "The Witch of Truth (Ange-Beatrice)", terjemahan: "Penyihir Kebenaran" },
          { asli: "The Witch of Resurrection", terjemahan: "Penyihir Kebangkitan" },
          { asli: "The Witch of Origins (Maria)", terjemahan: "Penyihir Awal Mula" },
          { asli: "The Witch of Fragments", terjemahan: "Penyihir Fragmen" },
          { asli: "The Witch of Senate", terjemahan: "Petinggi Penyihir (Senat Penyihir)" }
        ]
      },
      {
        nama: "Hierarki & Pangkat Metafisika",
        items: [
          { asli: "The Creator", terjemahan: "Sang Pencipta (Peringkat tertinggi yang melampaui konsep batas)" },
          { asli: "Great Witch (Dai Majo)", terjemahan: "Penyihir Agung" },
          { asli: "Voyager", terjemahan: "Pengelana (Penyihir pengembara Lautan Fragmen)" },
          { asli: "Territory Lord", terjemahan: "Penguasa Wilayah" },
          { asli: "Human / Piece", terjemahan: "Manusia / Bidak (Karakter fisik yang digerakkan di papan)" },
          { asli: "Reader / Reader of the Tale (Clair)", terjemahan: "Pembaca Sandiwara" }
        ]
      },
      {
        nama: "Iblis & Pasukan Gaib",
        items: [
          { asli: "Seven Stakes of Purgatory", terjemahan: "Tujuh Pasak Api Penyucian (Lucifer, Leviathan, Satan, Belphegor, Mammon, Beelzebub, Asmodeus)" },
          { asli: "Chiester Sisters Imperial Guard Corps", terjemahan: "Pasukan Pengawal Saudari Chiester (410, 45, 00, 556)" },
          { asli: "Inquisitors (SSVD & Eiserne Jungfrau)", terjemahan: "Inkuisitor / Pengadil Suci (Dlanor, Cornelia, Gertrude, Willard)" },
          { asli: "Great Demon (Ronove, Gaap, Zepar, Furfur)", terjemahan: "Iblis Agung (Ronove, Gaap, Zepar, Furfur)" },
          { asli: "Goat Attendants", terjemahan: "Pelayan Berkepala Kambing" }
        ]
      }
    ]
  },
  {
    kategori: "Kebenaran Multidimensi (The Truths)",
    items: [
      { asli: "Red Truth", terjemahan: "Red Truth / Kebenaran Merah (Fakta absolut tak terbantahkan, tanpa bukti tambahan)" },
      { asli: "Blue Truth", terjemahan: "Blue Truth / Kebenaran Biru (Teori atau deduksi manusia untuk membedah misteri sihir)" },
      { asli: "Golden Truth", terjemahan: "Golden Truth / Kebenaran Emas (Kebenaran absolut milik Game Master)" },
      { asli: "Purple Truth / Declaration", terjemahan: "Purple Truth / Pernyataan Ungu (Pernyataan saksi tersangka pada Ep 8)" },
      { asli: "Repetition Request (Fukushoukyuu)", terjemahan: "Tuntutan Pengulangan (Permintaan mengulang kalimat dalam Red Truth)" }
    ]
  },
  {
    kategori: "Dunia Permainan & Metafiksi",
    items: [
      { asli: "Game Master", terjemahan: "Game Master (Pengendali panggung dan pembuat teka-teki)" },
      { asli: "Game Board", terjemahan: "Papan Permainan (Panggung peristiwa tragedi 4-5 Oktober 1986)" },
      { asli: "Logic Error", terjemahan: "Logic Error (Kesalahan Logika / Kontradiksi absolut yang mengurung Game Master)" },
      { asli: "Catbox", terjemahan: "Kotak Kucing (Catbox / Superposisi kebenaran tak teramati di Rokkenjima)" },
      { asli: "Anti-magic Toxin", terjemahan: "Racun Anti-Sihir (Penyangkalan manusia yang meracuni dan melemahkan sihir)" },
      { asli: "Locked-room Barrier", terjemahan: "Penghalang Ruang Tertutup (Proteksi magis ruang terisolasi)" },
      { asli: "Magic Circle", terjemahan: "Lingkaran Sihir / Rajah Sihir" },
      { asli: "Scorpion Charm", terjemahan: "Jimat Kalajengking (Jimat penangkal sihir pemberian Kinzo/Shannon)" },
      { asli: "Tea Party", terjemahan: "Tea Party (Pesta Teh / Evaluasi pasca-permainan)" },
      { asli: "Ura Tea Party", terjemahan: "??? / Pesta Teh Rahasia (Sisi tersembunyi kebenaran)" }
    ]
  },
  {
    kategori: "Terminologi Misteri & Logika Detektif",
    items: [
      { asli: "Closed Room / Locked Room", terjemahan: "Ruang Tertutup / Kamar Terkunci" },
      { asli: "Culprit", terjemahan: "Pelaku (Sosok di balik peristiwa kejahatan)" },
      { asli: "Suspect", terjemahan: "Tersangka (Pihak-pihak yang dicurigai)" },
      { asli: "Alibi", terjemahan: "Alibi (Bukti ketiadaan di tempat kejadian perkara)" },
      { asli: "Devil's Proof (Probatio Diabolica)", terjemahan: "Pembuktian Iblis (Ketidakmungkinan membuktikan ketiadaan sesuatu secara mutlak)" },
      { asli: "Hempel's Ravens", terjemahan: "Gagak Hempel (Paradoks pembuktian konfirmasi logika induksi)" },
      { asli: "Schrödinger's Cat", terjemahan: "Kucing Schrödinger (Eksperimen pikiran superposisi hidup dan mati)" },
      { asli: "Knox's Decalogue / Commandments", terjemahan: "Sepuluh Hukum Knox / Dasa Firman Knox (Aturan novel detektif)" },
      { asli: "Van Dine's 20 Rules", terjemahan: "Dua Puluh Aturan Van Dine (Prinsip fair play cerita misteri)" }
    ]
  },
  {
    kategori: "Epitaf & Tradisi Rokkenjima",
    items: [
      { asli: "Epitaph", terjemahan: "Epitaf (Prasasti Puisi Teka-Teki Emas di bawah lukisan Beatrice)" },
      { asli: "First Twilight", terjemahan: "Senja Pertama (Pengorbanan enam orang terpilih)" },
      { asli: "Second Twilight", terjemahan: "Senja Kedua (Dua orang yang tersisa saling merobek)" },
      { asli: "Fourth to Eighth Twilight", terjemahan: "Senja Keempat hingga Kedelapan (Pembunuhan berbagai bagian tubuh)" },
      { asli: "Ninth Twilight", terjemahan: "Senja Kesembilan (Penyihir bangkit dan tak ada yang tersisa)" },
      { asli: "Tenth Twilight", terjemahan: "Senja Kesepuluh (Perjalanan berakhir dan mencapai Tanah Emas)" },
      { asli: "Sweetfish / Ayu", terjemahan: "Ikan Ayu / Sweetfish (Petunjuk epitaf tepi sungai)" }
    ]
  },
  {
    kategori: "Lokasi & Alam Semesta",
    items: [
      { asli: "Rokkenjima", terjemahan: "Pulau Rokkenjima" },
      { asli: "Mansion / Main Building", terjemahan: "Mansion / Rumah Utama" },
      { asli: "Guesthouse", terjemahan: "Wisma Tamu (Tempat peristirahatan para kerabat)" },
      { asli: "Kuwadorian", terjemahan: "Mansion Rahasia Kuwadorian" },
      { asli: "Rose Garden", terjemahan: "Taman Mawar" },
      { asli: "Chapel", terjemahan: "Kapel Keramat" },
      { asli: "The Golden Land", terjemahan: "Tanah Emas (Surga ilusi / alam baka Beatrice)" },
      { asli: "City of Books", terjemahan: "Kota Buku (Perpustakaan tak terbatas Featherine)" },
      { asli: "Sea of Fragments", terjemahan: "Lautan Fragmen (Kumpulan semesta paralel Kakera)" },
      { asli: "St. Lucia Academy", terjemahan: "Akademi St. Lucia (Sekolah asrama Ange)" }
    ]
  },
  {
    kategori: "Ungkapan Khas & Catchphrases",
    items: [
      { asli: "\"It's no good, it's no use at all!\"", terjemahan: "\"Percuma, sama sekali tidak berguna! / Percuma saja!\" (Dame da, zenzen dame da! - Battler)" },
      { asli: "\"Without love, it cannot be seen\"", terjemahan: "\"Tanpa cinta, kebenaran tak akan terlihat\" (Ai ga nakereba mienai - Pesan Sentral Umineko)" },
      { asli: "\"Flip the chessboard\"", terjemahan: "\"Balikkan papan caturnya / Membalik sudut pandang papan catur\" (Pelajaran Rudolf ke Battler)" },
      { asli: "\"Uu-! / Uu-uu-uu!\"", terjemahan: "\"Uu-! / Uu-uu-uu!\" (Rengekan khas Maria)" },
      { asli: "\"Kihihihi! / Cackle\"", terjemahan: "\"Kihihihi! / Ihik-hik-hik!\" (Tawa khas Maria / Beatrice)" },
      { asli: "\"Have a nice day\"", terjemahan: "\"Have a nice day / Semoga harimu menyenangkan\" (Erika Furudo)" },
      { asli: "\"See? It's not impossible for me, Beatrice!\"", terjemahan: "\"Lihat? Bukan hal mustahil bagi diriku, Beatrice!\" (Sifat angkuh Beatrice)" }
    ]
  },
  {
    kategori: "Efek Suara (SFX)",
    items: [
      { asli: "Cackle", terjemahan: "Terkekeh / Tawa jahat (Ihik-hik)" },
      { asli: "Clunk / Clatter", terjemahan: "Klek / Krek / Dentang logam" },
      { asli: "Cough", terjemahan: "Uhuk-uhuk (Batuk)" },
      { asli: "Giggle", terjemahan: "Cekikikan / Fufufu" },
      { asli: "Gulp", terjemahan: "Meneguk ludah (Glek)" },
      { asli: "Hic", terjemahan: "Terisak-isak / Tersedu" },
      { asli: "Sigh", terjemahan: "Menghela napas / Haaa / Cih / Tch" },
      { asli: "Creak", terjemahan: "Berderit (Pintu berderit)" },
      { asli: "Rustle", terjemahan: "Gemerisik / Desir daun" }
    ]
  }
];

// Menghitung total semua item
const totalItems = computed(() => {
  let count = 0;
  for (const group of glosarium) {
    if (group.subkategori) {
      for (const sub of group.subkategori) {
        count += sub.items.length;
      }
    } else if (group.items) {
      count += group.items.length;
    }
  }
  return count;
});

// Filter pencarian reaktif
const filteredGlosarium = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return glosarium;

  const result = [];

  for (const group of glosarium) {
    if (group.subkategori) {
      const matchingSubs = [];
      for (const sub of group.subkategori) {
        const matchingItems = sub.items.filter(
          (item) =>
            item.asli.toLowerCase().includes(q) ||
            item.terjemahan.toLowerCase().includes(q) ||
            sub.nama.toLowerCase().includes(q) ||
            group.kategori.toLowerCase().includes(q)
        );
        if (matchingItems.length > 0) {
          matchingSubs.push({
            nama: sub.nama,
            items: matchingItems
          });
        }
      }
      if (matchingSubs.length > 0) {
        result.push({
          kategori: group.kategori,
          subkategori: matchingSubs
        });
      }
    } else if (group.items) {
      const matchingItems = group.items.filter(
        (item) =>
          item.asli.toLowerCase().includes(q) ||
          item.terjemahan.toLowerCase().includes(q) ||
          group.kategori.toLowerCase().includes(q)
      );
      if (matchingItems.length > 0) {
        result.push({
          kategori: group.kategori,
          items: matchingItems
        });
      }
    }
  }

  return result;
});

// Menghitung jumlah item yang cocok dengan pencarian
const filteredCount = computed(() => {
  let count = 0;
  for (const group of filteredGlosarium.value) {
    if (group.subkategori) {
      for (const sub of group.subkategori) {
        count += sub.items.length;
      }
    } else if (group.items) {
      count += group.items.length;
    }
  }
  return count;
});
</script>
