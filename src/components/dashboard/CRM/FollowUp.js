import React from "react";
import { Col, Row, Card, Checkbox, TreeSelect, DatePicker, TimePicker } from 'antd';
import { Button, Form, Input, InputNumber, Table } from "antd";
import { useState, useEffect, useContext } from 'react'
import DispositionApi from "components/dashboard/CRM/DispositionApi";
import DispoSakhi from "components/dashboard/CRM/DispoSakhi";
import 'react-dropdown-tree-select/dist/styles.css'
import Select from 'react-select'
import moment from "moment";
import { UserContext } from "./UserContext";
import Widget from "components/Widget/index";
import Auxiliary from "util/Auxiliary";
import { DispoContext } from "./DispoContext";
import InputRange from 'react-input-range';
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import FollowUpHeader from "../../../containers/Topbar/InsideHeader/FollowUpHeader";
import FollowUpApi from "./FollowUpApi";
import AgentWelComeCard from "./AgentWelComeCard";
import Dial from "components/dashboard/CRM/Dial";
import CallPopUpCard from "components/dashboard/CRM/CallPopUpCard";
import CallInformationCard from "components/dashboard/CRM/CallInformationCard";


const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const FollowUp = (props) => {


  //datepicker 
  const dateFormat = 'YYYY/MM/DD HH:mm:ss';
  const [startofDate, setStartOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  // var dateofstart = startofDate.toISOString().substr(0,19);


  const [endofDate, setEndOfDate] = useState(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  // var dateofend = endofDate.toISOString().substr(0,19);

  //datepicker

  const [saveon, setSave] = useState({ caseRemark: '' });


  function handleChangeSakhi(evt) {
    const value = evt.target.value;
    setSave({
      ...saveon,
      [evt.target.name]: value
    });
  }


  // CallInfo Details
  const [info, setinfo] = useState({
    id: '', phoneNo: '', extension: '', callStatus: '', popupStatus: '', callWrapupTime: '', callStartTime: '', trunkChannel: '', sipChannel: '',
    secondChannel: '', callDirection: '', secondNumber: '', disposition: '', comments: '', callbackDate: '', queueJoinTime: '', extensionStatus: '',
  });

  const [queuecount, setQueueCount] = useState({ count: '' });

  useEffect(() => {
    const interval = setInterval(callinfo, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  //import Axios from  'axios-observable';
  const callinfo = () => {
    //Callinfo details
    var data = {
      extension: localStorage.getItem("extn"),
    }
    Dial.callinfo(data)
      .subscribe(response => {
        setinfo({
          id: response.data.result.id,
          phoneNo: response.data.result.phoneNo,
          extension: response.data.result.extension,
          popupStatus: response.data.result.popupStatus,
          trunkChannel: response.data.result.trunkChannel,
          channel: response.data.result.sipChannel,
          sipChannel: response.data.result.sipChannel,
          secondChannel: response.data.result.secondChannel,
          callDirection: response.data.result.callDirection,
          secondNumber: response.data.result.secondNumber,
          disposition: response.data.result.disposition,
          comments: response.data.result.comments,
          callbackDate: response.data.result.callbackDate,
          callStatus: response.data.result.popupStatus,
          extensionStatus: response.data.result.extensionStatus,
          callWrapupTime: response.data.result.callWrapupTime,
          callStartTime: response.data.result.callStartTime,

        });

      })
    //Callinfo details

    //Queue count Details  
    var countdata = {
      extension: "1111",
    }
    Dial.queueCount(countdata)
      .subscribe(response => {
        setQueueCount({
          count: response.data.count,
        });
      })
    //Queue count Details  

  }
  const [caseIdval, setCaseIdVal] = useState({ caseidupdate: '' })
  function onChangeCaseID(value) {
    setCaseIdVal({
      caseidupdate: value
    })

  }

  const [statusofCaseval, setStatusofCaseVal] = useState({ caseStatus: '' })
  function onChangeStatusofCaseVal(value) {
    setStatusofCaseVal({
      caseStatus: value
    })

  }


  const [followUpVal, setFollowUpVal] = useState({ valfollow: '' })
  function onChangeFollowUp(value) {
    setFollowUpVal({
      valfollow: value
    })

  }



  function SaveOnCallClose() {
    var data = {
      callId: info.id,
    }


    DispositionApi.saveAllDispo(data)
      .subscribe(response => {
        setSave({
          callId: response.data.callId,

        });

      })
  }


  function SaveOnSakhi() {
    var data = {
      callId: info.id,
      statusofCase: statusofCaseval.caseStatus,
      caseId: caseIdval.caseidupdate,
      remarks: saveon.caseRemark

    }


    FollowUpApi.updatefollowup(data)
      .subscribe(response => {
        setSave({
          callId: response.data.callId,

        });

      })
  }


  // CallInfo Details

  var flage = "";

  if (info.disposition == "Ongoing") {
    flage = 0;
  } else {
    flage = 1;
  }
  const msg = useContext(UserContext);


  const { MonthPicker, RangePicker } = DatePicker;

  function onOk(value) {

  }



  const { TextArea } = Input;
  const TreeNode = TreeSelect.TreeNode;


  // Save validation
  const onFinishFailed = errorInfo => {
    SaveOnSakhi()
    SaveOnCallClose()

  };
  const onFinish = values => {
    SaveOnSakhi()
    SaveOnCallClose()

  };
  // Save validation

  const namedispo = useContext(DispoContext)

  let [historyList, setHistoryList] = useState();
  const datax = [];
  const rowData4 = [];

  function searchFollowUp() {
    var data = {
      shiftTiming: followUpVal.valfollow,
      followupDate: startofDate.toString()
      //extension: localStorage.getItem("extn")
    }

    FollowUpApi.searchfollowup(data)
      .subscribe(res => {
        for (let i = 0; i <= Object.keys(res.data.caseids).length - 1; i++) {

          datax.push({
            key: i,
            caseId: res.data.caseids[i].caseId,
            extension: res.data.caseids[i].extension,
            agentName: res.data.caseids[i].agentName,
            phoneNo: res.data.caseids[i].phoneNo,
            callStatus: res.data.caseids[i].callStatus,
            callStartTime: res.data.caseids[i].callStartTime,
            callStartTimeOnly: res.data.caseids[i].callStartTimeOnly,
            callEndTime: res.data.caseids[i].callEndTime,
            callEndTimeOnly: res.data.caseids[i].callEndTimeOnly,
            duration: res.data.caseids[i].duration,
            secondNumber: res.data.caseids[i].secondNumber,
            callType: res.data.caseids[i].callType,
            incidentdate: res.data.caseids[i].incidentdate,
            incidentTime: res.data.caseids[i].incidentTime,

            extension: res.data.caseids[i].extension,
            phoneNo: res.data.caseids[i].phoneNo,
            callType: res.data.caseids[i].callType,
            incidentdate: res.data.caseids[i].incidentdate,
            incidentTime: res.data.caseids[i].incidentTime,

            isName: res.data.caseids[i].isName,
            isAge: res.data.caseids[i].isAge,
            isAgeGroup: res.data.caseids[i].isAgeGroup,
            isEducation: res.data.caseids[i].isEducation,
            isGender: res.data.caseids[i].isGender,
            isHouseno: res.data.caseids[i].isHouseno,
            isStreet: res.data.caseids[i].isStreet,
            isBlock: res.data.caseids[i].isBlock,
            isVillage: res.data.caseids[i].isVillage,
            isState: res.data.caseids[i].isState,
            isDistrict: res.data.caseids[i].isDistrict,
            isPincode: res.data.caseids[i].isPincode,
            isInformationSought: res.data.caseids[i].isInformationSought,
            isServiceoffered: res.data.caseids[i].isServiceoffered,
            //isAddObtainInfo: res.data.caseids[i].isAddObtainInfo,
            isAgency: res.data.caseids[i].isAgency,
            isNameofPerson: res.data.caseids[i].isNameofPerson,
            isContactNum: res.data.caseids[i].isContactNum,
            isRemarks: res.data.caseids[i].isRemarks,
            esIinformationSought: res.data.caseids[i].esIinformationSought,
            esRiskAsses: res.data.caseids[i].esRiskAsses,
            esAggrieved: res.data.caseids[i].esAggrieved,
            esOtherAggName: res.data.caseids[i].esOtherAggName,
            esOtherAggMobile: res.data.caseids[i].esOtherAggMobile,
            esOtherAggGender: res.data.caseids[i].esOtherAggGender,
            esOtherAggAge: res.data.caseids[i].esOtherAggAge,
            esOtherAggAddress: res.data.caseids[i].esOtherAggAddress,
            esAge: res.data.caseids[i].esAge,
            esAgeGroup: res.data.caseids[i].esAgeGroup,
            esEducation: res.data.caseids[i].esEducation,
            esOccupation: res.data.caseids[i].esOccupation,
            esGender: res.data.caseids[i].esGender,
            esPersonalIdent: res.data.caseids[i].esPersonalIdent,
            esMaritalStatus: res.data.caseids[i].esMaritalStatus,
            esLivingStatus: res.data.caseids[i].esLivingStatus,
            esFamilyStatus: res.data.caseids[i].esFamilyStatus,
            esHouseno: res.data.caseids[i].esHouseno,
            esStreet: res.data.caseids[i].esStreet,
            esBlock: res.data.caseids[i].esBlock,
            esVillage: res.data.caseids[i].esVillage,
            esState: res.data.caseids[i].esState,
            esDistrict: res.data.caseids[i].esDistrict,
            esPincode: res.data.caseids[i].esPincode,
            esPlaceofInc: res.data.caseids[i].esPlaceofInc,
            esFrequency: res.data.caseids[i].esFrequency,
            esStatusofInc: res.data.caseids[i].esStatusofInc,
            esCaseCat1: res.data.caseids[i].esCaseCat1,
            esSubCat: res.data.caseids[i].esSubCat,
            esTypeofAbuse: res.data.caseids[i].esTypeofAbuse,
            esPriorRedressal: res.data.caseids[i].esPriorRedressal,
            esPerpetrator: res.data.caseids[i].esPerpetrator,
            esServiceOffered: res.data.caseids[i].esServiceOffered,
            // esAddObtain: res.data.caseids[i].esAddObtain,
            esStatusofCase: res.data.caseids[i].esStatusofCase,
            esAgency: res.data.caseids[i].esAgency,
            esNameofPerson: res.data.caseids[i].esNameofPerson,
            esRemarks: res.data.caseids[i].esRemarks,
            esPerpetratorName: res.data.caseids[i].esPerpetratorName,
            esPerpetratorAge: res.data.caseids[i].esPerpetratorAge,
            esPerpetratorGender: res.data.caseids[i].esPerpetratorGender,
            esPerpetratorMobile: res.data.caseids[i].esPerpetratorMobile,
            esPerpetratorOccup: res.data.caseids[i].esPerpetratorOccup,
            esPerpetratorAddition: res.data.caseids[i].esPerpetratorAddition,
            gsIinformationSought: res.data.caseids[i].gsIinformationSought,
            gsRiskAsses: res.data.caseids[i].gsRiskAsses,
            gsAggrieved: res.data.caseids[i].gsAggrieved,
            gsOtherAggName: res.data.caseids[i].gsOtherAggName,
            gsOtherAggMobile: res.data.caseids[i].gsOtherAggMobile,
            gsOtherAggGender: res.data.caseids[i].gsOtherAggGender,
            gsOtherAggAge: res.data.caseids[i].gsOtherAggAge,
            gsOtherAggAddress: res.data.caseids[i].gsOtherAggAddress,
            gsAge: res.data.caseids[i].gsAge,
            gsAgeGroup: res.data.caseids[i].gsAgeGroup,
            gsEducation: res.data.caseids[i].gsEducation,
            gsOccupation: res.data.caseids[i].gsOccupation,
            gsGender: res.data.caseids[i].gsGender,
            gsPersonalIdent: res.data.caseids[i].gsPersonalIdent,
            gsMaritalStatus: res.data.caseids[i].gsMaritalStatus,
            gsLivingStatus: res.data.caseids[i].gsLivingStatus,
            gsFamilyStatus: res.data.caseids[i].gsFamilyStatus,
            gsHouseno: res.data.caseids[i].gsHouseno,
            gsStreet: res.data.caseids[i].gsStreet,
            gsBlock: res.data.caseids[i].gsBlock,
            gsVillage: res.data.caseids[i].gsVillage,
            gsState: res.data.caseids[i].gsState,
            gsDistrict: res.data.caseids[i].gsDistrict,
            gsPincode: res.data.caseids[i].gsPincode,
            gsPlaceofInc: res.data.caseids[i].gsPlaceofInc,
            gsFrequency: res.data.caseids[i].gsFrequency,
            gsStatusofInc: res.data.caseids[i].gsStatusofInc,
            gsCaseCat1: res.data.caseids[i].gsCaseCat1,
            gsSubCat: res.data.caseids[i].gsSubCat,
            gsTypeofAbuse: res.data.caseids[i].gsTypeofAbuse,
            gsPriorRedressal: res.data.caseids[i].gsPriorRedressal,
            gsPerpetrator: res.data.caseids[i].gsPerpetrator,
            gsServiceOffered: res.data.caseids[i].gsServiceOffered,
            gsStatusofCase: res.data.caseids[i].gsStatusofCase,
            gsAgency: res.data.caseids[i].gsAgency,
            gsNameofPerson: res.data.caseids[i].gsNameofPerson,
            gsRemarks: res.data.caseids[i].gsRemarks,
            gsPerpetratorName: res.data.caseids[i].gsPerpetratorName,
            gsPerpetratorAge: res.data.caseids[i].gsPerpetratorAge,
            gsPerpetratorGender: res.data.caseids[i].gsPerpetratorGender,
            gsPerpetratorMobile: res.data.caseids[i].gsPerpetratorMobile,
            gsPerpetratorOccup: res.data.caseids[i].gsPerpetratorOccup,
            gsPerpetratorAddition: res.data.caseids[i].gsPerpetratorAddition,
            //recPath: res.data.reports[i].recPath,
          });

        }

        setHistoryList(datax);
      })
  }



  const columns = [{
    title: 'Case Id',
    dataIndex: 'caseId',
    key: 'caseid',
    width: 160,
    fixed: 'left',
  },
  {
    title: 'Extension',
    dataIndex: 'extension',
    key: 'name',
    width: 100,

  }, {
    title: 'Agent Name',
    dataIndex: 'agentName',
    key: 'name',
    width: 100,

  }, {
    title: 'Phone Number',
    dataIndex: 'phoneNo',
    key: 'name',
    width: 150,
  }, {
    title: 'Call Status',
    dataIndex: 'callStatus',
    key: 'name',
    width: 150,
  }, {
    title: 'Call Start Date',
    dataIndex: 'callStartTime',
    key: 'name',
    width: 100,

  }, {
    title: 'Call Start Time',
    dataIndex: 'callStartTimeOnly',
    key: 'name',
    width: 100,

  }, {
    title: 'Call End Date',
    dataIndex: 'callEndTime',
    key: 'name',
    width: 100,

  }, {
    title: 'Call End Time',
    dataIndex: 'callEndTimeOnly',
    key: 'name',
    width: 100,

  }, {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'name',
    width: 100,

  }, {
    title: 'Second Number',
    dataIndex: 'secondNumber',
    key: 'name',
    width: 100,

  }, {
    title: 'Call Type',
    dataIndex: 'callType',
    key: 'name',
    width: 150,
  }, {
    title: 'Call Date',
    dataIndex: 'incidentdate',
    key: 'name',
    width: 100,
  }, {
    title: 'Call Time',
    dataIndex: 'incidentTime',
    key: 'name',
    width: 100,
  },


  {
    title: 'Type Of Call',
    children: [{
      title: 'Extension',
      dataIndex: 'extension',
      key: 'name',
      width: 100,

    }, {
      title: 'Phone Number',
      dataIndex: 'phoneNo',
      key: 'name',
      width: 150,
    }, {
      title: 'Call Type',
      dataIndex: 'callType',
      key: 'name',
      width: 100,
    }, {
      title: 'Incident Date',
      dataIndex: 'incidentdate',
      key: 'name',
      width: 100,
    }, {
      title: 'Incident Time',
      dataIndex: 'incidentTime',
      key: 'name',
      width: 100,
    }]
  },



  {
    title: 'Information Call',
    children: [
      {
        title: 'Name',
        dataIndex: 'isName',
        key: 'name',
        width: 100,
      }, {
        title: 'Age',
        children: [{
          title: 'Age',
          dataIndex: 'isAge',
          key: 'building',
          width: 100,
        }, {
          title: 'Age Group',
          dataIndex: 'isAgeGroup',
          key: 'number',
          width: 100,
        }],
      }, {
        title: 'Education',
        dataIndex: 'isEducation',
        key: 'name',
        width: 100,
      }, {
        title: 'Address',
        children: [{
          title: 'Houseno',
          dataIndex: 'isHouseno',
          key: 'building',
          width: 100,
        }, {
          title: 'Street',
          dataIndex: 'isStreet',
          key: 'number',
          width: 100,
        }, {
          title: 'Block',
          dataIndex: 'isBlock',
          key: 'number',
          width: 100,
        }, {
          title: 'Village',
          dataIndex: 'isVillage',
          key: 'number',
          width: 100,
        }, {
          title: 'State',
          dataIndex: 'isState',
          key: 'number',
          width: 100,
        }, {
          title: 'District',
          dataIndex: 'isDistrict',
          key: 'number',
          width: 100,
        }, {
          title: 'Pincode',
          dataIndex: 'isPincode',
          key: 'number',
          width: 100,
        }],
      }, {
        title: 'Information Sought',
        dataIndex: 'isInformationSought',
        key: 'name',
        width: 130,

      }, {
        title: 'Service offered',
        dataIndex: 'isServiceoffered',
        key: 'name',
        width: 100,
      }, {
        title: 'Agency',
        dataIndex: 'isAgency',
        key: 'name',
        width: 100,
      }, {
        title: 'Name of Person',
        dataIndex: 'isNameofPerson',
        key: 'name',
        width: 100,

      }, {
        title: 'Contact Number',
        dataIndex: 'isContactNum',
        key: 'name',
        width: 130,

      }, {
        title: 'Remarks',
        dataIndex: 'isRemarks',
        key: 'name',
        width: 100,

      }, {
        title: 'Gender',
        dataIndex: 'isGender',
        key: 'gender',
        width: 90,

      }
    ]
  },




  {
    title: 'Emergency Call',
    children: [
      {
        title: 'Information Sought',
        dataIndex: 'esIinformationSought',
        key: 'name',
        width: 160,

      }, {
        title: 'Risk Asses',
        dataIndex: 'esRiskAsses',
        key: 'name',
        width: 100,
      }, {
        title: 'Aggrieve Detail',
        children: [{
          title: 'Aggrieved',
          dataIndex: 'esAggrieved',
          key: 'building',
          width: 100,
        }, {
          title: 'Aggrieve Name',
          dataIndex: 'esOtherAggName',
          key: 'number',
          width: 100,

        }, {
          title: 'Aggrieve Mobile',
          dataIndex: 'esOtherAggMobile',
          key: 'number',
          width: 100,

        }, {
          title: 'Aggrieve Gender',
          dataIndex: 'esOtherAggGender',
          key: 'number',
          width: 100,

        }, {
          title: 'Aggrieve Age',
          dataIndex: 'esOtherAggAge',
          key: 'number',
          width: 100,

        }, {
          title: 'Aggrieve Address',
          dataIndex: 'esOtherAggAddress',
          key: 'number',
          width: 100,

        }],
      }, {
        title: 'Age',
        children: [{
          title: 'Age',
          dataIndex: 'esAge',
          key: 'building',
          width: 100,
        }, {
          title: 'Age Group',
          dataIndex: 'esAgeGroup',
          key: 'number',
          width: 100,

        }],
      }, {
        title: 'Education',
        dataIndex: 'esEducation',
        key: 'name',
        width: 100,
      }, {
        title: 'Occupation',
        dataIndex: 'esOccupation',
        key: 'name',
        width: 130,
      }, {
        title: 'Personal Identification',
        dataIndex: 'esPersonalIdent',
        key: 'name',
        width: 150,
      }, {
        title: 'Marital Status',
        dataIndex: 'esMaritalStatus',
        key: 'name',
        width: 100,
      }, {
        title: 'Living Status',
        dataIndex: 'esLivingStatus',
        key: 'name',
        width: 100,
      }, {
        title: 'Family Status',
        dataIndex: 'esFamilyStatus',
        key: 'name',
        width: 100,
      }, {
        title: 'Address',
        children: [{
          title: 'Houseno',
          dataIndex: 'esHouseno',
          key: 'building',
          width: 100,
        }, {
          title: 'Street',
          dataIndex: 'esStreet',
          key: 'number',
          width: 100,
        }, {
          title: 'Block',
          dataIndex: 'esBlock',
          key: 'number',
          width: 100,
        }, {
          title: 'Village',
          dataIndex: 'esVillage',
          key: 'number',
          width: 100,
        }, {
          title: 'State',
          dataIndex: 'esState',
          key: 'number',
          width: 100,
        }, {
          title: 'District',
          dataIndex: 'esDistrict',
          key: 'number',
          width: 100,
        }, {
          title: 'Pincode',
          dataIndex: 'esPincode',
          key: 'number',
          width: 100,
        }],
      }, {
        title: 'Place of Incident',
        dataIndex: 'esPlaceofInc',
        key: 'name',
        width: 130,

      }, {
        title: 'Frequency',
        dataIndex: 'esFrequency',
        key: 'name',
        width: 120,
      }, {
        title: 'Status of Incident',
        dataIndex: 'esStatusofInc',
        key: 'name',
        width: 100,
      }, {
        title: 'Case Category',
        children: [{
          title: 'Case Category',
          dataIndex: 'esCaseCat1',
          key: 'building',
          width: 100,
        }, {
          title: 'Sub Case Category',
          dataIndex: 'esSubCat',
          key: 'number',
          width: 140,

        }],
      }, {
        title: 'Type of Abuse',
        dataIndex: 'esTypeofAbuse',
        key: 'name',
        width: 100,

      }, {
        title: 'Prior Redressal',
        dataIndex: 'esPriorRedressal',
        key: 'name',
        width: 100,

      }, {
        title: 'Perpetrator',
        dataIndex: 'esPerpetrator',
        key: 'name',
        width: 130,

      }, {
        title: 'Service Offered',
        dataIndex: 'esServiceOffered',
        key: 'name',
        width: 100,

      }, {
        title: 'Status of Case',
        dataIndex: 'esStatusofCase',
        key: 'name',
        width: 100,

      }, {
        title: 'Agency',
        dataIndex: 'esAgency',
        key: 'name',
        width: 100,

      }, {
        title: 'Name of Person',
        dataIndex: 'esNameofPerson',
        key: 'name',
        width: 100,

      }, {
        title: 'Perpetrator Name',
        dataIndex: 'esPerpetratorName',
        key: 'name',
        width: 130,

      }, {
        title: 'Perpetrator Age',
        dataIndex: 'esPerpetratorAge',
        key: 'name',
        width: 130,

      }, {
        title: 'Perpetrator Gender',
        dataIndex: 'esPerpetratorGender',
        key: 'name',
        width: 130,

      }, {
        title: 'Perpetrator Mobile',
        dataIndex: 'esPerpetratorMobile',
        key: 'name',
        width: 130,

      }, {
        title: 'Perpetrator Occupation',
        dataIndex: 'esPerpetratorOccup',
        key: 'name',
        width: 130,

      }, {
        title: 'Perpetrator Addition',
        dataIndex: 'esPerpetratorAddition',
        key: 'name',
        width: 130,

      }, {
        title: 'Remarks',
        dataIndex: 'esRemarks',
        key: 'name',
        width: 100,

      }, {
        title: 'Gender',
        dataIndex: 'esGender',
        key: 'gender',
        width: 90,

      }
    ]
  },



  {
    title: "Guidence Report",
    children: [
      {
        title: 'Information Sought',
        dataIndex: 'gsInformationSought',
        key: 'name',
        width: 160,
      }, {
        title: 'Risk Asses',
        dataIndex: 'gsRiskAsses',
        key: 'name',
        width: 100,
      }, {
        title: 'Aggrieve Detail',
        children: [{
          title: 'Aggrieved',
          dataIndex: 'gsAggrieved',
          key: 'building',
          width: 100,
        }, {
          title: 'Aggrieve Name',
          dataIndex: 'gsOtherAggName',
          key: 'number',
          width: 100,

        }, {
          title: 'Aggrieve Mobile',
          dataIndex: 'gsOtherAggMobile',
          key: 'number',
          width: 100,

        }, {
          title: 'Aggrieve Gender',
          dataIndex: 'gsOtherAggGender',
          key: 'number',
          width: 100,

        }, {
          title: 'Aggrieve Age',
          dataIndex: 'gsOtherAggAge',
          key: 'number',
          width: 100,

        }, {
          title: 'Aggrieve Address',
          dataIndex: 'gsOtherAggAddress',
          key: 'number',
          width: 100,

        }],
      }, {
        title: 'Age',
        children: [{
          title: 'Age',
          dataIndex: 'gsAge',
          key: 'building',
          width: 100,
        }, {
          title: 'Age Group',
          dataIndex: 'gsAgeGroup',
          key: 'number',
          width: 100,

        }],
      }, {
        title: 'Education',
        dataIndex: 'gsEducation',
        key: 'name',
        width: 100,
      }, {
        title: 'Occupation',
        dataIndex: 'gsOccupation',
        key: 'name',
        width: 130,
      }, {
        title: 'Personal Identification',
        dataIndex: 'gsPersonalIdent',
        key: 'name',
        width: 150,
      }, {
        title: 'Marital Status',
        dataIndex: 'gsMaritalStatus',
        key: 'name',
        width: 100,
      }, {
        title: 'Living Status',
        dataIndex: 'gsLivingStatus',
        key: 'name',
        width: 100,
      }, {
        title: 'Family Status',
        dataIndex: 'gsFamilyStatus',
        key: 'name',
        width: 100,
      }, {
        title: 'Address',
        children: [{
          title: 'Houseno',
          dataIndex: 'gsHouseno',
          key: 'building',
          width: 100,
        }, {
          title: 'Street',
          dataIndex: 'gsStreet',
          key: 'number',
          width: 100,
        }, {
          title: 'Block',
          dataIndex: 'gsBock',
          key: 'number',
          width: 100,
        }, {
          title: 'Village',
          dataIndex: 'gsVillage',
          key: 'number',
          width: 100,
        }, {
          title: 'State',
          dataIndex: 'gsState',
          key: 'number',
          width: 100,
        }, {
          title: 'District',
          dataIndex: 'gsDistrict',
          key: 'number',
          width: 100,
        }, {
          title: 'Pincode',
          dataIndex: 'gsPincode',
          key: 'number',
          width: 100,
        }],
      }, {
        title: 'Place of Incident',
        dataIndex: 'gsPlaceofInc',
        key: 'name',
        width: 130,

      }, {
        title: 'Frequency',
        dataIndex: 'gsFrequency',
        key: 'name',
        width: 120,
      }, {
        title: 'Status of Incident',
        dataIndex: 'gsStatusofInc',
        key: 'name',
        width: 100,
      }, {
        title: 'Case Category',
        children: [{
          title: 'Case Category',
          dataIndex: 'gsCaseCat1',
          key: 'building',
          width: 100,
        }, {
          title: 'Sub Case Category',
          dataIndex: 'gsSubCat',
          key: 'number',
          width: 140,
        }],
      }, {
        title: 'Type of Abuse',
        dataIndex: 'gsTypeofAbuse',
        key: 'name',
        width: 100,

      }, {
        title: 'Prior Redressal',
        dataIndex: 'gsPriorRedressal',
        key: 'name',
        width: 100,

      }, {
        title: 'Perpetrator',
        dataIndex: 'gsPerpetrator',
        key: 'name',
        width: 130,

      }, {
        title: 'Service Offered',
        dataIndex: 'gsServiceOffered',
        key: 'name',
        width: 100,

      }, {
        title: 'Status of Case',
        dataIndex: 'gsStatusofCase',
        key: 'name',
        width: 100,

      }, {
        title: 'Agency',
        dataIndex: 'gsAgency',
        key: 'name',
        width: 100,

      }, {
        title: 'Name of Person',
        dataIndex: 'gsNameofPerson',
        key: 'name',
        width: 100,

      }, {
        title: 'Perpetrator Name',
        dataIndex: 'gsPerpetratorName',
        key: 'name',
        width: 130,

      }, {
        title: 'Perpetrator Age',
        dataIndex: 'gsPerpetratorAge',
        key: 'name',
        width: 130,

      }, {
        title: 'Perpetrator Gender',
        dataIndex: 'gsPerpetratorGender',
        key: 'name',
        width: 130,

      }, {
        title: 'Perpetrator Mobile',
        dataIndex: 'gsPerpetratorMobile',
        key: 'name',
        width: 130,

      }, {
        title: 'Perpetrator Occupation',
        dataIndex: 'gsPerpetratorOccup',
        key: 'name',
        width: 130,

      }, {
        title: 'Perpetrator Addition',
        dataIndex: 'gsPerpetratorAddition',
        key: 'name',
        width: 130,

      }, {
        title: 'Remarks',
        dataIndex: 'gsRemarks',
        key: 'name',
        width: 100,

      }, {
        title: 'Gender',
        dataIndex: 'gsGender',
        key: 'gender',
        width: 90,
      }

    ]
  },

  ];


  const [maincatvalue, setMaincatVal] = useState([]);
  useEffect(() => {
    FollowUpApi.followup()
      .subscribe(res => {
        const followvar = res;
        let tempList = [];
        followvar.data.caseids.forEach(element => {
          tempList.push(element.caseId);
        });
        setMaincatVal(tempList);
      })
  }, [])
  const [maincatval, setMaincatval] = useState({ val: "" })
  function onChangeMainCat(value) {
    //saveon.gsDirectoryMain =value;
    setMaincatval({
      val: value,
    })
  }




  return (
    <Auxiliary>

      <FollowUpHeader />

      {/* call controls */}
      <Row>
        <Col span={24}>
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <Widget styleName={`ant-col gx-bg-geekblue `}>
                <div className="gx-card-body">

                  <CallPopUpCard callinfodetail={info} />

                </div>
              </Widget>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24} >
              <Widget styleName={`ant-col gx-bg-geekblue `}>

                <div className="gx-card-body">
                  <Row>

                    <Col xl={1} lg={12} md={12} sm={12} xs={24}></Col>
                    <Col xl={10} lg={12} md={12} sm={12} xs={24} >
                      <AgentWelComeCard agentDialer={info} />
                    </Col>
                    <Col xl={2} lg={12} md={12} sm={12} xs={24}></Col>
                    <Col xl={10} lg={12} md={12} sm={12} xs={24} >
                      <CallInformationCard callinfoprps={info} />
                    </Col>


                  </Row>

                </div>
              </Widget>
            </Col>
          </Row>
        </Col>
      </Row>


      <h2 className="gx-text-white" >Follow Up Form</h2>
      <Widget styleName={`ant-col gx-bg-geekblue `}>
        <div className="gx-card-body">

          {/*  Followup Session and date  */}
          <Col span={24}>
            <Row>

              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <h2 className="gx-text-white" >Follow Up Session</h2>
                <FormItem>
                  <TreeSelect className="gx-w-100"
                    showSearch
                    value={onChangeFollowUp.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChangeFollowUp}
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

              <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                <FormItem>
                  <h2 className="gx-text-geekblue" >.</h2>
                  <Button className="gx-mb-0"
                    className="gx-btn-orange  gx-mb-1"
                    type="primary"
                    htmlType="submit"
                    onClick={searchFollowUp}
                  >
                    Search FollowUp
                  </Button>
                </FormItem>
              </Col>
            </Row>
          </Col>



          {/* follow up tables */}
          <Form
            initialValues={{ remember: true }}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="inline">

            <h2 className="gx-text-white" >Follow Up Case Details </h2>
            <Table
              columns={columns}
              dataSource={historyList}
              bordered
              size="large"
              scroll={{ x: '230%', y: 340 }}
            />

          </Form>
        </div>
      </Widget>

      {/* Follow up dispositions */}
      <Row>
        <Col span={24}>
          <Row>

            <Col xl={24} lg={12} md={12} sm={12} xs={24}>
              <Widget styleName={`ant-col gx-bg-geekblue `}>
                <div className="gx-card-body">
                  {flage == 0  // 0 means hide ,  1 means show dispo
                    ? <DispoSakhi sakhidispo={info} />
                    : <div className="gx-text-white" > Waiting for Another Call.... </div>

                  }
                </div>
              </Widget>
            </Col>

          </Row>
        </Col>
      </Row>


      {/* save followup status */}
      <Widget styleName={`ant-col gx-bg-geekblue `}>
        <div className="gx-card-body">

          <Form
            initialValues={{ remember: true }}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="inline">


            {/* Case Id Field */}
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <h2 className="gx-text-white" >Case Id </h2>
              <FormItem>
                <TreeSelect className="gx-w-100"
                  showSearch
                  value={onChangeCaseID.value}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Please select"
                  allowClear
                  treeDefaultExpandAll
                  onChange={onChangeCaseID}
                >

                  {
                    maincatvalue.map((caseId, id) =>

                      <TreeNode value={caseId} key={id} title={caseId} >
                      </TreeNode>
                    )
                  }

                </TreeSelect>
              </FormItem>
            </Col>


            {/* Status of the Case */}
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <h2 className="gx-text-white" >Status of the Case</h2>
              <FormItem>
                <TreeSelect className="gx-w-100"
                  showSearch
                  value={onChangeStatusofCaseVal.value}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Please select"
                  allowClear
                  treeDefaultExpandAll
                  onChange={onChangeStatusofCaseVal}
                >

                  <TreeNode value="Process" title="Process" key="217">
                  </TreeNode>
                  <TreeNode value="Closed" title="Closed" key="218">
                  </TreeNode>
                  <TreeNode value="Follow Up" title="Follow Up" key="219">
                  </TreeNode>

                </TreeSelect>
              </FormItem>
            </Col>


            {/* Remarks */}
            <Col xl={10} lg={12} md={12} sm={12} xs={24}>
              <h2 className="gx-text-white" >Remarks</h2>
              <FormItem>
                <TextArea rows={4}
                  id="caseRemark" name="caseRemark" type="text" placeholder="Remarks"
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
                //onClick={SaveOnSakhi , SaveOnCallClose}
                >
                  Save FollowUp
                </Button>
              </FormItem>
            </Col>

          </Form>
        </div>
      </Widget>


    </Auxiliary>
  );

}

export default FollowUp;
