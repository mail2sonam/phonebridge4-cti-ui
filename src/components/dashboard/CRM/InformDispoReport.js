import React from "react";
import { useState, useEffect } from 'react'
import { Col, Row, Card, Table, DatePicker, TreeSelect } from 'antd';
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
import DispositionApi from "./DispositionApi";

const Option = Select.Option;

const TreeNode = TreeSelect.TreeNode;

const InformDispoReport = (props) => {

  //datepicker 
  const dateFormat = 'YYYY-MM-DD HH:mm';
  const [startofDate, setStartOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  //var dateofstart = startofDate.toISOString().substr(0,19);


  const [endofDate, setEndOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  //var dateofend = endofDate.toISOString().substr(0,19);

  //datepicker

  const [callDir, setCallDir] = useState({ dirVal: "" });
  function handleCallDir(value) {
    setCallDir({
      dirVal: value
    })
  }

  let [historyList, setHistoryList] = useState();
  const datax = [];
  const rowData4 = [];
  let history = useHistory();

  function ReportSearch() {
    var data = {
      startDate: startofDate.toString(),
      endDate: endofDate.toString(),
      callStatus: props.Informationprops,
      callDirection: callDir.dirVal
    }
    DispositionApi.showAllDispo(data)
      .subscribe(res => {
        for (let i = 0; i <= Object.keys(res.data.reports).length - 1; i++) {

          datax.push({
            key: i + 1,
            caseId: res.data.reports[i].caseId,
            extension: res.data.reports[i].extension,
            agentName: res.data.reports[i].agentName,
            phoneNo: res.data.reports[i].phoneNo,
            callStartTime: res.data.reports[i].callStartTime,
            callStartTimeOnly: res.data.reports[i].callStartTimeOnly,
            callEndTime: res.data.reports[i].callEndTime,
            callEndTimeOnly: res.data.reports[i].callEndTimeOnly,
            duration: res.data.reports[i].duration,
            ringTime: res.data.reports[i].ringTime,
            queueTime: res.data.reports[i].queueTime,
            direction: res.data.reports[i].direction,
            feedback: res.data.reports[i].feedback,
            secondNumber: res.data.reports[i].secondNumber,
            // callType: res.data.reports[i].callType,
            // incidentdate: res.data.reports[i].incidentdate,
            // incidentTime: res.data.reports[i].incidentTime,
            isName: res.data.reports[i].isName,
            isAge: res.data.reports[i].isAge,
            isAgeGroup: res.data.reports[i].isAgeGroup,
            isEducation: res.data.reports[i].isEducation,
            isGender: res.data.reports[i].isGender,
            isHouseno: res.data.reports[i].isHouseno,
            isStreet: res.data.reports[i].isStreet,
            isBlock: res.data.reports[i].isBlock,
            isVillage: res.data.reports[i].isVillage,
            isState: res.data.reports[i].isState,
            isDistrict: res.data.reports[i].isDistrict,
            isPincode: res.data.reports[i].isPincode,
            isInformationSought: res.data.reports[i].isInformationSought,
            isServiceoffered: res.data.reports[i].isServiceoffered,
            //isAddObtainInfo: res.data.reports[i].isAddObtainInfo,
            isAgency: res.data.reports[i].isAgency,
            isNameofPerson: res.data.reports[i].isNameofPerson,
            isContactNum: res.data.reports[i].isContactNum,
            isRemarks: res.data.reports[i].isRemarks,


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
    key: 'name',
    width: 100,

  }, {
    title: 'Agent Name',
    dataIndex: 'agentName',
    key: 'name',
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
    title: 'Call Start Date',
    dataIndex: 'callStartTime',
    key: 'name',
    width: 100,

  }, {
    title: 'Call End Time',
    dataIndex: 'callStartTimeOnly',
    key: 'name',
    width: 100,

  }, {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'name',
    width: 100,

  }, {
    title: 'Ring Time',
    dataIndex: 'ringTime',
    key: 'name',
    width: 100,

  }, {
    title: 'Queue Time',
    dataIndex: 'queueTime',
    key: 'name',
    width: 100,

  }, {
    title: 'Direction',
    dataIndex: 'direction',
    key: 'name',
    width: 100,

  }, {
    title: 'Feedback',
    dataIndex: 'feedback',
    key: 'name',
    width: 100,
  }, {
    title: 'Second Number',
    dataIndex: 'secondNumber',
    key: 'name',
    width: 100,

  },
  // {
  //   title: 'Call Type',
  //   dataIndex: 'callType',
  //   key: 'name',
  //   width: 100,
  // },{
  //     title: 'Call Date',
  //     dataIndex: 'incidentdate',
  //     key: 'name',
  //     width: 100,
  //   },{
  //     title: 'Call Time',
  //     dataIndex: 'incidentTime',
  //     key: 'name',
  //     width: 100,
  //   },
  {
    title: 'Name',
    dataIndex: 'isName',
    key: 'name',
    width: 100,
  }, {
    title: 'Age',
    children: [{
      title: 'Age',
      dataIndex: 'isAge',
      key: 'building',
      width: 100,
    }, {
      title: 'Age Group',
      dataIndex: 'isAgeGroup',
      key: 'number',
      width: 100,
    }],
  }, {
    title: 'Education',
    dataIndex: 'isEducation',
    key: 'name',
    width: 100,
  }, {
    title: 'Address',
    children: [{
      title: 'Houseno',
      dataIndex: 'isHouseno',
      key: 'building',
      width: 100,
    }, {
      title: 'Street',
      dataIndex: 'isStreet',
      key: 'number',
      width: 100,
    }, {
      title: 'Block',
      dataIndex: 'isBlock',
      key: 'number',
      width: 100,
    }, {
      title: 'Village',
      dataIndex: 'isVillage',
      key: 'number',
      width: 100,
    }, {
      title: 'State',
      dataIndex: 'isState',
      key: 'number',
      width: 100,
    }, {
      title: 'District',
      dataIndex: 'isDistrict',
      key: 'number',
      width: 100,
    }, {
      title: 'Pincode',
      dataIndex: 'isPincode',
      key: 'number',
      width: 100,
    }],
  }, {
    title: 'Information Sought',
    dataIndex: 'isInformationSought',
    key: 'name',
    width: 130,

  }, {
    title: 'Service offered',
    dataIndex: 'isServiceoffered',
    key: 'name',
    width: 100,
  }, {
    title: 'Agency',
    dataIndex: 'isAgency',
    key: 'name',
    width: 100,
  }, {
    title: 'Name of Person',
    dataIndex: 'isNameofPerson',
    key: 'name',
    width: 100,

  }, {
    title: 'Contact Number',
    dataIndex: 'isContactNum',
    key: 'name',
    width: 130,

  }, {
    title: 'Remarks',
    dataIndex: 'isRemarks',
    key: 'name',
    width: 100,

  }, {
    title: 'Gender',
    dataIndex: 'isGender',
    key: 'gender',
    width: 90,
    fixed: 'right',
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
    title: 'Information Report',

    // useTextFile: true,
    // useBom: true,
    // useKeysAsHeaders: true,
    headers: ['SlNo', 'Case Id', 'Extension', 'Agent Name', 'Phone Number', 'Call Start Date', 'Call Start Time', 'Call End Date', 'Call End Time',
      'Duration', 'Ring Time', 'Queue Time', 'Direction', 'Feedback', 'Second Number',
      'Name', 'Age', 'Age Group', 'Education', 'Gender', 'Houseno', 'Street', 'Block', 'Village', 'State', 'District', 'Pincode',
      'Information Sought', 'Service offered', 'Agency', 'Name of Person', 'Contact Number', 'Remarks',] //<-- Won't work with useKeysAsHeaders present!
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

        <h2 className="gx-text-white">Call Direction</h2>
        <Col xl={4} lg={12} md={12} sm={12} xs={24}>
          <TreeSelect className="gx-w-100"
            showSearch
            value={handleCallDir.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={handleCallDir}

          >
            <TreeNode value="inbound" title="InBound" key="1">
            </TreeNode>
            <TreeNode value="OutBound" title="OutBound" key="2">
            </TreeNode>
          </TreeSelect>
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

export default InformDispoReport;

