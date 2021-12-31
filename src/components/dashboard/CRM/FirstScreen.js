import React from "react";
import {Col, Button, TreeSelect, DatePicker, TimePicker} from 'antd';
import {Form } from "antd";
import { useState ,useContext} from 'react'
import DispositionApi from "components/dashboard/CRM/DispositionApi";
import 'react-dropdown-tree-select/dist/styles.css'
import moment from "moment";
import { UserContext } from "./UserContext";
import Auxiliary from "util/Auxiliary";
import { DispoContext } from "./DispoContext";

const FormItem = Form.Item;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const FirstScreen = (props) =>{

const {MonthPicker, RangePicker} = DatePicker;
function onOk(value) {

}

//datepicker 
var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0,10);
var timedefault  = curr.getHours() + ':' + curr.getMinutes() + ':' + curr.getSeconds();
const dateFormat = 'YYYY/MM/DD ';
const timeFormat = ' H:m:s';
//datepicker

const TreeNode = TreeSelect.TreeNode;
const msg = useContext(UserContext);

// save Disposition
const [saveon, setSave] = useState({ callType:'Not Disclosed', incidentdate:moment(date, dateFormat), incidentTime:moment(timedefault,timeFormat)});

function handleChangeSakhi(evt) {
  const value = evt.target.value;
  setSave({
    ...saveon,
    [evt.target.name]: value
  });
}

        function SaveOnSakhi () {
          var data = { 
            callId: props.FirstScreenCallerID,
            callType: saveon.callType,
            incidentdate: saveon.incidentdate,
            incidentTime: saveon.incidentTime,
          }
 

          DispositionApi.saveCallDetails(data)
            .subscribe(response => {
              setSave({
                callType: response.data.callType,
                incidentdate: response.data.incidentdate,
                incidentTime: response.data.incidentTime,

              });
      
            })
          }
  // save Disposition



// Checkbox Property
const onFinishFailed = errorInfo => {

  };
  const onFinish = values => {
  
  };
// Checkbox Property


// Functions for save 
const [typeofCall, setTypeofCall] =useState({callType:'no'});
const [callDate, setCallDate] =useState({dateofCall:'no'});
const [CallTime, setCalltime] =useState({timeofCall:'no'});

function onChangeTypeOfCall(value) {
  saveon.callType = value;
  setTypeofCall({
    callType: value
  })
}
function onChangeCallDate(value) {
  saveon.incidentdate = value;
  setCallDate({
    incidentdate: value
  })
}
function onChangeCallTime(value) {
  saveon.incidentTime = value;
  setCalltime({
    incidentTime: value
  })
}

function onChangeMarital(value) {
  saveon.martialstatus=value;
}

// Functions for save 




  return (
<Auxiliary>
<Form
      initialValues={{ remember: true }}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="inline">

{/* Type of Calls */}
<Col xl={6} lg={12} md={12} sm={12} xs={24}>
<h2 className="gx-text-black" >Type of Call</h2>
<FormItem>
          <TreeSelect className="gx-w-100"
                  showSearch
                  value={onChangeTypeOfCall.value}
                  dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
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
            </TreeSelect>
      </FormItem>
</Col>


<Col xl={4} lg={12} md={12} sm={12} xs={24}>
      <h2 className="gx-text-black" >Call Date</h2>
     <FormItem >
            <DatePicker className="gx-mb-3 gx-w-100" defaultValue={moment(date, dateFormat)} format={dateFormat}           
            disabled   onChange={onChangeCallDate}                      
              />                     
  </FormItem>

</Col>

<Col xl={4} lg={12} md={12} sm={12} xs={24}>
      <h2 className="gx-text-black" >Call Time</h2>
     <FormItem >
      <TimePicker className="gx-mb-3 gx-w-100" defaultValue={moment(timedefault,timeFormat)} format={timeFormat}
        disabled   onChange={onChangeCallTime}
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
                        Save
                      </Button>
                    </FormItem>
            </Col>

</Form> 
</Auxiliary>
  );

}

export default FirstScreen;
