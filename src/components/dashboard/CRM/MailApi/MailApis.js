import Axios from 'axios-observable';

var host = window.document.location.host
var charHost = host.indexOf(":");
var ipHost = host.substring(0, charHost)
//var ipName = window.document.location.protocol+"//"+ ipHost +":9091";
var ipName = "http://192.168.10.210:5001/eupraxia"




//const Mail_API_BASE_URL = "http://192.168.10.210:9091";
const Mail_API_BASE_URL = ipName

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

class MailApis {


    // mailcountApi

    mailCount() {
        return Axios.get(ipName + '/mail/getCountOfUnseenMails', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    mailCountByExtn(extnCount) {
        return Axios.post(ipName + '/mail/getCountOfUserMailsAndSms', extnCount, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    mailSubject() {
        return Axios.get(ipName + '/mail/getUnseenMails', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    mailSent(msg) {
        return Axios.post(ipName + '/' + 'mail/sendMail', msg, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    mailCheckout() {
        return Axios.get(ipName + '/' + 'mail/checkOutInbox', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    mailAssign(assign) {
        return Axios.post(ipName + '/' + 'mail/assigntMailtoUser', assign, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    mailTab(tab) {
        return Axios.post(ipName + '/' + 'mail/showMailsByUser', tab, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    mailByCaseId(users) {
        return Axios.post(ipName + '/' + 'mail/showMailsByCaseId', users, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }


    // mailCheckout(){
    //     return Axios.get('http://192.168.10.210:5001/'+'mail/checkOutInbox' );
    // }


};
export default new MailApis()
