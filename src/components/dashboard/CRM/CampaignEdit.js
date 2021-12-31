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
import CampaignList from "./CampaignList";
import CampaignApi from "./CampaignApi";
import PerpetratorDetails from "./PerpetratorDetails";
import IntlMessages from "util/IntlMessages";
import { NotificationContainer, NotificationManager } from "react-notifications";
import ContainerHeader from "components/ContainerHeader/index";
import { SubCatContext } from "./SubCatContext";
import { useHistory } from "react-router";



const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;

var type = '';
function CampaignEdit(props) {

    const [savecamp, setSaveCamp] = useState({
        campaignName: "", campaignName: '', dialMethod: '', status: '', wrapUpTime: '', isDefault: '',
        campaignCreatedOn: '', didNumber: '', campaign_Source: '', callDirection: '', resourceURL: '', queueName: '', trunk: '',
        beingcalled: '', departmentcode: ''
    });

    function handleChangeCampSave(evt) {
        const value = evt.target.value;
        setSaveCamp({
            ...savecamp,
            [evt.target.name]: value
        });
    }

    function handlerDialerMethod(value) {
        savecamp.dialMethod = value;
    }
    function handlerCallDirection(value) {
        savecamp.callDirection = value;
    }

    let history = useHistory();

    useEffect(() => {
        var data = {
            campaignId: localStorage.getItem("editCamapignbyID"),
        }

        CampaignApi.campaignById(data)
            .subscribe(response => {
                //handle success
                console.log(response.data.model);
                setSaveCamp({
                    campaignId: response.data.model.campaignId,
                    campaignName: response.data.model.campaignName,
                    dialMethod: response.data.model.dialMethod,
                    status: response.data.model.status,
                    wrapUpTime: response.data.model.wrapUpTime,
                    isDefault: response.data.model.isDefault,
                    campaignCreatedOn: response.data.model.campaignCreatedOn,
                    didNumber: response.data.model.didNumber,
                    campaign_Source: response.data.model.campaign_Source,
                    callDirection: response.data.model.callDirection,
                    resourceURL: response.data.model.resourceURL,
                    queueName: response.data.model.queueName,
                    trunk: response.data.model.trunk,
                    beingcalled: response.data.model.beingcalled,
                    departmentcode: response.data.model.departmentcode,
                })

            },
                function (error) {
                    // handle error 
                });
    }, []);


    function backtoAddCamp() {
        history.push("/campaignadd")

    }



    function addcamp() {
        var data = {
            campaignId: savecamp.campaignId,
            campaignName: savecamp.campaignName,
            dialMethod: savecamp.dialMethod,
            status: savecamp.status,
            wrapUpTime: savecamp.wrapUpTime,
            isDefault: savecamp.isDefault,
            campaignCreatedOn: savecamp.campaignCreatedOn,
            didNumber: savecamp.didNumber,
            campaign_Source: savecamp.campaign_Source,
            callDirection: savecamp.callDirection,
            resourceURL: savecamp.resourceURL,
            queueName: savecamp.queueName,
            trunk: savecamp.trunk,
            beingcalled: savecamp.beingcalled,
            departmentcode: "ppp",
        }

        CampaignApi.addCampaign(data)
            .subscribe(response => {

                setSaveCamp({
                    campaignName: response.data.campaignName,
                    dialMethod: response.data.dialMethod,
                    status: response.data.status,
                    wrapUpTime: response.data.wrapUpTime,
                    isDefault: response.data.isDefault,
                    campaignCreatedOn: response.data.campaignCreatedOn,
                    didNumber: response.data.didNumber,
                    campaign_Source: response.data.campaign_Source,
                    callDirection: response.data.callDirection,
                    resourceURL: response.data.resourceURL,
                    queueName: response.data.queueName,
                    trunk: response.data.trunk,
                    beingcalled: response.data.beingcalled,
                    departmentcode: response.data.departmentcode
                })

                if (response.status == 200) {
                    NotificationManager.success(<IntlMessages id="notification.successMessage" />, <IntlMessages
                        id="notification.titleHere" />);
                }
                else {
                    NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
                        id="notification.clickMe" />);
                }

            })

        localStorage.setItem("editCamapignbyID", "");

        history.push("/campaignadd")

    }
    const onFinishFailed = errorInfo => {

    };

    const onFinish = values => {

    };

    function createNotification(type) {
        console.log(type)

    };


    return (
        <div>
            <AdminHeader />
            <SubCatContext.Provider value={savecamp.campaignName}>

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

                                onClick={backtoAddCamp}
                            >
                                Back
                            </Button>
                        </FormItem>
                    </Col>


                    <Col xl={24} lg={12} md={12} sm={12} xs={24}>

                        <Widget styleName={`ant-col gx-bg-geekblue `}>
                            <h2 className="gx-text-white" >Edit Campaign</h2>
                            <Row>

                                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                    <h2 className="gx-text-white" >Campaign Name</h2>
                                    <FormItem>
                                        <Input id="campaignName" name="campaignName" placeholder="Campaign Name" value={savecamp.campaignName} onChange={handleChangeCampSave} />
                                    </FormItem>
                                </Col>
                                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                    <h2 className="gx-text-white" >Dial Method</h2>
                                    <FormItem>
                                        <TreeSelect className="gx-w-100"
                                            showSearch
                                            value={handlerDialerMethod.value}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder={savecamp.dialMethod}
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={handlerDialerMethod}
                                        >
                                            <TreeNode value="Incoming" title="Incoming" key="0">
                                            </TreeNode>
                                            <TreeNode value="Outgoing" title="Outgoing" key="1">
                                            </TreeNode>
                                            <TreeNode value="MissedCall" title="MissedCall" key="2">
                                            </TreeNode>
                                            <TreeNode value="Progressive" title="Progressive" key="3">
                                            </TreeNode>
                                            <TreeNode value="None" title="None" key="4">
                                            </TreeNode>

                                        </TreeSelect>                  </FormItem>
                                </Col>
                                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                    <h2 className="gx-text-white" >WrapUp Time</h2>
                                    <FormItem >
                                        <Input id="wrapUpTime" name="wrapUpTime" placeholder="WrapUp Time" value={savecamp.wrapUpTime} onChange={handleChangeCampSave} />
                                    </FormItem>
                                </Col>
                                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                    <h2 className="gx-text-white" >DID Number</h2>
                                    <FormItem >
                                        <Input id="didNumber" name="didNumber" placeholder="DID Number" value={savecamp.didNumber} onChange={handleChangeCampSave} />
                                    </FormItem>
                                </Col>

                            </Row>

                            <Row>
                                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                    <h2 className="gx-text-white" >Call Direction</h2>
                                    <FormItem >
                                        <TreeSelect className="gx-w-100"
                                            showSearch

                                            value={handlerCallDirection.value}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder={savecamp.callDirection}
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={handlerCallDirection}
                                        >

                                            <TreeNode value="Incoming" title="Incoming" key="3">
                                            </TreeNode>
                                            <TreeNode value="Outgoing" title="Outgoing" key="4">
                                            </TreeNode>
                                        </TreeSelect>
                                    </FormItem>
                                </Col>

                                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                    <h2 className="gx-text-white" >Queue Name</h2>
                                    <FormItem>
                                        <Input id="queueName" name="queueName" placeholder="Queue Name" value={savecamp.queueName} onChange={handleChangeCampSave} />
                                    </FormItem>
                                </Col>
                                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                    <h2 className="gx-text-white" >Trunk</h2>
                                    <FormItem >
                                        <Input id="trunk" name="trunk" placeholder="Trunk" value={savecamp.trunk} onChange={handleChangeCampSave} />
                                    </FormItem>
                                </Col>
                                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                    <h2 className="gx-text-white" >Department Code</h2>
                                    <FormItem >
                                        <Input id="departmentcode" name="departmentcode" placeholder="Department Code" value={savecamp.departmentcode} onChange={handleChangeCampSave} />
                                    </FormItem>
                                </Col>

                                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                    <h2 className="gx-text-white" >Resource URL</h2>
                                    <FormItem >
                                        <Input id="resourceURL" name="resourceURL" placeholder="Resource URL" value={savecamp.resourceURL} onChange={handleChangeCampSave} />
                                    </FormItem>
                                </Col>

                                <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                                    <FormItem>
                                        <Button className="gx-mb-0"
                                            className="gx-btn-orange  gx-mb-1"
                                            type="primary"
                                            //   htmlType="submit"
                                            onClick={addcamp}
                                        >
                                            Update Campaign
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

export default CampaignEdit;