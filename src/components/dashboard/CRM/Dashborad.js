import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, Cell, Pie, PieChart } from "recharts";
import { Select, Button, Col, Row, TreeSelect } from "antd";
import { useState, useEffect } from 'react'
import LineIndicator from "./LineIndicator";
import MonitorApi from "./MonitorApi";
import Widget from "components/Widget/index";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import AmCharts from "@amcharts/amcharts3-react";


const Dashboard = () => {


  const TreeNode = TreeSelect.TreeNode;

  var ivrAbdCount = "";
  var abandonedCount = "";
  var missedCount = "";
  var answeredCount = "";
  var totalCount = "";
  var mailAssignCount = "";
  var mailAssignButPen = "";
  var smsAssignCount = "";
  var smsAssignbutPen = "";


  let [ivrAbd, setIvrAbd] = useState({ ivrAdbVal: '' });
  let [abandonedVal, setAbandoned] = useState({ abdVal: '' });
  let [missed, setMissed] = useState({ missedVal: '' });
  let [answer, setAnswer] = useState({ ansval: '' });
  let [totalValue, setTotalCount] = useState({ totalVal: '' });

  let [mailAssign, setMailAssignCount] = useState({ mailAssignVal: '' });

  let [mailAssignPen, setMailAssignButPen] = useState({ mailAssignPenVal: '' });

  let [smsAssign, setSmsAssignCount] = useState({ smsAssignVal: '' });

  let [smsAssignPen, setSmsAssignButPen] = useState({ smsAssignPenVal: '' });


  useEffect(() => {
    var data = {
      extension: localStorage.getItem("extn")
    }
    MonitorApi.liveDashboard(data)
      .subscribe(res => {

        setIvrAbd({
          ivrAdbVal: res.data.ivrAbandonedCount
        })

        setMissed({
          missedVal: res.data.missedCount
        })


        setAbandoned({
          abdVal: res.data.abandonedCount
        })

        setAnswer({
          ansval: res.data.answeredCount
        })

        setTotalCount({
          totalVal: res.data.totalCalls
        })

        // datax =  res.data.data[0].statusCount
        // datay = res.data.data[1].statusCount
      });

    MonitorApi.mailandSmsCount()
      .subscribe(res => {
        setMailAssignCount({
          mailAssignVal: res.data.MailNotAssignedCount
        })

        setMailAssignButPen({
          mailAssignPenVal: res.data.MailAssignedCount
        })

        setSmsAssignCount({
          smsAssignVal: res.data.SmsNotAssignedCount
        })

        setSmsAssignButPen({
          smsAssignPenVal: res.data.SmsAssignedCount
        })
      })

  });
  ivrAbdCount = ivrAbd.ivrAdbVal;
  abandonedCount = abandonedVal.abdVal;
  missedCount = missed.missedVal;
  answeredCount = answer.ansval;
  totalCount = totalValue.totalVal;

  mailAssignCount = mailAssign.mailAssignVal;
  mailAssignButPen = mailAssignPen.mailAssignPenVal;
  smsAssignCount = smsAssign.smsAssignVal;
  smsAssignbutPen = smsAssignPen.smsAssignPenVal;


  //First chart
  const configfirstBar = {
    "type": "serial",
    "theme": "light",
    "marginRight": 70,
    "dataProvider": [{
      "country": "Mail Assigned but Pending",
      "visits": mailAssignButPen,
      "color": "#0D52D1"
    }, {
      "country": "Mail not yet Assigned",
      "visits": mailAssignCount,
      "color": "#F8FF01"
    }, {
      "country": "SMS Assigned but Pending",
      "visits": smsAssignbutPen,
      "color": "#04D215"
    }, {
      "country": "SMS not yet Assigned",
      "visits": smsAssignCount,
      "color": "#FF6600"
    }],
    "valueAxes": [{
      "axisAlpha": 0,
      "position": "left",
      "title": "Mail and SMS Count"
    }],
    "startDuration": 1,
    "graphs": [{
      "balloonText": "<b>[[category]]: [[value]]</b>",
      "fillColorsField": "color",
      "fillAlphas": 0.9,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "visits"
    }],
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": "country",
    "categoryAxis": {
      "gridPosition": "start",
      "labelRotation": 45
    },


  };


  //pie chart
  const configpie = {
    "type": "pie",
    "theme": "light",
    "dataProvider": [{
      "country": "Answered",
      "litres": answeredCount
    }, {
      "country": "Abdn<IVR",
      "litres": abandonedCount
    }, {
      "country": "Abdn>IVR",
      "litres": ivrAbdCount
    },
      // {
      //   "country": "Missed",
      //   "litres": missedCount
      // },
      //  {
      //   "country": "IVR Hangup",
      //   "litres": notansweredstatus
      // }
    ],
    "valueField": "litres",
    "titleField": "country",
    "balloon": {
      "fixedPosition": true
    },

  };


  // 3d Bar chart  
  const configbar = {
    "theme": "light",
    "type": "serial",
    "startDuration": 2,
    "dataProvider": [{
      "country": "Calls Answered",
      "visits": answeredCount,
      "color": "#04D215"
    }, {
      "country": "Calls Abandoned  after IVR",
      "visits": abandonedCount,
      "color": "#FF0F00"
    }, {
      "country": "Calls Abandoned  at IVR",
      "visits": ivrAbdCount,
      "color": "#FF6600"
    },
      // {
      //   "country": "Calls Missed",
      //   "visits": missedCount,
      //   "color": "#B0DE09"
      // },
      // {
      //   "country": "IVR Hangup",
      //   "visits": notansweredstatus,
      //   "color": "#0D52D1"
      // }
    ],
    "valueAxes": [{
      "position": "left",
      "title": "Call Count"
    }],
    "graphs": [{
      "balloonText": "[[category]]: <b>[[value]]</b>",
      "fillColorsField": "color",
      "fillAlphas": 1,
      "lineAlpha": 0.1,
      "type": "column",
      "valueField": "visits"
    }],
    "depth3D": 20,
    "angle": 30,
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": "country",
    "categoryAxis": {
      "gridPosition": "start",
      "labelRotation": 45
    }

  };


  //first chart
  // const configVerBar = {
  //   "type": "serial",
  //   "theme": "dark",
  //   "handDrawn": true,
  //   "handDrawScatter": 3,
  //   "legend": {
  //     "useGraphSettings": true,
  //     "markerSize": 12,
  //     "valueWidth": 0,
  //     "verticalGap": 0
  //   },
  //   "dataProvider": [{
  //     "year": "Information",
  //     "income": incomstatus,
  //     // "expenses": 18.1
  //   }, {
  //     "year": "Emergency",
  //     "income": outcoingstatus,
  //     // "expenses": 22.8
  //   }, {
  //     "year": "Counseling",
  //     "income": missedstatus,
  //     // "expenses": 23.9
  //   }, {
  //     "year": "No Option",
  //     "income": answeredstatus,
  //     // "expenses": 22.8
  //   },
  //     // {
  //     //   "year": "IVR Hangup",
  //     //   "income": notansweredstatus,
  //     //   // "expenses": 22.8
  //     // }
  //   ],
  //   "valueAxes": [{
  //     "minorGridAlpha": 0.08,
  //     "minorGridEnabled": true,
  //     "position": "top",
  //     "axisAlpha": 0
  //   }],
  //   "startDuration": 1,
  //   "graphs": [{
  //     "balloonText": "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b></span>",
  //     "title": "Count",
  //     "type": "column",
  //     "fillAlphas": 0.8,

  //     "valueField": "income"
  //   }],
  //   "rotate": true,
  //   "categoryField": "year",
  //   "categoryAxis": {
  //     "gridPosition": "start"
  //   },
  // };


  return (
    <div>
      <AdminHeader />
      <Widget styleName={`ant-col gx-bg-white `}>

        <Row>
          <Col lg={4} md={12} sm={12} xs={24}>
            <h2 className="gx-text-black">Current Call Details</h2>

            <div className="ant-row-flex">
              <h2 className="gx-text-grey" className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">{totalCount}</h2>
            </div>
            <p className="gx-text-black">Today Incoming Calls Count</p>
          </Col>

          {/* <Col lg={5} md={12} sm={12} xs={24}>
            <h1 className="gx-text-black">Mail Assigned</h1>

            <div className="ant-row-flex">
              <h2 className="gx-text-grey" className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">{mailAssignButPen}</h2>
            </div>
            <p className="gx-text-black">Today Incoming Calls Count</p>
          </Col> */}

          <Col lg={4} md={12} sm={12} xs={24}>
            <h2 className="gx-text-black">Mail not yet Assigned</h2>

            <div className="ant-row-flex">
              <h2 className="gx-text-grey" className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">{mailAssignCount}</h2>
            </div>
            {/* <p className="gx-text-black">Today Incoming Calls Count</p> */}
          </Col>

          {/* <Col lg={5} md={12} sm={12} xs={24}>
            <h1 className="gx-text-black">SMS Assigned</h1>

            <div className="ant-row-flex">
              <h2 className="gx-text-grey" className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">{smsAssignbutPen}</h2>
            </div>
            <p className="gx-text-black">Today Incoming Calls Count</p>
          </Col> */}

          <Col lg={4} md={12} sm={12} xs={24}>
            <h2 className="gx-text-black">SMS not yet Assigned</h2>

            <div className="ant-row-flex">
              <h2 className="gx-text-grey" className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">{smsAssignCount}</h2>
            </div>
            {/* <p className="gx-text-black">Today Incoming Calls Count</p> */}
          </Col>
        </Row>

        <Row>
          {/* <Col lg={8} md={12} sm={12} xs={24}>
            <h2 className="gx-text-black">Mail and SMS Statistics</h2>
            <AmCharts.React style={{ width: "100%", height: "500px" }} options={configfirstBar} />
          </Col> */}

          {/* <Col lg={6} md={12} sm={12} xs={24}>
            <h2 className="gx-text-black">IVR Statistics</h2>
            <AmCharts.React style={{ width: "100%", height: "500px" }} options={configVerBar} />
          </Col> */}

          <Col lg={12} md={12} sm={12} xs={24}>
            <h2 className="gx-text-black">InBound Call Statistics Percentage</h2>
            <AmCharts.React style={{ width: "100%", height: "500px" }} options={configpie} />
          </Col>

          <Col xl={12} lg={10} md={12} sm={12} xs={24}>
            <h2 className="gx-text-black">InBound Call Statistics Bar Chart</h2>
            <AmCharts.React style={{ width: "100%", height: "500px" }} options={configbar} />
          </Col>
        </Row>



      </Widget>


    </div>
  );
};

export default Dashboard;
