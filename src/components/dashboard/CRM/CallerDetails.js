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

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const CallerDetails = (props) => {

  const { MonthPicker, RangePicker } = DatePicker;

  function onOk(value) {

  }

  //datepicker 
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substr(0, 10);
  var timedefault = curr.getHours() + ':' + curr.getMinutes() + ':' + curr.getSeconds();
  const dateFormat = 'YYYY/MM/DD ';
  const timeFormat = ' H:m:s';
  //datepicker

  const { TextArea } = Input;
  const TreeNode = TreeSelect.TreeNode;
  const msg = useContext(UserContext);

  // save Disposition
  const [saveon, setSave] = useState({
    isName: 'Not Disclosed', isAge: 'Not Disclosed', isAgeGroup: 'Not Disclosed', isEducation: 'Not Disclosed', isGender: 'Not Disclosed',
    isHouseno: 'Not Disclosed', isStreet: 'Not Disclosed', isBlock: 'Not Disclosed', isVillage: 'Not Disclosed', isState: 'Not Disclosed',
    isDistrict: 'Not Disclosed', isPincode: 'Not Disclosed',
    isInformationSought: 'Not Disclosed', isServiceoffered: 'Not Disclosed', isAddObtainInfo: 'Not Disclosed',
    isAgency: 'Not Disclosed', isNameofPerson: 'Not Disclosed', isContactNum: 'Not Disclosed', isRemarks: 'Not Disclosed'
  });

  function handleChangeSakhi(evt) {
    const value = evt.target.value;
    setSave({
      ...saveon,
      [evt.target.name]: value
    });
  }

  function SaveOnSakhi() {
    var data = {
      callId: props.InformationScreen,
      isName: saveon.isName,
      isAge: saveon.isAge,
      isAgeGroup: saveon.isAgeGroup,
      isEducation: saveon.isEducation,
      isGender: saveon.isGender,
      isHouseno: saveon.isHouseno,
      isStreet: saveon.isStreet,
      isBlock: saveon.isBlock,
      isVillage: saveon.isVillage,
      isState: saveon.isState,
      isDistrict: saveon.isDistrict,
      isPincode: saveon.isPincode,
      isInformationSought: saveon.isInformationSought,
      isServiceoffered: saveon.isServiceoffered,
      isAddObtainInfo: saveon.isAddObtainInfo,
      isAgency: saveon.isAgency,
      isNameofPerson: saveon.isNameofPerson,
      isContactNum: saveon.isContactNum,
      isDirectoryMain: saveon.isDirectoryMain,
      isDirectorySubMain: saveon.isDirectorySubMain,
      isDirectoryDistrict: saveon.isDirectoryDistrict,
      isDirectoryTown: saveon.isDirectoryTown,
      isDirectoryContName: saveon.isDirectoryContName,
      isDirectoryContNumber: saveon.isDirectoryContNumber,
      isDirectoryAddress: saveon.isDirectoryAddress,
      isDirectoryPincode: saveon.isDirectoryPincode,
      isDirectoryMailId: saveon.isDirectoryMailId,
      isDirectorySMSNumber: saveon.isDirectorySMSNumber,
      isDirectoryWAnumber: saveon.isDirectoryWAnumber,
      isRemarks: saveon.isRemarks,

    }
    DispositionApi.saveInformation(data)
      .subscribe(response => {
        setSave({
          isName: response.data.isName,
          isAge: response.data.isAge,
          isAgeGroup: response.data.isAgeGroup,
          isEducation: response.data.isEducation,
          isGender: response.data.isGender,
          isHouseno: response.data.isHouseno,
          isStreet: response.data.isStreet,
          isBlock: response.data.isBlock,
          isVillage: response.data.isVillage,
          isState: response.data.isState,
          isDistrict: response.data.isDistrict,
          isPincode: response.data.isPincode,
          isInformationSought: response.data.isInformationSought,
          isServiceoffered: response.data.isServiceoffered,
          isAddObtainInfo: response.data.isAddObtainInfo,
          isAgency: response.data.isAgency,
          isNameofPerson: response.data.isNameofPerson,
          isContactNum: response.data.isContactNum,
          isDirectoryMain: response.data.isDirectoryMain,
          isDirectorySubMain: response.data.isDirectorySubMain,
          isDirectoryDistrict: response.data.isDirectoryDistrict,
          isDirectoryTown: response.data.isDirectoryTown,
          isDirectoryContName: response.data.isDirectoryContName,
          isDirectoryContNumber: response.data.isDirectoryContNumber,
          isDirectoryAddress: response.data.isDirectoryAddress,
          isDirectoryPincode: response.data.isDirectoryPincode,
          isDirectoryMailId: response.data.isDirectoryMailId,
          isDirectorySMSNumber: response.data.isDirectorySMSNumber,
          isDirectoryWAnumber: response.data.isDirectoryWAnumber,
          isRemarks: response.data.isRemarks,
        });
      })
  }
  // save Disposition



  // Save validation
  const onFinishFailed = errorInfo => {
    SaveOnSakhi()
  };
  const onFinish = values => {
    SaveOnSakhi()
  };
  // Save validation


  // Functions for onchanges
  const [ageGroup, setAgeGroup] = useState({ Group: '' });
  function onChangeAgeGroup(value) {
    saveon.isAgeGroup = value;
    setAgeGroup({
      Group: value
    })
  }

  const [otherEducation, setOthersEdu] = useState({ educ: 'no' });
  function onChangeEducation(value) {
    saveon.isEducation = value;
    setOthersEdu({
      educ: value
    })
  }


  function onChangeGender(value) {
    saveon.isGender = value;
  }

  const [infoSought, setInfoSought] = useState({ infosought: 'no' });
  function onChangeInfoSought(value) {
    saveon.isInformationSought = value.toString();
    setInfoSought({
      infosought: value
    })
  }

  const [serviceOf, setInfoServiceOff] = useState({ seroff: 'no' });
  function onChangeServiceOff(value) {
    saveon.isServiceoffered = value.toString();
    setInfoServiceOff({
      seroff: value
    })
  }



  function onChangeAddObtain(value) {
    saveon.isAddObtainInfo = value;
  }


  const [chec, setCheck] = useState({ typeofcall: '' });
  function onChangeCheck(value) {
    saveon.typeOfCall = value;
    setCheck({
      typeofcall: value
    })
  }


  const [districtval, setDistrictVal] = useState({ distval: 'no' });
  function onChangeDistrict(value) {
    saveon.isDistrict = value;
    setDistrictVal({
      distval: value
    })

  }

  const [talukpinval, setTalukVal] = useState({ talukval: 'no' });
  function onChangeTaluk(value) {
    saveon.isBlock = value;
    setTalukVal({
      talukval: value
    })

  }

  const [townvalpin, setTownValue] = useState({ valtownpin: '' })
  function onChangeTownPincode(value) {
    saveon.isVillage = value
    setTownValue({
      valtownpin: value
    })
  }


  function onChangePincodeval(value) {
    saveon.isPincode = value;

  }

  const [otherState, setOtherState] = useState({ othstate: '' })
  function onChangeState(value) {
    saveon.isState = value;
    setOtherState({
      othstate: value
    })
  }

  const [agetextval, setAgeTextVal] = useState('');
  saveon.isAge = agetextval;


  var flage = '100';
  if (agetextval == 0) {
    flage = "0";
    saveon.isAgeGroup = "Not Mentioned"
  }
  else if (agetextval >= 1 && agetextval <= 6) {
    flage = "1-6";
    saveon.isAgeGroup = "1-6 Years"
  }
  else if (agetextval >= 7 && agetextval <= 12) {
    flage = "7-12";
    saveon.isAgeGroup = "7-12 Years"

  }
  else if (agetextval >= 13 && agetextval <= 17) {
    flage = "13-17";
    saveon.isAgeGroup = "13-17 Years"

  }
  else if (agetextval >= 18 && agetextval <= 25) {
    flage = "18-25";
    saveon.isAgeGroup = "18-25 Years"

  }
  else if (agetextval >= 26 && agetextval <= 35) {
    flage = "26-35";
    saveon.isAgeGroup = "26-35 Years"

  }
  else if (agetextval >= 36 && agetextval <= 46) {
    flage = "36-46";
    saveon.isAgeGroup = "36-46 Years"

  }
  else if (agetextval >= 47 && agetextval <= 59) {
    flage = "47-59";
    saveon.isAgeGroup = "47-59 Years"

  }
  else if (agetextval >= 60 && agetextval <= 70) {
    flage = "60-70";
    saveon.isAgeGroup = "60-70 Years"

  }
  else if (agetextval >= 71 && agetextval <= 80) {
    flage = "71-80";
    saveon.isAgeGroup = "71-80 Years"

  }
  else if (agetextval >= 81 && agetextval <= 90) {
    flage = "81-90";
    saveon.isAgeGroup = "81-90 Years"

  }
  else {
    flage = "0"
    saveon.isAgeGroup = "Not Mentioned"
  }
  // Functions for onchanges

  const namedispo = useContext(DispoContext)



  // Directory values
  const [maindirval, setMainDirVal] = useState({ mainval: 'no' });
  function onChangeMainDir(value) {
    setMainDirVal({
      mainval: value
    })

  }

  const [Submaindirval, setSubMainDirVal] = useState({ Submainval: 'no' });
  function onChangeSubCatVal(value) {
    setSubMainDirVal({
      Submainval: value
    })

  }


  const [distDirval, setDistDirVal] = useState({ distDirectval: 'no' });
  function onChangeDistDirVal(value) {
    setDistDirVal({
      distDirectval: value
    })

  }


  const [townDirval, setTownDirVal] = useState({ townDirectval: 'no' });
  function onChangeTownDirVal(value) {
    setTownDirVal({
      townDirectval: value
    })
  }



  //ActionTaken
  // Categories and sub categories
  const [maincatvalue, setMaincatVal] = useState([]);
  useEffect(() => {
    DirectoryApi.AllCategory()
      .subscribe(res => {
        const maincat = res;
        let tempList = [];
        maincat.data.data.forEach(element => {
          tempList.push(element.maincategory);
        });
        setMaincatVal(tempList);
      })
  }, [])
  const [maincatval, setMaincatval] = useState({ val: "" })
  function onChangeMainCat(value) {
    saveon.isDirectoryMain = value;
    setMaincatval({
      val: value,
    })
  }


  const [subcatvalue, setSubcatVal] = useState([]);
  var data2 = {
    maincategory: maincatval.val
  }
  useEffect(() => {
    DirectoryApi.subCat(data2)
      .subscribe(res => {
        const maincat = res;
        let tempList1 = [];
        maincat.data.data.forEach(element => {
          tempList1.push(element.subCategory);
        });
        setSubcatVal(tempList1);
      })
  }, [maincatval.val])

  const [subfinalval, setSubfinalVal] = useState({ valsub: '' });
  function onChangeSubCat(value) {
    saveon.isDirectorySubMain = value;
    setSubfinalVal({
      valsub: value
    })

  }
  // Categories and sub categories


  // District  and town
  const [districtvalue, setDistrictValue] = useState([]);
  useEffect(() => {
    var data3 = {
      maincategory: maincatval.val,
      subCategory: subfinalval.valsub
    }

    DirectoryApi.AllDistrict(data3)
      .subscribe(res => {
        const maindist = res;
        let distList = [];
        maindist.data.data.forEach(element => {
          distList.push(element.district);
        });
        setDistrictValue(distList);

      })
  }, [subfinalval.valsub])
  const [distval, setDistval] = useState({ dist: "" })
  function onChangeDistrictVal(value) {
    saveon.isDirectoryDistrict = value;
    setDistval({
      dist: value,
    })
  }


  const [townvalue, setTown] = useState([]);
  var data4 = {
    maincategory: maincatval.val,
    subCategory: subfinalval.valsub,
    district: distval.dist
  }
  useEffect(() => {
    DirectoryApi.town(data4)
      .subscribe(res => {
        const townres = res;
        let townList = [];
        townres.data.data.forEach(element => {
          townList.push(element.town);
        });
        setTown(townList);
      })
  }, [distval.dist])

  const [townval, setTownVal] = useState({ valtown: '' });
  function onChangeTown(value) {
    saveon.isDirectoryTown = value;
    setTownVal({
      valtown: value
    })

  }

  // District  and town




  // Details Based on Town
  const [contactvalue, setContactValue] = useState({
    contactId: '', address: '', contactNumber: '', contactName: '', emailId: '',
    smsNumber: '', whatsupNumber: '', townId: '', districtId: '', categoryId: '', subCategoryId: '', dirPincode: ''
  });
  var data5 = {
    maincategory: maincatval.val,
    subCategory: subfinalval.valsub,
    district: distval.dist,
    town: townval.valtown
  }
  saveon.isDirectoryWAnumber = contactvalue.whatsupNumber;
  saveon.isDirectoryAddress = contactvalue.address;
  saveon.isDirectoryContName = contactvalue.contactName;
  saveon.isDirectoryContNumber = contactvalue.contactNumber;
  saveon.isDirectoryMailId = contactvalue.emailId;
  saveon.isDirectorySMSNumber = contactvalue.smsNumber;
  saveon.isDirectoryPincode = contactvalue.dirPincode;

  function handleContactDetail(evt) {
    const value = evt.target.value;
    setContactValue({
      ...contactvalue,
      [evt.target.name]: value
    });

    saveon.isDirectoryWAnumber = contactvalue.whatsupNumber;
    saveon.isDirectoryAddress = contactvalue.address;
    saveon.isDirectoryContName = contactvalue.contactName;
    saveon.isDirectoryContNumber = contactvalue.contactNumber;
    saveon.isDirectoryMailId = contactvalue.emailId;
    saveon.isDirectorySMSNumber = contactvalue.smsNumber;
    saveon.isDirectoryPincode = contactvalue.dirPincode;

  }

  useEffect(() => {
    DirectoryApi.contactDetails(data5)
      .subscribe(res => {

        setContactValue({
          contactId: "",
          smsNumber: "",
          whatsupNumber: "",
          address: res.data.data[0].address,
          dirPincode: res.data.data[0].pincode,
          contactNumber: res.data.data[0].contactNo,
          contactName: res.data.data[0].contactName,
          emailId: res.data.data[0].mailId,
          town: res.data.data[0].town,
          district: res.data.data[0].district,
          maincategory: res.data.data[0].maincategory,
          subCategory: res.data.data[0].subCategory
        })

        // saveon.isDirectoryWAnumber = contactvalue.whatsupNumber;
        // saveon.isDirectoryAddress = contactvalue.address;
        // saveon.isDirectoryContName = contactvalue.contactName;
        // saveon.isDirectoryContNumber = contactvalue.contactNumber;
        // saveon.isDirectoryMailId = contactvalue.emailId;
        // saveon.isDirectorySMSNumber = contactvalue.smsNumber;
      })
  }, [townval.valtown])
  const [contactDetailval, setContDetval] = useState({ contDet: "" })
  function onChangeContactDetailsVal(value) {
    setContDetval({
      contDet: value,
    })

  }


  // Directory District  and town


  // Address district village Pincode api

  const [addrDistValues, setAddrDist] = useState([]);

  useEffect(() => {
    PincodeApi.showAddrDist()
      .subscribe(res => {
        const addrDistVal = res;
        let addrDistList = [];
        addrDistVal.data.data.forEach(element => {
          addrDistList.push(element.district);
        });
        setAddrDist(addrDistList);
      })
  }, [])




  const [talukpincodevalues, setTalukPincode] = useState([]);
  useEffect(() => {
    var datavaltaluk = {
      district: districtval.distval,
    }

    PincodeApi.showAddrTaluk(datavaltaluk)
      .subscribe(res => {
        const talukpincoderes = res;
        let talukpincodeList = [];
        talukpincoderes.data.data.forEach(element => {
          talukpincodeList.push(element.taluk);
        });
        setTalukPincode(talukpincodeList);

      })
  }, [districtval.distval])


  const [townpincodevalues, setTownPincode] = useState([]);
  useEffect(() => {
    var datavaltown = {
      taluk: talukpinval.talukval,
    }

    PincodeApi.showAddrTown(datavaltown)
      .subscribe(res => {
        const townpincoderes = res;
        let townpincodeList = [];
        townpincoderes.data.data.forEach(element => {
          townpincodeList.push(element.town);
        });
        setTownPincode(townpincodeList);

      })
  }, [talukpinval.talukval])


  const [pincodevalues, setPincode] = useState([]);
  useEffect(() => {
    var datavalpin = {
      town: townvalpin.valtownpin
    }

    PincodeApi.showpincode(datavalpin)
      .subscribe(res => {
        const pincoderes = res;
        let pincodeList = [];
        pincoderes.data.data.forEach(element => {
          pincodeList.push(element.pinCode);
        });
        setPincode(pincodeList);

      })
  }, [townvalpin.valtownpin])

  // Address district village Pincode api


  return (
    <Auxiliary>
      <Form
        initialValues={{ remember: true }}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="inline">


        {/* Name Field */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Name </h2>
          <FormItem>
            <Input id="isName" name="isName" placeholder="Name" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
          </FormItem>
        </Col>


        {/* Age with validation */}
        <Col xl={4} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Age </h2>
          <FormItem>

            <Input placeholder="Age" type="number" pattern="[0-9]*"
              //onChange={onChangeAge}
              onChange={event => setAgeTextVal(event.target.value)}

            />
          </FormItem>
        </Col>

        {/* Age with Group */}
        <Col xl={4} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Age Group </h2>
          <FormItem>

            {flage == "0"
              ? <Input id="isAgeGroup" name="isAgeGroup" placeholder="Age Group" value={""} onChange={handleChangeSakhi} />

              : flage == "1-6"
                ? <Input id="isAgeGroup" name="isAgeGroup" placeholder="0-6 Years" value={"0-6 Years"} onChange={handleChangeSakhi} />

                : flage == "7-12"
                  ? <Input id="isAgeGroup" name="isAgeGroup" placeholder="7-12 Years" value={"7-12 Years"} onChange={handleChangeSakhi} />

                  : flage == "13-17"
                    ? <Input id="isAgeGroup" name="isAgeGroup" placeholder="13-17 Years" value={"13-17 Years"} onChange={handleChangeSakhi} />

                    : flage == "18-25"
                      ? <Input id="isAgeGroup" name="isAgeGroup" placeholder="18-25 Years" value={"18-25 Years"} onChange={handleChangeSakhi} />

                      : flage == "26-35"
                        ? <Input id="isAgeGroup" name="isAgeGroup" placeholder="26-35 Years" value={"26-35 Years"} onChange={handleChangeSakhi} />

                        : flage == "36-46"
                          ? <Input id="isAgeGroup" name="isAgeGroup" placeholder="36-46 Years" value={"36-46 Years"} onChange={handleChangeSakhi} />

                          : flage == "47-59"
                            ? <Input id="isAgeGroup" name="isAgeGroup" placeholder="47-59 Years" value={"47-59 Years"} onChange={handleChangeSakhi} />

                            : flage == "60-70"
                              ? <Input id="isAgeGroup" name="isAgeGroup" placeholder="60-70 Years" value={"60-70 Years"} onChange={handleChangeSakhi} />

                              : flage == "71-80"
                                ? <Input id="isAgeGroup" name="isAgeGroup" placeholder="71-80 Years" value={"71-80 Years"} onChange={handleChangeSakhi} />

                                : flage == "81-90"
                                  ? <Input id="isAgeGroup" name="isAgeGroup" placeholder="81-90 Years" value={"81-90 Years"} onChange={handleChangeSakhi} />


                                  : <null />


            }

          </FormItem>

        </Col>

        {/* Education Field */}
        <Col xl={5} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Education</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeEducation.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              onChange={onChangeEducation}
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
              <TreeNode value="Not relevant /not asked" title="Not relevant /not asked" key="123">
              </TreeNode>
              <TreeNode value="Not Disclosed" title="Not Disclosed" key="175">
              </TreeNode>
              <TreeNode value="Any other" title="Any other" key="58">
              </TreeNode>
            </TreeSelect>
          </FormItem>
        </Col>


        {/* Gender */}
        <Col xl={4} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Gender </h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeGender.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              onChange={onChangeGender}
            >

              <TreeNode value="Male" title="Male" key="50">
              </TreeNode>
              <TreeNode value="Female" title="Female" key="51">
              </TreeNode>
              <TreeNode value="Other Gender" title="Other Gender" key="52">
              </TreeNode>
              <TreeNode value="Not Disclosed" title="Not Disclosed" key="121">
              </TreeNode>

            </TreeSelect>
          </FormItem>

        </Col>


        {/* Education Other textbox */}
        {otherEducation.educ == "Any other"

          ? <Col span={24}>
            <Row>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              <Col xl={4} lg={12} md={12} sm={12} xs={24}> </Col>
              <Col xl={4} lg={12} md={12} sm={12} xs={24}> </Col>
              {otherEducation.educ == "Any other"
                ? <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Education</h2>
                  <FormItem>
                    <Input id="isEducation" name="isEducation" type="text" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <null />
              }
            </Row>
          </Col>
          : <null />
        }


        {/* Address details */}
        <Col xl={24} lg={12} md={12} sm={12} xs={24}>

          <Widget styleName={`ant-col gx-bg-geekblue `}>
            <h2 className="gx-text-white" >Address Details </h2>
            <Row>

              <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                <h3 className="gx-text-white" >House No</h3>
                <FormItem>
                  <Input id="isHouseno" name="isHouseno" placeholder="House No" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                </FormItem>
              </Col>
              <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                <h3 className="gx-text-white" >Street</h3>
                <FormItem>
                  <Input id="isStreet" name="isStreet" placeholder="Street" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                </FormItem>
              </Col>

              <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >State</h2>
                <FormItem >
                  {/* <Input id="isState" name="isState" placeholder="State" value={handleChangeSakhi.value} onChange={handleChangeSakhi} /> */}
                  <TreeSelect className="gx-w-100"
                    showSearch
                    value={onChangeState.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChangeState}
                  >

                    <TreeNode value="Tamil Nadu" title="Tamil Nadu" key="150">
                    </TreeNode>
                    <TreeNode value="Others" title="Others" key="151">
                    </TreeNode>
                  </TreeSelect>
                </FormItem>
              </Col>

              {otherState.othstate == "Others"
                ? <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other State</h2>
                  <FormItem >
                    <Input id="isState" name="isState" placeholder="Mention"
                      value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <null />
              }

              <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >District</h2>
                <FormItem>
                  <TreeSelect className="gx-w-100"
                    showSearch
                    value={onChangeDistrict.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChangeDistrict}
                  >

                    {
                      addrDistValues.map((district, id) =>

                        <TreeNode value={district} key={id} title={district} >
                        </TreeNode>
                      )
                    }
                  </TreeSelect>
                </FormItem>

              </Col>

              {districtval.distval == "Others"
                ? <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other District</h2>
                  <FormItem >
                    <Input id="isDistrict" name="isDistrict" placeholder="Mention"
                      value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <null />
              }


              <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >Block/Mandal/Taluka</h2>
                <FormItem >
                  {/* <Input id="isBlock" name="isBlock" placeholder="Block/Mandal/Taluka" value={handleChangeSakhi.value} onChange={handleChangeSakhi} /> */}
                  <FormItem >
                    <TreeSelect className="gx-w-100"
                      showSearch
                      value={onChangeTaluk.value}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="Please select"
                      allowClear
                      treeDefaultExpandAll
                      onChange={onChangeTaluk}
                    >


                      {
                        talukpincodevalues.map((taluk, id) =>

                          <TreeNode value={taluk} key={id} title={taluk} >
                          </TreeNode>
                        )
                      }
                    </TreeSelect>
                  </FormItem>
                </FormItem>
              </Col>


              <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >Village/Town/City</h2>
                <FormItem >
                  <TreeSelect className="gx-w-100"
                    showSearch
                    value={onChangeTownPincode.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChangeTownPincode}
                  >


                    {
                      townpincodevalues.map((town, id) =>

                        <TreeNode value={town} key={id} title={town} >
                        </TreeNode>
                      )
                    }
                  </TreeSelect>
                </FormItem>
              </Col>

              <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >Pincode</h2>
                <FormItem >
                  <TreeSelect className="gx-w-100"
                    showSearch
                    value={onChangePincodeval.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChangePincodeval}
                  >


                    {
                      pincodevalues.map((pinCode, id) =>

                        <TreeNode value={pinCode} key={id} title={pinCode} >
                        </TreeNode>
                      )
                    }
                  </TreeSelect>
                  {/* <Input id="gsPincode" name="gsPincode" type="number" placeholder="Pincode" pattern="[0-9]*"
                         value={handleChangeSakhi.value} onChange={handleChangeSakhi.bind(this)}/> */}
                </FormItem>
              </Col>

            </Row>
          </Widget>
        </Col>


        {/* Information Sought */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Information Sought</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeInfoSought.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              multiple
              onChange={onChangeInfoSought}
            >

              <TreeNode title="Physical Needs" key="290">
                <TreeNode value="Medical Need" title="Medical Need" key="291" />
                <TreeNode value="Child Care" title="Child Care" key="292" />
                <TreeNode value="Shelter" title="Shelter" key="293" />
                <TreeNode value="Rescue" title="Rescue" key="294" />
                <TreeNode value="Care taker Support" title="Care taker Support" key="295" />
                <TreeNode value="Adoption Agency" title="Adoption Agency" key="296" />
                <TreeNode value="Deaddiction Center" title="Deaddiction Center" key="297" />
                <TreeNode value="Legal Assistance" title="Legal Assistance" key="298" />
                <TreeNode value="Other Helpline Numbers" title="Other Helpline Numbers" key="299" />
                <TreeNode value="Disaster Assistance" title="Disaster Assistance" key="300" />
                <TreeNode value="Not Disclosed" title="Not Disclosed" key="301" />
                <TreeNode value="Any other" title="Any other" key="302" />
              </TreeNode>

              <TreeNode title="Psychosocial Needs" key="303">
                <TreeNode value="Counselling" title="Counselling" key="304" />
                <TreeNode value="Mediation" title="Mediation" key="305" />
                <TreeNode value="Police Intervention" title="Police Intervention" key="351" />
                <TreeNode value="Negotiation" title="Negotiation" key="306" />
                <TreeNode value="Protection Order" title="Protection Order" key="307" />
                <TreeNode value="Child Custody related" title="Child Custody related" key="308" />
                <TreeNode value="To recover personal belongingness" title="To recover personal belongingness" key="309" />
                <TreeNode value="Any other" title="Any other" key="310" />
              </TreeNode>

              <TreeNode title="Financial needs" key="311">
                <TreeNode title="Child Welfare" key="312">
                  <TreeNode value="Cradle Baby Scheme" title="Cradle Baby Scheme" key="313" />
                  <TreeNode value="Chie Minister's Girl Child Protection Scheme" title="Chie Minister's Girl Child Protection Scheme" key="314" />
                  <TreeNode value="Beti Bachao Beti Padhao Scheme" title="Beti Bachao Beti Padhao Scheme" key="315" />
                  <TreeNode value="Special Need Children Homes" title="Special Need Children Homes" key="316" />
                  <TreeNode value="The prohibition of Child MarriageAct,2006" title="The prohibition of Child MarriageAct,2006" key="317" />

                </TreeNode>
                <TreeNode title="Women Welfare (Marriage Assistance Scheme )" key="318">
                  <TreeNode value="Moovalur Ramamirtham Poor Daughter" title="Moovalur Ramamirtham Poor Daughter" key="319" />
                  <TreeNode value="E.V.R Maniammaiyar -Widow Daughter" title="E.V.R Maniammaiyar -Widow Daughter" key="320" />
                  <TreeNode value="Annai Theresa Orphan Girls" title="Annai Theresa Orphan Girls" key="321" />
                  <TreeNode value="Dr.Dharmambal Widow Remarriage" title="Dr.Dharmambal Widow Remarriage" key="322" />
                  <TreeNode value="Dr.Muthulakshmi Intercaste Marriage" title="Dr.Muthulakshmi Intercaste Marriage" key="323" />

                </TreeNode>
                <TreeNode title="Other  Women Welfare Schemes" key="324">
                  <TreeNode value="Government  Service Home" title="Government  Service Home" key="325" />
                  <TreeNode value="Women Industerial Cooperative Socities" title="Women Industerial Cooperative Socities" key="326" />
                  <TreeNode value="Swadhar Homes" title="Swadhar Homes" key="327" />
                  <TreeNode value="Government Working Womens Hostel" title="Government Working Womens Hostel" key="328" />
                  <TreeNode value="Integrated Program for Senior Citizen" title="Integrated Program for Senior Citizen" key="329" />

                </TreeNode>
                <TreeNode title="Social Defence Schemes" key="330">
                  <TreeNode value="Children Homes" title="Children Homes" key="331" />
                  <TreeNode value="Open Shelters" title="Open Shelters" key="332" />
                  <TreeNode value="Child Adoption" title="Child Adoption" key="333" />
                  <TreeNode value="Observation homes" title="Observation homes" key="334" />
                  <TreeNode value="Special Homes" title="Special Homes" key="335" />
                  <TreeNode value="Exclusive De-addiction Centre for Children" title="Exclusive De-addiction Centre for Children" key="336" />
                  <TreeNode value="After Care Organisations" title="After Care Organisations" key="337" />
                  <TreeNode value="Child Protection Services" title="Child Protection Services" key="338" />
                  <TreeNode value="Vigilance/ Protective Homes" title="Vigilance/ Protective Homes" key="339" />
                  <TreeNode value="Rescue Shelters" title="Rescue Shelters" key="340" />

                </TreeNode>
                <TreeNode title=" Social Security Pension Schemes" key="341">
                  <TreeNode value="Indira Gandhi National Old Age Pension scheme" title="Indira Gandhi National Old Age Pension scheme" key="342" />
                  <TreeNode value="Indira Gandhi National Disability Pension scheme" title="Indira Gandhi National Disability Pension scheme" key="343" />
                  <TreeNode value="Indira Gandhi National Widow Pension scheme" title="Indira Gandhi National Widow Pension scheme" key="344" />
                  <TreeNode value="Differently Abled Pension Scheme" title="Differently Abled Pension Scheme" key="345" />
                  <TreeNode value="Destitute Widows Pension Scheme" title="Destitute Widows Pension Scheme" key="346" />
                  <TreeNode value="Chief Minister's Uzhavar Padhukappu Thittam" title="Chief Minister's Uzhavar Padhukappu Thittam" key="347" />
                  <TreeNode value="Destitute / Deserted Wives Pension Scheme " title="Destitute / Deserted Wives Pension Scheme " key="348" />
                  <TreeNode value="Pension to unmarried , Poor, Incapacitated Women of age  50 years and above" title="Pension to unmarried , Poor, Incapacitated Women of age  50 years and above" key="349" />
                  <TreeNode value="Pension to Sri Lankan Refugees" title="Pension to Sri Lankan Refugees" key="350" />

                </TreeNode>
                <TreeNode></TreeNode>
              </TreeNode>

            </TreeSelect>
          </FormItem>
        </Col>


        {/* Service Offered */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Service Offered</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeServiceOff.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              multiple
              treeDefaultExpandAll
              onChange={onChangeServiceOff}
            >

              <TreeNode value="Referred to Drug De-addiction Center" title="Referred to Drug De-addiction Center" key="189">
              </TreeNode>
              <TreeNode value="Referred to Alcohol De-addiction Center" title="Referred to Alcohol De-addiction Center" key="190">
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
              <TreeNode value="Transferred to WHL Emergency" title="Transferred to WHL Emergency" key="352">
              </TreeNode>
              <TreeNode value="Transferred to WHL Guidance & Counselling" title="Transferred to WHL Guidance & Counselling" key="353">
              </TreeNode>
              <TreeNode value="Any other" title="Any other" key="119">
              </TreeNode>
              {/* 
                <TreeNode value="Disclosed" title="Disclosed" key="216">
                </TreeNode> */}

            </TreeSelect>
          </FormItem>

        </Col>


        {/* Information sought and Service offered Other textbox */}
        {infoSought.infosought == "Any other" || serviceOf.seroff == "Any other"

          ? <Col span={24}>
            <Row>
              {infoSought.infosought == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Information</h2>
                  <FormItem>
                    <Input id="isInformationSought" name="isInformationSought" type="text" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }

              {serviceOf.seroff == "Any other"
                ? <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Service</h2>
                  <FormItem>
                    <Input id="isServiceoffered" name="isServiceoffered" type="text" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <null />
              }
              <Col xl={4} lg={12} md={12} sm={12} xs={24}> </Col>

            </Row>
          </Col>
          : <null />
        }

        {/* ActionTaken with directory */}
        <Col xl={24} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Action Taken </h2>
          <Widget styleName={`ant-col gx-bg-geekblue `}>
            {/* Status of the Case */}
            <Row>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>

                <FormItem >
                  <h2 className="gx-text-white" >Main Category</h2>
                  <TreeSelect className="gx-w-100"
                    showSearch
                    value={onChangeMainCat.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChangeMainCat}
                  >

                    {
                      maincatvalue.map((categoryName, id) =>

                        <TreeNode value={categoryName} key={id} title={categoryName} >
                        </TreeNode>
                      )
                    }

                  </TreeSelect>
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <FormItem  >
                  <h2 className="gx-text-white" >Sub Category</h2>
                  <TreeSelect className="gx-w-100"
                    showSearch
                    value={onChangeSubCat.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChangeSubCat}
                  >

                    {
                      subcatvalue.map((subCategoryName, id) =>
                        <TreeNode value={subCategoryName} key={id} title={subCategoryName} >
                        </TreeNode>)

                    }

                  </TreeSelect>
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <FormItem  >
                  <h2 className="gx-text-white" >District</h2>
                  <TreeSelect className="gx-w-100"
                    showSearch
                    value={onChangeDistrictVal.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChangeDistrictVal}
                  >

                    {
                      districtvalue.map((district, id) =>
                        <TreeNode value={district} key={id} title={district} >
                        </TreeNode>)

                    }

                  </TreeSelect>
                </FormItem>

              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <FormItem  >
                  <h2 className="gx-text-white" >Town</h2>
                  <TreeSelect className="gx-w-100"
                    showSearch
                    value={onChangeTown.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChangeTown}
                  >

                    {
                      townvalue.map((town, id) =>
                        <TreeNode value={town} key={id} title={town} >
                        </TreeNode>)

                    }

                  </TreeSelect>
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <FormItem  >
                  <h2 className="gx-text-white" >Contact Name</h2>
                  <Input id="contactName" name="contactName" placeholder="Contact Name"
                    value={contactvalue.contactName}
                    onChange={handleContactDetail}
                  />
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <FormItem  >
                  <h2 className="gx-text-white" >Contact Number</h2>
                  <Input id="contactNumber" name="contactNumber" placeholder="Contact Number"
                    value={contactvalue.contactNumber}
                    onChange={handleContactDetail}
                  />
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <FormItem  >
                  <h2 className="gx-text-white" >Address</h2>
                  <Input id="address" name="address" placeholder="Address"
                    value={contactvalue.address}
                    onChange={handleContactDetail}
                  />
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <FormItem  >
                  <h2 className="gx-text-white" >Pincode</h2>
                  <Input id="dirPincode" name="dirPincode" type="number" placeholder="Pincode"
                    value={contactvalue.dirPincode} onChange={handleContactDetail}
                  />
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <FormItem  >
                  <h2 className="gx-text-white" >Mail ID</h2>
                  <Input id="emailId" name="emailId" placeholder="Mail ID"
                    value={contactvalue.emailId}
                    onChange={handleContactDetail}
                  />
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <FormItem  >
                  <h2 className="gx-text-white" >SMS Number</h2>
                  <Input id="smsNumber" name="smsNumber" type="number" placeholder="SMS Number"
                    value={contactvalue.smsNumber}
                    onChange={handleContactDetail}
                  />
                </FormItem>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <FormItem  >
                  <h2 className="gx-text-white" >WhatsApp Number</h2>
                  <Input id="whatsupNumber" name="whatsupNumber" type="number" placeholder="WhatsApp Number"
                    value={contactvalue.whatsupNumber}
                    onChange={handleContactDetail}
                  />
                </FormItem>
              </Col>
            </Row>

          </Widget>
        </Col>

        {/* Remarks */}
        <Col xl={10} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Remarks</h2>
          <FormItem>
            <TextArea rows={4}
              id="isRemarks" name="isRemarks" placeholder="Remarks"
              value={handleChangeSakhi.value} onChange={handleChangeSakhi}

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
              Save Information
            </Button>
          </FormItem>
        </Col>



      </Form>
    </Auxiliary>
  );

}

export default CallerDetails;
