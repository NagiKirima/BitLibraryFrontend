import publicRoutes from './public'
import privateRoutes from './private'
import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [].concat(publicRoutes).concat(privateRoutes);

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;