import Axios from 'axios-observable';

var host = window.document.location.host
var charHost = host.indexOf(":");
var ipHost = host.substring(0, charHost)
//var ipName = window.document.location.protocol+"//"+ ipHost +":9091";
var ipName  = "http://192.168.10.210:5001/eupraxia"



//const Mapping_API_BASE_URL = "http://192.168.10.210:9091";

const Mapping_API_BASE_URL = ipName

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

class CampaigMappingApi {

   getUserFromMap(out) {
      return Axios.post(ipName + '/' + 'campaign/getAllUsersInCampaign', out, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
   }

   saveMap(info) {
      return Axios.post(ipName + '/' + 'campaign/saveOrUpdateUserMapping', info, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });

   }

   inUsers(count) {
      return Axios.get(ipName + '/' + 'campaign/getAllUsersNotInCampaign/{' + count + "}", { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
   }

   removeMap(count) {
      return Axios.post(ipName + '/' + 'campaign/removemapping', count, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
   }

   queueMap(map) {
      return Axios.post(ipName + '/' + 'campaign/activateCampaign', map, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
   }

   queueMapRemove(mapremove) {
      return Axios.post(ipName + '/' + 'campaign/deActivateCampaign', mapremove, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
   }
};

export default new CampaigMappingApi()
