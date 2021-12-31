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
import ServiceLevelReport from "./ServiceLevelReport";
import CallAbdRate from "./CallAbdRate";
import InteractionRatePer from "./InteractionRatePer";
import CallerSatisIndex from "./CallerSatisIndex";


const Option = Select.Option;
var startdates = ""
var enddates = ""
const { MonthPicker, RangePicker } = DatePicker;

const SlaReport = () => {

    const monthFormat = 'YYYY/MM';
    const TreeNode = TreeSelect.TreeNode;

    //datepicker 
    var curr = new Date();
    curr.setDate(curr.getDate());
    //var date = curr.toISOString().substr(0, 10);
    startdates = curr
    enddates = curr
    function onchangestartdate(value) {
        // startdates = value.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
        // setStartOfDate(startdates)
    }

    function onchangeenddate(value) {
        enddates = value.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
        setEndOfDate(enddates)
    }

    const dateFormat = 'YYYY-MM';
    const [startofDate, setStartOfDate] = useState(startdates);
    //var dateofstart = startofDate.toISOString().substr(0,19);

    const [endofDate, setEndOfDate] = useState(enddates);
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

    const Option = Select.Option;

    const initdeptvalues = {
        count: "5",
    }

    const [dept, setDept] = useState(initdeptvalues);

    useEffect(() => {
        const count = "5";
    }, []);


    return (

        <Auxiliary>
            <AdminHeader />
            <h2 className="gx-text-white">SLA Report</h2>
            <Widget styleName={`ant-col gx-bg-geekblue `}>
                <div className="gx-card-body">

                    <Row>
                        <Col span={24}>
                            <Row>

                                <h2 className="gx-text-white">Select SLA Report: </h2>
                                <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                                    <TreeSelect className="gx-w-100"
                                        showSearch
                                        value={onChangeslaVal.value}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        placeholder="Please select"
                                        allowClear
                                        onChange={onChangeslaVal}
                                    >

                                        <TreeNode value="Service Level" title="Service Level" key="0">
                                        </TreeNode>
                                        <TreeNode value="Call Abandoned Rate" title="Call Abandoned Rate" key="1">
                                        </TreeNode>
                                        <TreeNode value="Interactions Record Percentage" title="Interactions Record Percentage" key="2">
                                        </TreeNode>
                                        <TreeNode value="Caller Satisfaction Index" title="Caller Satisfaction Index" key="3">
                                        </TreeNode>
                                    </TreeSelect>
                                </Col>

                            </Row>
                        </Col>

                    </Row>


                    {
                        slaReportVal.slaval == "Service Level"
                            ? <div>
                                <h1 className="gx-text-white">Service Level</h1>
                                <ServiceLevelReport />
                            </div>
                            : slaReportVal.slaval == "Call Abandoned Rate"
                                ? <div>
                                    <CallAbdRate />
                                </div>
                                : slaReportVal.slaval == "Interactions Record Percentage"
                                    ? <div>
                                        <InteractionRatePer />
                                    </div>
                                    : slaReportVal.slaval == "Caller Satisfaction Index"
                                        ? <div>
                                            <CallerSatisIndex />
                                        </div>
                                        : <null />
                    }

                </div>
            </Widget>

        </Auxiliary>
    );
};

export default SlaReport;

