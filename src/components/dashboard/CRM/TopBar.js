import React from "react";
import Icon from '@ant-design/icons';
import {Col, Row} from 'antd';
import {Button, Form, Input, Select} from "antd";
import Auxiliary from "util/Auxiliary";

const Option = Select.Option;

const TopBar = () => {

  function handleChange(value) {

  }

  return (
    <Auxiliary>

            <Row>      
                    <Col xl={5} lg={12} md={12} sm={12} xs={24} >
                    <span>Name:</span>
                    </Col>
                    <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                    <span>User Name:</span>
                    </Col>
                    <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                    <span>User Extension:</span>
                    </Col>
                    <Col xl={5} lg={12} md={12} sm={12} xs={24}>
                    <span>Login Time:</span>
                    </Col>
                    <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                    <span>Time:</span>
                    </Col>
            </Row>

    </Auxiliary>
  );
};

export default TopBar;
