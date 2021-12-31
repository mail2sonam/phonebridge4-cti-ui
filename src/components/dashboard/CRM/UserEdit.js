import React from "react";
import { Col, Row, Card, Checkbox, TreeSelect, DatePicker, TimePicker } from 'antd';
import { Button, Form, Input, InputNumber } from "antd";
import { useState, useEffect, useContext } from 'react'
import DispositionApi from "components/dashboard/CRM/DispositionApi";
import 'react-dropdown-tree-select/dist/styles.css'
import Select from 'react-select'
import moment from "moment";
import { UserContext } from "./UserContext";
import axios, { post } from 'axios';
import Widget from "components/Widget/index";
import UserApi from "components/dashboard/CRM/UserApi";
import AdminHorizontalNav from "../../../containers/Topbar/AdminHorizontalNav";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import UserList from "./UserList";
import IntlMessages from "util/IntlMessages";
import { NotificationContainer, NotificationManager } from "react-notifications";
import ContainerHeader from "components/ContainerHeader/index";
import { SubCatContext } from "./SubCatContext";
import { useHistory } from "react-router";



const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;

function UserEdit() {

    const [saveuser, setSaveUser] = useState({
        id: "", username: "", userextension: "", extensionstatus: "", onbreak: "", popupstatus: "",
        usertype: "", password: "", context: "", callstatus: "", branchid: "", prefix: "", extensiontype: "",
        email: "", ivruser: "", departmentcode: ""
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



    useEffect(() => {
        axios({
            method: 'get',
            url: "http://192.168.10.210:5001/eupraxia"+"/user/id/" + localStorage.getItem("editUserbyID"),
            headers: { Authorization: "Bearer ".concat(localStorage.getItem("token")) }
            // data: "",
        })
            .then(response => {
                //handle success
                console.log(axios.data)
                console.log(response.data.model);
                setSaveUser({
                    id: response.data.model.id,
                    username: response.data.model.username,
                    userextension: response.data.model.userextension,
                    extensionstatus: response.data.model.extensionstatus,
                    onbreak: response.data.model.onbreak,
                    popupstatus: response.data.model.popupstatus,
                    usertype: response.data.model.usertype,
                    password: response.data.model.password,
                    context: response.data.model.context,
                    callstatus: response.data.model.callstatus,
                    branchid: response.data.model.branchid,
                    prefix: response.data.model.prefix,
                    extensiontype: response.data.model.extensiontype,
                    email: response.data.model.email,
                    ivruser: response.data.model.ivruser,
                    departmentcode: response.data.model.departmentcode,
                })



            },
                function (error) {
                    // handle error 
                });
    }, []);

    let history = useHistory();
    function saveuserme() {

        var data = {
            id: saveuser.id,
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
            departmentcode: saveuser.departmentcode,
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

                console.log(response.data)
                if (response.status == 200) {
                    NotificationManager.success(<IntlMessages id="notification.successMessage" />, <IntlMessages
                        id="notification.titleHere" />);
                }
                else {
                    NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
                        id="notification.clickMe" />);
                }

            })

        localStorage.setItem("editUserbyID", "");

        history.push("/useradd")

    }


    function backtoAddUser() {
        history.push("/useradd")
    }

    const onFinishFailed = errorInfo => {

    };

    const onFinish = values => {

    };


    return (
        <div>
            <AdminHeader />
            <SubCatContext.Provider value={saveuser.id}>
                <Form
                    initialValues={{ remember: true }}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="inline">

                    <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                        <FormItem>
                            <Button className="gx-mb-0"
                                className="gx-btn-orange  gx-mb-1"
                                type="primary"

                                onClick={backtoAddUser}
                            >
                                Back
                            </Button>
                        </FormItem>
                    </Col>


                    <Col xl={24} lg={12} md={12} sm={12} xs={24}>

                        <Widget styleName={`ant-col gx-bg-geekblue `}>
                            <h2 className="gx-text-white" >Edit User</h2>
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
                                            //   defaultValue={saveuser.usertype}
                                            value={handlerUserType.value}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            style={{ color: 'black' }}
                                            placeholder={saveuser.usertype}
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={handlerUserType}
                                        >

                                            <TreeNode value="agent" title="Agent">
                                            </TreeNode>
                                            <TreeNode value="Admin" title="Admin">
                                            </TreeNode>
                                            <TreeNode value="Executive" title="Executive">
                                            </TreeNode>
                                            <TreeNode value="FollowUp" title="FollowUp">
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
                                            placeholder={saveuser.extensiontype}
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={handlerExtnType}
                                        >

                                            <TreeNode value="SIP" title="SIP">
                                            </TreeNode>
                                            <TreeNode value="Local" title="Local">
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
                                            Update User
                                        </Button>
                                    </FormItem>
                                </Col>

                            </Row>
                        </Widget>
                    </Col>
                </Form>

                <NotificationContainer />
            </SubCatContext.Provider>
        </div>
    );

}

export default UserEdit;