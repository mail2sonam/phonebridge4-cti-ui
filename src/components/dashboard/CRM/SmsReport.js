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

const SmsReport = () => {

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

    let [SmsList, setSmsList] = useState();
    const smsdata = [];

    useEffect(() => {

        DispositionApi.smsReport()
            .subscribe(res => {
                for (let i = 0; i <= Object.keys(res.data.history).length - 1; i++) {
                    smsdata.push({
                        messageId: res.data.history[i].messageId,
                        caseId: res.data.history[i].caseId,
                        number: res.data.history[i].number,
                        message: res.data.history[i].message,
                        date: res.data.history[i].date,
                        enteredDate: res.data.history[i].enteredDate,
                        userExtension: res.data.history[i].userExtension,
                        status: res.data.history[i].status,
                    })
                }
                setSmsList(smsdata);
            })
    }, [])


    const Option = Select.Option;

    {/* //table demo*/ }
    // service level
    const smsColumn = [{
        title: 'Message Id',
        dataIndex: 'messageId',
        width: 100,
    }, {
        title: 'Case Id',
        dataIndex: 'caseId',
        width: 100,
    }, {
        title: 'Number',
        dataIndex: 'number',
        width: 100,
    }, {
        title: 'Message',
        dataIndex: 'message',
        width: 100,
    }, {
        title: 'Date',
        dataIndex: 'date',
        width: 100,
    }, {
        title: 'Entered Date',
        dataIndex: 'enteredDate',
        width: 100,
    }, {
        title: 'User Extension',
        dataIndex: 'userExtension',
        width: 100,
    }, {
        title: 'Status',
        dataIndex: 'status',
        width: 100,
    }];

    const initdeptvalues = {
        count: "5",
    }

    const [dept, setDept] = useState(initdeptvalues);

    useEffect(() => {
        const count = "5";
    }, []);

    const optionsms = {
        // fieldSeparator: ',',
        // quoteStrings: '"',
        // decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'SMS Report',

        // useTextFile: true,
        // useBom: true,
        // useKeysAsHeaders: true,
        headers: ['Message Id', 'Case Id', 'Number', 'Message', 'Date', 'Entered Date', 'User Extension', 'Status'] //<-- Won't work with useKeysAsHeaders present!
    };

    //Excel Export
    const exportExcelSms = () => {
        const csvExporter = new ExportToCsv(optionsms);
        csvExporter.generateCsv(SmsList);
    }

    return (

        <Auxiliary>

            <Widget styleName={`ant-col gx-bg-geekblue `}>
                <div className="gx-card-body">

                    <div>
                        <h1 className="gx-text-white">SMS Report</h1>
                        <Table className="gx-table-responsive" columns={smsColumn} dataSource={SmsList} pagination={{ pageSize: 10 }}
                        />
                        <Button className="gx-btn-orange  gx-mb-1" type="primary" onClick={exportExcelSms}> Export </Button>
                    </div>


                </div>
            </Widget>

        </Auxiliary>
    );
};

export default SmsReport;

