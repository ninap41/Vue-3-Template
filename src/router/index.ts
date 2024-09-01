import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/about',
			name: 'about',
			component: () => import('@/views/AboutView.vue')
		},
		{
			path: '/examples',
			name: 'Examples',
			component: () => import('@/views/ExamplesView.vue')
		},
		{
			path: '/state',
			name: 'state',
			component: () => import('@/views/StateExampleView.vue')
		},
		{
			path: '/',
			name: 'terminal',
			component: () => import('@/components/Terminal.vue')
		}
	]
});

export default router;