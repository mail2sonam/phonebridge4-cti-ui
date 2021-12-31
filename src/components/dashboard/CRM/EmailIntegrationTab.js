import React from "react";
import { useState, useEffect } from 'react'
import Icon from '@ant-design/icons';
import axios from 'axios';
import { Col, Row, Card, Table, Tooltip } from 'antd';
import { Button, Form, Input, Select } from "antd";
import Auxiliary from "util/Auxiliary";
import Widget from "components/Widget/index";
import CallDetailApi from "components/dashboard/CRM/CallDetailApi";
import MailApis from "./MailApi/MailApis";
import { useHistory } from "react-router-dom";


const EmailIntegrationTab = ({ mail, onMailSelect, onMailChecked, onStartSelect }) => {

  let [scheduleList, setScheduledList] = useState();

  const datax = [];
  let history = useHistory();


  function sendmail(a) {
    localStorage.setItem("filename", "")
    localStorage.setItem("base64values", "")

    localStorage.setItem("getMailByCaseId", a)
    localStorage.setItem("mailflage", 0)

    // history.push("/agentMailPage");
  }

  const [mailcountByExtn, setMailCountByExtn] = useState({ countByExtn: '' });
  var countExtn = mailcountByExtn.countByExtn
  localStorage.setItem("displaymailCountByExtnn", countExtn)

  useEffect(() => {
    var data = {
      userExtension: localStorage.getItem("extn")
    }

    MailApis.mailTab(data)
      .subscribe(res => {
        //Object.keys(res.data).length>0
        // for(let i=0;i<= (Object.keys(res.data.model).length-1);i++){
        for (let i = 0; i <= 0; i++) {
          if (res.data.model[i].caseId != "") {
            datax.push({
              key: i,
              id: res.data.model[i].id,
              caseId: res.data.model[i].caseId,
              from: res.data.model[i].from,
              subject: res.data.model[i].subject,
              sentDate: res.data.model[i].sentDate,
              body: res.data.model[i].body,

              action: <Button className="gx-btn-success  gx-mb-1" id="name" name="name" onClick={() => sendmail(res.data.model[i].caseId)} type="primary">Check Out</Button>


            });
          }
          else if (res.data.model[i].caseId == "") {
            datax.push({
              key: i,
              id: res.data.model[i].id,
              caseId: res.data.model[i].caseId,
              from: res.data.model[i].from,
              subject: res.data.model[i].subject,
              sentDate: res.data.model[i].sentDate,
              body: res.data.model[i].body,
              action: <null />
            });
          }
        }
        setScheduledList(datax);
      })

    var data = {
      userExtension: localStorage.getItem("extn")
    }
    MailApis.mailCountByExtn(data)
      .subscribe(response => {
        setMailCountByExtn({
          countByExtn: response.data.MailCount
        })
      })

  }, [localStorage.getItem("mailCountByExtn")]);

  const Option = Select.Option;

  {/* //table demo*/ }
  const columns = [
    {
      title: 'From EmailID',
      dataIndex: 'from',

    }, {
      title: 'Subject',
      dataIndex: 'subject',
    }, {
      title: 'Sent Date',
      dataIndex: 'sentDate',
    },
    // {
    //   title: 'Body',
    //   dataIndex: 'body',
    //   width: 200,
    // }, 
    {
      title: 'Action',
      dataIndex: 'action',
    }];

  const initdeptvalues = {
    count: "1",
  }

  const [dept, setDept] = useState(initdeptvalues);

  useEffect(() => {
    const count = "5";
  }, []);




  return (

    <Auxiliary>

      <h1 className="gx-text-orange">Assigned Mail: {localStorage.getItem("displaymailCountByExtnn")}</h1>

      <Table columns={columns} dataSource={scheduleList} pagination={{ pageSize: 3 }}
      />



    </Auxiliary>
  );
};

export default EmailIntegrationTab;
