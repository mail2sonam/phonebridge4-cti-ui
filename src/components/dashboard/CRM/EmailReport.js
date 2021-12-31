import React from "react";
import { useState, useEffect } from 'react'
import { Col, Row, Card, Table } from 'antd';
import { Button, Form, Input, Select, TreeSelect, DatePicker } from "antd";

import Auxiliary from "util/Auxiliary";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import Widget from "components/Widget/index";
import { ExportToCsv } from 'export-to-csv';
import moment from "moment";
import DispositionApi from "./DispositionApi";


const Option = Select.Option;
var startdates = ""
var enddates = ""
const { MonthPicker, RangePicker } = DatePicker;

const EmailReport = () => {

    const monthFormat = 'YYYY/MM';
    const TreeNode = TreeSelect.TreeNode;
    //datepicker 
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const [startofDate, setStartOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    //var dateofstart = startofDate.toISOString().substr(0,19);


    const [endofDate, setEndOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    //var dateofend = endofDate.toISOString().substr(0,19);

    //datepicker
    const [slaReportVal, setSlaReportVal] = useState({ slaval: '' })
    function onChangeslaVal(value) {
        setSlaReportVal({
            slaval: value
        })
    }
    function startMonthVal(value) {
        var monthdate = value._d
    }

    function endMonthVal(value) {
        var monthdate = value._d
    }
    const [saveon, setSave] = useState({ ringstartval: 'Not Disclosed', ringendval: '123456', });

    function handleChangeSakhi(evt) {
        const value = evt.target.value;
        setSave({
            ...saveon,
            [evt.target.name]: value
        });
    }

    let [EmailList, setEmailList] = useState();
    const emaildata = [];

    useEffect(() => {

        DispositionApi.mailReport()
            .subscribe(res => {
                for (let i = 0; i <= Object.keys(res.data.history).length - 1; i++) {
                    emaildata.push({
                        from: res.data.history[i].from,
                        caseId: res.data.history[i].caseId,
                        subject: res.data.history[i].subject,
                        sentDate: res.data.history[i].sentDate,
                        body: res.data.history[i].body,
                        status: res.data.history[i].status,
                        userId: res.data.history[i].userId,
                        userName: res.data.history[i].userName,
                        enteredDate: res.data.history[i].enteredDate,
                        lastUpdateDate: res.data.history[i].lastUpdateDate,
                    })
                }
                setEmailList(emaildata);
            })
    }, [])


    const Option = Select.Option;

    {/* //table demo*/ }
    // service level
    const EmailColumn = [{
        title: 'From Id',
        dataIndex: 'from',
        width: 100,
    }, {
        title: 'Case Id',
        dataIndex: 'caseId',
        width: 100,
    }, {
        title: 'Subject',
        dataIndex: 'subject',
        width: 100,
    }, {
        title: 'Sent Date',
        dataIndex: 'sentDate',
        width: 100,
    }, {
        title: 'Body',
        dataIndex: 'body',
        width: 100,
    }, {
        title: 'Status',
        dataIndex: 'status',
        width: 100,
    }, {
        title: 'User Id',
        dataIndex: 'userId',
        width: 100,
    }, {
        title: 'User Name',
        dataIndex: 'userName',
        width: 100,
    }, {
        title: 'Entered Date',
        dataIndex: 'enteredDate',
        width: 100,
    }, {
        title: 'Last Update Date',
        dataIndex: 'lastUpdateDate',
        width: 100,
    }];

    const initdeptvalues = {
        count: "5",
    }

    const [dept, setDept] = useState(initdeptvalues);

    useEffect(() => {
        const count = "5";
    }, []);

    const optionEmail = {
        // fieldSeparator: ',',
        // quoteStrings: '"',
        // decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Email Report',

        // useTextFile: true,
        // useBom: true,
        // useKeysAsHeaders: true,
        headers: ['From Id', 'Case Id', 'Subject', 'Sent Date', 'Body', 'Status', 'User Id', 'User Name', 'Entered Date', 'Last Update Date'] //<-- Won't work with useKeysAsHeaders present!
    };

    //Excel Export
    const exportExcelEmail = () => {
        const csvExporter = new ExportToCsv(optionEmail);
        csvExporter.generateCsv(EmailList);
    }

    return (

        <Auxiliary>

            <Widget styleName={`ant-col gx-bg-geekblue `}>
                <div className="gx-card-body">

                    <div>
                        <h1 className="gx-text-white">Email Report</h1>
                        <Table className="gx-table-responsive" columns={EmailColumn} dataSource={EmailList} pagination={{ pageSize: 10 }}
                        />
                        <Button className="gx-btn-orange  gx-mb-1" type="primary" onClick={exportExcelEmail}> Export </Button>
                    </div>


                </div>
            </Widget>

        </Auxiliary>
    );
};

export default EmailReport;

