import React, { useContext } from "react";
import { useState, useEffect } from 'react'
import { Col, Row, Card, Table } from 'antd';
import { Button, Form, Input, Select } from "antd";
import Auxiliary from "util/Auxiliary";
import CallDetailApi from "components/dashboard/CRM/CallDetailApi";
import axios, { post } from 'axios';
import CampaignApi from "./CampaignApi";
import { SubCatContext } from "./SubCatContext";
import { useHistory } from "react-router";
import IntlMessages from "util/IntlMessages";
import { NotificationContainer, NotificationManager } from "react-notifications";

const CampaignList = (props) => {

  let [historyList, setHistoryList] = useState();
  const datax = [];

  let history = useHistory();


  var campname = "";
  var campid = "";
  function onclicksubmit({ a, b }) {
    campname = a;
    campid = b;
    console.log(campname)
    console.log(campid)

  }

  function onFileChangeHandler(e) {
    e.preventDefault();
    console.log(campname)
    console.log(campid)
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('campaignId', campid);
    formData.append('campaignName', campname);
    axios({
      method: 'post',
      url: 'http://192.168.10.210:5001/eupraxia/file/upload',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
      // headers: { 'Content-Type': 'multipart/form-data', Authorization: "Bearer ".concat(localStorage.getItem("token")) }
    })
      .then(function (response) {
        console.log(response)
        if (response.data.responseCode == 200) {
          alert("File Uploaded");
        }
        else {
          alert("Error in File Upload");
        }
      },
        function (error) {
        });
  }
  const msg = useContext(SubCatContext);

  function clicktoEdit(b) {
    console.log(b);
    localStorage.setItem("editCamapignbyID", b);
    history.push("/campaignEdit")
  }

  function clicktoDelete(c) {
    console.log(c);

    var data = {
      campaignId: c,
    }

    CampaignApi.deleteCampById(data)
      .subscribe(response => {

        if (response.status == 200) {
          NotificationManager.success(<IntlMessages id="notification.successMessage" />, <IntlMessages
            id="notification.titleHere" />);
        }
        else {
          NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
            id="notification.clickMe" />);
        }

      })

  }

  useEffect(() => {
    var data = {
      extension: "sip",
    }
    CampaignApi.campaignList(data)
      .subscribe(res => {
        for (let i = 0; i <= Object.keys(res.data.model).length - 1; i++) {
          datax.push({
            key: i,
            campaignId: res.data.model[i].campaignId,
            campaignName: res.data.model[i].campaignName,
            dialMethod: res.data.model[i].dialMethod,
            wrapUpTime: res.data.model[i].wrapUpTime,
            didNumber: res.data.model[i].didNumber,
            callDirection: res.data.model[i].callDirection,
            queueName: res.data.model[i].queueName,
            trunk: res.data.model[i].trunk,
            departmentcode: res.data.model[i].departmentcode,
            files: <div>
              <input type="file" className="form-control" name="file"
                onClick={() => onclicksubmit({ a: res.data.model[i].campaignName, b: res.data.model[i].campaignId, })}
                onChange={onFileChangeHandler} />

              {/* <Button className="gx-btn-yellow  gx-mb-1"
               onClick={() => onclicksubmit({a: res.data.model[i].campaignName, b: res.data.model[i].campaignId,})} 
               type="primary">Submit</Button>  */}

            </div>,
            action: <Button className="gx-btn-success  gx-mb-1" id="name" name="name" onClick={() => clicktoEdit(res.data.model[i].campaignId)} type="primary">Edit</Button>,
            deleteaction: <Button className="gx-btn-danger  gx-mb-1" id="namedelete" name="namedelete" onClick={() => clicktoDelete(res.data.model[i].campaignId)} type="primary">Delete</Button>,

          });
        }
        setHistoryList(datax);
      })
  }, [msg]);

  const Option = Select.Option;

  {/* //table demo*/ }
  const columns = [{
    title: 'Campaign Name',
    dataIndex: 'campaignName',
  }, {
    title: 'Dial Method',
    dataIndex: 'dialMethod',
  }, {
    title: 'Wrap Up Time',
    dataIndex: 'wrapUpTime',
  }, {
    title: 'Call Direction',
    dataIndex: 'callDirection',
  }, {
    title: 'Queue Name',
    dataIndex: 'queueName',
  }, {
    title: 'Trunk',
    dataIndex: 'trunk',
  }, {
    title: 'DID Number',
    dataIndex: 'didNumber',
  }, {
    title: 'Department Code',
    dataIndex: 'departmentcode',
  }, {
    title: 'File Upload',
    dataIndex: 'files',
  }, {
    title: 'Action',
    dataIndex: 'action',
  }, {
    title: 'Delete Action',
    dataIndex: 'deleteaction',
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
      <h2 className="gx-text-white" >Campaign List</h2>

      <Table className="gx-table-responsive" columns={columns} dataSource={historyList} pagination={{ pageSize: 10 }}
      />

      <NotificationContainer />


    </Auxiliary>
  );
};

export default CampaignList;
