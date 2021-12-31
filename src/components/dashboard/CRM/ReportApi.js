import Axios from 'axios-observable';

var host = window.document.location.host
var charHost = host.indexOf(":");
var ipHost = host.substring(0, charHost)
//var ipName = window.document.location.protocol+"//"+ ipHost +":9091";
var ipName = "http://192.168.10.210:5001/eupraxia"



//const REPORT_API_BASE_URL = "http://192.168.10.210:9091";

const REPORT_API_BASE_URL = ipName

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

class ReportApi {

    categoryWise(catdate) {
        return Axios.post(ipName + '/report/CategoryWiseCalls', catdate, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    ivrFullReport(ivr) {
        return Axios.post(ipName + '/report/ivrReport', ivr, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    // dailyWiseReport(daily) {
    //     return Axios.post(ipName + '/report/ShowReportsByDate', daily, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    dailyWiseReport(daily) {
        return Axios.post(ipName + '/report/ShowReportsByDate', daily, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }
  //  warRoomReport(startDate, endDate) {
       
    //    return Axios.get(ipName + '/report/getWarRoomReport?startDate='+startDate+'&endDate='+endDate, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
   // }

  //clientReport(startDate, endDate) {
       
      //return Axios.get(ipName + '/report/getYamlDispoReport?startDate='+dateofstart+'&endDate='+dateofend, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
   // }

};
export default new ReportApi()
