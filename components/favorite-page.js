class FavoritePage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: "open"
        })
    }

    connectedCallback() {
        this.getTeamFav();
    }

    async getTeamFav() {
        let data = "";
        await getFavoriteList()
            .then(response => {
                response.forEach(team => {

                    const {
                        id,
                        name,
                        crestUrl,
                        founded,
                        venue,
                        address,
                        clubColors,
                        website
                    } = team;

                    data += `
                        <div class="card horizontal">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img src="${crestUrl}">
                            </div>
                            <div class="card-content">
                                <h1 class="card-title grey-text text-darken-4">${name}</h1>
                                <table class="responsive-table">
                                    <tbody>
                                        <tr>
                                            <th>Home Field</th>
                                            <td>${venue}</td>
                                        </tr>
                                        <tr>
                                            <th>Founded</th>
                                            <td>${founded}</td>
                                        </tr>
                                        <tr>
                                            <th>Address</th>
                                            <td>${address}</td>
                                        </tr>
                                        <tr>
                                            <th>Club Colors</th>
                                            <td>${clubColors}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <a href="${website}" target="_blank" class="btn">Visit Official Website</a>
                                            </td>
                                        </tr>
                                        <tr>
                                        <td>
                                            <a class="btn red accent-2 deleteFav" data-teamid="${id}">Delete Favorite</a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `
                })
            });
        this.uiFav(data);
    }

    uiFav(team) {
        this.shadow.innerHTML = `
        <link rel="stylesheet" href="../css/materialize.min.css" type="text/css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="../css/own-style.css">

        <h1><span class="grey-text darken-1">Your</span> Favorite teams</h1>
        <div class="row">${team}</div>

        <div id="modal-detail" class="own-modal">
            <!-- Modal content -->
            <div class="own-modal-action">
                <div id="modal-content" class="modal-action">
                    <a href="/teams" target="_self" id="yesBtn" class="btn medium red accent-2">Delete</a>
                    <div id="noBtn" class="btn medium">Cancel</div>
                </div>
            </div>

        </div>
        `;

        const modalElement = this.shadow.querySelector('#modal-detail');
        const btnDelete = this.shadow.querySelectorAll('.deleteFav');
        const yes = this.shadow.getElementById("yesBtn");

        let id = null;

        btnDelete.forEach(team => {
            team.addEventListener("click", function () {
                modalElement.style.display = "block";
                const idString = team.getAttribute("data-teamid");
                id = Number(idString);
            });
        });

        yes.addEventListener("click", async function () {
            console.log(`success delete team with id: ${id}`);
            deleteFavorite(id);
            modalElement.style.display = "none";
        });

    }

}

customElements.define("favorite-page", FavoritePage);