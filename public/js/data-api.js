const fetchAPI = url => {
    return fetch(url, {
        headers: {
            "X-Auth-Token": "c371638cb83f429883750ca90f84710e"
        }
    })
}

class DataApi {

    static getTables() {
        return fetchAPI("https://api.football-data.org/v2/competitions/2021/standings")
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
        return fetchAPI("https://api.football-data.org/v2/competitions/2021/teams")
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
        return fetchAPI(`https://api.football-data.org/v2/teams/${teamId}`)
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