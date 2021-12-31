import React from "react";
import { Col, Row, Card, Checkbox, TreeSelect, DatePicker, TimePicker, Switch } from 'antd';
import { Button, Form, Input, InputNumber } from "antd";
import { useState, useEffect, useContext } from 'react'
import DispositionApi from "components/dashboard/CRM/DispositionApi";
import 'react-dropdown-tree-select/dist/styles.css'
import Select from 'react-select'
import moment from "moment";
import { UserContext } from "./UserContext";
import Widget from "components/Widget/index";
import CallDetail from "./CallDetail";
import Auxiliary from "util/Auxiliary";
import CallerDetails from "./CallerDetails";
import Perpetrator from "./PerpetratorDetails";
import PerpetratorDetails from "./PerpetratorDetails";
import CaseCategoryDetails from "./CaseCategoryDetails";
import { DispoContext } from "./DispoContext";
import FirstScreen from "./FirstScreen";
import EmergencyScreen from "./EmergencyScreen";
import GuidenceCouncling from "./GuidenceCouncling";
import MailDispoDetails from "./MailDispoDetails";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

var feedbackflage = '';

const DispoSakhi = (props) => {

  const { MonthPicker, RangePicker } = DatePicker;
  const { TextArea } = Input;
  const Option = Select.Option;

  function onOk(value) {
  }

  //datepicker 
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substr(0, 10);
  var timedefault = curr.getHours() + ':' + curr.getMinutes() + ':' + curr.getSeconds();
  const dateFormat = 'YYYY/MM/DD';
  const timeFormat = 'H:m:s';
  const monthFormat = 'YYYY/MM';
  //datepicker

  const TreeNode = TreeSelect.TreeNode;
  const msg = useContext(UserContext);

  // save Disposition
  const [saveon, setSave] = useState({ callId: '', feedback: '' });

  const [savecalldetail, setCallerDetail] = useState({ callType: '', incidentdate: moment(date, dateFormat)._i, incidentTime: moment(timedefault, timeFormat)._i, smsOption: '' });


  function handleChangeSakhi(evt) {
    const value = evt.target.value;
    setSave({
      ...saveon,
      [evt.target.name]: value
    });
  }

  function onChangeFeedback(e) {
    if (e == true) {
      feedbackflage = 1
    } else {
      feedbackflage = 0
    }

  }

  function FeedbackSend() {
    var data = {
      id: props.sakhidispo.id,
      feedback: feedbackflage
    }

    DispositionApi.saveFeedback(data)
      .subscribe(response => {
        setSave({
          id: response.data.id,
          feedback: response.data.feedback,
        });
      })
  }


  function SaveOnSakhi() {
    var data = {
      callId: props.sakhidispo.id,
      // feedback: 0
    }

    DispositionApi.saveAllDispo(data)
      .subscribe(response => {
        setSave({
          callId: response.data.callId,
          // feedback: response.data.feedback,
        });

      })
  }
  // save Disposition



  function handleChangeSakhi(evt) {
    const value = evt.target.value;
    setCallerDetail({
      ...savecalldetail,
      [evt.target.name]: value
    });
  }


  function SaveOnCallerDetail() {
    var data = {
      callId: props.sakhidispo.id,
      callType: savecalldetail.callType,
      incidentdate: savecalldetail.incidentdate,
      incidentTime: savecalldetail.incidentTime,
      callTypeRemarks: savecalldetail.callTypeRemarks,
      smsOption: savecalldetail.smsOption,
    }
    DispositionApi.saveCallDetails(data)
      .subscribe(response => {
        setCallerDetail({
          callId: response.data.callId,
          callType: response.data.callType,
          incidentdate: response.data.incidentdate,
          incidentTime: response.data.incidentTime,
          callTypeRemarks: response.data.callTypeRemarks,
          smsOption: response.data.smsOption,
        });
      })
  }
  // save Disposition


  // Checkbox Property
  const [formcheck, setFormCheck] = useState({ formpass: false })
  const onFinishFailed = errorInfo => {
    SaveOnSakhi()
    SaveOnCallerDetail()
  };
  const onFinish = values => {
    SaveOnSakhi()
    SaveOnCallerDetail()
  };



  let [state, SetState] = useState();
  state = {
    attribute: {
      name: "name",
      isActive: true,
      eventId: 1,
      attributeSendName: "enter your name"
    },
    isViewMode: false
  };

  const { attribute, isViewMode } = state;
  const [chec, setCheck] = useState({ typeofcall: '' });
  // Checkbox Property

  // Functions for save 
  const [typeofCall, setTypeofCall] = useState({ callType: 'no' });
  const [callDate, setCallDate] = useState({ dateofCall: 'no' });
  const [CallTime, setCalltime] = useState({ timeofCall: 'no' });

  function onChangeTypeOfCall(value) {
    savecalldetail.callType = value;
    setTypeofCall({
      callType: value
    })
  }
  function onChangeCallDate(value) {
    savecalldetail.incidentdate = value._i;
    setCallDate({
      incidentdate: value._i
    })
  }
  function onChangeCallTime(value) {
    savecalldetail.incidentTime = value._i;
    setCalltime({
      incidentTime: value._i
    })

  }

  function onChangeSMSoption(value) {
    savecalldetail.smsOption = value;

  }

  function onChangeMarital(value) {
    saveon.martialstatus = value;
  }


  function onChangePrankVal(value) {
    savecalldetail.callTypeRemarks = value;
  }


  // Functions for save 

  return (
    <Auxiliary>

      {/* 181 HelpDesk Header */}
      <h2 className="gx-text-uppercase gx-text-white gx-font-weight-bold gx-fnd-title">181 Women Helpline</h2>
      <p>Fill details of aggrieved in following fields</p>

      {/* <Row>
          <Col span={24}>
            <Row>

              <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                <Widget styleName={`ant-col gx-bg-geekblue `}>
                  <div className="gx-card-body">
                    {localStorage.getItem("mailflage") == 0   // 0 means hide ,  1 means show dispo
                      ? <MailDispoDetails/>
                      : <div className="gx-text-white" > Waiting for Mail to Select.... </div>

                    }
                  </div>
                </Widget>
              </Col>

            </Row>
          </Col>
        </Row> */}

      <Form
        initialValues={{ remember: true }}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="inline">

        <DispoContext.Provider value={saveon.name}>

          <Col xl={24} lg={12} md={12} sm={12} xs={24}>
            <h2 className="gx-text-white" >CALL DETAILS</h2>
            <Widget styleName={`ant-col gx-bg-white `}>
              <Row>
                {/* Type of Calls */}
                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-black" >Type of Call</h2>
                  <FormItem>
                    <TreeSelect className="gx-w-100"
                      showSearch
                      value={onChangeTypeOfCall.value}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="Please select"
                      allowClear
                      treeDefaultExpandAll
                      onChange={onChangeTypeOfCall}
                    >
                      <TreeNode value="Information" title="Information" key="0">
                      </TreeNode>
                      <TreeNode value="Emergency" title="Emergency" key="1">
                      </TreeNode>
                      <TreeNode value="Counselling  & Guidance" title="Counselling  & Guidance" key="2">
                      </TreeNode>
                      <TreeNode value="Prank" title="Prank" key="3">
                      </TreeNode>
                      <TreeNode value="Slient" title="Slient" key="4">
                      </TreeNode>
                      <TreeNode value="Other Information" title="Other Information" key="5">
                      </TreeNode>
                    </TreeSelect>
                  </FormItem>
                </Col>


                <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-black" >Call Date</h2>
                  <FormItem >
                    <DatePicker className="gx-mb-3 gx-w-100" defaultValue={moment(date, dateFormat)} format={dateFormat}
                      disabled onChange={onChangeCallDate}
                    />
                  </FormItem>

                </Col>

                <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-black" >Call Time</h2>
                  <FormItem >
                    <TimePicker className="gx-mb-3 gx-w-100" defaultValue={moment(timedefault, timeFormat)} format={timeFormat}
                      disabled onChange={onChangeCallTime}
                    />
                  </FormItem>

                </Col>

                {/* Sms  */}
                <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-black" >Send Sms</h2>
                  <FormItem>
                    <TreeSelect className="gx-w-100"
                      showSearch
                      value={onChangeSMSoption.value}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="Please select"
                      allowClear
                      treeDefaultExpandAll
                      onChange={onChangeSMSoption}
                    >


                      <TreeNode value="Yes" title="Yes" key="400">
                      </TreeNode>
                      <TreeNode value="No" title="No" key="401">
                      </TreeNode>

                    </TreeSelect>
                  </FormItem>
                </Col>

              </Row>
              {/* <FirstScreen FirstScreenCallerID = {props.sakhidispo.id}/> */}
            </Widget>
          </Col>
        </DispoContext.Provider>


        {typeofCall.callType == "Prank"

          ? <Col xl={10} lg={12} md={12} sm={12} xs={24}>
            <h2 className="gx-text-white" >Remarks</h2>
            {/* prank call remark */}
            <FormItem>
              <TreeSelect className="gx-w-100"
                showSearch
                value={onChangePrankVal.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                onChange={onChangePrankVal}
              >

                <TreeNode value="Sexual Harassment" title="Sexual Harassment" key="45">
                </TreeNode>
                <TreeNode value="Verbal Abuse" title="Verbal Abuse" key="46">
                </TreeNode>
                <TreeNode value="Others" title="Others" key="47">
                </TreeNode>

              </TreeSelect>
            </FormItem>
          </Col>
          : <null />
        }

        {typeofCall.callType == "Slient" || typeofCall.callType == "Other Information"

          ? <Col xl={10} lg={12} md={12} sm={12} xs={24}>
            <h2 className="gx-text-white" >Remarks</h2>
            {/* Remarks */}
            <FormItem>
              <TextArea rows={4}
                id="callTypeRemarks" name="callTypeRemarks" placeholder="Remarks"
                value={handleChangeSakhi.value} onChange={handleChangeSakhi}
              />
            </FormItem>
          </Col>
          : <null />
        }


        {typeofCall.callType == "Information"
          ? <Col xl={24} lg={12} md={12} sm={12} xs={24}>
            <h2 className="gx-text-white" >INFORMATION SCREEN</h2>
            <Widget styleName={`ant-col gx-bg-white `}>
              <CallerDetails InformationScreen={props.sakhidispo.id} />
            </Widget>
          </Col>
          : <null />
        }


        {typeofCall.callType == "Emergency"
          ? <Col xl={24} lg={12} md={12} sm={12} xs={24}>
            <h2 className="gx-text-white" >EMERGENCY SCREEN</h2>
            <Widget styleName={`ant-col gx-bg-white `}>
              <EmergencyScreen EmergencyScreen={props.sakhidispo.id} />
            </Widget>
          </Col>
          : <null />
        }


        {typeofCall.callType == "Counselling  & Guidance"
          ? <Col xl={24} lg={24} md={12} sm={12} xs={24}>
            <h2 className="gx-text-white" >GUIDANCE & COUNSELLING SCREEN</h2>
            <Widget styleName={`ant-col gx-bg-white `}>
              <GuidenceCouncling GuidenceScreen={props.sakhidispo.id} />
            </Widget>
          </Col>
          : <null />
        }


        {/* <Col xl={24} lg={24} md={12} sm={12} xs={24}>
  <h2 className="gx-text-white" >CASE DETAILS</h2>
    <Widget styleName={`ant-col gx-bg-white `}>
        <CaseCategoryDetails/>
     </Widget>
</Col> */}

        {/* <Col xl={24} lg={12} md={12} sm={12} xs={24}>
<h2 className="gx-text-white" >PERPETRATOR DETAILS</h2>
    <Widget styleName={`ant-col gx-bg-white `}>
        <PerpetratorDetails/>
     </Widget>
</Col> */}


        {/* Ivr feedback Checkbox */}
        <Col xl={24} lg={12} md={12} sm={12} xs={24}>
          <FormItem>
            <h2 className="gx-text-white" >IVR FeedBack</h2>
            <Switch
              className="gx-btn-success  gx-mb-1"

              checkedChildren="Yes"
              unCheckedChildren="No"
              defaultunChecked
              // disabled
              onClick={FeedbackSend}
              onChange={onChangeFeedback}
            />
          </FormItem>
        </Col>


        {/* Submit Button */}
        <Col xl={24} lg={12} md={12} sm={12} xs={24}>
          <FormItem>
            <Button className="gx-mb-0"
              className="gx-btn-orange  gx-mb-1"
              type="primary"
              htmlType="submit"
            // onClick={SaveOnSakhi}
            >
              Close
            </Button>
          </FormItem>
        </Col>

      </Form>
    </Auxiliary>
  );
}

export default DispoSakhi;
