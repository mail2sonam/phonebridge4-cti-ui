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
import Auxiliary from "util/Auxiliary";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const PerpetratorDetails = (props) =>{

    
  const {MonthPicker, RangePicker} = DatePicker;
  const {TextArea} = Input;
  const Option = Select.Option;

function onOk(value) {

}

//datepicker 
var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0,10);
var timedefault  = curr.getHours() + ':' + curr.getMinutes() + ':' + curr.getSeconds();
const dateFormat = 'YYYY/MM/DD';
const timeFormat = 'H:m:s';
const monthFormat = 'YYYY/MM';
//datepicker

//TreeSelect and Date Property
const [other, setOthers] =useState({aggr:'no'});
const [otherEducation, setOthersEdu] =useState({educ:'no'});
const [incPlace, setIncOtherPlace] =useState({place:'no'});
const [caseCat, setCaseOtherCat] =useState({cat:'no'});
const [perpetrator, setPerpetrator] =useState({perpr: 'no'});
const [serviceOff, setServiceOff] =useState({serOff:'no'});

function onChangeAggr(value) {
  saveon.aggreviedornot=value;
  setOthers({
    aggr: value
  })
}
function onChangePerperaor(value) {
  saveon.perpetratordetails=value;
  setPerpetrator({
    perpr: value
  })
}
function onChangeMarital(value) {
  saveon.martialstatus=value;
}
function onChangeEducation(value) {
  saveon.education=value;
  setOthersEdu({
    educ: value
  })
}
function onChangeIncPlace(value) {
  saveon.incidentplace=value;
  setIncOtherPlace({
    place: value
  })
}
function onChangeFrequency(value) {
  saveon.frequency=value;
}
function onChangeStatusOfInc(value) {
}
function onChangeGenCat(value) {
  saveon.generalisationcategory=value;
  setCaseOtherCat({
    cat: value
  })
}
function onChangeServiceOff(value) {
  setServiceOff({
    serOff: value
  })
}
function onChangeAbuseType(value) {
  saveon.abusetype=value;
}
function onChangeGender(value) {
}
function onChangeDateofInc(value) {
  saveon.incidentdate=value._i;
}
function onChangeIncTime(value ) {
  saveon.incidentTime=value._i
}
function onChangeOccupation(value ) {
  saveon.occupation=value._i
}
function onChange(value) {
}

//TreeSelect and Date Property

const TreeNode = TreeSelect.TreeNode;
const msg = useContext(UserContext);

// save Disposition
const [saveon, setSave] = useState({ name:'Not Disclosed', phonenumber:'', age:'Not Disclosed',education:'Not Mention', occupation:'Not Mention',aggreviedornot:'Not Mention', martialstatus:'Not Disclosed',
address:'Not Disclosed', frequency:'Not Mention', typeofabuse:'Not Disclosed', sakthiid:'', personalidentity:'Not Mention',incidentplace:'Not Mention',generalisationcategory:'Not Disclosed',notes:'Not Mention', 
perpetratordetails:'Not Mention',incidentdate: moment(date, dateFormat)._i , incidentTime: moment(timedefault,timeFormat)._i ,
typeOfCall_other:'', });

function handleChangeSakhi(evt) {
  const value = evt.target.value;
  setSave({
    ...saveon,
    [evt.target.name]: value
  });
}

        function SaveOnSakhi () {
          var data = { 
            callid: props.sakhidispo.id,
            name: saveon.name,
            extension: props.sakhidispo.extension,
            phonenumber: props.sakhidispo.phoneNo,
            age: saveon.age,
            education: saveon.education,
            occupation: saveon.occupation,
            aggreviedornot: saveon.aggreviedornot,
            martialstatus: saveon.martialstatus,
            address: saveon.address,
            frequency: saveon.frequency,
            typeofabuse: saveon.abusetype,
            sakthiid: saveon.sakthiid,
            personalidentity: saveon.personalidentity,
            incidentplace: saveon.incidentplace,
            generalisationcategory: saveon.generalisationcategory,
            notes: saveon.notes,
            perpetratordetails: saveon.perpetratordetails,
            incidentdate: saveon.incidentdate,
            incidentTime: saveon.incidentTime,
            
            typeOfCall: saveon.typeOfCall,

          }
  

          DispositionApi.saveSakhiDispo(data)
            .subscribe(response => {
              setSave({
                disposition: response.data.disposition,
                extension: response.data.extension,
                name: response.data.name,
                phonenumber: response.data.phonenumber,
                age: response.data.age,
                education: response.data.education,
                occupation: response.data.occupation,
                aggreviedornot: response.data.aggreviedornot,
                martialstatus: response.data.martialstatus,
                address: response.data.address,
                frequency: response.data.frequency,
                typeofabuse: response.data.typeofabuse,
                sakthiid: response.data.sakthiid,
                personalidentity: response.data.personalidentity,
                incidentplace: response.data.incidentplace,
                generalisationcategory: response.data.generalisationcategory,
                notes: response.data.notes,
                perpetratordetails: response.data.perpetratordetails,
                incidentdate: response.data.incidentdate,
                incidentTime: response.data.incidentTime,
              });
         
            })
          }
  // save Disposition



// Checkbox Property
const [formcheck, setFormCheck] = useState({formpass: false})
  const onFinishFailed = errorInfo => {
    SaveOnSakhi()
  };
  const onFinish = values => {
    SaveOnSakhi()
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
const [chec, setCheck] =useState({typeofcall:''});

function onChangeCheck(value) {
  saveon.typeOfCall= value;
  setCheck({
    typeofcall: value
  })
}
// Checkbox Property


  return (
<Auxiliary>
<Form
      initialValues={{ remember: true }}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="inline">


{/* Perpetrator Details */}
<Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Perpetrator Details</h2>
            <FormItem>
            <TreeSelect className="gx-w-100"
                    showSearch
                    value={onChangePerperaor.value}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChangePerperaor}
          >

        <TreeNode value="Spouse" title="Spouse" key="82">
                <TreeNode value="Husband" title="Husband" key="83"/>
                <TreeNode value="Wife" title="Wife" key="84"/>

        </TreeNode>
        <TreeNode value="In Laws" title="In Laws" key="85">
                <TreeNode value="Father In law" title="Father In law" key="86"/>
                <TreeNode value="Mother in law" title="Mother in law" key="87"/>
                <TreeNode value="Brother In law" title="Brother In law" key="88"/>
                <TreeNode value="Sister In  law" title="Sister In  law" key="89"/>
        </TreeNode>
        <TreeNode value="Parents" title="Parents" key="90">
                <TreeNode value="Father " title="Father " key="91"/>
                <TreeNode value="Mother" title="Mother" key="92"/>
        </TreeNode>
        <TreeNode value="Siblings " title="Siblings " key="93">
                <TreeNode value="Brother " title="Brother " key="94"/>
                <TreeNode value="Sister" title="Sister" key="95"/>
        </TreeNode>
        <TreeNode value="Relatives" title="Relatives" key="96">
                <TreeNode value="Uncle " title="Uncle " key="97"/>
                <TreeNode value="Aunt" title="Aunt" key="98"/>
                <TreeNode value="Nephew " title="Nephew " key="99"/>
                <TreeNode value="Niece" title="Niece" key="100"/>
        </TreeNode>
        <TreeNode value="Friend" title="Friend" key="101">
        </TreeNode>
        <TreeNode value="Neighbour" title="Neighbour" key="102">
        </TreeNode>
        <TreeNode value="Employer" title="Employer" key="103">
        </TreeNode>
        <TreeNode value="Not Disclosed" title="Not Disclosed" key="127">
        </TreeNode>
        <TreeNode value="Others" title="Others" key="104">
        </TreeNode>

      </TreeSelect>
            </FormItem>
      </Col>

{/* Addiction */}
<Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Addiction</h2>
            <FormItem>
            <TreeSelect className="gx-w-100"
                    showSearch
                    // value={onChangeStatusOfInc.value}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    // onChange={onChangeStatusOfInc}
          >

        <TreeNode value="Alcoholism" title="Alcoholism" key="148">
        </TreeNode>
        <TreeNode value="Drug Addition" title="Drug Addition" key="149">
        </TreeNode>
        <TreeNode value="Mental Disorders" title="Mental Disorders" key="150">
        </TreeNode>
        <TreeNode value="Not mentioned" title="Not mentioned" key="151">
        </TreeNode>
        <TreeNode value="Not Disclosed" title="Not Disclosed" key="183">
        </TreeNode>
        <TreeNode value="Others" title="Others" key="152">
        </TreeNode>

    </TreeSelect>
            </FormItem>
      </Col>


 {/* Perpetrator Other TextBox */}
 { perpetrator.perpr =="no" || perpetrator.perpr =="Not mentioned"
            ?<null/>
             :<Col xl={24} lg={12} md={12} sm={12} xs={24}>
             <Widget styleName={`ant-col gx-bg-geekblue `}>
             <h3 className="gx-text-white" >Personal Details of the Perpetrator</h3>  
       <Row> 
         
                 <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                     <h3 className="gx-text-white" >Name</h3>      
                     <FormItem>        
                         <Input id="name" name="name" placeholder="Name"/>
                   </FormItem>
                 </Col>
                 <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                     <h3 className="gx-text-white" >Age</h3>      
                     <FormItem>
            <TreeSelect className="gx-w-100"
                    showSearch
                    // value={onChangeGender.value}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    // onChange={onChangeGender}
              >

                <TreeNode value="0-6 Years" title="0-6 Years" key="225">
                </TreeNode>
                <TreeNode value="7-12 Years" title="7-12 Years" key="226">
                </TreeNode>
                <TreeNode value="13-17 Years" title="13-17 Years" key="227">
                </TreeNode>
                <TreeNode value="18-25 Years" title="18-25 Years" key="228">
                </TreeNode>
                <TreeNode value="26-35 Years" title="26-35 Years" key="229">
                </TreeNode>
                <TreeNode value="35-45 Years" title="35-45 Years" key="230">
                </TreeNode>
                <TreeNode value="45-59 Years" title="45-59 Years" key="231">
                </TreeNode>
                <TreeNode value="60-70 Years" title="60-70 Years" key="232">
                </TreeNode>
                <TreeNode value="70-80 Years" title="70-80 Years" key="233">
                </TreeNode>
                <TreeNode value="80-90 Years" title="80-90 Years" key="234">
                </TreeNode>
            </TreeSelect>
            </FormItem>
                 </Col>
                 <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                     <h2 className="gx-text-white" >Gender</h2>  
                     <FormItem>
                    <TreeSelect className="gx-w-100"
                            showSearch
                            // value={onChangeGender.value}
                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            // onChange={onChangeGender}
                      >

                        <TreeNode value="Male" title="Male" key="153">
                        </TreeNode>
                        <TreeNode value="Female" title="Female" key="154">
                        </TreeNode>
                        <TreeNode value="Other Gender" title="Other Gender" key="155">
                        </TreeNode>
                        <TreeNode value="Not Disclosed" title="Not Disclosed" key="156">
                        </TreeNode>

                    </TreeSelect>
                    </FormItem>
                 </Col>
                 <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                     <h2 className="gx-text-white" >Mobile</h2>     
                     <FormItem >   
                         <Input id="name" name="name" placeholder="Mobile" />
                     </FormItem>
                 </Col>
                 <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                     <h2 className="gx-text-white" >Occupation</h2>       
                     <FormItem>
                  <TreeSelect className="gx-w-100"
                          showSearch
                          // value={onChangeOccupation.value}
                          dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                          placeholder="Please select"
                          allowClear
                          treeDefaultExpandAll
                          // onChange={onChangeOccupation}      
                >
                      <TreeNode value="Agriculturist" title="Agriculturist" key="157">
                      </TreeNode>
                      <TreeNode value="Archaeologist" title="Archaeologist" key="158">
                      </TreeNode>
                      <TreeNode value="Driver" title="Driver" key="159">
                      </TreeNode>
                      <TreeNode value="Doctor" title="Doctor" key="160">
                      </TreeNode>
                      <TreeNode value="Engineer" title="Engineer" key="161">
                      </TreeNode>
                      <TreeNode value="Nurse" title="Nurse" key="162">
                      </TreeNode>
                      <TreeNode value="Paramedical Staff" title="Paramedical Staff" key="163">
                      </TreeNode>
                      <TreeNode value="Central Government Service" title="Central Government Service" key="164">
                      </TreeNode>
                      <TreeNode value="State Government Service" title="State Government Service" key="165">
                      </TreeNode>
                      <TreeNode value="Police" title="Police" key="166">
                      </TreeNode>
                      <TreeNode value="Financial Service" title="Financial Service" key="167">
                      </TreeNode>
                      <TreeNode value="Banking & Insurance" title="Banking & Insurance" key="168">
                      </TreeNode>
                      <TreeNode value="Lawyer" title="Lawyer" key="169">
                      </TreeNode>
                      <TreeNode value="Teacher" title="Teacher" key="170">
                      </TreeNode>
                      <TreeNode value="Business" title="Business" key="171">
                      </TreeNode>
                      <TreeNode value="Domestic Help" title="Domestic Help" key="221">
                      </TreeNode>
                      <TreeNode value="Education " title="Education " key="222">
                      </TreeNode>
                      <TreeNode value="Home Maker" title="Home Maker" key="223">
                      </TreeNode>
                      <TreeNode value="Legal Service" title="Legal Service" key="224">
                      </TreeNode>
                      <TreeNode value="Not Disclosed" title="Not Disclosed" key="176">
                      </TreeNode>
                      <TreeNode value="Others" title="Others" key="172">
                      </TreeNode>
                    </TreeSelect>
              </FormItem>
                 </Col>
                
                 {/* <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                     <h2 className="gx-text-white" >Profession</h2>    
                     <FormItem>     
                         <Input id="name" name="name" placeholder="Profession" />
                         </FormItem>
                 </Col> */}
           </Row>
         </Widget>
     </Col> 
}


</Form> 
</Auxiliary>
  );

}

export default PerpetratorDetails;
