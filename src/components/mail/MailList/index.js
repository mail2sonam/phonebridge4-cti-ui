import React from "react";
import CustomScrollbars from 'util/CustomScrollbars'

import MailListItem from "./MailListItem";
import { useState, useEffect } from 'react'
import MailApis from "../../dashboard/CRM/MailApi/MailApis";


const MailList = ({mails, onMailSelect, onMailChecked, onStartSelect}) => {


  const [subjectval, setSubjectValue] = useState([]);
  useEffect(() => {
    var data = {
      userExtension: localStorage.getItem("extn")
    }
    MailApis.mailTab(data)
        .subscribe(res => {
            setSubjectValue(res.data.model);
        })
        
}, [])


  return (
    <div className="gx-module-list gx-mail-list">
      <CustomScrollbars className="gx-module-content-scroll">
        {subjectval.map((subjectval, index) =>
          <MailListItem key={index} mail={subjectval} onMailSelect={onMailSelect} onMailChecked={onMailChecked}
                        onStartSelect={onStartSelect}/>
        )}
      </CustomScrollbars>
    </div>
  )
};

export default MailList;
