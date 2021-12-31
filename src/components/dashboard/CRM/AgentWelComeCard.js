import React, { useContext } from "react";
import { useState, useEffect } from 'react'
import Icon from '@ant-design/icons';
import axios from 'axios';
import Widget from "components/Widget/index";
import { Button, Form, Input, Select, TreeSelect, Card, Radio } from "antd";
import Dial from "components/dashboard/CRM/Dial";
import DialerMode from "components/dashboard/CRM/DialerMode";
import { UserContext } from "./UserContext";
import DialerApi from "./DialerApi";
import CampaignApi from "./CampaignApi";

const Option = Select.Option;
const RadioGroup = Radio.Group
const another = {
  channel: "SIP/4000",
  context: "from-internal",
  phoneNo: "",
  prefix: "9",
  extension: "4000",
  priority: "1"
}
export const test = another.extension;
function AgentWelComeCard(props) {

  const outgoingvalues = {
    channel: localStorage.getItem("extensiontype") + "/" + localStorage.getItem("extn"),
    context: localStorage.getItem("context"),
    phoneNo: "",
    prefix: localStorage.getItem("prefix"),
    extension: localStorage.getItem("extn"),
    priority: "1"
  }

  const [outgoing, setOutgoing] = useState(outgoingvalues);
  const [submitted, setSubmitted] = useState(false)

  const handleChange = event => {
    const { name, value } = event.target
    setOutgoing({ ...outgoing, [name]: value })
  }

  const TreeNode = TreeSelect.TreeNode;

  const clicktodial = () => {
    var data = {
      channel: localStorage.getItem("extensiontype") + "/" + localStorage.getItem("extn"),
      context: localStorage.getItem("context"),
      phoneNo: outgoing.phoneNo,
      prefix: localStorage.getItem("prefix"),
      extension: localStorage.getItem("extn"),
      priority: "1",
      dialMethod: "outgoing"
    }
    console.log(data)
    Dial.dial(data)
      .subscribe(response => {
        setOutgoing({
          channel: localStorage.getItem("extensiontype") + "/" + localStorage.getItem("extn"),
          context: localStorage.getItem("context"),
          phoneNo: response.data.phoneNo,
          prefix: response.data.prefix,
          extension: localStorage.getItem("extn"),
          priority: "1",
          dialMethod: "outgoing"

        });
        setSubmitted(true)
      })
  }

  const newPo = () => {
    setOutgoing(outgoingvalues);
    setSubmitted(false);
  };

  const msg = useContext(UserContext);

  localStorage.setItem("break", props.agentDialer.popupStatus)

  function onChangeCampSelect(value) {
         
    
    console.log(value)
    if(value == undefined)
    {
      console.log("stop dialer")
      var data3 = {
        extension: localStorage.getItem("extn"),
      }
      console.log(data3)
      DialerApi.stopDialer(data3)
        .subscribe(res => {
          console.log(res)
        })
    }
    else{


    var data1 = {
      channel: localStorage.getItem("extensiontype") + "/" + localStorage.getItem("extn"),
      context: localStorage.getItem("context"),
      prefix: localStorage.getItem("prefix"),
      extension: localStorage.getItem("extn"),
      priority: 1,
      campaignId: value,
    }
    console.log(data1)
    DialerApi.startDialer(data1)
      .subscribe(res => {
        console.log(res.data)
      })

    }
    var data2 = {
      extension: localStorage.getItem("extn"),
    }

    DialerApi.removefrmQueue(data2)
      .subscribe(res => {

      })


    var data = {
      campaignId: value
    }
    CampaignApi.campaignById(data)
      .subscribe(res => {
        console.log(res.data.model.campaignName)

        localStorage.setItem("dialerCampaign", res.data.model.campaignName)
      })



  }

  const [campaignValues, setCampaignVal] = useState([]);
  useEffect(() => {
    var data = {
      userextension: localStorage.getItem("extn")
    }
    DialerApi.campaignSelect(data)
      .subscribe(res => {
        let campList = [];
        for (let i = 0; i <= Object.keys(res.data.model).length - 1; i++) {
          campList.push({
            key: i,
            campaignName: res.data.model[i].campaignName,
            campaignId: res.data.model[i].campaignId,
          })
        }

        setCampaignVal(campList);
      })
  }, [localStorage.getItem("extn")])

  return (

    <div className="gx-wel-ema gx-pt-xl-2" >
      <h2 className="gx-mb-3 " className="gx-text-white">Agent Mode </h2>

      <ul className="gx-list-group">
        <li>

          <span  >

            <DialerMode />
          </span>
        </li>
        <li>

          <span className="gx-text-white">
            <TreeSelect className="gx-w-100"
              showSearch
              value={onChangeCampSelect.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Select Campaign"
              allowClear
              treeDefaultExpandAll
              onChange={onChangeCampSelect}
            >

              {
                campaignValues.map(({ campaignName, campaignId, id }) =>

                  <TreeNode value={campaignId} key={id} title={campaignName} >
                  </TreeNode>
                )
              }
            </TreeSelect>
          </span>
        </li>
        <li>
          <span>
            <Input id="phoneNo" name="phoneNo" placeholder="Mobile Number" value={outgoing.phoneNo} onChange={handleChange} />
          </span>
          <br></br>
        </li>
        <li>
          {localStorage.getItem("break") == "Dialing" ||
            localStorage.getItem("break") == "Connected" ||
            localStorage.getItem("break") == "Hold" ||
            localStorage.getItem("break") == "InQueue" ||
            localStorage.getItem("break") == "Hangup"

            ? <Button className="gx-btn-secondary  gx-mb-1" type="primary" disabled onClick={clicktodial} >Call </Button>

            : <Button className="gx-btn-secondary  gx-mb-1" type="primary" onClick={clicktodial} >Call </Button>
          }

          {/* <Button className="gx-btn-secondary  gx-mb-1" type="primary" onClick={clicktodial} >Call </Button> */}
          {/* <Button type="primary" className="gx-btn-info   gx-mb-1" >Add Transfer Fav</Button> */}
        </li>
      </ul>
    </div>



  );

};
export default AgentWelComeCard;
