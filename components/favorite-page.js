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
                                            <a target="_blank" class="btn red accent-2 deleteFav" data-teamid="${id}">Delete Favorite</a>
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
        `;

        const btnDelete = this.shadow.querySelectorAll('.deleteFav');
        btnDelete.forEach(team => this.deleteFav(team));
    }

    deleteFav(team) {
        const idString = team.getAttribute("data-teamid");
        const id = Number(idString);
        team.addEventListener("click", function () {
            deleteFavorite(id);
        });

    }
}

customElements.define("favorite-page", FavoritePage);