const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BF7rJMug9lOZxa9-R5M6pcC7tGcD9w1qAaOSwz7McC0UiCuiAyod724SrjkNxqw9Ec6_i17aQ1e7k6_NTAlscDc",
    "privateKey": "IbLW98w7j-pr0jkbDlF3RjyY_VLTQvZiIagbcTc9Q0w"
}

webPush.setVapidDetails(
    "mailTo: ma.fauzi@outlook.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubs = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/e3hFZSdOyKk:APA91bFD3mBp8qLfBT6xfS6Wtv3bPlYL1BpCTBG9f7NedW27_1qomHh5ADAaPvtXHKDz2cMjfQbhww9rRFZyiO424PhGN-c6SlFq-YCWqbH1fbR67JDZbA8cO0KVAd-HtipJxVoFLwrq",
    "keys": {
        "p256dh": "BBjze07VAA6TsVp9jBsCz1jsK3f+BiO6tyx4UutTQKCT6uZ8TiJtR+oP1HGBBRIMw2ED9pY11c6c0oexejWGFGs=",
        "auth": "4sR3/TXNK5abAN6HGbikYA=="
    }
}

const payload = "Hey Premier League Fans, welcome in unofficial Premier League Fans Website";
const options = {
    gcmAPIKey: "1076620290157",
    TTL: 60
}

webPush.sendNotification(
        pushSubs,
        payload,
        options
    )
    .then(response => console.log(response))
    .catch(err => console.log(err))