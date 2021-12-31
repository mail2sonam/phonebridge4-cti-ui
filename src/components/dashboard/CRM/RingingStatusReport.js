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
const RingingStatusReport = () => {

    //datepicker 
    var curr = new Date();
    curr.setDate(curr.getDate());
    //var date = curr.toISOString().substr(0, 10);
    startdates = curr
    enddates = curr
    function onchangestartdate(value) {
        startdates = value.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
        setStartOfDate(startdates)
    }

    function onchangeenddate(value) {
        enddates = value.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
        setEndOfDate(enddates)
    }

    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const [startofDate, setStartOfDate] = useState(startdates);
    //var dateofstart = startofDate.toISOString().substr(0,19);

    const [endofDate, setEndOfDate] = useState(enddates);
    //var dateofend = endofDate.toISOString().substr(0,19);

    //datepicker

    const [saveon, setSave] = useState({ ringstartval: 'Not Disclosed', ringendval: '123456', });

    function handleChangeSakhi(evt) {
        const value = evt.target.value;
        setSave({
            ...saveon,
            [evt.target.name]: value
        });
    }

    let [historyList, setHistoryList] = useState();
    const datax = [];

    function onRingSearch() {
        var data = {
            ringStartSecond: saveon.ringstartval,
            ringEndSecond: saveon.ringendval,
            startDate: startofDate.toString(),
            endDate: endofDate.toString()
        }
        DispositionApi.ringReport(data)
            .subscribe(res => {
                for (let i = 0; i <= Object.keys(res.data.answeredList).length - 1; i++) {
                    datax.push({
                        key: i,
                        extension: res.data.answeredList[i].extension,
                        phoneNumber: res.data.answeredList[i].phoneNumber,
                        startDate: res.data.answeredList[i].startDate,
                        endDate: res.data.answeredList[i].endDate,
                        duration: res.data.answeredList[i].duration,
                    });
                }
                setHistoryList(datax);
            })
    }

    const Option = Select.Option;

    {/* //table demo*/ }
    const columns = [{
        title: 'Extension',
        dataIndex: 'extension',
    }, {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        width: 250,
    }, {
        title: 'Start Time',
        dataIndex: 'startDate',
    }, {
        title: 'End Time',
        dataIndex: 'endDate',
    }, {
        title: 'Pickup Time (in seconds)',
        dataIndex: 'duration',
    }];

    const initdeptvalues = {
        count: "5",
    }

    const [dept, setDept] = useState(initdeptvalues);

    useEffect(() => {
        const count = "5";
    }, []);

    const options = {
        // fieldSeparator: ',',
        // quoteStrings: '"',
        // decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Rings Status Report',

        // useTextFile: true,
        // useBom: true,
        // useKeysAsHeaders: true,
        headers: ['Sl.No', 'Extension', 'Phone Number', 'Start Time', 'End Time', 'Pickup Time (in seconds)'] //<-- Won't work with useKeysAsHeaders present!
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
            <h2 className="gx-text-white">Ring Status Report</h2>
            <Widget styleName={`ant-col gx-bg-geekblue `}>
                <div className="gx-card-body">

                    <Row>
                        <Col span={24}>
                            <Row>


                                <h2 className="gx-text-white">Ring Start Time: </h2>
                                <Col xl={3} lg={12} md={12} sm={12} xs={24}>
                                    <Input id="ringstartval" name="ringstartval" placeholder="Ring Start" type="number" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                                </Col>
                                <h2 className="gx-text-white">Ring End Time: </h2>
                                <Col xl={3} lg={12} md={12} sm={12} xs={24}>
                                    <Input id="ringendval" name="ringendval" placeholder="Ring End" type="number" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                                </Col>

                                <h2 className="gx-text-white">Start Date: </h2>
                                <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                                    <DatePicker className="gx-mb-3 gx-w-100" defaultValue={moment(startofDate)} selected={startofDate} showTime format={dateFormat}
                                        onChange={date => onchangestartdate(date)}
                                    />
                                </Col>

                                <h2 className="gx-text-white">End Date: </h2>
                                <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                                    <DatePicker className="gx-mb-3 gx-w-100" defaultValue={moment(endofDate)} selected={endofDate} showTime format={dateFormat}
                                        onChange={date => onchangeenddate(date)}
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

                    {/* <h2 className="gx-text-white">Rings Between {ringStart.startring} and {ringEnd.endring} </h2> */}

                    <Table className="gx-table-responsive" columns={columns} dataSource={historyList} pagination={{ pageSize: 10 }}
                    />
                    <Button className="gx-btn-orange  gx-mb-1" type="primary" onClick={exportExcel}> Export </Button>
                </div>
            </Widget>

            {/* <Widget styleName={`ant-col gx-bg-geekblue `}>
                <div className="gx-card-body">
                    <h2 className="gx-text-white">In Between 10 to 20 Rings Report</h2>

                    <Table className="gx-table-responsive" columns={columns} dataSource={historyList} pagination={{ pageSize: 3 }}
                    />
                    <Button className="gx-btn-orange  gx-mb-1" type="primary" onClick={exportExcel}> Export </Button>
                </div>
            </Widget> */}

            {/* <Widget styleName={`ant-col gx-bg-geekblue `}>
                <div className="gx-card-body">
                    <h2 className="gx-text-white">More Than 30 Rings Report</h2>

                    <Table className="gx-table-responsive" columns={columns} dataSource={historyList} pagination={{ pageSize: 3 }}
                    />
                    <Button className="gx-btn-orange  gx-mb-1" type="primary" onClick={exportExcel}> Export </Button>
                </div>
            </Widget> */}

        </Auxiliary>
    );
};

export default RingingStatusReport;

