import React from "react";
import { useState, useEffect } from 'react'
import { Col, Row, Card, Table, Checkbox, Radio } from 'antd';
import { Button, Form, Input, Select } from "antd";
import Auxiliary from "util/Auxiliary";
import CallDetailApi from "components/dashboard/CRM/CallDetailApi";
import Widget from "components/Widget/index";
import { Link, useHistory } from "react-router-dom";
import MonitorApi from "./MonitorApi";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import Dial from "components/dashboard/CRM/Dial";
import BargingApi from "./BargingApi";


const Option = Select.Option;
const RadioGroup = Radio.Group;

var checkflageextn = ""
var stateval = 1
var triggerflage = ""

const CallMonitor = () => {

  let [historyList, setHistoryList] = useState();
  const datax = [];

  let [monitorList2, setMonitorList2] = useState();
  const monitor2x = [];

  let history = useHistory();

  function clickforextn(a) {
    checkflageextn = a
  }

  const outgoingvalues = {
    channel: localStorage.getItem("extensiontype") + "/" + localStorage.getItem("extn"),
    context: localStorage.getItem("context"),
    phoneNo: "",
    prefix: localStorage.getItem("prefix"),
    extension: localStorage.getItem("extn"),
    priority: "1"
  }
  const [outgoing, setOutgoing] = useState(outgoingvalues);

  // radio button function
  function onChangeval(e) {
    stateval = e.target.value


    if (stateval == "Wispring") {
      var data = {
        exten: checkflageextn, //"just agent extension", //For ex. 3002
        channel: localStorage.getItem("extn"), //"just admin extension",// For ex.3001
        spyType: "whisper" //"listen"/"whisper"/"barge"
      }
      BargingApi.spy(data)
        .subscribe(response => {
        })
    }

    if (stateval == "Listen") {
      var data = {
        exten: checkflageextn, //"just agent extension", //For ex. 3002
        channel: localStorage.getItem("extn"), //"just admin extension",// For ex.3001
        spyType: "listen" //"listen"/"whisper"/"barge"
      }
      BargingApi.spy(data)
        .subscribe(response => {
        })
    }

    if (stateval == "Barging") {
      var data = {
        exten: checkflageextn, //"just agent extension", //For ex. 3002
        channel: localStorage.getItem("extn"), //"just admin extension",// For ex.3001
        spyType: "barge" //"listen"/"whisper"/"barge"
      }
      BargingApi.spy(data)
        .subscribe(response => {
        })
    }

  };

  // checkbox Wisper function
  function onchangewispercheck(e) {
    var data = {
      exten: checkflageextn, //"just agent extension", //For ex. 3002
      channel: localStorage.getItem("extn"), //"just admin extension",// For ex.3001
      spyType: "whisper" //"listen"/"whisper"/"barge"
    }
    BargingApi.spy(data)
      .subscribe(response => {
      })
  }

  // checkbox Listern function
  function onchangeListerncheck(e) {
    var data = {
      exten: checkflageextn, //"just agent extension", //For ex. 3002
      channel: localStorage.getItem("extn"), //"just admin extension",// For ex.3001
      spyType: "listen" //"listen"/"whisper"/"barge"
    }
    BargingApi.spy(data)
      .subscribe(response => {
      })
  }

  // checkbox barging function
  function onchangebargcheck(e) {
    var data = {
      exten: checkflageextn, //"just agent extension", //For ex. 3002
      channel: localStorage.getItem("extn"), //"just admin extension",// For ex.3001
      spyType: "barge" //"listen"/"whisper"/"barge"
    }
    BargingApi.spy(data)
      .subscribe(response => {
      })
  }

  //monitor 2

  var busyCount = ''
  var logoutCount = ''
  var talkCount = ''
  var loginCount = ''
  var freeCount = ''
  var smsInQue = ''
  var totalSms = ''
  var mailsInQue = ''
  var totalMails = ''

  let [busyCountval, setBusyCountVal] = useState({ busyval: '' })
  let [logoutCountval, setlLogoutCountVal] = useState({ logoutval: '' })
  let [talkCountval, setTalkCountVal] = useState({ talkval: '' })
  let [loginCountval, setLoginCountVal] = useState({ loginval: '' })
  let [freeCountval, setFreeCountVal] = useState({ freeval: '' })
  let [smsInQueval, setSmsInQueVal] = useState({ smsInval: '' })
  let [totalSmsval, setTotalSmsVal] = useState({ totalSmscountval: '' })
  let [mailsInQueval, setMailsInQueVal] = useState({ mailsInval: '' })
  let [totalMailsval, setTotalMailsVal] = useState({ totalMailsCountval: '' })




  //monitor and trigger
  useEffect(() => {
    var data = {
      extension: localStorage.getItem("extn")
    }
    MonitorApi.callmonitor(data)
      .subscribe(res => {
        for (let i = 0; i <= Object.keys(res.data.model).length - 1; i++) {
          datax.push({
            key: i,
            agentName: res.data.model[i].agentName,
            extension: res.data.model[i].extension,
            startTime: res.data.model[i].startTime,
            loginStatus: res.data.model[i].loginStatus,
            status: res.data.model[i].status,
            direction: res.data.model[i].direction,
            duration: res.data.model[i].duration,
            action:
              <div>
                <RadioGroup onChange={onChangeval}>
                  <Radio className="gx-text-green" onClick={() => clickforextn(res.data.model[i].extension)} value={"Wispring"}><strong>Whisper</strong></Radio>
                  <Radio className="gx-text-blue" onClick={() => clickforextn(res.data.model[i].extension)} value={"Listen"}><strong>Listen</strong></Radio>
                  <Radio className="gx-text-red" onClick={() => clickforextn(res.data.model[i].extension)} value={"Barging"}><strong>Barging</strong></Radio>
                  <Radio value={"clear"}><strong>Clear</strong></Radio>
                </RadioGroup>

                {/* <Checkbox className="gx-text-green" onClick={() => clickforextn(res.data.model[i].extension)} onChange={onchangewispercheck}><strong>Whisper</strong></Checkbox>
                <Checkbox className="gx-text-blue" onClick={() => clickforextn(res.data.model[i].extension)} onChange={onchangeListerncheck}><strong>Listen</strong></Checkbox>
                <Checkbox className="gx-text-red" onClick={() => clickforextn(res.data.model[i].extension)} onChange={onchangebargcheck}><strong>Barging</strong></Checkbox> */}

              </div>

          });
        }
        setHistoryList(datax);
      })

    MonitorApi.triggercallmonitor2()
      .subscribe(res => {
        triggerflage = res.data.count
      })



  });
  //call monitor 2
  useEffect(() => {
    MonitorApi.callmonitor2()
      .subscribe(res => {
        setBusyCountVal({ busyval: res.data.busyCount })
        setlLogoutCountVal({ logoutval: res.data.logoutCount })
        setTalkCountVal({ talkval: res.data.talkCount })
        setLoginCountVal({ loginval: res.data.loginCount })
        setFreeCountVal({ freeval: res.data.freeCount })
        setSmsInQueVal({ smsInval: res.data.smsInQue })
        setTotalSmsVal({ totalSmscountval: res.data.totalSms })
        setMailsInQueVal({ mailsInval: res.data.mailsInQue })
        setTotalMailsVal({ totalMailsCountval: res.data.totalMails })

        for (let i = 0; i <= Object.keys(res.data.QueueDetails).length - 1; i++) {
          monitor2x.push({
            key: i,
            queueName: res.data.QueueDetails[i].queueName,
            totalCallsInQueue: res.data.QueueDetails[i].totalCallsInQueue,
            abandonedCalls: res.data.QueueDetails[i].abandonedCalls,
            currentWaitingCalls: res.data.QueueDetails[i].currentWaitingCalls,
            strategy: res.data.QueueDetails[i].strategy,
            holdTime: res.data.QueueDetails[i].holdTime + " (Avg.Sec)",
            completedCalls: res.data.QueueDetails[i].completedCalls,
            talkTime: res.data.QueueDetails[i].talkTime + " (Avg.Sec)",

          });
        }
        setMonitorList2(monitor2x);

      })
  }, [triggerflage]);
  busyCount = busyCountval.busyval
  logoutCount = logoutCountval.logoutval
  talkCount = talkCountval.talkval
  loginCount = loginCountval.loginval
  freeCount = freeCountval.freeval
  smsInQue = smsInQueval.smsInval
  totalSms = totalSmsval.totalSmscountval
  mailsInQue = mailsInQueval.mailsInval
  totalMails = totalMailsval.totalMailsCountval


  const Option = Select.Option;

  {/* //Monitor table Column*/ }
  const columns = [

    {
      title: 'Agent Name',
      dataIndex: 'agentName',
      width: 200,
    }, {
      title: 'Extension',
      dataIndex: 'extension',
      width: 100,
    },
    {
      title: 'Login Time',
      dataIndex: 'startTime',
      width: 250,
    }, {
      title: 'Status',
      dataIndex: 'status',

      render(text, record) {
        return {
          props: {

            style: {
              color: "white", background: text === "Ready" ? "green" : text === "on-call" ? "blue" : text === "On-Call" ? "blue" : text === "Not Ready"

                ? "red" : text === "Wrapping" ? "orange" : text === "Hold" ? "orange" : "white"

            },
          },
          children: <div>{text}</div>
        };
      }

    }, {
      title: 'Call Direction',
      dataIndex: 'direction',
    }, {
      title: 'Duration',
      dataIndex: 'duration',
    },
    {
      title: 'Barging',
      dataIndex: 'action',
      width: 390,
    }
  ];

  {/* //Queue Status Table column*/ }
  const monitor2Column = [

    {
      title: 'Queue Name',
      dataIndex: 'queueName',
      width: 200,
    }, {
      title: 'Total Calls InQueue',
      dataIndex: 'totalCallsInQueue',
      width: 250,
    },
    {
      title: 'Abandoned Calls',
      dataIndex: 'abandonedCalls',
      width: 250,
    },
    {
      title: 'Current Waiting Calls',
      dataIndex: 'currentWaitingCalls',
      width: 250,
    },
    {
      title: 'Strategy',
      dataIndex: 'strategy',
      width: 250,
    },
    {
      title: 'Hold Time',
      dataIndex: 'holdTime',
      width: 250,
    },
    {
      title: 'Completed Calls',
      dataIndex: 'completedCalls',
      width: 250,
    },
    {
      title: 'Talk Time',
      dataIndex: 'talkTime',
      width: 250,
    }];


  const initdeptvalues = {
    count: "5",
  }

  const [dept, setDept] = useState(initdeptvalues);

  useEffect(() => {
    const count = "5";
  });


  function backtoadmin() {
    history.push("/admin")
  }



  return (

    <Auxiliary>
      <AdminHeader />
      <Row>
        <Col span={24}>
          <Row>
            <Col xl={4} lg={12} md={12} sm={12} xs={24} >

              {/* side card values */}
              <Card title="Total">
                {/* <Row>
                  <h3 className="gx-text-black">Calls: <span>0</span> </h3>
                </Row> */}
                <Row>
                  <h3 className="gx-text-black" >Email: <span>{totalMails}</span>  </h3>
                </Row>
                <Row>
                  <h3 className="gx-text-black">SMS: <label>{totalSms}</label>  </h3>
                </Row>
                <Row>
                  <h3 className="gx-text-black">WhatsApp: <label>0</label>  </h3>
                </Row>
                <Row>
                  <h3 className="gx-text-black">Live Chat: <label>0</label>  </h3>
                </Row>
              </Card>
              <Card title="In Queue">
                {/* <Row>
                  <h3 className="gx-text-black">Calls: <span>0</span> </h3>
                </Row> */}
                <Row>
                  <h3 className="gx-text-black" >Email: <span>{mailsInQue}</span>  </h3>
                </Row>
                <Row>
                  <h3 className="gx-text-black">SMS: <label>{smsInQue}</label>  </h3>
                </Row>
                <Row>
                  <h3 className="gx-text-black">WhatsApp: <label>0</label>  </h3>
                </Row>
                <Row>
                  <h3 className="gx-text-black">Live Chat: <label>0</label>  </h3>
                </Row>
              </Card>
            </Col>

            {/* Top Bar Card and Monitor Table */}
            <Col xl={20} lg={12} md={12} sm={12} xs={24} >
              <Row>
                {/* <Col xl={4} lg={12} md={12} sm={12} xs={24} >
                  <h3 className="gx-text-black"></h3>
                </Col> */}
                <Col xl={5} lg={12} md={12} sm={12} xs={24} >
                  <Widget styleName={`ant-col gx-bg-white `}>
                    <h3 className="gx-text-black">Logged In: {loginCount}</h3>
                  </Widget>
                </Col>
                <Col xl={4} lg={12} md={12} sm={12} xs={24} >
                  <Widget styleName={`ant-col gx-bg-white `} >
                    <h3 className="gx-text-black">Free: {freeCount}</h3>
                  </Widget>
                </Col>
                {/* <Col xl={4} lg={12} md={12} sm={12} xs={24} >
              <Widget styleName={`ant-col gx-bg-white `} >
                <h3 className="gx-text-black">Ringing: 1</h3>
              </Widget>
            </Col> */}
                <Col xl={6} lg={12} md={12} sm={12} xs={24} >
                  <Widget styleName={`ant-col gx-bg-white `} >
                    <h3 className="gx-text-black">On Talk: {talkCount}</h3>
                  </Widget>
                </Col>
                <Col xl={4} lg={12} md={12} sm={12} xs={24} >
                  <Widget styleName={`ant-col gx-bg-white `} >
                    <h3 className="gx-text-black">Busy: {busyCount}</h3>
                  </Widget>
                </Col>
                <Col xl={5} lg={12} md={12} sm={12} xs={24} >
                  <Widget styleName={`ant-col gx-bg-white `} >
                    <h3 className="gx-text-black">Logged Out: {logoutCount}</h3>
                  </Widget>
                </Col>
              </Row>

              {/* call monitor table */}
              <Table className="gx-table-responsive" columns={columns} dataSource={historyList} pagination={{ pageSize: 15 }}
              />

            </Col>

          </Row>
        </Col>
      </Row>

      {/* <Widget styleName={`ant-col gx-bg-grey`} > */}
      <h3 className="gx-text-white">Queue Status</h3>
      <Table className="gx-table-responsive" columns={monitor2Column} dataSource={monitorList2} pagination={{ pageSize: 15 }}
      />
      {/* </Widget> */}

      <Button className="gx-btn-secondary  gx-mb-1" onClick={backtoadmin}> Back </Button>

    </Auxiliary>
  );
};

export default CallMonitor;

