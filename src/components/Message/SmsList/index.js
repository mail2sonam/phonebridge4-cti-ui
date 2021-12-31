import React from "react";
import CustomScrollbars from 'util/CustomScrollbars'
import { useState, useEffect } from 'react'
import SmsListItem from "./SmsListItem";
import SmsApi from "../../dashboard/CRM/SmsApi";

const SmsList = ({ mails, onMailSelect, onMailChecked, onStartSelect }) => {


  const [smssubjectval, setSmsSubjectValue] = useState([]);
  useEffect(() => {
    var data = {
      status: "UNSEEN"
    }
    SmsApi.smsbyIsNew(data)
      .subscribe(res => {
        setSmsSubjectValue(res.data.model);
      })
  }, [])


  return (
    <div className="gx-module-list gx-mail-list">
      <CustomScrollbars className="gx-module-content-scroll">
        {smssubjectval.map((smssubjectval, index) =>
          <SmsListItem key={index} mail={smssubjectval} onMailSelect={onMailSelect} onMailChecked={onMailChecked}
            onStartSelect={onStartSelect} />
        )}
      </CustomScrollbars>
    </div>
  )
};

export default SmsList;
