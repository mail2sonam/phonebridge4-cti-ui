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
import Widget from "components/Widget/index";


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import DispositionApi from "./DispositionApi";
import ReactAudioPlayer from 'react-audio-player';
import ReportApi from "./ReportApi";
import DialerApi from "./DialerApi";
import CampaignApi from "./CampaignApi";

const Option = Select.Option;
var total = "";
var close = "";
var open = "";

const DialerMonitor = (props) => {

    const TreeNode = TreeSelect.TreeNode;

    //datepicker 
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const [startofDate, setStartOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    //var dateofstart = startofDate.toISOString().substr(0,19);


    const [endofDate, setEndOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    //var dateofend = endofDate.toISOString().substr(0,19);

    //datepicker

    let [historyList, setHistoryList] = useState();
    const datax = [];
    const rowData4 = [];
    let history = useHistory();

    const [campaignValues, setCampaignVal] = useState([]);
    useEffect(() => {
        var data = {
            extension: "sip",
        }
        CampaignApi.campaignList(data)
            .subscribe(res => {
                let campList = [];
                for (let i = 0; i <= Object.keys(res.data.model).length - 1; i++) {
                    campList.push({
                        key: i,
                        campaignName: res.data.model[i].campaignName,
                        campaignId: res.data.model[i].campaignId,
                    })
                }
                console.log(campList)
                setCampaignVal(campList);
            })
    }, [localStorage.getItem("extn")])




    function onChangeCampSelect(value) {
        console.log(value)

        var data = {
            campaignId: value
        }
        console.log(data)
        MonitorApi.dialerMonitor(data)
            .subscribe(res => {
                total = res.data.total;
                close = res.data.close;
                open = res.data.open;
                console.log(close)
                for (let i = 0; i <= Object.keys(res.data.data).length - 1; i++) {
                    console.log(res.data.data)
                    datax.push({
                        key: i,
                        campaignId: res.data.data[i].campaignId,
                        campaignName: res.data.data[i].campaignName,
                        insertDate: res.data.data[i].insertDate,
                        callDate: res.data.data[i].callDate,
                        name: res.data.data[i].name,
                        phoneNo: res.data.data[i].phoneNo,
                        status: res.data.data[i].status,
                        extension: res.data.data[i].extension,
                    });

                }

                setHistoryList(datax);
            })

    }

    console.log(close)
    const Option = Select.Option;

    const columns = [{
        title: 'Campaign Id',
        dataIndex: 'campaignId',
        key: 'caseid',
        width: 100,
        fixed: 'left',
    },
    {
        title: 'Campaign Name',
        dataIndex: 'campaignName',
        key: 'name',
        width: 100,

    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 150,
    }, {
        title: 'Phone Number',
        dataIndex: 'phoneNo',
        key: 'name',
        width: 150,
    },
    {
        title: 'Insert Date',
        dataIndex: 'insertDate',
        key: 'name',
        width: 100,

    }, {
        title: 'Call Date',
        dataIndex: 'callDate',
        key: 'name',
        width: 150,
    }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'name',
        width: 100,

    }, {
        title: 'Extension',
        dataIndex: 'extension',
        key: 'name',
        width: 100,

    }
    ];



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
        title: 'Daily Report',

        // useTextFile: true,
        // useBom: true,
        // useKeysAsHeaders: true,
        headers: ['Sl.No', 'Agent Name', 'Case Id', 'docId', 'Phone Number', 'Extension', 'Call Status', 'Call Start Date', 'Call End Date', 'Second Number',
            'Campaign Name', 'Call Type', 'Call Date', 'Call Time', 'Duration', 'Call Connect Time', 'Hold Start Time', 'Hold End Time'] //<-- Won't work with useKeysAsHeaders present!

    };


    //Excel Export
    const exportExcel = () => {
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(historyList);
    }
    //Excel Export




    return (

        <Auxiliary>
            <AdminHeader />
            <Widget styleName={`ant-col gx-bg-geekblue `}>
                <div className="gx-card-body">

                    <h2 className="gx-text-white">Choose Dialer </h2>
                    <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                        <TreeSelect className="gx-w-100"
                            showSearch
                            value={onChangeCampSelect.value}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Select Campaign"
                            allowClear
                            treeDefaultExpandAll
                            onChange={onChangeCampSelect}
                        >

                            {
                                campaignValues.map(({ campaignName, campaignId, id }) =>

                                    <TreeNode value={campaignId} key={id} title={campaignName} >
                                    </TreeNode>
                                )
                            }
                        </TreeSelect>
                    </Col>


                    <h2 className="gx-text-white">Total Calls: {total} </h2>
                    <Col xl={6} lg={12} md={12} sm={12} xs={24}>

                    </Col>

                    <h2 className="gx-text-white">Total Call Closed: {close} </h2>
                    <Col xl={6} lg={12} md={12} sm={12} xs={24}>

                    </Col>

                    <h2 className="gx-text-white">Total Call Open: {open} </h2>
                    <Col xl={6} lg={12} md={12} sm={12} xs={24}>

                    </Col>



                    <Table
                        columns={columns}
                        dataSource={historyList}
                        bordered
                        size="large"
                        scroll={{ x: '230%', y: 340 }}
                    />


                </div>
            </Widget>
        </Auxiliary>
    );
};

export default DialerMonitor;

