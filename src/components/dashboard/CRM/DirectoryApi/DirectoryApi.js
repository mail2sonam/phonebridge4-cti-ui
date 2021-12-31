import Axios from 'axios-observable';

var host = window.document.location.host
var charHost = host.indexOf(":");
var ipHost = host.substring(0, charHost)
//var ipName = window.document.location.protocol+"//"+ ipHost +":9091";
var ipName =  "http://192.168.10.210:5001/eupraxia"



//const Directory_API_BASE_URL = "http://192.168.10.210:9091";

const Directory_API_BASE_URL = ipName

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

class DirectoryApi {

    AllCategory() {
        return Axios.get(ipName + '/' + 'directory/ShowAllMainCategories', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    subCat(main) {
        return Axios.post(ipName + '/' + 'directory/ShowAllSubCategories', main, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    AllDistrict(subcat) {
        return Axios.post(ipName + '/' + 'directory/ShowAllDistricts', subcat, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    town(dist) {
        return Axios.post(ipName + '/' + 'directory/ShowAllTowns', dist, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }


    contactDetails(town) {
        return Axios.post(ipName + '/' + 'directory/ShowAllFinalDetails', town, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }



};
export default new DirectoryApi()