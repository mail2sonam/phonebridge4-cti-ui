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
import jsPDF from 'jspdf';
import 'jspdf-autotable'


const Option = Select.Option;
var startdates = ""
var enddates = ""
const { MonthPicker, RangePicker } = DatePicker;

const CallerSatisIndex = () => {

    const monthFormat = 'YYYY/MM';
    const TreeNode = TreeSelect.TreeNode;
    //datepicker 
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const [startofDate, setStartOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    var dateofstart = startofDate.toLocaleString().substr(0, 15);


    const [endofDate, setEndOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    var dateofend = endofDate.toLocaleString().substr(0, 15);

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

    let [CallStaticList, setCallStaticList] = useState();
    const CallStaticIndex = [];

    function onRingSearch() {
        var data = {
            startDate: startofDate.toString(),
            endDate: endofDate.toString()
        }
        DispositionApi.callerSatisIndex(data)
            .subscribe(res => {
                for (let i = 0; i <= Object.keys(res.data.serviceInteraction).length - 1; i++) {
                    CallStaticIndex.push({
                        month: res.data.serviceInteraction[i].month,
                        feedback: res.data.serviceInteraction[i].feedback,
                        goodFeedback: res.data.serviceInteraction[i].goodFeedback,
                        feedbackper: res.data.serviceInteraction[i].feedbackper,
                    })
                }
                setCallStaticList(CallStaticIndex);
            })
    }


    const Option = Select.Option;

    {/* //table demo*/ }
    // caller satis index
    const callerSatisIndex = [{
        title: 'Month',
        dataIndex: 'month',
        width: 100,
    }, {
        title: 'Total Feedback',
        dataIndex: 'feedback',
        width: 100,
    }, {
        title: 'Good Feedback',
        dataIndex: 'goodFeedback',
        width: 100,
    }, {
        title: 'Percentage',
        dataIndex: 'feedbackper',
        width: 100,
    }];




    const initdeptvalues = {
        count: "5",
    }

    const [dept, setDept] = useState(initdeptvalues);

    useEffect(() => {
        const count = "5";
    }, []);

    const optionCallStaticIndex = {
        // fieldSeparator: ',',
        // quoteStrings: '"',
        // decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Caller Satisfaction Index',

        // useTextFile: true,
        // useBom: true,
        // useKeysAsHeaders: true,
        headers: ['Month', 'Total Feedback', 'Good Feedback', 'Percentage'] //<-- Won't work with useKeysAsHeaders present!
    };

    //Excel Export
    const exportExcelCallSatis = () => {
        const csvExporter = new ExportToCsv(optionCallStaticIndex);
        csvExporter.generateCsv(CallStaticList);
    }

    function pdftest() {
        const doc = new jsPDF()
        doc.text("WOMEN HELP LINE 181", 70, 10);
        doc.text("Caller Satisfaction Index  From: " + dateofstart + " To: " + dateofend, 10, 20);
        // doc.text("Report From"+ + , 30, 30);

        doc.autoTable({ html: '#my-table' })
        doc.autoTable({
            head: [['Month', 'Total Feedback', 'Good Feedback', 'Percentage']],
        })
        doc.autoTable({
            body: CallStaticList,
        })

        // doc.addImage(imagedata, 'jpg', 0, 0, width, height)
        doc.text("Note: This is a System Generated pdf", 20, 100);

        doc.save('CallerSatis.pdf')
    }

    return (

        <Auxiliary>

            <Widget styleName={`ant-col gx-bg-geekblue `}>
                <div className="gx-card-body">

                    <Row>
                        <Col span={24}>
                            <Row>
                                <h2 className="gx-text-white">Start Month: </h2>
                                <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                                    <DatePicker className="gx-mb-3 gx-w-100" selected={startofDate} showTime format={dateFormat}
                                        onChange={date => setStartOfDate(date)}
                                    />
                                </Col>

                                <h2 className="gx-text-white">End Month: </h2>
                                <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                                    <DatePicker className="gx-mb-3 gx-w-100" selected={endofDate} showTime format={dateFormat}
                                        onChange={date => setEndOfDate(date)}
                                    />
                                </Col>

                                <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                                    <Button className="gx-mb-0"
                                        className="gx-btn-orange  gx-mb-1"
                                        type="primary"
                                        // htmlType="submit"
                                        onClick={onRingSearch}
                                    >
                                        Search
                                    </Button>
                                </Col>

                            </Row>
                        </Col>

                    </Row>

                    <div>
                        <h1 className="gx-text-white">Caller Satisfaction Index</h1>
                        <Table className="gx-table-responsive" columns={callerSatisIndex} dataSource={CallStaticList} pagination={{ pageSize: 10 }}
                        />
                        <Button className="gx-btn-orange  gx-mb-1" type="primary" onClick={exportExcelCallSatis}> Export </Button>
                    </div>
                    <Button onClick={pdftest}>Export Pdf</Button>

                </div>
            </Widget>

        </Auxiliary>
    );
};

export default CallerSatisIndex;

