import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import RoomList from '@/views/RoomList.vue';
import AddRoom from '@/components/AddRoom.vue';
import EditRoom from '@/components/EditRoom.vue'
import DeleteRoom from '@/components/DeleteRoom.vue'
import JoinRoom from '@/components/JoinRoom.vue';
import ChatRoom from '@/views/ChatRoom.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
    {
        path: '/',
        component: Home,
        meta: { title: 'Home' },
    },
    {
        path: '/about',
        component: About,
        meta: { title: 'About' },
    },
    {
        path: '/room',
        component: RoomList,
        meta: { title: 'RoomList' },
    },
    {
        path: '/room/add',
        component: AddRoom,
        meta: { title: 'AddRoom' },
    },
    {
        path: '/room/update/:id',
        component: EditRoom,
        meta: { title: 'EditRoom' },
    },
    {
        path: '/room/delete/:id',
        component: DeleteRoom,
        meta: { title: 'DeleteRoom' },
    },
    {
        path: '/room/join/:id',
        component: JoinRoom,
        meta: { title: 'JoinRoom' },
    },
    {
        path: '/room/chat/:id/:nickname',
        component: ChatRoom,
        meta: { title: 'ChatRoom' },
    },
    {
        path: '/:path(.*)',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
