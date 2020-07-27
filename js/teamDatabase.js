const dbName = "EnglishArenaDB";
let db = null;

const request = indexedDB.open(dbName, 1);

request.onupgradeneeded = event => {
    console.log("upgrade is called");

    db = event.target.result;

    const objectStore = db.createObjectStore("teamFavorite", {
        keyPath: "id"
    });
    objectStore.createIndex("name", "name", {
        unique: false
    });
}

request.onsuccess = event => {
    console.log("success is called")
}

request.onerror = event => {
    console.log("error is called");
}

function addTeam(team) {

    const tx = db.transaction("teamFavorite", "readwrite");
    const teamFav = tx.objectStore("teamFavorite");
    teamFav.add(team);
}