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
import { SubCatContext } from "./SubCatContext";
import { SubCatContextnew } from "./SubCatContextnew";
import DirectoryApi from "./DirectoryApi/DirectoryApi";
import PincodeApi from "./PincodeApi";
import MailDispositionApi from "./MailApi/MailDispositionApi";
import SmsDispositionApi from "./SmsDispositionApi";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const SmsEmergencyScreen = (props) => {


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
  // var dateofstart = startofDate.toISOString().substr(0,19);


  const [endofDate, setEndOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  // var dateofend = endofDate.toISOString().substr(0,19);

  //datepicker



  const TreeNode = TreeSelect.TreeNode;
  const msg = useContext(UserContext);
  const subcont = useContext(SubCatContextnew);


  // save Disposition
  const [saveon, setSave] = useState({
    esInformationSought: 'Not Disclosed', esRiskAsses: 'Not Disclosed', esAggrieved: 'Not Disclosed', esOtherAggName: 'Not Disclosed',
    esOtherAggMobile: 'Not Disclosed', esOtherAggAge: 'Not Disclosed', esOtherAggGender: 'Not Disclosed', esOtherAggAddress: 'Not Disclosed',
    esAge: 'Not Disclosed', esAgeGroup: 'Not Disclosed', esEducation: 'Not Disclosed', esOccupation: 'Not Disclosed', esGender: 'Not Disclosed',
    esPersonalIdent: 'Not Disclosed', esMaritalStatus: 'Not Disclosed', esLivingStatus: 'Not Disclosed', esFamilyStatus: 'Not Disclosed',
    esHouseno: 'Not Disclosed', esStreet: 'Not Disclosed', esBlock: 'Not Disclosed', esVillage: 'Not Disclosed', esState: 'Not Disclosed',
    esDistrict: 'Not Disclosed', esPincode: 'Not Disclosed',
    esPlaceofInc: 'Not Disclosed', esFrequency: 'Not Disclosed', esStatusofInc: 'Not Disclosed', esCaseCat1: 'Not Disclosed', esSubCat: 'Not Disclosed',
    esTypeofAbuse: 'Not Disclosed', esPriorRedressal: 'Not Disclosed', esPerpetrator: 'Not Disclosed', esServiceOffered: 'Not Disclosed',
    esAddObtain: 'Not Disclosed', esStatusofCase: 'Not Disclosed', esAgency: 'Not Disclosed', esNameofPerson: 'Not Disclosed', esRemarks: 'Not Disclosed',
    esPerpetratorName: 'Not Disclosed', esPerpetratorAge: 'Not Disclosed', esPerpetratorGender: 'Not Disclosed', esPerpetratorMobile: 'Not Disclosed',
    esPerpetratorOccup: 'Not Disclosed', esPerpetratorAddition: 'Not Disclosed'
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
      caseId: props.EmergencyScreen,
      esInformationSought: saveon.esInformationSought,
      esRiskAsses: saveon.esRiskAsses,
      esAggrieved: saveon.esAggrieved,
      esOtherAggName: saveon.esOtherAggName,
      esOtherAggMobile: saveon.esOtherAggMobile,
      esOtherAggAge: saveon.esOtherAggAge,
      esOtherAggGender: saveon.esOtherAggGender,
      esOtherAggAddress: saveon.esOtherAggAddress,
      esAge: saveon.esAge,
      esAgeGroup: saveon.esAgeGroup,
      esEducation: saveon.esEducation,
      esOccupation: saveon.esOccupation,
      esGender: saveon.esGender,
      esPersonalIdent: saveon.esPersonalIdent,
      esMaritalStatus: saveon.esMaritalStatus,
      esLivingStatus: saveon.esLivingStatus,
      esFamilyStatus: saveon.esFamilyStatus,
      esHouseno: saveon.esHouseno,
      esStreet: saveon.esStreet,
      esBlock: saveon.esBlock,
      esVillage: saveon.esVillage,
      esState: saveon.esState,
      esDistrict: saveon.esDistrict,
      esPincode: saveon.esPincode,
      esPlaceofInc: saveon.esPlaceofInc,
      esFrequency: saveon.esFrequency,
      esStatusofInc: saveon.esStatusofInc,
      esCaseCat1: saveon.esCaseCat1,
      esSubCat: saveon.esSubCat,
      esTypeofAbuse: saveon.esTypeofAbuse,
      esPriorRedressal: saveon.esPriorRedressal,
      esPerpetrator: saveon.esPerpetrator,
      esServiceOffered: saveon.esServiceOffered,
      esAddObtain: saveon.esAddObtain,
      esStatusofCase: saveon.esStatusofCase,
      esAgency: saveon.esAgency,
      esNameofPerson: saveon.esNameofPerson,
      esRemarks: saveon.esRemarks,
      esPerpetratorName: saveon.esPerpetratorName,
      esPerpetratorAge: saveon.esPerpetratorAge,
      esPerpetratorGender: saveon.esPerpetratorGender,
      esPerpetratorMobile: saveon.esPerpetratorMobile,
      esPerpetratorOccup: saveon.esPerpetratorOccup,
      esPerpetratorAddition: saveon.esPerpetratorAddition,
      esOtherAggAgeGroup: saveon.esOtherAggAgeGroup,
      esCaseCat2: saveon.esCaseCat2,
      esSubCat2: saveon.esSubCat2,
      esTypeofAbuse2: saveon.esTypeofAbuse2,
      esDirectoryMain: saveon.esDirectoryMain,
      esDirectorySubMain: saveon.esDirectorySubMain,
      esDirectoryDistrict: saveon.esDirectoryDistrict,
      esDirectoryTown: saveon.esDirectoryTown,
      esDirectoryContName: saveon.esDirectoryContName,
      esDirectoryContNumber: saveon.esDirectoryContNumber,
      esDirectoryAddress: saveon.esDirectoryAddress,
      esDirectoryPincode: saveon.esDirectoryPincode,
      esDirectoryMailId: saveon.esDirectoryMailId,
      esDirectorySMSNumber: saveon.esDirectorySMSNumber,
      esDirectoryWAnumber: saveon.esDirectoryWAnumber,

      esFollowSession: saveon.esFollowSession,
      esFollowDate: startofDate.toString(),
    }
    SmsDispositionApi.saveSmsEmergency(data)
      .subscribe(response => {
        setSave({
          esInformationSought: response.data.esInformationSought,
          esRiskAsses: response.data.esRiskAsses,
          esAggrieved: response.data.esAggrieved,
          esOtherAggName: response.data.esOtherAggName,
          esOtherAggMobile: response.data.esOtherAggMobile,
          esOtherAggAge: response.data.esOtherAggAge,
          esOtherAggGender: response.data.esOtherAggGender,
          esOtherAggAddress: response.data.esOtherAggAddress,
          esAge: response.data.esAge,
          esAgeGroup: response.data.esAgeGroup,
          esEducation: response.data.esEducation,
          esOccupation: response.data.esOccupation,
          esGender: response.data.esGender,
          esPersonalIdent: response.data.esPersonalIdent,
          esMaritalStatus: response.data.esMaritalStatus,
          esLivingStatus: response.data.esLivingStatus,
          esFamilyStatus: response.data.esFamilyStatus,
          esHouseno: response.data.esHouseno,
          esStreet: response.data.esStreet,
          esBlock: response.data.esBlock,
          esVillage: response.data.esVillage,
          esState: response.data.esState,
          esDistrict: response.data.esDistrict,
          esPincode: response.data.esPincode,
          esPlaceofInc: response.data.esPlaceofInc,
          esFrequency: response.data.esFrequency,
          esStatusofInc: response.data.esStatusofInc,
          esCaseCat1: response.data.esCaseCat1,
          esSubCat: response.data.esSubCat,
          esTypeofAbuse: response.data.esTypeofAbuse,
          esPriorRedressal: response.data.esPriorRedressal,
          esPerpetrator: response.data.esPerpetrator,
          esServiceOffered: response.data.esServiceOffered,
          esAddObtain: response.data.esAddObtain,
          esStatusofCase: response.data.esStatusofCase,
          esAgency: response.data.esAgency,
          esNameofPerson: response.data.esNameofPerson,
          esRemarks: response.data.esRemarks,
          esPerpetratorName: response.data.esPerpetratorName,
          esPerpetratorAge: response.data.esPerpetratorAge,
          esPerpetratorGender: response.data.esPerpetratorGender,
          esPerpetratorMobile: response.data.esPerpetratorMobile,
          esPerpetratorOccup: response.data.esPerpetratorOccup,
          esPerpetratorAddition: response.data.esPerpetratorAddition,

          esOtherAggAgeGroup: response.data.esOtherAggAgeGroup,
          esCaseCat2: response.data.esCaseCat2,
          esSubCat2: response.data.esSubCat2,
          esTypeofAbuse2: response.data.esTypeofAbuse2,
          esDirectoryMain: response.data.esDirectoryMain,
          esDirectorySubMain: response.data.esDirectorySubMain,
          esDirectoryDistrict: response.data.esDirectoryDistrict,
          esDirectoryTown: response.data.esDirectoryTown,
          esDirectoryContName: response.data.esDirectoryContName,
          esDirectoryContNumber: response.data.esDirectoryContNumber,
          esDirectoryAddress: response.data.esDirectoryAddress,
          esDirectoryPincode: response.data.esDirectoryPincode,
          esDirectoryMailId: response.data.esDirectoryMailId,
          esDirectorySMSNumber: response.data.esDirectorySMSNumber,
          esDirectoryWAnumber: response.data.esDirectoryWAnumber,

          esFollowSession: response.data.esFollowSession,
          esFollowDate: response.data.esFollowDate,

        });
      })
  }
  // save Disposition;

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
    saveon.esInformationSought = value.toString();
    setInfoSought({
      infoso: value
    })
  }

  const [riskAsses, setRiskAssign] = useState({ risk: 'no' });
  function onChangeRiskAssign(value) {
    saveon.esRiskAsses = value;
    setRiskAssign({
      risk: value
    })
  }

  const [other, setOthers] = useState({ aggr: 'no' });
  function onChangeAggr(value) {
    saveon.esAggrieved = value;
    setOthers({
      aggr: value
    })
  }

  const [otherAggrother, setOtherAggr] = useState({ aggother: 'no' });
  function onChangeAggrOther(value) {
    saveon.esAggrieved = value;
    setOtherAggr({
      aggother: value
    })
  }

  function onChangeOtherAggAge(value) {
    saveon.esOtherAggAgeGroup = value;
  }

  function onChangeOtherAggGender(value) {
    saveon.esOtherAggGender = value;
  }

  function onChangeAgeGroup(value) {
    saveon.esAgeGroup = value;
  }


  const [otherEducation, setOthersEdu] = useState({ educ: 'no' });
  function onChangeEducation(value) {
    saveon.esEducation = value;
    setOthersEdu({
      educ: value
    })
  }

  const [otherOcc, setOtherOcc] = useState({ occ: 'no' });
  function onChangeOccupation(value) {
    saveon.esOccupation = value.toString();
    setOtherOcc({
      occ: value
    })
  }

  function onChangeGender(value) {
    saveon.esGender = value;
  }

  function onChangeMarital(value) {
    saveon.esMaritalStatus = value;
  }

  function onChangeLivingStatus(value) {
    saveon.esLivingStatus = value;
  }

  function onChangeFamilyStatus(value) {
    saveon.esFamilyStatus = value;
  }

  const [incidentPlace, setIncPlace] = useState({ incPlace: 'no' });
  function onChangeIncPlace(value) {
    saveon.esPlaceofInc = value;
    setIncPlace({
      incPlace: value
    })
  }


  function onChangeFrequency(value) {
    saveon.esFrequency = value;
  }

  function onChangeStatusOfInc(value) {
    saveon.esStatusofInc = value;
  }

  const [caseCat, setCaseOtherCat] = useState({ cat: 'no' });
  function onChangeGenCat(value) {
    saveon.esCaseCat1 = value;
    setCaseOtherCat({
      cat: value
    })

  }



  const [subcaseCat, setSubCaseCat] = useState({ subcat1: 'no' });
  function onChangeSubCategory(value) {
    saveon.esSubCat = value.toString();
    setSubCaseCat({
      subcat1: value
    })
  }



  //saveon.esSubCat = localStorage.getItem("subcatval");
  const [subcaseCat2, setSubCaseCat2] = useState({ subcat2: 'no' });
  function onChangeSubCat2(value) {
    saveon.esSubCat2 = value.toString();
    setSubCaseCat2({
      subcat2: value
    })
  }



  const [caseCat2, setCaseOtherCat2] = useState({ cat2: 'no' });
  function onChangeGenCat2(value) {
    saveon.esCaseCat2 = value.toString();
    setCaseOtherCat2({
      cat2: value
    })
  }

  const [typeofAbuse, setTypeofAbuse] = useState({ abuse: 'no' });
  function onChangeAbuseType(value) {
    saveon.esTypeofAbuse = value.toString();
    setTypeofAbuse({
      abuse: value
    })
  }

  const [typeofAbuse2, setTypeofAbuse2] = useState({ abuse2: 'no' });
  function onChangeAbuseType2(value) {
    saveon.esTypeofAbuse2 = value.toString();
    setTypeofAbuse2({
      abuse2: value
    })
  }

  const [priorRed, setPriorRed] = useState({ redressal: 'no' });
  function onChangePriorRed(value) {
    saveon.esPriorRedressal = value;
    setPriorRed({
      redressal: value
    })
  }

  function onChangePerpAge(value) {
    saveon.esPerpetratorAge = value;
  }

  function onChangePerpGender(value) {
    saveon.esPerpetratorGender = value;
  }

  function onChangePerpOccupation(value) {
    saveon.esPerpetratorOccup = value.toString();
  }

  const [PerpotherOcc, setPerpOtherOcc] = useState({ Perpocc: 'no' });
  function onChangePerpOccupation(value) {
    // saveon.esOccupation= value;
    setPerpOtherOcc({
      Perpocc: value
    })
  }

  const [PerpotherAddi, setPerpOtherAddi] = useState({ Perpaddi: 'no' });
  function onChangePerpAddiction(value) {
    saveon.esPerpetratorAddition = value.toString();
    setPerpOtherAddi({
      Perpaddi: value
    })
  }

  const [serviceOff, setServiceOff] = useState({ serOff: 'no' });
  function onChangeServiceOff(value) {
    saveon.esServiceOffered = value.toString();
    setServiceOff({
      serOff: value
    })
  }

  function onChangeAddObtain(value) {
    saveon.esAddObtain = value;
  }

  const [satusofCase, setStatusofCase] = useState({ caseStatus: 'no' });
  function onChangeStatusofCase(value) {
    saveon.esStatusofCase = value;
    setStatusofCase({
      caseStatus: value
    })
  }

  const [perpetrator, setPerpetrator] = useState({ perpr: 'no' });
  function onChangePerperaor(value) {
    saveon.esPerpetrator = value;
    setPerpetrator({
      perpr: value
    })
  }


  const [districtval, setDistrictVal] = useState({ distval: 'no' });
  function onChangeDistrict(value) {
    saveon.esDistrict = value;
    setDistrictVal({
      distval: value
    })

  }

  const [talukpinval, setTalukVal] = useState({ talukval: 'no' });
  function onChangeTaluk(value) {
    saveon.esBlock = value;
    setTalukVal({
      talukval: value
    })

  }

  const [townvalpin, setTownValue] = useState({ valtownpin: '' })
  function onChangeTownPincode(value) {
    saveon.esVillage = value
    setTownValue({
      valtownpin: value
    })
  }


  function onChangePincodeval(value) {
    saveon.esPincode = value;

  }

  const [otherState, setOtherState] = useState({ othstate: '' })
  function onChangeState(value) {
    saveon.esState = value;
    setOtherState({
      othstate: value
    })
  }


  function onChangeFollowUpSession(value) {
    saveon.esFollowSession = value;

  }




  const [agetextval, setAgeTextVal] = useState('');
  saveon.esAge = agetextval;

  var flage = '100';
  if (agetextval == 0) {
    flage = "0";
    saveon.esAgeGroup = "Not Mentioned"
  }
  else if (agetextval >= 1 && agetextval <= 6) {
    flage = "1-6";
    saveon.esAgeGroup = "1-6 Years"
  }
  else if (agetextval >= 7 && agetextval <= 12) {
    flage = "7-12";
    saveon.esAgeGroup = "7-12 Years"

  }
  else if (agetextval >= 13 && agetextval <= 17) {
    flage = "13-17";
    saveon.esAgeGroup = "13-17 Years"

  }
  else if (agetextval >= 18 && agetextval <= 25) {
    flage = "18-25";
    saveon.esAgeGroup = "18-25 Years"

  }
  else if (agetextval >= 26 && agetextval <= 35) {
    flage = "26-35";
    saveon.esAgeGroup = "26-35 Years"

  }
  else if (agetextval >= 36 && agetextval <= 46) {
    flage = "36-46";
    saveon.esAgeGroup = "36-46 Years"

  }
  else if (agetextval >= 47 && agetextval <= 59) {
    flage = "47-59";
    saveon.esAgeGroup = "47-59 Years"

  }
  else if (agetextval >= 60 && agetextval <= 70) {
    flage = "60-70";
    saveon.esAgeGroup = "60-70 Years"

  }
  else if (agetextval >= 71 && agetextval <= 80) {
    flage = "71-80";
    saveon.esAgeGroup = "71-80 Years"

  }
  else if (agetextval >= 81 && agetextval <= 90) {
    flage = "81-90";
    saveon.esAgeGroup = "81-90 Years"

  }
  else {
    flage = "0"
    saveon.esAgeGroup = "Not Mentioned"
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
    saveon.esDirectoryMain = value;
    setMaincatval({
      val: value,
    })
  }


  const [subcatvalue, setSubcatVal] = useState([]);
  useEffect(() => {
    var data2 = {
      maincategory: maincatval.val
    }

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
    saveon.esDirectorySubMain = value;
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
    saveon.esDirectoryDistrict = value;
    setDistval({
      dist: value,
    })
  }


  const [townvalue, setTown] = useState([]);
  useEffect(() => {
    var data4 = {
      maincategory: maincatval.val,
      subCategory: subfinalval.valsub,
      district: distval.dist
    }

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
    saveon.esDirectoryTown = value;
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
  saveon.esDirectoryWAnumber = contactvalue.whatsupNumber;
  saveon.esDirectoryAddress = contactvalue.address;
  saveon.esDirectoryContName = contactvalue.contactName;
  saveon.esDirectoryContNumber = contactvalue.contactNumber;
  saveon.esDirectoryMailId = contactvalue.emailId;
  saveon.esDirectorySMSNumber = contactvalue.smsNumber;
  saveon.esDirectoryPincode = contactvalue.dirPincode;

  function handleContactDetail(evt) {
    const value = evt.target.value;
    setContactValue({
      ...contactvalue,
      [evt.target.name]: value
    });

    saveon.esDirectoryWAnumber = contactvalue.whatsupNumber;
    saveon.esDirectoryAddress = contactvalue.address;
    saveon.esDirectoryContName = contactvalue.contactName;
    saveon.esDirectoryContNumber = contactvalue.contactNumber;
    saveon.esDirectoryMailId = contactvalue.emailId;
    saveon.esDirectorySMSNumber = contactvalue.smsNumber;
    saveon.esDirectoryPincode = contactvalue.dirPincode;

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
              multiple
              treeDefaultExpandAll
              onChange={onChangeInfoSought}
            >
              <TreeNode title="Call Needs" key="354">
                <TreeNode value="Rescue" title="Rescue" key="355" />
                <TreeNode value="Provide safety /security " title="Provide safety /security " key="356" />
                <TreeNode value="Police Assistance" title="Police Assistance" key="357" />
                <TreeNode value="Medical Assistance" title="Medical Assistance" key="358" />
                <TreeNode value="Shelter" title="Shelter" key="359" />
                <TreeNode value="Not Disclosed" title="Not Disclosed" key="360" />
                <TreeNode value="Any other" title="Any other" key="361" />

              </TreeNode>
              <TreeNode></TreeNode>

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
                    <Input id="esInformationSought" name="esInformationSought" type="text" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }
              <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              {other.aggr == "Self" || other.aggr == "Others"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Name</h2>
                  <FormItem>
                    <Input id="esAggrieved" name="esAggrieved" placeholder="Name" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
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
                      {/* <TreeNode value=" On behalf of the aggrieved" title=" " key="1000">
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
                          <Input id="esOtherAggName" name="esOtherAggName" placeholder="Name" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                        </FormItem>
                      </Col>
                      <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                        <h2 className="gx-text-white" >Mobile</h2>
                        <FormItem >
                          <Input id="esOtherAggMobile" name="esOtherAggMobile" type="number" placeholder="Mobile" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                        </FormItem>
                      </Col>
                      <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                        <h2 className="gx-text-white" >Age</h2>
                        <FormItem >
                          <Input id="esOtherAggAge" name="esOtherAggAge" type="number" placeholder="Age"
                            value={handleChangeSakhi.value} onChange={handleChangeSakhi}
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
                          <Input id="esOtherAggAddress" name="esOtherAggAddress" placeholder="Address" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
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
              ? <Input id="esAgeGroup" name="esAgeGroup" placeholder="Age Group" value="" onChange={handleChangeSakhi} />

              : flage == "1-6"
                ? <Input id="esAgeGroup" name="esAgeGroup" placeholder="0-6 Years" value="0-6 Years" onChange={handleChangeSakhi} />

                : flage == "7-12"
                  ? <Input id="esAgeGroup" name="esAgeGroup" placeholder="7-12 Years" value="7-12 Years" onChange={handleChangeSakhi} />

                  : flage == "13-17"
                    ? <Input id="esAgeGroup" name="esAgeGroup" placeholder="13-17 Years" value="13-17 Years" onChange={handleChangeSakhi} />

                    : flage == "18-25"
                      ? <Input id="esAgeGroup" name="esAgeGroup" placeholder="18-25 Years" value="18-25 Years" onChange={handleChangeSakhi} />

                      : flage == "26-35"
                        ? <Input id="esAgeGroup" name="esAgeGroup" placeholder="26-35 Years" value="26-35 Years" onChange={handleChangeSakhi} />

                        : flage == "36-46"
                          ? <Input id="esAgeGroup" name="esAgeGroup" placeholder="36-46 Years" value="36-46 Years" onChange={handleChangeSakhi} />

                          : flage == "47-59"
                            ? <Input id="esAgeGroup" name="esAgeGroup" placeholder="47-59 Years" value="47-59 Years" onChange={handleChangeSakhi} />

                            : flage == "60-70"
                              ? <Input id="esAgeGroup" name="esAgeGroup" placeholder="60-70 Years" value="60-70 Years" onChange={handleChangeSakhi} />

                              : flage == "71-80"
                                ? <Input id="esAgeGroup" name="esAgeGroup" placeholder="71-80 Years" value="71-80 Years" onChange={handleChangeSakhi} />

                                : flage == "81-90"
                                  ? <Input id="esAgeGroup" name="esAgeGroup" placeholder="81-90 Years" value="81-90 Years" onChange={handleChangeSakhi} />


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
                    <Input id="esEducation" name="esEducation" type="text" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }
              {otherOcc.occ == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Occupation</h2>
                  <FormItem>
                    <Input id="esOccupation" name="esOccupation" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
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
            <Input id="esPersonalIdent" name="esPersonalIdent" type="text" placeholder="Personal Identy" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
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
                  <Input id="esHouseno" name="esHouseno" placeholder="House No" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                </FormItem>
              </Col>
              <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                <h3 className="gx-text-white" >Street</h3>
                <FormItem>
                  <Input id="esStreet" name="esStreet" placeholder="Street" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                </FormItem>
              </Col>

              <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >State</h2>
                <FormItem >
                  {/* <Input id="esState" name="esState" placeholder="State" value={handleChangeSakhi.value} onChange={handleChangeSakhi} /> */}
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
                    <Input id="esState" name="esState" placeholder="Mention"
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
                    <Input id="esDistrict" name="esDistrict" placeholder="Mention"
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
                    <Input id="esPlaceofInc" name="esPlaceofInc" type="text" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
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
                    <Input id="esPriorRedressal" name="esPriorRedressal" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
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
            value={onChangeSubCategory.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            multiple
            treeDefaultExpandAll
            onChange={onChangeSubCategory}
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
                    <Input id="esCaseCat1" name="esCaseCat1" type="text" placeholder="Mention"
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


              {/* <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col> */}
              {typeofAbuse.abuse == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Abuse 1</h2>
                  <FormItem>
                    <Input id="esTypeofAbuse" name="esTypeofAbuse" placeholder="Mention"
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
                    <Input id="esPlaceofInc" name="esPlaceofInc" type="text" placeholder="Mention"
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

              <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              {typeofAbuse2.abuse2 == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Abuse 2</h2>
                  <FormItem>
                    <Input id="esPriorRedressal" name="esPriorRedressal" placeholder="Mention"
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
                    <Input id="esPerpetrator" name="esPerpetrator" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }
              {serviceOff.serOff == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Services</h2>
                  <FormItem>
                    <Input id="esServiceOffered" name="esServiceOffered" type="text" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                : <Col xl={6} lg={12} md={12} sm={12} xs={24}> </Col>
              }
              {satusofCase.caseStatus == "Any other"
                ? <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                  <h2 className="gx-text-red" >Other Status</h2>
                  <FormItem>
                    <Input id="esStatusofCase" name="esStatusofCase" placeholder="Mention" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
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
                    <Input id="esPerpetratorName" name="esPerpetratorName" placeholder="Name" value={handleChangeSakhi.value} onChange={handleChangeSakhi} />
                  </FormItem>
                </Col>
                <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                  <h3 className="gx-text-white" >Age</h3>
                  <FormItem>
                    <Input id="esPerpetratorAge" name="esPerpetratorAge" type="number" pattern="[0-9]*" placeholder="Age"
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
                    <Input id="esPerpetratorMobile" name="esPerpetratorMobile" placeholder="Mobile" pattern="[0-9]*"
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
                            <Input id="esPerpetratorOccup" name="esPerpetratorOccup" placeholder="Mention"
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
                            <Input id="esPerpetratorAddition" name="esPerpetratorAddition" type="text" placeholder="Mention"
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


        {/* ActionTaken */}
        {/* <Col xl={10} lg={12} md={12} sm={12} xs={24}>
      <h2 className="gx-text-black" >Action Taken </h2>
    <Widget styleName={`ant-col gx-bg-geekblue `}>
       
         <Row> 
            <FormItem >
            <h2 className="gx-text-white" >Agency</h2>
              <Input id="esAgency" name="esAgency" placeholder="Agency" value={handleChangeSakhi.value} onChange={handleChangeSakhi}/>
           </FormItem>
           <FormItem  >
           <h2 className="gx-text-white" >Name of the Person</h2>
              <Input id="esNameofPerson" name="esNameofPerson" placeholder="Name of the Person" value={handleChangeSakhi.value} onChange={handleChangeSakhi}/>
           </FormItem>
           <FormItem  >
           <h2 className="gx-text-white" >Contact Number</h2>
              <Input id="esNameofPerson" name="esNameofPerson" type="number" placeholder="Contact Number" 
              // value={handleChangeSakhi.value} onChange={handleChangeSakhi}
              />
           </FormItem>
        </Row>

     </Widget>
</Col> */}


        {/* Remarks */}
        <Col xl={10} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-black" >Remarks</h2>
          <FormItem>
            <TextArea rows={4}
              id="esRemarks" name="esRemarks" placeholder="Remarks"
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
              Save Emergency
            </Button>

          </FormItem>
        </Col>

      </Form>
    </Auxiliary>
  );

}

export default SmsEmergencyScreen;
