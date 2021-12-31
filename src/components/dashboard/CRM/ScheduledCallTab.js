import React from "react";
import { useState ,useEffect} from 'react'
import Icon from '@ant-design/icons';
import axios from 'axios'; 
import {Col, Row, Card, Table, Tooltip} from 'antd';
import {Button, Form, Input, Select} from "antd";
import Auxiliary from "util/Auxiliary";
import Widget from "components/Widget/index";
import CallDetailApi from "components/dashboard/CRM/CallDetailApi";

const ScheduledCallTab = (props) => {

  let [scheduleList, setScheduledList] = useState();

  const datax =[] ;

  useEffect(()=>{
    var data = {
      extension: localStorage.getItem("extn")
    }
    CallDetailApi.ScheduledCall(data)
    .subscribe(res=>{

      //Object.keys(res.data).length>0
   
      for(let i=0;i<= Object.keys(res.data).length-1;i++){
      
    datax.push({
      key: i,
      name: ``,
      phone: res.data.data[i].phoneNumber,
      status: res.data.data[i].callStatus,
      callBackTime: res.data.data[i].callBackTime,
      extension : res.data.data[i].extension,
     
    });
    
  }
  setScheduledList(datax);
 
    } )
    
  },[]);

    const Option = Select.Option;

          {/* //table demo*/}
          const columns = [{
            title: 'PhoneNumber',
            dataIndex: 'phone',
            
          }, {
            title: 'CallStatus',
            dataIndex: 'status',
          }, {
            title: 'CallBackTime',
            dataIndex: 'callBackTime',
          }, {
            title: 'Extension',
            dataIndex: 'extension',
          }];

  const initdeptvalues={
    count:"5",
  }
  
  const [dept,setDept]=useState(initdeptvalues);

  useEffect(() => {  
      const count="5"; 
  }, []);




  return (
  
    <Auxiliary>

             
      <Table columns={columns} dataSource={scheduleList} pagination={{pageSize: 3}}
           />
           
  

    </Auxiliary>
  );
};

export default ScheduledCallTab;
