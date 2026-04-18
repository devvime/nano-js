import { Router } from './core/Router.js';
import { Home } from './pages/Home.js';
import { UserDetail } from './pages/UserDetail.js';

const routes = [
    { path: '/', component: Home },
    { path: '/user/:id', component: UserDetail }
];

const router = new Router(routes, '#app');
router.init();