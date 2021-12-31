import React from "react";
import { useState, useEffect } from 'react'
import { Col, Row, Card, Table, DatePicker, TreeSelect } from 'antd';
import { Button, Form, Input, Select } from "antd";
import Auxiliary from "util/Auxiliary";
import { Link, useHistory } from "react-router-dom";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import { ExportToCsv } from 'export-to-csv';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import ReportApi from "./ReportApi";
import Widget from "components/Widget/index";
import UserApi from "./UserApi";
import CampaignApi from "./CampaignApi";

const Option = Select.Option;

const FormItem = Form.Item;

const DialerReport = (props) => {

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

    const [searchon, setSearch] = useState({
        phoneNumber: '', startDate: '', endDate: '', callStatus: '', callDirection: '', extension: '',
        agentName: '', campaignName: ''
    });

    function handleSearch(evt) {
        const value = evt.target.value;
        setSearch({
            ...searchon,
            [evt.target.name]: value
        });
    }

    const [statusofcall, setStatusofCall] = useState({ statuscal: '' });
    function onChangeCallStatus(value) {
        setStatusofCall({
            statuscal: value,
        })
    }

    const [calldirection, setCallDirection] = useState({ dir: '' });
    function onChangeCallDirection(value) {
        setCallDirection({
            dir: value,
        })
    }


    const [extn, setExtn] = useState({ ext: '' });
    function onChangeExtension(value) {
        setExtn({
            ext: value,
        })
    }


    const [agent, setAgent] = useState({ agentnam: '' });
    function onChangeAgentName(value) {
        setAgent({
            agentnam: value,
        })
    }

    const [campname, setCampName] = useState({ campaname: '' });
    function onChangeCampaignName(value) {
        setCampName({
            campaname: value,
        })
    }




    function ReportSearch() {
        var data = {
            phoneNumber: searchon.phoneNumber,
            startDate: startofDate.toString(),
            endDate: endofDate.toString(),
            status: statusofcall.statuscal,
            callDirection: calldirection.dir,
            extension: extn.ext,
            agentName: agent.agentnam,
            campaignName: campname.campaname,
            callStatus: "report"
        }
        console.log(data)
        ReportApi.dailyWiseReport(data)
            .subscribe(res => {
                console.log(res)
                for (let i = 0; i <= Object.keys(res.data.reports).length - 1; i++) {
                    console.log(res.data.reports)
                    datax.push({
                        key: i,
                        agentName: res.data.reports[i].agentName,
                        //caseId: res.data.reports[i].caseId,
                        //docId: res.data.reports[i].docId,
                        phoneNo: res.data.reports[i].phoneNo,
                        cusName: res.data.reports[i].cusName,
                        extension: res.data.reports[i].extension,
                        dispo: res.data.reports[i].disposition,
                        //maindispo: res.data.reports[i].maindispo,
                        //subdispo: res.data.reports[i].subdispo,
                        //subsubdispo: res.data.reports[i].subsubdispo,
                        comments: res.data.reports[i].comments,
                        callStatus: res.data.reports[i].callStatus,
                        callStartTime: res.data.reports[i].callStartTime,
                        callEndTime: res.data.reports[i].callEndTime,
                        calldrop: res.data.reports[i].calldrop,
                        secondNumber: res.data.reports[i].secondNumber,
                        camName: res.data.reports[i].camName,
                        direction: res.data.reports[i].direction,
                        secondStatus: res.data.reports[i].secondStatus,
                        // callType: res.data.reports[i].callType,
                        // incidentdate: res.data.reports[i].incidentdate,
                        // incidentTime: res.data.reports[i].incidentTime,
                        duration: res.data.reports[i].duration,
                        // callStartTimeOnly: res.data.reports[i].callStartTimeOnly,
                        // callEndTimeOnly: res.data.reports[i].callEndTimeOnly,
                        callConnectTime: res.data.reports[i].callConnectTime,
                        holdStartTime: res.data.reports[i].holdStartTime,
                        holdEndTime: res.data.reports[i].holdEndTime,
                        recPath: res.data.reports[i].recPath,
                    });
                    console.log(res)

                }

                setHistoryList(datax);
            })

    }


    const Option = Select.Option;

    const columns = [
        {
            title: 'Agent Name',
            dataIndex: 'agentName',
            key: 'name',
            width: 100,
            fixed: 'left',
        },
         {
            title: 'Phone Number',
            dataIndex: 'phoneNo',
            key: 'name',
            width: 150,
        },
        {
            title: 'Customer Name',
            dataIndex: 'cusName',
            key: 'name',
            width: 150,
        },
        {
            title: 'Extension',
            dataIndex: 'extension',
            key: 'name',
            width: 100,

        },
        {
            title: 'Disposition',
            dataIndex: 'dispo',
            key: 'name',
            width: 150,
        },
        {
            title: 'Remarks',
            dataIndex: 'comments',
            key: 'name',
            width: 150,
        }, {
            title: 'Call Status',
            dataIndex: 'callStatus',
            key: 'name',
            width: 150,
        }, {
            title: 'Call Start Time',
            dataIndex: 'callStartTime',
            key: 'name',
            width: 100,

        }, {
            title: 'Call End Time',
            dataIndex: 'callEndTime',
            key: 'name',
            width: 100,

        },  {
            title: 'Call Drop',
            dataIndex: 'calldrop',
            key: 'name',
            width: 100,

        },{
            title: 'Second Number',
            dataIndex: 'secondNumber',
            key: 'name',
            width: 100,

        },  {
            title: 'Campaign Name',
            dataIndex: 'camName',
            key: 'name',
            width: 150,
        },
        {
            title: 'Call Direction',
            dataIndex: 'direction',
            key: 'name',
            width: 100,

        }, {
            title: 'Conference/Transfer',
            dataIndex: 'secondStatus',
            key: 'name',
            width: 150,

        }, {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'name',
            width: 100,

        },

        {
            title: 'Call Connect Time',
            dataIndex: 'callConnectTime',
            key: 'name',
            width: 150,
        }, {
            title: 'Hold Start Time',
            dataIndex: 'holdStartTime',
            key: 'name',
            width: 100,
        }, {
            title: 'Hold End Time',
            dataIndex: 'holdEndTime',
            key: 'name',
            width: 100,
        },

        {

            title: "Recording Path",
            dataIndex: 'recPath',
            // dataIndex: 'https://www.computerhope.com/jargon/m/example.mp3',
             key: 'name',
            fixed: 'right',
            width: 300,

            render(dataIndex) {
                return (
                    <audio src={dataIndex} controls></audio>
                    // <audio src="https://www.computerhope.com/jargon/m/example.mp3" controls></audio>
                    // <p>{dataIndex}</p>

                )
            }


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

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const onFinish = values => {
        ReportSearch();
        console.log('Received values of form: ', values);
    };


    //get user api details
    const [usernamevalue, setUsernameVal] = useState([]);
    useEffect(() => {
        UserApi.userList()
            .subscribe(res => {
                const maincat = res;
                let tempList = [];
                maincat.data.model.forEach(element => {
                    tempList.push(element.username);
                });
                setUsernameVal(tempList);
                console.log(res)
            })
    }, [])


    const [userextnvalue, setUserExtnVal] = useState([]);
    useEffect(() => {
        UserApi.userList()
            .subscribe(res => {
                const userextn = res;
                let tempListextn = [];
                userextn.data.model.forEach(element => {
                    tempListextn.push(element.userextension);
                });
                setUserExtnVal(tempListextn);
                console.log(res)
            })
    }, [])


    //get user api details

    //get campaign api details
    const [campnamevalue, setCampNameVal] = useState([]);
    useEffect(() => {
        CampaignApi.campaignList()
            .subscribe(res => {
                const cName = res;
                let tempCampName = [];
                cName.data.model.forEach(element => {
                    tempCampName.push(element.campaignName);
                });
                setCampNameVal(tempCampName);
                console.log(res)
            })
    }, [])


    //get campaign api details





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
        headers: ['Sl.No', 'Agent Name', 'Phone Number', 'Customer Name', 'Extension', 'Disposition',  'Remarks', 'Call Status', 'Call Start Time', 'Call End Time', 'Call Drop',
            'Second Number', 'Campaign Name', 'Call Direction', 'Conference/Transfer', 'Duration', 'Call Connect Time', 'Hold Start Time', 'Hold End Time', 'Recording Path'] //<-- Won't work with useKeysAsHeaders present!

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

                    <Row>
                        <Col span={24}>

                            <Form
                                initialValues={{ remember: true }}
                                name="basic"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                layout="inline">

                                <Row>


                                    <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                        <h2 className="gx-text-white">Phone Number: </h2>
                                        <Input id="phoneNumber" name="phoneNumber" placeholder="Phone Number" value={handleSearch.value} onChange={handleSearch} />
                                    </Col>


                                    <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                        <h2 className="gx-text-white">Start Date: </h2>
                                        <FormItem rules={[{ required: true, message: 'Please Enter StartDate' }]} name="startdate">
                                            <DatePicker className="gx-mb-3 gx-w-100" selected={startofDate} showTime format={dateFormat}
                                                onChange={date => setStartOfDate(date)}
                                            />
                                        </FormItem>
                                    </Col>


                                    <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                        <h2 className="gx-text-white">End Date: </h2>
                                        <FormItem rules={[{ required: true, message: 'Please Enter EndDate' }]} name="enddate">
                                            <DatePicker className="gx-mb-3 gx-w-100" selected={endofDate} showTime format={dateFormat}
                                                onChange={date => setEndOfDate(date)}
                                            />
                                        </FormItem>
                                    </Col>

                                    <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                        <h2 className="gx-text-white">Status: </h2>
                                        <TreeSelect className="gx-w-100"
                                            showSearch
                                            value={onChangeCallStatus.value}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="Please select"
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={onChangeCallStatus}
                                        >

                                            <TreeNode value="ANSWER" title="ANSWER" key="153">
                                            </TreeNode>
                                            <TreeNode value="NOT ANSWER" title="NOT ANSWER" key="154">
                                            </TreeNode>

                                        </TreeSelect>
                                    </Col>

                                    <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                        <h2 className="gx-text-white">Call Direction: </h2>
                                        <TreeSelect className="gx-w-100"
                                            showSearch
                                            value={onChangeCallDirection.value}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="Please select"
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={onChangeCallDirection}
                                        >

                                            <TreeNode value="OutBound" title="OutBound" key="153">
                                            </TreeNode>
                                            <TreeNode value="InBound" title="InBound" key="154">
                                            </TreeNode>

                                        </TreeSelect>
                                    </Col>

                                    <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                        <h2 className="gx-text-white">Extension: </h2>
                                        <TreeSelect className="gx-w-100"
                                            showSearch
                                            value={onChangeExtension.value}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="Please select"
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={onChangeExtension}
                                        >

                                            {
                                                userextnvalue.map((userextension, id) =>

                                                    <TreeNode value={userextension} key={id} title={userextension} >
                                                    </TreeNode>
                                                )
                                            }


                                        </TreeSelect>
                                    </Col>

                                    <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                        <h2 className="gx-text-white">Agent Name: </h2>
                                        <TreeSelect className="gx-w-100"
                                            showSearch
                                            value={onChangeAgentName.value}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="Please select"
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={onChangeAgentName}
                                        >

                                            {
                                                usernamevalue.map((username, id) =>

                                                    <TreeNode value={username} key={id} title={username} >
                                                    </TreeNode>
                                                )
                                            }


                                        </TreeSelect>
                                    </Col>


                                    <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                        <h2 className="gx-text-white">Campaign Name: </h2>
                                        <TreeSelect className="gx-w-100"
                                            showSearch
                                            value={onChangeCampaignName.value}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="Please select"
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={onChangeCampaignName}
                                        >

                                            {
                                                campnamevalue.map((campaignName, id) =>

                                                    <TreeNode value={campaignName} key={id} title={campaignName} >
                                                    </TreeNode>
                                                )
                                            }


                                        </TreeSelect>
                                    </Col>

                                </Row>

                                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                    <h2 className="gx-text-white">&nbsp; </h2>
                                    <Button className="gx-mb-0" className="gx-btn-orange  gx-mb-1" htmlType="submit"> Search </Button>
                                    <Button className="gx-mb-0" className="gx-btn-orange  gx-mb-1" onClick={exportExcel}> Export </Button>

                                </Col>

                            </Form>
                        </Col>

                    </Row>

                    <Table
                        columns={columns}
                        dataSource={historyList}
                        bordered
                        size="large"
                        scroll={{ x: '230%', y: 340 }}
                    />



                    {/* <audio src="https://www.computerhope.com/jargon/m/example.mp3" controls></audio>


<a className="gx-text-black" href="https://www.computerhope.com/jargon/m/example.mp3">local auido</a> */}


                    {/* <audio controls >
        <source src="file:///C:/Users/ETPL/Downloads/file_example_MP3_1MG.mp3" />
      </audio> */}


                </div>
            </Widget>
        </Auxiliary>
    );
};

export default DialerReport;

