import React, { useContext } from "react";
import { useState, useEffect } from 'react'
import { Col, Row, Card, Table } from 'antd';
import { Button, Form, Input, Select } from "antd";
import Auxiliary from "util/Auxiliary";
import CallDetailApi from "components/dashboard/CRM/CallDetailApi";
import UserApi from "./UserApi";
import { ExportToCsv } from 'export-to-csv';
import { SubCatContext } from "./SubCatContext";
import { useHistory } from "react-router";
import axios, { post } from 'axios';
import IntlMessages from "util/IntlMessages";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { render } from "@testing-library/react";

const UserList = (props) => {

  var msg = useContext(SubCatContext);
  let [historyList, setHistoryList] = useState();
  const datax = [];

  let history = useHistory();

  const clicktoEdit = (a) => {
    console.log(a);
    localStorage.setItem("editUserbyID", a);
    history.push("/userEdit")
  }

  function clicktoDelete(c) {
    localStorage.setItem("refreshuserlist", c)
    axios({
      method: 'get',
      url: "http://192.168.10.210:5001/eupraxia"+"/user/delete/" + c,
      headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) }
      // data: "",
    })
      .then(response => {
        //handle success
        console.log(axios.data)
        console.log(response.data);

        if (response.status == 200) {
          NotificationManager.success(<IntlMessages id="notification.successMessage" />, <IntlMessages
            id="notification.titleHere" />);
          localStorage.setItem("updatelist", c)
        }
        else {
          NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
            id="notification.clickMe" />);
        }

      },
        function (error) {
          // handle error 
        });
  }


  useEffect(() => {
    var data = {
      extension: "sip",
    }
    UserApi.userList(data)
      .subscribe(res => {
        console.log(Object.keys(res.data.model).length - 1)
        for (let i = 0; i <= Object.keys(res.data.model).length - 1; i++) {
          datax.push({
            key: i,
            id: res.data.model[i].id,
            username: res.data.model[i].username,
            userextension: res.data.model[i].userextension,
            usertype: res.data.model[i].usertype,
            password: res.data.model[i].password,
            branchid: res.data.model[i].branchid,
            prefix: res.data.model[i].prefix,
            email: res.data.model[i].email,
            extensiontype: res.data.model[i].extensiontype,
            departmentcode: res.data.model[i].departmentcode,
            callStatus: res.data.model[i].callStatus,
            action: <Button className="gx-btn-success  gx-mb-1" id="name" name="name" onClick={() => clicktoEdit(res.data.model[i].id)} type="primary">Edit</Button>,
            deleteaction: <Button className="gx-btn-danger  gx-mb-1" id="namedelete" name="namedelete" onClick={() => clicktoDelete(res.data.model[i].id)} type="primary">Delete</Button>,

          });
        }
        setHistoryList(datax);
      })

  }, [msg]);


  const Option = Select.Option;

  {/* //table demo*/ }
  const columns = [{
    title: 'User Name',
    dataIndex: 'username',
    width: 250,
  }, {
    title: 'Extension',
    dataIndex: 'userextension',
  }, {
    title: 'User Type',
    dataIndex: 'usertype',
  }, {
    title: 'Password',
    dataIndex: 'password',
  }, {
    title: 'Extension Type',
    dataIndex: 'extensiontype',
  }, {
    title: 'Branch ID',
    dataIndex: 'branchid',
  }, {
    title: 'Prefix',
    dataIndex: 'prefix',
  }, {
    title: 'Email Id',
    dataIndex: 'email',
  }, {
    title: 'Department Code',
    dataIndex: 'departmentcode',
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




  const options = {
    // fieldSeparator: ',',
    // quoteStrings: '"',
    // decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'User Details',

    // useTextFile: true,
    // useBom: true,
    // useKeysAsHeaders: true,
    headers: ['Sl.No', 'User Name', 'Extension', 'User Type', 'Password'] //<-- Won't work with useKeysAsHeaders present!
  };


  //Excel Export
  const exportExcel = () => {
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(historyList);
  }
  //Excel Export



  return (

    <Auxiliary>

      <h2 className="gx-text-white" >User List</h2>
      <Table className="gx-table-responsive" columns={columns} dataSource={historyList} pagination={{ pageSize: 10 }}
      />
      <NotificationContainer />

      <Button className="gx-btn-orange  gx-mb-1" type="primary" onClick={exportExcel}> Export </Button>
    </Auxiliary>
  );
};

export default UserList;
