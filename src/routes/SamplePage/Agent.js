import React, { useContext } from "react";
import { Col, Row } from 'antd';
import { useState, useEffect } from 'react'
import CallInformationCard from "components/dashboard/CRM/CallInformationCard";
import CallHistoryCard from "components/dashboard/CRM/CallHistoryCard";
import Dial from "components/dashboard/CRM/Dial";
import UserApi from "components/dashboard/CRM/UserApi";
import AgentWelComeCard from "components/dashboard/CRM/AgentWelComeCard";
import CallPopUpCard from "components/dashboard/CRM/CallPopUpCard";
import DispoSakhi from "components/dashboard/CRM/DispoSakhi";
import SakhiDispoDetails from "components/dashboard/CRM/SakhiDispoDetails";
import Auxiliary from "util/Auxiliary";
import Widget from "components/Widget/index";
import { UserContext } from "../../components/dashboard/CRM/UserContext";
import TopBarChart from "../../components/dashboard/CRM/TopBarChart";
import InsideHeader from "../../containers/Topbar/InsideHeader";
import Axios from 'axios-observable';
import ChatPage from "../../components/dashboard/CRM/ChatPage";
import DispositionCard from "../../components/dashboard/CRM/DispositionCard";
import MailDispoDetails from "../../components/dashboard/CRM/MailDispoDetails";
import MailDispoSakhi from "../../components/dashboard/CRM/MailDispoSakhi";
import SmsDispoSakhi from "../../components/dashboard/CRM/SmsDispoSakhi";
import WebSocketChat from "../../components/dashboard/CRM/WebSocketChat";
import DialerDispositionCard from "../../components/dashboard/CRM/DialerDispositionCard";
import DialerIncomingDispo from "../../components/dashboard/CRM/DialerIncomingDispo";

// import SignIn from "../../containers/SignIn";


const AgentPage = () => {

  // CallInfo Details
  const [info, setinfo] = useState({
    id: '', phoneNo: '', extension: '', callStatus: '', popupStatus: '', callWrapupTime: '', callStartTime: '', trunkChannel: '', sipChannel: '',
    secondChannel: '', callDirection: '', secondNumber: '', disposition: '', comments: '', callbackDate: '', queueJoinTime: '', extensionStatus: '',
    ivrFlow: '', camName: 'test', name:'',
  });

  const [queuecount, setQueueCount] = useState({ count: '' });

  useEffect(() => {
    const interval = setInterval(callinfo, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  //import Axios from  'axios-observable';
  const callinfo = () => {
    //Callinfo details
    var data = {
      extension: localStorage.getItem("extn"),
    }
    Dial.callinfo(data)
      .subscribe(response => {
        setinfo({
          id: response.data.result.id,
          phoneNo: response.data.result.phoneNo,
          extension: response.data.result.extension,
          name: response.data.result.name,
          popupStatus: response.data.result.popupStatus,
          trunkChannel: response.data.result.trunkChannel,
          channel: response.data.result.sipChannel,
          sipChannel: response.data.result.sipChannel,
          secondChannel: response.data.result.secondChannel,
          callDirection: response.data.result.callDirection,
          secondNumber: response.data.result.secondNumber,
          disposition: response.data.result.disposition,
          comments: response.data.result.comments,
          callbackDate: response.data.result.callbackDate,
          callStatus: response.data.result.popupStatus,
          extensionStatus: response.data.result.extensionStatus,
          callWrapupTime: response.data.result.callWrapupTime,
          callStartTime: response.data.result.callStartTime,
          ivrFlow: response.data.result.ivrFlow,
          camName: response.data.result.camName

        });

      })
    //Callinfo details

    //Queue count Details  
    var countdata = {
      extension: "1111",
    }
    Dial.queueCount(countdata)
      .subscribe(response => {
        setQueueCount({
          count: response.data.count,
        });
      })
    //Queue count Details  

  }

  // CallInfo Details
  var flage = "";

  if (info.disposition == "Ongoing") {
    flage = 0;
  } else {
    flage = 1;
  }



   // Incom dispo Details
   var flageincom = "";

   if (info.callDirection == "OutBound" && info.disposition == "Ongoing") {
    flageincom = 0;
   } else if(info.callDirection == "inbound" && info.disposition == "Ongoing"){
    flageincom = 1;
   }
   else{
    flageincom = 2;
   }
   //else{
    //flageincom = 3;
  // }

  // sms info Details
  var smsflage = "";

  if (info.disposition == "Sms-Ongoing") {
    smsflage = 0;
  } else {
    smsflage = 1;
  }
  var mailflage = 1;

  const msg = useContext(UserContext);

  return (
    <Auxiliary>
      <UserContext.Provider value={localStorage.getItem("usertype")}>
        <InsideHeader />
      </UserContext.Provider>
      <UserContext.Provider value={localStorage.getItem("extn")}>
        {/* //Welcome and Popup  */}


        <div>
          <TopBarChart />
        </div>

        <Row>
          <Col span={24}>
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Widget styleName={`ant-col gx-bg-geekblue `}>
                  <div className="gx-card-body">

                    <CallPopUpCard callinfodetail={info} />

                  </div>
                </Widget>
              </Col>
              <Col xl={12} lg={12} md={12} sm={12} xs={24} >
                <Widget styleName={`ant-col gx-bg-geekblue `}>

                  <div className="gx-card-body">
                    <Row>

                      <Col xl={10} lg={12} md={12} sm={12} xs={24} >
                        <AgentWelComeCard agentDialer={info} />
                      </Col>
                      <Col xl={10} lg={12} md={12} sm={12} xs={24} >
                        <CallInformationCard callinfoprps={info} />
                      </Col>


                    </Row>

                  </div>
                </Widget>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* //Welcome and Popup  */}
        {/* //MailDetail Disposition*/}

        <Row>
          <Col span={24}>
            <Row>

              <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                {localStorage.getItem("mailflage") == 0   // 0 means hide ,  1 means show dispo
                  ?
                  <Widget styleName={`ant-col gx-bg-geekblue `}>
                    <div className="gx-card-body">
                      <MailDispoSakhi mailsakhidispo={info} />

                    </div>
                  </Widget>
                  : <null />

                }
              </Col>

            </Row>
          </Col>
        </Row>
        {/* //MailDetail Disposition*/}

        {/* //SmsDetail Disposition*/}

        <Row>
          <Col span={24}>
            <Row>

              <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                {localStorage.getItem("smsflage") == 0   // 0 means hide ,  1 means show dispo
                  ?
                  <Widget styleName={`ant-col gx-bg-geekblue `}>
                    <div className="gx-card-body">
                      <SmsDispoSakhi smssakhidispo={info} />

                    </div>
                  </Widget>
                  : <null />

                }
              </Col>

            </Row>
          </Col>
        </Row>
        {/* //SmsDetail Disposition*/}

        {/* //Helpdesk Disposition*/}

        <Row>
          <Col span={24}>
            <Row>

              <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                <Widget styleName={`ant-col gx-bg-geekblue `}>
                  <div className="gx-card-body">
                    {flageincom == 0  // 0 means hide ,  1 means show dispo
                      // ? <DispoSakhi sakhidispo={info} /> // Amtex Dispositions
                      ? <DialerDispositionCard sakhidispo={info} />

                      : flageincom == 1
                      ? <DialerIncomingDispo sakhiImcomdispo={info} />

                     : <div className="gx-text-white" > Waiting for Another Call.... </div>

                    // : <DialerIncomingDispo sakhiImcomdispo={info} />

                    }
                  </div>
                </Widget>
              </Col>

            </Row>
          </Col>
        </Row>
        {/* //Helpdesk Disposition*/}
        {/* //Helpdesk Details*/}

        <Row>
          <Col span={24}>
            <Row>

              <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                <Widget styleName={`ant-col gx-bg-geekblue `}>
                  <div className="gx-card-body">
                    <SakhiDispoDetails dispodetail={info} />
                  </div>
                </Widget>
              </Col>

            </Row>
          </Col>
        </Row>
        {/* //Helpdesk Details*/}
        {/* //Call History*/}

        <Row>
          <Col span={24}>
            <Row>

              <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                <Widget styleName={`ant-col gx-bg-geekblue `} >
                  <CallHistoryCard />
                </Widget>
              </Col>


            </Row>
          </Col>
        </Row>
        {/* //Call History*/}

        <Row>
        </Row>
        {/* chat icon */}
        <ChatPage />
        {/* chat icon */}

        {/* WebSocketChat */}
        {
          localStorage.getItem("chatvisible") == "true"
            ? <WebSocketChat />
            : <null />
        }

        {/* WebSocketChat */}


      </UserContext.Provider>
    </Auxiliary>
  );

  //test

};

export default AgentPage;
