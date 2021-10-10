<template>
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div class="rounded-t mb-0 px-4 py-3 border-0">
                <div class="flex flex-wrap items-center">
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 class="font-semibold text-base text-blueGray-700">Chat room</h3>
                        <button class="text-gray-400 hover:text-gray-500 cursor-pointer px-2" @click.stop="logout()">Logout</button>
                    </div>
                </div>
            </div>
            <div class="block w-full overflow-x-auto px-6">
                <div v-for="item in chats" :key="item.nickname" class="shadow-md rounded-md overflow-hidden bg-gray-100 mb-3">
                    <div v-if="item.nickname" class="pt-2 px-4 text-xs">{{ item.nickname }}</div>
                    <div class="px-4 pt-2">
                        <p class="text-m">{{ item.message }}</p>
                    </div>
                    <div class="py-2 px-4 text-xs">{{ item.created_date }}</div>
                </div>
                <div class="border-t-2 border-gray-200 p-4">
                    <form @submit="onSubmit" class="relative text-gray-700">
                        <input
                            :state="state"
                            v-model.trim="chat.message"
                            class="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg focus:outline-none focus:ring focus:border-red-300"
                            type="text"
                            placeholder="Message"
                        />
                        <button type="submit" class="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-red-600 rounded-r-lg hover:bg-red-500 focus:bg-red-700">Send</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import io from 'socket.io-client';

export default {
    data() {
        return {
            chats: [],
            errors: [],
            nickname: this.$route.params.nickname,
            chat: {},
            socket: io('http://localhost:9000'),
        };
    },
    created() {
        axios
            .get('http://localhost:9000/chat/' + this.$route.params.id, { headers: { Authorization: `Bearer ${localStorage.token}` } })
            .then((response) => {
                console.log(response.data);
                this.chats = response.data;
            })
            .catch((e) => {
                this.errors.push(e);
            });
        this.socket.on(
            'new-message',
            function (data) {
                if (data.message.room === this.$route.params.id) {
                    this.chats.push(data.message);
                }
            }.bind(this),
        );
    },
    methods: {
        logout() {
            this.socket.emit('save-message', { room: this.chat.room, nickname: this.chat.nickname, message: this.chat.nickname + ' left this room', created_date: new Date() });
            this.$router.push({
                path: '/room',
            });
        },
        onSubmit(evt) {
            evt.preventDefault();
            this.chat.room = this.$route.params.id;
            this.chat.nickname = this.$route.params.nickname;
            axios
                .post('http://localhost:9000/chat/add', this.chat, { headers: { Authorization: `Bearer ${localStorage.token}` } })
                .then((response) => {
                    this.socket.emit('save-message', response.data);
                    this.chat.message = '';
                })
                .catch((e) => {
                    this.errors.push(e);
                });
        },
    },
};
</script>
