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
import SubCategory from "./SubCategory";
import SubCat2 from "./SubCat2";
import { DispoContext } from "./DispoContext";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const CaseCategoryDetails = (props) =>{

    
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
const [caseCat2, setCaseOtherCat2] =useState({cat2:'no'});
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
function onChangeGenCat2(value) {
  saveon.generalisationcategory2=value;
  setCaseOtherCat2({
    cat2: value
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
typeOfCall_other:'', generalisationcategory2:'Not Disclosed'});

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
            generalisationcategory2 : saveon.generalisationcategory2,

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

                generalisationcategory2: response.data.generalisationcategory2,
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


      <Col span={24}>
            <Row>
{/* Case Category 1 */}
<Col lg={6} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Case Category 1*</h2>
          {
            chec.typeofcall=="Prank Calls" || chec.typeofcall== "Information Calls"
           ? <FormItem>
                    <TreeSelect className="gx-w-100"
                            showSearch
                            value={onChangeGenCat.value}
                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            onChange={onChangeGenCat}
                  >
                <TreeNode value="Domestic Violence" title="Domestic Violence" key="18">  
                </TreeNode>
                <TreeNode value="Sexual Violence" title="Sexual Violence" key="24">
                </TreeNode>
                <TreeNode value="Crime Against Children" title="Crime Against Children" key="34">                 
                </TreeNode>
                <TreeNode value="Mental Health Issues-for Self" title="Mental Health Issues-for Self" key="65">
                </TreeNode>
                <TreeNode value="Crime Related" title="Crime Related" key="69">
                </TreeNode>
                <TreeNode value="Cyber Crime" title="Cyber Crime" key="39">
                </TreeNode>
                <TreeNode value="Legal Disputes" title="Legal Disputes" key="237">
                </TreeNode>
                <TreeNode value="Rescues & Emergencies" title="Rescues & Emergencies" key="238">
                </TreeNode>
                <TreeNode value="Other Complaints & Queries" title="Other Complaints & Queries" key="239">
                </TreeNode>
                <TreeNode value="Others" title="Others" key="64">        
                </TreeNode>
                <TreeNode value="Not Disclosed" title="Not Disclosed" key="185">
                </TreeNode>

            </TreeSelect>
          </FormItem>

        :<FormItem rules={[{ required: true, message: 'Assuming - Not Disclosed!' }]} name="generalCatgory">
                      <TreeSelect className="gx-w-100"
                              showSearch
                              value={onChangeGenCat.value}
                              dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                              placeholder="Please select"
                              allowClear
                              treeDefaultExpandAll
                              onChange={onChangeGenCat}
                      >
                      <TreeNode value="Domestic Violence" title="Domestic Violence" key="18">  
                </TreeNode>
                <TreeNode value="Sexual Violence" title="Sexual Violence" key="24">
                </TreeNode>
                <TreeNode value="Crime Against Children" title="Crime Against Children" key="34">                 
                </TreeNode>
                <TreeNode value="Mental Health Issues-for Self" title="Mental Health Issues-for Self" key="65">
                </TreeNode>
                <TreeNode value="Crime Related" title="Crime Related" key="69">
                </TreeNode>
                <TreeNode value="Cyber Crime" title="Cyber Crime" key="39">
                </TreeNode>
                <TreeNode value="Legal Disputes" title="Legal Disputes" key="237">
                </TreeNode>
                <TreeNode value="Rescues & Emergencies" title="Rescues & Emergencies" key="238">
                </TreeNode>
                <TreeNode value="Other Complaints & Queries" title="Other Complaints & Queries" key="239">
                </TreeNode>
                <TreeNode value="Others" title="Others" key="64">        
                </TreeNode>
                <TreeNode value="Not Disclosed" title="Not Disclosed" key="185">
                </TreeNode>

                </TreeSelect>
            </FormItem>
          }
      </Col>
  
{/* Case Category 2 */}
<Col lg={6} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Case Category 2*</h2>
          {
            chec.typeofcall=="Prank Calls" || chec.typeofcall== "Information Calls"
           ? <FormItem>
                    <TreeSelect className="gx-w-100"
                            showSearch
                            value={onChangeGenCat2.value}
                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            onChange={onChangeGenCat2}
                  >
                <TreeNode value="Domestic Violence" title="Domestic Violence" key="18">  
                </TreeNode>
                <TreeNode value="Sexual Violence" title="Sexual Violence" key="24">
                </TreeNode>
                <TreeNode value="Crime Against Children" title="Crime Against Children" key="34">                 
                </TreeNode>
                <TreeNode value="Mental Health Issues-for Self" title="Mental Health Issues-for Self" key="65">
                </TreeNode>
                <TreeNode value="Crime Related" title="Crime Related" key="69">
                </TreeNode>
                <TreeNode value="Cyber Crime" title="Cyber Crime" key="39">
                </TreeNode>
                 <TreeNode value="Legal Disputes" title="Legal Disputes" key="237">
                </TreeNode>
                <TreeNode value="Rescues & Emergencies" title="Rescues & Emergencies" key="238">
                </TreeNode>
                <TreeNode value="Other Complaints & Queries" title="Other Complaints & Queries" key="239">
                </TreeNode>
                <TreeNode value="Others" title="Others" key="64">        
                </TreeNode>
                <TreeNode value="Not Disclosed" title="Not Disclosed" key="185">
                </TreeNode>

            </TreeSelect>
          </FormItem>

        :<FormItem rules={[{ required: true, message: 'Assuming - Not Disclosed!' }]} name="generalCatgory2">
                      <TreeSelect className="gx-w-100"
                              showSearch
                              value={onChangeGenCat2.value}
                              dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                              placeholder="Please select"
                              allowClear
                              treeDefaultExpandAll
                              onChange={onChangeGenCat2}
                      >
                      <TreeNode value="Domestic Violence" title="Domestic Violence" key="18">  
                </TreeNode>
                <TreeNode value="Sexual Violence" title="Sexual Violence" key="24">
                </TreeNode>
                <TreeNode value="Crime Against Children" title="Crime Against Children" key="34">                 
                </TreeNode>
                <TreeNode value="Mental Health Issues-for Self" title="Mental Health Issues-for Self" key="65">
                </TreeNode>
                <TreeNode value="Crime Related" title="Crime Related" key="69">
                </TreeNode>
                <TreeNode value="Cyber Crime" title="Cyber Crime" key="39">
                </TreeNode>
                <TreeNode value="Legal Disputes" title="Legal Disputes" key="237">
                </TreeNode>
                <TreeNode value="Rescues & Emergencies" title="Rescues & Emergencies" key="238">
                </TreeNode>
                <TreeNode value="Other Complaints & Queries" title="Other Complaints & Queries" key="239">
                </TreeNode>
                <TreeNode value="Others" title="Others" key="64">        
                </TreeNode>
                <TreeNode value="Not Disclosed" title="Not Disclosed" key="185">
                </TreeNode>

                </TreeSelect>
            </FormItem>
          }
      </Col>
  


{/* Blank */}
<Col  lg={6} md={12} sm={12} xs={24}>

      </Col>

</Row>
</Col>



      <Col span={24}>
            <Row>
  {/* Sub Case Catagory 1 */}
  <Col lg={6} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Sub Case Category 1</h2>
          <Col  lg={24} md={12} sm={12} xs={24}>
          <UserContext.Provider value={caseCat.cat}> 
                <SubCategory/>
          </UserContext.Provider>
          </Col>
            {/* <FormItem>
                <Input id="Sub Case Catagory" name="Sub Case Catagory" placeholder="Sub Case Category"/>
            </FormItem> */}
      </Col>

{/* Sub Case Catagory 2 */}
<Col lg={6} md={12} sm={12} xs={24}>


          <h2 className="gx-text-black" >Sub Case Category 2</h2>
          <DispoContext.Provider value={caseCat2.cat2}>
         
                <SubCat2/>
            
          </DispoContext.Provider>
            {/* <FormItem>
                <Input id="Sub Case Catagory" name="Sub Case Catagory" placeholder="Sub Case Category"/>
            </FormItem> */}

      </Col>

      {caseCat.cat=="Others" || caseCat2.cat2=="Others"
                  ?<Col  lg={6} md={12} sm={12} xs={24}> 
                        <h2 className="gx-text-red" >Other Case Catagory</h2>
                          <FormItem>
                              <Input id="generalisationcategory" name="generalisationcategory" type="text" placeholder="Other Case Catagory" value={saveon.generalisationcategory} onChange={handleChangeSakhi}/>
                              </FormItem>      
                    </Col>
                    :<null/>
        }

{/* Blank */}
<Col  lg={6} md={12} sm={12} xs={24}>
      </Col>

      </Row> 
</Col>

<Col span={24}>
            <Row>
{/* Type of Abuse 1 */}
      <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Type of Abuse 1*</h2>
          {
            chec.typeofcall=="Prank Calls" || chec.typeofcall== "Information Calls"
            ?<FormItem>
                      <TreeSelect className="gx-w-100"
                              showSearch
                              value={onChangeAbuseType.value}
                              dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                              placeholder="Please select"
                              allowClear
                              treeDefaultExpandAll
                              onChange={onChangeAbuseType}
                    >

                            <TreeNode value="Sexual" title="Sexual" key="45">
                            </TreeNode>
                            <TreeNode value="Verbal" title="Verbal" key="46">
                            </TreeNode>
                            <TreeNode value="Physical" title="Physical" key="47">
                            </TreeNode>
                            <TreeNode value="Emotional" title="Emotional" key="48">
                            </TreeNode>
                            <TreeNode value="Economic" title="Economic" key="49">
                            </TreeNode>
                            <TreeNode value="Not Disclosed" title="Not Disclosed" key="186">
                            </TreeNode>

                        </TreeSelect>
                      </FormItem>

            :<FormItem rules={[{ required: true, message: 'Assuming - Not Disclosed!' }]} name="typeofAbuse">
                      <TreeSelect className="gx-w-100"
                              showSearch
                              value={onChangeAbuseType.value}
                              dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                              placeholder="Please select"
                              allowClear
                              treeDefaultExpandAll
                              onChange={onChangeAbuseType}
                    >

                            <TreeNode value="Sexual" title="Sexual" key="45">
                            </TreeNode>
                            <TreeNode value="Verbal" title="Verbal" key="46">
                            </TreeNode>
                            <TreeNode value="Physical" title="Physical" key="47">
                            </TreeNode>
                            <TreeNode value="Emotional" title="Emotional" key="48">
                            </TreeNode>
                            <TreeNode value="Economic" title="Economic" key="49">
                            </TreeNode>
                            <TreeNode value="Not Disclosed" title="Not Disclosed" key="186">
                            </TreeNode>

                        </TreeSelect>
                      </FormItem>

          }
      </Col>

{/* Type of Abuse 2 */}
<Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Type of Abuse 2*</h2>
          {
            chec.typeofcall=="Prank Calls" || chec.typeofcall== "Information Calls"
            ?<FormItem>
                      <TreeSelect className="gx-w-100"
                              showSearch
                              // value={onChangeAbuseType.value}
                              dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                              placeholder="Please select"
                              allowClear
                              treeDefaultExpandAll
                              // onChange={onChangeAbuseType}
                    >

                            <TreeNode value="Sexual" title="Sexual" key="45">
                            </TreeNode>
                            <TreeNode value="Verbal" title="Verbal" key="46">
                            </TreeNode>
                            <TreeNode value="Physical" title="Physical" key="47">
                            </TreeNode>
                            <TreeNode value="Emotional" title="Emotional" key="48">
                            </TreeNode>
                            <TreeNode value="Economic" title="Economic" key="49">
                            </TreeNode>
                            <TreeNode value="Not Disclosed" title="Not Disclosed" key="186">
                            </TreeNode>

                        </TreeSelect>
                      </FormItem>

            :<FormItem rules={[{ required: true, message: 'Assuming - Not Disclosed!' }]} name="typeo2fAbuse">
                      <TreeSelect className="gx-w-100"
                              showSearch
                              value={onChangeAbuseType.value}
                              dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                              placeholder="Please select"
                              allowClear
                              treeDefaultExpandAll
                              onChange={onChangeAbuseType}
                    >

                            <TreeNode value="Sexual" title="Sexual" key="45">
                            </TreeNode>
                            <TreeNode value="Verbal" title="Verbal" key="46">
                            </TreeNode>
                            <TreeNode value="Physical" title="Physical" key="47">
                            </TreeNode>
                            <TreeNode value="Emotional" title="Emotional" key="48">
                            </TreeNode>
                            <TreeNode value="Economic" title="Economic" key="49">
                            </TreeNode>
                            <TreeNode value="Not Disclosed" title="Not Disclosed" key="186">
                            </TreeNode>

                        </TreeSelect>
                      </FormItem>

          }
      </Col>

{/* Blank */}
<Col  lg={6} md={12} sm={12} xs={24}>

      </Col>

{/* Blank */}
<Col  lg={6} md={12} sm={12} xs={24}>

      </Col>

{/* Prior Redressal */}
<Col lg={6} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Prior Redressal</h2>
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

        <TreeNode value="CSR with Police" title="CSR with Police" key="132">
        </TreeNode>
        <TreeNode value="FIR with Police" title="FIR with Police" key="133">
        </TreeNode>
        <TreeNode value="Counselling with OSC" title="Counselling with OSC" key="134">
        </TreeNode>
        <TreeNode value="Counselling with FCC" title="Counselling with FCC" key="135">
        </TreeNode>
        <TreeNode value="Others" title="Others" key="136">
        </TreeNode>
        <TreeNode value="Not mentioned" title="Not mentioned" key="137">
        </TreeNode>
        <TreeNode value="Not Disclosed" title="Not Disclosed" key="184">
        </TreeNode>

    </TreeSelect>
            </FormItem>
      </Col>

</Row>
</Col>

</Form> 
</Auxiliary>
  );

}

export default CaseCategoryDetails;
