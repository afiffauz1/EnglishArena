import {
    Router
} from '../js/vaadin-router.js';

const main = () => {
    const sidenavElement = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenavElement);

    document.querySelectorAll(".topnav a , .sidenav a").forEach(element => {
        element.addEventListener("click", function () {
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();
        })
    });

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
            path: '/favorites',
            component: 'favorite-page'
        },
        {
            path: '(.*)',
            component: 'page-notfound'
        }
    ]);



}

export default main;