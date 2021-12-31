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

class SmsDispositionApi {

    //new apis

    // saveAllEmailDispo(saveallemaildispo){
    //     return Axios.post(ipName+'/'+'caseDispo/saveDisposition', saveallemaildispo );
    // }


    getSmsByCaseId(caseid) {
        return Axios.post(ipName + '/' + 'sms/showSmsByCaseId', caseid, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    saveSmsGuidence(saveEmailguidence) {
        return Axios.post(ipName + '/' + 'sms/addGuidenceScreen', saveEmailguidence, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    saveSmsInformation(saveEmailinformation) {
        return Axios.post(ipName + '/' + 'sms/addInformationScreen', saveEmailinformation, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    saveSmsCallDetails(saveEmailcalldetails) {
        return Axios.post(ipName + '/' + 'sms/addCallDetails', saveEmailcalldetails, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    saveSmsEmergency(saveEmailemergency) {
        return Axios.post(ipName + '/' + 'sms/addEmergencyScreen', saveEmailemergency, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    sendDispoSms(dispoSms) {
        return Axios.post(ipName + '/' + 'sms/sendReplySms', dispoSms, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

};
export default new SmsDispositionApi()
