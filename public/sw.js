importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute([{
        url: "index.html",
        revision: 1
    },
    {
        url: "app.js",
        revision: 1
    },
    {
        url: "view/main.js",
        revision: 1
    },
    {
        url: "img/banner.jpg",
        revision: 1
    },
    {
        url: "img/banner-fav.jpg",
        revision: 1
    },
    {
        url: "img/banner-squad.jpg",
        revision: 1
    },
    {
        url: "img/banner-table.jpg",
        revision: 1
    },
    {
        url: "components/favorite-page.js",
        revision: 1
    },
    {
        url: "components/home-page.js",
        revision: 1
    },
    {
        url: "components/page-notfound.js",
        revision: 1
    },
    {
        url: "components/table-page.js",
        revision: 1
    },
    {
        url: "components/teams-page.js",
        revision: 1
    },
    {
        url: "css/materialize.min.css",
        revision: 1
    },
    {
        url: "css/own-style.css",
        revision: 1
    },
    {
        url: "js/data-api.js",
        revision: 1
    },
    {
        url: "js/materialize.min.js",
        revision: 1
    },
    {
        url: "js/vaadin-router.js",
        revision: 1
    },
], {
    ignoreURLParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    (({
        url
    }) => url.origin),
    new workbox.strategies.StaleWhileRevalidate()
);

self.addEventListener("push", function (event) {
    let body = null;
    if (event.data) {
        body = event.data.text();
    } else {
        body = "push message no payload"
    }

    const options = {
        body: body,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification("English Arena", options)
    )
})