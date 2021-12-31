import React from "react";
import { Col, Row, Card, Checkbox, TreeSelect, DatePicker, TimePicker } from 'antd';
import { Button, Form, Input, InputNumber } from "antd";
import { useState, useEffect } from 'react'
import 'react-dropdown-tree-select/dist/styles.css'
import Widget from "components/Widget/index";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import UserList from "./UserList";
import DialerDispoApi from "./DialerDispoApi";

const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;
const { TextArea } = Input;

function Demopage() {

    const onFinishFailed = errorInfo => {
    };
    const onFinish = values => {
    };


    // save Disposition
    const [saveon, setSave] = useState({ esRemarks: 'Not Disclosed' });


    function handleChangeSakhi(evt) {
        const value = evt.target.value;
        setSave({
            ...saveon,
            [evt.target.name]: value
        });
    }



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

        DialerDispoApi.dispodialer()
            .subscribe(res => {
                const maincat = res;
                let tempList1 = [];
                maincat.data.disposition.forEach(element => {
                    tempList1.push(element.dispoItem);
                });
                setDialerDispo(tempList1);

            })
    }, [])


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
            // campaignName: localStorage.getItem("dialerCampaign"),
            campaignName: "Charges Calling",
            dispoItem: maindispo.mainval
        }

        DialerDispoApi.subdispodialer(data)
            .subscribe(res => {
                const maincat = res;
                let tempList1 = [];
                maincat.data.disposition.forEach(element => {
                    tempList1.push(element.subDispoItem);
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
            // campaignName: localStorage.getItem("dialerCampaign"),
            campaignName: "Charges Calling",
            dispoItem: maindispo.mainval,
            subDispoItem: subdispo.submainval
        }

        DialerDispoApi.dispoSubSubdialer(data)
            .subscribe(res => {
                const maincat = res;
                let tempList1 = [];
                maincat.data.disposition.forEach(element => {
                    tempList1.push(element.subsubDispoItem);
                });
                setDialerSubSubDispo(tempList1);

            })
    }, [subdispo.submainval])




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
                        <h2 className="gx-text-white" >Disposition</h2>
                        
                        <Row>

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
                                            dialerdispo.map((dispoItem, id) =>
                                                <TreeNode value={dispoItem} key={id} title={dispoItem} >
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
                                            dialersubdispo.map((subDispoItem, id) =>
                                                <TreeNode value={subDispoItem} key={id} title={subDispoItem} >
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
                                            dialerSubSubdispo.map((subsubDispoItem, id) =>
                                                <TreeNode value={subsubDispoItem} key={id} title={subsubDispoItem} >
                                                </TreeNode>)

                                        }

                                    </TreeSelect>
                                </FormItem>
                            </Col>
                           

                           {/* Remarks */}
                            <Col xl={10} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Remarks</h2>
                                <FormItem>
                                    <TextArea rows={4}
                                        id="esRemarks" name="esRemarks" placeholder="Remarks"
                                        value={handleChangeSakhi.value} onChange={handleChangeSakhi}

                                    />
                                </FormItem>
                            </Col>
                            {/* Remarks */}
                            <Col xl={10} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Type of Query</h2>
                                <FormItem>
                                    <TextArea rows={4}
                                        id="esRemarks" name="esRemarks" placeholder="Remarks"
                                        value={handleChangeSakhi.value} onChange={handleChangeSakhi}

                                    />
                                </FormItem>
                            </Col>
                            {/* Remarks */}
                            <Col xl={10} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >caller Id</h2>
                                <FormItem>
                                    <TextArea rows={4}
                                        id="esRemarks" name="esRemarks" placeholder="Remarks"
                                        value={handleChangeSakhi.value} onChange={handleChangeSakhi}

                                    />
                                </FormItem>
                            </Col>



                            <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                                <FormItem>
                                    <Button className="gx-mb-0"
                                        className="gx-btn-orange  gx-mb-1"
                                        type="primary"


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

export default Demopage;