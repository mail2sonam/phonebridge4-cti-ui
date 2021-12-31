import React from "react";
import { useState ,useEffect} from 'react'
import {Col, Row, Card, Table} from 'antd';
import {Button, Form, Input, Select} from "antd";
import Auxiliary from "util/Auxiliary";
import CallDetailApi from "components/dashboard/CRM/CallDetailApi";

const DailyDistrictCount = (props) => {

  let [historyList, setHistoryList] = useState();
  const datax =[] ;

  useEffect(()=>{
    var data = {
      extension: localStorage.getItem("extn")
    }
    CallDetailApi.Callhis(data)
    .subscribe(res=>{
      for(let i=0;i<= Object.keys(res.data.history).length-1;i++){
    datax.push({
      key: i,
      callDirection: res.data.history[i].callDirection,
      extension: res.data.history[i].extension,
      phoneNo : res.data.history[i].phoneNo,
      disposition: res.data.history[i].disposition,
      callStatus: res.data.history[i].callStatus,
    });
  }
  setHistoryList(datax);
    } )
    
  },[localStorage.getItem("extn")]);


  const Option = Select.Option;

          {/* //table demo*/}
          const columns = [{
            title: 'S.No',
            dataIndex: 'callDirection',
          },{
            title: 'District',
            dataIndex: 'disposition',
          },{
            title: 'Date',
            dataIndex: 'callStatus',
          },{
            title: 'Total',
            dataIndex: 'callStatus',
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

          <Table className="gx-table-responsive" columns={columns} dataSource={""} pagination={{pageSize: 3}}
           />

    </Auxiliary>
  );
};

export default DailyDistrictCount;
