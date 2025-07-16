<template>
    <table v-if="glosarium?.length"
        class="table-auto w-full border-2 border-slate-200 text-white text-center bg-cyan-900/20 drop-shadow-2xl">
        <thead class=" border-2 border-slate-200">
            <tr class="">
                <th class="p-2 bg-red-900/50 drop-shadow-lg border-2 border-slate-200 text-shadow-md text-shadow-black text-xl max-md:text-lg">Asli</th>
                <th class="p-2 bg-red-900/50 drop-shadow-lg border-2 border-slate-200 text-shadow-md text-shadow-black text-xl max-md:text-lg">Terjemahan</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(gl, index) in glosarium" :key="index" class="font-semibold">
                <td class="p-2 border-2 border-slate-200 text-lg max-md:text-base">{{ gl.asli }}</td>
                <td class="p-2 border-2 border-slate-200 text-lg max-md:text-base">{{ gl.terjemahan }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
const glosarium = [
    {
        asli: 'Grimoire',
        terjemahan: 'Dipertahankan (Istilah Asli)',
    },
    {
        asli: 'Golden Witch',
        terjemahan: 'Penyihir Emas'
    },
    {
        asli: 'Golden Land',
        terjemahan: 'Pulau Emas'
    },
    {
        asli: 'Red & Blue Truth',
        terjemahan: 'Dipertahankan (Istilah Asli)'
    },
    {
        asli: 'Furniture (Kagu)',
        terjemahan: 'Furnitur'
    },
    {
        asli: 'Epitaph',
        terjemahan: 'Epitaf'
    },
    {
        asli: 'Tea Party',
        terjemahan: 'Dipertahankan (Istilah Asli)'
    },
];
</script>