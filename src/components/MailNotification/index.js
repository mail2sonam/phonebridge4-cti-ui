import React, { useContext } from "react";
import NotificationItem from "./NotificationItem";
import { notifications } from "./data";
import CustomScrollbars from 'util/CustomScrollbars'
import Auxiliary from "util/Auxiliary";
import TestMail from "../dashboard/CRM/Testmailpage";
import { historyList } from "./subjectData";
import MailApis from "../dashboard/CRM/MailApi/MailApis";
import { useState, useEffect } from 'react'
import { MailContext } from "../dashboard/CRM/MailContext";

const MailNotification = () => {

  const msg = useContext(MailContext)
  const [subjectval, setSubjectValue] = useState([]);
  useEffect(() => {

    MailApis.mailSubject()
      .subscribe(res => {
        setSubjectValue(res.data.Result);
      })

  }, [msg]);

  return (
    <Auxiliary>
      <div className="gx-popover-header">
        <h3 className="gx-mb-0">UnRead Mails</h3>
        <i className="gx-icon-btn icon icon-charvlet-down" />
      </div>
      <CustomScrollbars className="gx-popover-scroll">
        <ul className="gx-sub-popover">
          {subjectval.map((subjectval, id) => <NotificationItem key={id}
            subjectList={subjectval} />)}

        </ul>
      </CustomScrollbars>
    </Auxiliary>
  )
};

export default MailNotification;

