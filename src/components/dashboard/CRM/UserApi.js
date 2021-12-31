import Axios from 'axios-observable';
import axios from 'axios';

//const USER_API_BASE_URL = "http://192.168.10.210:9091"; 

var host = window.document.location.host
var charHost = host.indexOf(":");
var ipHost = host.substring(0, charHost)
//var ipName = window.document.location.protocol+"//"+ ipHost +":9091";
var ipName = "http://192.168.10.210:5001/eupraxia"



const USER_API_BASE_URL = ipName;

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

class UserApi {

    login(log) {
        return Axios.post(ipName + '/' + 'auth/login', log);
    }

    logout(out) {
        return Axios.post(ipName + '/' + 'user/logout', out, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    addUser(add) {
        return Axios.post(ipName + '/' + 'user/Save', add, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

    userList() {
        return Axios.get(ipName + '/' + 'user/showAll', { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }



    // axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 
};
export default new UserApi()