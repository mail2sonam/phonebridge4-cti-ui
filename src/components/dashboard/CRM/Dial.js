import Axios from 'axios-observable';

var host = window.document.location.host
var charHost = host.indexOf(":");
var ipHost = host.substring(0, charHost)
//var ipName = window.document.location.protocol+"//"+ ipHost +":9091";
var ipName  = "http://192.168.10.210:5001/eupraxia"




//const DIAL_API_BASE_URL = "http://192.168.10.210:9091";

const DIAL_API_BASE_URL = ipName

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

class Dial {



    // dial(out) {
    //     return Axios.post(ipName + '/' + 'api/Dial', out, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    // callinfo(info) {
    //     return Axios.post(ipName + '/' + 'call/callInfo', info, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });

    // }

    // queueCount(count) {
    //     return Axios.post(ipName + '/' + 'call/queue', count, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    dial(out) {
        return Axios.post(ipName + '/' + 'api/Dial', out);
    }

    callinfo(info) {
        return Axios.post(ipName + '/' + 'call/callInfo', info);

    }

    queueCount(count) {
        return Axios.post(ipName + '/' + 'call/queue', count);
    }
};
export default new Dial()
