import React from "react";
import {Col, Button, TreeSelect, DatePicker, Input, TimePicker, Row} from 'antd';
import {Form } from "antd";
import { useState ,useContext, useEffect} from 'react'
import DispositionApi from "components/dashboard/CRM/DispositionApi";
import 'react-dropdown-tree-select/dist/styles.css'
import moment from "moment";
import { UserContext } from "./UserContext";
import Auxiliary from "util/Auxiliary";
import { DispoContext } from "./DispoContext";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import Widget from "components/Widget/index";
import PrankApi from "./PrankApi";


const FormItem = Form.Item;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const PrankBlock = (props) =>{

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
const [saveon, setSave] = useState({ phoneNo:'Not Disclosed'});

function handleAddtoPrank(evt) {
  const value = evt.target.value;
  setSave({
    ...saveon,
    [evt.target.name]: value
  });
}

        function SaveOnSakhi () {
          var data = { 
            phoneNo: saveon.phoneNo,
          }
        

          PrankApi.savePrank(data)
            .subscribe(response => {
              setSave({
                phoneNo: response.data.phoneNo
              });
            
            })
          }
  // save Disposition

  let [pranklist, setPrankList] = useState([]);

  useEffect(() =>{
    PrankApi.showAllPrank()
    .subscribe(res=>{ 
      let tempList = [];
      res.data.model.forEach(element => {
        tempList.push(element.phoneNo);
      });
      setPrankList(tempList);
    })
  },[])


const [delval, setDelVal] = useState({val:''})
function onChangeBlockedNumber(value) {
    
    setDelVal({
        val: value
    })
  }



function DeleteprankNumber () {
    var data = { 
      phoneNo: delval.val
    }


    PrankApi.deletePrank(data)
      .subscribe(response => {
        setSave({
          phoneNo: response.data.phoneNo
        });
      
      })
    }




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


function onChangeMarital(value) {
  saveon.martialstatus=value;
}

// Functions for save 




  return (
<Auxiliary>

    <AdminHeader/>
    
    <Widget styleName={`ant-col gx-bg-geekblue `}>


<Form
      initialValues={{ remember: true }}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="inline">



<Col xl={24} lg={12} md={12} sm={12} xs={24}>
<h2 className="gx-text-white" >Prank Number Details</h2>
</Col>
<Row>
{/* Block Number*/}
<Col xl={24} lg={12} md={12} sm={12} xs={24}>
<h2 className="gx-text-white" >Block Prank Number</h2>
      <FormItem>
         <Input id="phoneNo" name="phoneNo" type="text" placeholder="Block Prank Number" 
         value={handleAddtoPrank.value} onChange={handleAddtoPrank}
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
                              onClick={SaveOnSakhi}
                      >
                        Add to Block List
                      </Button>
                    </FormItem>
            </Col>
            </Row>
            <Row>

    

{/* Blocked number list*/}
<Col xl={24} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-white" >List of Blocked Number</h2>
            <FormItem>
            <TreeSelect  className="gx-w-100"
                    showSearch
                    value={onChangeBlockedNumber.value}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChangeBlockedNumber}
          >

            {  
             pranklist.map((phoneNo, id)  => 
            
             <TreeNode   value = {phoneNo} key={id} title={phoneNo} > 
              </TreeNode>
            )
             }

          </TreeSelect>
        </FormItem>
      </Col>


 {/* Submit Button */}
 <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                  <FormItem>
                      <Button className="gx-mb-0"
                      className="gx-btn-orange  gx-mb-1"
                              type="primary"
                              htmlType="submit"
                               onClick={DeleteprankNumber}
                      >
                        Remove From Block List
                      </Button>
                    </FormItem>
            </Col>
       </Row>
            

</Form> 

</Widget>
</Auxiliary>
  );

}

export default PrankBlock;
