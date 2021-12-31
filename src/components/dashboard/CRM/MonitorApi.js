import Axios from 'axios-observable';

var host = window.document.location.host
var charHost = host.indexOf(":");
var ipHost = host.substring(0, charHost)
//var ipName = window.document.location.protocol+"//"+ ipHost +":9091";
//var ipName = "http://192.168.10.210:5001/eupraxia"

var ipName = "http://192.168.10.210:5001/eupraxia"
console.log("Orange")
const MONITOR_API_BASE_URL = ipName

//const MONITOR7000_API_BASE_URL = "http://192.168.10.210:9091";

// Axios.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     function (error) {
//         const originalRequest = error.config;
//         let refreshToken = localStorage.getItem("refreshtoken");
//         if (
//             refreshToken &&
//             error.response.status === 401 &&
//             !originalRequest._retry
//         ) {
//             originalRequest._retry = true;
//             return Axios
//                 .post(ipName + '/auth/renew', { refreshToken: refreshToken, email: localStorage.getItem("email") })
//                 .then((res) => {
//                     if (res.status === 200) {
//                         localStorage.setItem("token", res.data.accessToken);
//                         return Axios(originalRequest);
//                     }
//                 });
//         }
//         return Promise.reject(error);
//     }
// );

class MonitorApi {

    // callmonitor() {
    //     return Axios.get(ipName + '/' + 'user/monitor', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    // triggercallmonitor2() {
    //     return Axios.get(ipName + '/' + 'user/triggerDashboard', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    // callmonitor2() {
    //     return Axios.get(ipName + '/' + 'user/monitor2', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    // liveDashboard() {
    //     return Axios.get(ipName + '/' + 'report/todayCallsCdrReports', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    // mailandSmsCount() {
    //     return Axios.get(ipName + '/' + 'mail/getTotalCountOfMailsAndSms', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    // dialerMonitor(camp) {
    //     return Axios.post(ipName + '/' + 'file/diallerMonitor', camp, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    callmonitor() {
        return Axios.get(ipName + '/' + 'user/monitor');
    }

    triggercallmonitor2() {
        return Axios.get(ipName + '/' + 'user/triggerDashboard');
    }

    callmonitor2() {
        return Axios.get(ipName + '/' + 'user/monitor2');
    }

    liveDashboard() {
        return Axios.get(ipName + '/' + 'report/todayCallsCdrReports');
    }

    mailandSmsCount() {
        return Axios.get(ipName + '/' + 'mail/getTotalCountOfMailsAndSms');
    }

    cdrReport() {
        return Axios.get(ipName + '/' + 'report/AllCdrReports', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    dashboardlist(list) {
        return Axios.post(ipName + '/' + 'report/todayCallsCdrReportsDetails', list, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    dialerMonitor(camp) {
        return Axios.post(ipName + '/' + 'file/diallerMonitor', camp);
    }

};
export default new MonitorApi()