import DataApi from '../js/data-api.js';

class TablePage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: 'open'
        })
    }

    connectedCallback() {
        this.loaderUI();
        this.dataTables();
    }

    async dataTables() {


        const dataClub = await DataApi.getTables();
        let clubList = "";
        dataClub.standings[0].table.forEach(club => {
            const {
                position,
                team,
                playedGames,
                won,
                draw,
                lost,
                points,
                goalsFor,
                goalsAgainst,
                goalDifference
            } = club;
            clubList += `
                <tr>
                    <td>${position}</td>
                    <th>${team.name}</th>
                    <td>${playedGames}</td>
                    <td>${won}</td>
                    <td>${draw}</td>
                    <td>${lost}</td>
                    <td>${goalsFor}</td>
                    <td>${goalsAgainst}</td>
                    <td>${goalDifference}</td>
                    <td>${points}</td>
                </tr>
            `
        });

        this.tablesUI(clubList);
    }

    tablesUI(clubList) {
        this.shadow.innerHTML = `
        <link rel="stylesheet" href="../css/materialize.min.css" type="text/css">
        <h1>Premier League <span class="grey-text darken-1">Table</span></h1>
        <table class="striped table-container">
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Club</th>
                    <th>Played</th>
                    <th>Won</th>
                    <th>Drawn</th>
                    <th>Lost</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                ${clubList}
            </tbody>
        </table>
        `
    }

    loaderUI() {
        this.shadow.innerHTML = `
        <link rel="stylesheet" href="../css/own-style.css" type="text/css">
        <link rel="stylesheet" href="../css/materialize.min.css" type="text/css">
        <h3 class="center loader">Please wait...</h3>
        `
    }
}

customElements.define('table-page', TablePage);