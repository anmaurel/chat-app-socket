<script setup>
import { ref } from 'vue';

let counter = ref(0);

setInterval(() => {
    counter.value++;
}, 1000);
</script>

<template>
    <div class="h-screen bg-gray-200">
        <header class="bg-white shadow" v-if="$route.meta.title">
            <Navbar/>
        </header>
        <main>
            <router-view />
        </main>
    </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
    components: {
        Navbar
    }
};
</script>
