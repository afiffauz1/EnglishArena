if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => {
            console.log("Registration succeded");
        }).catch(error => {
            console.log(`Registration failed: ${error}`)
        })
} else {
    console.log("Browser is not support service worker");
}