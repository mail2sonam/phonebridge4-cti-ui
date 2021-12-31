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

const GuidenceReport = (props) => {

  //datepicker 
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
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
      callStatus: props.Guidenceprops,
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
            gsIinformationSought: res.data.reports[i].gsIinformationSought,
            gsRiskAsses: res.data.reports[i].gsRiskAsses,
            gsAggrieved: res.data.reports[i].gsAggrieved,
            gsOtherAggName: res.data.reports[i].gsOtherAggName,
            gsOtherAggMobile: res.data.reports[i].gsOtherAggMobile,
            gsOtherAggGender: res.data.reports[i].gsOtherAggGender,
            gsOtherAggAge: res.data.reports[i].gsOtherAggAge,
            gsOtherAggAddress: res.data.reports[i].gsOtherAggAddress,
            gsAge: res.data.reports[i].gsAge,
            gsAgeGroup: res.data.reports[i].gsAgeGroup,
            gsEducation: res.data.reports[i].gsEducation,
            gsOccupation: res.data.reports[i].gsOccupation,
            gsGender: res.data.reports[i].gsGender,
            gsPersonalIdent: res.data.reports[i].gsPersonalIdent,
            gsMaritalStatus: res.data.reports[i].gsMaritalStatus,
            gsLivingStatus: res.data.reports[i].gsLivingStatus,
            gsFamilyStatus: res.data.reports[i].gsFamilyStatus,
            gsHouseno: res.data.reports[i].gsHouseno,
            gsStreet: res.data.reports[i].gsStreet,
            gsBlock: res.data.reports[i].gsBlock,
            gsVillage: res.data.reports[i].gsVillage,
            gsState: res.data.reports[i].gsState,
            gsDistrict: res.data.reports[i].gsDistrict,
            gsPincode: res.data.reports[i].gsPincode,
            gsPlaceofInc: res.data.reports[i].gsPlaceofInc,
            gsFrequency: res.data.reports[i].gsFrequency,
            gsStatusofInc: res.data.reports[i].gsStatusofInc,
            gsCaseCat1: res.data.reports[i].gsCaseCat1,
            gsSubCat: res.data.reports[i].gsSubCat,
            gsTypeofAbuse: res.data.reports[i].gsTypeofAbuse,
            gsPriorRedressal: res.data.reports[i].gsPriorRedressal,
            gsPerpetrator: res.data.reports[i].gsPerpetrator,
            gsServiceOffered: res.data.reports[i].gsServiceOffered,
            gsStatusofCase: res.data.reports[i].gsStatusofCase,
            gsAgency: res.data.reports[i].gsAgency,
            gsNameofPerson: res.data.reports[i].gsNameofPerson,
            gsPerpetratorName: res.data.reports[i].gsPerpetratorName,
            gsPerpetratorAge: res.data.reports[i].gsPerpetratorAge,
            gsPerpetratorGender: res.data.reports[i].gsPerpetratorGender,
            gsPerpetratorMobile: res.data.reports[i].gsPerpetratorMobile,
            gsPerpetratorOccup: res.data.reports[i].gsPerpetratorOccup,
            gsPerpetratorAddition: res.data.reports[i].gsPerpetratorAddition,
            gsRemarks: res.data.reports[i].gsRemarks,
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
  },
  {
    title: 'Call Start Date',
    dataIndex: 'callStartTime',
    key: 'name',
    width: 100,

  },
  {
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
    title: 'Information Sought',
    dataIndex: 'gsInformationSought',
    key: 'name',
    width: 160,
  }, {
    title: 'Risk Asses',
    dataIndex: 'gsRiskAsses',
    key: 'name',
    width: 100,
  }, {
    title: 'Aggrieve Detail',
    children: [{
      title: 'Aggrieved',
      dataIndex: 'gsAggrieved',
      key: 'building',
      width: 100,
    }, {
      title: 'Aggrieve Name',
      dataIndex: 'gsOtherAggName',
      key: 'number',
      width: 100,

    }, {
      title: 'Aggrieve Mobile',
      dataIndex: 'gsOtherAggMobile',
      key: 'number',
      width: 100,

    }, {
      title: 'Aggrieve Gender',
      dataIndex: 'gsOtherAggGender',
      key: 'number',
      width: 100,

    }, {
      title: 'Aggrieve Age',
      dataIndex: 'gsOtherAggAge',
      key: 'number',
      width: 100,

    }, {
      title: 'Aggrieve Address',
      dataIndex: 'gsOtherAggAddress',
      key: 'number',
      width: 100,

    }],
  }, {
    title: 'Age',
    children: [{
      title: 'Age',
      dataIndex: 'gsAge',
      key: 'building',
      width: 100,
    }, {
      title: 'Age Group',
      dataIndex: 'gsAgeGroup',
      key: 'number',
      width: 100,

    }],
  }, {
    title: 'Education',
    dataIndex: 'gsEducation',
    key: 'name',
    width: 100,
  }, {
    title: 'Occupation',
    dataIndex: 'gsOccupation',
    key: 'name',
    width: 130,
  }, {
    title: 'Personal Identification',
    dataIndex: 'gsPersonalIdent',
    key: 'name',
    width: 150,
  }, {
    title: 'Marital Status',
    dataIndex: 'gsMaritalStatus',
    key: 'name',
    width: 100,
  }, {
    title: 'Living Status',
    dataIndex: 'gsLivingStatus',
    key: 'name',
    width: 100,
  }, {
    title: 'Family Status',
    dataIndex: 'gsFamilyStatus',
    key: 'name',
    width: 100,
  }, {
    title: 'Address',
    children: [{
      title: 'Houseno',
      dataIndex: 'gsHouseno',
      key: 'building',
      width: 100,
    }, {
      title: 'Street',
      dataIndex: 'gsStreet',
      key: 'number',
      width: 100,
    }, {
      title: 'Block',
      dataIndex: 'gsBock',
      key: 'number',
      width: 100,
    }, {
      title: 'Village',
      dataIndex: 'gsVillage',
      key: 'number',
      width: 100,
    }, {
      title: 'State',
      dataIndex: 'gsState',
      key: 'number',
      width: 100,
    }, {
      title: 'District',
      dataIndex: 'gsDistrict',
      key: 'number',
      width: 100,
    }, {
      title: 'Pincode',
      dataIndex: 'gsPincode',
      key: 'number',
      width: 100,
    }],
  }, {
    title: 'Place of Incident',
    dataIndex: 'gsPlaceofInc',
    key: 'name',
    width: 130,

  }, {
    title: 'Frequency',
    dataIndex: 'gsFrequency',
    key: 'name',
    width: 120,
  }, {
    title: 'Status of Incident',
    dataIndex: 'gsStatusofInc',
    key: 'name',
    width: 100,
  }, {
    title: 'Case Category',
    children: [{
      title: 'Case Category',
      dataIndex: 'gsCaseCat1',
      key: 'building',
      width: 100,
    }, {
      title: 'Sub Case Category',
      dataIndex: 'gsSubCat',
      key: 'number',
      width: 140,
    }],
  }, {
    title: 'Type of Abuse',
    dataIndex: 'gsTypeofAbuse',
    key: 'name',
    width: 100,

  }, {
    title: 'Prior Redressal',
    dataIndex: 'gsPriorRedressal',
    key: 'name',
    width: 100,

  }, {
    title: 'Perpetrator',
    dataIndex: 'gsPerpetrator',
    key: 'name',
    width: 130,

  }, {
    title: 'Service Offered',
    dataIndex: 'gsServiceOffered',
    key: 'name',
    width: 100,

  }, {
    title: 'Status of Case',
    dataIndex: 'gsStatusofCase',
    key: 'name',
    width: 100,

  }, {
    title: 'Agency',
    dataIndex: 'gsAgency',
    key: 'name',
    width: 100,

  }, {
    title: 'Name of Person',
    dataIndex: 'gsNameofPerson',
    key: 'name',
    width: 100,

  }, {
    title: 'Perpetrator Name',
    dataIndex: 'gsPerpetratorName',
    key: 'name',
    width: 130,

  }, {
    title: 'Perpetrator Age',
    dataIndex: 'gsPerpetratorAge',
    key: 'name',
    width: 130,

  }, {
    title: 'Perpetrator Gender',
    dataIndex: 'gsPerpetratorGender',
    key: 'name',
    width: 130,

  }, {
    title: 'Perpetrator Mobile',
    dataIndex: 'gsPerpetratorMobile',
    key: 'name',
    width: 130,

  }, {
    title: 'Perpetrator Occupation',
    dataIndex: 'gsPerpetratorOccup',
    key: 'name',
    width: 130,

  }, {
    title: 'Perpetrator Addition',
    dataIndex: 'gsPerpetratorAddition',
    key: 'name',
    width: 130,

  }, {
    title: 'Remarks',
    dataIndex: 'gsRemarks',
    key: 'name',
    width: 100,

  }, {
    title: 'Gender',
    dataIndex: 'gsGender',
    key: 'gender',
    width: 90,
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
    title: 'Guidence Report',

    // useTextFile: true,
    // useBom: true,
    // useKeysAsHeaders: true,
    headers: ['SlNo', 'Case Id', 'Extension', 'Agent Name', 'Phone Number', 'Call Start Date', 'Call Start Time', 'Call End Date', 'Call End Time',
      'Duration', 'Ring Time', 'Queue Time', 'Direction', 'Feedback', 'Second Number', 'Information Sought', 'Risk Asses', 'Aggrieved', 'Aggrieve Name', 'Aggrieve Mobile', 'Aggrieve Gender'
      , 'Aggrieve Age', 'Aggrieve Address', 'Age', 'Age Group', 'Education', 'Occupation', 'Gender', 'Personal Identification', 'Marital Status',
      'Living Status', 'Family Status', 'Houseno', 'Street', 'Block', 'Village', 'State', 'District', 'Pincode', 'Place of Incident',
      'Frequency', 'Status of Incident', 'Case Category', 'Sub Case Category', 'Type of Abuse', 'Prior Redressal',
      'Perpetrator', 'Service Offered', 'Status of Case', 'Agency', 'Name of Person', 'Perpetrator Name', 'Perpetrator Age', 'Perpetrator Gender',
      'Perpetrator Mobile', 'Perpetrator Occupation', 'Perpetrator Addition', 'Remarks'] //<-- Won't work with useKeysAsHeaders present!

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

export default GuidenceReport;

