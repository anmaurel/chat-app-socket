<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" ref="modal">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="py-3 text-2xl font-bold text-center">Room creation form</div>
                <form @submit="onSubmit">
                    <div class="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start sm:justify-center">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">Name</label
                                    ><input
                                        type="text"
                                        v-model="form.room_name"
                                        required
                                        class="
                                            border-0
                                            px-3
                                            py-3
                                            placeholder-blueGray-300
                                            text-blueGray-600
                                            bg-white
                                            rounded
                                            text-sm
                                            shadow
                                            focus:outline-none focus:ring
                                            w-full
                                            ease-linear
                                            transition-all
                                            duration-150
                                        "
                                        placeholder="Room name"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            class="
                                inline-flex
                                justify-center
                                tracking-widest
                                px-4
                                py-2
                                rounded-md
                                text-xs
                                font-medium
                                border
                                shadow
                                focus:outline-none focus:ring
                                transition
                                text-red-600
                                bg-red-50
                                border-red-200
                                hover:bg-red-100
                                active:bg-red-200
                                focus:ring-red-300
                                mx-2
                            "
                            type="submit"
                        >
                            Add
                        </button>
                        <button
                            class="
                                inline-flex
                                justify-center
                                tracking-widest
                                px-4
                                py-2
                                rounded-md
                                text-xs
                                font-medium
                                border
                                shadow
                                focus:outline-none focus:ring
                                transition
                                text-gray-600
                                bg-gray-50
                                border-gray-200
                                hover:bg-gray-100
                                active:bg-gray-200
                                focus:ring-gray-300
                                mx-2
                            "
                            @click="closeModal"
                            type="button"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                room_name: '',
            },
        };
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            axios
                .post(`https://back.amaurel.tk/room/add`, this.form, { headers: { Authorization: `Bearer ${localStorage.token}` } })
                .then((response) => {
                    this.form = response.data;
                    this.closeModal();
                    this.$router.push({
                        path: '/room',
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        closeModal() {
            this.$router.push({
                path: '/room',
            });
        },
    },
};
</script>
