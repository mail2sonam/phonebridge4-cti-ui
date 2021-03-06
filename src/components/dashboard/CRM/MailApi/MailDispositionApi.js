import Axios from 'axios-observable';

var host = window.document.location.host
var charHost = host.indexOf(":");
var ipHost = host.substring(0, charHost)
//var ipName = window.document.location.protocol+"//"+ ipHost +":9091";
var ipName = "http://192.168.10.210:5001/eupraxia"



//const DISPOSITION_API_BASE_URL = "http://192.168.10.210:9091";
const DISPOSITION_API_BASE_URL = ipName

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

class MailDispositionApi {

    //new apis

    // saveAllEmailDispo(saveallemaildispo){
    //     return Axios.post(ipName+'/'+'caseDispo/saveDisposition', saveallemaildispo );
    // }

    saveEmailGuidence(saveEmailguidence) {
        return Axios.post(ipName + '/' + 'mail/addGuidenceScreen', saveEmailguidence, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    saveEmailInformation(saveEmailinformation) {
        return Axios.post(ipName + '/' + 'mail/addInformationScreen', saveEmailinformation, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    saveEmailCallDetails(saveEmailcalldetails) {
        return Axios.post(ipName + '/' + 'mail/addCallDetails', saveEmailcalldetails, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    saveEmailEmergency(saveEmailemergency) {
        return Axios.post(ipName + '/' + 'mail/addEmergencyScreen', saveEmailemergency, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

};
export default new MailDispositionApi()
