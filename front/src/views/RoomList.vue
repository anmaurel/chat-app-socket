<template>
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div class="rounded-t mb-0 px-4 py-3 border-0">
                <div class="flex flex-wrap items-center">
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 class="font-semibold text-base text-blueGray-700">Room list</h3>
                        <button class="text-gray-400 hover:text-gray-500 cursor-pointer px-2" @click="addRoom">Add room</button>
                    </div>
                </div>
            </div>
            <div class="block w-full overflow-x-auto">
                <table class="items-center bg-transparent w-full border-collapse">
                    <thead>
                        <tr>
                            <th
                                class="
                                    px-6
                                    bg-blueGray-50
                                    text-blueGray-500
                                    align-middle
                                    border border-solid border-blueGray-100
                                    py-3
                                    text-xs
                                    uppercase
                                    border-l-0 border-r-0
                                    whitespace-nowrap
                                    font-semibold
                                    text-left
                                "
                            >
                                Room name
                            </th>
                            <th
                                class="
                                    px-6
                                    bg-blueGray-50
                                    text-blueGray-500
                                    align-middle
                                    border border-solid border-blueGray-100
                                    py-3
                                    text-xs
                                    uppercase
                                    border-l-0 border-r-0
                                    whitespace-nowrap
                                    font-semibold
                                    text-left
                                "
                            >
                                Created date
                            </th>
                            <th
                                class="
                                    px-6
                                    bg-blueGray-50
                                    text-blueGray-500
                                    align-middle
                                    border border-solid border-blueGray-100
                                    py-3
                                    text-xs
                                    uppercase
                                    border-l-0 border-r-0
                                    whitespace-nowrap
                                    font-semibold
                                    text-left
                                "
                            >
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="room in rooms" :key="room._id">
                            <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">{{ room.room_name }}</th>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{{ room.created_date }}</td>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <button
                                    class="
                                        tracking-widest
                                        px-4
                                        py-2
                                        mr-2
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
                                    "
                                    @click.stop="join(room._id)"
                                >
                                    Join
                                </button>
                                <button
                                    class="
                                        tracking-widest
                                        px-4
                                        py-2
                                        mr-2
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
                                    "
                                    @click="editRoom(room._id)"
                                >
                                    Edit
                                </button>
                                <button
                                    class="
                                        tracking-widest
                                        px-4
                                        py-2
                                        mr-2
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
                                    "
                                    @click="deleteRoom(room._id)"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            rooms: [],
        };
    },
    created() {
        axios
            .get('http://localhost:9000/room')
            .then((response) => {
                this.rooms = response.data;
            })
            .catch((e) => {
                this.errors.push(e);
            });
    },
    methods: {
        join(id) {
            this.$router.push({
                path: `/room/join/${id}`,
            });
        },
        addRoom() {
            this.$router.push({
                path: '/room/add',
            });
        },
        editRoom(id) {
            this.$router.push({
                path: `/room/update/${id}`,
            });
        },
        deleteRoom(id) {
            this.$router.push({
                path: `/room/delete/${id}`,
            });
        },
    },
};
</script>
