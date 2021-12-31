import React from "react";
import { useState ,useEffect} from 'react'
import {Col, Row, Card, Table} from 'antd';
import {Button, Form, Input, Select} from "antd";
import Auxiliary from "util/Auxiliary";
import CallDetailApi from "components/dashboard/CRM/CallDetailApi";
import UserApi from "./UserApi";
import CampaignApi from "./CampaignApi";

const BranchList = (props) => {

  let [historyList, setHistoryList] = useState();
  const datax =[] ;

  useEffect(()=>{
    var data = {
      extension: "sip",
    }
    CampaignApi.campaignList(data)
    .subscribe(res=>{
      for(let i=0;i<= Object.keys(res.data.model).length-1;i++){
    datax.push({
      key: i,
      campaignName: res.data.model[i].campaignName,
      callDirection: res.data.model[i].callDirection,
      queueName : res.data.model[i].queueName,
      trunk: res.data.model[i].trunk,
      departmentcode: res.data.model[i].departmentcode,
    });
  }
  setHistoryList(datax);
    } )
    
  },[]);


  const Option = Select.Option;

          {/* //table demo*/}
          const columns = [{
            title: 'Branch Name',
            dataIndex: 'campaignName',
          }, {
            title: 'Branch Code',
            dataIndex: 'callDirection',
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
      <h2 className="gx-text-white" >Branch List</h2> 

          <Table className="gx-table-responsive" columns={columns} dataSource={historyList} pagination={{pageSize: 10}}
           />

    </Auxiliary>
  );
};

export default BranchList;
