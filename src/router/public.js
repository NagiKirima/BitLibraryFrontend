import LoginView from '@/views/LoginView.vue'

const routes = [
    {
        path: '/login',
        name: 'LoginView',
        component: LoginView,
    },
]

export default routes.map(route => {
    return { ...route }
})