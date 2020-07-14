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
            path: '(.*)',
            component: 'page-notfound'
        }
    ]);

}

export default main;