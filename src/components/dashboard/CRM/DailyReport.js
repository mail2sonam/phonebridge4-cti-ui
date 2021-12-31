import React from "react";
import { useState, useEffect } from 'react'
import { Col, Row, Card, Table } from 'antd';
import { Button, Form, Input, Select, TreeSelect } from "antd";
import Auxiliary from "util/Auxiliary";
import CallDetailApi from "components/dashboard/CRM/CallDetailApi";
import AgentPage from "../../../routes/SamplePage/Agent";
import { Link, useHistory } from "react-router-dom";
import MonitorApi from "./MonitorApi";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import CaseHandledIndividual from "./Reports/CaseHandledIndividuals";
import TotalServiceCall from "./Reports/TotalServiceCall";
import DailyCaseDetails from "./Reports/DailyCaseDetails";
import DistrictWise from "./Reports/Districtwise";
import SeniorCitizencalldetails from "./Reports/SeniorCitizencalldetails";
import DailyReferal from "./Reports/DailyReferal";
import DailyDistrictCount from "./Reports/DailyDistrictCount";
import DailyCallReport from "./DailyCallReport";
import InformDispoReport from "./InformDispoReport";
import EmergencyReport from "./EmergencyReport";
import GuidenceReport from "./GuidenceReport";
import TypeofCallReport from "./TypeofCallReport";
import FullDispoReport from "./FullDispoReport";
import Widget from "components/Widget/index";

const Option = Select.Option;

const DailyReport = () => {

  const TreeNode = TreeSelect.TreeNode;

  const [options, setOptions] = useState({ reportoption: "" });
  function HandlerReportOption(value) {
    setOptions({
      reportoption: value
    })
  }

  return (

    <Auxiliary>
      <AdminHeader />

      <Widget styleName={`ant-col gx-bg-geekblue `}>
        <div className="gx-card-body">
          <h2 className="gx-text-white">Daily Reports</h2>

          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
            <TreeSelect className="gx-w-100"
              showSearch
              value={HandlerReportOption.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              onChange={HandlerReportOption}

            >
              {/* <TreeNode value="Call Details" title="Call Details" key="0">
            </TreeNode> */}
              <TreeNode value="Information" title="Information Call Report" key="1">
              </TreeNode>
              <TreeNode value="Emergency" title="Emergency Call Report" key="2">
              </TreeNode>
              <TreeNode value="Guidance" title="Guidance and Counselling Call Report" key="3">
              </TreeNode>
              {/* <TreeNode value="Type of Call Details" title="Type of Call Details" key="4">
            </TreeNode> */}
              <TreeNode value="All" title="All Disposition Report" key="5">
              </TreeNode>
              {/* <TreeNode value="Daily District Count" title="Daily District Count" key="6">
            </TreeNode> */}
            </TreeSelect>
          </Col>


          <Col xl={24} lg={12} md={12} sm={12} xs={24}>


            {options.reportoption == "Call Details"
              ? <div>
                <h2 className="gx-text-white">WOMEN HELPLINE 181 - Call Details</h2>
                <DailyCallReport CallDetailprops={"Call Details"} />
              </div>
              : options.reportoption == "Information"
                ? <div>
                  <h2 className="gx-text-white">Information Call Report</h2>
                  <InformDispoReport Informationprops={"Information"} />
                </div>
                : options.reportoption == "Emergency"
                  ? <div>
                    <h2 className="gx-text-white">Emergency Call Report</h2>
                    <EmergencyReport Emergencyprops={"Emergency"} />
                  </div>
                  : options.reportoption == "Guidance"
                    ? <div>
                      <h2 className="gx-text-white">Guidance and Counselling Call Report</h2>
                      <GuidenceReport Guidenceprops={"Guidance"} />
                    </div>
                    : options.reportoption == "Type of Call Details"
                      ? <div>
                        <h2 className="gx-text-white">Type of Call Details</h2>
                        <TypeofCallReport CallTypeprops={"Type of Call"} />
                      </div>
                      : options.reportoption == "All"
                        ? <div>
                          <h2 className="gx-text-white">All Disposition Report</h2>
                          <FullDispoReport Fullprops={"All"} />
                        </div>

                        : options.reportoption == "Daily District Count"
                          ? <div>
                            <h2 className="gx-text-white">Daily District Count</h2>
                            <DailyDistrictCount />
                          </div>

                          : null
            }

          </Col>

        </div>
      </Widget>

    </Auxiliary>
  );
};

export default DailyReport;

