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

import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import DispositionApi from "./DispositionApi";

//import VerticalTable from 'react-table-vertical-heading';

const Option = Select.Option;

const DistrictWiseReport = (props) => {

  //datepicker 
  const dateFormat = 'YYYY-MM-DD';
  const [startofDate, setStartOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
   // var dateofstart = startofDate.toISOString().substr(0,19);

  
  const [endofDate, setEndOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  //var dateofend = endofDate.toISOString().substr(0,19);

  //datepicker

  const datapivot = [['attribute', 'attribute2'], ['value1', 'value2']];

  function onChangeDatepickerVal(value){

  }

    let [historyList, setHistoryList] = useState();
    const datax =[] ;
    const rowData4 =[] ;
    let history = useHistory();

    function ReportSearch(){
      var data = {
        startDate: startofDate.toString(),
        endDate: endofDate.toString(),
        //callStatus: props.Emergencyprops
      }

      DispositionApi.showDistrictWise(data)
      .subscribe(res=>{
       for(let i=0;i<= Object.keys(res.data.reports).length-1;i++){

      datax.push({
        key: i,
        districtName: res.data.reports[i].districtName,
        reportDate: res.data.reports[i].reportDate,
        count: res.data.reports[i].count,
      });
        }

     setHistoryList(datax);

      } )
      
    }

    const Option = Select.Option;
  
    const columns = [{
      title: 'District Name',
      dataIndex: 'districtName',
      key: 'caseid',
      width: 100,
      fixed: 'left',
    },

    {
      title: 'Date',
      dataIndex: 'reportDate',
      key: 'name',
      width: 100,
    },


    {
      title: 'Total Count',
      dataIndex: 'count',
      key: 'name',
      width: 100,
      fixed: 'right',
    }
   ];



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
      title: 'Emergency Report',

      // useTextFile: true,
      // useBom: true,
      // useKeysAsHeaders: true,
      headers: ['Sl.No','Case Id', 'Extension','Agent Name', 'Phone Number','Call Start Date','Call Start Time','Call End Date','Call End Time','Duration','Second Number','Information Sought', 'Risk Asses', 'Aggrieved' ,'Aggrieve Name','Aggrieve Mobile','Aggrieve Gender' 
       ,'Aggrieve Age','Aggrieve Address','Age','Age Group','Education','Occupation','Gender','Personal Identification','Marital Status',
      'Living Status','Family Status','Houseno','Street','Block','Village','State','District','Pincode','Place of Incident',
    'Frequency','Status of Incident','Case Category','Sub Case Category','Type of Abuse','Prior Redressal',
  'Perpetrator','Service Offered','Status of Case','Agency','Name of Person','Perpetrator Name','Perpetrator Age','Perpetrator Gender',
'Perpetrator Mobile','Perpetrator Occupation','Perpetrator Addition','Remarks'] //<-- Won't work with useKeysAsHeaders present!
    };


    //Excel Export
    const exportExcel = () => {
      const csvExporter = new ExportToCsv(options);
      csvExporter.generateCsv(historyList);
    }
   //Excel Export



   const headinglist = [
    {
      header: 'first row',
      columns: ['first column', 'second column'],
    },
    {
      header: 'second row',
      columns: ['first column', 'second column'],
    },
    {
      header: 'third row',
      columns: ['first column', 'second column'],
    },
  ]



  
    return (
    
      <Auxiliary>
          
  
  <Row>
  <h2 className="gx-text-white">Start Date: </h2>
  <Col xl={6} lg={12} md={12} sm={12} xs={24}>
  <DatePicker className="gx-mb-3 gx-w-100" selected={startofDate}  format={dateFormat} 
                //value={onChangeDatepickerVal.value}
              onChange={date => setStartOfDate(date)}                
              />   
</Col>

<h2 className="gx-text-white">End Date: </h2>
<Col xl={6} lg={12} md={12} sm={12} xs={24}>
<DatePicker className="gx-mb-3 gx-w-100" selected={endofDate}  format={dateFormat}           
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
                scroll={{x: '100%', y: 200}}
            />


            {/* <VerticalTable 
              heading={headinglist}
              editable={true}
            /> */}



{/* 
  <PivotTableUI
               data={datapivot}
                onChange={s => this.setState(s)}
                {...this.state}
            /> */}


{/* <PivotTable columns="store"
rows="product"  
data={
[{ product: 'A', store: '1'},
{product: 'B', store: '1'},
{product: 'C', store: '1'},
{product: 'D', store: '1'},
{product: 'A', store: '2'},
{product: 'B', store: '2'},
{product: 'C', store: '2'}] }
/> */}

      </Auxiliary>
    );
  };

export default DistrictWiseReport;

