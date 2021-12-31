import React, { useState } from "react";
import { Button, Card, Radio, Switch, TreeSelect } from "antd";
import { Col, Row } from 'antd';
import Icon from '@ant-design/icons';
import { AgentModeContext } from "./AgentModeContext";
import AgentModeApi from "./AgentModeApi";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

var mode = '';
const DialerMode = (props) => {

  const TreeNode = TreeSelect.TreeNode;

  function onChange(e) {
    localStorage.setItem("AgentMode", "")
    if (e == true) {
      mode = "Avaliable";
    } else if (e == false) {
      mode = "OnBreak";
    }
    localStorage.setItem("AgentMode", e)
  }




  const [breakReason, setBreakReason] = useState({ reason: '' });
  function onChangeBreakReasons(value) {
    setBreakReason({
      reason: value
    })

  }





  const [agentmode, setAgentMode] = useState({ userextension: '', onbreak: '', modeChangeReason: '' });

  const modechange = () => {

    var modeofReason = "";
    if (mode == "OnBreak") {
      localStorage.setItem("onbreak", "OnBreak");
      console.log(localStorage.getItem("onbreak"))
      modeofReason = breakReason.reason
    } else {
      localStorage.setItem("onbreak", "Available");
      console.log(localStorage.getItem("onbreak"))
      modeofReason = "Available"
    }


    if (modeofReason == '' || modeofReason == undefined) {
      alert("Please Select Break Reason and Try Again");
    } else {
      var data = {
        userextension: localStorage.getItem("extn"),
        onbreak: modeofReason,
        userName: localStorage.getItem("user"),
        modeChangeReason: modeofReason,
      }
      console.log(data)

      AgentModeApi.AgentMode(data)
        .then(response => {
          setAgentMode({
            userextension: response.data.userextension,
            onbreak: response.data.onbreak,
            userName: response.data.userName,
            modeChangeReason: response.data.modeChangeReason
          });
          console.log(response)
        }
        )
    }

  }


  return (

    <Row>
      <Col span={24}>
        <Row>

          <Col xl={8} lg={12} md={12} sm={12} xs={24}>
            {localStorage.getItem("break") == "Dialing" ||
              localStorage.getItem("break") == "Connected" ||
              localStorage.getItem("break") == "Hold" ||
              localStorage.getItem("break") == "InQueue" ||
              localStorage.getItem("break") == "Hangup" ||
              breakReason.reason == '' || breakReason.reason == undefined

              ? <Switch
                className="gx-btn-success  gx-mb-1"
                disabled
                checkedChildren="Avaliable"
                unCheckedChildren="Break"
                defaultChecked
                onClick={modechange}
                onChange={onChange} />

              : <Switch
                className="gx-btn-success  gx-mb-1"
                checkedChildren="Avaliable"
                unCheckedChildren="Break"
                defaultChecked
                // disabled
                onClick={modechange}
                onChange={onChange} />
            }
          </Col>

          <Col xl={16} lg={12} md={12} sm={12} xs={24}>
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeBreakReasons.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Break Reason"
              allowClear
              treeDefaultExpandAll
              onChange={onChangeBreakReasons}
            >
              <TreeNode value="Tea Break" title="Tea Break" key="153">
              </TreeNode>
              <TreeNode value="Lunch Break" title="Lunch Break" key="154">
              </TreeNode>
              <TreeNode value="Training Break" title="Training Break" key="155">
              </TreeNode>
              <TreeNode value="Meeting Break" title="Meeting Break" key="156">
              </TreeNode>
              <TreeNode value="Bio Break" title="Bio Break" key="157">
              </TreeNode>

            </TreeSelect>
          </Col>


        </Row>
      </Col>
    </Row>
  );
}


export default DialerMode;
