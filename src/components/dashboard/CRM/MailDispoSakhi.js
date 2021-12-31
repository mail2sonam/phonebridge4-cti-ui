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
import MailDispositionApi from "./MailApi/MailDispositionApi";
import MailCallerDetail from "./MailCallerDetail";
import MailEmergencyScreen from "./MailEmergencyScreen";
import MailGuidenceCouncling from "./MailGuidenceCouncling";
import MailApis from "./MailApi/MailApis";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

var feedbackflage = '';

const MailDispoSakhi = () => {

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
            callId: "",
            feedback: feedbackflage
        }


        DispositionApi.saveAllDispo(data)
            .subscribe(response => {
                setSave({
                    callId: response.data.callId,
                    feedback: response.data.feedback,
                });


            })
    }


    function SaveOnSakhi() {
        var data = {
            callId: "",
            feedback: 0
        }

        DispositionApi.saveAllDispo(data)
            .subscribe(response => {
                setSave({
                    callId: response.data.callId,
                    feedback: response.data.feedback,
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
            caseId: localStorage.getItem("getMailByCaseId"),
            callType: savecalldetail.callType,
            incidentdate: savecalldetail.incidentdate,
            incidentTime: savecalldetail.incidentTime,
            callTypeRemarks: savecalldetail.callTypeRemarks,
            smsOption: savecalldetail.smsOption,
        }
        MailDispositionApi.saveEmailCallDetails(data)
            .subscribe(response => {
                setCallerDetail({
                    caseId: response.data.caseId,
                    callType: response.data.callType,
                    incidentdate: response.data.incidentdate,
                    incidentTime: response.data.incidentTime,
                    callTypeRemarks: response.data.callTypeRemarks,
                    smsOption: response.data.smsOption,
                });

            })


    }
    // save Disposition

    const [mailcountByExtn, setMailCountByExtn] = useState({ countByExtn: '' });
    var countExtn = mailcountByExtn.countByExtn
    localStorage.setItem("mailCountByExtn", countExtn)

    function sendMailandClose() {
        var data = {
            id: localStorage.getItem("mailmongoId"),
            caseId: localStorage.getItem("getMailByCaseId"),
            to: localStorage.getItem("DispoMailTo"),
            subject: "CaseID: " + localStorage.getItem("getMailByCaseId") + " Subject: " + localStorage.getItem("DispoMailSubject"),
            body: localStorage.getItem("DispoMailBody"),
            attachedFileData: localStorage.getItem("base64values"),
            attachedFileName: localStorage.getItem("filename"),
        }
        MailApis.mailSent(data)
            .subscribe(res => {

                if (res.data.responseCode == 200)
                    localStorage.setItem("mailflage", 1)
                else
                    localStorage.setItem("mailflage", 0)
            })

        var data = {
            userExtension: localStorage.getItem("extn")
        }
        MailApis.mailCountByExtn(data)
            .subscribe(response => {
                setMailCountByExtn({
                    countByExtn: response.data.MailCount
                })
            })

    }

    // Checkbox Property
    const [formcheck, setFormCheck] = useState({ formpass: false })
    const onFinishFailed = errorInfo => {
        SaveOnSakhi()
        SaveOnCallerDetail()
    };
    const onFinish = values => {
        SaveOnSakhi()
        SaveOnCallerDetail()
        sendMailandClose()
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



    function onFileChangeHandler(e) {

        localStorage.setItem("filename", e.target.files[0].name)
        //base 64 test
        var f = e.target.files[0]; // FileList object
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                var binaryData = e.target.result;
                //Converting Binary Data to base 64
                var base64String = window.btoa(binaryData);
                localStorage.setItem("base64values", base64String);

                //showing file converted to base64
                // document.getElementById('filetype').value = base64String;
                // alert('File converted to base64 successfuly!\nCheck in Textarea');
            };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsBinaryString(f);

        //base 64 test
    }

    function closeMail() {
        localStorage.setItem("mailflage", 1)
    }

    return (
        <Auxiliary>

            {/* 181 HelpDesk Header */}
            <h2 className="gx-text-uppercase gx-text-white gx-font-weight-bold gx-fnd-title">Mail Disposition</h2>
            <h1 className="gx-text-orange">CaseId: {localStorage.getItem("getMailByCaseId")}</h1>
            <h1 className="gx-text-orange">Recived Date: {localStorage.getItem("mailRecivedDate")}</h1>


            <Row>
                <Col span={24}>
                    <Row>

                        <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                            <MailDispoDetails maildetail={savecalldetail} />

                        </Col>

                    </Row>
                </Col>
            </Row>

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
                            <MailCallerDetail InformationScreen={localStorage.getItem("getMailByCaseId")} />
                        </Widget>
                    </Col>
                    : <null />
                }


                {typeofCall.callType == "Emergency"
                    ? <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                        <h2 className="gx-text-white" >EMERGENCY SCREEN</h2>
                        <Widget styleName={`ant-col gx-bg-white `}>
                            <MailEmergencyScreen EmergencyScreen={localStorage.getItem("getMailByCaseId")} />
                        </Widget>
                    </Col>
                    : <null />
                }


                {typeofCall.callType == "Counselling  & Guidance"
                    ? <Col xl={24} lg={24} md={12} sm={12} xs={24}>
                        <h2 className="gx-text-white" >GUIDANCE & COUNSELLING SCREEN</h2>
                        <Widget styleName={`ant-col gx-bg-white `}>
                            <MailGuidenceCouncling GuidenceScreen={localStorage.getItem("getMailByCaseId")} />
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


                {/* Attachments upload */}
                <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                    <FormItem>
                        <h1 class="form-label" for="customFile" className="gx-text-white" >Add Attachment</h1>
                        <input type="file" className="form-control" name="filetype" onChange={onFileChangeHandler} />
                    </FormItem>
                </Col>


                {/* Submit Button */}
                <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                    <FormItem>
                        <Button className="gx-mb-0"
                            className="gx-btn-orange  gx-mb-1"
                            type="primary"
                            htmlType="submit"
                        // onClick={SaveOnSakhi}
                        >
                            Save and Send Mail
                        </Button>
                    </FormItem>
                </Col>

                {/* Close Button */}
                <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                    <FormItem>
                        <Button className="gx-mb-0"
                            className="gx-btn-orange  gx-mb-1"
                            type="primary"
                            // htmlType="submit"
                            onClick={closeMail}
                        >
                            Close
                        </Button>
                    </FormItem>
                </Col>

            </Form>
        </Auxiliary>
    );
}

export default MailDispoSakhi;
