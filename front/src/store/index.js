import { createStore } from 'vuex';

export default createStore({
    state: {
        userAuth: localStorage.user,
        isAuthenticated: !!localStorage.token,
    },
    mutations: {
        SET_AUTH: (state, user) => {
            state.isAuthenticated = true;
            state.userAuth = user.userEmail;
            localStorage.setItem('user', user.userEmail);
            localStorage.setItem('token', user.token);
        },
        PURGE_AUTH: (state) => {
            state.isAuthenticated = false;
            state.userAuth = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
    actions: {
        login: (context, credentials) => {
            context.commit('SET_AUTH', credentials);
        },
        logout: (context) => {
            context.commit('PURGE_AUTH');
        },
        register: (context, credentials) => {
            context.commit('SET_AUTH', credentials);
        },
    },
    getters: {
        currentUser: (state) => state.userAuth,
        isAuthenticated: (state) => state.isAuthenticated,
    },
});
