
import axios from 'axios';

var host = window.document.location.host
var charHost = host.indexOf(":");
var ipHost = host.substring(0, charHost)
//var ipName = window.document.location.protocol+"//"+ ipHost +":9091";
var ipName = "http://192.168.10.210:5001/eupraxia"


const AGENTMODE_API_BASED_URL = ipName

//const AGENTMODE_API_BASED_URL = "http://192.168.10.210:9091";

class AgentModeApi {

    AgentMode(mode) {
        return axios.post(ipName + '/' + 'user/changeMode', mode, { headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) } });
    }

};

export default new AgentModeApi();

