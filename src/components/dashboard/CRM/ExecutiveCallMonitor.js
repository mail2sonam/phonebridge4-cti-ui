import React from "react";
import { useState ,useEffect} from 'react'
import {Col, Row, Card, Table} from 'antd';
import {Button, Form, Input, Select} from "antd";
import Auxiliary from "util/Auxiliary";
import CallDetailApi from "components/dashboard/CRM/CallDetailApi";
import AgentPage from "../../../routes/SamplePage/Agent";
import {Link, useHistory} from "react-router-dom";
import MonitorApi from "./MonitorApi";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import ExecutiveHeader from "../../../containers/Topbar/InsideHeader/ExecutiveHeader";
//import ImgToBase64 from 'react-native-image-base64';

const Option = Select.Option;

const ExecutiveCallMonitor = () => {

    let [historyList, setHistoryList] = useState();
    const datax =[] ;
    let history = useHistory();
  
    useEffect(()=>{
      var data = {
        extension: localStorage.getItem("extn")
      }
      MonitorApi.callmonitor(data)
      .subscribe(res=>{
        for(let i=0;i<= Object.keys(res.data.model).length-1;i++){
      datax.push({
        key: i,
        agentName: res.data.model[i].agentName,
        extension: res.data.model[i].extension,
        startTime: res.data.model[i].startTime,
        loginStatus : res.data.model[i].loginStatus,
        status: res.data.model[i].status,
        direction: res.data.model[i].direction,
        duration: res.data.model[i].duration,
      });
    }
 
    setHistoryList(datax);
      } )
      
    },);

    //var imagedata= <img src='E:\Amtex Project\frontend\src\assets\images\harasimage.jpg'/>
  
    const Option = Select.Option;
  
            {/* //table demo*/}
            const columns = [
            //   {
            //   //render: () => <img src="E:\Amtex Project\frontend\src\assets\images\magalirimage.jpg" />,
            //   render: () => <img src='E:\Amtex Project\frontend\src\assets\images\harasimage.jpg'/>,
            //   width: 40,
            // },
            {
              
              title: 'Agent Name',
              dataIndex: 'agentName',
              width: 250,
            }, {
              title: 'Extension',
              dataIndex: 'extension',
              width: 100,
            }, {
              title: 'Login Time',
              dataIndex: 'startTime',
            },{
              title: 'Status',
              dataIndex: 'status',
                
              render(text, record) {
                return {
                  props: {
                    
                    style: {color: "white", background: text === "Ready" ? "green"  : text === "on-call" ? "blue" : text === "On-Call" ? "blue" : text === "Not Ready" 
                    
                          ? "red" : text === "Wrapping"  ? "orange" :  text === "Hold" ? "orange" : "white"
  
                      },
                  },
                  children: <div>{text}</div>
                };
              }
              
            },{
              title: 'Call Direction',
              dataIndex: 'direction',
            },{
              title: 'Duration',
              dataIndex: 'duration',
            }];
  
    const initdeptvalues={
      count:"5",
    }
    
    const [dept,setDept]=useState(initdeptvalues);
  
    useEffect(() => {  
        const count="5"; 
    }, []);
  

    function backtoagent(){
        history.push("/admin")
    }
  
  
  
    return (
    
      <Auxiliary>
          <ExecutiveHeader/>
  <h2 className="gx-text-white"> Call Monitor</h2>
            <Table className="gx-table-responsive" columns={columns} dataSource={historyList} pagination={{pageSize: 15}}
             />
             <Button  className="gx-btn-secondary  gx-mb-1" onClick={backtoagent}> Back </Button> 
  
      </Auxiliary>
    );
  };

export default ExecutiveCallMonitor;

