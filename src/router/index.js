import publicRoutes from './public'
import privateRoutes from './private'
import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [].concat(publicRoutes).concat(privateRoutes);

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authenticated = localStorage.hasOwnProperty('api_key');
    const isPublic = to.matched.some(record => record.meta.public);

    if (!isPublic && !authenticated) {
        // Пользователь не авторизован и пытается получить доступ к защищенному маршруту
        next({
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        });
    } else if (isPublic && authenticated) {
        // Пользователь авторизован, но пытается получить доступ к публичному маршруту (логин)
        next('/');
    } else {
        // Пользователь авторизован и пытается получить доступ к защищенному маршруту или пользователь неавторизован, но запрашивает публичный маршрут
        next();
    }
});


export default router;