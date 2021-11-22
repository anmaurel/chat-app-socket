<template>
  <div class="bg-gray-50">
    <div v-if="ready">{{ chats }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            ready: false,
            chats: []
        };
    },
    methods: {
        getChat() {
            this.loading = false;
            axios
                .get('https://node.amaurel.tk:9000/chat')
                .then((response) => {
                    this.chats.push(response.data);

                    this.ready = true;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.getChat();
    },
};
</script>
