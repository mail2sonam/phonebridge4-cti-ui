import React from "react";
import { useState ,useEffect} from 'react'
import {Col, Row, Card, Table, DatePicker} from 'antd';
import {Button, Form, Input, Select} from "antd";
import Auxiliary from "util/Auxiliary";
import CallDetailApi from "components/dashboard/CRM/CallDetailApi";
import AgentPage from "../../../routes/SamplePage/Agent";
import {Link, useHistory} from "react-router-dom";
import MonitorApi from "./MonitorApi";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import UserApi from "./UserApi";
import {AgGridReact} from 'ag-grid-react';
import { ExportToCsv } from 'export-to-csv';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import DispositionApi from "./DispositionApi";

const Option = Select.Option;

const SeniorCitizenReport = (props) => {

  //datepicker 
  const dateFormat = 'YYYY-MM-DD HH:mm';
  const [startofDate, setStartOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  //var dateofstart = startofDate.toISOString().substr(0,19);
 
  
  const [endofDate, setEndOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  //var dateofend = endofDate.toISOString().substr(0,19);

  //datepicker

    let [historyList, setHistoryList] = useState();
    const datax =[] ;
    const rowData4 =[] ;
    let history = useHistory();

    function ReportSearch() {
      var data = {
        startDate: startofDate.toString(),
        endDate: endofDate.toString(),
        //callStatus: props.Informationprops
      }
      
      DispositionApi.seniorCitizen(data)
      .subscribe(res=>{
        for(let i=0;i<= Object.keys(res.data.reports).length-1;i++){

      datax.push({
        key: i,
        caseId: res.data.reports[i].caseId,
        callerName: res.data.reports[i].callerName,
        age: res.data.reports[i].age,
        callDate: res.data.reports[i].callDate,   
        district: res.data.reports[i].district,
        phoneNo: res.data.reports[i].phoneNo,
        caseType: res.data.reports[i].caseType,
        actionTaken: res.data.reports[i].actionTaken,
      });
   
        }

    setHistoryList(datax);
      } )
      
    }

  
    const Option = Select.Option;
  
    const columns = [{
      title: 'Case Id',
      dataIndex: 'caseId',
      key: 'caseid',
      width: 100,
      fixed: 'left',
    },{
      title: 'Caller Name',
      dataIndex: 'callerName',
      key: 'name',
      width: 100,
      
    },{
      title: 'Age',
      dataIndex: 'age',
      key: 'name',
      width: 100,
     
    },{
      title: 'Call Date',
      dataIndex: 'callDate',
      key: 'name',
      width: 100,
    },{
      title: 'District',
      dataIndex: 'district',
      key: 'name',
      width: 100,
     
    },{
      title: 'Phone Number',
      dataIndex: 'phoneNo',
      key: 'name',
      width: 100,
     
    },{
      title: 'Case Type',
      dataIndex: 'caseType',
      key: 'name',
      width: 100,
     
    },{
      title: 'Action Taken',
      dataIndex: 'actionTaken',
      key: 'name',
      width: 100,
    
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


    
    const options = { 
      // fieldSeparator: ',',
      // quoteStrings: '"',
      // decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Information Report',

      // useTextFile: true,
      // useBom: true,
      // useKeysAsHeaders: true,
      headers: ['Sl.No','Case Id','Caller Name','Age', 'Call Date','District','Phone Number','Case Type','Action Taken' ] //<-- Won't work with useKeysAsHeaders present!
    };


    //Excel Export
    const exportExcel = () => {
      const csvExporter = new ExportToCsv(options);
      csvExporter.generateCsv(historyList);
    }
   //Excel Export



  
    return (
    
      <Auxiliary>
        

  <Row>
  <h2 className="gx-text-white">Start Date: </h2>
  <Col xl={6} lg={12} md={12} sm={12} xs={24}>
  <DatePicker className="gx-mb-3 gx-w-100" selected={startofDate} showTime format={dateFormat} 
              onChange={date => setStartOfDate(date)}                
              />   
</Col>

<h2 className="gx-text-white">End Date: </h2>
<Col xl={6} lg={12} md={12} sm={12} xs={24}>
<DatePicker className="gx-mb-3 gx-w-100" selected={endofDate} showTime format={dateFormat}           
               onChange={date => setEndOfDate(date)}                      
              />                
</Col>

<Button onClick={ReportSearch}> Search </Button>
<Button onClick={exportExcel}> Export </Button>

</Row> 

        <Table
                columns={columns}
                dataSource={historyList}
                bordered
                size="large"
                scroll={{x: '230%', y: 340}}
            />



      </Auxiliary>
    );
  };

export default SeniorCitizenReport;

