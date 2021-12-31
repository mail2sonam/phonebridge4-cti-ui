import React, { useState, useEffect } from "react";
import { Col, Row, Card, Tabs } from 'antd';
import { Button, Form, Input, Select } from "antd";
import Auxiliary from "util/Auxiliary";
import CallHistorytab from "components/dashboard/CRM/CallHistorytab";
import MissedCallTab from "components/dashboard/CRM/MissedCallTab";
import ScheduledCallTab from "components/dashboard/CRM/ScheduledCallTab";
import ChatIntegrationTab from "components/dashboard/CRM/ChatIntegrationTab";
import EmailIntegrationTab from "components/dashboard/CRM/EmailIntegrationTab";
import CallDetailApi from "components/dashboard/CRM/CallDetailApi";
import SmsIntegrationTab from "./SmsIntegrationTab";
import MailApis from "./MailApi/MailApis";

const Option = Select.Option;
const TabPane = Tabs.TabPane;
const CallHistoryCard = () => {
  const callback = (key) => {
  };

  //ScheduledCall 
  const [schedule, setScheduled] = useState({
    id: '', phoneNumber: '', callStatus: '', callBackTime: '', extension: ''
  });

  const scheduledcalls = () => {
    var data = {
      extension: localStorage.getItem("extn")
    }
    CallDetailApi.ScheduledCall(data)
      .subscribe(response => {

        setScheduled({
          id: response.data.data[1].id,
          phoneNumber: response.data.data[1].phoneNumber,
          callStatus: response.data.data[1].callStatus,
          callBackTime: response.data.data[1].callBackTime,
          extension: response.data.data[1].extension,
        });
      })
  }
  //ScheduledCall


  function mailtabcheck() {
    var data = {
      userExtension: localStorage.getItem("extn")
    }
    MailApis.mailTab(data)
      .subscribe(res => {

      })
  }

  return (
    <Auxiliary>

      <h2 className="gx-text-white" > Call Details</h2>

      <Tabs onTabClick={callback} type="card" >

        <TabPane tab="Call History" key="1">

          <CallHistorytab />

        </TabPane>

        <TabPane tab="Missed Call" key="2" >

          <MissedCallTab />

        </TabPane>
        <TabPane tab="Scheduled Call" key="3">

          <ScheduledCallTab scheduleddetails={schedule} />

        </TabPane>

        <TabPane tab="Email" key="4">

          <EmailIntegrationTab scheduleddetails={schedule} />

        </TabPane>
        <TabPane tab="SMS" key="5">

          <SmsIntegrationTab scheduleddetails={schedule} />

        </TabPane>

        {/* <TabPane tab="Chat"  key="6">
            
            <ChatIntegrationTab scheduleddetails={schedule}/>
              
              </TabPane> */}
      </Tabs>

    </Auxiliary>
  );
};

export default CallHistoryCard;
