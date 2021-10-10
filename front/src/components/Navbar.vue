<template>
    <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="hidden sm:block sm:ml-6">
                        <div class="flex space-x-4">
                            <router-link to="/" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</router-link>
                            <router-link to="/room" v-if="isAuthenticated" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Room</router-link>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div class="flex items-center" v-if="!isAuthenticated">
                        <button @click="isLoginModalActive = true" type="button" class="bg-gray-800 px-2 rounded-full text-gray-400 hover:text-white">Login</button>
                        <button @click="isRegisterModalActive = true" type="button" class="bg-gray-800 px-2 rounded-full text-gray-400 hover:text-white">Register</button>
                    </div>
                    <div class="flex items-center" v-else>
                        <div class="text-gray-400 hover:text-white cursor-default px-2">{{ currentUser }}</div>
                        <div class="text-gray-400 hover:text-white cursor-pointer px-2" @click="logoutUser">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="sm:hidden" id="mobile-menu">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <router-link to="/" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</router-link>
                <router-link to="/room" v-if="isAuthenticated" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Room</router-link>
            </div>
        </div>
        <LoginModal v-if="isLoginModalActive" @childToParent="updateLoginModalStatus" />
        <RegisterModal v-if="isRegisterModalActive" @childToParent="updateRegisterModalStatus" />
    </nav>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        LoginModal,
        RegisterModal,
    },
    data() {
        return {
            isLoginModalActive: false,
            isRegisterModalActive: false,
        };
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'currentUser']),
    },
    methods: {
        updateLoginModalStatus(data) {
            this.isLoginModalActive = data;
        },
        updateRegisterModalStatus(data) {
            this.isRegisterModalActive = data;
        },
        logoutUser() {
            this.$store.dispatch('logout');
            this.$router.push({
                path: '/',
            });
        },
    },
};
</script>
