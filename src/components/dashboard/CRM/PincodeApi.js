import Axios from 'axios-observable';

var host = window.document.location.host
var charHost = host.indexOf(":");
var ipHost = host.substring(0, charHost)
//var ipName = window.document.location.protocol+"//"+ ipHost +":9091";
var ipName = "http://192.168.10.210:5001/eupraxia"




//const PINCODE_API_BASE_URL = "http://192.168.10.210:9091";

const PINCODE_API_BASE_URL = ipName

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

class PincodeApi {

    showAddrDist() {
        return Axios.get(ipName + '/' + 'digital/ShowDistrictFromPinCode', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    showAddrTaluk(dist) {
        return Axios.post(ipName + '/' + 'digital/ShowTaluksFromPinCode', dist, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    showAddrTown(dist) {
        return Axios.post(ipName + '/' + 'digital/ShowTownsFromPinCode', dist, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    showpincode(dist) {
        return Axios.post(ipName + '/' + 'digital/ShowPinsFromPinCode', dist, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

};
export default new PincodeApi()