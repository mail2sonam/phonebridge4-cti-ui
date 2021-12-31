import React, { useContext } from "react";
import { useState, useEffect } from 'react' ;
import { Col, Row, Tooltip } from 'antd';
import { Button, Form, Input, Select, TreeSelect } from "antd";
import Auxiliary from "util/Auxiliary";
import Dial from "components/dashboard/CRM/Dial";
import Hangupapi from "components/dashboard/CRM/Hangupapi";
import { UserContext } from "./UserContext";
import CallDetailApi from "./CallDetailApi";


const Option = Select.Option;

const CallPopUpCard = (props) => {

  const TreeNode = TreeSelect.TreeNode;


  function handleChange(value) {

  }
  const CallpopupVar = {
    phoneNo: '', extension: '', channel: '', callStatus: '', popupStatus: '', callWrapupTime: '', callStartTime: '', trunkChannel: '', sipChannel: '',
    secondChannel: '', callDirection: '', secondNumber: '', disposition: '', comments: '', callbackDate: '', queueJoinTime: '', extensionStatus: ''
  }


  // /HangupApi
  const handleChange2 = event => {
    const { name, value } = event.target
    setHang({ ...hang, [name]: value })
  }
  const [hang, setHang] = useState(CallpopupVar);
  const hangup = () => {
    var data = {
      channel: props.callinfodetail.sipChannel,
    }
    Hangupapi.Hang(data)
      .subscribe(response => {
        setHang({
          channel: response.data,
        });
      })
  }      // /HangupApi


  // /HangupApi line2
  const handleChangeline2 = event => {
    const { name, value } = event.target
    setHangline2({ ...hangline2, [name]: value })
  }
  const [hangline2, setHangline2] = useState(CallpopupVar);
  const hangupline2 = () => {
    var data = {
      channel: props.callinfodetail.secondChannel,
    }
    Hangupapi.Hang(data)
      .subscribe(response => {
        setHangline2({
          channel: response.data,
        });
      })
  }      // /HangupApi line2




  // /HoldApi
  const handleChange3 = event => {
    const { name, value } = event.target
    setHold({ ...hold, [name]: value })
  }
  const [hold, setHold] = useState(CallpopupVar);
  const holdOn = () => {
    var data = {
      channel: props.callinfodetail.sipChannel,
      extraChannel: props.callinfodetail.trunkChannel,
    }
    Hangupapi.Hold(data) 
      .subscribe(response => {
        setHold({
          channel: response.data,
          extraChannel: response.data,
        });
      })
  }       // /HoldApi

  // /UnHoldApi
  const handleChange4 = event => {
    const { name, value } = event.target
    setUnHold({ ...unhold, [name]: value })
  }
  const [unhold, setUnHold] = useState(CallpopupVar);
  const unholdOn = () => {
    var data = {
      channel: props.callinfodetail.sipChannel,
      extraChannel: props.callinfodetail.trunkChannel,
    }
    Hangupapi.UnHold(data)
      .subscribe(response => {
        setUnHold({
          channel: response.data,
          extraChannel: response.data,
        });
      })

  }       // /UnHoldApi

  // /Line2Api
  const handleChange5 = event => {
    const { name, value } = event.target
    setLine2({ ...line2, [name]: value })
  }
  const [line2, setLine2] = useState(CallpopupVar);
  const Line2call = () => {
    var data = {
      phoneNo: line2.phoneNo,
      channel: props.callinfodetail.sipChannel,
      context: "from-internal",
      prefix: localStorage.getItem("prefix"),
      priority: 1
    }
    Hangupapi.Line2(data)
      .subscribe(response => {
        setLine2({
          phoneNo: response.data.phoneNo,
          channel: response.data,
          context: response.data.context,
          prefix: response.data.prefix,
          priority: 1
        });
      })
  }       // /Line2Api

  // /Conference
  const handleChange6 = event => {
    const { name, value } = event.target
    setConf({ ...conf, [name]: value })
  }
  const [conf, setConf] = useState(CallpopupVar);
  const Conferencecall = () => {
    var data = {
      channel: props.callinfodetail.trunkChannel,
      sipChannel: props.callinfodetail.sipChannel,
      extraChannel: props.callinfodetail.secondChannel,
    }

    Hangupapi.Conference(data)
      .subscribe(response => {
        setConf({
          phoneNo: response.data,
          channel: response.data,
          context: "from-internal",
          prefix: localStorage.getItem("prefix"),
          priority: 1
        });

      })
  }       // /Conference

  // /Transfer
  const handleChange7 = event => {
    const { name, value } = event.target
    setTrans({ ...trans, [name]: value })
  }
  const [trans, setTrans] = useState(CallpopupVar);
  const TransferCall = () => {
    var data = {
      channel: props.callinfodetail.sipChannel,
    }
    Hangupapi.Hang(data)
      .subscribe(response => {
        setTrans({
          channel: response.data,
        });

      })
  }      // /Transfer

  const msg1 = useContext(UserContext);

  const favvar = { favNumber: '', favName: '' }
  const [AddFavVal, setAddFav] = useState(favvar);

  const handleAddFav = event => {
    const { name, value } = event.target
    setAddFav({ ...AddFavVal, [name]: value })
  }

  function favTrans(value) {
    line2.phoneNo = value;
  }

  function AddtoFav() {
    var data = {
      name: AddFavVal.favName,
      number: AddFavVal.favNumber
    }
    Hangupapi.AddFav(data)
      .subscribe(response => {
      })
  }


  const [getFavVal, setGetFavVal] = useState([]);
  useEffect(() => {
    var data = {
      userextension: localStorage.getItem("extn")
    }
    Hangupapi.GetAddFav(data)
      .subscribe(res => {
        let favList = [];
        for (let i = 0; i <= Object.keys(res.data.data).length - 1; i++) {
          favList.push({
            key: res.data.data[i].id,
            name: res.data.data[i].name,
            number: res.data.data[i].number,
          })
        }

        setGetFavVal(favList);
      })
  }, [])


  
  const [editName, setEditName] = useState('');
  function EditName() {
    var data = {
      id: props.callinfodetail.id,
      name: editName
    }
    console.log(data)
    CallDetailApi.EditName(data)
      .subscribe(res => {
        console.log(res)
      });
  }

  return (

    <Auxiliary>
      <div className="gx-text-white">
        <Row>
          <h2 className="gx-text-white" >Call Detail</h2>
        </Row>
        <Row>
         
        <Col xl={10} lg={12} md={12} sm={12} xs={24} >
            {props.callinfodetail.callStatus == "Connected" ||
              props.callinfodetail.callStatus == "Dialing" ||
              props.callinfodetail.callStatus == "Hold" ||
              props.callinfodetail.callStatus == "Hangup"
              ? <span>Name: <label>{props.callinfodetail.name}</label></span>
              : <span>Name: </span>
            }
          </Col>
          <Col xl={10} lg={12} md={12} sm={12} xs={24} >
            {props.callinfodetail.callStatus == "Connected" ||
              props.callinfodetail.callStatus == "Dialing" ||
              props.callinfodetail.callStatus == "Hold" ||
              props.callinfodetail.callStatus == "Hangup"
              ? <Input placeholder="Edit Name" type="text"
                onChange={event => setEditName(event.target.value)}

              />
              : <null></null>

            }


          </Col>

          {props.callinfodetail.callStatus == "Connected" ||
            props.callinfodetail.callStatus == "Dialing" ||
            props.callinfodetail.callStatus == "Hold" ||
            props.callinfodetail.callStatus == "Hangup"
            ?
            <Button className="gx-mb-0" className="gx-btn-success  gx-mb-1" type="primary" onClick={EditName}>Edit</Button>
            : <Button className="gx-mb-0" className="gx-btn-success  gx-mb-1" disabled type="primary" onClick={EditName}>Edit</Button>

          }

          <Col xl={15} lg={12} md={12} sm={12} xs={24}>
            {props.callinfodetail.callStatus == "Connected" || props.callinfodetail.callStatus == "Dialing"  || props.callinfodetail.callStatus == "Hold" ||  props.callinfodetail.callStatus == "Hangup"
              ? <span>Phone Number: <label>{props.callinfodetail.phoneNo}</label></span>
              : <span>Phone Number: </span>
            }
          </Col>

        </Row>
      </div>
      <br>
      </br>
      <Row>
        <Col xl={4} lg={12} md={12} sm={12} xs={24}>
        </Col>
      </Row>
      <br>
      </br>
      <Row>
        <h2 className="gx-text-white" >Call Control</h2>
      </Row>

      <Row>

        <Tooltip placement="topLeft" title="Hold" arrowPointAtCenter>
          <Col xl={2} lg={12} md={12} sm={12} xs={24}>
            {props.callinfodetail.callStatus == "Connected"
              ? <Button shape="circle" className="gx-btn-warning  gx-mb-1" onClick={holdOn} class="ant-btn ant-tooltip-open" type="primary" size={'large'} ><i class="icon icon-spam"> </i></Button>
              : <Button shape="circle" className="gx-btn-warning  gx-mb-1" class="ant-btn ant-tooltip-open" type="primary" disabled size={'large'} ><i class="icon icon-spam"> </i></Button>
            }
          </Col>
        </Tooltip>

        <Tooltip placement="topLeft" title="UnHold" arrowPointAtCenter>
          <Col xl={2} lg={12} md={12} sm={12} xs={24}>
            {props.callinfodetail.callStatus == "Hold"
              ? <Button shape="circle" className="gx-btn-yellow  gx-mb-1" onClick={unholdOn} class="ant-btn ant-tooltip-open" type="primary" size={'large'} ><i class="icon icon-alert"> </i></Button>
              : <Button shape="circle" className="gx-btn-yellow  gx-mb-1" class="ant-btn ant-tooltip-open" type="primary" disabled size={'large'} ><i class="icon icon-alert"> </i></Button>
            }
          </Col>
        </Tooltip>
        <Tooltip placement="topLeft" title="Hangup" arrowPointAtCenter>
          <Col xl={3} lg={12} md={12} sm={12} xs={24}>
            {props.callinfodetail.callStatus == "Connected"
              ? <Button shape="circle" className="gx-btn-danger   gx-mb-1" onClick={hangup} class="ant-btn ant-tooltip-open" type="primary" size={'large'} ><i class="icon icon-phone"> </i></Button>
              : <Button shape="circle" className="gx-btn-danger  gx-mb-1" class="ant-btn ant-tooltip-open" type="primary" disabled size={'large'} ><i class="icon icon-phone"> </i></Button>
            }
          </Col>
        </Tooltip>
        <Col xl={8} lg={12} md={12} sm={12} xs={24}>
          <Input id="phoneNo" name="phoneNo" placeholder="Transfer Number" value={line2.phoneNo} onChange={handleChange5} />
        </Col>
        <Tooltip placement="topLeft" title="Call Line 2" arrowPointAtCenter>
          <Col xl={2} lg={12} md={12} sm={12} xs={24}>
            {props.callinfodetail.callStatus == "Connected"
              ? <Button shape="circle" className="gx-btn-yellow  gx-mb-1" onClick={Line2call} class="ant-btn ant-tooltip-open" type="primary" size={'large'} ><i class="icon icon-add"> </i></Button>
              : <Button shape="circle" className="gx-btn-yellow  gx-mb-1" class="ant-btn ant-tooltip-open" type="primary" disabled size={'large'} ><i class="icon icon-add"> </i></Button>
            }
          </Col>
        </Tooltip>
        <Tooltip placement="topLeft" title="Cancel Line2" arrowPointAtCenter>
          <Col xl={2} lg={12} md={12} sm={12} xs={24}>
            {props.callinfodetail.callStatus == "Connected"
              ? <Button shape="circle" className="gx-btn-danger  gx-mb-1" onClick={hangupline2} class="ant-btn ant-tooltip-open" type="primary" size={'large'} ><i class="icon icon-close-circle"> </i></Button>
              : <Button shape="circle" className="gx-btn-danger  gx-mb-1" class="ant-btn ant-tooltip-open" type="primary" disabled size={'large'} ><i class="icon icon-close-circle"> </i></Button>
            }
          </Col>
        </Tooltip>
        <Tooltip placement="topLeft" title="Conference" arrowPointAtCenter>
          <Col xl={2} lg={12} md={12} sm={12} xs={24}>
            {props.callinfodetail.callStatus == "Connected"
              ? <Button shape="circle" className="gx-btn-light  gx-mb-1" onClick={Conferencecall} class="ant-btn ant-tooltip-open" type="primary" size={'large'} ><i class="icon icon-crm"> </i></Button>
              : <Button shape="circle" className="gx-btn-light  gx-mb-1" class="ant-btn ant-tooltip-open" type="primary" disabled size={'large'} ><i class="icon icon-crm"> </i></Button>
            }
          </Col>
        </Tooltip>
        <Tooltip placement="topLeft" title="Transfer" arrowPointAtCenter>
          <Col xl={2} lg={12} md={12} sm={12} xs={24}>
            {props.callinfodetail.callStatus == "Connected"
              ? <Button shape="circle" className="gx-btn-info  gx-mb-1" onClick={TransferCall} class="ant-btn ant-tooltip-open" type="primary" size={'large'} ><i class="icon icon-transfer"> </i></Button>
              : <Button shape="circle" className="gx-btn-info  gx-mb-1" class="ant-btn ant-tooltip-open" type="primary" disabled size={'large'} ><i class="icon icon-transfer"> </i></Button>
            }
          </Col>
        </Tooltip>

      </Row>

      <Row>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <Input id="favNumber" name="favNumber" placeholder="Fav Number" value={AddFavVal.favNumber} onChange={handleAddFav} />
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <Input id="favName" name="favName" placeholder="Fav Name" value={AddFavVal.favName} onChange={handleAddFav} />
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <Button type="primary" className="gx-btn-info   gx-mb-1" onClick={AddtoFav}>Add Transfer Fav</Button>
        </Col>

        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <TreeSelect className="gx-w-100"
            showSearch
            value={favTrans.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={favTrans}
          >

            {
              getFavVal.map(({ name, number, id }) =>

                <TreeNode value={number} key={id} title={name} >
                </TreeNode>
              )
            }
          </TreeSelect>
        </Col>

      </Row>

    </Auxiliary>
  );


};


export default CallPopUpCard;
