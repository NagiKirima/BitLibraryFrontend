import HeaderComponent from '@/components/HeaderComponent.vue'

const routes = [
    {
        path: '/',
        redirect: '/users',
        component: HeaderComponent,
        children: [
            {
                path: '/users',
                name: 'users',
                component: () => import('@/views/UsersView.vue'),
            },
            {
                path: '/users/:id_user',
                name: 'user',
                component: () => import('@/views/UserView.vue'),
            },
            {
                path: '/authors',
                name: 'authors',
                component: () => import('@/views/AuthorsView.vue'),
            },
            {
                path: '/authors/:id_author',
                name: 'author',
                component: () => import('@/views/AuthorView.vue'),
            },
            {
                path: '/genres',
                name: 'genres',
                component: () => import('@/views/GenresView.vue'),
            },
            {
                path: '/genres/:id_genre',
                name: 'genre',
                component: () => import('@/views/GenreView.vue'),
            },
            {
                path: '/books',
                name: 'books',
                component: () => import('@/views/BooksView.vue'),
            },
            {
                path: '/books/:id_book',
                name: 'book',
                component: () => import('@/views/BookView.vue'),
            },
            {
                path: '/borrows',
                name: 'borrows',
                component: () => import('@/views/BorrowsView.vue'),
            },
            {
                path: '/borrows/:id_borrow',
                name: 'borrow',
                component: () => import('@/views/BorrowView.vue'),
            },
            {
                path: '/reports',
                name: 'reports',
                component: () => import('@/views/ReportsView.vue'),
            },
        ]
    },
]

export default routes.map(route => {
    return { ...route, meta: { public: false }}
})