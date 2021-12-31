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

const Option = Select.Option;

const MonthlyReport = () => {

    let [historyList, setHistoryList] = useState();
    const datax =[] ;
    let history = useHistory();
  
    useEffect(()=>{
      var data = {
        extension: localStorage.getItem("extn")
      }
      MonitorApi.callmonitor(data)
      .subscribe(res=>{
        for(let i=0;i<= Object.keys(res.data.result).length-1;i++){
      datax.push({
        key: i,
        extension: res.data.result[i].extension,
        phoneNo: res.data.result[i].phoneNo,
        callStatus : res.data.result[i].callStatus,
        callDirection: res.data.result[i].callDirection,
        callStartTime: res.data.result[i].callStartTime,
        popupStatus: res.data.result[i].popupStatus,
      });
    }
    setHistoryList(datax);
      } )
      
    },[localStorage.getItem("extn")]);
  
  
    const Option = Select.Option;
  
            {/* //table demo*/}
            const columns = [{
              title: 'Date',
              dataIndex: 'date',
              width: 50,
            }, {
              title: 'TotalNoOfCalls',
              dataIndex: 'totcalls',
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
    <AdminHeader/>

  <h2 className="gx-text-white">MonthlyReport(TotCalls)</h2>
            <Table className="gx-table-responsive" columns={columns} dataSource={historyList} pagination={{pageSize: 3}}
             />
             <Button  className="gx-btn-secondary  gx-mb-1" onClick={backtoagent}> Back </Button> 
  
      </Auxiliary>
    );
  };

export default MonthlyReport;

