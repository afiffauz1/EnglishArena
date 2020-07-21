import {
    Router
} from '../js/vaadin-router.js';

const main = () => {
    const sidenavElement = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenavElement);

    const bodyContent = document.getElementById('body-content');
    const router = new Router(bodyContent);
    router.setRoutes([{
            path: '/',
            component: 'home-page'
        },
        {
            path: '/tables',
            component: 'table-page'
        },
        {
            path: '/teams',
            component: 'teams-page'
        },
        {
            path: '/teams/:id',
            component: 'profile-page'
        },
        {
            path: '(.*)',
            component: 'page-notfound'
        }
    ]);



}

export default main;