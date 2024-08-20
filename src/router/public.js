import LoginView from '@/views/LoginView.vue'

const routes = [
    {
        path: '/login',
        name: 'LoginView',
        component: LoginView,
    },
]

export default routes.map(route => {
    const meta = {
        public: true,
    }
    return { ...route, meta }
})