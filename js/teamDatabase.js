const dbName = "EnglishArenaDB";
let db = null;
const modalContentElement = document.getElementById("modal-content");
const modalElement = document.getElementById('modal-detail');
const btnClose = document.getElementById('btn-close');

const request = window.indexedDB.open(dbName, 1);

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
    console.log("success is called");
    db = event.target.result;
}

request.onerror = event => {
    console.log(`error: ${event.target.errorCode}`);
}

function addTeam(team) {
    const tx = db.transaction("teamFavorite", "readwrite");
    const teamFav = tx.objectStore("teamFavorite");
    const request = teamFav.add(team);

    request.onsuccess = event => {
        modalElement.style.display = "block";
        modalContentElement.innerHTML = `<h4 class="center">success adding <strong>${team.name}</strong> to database</h4>`

        btnClose.addEventListener("click", function () {
            modalElement.style.display = "none";
            modalContentElement.innerHTML = ``
        })
    }
}

function getFavoriteList() {

    return new Promise((resolve, reject) => {

        const tx = db.transaction("teamFavorite", "readonly");
        const teamFav = tx.objectStore("teamFavorite");
        const request = teamFav.getAll();

        request.onsuccess = event => {
            const result = event.target.result;
            resolve(result)
        }

        request.onerror = event => {
            reject(event.target.errorCode)
        }
    })
}

function deleteFavorite(id) {
    const tx = db.transaction(["teamFavorite"], "readwrite");
    const teamFav = tx.objectStore("teamFavorite");
    teamFav.delete(id);
}