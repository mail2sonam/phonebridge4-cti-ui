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
import { DispoContext } from "./DispoContext";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const CallDetail = (props) =>{

    
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
const datetimeFormate = 'YYYY/MM/DD H:m:s';
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


{/* Type of Calls */}
<Col xl={6} lg={12} md={12} sm={12} xs={24}>
<h2 className="gx-text-black" >Type of Call</h2>
<FormItem>
          <TreeSelect className="gx-w-100"
                  showSearch
                //   value={onChangeCheck.e}
                  dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                  placeholder="Please select"
                  allowClear
                  treeDefaultExpandAll
                  onChange={onChangeCheck}       
        >
              <TreeNode value="Information" title="Information" key="129">
              </TreeNode>
              <TreeNode value="Emergency" title="Emergency" key="130">
              </TreeNode>
              <TreeNode value="Counselling  & Guidance" title="Counselling  & Guidance" key="131">
              </TreeNode>
              <TreeNode value="Prank" title="Prank" key="128">
              </TreeNode>
            </TreeSelect>
      </FormItem>
</Col>

{/* Incident Date */}
<Col xl={4} lg={12} md={12} sm={12} xs={24}>
      <h2 className="gx-text-black" >Incident Date</h2>
  <FormItem >
     <DatePicker className="gx-mb-3 gx-w-100" defaultValue={moment(date, dateFormat)} format={dateFormat}           
               onChange={onChangeDateofInc}                      
              />                      
  </FormItem>
</Col>

{/* Incident Time */}
<Col xl={4} lg={12} md={12} sm={12} xs={24}>
      <h2 className="gx-text-black" >Incident Time</h2>
  <FormItem >

  <TimePicker className="gx-mb-3 gx-w-100" defaultValue={moment(timedefault,timeFormat)} format={timeFormat}
          onChange={onChangeIncTime}
          />                     
  </FormItem>
</Col>

<Col xl={4} lg={12} md={12} sm={12} xs={24}>
      <h2 className="gx-text-black" >Call Date</h2>
     <FormItem >
            <DatePicker className="gx-mb-3 gx-w-100" defaultValue={moment(date, dateFormat)} format={dateFormat}           
            disabled  //  onChange={onChangeDateofInc}                      
              />                     
  </FormItem>
  {/* <FormItem >
  <DatePicker className="gx-mb-3 gx-w-100"
                    // disabledDate={this.disabledStartDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    disabled
                    // value={startValue}
                    placeholder={date+"/"+timedefault }
                    // onChange={this.onStartChange}
                    // onOpenChange={this.handleStartOpenChange}
        />                  
  </FormItem> */}
</Col>

<Col xl={4} lg={12} md={12} sm={12} xs={24}>
      <h2 className="gx-text-black" >Call Time</h2>
     <FormItem >
      <TimePicker className="gx-mb-3 gx-w-100" defaultValue={moment(timedefault,timeFormat)} format={timeFormat}
        disabled  // onChange={onChangeIncTime}
          />                     
  </FormItem>

</Col>

{/* Place of Incident */}
<Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Place of Incident</h2>
            <FormItem>
            <TreeSelect className="gx-w-100"
                    showSearch
                    value={onChangeIncPlace.value}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChangeIncPlace}
          >

        <TreeNode value="Marital home" title="Marital home" key="10">
        </TreeNode>
        <TreeNode value="Maternal/ Paternal home" title="Maternal/ Paternal home" key="11">
        </TreeNode>
        <TreeNode value="Private area other than residence" title="Private area other than residence" key="12">
        </TreeNode>
        <TreeNode value="Dwelling of the aggrieved" title="Dwelling of the aggrieved" key="59">
        </TreeNode>
        <TreeNode value="Work Place" title="Work Place" key="13">
        </TreeNode>
        <TreeNode value="Public place" title="Public place" key="14">
                <TreeNode value="Park/Field" title="Park/Field" key="105"/>
              <TreeNode value="Road/ Lane" title="Road/ Lane" key="106"/>
              <TreeNode value="Market" title="Market" key="107"/>
              <TreeNode value="Public Toilet" title="Public Toilet" key="108"/>
              <TreeNode value="Bus Stop" title="Bus Stop" key="109"/>
              <TreeNode value="Railway Station" title="Railway Station" key="110"/>
              <TreeNode value="Taxirickshaw Stand" title="Taxirickshaw Stand" key="111"/>
              <TreeNode value="Any Other" title="Any Other" key="112"/>
        </TreeNode>
            <TreeNode value="Transport" title="Transport" key="15">
                <TreeNode value="Train" title="Train" key="76"/>
                <TreeNode value="Metro" title="Metro" key="77"/>
                <TreeNode value="Bus" title="Bus" key="78"/>
                <TreeNode value="Taxi" title="Taxi" key="79"/>
                <TreeNode value="Autorickshaw" title="Autorickshaw" key="80"/>
                <TreeNode value="Cyclerickshaw" title="Cyclerickshaw" key="81"/>
            </TreeNode>
        <TreeNode value="Not mentioned" title="Not mentioned" key="124">
        </TreeNode>
        <TreeNode value="Others" title="Others" key="75">
        </TreeNode>
        <TreeNode value="Not Disclosed" title="Not Disclosed" key="180">
        </TreeNode>
      </TreeSelect>
            </FormItem>
      </Col>

{/* Status of Incident */}
      <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Status of Incident</h2>
            <FormItem>
            <TreeSelect className="gx-w-100"
                    showSearch
                    value={onChangeStatusOfInc.value}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChangeStatusOfInc}
          >

        <TreeNode value="Ongoing" title="Ongoing" key="60">
        </TreeNode>
        <TreeNode value="Ended" title="Ended" key="61">
        </TreeNode>
        <TreeNode value="Not mentioned" title="Not mentioned" key="126">
        </TreeNode>
        {/* <TreeNode value="Not Disclosed" title="Not Disclosed" key="182">
        </TreeNode> */}

    </TreeSelect>
            </FormItem>
      </Col>

{/* Frequency */}
<Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Frequency</h2>
            <FormItem>
            <TreeSelect className="gx-w-100"
                    showSearch
                    value={onChangeFrequency.value}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChangeFrequency}
          >

        <TreeNode value="Single" title="Single" key="16">
        </TreeNode>
        <TreeNode value="Multiple" title="Multiple" key="17">
        </TreeNode>
        <TreeNode value="Not mentioned" title="Not mentioned" key="125">
        </TreeNode>
        {/* <TreeNode value="Not Disclosed" title="Not Disclosed" key="181">
        </TreeNode> */}

    </TreeSelect>
            </FormItem>
      </Col>

 {/* Type of Information */}
 <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Type of Information</h2>
            <FormItem>
            <TreeSelect className="gx-w-100"
                    showSearch
                    // value={onChangePerperaor.value}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    // onChange={onChangePerperaor}
          >

        <TreeNode value="Scheme Related" title="Scheme Related" key="113">
        </TreeNode>
        <TreeNode value=" Adoption Agency" title=" Adoption Agency" key="114">         
        </TreeNode>
        <TreeNode value="De-addiction Centre" title="De-addiction Centre" key="115">               
        </TreeNode>
        <TreeNode value="Legal Assistance " title="Legal Assistance " key="116">
        </TreeNode>
        <TreeNode value="Other Helpline Numbers" title="Other Helpline Numbers" key="117"> 
        </TreeNode>
        <TreeNode value="Medical Assistance" title="Medical Assistance" key="235"> 
        </TreeNode>
        <TreeNode value="Disaster Assistance" title="Disaster Assistance" key="236"> 
        </TreeNode>
        <TreeNode value="Not Disclosed" title="Not Disclosed" key="187">
        </TreeNode>
        <TreeNode value="Others" title="Others" key="118">
        </TreeNode>

      </TreeSelect>
            </FormItem>
      </Col>

{/* Call Date and Time */}



{incPlace.place =="Others"
                ?<Col xl={6} lg={12} md={12} sm={12} xs={24}> 
                      <h2 className="gx-text-red" >Other Incident Place</h2>
                        <FormItem>
                            <Input id="incidentplace" name="incidentplace" type="text" placeholder="Incident Place" value={saveon.incidentplace} onChange={handleChangeSakhi}/>
                            </FormItem>      
                  </Col>
                  : <null/>
    }

{/* Information Screen */}
{
chec.typeofcall== "Information"

    ?<Col xl={24} lg={12} md={12} sm={12} xs={24}>
    <Widget styleName={`ant-col gx-bg-geekblue `}>
    <h2 className="gx-text-white" >Information Calls</h2>  
<Row> 

        <Col xl={5} lg={12} md={12} sm={12} xs={24}>
            <h2 className="gx-text-white" >Name of the Caller</h2>      
            <FormItem>        
                <Input id="name" name="name" placeholder="Name of the Caller"/>
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
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <h2 className="gx-text-white" >Education</h2>     
            <FormItem>
                  <TreeSelect className="gx-w-100"
                          showSearch
                          // value={onChangeEducation.value}
                          dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                          placeholder="Please select"
                          allowClear
                          treeDefaultExpandAll
                          // onChange={onChangeEducation}       
                >

                      <TreeNode value="10th" title="10th" key="53">
                      </TreeNode>
                      <TreeNode value="HSC" title="HSC" key="54">
                      </TreeNode>
                      <TreeNode value="Diploma" title="Diploma" key="55">
                      </TreeNode>
                      <TreeNode value="UG" title="UG" key="56">
                      </TreeNode>
                      <TreeNode value="PG" title="PG" key="57">
                      </TreeNode>
                      <TreeNode value="Not mentioned" title="Not mentioned" key="123">
                      </TreeNode>
                      <TreeNode value="Not Disclosed" title="Not Disclosed" key="175">
                      </TreeNode>
                       <TreeNode value="Others" title="Others" key="58">
                      </TreeNode>
                    </TreeSelect>        
            </FormItem>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <h2 className="gx-text-white" >District</h2>       
            <FormItem > 
                <Input id="name" name="name" placeholder="District" />
            </FormItem>
        </Col>
        <Col xl={5} lg={12} md={12} sm={12} xs={24}>
            <h2 className="gx-text-white" >Information Sought</h2>  
            <FormItem>
            <TreeSelect className="gx-w-100"
                    showSearch
                    // value={onChangePerperaor.value}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    // onChange={onChangePerperaor}
          >

        <TreeNode value="Scheme Related" title="Scheme Related" key="113">
        </TreeNode>
        <TreeNode value=" Adoption Agency" title=" Adoption Agency" key="114">         
        </TreeNode>
        <TreeNode value="De-addiction Centre" title="De-addiction Centre" key="115">               
        </TreeNode>
        <TreeNode value="Legal Assistance " title="Legal Assistance " key="116">
        </TreeNode>
        <TreeNode value="Other Helpline Numbers" title="Other Helpline Numbers" key="117"> 
        </TreeNode>
        <TreeNode value="Medical Assistance" title="Medical Assistance" key="235"> 
        </TreeNode>
        <TreeNode value="Disaster Assistance" title="Disaster Assistance" key="236"> 
        </TreeNode>
        <TreeNode value="Not Disclosed" title="Not Disclosed" key="187">
        </TreeNode>
        <TreeNode value="Others" title="Others" key="118">
        </TreeNode>

      </TreeSelect>
            </FormItem>
        </Col>
        {/* <Col xl={5} lg={12} md={12} sm={12} xs={24}>
            <h2 className="gx-text-white" >Status of the Call</h2>      
            <FormItem >   
                <Input id="name" name="name" placeholder="Status of the Call" />
                </FormItem>
        </Col> */}

        <Col xl={8} lg={12} md={12} sm={12} xs={24}>
            <h2 className="gx-text-white" >Service Offered</h2>    
            <FormItem>
                    <TreeSelect className="gx-w-100"
                            showSearch
                            value={onChangeServiceOff.value}
                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            onChange={onChangeServiceOff}
                  >

                
                <TreeNode value="Referred to Drug deaddiction Center" title="Referred to Drug deaddiction Center" key="189">
                </TreeNode>
                <TreeNode value="Referred to Alcohol deaddiction Center" title="Referred to Alcohol deaddiction Center" key="190">
                </TreeNode>
                <TreeNode value="Referred to Free Legal Aid (DLSA/SLSA)" title="Referred to Free Legal Aid (DLSA/SLSA)" key="191">
                </TreeNode>
                <TreeNode value="Referred to Child Helpline -1098" title="Referred to Child Helpline -1098" key="192">
                </TreeNode>
                <TreeNode value="Referred to Amma Call center-1100" title="Referred to Amma Call center-1100" key="193">
                </TreeNode>
                <TreeNode value="Referred to Accidental Emergency -108" title="Referred to Accidental Emergency -108" key="194">
                </TreeNode>
                <TreeNode value="Referred to Medical Emergency -104" title="Referred to Medical Emergency -104" key="195">
                </TreeNode>
                <TreeNode value="Refer To Police" title="Refer To Police" key="196">
                </TreeNode>
                <TreeNode value="Refer To One Stop Centre (OSC)" title="Refer To One Stop Centre (OSC)" key="197">
                </TreeNode>
                <TreeNode value="Refer To  Family Counseling Center" title="Refer To  Family Counseling Center" key="198">
                </TreeNode>
                <TreeNode value="Refer To Child Protection Officer" title="Refer To Child Protection Officer" key="199">
                </TreeNode>
                <TreeNode value="Refer To Taluk Office" title="Refer To Taluk Office" key="200">
                </TreeNode>
                <TreeNode value="Refer To DSWO's of all Districts" title="Refer To DSWO's of all Districts" key="201">
                </TreeNode>
                <TreeNode value="Refer To She-Box" title="Refer To She-Box" key="202">
                </TreeNode>
                <TreeNode value="Refer To Family Court" title="Refer To Family Court" key="203">
                </TreeNode>
                <TreeNode value="Refer To India Institute Mental Health" title="Refer To India Institute Mental Health" key="204">
                </TreeNode>
                <TreeNode value="Refer To Disabled Welfare Officer" title="Refer To Disabled Welfare Officer" key="205">
                </TreeNode>
                <TreeNode value="Refer To Special Thasildhar" title="Refer To Special Thasildhar" key="206">
                </TreeNode>
                <TreeNode value="Refer To AWPS" title="Refer To AWPS" key="207">
                </TreeNode>
                <TreeNode value="Refer To Protection Officers" title="Refer To Protection Officers" key="208">
                </TreeNode>
                <TreeNode value="Hospital/ Medical Facility/ CMHO/ ANM/ ASHA Worker" title="Hospital/ Medical Facility/ CMHO/ ANM/ ASHA Worker" key="209">
                </TreeNode>
                <TreeNode value="Labour Officer (for unequal wage/ unpaid wage/ maternity benefit etc)" title="Labour Officer (for unequal wage/ unpaid wage/ maternity benefit etc)" key="210">
                </TreeNode>
                <TreeNode value="Swadhar Greh" title="Swadhar Greh" key="211">
                </TreeNode>
                <TreeNode value="Working Women Hostel" title="Working Women Hostel" key="212">
                </TreeNode>
                <TreeNode value="Ujjawala Home for victims of trafficking" title="Ujjawala Home for victims of trafficking" key="213">
                </TreeNode>
                <TreeNode value="Panchayati Raj representative" title="Panchayati Raj representative" key="214">
                </TreeNode>
                <TreeNode value="Primary Health Centers" title="Primary Health Centers" key="215">
                </TreeNode>
                 <TreeNode value="Others" title="Others" key="119">
                </TreeNode>
               {/* <TreeNode value="Disclosed" title="Disclosed" key="216">
                </TreeNode> */}

              </TreeSelect>
            </FormItem>
           
        </Col>

          {/* Service Offered Reffered to Options */}

  </Row>
  
  <Col xl={24} lg={12} md={12} sm={12} xs={24}>   
  <h2 className="gx-text-white" >Referred To</h2>
<Row> 
          <FormItem>
              <h2 className="gx-text-white" >Agency</h2>
              <Input id="age" name="age" type="text" placeholder="Agency" />
              </FormItem> 

          <FormItem>
          <h2 className="gx-text-white" >Name of the Person</h2>
              <Input id="age" name="age" type="text" placeholder="Name of the Person" />
              </FormItem>      

       
          <FormItem>
          <h2 className="gx-text-white" >Contact Number</h2>
              <Input id="age" name="age" type="text" placeholder="Contact Number" />
              </FormItem>  
                    
    </Row>

     {/* Remarks */}
 <Col xl={10} lg={12} md={12} sm={12} xs={24}>
      <h2 className="gx-text-white" >Remarks</h2>
            <FormItem>
                <TextArea  rows={4} 
                id="notes" name="notes" placeholder="Remarks" 
                // value={saveon.notes} onChange={handleChangeSakhi}
               
                />
            </FormItem>
      </Col>

</Col>
</Widget>

</Col>
:<null/>
}
{/* Information Screen */}


</Form> 
</Auxiliary>
  );

}

export default CallDetail;
