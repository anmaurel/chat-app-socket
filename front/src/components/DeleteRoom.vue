<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" ref="modal">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="py-3 px-2 text-2xl font-bold text-center">Are you sure you want to delete this room ?</div>
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
                        @click="onConfirmDeletion"
                        type="button"
                    >
                        Confirm
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
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    methods: {
        onConfirmDeletion() {
            axios
                .delete('http://localhost:9000/room/delete/' + this.$route.params.id, { headers: { Authorization: `Bearer ${localStorage.token}` } })
                .then(() => {
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
