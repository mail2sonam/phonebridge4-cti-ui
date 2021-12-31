import React, {useState, useEffect, useContext} from "react";
import Widget from "components/Widget/index";
import {Col, Row} from 'antd';
import Auxiliary from "util/Auxiliary";
import {test,extension1} from "components/dashboard/CRM/AgentWelComeCard";
import Timer from 'react-compound-timer'
import { UserContext } from "./UserContext";


const TopBarChart = () => {

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
    
  }, 
  
  []);

  const msg = useContext(UserContext);

  return (
    <Auxiliary>
      <Widget styleName={`ant-col gx-bg-geekblue `} >
 <Row>  
      
            <Col xl={5} lg={12} md={12} sm={12} xs={24} >

              <h3 className="gx-text-white">User Name: <span>{localStorage.getItem("user")}</span> </h3> 
            {/* <h3 class="icon icon-diamond" >User Name: <span>3000</span> </h3> */}
           
            </Col>
           
            <Col xl={5} lg={12} md={12} sm={12} xs={24} >
         
            <h3 class="icon icon-tasks" className="gx-text-white" >Name: <span>{localStorage.getItem("user")}</span>  </h3>
           
            </Col>

            <Col xl={5} lg={12} md={12} sm={12} xs={24} >
         
            <h3 class="icon icon-team" className="gx-text-white">User Extension: <label>{localStorage.getItem("extn")}</label>  </h3>
           
            </Col>

            <Col xl={5} lg={12} md={12} sm={12} xs={24} >
           
            <h3 class="icon icon-files" className="gx-text-white">Login Time: <span>
            <Timer> 
           
           <Timer.Hours /> : 
           <Timer.Minutes /> :  
           <Timer.Seconds /> 
          
         </Timer>
         </span>  </h3>
          
            </Col>

            <Col xl={4} lg={12} md={12} sm={12} xs={24} >
           
            <h3 class="icon icon-diamond" className="gx-text-white" >Time: <label>{time.toLocaleTimeString()}</label> </h3>
          
            </Col>
       
     
      </Row>  
      </Widget>
     
     </Auxiliary>
  );
};

export default TopBarChart;
