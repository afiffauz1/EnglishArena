// class DataApi {
//     baseUrl = "https://api.football-data.org/v2/";
//     static tables() {
//         return fetch(`${baseUrl}competitions/2021/standings`, {
//                 method: 'GET',
//                 headers: {
//                     "X-Auth-Token": "c371638cb83f429883750ca90f84710e"
//                 }
//             })
//             .then(response => response.json())
//             .then(responseJson => {
//                 if (responseJson.standings[0].table) {
//                     return Promise.resolve(responseJson.standings[0].table)
//                 } else {
//                     return Promise.reject("Data not found !!!")
//                 }
//             })
//             .catch(error => Promise.reject(error));
//     }
// }

// export default DataApi;