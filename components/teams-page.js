import DataApi from '../js/data-api.js';

class TeamsPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: "open"
        })
    }

    connectedCallback() {
        this.loadingScreen();
        this.dataClubs();
    }

    async dataClubs() {
        const dataTeams = await DataApi.getTeams();
        let teamList = "";
        dataTeams.teams.forEach(team => {
            const {
                name,
                crestUrl
            } = team;

            teamList += `
                <div class="col s12 m4">
                    <div class="card medium">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${crestUrl}">
                        </div>
                        <div class="card-content">
                            <span class="card-title grey-text text-darken-4">${name}</span>
                        </div>
                        <div class="card-action">
                        <a href="#">Team Profile</a>
                      </div>
                    </div>
                </div>
            `;
        });

        this.cardContainer(teamList);
    }

    cardContainer(team) {
        this.shadow.innerHTML = `
            <link rel="stylesheet" href="../css/materialize.min.css" type="text/css">

            <h1>Premier League <span class="grey-text darken-1">Teams</span></h1>
            <div class="row">${team}</div>
        `
    }

    loadingScreen() {
        this.shadow.innerHTML = `
        <link rel="stylesheet" href="../css/own-style.css" type="text/css">
        <link rel="stylesheet" href="../css/materialize.min.css" type="text/css">
        <h3 class="center loader">Please wait...</h3>
        `
    }
}

customElements.define('teams-page', TeamsPage);