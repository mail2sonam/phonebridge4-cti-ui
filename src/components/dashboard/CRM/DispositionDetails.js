import React, { useContext }from "react";
import { useState ,useEffect} from 'react' 
import {Col, Row, Card, Table} from 'antd';
import {Button, Form, Input, Select} from "antd";
import Auxiliary from "util/Auxiliary";
import DispositionApi from "components/dashboard/CRM/DispositionApi";
import { UserContext } from "./UserContext";

const DispositionDetails = (props) => {

  const msg1 = useContext(UserContext);

  const datax =[] ;
  let [sakhidispoList, setSakhiDispoList] = useState();

  useEffect(()=>{
    var data = {
      phoneNumber : props.dispodetail.phoneNo,
    }

    DispositionApi.saveNormalDispo(data)
    .subscribe(res=>{
      for(let i=0;i<= Object.keys(res.data.history).length-1;i++){
    datax.push({
      key: i,
      cusName: res.data.history[i].cusName,
      phoneNo: res.data.history[i].phoneNo,
      extension : res.data.history[i].extension,
      callDirection: res.data.history[i].callDirection,
      secondNumber: res.data.history[i].secondNumber,
      callStartTime: res.data.history[i].callStartTime,
      callEndTime: res.data.history[i].callEndTime,
      comments: res.data.history[i].comments,
      callbackDate: res.data.history[i].callbackDate,
      callDroped: res.data.history[i].callDroped,
      disposition: res.data.history[i].disposition,
      
    });
  }

  setSakhiDispoList(datax);

    } )
    
  },[props.dispodetail.phoneNo]);
  

  const Option = Select.Option;

   {/* //table demo*/}
          const columns = [{
            title: 'Customer Name',
            dataIndex: 'cusName',
            width: 150,
          },{
            title: 'Phone Number',
            dataIndex: 'phoneNo',
            width: 150,
          },{
            title: 'Extension',
            dataIndex: 'extension',
            width: 150,
          }, {
            title: 'Call Direction',
            dataIndex: 'callDirection',
            width: 150,
          },{
            title: 'Second Number',
            dataIndex: 'secondNumber',
            width: 150,
          },
          {
            title: 'Disposition',
            dataIndex: 'disposition',
            width: 150,
          },{
            title: 'Remarks',
            dataIndex: 'comments',
            width: 150,
          },{
            title: 'Call Start Time',
            dataIndex: 'callStartTime',
            width: 150,
          },{
            title: 'Call End Time',
            dataIndex: 'callEndTime',
            width: 150,
          },{
            title: 'Call Droped',
            dataIndex: 'callDroped',
            width: 150,
          },
          {
            title: 'Call Back Date',
            dataIndex: 'callbackDate',
            width: 150,
          }];

        {/* //table demo*/}

  const initdeptvalues={
    count:"5",
  }
  
  const [dept,setDept]=useState(initdeptvalues);

  useEffect(() => {  
      const count="5"; 
  }, []);




  return (
  
    <Auxiliary>

            
               <h2 className="gx-text-white" >Disposition Details</h2>
      <Table className="gx-table-responsive" columns={columns} dataSource={sakhidispoList} pagination={{pageSize: 5}}
           />
  
    </Auxiliary>
  );
};

export default DispositionDetails;

