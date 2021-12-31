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

const InteractionRatePer = () => {

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

    let [CallIntRecList, setCallIntRecList] = useState();
    const CallIntRecRate = [];

    function onRingSearch() {
        var data = {
            startDate: startofDate.toString(),
            endDate: endofDate.toString()
        }
        DispositionApi.interRecPerc(data)
            .subscribe(res => {
                for (let i = 0; i <= Object.keys(res.data.serviceInteraction).length - 1; i++) {
                    CallIntRecRate.push({
                        month: res.data.serviceInteraction[i].month,
                        totalInteractions: res.data.serviceInteraction[i].totalInteractions,
                        totalInteractionsInCRM: res.data.serviceInteraction[i].totalInteractionsInCRM,
                        totalintper: res.data.serviceInteraction[i].totalintper,
                    })
                }
                setCallIntRecList(CallIntRecRate);
            })
    }


    const Option = Select.Option;

    {/* //table demo*/ }
    // intr rec rate
    const intRecRate = [{
        title: 'Month',
        dataIndex: 'month',
        width: 100,
    }, {
        title: 'Total no of interaction',
        dataIndex: 'totalInteractions',
        width: 100,
    }, {
        title: 'No of Cases Created in CRM',
        dataIndex: 'totalInteractionsInCRM',
        width: 100,
    }, {
        title: 'Percentage',
        dataIndex: 'totalintper',
        width: 100,
    }];


    const initdeptvalues = {
        count: "5",
    }

    const [dept, setDept] = useState(initdeptvalues);

    useEffect(() => {
        const count = "5";
    }, []);

    const optionCallInterRecRate = {
        // fieldSeparator: ',',
        // quoteStrings: '"',
        // decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Interactions Record Percentage',

        // useTextFile: true,
        // useBom: true,
        // useKeysAsHeaders: true,
        headers: ['Month', 'Total no of interaction', 'No of Cases Created in CRM', 'Percentage'] //<-- Won't work with useKeysAsHeaders present!
    };
    //Excel Export
    const exportExcelCallIterRec = () => {
        const csvExporter = new ExportToCsv(optionCallInterRecRate);
        csvExporter.generateCsv(CallIntRecList);
    }

    function pdftest() {
        const doc = new jsPDF()

        doc.text("WOMEN HELP LINE 181", 70, 10);
        doc.text("Interaction Record Per From: " + dateofstart + " To: " + dateofend, 10, 20);
        // doc.text("Report From"+ + , 30, 30);

        doc.autoTable({ html: '#my-table' })
        doc.autoTable({
            head: [['Month', 'Total no of interaction', 'No of Cases Created in CRM', 'Percentage']],
        })
        doc.autoTable({
            body: CallIntRecList,
        })

        // doc.addImage(imagedata, 'jpg', 0, 0, width, height)
        doc.text("Note: This is a System Generated pdf", 20, 100);

        doc.save('InterRatePer.pdf')
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
                        <h1 className="gx-text-white">Interactions Record Percentage</h1>
                        <Table className="gx-table-responsive" columns={intRecRate} dataSource={CallIntRecList} pagination={{ pageSize: 10 }}
                        />
                        <Button className="gx-btn-orange  gx-mb-1" type="primary" onClick={exportExcelCallIterRec}> Export </Button>
                    </div>
                    <Button onClick={pdftest}>Export Pdf</Button>

                </div>
            </Widget>

        </Auxiliary>
    );
};

export default InteractionRatePer;

