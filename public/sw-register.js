if (!("serviceWorker" in navigator)) {
    console.log("Browser is not support service worker");
} else {
    registerSW();
    requestPermission();
}

function registerSW() {
    return navigator.serviceWorker.register('/sw.js')
        .then(() => {
            console.log("Registration succeded");
        }).catch(error => {
            console.log(`Registration failed: ${error}`)
        })
}

function requestPermission() {

    if ("Notification" in window) {

        Notification.requestPermission().then(permission => {
            if (permission === "denied") {
                console.log("notification permission has been rejected");
                return;
            } else if (permission === "default") {
                console.log("user close notification bar");
                return;
            }

            console.log("notfication has been accepted");

            if (("PushManager" in window)) {
                navigator.serviceWorker.ready.then(function (registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(
                            "BF7rJMug9lOZxa9-R5M6pcC7tGcD9w1qAaOSwz7McC0UiCuiAyod724SrjkNxqw9Ec6_i17aQ1e7k6_NTAlscDc"
                        )
                    }).then(function (subscribe) {
                        console.log(`success subscribe with endpoint: ${subscribe.endpoint}`);
                        console.log(`success subscribe with p256h key: ${btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey("p256dh"))
                        ))}`);
                        console.log(`success subscribe with auth key: ${btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey("auth"))
                        ))}`);
                    }).catch(function (err) {
                        console.log(`subscribe error: ${err.message}`)
                    });
                })
            }
        })
    }

}

function urlBase64ToUint8Array(base64String) {
    const padding = `=`.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}