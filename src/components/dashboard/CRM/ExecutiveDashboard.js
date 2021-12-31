import React from "react";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, Cell, Pie, PieChart} from "recharts";
import {Select, Button, Col, Row} from "antd";
import { useState ,useEffect} from 'react'
import LineIndicator from "./LineIndicator";
import MonitorApi from "./MonitorApi";
import Widget from "components/Widget/index";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import AmCharts from "@amcharts/amcharts3-react";
import ExecutiveAdmin from "../../../routes/SamplePage/ExecutiveAdmin";
import ExecutiveHeader from "../../../containers/Topbar/InsideHeader/ExecutiveHeader";


const ExecutiveDashboard = () => {
  
  var incomstatus = "" ;
  var outcoingstatus = "" ;
  var missedstatus = "" ;
  var answeredstatus = "" ;
  var notansweredstatus = "" ;

  let[incom, setIncom] = useState({inval:''});
  let[out, setOut] = useState({outval:''});
  let[missed, setMissed] = useState({missval:''});
  let[answer, setAnswer] = useState({ansval:''});
  let[notanswer, setNotAnswer] = useState({notansval:''});

  useEffect(()=>{
    var data = {
      extension: localStorage.getItem("extn")
    }
    MonitorApi.liveDashboard(data)
    .subscribe(res=>{

      setIncom({
        inval: res.data.data[0].statusCount
      })

      setOut({
        outval: res.data.data[1].statusCount
      })
  

      setMissed({
        missval: res.data.data[2].statusCount
      })

      setAnswer({
        ansval: res.data.data[3].statusCount
      })

      setNotAnswer({
        notansval: res.data.data[4].statusCount
      })

      // datax =  res.data.data[0].statusCount
      // datay = res.data.data[1].statusCount
    } );
   
  },[]);
  incomstatus= incom.inval;
  outcoingstatus= out.outval;
  missedstatus= missed.missval;
  answeredstatus= answer.ansval;
  notansweredstatus= notanswer.notansval;


  const configpie = {
    "type": "pie",
    "theme": "light",
    "dataProvider": [ {
      "country": "Answered Calls",
      "litres": incomstatus
    }, {
      "country": "Outgoing Calls",
      "litres": outcoingstatus
    }, {
      "country": "Missed Calls",
      "litres": missedstatus
    }, {
      "country": "Incoming",
      "litres": answeredstatus
    }, {
      "country": "IVR Hangup",
      "litres": notansweredstatus
    }],
    "valueField": "litres",
    "titleField": "country",
    "balloon": {
      "fixedPosition": true
    },

  };
  

  
  const configbar = {
    "theme": "light",
    "type": "serial",
    "startDuration": 2,
    "dataProvider": [{
      "country": "Answered",
      "visits": incomstatus,
      "color": "#FF0F00"
    }, {
      "country": "Outgoing",
      "visits": outcoingstatus,
      "color": "#FF6600"
    }, {
      "country": "Missed",
      "visits": missedstatus,
      "color": "#B0DE09"
    }, {
      "country": "Incoming",
      "visits": answeredstatus,
      "color": "#04D215"
    }, {
      "country": "IVR Hangup",
      "visits": notansweredstatus,
      "color": "#0D52D1"
    }],
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
      "labelRotation": 0
    }

  };


  
  const configVerBar = {
    "type": "serial",
    "theme": "light",
    "handDrawn": true,
    "handDrawScatter": 3,
    "legend": {
      "useGraphSettings": true,
      "markerSize": 12,
      "valueWidth": 0,
      "verticalGap": 0
    },
    "dataProvider": [{
      "year": "Answered",
      "income": incomstatus,
      // "expenses": 18.1
    }, {
      "year": "Outgoing",
      "income": outcoingstatus,
      // "expenses": 22.8
    }, {
      "year": "Missed",
      "income": missedstatus,
      // "expenses": 23.9
    }, {
      "year": "Incoming",
      "income": answeredstatus,
      // "expenses": 22.8
    }, {
      "year": "IVR Hangup",
      "income": notansweredstatus,
      // "expenses": 22.8
    }],
    "valueAxes": [{
      "minorGridAlpha": 0.08,
      "minorGridEnabled": true,
      "position": "top",
      "axisAlpha": 0
    }],
    "startDuration": 1,
    "graphs": [{
      "balloonText": "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b></span>",
      "title": "Count",
      "type": "column",
      "fillAlphas": 0.8,

      "valueField": "income"
    }],
    "rotate": true,
    "categoryField": "year",
    "categoryAxis": {
      "gridPosition": "start"
    },
    

  };

  return (
      <div> 
          <ExecutiveHeader/>
    <Widget styleName={`ant-col gx-bg-white `}>

      <Row> 
      <Col lg={6} md={12} sm={12} xs={24}>
      <h2 className="gx-text-black">Current Call Details</h2>

        <div className="ant-row-flex">
          <h2 className="gx-text-grey" className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">0</h2>
        </div>
        <p className="gx-text-black">Current Queue Count</p>

<AmCharts.React style={{width: "100%", height: "500px"}} options={configVerBar}/>
        </Col>

    <Col lg={10} md={12} sm={12} xs={24}>
    <h2 className="gx-text-black">Todays Call Percentage</h2>
      <AmCharts.React style={{width: "100%", height: "500px"}} options={configpie}/>
    </Col>
    <Col lg={8} md={12} sm={12} xs={24}>
    <h2 className="gx-text-black">Current Week Call Details</h2>
        <AmCharts.React style={{width: "100%", height: "500px"}} options={configbar}/>
    </Col>
    </Row>



    </Widget>
    </div>
  );
};

export default ExecutiveDashboard;
