import React, { useContext } from "react";
import {Col, Row} from 'antd';
import Auxiliary from "util/Auxiliary";
import Widget from "components/Widget/index";
import CallMonitor from "../../components/dashboard/CRM/CallMonitor";

const Monitor = () => {

return (
  <Auxiliary>
             {/* //Monitor*/}
    <Row>
        <Col span={24}>
          <Row>
          
            <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                              
                          <CallMonitor />
             
            </Col>
             
             </Row> 
         </Col>
      </Row>  
                   {/* //Monitor*/}
  </Auxiliary>
);

};

export default Monitor;
