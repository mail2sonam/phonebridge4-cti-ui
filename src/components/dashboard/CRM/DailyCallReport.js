import React from "react";
import { useState, useEffect } from 'react'
import { Col, Row, Card, Table, DatePicker } from 'antd';
import { Button, Form, Input, Select } from "antd";
import Auxiliary from "util/Auxiliary";
import CallDetailApi from "components/dashboard/CRM/CallDetailApi";
import AgentPage from "../../../routes/SamplePage/Agent";
import { Link, useHistory } from "react-router-dom";
import MonitorApi from "./MonitorApi";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import UserApi from "./UserApi";
import { AgGridReact } from 'ag-grid-react';
import { ExportToCsv } from 'export-to-csv';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AmCharts from "@amcharts/amcharts3-react";
import DispositionApi from "./DispositionApi";

const Option = Select.Option;

const DailyCallReport = () => {



  let [historyList, setHistoryList] = useState();
  const datax = [];
  const rowData4 = [];
  let history = useHistory();

  function ReportSearch() {
    var data = {
      startDate: startofDate.toString(),
      endDate: endofDate.toString(),
    }
    DispositionApi.showAllDispo(data)
      .subscribe(res => {
        for (let i = 0; i <= Object.keys(res.data.reports).length - 1; i++) {

          datax.push({
            key: i,
            caseId: res.data.reports[i].caseId,
            extension: res.data.reports[i].extension,
            agentName: res.data.reports[i].agentName,
            phoneNo: res.data.reports[i].phoneNo,
            callStartTime: res.data.reports[i].callStartTime,
            callStartTimeOnly: res.data.reports[i].callStartTimeOnly,

            callEndTime: res.data.reports[i].callEndTime,
            callEndTimeOnly: res.data.reports[i].callEndTimeOnly,
            duration: res.data.reports[i].duration,
            secondNumber: res.data.reports[i].secondNumber,
            callStatus: res.data.reports[i].callStatus,
            incidentdate: res.data.reports[i].incidentdate,
            incidentTime: res.data.reports[i].incidentTime,
          });

        }
        setHistoryList(datax);
      })




  }



  const Option = Select.Option;

  const columns = [{
    title: 'Case Id',
    dataIndex: 'caseId',
    key: 'caseid',
    width: 100,
    fixed: 'left',
  }, {
    title: 'Extension',
    dataIndex: 'extension',
    key: 'caseid',
    width: 100,

  }, {
    title: 'Agent Name',
    dataIndex: 'agentName',
    key: 'caseid',
    width: 100,

  }, {
    title: 'Phone Number',
    dataIndex: 'phoneNo',
    key: 'name',
    width: 100,

  }, {
    title: 'Call Start Date',
    dataIndex: 'callStartTime',
    key: 'name',
    width: 100,

  }, {
    title: 'Call Start Time',
    dataIndex: 'callStartTimeOnly',
    key: 'name',
    width: 100,

  }, {
    title: 'Call End Date',
    dataIndex: 'callEndTime',
    key: 'name',
    width: 100,

  }, {
    title: 'Call End Time',
    dataIndex: 'callEndTimeOnly',
    key: 'name',
    width: 100,

  }, {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'name',
    width: 100,

  }, {
    title: 'Second Number',
    dataIndex: 'secondNumber',
    key: 'name',
    width: 100,

  }, {
    title: 'Call Status',
    dataIndex: 'callStatus',
    key: 'name',
    width: 100,

  }, {
    title: 'Call Date',
    dataIndex: 'incidentdate',
    key: 'extnum',
    width: 100,

  }, {
    title: 'Call Time',
    dataIndex: 'incidentTime',
    key: 'name',
    width: 100,
  }];




  const initdeptvalues = {
    count: "5",
  }

  const [dept, setDept] = useState(initdeptvalues);

  useEffect(() => {
    const count = "5";
  }, []);


  function backtoagent() {
    history.push("/admin")
  }


  const options = {
    // fieldSeparator: ',',
    // quoteStrings: '"',
    // decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Daily Call Report',

    // useTextFile: true,
    // useBom: true,
    // useKeysAsHeaders: true,
    headers: ['Sl.No', 'Case Id', 'Extension', 'Agent Name', 'Phone Number', 'Call Start Date', 'Call Start Time', 'Call End Date', 'Call End Time', 'Duration', 'Second Number', 'Call Status',
      'Call Date', 'Call Time'] //<-- Won't work with useKeysAsHeaders present!
  };




  //Excel Export
  const exportExcel = () => {
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(historyList);
  }
  //Excel Export




  //datepicker 
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  const [startofDate, setStartOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  //var dateofstart = startofDate.toISOString().substr(0,19);

  const [endofDate, setEndOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  //var dateofend = endofDate.toISOString().substr(0,19);
  //datepicker


  return (

    <Auxiliary>


      <h2 className="gx-text-white">Daily Call Report</h2>


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
        scroll={{ x: '230%', y: 340 }}
      />
    </Auxiliary>
  );
};

export default DailyCallReport;

