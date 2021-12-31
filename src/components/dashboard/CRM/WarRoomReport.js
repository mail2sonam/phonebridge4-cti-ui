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
import UserApi from "./UserApi";
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import axios, { post } from 'axios';

var ipName = "http://192.168.10.210:5001/eupraxia"


const Option = Select.Option;
var startdates = ""
var enddates = ""
const { MonthPicker, RangePicker } = DatePicker;

const WarRoomReport = () => {

    const monthFormat = 'YYYY/MM';
    const TreeNode = TreeSelect.TreeNode;
    //datepicker 
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const [startofDate, setStartOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    var dateofstart = startofDate.toString();
    console.log(dateofstart)

    const [endofDate, setEndOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    var dateofend = endofDate.toString();
    console.log(dateofend)


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
    const [agent, setAgent] = useState({ agentName: '' });
    function onChangeAgentName(value) {
        setAgent({
            agentName: value,
        })
    }

   
    const [extension, setExtension] = useState({ extension: '' });
    function onChangeExtension(value) {
        setExtension({
            extension: value,
        })
    }
    

    const [callStatus, setcallStatus] = useState({ callStatus: '' });
    function onChangecallStatus(value) {
        setcallStatus({
            callStatus: value,
        })
    }

    const [calldirection, setcallDirection] = useState({ callDirection: '' });
    function onChangecallDirection(value) {
        setcallDirection({
            callDirection: value,
        })
    }


    const [campaignName, setcampaignName] = useState({ campaignName: '' });
    function onChangecampaignName(value) {
        setcampaignName({
            campaignName: value,
        })
    }
    
        var data = {
            
            startDate: startofDate.toString(),
            endDate: endofDate.toString(),
            status: callStatus.callStatus,
            callDirection: calldirection.callDirection,
            extension: extension.extension,
            agentName: agent.agentName
            
            
        }
        console.log(data)



    let [SlList, setSlList] = useState();
    const sldata = [];

    function onRingSearch() {

        axios({
            method: 'Get',
            // url:ipName+'/report/getWarRoomReport?startDate=Wed Sep 21 2021 10:25:20 GMT+0530&endDate=Wed Sep 21 2021 19:25:20 GMT+0530'
            
            url: ipName+'/report/getWarRoomReport?startDate='+dateofstart+'&endDate='+dateofend,
           
        })
           .then(function (response) {  
                 //console.log(response.data.data[1].agentName)        
                 for (let i = 0; i <= Object.keys(response.data).length - 1; i++) {
                    sldata.push({
                       
                     id: response.data[i].id,
                     phoneNo: response.data[i].phoneNo,
                     agentName:response.data[i].agentName,
                     extension:response.data[i].extension,
                     employeeName:response.data[i].employeeName,
                     empCode:response.data[i].empCode,
                     branch:response.data[i].branch,
                    // callerId: response.data[i].callerId,
                     typeOfQuery: response.data[i].typeOfQuery,
                     remarks: response.data[i].remarks,
                     callTime: response.data[i].callTime,
                     startDate:response.data[i].startDate,
                     endDate:response.data[i].endDate,
                     callDroped:response.data[i].callDroped,
                     callDirection:response.data[i].callDirection,
                     callStatus:response.data[i].callStatus,
                     campaignName:response.data[i].campaignName,
                     duration:response.data[i].duration,
                     holdStartTime:response.data[i].holdStartTime,
                     holdEndTime:response.data[i].holdEndTime,
                     recPath:response.data[i].recPath

        });
                }
                 console.log(response)
                 //console.log(ipName+'/report/getWarRoomReport?startDate='+dateofstart+'&endDate='+dateofend)
                 setSlList(sldata);
                
             
     
            // setHistoryList(datax);
         });


        // var data = {
        //     startDate: startofDate.toString(),
        //     endDate: endofDate.toString()
        // }
        // DispositionApi.slaReport(data)
        //     .subscribe(res => {
        //         for (let i = 0; i <= Object.keys(res.data.serviceInteraction).length - 1; i++) {

        //             sldata.push({
        //                 month: res.data.serviceInteraction[i].month,
        //                 totalCalls: res.data.serviceInteraction[i].totalCalls,
        //                 callsAnsWithin20Sec: res.data.serviceInteraction[i].callsAnsWithin20Sec,
        //                 notAnsWithIn20Sec: res.data.serviceInteraction[i].notAnsWithIn20Sec,
        //                 servPercentage: res.data.serviceInteraction[i].servPercentage,
        //             })
        //         }
        //         setSlList(sldata);
        //     })
    }


    const Option = Select.Option;

    {/* //table demo*/ }
    // service level
    const serviceLevel = [
     
    {
        title: 'AgentName',
        dataIndex: 'agentName',
        width: 100,
    }, 
    {
        title: 'Phone No',
        dataIndex: 'phoneNo',
        width: 100,
    },
    {
        title: 'Extension',
        dataIndex: 'extension',
        width: 100,
    },
    {
        title: 'Employee Name',
        dataIndex: 'employeeName',
        width: 100,
    },{
        title: 'EmployeeCode',
        dataIndex: 'empCode',
        width: 100,
    },
    {
        title: 'Branch',
        dataIndex: 'branch',
        width: 100,
    },
    {
        title: 'Type Of Query',
        dataIndex: 'typeOfQuery',
        width: 100,
    }, 
    {
        title: 'Remarks',
        dataIndex: 'remarks',
        width: 100,
    },
    {
        title: 'Call Status',
        dataIndex: 'callStatus',
        width: 100,
    },
    {
        title: 'CallDirection',
        dataIndex: 'callDirection',
        width: 100,
    },


    {
        title: 'Call StartDate',
        dataIndex: 'startDate',
        width: 100,
    },
    {
        title: 'Call EndDate',
        dataIndex: 'endDate',
        width: 100,
    },{
        title: 'Call Drop',
        dataIndex: 'callDroped',
        width: 100,
    },{
        title: 'Duration',
        dataIndex: 'duration',
        width: 100,
    },{
        title: 'Call ConnectTime',
        dataIndex: 'Callconnecttime',
        width: 100,
    },    
    {
        title: 'Hold StartTime',
        dataIndex: 'holdStartTime',
        width: 100,
    },
    {
        title: 'Hold EndTime',
        dataIndex: 'holdEndTime',
        width: 100,
    },{
        title: 'Recording Path',
        dataIndex: 'recPath',
        width: 100,
    
    render(dataIndex) {
        return (
            <audio src={dataIndex} controls></audio>
            // <audio src="https://www.computerhope.com/jargon/m/example.mp3" controls></audio>
            // <p>{dataIndex}</p>

        )}

        }




];



    const initdeptvalues = {
        count: "5",
    }

    const [dept, setDept] = useState(initdeptvalues);

    useEffect(() => {
        const count = "5";
    }, []);

    const optionserviceLevel = {
        // fieldSeparator: ',',
        // quoteStrings: '"',
        // decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Report',

        // useTextFile: true,
        // useBom: true,
        // useKeysAsHeaders: true,
        headers: ['Agent Name','Phone No','Extension','Employee Name','Employee Code','Branch Name',
        'Type Of Query', 'Remarks', 'CallStartDate','CallEndDate','Call Drop','Call Direction','Duration','Hold Start Time','Hold End Time','Recording Path'] //<-- Won't work with useKeysAsHeaders present!
    };

    //Excel Export
    const exportExcelSL = () => {
        const csvExporter = new ExportToCsv(optionserviceLevel);
        csvExporter.generateCsv(SlList);
    }
    //Excel Export


    function pdftest() {
        const doc = new jsPDF()
        doc.text("WOMEN HELP LINE 181", 70, 10);
        doc.text("Service Level Report  From: " + dateofstart + " To: " + dateofend, 10, 20);

        doc.autoTable({ html: '#my-table' })
        doc.autoTable({
            head: [['Month', 'Total Calls', 'Calls answered within 20 Seconds', 'Calls Abandoned within 20 Seconds', 'Percentage']],
        })
        doc.autoTable({
            body: SlList,
        })

        // doc.addImage(imagedata, 'jpg', 0, 0, width, height)
        doc.text("Note: This is a System Generated pdf", 20, 100);

        doc.save('ServiceLevel.pdf')
    }


    return (

        <Auxiliary>

        <AdminHeader />
            <Widget styleName={`ant-col gx-bg-geekblue `}>
                <div className="gx-card-body">
                    <Row>
                        <Col span={24}>
                            <Row>
                                <h2 className="gx-text-white">Start Date: </h2>
                                <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                                    <DatePicker className="gx-mb-3 gx-w-100" selected={startofDate} showTime format={dateFormat}
                                        onChange={date => setStartOfDate(date)}
                                    />
                                </Col>

                                <h2 className="gx-text-white">End Date: </h2>
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
                       {/* <h1 className="gx-text-white">Service Level</h1>*/}
                        <Table className="gx-table-responsive" columns={serviceLevel} dataSource={SlList} pagination={{ pageSize: 10 }}
                        />
                        <Button className="gx-btn-orange  gx-mb-1" type="primary" onClick={exportExcelSL}> Export </Button>
                    </div>
                    {/* <Button onClick={pdftest}>Export Pdf</Button> */}

                </div>
            </Widget>

        </Auxiliary>
    );
};

export default WarRoomReport;

