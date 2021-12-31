import Axios from 'axios-observable';

var host = window.document.location.host
var charHost = host.indexOf(":");
var ipHost = host.substring(0, charHost)
//var ipName = window.document.location.protocol+"//"+ ipHost +":9091";
var ipName = "http://192.168.10.210:5001/eupraxia"

//const CALLHISTORY_API_BASE_URL = "http://192.168.10.210:9091";

const CALLHISTORY_API_BASE_URL = ipName

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


class CallDetailApi {

    Callhis(callhis) {
        return Axios.post(ipName + '/' + 'report/callHistoryByExtension', callhis, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    // MissedCall(miss) {
    //     return Axios.post(ipName + '/' + 'call/getMissedCallList', miss, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    // ScheduledCall(schedule) {
    //     return Axios.post(ipName + '/' + 'call/getScheduleCallList', schedule, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    // EditName(name) {
     //   return Axios.post(ipName + '/' + 'call/saveName', name, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    MissedCall(miss) {
        return Axios.post(ipName + '/' + 'call/getMissedCallList', miss);
    }

    ScheduledCall(schedule) {
        return Axios.post(ipName + '/' + 'call/getScheduleCallList', schedule);
    }

    EditName(name) {
        return Axios.post(ipName + '/' + 'call/saveName', name);
    }

};
export default new CallDetailApi()