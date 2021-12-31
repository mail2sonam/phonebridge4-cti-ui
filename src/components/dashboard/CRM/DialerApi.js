import Axios from 'axios-observable';

var host = window.document.location.host
var charHost = host.indexOf(":");
var ipHost = host.substring(0, charHost)
//var ipName = window.document.location.protocol+"//"+ ipHost +":9091";
var ipName = "http://192.168.10.210:5001/eupraxia"



//const DIALER_API_BASE_URL = "http://192.168.10.210:9091";

const DIALER_API_BASE_URL = ipName

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

class DialerApi {

    campaignSelect(select) {
        return Axios.post(ipName + '/' + 'campaign/showMappedDiallerCampaigns', select, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    // startDialer(start) {
    //     return Axios.post(ipName + '/' + 'file/startDialler', start, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    startDialer(start) {
        return Axios.post(ipName + '/' + 'file/startDialler', start);
    }

    // removefrmQueue(remove) {
    //     return Axios.post(ipName + '/' + 'api/removeQueue', remove, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    removefrmQueue(remove) {
        return Axios.post(ipName + '/' + 'api/removeQueue', remove);
    }
    stopDialer(stop) {
        return Axios.post(ipName + '/' + 'file/stopDialler', stop);
    }
};
export default new DialerApi()
