import React from "react";
import { useState, useEffect } from 'react'
import Icon from '@ant-design/icons';
import axios from 'axios';
import { Col, Row, Card, Table, Tooltip } from 'antd';
import { Button, Form, Input, Select } from "antd";
import Auxiliary from "util/Auxiliary";
import Widget from "components/Widget/index";
import CallDetailApi from "components/dashboard/CRM/CallDetailApi";
import SmsApi from "./SmsApi";
import Dial from "components/dashboard/CRM/Dial";
import { stubString } from "lodash";

const SmsIntegrationTab = (props) => {

  let [scheduleList, setScheduledList] = useState();

  const datax = [];

  const outgoingvalues = {
    channel: localStorage.getItem("extensiontype") + "/" + localStorage.getItem("extn"),
    context: localStorage.getItem("context"),
    phoneNo: "",
    prefix: localStorage.getItem("prefix"),
    extension: localStorage.getItem("extn"),
    priority: "1"
  }

  const [outgoing, setOutgoing] = useState(outgoingvalues);

  const clicktodial = (a, b) => {
    // let str = a.toString();
    localStorage.setItem("callForSms", a)
    localStorage.setItem("getSmsByCaseId", b)
    localStorage.setItem("smsflage", 0)


    //      var subStr = str.substr(2, 12);
    //     var data = {
    //       channel: localStorage.getItem("extensiontype") + "/" + localStorage.getItem("extn"),
    //       context: localStorage.getItem("context"),
    //       phoneNo: subStr,
    //       prefix: localStorage.getItem("prefix"),
    //       extension: localStorage.getItem("extn"),
    //       priority: "1",
    //       dialMethod: "outgoing",
    //       callSource: "sms"
    //     }
    //     Dial.dial(data)
    //       .subscribe(response => {
    //         setOutgoing({
    //           channel: localStorage.getItem("extensiontype") + "/" + localStorage.getItem("extn"),
    //           context: localStorage.getItem("context"),
    //           phoneNo: response.data.phoneNo,
    //           prefix: response.data.prefix,
    //           extension: localStorage.getItem("extn"),
    //           priority: "1",
    //           dialMethod: "outgoing"

    //         });
    //         // setSubmitted(true)
    //       })
  }

  const [smscountByExtn, setSmsCountByExtn] = useState({ countByExtn: '' });
  var smscountExtn = smscountByExtn.countByExtn
  localStorage.setItem("displaysmscountByExtn", smscountExtn)

  useEffect(() => {
    var data = {
      userExtension: localStorage.getItem("extn")
    }
    SmsApi.smsByExtn(data)
      .subscribe(res => {

        //Object.keys(res.data).length>0
        // for(let i=0;i<= (Object.keys(res.data.model).length-1);i++){
        for (let i = 0; i <= 0; i++) {

          if (res.data.model[i].messageId != "") {
            datax.push({
              key: i,
              caseId: res.data.model[i].caseId,
              messageId: res.data.model[i].messageId,
              number: res.data.model[i].number,
              message: res.data.model[i].message,
              date: res.data.model[i].date,
              action: <Button className="gx-btn-success  gx-mb-1" id="name" name="name" onClick={() => clicktodial(res.data.model[i].number, res.data.model[i].caseId)} type="primary"  >Check Out </Button>,

            });
          }
          else if (res.data.model[i].messageId == "") {
            datax.push({
              key: i,
              caseId: res.data.model[i].caseId,
              messageId: res.data.model[i].messageId,
              number: res.data.model[i].number,
              message: res.data.model[i].message,
              date: res.data.model[i].date,
              action: <null />
            });
          }
        }
        setScheduledList(datax);
      })

    var data = {
      userExtension: localStorage.getItem("extn")
    }
    SmsApi.smsCountByExtn(data)
      .subscribe(response => {
        setSmsCountByExtn({
          countByExtn: response.data.SmsCount
        })
      })

  }, [localStorage.getItem("smsCountByExtn")]);

  const Option = Select.Option;

  {/* //table demo*/ }
  const columns = [{
    title: 'Message Id',
    dataIndex: 'messageId',

  }, {
    title: 'Phone Number',
    dataIndex: 'number',
  }, {
    title: 'Message',
    dataIndex: 'message',
    width: 200,
  }, {
    title: 'Date',
    dataIndex: 'date',
  }, {
    title: 'Action',
    dataIndex: 'action',
  }];

  const initdeptvalues = {
    count: "5",
  }

  const [dept, setDept] = useState(initdeptvalues);

  useEffect(() => {
    const count = "5";
  }, []);




  return (

    <Auxiliary>

      <h1 className="gx-text-orange">Assigned SMS: {localStorage.getItem("displaysmscountByExtn")}</h1>

      <Table columns={columns} dataSource={scheduleList} pagination={{ pageSize: 3 }}
      />



    </Auxiliary>
  );
};

export default SmsIntegrationTab;
