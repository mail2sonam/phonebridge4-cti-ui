import Axios from 'axios-observable';

var host = window.document.location.host
var charHost = host.indexOf(":");
var ipHost = host.substring(0, charHost)
//var ipName = window.document.location.protocol+"//"+ ipHost +":9091";
var ipName = "http://192.168.10.210:5001/eupraxia"

const MONITOR_API_BASE_URL = ipName
//const MONITOR7000_API_BASE_URL = "http://192.168.10.210:9091";

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

class BargingApi {

    // spy(wis) {
    //     return Axios.post(ipName + '/' + 'api/Spy', wis, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    spy(wis) {
        return Axios.post(ipName + '/' + 'api/Spy', wis);
    }

};
export default new BargingApi()