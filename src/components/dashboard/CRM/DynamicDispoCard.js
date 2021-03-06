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
import DynamicDispoApi from "./DynamicDispoApi";
//import DynamicDisposition from "./DynamicDisposition";



const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;
const { TextArea } = Input;

function DynamicDispoCard(props) {

    const onFinishFailed = errorInfo => {
        SaveOnSakhi()
        // SaveOnDispo()
    };
    const onFinish = values => {
        SaveOnSakhi()
        // SaveOnDispo()
    };


    function handleChangeSakhi(evt) {
        const value = evt.target.value;
        setSave({
            ...saveon,
            [evt.target.name]: value
        });
        console.log(evt.target.name)
    }
// save Disposition
    const [startDate, setStartDate] = useState({ callback: "" });
    const [savecalldetail, setCallerDetail] = useState({ callId: '',client:'',phoneNo:'', dispo: '', maindispo: '', subdispo: '', subsubdispo: '', callback: '', remarks: '',
    customerName:'' ,district:'',state:'',country:''});

    function datecallback(value) {
        setStartDate({
            callback: value.toISOString().substr(0, 19)
        })
    }

    function SaveOnSakhi() {
        var data = {
            
            callId: props.sakhidispo.id,
            phoneNo:props.sakhidispo.phoneNo,
            client: localStorage.getItem("clientName"),
            dispo: firstClientsdispo.firstval,
            mainDispo:  firstClientsdispo.firstval,
            subDispo: maindispo.mainval,
            subSubdispo: subsubdispo.setSubSubDispo,
            callback: startDate.callback,
            remarks: saveon.remarks,
            customerName:saveon.customerName,
            district:saveon.district,
            state:saveon.state,
            country:saveon.country
            
            // feedback: 0
        }

       DynamicDispoApi.clientsaveDispo(data)
            .subscribe(response => {
               setCallerDetail({
                   
                   callId: response.data.callId,
                   phoneNo:response.data.phoneNo,
                   client: localStorage.getItem("clientName"),
                   mainDispo:  firstClientsdispo.firstval,
                   subDispo: maindispo.mainval,
                   subSubdispo: subsubdispo.setSubSubDispo,
                   callback: startDate.callback,
                   remarks: saveon.remarks,
                   customerName:saveon.customerName,
                   district:saveon.district,
                   state:saveon.state,
                   country:saveon.country

                });
           //console.log("Client Save Dispo " +data)
           
           })
    }
    function SaveOnSakhi() {
        var data = {
            
            callId: props.sakhidispo.id,
            phoneNo:props.sakhidispo.phoneNo,
            client: localStorage.getItem("clientName"),
            //dispo: firstdispo.firstval,
            mainDispo:  firstClientsdispo.firstval,
            subDispo: maindispo.mainval,
            subSubDispo: subsubdispo.setSubSubDispo,
            callback: startDate.callback,
            remarks: saveon.remarks,
            customerName:saveon.customerName,
            district:saveon.district,
            state:saveon.state,
            country:saveon.country
            // feedback: 0
        }
        console.log(data)
        
        DynamicDispoApi.clientsaveDispo(data)
            .subscribe(response => {
              
            })

        DispositionApi.saveAllDispo(data)
            .subscribe(response => {
                setCallerDetail({
                    callId: response.data.callId,
                });
                console.log("Client Save Dispo " +data)
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
         console.log(evt.target.name)
    }






// Find by client
const [firstClientsdispo, setFirstClientsDispo] = useState({ firstval: 'Enquiry' });
function dialerClientFirst(value) {
    console.log(value);
    setFirstClientsDispo({
        firstval: value,
    })
}

const [dialerFirstClientdispo, setDialerClientFirst] = useState([]);

    useEffect(() => {
        var data = {
            client: localStorage.getItem("clientName")
        }
       console.log(data)
        DynamicDispoApi.findclient(data)
            .subscribe(res => {
                console.log(res.data)
                const maincat = res;
                let tempList1 = [];
                maincat.data.disposition.forEach(element => {
                    tempList1.push(element.mainDispo);
                });
                setDialerClientFirst(tempList1);

            })
    }, [])


 // Main Disposition
    const [maindispo, setMainDispo] = useState({ mainval: 'Ragukala pooja' });
    function dialermain(value) {
        console.log(value);
        setMainDispo({
            mainval: value,
        })
    }

    const [dialerdispo, setDialerDispo] = useState([]);
    useEffect(() => {
        var data = {
            // campaignName: props.sakhidispo.camName,
            // client: localStorage.getItem("clientName"),
            mainDispo: firstClientsdispo.firstval
        }
       // console.log(data)
        DynamicDispoApi.dispodialerMain(data)
            .subscribe(res => {
                console.log(res.data)
                const maincat = res;
                let tempList1 = [];
                maincat.data.disposition.forEach(element => {
                    tempList1.push(element.subDispo);
                });
                setDialerDispo(tempList1);
           
            })
    }, [firstClientsdispo.firstval])


    //  sub Disposition
    const [subdispo, setSubDispo] = useState({ submainval: '' });
    function dialersub(value) {
        //console.log(value);
        setSubDispo({
            submainval: value,
        })
        console.log(subdispo)
    }
 const [dialersubdispo, setDialersubDispo] = useState([]);
    useEffect(() => {
        var data = {
            // campaignName: props.sakhidispo.camName,
            // client: localStorage.getItem("clientName"),
            // mainDispo: firstdispo.firstval,
            subDispo: maindispo.mainval
        }
        //console.log(data)
        DynamicDispoApi.subdispodialer(data)
            .subscribe(res => {
                const maincat = res;
                let tempList1 = [];
                maincat.data.disposition.forEach(element => {
                    tempList1.push(element.subSubDispo);
                });
                setDialersubDispo(tempList1);

            })
    }, [maindispo.mainval])

// Sub sub disposition

    const [subsubdispo, setSubSubDispo] = useState({ setSubSubDispo: '' });
    function dialerSubSub(value) {
       // console.log(value);
        setSubSubDispo({
            setSubSubDispo: value,
        })
    }

    const [dialerSubSubdispo, setDialerSubSubDispo] = useState([]);
     useEffect(() => {

         var data = {
    //         campaignName: props.sakhidispo.camName,
    //         client: localStorage.getItem("clientName"),
    //         mainDispo: firstdispo.firstval,
    //         dispoItem: maindispo.mainval,
    //         subDispo: subdispo.submainval
              subSubDispo: subsubdispo.setSubSubDispo
         }
      // console.log(data)
       DynamicDispoApi.dispoSubSubdialer(data)
        .subscribe(res => {
               const maincat = res;
                 let tempList1 = [];
                 maincat.data.disposition.forEach(element => {
                    tempList1.push(element.subSubDispo);
                 });
                 setDialerSubSubDispo(tempList1);

             })
     }, [subsubdispo.setSubSubDispo])

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


                            {/* Main disposition */}
                            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Main Disposition</h2>
                                <FormItem>
                                    <TreeSelect className="gx-w-100"
                                        showSearch
                                        value={dialerClientFirst.value}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        placeholder="Please select"
                                        allowClear
                                        treeDefaultExpandAll
                                        onChange={dialerClientFirst}
                                    >

                                        {
                                            dialerFirstClientdispo.map((mainDispo, id) =>
                                                <TreeNode value={mainDispo} key={id} title={mainDispo} >
                                                </TreeNode>)

                                        }

                                    </TreeSelect>
                                </FormItem>
                            </Col>



                            {/* sub disposition */}
                            
                            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Sub Disposition</h2>
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
                                            dialerdispo.map((subDispo, id) =>
                                                <TreeNode value={subDispo} key={id} title={subDispo} >
                                                </TreeNode>)

                                        }

                                    </TreeSelect>
                                </FormItem>
                            </Col>


                            {/* SubSub disposition */}
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
                                            dialersubdispo.map((subSubDispo, id) =>
                                                <TreeNode value={subSubDispo} key={id} title={subSubDispo} >
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
                            {/* Customer Name */}
                          <Col xl={10} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" >Customer Name</h2>
                                <FormItem>
                                    <TextArea rows={1}
                                        id="customerName" name="customerName" placeholder="customername"
                                        value={saveon.customerName} onChange={handleChangeSakhi}

                                    />
                                </FormItem>
                            </Col>

                           {/* Districtwise */}
                             <Col xl={8} lg={10} md={10} sm={10} xs={20}>
                                <h2 className="gx-text-white" > District</h2>
                                <FormItem>
                  
                                    <TextArea rows={1}
                                        id="district" name="district" placeholder="district"
                                        value={saveon.district} onChange={handleChangeSakhi}

                                    />
                                </FormItem>
                            </Col>
                            {/* Statetwise */}
                            <Col xl={10} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" > State</h2>
                                <FormItem>
                  
                                    <TextArea rows={1}
                                        id="state" name="state" placeholder="state"
                                        value={saveon.state} onChange={handleChangeSakhi}

                                    />
                                </FormItem>
                            </Col>
                           {/* Country */}
                           <Col xl={8} lg={10} md={10} sm={10} xs={20}>
                                <h2 className="gx-text-white" > Country</h2>
                                <FormItem>
                  
                                    <TextArea rows={1}
                                        id="country" name="country" placeholder="country"
                                        value={saveon.country} onChange={handleChangeSakhi}

                                    />
                                </FormItem>
                            </Col>
                             {/*  Details and Remarks */}
                             <Col xl={10} lg={12} md={12} sm={12} xs={24}>
                                <h2 className="gx-text-white" > Details and Remarks</h2>
                                <FormItem>
                  
                                    <TextArea rows={4}
                                        id="remarks" name="remarks" placeholder="Remarks"
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
            </Form>



        
        
        
        </div>



    );

};

export default DynamicDispoCard;