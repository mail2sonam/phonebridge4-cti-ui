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

class DialerDispoApi {

    dispodialer(first) {
        return Axios.post(ipName + '/' + 'yml/findByCampaign', first, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    dispodialerMain(main) {
        return Axios.post(ipName + '/' + 'yml/findByMainDispo', main, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    subdispodialer(sub) {
        return Axios.post(ipName + '/' + 'yml/findByDispo', sub, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    dispoSubSubdialer(subSub) {
        return Axios.post(ipName + '/' + 'yml/findBySubDispo', subSub, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    saveDispo(dispo) {
        return Axios.post(ipName + '/' + 'report/saveDisposition', dispo, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }


};
export default new DialerDispoApi()
