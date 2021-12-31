import Axios from 'axios-observable';

var host = window.document.location.host
var charHost = host.indexOf(":");
var ipHost = host.substring(0, charHost)
//var ipName = window.document.location.protocol+"//"+ ipHost +":9091";
var ipName = "http://192.168.10.210:5001/eupraxia"




//const HANGUP_API_BASE_URL = "http://192.168.10.210:9091";

const HANGUP_API_BASE_URL = ipName

Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        let refreshToken = localStorage.getItem("refreshtoken");
        if (
            refreshToken &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            return Axios
                .post(ipName + '/auth/renew', { refreshToken: refreshToken, email: localStorage.getItem("email") })
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem("token", res.data.accessToken);
                        return Axios(originalRequest);
                    }
                });
        }
        return Promise.reject(error);
    }
);

class Hangupapi {

    // Hang(hang) {
    //     return Axios.post(ipName + '/' + 'api/Hangup', hang, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    // Hold(hold) {
    //     return Axios.post(ipName + '/' + 'api/Hold', hold, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    // UnHold(unhold) {
    //     return Axios.post(ipName + '/' + 'api/unhold', unhold, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    // Line2(line2) {
    //     return Axios.post(ipName + '/' + 'api/line2', line2, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    // Conference(conference) {
    //     return Axios.post(ipName + '/' + 'api/conference', conference, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }



    Hang(hang) {
        return Axios.post(ipName + '/' + 'api/Hangup', hang);
    }

    Hold(hold) {
        return Axios.post(ipName + '/' + 'api/Hold', hold);
    }

    UnHold(unhold) {
        return Axios.post(ipName + '/' + 'api/unhold', unhold);
    }

    Line2(line2) {
        return Axios.post(ipName + '/' + 'api/line2', line2);
    }

    Conference(conference) {
        return Axios.post(ipName + '/' + 'api/conference', conference);
    }






    AddFav(favadd) {
        return Axios.post(ipName + '/' + 'call/addFavorite', favadd, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    GetAddFav() {
        return Axios.get(ipName + '/' + 'call/findAllFavorites', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

};
export default new Hangupapi()
