<template>
    <table v-if="glosarium?.length"
        class="table-auto w-full border-2 border-slate-200 text-white text-center bg-cyan-900/40 drop-shadow-2xl">
        <tbody>
            <template v-for="(group, gIndex) in glosarium" :key="gIndex">
                <!-- Header kategori -->
                <tr>
                    <th colspan="2"
                        class="p-2 bg-red-900/50 drop-shadow-lg border-2 border-slate-200 text-shadow-sm text-shadow-black uppercase text-xl max-md:text-lg">
                        {{ group.kategori }}
                    </th>
                </tr>

                <!-- Kalau ada subkategori -->
                <template v-if="group.subkategori">
                    <template v-for="(sub, sIndex) in group.subkategori" :key="sIndex">
                        <!-- Header subkategori -->
                        <tr>
                            <th colspan="2"
                                class="p-2 bg-yellow-600/40 drop-shadow-md border-2 border-slate-200 text-shadow-sm text-shadow-black uppercase text-lg max-md:text-base">
                                {{ sub.nama }}
                            </th>
                        </tr>
                        <tr>
                            <th
                                class="p-2 bg-blue-900/50 drop-shadow-lg border-2 border-slate-200 text-shadow-sm text-shadow-black text-base max-md:text-sm">
                                Asli</th>
                            <th
                                class="p-2 bg-blue-900/50 drop-shadow-lg border-2 border-slate-200 text-shadow-sm text-shadow-black text-base max-md:text-sm">
                                Terjemahan</th>
                        </tr>
                        <!-- Isi subkategori -->
                        <tr v-for="(item, iIndex) in sub.items" :key="iIndex" class="font-semibold">
                            <td class="p-2 border-2 border-slate-200 text-lg max-md:text-base">{{ item.asli }}</td>
                            <td class="p-2 border-2 border-slate-200 text-lg max-md:text-base">{{ item.terjemahan }}
                            </td>
                        </tr>
                    </template>
                </template>

                <!-- Kalau langsung ada items tanpa subkategori (contoh: SFX) -->
                <template v-else>
                    <tr>
                        <th
                            class="p-2 bg-blue-900/50 drop-shadow-lg border-2 border-slate-200 text-shadow-sm text-shadow-black text-base max-md:text-sm">
                            Asli</th>
                        <th
                            class="p-2 bg-blue-900/50 drop-shadow-lg border-2 border-slate-200 text-shadow-sm text-shadow-black text-base max-md:text-sm">
                            Terjemahan</th>
                    </tr>
                    <tr v-for="(item, iIndex) in group.items" :key="iIndex" class="font-semibold">
                        <td class="p-2 border-2 border-slate-200 text-lg max-md:text-base">{{ item.asli }}</td>
                        <td class="p-2 border-2 border-slate-200 text-lg max-md:text-base">{{ item.terjemahan }}</td>
                    </tr>
                </template>
            </template>
        </tbody>
    </table>
</template>  

<script setup>
const glosarium = [
    {
        kategori: "Panggilan",
        subkategori: [
            {
                nama: "Keluarga Ushiromiya",
                items: [
                    { asli: "Oyakata-sama (Kinzo)", terjemahan: "Grandmaster" },
                    { asli: "Danna-sama (Krauss)", terjemahan: "Master" },
                    { asli: "Oku-sama/Madam (Natsuhi)", terjemahan: "Nyonya" },
                    { asli: "Ojou-sama/Milady (Jessica)", terjemahan: "Nona" },
                    { asli: "Dibawah Krauss", terjemahan: "Tuan / Nyonya / -sama" }
                ]
            },
            {
                nama: "Penyihir",
                items: [
                    { asli: "The Endless Witch", terjemahan: "Penyihir Tak Terbatas" },
                    { asli: "The Golden Witch", terjemahan: "Penyihir Emas" },
                    { asli: "The Witch of Certainty", terjemahan: "Penyihir Kepastian" },
                    { asli: "The Witch of Fragment", terjemahan: "Penyihir Fragmen" },
                    { asli: "The Witch of Miracle", terjemahan: "Penyihir Keajaiban" },
                    { asli: "The Witch of Origins", terjemahan: "Penyihir Awal Mula" },
                    { asli: "The Witch of Resurrection", terjemahan: "Penyihir Kebangkitan" },
                    { asli: "The Witch of Theatergoing, Drama and Spectating", terjemahan: "Penyihir Teater, Drama dan Penonton" },
                    { asli: "The Witch of Truth", terjemahan: "Penyihir Kebenaran" },
                    { asli: "Witch of Senate", terjemahan: "Petinggi Penyihir" },
                ]
            },
            {
                nama: "Gelar & Status",
                items: [
                    { asli: "Bernkastel & Lambda", terjemahan: "Lady" },
                    { asli: "Furniture", terjemahan: "Furnitur" },
                    { asli: "Inquisitors", terjemahan: "Pengadil" },
                    { asli: "King of Mount Purgatory", terjemahan: "Penguasa Api Penyucian" },
                    { asli: "Miko", terjemahan: "Dipertahankan (Status)" },
                    { asli: "Piece", terjemahan: "Bidak" },
                    { asli: "Princess", terjemahan: "Tuan Putri" },
                    { asli: "Voyager", terjemahan: "Pengelana" }
                ]
            },
            {
                nama: "Pasukan / Kelompok",
                items: [
                    { asli: "Chiester Sisters Imperial Guard Corps", terjemahan: "Pasukan Pengawal Saudari Chiester" },
                    { asli: "Seven Sisters of Purgatory", terjemahan: "Tujuh Saudari Api Penyucian" }
                ]
            },
            {
                nama: "Konsep Metafisik",
                items: [
                    { asli: "The Creator", terjemahan: "Sang Pencipta" },
                    { asli: "Fickles", terjemahan: "Misterius/Tak tertebak/Tak menentu" },
                    { asli: "God", terjemahan: "Dewa" }
                ]
            }
        ]
    },
    {
        kategori: "Other Glosarium",
        subkategori: [
            {
                nama: "Dunia Permainan",
                items: [
                    { asli: "Anti Magic Toxin", terjemahan: "Anti Sihir" },
                    { asli: "Catbox", terjemahan: "Dipertahankan (Istilah Asli)" },
                    { asli: "Game Board", terjemahan: "Papan Permainan" },
                    { asli: "Game Master", terjemahan: "Dipertahankan (Istilah Asli)" },
                    { asli: "Logic Error", terjemahan: "Dipertahankan (Istilah Asli)" }
                ]
            },
            {
                nama: "Truths",
                items: [
                    { asli: "Blue Truth", terjemahan: "Dipertahankan (Istilah Asli)" },
                    { asli: "Golden Truth", terjemahan: "Dipertahankan (Istilah Asli)" },
                    { asli: "Purple Truth", terjemahan: "Dipertahankan (Istilah Asli)" },
                    { asli: "Red Truth", terjemahan: "Dipertahankan (Istilah Asli)" }
                ]
            },
            {
                nama: "Lokasi / Tempat",
                items: [
                    { asli: "Cathedral", terjemahan: "Katedral" },
                    { asli: "Church", terjemahan: "Gereja" },
                    { asli: "City of Book", terjemahan: "Dipertahankan (Istilah Asli)" },
                    { asli: "Sea of Fragment", terjemahan: "Lautan Fragmen" },
                    { asli: "St. Lucia Academy", terjemahan: "Akademi St. Lucia" },
                    { asli: "The Depth of Oblivion", terjemahan: "Kedalaman Oblivion" },
                    { asli: "The Golden Land", terjemahan: "Taman Emas" },
                ]
            },
            {
                nama: "Objek / Item",
                items: [
                    { asli: "Epitaph", terjemahan: "Epitaf" },
                    { asli: "Grimoire", terjemahan: "Dipertahankan (Istilah Asli)" },
                    { asli: "Plane", terjemahan: "Tingkatan" },
                    { asli: "The Seven Stakes of Purgatory", terjemahan: "Tujuh Tombak Api Penyucian" }
                ]
            },
            {
                nama: "Aturan & Event",
                items: [
                    { asli: "Devil Proof", terjemahan: "Dipertahankan (Istilah Asli)" },
                    { asli: "Tea Party", terjemahan: "Dipertahankan (Istilah Asli)" },
                    { asli: "Van Dine's Commandments", terjemahan: "Aturan Mutlak Van Dine / Peraturan Van Dine" }
                ]
            }
        ]
    },
    {
        kategori: "SFX",
        items: [
            { asli: "Cackle", terjemahan: "Terkekeh" },
            { asli: "Clunk", terjemahan: "Krek" },
            { asli: "Cough", terjemahan: "Uhuk Uhuk" },
            { asli: "Giggle", terjemahan: "Cekikikan" },
            { asli: "Gulp", terjemahan: "Meneguk" },
            { asli: "Hic", terjemahan: "Terisak-isak" },
            { asli: "Sigh", terjemahan: "Cih / Tch / Haaaa" }
        ]
    }
];
</script>
