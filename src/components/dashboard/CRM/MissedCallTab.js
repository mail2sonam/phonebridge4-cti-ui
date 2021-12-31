import React from "react";
import { useState ,useEffect} from 'react'
import {Col, Row, Card, Table} from 'antd';
import {Button, Form, Input, Select} from "antd";
import Auxiliary from "util/Auxiliary";
import CallDetailApi from "components/dashboard/CRM/CallDetailApi";
import Dial from "components/dashboard/CRM/Dial";

const MissedCallTab = (props) => {
 
  //outgoing function
  const outgoingvalues={
    channel:"SIP/4000",
    context:"from-internal",
    phoneNo:"",
    prefix:"9",
    extension: localStorage.getItem("extn"),
    priority:"1"
}

const [outgoing,setOutgoing]=useState(outgoingvalues);
const [submitted, setSubmitted] = useState(false)

   const handleChange = event => {
    const { name, value } = event.target
    setOutgoing({ ...outgoing, [name]: value })
  }


  const clicktodial = (a) => {
    var data = { 
    channel:"SIP/4000",
    context:"from-internal",
    phoneNo: a,
    prefix:"9",
    extension:"4000",
    priority:"1",
    dialMethod:"outgoing"
    }
    Dial.dial(data)
      .subscribe(response => {
        setOutgoing({
          channel:"SIP/4000",
          context:"from-internal",
          phoneNo: response.data.phoneNo,
          prefix:"9",
          extension:"4000",
          priority:"1",
          dialMethod:"outgoing"

        });
        setSubmitted(true)
      })
      .catch(e => {

      })
    }

    const newPo = () => {
      setOutgoing(outgoingvalues);
      setSubmitted(false);
    };


  //outgoing fundtion
  let [missedList, setMissedList] = useState();
  const datax =[] ;

  useEffect(()=>{
    var data = {
      extension: localStorage.getItem("extn")
    }
    CallDetailApi.MissedCall(data)
    .subscribe(res=>{
      for(let i=0;i<= Object.keys(res.data.data).length-1;i++){
    datax.push({
      key: i,
      name: ``,
      phone: res.data.data[i].phoneNumber,
      status: res.data.data[i].callStatus,
      action: <Button className="gx-btn-success  gx-mb-1" id="name" name="name"  onClick={()=>clicktodial(res.data.data[i].phoneNumber)} type="primary"  >Call </Button>,
    });
  }
  setMissedList(datax);
    } )
    
  },[]);

  const Option = Select.Option;

  {/* //table demo*/}
  const columns = [ {
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'PhoneNumber',
    dataIndex: 'phone',
  },{
    title: 'CallStatus',
    dataIndex: 'status',
  }, {
    title: 'Action',
    dataIndex: 'action',
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
           
           
           <Table className="gx-table-responsive" columns={columns} dataSource={missedList} pagination={{pageSize: 3}}
           />
    </Auxiliary>
  );
};

export default MissedCallTab;
