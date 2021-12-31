import React from "react";
import { Col, Row, Card, Checkbox, TreeSelect, DatePicker, TimePicker } from 'antd';
import { Button, Form, Input, InputNumber } from "antd";
import { useState, useEffect } from 'react'
import 'react-dropdown-tree-select/dist/styles.css'
import Widget from "components/Widget/index";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import UserList from "./UserList";
import DialerDispoApi from "./DialerDispoApi";
import DispositionApi from "components/dashboard/CRM/DispositionApi";
import axios, { post } from 'axios';

var ipName = "http://192.168.10.210:5001/eupraxia"
var flagPhoneNumberFound = 1 ;
var flagPhoneNumberNotFound = 0 ;

var flagephno = "";
const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;
const { TextArea } = Input;

function DialerIncomingDispo(props) {


    const [saveon, setSave] = useState({
        empId: '', employeeName: '', branch: '', phoneNumber: '', typeOfQuery: '', remark: ' '});
    
    
      function handleChangeSakhi(evt) {
        const value = evt.target.value;
        setSave({
          ...saveon,
          [evt.target.name]: value
        });
        console.log(evt.target.name)
      }

    const onFinishFailed = errorInfo => {
        SaveOnSakhi()
        // SaveOnDispo()
    };
    const onFinish = values => {
        SaveOnSakhi()
        // SaveOnDispo()
    };

    const [empDetail, setExpDetail] = useState({ empId: '', employeeName: '', branch: '', phoneNumber: '',typeOfQuery:'Not Disclosed'});
    // Get by Phone number

    var dataContact = {
        employeeName: saveon.employeeName,
        empId: saveon.empId,
        branch: saveon.branch,
        typeOfQuery:saveon.typeOfQuery,
        phoneNumber: stval
    }
  
    var st = props.sakhiImcomdispo.phoneNo;
    // var st = "9788798465";
    st.toString();
    var stval = st;
    //  console.log(stval);
     useEffect(() => {
    axios({
        method: 'Get',
        // url: ipName+'/ce/getByPhoneNo?phoneNo=8722436413',
        url: ipName+'/ce/getByPhoneNo?phoneNo='+stval,
      })
        .then(function (response) {  
           // console.log(response.data.responseCode)        
           if(response.data.responseCode=="200") {
            flagephno = 0;   
               setExpDetail({
                employeeName: response.data.model.employeeName,
                empId: response.data.model.empId,
                branch: response.data.model.branch,
                typeOfQuery:response.data.model.typeOfQuery,
                remarks:response.data.model.remarks
            })
          
        
         // console.log("checked",response)
           }else 
           if(response.data.responseCode=="500") {
            flagephno = 1; 
               DispositionApi.saveDispoContact(dataContact)
                .subscribe(response => {
                   console.log(response.data)
                })
        }

           // console.log("Error",response)
           }
        
   );
}, [])


function SaveOnSakhi() {
        var dataWarContact = {
            callerId: props.sakhiImcomdispo.id,
            phoneNo: props.sakhiImcomdispo.phoneNo,
            typeOfQuery: saveon.typeOfQuery,
            remarks: saveon.remarks
        }

        var datasaveCont = {
            employeeName: saveon.employeeName,
            empId: saveon.empId,
            branch: saveon.branch,
            phoneNumber: props.sakhiImcomdispo.phoneNo,
            typeOfQuery:saveon.typeOfQuery,
            remarks:saveon.remarks
            
        }

        var dataClose = {
            callId: props.sakhiImcomdispo.id,
        }
console.log(datasaveCont)
        DispositionApi.saveDispoContact(datasaveCont)
            .subscribe(response => {
                console.log(response.data)
            })

            DispositionApi.saveWarRoom(dataWarContact)
            .subscribe(response => {
               console.log(response.data.typeOfQuery)
            })

            DispositionApi.saveAllDispo(dataClose)
            .subscribe(response => {
                console.log(response.data)
            })
         
    }

function SaveOnExtContact() {
        var dataWarCont = {
            phoneNo: props.sakhiImcomdispo.phoneNo,
            callerId: props.sakhiImcomdispo.id,
            typeOfQuery: saveon.typeOfQuery,
            remarks: saveon.remarks
        }

        var dataClose = {
            callId: props.sakhiImcomdispo.id,
            
        }

console.log(dataWarCont)
        DispositionApi.saveWarRoom(dataWarCont)
            .subscribe(response => {
                console.log(response.data)
                
            })
            
            DispositionApi.saveAllDispo(dataClose)
            .subscribe(response => {
                console.log(response.data)
            })

            
    }
   



    return (
        <div>
            <Form
                initialValues={{ remember: true }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="inline">

{ flagephno == 1
        ?   <Col xl={24} lg={12} md={12} sm={12} xs={24}>

                    <Widget styleName={`ant-col gx-bg-geekblue `}>
                        <h2 className="gx-text-white" >Disposition</h2>
                        <Row>
                           {/* Employee Name */}
                            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Employee Name</h2>
                                <FormItem>
                            {/* <label className="gx-text-white">{empDetail.employeeName}</label> */}
                            <Input id="employeeName" name="employeeName" type="text" placeholder="Employee Name" 
                                value={saveon.employeeName} onChange={handleChangeSakhi}
                                 />
                          </FormItem>
                            </Col>

                     {/* Employee Code */}
                     <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Employee Code</h2>
                                <FormItem>
                                {/* <label className="gx-text-white">{empDetail.empId}</label> */}
                                <Input id="empId" name="empId" type="text" placeholder="Employee Code" 
                                value={saveon.empId} onChange={handleChangeSakhi}
                                 />
                          </FormItem>
                            </Col>
                            {/* Branch Name */}
                            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Branch Name</h2>
                                <FormItem>
                                {/* <label className="gx-text-white">{empDetail.branch}</label> */}
                                <Input id="branch" name="branch" type="text" placeholder="Branch Name" 
                                value={saveon.branch} onChange={handleChangeSakhi}
                                 />
                          </FormItem>
                            </Col>
                            {/* Type of Query */}
                            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Type Of Query</h2>
                                <FormItem>
                                <Input id="typeOfQuery" name="typeOfQuery" type="text" placeholder="Type Of Query" 
                                value={saveon.typeOfQuery} onChange={handleChangeSakhi}
                                 />
                            </FormItem>
                            </Col>


       
                            {/* Remarks */}
                            <Col xl={10} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Remarks</h2>
                                <FormItem>
                                <Input id="remarks" name="remarks" type="text" placeholder="Remarks" 
                                value={saveon.remarks} onChange={handleChangeSakhi}
                                 />
                                </FormItem>
                            </Col>


                            
                         <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                                <FormItem>
                                    <Button className="gx-mb-0"
                                        className="gx-btn-orange  gx-mb-1"
                                        type="primary"
                                        htmlType="submit"

                                    >
                                        Submit
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Widget>
                </Col>





               : <Col xl={24} lg={12} md={12} sm={12} xs={24}>

                    <Widget styleName={`ant-col gx-bg-geekblue `}>
                        <h2 className="gx-text-white" >Disposition</h2>
                        <Row>
                           {/* Employee Name */}
                            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Employee Name</h2>
                                <FormItem>
                            <label className="gx-text-white">{empDetail.employeeName}</label>
                            {/* <Input id="employeeName" name="employeeName" type="text" placeholder="Employee Name" 
                                value={saveon.employeeName} onChange={handleChangeSakhi}
                                 /> */}
                          </FormItem>
                            </Col>

                     {/* Employee Code */}
                     <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Employee Code</h2>
                                <FormItem>
                                <label className="gx-text-white">{empDetail.empId}</label>
                                {/* <Input id="empId" name="empId" type="text" placeholder="Employee Code" 
                                value={saveon.empId} onChange={handleChangeSakhi}
                                 /> */}
                          </FormItem>
                            </Col>
                            {/* Branch Name */}
                            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Branch Name</h2>
                                <FormItem>
                                <label className="gx-text-white">{empDetail.branch}</label>
                                {/* <Input id="branch" name="branch" type="text" placeholder="Branch Name" 
                                value={saveon.branch} onChange={handleChangeSakhi}
                                 /> */}
                          </FormItem>
                            </Col>
                            {/* Type of Query */}
                            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Type of Query</h2>
                                <FormItem>
                                <Input id="typeOfQuery" name="typeOfQuery" type="text" placeholder="Type Of Query" 
                                value={saveon.typeOfQuery} onChange={handleChangeSakhi}
                                 />
                            </FormItem>
                            </Col>


       
                            {/* Remarks */}
                            <Col xl={10} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Remarks</h2>
                                <FormItem>
                                <Input id="remarks" name="remarks" type="text" placeholder="Remarks" 
                                value={saveon.remarks} onChange={handleChangeSakhi}
                                 />
                                </FormItem>
                            </Col>


                            
                         <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                                <FormItem>
                                    <Button className="gx-mb-0"
                                        className="gx-btn-orange  gx-mb-1"
                                        type="primary"
                                        // htmlType="submit"
                                        onClick={SaveOnExtContact}
                                    >
                                        Submit
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Widget>
                </Col>





}
            </Form>


        </div>
    );

};

export default DialerIncomingDispo;