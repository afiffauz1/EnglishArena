class DataApi {

    static getTables() {
        return fetch(`https://api.football-data.org/v2/competitions/2021/standings`, {
                method: 'GET',
                headers: {
                    "X-Auth-Token": "c371638cb83f429883750ca90f84710e"
                }
            })
            .then(response => {
                if (response) {
                    return Promise.resolve(response)
                } else {
                    return Promise.reject("Data not found !!!")
                }
            })
            .then(response => response.json())
    }

    static getTeams() {
        return fetch('https://api.football-data.org/v2/competitions/2021/teams', {
                method: "GET",
                headers: {
                    "X-Auth-Token": "c371638cb83f429883750ca90f84710e"
                }
            })
            .then(response => {
                if (response) {
                    return Promise.resolve(response)
                } else {
                    return Promise.reject("Data not found !!!")
                }
            })
            .then(response => response.json())
    }

    static getProfileTeam(teamId) {
        return fetch(`https://api.football-data.org/v2/teams/${teamId}`, {
                method: "GET",
                headers: {
                    "X-Auth-Token": "c371638cb83f429883750ca90f84710e"
                }
            })
            .then(response => {
                if (response) {
                    return Promise.resolve(response)
                } else {
                    return Promise.reject("Data not found !!!")
                }
            })
            .then(response => response.json());
    }
}

export default DataApi;