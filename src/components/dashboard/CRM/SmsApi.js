import Axios from 'axios-observable';

var host = window.document.location.host
var charHost = host.indexOf(":");
var ipHost = host.substring(0, charHost)
//var ipName = window.document.location.protocol+"//"+ ipHost +":9091";
var ipName = "http://192.168.10.210:5001/eupraxia"


//const Mail_API_BASE_URL = "http://192.168.10.210:9091";
const SMS_API_BASE_URL = ipName

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

class SMSApi {

    smsbyIsNew(msg) {
        return Axios.post(ipName + '/' + 'sms/findByStatus', msg, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    smsCountByExtn(extnCount) {
        return Axios.post(ipName + '/mail/getCountOfUserMailsAndSms', extnCount, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    smsAssign(assign) {
        return Axios.post(ipName + '/' + 'sms/assigntSMStoUser', assign, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    smsCheckout() {
        return Axios.get(ipName + '/' + 'sms/receiveSMS', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    smsByExtn(extn) {
        return Axios.post(ipName + '/' + 'sms/showMessagesByUser', extn, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    smsCount() {
        return Axios.get(ipName + '/' + 'sms/getCountOfUnseenSMS', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    smsShowAll() {
        return Axios.get(ipName + '/' + 'sms/showAll', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

};
export default new SMSApi()