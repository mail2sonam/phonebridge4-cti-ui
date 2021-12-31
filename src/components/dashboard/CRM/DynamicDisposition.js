import React, { useContext }from "react";
import { useState ,useEffect} from 'react' 
import {Col, Row, Card, Table} from 'antd';
import {Button, Form, Input, Select} from "antd";
import Auxiliary from "util/Auxiliary";
import DynamicDispoApi from "components/dashboard/CRM/DynamicDispoApi";


const DynamicDisposition = (props) => {

  
  const datax =[] ;
  let [dynamicdispoList, setDynamicDispoList] = useState();

  useEffect(()=>{
    var data = {
     
      phoneNumber : props.callinfodetail.phoneNo
    }
   // console.log("praveena"+props.callinfodetail.phoneNo);   
    

    DynamicDispoApi.dynamicDispo1(props.callinfodetail.phoneNo)
    .subscribe(res=>{
     // console.log(res.data)
      for(let i=0;i<= Object.keys(res.data.disposition).length-1;i++){
    datax.push({
      key: i,
      phoneNo: res.data.disposition[i].phoneNo,
      callId:res.data.disposition[i].callId,
      customerName:res.data.disposition[i].customerName,
      mainDispo:res.data.disposition[i].mainDispo,
      subDispo: res.data.disposition[i].subDispo,
      subSubDispo: res.data.disposition[i].subSubDispo,
      remarks: res.data.disposition[i].remarks,
      callback:res.data.disposition[i].callback,
      district:res.data.disposition[i].district,
      state:res.data.disposition[i].state,
      country:res.data.disposition[i].country

});

//console.log(res.data.disposition)
  }


  setDynamicDispoList(datax);

    } )
    
  },[props.callinfodetail.phoneNo]);
  
const Option = Select.Option;

   {/* //Dynamic Disposition*/}
          const columns = [
         {
                title: 'Customer Name',
                dataIndex: 'customerName',
                width: 150,
              },  
         {
                title: 'PhoneNumber',
                dataIndex: 'phoneNo',
                width: 150,
         },    
         {
             title: 'Main Disposition',
             dataIndex: 'mainDispo',
             width: 150,
         },
          {
            title: 'Sub Disposition',
            dataIndex: 'subDispo',
            width: 150,
          },
           {
             title: 'SubSub Disposition',
             dataIndex: 'subSubDispo',
             width: 150,
          },
          {
            title: 'CallBack',
            dataIndex: 'callback',
            width: 150,
          },
          {
            title: 'District',
            dataIndex: 'district',
            width: 100,
          },
           {
             title: 'State',
             dataIndex: 'state',
             width: 100,
           },
           {
            title: 'Country',
            dataIndex: 'country',
            width: 100,
          }
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

            
               <h2 className="gx-text-white" >Call Disposition Details </h2>
      <Table className="gx-table-responsive" columns={columns} dataSource={dynamicdispoList} pagination={{pageSize: 5}}
           />
  
    </Auxiliary>
  );
};

export default DynamicDisposition;

