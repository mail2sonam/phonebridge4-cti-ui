import React from "react";
import {Col, Row, Card, Checkbox, TreeSelect, DatePicker, TimePicker} from 'antd';
import {Button, Form, Input, InputNumber} from "antd";
import { useState ,useEffect, useContext} from 'react'
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
import BranchList from "./BranchList";

const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;

function BranchAdd(){

    const [savecamp, setSaveCamp] = useState({ campaignName:'', dialMethod:'',status:'', wrapUpTime:'',isDefault:'', 
    campaignCreatedOn:'', didNumber:'', campaign_Source:'', callDirection:'', resourceURL:'', queueName:'', trunk:'',
    beingcalled:'', departmentcode:'' });

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



        
function addcamp(){
    var data={
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
          .subscribe(response=> {
          
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


          return(
              <div> 
               <AdminHeader/>
               <Form 
                    initialValues={{ remember: true }}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="inline">


            <Col xl={24} lg={12} md={12} sm={12} xs={24}>
        
            <Widget styleName={`ant-col gx-bg-geekblue `}>
            <h2 className="gx-text-white" >Add Branch</h2>
            <Row>

                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                    <h2 className="gx-text-white" >Branch Name</h2>      
                    <FormItem>        
                        <Input id="campaignName" name="campaignName" placeholder="Branch Name" 
                        // value={savecamp.campaignName} onChange={handleChangeCampSave}
                        />
                  </FormItem>
                </Col>
                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                    <h2 className="gx-text-white" >Branch Code</h2>      
                    <FormItem>        
                        <Input id="campaignName" name="campaignName" placeholder="Branch Code" 
                        // value={savecamp.campaignName} onChange={handleChangeCampSave}
                        />
                  </FormItem>
                </Col>
   

        </Row>
 
        </Widget>
    
    </Col>
    </Form> 
    {/* listCampaign */}

    <BranchList />

    {/* listcampaign */}

</div>
          );

}

export default BranchAdd;