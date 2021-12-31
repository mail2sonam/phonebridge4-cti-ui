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
import DistrictWiseReport from "./DistrictWiseReport";
import Widget from "components/Widget/index";
import SeniorCitizenReport from "./SeniorCitizenReport";
import CategoryWiseReport from "./CategoryWiseReport";


const Option = Select.Option;

const ConsolidateReport = () => {

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

          <Widget styleName={`ant-col gx-bg-geekblue `}>

      
  <h2 className="gx-text-white">Consolidate Reports</h2>

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
            
            <TreeNode value="Category Wise" title="Category Wise" key="0">
            </TreeNode>
            <TreeNode value="Total Service Calls Vs Individual Calls" title="Total Service Calls Vs Individual Calls" key="2">
            </TreeNode>
            <TreeNode value="District wise Report" title="District wise Report" key="3">
            </TreeNode>
            <TreeNode value="Senior Citizen Report" title="Senior Citizen Report" key="4">
            </TreeNode>
        </TreeSelect>
    </Col>


    <Col xl={24} lg={12} md={12} sm={12} xs={24}>
    
      
      { options.reportoption =="Category Wise"
          ?<div>
            <h2 className="gx-text-white">Category Wise</h2>
              <CategoryWiseReport/>
            </div>     
          : options.reportoption =="Total Service Calls Vs Individual Calls"
              ?<div>
                <h2 className="gx-text-white">TOTAL SERVICE CALLS VS INDIVIDUAL CALLS</h2>
                  <TotalServiceCall/>
              </div>
              : options.reportoption =="District wise Report"
              ?<div>
                <h2 className="gx-text-white">District wise Report</h2>
                  <DistrictWiseReport/>
              </div>

          : options.reportoption =="Senior Citizen Report"
              ?<div>
                <h2 className="gx-text-white">Senior Citizen Report</h2>
                  <SeniorCitizenReport/>
              </div>
          
          :null
      }
 </Col>

 </Widget>

      </Auxiliary>
    );
  };

export default ConsolidateReport;

