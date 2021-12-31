import React, { useContext, useState, useEffect } from "react";
import { Button, Dropdown, Layout, Menu, message, Popover, Col, Tooltip } from 'antd';
import { connect, useDispatch, useSelector } from "react-redux";
import CustomScrollbars from "util/CustomScrollbars";
import languageData from "../languageData";
import SearchBox from "components/SearchBox";
import UserInfo from "components/UserInfo";
import AppNotification from "components/AppNotification";
import MailNotification from "components/MailNotification";
import HorizontalNav from "../HorizontalNav";
import { Link } from "react-router-dom";
import { switchLanguage, toggleCollapsedSideNav } from "../../../appRedux/actions/Setting";
import MailApis from "../../../components/dashboard/CRM/MailApi/MailApis";
import { NotificationContainer, NotificationManager } from "react-notifications";
import IntlMessages from "util/IntlMessages";
import SmsApi from "../../../components/dashboard/CRM/SmsApi";
import MessageNotification from "../../../components/MessageNotification";
import { MailContext } from "../../../components/dashboard/CRM/MailContext";
import { SmsContext } from "../../../components/dashboard/CRM/SmsContext";


const { Header } = Layout;

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Products</Menu.Item>
    <Menu.Item key="2">Apps</Menu.Item>
    <Menu.Item key="3">Blogs</Menu.Item>
  </Menu>
);

function handleMenuClick(e) {
  message.info('Click on menu item.');
}

const InsideHeader = () => {

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const locale = useSelector(({ settings }) => settings.locale);
  const { navCollapsed } = useSelector(({ common }) => common);

  const languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map(language =>
          <li className="gx-media gx-pointer" key={JSON.stringify(language)} onClick={(e) =>
            dispatch(switchLanguage(language))
          }>
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
            <span className="gx-language-text">{language.name}</span>
          </li>
        )}
      </ul>
    </CustomScrollbars>);

  const updateSearchChatUser = (evt) => {
    setSearchText(evt.target.value)
  };
  const [mailcountByExtn, setMailCountByExtn] = useState({ countByExtn: '' });
  var countExtn = mailcountByExtn.countByExtn
  localStorage.setItem("mailCountByExtn", countExtn)

  const [mailcountval, setMailCountVal] = useState({ count: '' });
  var flage = mailcountval.count;
  localStorage.setItem("mailcountflage", flage)
  function mailpopover() {

    MailApis.mailCount()
      .subscribe(res => {
        setMailCountVal({
          count: res.data.MailCount
        })
      })

    var data = {
      userExtension: localStorage.getItem("extn")
    }
    MailApis.mailCountByExtn(data)
      .subscribe(response => {
        setMailCountByExtn({
          countByExtn: response.data.MailCount
        })
      })
  }

  const [smscountByExtn, setSmsCountByExtn] = useState({ countByExtn: '' });
  var smscountExtn = smscountByExtn.countByExtn
  localStorage.setItem("smsCountByExtn", smscountExtn)

  const [smscountval, setSmsCountVal] = useState({ smscount: '' });
  var flageSms = smscountval.smscount;
  localStorage.setItem("smscountflage", flageSms)
  function smspopover() {

    SmsApi.smsCount()
      .subscribe(res => {
        setSmsCountVal({
          smscount: res.data.SMSCount
        })
      })

    var data = {
      userExtension: localStorage.getItem("extn")
    }
    SmsApi.smsCountByExtn(data)
      .subscribe(response => {
        setSmsCountByExtn({
          countByExtn: response.data.SmsCount
        })
      })

  }


  // const [mailcountval, setMailCountVal] = useState({ count: '' });
  // useEffect(() => {
  //   MailApis.mailCount()
  //     .subscribe(res => {
  //       setMailCountVal({
  //         count: res.data.MailCount
  //       })

  //     })
  // },[])
  // var flage = mailcountval.count;

  // const [smscountval, setSmsCountVal] = useState({ smscount: '' });
  // useEffect(() => {
  //   SmsApi.smsCount()
  //     .subscribe(res => {
  //       setSmsCountVal({
  //         smscount: res.data.MailCount
  //       })
  //     })
  // },[] )
  // var flageSms = smscountval.smscount;


  localStorage.setItem("smsCountVal", smscountval.smscount)
  localStorage.setItem("mailCountVal", mailcountval.count)
  var responseval = 0;
  function reloadMail() {

    MailApis.mailCheckout()
      .subscribe(res => {
        responseval = 1;
        localStorage.setItem("mailCheckout", responseval)

      })

    MailApis.mailSubject()
      .subscribe(res => {
      })

    SmsApi.smsCheckout()
      .subscribe(res => {

      })


  };

  function chatclick() {
    localStorage.setItem("chatvisible", true)
  }


  return (
    <div className="gx-header-horizontal gx-header-horizontal-white gx-inside-header-horizontal" >
      <div className="gx-header-horizontal-top">
        <div className="gx-container">
          <div className="gx-header-horizontal-top-flex">
            {/* <div className="gx-header-horizontal-top-left">
              <i className="icon icon-alert gx-mr-3"/>
              <p className="gx-mb-0 gx-text-truncate"><IntlMessages id="app.announced"/></p>
            </div> */}
            {/* <ul className="gx-login-list">
              <li>Login</li>
              <li>Signup</li>
            </ul> */}
          </div>
        </div>
      </div>


      <Header
        className="gx-header-horizontal-main" >
        <div className="gx-container">
          <div className="gx-header-horizontal-main-flex">
            <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3 6e">
              <i className="gx-icon-btn icon icon-menu"
                onClick={() => {
                  dispatch(toggleCollapsedSideNav(!navCollapsed));
                }}
              />
            </div>
            <Link to="/agent" className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo">
              <img alt="" src={require("assets/images/w-logo.png")} /></Link>
            <Link to="/agent" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
              <img alt="" src={require("assets/images/logo.png")} /></Link>

            <div className="gx-header-horizontal-white-nav gx-header-horizontal-nav-curve gx-d-none gx-d-lg-block">
              <HorizontalNav />
            </div>
            <ul className="gx-header-notifications gx-ml-auto">
              {/* <li className="gx-notify gx-notify-search">
                <Popover overlayClassName="gx-popover-horizantal"
                         placement="bottomRight" content={
                  <div className="gx-d-flex"><Dropdown overlay={menu}>
                    <Button>
                      Category <DownOutlined />
                    </Button>
                  </Dropdown>
                    <SearchBox styleName="gx-popover-search-bar"
                               placeholder="Search in app..."
                               onChange={updateSearchChatUser}
                               value={searchText}/></div>
                } trigger="click">

                  <span className="gx-pointer gx-d-block"><i className="icon icon-search-new"/></span>

                </Popover>
              </li> */}

              {/* chat button */}
              {/* <li className="gx-notify">
                <Button type="primary" className="gx-btn-info   gx-mb-1" onClick={chatclick}>Chat</Button>
              </li> */}


              {/* checkout mail chat sms  */}
              <Tooltip placement="topLeft" title="Check Out" arrowPointAtCenter>
                <li className="gx-msg">

                  <Button className="gx-btn-warning  gx-mb-1" onClick={reloadMail}>Check Out</Button>

                  {/* <Button className='gx-btn-success'
                      onClick={createNotification('success')}>submit
              </Button> */}
                  <NotificationContainer />
                  {/* <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                    content={<MsgNotification />} trigger="click">
                    <span className="gx-pointer gx-status-pos gx-d-block">
                      <i className="icon icon-map-event-listener" />
                      <span className="gx-status gx-status-rtl gx-small gx-orange" />
                    </span>
                  </Popover> */}
                </li>

              </Tooltip>




              {/* chat icon */}
              {/* <Tooltip placement="topLeft" title="Chat" arrowPointAtCenter>
                {
                  flage >= 1 
                    ? <li className="gx-msg">
                      <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                        content={<MailNotification />} trigger="click">
                        <span className="gx-pointer gx-status-pos gx-d-block">
                          <i className="icon icon-chat-bubble" />
                          <span className="gx-status gx-status-rtl gx-small gx-orange" />
                        </span>
                      </Popover>
                    </li>

                    : <li className="gx-notify">
                      <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={"No New Chats"}
                        trigger="click">
                        <span className="gx-pointer gx-d-block"><i className="icon icon-chat-bubble" />
                          <span className="gx-status gx-status-rtl gx-small gx-orange" />
                        </span>
                      </Popover>
                    </li>
                }
              </Tooltip> */}



              {/* Message icon */}
              <SmsContext.Provider value={smscountval.smscount}>
                <Tooltip placement="topLeft" title="Message" arrowPointAtCenter>
                  {
                    flageSms >= 1
                      ? <li className="gx-msg">
                        <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                          content={<MessageNotification />} trigger="click" onClick={smspopover}>
                          <span className="gx-pointer gx-status-pos gx-d-block">
                            <i className="icon icon-map-event-listener" />
                            <span className="gx-status gx-status-rtl gx-small gx-orange" />
                          </span>
                        </Popover>
                      </li>
                      : <li className="gx-notify">
                        <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={"No New Message"}
                          trigger="click" onClick={smspopover}>
                          <span className="gx-pointer gx-d-block"><i className="icon icon-map-event-listener" />
                            <span className="gx-status gx-status-rtl gx-small gx-orange" />
                          </span>
                        </Popover>
                      </li>
                  }
                </Tooltip>

              </SmsContext.Provider>
              {/* Mail icon */}
              <MailContext.Provider value={mailcountval.count}>


                <Tooltip placement="topLeft" title="Mail" arrowPointAtCenter>
                  {
                    flage > 0
                      ? <li className="gx-msg">
                        <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                          content={<MailNotification />} trigger="click" onClick={mailpopover}>
                          <span className="gx-pointer gx-status-pos gx-d-block">
                            <i className="icon icon-email" />
                            <span className="gx-status gx-status-rtl gx-small gx-orange" />
                          </span>
                        </Popover>
                      </li>
                      : <li className="gx-notify">
                        <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={"No New Mails"}
                          trigger="click" onClick={mailpopover}>
                          <span className="gx-pointer gx-d-block"><i className="icon icon-email" />
                            <span className="gx-status gx-status-rtl gx-small gx-orange" />
                          </span>
                        </Popover>
                      </li>
                  }
                </Tooltip>
              </MailContext.Provider>


              {/* <li className="gx-language">
                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                         content={languageMenu()} trigger="click">
              <span className="gx-pointer gx-flex-row gx-align-items-center"><i
                className={`flag flag-24 flag-${locale.icon}`}/>
              </span>
                </Popover>
              </li> */}



              <li className="gx-user-nav"><UserInfo /></li>
              <li className="gx-user-nav"></li>
            </ul>

            {/* <Link to="/agent" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
              <img alt="" src={require("assets/images/whllogo2.jpg")} /></Link> */}

          </div>

          {/* <TopBarChart/> */}

        </div>


      </Header>


    </div>
  );
};

const mapStateToProps = ({ settings, common }) => {
  const { navCollapsed } = common;
  const { locale } = settings;
  return { locale, navCollapsed }
};
export default connect(mapStateToProps, { toggleCollapsedSideNav, switchLanguage })(InsideHeader);
