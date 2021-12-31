import React, { useContext } from "react";
import CustomScrollbars from 'util/CustomScrollbars'
import Auxiliary from "util/Auxiliary";
import { useState, useEffect } from 'react'
import SmsApi from "../dashboard/CRM/SmsApi";
import MsgNotificationItem from "./MsgNotificationItem";
import { MailContext } from "../dashboard/CRM/MailContext";
import { SmsContext } from "../dashboard/CRM/SmsContext";

const MessageNotification = () => {

  const msg = useContext(SmsContext)
  const [smssubjectval, setSmsSubjectValue] = useState([]);
  useEffect(() => {
    var data = {
      status: "UNSEEN"
    }

    // status: UNSEEN
    SmsApi.smsbyIsNew(data)
      .subscribe(res => {
        setSmsSubjectValue(res.data.model);
      })

  }, [msg]);

  return (
    <Auxiliary>
      <div className="gx-popover-header">
        <h3 className="gx-mb-0">UnRead Message</h3>
        <i className="gx-icon-btn icon icon-charvlet-down" />
      </div>
      <CustomScrollbars className="gx-popover-scroll">
        <ul className="gx-sub-popover">
          {smssubjectval.map((smssubjectval, id) => <MsgNotificationItem key={id}
            smssubjectList={smssubjectval} />)}

        </ul>
      </CustomScrollbars>
    </Auxiliary>
  )
};

export default MessageNotification;

