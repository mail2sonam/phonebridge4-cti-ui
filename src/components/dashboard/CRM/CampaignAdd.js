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

const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;

function CampaignAdd() {

  const [savecamp, setSaveCamp] = useState({
    campaignName: '', dialMethod: '', status: '', wrapUpTime: '', isDefault: '',
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




  function addcamp() {
    var data = {
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
            <h2 className="gx-text-white" >Add Campaign</h2>
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
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={handlerDialerMethod}
                  >

                    <TreeNode value="MissedCall" title="MissedCall" key="0">
                    </TreeNode>
                    <TreeNode value="Progresive" title="Progresive" key="1">
                    </TreeNode>
                    <TreeNode value="none" title="none" key="2">
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
                    placeholder="Please select"
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
                    Submit
                  </Button>
                </FormItem>
              </Col>
            </Row>
          </Widget>

        </Col>
      </Form>
      {/* listCampaign */}

      <CampaignList />

      {/* listcampaign */}

    </div>
  );

}

export default CampaignAdd;