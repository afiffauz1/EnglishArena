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
        url: "view/main.js"
    }
]);

workbox.routing.registerRoute(
    new RegExp('/img/'),
    new workbox.strategies.CacheFirst({
        cacheName: "img",
    })
);

workbox.routing.registerRoute(
    new RegExp('/components/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "components",
    })
);

workbox.routing.registerRoute(
    new RegExp('/css/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "styles",
    })
);

workbox.routing.registerRoute(
    new RegExp('/js/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "scripts",
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/competitions/2021/standings'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "tables",
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/competitions/2021/teams'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "teams",
    })
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