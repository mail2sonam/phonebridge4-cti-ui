import React from "react";
import { Col, Row, Card, Checkbox, TreeSelect, DatePicker, TimePicker } from 'antd';
import { Button, Form, Input, InputNumber } from "antd";
import { useState, useEffect, useContext } from 'react'
import DispositionApi from "components/dashboard/CRM/DispositionApi";
import 'react-dropdown-tree-select/dist/styles.css'
import Select from 'react-select'
import moment from "moment";
import { UserContext } from "./UserContext";
import Widget from "components/Widget/index";
import UserApi from "components/dashboard/CRM/UserApi";
import AdminHorizontalNav from "../../../containers/Topbar/AdminHorizontalNav";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import UserList from "./UserList";

const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;

function UserAdd() {

  const [saveuser, setSaveUser] = useState({
    username: "", userextension: "", extensionstatus: "", onbreak: "", popupstatus: "", usertype: "",
    password: "", context: "", callstatus: "", branchid: "", prefix: "", extensiontype: "", email: "", ivruser: "", departmentcode: ""
  });

  function handleChangeUserSave(evt) {
    const value = evt.target.value;
    setSaveUser({
      ...saveuser,
      [evt.target.name]: value
    });
  }

  function handlerUserType(value) {
    saveuser.usertype = value;
  }
  function handlerIvrUser(e) {
    saveuser.ivruser = e.target.checked;
  }
  function handlerExtnType(value) {
    saveuser.extensiontype = value;
  }



  function saveuserme() {
    var data = {
      username: saveuser.username,
      userextension: saveuser.userextension,
      extensionstatus: saveuser.extensionstatus,
      onbreak: saveuser.onbreak,
      popupstatus: saveuser.popupstatus,
      usertype: saveuser.usertype,
      password: saveuser.password,
      context: saveuser.context,
      callstatus: saveuser.callstatus,
      branchid: saveuser.branchid,
      prefix: saveuser.prefix,
      extensiontype: saveuser.extensiontype,
      email: saveuser.email,
      ivruser: saveuser.ivruser,
      departmentcode: "ppp",
    }
    UserApi.addUser(data)
      .subscribe(response => {

        setSaveUser({
          username: response.data.username,
          userextension: response.data.userextension,
          extensionstatus: response.data.extensionstatus,
          onbreak: response.data.onbreak,
          popupstatus: response.data.popupstatus,
          usertype: response.data.usertype,
          password: response.data.password,
          context: response.data.context,
          callstatus: response.data.callstatus,
          branchid: response.data.branchid,
          prefix: response.data.prefix,
          extensiontype: response.data.extensiontype,
          email: response.data.email,
          ivruser: response.data.ivruser,
          departmentcode: response.data.departmentcode,
        })

      })

  }

  const onFinishFailed = errorInfo => {

  };

  const onFinish = values => {

  };


  return (
    <div>
      <AdminHeader />
      <Form
        initialValues={{ remember: true }}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="inline">

        <Col xl={24} lg={12} md={12} sm={12} xs={24}>

          <Widget styleName={`ant-col gx-bg-geekblue `}>
            <h2 className="gx-text-white" >Add User</h2>
            <Row>

              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >User Name</h2>
                <FormItem>
                  <Input id="username" name="username" placeholder="username" value={saveuser.username} onChange={handleChangeUserSave} />
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >User Extension</h2>
                <FormItem>
                  <Input id="userextension" name="userextension" placeholder="userextension" value={saveuser.userextension} onChange={handleChangeUserSave} />
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >User Type</h2>
                <FormItem>
                  <TreeSelect className="gx-w-100"
                    showSearch
                    value={handlerUserType.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={handlerUserType}
                  >

                    <TreeNode value="agent" title="Agent" key="0">
                    </TreeNode>
                    <TreeNode value="Admin" title="Admin" key="1">
                    </TreeNode>
                    <TreeNode value="Executive " title="Executive " key="5">
                    </TreeNode>
                    <TreeNode value="FollowUp" title="FollowUp" key="4">
                    </TreeNode>
                    </TreeSelect>
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >Password</h2>
                <FormItem >
                  <Input type="text" id="password" name="password" placeholder="password" value={saveuser.password} onChange={handleChangeUserSave} />
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >Context</h2>
                <FormItem >
                  <Input id="context" name="context" placeholder="context" value={saveuser.context} onChange={handleChangeUserSave} />
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >Branch Id</h2>
                <FormItem>
                  <Input id="branchid" name="branchid" placeholder="branchid" value={saveuser.branchid} onChange={handleChangeUserSave} />
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >Ivr User</h2>
                <FormItem >
                  <Checkbox onChange={handlerIvrUser}></Checkbox>
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >Prefix</h2>
                <FormItem >
                  <Input id="prefix" name="prefix" placeholder="prefix" value={saveuser.prefix} onChange={handleChangeUserSave} />
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >Extension Type</h2>
                <FormItem >
                  <TreeSelect className="gx-w-100"
                    showSearch
                    value={handlerExtnType.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={handlerExtnType}
                  >

                    <TreeNode value="SIP" title="SIP" key="2">
                    </TreeNode>
                    <TreeNode value="Local" title="Local" key="3">
                    </TreeNode>
                  </TreeSelect>                        </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >Email</h2>
                <FormItem >
                  <Input id="email" name="email" placeholder="email" value={saveuser.email} onChange={handleChangeUserSave} />
                </FormItem>
              </Col>

              <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                <FormItem>
                  <Button className="gx-mb-0"
                    className="gx-btn-orange  gx-mb-1"
                    type="primary"

                    onClick={saveuserme}
                  >
                    Submit
                  </Button>
                </FormItem>
              </Col>
            </Row>
          </Widget>
        </Col>
      </Form>

      {/* ListUser */}

      <UserList />

      {/* ListUser */}

    </div>
  );

}

export default UserAdd;