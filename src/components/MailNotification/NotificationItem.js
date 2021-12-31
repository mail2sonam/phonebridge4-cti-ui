import React from "react";
import { Avatar } from "antd";
import TestMail from "../dashboard/CRM/Testmailpage";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import MailApis from "../dashboard/CRM/MailApi/MailApis";

const NotificationItem = ({ subjectList }) => {
  const { subject, id, sentDate } = subjectList;

  let history = useHistory();

  function directToMail() {
    var data = {
      userExtension: localStorage.getItem("extn"),
      id: id
    }
    MailApis.mailAssign(data)
      .subscribe(res => {

      })

    // history.push("/agentMailPage");
  }

  function reloadMail() {
    MailApis.mailCheckout()
      .subscribe(res => {
      })
  }
  return (
    <li className="gx-media">
      {/* <div className="gx-user-thumb gx-mr-3">
        <Avatar className="gx-size-40"
                alt={image}
                src={image}/>
        {badge > 0 ? <span className="gx-badge gx-badge-danger gx-text-white gx-rounded-circle">{badge}</span> : null}
      </div> */}
      <div className="gx-media-body">
        <div className="gx-flex-row gx-justify-content-between gx-align-items-center">
          {/* <h5 className="gx-text-capitalize gx-user-name gx-mb-0"><span className="gx-link">{from}</span></h5> */}
          {/* <span className="gx-meta-date"><small>{time}</small></span> */}
        </div>
        <p className="gx-fs-sm">{subject}</p>
        <p className="gx-fs-sm">{sentDate}</p>
        <Button className="gx-btn-success  gx-mb-1" onClick={directToMail}>Accept</Button>
        {/* <Button onClick={reloadMail}> Reload</Button> */}
        {/* <span className="gx-btn gx-btn-sm gx-top2 gx-text-muted"><i className="icon icon-reply gx-pr-2"/>Replyss</span> */}
        {/* <span className="gx-btn gx-btn-sm gx-top2 gx-text-muted"><i
          className="icon icon-custom-view gx-pr-2"/>Reload</span> */}
      </div>
    </li>
  );
};

export default NotificationItem;
