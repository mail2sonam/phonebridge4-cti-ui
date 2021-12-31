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
import Auxiliary from "util/Auxiliary";
import { DispoContext } from "./DispoContext";
import InputRange from 'react-input-range';
import DirectoryApi from "./DirectoryApi/DirectoryApi";
import PincodeApi from "./PincodeApi";
import MailLog from "../../mail/MailLog";
import axios, { post } from 'axios';
import Dial from "components/dashboard/CRM/Dial";
import { useHistory } from "react-router";
import Modal from "antd/lib/modal/Modal";
import IntlMessages from "../../../util/IntlMessages";
import MailApis from "./MailApi/MailApis";
import { Label } from "recharts";
import SmsDispositionApi from "./SmsDispositionApi";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const SmsDispoDetails = (props) => {

    const { TextArea } = Input;
    const TreeNode = TreeSelect.TreeNode;
    const msg = useContext(UserContext);

    // save Disposition
    const [saveon, setSave] = useState({ id: '', messageId: '', caseId: '', number: '', message: '', date: '' });

    const [mailvalues, setMailValues] = useState({ subject: '', body: '' });

    // props.maildetail.from = saveon.from;
    // props.maildetail.subject = mailvalues.subject;
    // props.maildetail.body = mailvalues.body;

    function handleChangeSakhi(evt) {
        const value = evt.target.value;
        setMailValues({
            ...mailvalues,
            [evt.target.name]: value
        });

        // props.maildetail.from = saveon.from;
        // props.maildetail.subject = mailvalues.subject;
        // props.maildetail.body = mailvalues.body;
    }
    const outgoingvalues = {
        channel: localStorage.getItem("extensiontype") + "/" + localStorage.getItem("extn"),
        context: localStorage.getItem("context"),
        phoneNo: "",
        prefix: localStorage.getItem("prefix"),
        extension: localStorage.getItem("extn"),
        priority: "1"
    }

    const [outgoing, setOutgoing] = useState(outgoingvalues);

    function callForSms() {

        let str = localStorage.getItem("callForSms").toString();

        var subStr = str.substr(2, 12);
        var data = {
            channel: localStorage.getItem("extensiontype") + "/" + localStorage.getItem("extn"),
            context: localStorage.getItem("context"),
            phoneNo: subStr,
            prefix: localStorage.getItem("prefix"),
            extension: localStorage.getItem("extn"),
            priority: "1",
            dialMethod: "outgoing",
            callSource: "sms"
        }
        Dial.dial(data)
            .subscribe(response => {
                setOutgoing({
                    channel: localStorage.getItem("extensiontype") + "/" + localStorage.getItem("extn"),
                    context: localStorage.getItem("context"),
                    phoneNo: response.data.phoneNo,
                    prefix: response.data.prefix,
                    extension: localStorage.getItem("extn"),
                    priority: "1",
                    dialMethod: "outgoing"

                });
                // setSubmitted(true)
            })
    }

    useEffect(() => {
        var data = {
            caseId: localStorage.getItem("getSmsByCaseId")
        }
        SmsDispositionApi.getSmsByCaseId(data)
            .subscribe(response => {
                setSave({
                    id: response.data.model.id,
                    messageId: response.data.model.messageId,
                    caseId: response.data.model.caseId,
                    number: response.data.model.number,
                    message: response.data.model.message,
                    date: response.data.model.date
                })
            })

    }, [localStorage.getItem("getSmsByCaseId")]);

    localStorage.setItem("smsRecivedDate", saveon.date)
    // localStorage.setItem("DispoMailTo", saveon.from)
    localStorage.setItem("smsMongoId", saveon.id)
    localStorage.setItem("DispoMailSubject", mailvalues.subject)
    localStorage.setItem("DispoMailBody", mailvalues.body)
    let history = useHistory();
    const [statecompose, useStateCompose] = useState(false);
    const [statecancel, useStateCancel] = useState(false);
    const [stateclosable, useStateClosable] = useState(false);
    const [stateonok, useStateonOk] = useState(false);

    function ComposetheMail() {
        useStateCompose(true)
    }
    function ComposetheMailClose() {
        useStateCompose(false)
    }
    function ComposetheMailCancel() {
        useStateCompose(false)
    }
    function ComposetheMailOnOk() {
        useStateonOk(true)
    }

    // Save validation
    const onFinishFailed = errorInfo => {
    };
    const onFinish = values => {
    };
    // Save validation

    function clsoecard() {

    }

    return (
        <Auxiliary>
            <Form
                initialValues={{ remember: true }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="inline">



                {/* Name Field */}
                <Col xl={2} lg={12} md={12} sm={12} xs={24}>
                    <h2 className="gx-text-white" >From: </h2>
                </Col>
                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                    <Input id="isName" name="isName" placeholder="Number" value={saveon.number} onChange={handleChangeSakhi} />
                </Col>

                <Col xl={3} lg={12} md={12} sm={12} xs={24}>
                    <h2 className="gx-text-white" >Message:</h2>
                </Col>
                <Col xl={10} lg={12} md={12} sm={12} xs={24}>
                    <FormItem>
                        <TextArea rows={4}
                            id="callTypeRemarks" name="callTypeRemarks" placeholder="Remarks"
                            value={saveon.message} onChange={handleChangeSakhi}
                        />
                        {/* <Input id="subject" name="subject" placeholder="Message" value={saveon.message} onChange={handleChangeSakhi} /> */}
                    </FormItem>
                </Col>

                {/* <Col xl={10} lg={12} md={12} sm={12} xs={24}>
                    <FormItem>
                   <Button className="gx-btn-orange  gx-mb-1" onClick={callForSms}>Call</Button>
                    </FormItem>
                </Col> */}

                {/* <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                    <h2 className="gx-text-white" >Body: </h2>
                    <FormItem>
                        <TextArea rows={4}
                            id="body" name="body" placeholder="Mail Body"
                            value={mailvalues.body} onChange={handleChangeSakhi}
                        />
                    </FormItem>
                </Col> */}

                {/* <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                    <FormItem>
                        <h1 className="gx-text-white">Download Attachment</h1>
                       
                        {saveon.attachmentdata == null || saveon.attachmentdata == ""
                            ? <h1 className="gx-text-blue" > No Attachments</h1>
                            : <a className="gx-text-blue"
                                href={saveon.attachmentbase64+saveon.attachmentdata}
                                download={saveon.attachmentname}>
                                {saveon.attachmentname}
                            </a>

                        }
                    </FormItem>
                </Col> */}

                <Modal onCancel={() => ComposetheMailCancel()} visible={statecompose}
                    title={<IntlMessages id="mail.logMailTitle" />}
                    closable={() => ComposetheMailClose()}
                    onOk={() => ComposetheMailOnOk()
                        // () => {
                        // if (to === '')
                        //   return;
                        //onClose();
                        //   this.onlogsend();
                        //   this.onMailSend(
                        //     {
                        //       "id": localStorage.getItem("mailId"),
                        //       "to": localStorage.getItem("mailToId"),
                        //       "subject": subject,
                        //       "body":  message,
                        //       "attachedFileData": localStorage.getItem("base64values"),
                        //       "attachedFileName": localStorage.getItem("filename")
                        //     })
                        // }
                    }
                    style={{ zIndex: 2600 }}>
                    <div className="gx-form-group">
                        <Input
                            placeholder="To*"
                            //onChange={() => this.setState({ to: localStorage.getItem("mailToId")})}
                            //value={localStorage.getItem("mailToId")}
                            margin="normal" />
                    </div>
                    <div className="gx-form-group">
                        <Input
                            placeholder="Subject"
                            //onChange={(event) => this.setState({ subject: event.target.value })}
                            //value={subject}
                            margin="normal"
                        />
                    </div>

                    <div className="gx-form-group">
                        <TextArea
                            placeholder="Remark of this Case"
                            // onChange={(event) => this.setState({ message: event.target.value })}
                            // value={message}
                            autosize={{ minRows: 2, maxRows: 6 }}
                            margin="normal" />
                    </div>

                    {/* <div className="gx-form-group">
      
          <label class="form-label" for="customFile">Upload and Submit</label>
          <input type="file" className="form-control" name="filetype" onChange={this.onFileChangeHandler}/>

        </div> */}
                </Modal>

            </Form>
        </Auxiliary>
    );

}

export default SmsDispoDetails;
