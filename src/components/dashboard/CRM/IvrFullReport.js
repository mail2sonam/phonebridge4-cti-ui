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
import moment from "moment";
import { AgGridReact } from 'ag-grid-react';
import { ExportToCsv } from 'export-to-csv';
import Widget from "components/Widget/index";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import DispositionApi from "./DispositionApi";
import ReportApi from "./ReportApi";

const Option = Select.Option;

const IvrFullReport = () => {
    const { MonthPicker, RangePicker } = DatePicker;

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

    function ReportSearch() {
        var data = {
            startDate: startofDate.toString(),
            endDate: endofDate.toString(),
        }
        ReportApi.ivrFullReport(data)
            .subscribe(res => {
                for (let i = 0; i <= Object.keys(res.data.data).length - 1; i++) {

                    datax.push({
                        key: i + 1,
                        callDate: res.data.data[i].callDate,
                        docId: res.data.data[i].docId,
                        phoneNo: res.data.data[i].phoneNo,
                        ivrStartTime: res.data.data[i].ivrStartTime,
                        ivrEndTime: res.data.data[i].ivrEndTime,
                        ivrDuration: res.data.data[i].ivrDuration,
                        traverse: res.data.data[i].traverse,
                    });

                }
                setHistoryList(datax);
            })

    }

    const Option = Select.Option;

    const columns = [{
        title: 'Call Date',
        dataIndex: 'callDate',
        key: 'name',
        width: 100,
        fixed: 'left',
    }, {
        title: 'Doc Id',
        dataIndex: 'docId',
        key: 'name',
        width: 100,

    }, {
        title: 'Phone Number',
        dataIndex: 'phoneNo',
        key: 'name',
        width: 100,

    }, {
        title: 'Ivr Start Time',
        dataIndex: 'ivrStartTime',
        key: 'name',
        width: 100,
    }, {
        title: 'Ivr End Time',
        dataIndex: 'ivrEndTime',
        key: 'name',
        width: 100,

    }, {
        title: 'Ivr Duration',
        dataIndex: 'ivrDuration',
        key: 'name',
        width: 100,

    }, {
        title: 'Traverse',
        dataIndex: 'traverse',
        key: 'name',
        width: 100,

    }];


    const initdeptvalues = {
        count: "10",
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
        title: 'Ivr Report',

        // useTextFile: true,
        // useBom: true,
        // useKeysAsHeaders: true,
        headers: ['Sl.No', 'Call Date', 'Doc Id', 'Phone Number', 'Ivr Start Time', 'Ivr End Time', 'Ivr Duration', 'Traverse'] //<-- Won't work with useKeysAsHeaders present!
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
            <h2 className="gx-text-white">IVR Report</h2>
            <Widget styleName={`ant-col gx-bg-geekblue `}>
                <div className="gx-card-body">


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
                    {/* 

                    <Table
                        columns={columns}
                        dataSource={historyList}
                        bordered
                        size="large"
                        scroll={{ x: '230%', y: 340 }}
                    /> */}
                    <Table className="gx-table-responsive" columns={columns} dataSource={historyList} pagination={{ pageSize: 10 }}
                    />
                </div>
            </Widget>
        </Auxiliary>
    );
};

export default IvrFullReport;

