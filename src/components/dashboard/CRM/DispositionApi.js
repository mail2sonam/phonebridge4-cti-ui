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

class DispositionApi {


    
    //save normal dispo
    saveNormalDispo(normal) {
        return Axios.post(ipName + '/' + 'report/callHistoryByPhoneNo', normal);
    }
    //save normal dispo

    // Dispo() {
    //     return Axios.get(ipName + '/api/showAllDisposition', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    Dispo() {
        return Axios.get(ipName + '/api/showAllDisposition');
    }

    saveDispo(dispo) {
        return Axios.post(ipName + '/' + 'report/saveDisposition', dispo, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }
    // saveSakhiDispo(sakhidispo) {
    //     return Axios.post(ipName + '/' + 'api/addGrievancesTicket', sakhidispo, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    // }

    saveSakhiDispo(sakhidispo) {
        return Axios.post(ipName + '/' + 'api/addGrievancesTicket', sakhidispo);
    }


    SakhiDispo(phNo) {
        return Axios.post(ipName + '/report/callHistoryByPhoneNo', phNo, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }
    // Dispo report api
    showAllDispo(dispo) {
        return Axios.post(ipName + '/' + 'report/ShowReportsByDate', dispo, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }
    //Dispo report api


    // SeniorCitizenReport api
    seniorCitizen(city) {
        return Axios.post(ipName + '/' + 'report/SeniorCitizenReports', city, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }
    // SeniorCitizenReport api

    // District wise api
    showDistrictWise(dateval) {
        return Axios.post(ipName + '/' + 'report/districtWiseCalls', dateval, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    //District wise api

    //new apis

    saveAllDispo(savealldispo) {
        return Axios.post(ipName + '/' + 'caseDispo/saveDisposition', savealldispo, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    saveFeedback(feed) {
        return Axios.post(ipName + '/' + 'caseDispo/changeFeedbackFlag', feed, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    saveGuidence(saveguidence) {
        return Axios.post(ipName + '/' + 'caseDispo/addGuidenceScreen', saveguidence, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    saveInformation(saveinformation) {
        return Axios.post(ipName + '/' + 'caseDispo/addInformationScreen', saveinformation, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    saveCallDetails(savecalldetails) {
        return Axios.post(ipName + '/' + 'caseDispo/addCallDetails', savecalldetails, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    saveEmergency(saveemergency) {
        return Axios.post(ipName + '/' + 'caseDispo/addEmergencyScreen', saveemergency, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    // Ring Report
    ringReport(ring) {
        return Axios.post(ipName + '/' + 'report/todayRingStatusReportsDetails', ring, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    // Sla Report
    slaReport(sldate) {
        return Axios.post(ipName + '/' + 'report/serviceLevel', sldate, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    callAbdRate(sldate) {
        return Axios.post(ipName + '/' + 'report/abnLevel', sldate, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    interRecPerc(sldate) {
        return Axios.post(ipName + '/' + 'report/monthlyAbandonReportsDetails', sldate, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    callerSatisIndex(sldate) {
        return Axios.post(ipName + '/' + 'report/feedbackLevel', sldate, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }


    //Email and sms
    mailReport() {
        return Axios.get(ipName + '/' + 'report/getAllMails', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }
    smsReport() {
        return Axios.get(ipName + '/' + 'report/getAllSms', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }


    saveDispoContact(contact) {
        return Axios.post(ipName + '/' + 'ce/saveDispoContact', contact, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    saveWarRoom(war) {
        return Axios.post(ipName + '/' + 'report/saveWarRoom', war, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }
};


export default new DispositionApi()
