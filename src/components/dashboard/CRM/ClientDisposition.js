import React from "react";
import { useState, useEffect } from 'react'
import { Col, Row, Card, Table, DatePicker, TreeSelect } from 'antd';
import { Button, Form, Input, Select } from "antd";
import Auxiliary from "util/Auxiliary";
import { Link, useHistory } from "react-router-dom";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import { ExportToCsv } from 'export-to-csv';
// import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import ReportApi from "./ReportApi";
import Widget from "components/Widget/index";
import UserApi from "./UserApi";
import CampaignApi from "./CampaignApi";
import axios, { post } from 'axios';
import { i } from "react-dom-factories";

var ipName = "http://192.168.10.210:5001/eupraxia"


const Option = Select.Option;

const FormItem = Form.Item;

const ClientDisposition = (props) => {

    const TreeNode = TreeSelect.TreeNode;

    //datepicker 
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const [startofDate, setStartOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    var dateofstart = startofDate.toString();
    console.log(dateofstart)

    const [endofDate, setEndOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    var dateofend = endofDate.toString();
    console.log(dateofend)

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
        console.log(evt.target.name)
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

    const [extension, setExtension] = useState({ extension: '' });
    function onChangeExtension(value) {
        setExtension({
            extension: value,
        })
    }


    

    const [campname, setCampName] = useState({ campaname: '' });
    function onChangeCampaignName(value) {
        setCampName({
            campaname: value,
        })
    }

    const [agent, setAgent] = useState({ agentName: '' });
    function onChangeAgentName(value) {
        setAgent({
            agentName: value,
        })
    }
    let [SlList, setSlList] = useState();
    const sldata = [];

  function ReportSearch() {
        var data = {
            phoneNumber: searchon.phoneNumber,
            startDate: startofDate.toString(),
            endDate: endofDate.toString(),
            status: callStatus.callStatus,
            callDirection: calldirection.callDirection,
            extension: extension.extension,
            agentName: agent.agentName,
            campaignName: campname.campaname,
            callStatus: "report"
        }

     
    axios({
            method: 'Get',
                        
            url: ipName+'/report/getYamlDispoReport?startDate='+dateofstart+'&endDate='+dateofend,
           
        })
           .then(function (response) {  
                // console.log(response.data.data[i].agentName)        
                 for (let i = 0; i <= Object.keys(response.data).length - 1; i++) {
                   datax.push({
                       // key: i,
                        //callId:response.data[i].callId,
                        agentName: response.data[i].agentName,
                        phoneNo: response.data[i].phoneNo,
                        extension: response.data[i].extension,
                        customerName: response.data[i].customerName,
                        mainDispo: response.data[i].mainDispo,
                        subDispo: response.data[i].subDispo,
                        subSubDispo: response.data[i].subSubDispo,
                        district:response.data[i].district,
                        state:response.data[i].state,
                        country:response.data[i].country,
                        remarks: response.data[i].remarks,
                        callStatus: response.data[i].callStatus,
                        callDirection: response.data[i].callDirection,
                        callStartTime:response.data[i].callStartTime,
                        callEndTime: response.data[i].callEndTime,
                        duration: response.data[i].duration,
                        callDroped: response.data[i].callDroped,
                        callTime: response.data[i].callTime,
                       // camName: res.data.reports[i].camName,
                       //callConnectTime: response.data[i].callConnectTime,
                        holdStartTime: response.data[i].holdStartTime,
                        holdEndTime: response.data[i].holdEndTime,
                        recPath: response.data[i].recPath,
                    });
                  // console.log('getYamlDispoReport?startDate=+dateofstart+&endDate=+dateofend')

                }

                setHistoryList(datax);
            })

    }


    const Option = Select.Option;

    const columns = [
        {
            title: 'AgentName',
            dataIndex: 'agentName',
            width: 100,
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNo',
            width: 100,
        },
        
        {
            title: 'Extension',
            dataIndex: 'extension',
            width: 100,
        },
        {
            title: 'CustomerName',
            dataIndex: 'customerName',
            width: 100,
        },
        {
            title: 'Main Disposition',
            dataIndex: 'mainDispo',
            width: 100,
        },
        {
            title: 'Sub Disposition',
            dataIndex: 'subDispo',
            width: 150,
        },
        {
            title: 'Sub Sub Disposition',
            dataIndex: 'subSubDispo',
            width: 100,
        },
        {
            title: ' District',
            dataIndex: 'district',
            width: 100,
        },{
            title: ' State',
            dataIndex: 'state',
            width: 100,
        },{
            title: ' Country',
            dataIndex: 'country',
            width: 100,
        },
        {
            title: ' Details and Remarks',
            dataIndex: 'remarks',
            width: 100,
        },
         {
            title: 'CallStatus',
            dataIndex: 'callStatus',
            width: 100,
        },
        {
            title: 'Call Direction',
            dataIndex: 'callDirection',
            width: 100,

        }, 
        {
            title: 'Call Start Time',
            dataIndex: 'callStartTime',
            width: 100,

        }, {
            title: 'Call End Time',
            dataIndex: 'callEndTime',
            width: 100,

        },  {
            title: 'Duration',
            dataIndex: 'duration',
            width: 100,

        }, {
            title: 'CallDroped',
            dataIndex: 'callDroped',
            width: 100,

        }, 
       {
            title: 'Call Connect Time',
            dataIndex: 'callTime',
            width: 100,
        }, 
        {
            title: 'Hold Start Time',
            dataIndex: 'holdStartTime',
            width: 100,
        },
         {
            title: 'Hold End Time',
            dataIndex: 'holdEndTime',
            width: 100,
        },
        {
        
            title: "Recording Path",
            dataIndex: 'recPath',
            // dataIndex: 'https://www.computerhope.com/jargon/m/example.mp3',
            width: 250,

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
        title: 'Dailycall Report',

        // useTextFile: true,
        // useBom: true,
        // useKeysAsHeaders: true,
        headers: [ 'Agent Name', 'Phone Number','Extension', 'Customer Name', 'Main Disposition',
            'Sub Disposition', 'Sub Sub Disposition','District','State','Country', 'Details and Remarks', 'Call Status','Call Direction' ,'Call Start Time', 'Call End Time', 'Duration','Call Droped', 'Call Connect Time', 'Hold Start Time', 'Hold End Time', 'Recording Path'] //<-- Won't work with useKeysAsHeaders present!

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
                                            value={onChangecallStatus.value}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="Please select"
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={onChangecallStatus}
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
                                            value={onChangecallDirection.value}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="Please select"
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={onChangecallDirection}
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

export default ClientDisposition;

