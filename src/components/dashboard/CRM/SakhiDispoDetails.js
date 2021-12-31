import React, { useContext }from "react";
import { useState ,useEffect} from 'react' 
import {Col, Row, Card, Table} from 'antd';
import {Button, Form, Input, Select} from "antd";
import Auxiliary from "util/Auxiliary";
import DispositionApi from "components/dashboard/CRM/DispositionApi";
import { UserContext } from "./UserContext";

const SakhiDispoDetails = (props) => {

  const msg1 = useContext(UserContext);

  const datax =[] ;
  let [sakhidispoList, setSakhiDispoList] = useState();

  useEffect(()=>{
    var data = {
      phoneNumber : props.dispodetail.phoneNo,
    }

    DispositionApi.SakhiDispo(data)
    .subscribe(res=>{
      for(let i=0;i<= Object.keys(res.data.history).length-1;i++){
    datax.push({
      key: i,

      caseId: res.data.history[i].caseId,
      name: res.data.history[i].name,
      age : res.data.history[i].age,
      phoneNo: res.data.history[i].phoneNo,
      incidentDate: res.data.history[i].incidentDate,
      abuseType: res.data.history[i].abuseType,
      aggrieved: res.data.history[i].aggrieved,
     
    });
  }

  setSakhiDispoList(datax);

    } )
    
  },[props.dispodetail.phoneNo]);
  

  const Option = Select.Option;

   {/* //table demo*/}
          const columns = [
          //   {
          //   title: 'Case ID',
          //   dataIndex: 'caseId',
          //   width: 150,
          // },
          {
            title: 'Name',
            dataIndex: 'name',
            width: 150,
          },
          // {
          //   title: 'Aggrieve Name',
          //   dataIndex: 'aggrieved',
          //   width: 150,
          // },
          {
            title: 'Age',
            dataIndex: 'age',
            width: 150,
          },{
            title: 'Phonenumber',
            dataIndex: 'phoneNo',
            width: 150,
          },
          {
            title: 'Incident Date',
            dataIndex: 'incidentDate',
            width: 150,
          },
          // {
          //   title: 'Abuse Type',
          //   dataIndex: 'abuseType',
          //   width: 150,
          // }
        ];

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

export default SakhiDispoDetails;

