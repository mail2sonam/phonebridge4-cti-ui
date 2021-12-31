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


const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;
const { TextArea } = Input;

function DialerDispositionCard(props) {

    const onFinishFailed = errorInfo => {
        SaveOnSakhi()
        // SaveOnDispo()
    };
    const onFinish = values => {
        SaveOnSakhi()
        // SaveOnDispo()
    };

    // save Disposition
    const [startDate, setStartDate] = useState({ callback: "" });
    const [savecalldetail, setCallerDetail] = useState({ callId: '', dispo: '', maindispo: '', subdispo: '', subsubdispo: '', callback: '', remarks: '' });

    function datecallback(value) {
        setStartDate({
            callback: value.toISOString().substr(0, 19)
        })
    }

    function SaveOnSakhi() {
        var data = {
            callId: props.sakhidispo.id,
            dispo: firstdispo.firstval,
            maindispo: maindispo.mainval,
            subdispo: subdispo.submainval,
            subsubdispo: subsubdispo.setSubSubDispo,
            callback: startDate.callback,
            remark: saveon.remarks,
            // feedback: 0
        }

        DispositionApi.saveAllDispo(data)
            .subscribe(response => {
                setCallerDetail({
                    callId: response.data.callId,

                });

            })
    }



    function SaveOnDispo() {
        var data = {
            callId: props.sakhidispo.id,
            dispo: firstdispo.firstval,
            maindispo: maindispo.mainval,
            subdispo: subdispo.submainval,
            subsubdispo: subsubdispo.setSubSubDispo,
            callback: startDate.callback,
            remark: saveon.remarks,
            // feedback: 0
        }
        console.log(data)
        DialerDispoApi.saveDispo(data)
            .subscribe(response => {
                setCallerDetail({
                    callId: response.data.callId,

                });

            })
    }


    // save Disposition




    // save Disposition
    const [saveon, setSave] = useState({ Remarks: 'Not Disclosed' });


    function handleChangeSakhi(evt) {
        const value = evt.target.value;
        setSave({
            ...saveon,
            [evt.target.name]: value
        });
    }



    // First Dispo
    const [firstdispo, setFirstDispo] = useState({ firstval: '' });
    function dialerFirst(value) {
        console.log(value);
        setFirstDispo({
            firstval: value,
        })
    }

    const [dialerFirstdispo, setDialerFirst] = useState([]);
    useEffect(() => {
        var data = {
            campaign: props.sakhidispo.camName,
            client: "Orange"
        }
        console.log(data)
        DialerDispoApi.dispodialer(data)
            .subscribe(res => {
                const maincat = res;
                let tempList1 = [];
                maincat.data.disposition.forEach(element => {
                    tempList1.push(element);
                });
                setDialerFirst(tempList1);

            })
    }, [])





    // Main Dispo
    const [maindispo, setMainDispo] = useState({ mainval: '' });
    function dialermain(value) {
        console.log(value);
        setMainDispo({
            mainval: value,
        })
    }

    const [dialerdispo, setDialerDispo] = useState([]);
    useEffect(() => {
        var data = {
            campaign: props.sakhidispo.camName,
            client: "Orange",
            mainDispo: firstdispo.firstval
        }
        console.log(data)
        DialerDispoApi.dispodialerMain(data)
            .subscribe(res => {
                const maincat = res;
                let tempList1 = [];
                maincat.data.disposition.forEach(element => {
                    tempList1.push(element);
                });
                setDialerDispo(tempList1);

            })
    }, [firstdispo.firstval])


    //  sub Dispo
    const [subdispo, setSubDispo] = useState({ submainval: '' });
    function dialersub(value) {
        console.log(value);
        setSubDispo({
            submainval: value,
        })
    }

    const [dialersubdispo, setDialersubDispo] = useState([]);
    useEffect(() => {
        var data = {
            campaign: props.sakhidispo.camName,
            client: "Orange",
            dispo: maindispo.mainval,
            mainDispo: firstdispo.firstval
        }
        console.log(data)
        DialerDispoApi.subdispodialer(data)
            .subscribe(res => {
                const maincat = res;
                let tempList1 = [];
                maincat.data.disposition.forEach(element => {
                    tempList1.push(element);
                });
                setDialersubDispo(tempList1);

            })
    }, [maindispo.mainval])


    // Sub sub Dispo

    const [subsubdispo, setSubSubDispo] = useState({ setSubSubDispo: '' });
    function dialerSubSub(value) {
        console.log(value);
        setSubSubDispo({
            setSubSubDispo: value,
        })
    }

    const [dialerSubSubdispo, setDialerSubSubDispo] = useState([]);
    useEffect(() => {

        var data = {
            campaign: props.sakhidispo.camName,
            client: "Orange",
            dispo: maindispo.mainval,
            mainDispo: firstdispo.firstval,
            subDispo: subdispo.submainval
        }
        console.log(data)
        DialerDispoApi.dispoSubSubdialer(data)
            .subscribe(res => {
                const maincat = res;
                let tempList1 = [];
                maincat.data.disposition.forEach(element => {
                    tempList1.push(element);
                });
                setDialerSubSubDispo(tempList1);

            })
    }, [subdispo.submainval])




    return (
        <div>
            <Form
                initialValues={{ remember: true }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="inline">

                <Col xl={24} lg={12} md={12} sm={12} xs={24}>

                    <Widget styleName={`ant-col gx-bg-geekblue `}>
                        <h2 className="gx-text-white" >Disposition</h2>
                        <Row>


                            {/* First dispo */}
                            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Disposition</h2>
                                <FormItem>
                                    <TreeSelect className="gx-w-100"
                                        showSearch
                                        value={dialerFirst.value}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        placeholder="Please select"
                                        allowClear
                                        treeDefaultExpandAll
                                        onChange={dialerFirst}
                                    >

                                        {
                                            dialerFirstdispo.map((element) =>
                                                <TreeNode value={element.mainDispo} key={element.mainDispo} title={element.mainDispo} >
                                                </TreeNode>)

                                        }

                                    </TreeSelect>
                                 </FormItem>
                            </Col>



                            {/* Main dispo */}
                            
                            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Main Disposition</h2>
                                <FormItem>
                                    <TreeSelect className="gx-w-100"
                                        showSearch
                                        value={dialermain.value}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        placeholder="Please select"
                                        allowClear
                                        treeDefaultExpandAll
                                        onChange={dialermain}
                                    >

                                        {
                                            dialerdispo.map((element) =>
                                                <TreeNode value={element.dispo} key={element.dispo} title={element.dispo} >
                                                </TreeNode>)

                                        }

                                    </TreeSelect>
                                </FormItem>
                            </Col>


                            {/* Sub dispo */}
                            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Sub Disposition</h2>
                                <FormItem>
                                    <TreeSelect className="gx-w-100"
                                        showSearch
                                        value={dialersub.value}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        placeholder="Please select"
                                        allowClear
                                        treeDefaultExpandAll
                                        onChange={dialersub}
                                    >

                                        {
                                            dialersubdispo.map((element) =>
                                                <TreeNode value={element.subDispo} key={element.subDispo} title={element.subDispo} >
                                                </TreeNode>)

                                        }

                                    </TreeSelect>
                                </FormItem>
                            </Col>


                            {/* Sub Sub dispo */}
                            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >SubSub Disposition</h2>
                                <FormItem>
                                    <TreeSelect className="gx-w-100"
                                        showSearch
                                        value={dialerSubSub.value}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        placeholder="Please select"
                                        allowClear
                                        treeDefaultExpandAll
                                        onChange={dialerSubSub}
                                    >

                                        {
                                            dialerSubSubdispo.map((element) =>
                                                <TreeNode value={element.subSubDispo} key={element.subSubDispo} title={element.subSubDispo} >
                                                </TreeNode>)

                                        }

                                    </TreeSelect>
                                </FormItem>
                            </Col>




                            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >CallBack</h2>
                                <FormItem>
                                    <DatePicker className="gx-mb-3 gx-w-100"
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="Select Time"
                                        selected={startDate}
                                        onChange={date => datecallback(date)}
                                    />
                                </FormItem>
                            </Col>


                            {/* Remarks */}
                            <Col xl={10} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Remarks</h2>
                                <FormItem>
                                    <TextArea rows={4}
                                        id="remarks" name="remarks" placeholder="Remarks"
                                        value={handleChangeSakhi.value} onChange={handleChangeSakhi}

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
            </Form>


        </div>
    );

};

export default DialerDispositionCard;