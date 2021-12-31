import React from "react";
import { useState, useEffect } from 'react'
import { Col, Row, Card, Table } from 'antd';
import { Button, Form, Input, Select, TreeSelect, DatePicker } from "antd";
import Auxiliary from "util/Auxiliary";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import AbandonedListDash from "./AbandonedListDash";
import MissedListDash from "./MissedListDash";
import AnsweredListDash from "./AnsweredListDash";
import IvrAbdListDash from "./IvrAbdListDash";
import Widget from "components/Widget/index";
import moment from "moment";
import MonitorApi from "./MonitorApi";
import DataTable from 'react-data-table-component';
import { ExportToCsv } from 'export-to-csv';



const Option = Select.Option;
var startdates = ""
var enddates = ""
const TotalCallReportList = () => {

    const TreeNode = TreeSelect.TreeNode;

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

    const [options, setOptions] = useState({ reportoption: "" });
    function onChangeListView(value) {
        setOptions({
            reportoption: value
        })
    }


    let [AnsweredList, setAnsweredList] = useState();
    const dataAnswered = [];
    const Answeredcolumns = [
        {
            name: 'Phone Number',
            selector: 'phoneNumber',
            sortable: true,
        },
        {
            name: 'Start Date',
            selector: 'startDate',
            sortable: true,
            // right: true,
        },
        {
            name: 'End Date',
            selector: 'endDate',
            sortable: true,
            // right: true,
        },

        {
            name: 'Extension',
            selector: 'extension',
            sortable: true,
            // right: true,
        },
        {
            name: 'Duration',
            selector: 'duration',
            sortable: true,
            // right: true,
        },
    ];


    let [AbandonedList, setabandonedList] = useState();
    const dataAbandoned = [];
    const Abandonedcolumns = [
        {
            name: 'Phone Number',
            selector: 'phoneNumber',
            sortable: true,
        },
        {
            name: 'Start Time',
            selector: 'startDate',
            sortable: true,
            // right: true,
        },
        {
            name: 'End Time',
            selector: 'endDate',
            sortable: true,
            // right: true,
        },

        {
            name: 'Extension',
            selector: 'extension',
            sortable: true,
            // right: true,
        },
        {
            name: 'Duration',
            selector: 'duration',
            sortable: true,
            // right: true,
        },
    ];


    let [IvrAbdList, setIvrAbdList] = useState();
    const dataIvrAbd = [];
    const columnsIvrAbd = [
        {
            name: 'Phone Number',
            selector: 'phoneNumber',
            sortable: true,
        },
        {
            name: 'Start Time',
            selector: 'startDate',
            sortable: true,
            // right: true,
        },
        {
            name: 'End Time',
            selector: 'endDate',
            sortable: true,
            // right: true,
        },

        {
            name: 'Duration',
            selector: 'duration',
            sortable: true,
            // right: true,
        },
    ];


    function ReportSearch() {
        var data = {
            startDate: startofDate.toString(),
            endDate: endofDate.toString(),
            //   callStatus: props.Guidenceprops
        }
        MonitorApi.dashboardlist(data)
            .subscribe(res => {
                //Answered List
                for (let i = 0; i <= Object.keys(res.data.answeredList).length - 1; i++) {
                    dataAnswered.push({
                        key: i + 1,
                        phoneNumber: res.data.answeredList[i].phoneNumber,
                        startDate: res.data.answeredList[i].startDate,
                        endDate: res.data.answeredList[i].endDate,
                        extension: res.data.answeredList[i].extension,
                        duration: res.data.answeredList[i].duration,
                    });
                }
                setAnsweredList(dataAnswered);

                //abandonedList
                for (let i = 0; i <= Object.keys(res.data.abandonedList).length - 1; i++) {
                    dataAbandoned.push({
                        key: i + 1,
                        phoneNumber: res.data.abandonedList[i].phoneNumber,
                        startDate: res.data.abandonedList[i].startDate,
                        endDate: res.data.abandonedList[i].endDate,
                        extension: res.data.abandonedList[i].extension,
                        duration: res.data.abandonedList[i].duration,
                    });
                }
                setabandonedList(dataAbandoned);

                //ivrAbandonedList
                for (let i = 0; i <= Object.keys(res.data.ivrAbandonedList).length - 1; i++) {
                    dataIvrAbd.push({
                        key: i + 1,
                        phoneNumber: res.data.ivrAbandonedList[i].phoneNumber,
                        startDate: res.data.ivrAbandonedList[i].startDate,
                        endDate: res.data.ivrAbandonedList[i].endDate,
                        // extension: res.data.ivrAbandonedList[i].extension,
                        duration: res.data.ivrAbandonedList[i].duration,
                    });
                }
                setIvrAbdList(dataIvrAbd);
            })
    }


    const Answeroptions = {
        // fieldSeparator: ',',
        // quoteStrings: '"',
        // decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Answered List',

        // useTextFile: true,
        // useBom: true,
        // useKeysAsHeaders: true,
        headers: ['Sl.No', 'Phone Number', 'Start Date', 'End Date', 'Extension', 'Duration'] //<-- Won't work with useKeysAsHeaders present!
    };

    //Excel Export
    const exportAnsweredExcel = () => {
        const csvExporter = new ExportToCsv(Answeroptions);
        csvExporter.generateCsv(AnsweredList);
    }
    //Excel Export


    const exportAbandonedoption = {
        // fieldSeparator: ',',
        // quoteStrings: '"',
        // decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Abandoned List',

        // useTextFile: true,
        // useBom: true,
        // useKeysAsHeaders: true,
        headers: ['Sl.No', 'Phone Number', 'Start Time', 'End Time', 'Extension', 'Duration'] //<-- Won't work with useKeysAsHeaders present!
    };
    //Excel Export
    const exportAbandonedExcel = () => {
        const csvExporter = new ExportToCsv(exportAbandonedoption);
        csvExporter.generateCsv(AbandonedList);
    }
    //Excel Export


    const optionsIvrAdb = {
        // fieldSeparator: ',',
        // quoteStrings: '"',
        // decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Ivr Abandoned List',

        // useTextFile: true,
        // useBom: true,
        // useKeysAsHeaders: true,
        headers: ['Sl.No', 'Phone Number', 'Start Time', 'End Time', 'Duration'] //<-- Won't work with useKeysAsHeaders present!
    };
    //Excel Export
    const exportIvrAdbExcel = () => {
        const csvExporter = new ExportToCsv(optionsIvrAdb);
        csvExporter.generateCsv(IvrAbdList);
    }
    //Excel Export

    return (

        <Auxiliary>
            <AdminHeader />

            <Widget styleName={`ant-col gx-bg-geekblue `}>
                <div className="gx-card-body">

                    <Row>
                        <h2 className="gx-text-white">Start Date: </h2>
                        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                            <DatePicker className="gx-mb-3 gx-w-100" defaultValue={moment(startofDate)} selected={startofDate} showTime format={dateFormat}
                                onChange={date => onchangestartdate(date)}
                            />
                        </Col>

                        <h2 className="gx-text-white">End Date: </h2>
                        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                            <DatePicker className="gx-mb-3 gx-w-100" defaultValue={moment(endofDate)} selected={endofDate} showTime format={dateFormat}
                                onChange={date => onchangeenddate(date)}
                            />
                        </Col>

                        <Button onClick={ReportSearch}> Search </Button>

                    </Row>


                    <h2 className="gx-text-white">Total Call Report</h2>
                    <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                        <TreeSelect className="gx-w-100"
                            showSearch
                            value={onChangeListView.value}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            onChange={onChangeListView}

                        >

                            {/* <TreeNode value="Missed List" title="Missed List" key="1">
                            </TreeNode> */}
                            <TreeNode value="Abandoned List" title="Abandoned List" key="2">
                            </TreeNode>
                            <TreeNode value="Answered List" title="Answered List" key="3">
                            </TreeNode>
                            <TreeNode value="Ivr Abandoned List" title="Ivr Abandoned List" key="4">
                            </TreeNode>

                        </TreeSelect>
                    </Col>


                </div>
            </Widget>


            {
                options.reportoption != ""
                    ? <Widget styleName={`ant-col gx-bg-geekblue `}>
                        <div className="gx-card-body">

                            <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                                {options.reportoption == "Abandoned List"
                                    ? <div>
                                        <h2 className="gx-text-white">Abandoned List</h2>
                                        <Button onClick={exportAbandonedExcel}> Export </Button>

                                        <DataTable
                                            title="Abandoned List"
                                            columns={Abandonedcolumns}
                                            data={AbandonedList}
                                            pagination

                                        />
                                    </div>


                                    : options.reportoption == "Missed List"
                                        ? <div>
                                            <h2 className="gx-text-white">Missed List</h2>
                                            <MissedListDash missedDetailprops={"Call Details"} />
                                        </div>

                                        : options.reportoption == "Answered List"
                                            ? <div>
                                                <h2 className="gx-text-white">Answered List</h2>
                                                <Button onClick={exportAnsweredExcel}> Export </Button>

                                                <DataTable
                                                    title="Answered List"
                                                    columns={Answeredcolumns}
                                                    data={AnsweredList}
                                                    pagination

                                                />
                                            </div>

                                            : options.reportoption == "Ivr Abandoned List"
                                                ? <div>
                                                    <h2 className="gx-text-white">Ivr Abandoned List</h2>
                                                    <Button onClick={exportIvrAdbExcel}> Export </Button>

                                                    <DataTable
                                                        title="Ivr Abandoned List"
                                                        columns={columnsIvrAbd}
                                                        data={IvrAbdList}
                                                        pagination

                                                    />
                                                </div>


                                                : <null />
                                }
                            </Col>
                        </div>
                    </Widget>
                    : <null />
            }

        </Auxiliary>
    );
};

export default TotalCallReportList;

