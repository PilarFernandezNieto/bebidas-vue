<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useBebidasStore } from '../stores/bebidas';

const route = useRoute();
const store = useBebidasStore();




const paginaInicio = computed(() => {
    return route.name === "inicio"
}) 

const handleSubmit = (() => {
    // TODO: Validar

    store.obtenerRecetas();
    
})


</script>
<template>
    <header class="bg-slate-800" :class="{header: paginaInicio}">
        <div class="mx-auto container px-5 md:p-20 py-16">
            <div class="flex justify-between items-center">
                <div>
                    <RouterLink :to="{name: 'inicio'}">
                        <img src="/img/logo.svg" alt="logotipo" class="w-32">
                    </RouterLink>
                </div>
                <nav class="flex gap-4">
                    <RouterLink :to="{name: 'inicio'}" class="text-white uppercase font-bold"
                        active-class="text-orange-500">Inicio</RouterLink>
                    <RouterLink :to="{ name: 'favoritos' }" class="text-white uppercase font-bold"
                        active-class="text-orange-500">Favoritos</RouterLink>

                </nav>
            </div>
            <form v-if="paginaInicio"
                class="w-full  md:w-3/5 lg:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6" @submit.prevent="handleSubmit">
                <div class="space-y-4">
                    <label for="ingrediente" class="block text-white uppercase font-extrabold text-lg">Nombre o
                        Ingredientes</label>
                    <input type="text" id="ingrediente" class="p-3 w-full rounded-lg focus:outline-none" v-model="store.busqueda.nombre"
                        placeholder="Nombre o Ingrediente: ej, Vodka, Tequila, etc">
                </div>
                <div class="space-y-4">
                    <label for="categoria" class="block text-white uppercase font-extrabold text-lg">Categoría</label>
                    <select id="categoria" class="p-3 w-full rounded-lg focus:outline-none" v-model="store.busqueda.categoria">
                        <option value="">-- Seleccione --</option>
                        <option v-for="categoria in store.categorias" :key="categoria.strCategory"
                            :value="categoria.strCategory">{{ categoria.strCategory }}</option>
                    </select>
                </div>
                <input type="submit" value="Buscar Recetas"
                    class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase">
            </form>
        </div>
    </header>
</template>
<style>
.header {
    background-image: url('/img/bg.jpg');
    background-size: cover;
    background-position: center;
}
</style>


