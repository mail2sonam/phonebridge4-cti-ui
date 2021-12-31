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
import SubCategory from "./SubCategory";
import SubCat2 from "./SubCat2";
import DirectoryApi from "./DirectoryApi/DirectoryApi";
import PincodeApi from "./PincodeApi";
import MailDispositionApi from "./MailApi/MailDispositionApi";
import SmsDispositionApi from "./SmsDispositionApi";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const SmsGuidenceCouncling = (props) => {


  const { MonthPicker, RangePicker } = DatePicker;
  const { TextArea } = Input;
  const Option = Select.Option;

  function onOk(value) {

  }

  //datepicker 
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substr(0, 10);
  var timedefault = curr.getHours() + ':' + curr.getMinutes() + ':' + curr.getSeconds();
  const dateFormat = 'YYYY/MM/DD';
  const timeFormat = 'H:m:s';
  const datetimeFormate = 'YYYY/MM/DD H:m:s';
  const monthFormat = 'YYYY/MM';
  //datepicker


  //datepicker 
  const [startofDate, setStartOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  //var dateofstart = startofDate.toISOString().substr(0,19);


  const [endofDate, setEndOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  // var dateofend = endofDate.toISOString().substr(0,19);

  //datepicker


  const TreeNode = TreeSelect.TreeNode;
  const msg = useContext(UserContext);

  // save Disposition
  const [saveon, setSave] = useState({
    gsInformationSought: 'Not Disclosed', gsRiskAsses: 'Not Disclosed', gsAggrieved: 'Not Disclosed', gsOtherAggName: 'Not Disclosed',
    gsOtherAggMobile: 'Not Disclosed', gsOtherAggAge: 'Not Disclosed', gsOtherAggGender: 'Not Disclosed', gsOtherAggAddress: 'Not Disclosed',
    gsAge: 'Not Disclosed', gsAgeGroup: 'Not Disclosed', gsEducation: 'Not Disclosed', gsOccupation: 'Not Disclosed', gsGender: 'Not Disclosed',
    gsPersonalIdent: 'Not Disclosed', gsMaritalStatus: 'Not Disclosed', gsLivingStatus: 'Not Disclosed', gsFamilyStatus: 'Not Disclosed',
    gsHouseno: 'Not Disclosed', gsStreet: 'Not Disclosed', gsBlock: 'Not Disclosed', gsVillage: 'Not Disclosed', gsState: 'Not Disclosed',
    gsDistrict: 'Not Disclosed', gsPincode: 'Not Disclosed',
    gsPlaceofInc: 'Not Disclosed', gsFrequency: 'Not Disclosed', gsStatusofInc: 'Not Disclosed', gsCaseCat1: 'Not Disclosed', gsSubCat: 'Not Disclosed',
    gsTypeofAbuse: 'Not Disclosed', gsPriorRedressal: 'Not Disclosed', gsPerpetrator: 'Not Disclosed', gsServiceOffered: 'Not Disclosed',
    gsAddObtain: 'Not Disclosed', gsStatusofCase: 'Not Disclosed', gsAgency: 'Not Disclosed', gsNameofPerson: 'Not Disclosed', gsRemarks: 'Not Disclosed',
    gsPerpetratorName: 'Not Disclosed', gsPerpetratorAge: 'Not Disclosed', gsPerpetratorGender: 'Not Disclosed', gsPerpetratorMobile: 'Not Disclosed',
    gsPerpetratorOccup: 'Not Disclosed', gsPerpetratorAddition: 'Not Disclosed'
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
      caseId: props.GuidenceScreen,
      gsInformationSought: saveon.gsInformationSought,
      gsRiskAsses: saveon.gsRiskAsses,
      gsAggrieved: saveon.gsAggrieved,
      gsOtherAggName: saveon.gsOtherAggName,
      gsOtherAggMobile: saveon.gsOtherAggMobile,
      gsOtherAggAge: saveon.gsOtherAggAge,
      gsOtherAggGender: saveon.gsOtherAggGender,
      gsOtherAggAddress: saveon.gsOtherAggAddress,
      gsAge: saveon.gsAge,
      gsAgeGroup: saveon.gsAgeGroup,
      gsEducation: saveon.gsEducation,
      gsOccupation: saveon.gsOccupation,
      gsGender: saveon.gsGender,
      gsPersonalIdent: saveon.gsPersonalIdent,
      gsMaritalStatus: saveon.gsMaritalStatus,
      gsLivingStatus: saveon.gsLivingStatus,
      gsFamilyStatus: saveon.gsFamilyStatus,
      gsHouseno: saveon.gsHouseno,
      gsStreet: saveon.gsStreet,
      gsBlock: saveon.gsBlock,
      gsVillage: saveon.gsVillage,
      gsState: saveon.gsState,
      gsDistrict: saveon.gsDistrict,
      gsPincode: saveon.gsPincode,
      gsPlaceofInc: saveon.gsPlaceofInc,
      gsFrequency: saveon.gsFrequency,
      gsStatusofInc: saveon.gsStatusofInc,
      gsCaseCat1: saveon.gsCaseCat1,
      gsSubCat: saveon.gsSubCat,
      gsTypeofAbuse: saveon.gsTypeofAbuse,
      gsPriorRedressal: saveon.gsPriorRedressal,
      gsPerpetrator: saveon.gsPerpetrator,
      gsServiceOffered: saveon.gsServiceOffered,
      gsAddObtain: saveon.gsAddObtain,
      gsStatusofCase: saveon.gsStatusofCase,
      gsAgency: saveon.gsAgency,
      gsNameofPerson: saveon.gsNameofPerson,
      gsRemarks: saveon.gsRemarks,
      gsPerpetratorName: saveon.gsPerpetratorName,
      gsPerpetratorAge: saveon.gsPerpetratorAge,
      gsPerpetratorGender: saveon.gsPerpetratorGender,
      gsPerpetratorMobile: saveon.gsPerpetratorMobile,
      gsPerpetratorOccup: saveon.gsPerpetratorOccup,
      gsPerpetratorAddition: saveon.gsPerpetratorAddition,

      gsOtherAggAgeGroup: saveon.gsOtherAggAgeGroup,
      gsCaseCat2: saveon.gsCaseCat2,
      gsSubCat2: saveon.gsSubCat2,
      gsTypeofAbuse2: saveon.gsTypeofAbuse2,
      gsDirectoryMain: saveon.gsDirectoryMain,
      gsDirectorySubMain: saveon.gsDirectorySubMain,
      gsDirectoryDistrict: saveon.gsDirectoryDistrict,
      gsDirectoryTown: saveon.gsDirectoryTown,
      gsDirectoryContName: saveon.gsDirectoryContName,
      gsDirectoryContNumber: saveon.gsDirectoryContNumber,
      gsDirectoryAddress: saveon.gsDirectoryAddress,
      gsDirectoryPincode: saveon.gsDirectoryPincode,
      gsDirectoryMailId: saveon.gsDirectoryMailId,
      gsDirectorySMSNumber: saveon.gsDirectorySMSNumber,
      gsDirectoryWAnumber: saveon.gsDirectoryWAnumber,

      gsFollowSession: saveon.gsFollowSession,
      gsFollowDate: startofDate.toString(),
    }

    SmsDispositionApi.saveSmsGuidence(data)
      .subscribe(response => {
        setSave({
          gsInformationSought: response.data.gsInformationSought,
          gsRiskAsses: response.data.gsRiskAsses,
          gsAggrieved: response.data.gsAggrieved,
          gsOtherAggName: response.data.gsOtherAggName,
          gsOtherAggMobile: response.data.gsOtherAggMobile,
          gsOtherAggAge: response.data.gsOtherAggAge,
          gsOtherAggGender: response.data.gsOtherAggGender,
          gsOtherAggAddress: response.data.gsOtherAggAddress,
          gsAge: response.data.gsAge,
          gsAgeGroup: response.data.gsAgeGroup,
          gsEducation: response.data.gsEducation,
          gsOccupation: response.data.gsOccupation,
          gsGender: response.data.gsGender,
          gsPersonalIdent: response.data.gsPersonalIdent,
          gsMaritalStatus: response.data.gsMaritalStatus,
          gsLivingStatus: response.data.gsLivingStatus,
          gsFamilyStatus: response.data.gsFamilyStatus,
          gsHouseno: response.data.gsHouseno,
          gsStreet: response.data.gsStreet,
          gsBlock: response.data.gsBlock,
          gsVillage: response.data.gsVillage,
          gsState: response.data.gsState,
          gsDistrict: response.data.gsDistrict,
          gsPincode: response.data.gsPincode,
          gsPlaceofInc: response.data.gsPlaceofInc,
          gsFrequency: response.data.gsFrequency,
          gsStatusofInc: response.data.gsStatusofInc,
          gsCaseCat1: response.data.gsCaseCat1,
          gsSubCat: response.data.gsSubCat,
          gsTypeofAbuse: response.data.gsTypeofAbuse,
          gsPriorRedressal: response.data.gsPriorRedressal,
          gsPerpetrator: response.data.gsPerpetrator,
          gsServiceOffered: response.data.gsServiceOffered,
          gsAddObtain: response.data.gsAddObtain,
          gsStatusofCase: response.data.gsStatusofCase,
          gsAgency: response.data.gsAgency,
          gsNameofPerson: response.data.gsNameofPerson,
          gsRemarks: response.data.gsRemarks,
          gsPerpetratorName: response.data.gsPerpetratorName,
          gsPerpetratorAge: response.data.gsPerpetratorAge,
          gsPerpetratorGender: response.data.gsPerpetratorGender,
          gsPerpetratorMobile: response.data.gsPerpetratorMobile,
          gsPerpetratorOccup: response.data.gsPerpetratorOccup,
          gsPerpetratorAddition: response.data.gsPerpetratorAddition,

          gsOtherAggAgeGroup: response.data.gsOtherAggAgeGroup,
          gsCaseCat2: response.data.gsCaseCat2,
          gsSubCat2: response.data.gsSubCat2,
          gsTypeofAbuse2: response.data.gsTypeofAbuse2,
          gsDirectoryMain: response.data.gsDirectoryMain,
          gsDirectorySubMain: response.data.gsDirectorySubMain,
          gsDirectoryDistrict: response.data.gsDirectoryDistrict,
          gsDirectoryTown: response.data.gsDirectoryTown,
          gsDirectoryContName: response.data.gsDirectoryContName,
          gsDirectoryContNumber: response.data.gsDirectoryContNumber,
          gsDirectoryAddress: response.data.gsDirectoryAddress,
          gsDirectoryPincode: response.data.gsDirectoryPincode,
          gsDirectoryMailId: response.data.gsDirectoryMailId,
          gsDirectorySMSNumber: response.data.gsDirectorySMSNumber,
          gsDirectoryWAnumber: response.data.gsDirectoryWAnumber,

          gsFollowSession: response.data.gsFollowSession,
          gsFollowDate: response.data.gsFollowDate,
        });

      })
  }
  // save Disposition



  // save validation
  const onFinishFailed = errorInfo => {
    SaveOnSakhi()
  };
  const onFinish = values => {
    SaveOnSakhi()
  };
  // save validation

  // Function values and onchanges

  const [chec, setCheck] = useState({ typeofcall: '' });
  function onChangeCheck(value) {
    saveon.typeOfCall = value;
    setCheck({
      typeofcall: value
    })
  }

  const [infosough, setInfoSought] = useState({ infoso: 'no' });
  function onChangeInfoSought(value) {
    saveon.gsInformationSought = value.toString();
    setInfoSought({
      infoso: value
    })
  }

  const [riskAsses, setRiskAssign] = useState({ risk: 'no' });
  function onChangeRiskAssign(value) {
    saveon.gsRiskAsses = value;
    setRiskAssign({
      risk: value
    })
  }

  const [other, setOthers] = useState({ aggr: 'no' });
  function onChangeAggr(value) {
    saveon.gsAggrieved = value;
    setOthers({
      aggr: value
    })
  }

  const [otherAggrother, setOtherAggr] = useState({ aggother: 'no' });
  function onChangeAggrOther(value) {
    saveon.gsAggrieved = value;
    setOtherAggr({
      aggother: value
    })
  }

  function onChangeOtherAggAge(value) {
    saveon.gsOtherAggAgeGroup = value;
  }

  function onChangeOtherAggGender(value) {
    saveon.gsOtherAggGender = value;
  }

  function onChangeAgeGroup(value) {
    saveon.gsAgeGroup = value;
  }


  const [otherEducation, setOthersEdu] = useState({ educ: 'no' });
  function onChangeEducation(value) {
    saveon.gsEducation = value;
    setOthersEdu({
      educ: value
    })
  }

  const [otherOcc, setOtherOcc] = useState({ occ: 'no' });
  function onChangeOccupation(value) {
    saveon.gsOccupation = value.toString();
    setOtherOcc({
      occ: value
    })
  }

  function onChangeGender(value) {
    saveon.gsGender = value;
  }

  function onChangeMarital(value) {
    saveon.gsMaritalStatus = value;
  }

  function onChangeLivingStatus(value) {
    saveon.gsLivingStatus = value;
  }

  function onChangeFamilyStatus(value) {
    saveon.gsFamilyStatus = value;
  }

  const [incidentPlace, setIncPlace] = useState({ incPlace: 'no' });
  function onChangeIncPlace(value) {
    saveon.gsPlaceofInc = value;
    setIncPlace({
      incPlace: value
    })
  }


  function onChangeFrequency(value) {
    saveon.gsFrequency = value;
  }

  function onChangeStatusOfInc(value) {
    saveon.gsStatusofInc = value;
  }

  const [caseCat, setCaseOtherCat] = useState({ cat: 'no' });
  function onChangeGenCat(value) {
    saveon.gsCaseCat1 = value;
    setCaseOtherCat({
      cat: value
    })
  }



  const [subcaseCat, setSubCaseCat] = useState({ subcat1: 'no' });
  function onChangeSubCatValue(value) {
    saveon.gsSubCat = value.toString();
    setSubCaseCat({
      subcat1: value
    })
  }



  //saveon.esSubCat = localStorage.getItem("subcatval");
  const [subcaseCat2, setSubCaseCat2] = useState({ subcat2: 'no' });
  function onChangeSubCat2(value) {
    saveon.gsSubCat2 = value.toString();
    setSubCaseCat2({
      subcat2: value
    })
  }


  const [caseCat2, setCaseOtherCat2] = useState({ cat2: 'no' });
  function onChangeGenCat2(value) {
    saveon.gsCaseCat2 = value.toString();
    setCaseOtherCat2({
      cat2: value
    })
  }

  // saveon.gsSubCat = localStorage.getItem("subcatval2");

  const [typeofAbuse, setTypeofAbuse] = useState({ abuse: 'no' });
  function onChangeAbuseType(value) {
    saveon.gsTypeofAbuse = value.toString();
    setTypeofAbuse({
      abuse: value
    })
  }

  const [typeofAbuse2, setTypeofAbuse2] = useState({ abuse2: 'no' });
  function onChangeAbuseType2(value) {
    saveon.gsTypeofAbuse2 = value.toString();
    setTypeofAbuse2({
      abuse2: value
    })
  }

  const [priorRed, setPriorRed] = useState({ redressal: 'no' });
  function onChangePriorRed(value) {
    saveon.gsPriorRedressal = value;
    setPriorRed({
      redressal: value
    })
  }

  function onChangePerpAge(value) {
    saveon.gsPerpetratorAge = value;
  }

  function onChangePerpGender(value) {
    saveon.gsPerpetratorGender = value;
  }

  const [PerpotherOcc, setPerpOtherOcc] = useState({ Perpocc: 'no' });
  function onChangePerpOccupation(value) {
    saveon.gsPerpetratorOccup = value.toString();
    setPerpOtherOcc({
      Perpocc: value
    })
  }

  const [PerpotherAddi, setPerpOtherAddi] = useState({ Perpaddi: 'no' });
  function onChangePerpAddiction(value) {
    saveon.gsPerpetratorAddition = value;
    setPerpOtherAddi({
      Perpaddi: value
    })
  }

  const [serviceOff, setServiceOff] = useState({ serOff: 'no' });
  function onChangeServiceOff(value) {
    saveon.gsServiceOffered = value.toString();
    setServiceOff({
      serOff: value
    })
  }

  function onChangeAddObtain(value) {
    saveon.gsAddObtain = value;
  }

  const [satusofCase, setStatusofCase] = useState({ caseStatus: 'no' });
  function onChangeStatusofCase(value) {
    saveon.gsStatusofCase = value;
    setStatusofCase({
      caseStatus: value
    })
  }

  const [perpetrator, setPerpetrator] = useState({ perpr: 'no' });
  function onChangePerperaor(value) {
    saveon.gsPerpetrator = value;
    setPerpetrator({
      perpr: value
    })
  }



  const [districtval, setDistrictVal] = useState({ distval: 'no' });
  function onChangeDistrict(value) {
    saveon.gsDistrict = value;
    setDistrictVal({
      distval: value
    })

  }

  const [talukpinval, setTalukVal] = useState({ talukval: 'no' });
  function onChangeTaluk(value) {
    saveon.gsBlock = value;
    setTalukVal({
      talukval: value
    })

  }

  const [townvalpin, setTownValue] = useState({ valtownpin: '' })
  function onChangeTownPincode(value) {
    saveon.gsVillage = value
    setTownValue({
      valtownpin: value
    })
  }


  function onChangePincodeval(value) {
    saveon.gsPincode = value;

  }

  const [otherState, setOtherState] = useState({ othstate: '' })
  function onChangeState(value) {
    saveon.gsState = value;
    setOtherState({
      othstate: value
    })
  }



  function onChangeFollowUpSession(value) {
    saveon.gsFollowSession = value;
  }


  const [agetextval, setAgeTextVal] = useState('');
  saveon.gsAge = agetextval;

  var flage = '100';
  if (agetextval == 0) {
    flage = "0";
    saveon.gsAgeGroup = "Not Mentioned"
  }
  else if (agetextval >= 1 && agetextval <= 6) {
    flage = "1-6";
    saveon.gsAgeGroup = "1-6 Years"
  }
  else if (agetextval >= 7 && agetextval <= 12) {
    flage = "7-12";
    saveon.gsAgeGroup = "7-12 Years"

  }
  else if (agetextval >= 13 && agetextval <= 17) {
    flage = "13-17";
    saveon.gsAgeGroup = "13-17 Years"

  }
  else if (agetextval >= 18 && agetextval <= 25) {
    flage = "18-25";
    saveon.gsAgeGroup = "18-25 Years"

  }
  else if (agetextval >= 26 && agetextval <= 35) {
    flage = "26-35";
    saveon.gsAgeGroup = "26-35 Years"

  }
  else if (agetextval >= 36 && agetextval <= 46) {
    flage = "36-46";
    saveon.gsAgeGroup = "36-46 Years"

  }
  else if (agetextval >= 47 && agetextval <= 59) {
    flage = "47-59";
    saveon.gsAgeGroup = "47-59 Years"

  }
  else if (agetextval >= 60 && agetextval <= 70) {
    flage = "60-70";
    saveon.gsAgeGroup = "60-70 Years"

  }
  else if (agetextval >= 71 && agetextval <= 80) {
    flage = "71-80";
    saveon.gsAgeGroup = "71-80 Years"

  }
  else if (agetextval >= 81 && agetextval <= 90) {
    flage = "81-90";
    saveon.gsAgeGroup = "81-90 Years"

  }
  else {
    flage = "0"
    saveon.gsAgeGroup = "Not Mentioned"
  }


  // Function values and onchanges


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
    saveon.gsDirectoryMain = value;
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
    saveon.gsDirectorySubMain = value;
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
    saveon.gsDirectoryDistrict = value;
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
    saveon.gsDirectoryTown = value;
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

  saveon.gsDirectoryWAnumber = contactvalue.whatsupNumber;
  saveon.gsDirectoryAddress = contactvalue.address;
  saveon.gsDirectoryContName = contactvalue.contactName;
  saveon.gsDirectoryContNumber = contactvalue.contactNumber;
  saveon.gsDirectoryMailId = contactvalue.emailId;
  saveon.gsDirectorySMSNumber = contactvalue.smsNumber;
  saveon.gsDirectoryPincode = contactvalue.dirPincode;


  function handleContactDetail(evt) {
    const value = evt.target.value;
    setContactValue({
      ...contactvalue,
      [evt.target.name]: value
    });

    saveon.gsDirectoryWAnumber = contactvalue.whatsupNumber;
    saveon.gsDirectoryAddress = contactvalue.address;
    saveon.gsDirectoryContName = contactvalue.contactName;
    saveon.gsDirectoryContNumber = contactvalue.contactNumber;
    saveon.gsDirectoryMailId = contactvalue.emailId;
    saveon.gsDirectorySMSNumber = contactvalue.smsNumber;
    saveon.gsDirectoryPincode = contactvalue.dirPincode;

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
              treeDefaultExpandAll
              onChange={onChangeInfoSought}
            >

              <TreeNode value="Physical Needs" title="Physical Needs" key="290">
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

              <TreeNode value="Psychosocial Needs" title="Psychosocial Needs" key="303">
                <TreeNode value="Counselling" title="Counselling" key="304" />
                <TreeNode value="Mediation" title="Mediation" key="305" />
                <TreeNode value="Police Intervention" title="Police Intervention" key="351" />
                <TreeNode value="Negotiation" title="Negotiation" key="306" />
                <TreeNode value="Protection Order" title="Protection Order" key="307" />
                <TreeNode value="Child Custody related" title="Child Custody related" key="308" />
                <TreeNode value="To recover personal belongingness" title="To recover personal belongingness" key="309" />
                <TreeNode value="Any other" title="Any other" key="310" />
              </TreeNode>

              <TreeNode value="Financial needs" title="Financial needs" key="311">
                <TreeNode value="Child Welfare" title="Child Welfare" key="312">
                  <TreeNode value="Cradle Baby Scheme" title="Cradle Baby Scheme" key="313" />
                  <TreeNode value="Chie Minister's Girl Child Protection Scheme" title="Chie Minister's Girl Child Protection Scheme" key="314" />
                  <TreeNode value="Beti Bachao Beti Padhao Scheme" title="Beti Bachao Beti Padhao Scheme" key="315" />
                  <TreeNode value="Special Need Children Homes" title="Special Need Children Homes" key="316" />
                  <TreeNode value="The prohibition of Child MarriageAct,2006" title="The prohibition of Child MarriageAct,2006" key="317" />

                </TreeNode>
                <TreeNode value="Women Welfare (Marriage Assistance Scheme )" title="Women Welfare (Marriage Assistance Scheme )" key="318">
                  <TreeNode value="Moovalur Ramamirtham Poor Daughter" title="Moovalur Ramamirtham Poor Daughter" key="319" />
                  <TreeNode value="E.V.R Maniammaiyar -Widow Daughter" title="E.V.R Maniammaiyar -Widow Daughter" key="320" />
                  <TreeNode value="Annai Theresa Orphan Girls" title="Annai Theresa Orphan Girls" key="321" />
                  <TreeNode value="Dr.Dharmambal Widow Remarriage" title="Dr.Dharmambal Widow Remarriage" key="322" />
                  <TreeNode value="Dr.Muthulakshmi Intercaste Marriage" title="Dr.Muthulakshmi Intercaste Marriage" key="323" />

                </TreeNode>
                <TreeNode value="Other  Women Welfare Schemes" title="Other  Women Welfare Schemes" key="324">
                  <TreeNode value="Government  Service Home" title="Government  Service Home" key="325" />
                  <TreeNode value="Women Industerial Cooperative Socities" title="Women Industerial Cooperative Socities" key="326" />
                  <TreeNode value="Swadhar Homes" title="Swadhar Homes" key="327" />
                  <TreeNode value="Government Working Womens Hostel" title="Government Working Womens Hostel" key="328" />
                  <TreeNode value="Integrated Program for Senior Citizen" title="Integrated Program for Senior Citizen" key="329" />

                </TreeNode>
                <TreeNode value="Social Defence Schemes" title="Social Defence Schemes" key="330">
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
                <TreeNode value=" Social Security Pension Schemes" title=" Social Security Pension Schemes" key="341">
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
              </TreeNode>

            </TreeSelect>
          </FormItem>
        </Col>

        {/* Risk Assessment */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Risk Assessment</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeRiskAssign.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              onChange={onChangeRiskAssign}
            >

              <TreeNode value="Risk to life" title="Risk to life" key="362">
              </TreeNode>
              <TreeNode value="No risk to life" title="No risk to life" key="363">
              </TreeNode>

            </TreeSelect>
          </FormItem>
        </Col>


        {/* Aggrieved/Others */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Aggrieved/Others</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeAggr.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              onChange={onChangeAggr}
            >

              <TreeNode value="Self" title="Self" key="0">
              </TreeNode>
              <TreeNode value="Others" title="Others" key="1">
              </TreeNode>
            </TreeSelect>
          </FormItem>
        </Col>

        {/* Age with validation */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Age</h2>
          <FormItem>
            <Input placeholder="Age" type="number" pattern="[0-9]*"
              onChange={event => setAgeTextVal(event.target.value)}

            />
          </FormItem>
        </Col>


        {/* Aggrieved and InfoSought Other textbox */}
        {infosough.infoso == "Any other" || other.aggr == "Self" || other.aggr == "Others" || otherAggrother.aggother == "Others"

          ? <Col span={24}>
            <Row>
              {infosough.infoso == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Information</h2>
                  <FormItem>
                    <Input id="gsInformationSought" name="gsInformationSought" type="text" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }
              <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              {other.aggr == "Self" || other.aggr == "Others"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Name</h2>
                  <FormItem>
                    <Input id="gsAggrieved" name="gsAggrieved" placeholder="Name" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <null />
              }

              {other.aggr == "Others"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >On behalf of the aggrieved</h2>
                  <FormItem>
                    <TreeSelect className="gx-w-100"
                      showSearch
                      value={onChangeAggrOther.value}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="Please select"
                      allowClear
                      treeDefaultExpandAll
                      onChange={onChangeAggrOther}
                    >
                      {/* <TreeNode value=" On behalf of the aggrieved" title=" On behalf of the aggrieved" key="1000">
      </TreeNode> */}
                      <TreeNode value="Parent" title="Parent" key="0">
                      </TreeNode>
                      <TreeNode value="Siblings" title="Siblings" key="1">
                      </TreeNode>
                      <TreeNode value="Spouse" title="Spouse" key="2">
                      </TreeNode>
                      <TreeNode value="Children" title="Children" key="3">
                      </TreeNode>
                      <TreeNode value="Neighbour" title="Neighbour" key="4">
                      </TreeNode>
                      <TreeNode value="Friends" title="Friends" key="5">
                      </TreeNode>
                      <TreeNode value="Co-Workers" title="Co-Workers" key="6">
                      </TreeNode>
                      <TreeNode value="Not Disclosed" title="Not Disclosed" key="174">
                      </TreeNode>
                      <TreeNode value="Others" title="Others" key="122">
                      </TreeNode>
                    </TreeSelect>
                  </FormItem>
                </Col>

                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }

              {otherAggrother.aggother != "no"

                ? <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                  <Widget styleName={`ant-col gx-bg-geekblue `}>
                    <h3 className="gx-text-white" >Details of the Complainant if others</h3>
                    <Row>

                      <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                        <h3 className="gx-text-white" >Name</h3>
                        <FormItem>
                          <Input id="gsOtherAggName" name="gsOtherAggName" placeholder="Name" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                        </FormItem>
                      </Col>
                      <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                        <h2 className="gx-text-white" >Mobile</h2>
                        <FormItem >
                          <Input id="gsOtherAggMobile" name="gsOtherAggMobile" type="number" placeholder="Mobile" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                        </FormItem>
                      </Col>
                      <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                        <h2 className="gx-text-white" >Age</h2>
                        <FormItem >
                          <Input id="gsOtherAggMobile" name="gsOtherAggMobile" type="number" placeholder="Age"
                          //  value={handleChangeSakhi.value} onChange={handleChangeSakhi}
                          />
                        </FormItem>
                      </Col>
                      <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                        <h3 className="gx-text-white" >Age Group</h3>
                        <FormItem>
                          <TreeSelect className="gx-w-100"
                            showSearch
                            value={onChangeOtherAggAge.value}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            onChange={onChangeOtherAggAge}
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
                            value={onChangeOtherAggGender.value}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            onChange={onChangeOtherAggGender}
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
                        <h2 className="gx-text-white" >Address</h2>
                        <FormItem >
                          <Input id="gsOtherAggAddress" name="gsOtherAggAddress" placeholder="Address" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                        </FormItem>
                      </Col>
                    </Row>
                  </Widget>
                </Col>

                : <null />
              }
              <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>

            </Row>
          </Col>
          : <null />
        }


        {/* Age with Group */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Age Group </h2>
          <FormItem>


            {flage == "0"
              ? <Input id="gsAgeGroup" name="gsAgeGroup" placeholder="Age Group" value={""} onChange={handleChangeSakhi} />

              : flage == "1-6"
                ? <Input id="gsAgeGroup" name="gsAgeGroup" placeholder="0-6 Years" value={"0-6 Years"} onChange={handleChangeSakhi} />

                : flage == "7-12"
                  ? <Input id="gsAgeGroup" name="gsAgeGroup" placeholder="7-12 Years" value={"7-12 Years"} onChange={handleChangeSakhi} />

                  : flage == "13-17"
                    ? <Input id="gsAgeGroup" name="gsAgeGroup" placeholder="13-17 Years" value={"13-17 Years"} onChange={handleChangeSakhi} />

                    : flage == "18-25"
                      ? <Input id="gsAgeGroup" name="gsAgeGroup" placeholder="18-25 Years" value={"18-25 Years"} onChange={handleChangeSakhi} />

                      : flage == "26-35"
                        ? <Input id="gsAgeGroup" name="gsAgeGroup" placeholder="26-35 Years" value={"26-35 Years"} onChange={handleChangeSakhi} />

                        : flage == "36-46"
                          ? <Input id="gsAgeGroup" name="gsAgeGroup" placeholder="36-46 Years" value={"36-46 Years"} onChange={handleChangeSakhi} />

                          : flage == "47-59"
                            ? <Input id="gsAgeGroup" name="gsAgeGroup" placeholder="47-59 Years" value={"47-59 Years"} onChange={handleChangeSakhi} />

                            : flage == "60-70"
                              ? <Input id="gsAgeGroup" name="gsAgeGroup" placeholder="60-70 Years" value={"60-70 Years"} onChange={handleChangeSakhi} />

                              : flage == "71-80"
                                ? <Input id="gsAgeGroup" name="gsAgeGroup" placeholder="71-80 Years" value={"71-80 Years"} onChange={handleChangeSakhi} />

                                : flage == "81-90"
                                  ? <Input id="gsAgeGroup" name="gsAgeGroup" placeholder="81-90 Years" value={"81-90 Years"} onChange={handleChangeSakhi} />


                                  : <null />


            }

          </FormItem>

        </Col>


        {/* Education Field */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
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


        {/* Occupation */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Occupation</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeOccupation.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              multiple
              treeDefaultExpandAll
              onChange={onChangeOccupation}
            >
              <TreeNode value="Agriculturist" title="Agriculturist" key="157">
              </TreeNode>
              <TreeNode value="Archaeologist" title="Archaeologist" key="158">
              </TreeNode>
              <TreeNode value="Banking & Insurance" title="Banking & Insurance" key="159">
              </TreeNode>
              <TreeNode value="Business" title="Business" key="160">
              </TreeNode>
              <TreeNode value="Central Government Service" title="Central Government Service" key="161">
              </TreeNode>
              <TreeNode value="Driver" title="Driver" key="162">
              </TreeNode>
              <TreeNode value="Doctor" title="Doctor" key="163">
              </TreeNode>
              <TreeNode value="Domestic Help" title="Domestic Help" key="164">
              </TreeNode>
              <TreeNode value="Education" title="Education" key="165">
              </TreeNode>
              <TreeNode value="Engineer" title="Engineer" key="166">
              </TreeNode>
              <TreeNode value="Home Maker" title="Home Maker" key="167">
              </TreeNode>
              <TreeNode value="Financial Service" title="Financial Service" key="168">
              </TreeNode>
              <TreeNode value="Legal Service" title="Legal Service" key="169">
              </TreeNode>
              <TreeNode value="Nurse" title="Nurse" key="170">
              </TreeNode>
              <TreeNode value="Paramedical Staff" title="Paramedical Staff" key="171">
              </TreeNode>
              <TreeNode value="Police" title="Police" key="221">
              </TreeNode>
              <TreeNode value="State Government Service " title="State Government Service " key="222">
              </TreeNode>
              {/* <TreeNode value="Home Maker" title="Home Maker" key="223">
                      </TreeNode>
                      <TreeNode value="Legal Service" title="Legal Service" key="224">
                      </TreeNode> */}
              <TreeNode value="Not Disclosed" title="Not Disclosed" key="176">
              </TreeNode>
              <TreeNode value="Any other" title="Any other" key="172">
              </TreeNode>
            </TreeSelect>
          </FormItem>
        </Col>


        {/* Gender */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Gender</h2>
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



        {/* Educatio and Occupation Other textbox */}
        {otherEducation.educ == "Any other" || otherOcc.occ == "Any other"

          ? <Col span={24}>
            <Row>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              {otherEducation.educ == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Education</h2>
                  <FormItem>
                    <Input id="gsEducation" name="gsEducation" type="text" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }
              {otherOcc.occ == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Occupation</h2>
                  <FormItem>
                    <Input id="gsOccupation" name="gsOccupation" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <null />
              }
              <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>

            </Row>
          </Col>
          : <null />
        }


        {/* Personal Identification */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Personal Identification</h2>
          <FormItem>
            <Input id="gsPersonalIdent" name="gsPersonalIdent" type="text" placeholder="Personal Identy" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
          </FormItem>
        </Col>



        {/* Marital Status */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Marital Status</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeMarital.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              // treeDefaultExpandAll
              onChange={onChangeMarital}
            >

              <TreeNode value="Married" title="Married" key="8">
                <TreeNode value="Divorced" title="Divorced" key="142" />
                <TreeNode value="Widowed" title="Widowed" key="143" />
                <TreeNode value="Separated" title="Separated" key="144" />
              </TreeNode>
              <TreeNode value="UnMarried" title="UnMarried" key="9">
                <TreeNode value="Single" title="Single" key="145" />
                <TreeNode value="In-relationship" title="In-relationship" key="146" />
                <TreeNode value="Engaged" title="Engaged" key="147" />
              </TreeNode>
              <TreeNode value="Not Disclosed" title="Not Disclosed" key="177">
              </TreeNode>
            </TreeSelect>
          </FormItem>

        </Col>


        {/* Living Status */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Living Status</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeLivingStatus.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              onChange={onChangeLivingStatus}
            >

              <TreeNode value="Independent" title="Independent" key="138">
              </TreeNode>
              <TreeNode value="Shared Household" title="Shared Household" key="139">
              </TreeNode>
              <TreeNode value="Not Disclosed" title="Not Disclosed" key="178">
              </TreeNode>
            </TreeSelect>
          </FormItem>
        </Col>


        {/* Family Status */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Family Status</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeFamilyStatus.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              onChange={onChangeFamilyStatus}
            >

              <TreeNode value="Nuclear" title="Nuclear" key="140">
              </TreeNode>
              <TreeNode value="Joint" title="Joint" key="141">
              </TreeNode>
              <TreeNode value="Not Disclosed" title="Not Disclosed" key="179">
              </TreeNode>
            </TreeSelect>
          </FormItem>
        </Col>


        {/* Address details */}
        <Col xl={24} lg={12} md={12} sm={12} xs={24}>

          <Widget styleName={`ant-col gx-bg-geekblue `}>
            <h2 className="gx-text-white" >Address Details</h2>

            <Row>

              <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                <h3 className="gx-text-white" >House No</h3>
                <FormItem>
                  <Input id="gsHouseno" name="gsHouseno" placeholder="House No" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                </FormItem>
              </Col>
              <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                <h3 className="gx-text-white" >Street</h3>
                <FormItem>
                  <Input id="gsStreet" name="gsStreet" placeholder="Street" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                </FormItem>
              </Col>

              <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >State</h2>
                <FormItem >
                  {/* <Input id="gsState" name="gsState" placeholder="State"  value={handleChangeSakhi.value} onChange={handleChangeSakhi}/> */}
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
                    <Input id="gsState" name="gsState" placeholder="Mention"
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
                    <Input id="gsDistrict" name="gsDistrict" placeholder="Mention"
                      value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <null />
              }

              <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >Block/Mandal/Taluka</h2>
                <FormItem >
                  {/* <Input id="esBlock" name="esBlock" placeholder="Block/Mandal/Taluka" value={handleChangeSakhi.value} onChange={handleChangeSakhi} /> */}
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


        {/* Place of Incident */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Place of Incident</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeIncPlace.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              // treeDefaultExpandAll
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
              <TreeNode title="Public place" key="14">
                <TreeNode value="Park/Field" title="Park/Field" key="105" />
                <TreeNode value="Road/ Lane" title="Road/ Lane" key="106" />
                <TreeNode value="Market" title="Market" key="107" />
                <TreeNode value="Public Toilet" title="Public Toilet" key="108" />
                <TreeNode value="Bus Stop" title="Bus Stop" key="109" />
                <TreeNode value="Railway Station" title="Railway Station" key="110" />
                <TreeNode value="Taxirickshaw Stand" title="Taxirickshaw Stand" key="111" />
                <TreeNode value="Any other" title="Any other" key="112" />
              </TreeNode>
              <TreeNode title="Transport" key="15">
                <TreeNode value="Train" title="Train" key="76" />
                <TreeNode value="Metro" title="Metro" key="77" />
                <TreeNode value="Bus" title="Bus" key="78" />
                <TreeNode value="Taxi" title="Taxi" key="79" />
                <TreeNode value="Autorickshaw" title="Autorickshaw" key="80" />
                <TreeNode value="Cyclerickshaw" title="Cyclerickshaw" key="81" />
              </TreeNode>
              <TreeNode value="Not mentioned" title="Not mentioned" key="124">
              </TreeNode>
              <TreeNode value="Not Disclosed" title="Not Disclosed" key="180">
              </TreeNode>
              <TreeNode value="Any other" title="Any other" key="75">
              </TreeNode>
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
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
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

        {/* Status of Incident */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Status of Incident</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeStatusOfInc.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
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


        {/* Prior Redressal */}
        <Col lg={6} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Prior Redressal</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangePriorRed.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              onChange={onChangePriorRed}
            >

              <TreeNode value="CSR with Police" title="CSR with Police" key="132">
              </TreeNode>
              <TreeNode value="FIR with Police" title="FIR with Police" key="133">
              </TreeNode>
              <TreeNode value="Counselling with OSC" title="Counselling with OSC" key="134">
              </TreeNode>
              <TreeNode value="Counselling with FCC" title="Counselling with FCC" key="135">
              </TreeNode>
              <TreeNode value="She-box" title="She-box" key="136">
              </TreeNode>
              <TreeNode value="Internal Complaints Committee" title="Internal Complaints Committee" key="383">
              </TreeNode>
              <TreeNode value="Local Complaints Committee" title="Local Complaints Committee" key="384">
              </TreeNode>
              <TreeNode value="DSWO" title="DSWO" key="385">
              </TreeNode>
              <TreeNode value="Not relevant / Not asked" title="Not relevant / Not asked" key="386">
              </TreeNode>
              <TreeNode value="Not Disclosed" title="Not Disclosed" key="184">
              </TreeNode>
              <TreeNode value="Any other" title="Any other" key="387">
              </TreeNode>

            </TreeSelect>
          </FormItem>
        </Col>


        {/* PlaceOfIncident and CaseCategory Other textbox */}
        {incidentPlace.incPlace == "Any other" || priorRed.redressal == "Any other"

          ? <Col span={24}>
            <Row>
              {incidentPlace.incPlace == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Place</h2>
                  <FormItem>
                    <Input id="gsPlaceofInc" name="gsPlaceofInc" type="text" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }
              <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              {priorRed.redressal == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Prior Redressal</h2>
                  <FormItem>
                    <Input id="gsPriorRedressal" name="gsPriorRedressal" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }

            </Row>
          </Col>
          : <null />
        }


        {/* Case Category 1*/}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Case Category 1 </h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeGenCat.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
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
              <TreeNode value="Any other" title="Any other" key="64">
              </TreeNode>

            </TreeSelect>
          </FormItem>
        </Col>

        {/*sub case catagory 1 */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Sub Case Category 1</h2>
          <TreeSelect className="gx-w-100"
            showSearch
            value={onChangeSubCatValue.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            multiple
            treeDefaultExpandAll
            onChange={onChangeSubCatValue}
          >



            {
              caseCat.cat == "Domestic Violence"
                ? <TreeNode >
                  <TreeNode value="Domestic Violence $ Dowry Demand " title="Dowry Demand " key="19" />
                  <TreeNode value="Domestic Violence $  Marital Rape" title="Marital Rape" key="20" />
                  <TreeNode value="Domestic Violence $  Incest" title="Incest" key="21" />
                  <TreeNode value="Domestic Violence $  Forced Marriage" title="Forced Marriage" key="22" />
                  <TreeNode value="Domestic Violence $  Against Relationship of Choice" title="Against Relationship of Choice" key="23" />
                  <TreeNode value="Domestic Violence $  Bigamy" title="Bigamy" key="73" />
                  <TreeNode value="Domestic Violence $  Deception" title="Deception" key="74" />
                  <TreeNode value="Domestic Violence $  Adultery" title="Adultery" key="1174" />
                  <TreeNode value="Any other" title="Any other" key="292" />

                </TreeNode>

                : caseCat.cat == "Sexual Violence"
                  ? <TreeNode >
                    <TreeNode value="Sexual Violence $ Sexual Harrassment" title="Sexual Harrassment" key="25">
                      <TreeNode value="Sexual Harrassment $ Workplace" title="Workplace" key="26" />
                      <TreeNode value="Sexual Harrassment $ Public place" title="Public place" key="27" />
                      <TreeNode value="Sexual Harrassment $ Friends/Relatives Homes" title="Friends/Relatives Homes" key="28" />
                      <TreeNode value="Any other" title="Any other" key="391" />
                    </TreeNode>
                    <TreeNode value="Any other" title="Any other" key="392">

                    </TreeNode>
                    <TreeNode value="Sexual Violence $ Sexual Assualt" title="Sexual Assualt" key="29" />
                    <TreeNode value="Sexual Violence $ Stalking" title="Stalking" key="30" />
                    <TreeNode value="Sexual Violence $ Voyeurism (Sec. 354 IPC)" title="Voyeurism (Sec. 354 IPC)" key="31" />
                    <TreeNode value="Voyeurism (Sec. 354 IPC) $ Rape" title="Rape" key="32">
                      <TreeNode value="Rape $ Known" title="Known" key="62" />
                      <TreeNode value="Rape $ Unknown" title="Unknown" key="63" />
                      <TreeNode value="Any other" title="Any other" key="393" />
                    </TreeNode>
                    <TreeNode value="Sexual Violence $ Deceivement / false promise of marriage" title="Deceivement / false promise of marriage" key="371">
                    </TreeNode>

                    <TreeNode value="Any other" title="Any other" key="394">
                    </TreeNode>

                  </TreeNode>


                  : caseCat.cat == "Crime Against Children"
                    ? <TreeNode >
                      <TreeNode value="Mental Health Issues-for Self $ Depression" title="Depression" key="66" />
                      <TreeNode value="Mental Health Issues-for Self $ Suicidal Ideation" title="Suicidal Ideation" key="67" />
                      <TreeNode value="Mental Health Issues-for Self $ Drug/ Alcoholism" title="Drug/ Alcoholism" key="68" />
                      <TreeNode value="Any other" title="Any other" key="373" />
                    </TreeNode>




                    : caseCat.cat == "Mental Health Issues-for Self"
                      ? <TreeNode >
                        <TreeNode value="Depression" title="Depression" key="267">
                        </TreeNode>
                        <TreeNode value="Suicidal Ideation" title="Suicidal Ideation" key="268">
                        </TreeNode>
                        <TreeNode value="Drug/ Alcoholism" title="Drug/ Alcoholism" key="269">
                        </TreeNode>
                        <TreeNode value="Any other" title="Any other" key="291">
                        </TreeNode>

                      </TreeNode>




                      : caseCat.cat == "Crime Related"
                        ?
                        <TreeNode >
                          <TreeNode value="Crime Related $ Murder Attempt" title="Murder Attempt" key="70" />
                          <TreeNode value="Crime Related $ Human Trafficking" title="Human Trafficking" key="71" />
                          <TreeNode value="Crime Related $ Threatening Calls" title="Threatening Calls" key="72" />
                          <TreeNode value="Crime Related $ Missing Persons" title="Missing Persons" key="374" />
                          <TreeNode value="Crime Related $ Monetary fraud" title="Monetary fraud" key="375" />
                          <TreeNode value="Any other" title="Any other" key="376" />

                        </TreeNode>

                        : caseCat.cat == "Cyber Crime"
                          ?
                          <TreeNode >
                            <TreeNode value="Legal Disputes $ Child Custody" title="Child Custody" key="279" />
                            <TreeNode value="Legal Disputes $ Maintenance" title="Maintenance" key="280" />
                            <TreeNode value="Legal Disputes $ Divorce" title="Divorce" key="281" />
                            <TreeNode value="Legal Disputes $ Property dispute" title="Property dispute" key="278" />
                            <TreeNode value="Legal Disputes $ Other Legal issues" title="Other Legal issues" key="282" />
                            <TreeNode value="Any other" title="Any other" key="380" />
                          </TreeNode>


                          : caseCat.cat == "Legal Disputes"
                            ?
                            <TreeNode >
                              <TreeNode value="Property dispute" title="Property dispute" key="278">
                              </TreeNode>
                              <TreeNode value="Child Custody" title="Child Custody" key="279">
                              </TreeNode>
                              <TreeNode value="Maintenance" title="Maintenance" key="280">
                              </TreeNode>
                              <TreeNode value="Divorce" title="Divorce" key="281">
                              </TreeNode>
                              <TreeNode value="Other Legal issues" title="Other Legal issues" key="282">
                              </TreeNode>
                              <TreeNode value="Any other" title="Any other" key="290">
                              </TreeNode>

                            </TreeNode>

                            : caseCat.cat == "Rescues & Emergencies"
                              ?
                              <TreeNode >
                                <TreeNode value="Rescues & Emergencies $ Rescue" title="Rescue" key="283" />
                                <TreeNode value="Rescues & Emergencies $ Disaster Management" title="Disaster Management" key="284" />
                                <TreeNode value="Any other" title="Any other" key="381" />
                              </TreeNode>

                              : caseCat.cat == "Other Complaints & Queries"
                                ?
                                <TreeNode >
                                  <TreeNode value="Other Complaints & Queries $ Maladjustment with spouse & in laws" title="Maladjustment with spouse & in laws" key="285" />
                                  <TreeNode value="Other Complaints & Queries $  Public Nuisance" title="Public Nuisance" key="286" />
                                  <TreeNode value="Any other" title="Any other" key="382" />
                                </TreeNode>

                                :
                                <TreeNode >

                                </TreeNode>


            }


          </TreeSelect>
        </Col>

        {/* Type of Abuse 1 */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Type of Abuse 1</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeAbuseType.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              multiple
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
              <TreeNode value="Any other" title="Any other" key="390">
              </TreeNode>

            </TreeSelect>
          </FormItem>

        </Col>

        <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>

        {/* case Categpory 1 and typeof abuse 1 Other textbox */}
        {caseCat.cat == "Any other" || typeofAbuse.abuse == "Any other" || subcaseCat.subcat1 == "Any other"

          ? <Col span={24}>
            <Row>
              {caseCat.cat == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Case Categroy 1</h2>
                  <FormItem>
                    <Input id="gsCaseCat1" name="gsCaseCat1" type="text" placeholder="Mention"
                      value={handleChangeSakhi.value} onChange={handleChangeSakhi}
                    />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }
              {subcaseCat.subcat1 == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Sub Case Categroy 1</h2>
                  <FormItem>
                    <Input id="esSubCat" name="esSubCat" type="text" placeholder="Mention"
                      value={handleChangeSakhi.value} onChange={handleChangeSakhi}
                    />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }

              {typeofAbuse.abuse == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Abuse 1</h2>
                  <FormItem>
                    <Input id="gsTypeofAbuse" name="gsTypeofAbuse" placeholder="Mention"
                      value={handleChangeSakhi.value} onChange={handleChangeSakhi}
                    />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }

            </Row>
          </Col>
          : <null />
        }


        {/* Case Category 2*/}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Case Category 2</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeGenCat2.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
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
              <TreeNode value="Any other" title="Any other" key="64">
              </TreeNode>

            </TreeSelect>
          </FormItem>
        </Col>

        {/*sub case catagory 2 */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Sub Case Category 2</h2>
          <TreeSelect className="gx-w-100"
            showSearch
            value={onChangeSubCat2.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            multiple
            treeDefaultExpandAll
            onChange={onChangeSubCat2}
          >



            {
              caseCat2.cat2 == "Domestic Violence"
                ? <TreeNode >
                  <TreeNode value="Domestic Violence $ Dowry Demand " title="Dowry Demand " key="19" />
                  <TreeNode value="Domestic Violence $  Marital Rape" title="Marital Rape" key="20" />
                  <TreeNode value="Domestic Violence $  Incest" title="Incest" key="21" />
                  <TreeNode value="Domestic Violence $  Forced Marriage" title="Forced Marriage" key="22" />
                  <TreeNode value="Domestic Violence $  Against Relationship of Choice" title="Against Relationship of Choice" key="23" />
                  <TreeNode value="Domestic Violence $  Bigamy" title="Bigamy" key="73" />
                  <TreeNode value="Domestic Violence $  Deception" title="Deception" key="74" />
                  <TreeNode value="Domestic Violence $  Adultery" title="Adultery" key="1174" />
                  <TreeNode value="Any other" title="Any other" key="292" />

                </TreeNode>

                : caseCat2.cat2 == "Sexual Violence"
                  ? <TreeNode >
                    <TreeNode value="Sexual Violence $ Sexual Harrassment" title="Sexual Harrassment" key="25">
                      <TreeNode value="Sexual Harrassment $ Workplace" title="Workplace" key="26" />
                      <TreeNode value="Sexual Harrassment $ Public place" title="Public place" key="27" />
                      <TreeNode value="Sexual Harrassment $ Friends/Relatives Homes" title="Friends/Relatives Homes" key="28" />
                      <TreeNode value="Any other" title="Any other" key="391" />
                    </TreeNode>
                    <TreeNode value="Any other" title="Any other" key="392">

                    </TreeNode>
                    <TreeNode value="Sexual Violence $ Sexual Assualt" title="Sexual Assualt" key="29" />
                    <TreeNode value="Sexual Violence $ Stalking" title="Stalking" key="30" />
                    <TreeNode value="Sexual Violence $ Voyeurism (Sec. 354 IPC)" title="Voyeurism (Sec. 354 IPC)" key="31" />
                    <TreeNode value="Voyeurism (Sec. 354 IPC) $ Rape" title="Rape" key="32">
                      <TreeNode value="Rape $ Known" title="Known" key="62" />
                      <TreeNode value="Rape $ Unknown" title="Unknown" key="63" />
                      <TreeNode value="Any other" title="Any other" key="393" />
                    </TreeNode>
                    <TreeNode value="Sexual Violence $ Deceivement / false promise of marriage" title="Deceivement / false promise of marriage" key="371">
                    </TreeNode>

                    <TreeNode value="Any other" title="Any other" key="394">
                    </TreeNode>

                  </TreeNode>


                  : caseCat2.cat2 == "Crime Against Children"
                    ? <TreeNode >
                      <TreeNode value="Mental Health Issues-for Self $ Depression" title="Depression" key="66" />
                      <TreeNode value="Mental Health Issues-for Self $ Suicidal Ideation" title="Suicidal Ideation" key="67" />
                      <TreeNode value="Mental Health Issues-for Self $ Drug/ Alcoholism" title="Drug/ Alcoholism" key="68" />
                      <TreeNode value="Any other" title="Any other" key="373" />
                    </TreeNode>




                    : caseCat2.cat2 == "Mental Health Issues-for Self"
                      ? <TreeNode >
                        <TreeNode value="Depression" title="Depression" key="267">
                        </TreeNode>
                        <TreeNode value="Suicidal Ideation" title="Suicidal Ideation" key="268">
                        </TreeNode>
                        <TreeNode value="Drug/ Alcoholism" title="Drug/ Alcoholism" key="269">
                        </TreeNode>
                        <TreeNode value="Any other" title="Any other" key="291">
                        </TreeNode>

                      </TreeNode>




                      : caseCat2.cat2 == "Crime Related"
                        ?
                        <TreeNode >
                          <TreeNode value="Crime Related $ Murder Attempt" title="Murder Attempt" key="70" />
                          <TreeNode value="Crime Related $ Human Trafficking" title="Human Trafficking" key="71" />
                          <TreeNode value="Crime Related $ Threatening Calls" title="Threatening Calls" key="72" />
                          <TreeNode value="Crime Related $ Missing Persons" title="Missing Persons" key="374" />
                          <TreeNode value="Crime Related $ Monetary fraud" title="Monetary fraud" key="375" />
                          <TreeNode value="Any other" title="Any other" key="376" />

                        </TreeNode>

                        : caseCat2.cat2 == "Cyber Crime"
                          ?
                          <TreeNode >
                            <TreeNode value="Legal Disputes $ Child Custody" title="Child Custody" key="279" />
                            <TreeNode value="Legal Disputes $ Maintenance" title="Maintenance" key="280" />
                            <TreeNode value="Legal Disputes $ Divorce" title="Divorce" key="281" />
                            <TreeNode value="Legal Disputes $ Property dispute" title="Property dispute" key="278" />
                            <TreeNode value="Legal Disputes $ Other Legal issues" title="Other Legal issues" key="282" />
                            <TreeNode value="Any other" title="Any other" key="380" />
                          </TreeNode>


                          : caseCat2.cat2 == "Legal Disputes"
                            ?
                            <TreeNode >
                              <TreeNode value="Property dispute" title="Property dispute" key="278">
                              </TreeNode>
                              <TreeNode value="Child Custody" title="Child Custody" key="279">
                              </TreeNode>
                              <TreeNode value="Maintenance" title="Maintenance" key="280">
                              </TreeNode>
                              <TreeNode value="Divorce" title="Divorce" key="281">
                              </TreeNode>
                              <TreeNode value="Other Legal issues" title="Other Legal issues" key="282">
                              </TreeNode>
                              <TreeNode value="Any other" title="Any other" key="290">
                              </TreeNode>

                            </TreeNode>

                            : caseCat2.cat2 == "Rescues & Emergencies"
                              ?
                              <TreeNode >
                                <TreeNode value="Rescues & Emergencies $ Rescue" title="Rescue" key="283" />
                                <TreeNode value="Rescues & Emergencies $ Disaster Management" title="Disaster Management" key="284" />
                                <TreeNode value="Any other" title="Any other" key="381" />
                              </TreeNode>

                              : caseCat2.cat2 == "Other Complaints & Queries"
                                ?
                                <TreeNode >
                                  <TreeNode value="Other Complaints & Queries $ Maladjustment with spouse & in laws" title="Maladjustment with spouse & in laws" key="285" />
                                  <TreeNode value="Other Complaints & Queries $  Public Nuisance" title="Public Nuisance" key="286" />
                                  <TreeNode value="Any other" title="Any other" key="382" />
                                </TreeNode>

                                :
                                <TreeNode >

                                </TreeNode>


            }


          </TreeSelect>
        </Col>

        {/* Type of Abuse 2 */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Type of Abuse 2</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeAbuseType2.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              multiple
              treeDefaultExpandAll
              onChange={onChangeAbuseType2}
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
              <TreeNode value="Any other" title="Any other" key="390">
              </TreeNode>

            </TreeSelect>
          </FormItem>
        </Col>

        <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>

        {/* case Categpory2 and typeof abuse2 Other textbox */}
        {caseCat2.cat2 == "Any other" || typeofAbuse2.abuse2 == "Any other" || subcaseCat2.subcat2 == "Any other"

          ? <Col span={24}>
            <Row>
              {caseCat2.cat2 == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Case Categroy 2</h2>
                  <FormItem>
                    <Input id="gsPlaceofInc" name="gsPlaceofInc" type="text" placeholder="Mention"
                    // value={handleChangeSakhi.value} onChange={handleChangeSakhi}
                    />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }
              {subcaseCat2.subcat2 == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Sub Case Categroy 2</h2>
                  <FormItem>
                    <Input id="esPlaceofInc" name="esPlaceofInc" type="text" placeholder="Mention"
                    // value={handleChangeSakhi.value} onChange={handleChangeSakhi}
                    />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }
              {typeofAbuse2.abuse2 == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Abuse 2</h2>
                  <FormItem>
                    <Input id="gsPriorRedressal" name="gsPriorRedressal" placeholder="Mention"
                    // value={handleChangeSakhi.value} onChange={handleChangeSakhi}
                    />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }

            </Row>
          </Col>
          : <null />
        }


        {/* Perpetrator Details */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Perpetrator Details</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangePerperaor.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              // treeDefaultExpandAll
              onChange={onChangePerperaor}
            >

              <TreeNode title="Spouse" key="82">
                <TreeNode value="Husband" title="Husband" key="83" />
                <TreeNode value="Wife" title="Wife" key="84" />

              </TreeNode>
              <TreeNode title="In Laws" key="85">
                <TreeNode value="Father In law" title="Father In law" key="86" />
                <TreeNode value="Mother in law" title="Mother in law" key="87" />
                <TreeNode value="Brother In law" title="Brother In law" key="88" />
                <TreeNode value="Sister In  law" title="Sister In  law" key="89" />
              </TreeNode>
              <TreeNode title="Parents" key="90">
                <TreeNode value="Father " title="Father " key="91" />
                <TreeNode value="Mother" title="Mother" key="92" />
              </TreeNode>
              <TreeNode title="Siblings " key="93">
                <TreeNode value="Brother " title="Brother " key="94" />
                <TreeNode value="Sister" title="Sister" key="95" />
              </TreeNode>
              <TreeNode title="Relatives" key="96">
                <TreeNode value="Uncle " title="Uncle " key="97" />
                <TreeNode value="Aunt" title="Aunt" key="98" />
                <TreeNode value="Nephew " title="Nephew " key="99" />
                <TreeNode value="Niece" title="Niece" key="100" />
              </TreeNode>
              <TreeNode value="Live in Partner" title="Live in Partner" key="388">
              </TreeNode>
              <TreeNode value="Girl Friend / Boy Friend" title="Girl Friend / Boy Friend" key="389">
              </TreeNode>
              <TreeNode value="Friend" title="Friend" key="101">
              </TreeNode>
              <TreeNode value="Neighbour" title="Neighbour" key="102">
              </TreeNode>
              <TreeNode value="Employer" title="Employer" key="103">
              </TreeNode>
              <TreeNode value="Not Disclosed" title="Not Disclosed" key="127">
              </TreeNode>
              <TreeNode value="Any other" title="Any other" key="104">
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
              <TreeNode value="Referred To Police" title="Referred To Police" key="196">
              </TreeNode>
              <TreeNode value="Referred To One Stop Centre (OSC)" title="Referred To One Stop Centre (OSC)" key="197">
              </TreeNode>
              <TreeNode value="Referred To  Family Counseling Center" title="Referred To  Family Counseling Center" key="198">
              </TreeNode>
              <TreeNode value="Referred To Child Protection Officer" title="Referred To Child Protection Officer" key="199">
              </TreeNode>
              <TreeNode value="Referred To Taluk Office" title="Referred To Taluk Office" key="200">
              </TreeNode>
              <TreeNode value="Referred To DSWO's of all Districts" title="Referred To DSWO's of all Districts" key="201">
              </TreeNode>
              <TreeNode value="Referred To She-Box" title="Referred To She-Box" key="202">
              </TreeNode>
              <TreeNode value="Referred To Family Court" title="Referred To Family Court" key="203">
              </TreeNode>
              <TreeNode value="Referred To India Institute Mental Health" title="Referred To India Institute Mental Health" key="204">
              </TreeNode>
              <TreeNode value="Referred To Disabled Welfare Officer" title="Referred To Disabled Welfare Officer" key="205">
              </TreeNode>
              <TreeNode value="Referred To Special Thasildhar" title="Referred To Special Thasildhar" key="206">
              </TreeNode>
              <TreeNode value="Referred To AWPS" title="Referred To AWPS" key="207">
              </TreeNode>
              <TreeNode value="Referred To Protection Officers" title="Referred To Protection Officers" key="208">
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


        {/* Status of the Case */}
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Status of the Case</h2>
          <FormItem>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeStatusofCase.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              onChange={onChangeStatusofCase}
            >

              <TreeNode value="Process" title="Process" key="217">
              </TreeNode>
              <TreeNode value="Closed" title="Closed" key="218">
              </TreeNode>
              <TreeNode value="Follow Up" title="Follow Up" key="219">
              </TreeNode>
              <TreeNode value="Any other" title="Any other" key="220">
              </TreeNode>
            </TreeSelect>
          </FormItem>
        </Col>

        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
        </Col>


        {/*  Followup Session and date  */}
        {satusofCase.caseStatus == "Follow Up"
          ?
          <Col span={24}>

            <Widget styleName={`ant-col gx-bg-geekblue `}>
              <div className="gx-card-body">
                <Row>

                  <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                    <h2 className="gx-text-white" >Follow Up Session</h2>
                    <FormItem>
                      <TreeSelect className="gx-w-100"
                        showSearch
                        value={onChangeFollowUpSession.value}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="Please select"
                        allowClear
                        treeDefaultExpandAll
                        onChange={onChangeFollowUpSession}
                      >

                        <TreeNode value="Morning Session" title="Morning Session" key="340">
                        </TreeNode>
                        <TreeNode value="Evening Session" title="Evening Session" key="341">
                        </TreeNode>

                      </TreeSelect>
                    </FormItem>
                  </Col>
                  <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                    <h2 className="gx-text-white" >Follow Up Date</h2>
                    <DatePicker className="gx-mb-3 gx-w-100" selected={startofDate} showTime format={dateFormat}
                      onChange={date => setStartOfDate(date)}
                    />
                  </Col>
                </Row>
              </div>
            </Widget>


          </Col>

          : <null />
        }


        {/*  Perpetrator Service Offered and Status of Case Other textbox Other TextBox */}
        {perpetrator.perpr == "Any other" || serviceOff.serOff == "Any other" || satusofCase.caseStatus == "Any other"
          ?
          <Col span={24}>
            <Row>

              {perpetrator.perpr == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Perpetrator</h2>
                  <FormItem>
                    <Input id="gsPerpetrator" name="gsPerpetrator" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }
              {serviceOff.serOff == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Services</h2>
                  <FormItem>
                    <Input id="gsServiceOffered" name="gsServiceOffered" type="text" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }
              {satusofCase.caseStatus == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Status</h2>
                  <FormItem>
                    <Input id="gsStatusofCase" name="gsStatusofCase" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }
            </Row>
          </Col>

          : <null />
        }

        {perpetrator.perpr == "no"
          ? <null />
          : <Col xl={24} lg={12} md={12} sm={12} xs={24}>
            <Widget styleName={`ant-col gx-bg-geekblue `}>
              <h3 className="gx-text-white" >Personal Details of the Perpetrator</h3>
              <Row>

                <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                  <h3 className="gx-text-white" >Name</h3>
                  <FormItem>
                    <Input id="gsPerpetratorName" name="gsPerpetratorName" placeholder="Name" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                  <h3 className="gx-text-white" >Age</h3>
                  <FormItem>
                    <Input id="gsPerpetratorAge" name="gsPerpetratorAge" type="number" pattern="[0-9]*" placeholder="Age"
                      value={handleChangeSakhi.value} onChange={handleChangeSakhi}
                    />
                  </FormItem>
                </Col>
                <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                  <h3 className="gx-text-white" >Age Group</h3>
                  <FormItem>
                    <TreeSelect className="gx-w-100"
                      showSearch
                      value={onChangePerpAge.value}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="Please select"
                      allowClear
                      treeDefaultExpandAll
                      onChange={onChangePerpAge}
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
                      value={onChangePerpGender.value}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="Please select"
                      allowClear
                      treeDefaultExpandAll
                      onChange={onChangePerpGender}
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
                    <Input id="gsPerpetratorMobile" name="gsPerpetratorMobile" placeholder="Mobile" pattern="[0-9]*"
                      value={handleChangeSakhi.value} onChange={handleChangeSakhi.bind(this)} />
                  </FormItem>
                </Col>

                {/* Occupation */}
                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-white" >Occupation</h2>
                  <FormItem>
                    <TreeSelect className="gx-w-100"
                      showSearch
                      value={onChangePerpOccupation.value}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="Please select"
                      allowClear
                      multiple
                      treeDefaultExpandAll
                      onChange={onChangePerpOccupation}
                    >
                      <TreeNode value="Agriculturist" title="Agriculturist" key="157">
                      </TreeNode>
                      <TreeNode value="Archaeologist" title="Archaeologist" key="158">
                      </TreeNode>
                      <TreeNode value="Banking & Insurance" title="Banking & Insurance" key="159">
                      </TreeNode>
                      <TreeNode value="Business" title="Business" key="160">
                      </TreeNode>
                      <TreeNode value="Central Government Service" title="Central Government Service" key="161">
                      </TreeNode>
                      <TreeNode value="Driver" title="Driver" key="162">
                      </TreeNode>
                      <TreeNode value="Doctor" title="Doctor" key="163">
                      </TreeNode>
                      <TreeNode value="Domestic Help" title="Domestic Help" key="164">
                      </TreeNode>
                      <TreeNode value="Education" title="Education" key="165">
                      </TreeNode>
                      <TreeNode value="Engineer" title="Engineer" key="166">
                      </TreeNode>
                      <TreeNode value="Home Maker" title="Home Maker" key="167">
                      </TreeNode>
                      <TreeNode value="Financial Service" title="Financial Service" key="168">
                      </TreeNode>
                      <TreeNode value="Legal Service" title="Legal Service" key="169">
                      </TreeNode>
                      <TreeNode value="Nurse" title="Nurse" key="170">
                      </TreeNode>
                      <TreeNode value="Paramedical Staff" title="Paramedical Staff" key="171">
                      </TreeNode>
                      <TreeNode value="Police" title="Police" key="221">
                      </TreeNode>
                      <TreeNode value="State Government Service " title="State Government Service " key="222">
                      </TreeNode>
                      {/* <TreeNode value="Home Maker" title="Home Maker" key="223">
                                    </TreeNode>
                                    <TreeNode value="Legal Service" title="Legal Service" key="224">
                                    </TreeNode> */}
                      <TreeNode value="Not Disclosed" title="Not Disclosed" key="176">
                      </TreeNode>
                      <TreeNode value="Any other" title="Any other" key="172">
                      </TreeNode>
                    </TreeSelect>
                  </FormItem>
                </Col>

                {/* Addiction */}
                <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-white" >Addiction</h2>
                  <FormItem>
                    <TreeSelect className="gx-w-100"
                      showSearch
                      value={onChangePerpAddiction.value}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="Please select"
                      allowClear
                      treeDefaultExpandAll
                      onChange={onChangePerpAddiction}
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
                      <TreeNode value="Any other" title="Any other" key="152">
                      </TreeNode>

                    </TreeSelect>
                  </FormItem>
                </Col>

                {/*  Perpetrator Service Offered and Status of Case Other textbox Other TextBox */}
                {PerpotherOcc.Perpocc == "Any other" || PerpotherAddi.Perpaddi == "Any other"
                  ?
                  <Col span={24}>
                    <Row>

                      {PerpotherOcc.Perpocc == "Any other"
                        ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                          <h2 className="gx-text-red" >Other Occupation</h2>
                          <FormItem>
                            <Input id="gsPerpetratorOccup" name="gsPerpetratorOccup" placeholder="Mention"
                              value={handleChangeSakhi.value} onChange={handleChangeSakhi}
                            />
                          </FormItem>
                        </Col>
                        : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
                      }
                      {PerpotherAddi.Perpaddi == "Any other"
                        ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                          <h2 className="gx-text-red" >Other Adiction</h2>
                          <FormItem>
                            <Input id="gsPerpetratorAddition" name="gsPerpetratorAddition" type="text" placeholder="Mention"
                              value={handleChangeSakhi.value} onChange={handleChangeSakhi}
                            />
                          </FormItem>
                        </Col>
                        : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
                      }
                    </Row>
                  </Col>

                  : <null />
                }


              </Row>
            </Widget>
          </Col>

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
              id="gsRemarks" name="gsRemarks" placeholder="Remarks"
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
              Save GuidenceCouncling
            </Button>
          </FormItem>
        </Col>

      </Form>
    </Auxiliary>
  );

}
export default SmsGuidenceCouncling;
