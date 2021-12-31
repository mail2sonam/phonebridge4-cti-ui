import React from "react";
import { useState ,useEffect} from 'react'
import {Col, Row, Card, Table} from 'antd';
import {Button, Form, Input, Select, TreeSelect} from "antd";
import Auxiliary from "util/Auxiliary";
import CallDetailApi from "components/dashboard/CRM/CallDetailApi";
import AgentPage from "../../../routes/SamplePage/Agent";
import {Link, useHistory} from "react-router-dom";
import MonitorApi from "./MonitorApi";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import CaseHandledIndividual from "./Reports/CaseHandledIndividuals";
import TotalServiceCall from "./Reports/TotalServiceCall";
import DailyCaseDetails from "./Reports/DailyCaseDetails";
import DistrictWise from "./Reports/Districtwise";
import SeniorCitizencalldetails from "./Reports/SeniorCitizencalldetails";
import DailyReferal from "./Reports/DailyReferal";
import DailyDistrictCount from "./Reports/DailyDistrictCount";
import ReportCallPertaining from "./DomesticReport/ReportCallPertaining";
import DomesticDistrictWise from "./DomesticReport/DomesticDistrictWise";

const Option = Select.Option;

const DomesticViolence = () => {

  const TreeNode = TreeSelect.TreeNode;
  
const [options, setOptions] = useState({reportoption:""});
  function HandlerReportOption(value){
    setOptions({
      reportoption: value
    })

  }
  

    return (
    
      <Auxiliary>
          <AdminHeader/>
  <h2 className="gx-text-white">Domestic Violence Reports</h2>

  <Col xl={12} lg={12} md={12} sm={12} xs={24}>

  <TreeSelect className="gx-w-100"
                    showSearch
                    value={HandlerReportOption.value}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={HandlerReportOption}
        
          >
            <TreeNode value="Report on calls pertaining to Domestic Violence" title="Report on calls pertaining to Domestic Violence" key="0">
            </TreeNode>
            <TreeNode value="Domestic Violence - District wise" title="Domestic Violence - District wise" key="1">
            </TreeNode>
            {/* <TreeNode value="Case Categorised District wise" title="Case Categorised District wise" key="2">
            </TreeNode>
            <TreeNode value="Senior Citizen call details for the month" title="Senior Citizen call details for the month" key="3">
            </TreeNode>
            <TreeNode value="Daily Case Details" title="Daily Case Details" key="4">
            </TreeNode>
            <TreeNode value="Daily Referral" title="Daily Referral" key="5">
            </TreeNode>
            <TreeNode value="Daily District Count" title="Daily District Count" key="6">
            </TreeNode> */}
        </TreeSelect>
    </Col>


    <Col xl={24} lg={12} md={12} sm={12} xs={24}>
    
      
      { options.reportoption =="Report on calls pertaining to Domestic Violence"
          ?<div>
            <h2 className="gx-text-white">Women Helpline (181): Report on calls pertaining to Domestic Violence</h2>
              <ReportCallPertaining/>
            </div>     
          : options.reportoption =="Domestic Violence - District wise"
              ?<div>
                <h2 className="gx-text-white">Women Helpline (181): Report on calls pertaining to Domestic Violence - District wise</h2>
                  <DomesticDistrictWise/>
              </div>
        //   : options.reportoption =="Case Categorised District wise"
        //       ?<div>
        //         <h2 className="gx-text-white">Case Categorised District wise & Referral Services provided</h2>
        //           <DistrictWise/>
        //       </div>
        //   : options.reportoption =="Senior Citizen call details for the month"
        //   ?<div>
        //     <h2 className="gx-text-white">WOMEN HELPLINE 181  - Senior Citizen call details</h2>
        //       <SeniorCitizencalldetails/>
        //   </div>
        //   : options.reportoption =="Daily Case Details"
        //   ?<div>
        //     <h2 className="gx-text-white">Daily Case Details</h2>
        //       <DailyCaseDetails/>
        //   </div>
        //   : options.reportoption =="Daily Referral"
        //   ?<div>
        //     <h2 className="gx-text-white">Daily Referral</h2>
        //       <DailyReferal/>
        //   </div>

        //   : options.reportoption =="Daily District Count"
        //   ?<div>
        //     <h2 className="gx-text-white">Daily District Count</h2>
        //       <DailyDistrictCount/>
        //   </div>

          :null
      }
 </Col>
      </Auxiliary>
    );
  };

export default DomesticViolence;

