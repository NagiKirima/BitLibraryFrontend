import MainView from '@/views/MainView.vue'

const routes = [
    {
        path: '/',
        name: 'MainView',
        component: MainView,
    },
]

export default routes.map(route => {
    return { ...route, meta: { public: false }}
})