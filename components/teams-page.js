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
                id,
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
                        <a class='btn profile-team purple darken-4' data-teamId="${id}">Team Profile</a>
                        <a class='btn player-team purple darken-4' data-teamId="${id}">Players</a>
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
            <link rel="stylesheet" href="../css/own-style.css">

            <h1>Premier League <span class="grey-text darken-1">Teams</span></h1>
            <div class="row">${team}</div>

            <div id="modal-detail" class="own-modal">
                <!-- Modal content -->
                <div class="own-modal-content">
                    <div className="modal-action">
                        <div class="btn red accent-2" id="btn-close">Close</div>
                    </div>
                    <div id="modal-content"></div>
                    <div id="modal-card-container" class="row"></div>
                    
                </div>

            </div>
        `;

        const btnProfile = this.shadow.querySelectorAll('.profile-team');
        const btnPlayer = this.shadow.querySelectorAll('.player-team');

        const modalElement = this.shadow.querySelector('#modal-detail');
        const modalContentContainer = this.shadow.querySelector('#modal-content');
        const modalCardContainer = this.shadow.querySelector('#modal-card-container');


        btnProfile.forEach(team => this.detailTeam(team));
        btnPlayer.forEach(player => this.playerList(player));

        const btnClose = this.shadow.querySelector("#btn-close");
        btnClose.addEventListener('click', function () {
            modalContentContainer.innerHTML = "";
            modalCardContainer.innerHTML = "";
            modalElement.style.display = "none";
        })

    }

    loadingScreen() {
        this.shadow.innerHTML = `
        <link rel="stylesheet" href="../css/own-style.css" type="text/css">
        <link rel="stylesheet" href="../css/materialize.min.css" type="text/css">
        <h3 class="center loader">Please wait...</h3>
        `;
    }

    detailTeam(team) {
        const modalElement = this.shadow.querySelector('#modal-detail');
        const modalContentContainer = this.shadow.querySelector('#modal-content');

        team.addEventListener('click', async function () {
            modalElement.style.display = "block"
            const teamid = team.getAttribute('data-teamId');
            const getProfileTeam = await DataApi.getProfileTeam(teamid);


            const {
                name,
                crestUrl,
                venue,
                founded,
                address,
                clubColors,
                website
            } = getProfileTeam;

            let modalContent = "";
            modalContent = `
            <h2 class="header">${name} - <span class="grey-text darken-1">Team Profile</span></h2>
            <div class="card horizontal medium">
              <div class="card-image">
                <img src="${crestUrl}">
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  
                <table class="responsive-table">
                    <tbody>
                    <tr>
                        <th>Homefield</th>
                        <td>${venue}</td>
                    </tr>
                    <tr>
                        <th>Founded</th>
                        <td>${founded}</td>
                    </tr>
                    <tr>
                        <th>Team Colors</th>
                        <td>${clubColors}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>${address}</td>
                    </tr>
                    <tr>
                        <td>
                            <a href="${website}" target="_blank" class="btn green darken-1">Visit Official Website</a>
                        </td>
                    </tr>
                    </tbody>
                </table>

                </div>
              </div>
            </div>
            `

            modalContentContainer.innerHTML = modalContent;
        });
    }

    playerList(player) {
        const modalElement = this.shadow.querySelector('#modal-detail');
        const modalCardContainer = this.shadow.querySelector('#modal-card-container');

        player.addEventListener('click', async function () {
            modalElement.style.display = "block"
            const teamid = player.getAttribute('data-teamId');
            const getProfileTeam = await DataApi.getProfileTeam(teamid);

            let cardContent = "";

            getProfileTeam.squad.forEach(player => {

                const {
                    name,
                    shirtNumber,
                    position,
                    nationality,
                    dateOfBirth
                } = player;

                cardContent += `
                <div class="col s12 m4">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title grey-text text-darken-4"><strong>${name}</strong></span>
                            <span class="card-title grey-text text-darken-4">${shirtNumber}</span>
                            <span class="card-title grey-text text-darken-4">${position}</span>
                            <p><strong>Nationality:</strong> ${nationality}</p>
                        </div>
                    </div>
                </div>
                `
            });

            modalCardContainer.innerHTML = cardContent;
        });
    }

}

customElements.define('teams-page', TeamsPage);